import React from 'react';
import {createRoot} from 'react-dom/client';
import DecryptedText from './components/DecryptedText';
import Magnet from './components/Magnet';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
class SafeEffect extends React.Component {constructor(props){super(props);this.state={failed:false}}static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?this.props.fallback:this.props.children}}
if(!reduced){
 document.querySelectorAll('.sculpture-caption,.hero-top span:first-child').forEach(host=>{const text=host.textContent.trim();createRoot(host).render(<SafeEffect fallback={text}><DecryptedText text={text} animateOn="view" sequential speed={30} maxIterations={8} characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" /></SafeEffect>)});
 document.querySelectorAll('.nav-cta,.hero-scroll,#contact>a').forEach(link=>{const holder=document.createElement('span');holder.className='magnet-mount';const props={className:link.className,href:link.getAttribute('href'),target:link.getAttribute('target')||undefined,rel:link.getAttribute('rel')||undefined};const children=Array.from(link.childNodes).map((node,i)=>node.nodeType===3?node.textContent:<span key={i}>{node.textContent}</span>);link.replaceWith(holder);const anchor=<a {...props}>{children}</a>;createRoot(holder).render(<SafeEffect fallback={anchor}><Magnet padding={35} magnetStrength={5}>{anchor}</Magnet></SafeEffect>)});
}
function ThemeSwitch(){
 const [theme,setTheme]=React.useState(()=>{try{return localStorage.getItem('portfolio-theme')||'light'}catch{return 'light'}});
 React.useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem('portfolio-theme',theme)}catch{}},[theme]);
 return <button className="theme-button" aria-label={theme==='light'?'Switch to dark theme':'Switch to light theme'} onClick={()=>setTheme(theme==='light'?'dark':'light')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{theme==='light'?<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>:<><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>}</svg></button>;
}
function CredentialExplorer(){
 const [query,setQuery]=React.useState(''),[category,setCategory]=React.useState('All'),[count,setCount]=React.useState(7);
 React.useEffect(()=>{const buttons=[...document.querySelectorAll('[data-cert-filter]')];const handlers=buttons.map(button=>{const handler=()=>setCategory(button.dataset.certFilter);button.addEventListener('click',handler);return [button,handler]});return ()=>handlers.forEach(([button,handler])=>button.removeEventListener('click',handler))},[]);
 React.useEffect(()=>{let visible=0;document.querySelectorAll('.cert-card').forEach(card=>{const matches=(category==='All'||card.dataset.category===category)&&card.textContent.toLowerCase().includes(query.toLowerCase().trim());card.hidden=!matches;if(matches)visible++});setCount(visible);document.querySelectorAll('[data-cert-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.certFilter===category)))},[query,category]);
 return <><label className="credential-search"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input type="search" aria-label="Search credentials by title or issuer" placeholder="Search by certificate or issuer…" value={query} onChange={e=>setQuery(e.target.value)}/></label><p className="credential-result" role="status">{count} of 7 credentials{category==='All'?'':` · ${category}`}</p>{count===0&&<p className="empty-credentials">No matches. Try another title, issuer, or category.</p>}</>;
}
const themeHost=document.getElementById('theme-control');if(themeHost)createRoot(themeHost).render(<ThemeSwitch/>);
const searchHost=document.getElementById('credential-search');if(searchHost)createRoot(searchHost).render(<CredentialExplorer/>);
