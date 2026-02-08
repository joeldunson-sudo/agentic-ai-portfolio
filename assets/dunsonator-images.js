/* DUNSONATOR PROCEDURAL VISUAL SYSTEM v4.0 - Zero stock photos */
(function(){
var O='#ff8c00',CP='#b87333',BG='#0a0a0f';
function addCSS(){
var s=document.createElement('style');
s.textContent=[
'.dv-hero{position:relative;width:100%;height:320px;overflow:hidden;border-bottom:2px solid rgba(255,140,0,0.3);margin-bottom:24px}',
'.dv-hero canvas{position:absolute;top:0;left:0;width:100%;height:100%}',
'.dv-ho{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:2;background:linear-gradient(180deg,rgba(10,10,15,0.3),rgba(10,10,15,0.1) 50%,rgba(10,10,15,0.5))}',
'.dv-ho h1{font-family:"JetBrains Mono",monospace;font-size:clamp(1.4rem,3vw,2.4rem);color:#ff8c00;text-shadow:0 0 40px rgba(255,140,0,0.6);letter-spacing:6px;text-transform:uppercase;margin:0}',
'.dv-ho .sub{font-family:"JetBrains Mono",monospace;font-size:0.75rem;color:#b87333;letter-spacing:8px;margin-top:6px;opacity:0.7}',
'.dv-scan{position:absolute;top:0;left:0;right:0;bottom:0;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,140,0,0.02) 3px,rgba(255,140,0,0.02) 6px);pointer-events:none;z-index:3}',
'.dv-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;padding:16px 24px;margin:20px 0}',
'.dv-c{position:relative;height:180px;border-radius:6px;overflow:hidden;border:1px solid rgba(255,140,0,0.2);background:#0a0a0f;cursor:pointer;transition:all .4s}',
'.dv-c:hover{border-color:#ff8c00;box-shadow:0 0 20px rgba(255,140,0,0.15)}',
'.dv-c canvas{width:100%;height:100%}',
'.dv-c .lb{position:absolute;bottom:0;left:0;right:0;padding:12px;background:linear-gradient(transparent,rgba(10,10,15,0.95));font-family:"JetBrains Mono",monospace;font-size:0.7rem;color:#ff8c00;letter-spacing:2px;text-transform:uppercase;z-index:2}',
'.dv-c .lb span{display:block;color:#b87333;font-size:0.6rem;margin-top:3px;opacity:0.6}',
'.dv-p{position:relative;margin:20px 24px;border-radius:6px;overflow:hidden;border:1px solid rgba(255,140,0,0.15);background:#0a0a0f}',
'.dv-p canvas{width:100%;height:160px;display:block}',
'.dv-p .pc{padding:16px 20px}',
'.dv-p h3{color:#ff8c00;font-family:"JetBrains Mono",monospace;font-size:0.8rem;letter-spacing:3px;margin:0 0 6px}',
'.dv-p p{color:#666;font-family:"JetBrains Mono",monospace;font-size:0.7rem;margin:0;line-height:1.5}',
'.dv-av{position:fixed;bottom:90px;right:24px;width:52px;height:52px;z-index:9998;cursor:pointer;filter:drop-shadow(0 0 10px rgba(255,140,0,0.5));animation:avp 3s ease-in-out infinite}',
'.dv-av:hover{transform:scale(1.15)}',
'@keyframes avp{0%,100%{filter:drop-shadow(0 0 10px rgba(255,140,0,0.5))}50%{filter:drop-shadow(0 0 20px rgba(255,140,0,0.7))}}'
].join('\n');
document.head.appendChild(s);
}
function sizeCanvas(cv,el){var r=el.getBoundingClientRect();cv.width=r.width||600;cv.height=r.height||300;return cv;}
// PARTICLE NETWORK
function drawNet(cv){
var x=cv.getContext('2d'),W=cv.width,H=cv.height,ps=[];
for(var i=0;i<50;i++)ps.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.6,vy:(Math.random()-.5)*.6,r:Math.random()*2.5+1});
(function f(){x.fillStyle='rgba(10,10,15,0.1)';x.fillRect(0,0,W,H);
ps.forEach(function(p){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
x.beginPath();x.arc(p.x,p.y,p.r,0,6.28);x.fillStyle=O;x.globalAlpha=.9;x.fill();x.globalAlpha=1;});
for(var i=0;i<ps.length;i++)for(var j=i+1;j<ps.length;j++){var d=Math.hypot(ps[i].x-ps[j].x,ps[i].y-ps[j].y);if(d<130){x.beginPath();x.moveTo(ps[i].x,ps[i].y);x.lineTo(ps[j].x,ps[j].y);x.strokeStyle=O;x.globalAlpha=.3*(1-d/130);x.lineWidth=.8;x.stroke();x.globalAlpha=1;}}
requestAnimationFrame(f);})();}
// RADAR
function drawRadar(cv){
var x=cv.getContext('2d'),W=cv.width,H=cv.height,cx=W/2,cy=H/2,R=Math.min(W,H)*.42,a=0;
var bl=[];for(var i=0;i<8;i++)bl.push({a:Math.random()*6.28,d:Math.random()*.8+.1,p:0});
(function f(){x.fillStyle='rgba(10,10,15,0.06)';x.fillRect(0,0,W,H);
for(var r=1;r<=4;r++){x.beginPath();x.arc(cx,cy,R*r/4,0,6.28);x.strokeStyle='rgba(255,140,0,0.15)';x.lineWidth=.5;x.stroke();}
x.beginPath();x.moveTo(cx-R,cy);x.lineTo(cx+R,cy);x.moveTo(cx,cy-R);x.lineTo(cx,cy+R);x.strokeStyle='rgba(255,140,0,0.1)';x.stroke();
x.beginPath();x.moveTo(cx,cy);x.arc(cx,cy,R,a-.4,a);x.closePath();
var g=x.createRadialGradient(cx,cy,0,cx,cy,R);g.addColorStop(0,'rgba(255,140,0,0.4)');g.addColorStop(1,'rgba(255,140,0,0)');x.fillStyle=g;x.fill();
x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);x.strokeStyle=O;x.globalAlpha=.8;x.lineWidth=2;x.stroke();x.globalAlpha=1;
bl.forEach(function(b){var bx=cx+Math.cos(b.a)*b.d*R,by=cy+Math.sin(b.a)*b.d*R;var diff=Math.abs(((a%(6.28))-(b.a%(6.28))+6.28)%6.28);if(diff<.3)b.p=1;if(b.p>0){x.beginPath();x.arc(bx,by,4*b.p,0,6.28);x.fillStyle=O;x.globalAlpha=b.p;x.fill();x.globalAlpha=1;b.p-=.012;}});
a+=.02;requestAnimationFrame(f);})();}
// WAVEFORM
function drawWave(cv){
var x=cv.getContext('2d'),W=cv.width,H=cv.height,t=0;
(function f(){x.fillStyle='rgba(10,10,15,0.12)';x.fillRect(0,0,W,H);
x.strokeStyle='rgba(255,140,0,0.06)';x.lineWidth=.5;
for(var i=0;i<W;i+=30){x.beginPath();x.moveTo(i,0);x.lineTo(i,H);x.stroke();}
for(var i=0;i<H;i+=20){x.beginPath();x.moveTo(0,i);x.lineTo(W,i);x.stroke();}
[.3,.5,.7].forEach(function(yr,idx){
x.beginPath();var by=H*yr;
for(var i=0;i<W;i++){var v=Math.sin(i*.03+t*(1+idx*.3))*20*Math.sin(i*.007+t*.1)+Math.sin(i*.05+t*2)*8;i===0?x.moveTo(i,by+v):x.lineTo(i,by+v);}
x.strokeStyle=O;x.globalAlpha=.6-idx*.15;x.lineWidth=1.5-idx*.3;x.stroke();x.globalAlpha=1;});
t+=.03;requestAnimationFrame(f);})();}
// CONSTELLATION
function drawStar(cv){
var x=cv.getContext('2d'),W=cv.width,H=cv.height;
var ns=[];for(var i=0;i<25;i++)ns.push({x:Math.random()*W,y:Math.random()*H,s:Math.random()*4+2,ph:Math.random()*6.28});
var eds=[];ns.forEach(function(n,i){var md=9999,mj=-1;ns.forEach(function(m,j){if(i!==j){var d=Math.hypot(n.x-m.x,n.y-m.y);if(d<md){md=d;mj=j;}}});if(mj>=0)eds.push([i,mj]);});
var t=0;
(function f(){x.fillStyle='rgba(10,10,15,0.05)';x.fillRect(0,0,W,H);
eds.forEach(function(e){x.beginPath();x.moveTo(ns[e[0]].x,ns[e[0]].y);x.lineTo(ns[e[1]].x,ns[e[1]].y);x.strokeStyle=O;x.globalAlpha=.15;x.lineWidth=.6;x.stroke();x.globalAlpha=1;});
ns.forEach(function(n){var p=Math.sin(t+n.ph)*.3+.7;
x.beginPath();x.arc(n.x,n.y,n.s*p,0,6.28);x.fillStyle=O;x.globalAlpha=.7*p;x.fill();
x.globalAlpha=.15;x.beginPath();x.arc(n.x,n.y,n.s*2.5*p,0,6.28);x.fill();x.globalAlpha=1;});
t+=.02;requestAnimationFrame(f);})();}
// TOPO
function drawTopo(cv){
var x=cv.getContext('2d'),W=cv.width,H=cv.height;
x.fillStyle=BG;x.fillRect(0,0,W,H);
var cs=[];for(var i=0;i<4;i++)cs.push({x:Math.random()*W,y:Math.random()*H,s:Math.random()*80+40});
function hAt(px,py){var h=0;cs.forEach(function(c){var d=Math.sqrt(Math.pow(px-c.x,2)+Math.pow(py-c.y,2));h+=c.s*Math.exp(-d*d/(c.s*c.s*2));});return h;}
for(var lv=10;lv<100;lv+=6){
x.beginPath();
for(var px=0;px<W;px+=2)for(var py=0;py<H;py+=2){if(Math.abs(hAt(px,py)-lv)<1.5)x.rect(px,py,1.5,1.5);}
x.fillStyle=O;x.globalAlpha=.15+lv*.003;x.fill();x.globalAlpha=1;}
var sy=0;
(function f(){x.fillStyle='rgba(10,10,15,0.02)';x.fillRect(0,sy-1,W,3);
x.fillStyle=O;x.globalAlpha=.15;x.fillRect(0,sy,W,1);x.globalAlpha=1;
sy=(sy+.5)%H;requestAnimationFrame(f);})();}
// HEX GRID
function drawHex(cv){
var x=cv.getContext('2d'),W=cv.width,H=cv.height,sz=20,h=sz*1.732,t=0;
(function f(){x.fillStyle='rgba(10,10,15,0.04)';x.fillRect(0,0,W,H);
for(var row=0;row<H/h+1;row++)for(var col=0;col<W/(sz*3)+1;col++){
var px=col*sz*3+(row%2)*sz*1.5,py=row*h*.5;
var d=Math.hypot(px-W/2,py-H/2),w=Math.sin(d*.02-t)*.5+.5;
x.beginPath();
for(var a=0;a<6;a++){var an=Math.PI/3*a-Math.PI/6;var hx=px+Math.cos(an)*sz*.9,hy=py+Math.sin(an)*sz*.9;a===0?x.moveTo(hx,hy):x.lineTo(hx,hy);}
x.closePath();x.strokeStyle=O;x.globalAlpha=.08+w*.18;x.lineWidth=.6;x.stroke();x.globalAlpha=1;}
t+=.015;requestAnimationFrame(f);})();}
// PAGE CONTEXT
function getCtx(){
var p=location.pathname.toLowerCase();
if(p.indexOf('hub')>-1||p.endsWith('/'))return{t:'DUNSONATOR // COMMAND HUB',s:'PROCEDURAL INTELLIGENCE LAYER'};
if(p.indexOf('rpa')>-1)return{t:'RPA CONTROL CENTER',s:'AUTONOMOUS ORCHESTRATION GRID'};
if(p.indexOf('command')>-1)return{t:'COMMAND CENTER',s:'REAL-TIME SIGNAL OPERATIONS'};
if(p.indexOf('prospect')>-1)return{t:'PROSPECTING PIPELINE',s:'TARGET ACQUISITION SYSTEM'};
if(p.indexOf('intelligence')>-1)return{t:'INTELLIGENCE MATRIX',s:'DEEP SIGNAL ANALYSIS'};
if(p.indexOf('index')>-1)return{t:'DUNSONATOR HQ',s:'ENTERPRISE AI OPERATIONS'};
return{t:'DUNSONATOR',s:'SIGNAL HUNTER ACTIVE'};}
// BUILD HERO
function buildHero(){
var c=getCtx(),el=document.createElement('div');el.className='dv-hero';
var cv=document.createElement('canvas');el.appendChild(cv);
var ov=document.createElement('div');ov.className='dv-ho';
ov.innerHTML='<h1>'+c.t+'</h1><div class="sub">'+c.s+'</div>';
el.appendChild(ov);
var sc=document.createElement('div');sc.className='dv-scan';el.appendChild(sc);
var nav=document.querySelector('nav,.navbar,header,.top-bar');
if(nav)nav.parentNode.insertBefore(el,nav.nextSibling);
else document.body.insertBefore(el,document.body.firstChild);
setTimeout(function(){sizeCanvas(cv,el);drawNet(cv);},50);}
// BUILD GRID
function buildGrid(){
var items=[{t:'SIGNAL INTERCEPT',s:'Real-time pattern capture',r:drawWave},{t:'NEURAL MESH',s:'AI decision topology',r:drawStar},{t:'THREAT RADAR',s:'360 perimeter sweep',r:drawRadar},{t:'TERRAIN MAP',s:'Account landscape contours',r:drawTopo},{t:'HEX LATTICE',s:'Distributed node grid',r:drawHex},{t:'PARTICLE FIELD',s:'Data flow visualization',r:drawNet}];
var g=document.createElement('div');g.className='dv-g';
items.forEach(function(it){
var d=document.createElement('div');d.className='dv-c';
var cv=document.createElement('canvas');d.appendChild(cv);
var lb=document.createElement('div');lb.className='lb';lb.innerHTML=it.t+'<span>'+it.s+'</span>';d.appendChild(lb);
g.appendChild(d);
setTimeout(function(){sizeCanvas(cv,d);it.r(cv);},100);
});
var hero=document.querySelector('.dv-hero');
var tg=document.querySelector('.grid,.cards,.dashboard,main,.content');
if(tg)tg.parentNode.insertBefore(g,tg);
else if(hero)hero.parentNode.insertBefore(g,hero.nextSibling);}
// BUILD PANELS
function buildPanels(){
var ps=[{t:'SIGNAL INTERCEPT MODE',d:'Monitoring 847 active endpoints. Threat level: ELEVATED. Signal-to-noise: 94.7%.',r:drawWave},{t:'PERIMETER DEFENSE',d:'12 high-value targets identified. RPA bots deployed across 6 intelligence verticals.',r:drawRadar}];
var secs=document.querySelectorAll('section,.section,.card-grid,.widget,[class*=grid]');
ps.forEach(function(p,i){
var el=document.createElement('div');el.className='dv-p';
var cv=document.createElement('canvas');el.appendChild(cv);
var pc=document.createElement('div');pc.className='pc';pc.innerHTML='<h3>'+p.t+'</h3><p>'+p.d+'</p>';el.appendChild(pc);
if(secs[i*2])secs[i*2].parentNode.insertBefore(el,secs[i*2].nextSibling);
setTimeout(function(){sizeCanvas(cv,el);p.r(cv);},150);
});}
// AVATAR
function addAvatar(){
var p=location.pathname,pre=p.indexOf('/intelligence/')>-1?'../assets/':'assets/';
var img=document.createElement('img');img.className='dv-av';img.src=pre+'dunsonator-avatar.svg';img.alt='DUNSONATOR';img.title='DUNSONATOR // Signal Hunter';
img.onclick=function(){var b=document.querySelector('.duns-chat-toggle,#dunsonator-chat-toggle');if(b)b.click();};
document.body.appendChild(img);}
// INIT
function init(){addCSS();buildHero();buildGrid();buildPanels();addAvatar();console.log('[DUNSONATOR] Procedural v4.0 deployed');}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
