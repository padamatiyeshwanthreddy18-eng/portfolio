(() => {
 // Reveal only as an enhancement; sections never remain hidden when observers or scripts fail.
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.setAttribute('data-entering','');observer.unobserve(entry.target)}}),{threshold:0.06});
 document.querySelectorAll('section>.section-head,.about>div,.recognition-heading,.recognition-copy,.recognition-visual').forEach(el=>observer.observe(el));
})();
