/**
 * RPA Bridge - Connects portfolio site with GitHub Actions workflows
 * Handles webhook routing, globe activity updates, and agent orchestration
 * @module rpa-bridge
 */

class RPABridge {
  constructor(config = {}) {
    this.baseUrl = config.baseUrl || window.location.origin;
    this.activityEndpoint = config.activityEndpoint || '/docs/globe-activity.json';
    this.configEndpoint = config.configEndpoint || '/config';
    this.refreshInterval = config.refreshInterval || 30000;
    this.eventQueue = [];
    this.agents = new Map();
    this.isConnected = false;
    this._listeners = new Map();
  }

  async initialize() {
    try {
      await this.loadConfigurations();
      await this.loadActivityData();
      this.startPolling();
      this.isConnected = true;
      this.emit('connected', { timestamp: new Date().toISOString() });
      console.log('[RPA Bridge] Initialized successfully');
    } catch (error) {
      console.error('[RPA Bridge] Initialization failed:', error);
      this.emit('error', { type: 'init', message: error.message });
    }
  }

  async loadConfigurations() {
    const configs = ['platforms', 'webhook-routes', 'linear-cursor', 'tally-forms'];
    const loaded = {};
    for (const name of configs) {
      try {
        const response = await fetch(`${this.baseUrl}/config/${name}.json`);
        if (response.ok) {
          loaded[name] = await response.json();
        }
      } catch (e) {
        console.warn(`[RPA Bridge] Could not load config: ${name}`);
      }
    }
    this.config = loaded;
    return loaded;
  }

  async loadActivityData() {
    try {
      const response = await fetch(`${this.baseUrl}${this.activityEndpoint}`);
      if (response.ok) {
        this.activityData = await response.json();
        this.emit('activity-loaded', this.activityData);
        return this.activityData;
      }
    } catch (e) {
      console.warn('[RPA Bridge] Could not load activity data');
    }
    return null;
  }

  async loadAgentRegistry() {
    try {
      const response = await fetch(`${this.baseUrl}/agents/agent-registry.json`);
      if (response.ok) {
        const registry = await response.json();
        registry.agents.forEach(agent => {
          this.agents.set(agent.id, agent);
        });
        this.emit('agents-loaded', { count: this.agents.size });
        return registry;
      }
    } catch (e) {
      console.warn('[RPA Bridge] Could not load agent registry');
    }
    return null;
  }

  routeWebhook(source, eventType, payload) {
    const routes = this.config?.['webhook-routes']?.routes || [];
    const matchedRoute = routes.find(r =>
      r.source === source && r.events.includes(eventType)
    );
    if (matchedRoute) {
      const event = {
        id: `evt-${Date.now().toString(36)}`,
        type: this.mapEventType(eventType),
        source,
        timestamp: new Date().toISOString(),
        route: matchedRoute,
        payload
      };
      this.eventQueue.push(event);
      this.emit('webhook-routed', event);
      return event;
    }
    return null;
  }

  mapEventType(eventType) {
    const mapping = {
      'form.submission.created': 'form-submitted',
      'issue.created': 'issue-created',
      'push': 'pipeline-triggered',
      'merge_request': 'sync-completed',
      'pipeline_success': 'pipeline-triggered',
      'workflow_dispatch': 'agent-dispatched'
    };
    return mapping[eventType] || 'webhook-received';
  }

  createGlobeMarker(event) {
    return {
      id: event.id,
      type: event.type,
      coordinates: event.coordinates || { lat: 0, lng: 0 },
      timestamp: event.timestamp,
      source: event.source,
      metadata: {
        label: event.label || `${event.source} ${event.type}`,
        status: 'active',
        priority: event.priority || 3
      },
      visualization: {
        color: this.getEventColor(event.type),
        size: 0.5,
        pulseEffect: true
      }
    };
  }

  getEventColor(type) {
    const colors = {
      'webhook-received': '#3B82F6',
      'agent-dispatched': '#8B5CF6',
      'pipeline-triggered': '#10B981',
      'issue-created': '#F59E0B',
      'sync-completed': '#06B6D4',
      'form-submitted': '#EC4899',
      'deployment-started': '#6366F1',
      'error-detected': '#EF4444'
    };
    return colors[type] || '#6B7280';
  }

  startPolling() {
    if (this._pollTimer) clearInterval(this._pollTimer);
    this._pollTimer = setInterval(async () => {
      await this.loadActivityData();
      this.processEventQueue();
    }, this.refreshInterval);
  }

  stopPolling() {
    if (this._pollTimer) {
      clearInterval(this._pollTimer);
      this._pollTimer = null;
    }
  }

  processEventQueue() {
    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift();
      this.emit('event-processed', event);
    }
  }

  on(event, callback) {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, []);
    }
    this._listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this._listeners.has(event)) {
      const listeners = this._listeners.get(event).filter(cb => cb !== callback);
      this._listeners.set(event, listeners);
    }
  }

  emit(event, data) {
    if (this._listeners.has(event)) {
      this._listeners.get(event).forEach(cb => cb(data));
    }
  }

  getStatus() {
    return {
      connected: this.isConnected,
      agents: this.agents.size,
      queuedEvents: this.eventQueue.length,
      configsLoaded: Object.keys(this.config || {}).length,
      lastActivity: this.activityData?.events?.[0]?.timestamp || null
    };
  }

  destroy() {
    this.stopPolling();
    this._listeners.clear();
    this.eventQueue = [];
    this.agents.clear();
    this.isConnected = false;
    console.log('[RPA Bridge] Destroyed');
  }
}

// Auto-initialize if in browser context
if (typeof window !== 'undefined') {
  window.RPABridge = RPABridge;
  window.rpaBridge = new RPABridge();
  document.addEventListener('DOMContentLoaded', () => {
    window.rpaBridge.initialize();
  });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RPABridge;
}
