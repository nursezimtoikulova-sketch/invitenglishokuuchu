/* ===== Грамматика бөлүмү: түшүндүрмө + көнүгүүлөр ===== */
window.GRAMMAR=window.GRAMMAR||{topics:[]};
let GLV='Баары';
function gLevels(){return ['Баары',...new Set(GRAMMAR.topics.map(t=>t.level))]}
function renderGrammar(){const el=$('#gtopics');if(!el)return;const T=GRAMMAR.topics;
 if(!T.length){el.innerHTML='<p class="sub">Грамматика бөлүмү даярдалууда.</p>';return}
 $('#glevels').innerHTML=gLevels().map(l=>`<button class="chip ${l===GLV?'on':''}" onclick="GLV='${l}';renderGrammar()">${esc(l)}</button>`).join('');
 el.innerHTML=T.filter(t=>GLV==='Баары'||t.level===GLV).map(t=>`<div class="card lift" style="cursor:pointer" onclick="openGram('${t.id}')"><span class="tag p">${esc(t.level)}</span><h4 style="margin-top:8px">${esc(t.title)}</h4><p>${esc(t.title_ky||'')}</p><p style="font-size:14px">${esc((t.examples||[])[0]?t.examples[0].en:'')}</p></div>`).join('')}
function gT(id){return GRAMMAR.topics.find(t=>t.id===id)}
function openGram(id){const t=gT(id);openM('📘 '+t.title);
 $('#mb').innerHTML=`<p><span class="tag p">${esc(t.level)}</span> <b>${esc(t.title_ky||'')}</b></p>
 <div class="card" style="background:#ece0f7;border:0"><h4>Качан колдонулат?</h4><p style="margin:0;color:var(--ink)">${esc(t.when_ky||'')}</p></div>
 ${(t.form||[]).length?`<div class="tw" style="margin:12px 0"><table>${t.form.map(f=>`<tr><th style="width:60px;font-size:20px;text-align:center">${esc(f[0])}</th><td><b>${esc(f[1])}</b></td></tr>`).join('')}</table></div>`:''}
 <p>${esc(t.rule_ky||'')}</p>
 ${(t.signal||[]).length?`<p>🔎 <b>Белги сөздөр:</b> ${t.signal.map(s=>`<span class="tag y">${esc(s)}</span>`).join(' ')}</p>`:''}
 <h4>Мисалдар</h4>${(t.examples||[]).map(e=>`<div style="margin:4px 0"><button class="btn sm ghost" onclick="say(this.nextElementSibling.textContent)">🔊</button> <i class="en">${esc(e.en)}</i> <small style="color:var(--ink2)">${esc(e.ky||'')}</small></div>`).join('')}
 ${(t.mistakes||[]).length?`<h4>Көп кетирилген каталар</h4>${t.mistakes.map(m=>`<div style="margin:4px 0">❌ <s>${esc(m.wrong)}</s> → ✅ <b>${esc(m.right)}</b> <small style="color:var(--ink2)">${esc(m.why_ky||'')}</small></div>`).join('')}`:''}
 <p class="ready" style="margin-top:16px"><button class="btn" onclick="gramQuiz('${t.id}')">✏️ Көнүгүү (${(t.exercises||[]).length})</button><button class="btn alt" onclick="gramDeck('${t.id}')">▶ Тактага чыгаруу</button>${(t.speak||[]).length?`<button class="btn mint" onclick="openM('🗣️ ${esc(t.title)}');gWheel([],[],[],gT('${t.id}').speak)">🗣️ Сүйлөө</button>`:''}</p>`}
function gramQuiz(id){const t=gT(id);openM('✏️ '+t.title);const Q=shuffle(t.exercises||[]);let qi=0;setS(0);const C=['var(--k1)','var(--k2)','var(--k3)','var(--k4)'];
 const show=()=>{if(qi>=Q.length){$('#mb').innerHTML=`<p class="qw">🏁 ${score} / ${Q.length}</p><p class="center"><button class="btn" onclick="gramQuiz('${id}')">Кайра</button> <button class="btn ghost" onclick="openGram('${id}')">← Эреже</button></p>`;return}const q=Q[qi];
  $('#mb').innerHTML=`<p class="center" style="color:var(--muted)">${qi+1} / ${Q.length}</p><p class="qw" style="font-size:clamp(20px,3vw,30px)">${esc(q.q)}</p><div class="qopts">${shuffle(q.options).map((o,j)=>`<button style="background:${C[j%4]}" data-ok="${o===q.answer}">${esc(o)}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
  $('#mb').querySelectorAll('.qopts button').forEach(b=>b.onclick=()=>{const ok=b.dataset.ok==='true';if(ok)setS(score+1);$('#fb').textContent=ok?'✅ Туура!':'❌ Туурасы: '+q.answer;say(q.q.replace(/_+/,q.answer).replace(/\(.*?\)/g,''));qi++;setTimeout(show,1500)})};show()}
function gramDeck(id){const t=gT(id);closeM();
 DECK=[`<div class="sl"><span class="sl-k">Grammar · ${esc(t.level)}</span><h2>${esc(t.title)}</h2><p class="sl-q">${esc(t.title_ky||'')}</p><div class="sl-t">${esc(t.when_ky||'')}</div></div>`,
  `<div class="sl"><span class="sl-k">Form</span><h2>How to make it</h2>${(t.form||[]).map(f=>`<p class="sl-big"><b>${esc(f[0])}</b> ${esc(f[1])}</p>`).join('')}${(t.signal||[]).length?`<p class="sl-t">🔎 ${t.signal.map(esc).join(' · ')}</p>`:''}</div>`,
  `<div class="sl"><span class="sl-k">Examples</span><h2>Listen and repeat</h2>${(t.examples||[]).slice(0,5).map(e=>`<p class="sl-big" style="font-size:clamp(20px,2.8vw,34px)" onclick="say(this.textContent)">${esc(e.en)}</p>`).join('')}</div>`,
  (t.mistakes||[]).length?`<div class="sl"><span class="sl-k">Be careful!</span><h2>Mistakes</h2>${t.mistakes.map(m=>`<p class="sl-big" style="font-size:clamp(18px,2.4vw,30px)">❌ <s>${esc(m.wrong)}</s> → ✅ ${esc(m.right)}</p>`).join('')}</div>`:'',
  `<div class="sl"><span class="sl-k">Practice</span><h2>Your turn! ✏️</h2><p class="sl-btns"><button class="btn alt" onclick="closeDeck();gramQuiz('${id}')">✏️ Көнүгүү</button>${(t.speak||[]).length?`<button class="btn alt" onclick="closeDeck();openM('🗣️');gWheel([],[],[],gT('${id}').speak)">🗣️ Сүйлөө</button>`:''}</p></div>`].filter(Boolean);
 DI=0;let d=document.getElementById('deck');if(!d){d=document.createElement('div');d.id='deck';document.body.append(d)}
 d.innerHTML=`<div class="dk-stage" id="dks"></div><div class="dk-bar"><button class="x" onclick="deckGo(-1)">‹</button><span id="dkn"></span><button class="x" onclick="deckGo(1)">›</button><button class="x" onclick="(document.fullscreenElement?document.exitFullscreen():document.getElementById('deck').requestFullscreen()).catch(()=>{})">⛶</button><button class="x" onclick="closeDeck()">×</button></div>`;
 d.classList.add('on');deckGo(0)}
