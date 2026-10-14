import React, {useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {Controller} from '@react-spring/web';

export function installSpringMotion() {
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(pointer:fine)');
  const controllers=new Set(), disposers=[];
  const config={mass:1,tension:190,friction:28,clamp:false};
  const listen=(target,event,fn,options)=>{target.addEventListener(event,fn,options);disposers.push(()=>target.removeEventListener(event,fn,options));};
  function spring(initial,paint,custom={}) {
    const c=new Controller({from:initial,config:{...config,...custom},onChange:()=>paint(c.get())});
    controllers.add(c);paint(initial);
    return {start:values=>c.start({...values,immediate:motion.matches}),set:values=>{c.set(values);paint(c.get());},controller:c};
  }
  const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
    if(isIntersecting){target._springEnter?.();observer.unobserve(target);}
  }),{threshold:.07}):null;
  if(observer)disposers.push(()=>observer.disconnect());
  function enter(el,delay=0,initialY=18){
    const s=spring({opacity:1,y:0},v=>{el.style.opacity=v.opacity;el.style.translate=`0 ${v.y}px`;});
    const run=()=>{if(motion.matches)return;s.set({opacity:.45,y:initialY});s.start({opacity:1,y:0,delay});};
    el._springEnter=run;
    if(observer)observer.observe(el);else run();
  }
  document.body.classList.add('spring-motion');
  document.querySelectorAll('.name-line').forEach((el,i)=>enter(el,i*110,22));
  document.querySelectorAll('.hero-top,.hero-bottom').forEach(el=>enter(el,160,10));
  enter(document.getElementById('portrait'),260,15);
  document.querySelectorAll('.section-head,.about>div,.recognition-heading,.recognition-copy,.recognition-visual,.skill-row,.timeline-item,.focus-card,.cert-card,.contact').forEach((el,i)=>enter(el,(i%3)*45,14));

  function tilt(surface,receiver,base,strength=5){
    const s=spring({x:0,y:0,lift:0},v=>receiver.style.transform=`${base} rotateX(${v.x}deg) rotateY(${v.y}deg) translateY(${v.lift}px)`,{tension:240,friction:27});
    listen(surface,'pointermove',e=>{if(motion.matches||!fine.matches||e.pointerType==='touch')return;const r=surface.getBoundingClientRect();s.start({x:(.5-(e.clientY-r.top)/r.height)*strength,y:((e.clientX-r.left)/r.width-.5)*strength,lift:-2});},{passive:true});
    listen(surface,'pointerleave',()=>s.start({x:0,y:0,lift:0}));
    listen(surface,'blur',()=>s.start({x:0,y:0,lift:0}),true);
  }
  const stage=document.querySelector('.hero-stage');
  tilt(stage,document.getElementById('portrait'),'translateX(-50%)',10);
  const title=stage.querySelector('h1');const plane=stage.querySelector('.depth-orbit');
  const depth=spring({x:0,y:0},v=>{
    title.style.transform=`translate(${v.x*-.45}px,${v.y*-.3}px) rotateY(${v.x*.08}deg)`;
    if(plane)plane.style.transform=`translate(-50%,-50%) translate(${v.x}px,${v.y}px) rotateX(64deg) rotateZ(-18deg)`;
  },{tension:150,friction:26});
  listen(stage,'pointermove',e=>{if(motion.matches||!fine.matches||e.pointerType==='touch')return;const r=stage.getBoundingClientRect();depth.start({x:((e.clientX-r.left)/r.width-.5)*28,y:((e.clientY-r.top)/r.height-.5)*20});},{passive:true});
  listen(stage,'pointerleave',()=>depth.start({x:0,y:0}));
  listen(motion,'change',()=>{if(motion.matches)depth.set({x:0,y:0});});
  document.querySelectorAll('.cert-card').forEach(el=>tilt(el,el,'perspective(1000px)',7));
  const recognition=document.querySelector('.recognition-frame');tilt(recognition,recognition,'perspective(1200px) rotate(-1deg)',8);
  document.querySelectorAll('.project').forEach(row=>{
    const preview=row.querySelector('.project-visual');
    const s=spring({opacity:0,y:14,rotation:-6},v=>{preview.style.opacity=v.opacity;preview.style.transform=`translateY(${v.y}px) rotate(${v.rotation}deg)`;});
    const bars=[...row.querySelectorAll('.wave i')];
    const wave=bars.length?spring({phase:0},v=>bars.forEach((bar,i)=>bar.style.transform=`scaleY(${.62+Math.sin(v.phase+i*.7)*.3})`)):null;
    const show=()=>{s.start({opacity:1,y:0,rotation:-3});if(wave&&!motion.matches)wave.controller.start({from:{phase:0},to:{phase:Math.PI*2},loop:true,config:{duration:1700}});};
    const hide=()=>{s.start({opacity:0,y:14,rotation:-6});wave?.controller.stop(true);};
    listen(row,'pointerenter',show);listen(row,'pointerleave',()=>{if(!row.contains(document.activeElement))hide();});listen(row,'focusin',show);listen(row,'focusout',e=>{if(!row.contains(e.relatedTarget))hide();});
    const arrow=row.querySelector('.project-open');const a=spring({x:0,y:0},v=>arrow.style.transform=`translate(${v.x}px,${v.y}px)`);
    listen(row,'pointerenter',()=>a.start({x:3,y:-3}));listen(row,'pointerleave',()=>a.start({x:0,y:0}));
  });
  document.querySelectorAll('.nav-cta,.hero-scroll,#contact>a,.recognition-primary,.cert-filters button').forEach(el=>{
    const s=spring({x:0,y:0,scale:1},v=>el.style.transform=`translate(${v.x}px,${v.y}px) scale(${v.scale})`,{tension:280,friction:22});
    listen(el,'pointermove',e=>{if(motion.matches||!fine.matches||e.pointerType==='touch')return;const r=el.getBoundingClientRect();s.start({x:Math.max(-5,Math.min(5,(e.clientX-r.left-r.width/2)*.07)),y:Math.max(-3,Math.min(3,(e.clientY-r.top-r.height/2)*.1)),scale:1.02});});
    listen(el,'pointerleave',()=>s.start({x:0,y:0,scale:1}));listen(el,'pointerdown',()=>s.start({scale:.97}));listen(el,'pointerup',()=>s.start({scale:1}));listen(el,'pointercancel',()=>s.start({x:0,y:0,scale:1}));
    listen(el,'blur',()=>s.start({x:0,y:0,scale:1}));
  });
  document.querySelectorAll('.focus-card,.skill-row').forEach(el=>{
    const s=spring({x:0},v=>el.style.transform=`translateX(${v.x}px)`);
    listen(el,'pointerenter',()=>s.start({x:4}));listen(el,'pointerleave',()=>s.start({x:0}));
  });
  document.querySelectorAll('.cert-preview img').forEach(el=>{
    const s=spring({scale:1},v=>el.style.transform=`scale(${v.scale})`);
    listen(el.parentElement,'pointerenter',()=>s.start({scale:1.035}));listen(el.parentElement,'pointerleave',()=>s.start({scale:1}));
  });
  document.querySelectorAll('[data-cert-filter]').forEach(el=>listen(el,'click',()=>document.querySelectorAll('.cert-card:not([hidden])').forEach((card,i)=>card._springEnter?.())));
  const dialog=document.getElementById('project-dialog');const d=spring({opacity:1,y:0},v=>{dialog.style.opacity=v.opacity;dialog.style.translate=`0 ${v.y}px`;});
  const modalObserver=new MutationObserver(()=>{if(dialog.open&&!motion.matches){d.set({opacity:.6,y:16});d.start({opacity:1,y:0});}});modalObserver.observe(dialog,{attributes:true,attributeFilter:['open']});disposers.push(()=>modalObserver.disconnect());
  const dock=document.querySelector('.section-dock');const n=spring({opacity:0,y:72},v=>{dock.style.opacity=v.opacity;dock.style.transform=`translate(-50%,${v.y}px)`;});
  const navObserver=new MutationObserver(()=>{const shown=dock.classList.contains('shown');if(shown)dock.style.visibility='visible';n.start({opacity:shown?1:0,y:shown?0:72,onRest:()=>{if(!dock.classList.contains('shown'))dock.style.visibility='hidden';}});});navObserver.observe(dock,{attributes:true,attributeFilter:['class']});if(dock.classList.contains('shown')){dock.style.visibility='visible';n.start({opacity:1,y:0});}disposers.push(()=>navObserver.disconnect());
  const progress=document.querySelector('.scroll-progress');const p=spring({width:0},v=>progress.style.width=v.width+'%',{tension:280,friction:35});
  const updateProgress=()=>p.start({width:scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100});listen(window,'scroll',updateProgress,{passive:true});listen(window,'resize',updateProgress);updateProgress();
  listen(motion,'change',()=>{if(motion.matches){controllers.forEach(c=>c.stop(true));document.querySelectorAll('[style]').forEach(el=>{if(el._springEnter){el.style.opacity='1';el.style.translate='0 0';}});document.getElementById('portrait').style.transform='translateX(-50%)';document.querySelectorAll('.cert-card,.identity-tile,.recognition-frame').forEach(el=>el.style.transform='none');d.set({opacity:1,y:0});}});
  listen(document,'visibilitychange',()=>controllers.forEach(c=>document.hidden?c.pause():c.resume()));
  return ()=>{observer?.disconnect();controllers.forEach(c=>c.stop(true));disposers.forEach(dispose=>dispose());document.body.classList.remove('spring-motion');};
}
function SpringMotion(){useEffect(()=>installSpringMotion(),[]);return null;}
export function mountSpringMotion(){const host=document.createElement('div');host.hidden=true;host.id='spring-motion-runtime';document.body.append(host);createRoot(host).render(<SpringMotion/>);}
