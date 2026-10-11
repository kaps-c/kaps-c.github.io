const root=document.documentElement,btn=document.getElementById('theme-toggle');
const current=()=>root.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
const show=()=>{if(btn)btn.textContent=current()==='dark'?'Light mode':'Dark mode'};
try{const s=localStorage.getItem('c-theme');if(s)root.dataset.theme=s}catch(e){}
show();
if(btn)btn.addEventListener('click',()=>{const n=current()==='dark'?'light':'dark';root.dataset.theme=n;show();try{localStorage.setItem('c-theme',n)}catch(e){}});
const links=[...document.querySelectorAll('.jump nav a[href^="#"]')];
const targets=links.map(a=>document.querySelector(a.getAttribute('href')));
function mark(){
  if(!links.length)return;
  let i=0;targets.forEach((t,k)=>{if(t&&t.getBoundingClientRect().top<120)i=k});
  if(innerHeight+scrollY>=document.body.scrollHeight-4)i=targets.length-1;
  links.forEach((a,k)=>a.classList.toggle('active',k===i));
}
addEventListener('scroll',mark,{passive:true});mark();
if(matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('video[autoplay]').forEach(v=>{v.removeAttribute('autoplay');v.controls=true;v.pause()})}
const copyBtn=document.getElementById('copy-mail');
if(copyBtn)copyBtn.addEventListener('click',()=>{
  const st=document.getElementById('copy-status');
  const fb=()=>{const r=document.createRange();r.selectNodeContents(document.getElementById('mail'));const s=getSelection();s.removeAllRanges();s.addRange(r);st.textContent='Selected, press Ctrl/⌘+C';};
  try{navigator.clipboard.writeText('tengcelest@gmail.com').then(()=>st.textContent='Copied',fb)}catch(e){fb()}
});
