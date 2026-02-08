/**
 * DUNSONATOR IMAGE INJECTION SYSTEM v2.0
 * Tactical Signal Hunter Visual Layer
 * Injects CDN-sourced tactical/tech imagery across all pages
 */
(function() {
  'use strict';

  // === IMAGE LIBRARY - Unsplash CDN tactical/tech images ===
  const TACTICAL_IMAGES = {
    heroes: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80', // cyber grid
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&q=80', // matrix code
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80', // server room
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80', // tech office
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80', // circuit board
    ],
    signals: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', // data dashboard
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', // analytics screen
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80', // stock charts
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', // trading desk
      'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80', // AI neural
      'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80', // blockchain
    ],
    tactical: [
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80', // hacker screen
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80', // cybersecurity
      'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80', // hacker hood
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80', // network fiber
      'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800&q=80', // radar screen
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80', // neon tech
    ],
    environments: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', // earth from space
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80', // satellite
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80', // hologram
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', // abstract tech
      'https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&q=80', // command center
    ]
  };

  // === INJECT TACTICAL CSS ===
  function injectImageStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* === TACTICAL HERO BANNER === */
      .duns-hero-banner {
        position: relative;
        width: 100%;
        height: 340px;
        overflow: hidden;
        border-bottom: 2px solid #ff8c00;
        margin-bottom: 32px;
      }
      .duns-hero-banner img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.35) saturate(1.4) hue-rotate(-5deg);
        transition: filter 0.6s ease;
      }
      .duns-hero-banner:hover img {
        filter: brightness(0.5) saturate(1.6);
      }
      .duns-hero-overlay {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(180deg, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.3) 40%, rgba(10,10,15,0.8) 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 2;
      }
      .duns-hero-overlay h1 {
        font-family: 'JetBrains Mono', monospace;
        font-size: 2.2rem;
        color: #ff8c00;
        text-shadow: 0 0 30px rgba(255,140,0,0.6), 0 0 60px rgba(255,140,0,0.3);
        letter-spacing: 4px;
        text-transform: uppercase;
        margin: 0;
      }
      .duns-hero-overlay .hero-sub {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.85rem;
        color: #b87333;
        letter-spacing: 6px;
        margin-top: 8px;
        opacity: 0.8;
      }
      .duns-hero-scanline {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,140,0,0.03) 2px, rgba(255,140,0,0.03) 4px);
        pointer-events: none;
        z-index: 3;
        animation: scanMove 8s linear infinite;
      }
      @keyframes scanMove {
        0% { transform: translateY(0); }
        100% { transform: translateY(20px); }
      }

      /* === TACTICAL IMAGE GRID === */
      .duns-image-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 16px;
        padding: 24px;
        margin: 32px 0;
      }
      .duns-image-card {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid rgba(255,140,0,0.2);
        background: rgba(10,10,15,0.9);
        transition: all 0.4s ease;
        cursor: pointer;
      }
      .duns-image-card:hover {
        border-color: #ff8c00;
        transform: translateY(-4px);
        box-shadow: 0 8px 32px rgba(255,140,0,0.2);
      }
      .duns-image-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        filter: brightness(0.6) saturate(1.2);
        transition: all 0.4s ease;
      }
      .duns-image-card:hover img {
        filter: brightness(0.8) saturate(1.5);
        transform: scale(1.05);
      }
      .duns-image-card .card-label {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 16px;
        background: linear-gradient(transparent, rgba(10,10,15,0.95));
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        color: #ff8c00;
        letter-spacing: 2px;
        text-transform: uppercase;
      }
      .duns-image-card .card-label span {
        display: block;
        color: #b87333;
        font-size: 0.65rem;
        margin-top: 4px;
        opacity: 0.7;
      }

      /* === FLOATING TACTICAL PANELS === */
      .duns-tactical-panel {
        position: relative;
        margin: 24px;
        padding: 0;
        border: 1px solid rgba(255,140,0,0.15);
        border-radius: 8px;
        overflow: hidden;
        background: rgba(10,10,15,0.95);
      }
      .duns-tactical-panel .panel-image {
        width: 100%;
        height: 180px;
        object-fit: cover;
        filter: brightness(0.4) saturate(1.3);
      }
      .duns-tactical-panel .panel-content {
        padding: 20px;
        position: relative;
      }
      .duns-tactical-panel .panel-content::before {
        content: '';
        position: absolute;
        top: -2px;
        left: 20px;
        right: 20px;
        height: 2px;
        background: linear-gradient(90deg, transparent, #ff8c00, transparent);
      }

      /* === AMBIENT BACKGROUND IMAGES === */
      .duns-ambient-bg {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: -1;
        pointer-events: none;
      }
      .duns-ambient-bg img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.06;
        filter: saturate(0.5) brightness(0.3);
        transition: opacity 10s ease;
      }

      /* === CORNER TACTICAL VIGNETTES === */
      .duns-corner-img {
        position: fixed;
        width: 200px;
        height: 200px;
        opacity: 0.12;
        pointer-events: none;
        z-index: 1;
        filter: brightness(0.5) saturate(1.5);
      }
      .duns-corner-img.top-right {
        top: 80px; right: 0;
        mask-image: radial-gradient(ellipse at top right, black 30%, transparent 70%);
        -webkit-mask-image: radial-gradient(ellipse at top right, black 30%, transparent 70%);
      }
      .duns-corner-img.bottom-left {
        bottom: 0; left: 0;
        mask-image: radial-gradient(ellipse at bottom left, black 30%, transparent 70%);
        -webkit-mask-image: radial-gradient(ellipse at bottom left, black 30%, transparent 70%);
      }

      /* === DUNSONATOR AVATAR BADGE === */
      .duns-avatar-badge {
        position: fixed;
        bottom: 90px;
        right: 24px;
        width: 56px;
        height: 56px;
        z-index: 9998;
        cursor: pointer;
        filter: drop-shadow(0 0 12px rgba(255,140,0,0.5));
        animation: avatarPulse 3s ease-in-out infinite;
        transition: transform 0.3s ease;
      }
      .duns-avatar-badge:hover {
        transform: scale(1.2);
        filter: drop-shadow(0 0 20px rgba(255,140,0,0.8));
      }
      @keyframes avatarPulse {
        0%, 100% { filter: drop-shadow(0 0 12px rgba(255,140,0,0.5)); }
        50% { filter: drop-shadow(0 0 24px rgba(255,140,0,0.8)); }
      }

      /* === SECTION DIVIDER WITH IMAGE === */
      .duns-section-divider {
        width: 100%;
        height: 120px;
        position: relative;
        margin: 40px 0;
        overflow: hidden;
      }
      .duns-section-divider img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.2) saturate(1.5);
      }
      .duns-section-divider::after {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(90deg, rgba(10,10,15,1) 0%, transparent 20%, transparent 80%, rgba(10,10,15,1) 100%);
      }
      .duns-section-divider .divider-line {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, #ff8c00, transparent);
        z-index: 2;
      }
    `;
    document.head.appendChild(style);
  }

  // === PAGE CONTEXT DETECTION ===
  function getPageContext() {
    const path = window.location.pathname.toLowerCase();
    const title = document.title.toLowerCase();
    if (path.includes('hub') || path.endsWith('/')) return { type: 'hub', title: 'DUNSONATOR // COMMAND HUB', sub: 'TACTICAL SIGNAL HUNTER v2.0' };
    if (path.includes('rpa')) return { type: 'rpa', title: 'RPA CONTROL CENTER', sub: 'AUTOMATED INTELLIGENCE GRID' };
    if (path.includes('command')) return { type: 'command', title: 'COMMAND CENTER', sub: 'REAL-TIME SIGNAL OPERATIONS' };
    if (path.includes('prospect')) return { type: 'prospect', title: 'PROSPECTING PIPELINE', sub: 'TARGET ACQUISITION SYSTEM' };
    if (path.includes('intelligence')) return { type: 'intel', title: 'INTELLIGENCE MATRIX', sub: 'DEEP SIGNAL ANALYSIS' };
    if (path.includes('6sense') || path.includes('ticker')) return { type: 'ticker', title: '6SENSE SIGNAL TICKER', sub: 'LIVE INTENT DATA FEED' };
    if (path.includes('signal-map') || path.includes('map')) return { type: 'map', title: 'LIVE SIGNAL MAP', sub: 'GLOBAL THREAT DETECTION' };
    if (path.includes('index')) return { type: 'index', title: 'DUNSONATOR HQ', sub: 'ENTERPRISE AI OPERATIONS' };
    return { type: 'default', title: 'DUNSONATOR', sub: 'SIGNAL HUNTER ACTIVE' };
  }

  // === BUILD HERO BANNER ===
  function buildHeroBanner() {
    const ctx = getPageContext();
    const heroIdx = Math.abs(ctx.type.charCodeAt(0)) % TACTICAL_IMAGES.heroes.length;
    const banner = document.createElement('div');
    banner.className = 'duns-hero-banner';
    banner.innerHTML = `
      <img src="${TACTICAL_IMAGES.heroes[heroIdx]}" alt="Tactical" loading="eager">
      <div class="duns-hero-overlay">
        <h1>${ctx.title}</h1>
        <div class="hero-sub">${ctx.sub}</div>
      </div>
      <div class="duns-hero-scanline"></div>
    `;
    // Insert at top of body or after nav
    const nav = document.querySelector('nav, .navbar, header, .top-bar');
    if (nav) {
      nav.parentNode.insertBefore(banner, nav.nextSibling);
    } else {
      document.body.insertBefore(banner, document.body.firstChild);
    }
  }

  // === BUILD IMAGE GRID ===
  function buildImageGrid() {
    const labels = [
      { title: 'SIGNAL INTERCEPT', sub: 'Real-time data capture' },
      { title: 'NEURAL ANALYSIS', sub: 'AI pattern recognition' },
      { title: 'THREAT MATRIX', sub: 'Competitive intelligence' },
      { title: 'DATA PIPELINE', sub: 'Automated ETL flows' },
      { title: 'CYBER DEFENSE', sub: 'Security perimeter' },
      { title: 'NETWORK OPS', sub: 'Infrastructure backbone' },
    ];
    const grid = document.createElement('div');
    grid.className = 'duns-image-grid';
    TACTICAL_IMAGES.signals.forEach((src, i) => {
      const card = document.createElement('div');
      card.className = 'duns-image-card';
      card.innerHTML = `
        <img src="${src}" alt="${labels[i].title}" loading="lazy">
        <div class="card-label">
          ${labels[i].title}
          <span>${labels[i].sub}</span>
        </div>
      `;
      grid.appendChild(card);
    });
    // Insert after first major section or after hero
    const hero = document.querySelector('.duns-hero-banner');
    const target = document.querySelector('.grid, .cards, .dashboard, main, .content, .container');
    if (target) {
      target.parentNode.insertBefore(grid, target);
    } else if (hero) {
      hero.parentNode.insertBefore(grid, hero.nextSibling);
    }
  }

  // === BUILD TACTICAL PANELS (between sections) ===
  function buildTacticalPanels() {
    const panels = [
      { img: TACTICAL_IMAGES.tactical[0], title: 'SIGNAL INTERCEPT MODE', desc: 'Monitoring 847 active endpoints across enterprise networks. Threat level: ELEVATED.' },
      { img: TACTICAL_IMAGES.tactical[1], title: 'PERIMETER DEFENSE', desc: 'Automated RPA bots scanning for intent signals. 12 high-value targets identified.' },
      { img: TACTICAL_IMAGES.tactical[2], title: 'DEEP RECONNAISSANCE', desc: 'DUNSONATOR deployed across 6 intelligence verticals. Signal-to-noise ratio: 94.7%.' },
    ];
    const sections = document.querySelectorAll('section, .section, .card-grid, .widget, [class*="grid"]');
    panels.forEach((p, i) => {
      const panel = document.createElement('div');
      panel.className = 'duns-tactical-panel';
      panel.innerHTML = `
        <img class="panel-image" src="${p.img}" alt="${p.title}" loading="lazy">
        <div class="panel-content">
          <h3 style="color:#ff8c00;font-family:'JetBrains Mono',monospace;font-size:0.9rem;letter-spacing:3px;margin:0 0 8px 0;">${p.title}</h3>
          <p style="color:#8a8a8a;font-family:'JetBrains Mono',monospace;font-size:0.75rem;margin:0;line-height:1.6;">${p.desc}</p>
        </div>
      `;
      if (sections[i * 2]) {
        sections[i * 2].parentNode.insertBefore(panel, sections[i * 2].nextSibling);
      }
    });
  }

  // === BUILD SECTION DIVIDERS ===
  function buildSectionDividers() {
    const sections = document.querySelectorAll('section, .section, .card-grid, [class*="grid"]');
    let divCount = 0;
    sections.forEach((sec, i) => {
      if (i % 3 === 1 && divCount < 3) {
        const divider = document.createElement('div');
        divider.className = 'duns-section-divider';
        divider.innerHTML = `
          <img src="${TACTICAL_IMAGES.environments[divCount]}" alt="" loading="lazy">
          <div class="divider-line"></div>
        `;
        sec.parentNode.insertBefore(divider, sec);
        divCount++;
      }
    });
  }

  // === ADD AMBIENT BACKGROUND ===
  function addAmbientBackground() {
    const bg = document.createElement('div');
    bg.className = 'duns-ambient-bg';
    const idx = Math.floor(Math.random() * TACTICAL_IMAGES.environments.length);
    bg.innerHTML = `<img src="${TACTICAL_IMAGES.environments[idx]}" alt="">`;
    document.body.appendChild(bg);
    // Cycle images every 30s
    setInterval(() => {
      const newIdx = Math.floor(Math.random() * TACTICAL_IMAGES.environments.length);
      bg.querySelector('img').src = TACTICAL_IMAGES.environments[newIdx];
    }, 30000);
  }

  // === ADD CORNER VIGNETTES ===
  function addCornerImages() {
    const tr = document.createElement('img');
    tr.className = 'duns-corner-img top-right';
    tr.src = TACTICAL_IMAGES.tactical[3];
    tr.alt = '';
    document.body.appendChild(tr);

    const bl = document.createElement('img');
    bl.className = 'duns-corner-img bottom-left';
    bl.src = TACTICAL_IMAGES.tactical[4];
    bl.alt = '';
    document.body.appendChild(bl);
  }

  // === ADD DUNSONATOR AVATAR BADGE ===
  function addAvatarBadge() {
    // Determine correct path
    const path = window.location.pathname;
    const isSubdir = path.includes('/intelligence/');
    const prefix = isSubdir ? '../assets/' : 'assets/';
    
    const avatar = document.createElement('img');
    avatar.className = 'duns-avatar-badge';
    avatar.src = prefix + 'dunsonator-avatar.svg';
    avatar.alt = 'DUNSONATOR';
    avatar.title = 'DUNSONATOR // Signal Hunter Active';
    avatar.addEventListener('click', () => {
      const chatBtn = document.querySelector('.duns-chat-toggle, #dunsonator-chat-toggle');
      if (chatBtn) chatBtn.click();
    });
    document.body.appendChild(avatar);
  }

  // === ADD TACTICAL IMAGERY TO EXISTING CARDS ===
  function enhanceExistingCards() {
    const cards = document.querySelectorAll('.card, .widget, .panel, [class*="card"], [class*="widget"]');
    cards.forEach((card, i) => {
      if (card.querySelector('img')) return; // skip if already has image
      if (card.classList.contains('duns-image-card') || card.classList.contains('duns-tactical-panel')) return;
      const imgSrc = TACTICAL_IMAGES.tactical[i % TACTICAL_IMAGES.tactical.length];
      const imgEl = document.createElement('div');
      imgEl.style.cssText = `
        width:100%;height:120px;overflow:hidden;position:relative;
        border-bottom:1px solid rgba(255,140,0,0.15);
      `;
      imgEl.innerHTML = `<img src="${imgSrc}" alt="" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.3) saturate(1.4);" loading="lazy">`;
      card.insertBefore(imgEl, card.firstChild);
    });
  }

  // === INITIALIZE ===
  function init() {
    injectImageStyles();
    buildHeroBanner();
    buildImageGrid();
    buildTacticalPanels();
    buildSectionDividers();
    addAmbientBackground();
    addCornerImages();
    addAvatarBadge();
    // Slight delay for enhanced cards to let DOM settle
    setTimeout(enhanceExistingCards, 500);
    console.log('[DUNSONATOR-IMAGES] Tactical visual layer deployed.');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
