(function(){
"use strict";
var d=document.documentElement;
if(d.hasAttribute("data-fb")){if(window.top===window.self){d.classList.add("ok")}else{try{window.top.location=window.self.location}catch(e){}return}}
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

/* THEME */
function stored(){try{return localStorage.getItem('theme')}catch(e){return null}}
const mq=window.matchMedia('(prefers-color-scheme: dark)');
d.setAttribute('data-theme',stored()||(mq.matches?'dark':'light'));
const tg=$('#tgl'); if(tg)tg.addEventListener('click',()=>{const n=d.getAttribute('data-theme')==='dark'?'light':'dark';d.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}});

/* MOBILE MENU */
const mb=$('#mbtn'),mm=$('#mmenu');
function setMenu(o){document.body.classList.toggle('menu-open',o);mb.querySelector('path').setAttribute('d',o?'M6 6l12 12M18 6L6 18':'M4 9h16M4 15h16');mb.setAttribute('aria-label',o?'Close menu':'Open menu');mb.setAttribute('aria-expanded',o);mm.setAttribute('aria-hidden',!o)}
if(mb&&mm){mb.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));$$('#mmenu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));}

/* NAV FLYOUTS (touch + keyboard) */
$$('.links>.it>button').forEach(b=>b.addEventListener('click',e=>{const it=b.parentElement,o=!it.classList.contains('open');$$('.links>.it').forEach(x=>x.classList.remove('open'));it.classList.toggle('open',o);b.setAttribute('aria-expanded',o)}));
document.addEventListener('click',e=>{if(!e.target.closest('.links'))$$('.links>.it').forEach(x=>x.classList.remove('open'))});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$$('.links>.it').forEach(x=>x.classList.remove('open'));if(document.activeElement)document.activeElement.blur()}});

/* ICONS */
let gid=0;
const IC={
gm:`<rect width="100" height="100" fill="url(#G)"/><g><circle cx="50" cy="22" r="11" fill="#f7f2d6"/><circle cx="77" cy="42" r="11" fill="#4a90e2"/><circle cx="67" cy="73" r="11" fill="#4b4350"/><circle cx="33" cy="73" r="11" fill="#e8583a"/><circle cx="23" cy="42" r="11" fill="#41a363"/><circle cx="50" cy="50" r="9" fill="#fff" opacity=".9"/></g>`,
lifestream:`<rect width="100" height="100" fill="url(#G)"/><path d="M20 62C34 28 52 78 80 36" stroke="#b8fff0" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M20 78C36 50 54 92 80 56" stroke="#43e0c0" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/><circle cx="50" cy="26" r="9" fill="#e9fffb"/>`,
midgar:`<rect width="100" height="100" fill="url(#G)"/><circle cx="50" cy="44" r="25" fill="url(#R)"/><g fill="#021018"><rect x="0" y="76" width="100" height="24"/><rect x="8" y="66" width="10" height="12"/><rect x="24" y="60" width="8" height="18"/><rect x="68" y="62" width="9" height="16"/><rect x="82" y="68" width="10" height="10"/></g>`,
turks:`<rect width="100" height="100" fill="url(#G)"/><circle cx="50" cy="50" r="30" fill="none" stroke="#fff" stroke-width="3" opacity=".85"/><path d="M32 36h36M50 36v32" stroke="#fff" stroke-width="9" stroke-linecap="round"/>`,
materia:`<rect width="100" height="100" fill="#06100a"/><circle cx="50" cy="50" r="30" fill="url(#R)"/><ellipse cx="40" cy="38" rx="9" ry="6" fill="#fff" opacity=".55" transform="rotate(-30 40 38)"/>`,
debarrier:`<rect width="100" height="100" fill="#000"/><g style="mix-blend-mode:screen"><circle cx="50" cy="38" r="24" fill="#ff2a2a"/><circle cx="37" cy="60" r="24" fill="#22ff55" style="mix-blend-mode:screen"/><circle cx="63" cy="60" r="24" fill="#2a55ff" style="mix-blend-mode:screen"/></g>`,
jenova:`<rect width="100" height="100" fill="url(#G)"/><circle cx="50" cy="50" r="27" fill="url(#R)"/><path d="M50 18v64M18 50h64" stroke="#021a1a" stroke-width="2" opacity=".35"/>`,
glucose:`<rect width="100" height="100" fill="url(#G)"/><circle cx="50" cy="50" r="29" fill="none" stroke="#2a3040" stroke-width="9"/><path d="M50 21a29 29 0 1 1-26 16" fill="none" stroke="#5be08a" stroke-width="9" stroke-linecap="round"/><circle cx="50" cy="50" r="6" fill="#fff"/>`,
'7dtd':`<rect width="100" height="100" fill="url(#G)"/><circle cx="50" cy="38" r="22" fill="#ffb347" opacity=".9"/><path d="M26 30h48L44 80" stroke="#fff6e0" stroke-width="11" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`,
asa:`<rect width="100" height="100" fill="url(#G)"/><polygon points="50,16 80,33 80,67 50,84 20,67 20,33" fill="none" stroke="#fff3d0" stroke-width="5"/><path d="M36 66L50 32l14 34M41 54h18" stroke="#fff3d0" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
seph:`<rect width="100" height="100" fill="url(#G)"/><circle cx="68" cy="32" r="14" fill="#dfe4ef"/><path d="M18 86L82 14" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M18 86L82 14" stroke="#9aa6c4" stroke-width="10" stroke-linecap="round" opacity=".25"/>`,
ni:`<rect width="100" height="100" fill="url(#G)"/><rect x="14" y="26" width="72" height="48" rx="6" fill="none" stroke="#fff" stroke-width="4"/><path d="M30 50h40" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`,
hoh:`<rect width="100" height="100" fill="url(#G)"/><path d="M30 34h30l10 8-10 8H30z" fill="#ffe3a3"/><rect x="44" y="48" width="9" height="34" rx="3" fill="#c98a3a"/><circle cx="70" cy="30" r="5" fill="#fff6d8" opacity=".8"/>`,
karai:`<rect width="100" height="100" fill="url(#G)"/><circle cx="50" cy="50" r="30" fill="none" stroke="#e0263f" stroke-width="3" opacity=".6"/><path d="M27 76L73 24M27 24l46 52" stroke="#eef0f6" stroke-width="4.5" stroke-linecap="round"/><path d="M24 79l8-8M76 79l-8-8" stroke="#e0263f" stroke-width="8" stroke-linecap="round"/><path d="M43 50h14" stroke="#e0263f" stroke-width="5" stroke-linecap="round"/>`,
vpn:`<rect width="100" height="100" fill="url(#G)"/><path d="M50 16l28 10v22c0 18-12 30-28 36C34 78 22 66 22 48V26z" fill="#fff"/><rect x="40" y="44" width="20" height="16" rx="3" fill="#1f63e8"/><path d="M43 44v-5a7 7 0 0 1 14 0v5" fill="none" stroke="#1f63e8" stroke-width="3"/>`
};
const BG={hoh:['#5a3b16','#1c1208'],karai:['#3a0c16','#08040a'],ni:['#2338b8','#0a1460'],gm:['#6a3dff','#d238e0'],lifestream:['#02343a','#0f8f7c'],midgar:['#04101a','#0e3a4a'],turks:['#c01626','#2a0409'],materia:['#06100a','#06100a'],debarrier:['#000','#000'],jenova:['#06242a','#0e5f66'],glucose:['#181b24','#0a0c11'],'7dtd':['#3a3326','#7a4a1a'],asa:['#0d4a5a','#d99a2e'],seph:['#16161e','#05050a'],vpn:['#2d7bff','#0a2e80']};
const ORB={midgar:['#fff','#7fffd4','#13b58a','#042a30'],materia:['#fff','#9dff9d','#27b83a','#06300f'],jenova:['#fff','#7ff3ee','#19b8b0','#04282a']};
const IMG={'hoh':'icons/hoh.png','mut':'icons/mut.png','karai':'icons/karai.png','seph':'icons/seph.png','lifestream':'icons/lifestream.png','midgar':'icons/midgar.png','gm':'icons/gm.png','materia':'icons/materia.png','turks':'icons/turks.png','debarrier':'icons/debarrier.png','jenova':'icons/jenova.png','glucose':'icons/glucose.png'};
function icon(n){
  if(IMG[n])return `<img${n==='gm'||n==='seph'||n==='karai'||n==='mut'?' class="fullico"':''} src="${IMG[n]}" alt="" draggable="false">`;
  const id='g'+(++gid), [a,b]=BG[n]||['#444','#111'], o=ORB[n]||ORB.materia;
  let s=IC[n].replace(/url\(#G\)/g,`url(#${id})`).replace(/url\(#R\)/g,`url(#${id}r)`);
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><radialGradient id="${id}r" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="${o[0]}"/><stop offset=".2" stop-color="${o[1]}"/><stop offset=".55" stop-color="${o[2]}"/><stop offset="1" stop-color="${o[3]}"/></radialGradient></defs>${s}</svg>`;
}

$$('[data-icon]').forEach(el=>{el.classList.add('ico');el.innerHTML=icon(el.dataset.icon)});
const ch=$('#chain'); if(ch)ch.innerHTML=['lifestream','midgar','turks','materia','debarrier','jenova'].map((n,i)=>`${i?'<span class="ar"></span>':''}<span class="n ico">${icon(n)}</span>`).join('');

/* LINKED LOOKS: [data-follow=id] swaps its images to match a gallery's current look */
$$('[data-follow]').forEach(f=>{const src=document.getElementById(f.dataset.follow);if(!src)return;const imgs=$$('img',f),cap=$('.fcap',f);
 src.addEventListener('look',e=>{let m=imgs.find(i=>i.dataset.for===e.detail)||imgs.find(i=>'default' in i.dataset);imgs.forEach(i=>i.classList.toggle('on',i===m));if(cap&&m)cap.textContent=m.dataset.cap||''})});
/* LOOK GALLERIES */
const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
$$('[data-looks]').forEach(g=>{const imgs=$$('.lookimgs img',g),tabs=$$('.looktabs button',g);let i=0,t;
 const cp=$('.cap',g);const show=k=>{i=k;imgs.forEach((im,j)=>im.classList.toggle('on',j===k));tabs.forEach((b,j)=>b.classList.toggle('on',j===k));if(cp&&imgs[k].dataset.cap)cp.textContent=imgs[k].dataset.cap;g.dispatchEvent(new CustomEvent('look',{detail:(tabs[k]||{}).textContent||''}))};show(0);
 const auto=()=>{clearInterval(t);if(!still)t=setInterval(()=>show((i+1)%imgs.length),4200)};
 tabs.forEach(b=>b.addEventListener('click',()=>{show(+b.dataset.i);auto()}));auto();});

/* GATHERING MAGIC */
const th=h=>`<span class="ct" style="--h:${h}"></span>`;
$$('.lg .fan').forEach((f,i)=>{const s=[[8,14],[120,60]][i];if(s)f.innerHTML=s.map((h,j)=>`<span class="ct" style="--h:${h};left:${j*7}px;transform:rotate(${(j-.5)*14}deg)"></span>`).join('')});
const fl=$('#filters'); if(fl)fl.innerHTML=['Set','Color','Type','Rarity','Mana cost','Power','Toughness','Format','Rules text','Flavor text','Artist','Keyword'].map((f,i)=>`<span style="--d:${i}">${f}</span>`).join('');
const sample=[['Counterspell',215],['Sol Ring',45],['Llanowar Elves',130],['Dark Ritual',280],['Birds of Paradise',100]];
function vb(v){const b=$('#vbox');if(!b)return;b.className='vbox '+v;b.innerHTML=sample.map((s,i)=>`<div class="it" style="animation-delay:${i*50}ms">${th(s[1])}<b>${s[0]}</b></div>`).join('')}
vb('list');
$$('#vt button').forEach(b=>b.addEventListener('click',()=>{$$('#vt button').forEach(x=>x.classList.toggle('on',x===b));vb(b.dataset.v)}));
const caps=['Results appear as you type, with the card, type line, mana cost, set, rarity and price on every row.','Flip to a grid to browse by artwork. Show one tile per card, or one per printing.','Every card gets a full page: large image, prices, oracle text, keywords, legality and rulings. Arrows step through the results.','Format, set, color, type, rarity, mana value, power and toughness, all in one panel.'];
if($('#ptabs')){let cur=0,timer;
 const show=i=>{cur=i;$$('.scr').forEach(s=>s.classList.toggle('on',+s.dataset.s===i));$$('#ptabs button').forEach(b=>b.classList.toggle('on',+b.dataset.t===i));$('#pcap').textContent=caps[i]};
 show(0);const auto=()=>{clearInterval(timer);if(!still)timer=setInterval(()=>show((cur+1)%4),5200)};auto();
 $$('#ptabs button').forEach(b=>b.addEventListener('click',()=>{show(+b.dataset.t);auto()}));}

/* POSTERS */
function posters(el,list){const e=$(el);if(e)e.innerHTML=list.map(p=>`<div class="pst" style="--h:${p[1]}">${p[2]?'<u></u>':''}<b>${p[0]}</b></div>`).join('')}
posters('#midPosters',[['Night Ledger',210,1],['Harbor Lights',20,1],['Paper Moons',300,1],['The Salt Road',160,0],['Glass Winter',190,1],['Copper Sky',30,1],['Quiet Engine',260,0],['Low Tide',180,1]]);

/* REVEAL */
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pre');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -6% 0px'});
  $$('.rv').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight*.92){el.classList.add('pre');io.observe(el)}});
}
})();
