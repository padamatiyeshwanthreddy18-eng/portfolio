(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const dialog = document.getElementById('project-dialog');
  const story = document.getElementById('project-story');
  const notes = {
    aegis: {
      problem: 'When an AI agent can take actions, permission becomes part of the product—not an afterthought. AEGIS explores how an action can be checked before it runs.',
      approach: 'The project centers on context and risk evaluation, least-privilege policies, human approval for high-risk actions, and an audit trail.',
      scope: 'An exploratory agent permission-governance project. Open the linked runtime to examine the current interface and permission workflow.',
      flow: ['Agent action', 'Policy & risk check', 'Approval decision', 'Audit record']
    },
    interview: {
      problem: 'Interview preparation needs more than a static list of questions. The project explores practice that responds to a candidate’s role and answers.',
      approach: 'The scope brings together role-specific questions, relevant follow-ups, voice interaction, and feedback in a mock interview panel.',
      scope: 'An AI mock interview project for practice and exploration. Open the application to explore the current interview experience.',
      flow: ['Role context', 'Interview questions', 'Follow-up', 'Feedback']
    }
  };
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
    const note = notes[button.dataset.project];
    story.replaceChildren();
    const grid = document.createElement('div'); grid.className = 'story-grid';
    [['THE PROBLEM',note.problem],['PROJECT APPROACH',note.approach],['SCOPE & EVIDENCE',note.scope]].forEach(([title,copy],i) => {
      const item=document.createElement('div'); if(i===2)item.className='story-scope';
      const heading=document.createElement('h3'); heading.textContent=title;
      const text=document.createElement('p');text.textContent=copy;item.append(heading,text);grid.append(item);
    });
    const flow=document.createElement('div');flow.className='story-flow';flow.setAttribute('aria-label','Project concept flow');
    note.flow.forEach((label,i)=>{const step=document.createElement('span');step.textContent=`0${i+1} / ${label}`;flow.append(step)});
    story.append(grid,flow);document.body.classList.add('dialog-open');dialog.scrollTop=0;
  }));
  dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
  const dock=document.querySelector('.section-dock'),links=[...dock.querySelectorAll('a')];
  let queued=false;
  function update(){queued=false;const shown=scrollY>450;dock.classList.toggle('shown',shown);dock.inert=!shown;
    let current=links[0];for(const link of links){const target=document.querySelector(link.hash);if(target.getBoundingClientRect().top<innerHeight*.4)current=link;}
    links.forEach(link=>{link.classList.toggle('active',link===current);if(link===current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
  }
  addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update);update();
  document.querySelectorAll('[data-cert-filter]').forEach(button=>button.addEventListener('click',()=>{
    const count=[...document.querySelectorAll('.cert-card')].filter(card=>!card.hidden).length;
    let status=document.getElementById('cert-status');if(!status){status=document.createElement('p');status.id='cert-status';status.setAttribute('role','status');status.style.cssText='font:11px monospace;color:#62636c;margin:0 0 20px';document.querySelector('.cert-grid').before(status)}
    status.textContent=`${count} credential${count===1?'':'s'} · ${button.dataset.certFilter}`;
  }));
  // Preserve readable content if motion preferences change during a visit.
  reduced.addEventListener('change',()=>{if(reduced.matches)document.querySelectorAll('#portrait,.cert-card,.identity-tile').forEach(el=>{el.style.setProperty('--depth-x','0deg');el.style.setProperty('--depth-y','0deg')})});
})();
