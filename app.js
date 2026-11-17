const GRADES=[3,4,5,6,7,8,9];
const MY={3:'3(12)',4:'4',5:'5',7:'7(11), 7(12)',9:'9'};
const QN=['I','II','III','IV'],QC=[18,14,15,21],QD=['15.09–10.11.2026','16.11–31.12.2026','11.01–02.03.2027','09.03–25.05.2027'];
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
function qOf(n){let s=0;for(let i=0;i<4;i++){s+=QC[i];if(n<=s)return i}return 3}

/* ===== Темалык сөз банкы ===== */
const BANK=[
 [/family|parent|aunt|uncle|relationship|children/i,'Үй-бүлө',{mother:'апа',father:'ата',sister:'эже-сиңди',brother:'ага-ини',grandmother:'чоң апа',grandfather:'чоң ата',aunt:'таеже',cousin:'бөлө'}],
 [/food|meal|cake|cook|breakfast|lunch|dinner|eat|fruit|shop.*food/i,'Тамак-аш',{bread:'нан',cheese:'сыр',rice:'күрүч',soup:'шорпо',milk:'сүт',apple:'алма',meat:'эт',egg:'жумуртка'}],
 [/animal|zoo|zebra|frog|tiger|pet|farm|dinosaur|jungle/i,'Жаныбарлар',{cat:'мышык',dog:'ит',frog:'бака',fish:'балык',horse:'жылкы',elephant:'пил',tiger:'жолборс',lion:'арстан'}],
 [/cloth|wear|dress|uniform|fashion/i,'Кийим',{coat:'пальто',hat:'шапке',cap:'кепка',dress:'көйнөк',shoes:'бут кийим',scarf:'жоолук',jacket:'куртка',trousers:'шым'}],
 [/weather|season|summer|winter|climate|hot|rain|storm/i,'Аба ырайы',{sunny:'күн ачык',rainy:'жаанчыл',snow:'кар',wind:'шамал',cold:'суук',hot:'ысык',winter:'кыш',spring:'жаз'}],
 [/school|classroom|bag|lesson|subject|homework/i,'Мектеп',{book:'китеп',pen:'калем',pencil:'карандаш',desk:'парта',board:'доска',bag:'сумка',ruler:'сызгыч',teacher:'мугалим'}],
 [/toy|doll|robot|teddy/i,'Оюнчуктар',{ball:'топ',doll:'куурчак',robot:'робот',train:'поезд',kite:'батпырак',car:'машина',puzzle:'пазл',teddy:'аюу оюнчук'}],
 [/body|health|well|ill|doctor|matter|accident/i,'Ден соолук',{head:'баш',hand:'кол',leg:'бут',eye:'көз',ear:'кулак',tooth:'тиш',headache:'баш оору',medicine:'дары'}],
 [/house|home|room|kitchen|furniture|dream house|flat/i,'Үй',{kitchen:'ашкана',bedroom:'уктоочу бөлмө',garden:'бакча',window:'терезе',door:'эшик',sofa:'диван',bed:'керебет',table:'стол'}],
 [/time|day|month|clock|week|tv|routine|daily/i,'Убакыт',{Monday:'дүйшөмбү',Tuesday:'шейшемби',Wednesday:'шаршемби',Thursday:'бейшемби',Friday:'жума',Saturday:'ишемби',Sunday:'жекшемби',clock:'саат'}],
 [/hobb|free time|weekend|fun|entertain|music|song|sing/i,'Хобби',{swimming:'сүзүү',reading:'окуу',drawing:'сүрөт тартуу',singing:'ырдоо',dancing:'бийлөө',football:'футбол',chess:'шахмат',cooking:'тамак жасоо'}],
 [/sport|athlet|olymp|wrestl|jump|dive|run|quick|slow|hockey|tennis|football|skate|play (hockey|tennis|football|chess)/i,'Спорт',{run:'чуркоо',jump:'секирүү',swim:'сүзүү',wrestling:'күрөш',team:'команда',win:'жеңүү',coach:'машыктыруучу',medal:'медаль'}],
 [/travel|holiday|transport|going places|trip|journey|camp|beach|postcard|day out|circus/i,'Саякат',{bus:'автобус',train:'поезд',plane:'учак',ticket:'билет',map:'карта',airport:'аэропорт',suitcase:'чемодан',hotel:'мейманкана'}],
 [/direction|get there|along|across|place|town|city|map/i,'Багыттар',{left:'сол',right:'оң',straight:'түз',bridge:'көпүрө',along:'бойлото',across:'аркылуу',over:'үстүнөн',corner:'бурч'}],
 [/nature|mountain|river|island|cave|castle|world|geograph|planet|space|moon/i,'Жаратылыш',{mountain:'тоо',river:'дарыя',lake:'көл',forest:'токой',desert:'чөл',island:'арал',cave:'үңкүр',sea:'деңиз'}],
 [/countr|flag|nationalit|language|english-speaking|kyrgyzstan|motherland|canada|britain|usa|australia|international/i,'Өлкөлөр',{country:'өлкө',flag:'желек',language:'тил',capital:'борбор',city:'шаар',Kyrgyz:'кыргыз',England:'Англия',Canada:'Канада'}],
 [/appearance|character|describ|person|people|famous|friend/i,'Мүнөз',{tall:'бийик',short:'кыска',kind:'боорукер',funny:'күлкүлүү',clever:'акылдуу',friendly:'ачык мүнөз',shy:'уялчаак',brave:'кайраттуу'}],
 [/job|profession|work|career|future/i,'Кесиптер',{doctor:'доктур',teacher:'мугалим',engineer:'инженер',driver:'айдоочу',farmer:'дыйкан',cook:'ашпозчу',pilot:'учкуч',nurse:'медайым'}],
 [/culture|tradition|national|nooruz|celebrat|festival|custom|heritage/i,'Салттар',{yurt:'боз үй',holiday:'майрам',tradition:'салт',guest:'конок',komuz:'комуз',heritage:'мурас',proud:'сыймыктануу',citizen:'жаран'}],
 [/art|painter|theatre|cinema|film|artist|museum|actor/i,'Искусство',{painting:'сүрөт',portrait:'портрет',landscape:'пейзаж',actor:'актер',director:'режиссер',stage:'сахна',film:'тасма',artist:'сүрөтчү'}],
 [/techno|science|invent|computer|internet|gadget|made of|microscope|media/i,'Технология',{computer:'компьютер',phone:'телефон',internet:'интернет',invention:'ойлоп табуу',scientist:'окумуштуу',experiment:'тажрыйба',screen:'экран',message:'билдирүү'}],
 [/environment|ecolog|recycl|pollut|save|green|earth/i,'Экология',{recycle:'кайра иштетүү',rubbish:'таштанды',plastic:'пластик',tree:'дарак',pollution:'булгануу',energy:'энергия',water:'суу',protect:'коргоо'}],
 [/shop|money|buy|price|market|spend/i,'Соода',{shop:'дүкөн',price:'баа',cheap:'арзан',expensive:'кымбат',buy:'сатып алуу',money:'акча',market:'базар',sell:'сатуу'}],
 [/feel|emotion|happy|mood/i,'Сезимдер',{happy:'бактылуу',sad:'капалуу',angry:'ачуулуу',tired:'чарчаган',scared:'корккон',excited:'толкунданган',bored:'зериккен',surprised:'таң калган'}],
 [/number|count|how many|alphabet/i,'Сандар',{one:'бир',two:'эки',three:'үч',four:'төрт',five:'беш',six:'алты',seven:'жети',ten:'он'}],
 [/colou?r/i,'Түстөр',{red:'кызыл',blue:'көк',green:'жашыл',yellow:'сары',black:'кара',white:'ак',pink:'кызгылт',brown:'күрөң'}],
 [/must|rule|should|let|allow|help/i,'Эрежелер',{rule:'эреже',must:'милдеттүү',homework:'үй тапшырма',help:'жардам',chores:'үй жумушу',allow:'уруксат берүү',polite:'сылык',careful:'этият'}],
 [/./,'Этиштер',{go:'баруу',eat:'жеш',play:'ойноо',read:'окуу',write:'жазуу',swim:'сүзүү',run:'чуркоо',sleep:'уктоо'}]
];
const LETTERWORDS={a:'apple',b:'ball',c:'cat',d:'dog',e:'egg',f:'fish',g:'girl',h:'hat',i:'ink',j:'jam',k:'kite',l:'lion',m:'milk',n:'nest',o:'orange',p:'pen',q:'queen',r:'robot',s:'sun',t:'tree',u:'umbrella',v:'van',w:'window',x:'box',y:'yo-yo',z:'zebra'};
const LETTERKY={apple:'алма',ball:'топ',cat:'мышык',dog:'ит',egg:'жумуртка',fish:'балык',girl:'кыз',hat:'шапке',ink:'сыя',jam:'кыям',kite:'батпырак',lion:'арстан',milk:'сүт',nest:'уя',orange:'апельсин',pen:'калем',queen:'ханыша',robot:'робот',sun:'күн',tree:'дарак',umbrella:'кол чатыр',van:'фургон',window:'терезе',box:'куту',['yo-yo']:'йо-йо',zebra:'зебра'};

function themeOf(t){for(const b of BANK)if(b[0].test(t))return b;return BANK[BANK.length-1]}
function typeOf(t){const s=t.toLowerCase();
 if(/letters?\s|alphabet|phonics/.test(s))return'letters';
 if(/test|control|assessment|summative|сор|соч/.test(s))return'test';
 if(/revision|review|consolidat/.test(s))return'revision';
 if(/project/.test(s))return'project';
 if(/listening/.test(s))return'listening';
 if(/grammar/.test(s))return'grammar';
 if(/vocabulary|words/.test(s))return'vocab';
 if(/reading|story/.test(s))return'reading';
 if(/writing/.test(s))return'writing';
 if(/speaking|introduction/.test(s))return'speaking';
 return'speaking'}
const TYPEKY={letters:'Тамгалар',test:'Текшерүү',revision:'Кайталоо',project:'Долбоор',listening:'Угуу',grammar:'Грамматика',vocab:'Лексика',reading:'Окуу',writing:'Жазуу',speaking:'Сүйлөө'};

function lessonData(g,i){
 const [t,v]=KTP[g][i];const n=i+1;const th=themeOf(t);const ty=typeOf(t);
 let pairs=Object.entries(th[2]);
 if(ty==='letters'){const ls=(t.match(/\b([A-Za-z])\1?\b|\b[A-Z][a-z]\b/g)||[]).map(x=>x[0].toLowerCase());
  const lp=[...new Set(ls)].filter(c=>LETTERWORDS[c]).map(c=>[LETTERWORDS[c],LETTERKY[LETTERWORDS[c]]]);
  if(lp.length>=2)pairs=lp.concat(pairs).slice(0,8)}
 const raw=(v||'').split(/\s*[|,]\s*/).map(s=>s.replace(/\s+/g,' ').trim()).filter(Boolean);
 const extra=raw.filter(s=>/^[a-z][a-z'-]{1,13}$/i.test(s)&&!/^(the|and|is|are|am|a|an|in|on|of|to|or|it|all|topics|with)$/i.test(s));
 const DICT=window.DICT||(window.DICT=Object.assign({hello:'салам',hi:'салам',goodbye:'саламатта кал',yes:'ооба',no:'жок',friend:'дос',boy:'бала',girl:'кыз',jug:'кумура',key:'ачкыч',toy:'оюнчук',shop:'дүкөн',box:'куту',bus:'автобус',zoo:'зоопарк',park:'парк',cake:'торт',knife:'бычак',beach:'пляж',holiday:'майрам',moon:'ай',sun:'күн',star:'жылдыз',tree:'дарак',flower:'гүл',cousin:'бөлө',grandparents:'чоң ата-чоң апа',like:'жактыруу',ticket:'билет',quickly:'тез',slowly:'жай',usually:'адатта',always:'дайыма',never:'эч качан',portrait:'портрет',patriotism:'патриотизм',citizen:'жаран',heritage:'мурас',season:'мезгил',dry:'кургак',wet:'нымдуу'},LETTERKY,...BANK.map(b=>b[2])));
 const own=[...new Set(extra.map(x=>x.toLowerCase()))].filter(x=>DICT[x]).map(x=>[x,DICT[x]]);
 if(own.length>=2){const seen=new Set(own.map(p=>p[0]));pairs=own.concat(pairs.filter(p=>!seen.has(p[0]))).slice(0,8)}
 let phrases=raw.filter(s=>s.split(' ').length>=3&&/^[A-Za-z' ?.!-]+$/.test(s)&&!/  /.test(s)).map(s=>/[.?!]$/.test(s)?s:s+(s.startsWith('What')||s.startsWith('Do')||s.startsWith('Is')||s.startsWith('Have')||s.startsWith('Can')?'?':'.'));
 const w=pairs.map(p=>p[0]);
 if(phrases.length<2)phrases=phrases.concat([`I like the ${w[0]}.`,`This is my ${w[1]}.`,`Can you see the ${w[2]}?`,`We talk about ${th[1]==='Этиштер'?'our day':w[3]}.`]).slice(0,4);
 const words=[...new Set(extra.concat(w))].slice(0,10);
 return {g,n,t,v,th:th[1],ty,pairs,words,phrases,q:qOf(n)};
}

/* ===== Сабактын структурасы ===== */
const pick=(a,k)=>a[k%a.length];
function stages(L){
 const w=L.words,p=L.phrases,ew=s=>`<i class="en">${esc(s)}</i>`;const k=L.n+L.g;
 const warm=[
  `«Up-down»: мугалим ${ew(w[0])}, ${ew(w[1])} деп айтат. Сөз туура болсо окуучулар туруп, туура эмес болсо отурат.`,
  `«Near-far»: тактага 4 сүрөт илинет. Мугалим ${ew('near / far')} деп көрсөтөт, окуучулар жооп берет.`,
  `Mind Map: тактанын ортосуна «${esc(L.th)}» деп жазылат. 2 мүнөттө класс билген сөздөрүн чогултат.`,
  `«Are you ready?» коңгуроо оюну: ${ew(w.slice(0,4).join(', '))} сөздөрүн ким биринчи айтат?`,
  `Суроо-чынжыр: ${ew('How are you today? What did you do yesterday?')}: ар бир окуучу кийинкисине суроо берет.`,
  `«Don't touch the colour»: мугалим түстү айтат, окуучулар класстагы ошол түстү таап, англисче атайт.`];
 const learn={
  letters:`Тамгаларды тактага жазуу, үнүн айтуу (phonics), ар бир тамгага сөз: ${ew(w.slice(0,3).join(', '))}. Окуучулар тамганы колу менен абага тартып айтат.`,
  vocab:`Жаңы сөздөр сүрөт/буюм аркылуу: ${ew(w.slice(0,6).join(', '))}. Хор менен кайталоо → жарым класс → жалгыз окуучу. Котормо акыркы кезекте.`,
  grammar:`Эрежени үлгү сүйлөмдөн чыгаруу: ${ew(p[0])}. Түстүү бор менен структураны белгилөө. Эреже 3 мүнөттөн ашпайт, андан кийин дароо оозеки колдонуу.`,
  speaking:`Сүйлөө үлгүсү: ${ew(p[0])}. Мугалим + күчтүү окуучу диалогду көрсөтөт, андан кийин түгөйлөр.`,
  listening:`Угуудан мурун: сөздөрдү алдын ала айтуу (${ew(w.slice(0,4).join(', '))}). Угуунун максатын коюу: «3 сөздү тап».`,
  reading:`Текстке чейин: аталышы боюнча болжолдоо. Негизги сөздөр: ${ew(w.slice(0,5).join(', '))}. Текстти үн чыгарбай окуп, 1 суроого жооп табуу.`,
  writing:`Үлгү текстти талдоо: түзүлүшү (башталышы, негизги бөлүк, аягы). Пайдалуу сөз айкаштары: ${ew(p[0])}.`,
  revision:`Бөлүмдүн негизги сөздөрү жана үлгүлөрү: ${ew(w.slice(0,6).join(', '))}. Класс менен Mind Map толтуруу.`,
  test:`Тапшырмалардын түрлөрүн түшүндүрүү, мисал аткаруу. Окуучулар 1 мүнөт мурунку темаларды кайталайт.`,
  project:`Долбоордун максаты жана планы. Топторго бөлүү (3–4 окуучу), ролдорду бөлүштүрүү. Үлгү: ${ew(p[0])}.`}[L.ty];
 const prac=[
  `Түгөйлөрдө иштөө: ${ew(p[0])} / ${ew(p[1]||p[0])} үлгүлөрү менен диалог түзүү. 3 мүнөттөн кийин түгөйлөрдү алмаштыруу.`,
  `Draw & Guess тору: тактада 3×3 тор, ар бир клеткада сөз. Бир окуучу тартат, команда табат.`,
  `Ролдук оюн: дүкөн, мектеп, көчө. Ар бир окуучу кеминде 3 сүйлөм айтат.`,
  `Карточкалар: окуучулар ${ew(w.slice(0,4).join(', '))} карточкаларын алып, сүйлөм ойлоп айтат.`,
  `«Find someone who...»: окуучулар класста басып, суроо беришет (${ew('Do you like...? Have you got...?')}).`];
 /*MOREWARM*/
 warm.push(`«Simon says»: ${ew('Simon says touch your head!')}. Буйрукту англисче угуп аткаруу.`,`«Hot seat»: бир окуучу тактага арты менен отурат, класс ${ew(w[2]||w[0])} сөзүн түшүндүрөт, ал табат.`,`«Odd one out» тактада: ${ew(w.slice(0,3).join(', '))} + бир артык сөз. Ким тапса, себебин айтат.`,`Сүрөт боюнча 1 мүнөт: «What can you see?». Ар бир окуучу бир сүйлөм.`,`«Word chain»: мурунку сөздүн акыркы тамгасынан жаңы сөз (${ew('cat → tree → egg')}).`,`Ыр менен баштоо: темага 2 мүнөттүк ыр, класс кошулуп ырдайт.`);
 prac.push(`«Interview»: түгөйлөр бири-биринен 5 суроо сурап, жоопторун жазат, анан класска айтып берет.`,`«Information gap»: А жана Б карточкаларында ар башка маалымат. Суроо берип, бош жерлерди толтуруу.`,`Галерея-басуу (gallery walk): дубалда 5 сүрөт, ар биринин алдына топтор сүйлөм жазат.`,`«Board race»: эки команда тактага кезек менен ${ew(w.slice(0,4).join(', '))} менен сүйлөм жазат.`,`Ролдук оюн-интервью: «журналист» жана «белгилүү адам». Үлгү: ${ew(p[0])}`);
 const comp=pick(['Cup Challenge: команданын өкүлү сөздү туура айтса, стакан пирамидасына стакан коёт.','Сөз карточкаларын урганча тап (slap game): мугалим сөздү айтат, эки окуучу карточканы биринчи урууга аракет кылат.','Командалык викторина: экрандагы оюн + «Командалык эсеп» куралы.','«Are you ready?» коңгуроо: суроого ким биринчи коңгуроо кагып жооп берет.','Don\'t touch the colour: түстүү карточкалардан сырткары жерге басып, сөз айтуу.','Draw & Guess тору: команданын өкүлү сөздү тартат, команда 30 секундда табат.','«Board race»: эки команда тактага кезек менен чуркап, сөз жазат.','«Hot potato»: музыка токтогондо топ кимде болсо, ошол сөз айтат.','Командалык «Spelling bee»: сөздү тамгалап айтуу.','«Pictionary relay»: ар бир окуучу бир сөздү тартат, команда кезек менен табат.'],k*3);
 const listen={listening:`Аудио/видеону эки жолу угуу: 1) жалпы маани, 2) так маалымат. LyricsTraining же Edpuzzle аркылуу ыр/видео менен кошумча угуу.`}[L.ty]||pick([`Мугалим ${ew(p[0])} сыяктуу 5 сүйлөм окуйт. Окуучулар туура/туура эмес деп белги көрсөтөт.`,`Кыска ыр же видео (2–3 мүн): угуп, укканын түгөйүнө айтып берүү.`,`«Broken telephone»: сүйлөмдү кулакка айтып жиберүү. Акыркы окуучу тактага жазат.`,`Диктант-чуркоо (running dictation): текст дубалда, бир окуучу окуп, экинчиси жазат.`],k);
 const check=pick([`Exit ticket: ар бир окуучу эшиктен чыгаарда 1 сөз + 1 сүйлөм айтат.`,`3-2-1: 3 жаңы сөз, 2 сүйлөм, 1 суроо.`,`Бармак менен баалоо 👍👌👎 + 2 окуучудан оозеки суроо.`,`Тез Kahoot/Wayground (5 суроо) же сайттагы квиз.`],k);
 const P1=pick(['Wordwall','Mentimeter','ClassroomScreen','Wordwall','Flippity'],k),P2=pick(L.ty==='letters'?['Phonics and Stuff','Toy Theater']:['Genially','Nearpod','Slidesgo games','Genially'],k),P3=pick(L.ty==='letters'?['PlayoPuff','Academoo','Educandy']:['BookWidgets','Liveworksheets','LearningApps','Educaplay'],k),P4=pick(['Blooket','Baamboozle','Gimkit','JeopardyLabs','Darsli.uz'],k),P5=pick(['Edpuzzle','LyricsTraining','YouTube'],k),P6=pick(['Kahoot','Wayground','Kahoot','Blooket'],k);
 return [['Жылытуу',5,pick(warm,k),P1,'var(--butter)'],['Жаңы материал',10,learn,P2,'var(--sky)'],['Практика',10,pick(prac,k*7),P3,'var(--mint)'],['Мелдеш',10,comp,P4,'var(--cherry)'],['Угуу',5,listen,P5,'var(--plum)'],['Жыйынтык текшерүү',5,check,P6,'var(--pink)']];
}

/* ===== Оюн тандоо ===== */
const GAMES={match:['🔗 Жупташтыруу','Англисче сөздү кыргызчасы менен туташтыр'],quiz:['❓ Квиз','4 вариант, Kahoot стилинде'],search:['🔍 Сөз издөө','Тордон сөздөрдү тап'],scramble:['🔀 Тамгаларды түз','Аралашкан тамгалардан сөз түз'],memory:['🃏 Эс тутум','Жуп карталарды тап'],order:['🧩 Сүйлөм түз','Сөздөрдөн сүйлөм түз'],wheel:['🎡 Дөңгөлөк','Кокус сөз/суроо: сүйлөө үчүн']};
const BYTYPE={letters:['scramble','hang','gap','memory','search','match'],vocab:['match','odd','memory','tf','search','hang','quiz','gap'],grammar:['order','tf','quiz','gap','match'],speaking:['wheel','odd','order','tf','memory','hang'],listening:['quiz','tf','match','hang','gap'],reading:['order','tf','odd','search','quiz'],writing:['scramble','gap','order','hang','search'],revision:['quiz','tf','odd','match','memory','hang','search','gap'],test:['quiz','tf','gap','order'],project:['wheel','odd','quiz','tf']};
const PBYTYPE={letters:['Phonics and Stuff','Toy Theater','PlayoPuff','Educandy','Academoo','Wordwall'],vocab:['Wordwall','Quizlet','Baamboozle','LearningApps','Educandy','Educaplay','Gimkit','Blooket'],grammar:['Liveworksheets','Wayground','LearningApps','Educaplay','BookWidgets','Kahoot','Gimkit'],speaking:['Mentimeter','Padlet','Flippity','ClassroomScreen','Baamboozle','Darsli.uz','Genially','Nearpod'],listening:['LyricsTraining','Edpuzzle','Nearpod','Liveworksheets','Educaplay'],reading:['BookWidgets','Twee','Nearpod','Liveworksheets','Wayground','Genially'],writing:['Padlet','Whiteboard.fi','Canva','Twee','BookWidgets'],revision:['Kahoot','Blooket','JeopardyLabs','Gimkit','Baamboozle','Slidesgo games','Darsli.uz','Wayground'],test:['Wayground','Kahoot','Liveworksheets','Gimkit','Blooket'],project:['Canva','Genially','Padlet','SlidesCarnival','Slidesgo games']};
const MBYTYPE={letters:'slap',vocab:'draw',grammar:'cup',speaking:'updown',listening:'bell',reading:'mind',writing:'mind',revision:'cup',test:'bell',project:'mind'};
function gameFor(L){const c=Object.keys(GAMES);return c[(L.n*4+L.g*3)%c.length]}
function platFor(L){const c=PBYTYPE[L.ty];return c[(L.n*7+L.g*2)%c.length]}

/* ===== Платформалар ===== */
const PL=[
 ['Wordwall','https://wordwall.net','Лексика','Шаблондор: жупташтыруу, дөңгөлөк, квиз, анаграмма. Бир сөз тизмесинен 10+ оюн.','Жаңы сөздөрдү бекитүүдө, тактада класс менен.'],
 ['Baamboozle','https://www.baamboozle.com','Мелдеш','Эки команда, кутулардагы суроолор, бонус.','Сабактын аягындагы командалык мелдеште.'],
 ['Wayground (Quizizz)','https://wayground.com','Текшерүү','Ар ким өз телефонунан, өз темпинде квиз.','Тез текшерүү, үй тапшырма, СОР алдында.'],
 ['Gimkit','https://www.gimkit.com','Мелдеш','Квиз + «акча» стратегиясы, бир суроо бир нече жолу.','Кайталоо сабактарында, 7–9-класстар.'],
 ['LearningApps','https://learningapps.org','Лексика','Акысыз интерактивдүү көнүгүүлөр: жупташтыруу, кроссворд, тартип.','Грамматика жана сөз көнүгүүлөрү.'],
 ['Blooket','https://www.blooket.com','Мелдеш','Квиз ар түрдүү оюн режимдеринде.','Кайталоо жана мотивация, 4–9-класстар.'],
 ['Kahoot','https://kahoot.com','Текшерүү','Классикалык жарыш-квиз, 4 түстүү жооп.','Бөлүмдүн аягында, тез текшерүүдө.'],
 ['Quizlet','https://quizlet.com','Лексика','Флэш-карталар, Learn/Match режимдери.','Сөз жаттоо, үйдө кайталоо.'],
 ['BookWidgets','https://www.bookwidgets.com','Окуу','40+ интерактивдүү шаблон, worksheet.','Окуу жана жазуу тапшырмалары.'],
 ['Liveworksheets','https://www.liveworksheets.com','Грамматика','Кагаз worksheet интерактивдүү болот, автоматтык текшерүү.','Грамматика, угуу көнүгүүлөрү.'],
 ['Educaplay','https://www.educaplay.com','Лексика','Кроссворд, сөз издөө, табышмак, диктант.','Лексика жана грамматика оюндары.'],
 ['Genially','https://genially.com/templates','Презентация','Интерактивдүү презентациялар, escape room, оюн шаблондору.','Сабактын башталышы, квест-сабак.'],
 ['Nearpod','https://nearpod.com','Презентация','Презентация + суроолор + сурамжылоо окуучулардын экранында.','Жаңы теманы түшүндүрүүдө, угуу/видео.'],
 ['Edpuzzle','https://edpuzzle.com','Угуу','Видеого суроолорду кошуу.','Угуу жана көрүү сабактары.'],
 ['LyricsTraining','https://lyricstraining.com','Угуу','Ыр угуп, жетишпеген сөздөрдү жазуу.','Угуу, 5–9-класстар, жуманын акыркы сабагы.'],
 ['Twee','https://twee.com','Окуу','AI менен текст, суроо, диалог түзүү (мугалим үчүн).','Окуу текстин жана тапшырмаларды тез даярдоо.'],
 ['JeopardyLabs','https://jeopardylabs.com','Мелдеш','Jeopardy форматындагы суроолор тактасы.','Бөлүмдү кайталоо, командалык оюн.'],
 ['Slidesgo games','https://slidesgo.com/game','Презентация','Оюн түрүндөгү слайд шаблондору.','Сабакка оюн-презентация даярдоо.'],
 ['SlidesCarnival','https://www.slidescarnival.com/template/cute-y2k-game-console-background-slides/327319','Презентация','«Game console» стилиндеги слайд шаблону.','Оюн сабактарынын презентациясы.'],
 ["Tay's Teaching Toolkit",'https://www.taysteachingtoolkit.com/the-template-library','Презентация','Даяр оюн шаблондорунун китепканасы (PowerPoint/Google Slides).','Мелдеш оюндарын тез даярдоо.'],
 ['Toy Theater','https://toytheater.com','Кичүүлөр','Кичүү класстар үчүн онлайн оюндар.','3–4-класстар, тамгалар, сандар.'],
 ['PlayoPuff','https://playopuff.com','Кичүүлөр','Балдар үчүн онлайн оюндар.','3–4-класстар, оюн сабактары.'],
 ['Phonics and Stuff','https://phonicsandstuff.com','Кичүүлөр','Phonics оюндары жана ресурстар.','Тамгалар жана окуу көндүмү, 3-класс.'],
 ['Academoo','https://www.academoo.com','Кичүүлөр','Балдар үчүн окуу оюндары.','Кичүү класстарда кошумча практика.'],
 ['ClassroomScreen','https://classroomscreen.com','Куралдар','Таймер, ызы-чуу өлчөгүч, кокус ат, светофор.','Сабакты башкаруу, ар бир сабакта.'],
 ['BouncyBalls','https://bouncyballs.org','Куралдар','Ызы-чууга жараша секирген топтор.','Класстын тынчтыгын көзөмөлдөө.'],
 ['Classroom Zen','https://www.classroomzen.com','Куралдар','Таймер жана тынч музыка.','Өз алдынча иштөө учуру.'],
 ['Gynzy','https://www.gynzy.com','Куралдар','Интерактивдүү доска үчүн сабак жана оюндар.','Интерактивдүү тактада сабак өтүү.'],
 ['Darsli.uz','https://darsli.uz','Ресурс','Окуу материалдары жана сабак ресурстары.','Кошумча материал издөө.'],
 ['Educandy','https://www.educandy.com','Лексика','Бир сөз тизмесинен бир нече оюн (crossword, noughts & crosses).','Лексиканы оюн менен бекитүү.'],
 ['Flippity','https://www.flippity.net','Куралдар','Google Sheets аркылуу: кокус ат, флэш-карта, оюн тактасы.','Топторго бөлүү, кокус тандоо.'],
 ['Mentimeter','https://www.mentimeter.com','Сүйлөө','Сөз булуту, сурамжылоо, суроолор.','Жылытуу, пикир чогултуу, рефлексия.'],
 ['Padlet','https://padlet.com','Жазуу','Онлайн дубал: текст, сүрөт, видео.','Долбоорлор, жазуу, үй тапшырма.'],
 ['Whiteboard.fi','https://whiteboard.fi','Жазуу','Ар бир окуучунун жеке доскасы, мугалим баарын көрөт.','Жазуу жана тез текшерүү.'],
 ['Canva','https://www.canva.com','Долбоор','Постер, презентация, карточкалар.','Долбоор жана көрсөтмө материал.'],
 ['YouTube','https://www.youtube.com','Угуу','Ырлар, мультфильмдер, BBC Learning English сабактары.','Угуу этабында, ыр менен жылытууда.'],
 ['PhET','https://phet.colorado.edu','Ресурс','Интерактивдүү симуляциялар (илим).','CLIL сабактар: илим темасы англисче.']];

const PDESC=Object.fromEntries(PL.map(p=>[p[0].replace(' (Quizizz)',''),p]));PDESC['Wayground']=PL[2];

/* ===== Методдор ===== */
const ME={
 mind:['🧠 Mind Map','Тактанын ортосуна тема жазылат, класс бутактарга сөздөрдү жана сүйлөмдөрдү кошот. Сабактын башында (билимди активдештирүү) же аягында (кайталоо).','Тема башталганда, кайталоодо, долбоор алдында.'],
 draw:['✏️ Draw & Guess grid','Тактага 3×3 же 4×4 тор тартылат, ар бир клеткада номер. Команда номер тандайт, бир окуучу ошол клетканын сөзүн тартат, команда 30 секундда табат.','Лексика, 3–7-класстар.'],
 cup:['🥤 Cup Challenge','Ар бир командага 6–10 пластик стакан. Туура жооп = 1 стакан пирамидага. Биринчи пирамиданы бүтүргөн команда жеңет.','Грамматика жана кайталоо мелдеши.'],
 bell:['🔔 «Are you ready?» коңгуроо','Эки окуучу столдогу коңгуроонун алдында. Мугалим «Are you ready?» деп сурап, сүрөт/сөз көрсөтөт. Ким биринчи коңгуроо кагып туура айтса, упай алат.','Сөз жана тез сүйлөө, ар бир сабакта 3–5 мүнөт.'],
 colour:["🎨 Don't touch the colour",'Полго түстүү кагаздар коюлат. Мугалим түс атайт, ал түскө тийүүгө болбойт. Ким тийсе, англисче сөз же сүйлөм айтат.','Кыймылдуу жылытуу, 3–5-класстар.'],
 slap:['✋ Сөз карточкаларын уруу (slap game)','Карточкалар столдо же тактада. Мугалим сөздү айтат, эки окуучу ошол карточканы колу менен биринчи урууга аракет кылат.','Тамгалар, лексика, угуп түшүнүү.'],
 updown:['⬆️⬇️ Up-down / Near-far','Up-down: сөз туура болсо туруу, туура эмес болсо отуруу. Near-far: ${near/far, this/that} буюмдарды көрсөтүп айтуу. 2–3 мүнөттүк жылытуу.','Ар бир сабактын башталышы.']};
const TASKS=[['Жаңы сөздөрдү үйрөнүү','Quizlet, Wordwall','Draw & Guess, сөз карточкаларын уруу'],['Грамматиканы текшерүү','Kahoot, Blooket, GrammarMama','Cup Challenge'],['Командалык мелдеш','Baamboozle, Gimkit, JeopardyLabs, Darsli.uz','«Are you ready?» коңгуроо'],['Угуу','Edpuzzle, LyricsTraining, YouTube','Сөз карточкаларын уруу'],['Текстти окуп түшүнүү','Nearpod, BookWidgets, Twee','Mind Map'],['Кроссворд жана табышмактар','Educaplay, LearningApps, PuzzleCup','Draw & Guess'],['Бүт теманы кайталоо','Wayground, Blooket, Kahoot','Cup Challenge'],['Интерактивдүү презентация','Genially, Slidesgo, SlidesCarnival, Tay’s Teaching Toolkit','Mind Map'],['Сүйлөө жана пикир','Mentimeter, Padlet, Flippity','Up-down, Near-far'],['Жазуу','Padlet, Whiteboard.fi, Canva','Mind Map'],['Тамгалар, phonics (3–4-кл.)','Phonics and Stuff, Toy Theater, PlayoPuff, Academoo','Сөз карточкаларын уруу, Don’t touch the colour'],['Класс башкаруу','ClassroomScreen, BouncyBalls, Classroom Zen','Таймер, командалык эсеп'],['Материал даярдоо (AI)','Twee, Нейрум, Teachshare, EduLab','—'],['Музыка, чыгармачылык','Google Flow Music, LyricsTraining','Ыр менен жылытуу'],['CLIL, илим','PhET, Cirkit Designer','Mind Map']];

/* ===== Модал жана оюндар ===== */
let score=0;const setS=v=>{score=v;$('#ms').textContent=v===null?'':'Упай: '+v};
function openM(t){$('#mt').textContent=t;$('#modal').classList.add('on');setS(null);clearInterval(window.TI)}
function closeM(){$('#modal').classList.remove('on');clearInterval(window.TI);$('#mb').innerHTML=''}
$('#modal')&&$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeM()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeM()});
function openGame(k,pairs,words,phrases,title){openM((k==='cards'?'🃏 Флешкарталар':GAMES[k][0])+' · '+title);({cards:(a)=>gCards(a),tf:a=>gTF(a),hang:a=>gHang(a),odd:a=>gOdd(a),gap:a=>gGap(a),match:gMatch,quiz:gQuiz,search:gSearch,scramble:gScramble,memory:gMemory,order:gOrder,wheel:gWheel})[k](pairs,words,phrases)}
const replay=f=>`<div class="center" style="margin-top:14px"><button class="btn" onclick="${f}">Кайра ойноо</button></div>`;
let CUR;
function gMatch(pairs){CUR=[gMatch,pairs];const P=shuffle(pairs).slice(0,6);setS(0);let sel=null,done=0;
 $('#mb').innerHTML=`<div class="mcols"><div id="cl"></div><div id="cr"></div></div><div class="fb" id="fb"></div>`;
 const mk=(arr,side)=>arr.map(p=>{const b=document.createElement('button');b.className='tile';b.textContent=side?p[1]:p[0];b.dataset.k=p[0];b.dataset.s=side;b.style.display='block';b.style.width='100%';b.style.marginBottom='8px';return b});
 mk(shuffle(P),0).forEach(b=>$('#cl').append(b));mk(shuffle(P),1).forEach(b=>$('#cr').append(b));
 $('#mb').querySelectorAll('.tile').forEach(b=>b.onclick=()=>{if(b.classList.contains('ok'))return;
  if(!sel||sel.dataset.s===b.dataset.s){if(sel)sel.classList.remove('sel');sel=b;b.classList.add('sel');return}
  if(sel.dataset.k===b.dataset.k){[sel,b].forEach(x=>{x.classList.remove('sel');x.classList.add('ok')});setS(score+1);done++;if(done===P.length)$('#fb').innerHTML='🎉 Баары туура! '+replay('CUR[0](CUR[1])')}
  else{const a=sel;[a,b].forEach(x=>x.classList.add('no'));setTimeout(()=>[a,b].forEach(x=>x.classList.remove('no','sel')),500)}sel=null})}
function gQuiz(pairs){CUR=[gQuiz,pairs];const Qs=shuffle(pairs).slice(0,8);let qi=0;setS(0);const C=['var(--k1)','var(--k2)','var(--k3)','var(--k4)'];
 const show=()=>{if(qi>=Qs.length){$('#mb').innerHTML=`<p class="qw">🏁 ${score} / ${Qs.length}</p>`+replay('CUR[0](CUR[1])');return}
  const p=Qs[qi],rev=qi%2,opts=shuffle([p,...shuffle(pairs.filter(x=>x!==p)).slice(0,3)]);
  $('#mb').innerHTML=`<p class="center" style="color:var(--muted)">${qi+1} / ${Qs.length} · ${rev?'Англисчесин тап':'Кыргызчасын тап'}</p><p class="qw">${esc(rev?p[1]:p[0])}</p><div class="qopts">${opts.map((o,j)=>`<button style="background:${C[j]}" data-ok="${o===p}">${['▲','◆','●','■'][j]} ${esc(rev?o[0]:o[1])}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
  $('#mb').querySelectorAll('.qopts button').forEach(b=>b.onclick=()=>{const ok=b.dataset.ok==='true';if(ok)setS(score+1);$('#mb').querySelectorAll('.qopts button').forEach(x=>{x.disabled=true;x.style.opacity=x.dataset.ok==='true'?1:.35});$('#fb').textContent=ok?'✅ Туура!':'❌ Туурасы: '+(rev?p[0]:p[1]);qi++;setTimeout(show,1200)})};show()}
function gSearch(pairs,words){CUR=[gSearch,pairs,words];const W=[...new Set(words.map(w=>w.toUpperCase().replace(/[^A-Z]/g,'')).filter(w=>w.length>=2&&w.length<=10))].slice(0,7);const N=10,g=Array.from({length:N},()=>Array(N).fill(''));const D=[[0,1],[1,0],[1,1]],placed=[];
 for(const w of W){for(let t=0;t<200;t++){const [dr,dc]=D[Math.random()*3|0],r=Math.random()*(N-dr*(w.length-1))|0,c=Math.random()*(N-dc*(w.length-1))|0;let ok=true;for(let i=0;i<w.length;i++){const x=g[r+dr*i][c+dc*i];if(x&&x!==w[i]){ok=false;break}}if(ok){for(let i=0;i<w.length;i++)g[r+dr*i][c+dc*i]=w[i];placed.push({w,r,c,dr,dc});break}}}
 for(const row of g)for(let i=0;i<N;i++)if(!row[i])row[i]='ABCDEFGHIJKLMNOPRSTUWY'[Math.random()*22|0];
 setS(0);$('#mb').innerHTML=`<p class="center" style="color:var(--muted)">Сөздүн биринчи жана акыркы тамгасын басыңыз</p><div class="wl">${placed.map(p=>`<s id="w_${p.w}">${p.w}</s>`).join('')}</div><div class="ws" style="grid-template-columns:repeat(${N},1fr)">${g.flat().map((ch,i)=>`<span data-i="${i}">${ch}</span>`).join('')}</div><div class="fb" id="fb"></div>`;
 let a=null;const cells=$('#mb').querySelectorAll('.ws span'),found=new Set();
 cells.forEach(s=>s.onclick=()=>{const i=+s.dataset.i;if(a===null){a=i;s.classList.add('a');return}
  const r1=a/N|0,c1=a%N,r2=i/N|0,c2=i%N;cells[a].classList.remove('a');a=null;
  for(const p of placed){const er=p.r+p.dr*(p.w.length-1),ec=p.c+p.dc*(p.w.length-1);
   if(!found.has(p.w)&&((p.r===r1&&p.c===c1&&er===r2&&ec===c2)||(p.r===r2&&p.c===c2&&er===r1&&ec===c1))){found.add(p.w);for(let k=0;k<p.w.length;k++)cells[(p.r+p.dr*k)*N+p.c+p.dc*k].classList.add('f');$('#w_'+p.w).classList.add('d');setS(score+1);if(found.size===placed.length)$('#fb').innerHTML='🎉 Баарын таптыңыз! '+replay('CUR[0](CUR[1],CUR[2])');return}}
  $('#fb').textContent='Дагы аракет кылыңыз 🙂'})}
function gScramble(pairs,words){CUR=[gScramble,pairs,words];const W=shuffle([...new Set(words.filter(w=>/^[a-z-]{3,12}$/i.test(w)))]).slice(0,8);let qi=0;setS(0);
 const show=()=>{if(qi>=W.length){$('#mb').innerHTML=`<p class="qw">🏁 ${score} / ${W.length}</p>`+replay('CUR[0](CUR[1],CUR[2])');return}
  const w=W[qi];let s=w;for(let t=0;t<10&&s===w;t++)s=shuffle(w.split('')).join('');const hint=(pairs.find(p=>p[0]===w)||[])[1];
  $('#mb').innerHTML=`<p class="center" style="color:var(--muted)">${qi+1} / ${W.length}${hint?' · кыргызча: <b>'+esc(hint)+'</b>':''}</p><p class="qw" style="letter-spacing:8px">${esc(s.toUpperCase())}</p><div style="display:flex;gap:8px;max-width:420px;margin:0 auto"><input type="text" id="sa" placeholder="Сөздү жазыңыз" autocomplete="off"><button class="btn" id="sb">Текшерүү</button></div><div class="center" style="margin-top:10px"><button class="btn ghost sm" id="sk">Жоопту көрсөт</button></div><div class="fb" id="fb"></div>`;
  const chk=()=>{if($('#sa').value.trim().toLowerCase()===w.toLowerCase()){setS(score+1);$('#fb').textContent='✅ Туура!';qi++;setTimeout(show,900)}else $('#fb').textContent='❌ Дагы бир жолу'};
  $('#sb').onclick=chk;$('#sa').onkeydown=e=>{if(e.key==='Enter')chk()};$('#sk').onclick=()=>{$('#fb').textContent='Жооп: '+w;qi++;setTimeout(show,1400)};$('#sa').focus()};show()}
function gMemory(pairs){CUR=[gMemory,pairs];const P=shuffle(pairs).slice(0,6);const cards=shuffle(P.flatMap((p,i)=>[{t:p[0],k:i},{t:p[1],k:i}]));setS(0);let open=[],moves=0;
 $('#mb').innerHTML=`<div class="mem">${cards.map((c,i)=>`<button data-i="${i}">${esc(c.t)}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
 const bs=$('#mb').querySelectorAll('.mem button');
 bs.forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(b.classList.contains('f')||b.classList.contains('ok')||open.length===2)return;b.classList.add('f');open.push(i);
  if(open.length===2){moves++;const [x,y]=open;if(cards[x].k===cards[y].k){bs[x].classList.add('ok');bs[y].classList.add('ok');open=[];setS(score+1);if(score===P.length)$('#fb').innerHTML=`🎉 ${moves} жүрүштө! `+replay('CUR[0](CUR[1])')}
   else setTimeout(()=>{bs[x].classList.remove('f');bs[y].classList.remove('f');open=[]},900)}})}
function gOrder(pairs,words,phrases){CUR=[gOrder,pairs,words,phrases];const S=shuffle(phrases).slice(0,5);let qi=0;setS(0);
 const show=()=>{if(qi>=S.length){$('#mb').innerHTML=`<p class="qw">🏁 ${score} / ${S.length}</p>`+replay('CUR[0](CUR[1],CUR[2],CUR[3])');return}
  const target=S[qi].split(/\s+/);let pool=shuffle(target.map((w,i)=>({w,i})));if(pool.length>1&&pool.every((x,j)=>x.i===j))pool.reverse();const built=[];
  const draw=()=>{$('#mb').innerHTML=`<p class="center" style="color:var(--muted)">${qi+1} / ${S.length} · Сөздөрдү туура тартипте басыңыз</p><div class="ord">${built.map((x,j)=>`<button data-b="${j}">${esc(x.w)}</button>`).join('')}</div><div class="pool">${pool.map((x,j)=>`<button data-p="${j}">${esc(x.w)}</button>`).join('')}</div><div class="center" style="margin-top:12px"><button class="btn" id="oc">Текшерүү</button></div><div class="fb" id="fb"></div>`;
   $('#mb').querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{built.push(pool.splice(+b.dataset.p,1)[0]);draw()});
   $('#mb').querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{pool.push(built.splice(+b.dataset.b,1)[0]);draw()});
   $('#oc').onclick=()=>{if(built.map(x=>x.w).join(' ')===target.join(' ')){setS(score+1);$('#fb').textContent='✅ Туура!';qi++;setTimeout(show,900)}else $('#fb').textContent='❌ Тартибин дагы карап көрүңүз'}};draw()};show()}
function gWheel(pairs,words,phrases,list){const items=list||[...words.slice(0,8),...phrases.slice(0,2).map(p=>'Say: '+p)];
 $('#mb').innerHTML=`<canvas id="wc" width="460" height="460"></canvas><div class="center" style="margin-top:10px"><button class="btn alt" id="spin">Айлантуу!</button></div><p class="qw" id="wres" style="font-size:26px;min-height:40px"></p><p class="center" style="color:var(--muted);font-size:14px">Түшкөн сөз менен окуучу сүйлөм айтат же суроо берет.</p>`;
 const c=$('#wc'),x=c.getContext('2d'),n=items.length,cols=['#e21b3c','#1368ce','#d89e00','#26890c','#178f84','#e8873d','#7a4bd1','#1b2b4f'];let ang=0;
 const draw=()=>{x.clearRect(0,0,460,460);for(let i=0;i<n;i++){const a0=ang+i*2*Math.PI/n,a1=a0+2*Math.PI/n;x.beginPath();x.moveTo(230,230);x.arc(230,230,220,a0,a1);x.fillStyle=cols[i%8];x.fill();x.save();x.translate(230,230);x.rotate(a0+Math.PI/n);x.fillStyle='#fff';x.font='bold 17px system-ui';x.textAlign='right';const t=items[i].length>18?items[i].slice(0,17)+'…':items[i];x.fillText(t,205,6);x.restore()}
  x.beginPath();x.arc(230,230,26,0,7);x.fillStyle='#fff';x.fill();x.beginPath();x.moveTo(445,230);x.lineTo(470,215);x.lineTo(470,245);x.fillStyle='#15233f';x.fill()};
 x.canvas.width=480;draw();
 $('#spin').onclick=()=>{const total=Math.PI*2*(4+Math.random()*3),t0=performance.now(),a0=ang;$('#wres').textContent='';
  const step=t=>{const p=Math.min(1,(t-t0)/3500),e=1-Math.pow(1-p,3);ang=a0+total*e;draw();if(p<1)requestAnimationFrame(step);else{const a=((2*Math.PI-(ang%(2*Math.PI)))%(2*Math.PI));$('#wres').textContent=items[Math.floor(a/(2*Math.PI/n))%n]}};requestAnimationFrame(step)}}

/* ===== Куралдар ===== */
function toolWheel(){openM('🎡 Кокус дөңгөлөк');$('#mb').innerHTML=`<p>Ар бир сапка бирден (окуучулардын аттары, сөздөр же суроолор):</p><textarea id="wl">Aibek
Aizada
Nurlan
Aruuke
Bektur
Saltanat</textarea><div class="center" style="margin-top:10px"><button class="btn" id="wg">Дөңгөлөктү түзүү</button></div><div id="wbox"></div>`;
 $('#wg').onclick=()=>{const l=$('#wl').value.split('\n').map(s=>s.trim()).filter(Boolean);if(l.length<2)return;const mb=$('#mb');const keep=mb.innerHTML;gWheel([],[],[],l)}}
function toolTimer(){openM('⏱️ Таймер');let left=60,run=false;
 $('#mb').innerHTML=`<div class="timer" id="tt">01:00</div><div class="chips" style="justify-content:center">${[10,30,60,120,180,300].map(s=>`<button class="chip" data-s="${s}">${s<60?s+' сек':s/60+' мүн'}</button>`).join('')}</div><div class="center"><button class="btn" id="ts">Баштоо / Токтотуу</button> <button class="btn ghost" id="tr">Кайра</button></div>`;
 const show=()=>{$('#tt').textContent=String(left/60|0).padStart(2,'0')+':'+String(left%60).padStart(2,'0');$('#tt').style.color=left<=5?'var(--bad)':''};
 let base=60;$('#mb').querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{base=left=+b.dataset.s;clearInterval(window.TI);run=false;show()});
 $('#ts').onclick=()=>{if(run){clearInterval(window.TI);run=false;return}run=true;window.TI=setInterval(()=>{left--;show();if(left<=0){clearInterval(window.TI);run=false;beep()}},1000)};
 $('#tr').onclick=()=>{clearInterval(window.TI);run=false;left=base;show()}}
function beep(){try{const a=new (window.AudioContext||window.webkitAudioContext)();[0,.25,.5].forEach(d=>{const o=a.createOscillator(),g=a.createGain();o.frequency.value=880;o.connect(g);g.connect(a.destination);g.gain.setValueAtTime(.3,a.currentTime+d);o.start(a.currentTime+d);o.stop(a.currentTime+d+.18)})}catch(e){}}
let TEAMS=[['Lions',0],['Eagles',0]];
function toolScore(){openM('🏆 Командалык эсеп');const C=['var(--k1)','var(--k2)','var(--k3)','var(--k4)'];
 const draw=()=>{$('#mb').innerHTML=`<div class="teams">${TEAMS.map((t,i)=>`<div class="team" style="background:${C[i]}"><input value="${esc(t[0])}" data-n="${i}"><div class="pts">${t[1]}</div><button data-d="${i}" data-v="-1">−</button><button data-d="${i}" data-v="1">+</button><button data-d="${i}" data-v="5">+5</button></div>`).join('')}</div><div class="center" style="margin-top:14px"><button class="btn ghost sm" id="ta">+ Команда</button> <button class="btn ghost sm" id="tx">− Команда</button> <button class="btn ghost sm" id="t0">Нөлгө түшүрүү</button></div>`;
  $('#mb').querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{TEAMS[+b.dataset.d][1]+= +b.dataset.v;draw()});
  $('#mb').querySelectorAll('[data-n]').forEach(b=>b.onchange=()=>TEAMS[+b.dataset.n][0]=b.value);
  $('#ta').onclick=()=>{if(TEAMS.length<4){TEAMS.push([['Tigers','Wolves'][TEAMS.length-2],0]);draw()}};$('#tx').onclick=()=>{if(TEAMS.length>2){TEAMS.pop();draw()}};$('#t0').onclick=()=>{TEAMS.forEach(t=>t[1]=0);draw()}};draw()}
function toolBell(){openM('🔔 Are you ready?');const all=[...new Set(BANK.flatMap(b=>Object.keys(b[2])))];
 $('#mb').innerHTML=`<p class="center">Мугалим: «Are you ready?» → баскычты басат → сөз чыгат. Ким биринчи туура айтса, упай алат.</p><p class="qw" id="bw" style="font-size:54px;min-height:80px">?</p><div class="center"><button class="btn alt" id="bb">🔔 Are you ready?</button> <button class="btn ghost" onclick="toolScore()">Командалык эсеп</button></div>`;
 $('#bb').onclick=()=>{$('#bw').textContent='3…';let c=3;const t=setInterval(()=>{c--;if(c>0)$('#bw').textContent=c+'…';else{clearInterval(t);const w=all[Math.random()*all.length|0];const ky=BANK.map(b=>b[2][w]).find(Boolean);$('#bw').innerHTML=esc(ky)+'<div style="font-size:18px;color:var(--muted);font-weight:600">англисче айткыла!</div>';beep()}},700)}}



/* ===== 3D-стилдеги иллюстрациялар (SVG) ===== */
const g3=(id,a,b,c)=>`<radialGradient id="${id}" cx="35%" cy="28%" r="75%"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></radialGradient>`;
const ICONS={
 abc:`<svg viewBox="0 0 120 120"><defs>${g3('ia','#ff8aa0','#d7263d','#7a0a1e')}${g3('ib','#ffe08a','#ffc94a','#a87400')}${g3('ic','#8fe3c4','#25b585','#0b5e42')}</defs><g font-family="Unbounded,sans-serif" font-weight="800" text-anchor="middle"><rect x="14" y="62" width="44" height="44" rx="9" fill="url(#ia)"/><text x="36" y="94" font-size="26" fill="#fff">A</text><rect x="62" y="62" width="44" height="44" rx="9" fill="url(#ic)"/><text x="84" y="94" font-size="26" fill="#fff">B</text><rect x="38" y="16" width="44" height="44" rx="9" fill="url(#ib)" transform="rotate(-8 60 38)"/><text x="60" y="48" font-size="26" fill="#5e3a00" transform="rotate(-8 60 38)">C</text></g></svg>`,
 globe:`<svg viewBox="0 0 120 120"><defs>${g3('ga','#bfe3ff','#3f97e0','#123f78')}</defs><circle cx="60" cy="60" r="40" fill="url(#ga)"/><path d="M38 44c8-6 16 2 22-4 5 4-2 12 6 16-6 8-16 2-20 10-8-4-14-12-8-22zM70 72c8-2 12 6 18 2-2 10-12 14-18 10z" fill="#25b585" opacity=".9"/><ellipse cx="60" cy="60" rx="56" ry="14" fill="none" stroke="#ffc94a" stroke-width="6" transform="rotate(-18 60 60)"/><ellipse cx="46" cy="40" rx="10" ry="6" fill="#fff" opacity=".5"/></svg>`,
 phones:`<svg viewBox="0 0 120 120"><defs>${g3('pa','#ff8aa0','#d7263d','#6b0a1f')}${g3('pb','#fff','#f4e7da','#c9b3a2')}</defs><path d="M24 70V58a36 36 0 0 1 72 0v12" fill="none" stroke="#2b0f18" stroke-width="9" stroke-linecap="round"/><rect x="14" y="62" width="24" height="38" rx="11" fill="url(#pa)"/><rect x="82" y="62" width="24" height="38" rx="11" fill="url(#pa)"/><circle cx="60" cy="38" r="12" fill="url(#pb)"/><path d="M56 32v10l8-5z" fill="#d7263d"/></svg>`,
 ball:`<svg viewBox="0 0 120 120"><defs>${g3('ba','#fff','#f1e6dc','#b9a597')}</defs><circle cx="60" cy="62" r="40" fill="url(#ba)"/><path d="M60 44l14 10-5 16H51l-5-16z" fill="#2b0f18"/><path d="M60 22v22M74 54l22-6M69 70l12 20M51 70L39 90M46 54l-22-6" stroke="#2b0f18" stroke-width="3"/><ellipse cx="46" cy="40" rx="11" ry="6" fill="#fff" opacity=".8"/></svg>`,
 book:`<svg viewBox="0 0 120 120"><defs><linearGradient id="bk" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#d23a55"/><stop offset="1" stop-color="#5e0718"/></linearGradient></defs><path d="M10 40l50 10 50-10v52L60 102 10 92z" fill="url(#bk)"/><path d="M16 34l44 10v50L16 84zM104 34L60 44v50l44-10z" fill="#fffaf5"/><path d="M24 48l28 6M24 58l28 6M24 68l20 4M96 48l-28 6M96 58l-28 6" stroke="#ecd9ca" stroke-width="3"/><path d="M80 22l6 10 11 2-8 8 2 11-11-5-10 5 2-11-8-8 11-2z" fill="#ffc94a"/></svg>`,
 rocket:`<svg viewBox="0 0 120 120"><defs>${g3('ra','#fff','#f4e7da','#bfa595')}${g3('rb','#ff8aa0','#d7263d','#6b0a1f')}</defs><path d="M60 10c22 16 26 44 16 70H44C34 54 38 26 60 10z" fill="url(#ra)"/><path d="M44 80l-14 18 18-6zM76 80l14 18-18-6z" fill="url(#rb)"/><circle cx="60" cy="46" r="11" fill="#3f97e0" stroke="#2b0f18" stroke-width="4"/><path d="M50 84h20l-10 26z" fill="#ffc94a"/><path d="M54 84h12l-6 14z" fill="#ff7a2f"/></svg>`,
 cap:`<svg viewBox="0 0 120 120"><defs><linearGradient id="ca" x1="0" x2="1"><stop offset="0" stop-color="#3a1424"/><stop offset="1" stop-color="#2b0f18"/></linearGradient></defs><path d="M30 58v22c0 8 60 8 60 0V58" fill="#5e0718"/><path d="M60 30l50 20-50 20-50-20z" fill="url(#ca)"/><path d="M60 50l38 10v24" stroke="#ffc94a" stroke-width="4" fill="none"/><circle cx="98" cy="88" r="6" fill="#ffc94a"/><path d="M60 30l50 20-10 4-40-16z" fill="#fff" opacity=".12"/></svg>`,
 bell:`<svg viewBox="0 0 120 120"><defs>${g3('be','#fff3c4','#ffc94a','#a06d00')}</defs><path d="M30 86c6-6 6-14 6-30a24 24 0 0 1 48 0c0 16 0 24 6 30z" fill="url(#be)"/><rect x="24" y="84" width="72" height="10" rx="5" fill="#d23a55"/><circle cx="60" cy="102" r="8" fill="#d23a55"/><circle cx="60" cy="28" r="6" fill="#a06d00"/><ellipse cx="48" cy="52" rx="5" ry="12" fill="#fff" opacity=".6"/></svg>`,
 bag:`<svg viewBox="0 0 120 120"><defs>${g3('sa','#ff8aa0','#d7263d','#6b0a1f')}</defs><path d="M44 30a16 16 0 0 1 32 0" fill="none" stroke="#5e0718" stroke-width="7"/><rect x="22" y="30" width="76" height="76" rx="22" fill="url(#sa)"/><rect x="34" y="62" width="52" height="30" rx="10" fill="#ffc94a"/><path d="M34 70h52" stroke="#a06d00" stroke-width="3"/><ellipse cx="42" cy="44" rx="10" ry="5" fill="#fff" opacity=".35"/></svg>`,
 bubble:`<svg viewBox="0 0 120 120"><defs>${g3('ua','#bdf2de','#25b585','#0b5e42')}${g3('ub','#ffe08a','#ffc94a','#a87400')}</defs><path d="M16 26h66a12 12 0 0 1 12 12v30a12 12 0 0 1-12 12H44l-18 16v-16H16A12 12 0 0 1 4 68V38a12 12 0 0 1 12-12z" fill="url(#ua)"/><text x="49" y="62" font-family="Unbounded,sans-serif" font-weight="800" font-size="22" text-anchor="middle" fill="#fff">Hi!</text><circle cx="98" cy="96" r="16" fill="url(#ub)"/><text x="98" y="102" font-size="16" text-anchor="middle">🙂</text></svg>`,
 star:`<svg viewBox="0 0 120 120"><defs>${g3('st','#fff3c4','#ffc94a','#a06d00')}</defs><path d="M60 10l15 31 34 5-25 24 6 34-30-16-30 16 6-34L11 46l34-5z" fill="url(#st)" stroke="#a06d00" stroke-width="2" stroke-linejoin="round"/></svg>`
};
const GRADEICON={3:'abc',4:'globe',5:'phones',6:'ball',7:'book',8:'rocket',9:'cap'};

const DOORC=[['#ffe08a','#ffc94a','#c98a00'],['#7fe0bd','#25b585','#0b6e4c'],['#8cc4f5','#3f97e0','#1d5ea0'],['#ffc0cf','#ff8fab','#c24366'],['#b98ce0','#6a2f93','#3e1560'],['#ffb27a','#ff7a2f','#b84a0f'],['#ff8aa0','#d23a55','#7a0a1e']];
/* Ийри галерея: аркалар (эшиктер) */
function buildHall(el,items){
 const flat=window.innerWidth<760;el.classList.toggle('flat',flat);
 const n=items.length,span=Math.min(108,n*24),R=Math.max(560,n*95);
 el.innerHTML=`<div class="ringwrap">${items.map((it,i)=>{const ang=n>1?span/2-span*i/(n-1):0;
  const tf=flat?'':`transform:rotateY(${ang}deg) translateZ(-${R}px)`;
  return `<a class="arch ${it.on?'on':''}" style="${tf}" ${it.href?`href="${it.href}"`:'href="javascript:void 0"'} data-i="${i}" tabindex="0">${it.me?`<span class="me">${it.me}</span>`:''}<div class="frame">${ICONS[it.icon]||ICONS.star}<b>${it.label}</b><small>${it.sub||''}</small></div><div class="door" style="background:linear-gradient(115deg,${DOORC[i%DOORC.length][0]},${DOORC[i%DOORC.length][1]} 50%,${DOORC[i%DOORC.length][2]})"><span>${it.door||''}</span></div></a>`}).join('')}</div>`;
 if(!flat)el.querySelector('.ringwrap').style.transform=`translateZ(${R-300}px)`;
 el.querySelectorAll('.arch').forEach(a=>a.addEventListener('click',e=>{const it=items[+a.dataset.i];if(it.onclick){e.preventDefault();it.onclick()}}));
}

/* ===== Даяр материалдар (тышкы платформалар) ===== */
window.RES=window.RES||{};
const THKEY={'Үй-бүлө':'family','Тамак-аш':'food','Жаныбарлар':'animals','Кийим':'clothes','Аба ырайы':'weather','Мектеп':'school','Оюнчуктар':'toys','Ден соолук':'health','Үй':'house','Убакыт':'time','Хобби':'hobbies','Спорт':'sport','Саякат':'travel','Багыттар':'directions','Жаратылыш':'nature','Өлкөлөр':'countries','Мүнөз':'appearance','Кесиптер':'jobs','Салттар':'culture','Искусство':'art','Технология':'technology','Экология':'environment','Соода':'shopping','Сезимдер':'feelings','Сандар':'numbers','Түстөр':'colours','Эрежелер':'rules','Этиштер':'present_simple'};
const GRAM=[[/present continuous|are doing|-ing\b|am singing|what are you doing/i,'present_continuous','Present Continuous'],[/past simple|went|was |were |did you|yesterday|last /i,'past_simple','Past Simple'],[/going to|will\b|future|plans?\b/i,'future','Future'],[/present perfect|have you ever|ever been|since|already/i,'present_perfect','Present Perfect'],[/compar|bigger|better|the best|superlativ/i,'comparatives','Comparatives'],[/must|should|can you|could|may\b|modal|have to/i,'modals','Modal verbs'],[/passive|made of|was built/i,'passive','Passive'],[/conditional|if\b/i,'conditionals','Conditionals'],[/present simple|every day|usually|always|routine/i,'present_simple','Present Simple'],[/letters?\b|phonics|alphabet/i,'phonics','Phonics']];
function topicKeys(L){const keys=[];const gm=GRAM.find(g=>g[0].test(L.t+' '+(L.v||'')));if(gm)keys.push(gm[1]);keys.push(THKEY[L.th]||'present_simple');return keys}
function searchQ(L){const t=L.t.replace(/^Unit \d+\.\s*/,'').replace(/\((p\.)?[^)]*\)/g,'').replace(/\b(Vocabulary|Grammar|Speaking|Listening|Reading|Writing|Revision|and|Letters?)\b/gi,'').replace(/[.:]/g,' ').replace(/\s+/g,' ').trim();const gm=GRAM.find(g=>g[0].test(L.t));return (gm&&L.ty==='grammar'?gm[2]:(THKEY[L.th]&&L.th!=='Этиштер'?THKEY[L.th]:t.split(' ').slice(0,3).join(' ')))}
function readyLinks(L){const q=encodeURIComponent(searchQ(L)),k=topicKeys(L),R=window.RES,out=[];
 const jl=k.map(x=>R.jeopardy&&R.jeopardy[x]).find(Boolean),ww=k.map(x=>R.wordwall&&R.wordwall[x]).find(Boolean);
 if(ww)out.push(['🧩 Wordwall: '+ww.title,ww.url]);out.push(['🔎 Wordwall даяр оюндар','https://wordwall.net/community?query='+q]);
 out.push(['🎯 Baamboozle','https://www.baamboozle.com/search?q='+q]);
 if(jl)out.push(['🏆 Jeopardy: '+jl.title,jl.url]);else out.push(['🏆 JeopardyLabs','https://jeopardylabs.com/search/?q='+q]);
 out.push(['🃏 Quizlet','https://quizlet.com/search?query='+q+'&type=sets']);
 out.push(['🟣 Wayground','https://wayground.com/admin/search/'+q]);
 out.push(['📝 Liveworksheets','https://www.liveworksheets.com/search?q='+q]);
 ytLinks(L).forEach(y=>out.push(y));
 return out}
function videoFor(L){const R=window.RES.videos||{};const age=L.g<3?'kids':'teens';for(const k of topicKeys(L)){const v=R[k];if(v&&(v[age]||v.kids||v.teens))return v[age]||v.kids||v.teens}return null}
function songFor(L){const S=window.RES.songs||[];if(L.g<3||!S.length)return null;const k=topicKeys(L);return S.find(s=>k.includes(s.topic))||null}
function tplFor(L){const T=(window.RES.templates||[]);if(!T.length)return null;const k=topicKeys(L);const want={revision:['jeopardy','board','quiz'],test:['quiz','jeopardy'],vocab:['memory','wheel','bingo','board'],grammar:['quiz','escape','board'],speaking:['wheel','board','bingo'],listening:['quiz','bingo'],reading:['escape','quiz'],writing:['escape','board'],project:['escape','other'],letters:['memory','bingo','wheel']}[L.ty]||['quiz'];
 const ok=T.filter(t=>(t.topics||[]).some(x=>k.includes(x)));const byKind=T.filter(t=>want.includes(t.kind));const pool=ok.length?ok:byKind.length?byKind:T;return pool[(L.n*7+L.g)%pool.length]}
function vidHTML(v){if(!v)return'';return `<div class="vid"><button onclick="this.outerHTML='<iframe src=&quot;https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&quot; allow=&quot;autoplay; encrypted-media&quot; allowfullscreen></iframe>'" style="background-image:url(https://i.ytimg.com/vi/${v.id}/hqdefault.jpg)" aria-label="Видеону ойнотуу"><span>▶</span></button></div><p style="font-size:13px;margin:6px 0 0;color:var(--ink2)">${esc(v.title||'')}</p>`}
function say(w){try{const u=new SpeechSynthesisUtterance(w);u.lang='en-GB';u.rate=.85;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}

function ytLinks(L){const t=searchQ(L),Y=q=>'https://www.youtube.com/results?search_query='+encodeURIComponent(q);
 return L.g<3?[['🎵 Ыр: Super Simple Songs',Y('Super Simple Songs '+t)],['🎵 Ыр: Dream English Kids',Y('Dream English Kids '+t)],['📺 Мультфильм: ELF Kids / Maple Leaf',Y(t+' ESL kids video Maple Leaf Learning')]]
 :[['📺 BBC Learning English',Y('BBC Learning English '+t)],['📺 English Singsing',Y('English Singsing '+t)],['🎬 Сериалдар менен англис',Y('Learn English with TV Series '+t)],['🎵 Ыр (LyricsTraining)',Y(t+' song lyrics English learning')]]}

/* ===== Такта: англисче дата, слайддар, флешкарталар ===== */
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'],WDAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
function engDate(d=new Date()){const n=d.getDate(),s=(n%100>=11&&n%100<=13)?'th':({1:'st',2:'nd',3:'rd'}[n%10]||'th');return `${WDAYS[d.getDay()]}, the ${n}${s} of ${MONTHS[d.getMonth()]}`}
function cleanTopic(t){return t.replace(/\s*\(p\.[^)]*\)?/g,'').trim()}
function boardHTML(L,big){return `<div class="board ${big?'big':''}"><div class="bd-date">${engDate()}</div><div class="bd-cw">Classwork</div><div class="bd-topic">${esc(cleanTopic(L.t))}</div>${L.n?`<div class="bd-n">Lesson ${L.n}</div>`:''}<span class="chalk"></span></div>`}
let DECK=null,DI=0;
function openDeck(L,plats){const st=stages(L),yt=(typeof ytLinks==='function'?ytLinks(L):[])[0];const P=(plats||[]).filter(Boolean);
 const W=L.pairs.slice(0,8);const pj=JSON.stringify(L.pairs).replace(/"/g,'&quot;'),wj=JSON.stringify(L.words).replace(/"/g,'&quot;'),hj=JSON.stringify(L.phrases).replace(/"/g,'&quot;');
 const G=(k,lab)=>`<button class="btn alt" onclick="closeDeck();openGame('${k}',JSON.parse(this.dataset.p),JSON.parse(this.dataset.w),JSON.parse(this.dataset.h),'${esc(cleanTopic(L.t)).replace(/'/g,'')}')" data-p="${pj}" data-w="${wj}" data-h="${hj}">${lab}</button>`;
 DECK=[
  boardHTML(L,true),
  `<div class="sl"><span class="sl-k">Warm-up · 5 min</span><h2>Let's start!</h2><p class="sl-q">How are you today? 🙂</p><div class="sl-t">${st[0][2]}</div></div>`,
  `<div class="sl"><span class="sl-k">New words</span><h2>${esc(L.th)}</h2><div class="sl-words">${W.map(p=>`<button onclick="say('${p[0].replace(/'/g,"\'")}')"><b>${esc(p[0])}</b><small>${esc(p[1])}</small></button>`).join('')}</div></div>`,
  `<div class="sl"><span class="sl-k">Speaking</span><h2>Say it with a partner!</h2>${L.phrases.slice(0,3).map(p=>`<p class="sl-big" onclick="say(this.textContent)">${esc(p)}</p>`).join('')}<div class="sl-t">${st[1][2]}</div></div>`,
  `<div class="sl"><span class="sl-k">Practice · 10 min</span><h2>Practice time</h2><div class="sl-t">${st[2][2]}</div></div>`,
  `<div class="sl"><span class="sl-k">Game · 10 min</span><h2>Game time! 🏆</h2><div class="sl-t">${st[3][2]}</div><p class="sl-btns">${G('cards','🃏 Флешкарталар')}${G('quiz','❓ Даяр квиз')}${G(gameFor(L),GAMES[gameFor(L)][0])}<button class="btn ghost" onclick="closeDeck();toolScore()">🏆 Эсеп</button></p>${P.length?`<p class="sl-btns">${P.map(p=>`<a class="btn sky" href="${p[1]}" target="_blank" rel="noopener">🌐 ${esc(p[0])} ↗</a>`).join('')}</p>`:''}</div>`,
  `<div class="sl"><span class="sl-k">Listening · 5 min</span><h2>Listen and repeat 🎧</h2><div class="sl-t">${st[4][2]}</div>${yt?`<p class="sl-btns"><a class="btn" href="${yt[1]}" target="_blank" rel="noopener">${esc(yt[0])} ↗</a></p>`:''}</div>`,
  `<div class="sl"><span class="sl-k">Final check · 5 min</span><h2>Exit ticket ✅</h2><div class="sl-t">${st[5][2]}</div><p class="sl-q">Homework: learn the words and make 3 sentences.</p><p class="sl-btns">${G('quiz','❓ Даяр квиз')}</p></div>`];
 DI=0;let d=document.getElementById('deck');if(!d){d=document.createElement('div');d.id='deck';document.body.append(d)}
 d.innerHTML=`<div class="dk-stage" id="dks"></div><div class="dk-bar"><button class="x" onclick="deckGo(-1)">‹</button><span id="dkn"></span><button class="x" onclick="deckGo(1)">›</button><button class="x" onclick="(document.fullscreenElement?document.exitFullscreen():document.getElementById('deck').requestFullscreen()).catch(()=>{})" title="Толук экран">⛶</button><button class="x" onclick="closeDeck()">×</button></div>`;
 d.classList.add('on');deckGo(0)}
function deckGo(k){DI=Math.max(0,Math.min(DECK.length-1,DI+k));const s=document.getElementById('dks');s.innerHTML=DECK[DI];s.classList.remove('in');void s.offsetWidth;s.classList.add('in');document.getElementById('dkn').textContent=(DI+1)+' / '+DECK.length}
function closeDeck(){const d=document.getElementById('deck');if(d)d.classList.remove('on');if(document.fullscreenElement)document.exitFullscreen().catch(()=>{})}
document.addEventListener('keydown',e=>{const d=document.getElementById('deck');if(!d||!d.classList.contains('on'))return;if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();deckGo(1)}if(e.key==='ArrowLeft')deckGo(-1);if(e.key==='Escape')closeDeck()});
function gCards(pairs){CUR=[gCards,pairs];const P=shuffle(pairs);let i=0,flip=false;setS(null);
 const draw=()=>{const p=P[i];$('#mb').innerHTML=`<p class="center" style="color:var(--muted)">${i+1} / ${P.length} · картаны басып бурса болот</p><div class="fcard ${flip?'f':''}" id="fc"><div class="fc-in"><div class="fc-a">${esc(p[0])}</div><div class="fc-b">${esc(p[1])}</div></div></div><p class="center" style="margin-top:14px"><button class="btn ghost" id="fp">‹ Мурунку</button> <button class="btn alt" id="fs">🔊 Ук</button> <button class="btn" id="fn">Кийинки ›</button></p>`;
  $('#fc').onclick=()=>{flip=!flip;$('#fc').classList.toggle('f',flip)};$('#fs').onclick=()=>say(p[0]);
  $('#fp').onclick=()=>{i=(i-1+P.length)%P.length;flip=false;draw()};$('#fn').onclick=()=>{i=(i+1)%P.length;flip=false;draw()}};draw();say(P[0][0])}

/* ===== Жаңы оюндар ===== */
Object.assign(GAMES,{tf:['✔️ Туура же туура эмес','Котормо туурабы? Тез жооп бер'],hang:['🔤 Сөздү тап','Тамгаларды тандап, жашыруун сөздү тап'],odd:['🧺 Артыкчасын тап','4 сөздүн кайсынысы бул темага кирбейт?'],gap:['✏️ Тамга жетпейт','Жетишпеген тамгаларды жаз']});
function endScreen(n,again){$('#mb').innerHTML=`<p class="qw">🏁 ${score} / ${n}</p>`+replay(again)}
function gTF(pairs){CUR=[gTF,pairs];const Q=shuffle(pairs).slice(0,8);let qi=0;setS(0);
 const show=()=>{if(qi>=Q.length)return endScreen(Q.length,'CUR[0](CUR[1])');const p=Q[qi],other=shuffle(pairs.filter(x=>x!==p))[0]||p,ky=Math.random()<.5?p[1]:other[1],truth=ky===p[1];
  $('#mb').innerHTML=`<p class="center" style="color:var(--muted)">${qi+1} / ${Q.length}</p><p class="qw">${esc(p[0])} = ${esc(ky)} ?</p><div class="qopts"><button style="background:var(--k4)" data-v="1">✔️ True</button><button style="background:var(--k1)" data-v="0">✘ False</button></div><div class="fb" id="fb"></div>`;
  $('#mb').querySelectorAll('.qopts button').forEach(b=>b.onclick=()=>{const ok=(b.dataset.v==='1')===truth;if(ok)setS(score+1);$('#fb').textContent=ok?'✅ Туура!':'❌ '+p[0]+' = '+p[1];qi++;setTimeout(show,1100)})};show()}
function gHang(pairs){CUR=[gHang,pairs];const W=shuffle(pairs.filter(p=>/^[a-z]{3,10}$/i.test(p[0]))).slice(0,5);let wi=0;setS(0);
 const show=()=>{if(wi>=W.length)return endScreen(W.length,'CUR[0](CUR[1])');const w=W[wi][0].toUpperCase(),got=new Set();let lives=6;
  const draw=()=>{const done=[...w].every(c=>got.has(c));$('#mb').innerHTML=`<p class="center" style="color:var(--muted)">Кыргызча: <b>${esc(W[wi][1])}</b> · ${'❤️'.repeat(lives)}</p><p class="qw" style="letter-spacing:10px">${[...w].map(c=>got.has(c)?c:'_').join('')}</p><div class="wl">${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c=>`<s data-c="${c}" class="${got.has(c)?'d':''}" style="cursor:pointer">${c}</s>`).join('')}</div><div class="fb" id="fb"></div>`;
   if(done){setS(score+1);$('#fb').textContent='🎉 '+w;wi++;return setTimeout(show,1100)}if(!lives){$('#fb').textContent='Жооп: '+w;wi++;return setTimeout(show,1400)}
   $('#mb').querySelectorAll('[data-c]').forEach(x=>x.onclick=()=>{const c=x.dataset.c;if(got.has(c))return;got.add(c);if(!w.includes(c))lives--;draw()})};draw()};show()}
function gOdd(pairs){CUR=[gOdd,pairs];const own=new Set(pairs.map(p=>p[0]));const others=BANK.flatMap(b=>Object.keys(b[2])).filter(w=>!own.has(w));let qi=0;setS(0);const N=6;
 const show=()=>{if(qi>=N)return endScreen(N,'CUR[0](CUR[1])');const three=shuffle(pairs).slice(0,3).map(p=>p[0]),odd=others[Math.random()*others.length|0],opts=shuffle([...three,odd]);
  $('#mb').innerHTML=`<p class="center" style="color:var(--muted)">${qi+1} / ${N} · Кайсы сөз артык?</p><div class="qopts" style="margin-top:20px">${opts.map((o,j)=>`<button style="background:${['var(--k1)','var(--k2)','var(--k3)','var(--k4)'][j]}" data-o="${o===odd}">${esc(o)}</button>`).join('')}</div><div class="fb" id="fb"></div>`;
  $('#mb').querySelectorAll('.qopts button').forEach(b=>b.onclick=()=>{const ok=b.dataset.o==='true';if(ok)setS(score+1);$('#fb').textContent=ok?'✅ Туура! Калган үч сөз менен сүйлөм түз.':'❌ Артыкчасы: '+odd;qi++;setTimeout(show,1500)})};show()}
function gGap(pairs){CUR=[gGap,pairs];const W=shuffle(pairs.filter(p=>/^[a-z]{3,12}$/i.test(p[0]))).slice(0,6);let qi=0;setS(0);
 const show=()=>{if(qi>=W.length)return endScreen(W.length,'CUR[0](CUR[1])');const w=W[qi][0],hide=new Set(shuffle([...Array(w.length).keys()]).slice(0,Math.max(1,w.length/3|0)));
  $('#mb').innerHTML=`<p class="center" style="color:var(--muted)">${qi+1} / ${W.length} · Кыргызча: <b>${esc(W[qi][1])}</b></p><p class="qw" style="letter-spacing:8px">${[...w].map((c,i)=>hide.has(i)?'_':c).join('')}</p><div style="display:flex;gap:8px;max-width:420px;margin:0 auto"><input type="text" id="ga" placeholder="Толук сөздү жаз" autocomplete="off"><button class="btn" id="gb">✔</button></div><div class="fb" id="fb"></div>`;
  const chk=()=>{const ok=$('#ga').value.trim().toLowerCase()===w.toLowerCase();if(ok)setS(score+1);$('#fb').textContent=ok?'✅ Туура!':'❌ '+w;qi++;setTimeout(show,1100)};$('#gb').onclick=chk;$('#ga').onkeydown=e=>{if(e.key==='Enter')chk()};$('#ga').focus()};show()}

/* ===== Апта күнүнө жараша түс ===== */
const DAYC=[['Sunday · teal','#1f5f66','#164a50','#0e3439','#178f84','#0c3236'],['Monday · green','#2f5a4f','#1f3d36','#16302a','#1f9a5a','#0f3d2b'],['Tuesday · red','#7a1a2c','#5e0f20','#420816','#d23a55','#5e0718'],['Wednesday · blue','#24477a','#183459','#10243f','#2f6fdb','#0f2747'],['Thursday · orange','#7a4a1a','#5c3510','#40240a','#e8873d','#4a2a0c'],['Friday · purple','#4b2a73','#371d57','#25123c','#8a4fc0','#2a1240'],['Saturday · pink','#7a2a55','#5c1d40','#40122c','#ff5a8a','#4a1430']];
(function(){const c=DAYC[new Date().getDay()],r=document.documentElement.style;r.setProperty('--b1',c[1]);r.setProperty('--b2',c[2]);r.setProperty('--b3',c[3]);r.setProperty('--dc',c[4]);r.setProperty('--dd',c[5])})();
