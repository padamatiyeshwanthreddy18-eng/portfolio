'use client';
// Adapted from React Bits TiltedCard (MIT), with React Spring replacing Motion.
// Original: https://reactbits.dev/r/TiltedCard-JS-CSS.json
import {useRef} from 'react';
import {animated,useSpring,to,useReducedMotion} from '@react-spring/web';
import './TiltedCard.css';
export default function TiltedCard({imageSrc,altText='',captionText='',rotateAmplitude=10,scaleOnHover=1.035}){
  const ref=useRef(null),reduced=useReducedMotion();
  const [{x,y,scale},api]=useSpring(()=>({x:0,y:0,scale:1,config:{mass:1.3,tension:190,friction:26}}));
  const reset=()=>api.start({x:0,y:0,scale:1,immediate:reduced});
  function move(e){if(reduced||e.pointerType==='touch'||!matchMedia('(pointer:fine)').matches)return;const r=ref.current.getBoundingClientRect();api.start({x:(.5-(e.clientY-r.top)/r.height)*rotateAmplitude*2,y:((e.clientX-r.left)/r.width-.5)*rotateAmplitude*2,scale:scaleOnHover});}
  return <figure ref={ref} className="tilted-card-figure" onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
    <animated.div className="tilted-card-inner" style={{transform:to([x,y,scale],(rx,ry,s)=>`rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`)}}>
      <div className="tilted-card-backplate" aria-hidden="true"/>
      <img src={imageSrc} alt={altText} width="1254" height="1254" loading="lazy" className="tilted-card-img"/>
      <div className="tilted-card-overlay"><span>{captionText}</span><i aria-hidden="true">↗</i></div>
      <span className="tilted-card-edge" aria-hidden="true"/>
    </animated.div>
  </figure>;
}
