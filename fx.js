(()=>{const r=matchMedia('(prefers-reduced-motion:reduce)').matches;
const L=document.createElement('div');L.className='light';document.body.appendChild(L);
addEventListener('pointermove',e=>{L.style.setProperty('--x',e.clientX+'px');L.style.setProperty('--y',e.clientY+'px')});
if(r)return;
const c=document.getElementById('dust'),x=c.getContext('2d');let w,h;
const P=Array.from({length:45},()=>({x:Math.random(),y:Math.random(),s:Math.random()*1.6+.4,v:Math.random()*.00015+.00004,d:Math.random()*6}));
const rs=()=>{w=c.width=innerWidth;h=c.height=innerHeight};rs();addEventListener('resize',rs);
(function f(t){x.clearRect(0,0,w,h);for(const p of P){p.y-=p.v*16;if(p.y<0){p.y=1;p.x=Math.random()}
const px=p.x*w+Math.sin(t/2000+p.d)*14;x.beginPath();x.arc(px,p.y*h,p.s,0,7);x.fillStyle=`rgba(190,170,255,${.14+.14*Math.sin(t/900+p.d)})`;x.fill()}
requestAnimationFrame(f)})(0)})();
