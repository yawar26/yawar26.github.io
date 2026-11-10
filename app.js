const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const langButtons=$$('.lang button');
const ticker=$('#ticker');
const nav=$('#nav');
const burger=$('#burger');

function cleanEnglish(value=''){
  return value.includes('Co-PI')?value:value.replace(/([A-Za-z])[-‐‑]([A-Za-z])/g,'$1 $2');
}
function text(obj,lang){
  const value=obj?.[lang]??obj?.en??'';
  return lang==='en'?cleanEnglish(value):value;
}

function configureResearchIdentity(){
  const heroFocus=$('h1 span[data-en][data-ko]');
  if(heroFocus){
    heroFocus.dataset.en='Video Understanding · Physical AI · Computer Vision';
    heroFocus.dataset.ko='영상 이해 · 피지컬 AI · 컴퓨터 비전';
  }
  const footerFocus=$('footer [data-en][data-ko]');
  if(footerFocus)footerFocus.remove();
  const description=$('meta[name="description"]');
  if(description)description.content='Yawar Rehman, PhD — Visiting Research Professor at Kyungpook National University. Video understanding, Physical AI, temporal action localization, computer vision, and edge AI deployment.';
  const ogDescription=$('meta[property="og:description"]');
  if(ogDescription)ogDescription.content='Video Understanding · Physical AI · Computer Vision';
}

function configureHeroBio(){
  const heroRole=$('.hero-role');
  if(heroRole){
    heroRole.dataset.en='PhD — Hanyang University, South Korea';
    heroRole.dataset.ko='박사 — 한양대학교, 대한민국';
    heroRole.textContent=heroRole.dataset.en;
  }
  $('.hero .credential')?.remove();
}

function removeTrustworthyAICopy(){
  const projectsIntro=$('#projects .sec-head p:last-child');
  if(projectsIntro){
    projectsIntro.dataset.en='Research in video understanding, point supervised temporal localization, Physical AI, and visual detection.';
    projectsIntro.dataset.ko='영상 이해, 포인트 감독 기반 시간적 위치 추정, 피지컬 AI 및 시각 객체 탐지에 관한 연구입니다.';
    projectsIntro.textContent=projectsIntro.dataset.en;
  }

  const trustworthySkill=$$('#skills .skill').find(card=>card.querySelector('h3')?.dataset.en==='Trustworthy AI');
  if(trustworthySkill)trustworthySkill.remove();

  if(window.SITE_DATA?.experience?.[0]?.summary){
    SITE_DATA.experience[0].summary.en='Research in video understanding, temporal action localization, computer vision, and Physical AI.';
    SITE_DATA.experience[0].summary.ko='영상 이해, 시간적 행동 위치 추정, 컴퓨터 비전 및 피지컬 AI를 연구하고 있습니다.';
  }
}

function configurePortrait(){
  const portrait=$('.portrait img');
  if(portrait){
    portrait.src='assests/yawar-rehman.png';
    portrait.removeAttribute('height');
    portrait.setAttribute('width','320');
    portrait.alt='Yawar Rehman';
  }
  const portraitTag=$('.portrait .tag');
  if(portraitTag){
    portraitTag.dataset.en='person 0.99';
    portraitTag.dataset.ko='사람 0.99';
    portraitTag.textContent='person 0.99';
  }
  const ogImage=$('meta[property="og:image"]');
  if(ogImage)ogImage.content='https://yawarguguma.github.io/assests/yawar-rehman.png';
}

function loadHeroStyles(){
  if($('link[href="hero.css"]'))return;
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href='hero.css';
  document.head.appendChild(link);
}

function ensurePhysicalAISkill(){
  const grid=$('.skill-grid');
  if(!grid)return;
  const existing=$$('.skill h3',grid).some(h=>h.dataset.en==='Physical AI'||h.textContent.trim()==='Physical AI');
  if(existing)return;
  const card=document.createElement('article');
  card.className='skill reveal on';
  card.id='physical-ai-skill';
  card.innerHTML='<h3 data-en="Physical AI" data-ko="피지컬 AI">Physical AI</h3><p data-en="Embodied and real world intelligent systems that connect perception, reasoning, and action." data-ko="지각, 추론, 행동을 연결하는 실세계 지능형 시스템과 체화 AI를 연구합니다.">Embodied and real world intelligent systems that connect perception, reasoning, and action.</p>';
  grid.appendChild(card);
}


function configureVisitCounter(){
  const footer=$('footer .footer');
  if(!footer||$('#visit-counter'))return;
  const counter=document.createElement('a');
  counter.id='visit-counter';
  counter.href='https://hits.sh/yawar26.github.io/';
  counter.target='_blank';
  counter.rel='noreferrer';
  counter.setAttribute('aria-label','Website visit statistics');
  counter.innerHTML='<img src="https://hits.sh/yawar26.github.io.svg?style=flat-square&label=visits" alt="Website visits">';
  footer.appendChild(counter);
}


function renderExperience(lang){
  const host=$('#experience-list');
  if(!host||!window.SITE_DATA)return;
  host.innerHTML=SITE_DATA.experience.map(role=>`<article class="role-card reveal on"><div class="role-top"><h3>${text(role.title,lang)}</h3><span class="when">${text(role.period,lang)}</span></div><div class="org">${text(role.org,lang)}</div><p>${text(role.summary,lang)}</p>${role.bullets?.length?`<ul class="details">${role.bullets.map(b=>`<li>${text(b,lang)}</li>`).join('')}</ul>`:''}</article>`).join('');
}
function renderEducation(lang){
  const host=$('#education-list');
  if(!host||!window.SITE_DATA)return;
  host.innerHTML=SITE_DATA.education.map(item=>`<article class="edu reveal on"><div class="degree">${text(item.degree,lang)}</div><div class="school">${text(item.school,lang)}</div><p>${text(item.note,lang)}</p></article>`).join('');
}
function buildTicker(lang){
  if(!ticker)return;
  const en=['Video Understanding','Temporal Action Localization','Point Supervision','Physical AI','Computer Vision','Object Detection','Uncertainty','Robust Learning'];
  const ko=['영상 이해','시간적 행동 위치 추정','포인트 감독 학습','피지컬 AI','컴퓨터 비전','객체 탐지','불확실성','강건 학습'];
  const a=lang==='ko'?ko:en;
  ticker.innerHTML=[...a,...a].map(x=>`<span>${x}</span>`).join('');
}
function setLang(lang){
  document.documentElement.lang=lang;
  $$('[data-en][data-ko]').forEach(el=>{
    el.textContent=lang==='en'?cleanEnglish(el.dataset.en):el.dataset.ko;
  });
  langButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
  localStorage.setItem('site-lang',lang);
  renderExperience(lang);
  renderEducation(lang);
  buildTicker(lang);
}

configureResearchIdentity();
configureHeroBio();
removeTrustworthyAICopy();
configurePortrait();
loadHeroStyles();
ensurePhysicalAISkill();
configureVisitCounter();

langButtons.forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
function syncMenu(){if(!nav)return;if(innerWidth<=900)nav.hidden=true;else nav.hidden=false}
syncMenu();addEventListener('resize',syncMenu);
if(burger&&nav){burger.addEventListener('click',()=>{nav.hidden=!nav.hidden;burger.setAttribute('aria-expanded',String(!nav.hidden))});$$('a',nav).forEach(a=>a.addEventListener('click',()=>{if(innerWidth<=900)nav.hidden=true}))}
$('#year').textContent=new Date().getFullYear();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.1});$$('.reveal').forEach(e=>io.observe(e));
setLang(localStorage.getItem('site-lang')||'en');