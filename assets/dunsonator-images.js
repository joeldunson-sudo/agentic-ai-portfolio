/**
 * DUNSONATOR PROCEDURAL VISUAL SYSTEM v3.0
 * Zero stock photos. All visuals generated in-browser.
 * Particle networks, radar sweeps, data meshes, signal waveforms.
 * Inspired by Palantir HUD / Anduril Lattice aesthetic.
 */
(function() {
  'use strict';
  const C = { orange: '#ff8c00', copper: '#b87333', bg: '#0a0a0f', dim: 'rgba(255,140,0,0.15)', glow: 'rgba(255,140,0,0.4)' };

  // === INJECT STYLES ===
  function injectStyles() {
    const s = document.createElement('style');
    s.textContent = `
      .dv-hero{position:relative;width:100%;height:320px;overflow:hidden;border-bottom:1px solid ${C.dim};margin-bottom:24px}
      .dv-hero canvas{position:absolute;top:0;left:0;width:100%;height:100%}
      .dv-hero-overlay{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:2;background:linear-gradient(180deg,rgba(10,10,15,0.4) 0%,rgba(10,10,15,0.15) 50%,rgba(10,10,15,0.6) 100%)}
      .dv-hero-overlay h1{font-family:'JetBrains Mono',monospace;font-size:clamp(1.4rem,3vw,2.4rem);color:${C.orange};text-shadow:0 0 40px ${C.glow};letter-spacing:6px;text-transform:uppercase;margin:0}
      .dv-hero-overlay .sub{font-family:'JetBrains Mono',monospace;font-size:0.75rem;color:${C.copper};letter-spacing:8px;margin-top:6px;opacity:0.7}
      .dv-scan{position:absolute;top:0;left:0;right:0;bottom:0;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,140,0,0.015) 3px,rgba(255,140,0,0.015) 6px);pointer-events:none;z-index:3}
      .dv-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;padding:16px 24px;margin:20px 0}
      .dv-cell{position:relative;height:180px;border-radius:6px;overflow:hidden;border:1px solid ${C.dim};background:${C.bg};cursor:pointer;transition:all .4s}
      .dv-cell:hover{border-color:${C.orange};box-shadow:0 0 24px rgba(255,140,0,0.12)}
      .dv-cell canvas{width:100%;height:100%}
      .dv-cell .lbl{position:absolute;bottom:0;left:0;right:0;padding:12px 14px;background:linear-gradient(transparent,rgba(10,10,15,0.95));font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:${C.orange};letter-spacing:2px;text-transform:uppercase;z-index:2}
      .dv-cell .lbl span{display:block;color:${C.copper};font-size:0.6rem;margin-top:3px;opacity:0.6}
      .dv-panel{position:relative;margin:20px 24px;border-radius:6px;overflow:hidden;border:1px solid ${C.dim};background:${C.bg}}
      .dv-panel canvas{width:100%;height:160px;display:block}
      .dv-panel .pc{padding:16px 20px;position:relative}
      .dv-panel .pc::before{content:'';position:absolute;top:0;left:20px;right:20px;height:1px;background:linear-gradient(90deg,transparent,${C.orange},transparent)}
      .dv-panel h3{color:${C.orange};font-family:'JetBrains Mono',monospace;font-size:0.8rem;letter-spacing:3px;margin:0 0 6px}
      .dv-panel p{color:#666;font-family:'JetBrains Mono',monospace;font-size:0.7rem;margin:0;line-height:1.5}
      .dv-divider{width:100%;height:80px;position:relative;margin:32px 0;overflow:hidden}
      .dv-divider canvas{width:100%;height:100%}
      .dv-divider::after{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(90deg,${C.bg} 0%,transparent 15%,transparent 85%,${C.bg} 100%)}
      .dv-ambient{position:fixed;top:0;left:0;right:0;bottom:0;z-index:-1;pointer-events:none}
      .dv-ambient canvas{width:100%;height:100%;opacity:0.04}
      .dv-avatar{position:fixed;bottom:90px;right:24px;width:52px;height:52px;z-index:9998;cursor:pointer;filter:drop-shadow(0 0 10px ${C.glow});animation:avp 3s ease-in-out infinite;transition:transform .3s}
      .dv-avatar:hover{transform:scale(1.15)}
      @keyframes avp{0%,100%{filter:drop-shadow(0 0 10px ${C.glow})}50%{filter:drop-shadow(0 0 20px rgba(255,140,0,0.7))}}
    `;
    document.head.appendChild(s);
  }

  // === CANVAS RENDERERS ===
  function makeCanvas(w, h) {
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    return cv;
  }

  // 1. PARTICLE NETWORK - connected nodes floating in space
  function drawParticleNetwork(cv, opts) {
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    const count = opts.count || 60;
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4, r: Math.random()*2+1 });
    }
    function frame() {
      ctx.fillStyle = 'rgba(10,10,15,0.12)';
      ctx.fillRect(0,0,W,H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x<0||p.x>W) p.vx*=-1;
        if (p.y<0||p.y>H) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = C.orange; ctx.globalAlpha=0.7; ctx.fill(); ctx.globalAlpha=1;
      });
      for (let i=0;i<particles.length;i++) {
        for (let j=i+1;j<particles.length;j++) {
          const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
          const dist=Math.sqrt(dx*dx+dy*dy);
          if (dist<120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y);
            ctx.strokeStyle=C.orange; ctx.globalAlpha=0.15*(1-dist/120); ctx.lineWidth=0.5; ctx.stroke(); ctx.globalAlpha=1;
          }
        }
      }
      requestAnimationFrame(frame);
    }
    ctx.fillStyle=C.bg; ctx.fillRect(0,0,W,H);
    frame();
  }

  // 2. RADAR SWEEP
  function drawRadar(cv) {
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    const cx = W/2, cy = H/2, radius = Math.min(W,H)*0.42;
    let angle = 0;
    const blips = Array.from({length:8},()=>({a:Math.random()*Math.PI*2,d:Math.random()*0.8+0.1,pulse:0}));
    function frame() {
      ctx.fillStyle='rgba(10,10,15,0.08)'; ctx.fillRect(0,0,W,H);
      // rings
      for (let r=1;r<=4;r++) {
        ctx.beginPath(); ctx.arc(cx,cy,radius*r/4,0,Math.PI*2);
        ctx.strokeStyle=C.dim; ctx.lineWidth=0.5; ctx.stroke();
      }
      // crosshairs
      ctx.beginPath(); ctx.moveTo(cx-radius,cy); ctx.lineTo(cx+radius,cy);
      ctx.moveTo(cx,cy-radius); ctx.lineTo(cx,cy+radius);
      ctx.strokeStyle='rgba(255,140,0,0.08)'; ctx.lineWidth=0.5; ctx.stroke();
      // sweep
      const grad = ctx.createConicalGradient ? null : null;
      ctx.beginPath(); ctx.moveTo(cx,cy);
      ctx.arc(cx,cy,radius,angle-0.5,angle);
      ctx.closePath();
      const g = ctx.createRadialGradient(cx,cy,0,cx,cy,radius);
      g.addColorStop(0,'rgba(255,140,0,0.3)'); g.addColorStop(1,'rgba(255,140,0,0)');
      ctx.fillStyle=g; ctx.fill();
      // sweep line
      ctx.beginPath(); ctx.moveTo(cx,cy);
      ctx.lineTo(cx+Math.cos(angle)*radius,cy+Math.sin(angle)*radius);
      ctx.strokeStyle=C.orange; ctx.globalAlpha=0.6; ctx.lineWidth=1.5; ctx.stroke(); ctx.globalAlpha=1;
      // blips
      blips.forEach(b => {
        const bx=cx+Math.cos(b.a)*b.d*radius, by=cy+Math.sin(b.a)*b.d*radius;
        const diff=Math.abs(((angle%(Math.PI*2))-(b.a%(Math.PI*2))+Math.PI*2)%(Math.PI*2));
        if(diff<0.3) b.pulse=1;
        if(b.pulse>0) {
          ctx.beginPath(); ctx.arc(bx,by,3*b.pulse,0,Math.PI*2);
          ctx.fillStyle=C.orange; ctx.globalAlpha=b.pulse*0.8; ctx.fill(); ctx.globalAlpha=1;
          b.pulse-=0.015;
        }
      });
      angle+=0.02;
      requestAnimationFrame(frame);
    }
    ctx.fillStyle=C.bg; ctx.fillRect(0,0,W,H);
    frame();
  }

  // 3. TOPOGRAPHIC CONTOUR MAP
  function drawTopo(cv) {
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    ctx.fillStyle=C.bg; ctx.fillRect(0,0,W,H);
    // Generate height field from sine waves
    const centers = Array.from({length:4},()=>({x:Math.random()*W,y:Math.random()*H,s:Math.random()*80+40}));
    function heightAt(x,y) {
      let h=0;
      centers.forEach(c => { const d=Math.sqrt((x-c.x)**2+(y-c.y)**2); h+=c.s*Math.exp(-d*d/(c.s*c.s*2)); });
      return h;
    }
    // Draw contour lines
    for (let level=10;level<100;level+=8) {
      ctx.beginPath();
      for (let x=0;x<W;x+=3) {
        for (let y=0;y<H;y+=3) {
          const h=heightAt(x,y);
          if (Math.abs(h-level)<2) {
            ctx.rect(x,y,1,1);
          }
        }
      }
      ctx.fillStyle=C.orange;
      ctx.globalAlpha=0.12+level*0.002;
      ctx.fill();
      ctx.globalAlpha=1;
    }
    // Animated scan line
    let scanY=0;
    function animate() {
      ctx.fillStyle='rgba(10,10,15,0.03)'; ctx.fillRect(0,scanY-1,W,3);
      ctx.fillStyle=C.orange; ctx.globalAlpha=0.1;
      ctx.fillRect(0,scanY,W,1); ctx.globalAlpha=1;
      scanY=(scanY+0.5)%H;
      requestAnimationFrame(animate);
    }
    animate();
  }

  // 4. SIGNAL WAVEFORM
  function drawWaveform(cv) {
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    let t=0;
    function frame() {
      ctx.fillStyle='rgba(10,10,15,0.15)'; ctx.fillRect(0,0,W,H);
      // Grid
      ctx.strokeStyle='rgba(255,140,0,0.04)'; ctx.lineWidth=0.5;
      for(let x=0;x<W;x+=30){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=20){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      // Waveforms
      [0.3,0.5,0.7].forEach((yRatio,idx) => {
        ctx.beginPath();
        const baseY=H*yRatio;
        for(let x=0;x<W;x++) {
          const val=Math.sin(x*0.03+t*(1+idx*0.3))*15*Math.sin(x*0.007+t*0.1)+Math.sin(x*0.05+t*2)*5;
          const y=baseY+val;
          x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
        }
        ctx.strokeStyle=C.orange;
        ctx.globalAlpha=0.4-idx*0.1;
        ctx.lineWidth=1.2-idx*0.3;
        ctx.stroke();
        ctx.globalAlpha=1;
      });
      t+=0.03;
      requestAnimationFrame(frame);
    }
    ctx.fillStyle=C.bg; ctx.fillRect(0,0,W,H);
    frame();
  }

  // 5. DATA CONSTELLATION
  function drawConstellation(cv) {
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    const nodes=Array.from({length:20},()=>({x:Math.random()*W,y:Math.random()*H,s:Math.random()*4+2,phase:Math.random()*Math.PI*2}));
    // Pre-compute edges (MST-like)
    const edges=[];
    nodes.forEach((n,i) => {
      let minD=Infinity,minJ=-1;
      nodes.forEach((m,j) => { if(i!==j){const d=Math.hypot(n.x-m.x,n.y-m.y);if(d<minD){minD=d;minJ=j;}} });
      if(minJ>=0) edges.push([i,minJ]);
    });
    let t=0;
    function frame() {
      ctx.fillStyle='rgba(10,10,15,0.06)'; ctx.fillRect(0,0,W,H);
      edges.forEach(([i,j]) => {
        ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y);
        ctx.strokeStyle=C.orange; ctx.globalAlpha=0.1; ctx.lineWidth=0.5; ctx.stroke(); ctx.globalAlpha=1;
      });
      nodes.forEach(n => {
        const pulse=Math.sin(t+n.phase)*0.3+0.7;
        ctx.beginPath(); ctx.arc(n.x,n.y,n.s*pulse,0,Math.PI*2);
        ctx.fillStyle=C.orange; ctx.globalAlpha=0.5*pulse; ctx.fill();
        ctx.globalAlpha=0.1; ctx.beginPath(); ctx.arc(n.x,n.y,n.s*2*pulse,0,Math.PI*2); ctx.fill();
        ctx.globalAlpha=1;
      });
      t+=0.02;
      requestAnimationFrame(frame);
    }
    ctx.fillStyle=C.bg; ctx.fillRect(0,0,W,H);
    frame();
  }

  // 6. HEX GRID
  function drawHexGrid(cv) {
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    ctx.fillStyle=C.bg; ctx.fillRect(0,0,W,H);
    const size=18;
    const h=size*Math.sqrt(3);
    let t=0;
    function frame() {
      ctx.fillStyle='rgba(10,10,15,0.04)'; ctx.fillRect(0,0,W,H);
      for(let row=0;row<H/h+1;row++) {
        for(let col=0;col<W/(size*3)+1;col++) {
          const x=col*size*3+(row%2)*size*1.5;
          const y=row*h*0.5;
          const dist=Math.hypot(x-W/2,y-H/2);
          const wave=Math.sin(dist*0.02-t)*0.5+0.5;
          ctx.beginPath();
          for(let a=0;a<6;a++) {
            const angle=Math.PI/3*a-Math.PI/6;
            const px=x+Math.cos(angle)*size*0.9;
            const py=y+Math.sin(angle)*size*0.9;
            a===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
          }
          ctx.closePath();
          ctx.strokeStyle=C.orange;
          ctx.globalAlpha=0.06+wave*0.12;
          ctx.lineWidth=0.5;
          ctx.stroke();
          ctx.globalAlpha=1;
        }
      }
      t+=0.015;
      requestAnimationFrame(frame);
    }
    frame();
  }

  // === RENDERER REGISTRY ===
  const RENDERERS = [drawParticleNetwork, drawRadar, drawTopo, drawWaveform, drawConstellation, drawHexGrid];

  // === PAGE CONTEXT ===
  function getCtx() {
    const p = window.location.pathname.toLowerCase();
    if (p.includes('hub')||p.endsWith('/')) return {t:'DUNSONATOR // COMMAND HUB',s:'PROCEDURAL INTELLIGENCE LAYER',r:0};
    if (p.includes('rpa')) return {t:'RPA CONTROL CENTER',s:'AUTONOMOUS ORCHESTRATION GRID',r:1};
    if (p.includes('command')) return {t:'COMMAND CENTER',s:'REAL-TIME SIGNAL OPERATIONS',r:2};
    if (p.includes('prospect')) return {t:'PROSPECTING PIPELINE',s:'TARGET ACQUISITION SYSTEM',r:3};
    if (p.includes('intelligence')) return {t:'INTELLIGENCE MATRIX',s:'DEEP SIGNAL ANALYSIS',r:4};
    if (p.includes('index')) return {t:'DUNSONATOR HQ',s:'ENTERPRISE AI OPERATIONS',r:5};
    return {t:'DUNSONATOR',s:'SIGNAL HUNTER ACTIVE',r:0};
  }

  // === BUILD HERO ===
  function buildHero() {
    const ctx = getCtx();
    const el = document.createElement('div');
    el.className = 'dv-hero';
    const cv = makeCanvas(1200, 400);
    el.appendChild(cv);
    el.insertAdjacentHTML('beforeend', `<div class="dv-hero-overlay"><h1>${ctx.t}</h1><div class="sub">${ctx.s}</div></div><div class="dv-scan"></div>`;
    const nav = document.querySelector('nav, .navbar, header, .top-bar');
    if (nav) nav.parentNode.insertBefore(el, nav.nextSibling);
    else document.body.insertBefore(el, document.body.firstChild);
    // Use particle network for hero - always impressive
    drawParticleNetwork(cv, {count:80});
  }

  // === BUILD VIZ GRID ===
  function buildGrid() {
    const labels = [
      {t:'SIGNAL INTERCEPT',s:'Real-time pattern capture',r:drawWaveform},
      {t:'NEURAL MESH',s:'AI decision topology',r:drawConstellation},
      {t:'THREAT RADAR',s:'360 perimeter sweep',r:drawRadar},
      {t:'TERRAIN MAP',s:'Account landscape contours',r:drawTopo},
      {t:'HEX LATTICE',s:'Distributed node grid',r:drawHexGrid},
      {t:'PARTICLE FIELD',s:'Data flow visualization',r:function(cv){drawParticleNetwork(cv,{count:35})}},
    ];
    const grid = document.createElement('div');
    grid.className = 'dv-grid';
    labels.forEach(l => {
      const cell = document.createElement('div');
      cell.className = 'dv-cell';
      const cv = makeCanvas(520, 360);
      cell.appendChild(cv);
      cell.insertAdjacentHTML('beforeend', `<div class="lbl">${l.t}<span>${l.s}</span></div>`;
      grid.appendChild(cell);
      l.r(cv);
    });
    const hero = document.querySelector('.dv-hero');
    const target = document.querySelector('.grid, .cards, .dashboard, main, .content');
    if (target) target.parentNode.insertBefore(grid, target);
    else if (hero) hero.parentNode.insertBefore(grid, hero.nextSibling);
  }

  // === BUILD PANELS ===
  function buildPanels() {
    const panels = [
      {t:'SIGNAL INTERCEPT MODE',d:'Monitoring 847 active endpoints. Threat level: ELEVATED. Signal-to-noise ratio: 94.7%.',r:drawWaveform},
      {t:'PERIMETER DEFENSE',d:'12 high-value targets identified. RPA bots deployed across 6 intelligence verticals.',r:drawRadar},
    ];
    const secs = document.querySelectorAll('section, .section, .card-grid, .widget, [class*="grid"]');
    panels.forEach((p,i) => {
      const el = document.createElement('div');
      el.className = 'dv-panel';
      const cv = makeCanvas(800, 200);
      el.appendChild(cv);
      el.insertAdjacentHTML('beforeend', `<div class="pc"><h3>${p.t}</h3><p>${p.d}</p></div>`;
      if (secs[i*2]) secs[i*2].parentNode.insertBefore(el, secs[i*2].nextSibling);
      p.r(cv);
    });
  }

  // === BUILD DIVIDERS ===
  function buildDividers() {
    const secs = document.querySelectorAll('section, .section, [class*="grid"]');
    let n=0;
    secs.forEach((s,i) => {
      if (i%3===1&&n<2) {
        const d = document.createElement('div');
        d.className = 'dv-divider';
        const cv = makeCanvas(1200, 100);
        d.appendChild(cv);
        s.parentNode.insertBefore(d, s);
        drawWaveform(cv);
        n++;
      }
    });
  }

  // === AMBIENT BG ===
  function addAmbient() {
    const el = document.createElement('div');
    el.className = 'dv-ambient';
    const cv = makeCanvas(800, 600);
    el.appendChild(cv);
    document.body.appendChild(el);
    drawHexGrid(cv);
  }

  // === AVATAR ===
  function addAvatar() {
    const p = window.location.pathname;
    const pre = p.includes('/intelligence/') ? '../assets/' : 'assets/';
    const img = document.createElement('img');
    img.className = 'dv-avatar';
    img.src = pre + 'dunsonator-avatar.svg';
    img.alt = 'DUNSONATOR';
    img.title = 'DUNSONATOR // Signal Hunter';
    img.onclick = () => { const b=document.querySelector('.duns-chat-toggle, #dunsonator-chat-toggle'); if(b)b.click(); };
    document.body.appendChild(img);
  }

  // === INIT ===
  function init() {
    injectStyles();
    buildHero();
    buildGrid();
    buildPanels();
    buildDividers();
    addAmbient();
    addAvatar();
    console.log('[DUNSONATOR] Procedural visual system v3.0 deployed. Zero stock photos.');
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
