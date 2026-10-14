// Reference-inspired scroll choreography. Local motion keeps the experience functional offline.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = document.querySelector('.hero-stage');
  const title = stage.querySelector('h1');
  const sculpture = document.getElementById('portrait');
  const statement = document.querySelector('.scatter-line');
  const text = statement.innerText;
  const chars = [];
  statement.replaceChildren();
  text.split('\n').forEach((line, row) => {
    if (row) statement.append(document.createElement('br'));
    Array.from(line).forEach((letter, index) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = letter === ' ' ? '\u00a0' : letter;
      span.setAttribute('aria-hidden', 'true');
      span.dataset.drift = String(Math.sin(index * 2.1 + row * 3) * 65);
      span.dataset.twist = String(Math.cos(index * 1.4 + row) * 22);
      statement.append(span); chars.push(span);
    });
  });
  let scheduled = false;
  function update() {
    scheduled = false;
    if (reduce) return;
    const y = Math.min(scrollY, Math.max(0, stage.offsetHeight));
    title.style.transform = `translateY(${y * .035}px) scale(${1 - y / innerHeight * .025})`;
    sculpture.style.translate = `0 ${-y * .025}px`;
    const r = statement.getBoundingClientRect();
    const center = r.top + r.height / 2;
    const scatter = Math.max(0, Math.min(1, Math.abs(center - innerHeight * .5) / (innerHeight * .5) - .2));
    chars.forEach(span => {
      span.style.transform = `translateY(${Number(span.dataset.drift) * scatter}px) rotate(${Number(span.dataset.twist) * scatter}deg)`;
    });
  }
  addEventListener('scroll', () => { if (!scheduled) {scheduled = true; requestAnimationFrame(update);} }, {passive:true});
  addEventListener('resize',update); update();
})();
