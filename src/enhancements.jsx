import React from 'react';
import {createRoot} from 'react-dom/client';
import DecryptedText from './components/DecryptedText';
import Magnet from './components/Magnet';
import SpotlightCard from './components/SpotlightCard';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
class SafeEffect extends React.Component {constructor(props){super(props);this.state={failed:false}}static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?this.props.fallback:this.props.children}}
if(!reduced){
 document.querySelectorAll('.nav-cta,.hero-scroll,#contact>a').forEach(link=>{const holder=document.createElement('span');holder.className='magnet-mount';const props={className:link.className,href:link.getAttribute('href'),target:link.getAttribute('target')||undefined,rel:link.getAttribute('rel')||undefined};const children=Array.from(link.childNodes).map((node,i)=>node.nodeType===3?node.textContent:<span key={i}>{node.textContent}</span>);link.replaceWith(holder);const anchor=<a {...props}>{children}</a>;createRoot(holder).render(<SafeEffect fallback={anchor}><Magnet padding={35} magnetStrength={5}>{anchor}</Magnet></SafeEffect>)});
}

if(!reduced){
 document.querySelectorAll('.cert-card').forEach(card=>{const content=card.innerHTML;createRoot(card).render(<SafeEffect fallback={<div dangerouslySetInnerHTML={{__html:content}}/>}><SpotlightCard className="certificate-spotlight" theme="light" spotlightColor="#2146f4" intensity={0.08} borderGlow={0.35} spotlightSize={270} smoothing={0.2} flare={false} style={{padding:0,borderRadius:'inherit',backgroundColor:'transparent',boxShadow:'none'}}><div dangerouslySetInnerHTML={{__html:content}}/></SpotlightCard></SafeEffect>)});
}

if(!reduced){document.querySelectorAll('.focus-foot').forEach(host=>{const text=host.textContent;createRoot(host).render(<SafeEffect fallback={text}><DecryptedText text={text} animateOn="hover" sequential speed={25} maxIterations={5} characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"/></SafeEffect>)})}
