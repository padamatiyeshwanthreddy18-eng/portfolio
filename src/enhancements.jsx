import {mountSpringMotion} from './spring-motion';
import React from 'react';
import {createRoot} from 'react-dom/client';
import SpotlightCard from './components/SpotlightCard';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
class SafeEffect extends React.Component {constructor(props){super(props);this.state={failed:false}}static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?this.props.fallback:this.props.children}}
if(!reduced){
 document.querySelectorAll('.cert-card').forEach(card=>{const content=card.innerHTML;createRoot(card).render(<SafeEffect fallback={<div dangerouslySetInnerHTML={{__html:content}}/>}><SpotlightCard className="certificate-spotlight" theme="light" spotlightColor="#2146f4" intensity={0.08} borderGlow={0.35} spotlightSize={270} smoothing={0.2} flare={false} style={{padding:0,borderRadius:'inherit',backgroundColor:'transparent',boxShadow:'none'}}><div dangerouslySetInnerHTML={{__html:content}}/></SpotlightCard></SafeEffect>)});
}


mountSpringMotion();
