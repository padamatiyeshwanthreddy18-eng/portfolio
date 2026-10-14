(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduced)return;
 document.querySelectorAll('.focus-grid,.learning-timeline').forEach(group=>group.querySelectorAll('.reveal').forEach((el,index)=>el.style.setProperty('--reveal-delay',Math.min(index*75,225)+'ms')));
 if(!matchMedia('(pointer:fine)').matches)return;
 const hero=document.querySelector('.hero-stage'),portrait=document.getElementById('portrait');
 function attachTilt(target,receiver,strength){target.addEventListener('pointermove',e=>{const r=target.getBoundingClientRect();receiver.style.setProperty('--depth-x',((.5-(e.clientY-r.top)/r.height)*strength)+'deg');receiver.style.setProperty('--depth-y',(((e.clientX-r.left)/r.width-.5)*strength)+'deg')});target.addEventListener('pointerleave',()=>{receiver.style.setProperty('--depth-x','0deg');receiver.style.setProperty('--depth-y','0deg')})}
 if(hero&&portrait)attachTilt(hero,portrait,8);
 document.querySelectorAll('.cert-card').forEach(card=>attachTilt(card,card,5));
 document.querySelectorAll('.identity-tile').forEach(tile=>{attachTilt(tile,tile,7);tile.style.transform='perspective(900px) rotateX(var(--depth-x,0deg)) rotateY(var(--depth-y,0deg))'});
 document.querySelectorAll('.project').forEach(row=>{row.addEventListener('pointermove',e=>{const r=row.getBoundingClientRect();row.style.setProperty('--preview-y',(((e.clientX-r.left)/r.width-.5)*13)+'deg')});row.addEventListener('pointerleave',()=>row.style.setProperty('--preview-y','0deg'))});
 document.addEventListener('click',e=>{if(!e.target.closest('a,button'))return;const ripple=document.createElement('span');ripple.className='depth-click';ripple.setAttribute('aria-hidden','true');ripple.style.left=e.clientX+'px';ripple.style.top=e.clientY+'px';document.body.append(ripple);ripple.addEventListener('animationend',()=>ripple.remove(),{once:true})});
})();
