(()=>{const p=document.querySelector('.player');if(!p)return;
const bars=JSON.parse(p.dataset.bars),w=p.querySelector('.wave'),b=p.querySelector('.play'),t=p.querySelector('.time');
let a=null,ready=false;const D=209.9,f=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
bars.forEach(v=>{const e=document.createElement('b');e.style.height=Math.max(6,v*100)+'%';w.appendChild(e)});
const say=m=>{t.textContent=m};
const up=()=>{if(!a)return;const d=isFinite(a.duration)?a.duration:D,k=Math.round(a.currentTime/d*bars.length);
[...w.children].forEach((e,i)=>e.classList.toggle('p',i<k));say(f(a.currentTime)+' / '+f(d))};
function load(){if(a)return;say('読み込み中…');
const s=p.dataset.src;let url=s;
try{if(s.startsWith('data:')){const bin=atob(s.split(',')[1]),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);url=URL.createObjectURL(new Blob([u],{type:'audio/mpeg'}))}}catch(e){say('エラー：音源を読み込めません（'+e.name+'）');return}
a=new Audio();a.preload='auto';a.src=url;
a.onplay=()=>{b.classList.add('on');b.setAttribute('aria-label','一時停止')};
a.onpause=()=>{b.classList.remove('on');b.setAttribute('aria-label','試聴する')};
a.ontimeupdate=up;a.onended=()=>{a.currentTime=0;up()};
a.onerror=()=>say('エラー：再生できません（コード'+(a.error?a.error.code:'?')+'）');}
b.addEventListener('click',()=>{load();if(!a)return;
if(a.paused){const r=a.play();if(r&&r.catch)r.catch(e=>say('エラー：'+e.name+'：'+e.message))}else a.pause()});
const seek=x=>{load();if(!a)return;const r=w.getBoundingClientRect();a.currentTime=Math.min(1,Math.max(0,(x-r.left)/r.width))*(isFinite(a.duration)?a.duration:D);up()};
w.addEventListener('click',e=>seek(e.clientX));
})();
