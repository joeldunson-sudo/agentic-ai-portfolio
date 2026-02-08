/**
 * DUNSONATOR Chat & Presence System v2.0
 * ========================================
 * Tactical AI Assistant - Signal Hunter Interface
 * Like a field operator scanning terrain for intent signals,
 * DUNSONATOR deploys across every page, scanning for questions
 * and delivering intelligence on demand.
 *
 * Linked to Perplexity AI for real-time knowledge retrieval.
 */

(function() {
  'use strict';

  // === CONFIGURATION ===
  const CONFIG = {
    botName: 'DUNSONATOR',
    tagline: 'TACTICAL AI SIGNAL HUNTER',
    version: 'v2.0',
    tooltipDelay: 3000,
    tooltipDuration: 8000,
    maxMessages: 50,
    typingSpeed: 30,
    perplexityBase: 'https://www.perplexity.ai/search?q=',
    contextAware: true
  };

  // === TACTICAL SIGNAL PHRASES ===
  // Rotating tooltips - the operator scanning the ridge
  const SIGNAL_PHRASES = [
    'Scanning territory for intent signals...',
    'Drone deployed. Surveying account landscape.',
    'Signal lock acquired. Ready for tasking.',
    'DUNSONATOR online. What needs hunting?',
    'Terrain mapped. Awaiting coordinates.',
    'All agents reporting. Systems nominal.',
    'Intel sweep complete. Standing by.',
    'RPA fleet on standby. Deploy on command.',
    'Signal strength: STRONG. Awaiting orders.',
    'Overwatch position established. Ready.'
  ];

  // === PAGE CONTEXT AWARENESS ===
  const PAGE_CONTEXT = {
    'hub': {
      greeting: 'Command center active. All systems green.',
      scanType: 'Full spectrum operational scan'
    },
    'tools': {
      greeting: 'Arsenal loaded. 14 tools ready for deployment.',
      scanType: 'Tool capability assessment'
    },
    'rpa': {
      greeting: 'RPA Control Center online. Bots standing by.',
      scanType: 'Automation fleet status check'
    },
    'intelligence': {
      greeting: 'Territory intel active. Tracking 8 accounts.',
      scanType: 'Deep signal reconnaissance'
    },
    'default': {
      greeting: 'DUNSONATOR deployed. Scanning for signals.',
      scanType: 'General reconnaissance'
    }
  };

   // === DETECT CURRENT PAGE ===
  function getPageKey() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('hub') || path.endsWith('/') || path.includes('index')) return 'hub';
    if (path.includes('tool')) return 'tools';
    if (path.includes('rpa')) return 'rpa';
    if (path.includes('intelligence') || path.includes('territory')) return 'intelligence';
    return 'default';
  }

  // === STATE ===
  let chatOpen = false;
  let tooltipTimer = null;
  let phraseIndex = 0;
  let messages = [];

  // === BUILD DOM ===
  function injectPresence() {
    // Main container
    const presence = document.createElement('div');
    presence.className = 'dunsonator-presence';
    presence.id = 'dunsonator-presence';

    // Tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'dunsonator-tooltip';
    tooltip.id = 'dunsonator-tooltip';
    tooltip.style.display = 'none';
    tooltip.textContent = SIGNAL_PHRASES[0];

    // Avatar
    const avatar = document.createElement('div');
    avatar.className = 'dunsonator-avatar';
    avatar.id = 'dunsonator-avatar';
    avatar.title = CONFIG.tagline;
    const pulseRing = document.createElement('div');
    pulseRing.className = 'pulse-ring';
    avatar.appendChild(pulseRing);

    // Click handler
    avatar.addEventListener('click', toggleChat);

    presence.appendChild(tooltip);
    presence.appendChild(avatar);
    document.body.appendChild(presence);

    // Start tooltip rotation
    startTooltipCycle();
  }

   // === TOOLTIP ROTATION ===
  function startTooltipCycle() {
    const tooltip = document.getElementById('dunsonator-tooltip');
    if (!tooltip) return;

    // Initial show after delay
    setTimeout(() => {
      if (!chatOpen) {
        tooltip.style.display = 'block';
        tooltip.textContent = SIGNAL_PHRASES[phraseIndex];
      }
    }, CONFIG.tooltipDelay);

    // Rotate phrases
    tooltipTimer = setInterval(() => {
      if (chatOpen) {
        tooltip.style.display = 'none';
        return;
      }
      phraseIndex = (phraseIndex + 1) % SIGNAL_PHRASES.length;
      tooltip.style.display = 'none';
      setTimeout(() => {
        tooltip.textContent = SIGNAL_PHRASES[phraseIndex];
        tooltip.style.display = 'block';
      }, 300);
    }, CONFIG.tooltipDuration);
  }

  // === BUILD CHAT WIDGET ===
  function injectChatWidget() {
    const chat = document.createElement('div');
    chat.className = 'dunsonator-chat';
    chat.id = 'dunsonator-chat';

    const ctx = PAGE_CONTEXT[getPageKey()] || PAGE_CONTEXT['default'];

    chat.innerHTML = `
      <div class="dunsonator-chat-header">
        <div class="chat-icon">D</div>
        <div>
          <div class="chat-title">${CONFIG.botName}</div>
          <div class="chat-status">${ctx.scanType}</div>
        </div>
        <button class="close-btn" id="dunsonator-close">&times;</button>
      </div>
      <div class="dunsonator-chat-body" id="dunsonator-chat-body">
        <div class="chat-msg bot">
          <strong>${CONFIG.botName} ${CONFIG.version}</strong><br>
          ${ctx.greeting}<br><br>
          Ask me anything about Joel's RPA operations, tools, territory intelligence, or agentic AI capabilities.
          <br><br>
          <em style="font-size:0.72rem;color:var(--text-muted);">Powered by Perplexity AI</em>
        </div>
      </div>
      <div class="dunsonator-chat-input">
        <input type="text" id="dunsonator-input" placeholder="Hunt for signals..." autocomplete="off" />
        <button id="dunsonator-send">SEND</button>
      </div>
    `;

    document.body.appendChild(chat);

    // Event listeners
    document.getElementById('dunsonator-close').addEventListener('click', toggleChat);
    document.getElementById('dunsonator-send').addEventListener('click', handleSend);
    document.getElementById('dunsonator-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

   // === TOGGLE CHAT ===
  function toggleChat() {
    chatOpen = !chatOpen;
    const chat = document.getElementById('dunsonator-chat');
    const tooltip = document.getElementById('dunsonator-tooltip');
    if (chatOpen) {
      chat.classList.add('active');
      tooltip.style.display = 'none';
      document.getElementById('dunsonator-input').focus();
    } else {
      chat.classList.remove('active');
    }
  }

  // === ADD MESSAGE ===
  function addMessage(text, sender) {
    const body = document.getElementById('dunsonator-chat-body');
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    msg.innerHTML = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
    messages.push({ text, sender, time: Date.now() });
  }

  // === TYPING INDICATOR ===
  function showTyping() {
    const body = document.getElementById('dunsonator-chat-body');
    const typing = document.createElement('div');
    typing.className = 'chat-msg bot';
    typing.id = 'dunsonator-typing';
    typing.innerHTML = '<span class="animate-flicker" style="color:var(--accent-primary);">Scanning signals...</span>';
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById('dunsonator-typing');
    if (el) el.remove();
  }

  // === HANDLE SEND ===
  function handleSend() {
    const input = document.getElementById('dunsonator-input');
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';
    showTyping();

    // Process with local knowledge first, then offer Perplexity deep dive
    setTimeout(() => {
      hideTyping();
      const response = generateResponse(text);
      addMessage(response, 'bot');
    }, 800 + Math.random() * 1200);
  }

   // === LOCAL KNOWLEDGE BASE ===
  // Signal intelligence the operator carries in the field
  const KNOWLEDGE = {
    tools: {
      keywords: ['tool', 'arsenal', 'capability', 'what can', 'features'],
      response: `<strong>Signal Hunter Arsenal:</strong><br>14 enterprise tools deployed across the stack:<br>
        - Salesforce, HubSpot, Outreach (CRM/Engagement)<br>
        - ZoomInfo, LinkedIn Sales Nav (Intel Gathering)<br>
        - Gong, Clari (Revenue Intelligence)<br>
        - Slack, Teams (Comms)<br>
        - Power Automate, UiPath (RPA Fleet)<br>
        - Tableau, Excel/Sheets (Data Viz)<br>
        - Perplexity AI (Knowledge Ops)`
    },
    rpa: {
      keywords: ['rpa', 'automat', 'bot', 'workflow', 'power automate'],
      response: `<strong>RPA Fleet Status:</strong><br>
        Active automations handling territory operations:<br>
        - Lead enrichment pipelines<br>
        - CRM data hygiene bots<br>
        - Meeting prep automation<br>
        - Signal monitoring agents<br>
        - Report generation workflows<br>
        All managed from the RPA Control Center.`
    },
    territory: {
      keywords: ['territory', 'account', 'signal', 'intent', 'pipeline', 'meta', 'snowflake', 'databricks'],
      response: `<strong>Territory Intel Brief:</strong><br>
        Currently tracking 8 high-value accounts:<br>
        - Meta Platforms (Score: 94, DECISION stage)<br>
        - Confluent (Score: 89, DECISION)<br>
        - Snowflake (Score: 82, CONSIDERATION)<br>
        - Databricks (Score: 78, CONSIDERATION)<br>
        All signals actively monitored. Trends updating daily.`
    },
    about: {
      keywords: ['joel', 'dunson', 'who', 'about', 'background'],
      response: `<strong>Operator Profile:</strong><br>
        Joel Dunson - Enterprise Technology Sales<br>
        Specializing in agentic AI, RPA orchestration,<br>
        and territory intelligence automation.<br>
        Building the future of AI-powered sales operations.`
    },
    dunsonator: {
      keywords: ['dunsonator', 'you', 'what are you', 'mascot', 'bot'],
      response: `<strong>DUNSONATOR v2.0</strong><br>
        Tactical AI Signal Hunter.<br>
        I deploy across every page of this portfolio like a drone<br>
        operator scanning terrain from a ridge - always watching,<br>
        always hunting for the next high-value signal.<br><br>
        Think of me as your overwatch. Ask anything.`
    }
  };

   // === RESPONSE GENERATOR ===
  function generateResponse(query) {
    const q = query.toLowerCase();

    // Check local knowledge base
    for (const [key, data] of Object.entries(KNOWLEDGE)) {
      for (const kw of data.keywords) {
        if (q.includes(kw)) {
          return data.response + getPerplexityLink(query);
        }
      }
    }

    // Default: offer Perplexity deep dive
    return `Signal received. Processing: "<em>${query}</em>"<br><br>
      I don't have that intel cached locally, but I can deploy
      a deep reconnaissance scan via Perplexity AI.
      ${getPerplexityLink(query)}`;
  }

  // === PERPLEXITY DEEP DIVE LINK ===
  function getPerplexityLink(query) {
    const encoded = encodeURIComponent(`Joel Dunson agentic AI portfolio ${query}`);
    return `<br><br>
      <a href="${CONFIG.perplexityBase}${encoded}" target="_blank" 
         style="color:var(--accent-tertiary);text-decoration:underline;font-size:0.78rem;">
        Launch Perplexity Deep Scan
      </a>`;
  }

  // === SCANLINE OVERLAY ===
  function injectScanline() {
    const overlay = document.createElement('div');
    overlay.className = 'scanline-overlay';
    document.body.appendChild(overlay);
  }

  // === INITIALIZE ===
  function init() {
    // Wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot);
    } else {
      boot();
    }
  }

  function boot() {
    console.log(`[DUNSONATOR] ${CONFIG.version} - ${CONFIG.tagline}`);
    console.log(`[DUNSONATOR] Page context: ${getPageKey()}`);
    injectPresence();
    injectChatWidget();
    injectScanline();
    console.log('[DUNSONATOR] All systems deployed. Scanning for signals.');
  }

  // Deploy
  init();

})();
