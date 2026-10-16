export const policyExamples={
 read:{decision:'allow',title:'Allowed within scope',reason:'Read-only access to an approved workspace file.',action:'file.read / workspace/notes.txt',icon:'✓'},
 network:{decision:'approval',title:'Human approval required',reason:'Sending workspace data outside the trusted boundary needs review.',action:'network.send / external destination',icon:'↗'},
 exec:{decision:'blocked',title:'Blocked by policy',reason:'Unrestricted code execution is outside this example’s allowed scope.',action:'code.exec / unrestricted shell',icon:'×'}
};
export const questions={
 frontend:['How would you make a web interface work well on both a phone and a desktop?','Consider layout, accessibility, and performance.'],
 backend:['How would you handle a request when an external API is slow or unavailable?','Consider timeouts, clear errors, and safe retries.'],
 behavioral:['Tell me about a time your team had different ideas. How did you move forward?','Describe the situation, your contribution, and what you learned.']
};
if(typeof document!=='undefined'){
 document.querySelectorAll('[data-policy]').forEach(button=>button.addEventListener('click',()=>{
  const example=policyExamples[button.dataset.policy];document.querySelectorAll('[data-policy]').forEach(el=>el.setAttribute('aria-pressed',String(el===button)));
  document.getElementById('policy-decision').textContent=example.title;document.getElementById('policy-reason').textContent=example.reason;document.getElementById('policy-action').textContent=example.action;
  document.querySelector('.decision-result').dataset.decision=example.decision;document.querySelector('.decision-icon').textContent=example.icon;
 }));
 document.querySelectorAll('[data-question]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-question]').forEach(el=>el.setAttribute('aria-pressed',String(el===button)));
  const [question,prompt]=questions[button.dataset.question];document.getElementById('practice-question').textContent=question;document.getElementById('practice-prompt').textContent=prompt;
 }));
 const dialog=document.getElementById('site-navigator'),input=document.getElementById('navigator-search'),list=document.getElementById('navigator-results');
 const sectionNames={about:'About me',recognition:'AWS Cloud Trek recognition',work:'Selected work',skills:'Expertise & toolkit',certificates:'Credentials & certificates',journey:'Learning timeline',focus:'Current focus',statement:'Building philosophy',contact:'Get in touch'};
 const entries=[...document.querySelectorAll('main section[id]')].map(section=>({title:sectionNames[section.id]||section.id,kind:'SECTION',target:section}));
 entries.push({title:'AEGIS AI · agent permissions',kind:'PROJECT',target:document.querySelector('[data-project=aegis]')},{title:'InterviewAI · interview practice',kind:'PROJECT',target:document.querySelector('[data-project=interview]')});
 document.querySelectorAll('.cert-card').forEach(card=>entries.push({title:card.querySelector('h3').textContent,kind:'CREDENTIAL',target:card}));
 function render(){const query=input.value.trim().toLowerCase();const matches=entries.filter(entry=>(entry.title+' '+entry.kind+' '+(entry.target.id||'')).toLowerCase().includes(query));list.replaceChildren();
  matches.forEach(entry=>{const li=document.createElement('li'),button=document.createElement('button'),title=document.createElement('span'),kind=document.createElement('small');button.type='button';title.textContent=entry.title;kind.textContent=entry.kind;button.append(title,kind);li.append(button);list.append(li);
   button.addEventListener('click',()=>{dialog.close();if(entry.kind==='PROJECT'){entry.target.click();return;}if(entry.kind==='CREDENTIAL')document.querySelector('[data-cert-filter=All]').click();entry.target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});const focusTarget=entry.target.querySelector('a,button')||entry.target;if(!focusTarget.matches('a,button'))focusTarget.tabIndex=-1;focusTarget.focus({preventScroll:true});});
  });document.getElementById('navigator-empty').hidden=matches.length>0;
 }
 function open(){if(document.querySelector('dialog[open]'))return;input.value='';render();dialog.showModal();input.focus();document.body.classList.add('dialog-open');}
 document.querySelector('.navigator-trigger').addEventListener('click',open);
 document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(dialog.open)dialog.close();else open();}});
 input.addEventListener('input',render);
 dialog.addEventListener('keydown',e=>{const buttons=[...list.querySelectorAll('button')],index=buttons.indexOf(document.activeElement);if(e.key==='ArrowDown'&&buttons.length){e.preventDefault();buttons[(index+1)%buttons.length].focus();}else if(e.key==='ArrowUp'&&buttons.length){e.preventDefault();if(index<=0)input.focus();else buttons[index-1].focus();}else if(e.key==='Enter'&&document.activeElement===input&&buttons.length){e.preventDefault();buttons[0].click();}});
 dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('dialog-open');});
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
 document.querySelector('.navigator-trigger kbd').textContent=/Mac|iPhone|iPad/.test(navigator.platform)?'⌘ K':'Ctrl K';
 if('IntersectionObserver' in window){const links=[...document.querySelectorAll('nav .links a')];const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(link=>{if(link.hash==='#'+entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}),{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('main section').forEach(section=>observer.observe(section));}
}
