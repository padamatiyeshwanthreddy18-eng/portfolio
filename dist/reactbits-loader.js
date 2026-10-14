// React Bits enhancement loaded from its official source through the ESM CDN.
// The static heading remains intact when CDN access fails.
const host = document.querySelector('.sculpture-caption');
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  try {
    const [React, ReactDOM, component] = await Promise.all([
      import('https://esm.sh/react@19.2.0'),
      import('https://esm.sh/react-dom@19.2.0/client?external=react'),
      import('https://esm.sh/gh/DavidHDev/react-bits@main/src/content/TextAnimations/DecryptedText/DecryptedText.jsx?external=react,motion/react')
    ]);
    const root = ReactDOM.createRoot(host);
    root.render(React.createElement(component.default, {text:'A MIND IN MOTION. A BUILDER IN PROGRESS.', animateOn:'view', sequential:true, speed:35, maxIterations:10}));
  } catch (error) {
    console.info('React Bits CDN unavailable; keeping accessible static heading.', error);
  }
}
