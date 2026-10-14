(() => {
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||!matchMedia('(pointer:fine)').matches)return;
 const frame=document.querySelector('.recognition-frame');if(!frame)return;
 frame.addEventListener('pointermove',e=>{const r=frame.getBoundingClientRect();frame.style.setProperty('--recognition-x',((.5-(e.clientY-r.top)/r.height)*6)+'deg');frame.style.setProperty('--recognition-y',(((e.clientX-r.left)/r.width-.5)*8)+'deg')});
 frame.addEventListener('pointerleave',()=>{frame.style.setProperty('--recognition-x','0deg');frame.style.setProperty('--recognition-y','0deg')});
})();
