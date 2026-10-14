(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const fine=matchMedia('(pointer:fine)').matches;
 const stage=document.querySelector('.hero-stage');
 const portrait=document.getElementById('portrait');
 const cursor=document.querySelector('.cursor-orbit');
 const dock=document.querySelector('.section-dock');
 const links=[...dock.querySelectorAll('a')];
 if(!reduced&&fine){
  stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();portrait.style.setProperty('--portrait-x',((.5-(e.clientY-r.top)/r.height)*5)+'deg');portrait.style.setProperty('--portrait-y',(((e.clientX-r.left)/r.width-.5)*9)+'deg')});
  stage.addEventListener('pointerleave',()=>{portrait.style.setProperty('--portrait-x','0deg');portrait.style.setProperty('--portrait-y','0deg')});
  let x=-100,y=-100,tx=-100,ty=-100,active=false;
  document.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;cursor.style.opacity='1';if(!active){active=true;requestAnimationFrame(tick)}});
  function tick(){x+=(tx-x)*.22;y+=(ty-y)*.22;cursor.style.transform=`translate(${x-32}px,${y-32}px)`;if(Math.abs(tx-x)+Math.abs(ty-y)>.2)requestAnimationFrame(tick);else active=false}
  document.addEventListener('pointerleave',()=>cursor.style.opacity='0');
  document.querySelectorAll('.project,.cert-preview').forEach(el=>{el.addEventListener('pointerenter',()=>cursor.classList.add('preview'));el.addEventListener('pointerleave',()=>cursor.classList.remove('preview'))});
  document.querySelectorAll('.cert-card').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--cx',e.clientX-r.left+'px');el.style.setProperty('--cy',e.clientY-r.top+'px')}));
 }
 function update(){dock.classList.toggle('shown',scrollY>innerHeight*.6);let current=links[0];links.forEach(link=>{const section=document.querySelector(link.getAttribute('href'));if(section&&section.getBoundingClientRect().top<innerHeight*.45)current=link});links.forEach(link=>{link.classList.toggle('active',link===current);if(link===current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')})}
 addEventListener('scroll',update,{passive:true});update();
})();
