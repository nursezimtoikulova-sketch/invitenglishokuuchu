/* ===== Окуучулардын сайты: сабактар мугалимдин коду менен гана ачылат ===== */
let G=0,STARS=0,UL=[];
try{STARS=+localStorage.getItem('stars')||0;UL=JSON.parse(localStorage.getItem('ul')||'[]')}catch(e){UL=[]}
const GC=['var(--k1)','var(--k2)','var(--k3)','var(--k4)','var(--plum)','var(--mint)','var(--cherry)'];
function fnv(s){let h=0x811c9dc5;for(let k=0;k<s.length;k++){h^=s.charCodeAt(k);h=Math.imul(h,16777619)>>>0}return h}
function save(){try{localStorage.setItem('ul',JSON.stringify(UL));localStorage.setItem('stars',STARS)}catch(e){}}
function showStars(){$('#stars').textContent='⭐ '+STARS}
const _close=closeM;closeM=function(){if(typeof score==='number'&&score>0){STARS+=score;save();showStars()}setS(null);_close()};
function unlock(ev){if(ev)ev.preventDefault();const inp=ev&&ev.target.querySelector('input')||$('#code');const c=inp.value.toUpperCase().replace(/[^A-Z0-9]/g,'');
 const hit=(window.HASHES||{})[fnv('nur:'+c).toString(36)];const fb=inp.closest('form').querySelector('.cfb');
 if(!c){return}
 if(!hit){fb.textContent='❌ Мындай код жок. Мугалимден кайра сура.';inp.classList.remove('no');void inp.offsetWidth;inp.classList.add('no');return}
 let added=0;hit.forEach(k=>{if(!UL.includes(k)){UL.push(k);added++}});save();inp.value='';
 G=hit[0].startsWith('p:')?'P':GRADES[+hit[0].split(':')[0]];fb.textContent=added?'🎉 Сабак ачылды!':'Бул сабак мурунтан ачык.';
 hall();render();renderWords();setTimeout(()=>{location.hash='lessons';const el=document.getElementById(hit[0].startsWith('p:')?'Lp_'+hit[0].slice(2):'L'+hit[0].replace(':','_'));if(el)el.scrollIntoView({behavior:'smooth'})},500)}
function byGrade(){const m={};UL.forEach(k=>{const g=k.startsWith('p:')?'P':GRADES[+k.split(':')[0]];(m[g]=m[g]||[]).push(k)});return m}
function hall(){const ul=UL.filter(k=>k.startsWith('p:')).map(k=>PL_ID[k.slice(2)]).filter(Boolean);const T=(PROG.tracks||[]);buildHall($('#hall'),T.map((t,i)=>{const c=ul.filter(l=>l.track===t.id).length;return {label:t.name.split(' ')[0],sub:c?c+' сабак ачык':'Код менен ачылат',me:c?'⭐ '+c:'',icon:['abc','globe','cap'][i]||'star',door:c?['🧒','🧑‍🎓','🎓'][i]:'🔒',onclick:()=>{if(!c){$('#code').focus();return}G='P';render();location.hash='lessons'}}}).concat([{label:'Сөздөрүм',sub:'кайталоо оюндары',icon:'star',door:'📚',onclick:()=>location.hash='words'},{label:'Грамматика',sub:'эреже + көнүгүү',icon:'book',door:'📘',onclick:()=>location.hash='grammar'}]))}
function render(){const m=byGrade(),gs=Object.keys(m).map(x=>x==='P'?'P':+x);if(!gs.includes(G))G=gs[0]||0;
 $('#gchips').innerHTML=gs.map(g=>`<button class="chip ${g===G?'on':''}" onclick="G=${g==='P'?"'P'":g};render()">${g==='P'?'⭐ Менин программам':g+'-класс'} <small>${m[g].length}</small></button>`).join('');
 if(!gs.length){$('#lcards').innerHTML=`<div class="card"><h4>🔒 Азырынча ачык сабак жок</h4><p>Мугалим сабакта берген кодду жазып, сабакты ач.</p><a class="btn" href="#home">Код жазуу</a></div>`;return}
 if(G==='P'){$('#lcards').innerHTML=m.P.slice().reverse().map(k=>PL_ID[k.slice(2)]?pStudentCard(PL_ID[k.slice(2)]):'').join('');return}
 const list=m[G].map(k=>k.split(':').map(Number)).sort((a,b)=>b[1]-a[1]);
 $('#lcards').innerHTML=list.map(([gi,i])=>{const L=lessonData(gi,i),v=videoFor(L);
  return `<div class="lc" id="L${gi}_${i}"><div><span class="tag">${L.n}-сабак</span> <span class="tag y">${TYPEKY[L.ty]}</span> <span class="tag b">${QN[L.q]} чейрек</span></div><h4>${esc(L.t)}</h4>
  <div class="words">${L.pairs.slice(0,6).map(p=>`<button onclick="say('${p[0].replace(/'/g,"\\'")}')"><b>🔊 ${esc(p[0])}</b><small>${esc(p[1])}</small></button>`).join('')}</div>
  <div class="gb">${Object.keys(GAMES).map((k,j)=>`<button style="background:${GC[j]}" onclick="playL(${gi},${i},'${k}')">${GAMES[k][0]}</button>`).join('')}</div>
  ${v?vidHTML(v):''}
  <div class="ready">${ytLinks(L).slice(0,2).map(y=>`<a href="${y[1]}" target="_blank" rel="noopener">${esc(y[0])}</a>`).join('')}</div></div>`}).join('')}
function allPairs(){const m=new Map();UL.forEach(k=>{const ps=k.startsWith('p:')?(PL_ID[k.slice(2)]?pPairs(PL_ID[k.slice(2)]):[]):lessonData(...k.split(':').map(Number)).pairs;ps.forEach(p=>{if(!m.has(p[0]))m.set(p[0],p)})});return [...m.values()]}
function renderWords(){const A=allPairs();$('#allwords').innerHTML=A.length?A.map(p=>`<button onclick="say('${p[0].replace(/'/g,"\'")}')"><b>🔊 ${esc(p[0])}</b><small>${esc(p[1])}</small></button>`).join(''):'<div class="card"><h4>🔒 Азырынча сөз жок</h4><p>Код менен сабак ачсаң, анын сөздөрү ушул жерге чогулат.</p></div>';
 $('#revbtns').innerHTML=A.length>=4?['cards','match','quiz','memory','hang','tf','gap','scramble','odd'].map((k,j)=>`<button style="background:${GC[j%GC.length]}" onclick="revise('${k}')">${k==='cards'?'🃏 Флешкарта':GAMES[k][0]}</button>`).join(''):'<p style="margin:0">Кайталоо үчүн кеминде 4 сөз керек: дагы бир сабак ач.</p>'}
function revise(k){const A=shuffle(allPairs()).slice(0,12);openGame(k,A,A.map(p=>p[0]),['I can remember the words.','I know many English words.'],'Кайталоо')}
function playL(gi,i,gm){const L=lessonData(gi,i);openGame(gm,L.pairs,L.words,L.phrases,`${L.n}-сабак`)}
function route(){const h=(location.hash||'#home').slice(1);const ok=document.getElementById(h)&&document.getElementById(h).classList.contains('page')?h:'home';
 document.querySelectorAll('section.page').forEach(s=>s.classList.toggle('on',s.id===ok));
 document.querySelectorAll('.top nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+ok));
 $('.hero').style.display=ok==='home'?'':'none';window.scrollTo(0,0)}
window.addEventListener('hashchange',route);
let rz;window.addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(hall,200)});
document.querySelectorAll('form.codef').forEach(f=>f.addEventListener('submit',unlock));
showStars();hall();render();renderWords();renderGrammar();route();
