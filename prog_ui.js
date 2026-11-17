/* ===== «English from Zero to Confident Speaking»: программа (деңгээлдер боюнча) ===== */
window.PROG=window.PROG||{tracks:[],lessons:[],test:null};
const SPK=['','Repeat & Recognize','Short Answers','Ask & Answer','Describe & Explain','Discuss & Debate','Fluency'];
const SPK_KY=['','Кайтала жана тааны','Кыска жооп','Суроо-жооп','Сүрөттө жана түшүндүр','Талкуу жана дебат','Эркин сүйлөө'];
const PL_ID={};(PROG.lessons||[]).forEach(l=>PL_ID[l.id]=l);
function pPairs(P){return (P.vocab||[]).map(v=>[v.en,v.ky])}
function pPhrases(P){const d=(P.speaking&&P.speaking.dialogue||[]).map(x=>x[1]).filter(s=>s.split(' ').length>=3);const r=(P.reading&&P.reading.en||'').split(/(?<=[.!?])\s+/).filter(s=>s.split(' ').length>=3);return d.concat(r).slice(0,6).concat(['I can speak English.'])}
function pGame(P,k){openGame(k,pPairs(P),pPairs(P).map(p=>p[0]),pPhrases(P),P.id+' · '+P.title)}
function badges(g){return `${g.board!==false?'<span class="tag g">🖥 тактада</span> ':''}${g.internet?'<span class="tag b">🌐 интернет керек</span> ':'<span class="tag y">интернетсиз</span> '}${g.phones?'<span class="tag">📱 телефон керек</span>':''}`}
function sayBtn(t){return `<button class="btn sm ghost" onclick="say('${String(t).replace(/\\/g,'').replace(/'/g,"\\'")}')">🔊</button>`}

/* Мугалим үчүн толук сабак */
function pLessonHTML(P,code){
 const v=P.listening&&P.listening.yt?{id:P.listening.yt,title:P.listening.title}:null;
 return `${boardHTML({t:P.title,n:P.n})}
 <p class="ready" style="margin-top:6px"><button class="btn" onclick="pDeck('${P.id}')">▶ Тактага чыгаруу (слайддар)</button><button class="btn alt" onclick="pGame(PL_ID['${P.id}'],'cards')">🃏 Флешкарталар</button><button class="btn mint" onclick="pGame(PL_ID['${P.id}'],'quiz')">❓ Даяр квиз</button><button class="btn sky" onclick="pGame(PL_ID['${P.id}'],'${pickG(P)}')">${GAMES[pickG(P)][0]}</button></p>
 ${code||''}
 <div class="two" style="margin-top:12px"><div class="card"><h4>🎯 Максат</h4><p>${esc(P.goal_ky||'')}</p><ul style="margin:0;padding-left:18px">${(P.outcomes_ky||[]).map(o=>`<li>${esc(o)}</li>`).join('')}</ul></div>
 <div class="card"><h4>ℹ️ ${esc(P.level)} · ${esc(P.age||'')}</h4><p>Сүйлөө деңгээли: <b>${P.speak} · ${SPK[P.speak]||''}</b> (${SPK_KY[P.speak]||''})</p>${P.homework_ky?`<p>🏠 <b>Үй тапшырма:</b> ${esc(P.homework_ky)}</p>`:''}</div></div>
 <div class="stages">
  ${P.warmup?`<div class="st" style="--c:var(--butter)"><div><b>Жылытуу</b><small>${P.warmup.min||5} мүнөт</small></div><div><b>${esc(P.warmup.name)}</b>: ${esc(P.warmup.how_ky)}</div></div>`:''}
  <div class="st" style="--c:var(--sky)"><div><b>Сөздөр</b><small>${(P.vocab||[]).length} сөз</small></div><div><div class="tw"><table><tr><th>English</th><th>Айтылышы</th><th>Кыргызча</th><th>Мисал</th><th></th></tr>${(P.vocab||[]).map(w=>`<tr><td><b class="en">${esc(w.en)}</b></td><td>${esc(w.pron||'')}</td><td>${esc(w.ky)}</td><td>${esc(w.ex||'')}</td><td>${sayBtn(w.en)}</td></tr>`).join('')}</table></div></div></div>
  ${P.grammar?`<div class="st" style="--c:var(--plum)"><div><b>Грамматика</b><small>${esc(P.grammar.title)}</small></div><div>${esc(P.grammar.rule_ky)}<br>${(P.grammar.examples||[]).map(e=>`<i class="en">${esc(e)}</i>`).join(' · ')}</div></div>`:''}
  ${P.slides?`<div class="st" style="--c:var(--mint)"><div><b>Презентация</b><small>даяр слайддар</small></div><div><b>${esc(P.slides.title)}</b>. ${esc(P.slides.how_ky||'')}<br><a class="pl" href="${P.slides.url}" target="_blank" rel="noopener">📑 Ачуу ↗</a></div></div>`:''}
  ${boardGamesRow(k=>`pBG('${P.id}','${k}')`)}
  ${(P.games||[]).slice(0,2).map((g,j)=>`<div class="st" style="--c:var(--cherry)"><div><b>Оюн ${j+1}</b><small>${esc(g.platform)}</small></div><div><b>${esc(g.name)}</b> · ${badges(g)}<br>📂 ${esc(g.open_ky||'')}<br>🎮 ${esc(g.how_ky||'')}<br>⏱ ${esc(g.stage_ky||'')}<br><a class="pl" href="${g.url}" target="_blank" rel="noopener">▶ Оюнду ачуу ↗</a></div></div>`).join('')}
  ${(P.offline||[]).map(o=>`<div class="st" style="--c:var(--pink)"><div><b>Класстагы оюн</b><small>техникасыз</small></div><div><b>${esc(o.name)}</b>: ${esc(o.how_ky)}</div></div>`).join('')}
  ${P.speaking?`<div class="st" style="--c:var(--k2)"><div><b>Talking Club</b><small>${SPK[P.speak]||''}</small></div><div>${(P.speaking.questions||[]).map(q=>`<div>❓ <i class="en">${esc(q)}</i> ${sayBtn(q)}</div>`).join('')}<div style="margin-top:8px;background:#fff;border-radius:12px;padding:8px 12px">${(P.speaking.dialogue||[]).map(d=>`<div><b>${esc(d[0])}:</b> <i class="en">${esc(d[1])}</i></div>`).join('')}</div><p style="margin:6px 0 0"><button class="btn sm ghost" onclick="openM('🎡 Talking Club');gWheel([],[],[],PL_ID['${P.id}'].speaking.questions)">🎡 Суроолор дөңгөлөгү</button></p></div></div>`:''}
  ${P.reading?`<div class="st" style="--c:var(--k3)"><div><b>Окуу</b><small>котормосу менен</small></div><div><p style="margin:0" class="en">${esc(P.reading.en)}</p><details><summary style="cursor:pointer;color:var(--ink2)">Котормосун көрсөтүү</summary>${esc(P.reading.ky)}</details></div></div>`:''}
  ${P.listening?`<div class="st" style="--c:var(--k4)"><div><b>Угуу</b><small>видео / ыр</small></div><div><b>${esc(P.listening.title||'')}</b>. ${esc(P.listening.how_ky||'')}${v?`<div style="max-width:520px;margin-top:8px">${vidHTML(v)}</div>`:''}</div></div>`:''}
  ${(P.quiz||[]).length?`<div class="st" style="--c:var(--k1)"><div><b>Жыйынтык квиз</b><small>${P.quiz.length} суроо</small></div><div>${P.quiz.map((q,j)=>`<div>${j+1}. ${esc(q.q)} <small style="color:var(--ink2)">(${q.options.map(esc).join(' / ')})</small></div>`).join('')}<details><summary style="cursor:pointer;color:var(--ink2)">Жооптор</summary>${P.quiz.map((q,j)=>`${j+1}) <b>${esc(q.answer)}</b>`).join(' · ')}</details><p style="margin:6px 0 0"><button class="btn sm" onclick="pQuiz('${P.id}')">❓ Тактада квизди ойнотуу</button></p></div></div>`:''}
 </div>`}
function pickG(P){const c=Object.keys(GAMES);return c[(P.n*4+(P.track==='TEEN'?3:P.track==='ADV'?6:0))%c.length]}
function pQuiz(id){const P=PL_ID[id];openM('❓ '+P.title);let qi=0;setS(0);const C=['var(--k1)','var(--k2)','var(--k3)','var(--k4)'];
 const show=()=>{if(qi>=P.quiz.length){$('#mb').innerHTML=`<p class="qw">🏁 ${score} / ${P.quiz.length}</p>`;return}const q=P.quiz[qi];
  $('#mb').innerHTML=`<p class="center" style="color:var(--muted)">${qi+1} / ${P.quiz.length}</p><p class="qw" style="font-size:28px">${esc(q.q)}</p><div class="qopts">${q.options.map((o,j)=>`<button style="background:${C[j%4]}" data-ok="${o===q.answer}">${esc(o)}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
  $('#mb').querySelectorAll('.qopts button').forEach(b=>b.onclick=()=>{const ok=b.dataset.ok==='true';if(ok)setS(score+1);$('#fb').textContent=ok?'✅ Туура!':'❌ '+q.answer;qi++;setTimeout(show,1200)})};show()}
function pDeck(id){const P=PL_ID[id];const W=(P.vocab||[]).slice(0,8);const G=(P.games||[]).slice(0,2);
 DECK=[boardHTML({t:P.title,n:P.n},true),
  P.warmup?`<div class="sl"><span class="sl-k">Warm-up</span><h2>${esc(P.warmup.name)}</h2><div class="sl-t">${esc(P.warmup.how_ky)}</div></div>`:'',
  `<div class="sl"><span class="sl-k">New words</span><h2>Let's learn!</h2><div class="sl-words">${W.map(w=>`<button onclick="say('${w.en.replace(/'/g,"\\'")}')"><b>${esc(w.en)}</b><small>${esc(w.ky)}</small></button>`).join('')}</div></div>`,
  P.grammar?`<div class="sl"><span class="sl-k">Grammar</span><h2>${esc(P.grammar.title)}</h2>${(P.grammar.examples||[]).map(e=>`<p class="sl-big" onclick="say(this.textContent)">${esc(e)}</p>`).join('')}</div>`:'',
  P.speaking?`<div class="sl"><span class="sl-k">Talking Club</span><h2>Let's talk!</h2>${P.speaking.questions.slice(0,3).map(q=>`<p class="sl-big" onclick="say(this.textContent)">${esc(q)}</p>`).join('')}<div class="sl-t">${(P.speaking.dialogue||[]).map(d=>`<b>${esc(d[0])}:</b> ${esc(d[1])}`).join('<br>')}</div></div>`:'',
  `<div class="sl"><span class="sl-k">Come to the board!</span><h2>Board games 🎲</h2><p class="sl-btns"><button class="btn alt" onclick="closeDeck();pBG('${P.id}','speak')">🗣️ Speaking Cards</button><button class="btn alt" onclick="closeDeck();pBG('${P.id}','show')">🏆 Quiz Show</button><button class="btn alt" onclick="closeDeck();pBG('${P.id}','board')">🎲 Board Game</button></p></div>`,
  `<div class="sl"><span class="sl-k">Game time</span><h2>Let's play! 🏆</h2><p class="sl-btns"><button class="btn alt" onclick="closeDeck();pGame(PL_ID['${P.id}'],'cards')">🃏 Флешкарталар</button><button class="btn alt" onclick="closeDeck();pGame(PL_ID['${P.id}'],'${pickG(P)}')">${GAMES[pickG(P)][0]}</button><button class="btn ghost" onclick="closeDeck();toolScore()">🏆 Эсеп</button></p>${G.length?`<p class="sl-btns">${G.map(g=>`<a class="btn sky" href="${g.url}" target="_blank" rel="noopener">🌐 ${esc(g.name)} ↗</a>`).join('')}</p>`:''}${(P.offline||[]).map(o=>`<p class="sl-t"><b>${esc(o.name)}</b>: ${esc(o.how_ky)}</p>`).join('')}</div>`,
  P.reading?`<div class="sl"><span class="sl-k">Reading</span><h2>Read and say</h2><p class="sl-big" style="font-size:clamp(20px,2.6vw,32px)">${esc(P.reading.en)}</p></div>`:'',
  P.listening&&P.listening.yt?`<div class="sl"><span class="sl-k">Listening</span><h2>${esc(P.listening.title||'Listen!')}</h2><div style="max-width:760px">${vidHTML({id:P.listening.yt,title:''})}</div></div>`:'',
  `<div class="sl"><span class="sl-k">Final check</span><h2>Quiz time ✅</h2><p class="sl-btns"><button class="btn alt" onclick="closeDeck();pQuiz('${P.id}')">❓ Квизди баштоо</button></p>${P.homework_ky?`<p class="sl-q">Homework 🏠</p><div class="sl-t">${esc(P.homework_ky)}</div>`:''}</div>`].filter(Boolean);
 DI=0;let d=document.getElementById('deck');if(!d){d=document.createElement('div');d.id='deck';document.body.append(d)}
 d.innerHTML=`<div class="dk-stage" id="dks"></div><div class="dk-bar"><button class="x" onclick="deckGo(-1)">‹</button><span id="dkn"></span><button class="x" onclick="deckGo(1)">›</button><button class="x" onclick="(document.fullscreenElement?document.exitFullscreen():document.getElementById('deck').requestFullscreen()).catch(()=>{})">⛶</button><button class="x" onclick="closeDeck()">×</button></div>`;
 d.classList.add('on');deckGo(0)}

/* Окуучу үчүн кыска карта */
function pStudentCard(P){const v=P.listening&&P.listening.yt?{id:P.listening.yt,title:P.listening.title}:null;
 return `<div class="lc" id="Lp_${P.id}"><div><span class="tag">${esc(P.id)}</span> <span class="tag y">${esc(P.level)}</span></div><h4>${esc(P.title)}</h4>
 <div class="words">${(P.vocab||[]).slice(0,8).map(w=>`<button onclick="say('${w.en.replace(/'/g,"\\'")}')"><b>🔊 ${esc(w.en)}</b><small>${esc(w.ky)}</small></button>`).join('')}</div>
 <div class="gb">${['cards','match','quiz','memory','hang','tf'].map((k,j)=>`<button style="background:${GC[j]}" onclick="pGame(PL_ID['${P.id}'],'${k}')">${k==='cards'?'🃏 Флешкарта':GAMES[k][0]}</button>`).join('')}</div>
 ${P.reading?`<p style="margin:0" class="en">${esc(P.reading.en)}</p>`:''}
 ${v?vidHTML(v):''}
 ${P.homework_ky?`<p style="margin:0;font-size:14px">🏠 ${esc(P.homework_ky)}</p>`:''}</div>`}
