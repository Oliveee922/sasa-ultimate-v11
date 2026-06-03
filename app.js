const rand=a=>a[Math.floor(Math.random()*a.length)];
const clamp=n=>Math.max(0,Math.min(100,Math.round(n)));
const APP_VERSION="Ultimate V24.1 Start Fix";
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);

const KDB={
 "RIIZE":{company:"SM Entertainment",fandom:"BRIIZE",members:["Shotaro","Eunseok","Sungchan","Wonbin","Sohee","Anton"],same:["NCT","aespa","Red Velvet","EXO","SHINee"],rivals:["BOYNEXTDOOR","ZEROBASEONE","TWS","ENHYPEN","TXT"]},
 "SEVENTEEN":{company:"PLEDIS Entertainment",fandom:"CARAT",members:["S.Coups","Jeonghan","Joshua","Jun","Hoshi","Wonwoo","Woozi","DK","Mingyu","The8","Seungkwan","Vernon","Dino"],same:["TWS"],rivals:["NCT","Stray Kids","TXT","ENHYPEN"]},
 "TXT":{company:"BIGHIT MUSIC",fandom:"MOA",members:["Soobin","Yeonjun","Beomgyu","Taehyun","Hueningkai"],same:["BTS","LE SSERAFIM","ENHYPEN","BOYNEXTDOOR","TWS"],rivals:["Stray Kids","NCT","ZEROBASEONE","RIIZE"]},
 "ENHYPEN":{company:"BELIFT LAB",fandom:"ENGENE",members:["Jungwon","Heeseung","Jay","Jake","Sunghoon","Sunoo","Ni-ki"],same:["TXT","LE SSERAFIM","BOYNEXTDOOR","TWS"],rivals:["ZEROBASEONE","RIIZE","Stray Kids"]},
 "Stray Kids":{company:"JYP Entertainment",fandom:"STAY",members:["Bang Chan","Lee Know","Changbin","Hyunjin","HAN","Felix","Seungmin","I.N"],same:["ITZY","NMIXX","TWICE"],rivals:["SEVENTEEN","TXT","ATEEZ"]},
 "NCT":{company:"SM Entertainment",fandom:"NCTzen",members:["Taeyong","Doyoung","Jaehyun","Jungwoo","Mark","Haechan","Ten","Jeno","Jaemin","Chenle","Jisung"],same:["RIIZE","aespa","Red Velvet","EXO","SHINee"],rivals:["SEVENTEEN","Stray Kids","TXT"]},
 "aespa":{company:"SM Entertainment",fandom:"MY",members:["Karina","Giselle","Winter","Ningning"],same:["RIIZE","NCT","Red Velvet","EXO"],rivals:["IVE","LE SSERAFIM"]},
 "IVE":{company:"STARSHIP Entertainment",fandom:"DIVE",members:["Gaeul","Yujin","Rei","Wonyoung","Liz","Leeseo"],same:["MONSTA X","CRAVITY"],rivals:["aespa","LE SSERAFIM"]},
 "LE SSERAFIM":{company:"SOURCE MUSIC",fandom:"FEARNOT",members:["Sakura","Chaewon","Yunjin","Kazuha","Eunchae"],same:["TXT","ENHYPEN","BOYNEXTDOOR","TWS"],rivals:["IVE","aespa"]},
 "BOYNEXTDOOR":{company:"KOZ Entertainment",fandom:"ONEDOOR",members:["Sungho","Riwoo","Jaehyun","Taesan","Leehan","Woonhak"],same:["TXT","ENHYPEN","LE SSERAFIM","TWS"],rivals:["RIIZE","ZEROBASEONE","TWS"]},
 "TWS":{company:"PLEDIS Entertainment",fandom:"42",members:["Shinyu","Dohoon","Youngjae","Hanjin","Jihoon","Kyungmin"],same:["SEVENTEEN"],rivals:["RIIZE","BOYNEXTDOOR","ZEROBASEONE"]},
 "ZEROBASEONE":{company:"WAKEONE",fandom:"ZEROSE",members:["Sung Hanbin","Kim Jiwoong","Zhang Hao","Seok Matthew","Kim Taerae","Ricky","Kim Gyuvin","Park Gunwook","Han Yujin"],same:[],rivals:["RIIZE","BOYNEXTDOOR","TWS","ENHYPEN"]}
};
const aliases={"元彬":"RIIZE","wonbin":"RIIZE","成燦":"RIIZE","sungchan":"RIIZE","炤熙":"RIIZE","sohee":"RIIZE","恩奭":"RIIZE","eunseok":"RIIZE","anton":"RIIZE","shotaro":"RIIZE","珉奎":"SEVENTEEN","mingyu":"SEVENTEEN","然竣":"TXT","yeonjun":"TXT","成訓":"ENHYPEN","sunghoon":"ENHYPEN","felix":"Stray Kids","karina":"aespa","wonyoung":"IVE"};

const COMPANY_DB={
 "SM Entertainment":{senior:["TVXQ","Super Junior","Girls' Generation","SHINee","EXO","Red Velvet","NCT","aespa"],control:92,pr:78,datingTolerance:32,fandomSensitivity:86,globalExposure:88,risk:"公司管控強、同公司前後輩容易在練習室與頒獎禮後台交會",platforms:["Weverse/社群","Instagram","X","韓網"]},
 "HYBE":{senior:["BTS","TXT","ENHYPEN","LE SSERAFIM","BOYNEXTDOOR","TWS"],control:84,pr:88,datingTolerance:38,fandomSensitivity:92,globalExposure:96,risk:"多廠牌體系、行程龐大、粉圈國際化強",platforms:["Weverse","X","TikTok","韓網"]},
 "JYP Entertainment":{senior:["TWICE","Stray Kids","ITZY","NMIXX"],control:78,pr:82,datingTolerance:40,fandomSensitivity:78,globalExposure:90,risk:"海外巡演與團體品牌形象壓力高",platforms:["Bubble","X","Instagram","韓網"]},
 "PLEDIS Entertainment":{senior:["SEVENTEEN","TWS"],control:80,pr:74,datingTolerance:36,fandomSensitivity:84,globalExposure:86,risk:"前後輩關係密集、團隊與成員察覺線強",platforms:["Weverse","X","韓網"]},
 "STARSHIP Entertainment":{senior:["MONSTA X","IVE","CRAVITY"],control:76,pr:70,datingTolerance:35,fandomSensitivity:82,globalExposure:78,risk:"品牌活動與女團/男團粉圈比較容易升溫",platforms:["X","Instagram","韓網"]}
,
 "YG Entertainment":{senior:["BLACKPINK","TREASURE","BABYMONSTER"],control:72,pr:68,datingTolerance:45,fandomSensitivity:80,globalExposure:94,risk:"全球曝光高，戀愛傳聞容易被國際媒體搬運",platforms:["Instagram","X","韓網"]},
 "WAKEONE":{senior:["ZEROBASEONE"],control:82,pr:62,datingTolerance:30,fandomSensitivity:88,globalExposure:82,risk:"限定/企劃團粉圈壓力高，戀愛傳聞容忍度低",platforms:["X","韓網","Instagram"]},
 "KOZ Entertainment":{senior:["BOYNEXTDOOR"],control:70,pr:68,datingTolerance:42,fandomSensitivity:72,globalExposure:74,risk:"新人期形象管理嚴格，Challenge與打歌動線密集",platforms:["X","TikTok","韓網"]}
};
const AI_STYLE_PRESETS={
 "realistic":"偏現實向：公司、粉圈、行程、心理壓力優先，不過度夢幻。",
 "romance":"偏戀愛向：情緒流、曖昧細節、親密張力較多，但仍保留代價。",
 "angst":"偏虐向：冷戰、錯過、公開壓力、公司阻隔更強。",
 "slowburn":"慢熱向：少量推進，用眼神、訊息、工作縫隙堆疊關係。",
 "dramatic":"戲劇向：爆料、熱搜、成員察覺、Dispatch事件較頻繁。"
};


let current=null;

function detectGroup(text){
 const t=String(text||"").toLowerCase();
 for(const g of Object.keys(KDB)){ if(t.includes(g.toLowerCase())) return g; }
 for(const k in aliases){ if(t.includes(k.toLowerCase())) return aliases[k]; }
 return "";
}
function baseStats(rel){
 return({"曖昧期":[45,32,16,65,18,8,16],"剛交往":[58,44,22,70,24,12,28],"秘密交往中":[66,57,28,72,34,17,42],"冷戰中":[49,31,25,78,30,16,22],"分手邊緣":[38,22,34,83,37,24,35],"互相試探":[46,28,20,68,22,10,14],"陌生但有火花":[30,16,12,60,10,5,8]}[rel]||[45,32,16,65,18,8,16])
}
function getSaves(){return JSON.parse(localStorage.getItem("sasa_v5_saves")||"[]")}
function setSaves(s){localStorage.setItem("sasa_v5_saves",JSON.stringify(s))}
function show(id){["home","newGame","settings","guide","game"].forEach(x=>document.getElementById(x).classList.add("hidden"));document.getElementById(id).classList.remove("hidden");document.getElementById("bottom").classList.toggle("hidden",id!=="game")}
function goHome(){show("home");renderSaves()}
function showNewGame(){show("newGame")}
function showSettings(){show("settings");document.getElementById("apiKey").value=localStorage.getItem("sasa_api_key")||"";document.getElementById("modelName").value=localStorage.getItem("sasa_model")||"gpt-4.1-mini";document.getElementById("aiTemp").value=localStorage.getItem("sasa_ai_temp")||"0.9";document.getElementById("memoryLimit").value=localStorage.getItem("sasa_memory_limit")||"12"}
function saveSettings(){
 localStorage.setItem("sasa_api_key",document.getElementById("apiKey").value);
 localStorage.setItem("sasa_model",document.getElementById("modelName").value||"gpt-4.1-mini");
 localStorage.setItem("sasa_ai_temp",document.getElementById("aiTemp").value||"0.9");
 localStorage.setItem("sasa_memory_limit",document.getElementById("memoryLimit").value||"12");
 alert("已儲存")
}
function renderSaves(){
 show("home");
 const saves=getSaves();
 const box=document.getElementById("saves");
 if(!saves.length){box.innerHTML="<p class='muted'>目前沒有存檔。</p>";return}
 box.innerHTML=saves.map(s=>`<div class="save-card">
  <div class="meta"><div class="save-title">${s.title}</div>
  <div class="small">${s.state.ta}｜${s.state.group}｜${s.state.lifeStage}｜${s.state.year}年${s.state.month}月｜回合${s.state.round}</div>
  <span class="tag">${s.state.relation}</span><span class="tag">${s.state.role}</span></div>
  <div><button onclick="loadSave('${s.id}')">讀取</button><button class="secondary" onclick="exportOneSave('${s.id}')">匯出</button><button class="danger" onclick="deleteSave('${s.id}')">刪除</button></div>
 </div>`).join("")
}
function deleteSave(id){if(!confirm("確定刪除這個存檔？"))return;setSaves(getSaves().filter(s=>s.id!==id));renderSaves()}
function loadSave(id){current=getSaves().find(s=>s.id===id);show("game");renderAll("【讀檔完成】\n\n你回到了上一次停下的地方。")}
function saveCurrent(){
 if(!current)return alert("目前沒有遊戲進行中");
 current.updatedAt=new Date().toISOString();
 const saves=getSaves();
 const idx=saves.findIndex(s=>s.id===current.id);
 if(idx>=0)saves[idx]=current; else saves.unshift(current);
 setSaves(saves);
 alert("已存檔")
}

function makeXAccounts(group,ta){
 return [
  {handle:"@idolarchive_kr",type:"搬運帳",followers:120000,credibility:62,danger:45,focus:10},
  {handle:"@bubbletranslate",type:"翻譯帳",followers:86000,credibility:55,danger:38,focus:8},
  {handle:`@${String(group||"idol").toLowerCase()}_global`,type:"國際粉站",followers:210000,credibility:48,danger:28,focus:5},
  {handle:`@${String(ta||"idol").toLowerCase().replace(/[^a-z0-9]/g,"")}_daily`,type:"個站",followers:52000,credibility:42,danger:34,focus:7},
  {handle:"@kpopissue_now",type:"議題帳",followers:340000,credibility:50,danger:75,focus:15},
  {handle:"@datingtimeline",type:"CP/考古帳",followers:18000,credibility:35,danger:68,focus:20}
 ];
}
function makeWatchers(group){
 return [
  {name:"LemonShot",type:"大站姐",awareness:12,tracking:68,leak:18,danger:55,stance:"只拍公開行程"},
  {name:"SilverMoon",type:"CP站",awareness:28,tracking:44,leak:35,danger:50,stance:"喜歡整理糖點"},
  {name:"NightDrive",type:"代拍",awareness:20,tracking:72,leak:42,danger:70,stance:"有圖就賣"},
  {name:"未知私生A",type:"私生",awareness:36,tracking:88,leak:66,danger:92,stance:"跟私下行程"},
  {name:"Dispatch線人",type:"媒體線人",awareness:8,tracking:60,leak:75,danger:86,stance:"等待實錘"}
 ];
}


function makeCompanyState(company){
 const base=COMPANY_DB[company]||{control:70,pr:65,datingTolerance:35,fandomSensitivity:75,globalExposure:70,risk:"一般公司管控",senior:[],platforms:["X","Instagram","韓網"]};
 return {
  name:company,
  control:base.control||70,
  pr:base.pr||65,
  datingTolerance:base.datingTolerance||35,
  fandomSensitivity:base.fandomSensitivity||75,
  globalExposure:base.globalExposure||70,
  alert:20,
  prFatigue:0,
  internalRumor:0,
  risk:base.risk,
  platforms:base.platforms||[],
  senior:base.senior||[]
 };
}
function makeIndustryRelations(group,data){
 const rel=[];
 (data.members||[]).forEach(m=>rel.push({name:m,type:"同團成員",heat:20,stance:"未察覺"}));
 (data.same||[]).forEach(g=>rel.push({name:g,type:"同公司前後輩",heat:18,stance:"普通同事"}));
 (data.rivals||[]).forEach(g=>rel.push({name:g,type:"打歌同場/競品團",heat:12,stance:"圈內交會"}));
 return rel;
}


function makePersonality(seedName="TA"){
 const styles=["安全型","焦慮型","逃避型","矛盾型","控制型","慢熱防衛型"];
 const fates=["公開線","錯過線","共犯線","隱秘穩定線","爆料分離線","雙頂流公開線","海外定居線"];
 const p={
  attachment:rand(styles),
  fateSeed:rand(fates),
  careerPriority:rand([62,70,78,85,92,96]),
  avoidance:rand([18,28,36,45,55,68]),
  jealousyTrigger:rand(["你和圈內前輩互動","你突然消失不回訊息","你和合作對象被嗑CP","你把工作排在TA前面","你在公開場合太冷靜"]),
  insecurity:rand(["不能公開帶來的失衡","害怕拖累團體","害怕你受傷後離開","害怕感情被公司定義成風險","害怕自己不是你的優先選擇"]),
  publicWillingness:rand([15,22,35,48,60]),
  moralLine:rand(["不牽連成員","不讓你被粉圈獵巫","不在回歸期失控","不撒會傷害你的謊","不讓公司先知道"]),
  affectionStyle:rand(["用行動照顧","用訊息試探","公開冷靜私下靠近","忙到極限才示弱","用玩笑藏真話"]),
  shadow:0,
  trustMemory:50,
  emotionalDebt:0,
  lastWound:"",
  lastWarmth:""
 };
 return p;
}
function makeNpcPersonality(name,type){
 return {
  attachment:rand(["安全型","觀望型","防衛型","利益優先","保護型"]),
  loyalty:rand([20,35,50,65,80]),
  curiosity:rand([15,30,45,60,75]),
  riskTolerance:rand([10,25,40,55,70]),
  secretKeeping:rand([20,40,60,80]),
  stanceShift:0
 };
}


function updateIdolExtraVisibility(){
 const box=document.getElementById("idolExtra");
 if(!box)return;
 const checked=[...document.querySelectorAll("#roleChecks input:checked")].map(x=>x.value);
 box.classList.toggle("hidden", !checked.includes("愛豆同行"));
}
setTimeout(()=>{
 document.querySelectorAll("#roleChecks input").forEach(x=>x.addEventListener("change",updateIdolExtraVisibility));
 updateIdolExtraVisibility();
},0);


function makeMyIdolMembers(setup){
 if(!setup)return [];
 const names=["夏允","娜璉","知珉","瑞雅","恩彩","潤序","海琳","詩溫","采律","多恩","允河","Lia","Rina","Sera"];
 const roles=["隊長","主唱","主舞","Rapper","門面","忙內","綜藝擔當","創作Line","ACE"];
 const mbtis=["ENFP","INFP","ISFJ","ENTP","INFJ","ESFJ","ISTP","ENFJ"];
 const traits=["操心怪","超吵","安靜但毒舌","反應很快","愛撒嬌","事業腦","怕生","綜藝瘋子","練習室住民"];
 const looks=["清冷貓相","甜妹感","高冷模特臉","運動系","小狗相","酷妹感","鄰家感","舞台妖精"];
 const count=Math.max(1,(setup.size||5)-1);
 const used=[];
 return Array.from({length:count},(_,i)=>{
  let name=names[i%names.length]; if(used.includes(name)) name+=String(i+1); used.push(name);
  return {id:uid(),name,age:rand([18,19,20,21,22,23,24,25,26]),role:roles[i%roles.length],mbti:rand(mbtis),trait:rand(traits),look:rand(looks),popularity:rand([35,48,55,62,70,82]),bond:rand([20,35,45,58,70]),stance:"隊友",secret:"未發現"};
 });
}
function addIdolChat(speaker,text,type="group"){
 const s=current.state;
 s.idolGroupChat.unshift({id:uid(),year:s.year,month:s.month,speaker,text,type});
 s.idolGroupChat=s.idolGroupChat.slice(0,100);
 addPhoneThread(`${s.myIdolSetup?.groupName||"團體"} 宿舍群`,`${speaker}：${text}`,"group",1);
}
function addIdolEvent(title,desc,type="idol",impact=5){
 const s=current.state;
 s.idolEvents.unshift({id:uid(),year:s.year,month:s.month,round:s.round,title,desc,type,impact});
 s.idolEvents=s.idolEvents.slice(0,100);
 addUniverseLog(title,desc,type);
}
function idolLifeAction(type){
 if(!current)return;
 const s=current.state;
 if(!s.myIdolSetup)return alert("這個存檔沒有選擇愛豆同行，無法使用愛豆人生系統。");
 let story="", member=rand(s.myMembers||[{name:"隊友",role:"隊友"}]);
 if(type==="dorm"){
  const ev=rand([["宵夜事件",`${member.name} 把你的優格吃掉，還在宿舍群裝不知道。`],["深夜談心",`${member.name} 坐在客廳地板上問你：「你最近是不是有事瞞著我們？」`],["客廳燈",`凌晨三點宿舍客廳還亮著，大家都說要睡，結果沒有人真的睡。`]]);
  addIdolChat(member.name, ev[1]);
  addIdolEvent(ev[0],ev[1],"宿舍",6);
  story=`【愛豆人生｜宿舍日常】\n\n${ev[1]}\n\n宿舍不是安全屋，是所有秘密最容易露出尾巴的地方。`;
 }
 if(type==="practice"){
  const ev=`練習室鏡子前，你和 ${member.name} 因為一個走位吵了三分鐘，最後又一起笑場。`;
  s.pressure=clamp(s.pressure+5); member.bond=clamp((member.bond||0)+4);
  addIdolEvent("練習室事件",ev,"練習室",5);
  story=`【愛豆人生｜練習室】\n\n${ev}\n\n青春感不是不累，是累到快崩潰還能因為一句話笑出來。`;
 }
 if(type==="musicshow"){
  const ev=`打歌待機室裡，${member.name} 幫你擋住了突然掃過來的工作人員鏡頭。`;
  s.risk=clamp(s.risk-2); member.bond=clamp((member.bond||0)+6);
  addIdolEvent("打歌待機室",ev,"打歌",7);
  story=`【愛豆人生｜打歌待機室】\n\n${ev}\n\n隊友不一定知道全部，但有些人會先替你擋一下。`;
 }
 if(type==="groupchat"){
  const lines=[["隊長","明天七點集合。"],[member.name,"不可能。"],["你","我支持不可能。"],["忙內","ㅋㅋㅋㅋㅋㅋ"],["經紀人","我看得到。"]];
  lines.forEach(l=>addIdolChat(l[0],l[1]));
  addIdolEvent("團體聊天室",`${s.myIdolSetup.groupName} 宿舍群又吵起來了。`,"群聊",4);
  story=`【愛豆人生｜團體聊天室】\n\n隊長：明天七點集合。\n${member.name}：不可能。\n你：我支持不可能。\n經紀人：我看得到。\n\n宿舍群安靜了三秒。`;
 }
 if(type==="memberRumor"){
  const ev=`你發現 ${member.name} 最近回訊息很慢，Bubble卻更新得很勤。隊友們開始互看。`;
  member.secret="疑似戀愛或有私人行程"; s.fandomHeat=clamp((s.fandomHeat||0)+4);
  addGossipIntel("隊友觀察",`${member.name} 最近有點怪`,ev,55,20);
  addIdolEvent("隊友八卦",ev,"八卦",8);
  story=`【愛豆人生｜隊友八卦】\n\n${ev}\n\n原來不是只有你的秘密會在團體裡長出影子。`;
 }
 if(type==="fancam"){
  const ev=`你的直拍突然出圈，粉絲開始說你今天眼神像有故事。`;
  s.buzz=clamp(s.buzz+12); s.fandomHeat=clamp((s.fandomHeat||0)+8);
  addPhoneSNS("X","@fancam_daily",`${s.myIdolSetup.groupName} ${s.myIdolSetup.roles?.[0]||"成員"} 今日直拍出圈`,18);
  addIdolEvent("站姐神圖",ev,"粉圈",10);
  story=`【愛豆人生｜站姐神圖】\n\n${ev}\n\n站姐拍到的是舞台，但粉絲開始解讀的是你沒有說出口的心情。`;
 }
 if(type==="award"){
  const ev=`年末舞台彩排到凌晨，${member.name} 靠在牆邊說：「我們真的變成前輩了欸。」`;
  s.pressure=clamp(s.pressure+8); s.heart=clamp(s.heart+3);
  addIdolEvent("年末舞台",ev,"年末",9);
  story=`【愛豆人生｜年末舞台】\n\n${ev}\n\n時間不是用年份算的，是用每一次彩排後的凌晨算的。`;
 }
 if(type==="conflict"){
  const ev=`隊內氣氛變得很微妙。有人覺得公司資源分配不公平，有人覺得大家都太累。`;
  s.pressure=clamp(s.pressure+14); (s.myMembers||[]).forEach(m=>m.bond=clamp((m.bond||0)-rand([1,2,4])));
  addIdolEvent("團體危機",ev,"危機",15);
  story=`【愛豆人生｜團體危機】\n\n${ev}\n\n團體不是永遠整齊的隊形，有時候每個人都在用自己的方式撐著。`;
 }
 s.round++; updateWorldClock("hour"); s.lifeStage=lifeStage(); current.storyLog.push(story); saveCurrent(); renderAll(story);
}
function renderIdolLife(){
 if(!current)return;
 const s=current.state;
 const setup=s.myIdolSetup;
 const profile=document.getElementById("myIdolProfile");
 if(profile)profile.innerHTML=setup?`<div class="member-card"><b>${setup.groupName}</b><div>${setup.company}｜${setup.type}｜${setup.size}人｜${setup.debutStatus}</div><div class="member-tags">${(setup.roles||[]).map(r=>`<span>${r}</span>`).join("")}<span>${setup.vibe}</span></div><div class="small">戀愛限制：團內${setup.romanceRules?.inGroup?"允許":"禁止"}｜同公司${setup.romanceRules?.sameCompany?"允許":"禁止"}｜公司嚴格${setup.romanceRules?.strictCompany?"是":"否"}</div></div>`:"<p class='muted'>此存檔未選愛豆同行。</p>";
 const members=document.getElementById("myMembersPanel");
 if(members)members.innerHTML=(s.myMembers||[]).map(m=>`<div class="member-card"><b>${m.name}</b><div>${m.age}歲｜${m.role}｜${m.mbti}</div><div>${m.look}，${m.trait}</div><div class="member-tags"><span>人氣 ${m.popularity}</span><span>關係 ${m.bond}</span><span>${m.secret}</span></div></div>`).join("")||"<p class='muted'>尚無隊友資料。</p>";
 const chat=document.getElementById("idolGroupChat");
 if(chat)chat.innerHTML=(s.idolGroupChat||[]).slice(0,20).map(c=>`<div class="dorm-chat"><span class="speaker">${c.speaker}</span>：${c.text}<div class="small">${c.year}年${c.month}月</div></div>`).join("")||"<p class='muted'>尚無團體聊天。</p>";
 const ev=document.getElementById("idolEventsPanel");
 if(ev)ev.innerHTML=(s.idolEvents||[]).map(e=>`<div class="idol-event"><b>${e.title}</b><div>${e.desc}</div><span class="tag">${e.type}</span><span class="tag">影響 ${e.impact}</span></div>`).join("")||"<p class='muted'>尚無愛豆事件。</p>";
}

function startNewGame(){
 const target=document.getElementById("target").value.trim()||"隨機原創";
 const group=detectGroup(target)||"原創團體";
 const data=KDB[group]||{company:"虛構企劃社",fandom:"粉絲",members:["成員A","成員B","成員C"],same:["RIIZE","TXT","IVE"],rivals:["RIIZE","TXT","ENHYPEN","SEVENTEEN"]};
 const ta=target==="隨機原創"?rand(["姜瑞允","韓律","尹采河","李成曜"]):target;
 const roles=[...document.querySelectorAll("#roleChecks input:checked")].map(x=>x.value);
 const role=roles.length?roles.join("＋"):"愛豆同行";
 const isIdolSelf=roles.includes("愛豆同行");
 const idolRoles=[...document.querySelectorAll("#idolRolesBox input:checked")].map(x=>x.value);
 const myIdolSetup=isIdolSelf?{
  groupName:(document.getElementById("myGroupName")?.value||rand(["AURORA","LUMINA","VIOLET","CIELO","ODD HEART"])),
  company:document.getElementById("myCompany")?.value||"自創公司",
  type:document.getElementById("myGroupType")?.value||"女團",
  size:parseInt(document.getElementById("myGroupSize")?.value||"7",10),
  debutStatus:document.getElementById("myDebutStatus")?.value||"出道3年",
  vibe:document.getElementById("myGroupVibe")?.value||"吵吵鬧鬧組",
  roles:idolRoles.length?idolRoles:["Center","主唱","團寵"],
  romanceRules:{
   inGroup:!!document.getElementById("allowInGroupLove")?.checked,
   sameCompany:!!document.getElementById("allowSameCompanyLove")?.checked,
   idolRumor:!!document.getElementById("allowIdolRumor")?.checked,
   strictCompany:!!document.getElementById("strictCompany")?.checked
  }
 }:null;
 const rel=document.getElementById("relation").value;
 const st=baseStats(rel);
 const npcs={};
 [...data.members,...data.same,...data.rivals,"經紀人","造型組長","品牌方PR"].forEach(n=>{
  if(!String(ta).toLowerCase().includes(String(n).toLowerCase())){
    const isStaff=["經紀人","造型組長","品牌方PR"].includes(n);
    npcs[n]={awareness:Math.floor(Math.random()*26),closeness:isStaff?20:Math.floor(Math.random()*45),pressure:isStaff?55:Math.floor(Math.random()*35),stance:rand(isStaff?["公司優先","觀察中","理性提醒"]:["假裝不知道","理性提醒","幫忙隱瞞","公司優先","觀察中"]),type:isStaff?"staff":(data.members.includes(n)?"member":(data.same.includes(n)?"sameCompany":"industry")),personality:makeNpcPersonality(n,isStaff?"staff":"npc")}
  }
})
 current={
  id:uid(),version:APP_VERSION,title:document.getElementById("saveTitle").value.trim()||`${ta}線`,
  createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),
  state:{round:1,year:2026,month:4,week:1,season:"回歸期",lifeStage:"秘密人生開始",role,ta,group,company:data.company,fandom:data.fandom,relation:rel,scene:document.getElementById("scene").value,call:document.getElementById("callName").value||"你",playerBio:document.getElementById("playerBio").value,extraNote:document.getElementById("extraNote").value,mode:document.getElementById("mode").value,aiStyle:document.getElementById("aiStyle")?document.getElementById("aiStyle").value:"realistic",matureLevel:document.getElementById("matureLevel").value,adultConfirmed:document.getElementById("adultConfirm").checked,familyMode:document.getElementById("familyMode").value,heart:st[0],trust:st[1],risk:st[2],pressure:st[3],possess:st[4],buzz:st[5],intimacy:st[6],stayRisk:0,marriage:0,familyRisk:0,cohabitation:0,publicStatus:"未公開",marriageStatus:"未婚",familyStatus:"未開啟",careerStage:"現役活動中",retirementStage:"未退休",debutYear:2023,careerYear:3,contractStatus:"首約進行中",lifeChapters:[],lifeMilestones:[],futurePaths:[],lifeEvents:[],phoneMessages:[],notifications:[],kakaoChats:[],bubblePosts:[],xTimeline:[],instagramStories:[],callLogs:[],calendarEvents:[],album:[],dispatchCases:[],loveArchive:[],dreamInbox:[],snsUniverse:[],cohabLife:[],memoryAlbum:[],pushEvents:[],phoneThreads:[],phoneUnread:[],phoneCalls:[],phoneSNS:[],spotifyHistory:[],phoneAlbum:[],phoneDispatch:[],myIdolSetup:myIdolSetup,myMembers:makeMyIdolMembers(myIdolSetup),idolGroupChat:[],idolEvents:[],snapshots:[],secretBubbleSubs:[],gossipIntel:[],dispatchDeals:[],items:[],worldEvents:[],universeLog:[],industryRelations:makeIndustryRelations(group,data),mainPersonality:makePersonality(ta),emotionalShadows:[],relationshipWounds:[],companyState:makeCompanyState(data.company),worldClock:{year:2026,month:4,day:1,hour:10,period:"上午"},autoWorld:false,autoEvents:[],npcAutonomyLog:[],fandomHeat:st[5],searchRank:0,proofLevel:0,companyStatement:"尚未回應",fandomSplit:0,knetzMood:35,ifansMood:62,dispatchFocus:0,xHeat:0,trendWashPower:0,photoVault:[],xAccounts:makeXAccounts(group,ta),watchers:makeWatchers(group),npcs},
  memories:[],memoryClusters:[],recallHooks:[],timeline:[],sns:[],groupChats:[],storyLog:[]
 };
 addTimeline("遊戲開始",`${current.state.year}年${current.state.month}月，你以「${role}」身份進入 ${ta} 的平行世界人生線。`,"高");
 const intro=openingStory();
 current.storyLog.push(intro);
 addMemory("初始設定",`玩家身份：${role}。戀愛對象：${ta}。關係：${rel}。場景：${current.state.scene}。人物簡介：${current.state.playerBio||"未填"}`,"高",["開局","角色"]);
 saveCurrent();show("game");renderAll(intro)
}
function openingStory(){
 const s=current.state;
 return `【初始化完成】

玩家身份：${s.role}
戀愛對象：${s.ta}
團體 / 公司：${s.group} / ${s.company}
粉絲名：${s.fandom}
目前關係：${s.relation}
人生時間：${s.year}年${s.month}月 第${s.week}週｜${s.season}

【劇情正文】

${s.scene}的燈還沒完全熄。

你站在人群與鏡頭都碰不到的邊界，聽見工作人員在遠處喊 ${s.ta} 的名字。

TA從反光板裡看了你一眼，很短，短到旁人只會以為是行程確認。

手機震了一下。

【Bubble】
${s.ta}：今天聽見一句話，突然覺得可以撐過去。

${s.fandom} 的留言開始往上滾：

- 「誰說的？」
- 「不要亂猜啦ㅋㅋ」
- 「但今天狀態真的很好」
- 「感覺不像普通福利……」

TA沒有叫你的親暱稱呼，只是經過你身邊時，把聲音壓低。

「等一下，不要先走。」

這句話很普通，普通到任何人聽見都能解釋成工作。

可你知道，這不是給所有人的語氣。`
}
function addMemory(title,content,importance="中",tags=[]){
 const weight=importance==="高"?90:importance==="中"?55:25;
 current.memories.unshift({id:uid(),turn:current.state.round,year:current.state.year,month:current.state.month,title,content,importance,tags,weight,lastRecalled:null,createdAt:new Date().toISOString()});
 current.memories=current.memories.slice(0,200)
}
function addTimeline(title,summary,importance="中"){current.timeline.unshift({id:uid(),year:current.state.year,month:current.state.month,week:current.state.week,title,summary,importance})}
function addSNS(platform,title,comments){current.sns.unshift({id:uid(),platform,title,comments,year:current.state.year,month:current.state.month});current.sns=current.sns.slice(0,60)}
function advanceTime(){
 const s=current.state;
 s.week++;
 if(s.week>4){s.week=1;s.month++}
 if(s.month>12){s.month=1;s.year++}
 const seasons={1:"頒獎季餘波",2:"海外時裝週",3:"回歸準備期",4:"打歌回歸期",5:"校園祭與品牌活動",6:"海外公演",7:"夏日特別舞台",8:"休整期",9:"秋季回歸預熱",10:"拼盤演唱會",11:"年末舞台準備",12:"頒獎季"};
 s.season=seasons[s.month]||"日常期";
}
function lifeStage(){
 const s=current.state;
 if(s.retirementStage!=="未退休")return s.retirementStage+"持續中";
 if(s.familyStatus!=="未開啟")return s.familyStatus+"持續中";
 if(s.marriageStatus!=="未婚")return s.marriageStatus+"持續中";
 if(s.publicStatus==="已公開")return "公開戀愛持續中";
 if(s.publicStatus==="公開危機")return "公開危機持續中";
 if(s.careerStage!=="現役活動中")return s.careerStage+"持續中";
 if(s.risk>80 && s.trust<45)return "曝光危機持續中";
 if(s.heart>75 && s.trust>65 && s.risk<55)return "隱秘穩定持續中";
 if(s.buzz>70)return "公開壓力持續中";
 if(s.year>=2035)return "轉型與長期人生線";
 return s.relation+"持續中";
}
async function choose(k,txt){
 document.getElementById("freeAction").value="";
 const s=current.state;
 const d={A:[-1,4,-3,2,0,0,-1],B:[1,1,-1,0,0,0,1],C:[4,0,5,0,3,2,3],D:[-2,-2,-4,1,0,0,-2],E:[2,0,3,0,1,1,2]}[k]||[0,0,0,0,0,0,0];
 s.heart=clamp(s.heart+d[0]);s.trust=clamp(s.trust+d[1]);s.risk=clamp(s.risk+d[2]);s.pressure=clamp(s.pressure+d[3]);s.possess=clamp(s.possess+d[4]);s.buzz=clamp(s.buzz+d[5]);s.intimacy=clamp(s.intimacy+d[6]);
 if(s.intimacy>45 && s.adultConfirmed)s.stayRisk=clamp(s.stayRisk+2);
 if((current.snapshots||[]).length===0 || s.round%5===0) saveSnapshot("自動快照 回合"+s.round);
 s.round++; advanceTime(); s.lifeStage=lifeStage();
 let out="";
 document.body.classList.add("loading");
 try{
   if(s.mode==="ai" && localStorage.getItem("sasa_api_key")) out=await aiContinue(txt,k);
   else out=localContinue(k,txt);
 }catch(e){
   out=localContinue(k,txt)+`\n\n【系統提示】AI 續寫失敗，已改用本機劇情引擎。原因可能是 API key、模型名稱、網路或瀏覽器 CORS 限制。`;
   addMemory("AI續寫失敗",String(e.message||e),"中",["AI","錯誤"]);
 }finally{document.body.classList.remove("loading")}
 current.storyLog.push(`【你的行動】\n${txt}\n\n${out}`);
 if((s.proofLevel||0)>70 && Math.random()<0.25){addSNS("Naver","戀愛傳聞相關搜尋再次上升",["公司還不回應嗎","粉絲吵起來了","先別信"]);s.searchRank=clamp((s.searchRank||0)+8);s.pressure=clamp(s.pressure+5)}
 if(s.round%5===0)addMemory(`第${s.round}回合摘要`,`${s.year}年${s.month}月，${s.ta}線進入「${s.lifeStage}」。最近行動：${txt}`,"中",["自動摘要"]);
 if(s.round%20===0)compressLongMemory();
 if(s.round%12===0)findRecallHooks();
 if(s.round%8===0)addTimeline(s.lifeStage,`回合${s.round}，關係與事業狀態推進。曝光風險${s.risk}，信任${s.trust}。`,"中");
 saveCurrent(); renderAll(`【你的行動】\n${txt}\n\n${out}`)
}

function buildAIPrompt(playerAction=""){
 if(!current)return "";
 const s=current.state;
 const memLimit=parseInt(localStorage.getItem("sasa_memory_limit")||"12",10);
 const pinned=current.memories.filter(m=>m.pinned);
 const important=current.memories.filter(m=>m.importance==="高"&&!m.pinned);
 const recent=current.memories.filter(m=>m.importance!=="高"&&!m.pinned);
 const memories=[...pinned,...important,...recent].sort((a,b)=>memoryScore(b)-memoryScore(a)).slice(0,memLimit).map(m=>`- [${m.importance}${m.pinned?"/釘選":""}/權重${Math.round(memoryScore(m))}] ${m.year}年${m.month}月 回合${m.turn}｜${m.title}：${m.content}`).join("\n")||"無";
 const clusters=(current.memoryClusters||[]).slice(0,8).map(c=>`- ${c.tag}/權重${c.weight}：${c.summary}`).join("\n")||"無";
 const hooks=(current.recallHooks||[]).filter(h=>!h.used).slice(0,8).map(h=>`- ${h.title}/分數${h.score}：${h.reason}｜${h.content}`).join("\n")||"無";
 const npc=Object.entries(s.npcs||{}).sort((a,b)=>b[1].awareness-a[1].awareness).slice(0,14).map(([n,v])=>`- ${n}：類型${v.type||"npc"}，察覺${v.awareness}，親近${v.closeness||0}，壓力${v.pressure||0}，立場「${v.stance}」`).join("\n")||"無";
 const timeline=current.timeline.slice(0,10).map(t=>`- ${t.year}年${t.month}月 第${t.week}週｜${t.title}：${t.summary}`).join("\n")||"無";
 const sns=current.sns.slice(0,8).map(x=>`- ${x.platform}｜${x.title}：${x.comments.join(" / ")}`).join("\n")||"無";
 const recentStory=current.storyLog.slice(-4).join("\n\n---\n\n").slice(-5000);
 return `你是《💜 V5.4》的遊戲主持人。

【絕對規則】
- 這是平行世界同人向虛構。若出現現實藝人、團體或公司，只能使用公開職業背景，不得聲稱任何真實私生活。
- 所有戀愛與親密事件限定成年角色。若年齡未確認，禁止親密內容。
- 可寫成年角色之間的曖昧、親吻、留宿、事後清晨、車內張力與海外飯店氛圍，但必須淡出，不描寫露骨身體細節或具體性行為過程。
- 使用第二人稱「你」。
- 玩家只能知道自己看到、聽到、感受到的內容。
- 不直接寫 TA 真心，例如「TA其實愛你」。只能用外顯細節表現：眼神停頓、訊息撤回、語氣變淡、避開鏡頭、手指停住。
- 結局不是 END，而是目前人生狀態。即使公開、分手、結婚、家庭、退休，都可以繼續玩。
- 每回合要保留韓娛風險：公司、粉圈、成員、站姐、Bubble、Naver、Threads、Theqoo、行程、鏡頭。

【V12 AI主持人設定】
敘事風格：${AI_STYLE_PRESETS[s.aiStyle||"realistic"]||AI_STYLE_PRESETS.realistic}
公司資料：${JSON.stringify(COMPANY_DB[s.company]||{}, null, 0)}
公司狀態：${JSON.stringify(s.companyState||{}, null, 0)}
戀愛對象人格：${JSON.stringify(s.mainPersonality||{}, null, 0)}
情緒陰影：${(s.emotionalShadows||[]).slice(0,10).map(x=>`${x.title}：${x.desc}/重量${x.weight}`).join("；")||"無"}
人格語氣傾向：${typeof personalityTone==="function"?personalityTone():""}
世界時鐘：${JSON.stringify(s.worldClock||{})}
世界事件：${(s.worldEvents||[]).slice(0,10).map(e=>`${e.year}.${e.month} ${e.title}：${e.desc}`).join("；")||"無"}
自動事件：${(s.autoEvents||[]).slice(0,10).map(e=>`${e.year}.${e.month}.${e.day} ${e.title}：${e.desc}`).join("；")||"無"}
圈內關係：${(s.industryRelations||[]).slice(0,20).map(r=>`${r.name}/${r.type}/熱度${r.heat}/立場${r.stance}`).join("；")||"無"}
宇宙紀事：${(s.universeLog||[]).slice(0,10).map(l=>`${l.year}.${l.month} ${l.title}`).join("；")||"無"}
請把玩家的長期記憶、物品伏筆、NPC立場、粉圈危機與人生狀態全部當成「已發生的連續劇」，不要每回合重開。
不要只寫甜，甜後必須保留現實代價。
不要機械總結，要像互動小說主持人一樣推進。

【目前狀態】
存檔：${current.title}
回合：${s.round}
時間：${s.year}年${s.month}月 第${s.week}週
韓娛季節：${s.season}
人生狀態：${s.lifeStage}
玩家身份：${s.role}
玩家簡介：${s.playerBio||"未填"}
補充設定：${s.extraNote||"未填"}
戀愛對象：${s.ta}
團體 / 公司：${s.group} / ${s.company}
粉絲名：${s.fandom}
目前關係：${s.relation}
親密尺度：${s.matureLevel}
家庭線：${s.familyMode}
公開狀態：${s.publicStatus}
婚姻狀態：${s.marriageStatus}
家庭狀態：${s.familyStatus}
事業階段：${s.careerStage}
退休階段：${s.retirementStage}
出道年：${s.debutYear}
出道年資：${s.careerYear}
合約狀態：${s.contractStatus}
目前時代：${typeof currentEra==="function"?currentEra():""}
同居傾向：${s.cohabitation||0}
人生章節：${(s.lifeChapters||[]).slice(0,8).map(c=>`${c.year} ${c.title}`).join("；")||"無"}
長期里程碑：${(s.lifeMilestones||[]).slice(0,10).map(m=>`${m.year}.${m.month} ${m.title}:${m.desc}`).join("；")||"無"}
未來路線：${(s.futurePaths||[]).slice(0,10).map(p=>`${p.title}/${p.prob}%:${p.desc}`).join("；")||"無"}

【數值】
心動${s.heart}、信任${s.trust}、親密${s.intimacy}、曝光風險${s.risk}、事業壓力${s.pressure}、占有欲${s.possess}、輿論溫度${s.buzz}、留宿風險${s.stayRisk}、婚姻穩定${s.marriage}、家庭公開風險${s.familyRisk}

【長期記憶摘要】
${clusters}

【重要記憶】
${memories}

【可回收伏筆候選】
${hooks}

【NPC關係網】
${npc}

【人生時間線】
${timeline}

【粉圈狀態】
粉圈熱度：${s.fandomHeat||0}
X熱度：${s.xHeat||0}
Naver熱搜：${s.searchRank||0}
實錘程度：${s.proofLevel||0}
韓網反感：${s.knetzMood||0}
國際粉同情：${s.ifansMood||0}
Dispatch關注：${s.dispatchFocus||0}
粉圈分裂：${s.fandomSplit||0}
公司聲明：${s.companyStatement||"尚未回應"}
X帳號：${(s.xAccounts||[]).map(a=>`${a.handle}/${a.type}/危險${a.danger}/關注${a.focus}`).join("；")}
站姐私生：${(s.watchers||[]).map(w=>`${w.name}/${w.type}/察覺${w.awareness}/危險${w.danger}`).join("；")}
偷拍庫：${(s.photoVault||[]).slice(0,8).map(p=>`${p.year}.${p.month} ${p.source}：${p.desc}`).join("；")||"無"}
手機訊息：${(s.phoneMessages||[]).slice(-10).map(m=>`${m.sender}：${m.kind==="deleted"?"（撤回）":m.text}`).join("；")||"無"}
Kakao：${(s.kakaoChats||[]).slice(-10).map(m=>`${m.sender}:${m.text}/${m.status}`).join("；")||"無"}
Bubble2.0：${(s.bubblePosts||[]).slice(0,8).map(b=>`${b.text}/${b.secret?"暗號":"普通"}`).join("；")||"無"}
X時間軸：${(s.xTimeline||[]).slice(0,8).map(p=>`${p.author}:${p.text}`).join("；")||"無"}
Instagram限動：${(s.instagramStories||[]).slice(0,6).map(i=>`${i.author}:${i.emoji}/${i.meaning}`).join("；")||"無"}
相簿：${(s.album||[]).slice(0,8).map(a=>`${a.title}:${a.desc}/風險${a.risk}`).join("；")||"無"}
通話紀錄：${(s.callLogs||[]).slice(0,8).map(c=>`${c.name}:${c.type}`).join("；")||"無"}
行事曆：${(s.calendarEvents||[]).slice(0,8).map(c=>`${c.date}:${c.title}/危險${c.danger}`).join("；")||"無"}
Dispatch案件：${(s.dispatchCases||[]).slice(0,8).map(d=>`${d.title}:${d.desc}/狀態${d.status}`).join("；")||"無"}
戀愛紀念冊：${(s.loveArchive||[]).slice(0,8).map(l=>`${l.title}:${l.desc}`).join("；")||"無"}
Dream Inbox：${(s.dreamInbox||[]).slice(0,10).map(i=>`${i.sender}:${i.preview}/${i.type}`).join("；")||"無"}
SNS宇宙：${(s.snsUniverse||[]).slice(0,10).map(f=>`${f.platform}-${f.author}:${f.text}`).join("；")||"無"}
同居日常：${(s.cohabLife||[]).slice(0,8).map(h=>`${h.title}:${h.desc}`).join("；")||"無"}
多年回憶相簿：${(s.memoryAlbum||[]).slice(0,8).map(a=>`${a.year}-${a.title}:${a.desc}`).join("；")||"無"}
PhoneOS訊息列表：${(s.phoneThreads||[]).slice(0,10).map(t=>`${t.name}:${t.last}/未讀${t.unread}`).join("；")||"無"}
PhoneOS未讀：${(s.phoneUnread||[]).slice(0,10).map(u=>`${u.source}:${u.text}`).join("；")||"無"}
PhoneOS來電：${(s.phoneCalls||[]).slice(0,8).map(c=>`${c.name}:${c.type}/${c.note}`).join("；")||"無"}
Spotify：${(s.spotifyHistory||[]).slice(0,8).map(sp=>`${sp.artist}-${sp.title}/${sp.mood}`).join("；")||"無"}
PhoneOS相簿：${(s.phoneAlbum||[]).slice(0,8).map(a=>`${a.title}:${a.desc}`).join("；")||"無"}
PhoneOSDispatch：${(s.phoneDispatch||[]).slice(0,8).map(d=>`${d.title}:${d.desc}/危險${d.danger}`).join("；")||"無"}
黑箱快照數：${(current.snapshots||[]).length}
偷偷訂閱Bubble：${(s.secretBubbleSubs||[]).map(x=>`${x.name}/${x.group}:${x.lastUpdate}`).join("；")||"無"}
圈內八卦：${(s.gossipIntel||[]).slice(0,8).map(g=>`${g.source}-${g.title}:${g.desc}/可信${g.cred}`).join("；")||"無"}
D社交易：${(s.dispatchDeals||[]).slice(0,6).map(d=>`${d.title}:${d.desc}/成功${d.success}`).join("；")||"無"}
我的愛豆設定：${JSON.stringify(s.myIdolSetup||{}, null, 0)}
我的隊友：${(s.myMembers||[]).map(m=>`${m.name}/${m.age}/${m.role}/${m.trait}/關係${m.bond}/${m.secret}`).join("；")||"無"}
團體聊天室：${(s.idolGroupChat||[]).slice(0,10).map(c=>`${c.speaker}:${c.text}`).join("；")||"無"}
愛豆人生事件：${(s.idolEvents||[]).slice(0,10).map(e=>`${e.title}:${e.desc}`).join("；")||"無"}
物品伏筆：${(s.items||[]).slice(0,12).map(i=>`${i.name}：${i.desc}，風險${i.risk}，${i.used?"已回收":"未回收"}`).join("；")||"無"}

【粉圈動態】
${sns}

【最近劇情】
${recentStory}

【玩家本回合行動】
${playerAction}

請嚴格輸出以下格式：
【劇情正文】
第二人稱敘事，包含 TA 或 NPC 對話。至少包含一個韓娛危險物：Bubble、X、站姐、Naver、經紀人、成員、後台鏡頭、同款、Dispatch、手機通知。

【手機 / 粉圈插入】
可選：聊天、Bubble、X貼文、韓網討論、群聊、公司通知。沒有也要寫「無新增」。

【當前風險變化】
用自然語言說明哪些數值可能上升或下降，不要輸出 JSON。

【可延續伏筆】
列出 1-3 個可之後回收的記憶點。

【下一步可選行動】
列出 A-D 四個行動，E為自由行動。

【目前人生狀態】
一句話。`;
}
async function aiContinue(playerAction,key){
 const apiKey=localStorage.getItem("sasa_api_key");
 if(!apiKey)throw new Error("missing api key");
 const model=localStorage.getItem("sasa_model")||"gpt-4.1-mini";
 const temperature=parseFloat(localStorage.getItem("sasa_ai_temp")||"0.9");
 const prompt=buildAIPrompt(playerAction);
 const res=await fetch("https://api.openai.com/v1/chat/completions",{
   method:"POST",
   headers:{"Content-Type":"application/json","Authorization":"Bearer "+apiKey},
   body:JSON.stringify({model,temperature,messages:[
    {role:"system",content:"你是互動文字遊戲主持人。嚴格遵守安全規則與平行世界虛構聲明。輸出繁體中文。"},
    {role:"user",content:prompt}
   ]})
 });
 if(!res.ok)throw new Error(await res.text());
 const data=await res.json();
 const content=data.choices?.[0]?.message?.content||"";
 if(content){
  addMemory("AI續寫回合",`AI 根據本回合行動「${playerAction}」生成劇情。`,"低",["AI"]);
  const hooks=(content.match(/【可延續伏筆】([\s\S]*?)(【|$)/)||[])[1];
  if(hooks)addMemory("AI可延續伏筆",hooks.trim().slice(0,800),"中",["AI","伏筆"]);
 }
 return content;
}
function toggleAIMode(){
 if(!current)return;
 current.state.mode=current.state.mode==="ai"?"local":"ai";
 saveCurrent(); renderAIPrompt(); renderStatus(); alert("已切換為："+(current.state.mode==="ai"?"AI 自動續寫":"本機劇情引擎"));
}
function renderAIPrompt(){
 if(!current)return;
 const prompt=buildAIPrompt("玩家下一步行動會出現在這裡。");
 const box=document.getElementById("aiPromptPreview");
 const info=document.getElementById("aiModeInfo");
 if(box)box.textContent=prompt;
 if(info)info.innerHTML=`<span class="pill">目前模式：${current.state.mode==="ai"?"AI 自動續寫":"本機劇情引擎"}</span><span class="pill">AI風格：${current.state.aiStyle||"realistic"}</span><span class="pill">API Key：${localStorage.getItem("sasa_api_key")?"已設定":"未設定"}</span><span class="pill">模型：${localStorage.getItem("sasa_model")||"gpt-4.1-mini"}</span>`;
}
function copyAIPrompt(){
 const txt=document.getElementById("aiPromptPreview")?.textContent||buildAIPrompt("");
 navigator.clipboard?.writeText(txt).then(()=>alert("已複製提示包")).catch(()=>alert("無法自動複製，可手動選取文字。"));
}


async function callAIWithPrompt(prompt){
 const apiKey=localStorage.getItem("sasa_api_key");
 if(!apiKey)throw new Error("尚未設定 API Key");
 const model=localStorage.getItem("sasa_model")||"gpt-4.1-mini";
 const temperature=parseFloat(localStorage.getItem("sasa_ai_temp")||"0.9");
 const res=await fetch("https://api.openai.com/v1/chat/completions",{
   method:"POST",
   headers:{"Content-Type":"application/json","Authorization":"Bearer "+apiKey},
   body:JSON.stringify({model,temperature,messages:[
    {role:"system",content:"你是繁體中文互動文字遊戲主持人。平行世界虛構，現實藝人只可使用公開職業背景。成年親密內容只能淡出。"},
    {role:"user",content:prompt}
   ]})
 });
 if(!res.ok)throw new Error(await res.text());
 const data=await res.json();
 return data.choices?.[0]?.message?.content||"";
}
async function aiGenerateOpening(){
 const out=document.getElementById("aiToolOutput"); if(out)out.textContent="AI 生成中……";
 try{
  const text=await callAIWithPrompt(buildAIPrompt("請根據目前存檔，重寫一段下一回合開場。不要改變既有設定。"));
  if(out)out.textContent=text;
 }catch(e){if(out)out.textContent="AI 失敗："+(e.message||e)}
}
async function aiSuggestActions(){
 const out=document.getElementById("aiToolOutput"); if(out)out.textContent="AI 生成中……";
 try{
  const text=await callAIWithPrompt(buildAIPrompt("請只根據目前局勢，生成 A-D 四個行動選項與一個自由行動提示。"));
  if(out)out.textContent=text;
 }catch(e){if(out)out.textContent="AI 失敗："+(e.message||e)}
}
async function aiAnalyzeSave(){
 const out=document.getElementById("aiToolOutput"); if(out)out.textContent="AI 分析中……";
 try{
  const text=await callAIWithPrompt(buildAIPrompt("請分析目前存檔：最危險的三條線、最值得回收的三個伏筆、下一個大事件建議。"));
  if(out)out.textContent=text;
 }catch(e){if(out)out.textContent="AI 失敗："+(e.message||e)}
}

function localContinue(k,txt){
 const s=current.state;
 const event=rand(["Bubble暗號","站姐鏡頭","粉圈搬運","成員察覺","Challenge合作","海外飯店房間","車內親密談話","同居痕跡","公司視線","頒獎禮同場"]);
 const npc=rand(Object.keys(s.npcs));
 const nv=s.npcs[npc]||{};
 const helper=Object.entries(s.npcs).find(([n,v])=>v.stance==="幫忙隱瞞"&&v.awareness>35);
 const blocker=Object.entries(s.npcs).find(([n,v])=>v.stance==="公司優先"&&v.awareness>55);
 let body={"A":`${s.ta}的視線停了半秒，沒有反駁，只把手機螢幕扣在桌面上。\n\n「知道了。」TA說。\n\n語氣很穩，卻比剛才更低。`,
 "B":`你把表情收得很乾淨。${s.ta}也配合得像什麼都沒發生。\n\n只是擦肩而過時，TA低聲說：「你真的很會裝沒事。」`,
 "C":`你問出口後，周圍像忽然安靜了一秒。\n\n${s.ta}沒有正面回答，只整理了一下耳返。\n\n「這裡不是能問這種話的地方。」`,
 "D":`你往後退了一步。\n\n${s.ta}的手停在半空，很快收回去。工作人員進門時，你們之間的距離安全得幾乎陌生。`,
 "E":`你照自己的方式處理了這個瞬間。\n\n${s.ta}看了你一眼，像是在判斷你留下的是靠近，還是警告。`}[k]||"";
 let extra="";
 if(event==="Bubble暗號"){extra=`\n\n【Bubble】\n${s.ta}：今天也辛苦了。\n\n粉絲以為是普通安慰。只有你知道，這句話接的是你剛才說過的那一句。`;addSNS("Bubble",`${s.ta} 更新疑似暗號`,["好像是福利？","不要過度解讀","但今天語氣好溫柔"])}
 if(event==="粉圈搬運"){extra=`\n\n【Threads / Theqoo】\n標題：「${s.group} 最近狀態是不是有點奇怪？」\n- ㅋㅋ想太多了吧\n- ${s.fandom} 先別急\n- 有人扒到同款了嗎？\n- 沒實錘不要亂傳`;s.buzz=clamp(s.buzz+6);addSNS("Threads",`${s.group} 狀態討論`,["想太多","但真的怪","別造謠"])}
 if(event==="成員察覺" && npc){s.npcs[npc].awareness=clamp(s.npcs[npc].awareness+12);extra=`\n\n${npc}經過時停了一下，視線在你和TA之間繞了一圈。\n\n「你們剛剛在聊什麼？」\n\n語氣像玩笑，但你知道，這不是完全沒看見。`;addMemory("成員察覺",`${npc} 對你和 ${s.ta} 的異常距離產生懷疑。察覺度上升到 ${s.npcs[npc].awareness}。`,"高",["NPC","察覺"])}
 if(event==="Challenge合作"){extra=`\n\n工作人員通知，等一下要和 ${npc||rand(s.rivals||["RIIZE"])} 拍 Challenge。公開鏡頭會很近，你和TA卻必須比任何人都像陌生人。`;s.risk=clamp(s.risk+4)}
 if(event==="海外飯店房間" && s.adultConfirmed && s.intimacy>35){extra=`\n\n【成年戀人事件｜海外飯店】\n海外行程的飯店樓層安靜得過分。你們不能一起進電梯，不能同時刷卡，甚至不能在走廊多停一秒。\n\n房門合上的瞬間，TA終於卸下鏡頭前的表情，額頭抵在你肩上。\n\n「今天真的很累。」\n\n你沒有追問，只是抬手抱住TA。\n\n夜色從窗簾縫裡漏進來，親密被留在沒有行程表的幾個小時裡。`;s.stayRisk=clamp(s.stayRisk+10);addMemory("海外飯店夜晚",`你和 ${s.ta} 在海外行程飯店裡短暫留宿。這是成年戀人的秘密記憶，也提高了留宿風險。`,"高",["親密","海外","留宿"])}
 if(event==="車內親密談話" && s.intimacy>25){extra=`\n\n保姆車停在地下停車場的陰影裡。車窗貼膜把外面的燈切成模糊的線。\n\n${s.ta}坐得離你很近，近到說話時不用提高聲音。\n\n「下次不要用那種表情看別人。」\n\n像玩笑，卻讓空氣變得很慢。`;s.possess=clamp(s.possess+5)}
 if(event==="同居痕跡" && s.intimacy>45){extra=`\n\nTA的包裡掉出一個你很熟悉的小東西。\n\n不是實錘，卻足夠讓熟人多看一眼。\n\n工作人員彎腰撿起來時，你和TA同時安靜。\n\nTA先開口：「我的。」`;s.risk=clamp(s.risk+8);addMemory("生活痕跡",`${s.ta} 包裡出現你的物品，TA替你擋下。`,"高",["物品","風險"])}
 if(event==="公司視線"){extra=`\n\n經紀人從門口看過來，沒有說什麼，只把你的名字從下一段動線表旁邊劃掉。`;s.pressure=clamp(s.pressure+6);s.risk=clamp(s.risk+3)}
 if(event==="頒獎禮同場"){extra=`\n\n紅毯順序表亮在螢幕上：${s.group}、${npc||"其他團體"}、${rand(["TXT","RIIZE","IVE","ENHYPEN"])}。\n\n今晚每一個眼神都可能被剪成慢動作。`;s.buzz=clamp(s.buzz+3)}
 if(blocker && Math.random()<0.35){extra+=`\n\n【NPC干預】\n${blocker[0]}臨時改了動線，讓你和${s.ta}原本可能獨處的時間消失。\n\n這不是明說的警告，但已經足夠清楚。`;s.pressure=clamp(s.pressure+5);s.risk=clamp(s.risk+3)}
 if(helper && Math.random()<0.3){extra+=`\n\n【NPC掩護】\n${helper[0]}像是剛好路過，替你們接走了工作人員的注意力。\n\n那一秒，你知道有人選擇了假裝沒看見。`;s.trust=clamp(s.trust+3);s.risk=clamp(s.risk-2)}
return `【劇情正文】\n\n${body}${extra}\n\n【目前人生狀態】\n${s.lifeStage}\n\n【當前風險變化】\n心動 ${s.heart}｜信任 ${s.trust}｜親密度 ${s.intimacy}｜曝光風險 ${s.risk}｜事業壓力 ${s.pressure}｜輿論溫度 ${s.buzz}`
}

function addNotification(title,body,type="normal"){
 const s=current.state;
 s.notifications.unshift({id:uid(),year:s.year,month:s.month,week:s.week,title,body,type});
 s.notifications=s.notifications.slice(0,50);
}
function addPhoneMessage(sender,text,kind="bubble"){
 const s=current.state;
 s.phoneMessages.push({id:uid(),year:s.year,month:s.month,week:s.week,sender,text,kind});
 s.phoneMessages=s.phoneMessages.slice(-80);
}
function triggerPhone(type){
 if(!current)return;
 const s=current.state;
 let story="";
 if(type==="bubble"){
  const msg=rand(["今天也辛苦了。","不要太晚睡。","天氣變冷了。","有些話現在不能說。"]);
  addPhoneMessage(s.ta,msg,"bubble");
  addBubblePost(msg,true);
  addNotification("Bubble",`${s.ta}：${msg}`,"bubble");
  s.fandomHeat=clamp((s.fandomHeat||0)+4);
  story=`【手機事件｜Bubble】\n\n通知跳出來時，你正在看粉圈討論。\n\n${s.ta}：${msg}\n\n粉絲會把它當成福利。\n\n你卻知道，這句話的重量不只如此。`;
 }
 if(type==="dm"){
  addPhoneMessage("你","你現在方便說話嗎？","me");
  addPhoneMessage(s.ta,"五分鐘後。不要打電話。","dm");
  addKakao("你","你現在方便說話嗎？","已讀");
  addKakao(s.ta,"五分鐘後。不要打電話。","未讀");
  story=`【手機事件｜私人訊息】\n\n你傳出訊息後，對方顯示輸入中很久。\n\n最後只回：\n「五分鐘後。不要打電話。」\n\n這句話讓你意識到，旁邊可能有人。`;
  s.risk=clamp(s.risk+2);
 }
 if(type==="missed"){
  addNotification("未接來電",`${s.ta} 來電 3 通`,"call");
  addCall(s.ta,"未接來電 3 通");
  story=`【手機事件｜未接來電】\n\n螢幕亮了三次。\n\n全都是 ${s.ta}。\n\n但你不能在這個地方接起來。`;
  s.heart=clamp(s.heart+2); s.risk=clamp(s.risk+3);
 }
 if(type==="delete"){
  addPhoneMessage(s.ta,"剛剛那句當我沒說。","deleted");
  addKakao(s.ta,"（訊息已撤回）","撤回");
  story=`【手機事件｜訊息撤回】\n\n你只來得及看到半句話。\n\n下一秒，訊息被撤回。\n\n聊天框變得很安靜，安靜得像什麼都沒發生。`;
  addMemory("被撤回的訊息",`${s.ta} 曾撤回一則可能很重要的訊息。`, "高", ["手機","伏筆"]);
 }
 s.round++; advanceTime(); s.lifeStage=lifeStage(); current.storyLog.push(story); saveCurrent(); renderAll(story);
}
function manualAddItem(){
 if(!current)return;
 const name=document.getElementById("itemName").value.trim();
 const desc=document.getElementById("itemDesc").value.trim();
 if(!name||!desc)return alert("請輸入物品名稱和說明");
 const s=current.state;
 s.items.unshift({id:uid(),name,desc,owner:"玩家/TA",risk:10,emotional:50,firstSeen:`${s.year}年${s.month}月`,used:false});
 addMemory("物品伏筆",`${name}：${desc}`,"高",["物品"]);
 document.getElementById("itemName").value=""; document.getElementById("itemDesc").value="";
 saveCurrent(); renderAll(`【物品已加入】\n\n${name} 已加入伏筆庫。`);
}
function triggerItemEvent(){
 if(!current)return;
 const s=current.state;
 if(!s.items.length){
  s.items.push({id:uid(),name:"銀色手鍊",desc:"你送給TA的第一個不能公開的禮物。",owner:s.ta,risk:18,emotional:70,firstSeen:`${s.year}年${s.month}月`,used:false});
 }
 const item=rand(s.items);
 item.used=true; item.risk=clamp((item.risk||0)+10);
 s.risk=clamp(s.risk+Math.ceil(item.risk/5));
 s.proofLevel=clamp((s.proofLevel||0)+Math.ceil(item.risk/4));
 const story=`【物品伏筆回收｜${item.name}】\n\n${item.desc}\n\n原本只是你們之間的小東西，卻在今天重新出現。\n\n工作人員多看了一眼。\n\n粉圈如果截到，這會變成新的時間線證據。`;
 addMemory("物品伏筆回收",`${item.name} 被劇情回收，風險上升。`, "高", ["物品","回收"]);
 current.storyLog.push(story); s.round++; advanceTime(); s.lifeStage=lifeStage(); saveCurrent(); renderAll(story);
}

function addKakao(sender,text,status="未讀"){
 const s=current.state;
 s.kakaoChats.push({id:uid(),year:s.year,month:s.month,day:s.worldClock?.day||1,hour:s.worldClock?.hour||0,sender,text,status});
 s.kakaoChats=s.kakaoChats.slice(-100);
}
function addBubblePost(text,secret=false){
 const s=current.state;
 const reactions=secret?["這句是不是有故事？","不要什麼都解讀","感覺今天心情很柔軟","誰懂啊這像暗號"]:["好好休息！","今天也辛苦了","期待舞台","寶寶多吃飯"];
 s.bubblePosts.unshift({id:uid(),year:s.year,month:s.month,day:s.worldClock?.day||1,text,secret,reactions});
 s.bubblePosts=s.bubblePosts.slice(0,80);
}
function addXPost(author,text,heat=10){
 const s=current.state;
 s.xTimeline.unshift({id:uid(),year:s.year,month:s.month,author,text,heat});
 s.xTimeline=s.xTimeline.slice(0,100);
 s.xHeat=clamp((s.xHeat||0)+Math.ceil(heat/3));
}
function addIGStory(author,emoji,meaning,risk=5){
 const s=current.state;
 s.instagramStories.unshift({id:uid(),year:s.year,month:s.month,author,emoji,meaning,risk});
 s.instagramStories=s.instagramStories.slice(0,60);
 s.risk=clamp(s.risk+Math.ceil(risk/3));
}
function addCall(name,type="未接來電"){
 const s=current.state;
 s.callLogs.unshift({id:uid(),year:s.year,month:s.month,day:s.worldClock?.day||1,hour:s.worldClock?.hour||0,name,type});
 s.callLogs=s.callLogs.slice(0,80);
}
function addAlbum(title,desc,risk=5,privateFlag=true){
 const s=current.state;
 s.album.unshift({id:uid(),year:s.year,month:s.month,title,desc,risk,private:privateFlag});
 s.album=s.album.slice(0,80);
}
function addCalendar(title,date,desc,danger=0){
 const s=current.state;
 s.calendarEvents.unshift({id:uid(),year:s.year,month:s.month,title,date,desc,danger});
 s.calendarEvents=s.calendarEvents.slice(0,80);
}
function addDispatchCase(title,desc,status="未公開",danger=20){
 const s=current.state;
 s.dispatchCases.unshift({id:uid(),year:s.year,month:s.month,title,desc,status,danger});
 s.dispatchCases=s.dispatchCases.slice(0,60);
 s.dispatchFocus=clamp((s.dispatchFocus||0)+Math.ceil(danger/3));
}
function addLoveArchive(title,desc,type="紀念"){
 const s=current.state;
 s.loveArchive.unshift({id:uid(),year:s.year,month:s.month,title,desc,type});
 s.loveArchive=s.loveArchive.slice(0,100);
 addMemory("戀愛紀念冊",`${title}：${desc}`,"中",["紀念冊",type]);
}
function triggerPhoneUniverse(type){
 if(!current)return;
 const s=current.state;
 let story="";
 if(type==="x"){
  const posts=[
   [`@kpopissue_now`,`有人整理了 ${s.ta} 最近三次Bubble時間，真的只是巧合嗎？`,18],
   [`@${String(s.group).toLowerCase()}_global`,`Please stop spreading unverified rumors.`,10],
   [`@datingtimeline`,`同款不是重點，重點是時間線。`,22],
   [`@dailyidol`,`今天 ${s.group} 打歌預錄飯拍更新。`,8]
  ];
  const p=rand(posts); addXPost(p[0],p[1],p[2]);
  story=`【手機宇宙｜X時間軸】\n\n${p[0]}：\n${p[1]}\n\n你只是滑了一下，卻看見世界正在替你們整理時間線。`;
 }
 if(type==="ig"){
  const emoji=rand(["🌙","☔","🎧","🖤","銀色濾鏡","空白黑底"]);
  addIGStory(s.ta,emoji,`粉絲開始猜這則限動是不是和最近的Bubble有關`,10);
  story=`【手機宇宙｜Instagram限動】\n\n${s.ta} 發了一則限動：${emoji}\n\n粉絲說只是普通心情。\n\n可你記得，昨天你傳給TA的照片裡，也有同樣的東西。`;
 }
 if(type==="album"){
  const title=rand(["模糊自拍","後台走廊","一起看的夜景","飯店窗邊","未公開合照邊角"]);
  addAlbum(title,`這張照片不能公開，但它證明那一天你們真的在同一個時間裡。`,rand([8,12,18,25]),true);
  story=`【手機宇宙｜相簿】\n\n你在相簿裡新增了「${title}」。\n\n它看起來很普通，卻不能出現在任何雲端同步、任何朋友面前、任何粉圈截圖裡。`;
 }
 if(type==="calendar"){
  const title=rand(["回歸預錄","海外巡演出發","品牌晚宴","MAMA彩排","紀念日"]);
  addCalendar(title,`${s.year}/${s.month+1}/??`,`這天可能讓你和 ${s.ta} 的動線重疊。`,rand([5,12,20]));
  story=`【手機宇宙｜行事曆】\n\n行事曆多了一個標記：${title}。\n\n你看著那個日期，知道那一天不是普通行程。\n\n是機會，也是風險。`;
 }
 if(type==="dispatch"){
  const title=`案件${String((s.dispatchCases||[]).length+1).padStart(3,"0")}`;
  addDispatchCase(title,`模糊背影、飯店出入時間與機場動線被放進同一個資料夾。`, "未公開", rand([22,34,48]));
  story=`【手機宇宙｜Dispatch案件夾】\n\n${title} 被建立。\n\n你沒有看見那個資料夾。\n\n但系統記錄裡，它已經存在。`;
 }
 if(type==="memory"){
  const title=rand(["第一次牽手","第一次冷戰","第一次被拍到邊角","第一次海外留宿","第一次說不要走"]);
  addLoveArchive(title,`這件事被寫進你們的戀愛紀念冊。未來可能被AI回收。`, "關係里程碑");
  story=`【手機宇宙｜戀愛紀念冊】\n\n${title}。\n\n當下你以為只是一天。\n\n可很久以後，它會變成你們回頭時無法避開的頁面。`;
 }
 s.round++; updateWorldClock("hour"); s.lifeStage=lifeStage(); current.storyLog.push(story); saveCurrent(); renderAll(story);
}


function showPushToast(title,body){
 const el=document.getElementById("pushToast");
 if(!el)return;
 el.innerHTML=`<b>${title}</b><br><span>${body}</span>`;
 el.classList.add("show");
 setTimeout(()=>el.classList.remove("show"),3200);
}
function addDreamInbox(sender,preview,type="chat",unread=true){
 const s=current.state;
 s.dreamInbox.unshift({id:uid(),year:s.year,month:s.month,day:s.worldClock?.day||1,hour:s.worldClock?.hour||0,sender,preview,type,unread});
 s.dreamInbox=s.dreamInbox.slice(0,80);
}
function addSNSUniverse(platform,author,text,impact=10){
 const s=current.state;
 s.snsUniverse.unshift({id:uid(),year:s.year,month:s.month,platform,author,text,impact});
 s.snsUniverse=s.snsUniverse.slice(0,100);
 if(platform==="X")s.xHeat=clamp((s.xHeat||0)+Math.ceil(impact/3));
 if(platform==="Bubble")s.fandomHeat=clamp((s.fandomHeat||0)+Math.ceil(impact/3));
}
function addCohabLife(title,desc,warmth=10,risk=3){
 const s=current.state;
 s.cohabLife.unshift({id:uid(),year:s.year,month:s.month,title,desc,warmth,risk});
 s.cohabLife=s.cohabLife.slice(0,80);
 s.intimacy=clamp((s.intimacy||0)+Math.ceil(warmth/3));
 s.risk=clamp((s.risk||0)+Math.ceil(risk/3));
}
function addMemoryAlbum(title,desc,year=None){
 const s=current.state;
 s.memoryAlbum.unshift({id:uid(),year:year||s.year,month:s.month,title,desc});
 s.memoryAlbum=s.memoryAlbum.slice(0,80);
 addMemory("多年回憶相簿",`${title}：${desc}`,"中",["相簿","長期人生"]);
}
function dreamBubblePush(){
 if(!current)return;
 const s=current.state;
 const pool=[
  ["KakaoTalk",`${s.ta}：睡了嗎？`,"chat"],
  ["Bubble",`${s.ta} 更新：今天也辛苦了。`,"bubble"],
  ["未接來電",`${s.ta} 來電 2 通`,"call"],
  ["X 熱搜",`#${String(s.group).replace(/\s/g,"")} #Bubble 暗號 上升中`,"x"],
  ["Instagram",`${s.ta} 發了限動：🌙`,"ig"],
  ["行事曆提醒",`明天：${s.group} 預錄 / 動線重疊風險`,"calendar"]
 ];
 const p=rand(pool);
 addDreamInbox(p[0],p[1],p[2],true);
 addNotification(p[0],p[1],p[2]);
 if(p[2]==="chat")addKakao(s.ta,"睡了嗎？","未讀");
 if(p[2]==="bubble")addBubblePost("今天也辛苦了。",true);
 if(p[2]==="call")addCall(s.ta,"未接來電 2 通");
 if(p[2]==="x")addXPost("@kpopissue_now",`#${s.group} #Bubble 暗號 上升中`,18);
 if(p[2]==="ig")addIGStory(s.ta,"🌙","粉絲開始猜是不是暗號",10);
 showPushToast(p[0],p[1]);
 s.round++; updateWorldClock("hour"); s.lifeStage=lifeStage();
 const story=`【Dream Bubble｜手機推送】\n\n${p[0]} 跳出通知：\n${p[1]}\n\n你還沒有做出選擇，世界已經先敲了敲你的螢幕。`;
 current.storyLog.push(story); saveCurrent(); renderAll(story);
}
function triggerDreamLife(type){
 if(!current)return;
 const s=current.state;
 let story="";
 if(type==="home"){
  const item=rand([
   ["玄關燈",`${s.ta} 比你早回來，玄關留了一盞燈。鞋櫃裡多了一雙不該被外人看見的拖鞋。`],
   ["冰箱便利貼",`冰箱上貼著一張便利貼：「我凌晨回來，別等。」字很醜，但你看了很久。`],
   ["沙發毯",`沙發上的毯子還有TA身上的香水味。你忽然意識到，同居不是事件，是日常反覆留下證據。`],
   ["備用牙刷",`洗手台旁邊多了一支備用牙刷。很小，很危險，也很像生活。`]
  ]);
  addCohabLife(item[0],item[1],12,5);
  addDreamInbox("家",item[1],"home",false);
  story=`【Dream Bubble｜同居日常】\n\n${item[1]}\n\n戀愛不是只有舞台後台和深夜訊息，也有這些藏不住的生活痕跡。`;
 }
 if(type==="album"){
  const item=rand([
   ["第一次一起看的夜景","照片沒有拍到臉，只拍到窗戶倒影裡靠得很近的兩個影子。"],
   ["退場後的手腕","照片模糊到幾乎不能用，卻記下了TA在人群散開前短暫抓住你的手腕。"],
   ["多年後的同一條街","你們隔了很多年又走過那條街，這次不用分開走。"],
   ["沒有公開的生日蛋糕","蛋糕上沒有名字，只有一顆紫色愛心。"]
  ]);
  addMemoryAlbum(item[0],item[1]);
  addLoveArchive(item[0],item[1],"多年相簿");
  story=`【Dream Bubble｜多年回憶相簿】\n\n${item[0]}\n\n${item[1]}\n\n這些照片不一定能公開，但它們會替你們記得。`;
 }
 if(type==="sns"){
  const chain=rand([
   ["Bubble","粉絲A","他今天那句『不要淋雨』也太像對某個人說的吧。"],
   ["X","搬運帳","同款雨傘 + 同天行程空白，先存。"],
   ["Instagram","路人","這張限動背景是不是某飯店？"],
   ["Weverse","理智粉","拜託不要什麼都戀愛腦解讀。"]
  ]);
  addSNSUniverse(chain[0],chain[1],chain[2],18);
  addDreamInbox(chain[0],`${chain[1]}：${chain[2]}`,"sns",true);
  story=`【Dream Bubble｜SNS連鎖反應】\n\n${chain[0]} 上出現新的動態。\n\n${chain[1]}：${chain[2]}\n\n一句話不一定能引爆什麼，但它會變成下一個人截圖的理由。`;
 }
 s.round++; updateWorldClock("hour"); s.lifeStage=lifeStage(); current.storyLog.push(story); saveCurrent(); renderAll(story);
}


function addPhoneThread(name,last,type="chat",unread=0){
 const s=current.state;
 let t=(s.phoneThreads||[]).find(x=>x.name===name && x.type===type);
 if(!t){t={id:uid(),name,type,last:"",unread:0,updatedAt:""};s.phoneThreads.unshift(t);}
 t.last=last;t.unread=clamp((t.unread||0)+unread,0,99);t.updatedAt=`${s.year}.${s.month}.${s.worldClock?.day||1} ${String(s.worldClock?.hour||0).padStart(2,"0")}:00`;
 s.phoneThreads=s.phoneThreads.slice(0,80);
}
function addPhoneUnread(source,text,level=1){
 const s=current.state;
 s.phoneUnread.unshift({id:uid(),year:s.year,month:s.month,source,text,level});
 s.phoneUnread=s.phoneUnread.slice(0,80);
 addDreamInbox(source,text,"unread",true);
}
function addPhoneCall(name,type="未接來電",note=""){
 const s=current.state;
 s.phoneCalls.unshift({id:uid(),year:s.year,month:s.month,day:s.worldClock?.day||1,hour:s.worldClock?.hour||0,name,type,note});
 s.phoneCalls=s.phoneCalls.slice(0,80);
 addCall(name,type);
}
function addPhoneSNS(platform,author,text,heat=10){
 const s=current.state;
 s.phoneSNS.unshift({id:uid(),year:s.year,month:s.month,platform,author,text,heat});
 s.phoneSNS=s.phoneSNS.slice(0,100);
 addSNSUniverse(platform,author,text,heat);
}
function addSpotifyTrack(title,artist,mood="深夜"){
 const s=current.state;
 s.spotifyHistory.unshift({id:uid(),year:s.year,month:s.month,title,artist,mood});
 s.spotifyHistory=s.spotifyHistory.slice(0,80);
 addMemory("Spotify播放紀錄",`${artist} - ${title}｜${mood}`,"低",["手機","Spotify"]);
}
function addPhoneAlbum(title,desc,tag="私人"){
 const s=current.state;
 s.phoneAlbum.unshift({id:uid(),year:s.year,month:s.month,title,desc,tag});
 s.phoneAlbum=s.phoneAlbum.slice(0,100);
 addAlbum(title,desc,8,true);
}
function addPhoneDispatch(title,desc,danger=20,status="追蹤中"){
 const s=current.state;
 s.phoneDispatch.unshift({id:uid(),year:s.year,month:s.month,title,desc,danger,status});
 s.phoneDispatch=s.phoneDispatch.slice(0,80);
 addDispatchCase(title,desc,status,danger);
}
function phoneOSGenerate(type){
 if(!current)return;
 const s=current.state;
 let story="";
 if(type==="message"){
  const pool=[
   [s.ta,"剛剛想起你。","chat",1],
   ["經紀人","明天預錄動線有改，所有人注意。","work",0],
   [rand(Object.keys(s.npcs||{})||["成員"]),"晚上聚餐嗎？","group",1],
   ["宿舍群","誰又把客廳燈開著睡？","group",0]
  ];
  const p=rand(pool); addPhoneThread(p[0],p[1],p[2],p[3]); addKakao(p[0],p[1],p[3]?"未讀":"已讀");
  story=`【Phone OS｜訊息列表】\n\n${p[0]}：${p[1]}\n\n它不是一段劇情提示，而是你手機裡新跳出的生活痕跡。`;
 }
 if(type==="unread"){
  const p=rand([
   ["💜",`${s.ta} 傳來一則未讀訊息。`],
   ["Bubble",`${s.ta} 發了只有你看得懂的句子。`],
   ["工作群","新行程通知：後台動線更改。"],
   ["X",`有人開始整理 ${s.ta} 的時間線。`]
  ]);
  addPhoneUnread(p[0],p[1],rand([1,2,3])); showPushToast(p[0],p[1]);
  story=`【Phone OS｜未讀訊息】\n\n${p[0]}：${p[1]}\n\n你可以不點開，但未讀會一直待在那裡。`;
 }
 if(type==="call"){
  const p=rand([[s.ta,"未接來電","凌晨打來又掛掉"],["經紀人","來電","工作確認"],[rand(Object.keys(s.npcs||{})||["成員"]),"未接來電","像是有事想問"]]);
  addPhoneCall(p[0],p[1],p[2]); addPhoneThread(p[0],`${p[1]}｜${p[2]}`,"call",1);
  story=`【Phone OS｜來電】\n\n${p[0]}｜${p[1]}\n\n備註：${p[2]}\n\n手機震動停下後，房間反而更安靜。`;
 }
 if(type==="sns"){
  const p=rand([
   ["X","@kpopissue_now",`#${s.group} #Bubble 暗號 討論升溫`,18],
   ["Instagram",s.ta,"🌙",12],
   ["Weverse","粉絲",`今天那句話不要過度解讀啦`,8],
   ["Bubble","粉絲聊天室","他是不是心情很好？",10]
  ]);
  addPhoneSNS(p[0],p[1],p[2],p[3]);
  story=`【Phone OS｜SNS】\n\n${p[0]}｜${p[1]}：${p[2]}\n\n粉圈像一片水面，任何小東西掉進去都會有波紋。`;
 }
 if(type==="spotify"){
  const p=rand([
   ["Late Night Talking","Harry Styles","凌晨想念"],
   ["Ditto","NewJeans","冬天回憶"],
   ["Love wins all","IU","公開前夜"],
   ["To. X","TAEYEON","冷戰"],
   ["Get A Guitar","RIIZE","回到起點"]
  ]);
  addSpotifyTrack(p[0],p[1],p[2]);
  story=`【Phone OS｜Spotify】\n\n最近播放：${p[1]} - ${p[0]}\n\n心情標籤：${p[2]}\n\n有時候一首歌比一句訊息更像坦白。`;
 }
 if(type==="album"){
  const p=rand([
   ["鎖定相簿","一張只拍到手和袖口的照片。","私人"],
   ["最近刪除","你差點刪掉的那張飯店窗景。","危險"],
   ["收藏","演唱會後台一角，燈光很暗。","回憶"],
   ["生活","客廳桌上的兩杯水。","同居"]
  ]);
  addPhoneAlbum(p[0],p[1],p[2]);
  story=`【Phone OS｜相簿】\n\n${p[0]}：${p[1]}\n\n照片不說話，但它比訊息更難否認。`;
 }
 if(type==="dispatch"){
  const p=rand([
   ["線索牆更新","機場時間線與飯店出入紀錄被放到同一個案件夾。",34,"追蹤中"],
   ["匿名投稿","模糊背影被投稿給議題帳。",22,"待確認"],
   ["爆料預告","D社開始預熱年末爆料。",46,"高風險"],
   ["公司公關監控","公司開始追蹤某個搬運帳。",28,"內部處理"]
  ]);
  addPhoneDispatch(p[0],p[1],p[2],p[3]);
  story=`【Phone OS｜Dispatch】\n\n${p[0]}\n\n${p[1]}\n\n狀態：${p[3]}\n\n最可怕的不是爆出來，而是不知道它什麼時候爆。`;
 }
 s.round++; updateWorldClock("hour"); s.lifeStage=lifeStage(); current.storyLog.push(story); saveCurrent(); renderAll(story);
}

function renderPhone(){
 const el=document.getElementById("phoneView"); if(!el||!current)return;
 const s=current.state;
 const msgs=s.phoneMessages||[], notifs=s.notifications||[];
 const kakao=s.kakaoChats||[], bubbles=s.bubblePosts||[], x=s.xTimeline||[], ig=s.instagramStories||[], calls=s.callLogs||[], cal=s.calendarEvents||[], album=s.album||[], dc=s.dispatchCases||[], love=s.loveArchive||[];
 el.innerHTML=`<div class="phone"><div class="phone-screen">
 <div class="phone-os-shell">
 <div class="phone-statusbar"><span>8:20</span><span>💜 Phone OS</span><span>100%</span></div>
 <div class="phone-mode-switch">
  <button class="secondary" onclick="phoneOSGenerate('message')">訊息</button>
  <button class="secondary" onclick="phoneOSGenerate('unread')">未讀</button>
  <button class="secondary" onclick="phoneOSGenerate('call')">來電</button>
  <button class="secondary" onclick="phoneOSGenerate('sns')">SNS</button>
  <button class="secondary" onclick="phoneOSGenerate('spotify')">Spotify</button>
  <button class="secondary" onclick="phoneOSGenerate('album')">相簿</button>
  <button class="secondary" onclick="phoneOSGenerate('dispatch')">Dispatch</button>
 </div>
 <div class="phone-os-grid">
  <div class="phone-os-app primary"><span class="emoji">💬</span>訊息</div>
  <div class="phone-os-app"><span class="emoji">💜</span>未讀</div>
  <div class="phone-os-app"><span class="emoji">📞</span>來電</div>
  <div class="phone-os-app"><span class="emoji">📸</span>SNS</div>
  <div class="phone-os-app"><span class="emoji">🎵</span>Spotify</div>
  <div class="phone-os-app"><span class="emoji">📷</span>相簿</div>
  <div class="phone-os-app"><span class="emoji">📰</span>Dispatch</div>
  <div class="phone-os-app"><span class="emoji">⚙️</span>設定</div>
 </div>
 <div class="phone-os-section"><div class="phone-os-title"><h3>訊息列表</h3><span class="badge">${(s.phoneThreads||[]).reduce((a,b)=>a+(b.unread||0),0)}</span></div>${(s.phoneThreads||[]).slice(0,7).map(t=>`<div class="message-thread"><div class="thread-avatar">${t.type==="call"?"📞":t.type==="work"?"📋":t.type==="group"?"👥":"💜"}</div><div class="thread-body"><b>${t.name}</b><span>${t.last}</span></div><div class="thread-meta">${t.updatedAt||""}${t.unread?`<br><span class="badge">${t.unread}</span>`:""}</div></div>`).join("")||"<p class='muted'>尚無訊息列表。</p>"}</div>
 <div class="phone-os-section"><div class="phone-os-title"><h3>未讀訊息</h3><span class="badge">${(s.phoneUnread||[]).length}</span></div>${(s.phoneUnread||[]).slice(0,6).map(u=>`<div class="message-thread"><div class="thread-avatar">💜</div><div class="thread-body"><b>${u.source}</b><span>${u.text}</span></div><div class="thread-meta">Lv.${u.level}</div></div>`).join("")||"<p class='muted'>尚無未讀。</p>"}</div>
 <div class="phone-os-section"><h3>來電</h3>${(s.phoneCalls||[]).slice(0,5).map(c=>`<div class="call-item"><div><b>${c.name}</b><br><span class="small">${c.note}</span></div><b>${c.type}</b></div>`).join("")||"<p class='muted'>尚無來電。</p>"}</div>
 <div class="phone-os-section"><h3>SNS</h3><div class="sns-tabs"><span>X</span><span>Instagram</span><span>Weverse</span><span>Bubble</span><span>搬運帳</span></div>${(s.phoneSNS||[]).slice(0,5).map(f=>`<div class="feed-card"><b>${f.platform}｜${f.author}</b><div>${f.text}</div><span class="tag">熱度 ${f.heat}</span></div>`).join("")||"<p class='muted'>尚無SNS。</p>"}</div>
 <div class="phone-os-section"><h3>Spotify</h3>${(s.spotifyHistory||[]).slice(0,5).map(sp=>`<div class="spotify-item"><div class="spotify-cover">🎵</div><div style="flex:1"><b>${sp.title}</b><br><span class="small">${sp.artist}｜${sp.mood}</span></div></div>`).join("")||"<p class='muted'>尚無播放紀錄。</p>"}</div>
 <div class="phone-os-section"><h3>相簿</h3><div class="album-wall">${(s.phoneAlbum||[]).slice(0,9).map(a=>`<div class="album-tile">${a.title}<br>${a.tag}</div>`).join("")||"<p class='muted'>尚無相簿。</p>"}</div></div>
 <div class="phone-os-section"><h3>Dispatch</h3>${(s.phoneDispatch||[]).slice(0,5).map(d=>`<div class="dispatch-item"><div><b>${d.title}</b><br><span class="small">${d.desc}</span></div><span class="badge">${d.danger}</span></div>`).join("")||"<p class='muted'>尚無Dispatch案件。</p>"}</div>
 </div>
 <h3>舊手機桌面</h3>
 <div class="phone-home">
  <div class="appicon kakao"><b>💬</b>Kakao</div>
  <div class="appicon bubble-app"><b>🫧</b>Bubble</div>
  <div class="appicon x-app"><b>𝕏</b>X</div>
  <div class="appicon ig-app"><b>◎</b>Instagram</div>
  <div class="appicon"><b>📷</b>相簿</div>
  <div class="appicon"><b>☎️</b>電話</div>
  <div class="appicon calendar-app"><b>📅</b>行事曆</div>
  <div class="appicon dispatch-app"><b>📁</b>Dispatch</div>
 </div>

 <div class="phone-section"><h3>Dream Inbox</h3><div class="inbox-list">${(s.dreamInbox||[]).slice(0,8).map(i=>`<div class="inbox-row"><div class="avatar-bubble">${i.type==="chat"?"💬":i.type==="bubble"?"🫧":i.type==="call"?"☎️":i.type==="sns"?"𝕏":i.type==="home"?"🏠":"💜"}</div><div class="inbox-main"><b>${i.sender}</b><span>${i.preview}</span></div>${i.unread?`<div class="unread-dot"></div>`:""}</div>`).join("")||"<p class='muted'>尚無收件匣。</p>"}</div></div>
 <div class="phone-section"><h3>通知</h3>${notifs.slice(0,4).map(n=>`<div class="notif"><b>${n.title}</b><div>${n.body}</div><div class="small">${n.year}年${n.month}月</div></div>`).join("")||"<p class='muted'>暫無通知。</p>"}</div>

 <div class="phone-section"><h3>KakaoTalk</h3>${kakao.slice(-8).map(m=>`<div class="bubble-msg ${m.sender==="你"?"me":""}"><b>${m.sender}</b><br>${m.text}<div class="small">${m.status}｜${m.year}.${m.month}.${m.day} ${String(m.hour).padStart(2,"0")}:00</div></div>`).join("")||"<p class='muted'>尚無Kakao訊息。</p>"}</div>

 <div class="phone-section"><h3>Bubble 2.0</h3>${bubbles.slice(0,5).map(b=>`<div class="story-card"><b>${s.ta}</b>：${b.text}<div class="small">${b.secret?"疑似暗號":"普通更新"}｜粉絲反應：${b.reactions.join(" / ")}</div></div>`).join("")||"<p class='muted'>尚無Bubble。</p>"}</div>

 <div class="phone-section"><h3>X 時間軸</h3>${x.slice(0,6).map(p=>`<div class="story-card"><b>${p.author}</b><br>${p.text}<div class="small">熱度 ${p.heat}</div></div>`).join("")||"<p class='muted'>尚無X貼文。</p>"}</div>

 <div class="phone-section"><h3>Instagram 限動</h3>${ig.slice(0,4).map(i=>`<div class="story-card"><b>${i.author}</b>：${i.emoji}<div>${i.meaning}</div><span class="tag">風險 ${i.risk}</span></div>`).join("")||"<p class='muted'>尚無限動。</p>"}</div>

 <div class="phone-section"><h3>通話紀錄</h3>${calls.slice(0,6).map(c=>`<div class="call-log"><span>${c.name}</span><b>${c.type}</b></div>`).join("")||"<p class='muted'>尚無通話紀錄。</p>"}</div>

 <div class="phone-section"><h3>相簿</h3>${album.slice(0,5).map(a=>`<div class="story-card"><b>${a.title}</b><div>${a.desc}</div><span class="tag">${a.private?"私人":"公開"}</span><span class="tag">風險 ${a.risk}</span></div>`).join("")||"<p class='muted'>尚無相簿。</p>"}</div>

 <div class="phone-section"><h3>行事曆</h3>${cal.slice(0,5).map(c=>`<div class="story-card"><b>${c.date}｜${c.title}</b><div>${c.desc}</div><span class="tag">危險 ${c.danger}</span></div>`).join("")||"<p class='muted'>尚無行事曆。</p>"}</div>

 <div class="phone-section"><h3>SNS 宇宙</h3>${(s.snsUniverse||[]).slice(0,6).map(f=>`<div class="feed-card"><div class="feed-head"><div class="avatar-bubble">${f.platform==="Bubble"?"🫧":f.platform==="Instagram"?"◎":f.platform==="X"?"𝕏":"💜"}</div><div><div class="feed-name">${f.author}</div><div class="feed-platform">${f.platform}｜影響 ${f.impact}</div></div></div><div>${f.text}</div></div>`).join("")||"<p class='muted'>尚無SNS宇宙動態。</p>"}</div>
 <div class="phone-section"><h3>同居日常</h3>${(s.cohabLife||[]).slice(0,5).map(h=>`<div class="cozy-room"><b>${h.title}</b><div>${h.desc}</div><div class="room-grid"><div class="room-item">溫度 +${h.warmth}</div><div class="room-item">風險 +${h.risk}</div></div></div>`).join("")||"<p class='muted'>尚無同居日常。</p>"}</div>
 <div class="phone-section"><h3>多年回憶相簿</h3><div class="memory-album-grid">${(s.memoryAlbum||[]).slice(0,6).map(a=>`<div class="memory-photo"><b>${a.title}</b><span>${a.year}年${a.month}月｜${a.desc}</span></div>`).join("")||"<p class='muted'>尚無多年回憶。</p>"}</div></div>
 <div class="phone-section"><h3>Dispatch 案件夾</h3>${dc.slice(0,5).map(d=>`<div class="story-card"><b>${d.title}</b><div>${d.desc}</div><span class="tag">${d.status}</span><span class="tag">危險 ${d.danger}</span></div>`).join("")||"<p class='muted'>尚無案件。</p>"}</div>

 <div class="phone-section"><h3>戀愛紀念冊</h3>${love.slice(0,6).map(l=>`<div class="story-card"><b>${l.year}年${l.month}月｜${l.title}</b><div>${l.desc}</div><span class="tag">${l.type}</span></div>`).join("")||"<p class='muted'>尚無紀念。</p>"}</div>

 <div class="phone-section"><h3>舊訊息流</h3>${msgs.slice(-6).map(m=>`<div class="bubble-msg ${m.sender==="你"?"me":""}"><b>${m.sender}</b><br>${m.kind==="deleted"?"（訊息已撤回）":m.text}<div class="small">${m.year}.${m.month}</div></div>`).join("")}</div>

 </div></div>`;
}

function renderItems(){
 const el=document.getElementById("items"); if(!el||!current)return;
 const s=current.state;
 el.innerHTML=(s.items||[]).map(i=>`<div class="item-card ${i.risk>40?'risk':''}"><b>${i.name}</b> <span class="tag">${i.used?"已回收":"未回收"}</span><div>${i.desc}</div><div class="small">擁有者：${i.owner}｜初次出現：${i.firstSeen}｜情感值：${i.emotional}｜風險：${i.risk}</div></div>`).join("")||"<p class='muted'>尚無物品伏筆。</p>";
}


function addUniverseLog(title,desc,type="world"){
 const s=current.state;
 s.universeLog.unshift({id:uid(),year:s.year,month:s.month,week:s.week,title,desc,type});
 s.universeLog=s.universeLog.slice(0,120);
}
function addWorldEvent(title,desc,type="normal",participants=[]){
 const s=current.state;
 const ev={id:uid(),year:s.year,month:s.month,week:s.week,title,desc,type,participants,impact:rand([8,12,16,22]),resolved:false};
 s.worldEvents.unshift(ev);
 s.worldEvents=s.worldEvents.slice(0,80);
 addUniverseLog(title,desc,type);
 addTimeline(title,desc,type==="danger"?"高":"中");
}
function triggerWorldEvent(type){
 if(!current)return;
 const s=current.state;
 const company=s.companyState||makeCompanyState(s.company);
 let title="",desc="",participants=[s.group],kind="normal";
 const pool=[...(company.senior||[]),...(s.rivalGroups||[]),...(s.sameCompany||[]),...(Object.keys(s.npcs||{}).slice(0,6))].filter(Boolean);
 if(type==="comeback"){
  title=`${s.group} 回歸準備期`;
  desc=`公司內部開始進入回歸準備。造型、MV、打歌動線與Bubble頻率都被重新管控，你和 ${s.ta} 能自然見面的理由變多，也更容易留下破綻。`;
  company.alert=clamp(company.alert+10); s.pressure=clamp(s.pressure+8); kind="company";
 }
 if(type==="musicshow"){
  const other=rand(pool.length?pool:["RIIZE","TXT","IVE"]);
  title=`Music Bank 打歌同場`;
  desc=`${s.group} 與 ${other} 出現在同一天預錄名單。待機室、走廊、Challenge動線全都重疊，站姐與搬運帳的素材量暴增。`;
  participants.push(other); s.risk=clamp(s.risk+7); s.xHeat=clamp((s.xHeat||0)+6);
 }
 if(type==="award"){
  const other=rand(pool.length?pool:["SEVENTEEN","NCT","aespa"]);
  title=`年末頒獎禮同場`;
  desc=`紅毯順序與後台座位表公布。${s.ta} 的鏡頭會被放大，每一次看向台下或側台的視線都可能被剪成慢動作。`;
  participants.push(other); s.buzz=clamp(s.buzz+10); kind="award";
 }
 if(type==="smtown"){
  title=`公司家族演唱會`;
  const seniors=(company.senior||[]).slice(0,4).join("、")||"同公司前後輩";
  desc=`${company.name} 家族演唱會彩排。${s.ta} 與 ${seniors} 共用後台動線，前後輩、經紀人與造型組都比平時更容易看見你們的距離。`;
  s.risk=clamp(s.risk+8); company.internalRumor=clamp((company.internalRumor||0)+12); kind="company";
 }
 if(type==="tour"){
  title=`世界巡演行程公布`;
  desc=`海外巡演讓你們能短暫遠離韓國鏡頭，卻也帶來飯店、機場、入境照與海外粉絲的追蹤。`;
  s.stayRisk=clamp(s.stayRisk+8); s.xHeat=clamp((s.xHeat||0)+8);
 }
 if(type==="contract"){
  title=`續約季壓力`;
  desc=`公司開始談續約與未來規劃。戀愛、公開形象、團體穩定度與個人路線都被放上同一張桌子。`;
  s.pressure=clamp(s.pressure+18); company.alert=clamp(company.alert+18); kind="company";
 }
 if(type==="scandal"){
  title=`圈內戀愛傳聞潮`;
  desc=`另一組藝人的戀愛傳聞爆出，粉圈開始全面考古同款、Bubble與行程空白。你和 ${s.ta} 的舊痕跡也更容易被重新翻出。`;
  s.fandomHeat=clamp((s.fandomHeat||0)+16); s.proofLevel=clamp((s.proofLevel||0)+6); kind="danger";
 }
 if(type==="collab"){
  const other=rand(pool.length?pool:["BOYNEXTDOOR","TWS","ZEROBASEONE"]);
  title=`合作舞台 / Challenge`;
  desc=`工作人員安排 ${s.ta} 與 ${other} 拍攝Challenge。公開鏡頭會很近，而你必須在場邊裝作只是普通工作或路過。`;
  participants.push(other); s.possess=clamp(s.possess+4); s.risk=clamp(s.risk+5);
 }
 s.companyState=company;
 addWorldEvent(title,desc,kind,participants);
 const story=`【世界事件｜${title}】\n\n${desc}\n\n【參與/牽連】${participants.join("、")}\n\n世界沒有停在你們的戀愛裡。行程、公司與粉圈都在往前走。`;
 current.storyLog.push(story);
 s.round++; advanceTime(); s.lifeStage=lifeStage();
 saveCurrent(); renderAll(story);
}

function updateWorldClock(amount="hour"){
 const c=current.state.worldClock||{year:current.state.year,month:current.state.month,day:1,hour:10,period:"上午"};
 if(amount==="hour") c.hour += rand([2,3,4,6]);
 if(amount==="day") c.day += 1;
 if(amount==="week") c.day += 7;
 if(amount==="month") c.month += 1;
 while(c.hour>=24){c.hour-=24;c.day+=1}
 while(c.day>28){c.day-=28;c.month+=1}
 while(c.month>12){c.month-=12;c.year+=1}
 c.period=c.hour<6?"凌晨":c.hour<12?"上午":c.hour<18?"下午":"夜晚";
 current.state.worldClock=c;
 current.state.year=c.year; current.state.month=c.month;
}
function addAutoEvent(type,title,desc,impact=0){
 const s=current.state;
 const ev={id:uid(),year:s.year,month:s.month,day:s.worldClock?.day||1,hour:s.worldClock?.hour||0,type,title,desc,impact};
 s.autoEvents.unshift(ev); s.autoEvents=s.autoEvents.slice(0,100);
 addUniverseLog(title,desc,type);
}
function runWorldTick(span="hour"){
 if(!current)return;
 updateWorldClock(span);
 const s=current.state;
 const roll=Math.random();
 if(roll<0.28) autoCompanyReaction();
 else if(roll<0.52) runNpcAutonomy(false);
 else if(roll<0.76) autoFandomReaction();
 else autoDispatchReaction();
 s.round++; s.lifeStage=lifeStage();
 const latest=s.autoEvents[0];
 const story=`【世界自動運轉｜${s.worldClock.year}/${s.worldClock.month}/${s.worldClock.day} ${String(s.worldClock.hour).padStart(2,"0")}:00】\n\n${latest?latest.desc:"世界安靜地往前走了一段。"}\n\n你沒有主動做什麼，但韓娛世界不會因為你沉默就停止。`;
 current.storyLog.push(story); saveCurrent(); renderAll(story);
}
function toggleAutoWorld(){
 if(!current)return;
 current.state.autoWorld=!current.state.autoWorld;
 saveCurrent(); renderUniverse();
 alert("自動運轉："+(current.state.autoWorld?"開啟（目前需手動按推進觸發）":"關閉"));
}
function autoCompanyReaction(){
 const s=current.state, c=s.companyState||makeCompanyState(s.company);
 const actions=[
  ["公司動線調整",`公司臨時調整 ${s.ta} 的後台動線。你原本能自然經過的位置，被換成了另一條路。`,6],
  ["公關會議",`${c.name} 內部開了一場短會，討論最近粉圈對 ${s.ta} 的異常關注。沒有人點你的名字，但每一句都像繞著你。`,10],
  ["經紀人提醒",`經紀人在群組裡發：「最近所有人注意私人物品和後台照片。」${s.ta} 已讀了很久，沒有回。`,8],
  ["行程加壓",`${s.ta} 的行程被塞得更滿。忙碌可以掩蓋很多事，也會把你們之間的訊息拉得更長。`,5]
 ];
 const a=rand(actions); c.alert=clamp((c.alert||0)+a[2]); c.internalRumor=clamp((c.internalRumor||0)+Math.ceil(a[2]/2)); s.pressure=clamp(s.pressure+a[2]); s.companyState=c;
 addAutoEvent("company",a[0],a[1],a[2]);
}
function runNpcAutonomy(render=true){
 if(!current)return;
 const s=current.state;
 const entries=Object.entries(s.npcs||{});
 if(!entries.length)return;
 const [name,npc]=rand(entries);
 const np=npc.personality||{};
 const likelyReport=(np.loyalty||0)<35 || npc.stance==="公司優先";
 const action=likelyReport?rand(["observe","report","warn","test"]):rand(["observe","cover","warn","report","test","ignore"]);
 let desc="", impact=0, type="npc";
 if(action==="observe"){
  npc.awareness=clamp((npc.awareness||0)+rand([5,8,12]));
  desc=`${name} 開始注意你和 ${s.ta} 的視線與時間線。對方沒有拆穿，只是在群聊裡少回了一句玩笑。`;
  impact=6;
 }
 if(action==="cover"){
  npc.stance="幫忙隱瞞"; npc.closeness=clamp((npc.closeness||0)+10); s.trust=clamp(s.trust+3); s.risk=clamp(s.risk-2);
  desc=`${name} 在工作人員靠近前自然地換了話題，替你和 ${s.ta} 擋掉了一個可能被追問的瞬間。`;
  impact=-2;
 }
 if(action==="warn"){
  npc.awareness=clamp((npc.awareness||0)+10); s.pressure=clamp(s.pressure+4);
  desc=`${name} 傳給 ${s.ta} 一句很短的訊息：「最近小心一點。」你沒有看見內容，只看見TA看完後把手機扣上。`;
  impact=4;
 }
 if(action==="report"){
  npc.stance="公司優先"; npc.awareness=clamp((npc.awareness||0)+16); s.risk=clamp(s.risk+7); s.pressure=clamp(s.pressure+7);
  desc=`${name} 把一個異常動線告訴了經紀人。這不是惡意，但足夠讓公司開始多看一眼。`;
  impact=9; type="company";
 }
 if(action==="test"){
  npc.awareness=clamp((npc.awareness||0)+7);
  desc=`${name} 在你面前故意提到 ${s.ta} 的名字，像玩笑一樣觀察你的反應。`;
  impact=5;
 }
 if(action==="ignore"){
  desc=`${name} 似乎察覺了什麼，但選擇把那一秒當作沒看見。`;
  impact=1;
 }
 addAutoEvent(type,`NPC自主行動：${name}`,desc,impact);
 if(render){s.round++; updateWorldClock("hour"); s.lifeStage=lifeStage(); current.storyLog.push(`【NPC自主行動】\n\n${desc}`); saveCurrent(); renderAll(current.storyLog.at(-1));}
}
function autoFandomReaction(){
 const s=current.state;
 const actions=[
  ["X搬運升溫",`一個搬運帳把 ${s.ta} 最近的Bubble截圖和打歌後台圖放在同一串。留言還不算多，但已經有人開始存圖。`,8],
  ["韓網小討論",`Theqoo 出現一篇沒有點名的討論：「最近某男團成員是不是狀態不太一樣？」`,6],
  ["國際粉反彈",`國際粉開始反問：成年人為什麼不能有自己的生活？韓網和國際粉的語氣第一次明顯分裂。`,5],
  ["同款再考古",`有人翻出一個舊限動，說某個小物和 ${s.ta} 最近用的東西很像。`,10]
 ];
 const a=rand(actions); s.fandomHeat=clamp((s.fandomHeat||0)+a[2]); s.xHeat=clamp((s.xHeat||0)+Math.ceil(a[2]/2)); s.buzz=clamp(s.buzz+a[2]); 
 addAutoEvent("fandom",a[0],a[1],a[2]);
}
function autoDispatchReaction(){
 const s=current.state;
 const focus=s.dispatchFocus||0;
 let desc="", impact=0;
 if(focus<35){desc=`一個匿名帳號把模糊線索丟給議題帳。D社還沒動，但資料已經開始流動。`;impact=6}
 else if(focus<70){desc=`Dispatch線人開始比對 ${s.ta} 的行程空白與幾張未公開照片。你們不知道哪一張會成為未來的開頭。`;impact=12; addPhotoVault("Dispatch線人","疑似行程空白期的同框線索",18)}
 else {desc=`Dispatch關注度逼近爆料臨界。公司公關開始預演否認、承認與冷處理三種聲明。`;impact=20; s.proofLevel=clamp((s.proofLevel||0)+12)}
 s.dispatchFocus=clamp(focus+impact); s.risk=clamp(s.risk+Math.ceil(impact/2));
 addAutoEvent("dispatch","Dispatch自動追查",desc,impact);
}

function renderUniverse(){
 if(!current)return;
 const s=current.state;
 const wc=document.getElementById("worldClock");
 if(wc){const c=s.worldClock||{};wc.innerHTML=`世界時鐘：${c.year||s.year}/${c.month||s.month}/${c.day||1} ${String(c.hour||10).padStart(2,"0")}:00（${c.period||"上午"}）｜自動運轉：${s.autoWorld?"開":"關"}`;}
 const ae=document.getElementById("autoEvents");
 if(ae)ae.innerHTML=(s.autoEvents||[]).map(e=>`<div class="auto-event ${e.type}"><b>${e.year}/${e.month}/${e.day} ${String(e.hour).padStart(2,"0")}:00｜${e.title}</b><div>${e.desc}</div><span class="tag">${e.type}</span><span class="tag">影響 ${e.impact}</span></div>`).join("")||"<p class='muted'>尚無自動事件。</p>";
 const we=document.getElementById("worldEvents");
 if(we)we.innerHTML=(s.worldEvents||[]).map(e=>`<div class="world-event ${e.type}"><b>${e.year}年${e.month}月｜${e.title}</b><div>${e.desc}</div><div class="small">牽連：${(e.participants||[]).join("、")}｜影響 ${e.impact}</div></div>`).join("")||"<p class='muted'>尚無世界事件。</p>";
 const rel=document.getElementById("industryRelations");
 if(rel)rel.innerHTML=(s.industryRelations||[]).map(r=>`<span class="relation-node ${r.heat>50?"hot":r.heat<20?"safe":""}">${r.name}｜${r.type}｜熱度${r.heat}</span>`).join("")||"<p class='muted'>尚無圈內關係。</p>";
 const log=document.getElementById("universeLog");
 if(log)log.innerHTML=(s.universeLog||[]).map(l=>`<div class="universe-log"><b>${l.year}年${l.month}月｜${l.title}</b><div>${l.desc}</div><span class="tag">${l.type}</span></div>`).join("")||"<p class='muted'>尚無宇宙紀事。</p>";
}
function renderCompanyPanel(){
 if(!current)return;
 const s=current.state, c=s.companyState||makeCompanyState(s.company);
 const el=document.getElementById("companyPanel"); if(!el)return;
 const m=(n,v,type="")=>`<div class="meter ${type}"><div class="meter-row"><span>${n}</span><b>${v}</b></div><div class="bar"><div class="fill ${type==='danger'?'danger':type==='good'?'good':''}" style="width:${v}%"></div></div></div>`;
 el.innerHTML=`<div class="company-card"><h3>${c.name}</h3><div>${c.risk||""}</div><div class="small">平台：${(c.platforms||[]).join("、")}｜前後輩：${(c.senior||[]).join("、")}</div></div>${m("管控度",c.control,"danger")}${m("公關能力",c.pr,"good")}${m("戀愛容忍度",c.datingTolerance,"good")}${m("粉圈敏感度",c.fandomSensitivity,"danger")}${m("國際曝光度",c.globalExposure,"danger")}${m("公司警戒",c.alert,"danger")}${m("內部傳聞",c.internalRumor,"danger")}${m("公關疲勞",c.prFatigue,"danger")}`;
}


function addShadow(title,desc,weight=10){
 const s=current.state;
 const sh={id:uid(),year:s.year,month:s.month,turn:s.round,title,desc,weight};
 s.emotionalShadows.unshift(sh); s.emotionalShadows=s.emotionalShadows.slice(0,80);
 const p=s.mainPersonality; if(p){p.shadow=clamp((p.shadow||0)+weight); p.emotionalDebt=clamp((p.emotionalDebt||0)+Math.ceil(weight/2)); p.lastWound=title;}
 addMemory("情緒陰影",`${title}：${desc}`,"高",["人格","陰影"]);
}
function addWarmth(title,desc,weight=8){
 const s=current.state, p=s.mainPersonality;
 if(p){p.shadow=clamp((p.shadow||0)-Math.ceil(weight/2)); p.trustMemory=clamp((p.trustMemory||50)+weight); p.lastWarmth=title;}
 addMemory("情感靠近",`${title}：${desc}`,"中",["人格","溫度"]);
}
function personalityTone(){
 const p=current.state.mainPersonality||{};
 if((p.shadow||0)>70) return "語氣更防衛、回訊息變慢、公開場合更像陌生人";
 if((p.avoidance||0)>60) return "靠近後容易後退，常用工作理由切斷談話";
 if(p.attachment==="焦慮型") return "會反覆試探你是否還在，但不會直接承認不安";
 if(p.attachment==="安全型") return "衝突後仍願意留下來說清楚";
 if(p.attachment==="控制型") return "容易用行程、稱呼或距離來試探你的邊界";
 return "情緒多半藏在停頓、撤回與視線裡";
}
function triggerPersonalityEvent(type){
 if(!current)return;
 const s=current.state, p=s.mainPersonality||makePersonality(s.ta);
 s.mainPersonality=p;
 let story="", title="";
 if(type==="jealousy"){
  title="吃醋觸發";
  const trigger=p.jealousyTrigger;
  p.emotionalDebt=clamp((p.emotionalDebt||0)+6); s.possess=clamp(s.possess+8); s.heart=clamp(s.heart+2);
  story=`【人格事件｜吃醋反應】\n\n觸發點：${trigger}。\n\n${s.ta}沒有說自己介意，只是在你提到那個名字後，把手機螢幕按暗。\n\n「你們很熟？」\n\n語氣很平，平到像只是隨口問。\n\n但後來的Bubble更新得比平常更晚。`;
  addShadow(title,`${s.ta} 因「${trigger}」留下情緒波動。`,6);
 }
 if(type==="avoid"){
  title="逃避反應";
  p.avoidance=clamp((p.avoidance||0)+10); s.trust=clamp(s.trust-5);
  story=`【人格事件｜逃避反應】\n\n你問到關係的下一步時，${s.ta}先是沉默，然後看向門口。\n\n「等這次行程結束再說。」\n\n這句話你已經聽過很多次。\n\n不同的是，這次TA沒有補上任何安撫。`;
  addShadow(title,`關係議題被推遲，逃避傾向上升。`,8);
 }
 if(type==="comfort"){
  title="安撫靠近";
  p.trustMemory=clamp((p.trustMemory||50)+12); s.trust=clamp(s.trust+8); s.heart=clamp(s.heart+5); s.intimacy=clamp(s.intimacy+4);
  story=`【人格事件｜安撫靠近】\n\n${s.ta}沒有解釋太多，只是在無人的走廊盡頭停下來。\n\n「剛剛不是不想回你。」\n\nTA的聲音很低，像怕驚動什麼。\n\n「是旁邊有人。」`;
  addWarmth(title,`${s.ta} 主動補上解釋，信任記憶上升。`,10);
 }
 if(type==="career"){
  title="事業優先選擇";
  p.careerPriority=clamp((p.careerPriority||80)+5); s.pressure=clamp(s.pressure+10); s.trust=clamp(s.trust-3);
  story=`【人格事件｜事業優先】\n\n行程表被排到凌晨。\n\n你們原本約好的時間被取消，${s.ta}只傳來一句：\n\n「今天真的不行。」\n\n沒有撒嬌，沒有補償。\n\n只是現實先於感情抵達。`;
  addShadow(title,`事業優先級影響約定，玩家可能感到被放在後面。`,7);
 }
 if(type==="trauma"){
  title="危機陰影";
  const crisis=rand(["被站姐拍到邊角","經紀人約談","粉圈考古","Dispatch線索","成員撞見生活痕跡"]);
  p.shadow=clamp((p.shadow||0)+18); p.publicWillingness=clamp((p.publicWillingness||30)-8); s.risk=clamp(s.risk+8);
  story=`【人格事件｜危機陰影】\n\n${crisis}之後，${s.ta}變得比平常更安靜。\n\n鏡頭前一切正常。\n\n私下卻少了那些原本會自然靠近的小動作。\n\n你沒有證據說TA變冷了。\n\n可你感覺得到。`;
  addShadow(title,`${crisis} 讓 ${s.ta} 的公開意願下降。`,18);
 }
 if(type==="fate"){
  title="命運線推進";
  const fate=p.fateSeed;
  if(fate.includes("公開")){s.publicStatus="公開危機"; s.buzz=clamp(s.buzz+15); p.publicWillingness=clamp((p.publicWillingness||30)+8);}
  if(fate.includes("錯過")){s.trust=clamp(s.trust-8); p.avoidance=clamp((p.avoidance||0)+8);}
  if(fate.includes("共犯")){s.risk=clamp(s.risk+10); s.intimacy=clamp(s.intimacy+8);}
  story=`【命運事件｜${fate}】\n\n有些事情像是從很早以前就埋好的。\n\n今天只是它第一次露出邊角。\n\n你看著${s.ta}，忽然意識到：這段關係不只是在往前走，也在往某個方向被推著走。`;
  addMemory("命運線推進",`${fate} 被推進。`, "高", ["命運"]);
 }
 s.round++; updateWorldClock("hour"); s.lifeStage=lifeStage(); current.storyLog.push(story); saveCurrent(); renderAll(story);
}
function renderPersonalityPanel(){
 if(!current)return;
 const s=current.state, p=s.mainPersonality||{};
 const el=document.getElementById("personalityPanel"); if(!el)return;
 const trait=(k,v)=>`<div class="trait"><span>${k}</span><b>${v}</b></div>`;
 el.innerHTML=`<div class="fate"><h3>命運種子：${p.fateSeed||"未生成"}</h3><div class="small">玩家不可完全預知的長期傾向。它不會強制結局，但會提高某些事件機率。</div></div>
 <div class="personality-card"><h3>${s.ta}｜人格核心</h3>
 ${trait("依戀風格",p.attachment||"-")}
 ${trait("事業優先級",p.careerPriority||0)}
 ${trait("逃避傾向",p.avoidance||0)}
 ${trait("公開意願",p.publicWillingness||0)}
 ${trait("陰影值",p.shadow||0)}
 ${trait("信任記憶",p.trustMemory||0)}
 ${trait("情緒債",p.emotionalDebt||0)}
 ${trait("吃醋觸發點",p.jealousyTrigger||"-")}
 ${trait("安全感缺口",p.insecurity||"-")}
 ${trait("道德底線",p.moralLine||"-")}
 ${trait("表達愛的方式",p.affectionStyle||"-")}
 ${trait("目前語氣傾向",personalityTone())}
 </div>
 <h3>情緒陰影</h3>
 ${(s.emotionalShadows||[]).map(x=>`<div class="shadow"><b>${x.year}年${x.month}月｜${x.title}</b><div>${x.desc}</div><span class="tag">重量 ${x.weight}</span></div>`).join("")||"<p class='muted'>尚無情緒陰影。</p>"}`;
}


function compactStateForSnapshot(){
 return JSON.parse(JSON.stringify(current));
}
function saveSnapshot(label="自動快照"){
 if(!current)return;
 const s=current.state;
 const snap={id:uid(),label,year:s.year,month:s.month,round:s.round,lifeStage:s.lifeStage,createdAt:new Date().toISOString(),data:compactStateForSnapshot()};
 current.snapshots=current.snapshots||[];
 current.snapshots.unshift(snap);
 current.snapshots=current.snapshots.slice(0,20);
 saveCurrent(); renderSnapshots();
}
function rewindSnapshot(id=null){
 if(!current)return;
 const snaps=current.snapshots||[];
 const snap=id?snaps.find(x=>x.id===id):snaps[0];
 if(!snap)return alert("目前沒有快照可以倒帶");
 if(!confirm(`倒帶到「${snap.label}」？目前未存成分支的進度會被覆蓋。`))return;
 const restored=JSON.parse(JSON.stringify(snap.data));
 restored.snapshots=snaps;
 current=restored;
 saveCurrent();
 renderAll(`【系統倒帶】\n\n已倒帶到：${snap.label}\n回合：${snap.round}\n時間：${snap.year}年${snap.month}月\n\n這不是世界重啟，只是你選擇回到另一條分歧前。`);
}
function branchCurrentSave(){
 if(!current)return;
 const saves=getSaves();
 const branch=JSON.parse(JSON.stringify(current));
 branch.id=uid();
 branch.title=(current.title||"存檔")+"｜分支"+new Date().toLocaleString();
 branch.createdAt=new Date().toISOString();
 branch.branchFrom=current.id;
 saves.unshift(branch);
 setSaves(saves);
 alert("已建立分支存檔，可回首頁讀取。");
 renderSaves();
}
function renderSnapshots(){
 if(!current)return;
 const el=document.getElementById("snapshotPanel"); if(!el)return;
 const snaps=current.snapshots||[];
 el.innerHTML=`<h3>回合快照</h3>${snaps.map(x=>`<div class="snapshot"><b>${x.label}</b><div class="small">回合${x.round}｜${x.year}年${x.month}月｜${x.lifeStage||""}</div><button class="secondary mini" onclick="rewindSnapshot('${x.id}')">倒帶到這裡</button></div>`).join("")||"<p class='muted'>尚無快照。</p>"}`;
}
function addDispatchDeal(title,desc,cost=0,success=50){
 const s=current.state;
 s.dispatchDeals.unshift({id:uid(),year:s.year,month:s.month,title,desc,cost,success});
 s.dispatchDeals=s.dispatchDeals.slice(0,50);
}
function addSecretBubbleSub(name,group){
 const s=current.state;
 let old=(s.secretBubbleSubs||[]).find(x=>x.name===name);
 if(old){old.level=clamp((old.level||1)+1);old.lastUpdate="更新了新Bubble";return old}
 const sub={id:uid(),name,group,level:1,lastUpdate:"剛訂閱，尚無明顯異常"};
 s.secretBubbleSubs.unshift(sub); return sub;
}
function addGossipIntel(source,title,desc,cred=40,risk=20){
 const s=current.state;
 s.gossipIntel.unshift({id:uid(),year:s.year,month:s.month,source,title,desc,cred,risk});
 s.gossipIntel=s.gossipIntel.slice(0,80);
}
function blackboxAction(type){
 if(!current)return;
 const s=current.state;
 let story="";
 if(type==="buyDispatch"){
  const danger=(s.dispatchFocus||0)+(s.proofLevel||0)+rand([5,12,20]);
  const success=clamp(90-danger+rand([-10,0,10]),5,95);
  const cost=rand([30,50,80,120,200]);
  const ok=Math.random()*100<success;
  const title=ok?"D社照片暫時壓下":"D社談判失敗";
  const desc=ok?`某組未公開照片被暫時壓下，但對方保留底片與時間線。這不是刪除，只是延後。`:`對方沒有接受買斷，反而提高了後續爆料價值。`;
  addDispatchDeal(title,desc,cost,success);
  s.dispatchFocus=clamp((s.dispatchFocus||0)+(ok?-10:15));
  s.risk=clamp((s.risk||0)+(ok?-5:12));
  story=`【黑箱操作｜D社照片買斷】\n\n結果：${title}\n\n${desc}\n\n成功率：${success}%｜代價指數：${cost}\n\n黑箱操作不是沒有代價，只是把風險換成另一種形式。`;
 }
 if(type==="leakCheck"){
  const vault=s.photoVault||[];
  if(!vault.length){
    addPhotoVault("未知來源","模糊後台邊角，尚未確認人物",12);
  }
  const top=(s.photoVault||[]).slice(0,3).map(p=>`${p.source}：${p.desc}｜風險${p.risk}`).join("\n");
  story=`【黑箱操作｜偷拍庫檢查】\n\n目前最危險的資料：\n${top}\n\n有些照片現在不會爆，但它們會等待最適合傷人的時間。`;
 }
 if(type==="subBubble"){
  const pool=[["成燦","RIIZE"],["炤熙","RIIZE"],["Anton","RIIZE"],["NCT前輩","SM"],["同場後輩","打歌圈"],["合作對象","圈內"]];
  const p=rand(pool);
  const sub=addSecretBubbleSub(p[0],p[1]);
  const msg=rand(["今天真的很累。","有人看起來心情不錯。","不要相信網路上全部的話。","雨天適合聽歌。","ㅋㅋㅋㅋ秘密"]);
  sub.lastUpdate=msg;
  addPhoneThread(`${p[0]} Bubble`,msg,"bubble",1);
  story=`【黑箱操作｜偷偷訂閱Bubble】\n\n你偷偷訂閱了 ${p[0]}（${p[1]}）的Bubble。\n\n最新更新：\n「${msg}」\n\n這不一定和你有關，但在韓娛世界裡，所有句子都可能變成線索。`;
 }
 if(type==="gossip"){
  const pool=[
   ["造型組", "某團最近後台氣氛很怪", "有人說兩位成員最近常避開同一條走廊。", 35, 18],
   ["打歌工作人員", "Challenge名單臨時更動", "原本排好的合作突然取消，理由寫得很模糊。", 48, 22],
   ["站姐圈", "有大站暫停更新", "大站突然休站，粉圈開始猜是不是拍到不能發的東西。", 62, 35],
   ["公司內線", "公關部深夜加班", "沒有指名，但看起來像在準備聲明模板。", 58, 40],
   ["圈內朋友", "某對CP營業過頭", "粉絲嗑得很開心，公司卻開始降溫。", 44, 20]
  ];
  const g=rand(pool);
  addGossipIntel(g[0],g[1],g[2],g[3],g[4]);
  story=`【圈內八卦｜平行世界虛構】\n\n來源：${g[0]}\n標題：${g[1]}\n內容：${g[2]}\n\n可信度：${g[3]}%｜牽連風險：${g[4]}%`;
 }
 s.round++; updateWorldClock("hour"); s.lifeStage=lifeStage(); current.storyLog.push(story); saveCurrent(); renderAll(story);
}
function renderBlackbox(){
 if(!current)return;
 renderSnapshots();
 const s=current.state;
 const subs=document.getElementById("secretBubbleSubs");
 if(subs)subs.innerHTML=(s.secretBubbleSubs||[]).map(x=>`<div class="bubble-sub"><div><b>${x.name}</b><div class="small">${x.group}｜Lv.${x.level}</div><div>${x.lastUpdate}</div></div><span class="badge">🫧</span></div>`).join("")||"<p class='muted'>尚未偷偷訂閱任何Bubble。</p>";
 const gossip=document.getElementById("gossipPanel");
 if(gossip)gossip.innerHTML=(s.gossipIntel||[]).map(g=>`<div class="gossip"><div class="rumor">${g.title}</div><div>${g.desc}</div><div class="truth">來源：${g.source}｜可信度 ${g.cred}%｜牽連風險 ${g.risk}%｜平行世界虛構</div></div>`).join("")||"<p class='muted'>尚無圈內八卦。</p>";
 const deals=document.getElementById("dispatchDeals");
 if(deals)deals.innerHTML=(s.dispatchDeals||[]).map(d=>`<div class="blackbox-card danger"><b>${d.title}</b><div>${d.desc}</div><div class="small">代價指數 ${d.cost}｜成功率 ${d.success}%</div><div class="deal-meter"><div style="width:${d.success}%"></div></div></div>`).join("")||"<p class='muted'>尚無D社交易紀錄。</p>";
}

function renderAll(text){
 if(!current)return;
 const s=current.state;
 document.getElementById("pname").textContent=s.ta;
 document.getElementById("pdesc").textContent=`${s.group}｜${s.company}｜${s.fandom}`;
 document.getElementById("story").textContent=text;
 renderChoices();renderStatus();renderMemories();renderMemoryClusters();renderRecallHooks();renderTimeline();renderNPCs();renderSNS();renderPhone();renderItems();renderUniverse();renderCompanyPanel();renderPersonalityPanel();renderLife();renderIdolLife();renderInstagram();renderBlackbox();renderAIPrompt()
}
function renderChoices(){
 const cs=[["A","低聲警告TA：不要再留下會被猜到的東西。"],["B","裝作沒事，繼續完成眼前的工作 / 場面。"],["C","試探追問：你剛剛那句，是故意說給我聽的嗎？"],["D","拉開距離，先保護自己。"]];
 document.getElementById("choices").innerHTML="<h2>可選行動</h2>"+cs.map(c=>`<button onclick="choose('${c[0]}','${c[1]}')">${c[0]}. ${c[1]}</button>`).join("")
}
function renderStatus(){
 const s=current.state;
 const m=(n,v,type="")=>`<div class="meter"><div class="meter-row"><span>${n}</span><b>${v}</b></div><div class="bar"><div class="fill ${type}" style="width:${v}%"></div></div></div>`;
 document.getElementById("status").innerHTML=`<span class="pill">回合：${s.round}</span><span class="pill">${s.year}年${s.month}月 第${s.week}週</span><span class="pill">${s.season}</span><span class="pill">人生：${s.lifeStage}</span><span class="pill">出道第${s.careerYear||Math.max(1,(s.year||2026)-(s.debutYear||2023)+1)}年</span><span class="pill">${currentEra()}</span><span class="pill">身份：${s.role}</span><span class="pill">關係：${s.relation}</span>${m("心動值",s.heart,"good")}${m("信任值",s.trust,"good")}${m("親密度",s.intimacy,"good")}${m("曝光風險",s.risk,"danger")}${m("事業壓力",s.pressure,"danger")}${m("占有欲",s.possess)}${m("輿論溫度",s.buzz,"danger")}${m("粉圈熱度",s.fandomHeat||0,"danger")}${m("X熱度",s.xHeat||0,"danger")}${m("Dispatch關注",s.dispatchFocus||0,"danger")}${m("實錘程度",s.proofLevel||0,"danger")}${m("留宿風險",s.stayRisk,"danger")}${m("婚姻穩定",s.marriage,"good")}${m("同居傾向",s.cohabitation||0,"good")}${m("家庭公開風險",s.familyRisk,"danger")}<span class="pill">最高NPC察覺：${Math.max(0,...Object.values(s.npcs||{}).map(v=>v.awareness||0))}%</span><span class="pill">公司警戒：${s.companyState?.alert||0}%</span><span class="pill">世界事件：${(s.worldEvents||[]).length}</span><span class="pill">自動事件：${(s.autoEvents||[]).length}</span><span class="pill">命運：${s.mainPersonality?.fateSeed||"-"}</span><span class="pill">陰影：${s.mainPersonality?.shadow||0}</span><span class="pill">手機紀錄：${(s.kakaoChats||[]).length+(s.bubblePosts||[]).length+(s.xTimeline||[]).length}</span><span class="pill">模式：${s.mode==="ai"?"AI續寫":"本機"}</span>`
}


function memoryAgeScore(m){
 const s=current.state;
 return Math.max(0,(s.year-m.year)*12+(s.month-m.month));
}
function memoryScore(m){
 const age=memoryAgeScore(m);
 const tagBoost=(m.tags||[]).some(t=>["物品","伏筆","人生事件","危機","NPC","親密","Dispatch"].includes(t))?18:0;
 const pinBoost=m.pinned?35:0;
 const recallPenalty=m.lastRecalled?10:0;
 return (m.weight||40)+tagBoost+pinBoost+Math.min(age,36)*0.6-recallPenalty;
}
function compressLongMemory(){
 if(!current)return;
 const s=current.state;
 const groups={};
 current.memories.forEach(m=>{
   const key=(m.tags&&m.tags[0])||"一般";
   if(!groups[key])groups[key]=[];
   groups[key].push(m);
 });
 const clusters=Object.entries(groups).map(([tag,items])=>{
   const top=items.sort((a,b)=>memoryScore(b)-memoryScore(a)).slice(0,6);
   return {id:uid(),tag,updatedAt:new Date().toISOString(),summary:`【${tag}】`+top.map(x=>`${x.year}年${x.month}月「${x.title}」：${x.content}`).join(" / "),count:items.length,weight:Math.round(top.reduce((sum,x)=>sum+memoryScore(x),0)/Math.max(1,top.length))};
 }).sort((a,b)=>b.weight-a.weight).slice(0,20);
 current.memoryClusters=clusters;
 addMemory("長期記憶壓縮",`已將 ${current.memories.length} 條記憶壓縮為 ${clusters.length} 組摘要。`,"中",["系統","摘要"]);
 saveCurrent(); renderAll("【長期記憶壓縮完成】\\n\\n記憶庫已整理成摘要群組，AI 提示包會優先讀取釘選記憶、高權重記憶與摘要。");
}
function findRecallHooks(){
 if(!current)return;
 const s=current.state;
 const hooks=current.memories
  .filter(m=>memoryScore(m)>60)
  .sort((a,b)=>memoryScore(b)-memoryScore(a))
  .slice(0,12)
  .map(m=>{
    const reason=(m.tags||[]).includes("物品")?"物品可以再次出現":(m.tags||[]).includes("NPC")?"NPC可以重新介入":(m.tags||[]).includes("危機")?"危機可能被翻舊帳":memoryAgeScore(m)>12?"多年後回收會有宿命感":"近期伏筆可延續";
    return {id:uid(),memoryId:m.id,title:m.title,content:m.content,reason,score:Math.round(memoryScore(m)),used:false};
  });
 current.recallHooks=hooks;
 saveCurrent(); renderAll("【伏筆回收候選已生成】\\n\\n系統已從記憶庫挑出適合未來回收的事件。");
}
function recallHook(id){
 const h=(current.recallHooks||[]).find(x=>x.id===id); if(!h)return;
 h.used=true;
 const m=current.memories.find(x=>x.id===h.memoryId);
 if(m)m.lastRecalled=new Date().toISOString();
 const s=current.state;
 const story=`【伏筆回收｜${h.title}】\\n\\n很久以前留下的那件事，今天又回到了你們面前。\\n\\n${h.content}\\n\\n當時它只是細節，現在卻像一條被重新拉緊的線。\\n\\n${s.ta}看著你，沒有立刻說話。`;
 addMemory("伏筆被回收",`${h.title} 被重新帶回劇情。原因：${h.reason}`,"高",["伏筆","回收"]);
 current.storyLog.push(story); s.round++; advanceTime(); s.lifeStage=lifeStage(); saveCurrent(); renderAll(story);
}
function renderMemoryClusters(){
 const el=document.getElementById("memoryClusters"); if(!el||!current)return;
 el.innerHTML=(current.memoryClusters||[]).map(c=>`<div class="memory-cluster"><b>${c.tag}</b> <span class="weight">權重 ${c.weight}</span><div class="small">共 ${c.count} 條｜更新 ${new Date(c.updatedAt).toLocaleString()}</div><div>${c.summary}</div></div>`).join("")||"<p class='muted'>尚未壓縮長期記憶。</p>";
}
function renderRecallHooks(){
 const el=document.getElementById("recallHooks"); if(!el||!current)return;
 el.innerHTML=(current.recallHooks||[]).map(h=>`<div class="hook"><b>${h.used?"✅ ":""}${h.title}</b> <span class="weight">${h.score}</span><div>${h.content}</div><div class="small">回收理由：${h.reason}</div><button class="secondary mini" onclick="recallHook('${h.id}')">${h.used?"再次回收":"回收這個伏筆"}</button></div>`).join("")||"<p class='muted'>尚無伏筆候選。</p>";
}

function manualAddMemory(){
 if(!current)return;
 const title=document.getElementById("manualMemTitle").value.trim()||"手動記憶";
 const content=document.getElementById("manualMemContent").value.trim();
 if(!content)return alert("請先輸入記憶內容");
 addMemory(title,content,"高",["手動","重要"]);
 document.getElementById("manualMemTitle").value="";
 document.getElementById("manualMemContent").value="";
 saveCurrent();renderAll("【記憶已加入】\n\n這段內容已寫入目前存檔的長期記憶庫。")
}
function togglePinMemory(id){
 const m=current.memories.find(x=>x.id===id); if(!m)return;
 m.pinned=!m.pinned; saveCurrent(); renderMemories()
}
function deleteMemory(id){
 if(!confirm("刪除這段記憶？"))return;
 current.memories=current.memories.filter(x=>x.id!==id); saveCurrent(); renderMemories()
}
function summarizeMemories(){
 if(!current)return;
 const s=current.state;
 const high=current.memories.filter(m=>m.importance==="高"||m.pinned).slice(0,12).map(m=>`- ${m.title}：${m.content}`).join("\n");
 const summary=`截至 ${s.year}年${s.month}月，${s.ta}線的重要記憶摘要：\n${high||"目前尚無高重要度記憶。"}\n目前人生狀態：${s.lifeStage}。目前關係數值：心動${s.heart}、信任${s.trust}、親密${s.intimacy}、曝光風險${s.risk}。`;
 addMemory("長期記憶總整理",summary,"高",["摘要","長期記憶"]);
 saveCurrent();renderAll("【記憶整理完成】\n\n系統已把目前重要記憶整理成一段長期摘要。")
}
function fastForward(type){
 if(!current)return;
 const s=current.state;
 let title="",summary="";
 if(type==="month"){advanceTime(); title="時間快轉一個月"; summary=`時間推進到 ${s.year}年${s.month}月，${s.season}。你們的關係仍在現實與秘密之間延續。`}
 if(type==="season"){for(let i=0;i<12;i++)advanceTime(); title="時間快轉到下一季"; summary=`幾個月過去，行程與輿論換了一輪。現在是 ${s.year}年${s.month}月，${s.season}。`}
 if(type==="year"){for(let i=0;i<48;i++)advanceTime(); title="時間快轉一年"; summary=`一年過去，${s.ta} 的事業階段與你們的關係都留下了新的痕跡。現在是 ${s.year}年${s.month}月。`}
 if(type==="big"){
   const events=["回歸發表","海外巡演","年末舞台","品牌活動","公司會議","成員察覺升溫","粉圈考古重燃"];
   for(let i=0;i<rand([4,8,12,16]);i++)advanceTime();
   title=rand(events); summary=`時間推進到下一個大事件：${title}。地點與人物再次把你們推回同一條動線上。`;
   s.risk=clamp(s.risk+rand([2,4,6])); s.buzz=clamp(s.buzz+rand([1,3,5]));
 }
 s.round++;
 s.lifeStage=lifeStage();
 addTimeline(title,summary,"中");
 addMemory(title,summary,"中",["時間快轉"]);
 const text=`【${title}】\n\n${summary}\n\n這不是結局，只是人生線往前走了一段。`;
 current.storyLog.push(text); saveCurrent(); renderAll(text)
}
function downloadJSON(filename,obj){
 const blob=new Blob([JSON.stringify(obj,null,2)],{type:"application/json"});
 const url=URL.createObjectURL(blob);
 const a=document.createElement("a"); a.href=url; a.download=filename; a.click();
 setTimeout(()=>URL.revokeObjectURL(url),500);
}
function exportAllSaves(){downloadJSON("sasa-ultimate-v22-all-saves.json",{version:APP_VERSION,exportedAt:new Date().toISOString(),saves:getSaves()})}
function exportOneSave(id){const s=getSaves().find(x=>x.id===id); if(!s)return; downloadJSON(`${s.title||"sasa-save"}-ultimate-v22.json`,{version:APP_VERSION,exportedAt:new Date().toISOString(),saves:[s]})}
function importSavesFile(ev){
 const file=ev.target.files[0]; if(!file)return;
 const reader=new FileReader();
 reader.onload=()=>{
  try{
   const data=JSON.parse(reader.result);
   const incoming=Array.isArray(data)?data:(data.saves||[]);
   if(!incoming.length)throw new Error("no saves");
   const existing=getSaves();
   const merged=[...incoming.map(s=>({...s,id:s.id||uid(),importedAt:new Date().toISOString()})),...existing];
   const seen=new Set(); const unique=merged.filter(s=>{if(seen.has(s.id)){s.id=uid()} seen.add(s.id); return true});
   setSaves(unique); renderSaves();renderPWAStatus(); alert(`已匯入 ${incoming.length} 個存檔`);
  }catch(e){alert("匯入失敗：檔案格式不正確")}
 };
 reader.readAsText(file);
 ev.target.value="";
}

function renderMemories(){
 const sorted=[...current.memories].sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0)||memoryScore(b)-memoryScore(a)||b.turn-a.turn);
 document.getElementById("memories").innerHTML=sorted.map(x=>`<div class="memory-item ${x.pinned?'pinned':''}"><b>${x.pinned?'📌 ':''}${x.title}</b> <span class="tag">${x.importance}</span> <span class="weight">${Math.round(memoryScore(x))}</span><div class="small">${x.year}年${x.month}月｜回合${x.turn}</div><div>${x.content}</div><div>${(x.tags||[]).map(t=>`<span class="tag">${t}</span>`).join("")}</div><div class="row-actions"><button class="secondary mini" onclick="togglePinMemory('${x.id}')">${x.pinned?'取消釘選':'釘選'}</button><button class="danger mini" onclick="deleteMemory('${x.id}')">刪除</button></div></div>`).join("")||"<p class='muted'>尚無記憶。</p>"
}
function renderTimeline(){document.getElementById("timeline").innerHTML=current.timeline.map(x=>`<div class="timeline-item"><b>${x.year}年${x.month}月 第${x.week}週｜${x.title}</b><div>${x.summary}</div><span class="tag">${x.importance}</span></div>`).join("")}

function npcClass(v){
 if(v.stance==="幫忙隱瞞")return "help";
 if(v.stance==="理性提醒"||v.stance==="假裝不知道")return "warn";
 if(v.stance==="公司優先")return "block";
 return "";
}
function npcActionText(name,v){
 if(v.awareness>=80 && v.stance==="公司優先") return `${name} 已經接近介入臨界點，可能調整行程或切斷動線。`;
 if(v.awareness>=65 && v.stance==="幫忙隱瞞") return `${name} 大概看懂了，但目前傾向幫你們遮掩。`;
 if(v.awareness>=50) return `${name} 已開始注意你們的時間線與視線。`;
 if(v.awareness>=30) return `${name} 偶爾覺得奇怪，但還沒有證據。`;
 return `${name} 目前沒有明顯察覺。`;
}
function addGroupChat(title,messages){
 current.groupChats.unshift({id:uid(),year:current.state.year,month:current.state.month,title,messages});
 current.groupChats=current.groupChats.slice(0,50);
}
function triggerNpcScene(type){
 if(!current)return;
 const s=current.state;
 const entries=Object.entries(s.npcs);
 const members=entries.filter(([n,v])=>v.type==="member");
 const staff=entries.filter(([n,v])=>v.type==="staff");
 const helpers=entries.filter(([n,v])=>v.stance==="幫忙隱瞞");
 let text="", chosenName="", chosen;
 if(type==="member"){
   [chosenName,chosen]=rand(members.length?members:entries);
   chosen.awareness=clamp(chosen.awareness+18);
   s.risk=clamp(s.risk+5);
   text=`【NPC事件｜成員察覺】\n\n${chosenName}在後台門口停了一下。\n\n他沒有直接問你們是不是有什麼，只是看著桌上那兩杯一樣的咖啡，又看了看${s.ta}。\n\n「你們最近……很常一起出現欸。」\n\n語氣像玩笑，卻讓空氣短暫安靜。\n\n${s.ta}很快接話：「行程撞到而已。」\n\n${chosenName}笑了一下，沒有拆穿。\n\n【影響】${chosenName}察覺度上升到 ${chosen.awareness}。`;
   addMemory("NPC察覺升溫",`${chosenName} 對你和 ${s.ta} 的關係更加懷疑。`, "高", ["NPC","察覺"]);
 }
 if(type==="manager"){
   [chosenName,chosen]=staff.find(([n])=>n==="經紀人")||rand(staff.length?staff:entries);
   chosen.awareness=clamp(chosen.awareness+22); chosen.pressure=clamp((chosen.pressure||0)+12);
   s.pressure=clamp(s.pressure+8); s.risk=clamp(s.risk+6);
   text=`【NPC事件｜經紀人干預】\n\n${chosenName}把新的動線表傳到群組。\n\n你原本會和${s.ta}有三分鐘獨處的後台通道，被改成另一條路線。\n\n沒有解釋。\n\n只是最後補了一句：\n\n「最近所有人都注意一點，別留下奇怪的畫面。」\n\n${s.ta}看了一眼手機，沒有立刻回覆。`;
   addMemory("經紀人干預",`${chosenName} 調整動線，疑似察覺你和 ${s.ta} 的距離。`, "高", ["公司","NPC"]);
 }
 if(type==="helper"){
   [chosenName,chosen]=rand(helpers.length?helpers:members.length?members:entries);
   chosen.stance="幫忙隱瞞"; chosen.closeness=clamp((chosen.closeness||0)+15); chosen.awareness=clamp(chosen.awareness+10);
   s.trust=clamp(s.trust+4); s.risk=clamp(s.risk-3);
   text=`【NPC事件｜幫忙隱瞞】\n\n工作人員突然往你們這邊走來時，${chosenName}先一步開口。\n\n「啊，${s.ta}，你剛剛不是說要確認下一段 Challenge？」\n\n一句話，把所有人的注意力都帶走了。\n\n你看向${chosenName}，對方只是很淡地眨了一下眼，像什麼都沒發生。\n\n【影響】${chosenName} 立場變為「幫忙隱瞞」。`;
   addMemory("有人幫忙隱瞞",`${chosenName} 主動替你和 ${s.ta} 解圍。`, "高", ["NPC","共犯"]);
 }
 if(type==="chat"){
   const a=rand(entries)[0], b=rand(entries)[0], c=rand(entries)[0];
   addGroupChat("後台工作群 / 成員群",[
    `${a}：誰拿了我的外套？`,
    `${b}：不是我`,
    `${c}：先看是不是你自己放在沙發上`,
    `${a}：……找到了`,
    `經紀人：等一下 Challenge 動線不要亂跑`,
    `${b}：收到`,
    `${s.ta}：收到`
   ]);
   text=`【群聊生成】\n\n你收到一串新的群聊訊息。\n\n內容看起來普通，卻把下一段動線壓得更緊。\n\n${s.ta}只回了「收到」。\n\n你看著那兩個字，忽然分不清他是在回工作，還是在提醒你別靠近。`;
 }
 if(!text)return;
 s.round++; advanceTime(); s.lifeStage=lifeStage();
 current.storyLog.push(text); addTimeline("NPC事件",text.slice(0,120)+"...","中");
 saveCurrent(); renderAll(text);
}

function adjustNpc(name,key,delta){
 if(!current||!current.state.npcs[name])return;
 current.state.npcs[name][key]=clamp((current.state.npcs[name][key]||0)+delta);
 saveCurrent(); renderNPCs(); renderStatus();
}
function setNpcStance(name,stance){
 if(!current||!current.state.npcs[name])return;
 current.state.npcs[name].stance=stance;
 addMemory("NPC立場變化",`${name} 的立場變為「${stance}」。`,"中",["NPC","立場"]);
 saveCurrent(); renderNPCs(); renderMemories();
}
function renderNPCs(){
 const s=current.state;
 document.getElementById("npcs").innerHTML=Object.entries(s.npcs).sort((a,b)=>b[1].awareness-a[1].awareness).map(([n,v])=>`<div class="npc-item ${npcClass(v)}"><b>${n}</b> <span class="tag">${v.type||"npc"}</span><div>察覺度：${v.awareness}%｜親近度：${v.closeness||0}%｜壓力值：${v.pressure||0}%</div><div>立場：${v.stance}</div><div class="small">${npcActionText(n,v)}</div><div class="row-actions"><button class="secondary mini" onclick="adjustNpc('${n}','awareness',10)">察覺+10</button><button class="secondary mini" onclick="adjustNpc('${n}','awareness',-10)">察覺-10</button><button class="secondary mini" onclick="setNpcStance('${n}','幫忙隱瞞')">設為幫忙</button><button class="secondary mini" onclick="setNpcStance('${n}','公司優先')">設為公司優先</button></div></div>`).join("");
 const chats=current.groupChats||[];
 document.getElementById("groupChats").innerHTML=chats.map(c=>`<div class="chatbox"><b>${c.title}</b><div class="small">${c.year}年${c.month}月</div>${c.messages.map(m=>`<div class="msg">${m.replace("：","：<br>")}</div>`).join("")}</div>`).join("")||"<p class='muted'>尚無群聊。</p>";
}


function addPhotoVault(source,desc,risk=10){
 const s=current.state;
 const item={id:uid(),year:s.year,month:s.month,week:s.week,source,desc,risk,used:false};
 s.photoVault.unshift(item);
 s.photoVault=s.photoVault.slice(0,80);
 s.proofLevel=clamp((s.proofLevel||0)+Math.ceil(risk/3));
 addMemory("偷拍庫新增",`${source} 留下可能被未來翻出的畫面：${desc}`,"高",["偷拍庫","粉圈"]);
}
function updateWatcher(name,deltaAw=0,deltaTrack=0){
 const w=(current.state.watchers||[]).find(x=>x.name===name);
 if(!w)return;
 w.awareness=clamp(w.awareness+deltaAw);
 w.tracking=clamp(w.tracking+deltaTrack);
 if(w.awareness>75 && Math.random()<0.35)addPhotoVault(w.name,`${w.type}疑似拍到你和TA出現在同一條動線`,Math.ceil(w.danger/5));
}
function triggerXEvent(type){
 if(!current)return;
 const s=current.state;
 const acc=rand(s.xAccounts||[]);
 let title="", text="", comments=[];
 if(type==="archive"){
   acc.focus=clamp(acc.focus+18); s.xHeat=clamp((s.xHeat||0)+16); s.fandomHeat=clamp((s.fandomHeat||0)+12); s.proofLevel=clamp((s.proofLevel||0)+8);
   title=`${acc.handle} 搬運後台截圖`;
   text=`${acc.handle} 發了一張模糊截圖，說「這張後台邊角是不是有點眼熟？」\n\n圖片沒有拍清楚你，卻拍到一個足夠讓人放大的輪廓。`;
   comments=["放大看好像有人","別獵巫素人","這帳號每次都很會帶風向","先存圖"];
 }
 if(type==="cp"){
   acc.focus=clamp(acc.focus+25); s.xHeat=clamp((s.xHeat||0)+22); s.proofLevel=clamp((s.proofLevel||0)+14); s.fandomSplit=clamp((s.fandomSplit||0)+10);
   title=`CP粉整理時間線`;
   text=`一個CP粉帳號整理了三個日期：Bubble、同款小物、同一天出現在相近地點。\n\n每一項單獨看都能解釋，放在一起卻很難不讓人多想。`;
   comments=["這糖我先嗑為敬","不要把真人戀愛當糖","時間線有點太巧","刪掉吧會害到人"];
 }
 addSNS("X / Twitter",title,comments);
 current.storyLog.push(`【X事件｜${title}】\n\n${text}\n\nX 的傳播速度比韓網更快，幾分鐘內就有人截圖備份。`);
 s.round++; advanceTime(); s.lifeStage=lifeStage(); saveCurrent(); renderAll(current.storyLog.at(-1));
}
function triggerFansite(type){
 if(!current)return;
 const s=current.state;
 const candidates=type==="sasaeng" ? s.watchers.filter(w=>w.type==="私生"||w.type==="代拍") : s.watchers.filter(w=>w.type!=="媒體線人");
 const w=rand(candidates.length?candidates:s.watchers);
 w.awareness=clamp(w.awareness+(type==="sasaeng"?24:14));
 w.tracking=clamp(w.tracking+(type==="sasaeng"?10:5));
 s.risk=clamp(s.risk+(type==="sasaeng"?14:8));
 s.dispatchFocus=clamp((s.dispatchFocus||0)+(type==="sasaeng"?8:3));
 const desc=type==="sasaeng"?`${w.name} 跟到地下停車場，疑似拍到你和TA前後上車`:`${w.name} 的飯拍邊角出現你的一小部分身影`;
 addPhotoVault(w.name,desc,type==="sasaeng"?24:14);
 const story=`【站姐系統｜${w.name}】\n\n${desc}。\n\n這張圖現在還沒有公開，但它已經存在於某個資料夾裡。\n\n真正可怕的不是現在被看見，而是很久以後被翻出來。`;
 current.storyLog.push(story); s.round++; advanceTime(); s.lifeStage=lifeStage(); saveCurrent(); renderAll(story);
}
function triggerDispatch(){
 if(!current)return;
 const s=current.state;
 const line=(s.watchers||[]).find(w=>w.type==="媒體線人");
 if(line){line.awareness=clamp(line.awareness+18);line.tracking=clamp(line.tracking+8)}
 s.dispatchFocus=clamp((s.dispatchFocus||0)+22);
 s.pressure=clamp(s.pressure+12);
 let story="";
 if(s.dispatchFocus<50){
  story=`【Dispatch｜匿名線索】\n\nD社還沒有正式跟拍，但已經收到一條模糊線索。\n\n內容很短：\n「${s.group} 某成員最近有固定見面的人。」`;
 }else if(s.dispatchFocus<85){
  story=`【Dispatch｜開始追查】\n\n有人開始比對你的出入時間、TA的行程空檔，以及幾張沒有公開的照片。\n\n還沒有實錘。\n\n但「沒有實錘」只是暫時。`;
  addPhotoVault("Dispatch",`媒體疑似掌握你和TA相近時間出入的畫面`,28);
 }else{
  story=`【Dispatch｜爆料準備中】\n\n你收到一則沒有署名的訊息。\n\n「明天早上十點，請確認公司會怎麼處理。」\n\nTA的電話在同一時間打來，響了很久。`;
  s.proofLevel=clamp((s.proofLevel||0)+35); s.searchRank=clamp((s.searchRank||0)+30); s.buzz=clamp(s.buzz+25);
  addMemory("Dispatch爆料臨界",`Dispatch 關注度已接近爆料臨界。`, "高", ["Dispatch","危機"]);
 }
 current.storyLog.push(story); s.round++; advanceTime(); s.lifeStage=lifeStage(); saveCurrent(); renderAll(story);
}
function attemptTrendWash(){
 if(!current)return;
 const s=current.state;
 const hashtags=[`#${String(s.group).replace(/\\s/g,"")}`,`#${String(s.ta).replace(/\\s/g,"")}`,`#${String(s.group).replace(/\\s/g,"")}_COMEBACK`,"#ProtectIdol"];
 const power=rand([18,22,28,35]);
 s.trendWashPower=clamp((s.trendWashPower||0)+power);
 const success=(s.trendWashPower||0)>(s.proofLevel||0)+(s.xHeat||0)/2;
 if(success){s.xHeat=clamp((s.xHeat||0)-20);s.searchRank=clamp((s.searchRank||0)-12);s.fandomHeat=clamp((s.fandomHeat||0)-10)}
 else{s.fandomSplit=clamp((s.fandomSplit||0)+10);s.xHeat=clamp((s.xHeat||0)+6)}
 addSNS("X / Twitter 洗廣場",success?"洗廣場暫時成功":"洗廣場失敗，反而引起路人注意",hashtags);
 const story=`【X洗廣場】\n\n${s.fandom} 開始刷：\n${hashtags.join("\\n")}\n\n${success?"短時間內，搜尋結果被舞台剪輯和安利圖蓋過去。":"但因為疑點太集中，洗廣場反而讓更多人問：到底發生什麼事？"}`;
 current.storyLog.push(story); s.round++; advanceTime(); s.lifeStage=lifeStage(); saveCurrent(); renderAll(story);
}

function fandomLevel(){
 const s=current.state;
 const score=(s.fandomHeat||0)+(s.searchRank||0)+(s.proofLevel||0)+(s.fandomSplit||0)+Math.floor((s.risk||0)/2);
 if(score>=260)return ["爆炸","hot"];
 if(score>=190)return ["危機","hot"];
 if(score>=120)return ["升溫","mild"];
 if(score>=60)return ["低熱度","mild"];
 return ["平靜","safe"];
}
function fandomComments(type){
 const s=current.state;
 const name=s.ta, fandom=s.fandom;
 const pools={
  bubble:[`今天這句也太像暗號了吧`,`不要什麼都往戀愛想好嗎`,`但 ${name} 最近 Bubble 真的怪怪的`,`粉絲福利啦，別發散`],
  threads:[`時間線有人整理了嗎`,`這個角度也能嗑？`,`不是吧同一天同地點？`,`拜託先不要搬去外網`],
  theqoo:[`ㅋㅋ 又開始了`,`有圖嗎 沒圖別造謠`,`戀愛也不是罪吧`,`粉絲應該會崩`,`公司快出來管一下`],
  naver:[`${name} 狀態 相關搜尋上升`,`不是實錘但討論變多了`,`${fandom} 正在洗廣場`,`記者不要亂寫`],
  sameitem:[`同款耳機？`,`這牌子很多人用吧`,`可是貼紙位置一樣欸`,`別把素人拖進來`],
  dispatch:[`今天怎麼有人說有預告`,`別嚇我`,`公司最好快處理`,`如果是真的就完了`],
  company:[`聲明也太制式`,`否認得很模糊欸`,`相信公司`,`這種聲明通常代表有事？`],
  wash:[`請大家不要轉傳未確認消息`,`專注回歸！`,`把舞台剪輯刷起來`,`黑粉不要帶節奏`]
 };
 return pools[type]||pools.threads;
}
function triggerFandom(type){
 if(!current)return;
 const s=current.state;
 let title="", platform="", text="", comments=fandomComments(type);
 if(type==="bubble"){
  platform="Bubble"; title=`${s.ta} 更新疑似暗號`;
  text=`【Bubble】\n${s.ta}：今天也要好好吃飯。\n\n這句話在粉絲眼裡是普通關心，卻剛好接上你幾分鐘前傳給TA的訊息。`;
  s.fandomHeat=clamp((s.fandomHeat||0)+8); s.proofLevel=clamp((s.proofLevel||0)+4); s.buzz=clamp(s.buzz+5);
 }
 if(type==="threads"){
  platform="Threads"; title=`時間線搬運帖開始擴散`;
  text=`有人把最近三次 Bubble、兩張後台圖和一個模糊反光截圖整理在同一篇串文裡。\n\n沒有實錘，卻足夠讓人停下來多看幾秒。`;
  s.fandomHeat=clamp((s.fandomHeat||0)+14); s.proofLevel=clamp((s.proofLevel||0)+8); s.buzz=clamp(s.buzz+8);
 }
 if(type==="theqoo"){
  platform="Theqoo"; title=`韓網討論串出現`;
  text=`標題沒有直接點名，只寫著：「某團成員最近是不是有點奇怪？」\n\n留言一半在笑，一半在勸刪，還有人開始比對行程。`;
  s.fandomHeat=clamp((s.fandomHeat||0)+18); s.fandomSplit=clamp((s.fandomSplit||0)+8); s.buzz=clamp(s.buzz+10);
 }
 if(type==="naver"){
  platform="Naver"; title=`相關搜尋上升`;
  text=`Naver 相關搜尋裡出現了 ${s.ta} 的名字和「戀愛」「同款」「Bubble」等字眼。\n\n公司內部群組開始安靜得不自然。`;
  s.searchRank=clamp((s.searchRank||0)+26); s.pressure=clamp(s.pressure+10); s.buzz=clamp(s.buzz+14);
 }
 if(type==="sameitem"){
  platform="X / Threads"; title=`同款考古`;
  text=`有人發現TA最近常用的一個小物，和你舊限動裡出現過的東西很像。\n\n單看只是巧合，放進時間線裡卻變得危險。`;
  s.proofLevel=clamp((s.proofLevel||0)+18); s.risk=clamp(s.risk+10); s.fandomHeat=clamp((s.fandomHeat||0)+10);
  addMemory("同款考古",`粉絲開始比對 ${s.ta} 和你的同款物品。`, "高", ["粉圈","同款"]);
 }
 if(type==="dispatch"){
  platform="匿名爆料"; title=`爆料預告`;
  text=`一個陌生帳號發出模糊照片，只寫：「明天早上十點。」\n\n照片裡看不清人，卻能看出背景像是你們最近去過的地方。`;
  s.proofLevel=clamp((s.proofLevel||0)+30); s.risk=clamp(s.risk+18); s.pressure=clamp(s.pressure+16); s.fandomHeat=clamp((s.fandomHeat||0)+25);
  addMemory("爆料預告",`陌生帳號發出疑似與你和 ${s.ta} 有關的爆料預告。`, "高", ["危機","爆料"]);
 }
 if(type==="company"){
  platform="公司聲明"; title=`${s.company} 發出回應`;
  const denial=s.proofLevel<60;
  s.companyStatement=denial?"否認戀愛傳聞，表示只是行程相關誤會。":"表示正在確認事實，請勿散布未經證實內容。";
  text=`【${s.company} 聲明】\n${s.companyStatement}\n\n聲明發出後，粉圈沒有真正安靜，反而開始拆每一個字。`;
  s.pressure=clamp(s.pressure+12); s.fandomSplit=clamp((s.fandomSplit||0)+12);
  addMemory("公司聲明",`${s.company} 對傳聞發出聲明：${s.companyStatement}`, "高", ["公司","聲明"]);
 }
 if(type==="wash"){
  platform="粉絲行動"; title=`${s.fandom} 開始洗廣場`;
  text=`粉絲開始大量刷舞台剪輯、安利圖和正向關鍵字，試圖把討論壓下去。\n\n短時間內有效，但也讓更多路人注意到這件事。`;
  s.fandomHeat=clamp((s.fandomHeat||0)-8); s.searchRank=clamp((s.searchRank||0)-5); s.fandomSplit=clamp((s.fandomSplit||0)+4);
 }
 addSNS(platform,title,comments);
 const level=fandomLevel()[0];
 const story=`【粉圈事件｜${title}】\n\n${text}\n\n【目前輿論等級】${level}\n\n這不是結局，只是粉圈開始替你們寫另一條時間線。`;
 current.storyLog.push(story);
 s.round++; advanceTime(); s.lifeStage=lifeStage();
 addTimeline("粉圈事件",`${platform}：${title}`,"中");
 saveCurrent(); renderAll(story);
}
function renderFandomDash(){
 const s=current.state; const [lv,cls]=fandomLevel();
 const el=document.getElementById("fandomDash"); if(!el)return;
 const m=(n,v,type="")=>`<div class="meter ${type}"><div class="meter-row"><span>${n}</span><b>${v}</b></div><div class="bar"><div class="fill ${type==='hot'?'danger':type==='safe'?'good':''}" style="width:${v}%"></div></div></div>`;
 el.innerHTML=`<div class="card ${cls}" style="background:#101520"><h3>目前輿論等級：${lv}</h3><span class="pill">公司聲明：${s.companyStatement||"尚未回應"}</span></div>${m("粉圈熱度",s.fandomHeat||0,cls)}${m("X熱度",s.xHeat||0,cls)}${m("Naver熱搜",s.searchRank||0,cls)}${m("實錘程度",s.proofLevel||0,cls)}${m("韓網反感",s.knetzMood||0,cls)}${m("國際粉同情",s.ifansMood||0,"safe")}${m("Dispatch關注",s.dispatchFocus||0,cls)}${m("粉圈分裂",s.fandomSplit||0,cls)}`;
 renderThreats();
 renderXTrends();
 renderPhotoVault();
}

function renderXTrends(){
 const s=current.state; const el=document.getElementById("xTrends"); if(!el)return;
 const trends=[
  [`#${String(s.group).replace(/\s/g,"")}`,s.xHeat||0],
  [`#${String(s.ta).replace(/\s/g,"")}`,Math.max(s.xHeat||0,s.searchRank||0)],
  ["#DatingRumor",s.proofLevel||0],
  ["#Bubble",s.fandomHeat||0],
  [`#${String(s.group).replace(/\s/g,"")}_COMEBACK`,s.trendWashPower||0]
 ].sort((a,b)=>b[1]-a[1]);
 el.innerHTML=`<div class="card" style="background:#101520">${trends.map((t,i)=>`<div class="trend"><b>#${i+1} ${t[0]}</b><span>${t[1]}</span></div>`).join("")}</div>`;
}
function renderThreats(){
 const s=current.state; const el=document.getElementById("threats"); if(!el)return;
 const watchers=s.watchers||[];
 el.innerHTML=watchers.map(w=>{
  const cls=w.danger>80||w.awareness>75?"high":w.danger>55||w.awareness>45?"mid":"low";
  return `<div class="threat ${cls}"><b>${w.name}</b> <span class="tag">${w.type}</span><div>察覺度：${w.awareness}%｜跟拍能力：${w.tracking}%｜爆料機率：${w.leak}%｜危險度：${w.danger}%</div><div class="small">立場：${w.stance}</div></div>`
 }).join("");
}
function renderPhotoVault(){
 const s=current.state; const el=document.getElementById("photoVault"); if(!el)return;
 const vault=s.photoVault||[];
 el.innerHTML=vault.length?vault.map(p=>`<div class="photo"><b>${p.year}年${p.month}月｜${p.source}</b><div>${p.desc}</div><span class="tag">風險 ${p.risk}</span><span class="tag">${p.used?"已被翻出":"未公開"}</span></div>`).join(""):"<p class='muted'>目前偷拍庫沒有紀錄。</p>";
}
function renderSNS(){
 renderFandomDash();
 document.getElementById("sns").innerHTML=current.sns.map(x=>`<div class="platform"><b>${x.platform}｜${x.title}</b><div class="small">${x.year}年${x.month}月</div><ul>${x.comments.map(c=>`<li>${c}</li>`).join("")}</ul></div>`).join("")||"<p class='muted'>目前沒有明顯粉圈動態。</p>"
}

function addLifeEvent(title,desc,type="major"){
 const s=current.state;
 const ev={id:uid(),year:s.year,month:s.month,week:s.week,title,desc,type};
 s.lifeEvents.unshift(ev);
 s.lifeEvents=s.lifeEvents.slice(0,80);
 addTimeline(title,desc,"高");
 addMemory(title,desc,"高",["人生事件",type]);
}
function triggerLifeEvent(type){
 if(!current)return;
 const s=current.state;
 let title="", desc="", story="", cls="major";
 if(type==="cohabit"){
  s.cohabitation=clamp((s.cohabitation||0)+22); s.intimacy=clamp(s.intimacy+8); s.stayRisk=clamp(s.stayRisk+10); s.risk=clamp(s.risk+5);
  title="同居傾向升溫";
  desc=`你和 ${s.ta} 開始在彼此生活裡留下越來越多痕跡：備用牙刷、外帶咖啡習慣、換季外套，以及不用說出口也知道的位置。`;
  story=`【人生事件｜同居線】\n\n${desc}\n\n這不是正式同居，卻已經不像普通留宿。\n\n真正危險的是，習慣會比照片更難藏。`;
 }
 if(type==="public"){
  s.publicStatus="公開危機"; s.risk=clamp(s.risk+18); s.buzz=clamp(s.buzz+22); s.fandomHeat=clamp((s.fandomHeat||0)+20); s.searchRank=clamp((s.searchRank||0)+18);
  title="公開戀愛危機";
  desc=`你和 ${s.ta} 的關係被推到公開邊緣。公司、粉圈與成員都開始等待下一步。`;
  story=`【人生事件｜公開危機】\n\nNaver 搜尋上升，X 趨勢開始出現 ${s.ta} 的名字。\n\n經紀人的電話一通接一通。\n\n${s.ta}傳來一則訊息：\n「不要先看留言。」\n\n可是你已經看到了。`;
  cls="crisis";
 }
 if(type==="confirmPublic"){
  s.publicStatus="已公開"; s.risk=clamp(s.risk-15); s.buzz=clamp(s.buzz+25); s.trust=clamp(s.trust+15); s.pressure=clamp(s.pressure+20); s.companyStatement="承認雙方正在以好感交往，請給予溫暖視線。";
  title="公開戀愛";
  desc=`公司承認你和 ${s.ta} 正在交往。從這一刻起，你們第一次不用在所有鏡頭前裝作陌生人。`;
  story=`【人生事件｜公開戀愛】\n\n公司聲明發出的那一刻，手機像失控一樣震動。\n\n有人祝福，有人失望，有人翻舊帳。\n\n${s.ta}沒有立刻發文，只是在很久之後傳來一句：\n「至少現在，我可以正大光明問你吃飯了嗎？」`;
 }
 if(type==="secretMarriage"){
  s.marriageStatus="秘密結婚"; s.marriage=clamp(s.marriage+45); s.trust=clamp(s.trust+20); s.risk=clamp(s.risk+10); s.pressure=clamp(s.pressure+10);
  title="秘密結婚";
  desc=`你和 ${s.ta} 在極少數人知道的情況下完成了人生約定。外界仍以為你們只是各自生活。`;
  story=`【人生事件｜秘密結婚】\n\n沒有盛大的公開婚禮，沒有媒體照，甚至沒有能發出去的合照。\n\n只有一個很小的房間、幾句壓低的祝福，和 ${s.ta} 握著你手時微微發緊的指節。\n\n「這次不是暗號。」TA說。\n\n「是真的。」`;
 }
 if(type==="publicMarriage"){
  s.marriageStatus="公開結婚"; s.publicStatus="已公開"; s.marriage=clamp(s.marriage+55); s.buzz=clamp(s.buzz+35); s.pressure=clamp(s.pressure+22); s.familyRisk=clamp(s.familyRisk+12);
  title="公開結婚";
  desc=`你和 ${s.ta} 的婚姻被公開。祝福與惡意同時湧進來，但人生線不會因此結束。`;
  story=`【人生事件｜公開結婚】\n\n聲明比你想像中短。\n\n但那幾行字，足夠把你們多年來藏起來的人生推到所有人面前。\n\n留言刷新得太快，你看不清每一句。\n\n${s.ta}只是把手機倒扣，說：「先看我。」`;
 }
 if(type==="family"){
  if(s.familyMode==="off"){story="【系統提示】家庭線目前關閉。可在新遊戲開啟，或把家庭線視為未來可開。"; renderAll(story); return}
  s.familyStatus=s.familyStatus==="未開啟"?"家庭線開啟":"家庭生活"; s.familyRisk=clamp(s.familyRisk+18); s.marriage=clamp(s.marriage+8); s.pressure=clamp(s.pressure+10);
  title="家庭線事件";
  desc=`你和 ${s.ta} 開始面對不只屬於兩個人的人生：家人、孩子、公開與保護。`;
  story=`【人生事件｜家庭線】\n\n家裡多了一個不能被外界知道的小習慣。\n\n鞋櫃、餐桌、行李箱，全都開始出現另一種生活痕跡。\n\n${s.ta}看著客廳裡的燈，忽然說：「以前我以為，能一起回家就很奢侈。」`;
  cls="family";
 }
 if(type==="careerShift"){
  s.careerStage=rand(["演員轉型","Solo活動期","成立個人工作室","退團不退圈","幕後製作期"]); s.pressure=clamp(s.pressure-10); s.buzz=clamp(s.buzz+10);
  title="事業轉型";
  desc=`${s.ta} 進入「${s.careerStage}」。偶像人生沒有結束，只是換了一種被世界觀看的方式。`;
  story=`【人生事件｜事業轉型】\n\n舞台燈光沒有消失，只是變成了另一種方向。\n\n${s.ta}不再每天被回歸期追著跑，卻開始面對新的質疑。\n\n你們的關係也因此有了新的空隙和新的自由。`;
 }
 if(type==="retire"){
  s.retirementStage=rand(["半退休生活","海外定居","共同創業","紀錄片回顧期","圈內傳說期"]); s.pressure=clamp(s.pressure-25); s.buzz=clamp(s.buzz-15); s.year=Math.max(s.year,2040);
  title="退休後人生";
  desc=`多年後，${s.ta} 進入「${s.retirementStage}」。你們不再只是躲避鏡頭的人，而是擁有完整人生的人。`;
  story=`【人生事件｜退休後】\n\n很多年後，新一代粉絲在紀錄片裡看見 ${s.ta} 年輕時的舞台。\n\n有人留言：\n「原來那時候他真的有一個很重要的人。」\n\n你坐在旁邊，聽見TA很輕地笑了一聲。\n\n「他們現在才知道。」`;
  cls="retire";
 }
 if(!story)return;
 s.round++; advanceTime(); s.lifeStage=lifeStage();
 addLifeEvent(title,desc,cls);
 current.storyLog.push(story);
 saveCurrent(); renderAll(story);
}


function currentEra(){
 const s=current.state;
 const cy=s.careerYear||Math.max(1,(s.year||2026)-(s.debutYear||2023)+1);
 if(cy<=2)return "新人期";
 if(cy<=5)return "成長/爆紅期";
 if(cy<=7)return "續約壓力期";
 if(cy<=10)return "轉型分歧期";
 if(cy<=15)return "成熟前輩期";
 if(cy<=25)return "圈內傳說期";
 return "人生後半場";
}
function addLifeChapter(title,desc,status="current"){
 const s=current.state;
 s.lifeChapters.unshift({id:uid(),year:s.year,month:s.month,careerYear:s.careerYear,title,desc,status});
 s.lifeChapters=s.lifeChapters.slice(0,80);
}
function addMilestone(title,desc,type="人生"){
 const s=current.state;
 s.lifeMilestones.unshift({id:uid(),year:s.year,month:s.month,careerYear:s.careerYear,title,desc,type});
 s.lifeMilestones=s.lifeMilestones.slice(0,100);
 addMemory("長期人生里程碑",`${title}：${desc}`,"高",["長期人生",type]);
}
function addFuturePath(title,desc,prob=50){
 const s=current.state;
 const old=(s.futurePaths||[]).find(x=>x.title===title);
 if(old){old.prob=clamp((old.prob||50)+prob-50);old.desc=desc;return}
 s.futurePaths.unshift({id:uid(),title,desc,prob:clamp(prob),active:true});
 s.futurePaths=s.futurePaths.slice(0,20);
}
function syncCareerYear(){
 const s=current.state;
 s.careerYear=Math.max(1,(s.year||2026)-(s.debutYear||2023)+1);
}
function lifeFastForward(years=1){
 if(!current)return;
 const s=current.state;
 s.year+=years; 
 if(s.worldClock){s.worldClock.year=s.year;s.worldClock.month=s.month||1;s.worldClock.day=rand([1,7,14,21]);s.worldClock.hour=rand([10,15,22]);}
 syncCareerYear();
 s.pressure=clamp(s.pressure+rand([-8,-4,0,6,10]));
 s.buzz=clamp(s.buzz+rand([-10,-5,0,5,12]));
 const era=currentEra();
 const title=`快轉 ${years} 年｜${era}`;
 const desc=`時間來到 ${s.year} 年，${s.ta} 進入出道第 ${s.careerYear} 年：${era}。你們的關係不是結束，而是被新的年齡、事業與世界重新定義。`;
 addLifeChapter(title,desc,"current");
 addMilestone(title,desc,"快轉");
 if(s.careerYear>=7 && s.contractStatus==="首約進行中") addFuturePath("續約/退團分歧", "出道第七年前後，團體合約與個人路線會開始成為重大分歧。", 72);
 if(s.careerYear>=10) addFuturePath("轉型或個人工作室", "偶像身份逐漸轉向演員、Solo、幕後、品牌或工作室。", 68);
 if(s.marriageStatus!=="未婚") addFuturePath("家庭公開壓力", "長期伴侶或婚姻狀態會逐漸難以完全隱藏。", 64);
 s.lifeStage=lifeStage();
 const story=`【長期人生快轉】\n\n${desc}\n\n有些事情被歲月磨平，有些伏筆卻因為時間變得更重。\n\n這不是 END。\n\n只是下一個人生章節。`;
 current.storyLog.push(story); saveCurrent(); renderAll(story);
}
function triggerLongLife(type){
 if(!current)return;
 const s=current.state;
 syncCareerYear();
 let title="",desc="",story="";
 if(type==="debutAnniv"){
  title=`出道第 ${s.careerYear} 年紀念`;
  desc=`${s.group} 迎來出道第 ${s.careerYear} 年。粉絲剪了回顧影片，某些舊舞台和舊Bubble也被重新翻出。`;
  s.buzz=clamp(s.buzz+8);
 }
 if(type==="contract"){
  title="續約/退團分歧";
  const choices=["全員續約","部分成員不續約","個人約與團體約分離","成立個人工作室但保留團體活動"];
  s.contractStatus=rand(choices);
  desc=`續約結果走向「${s.contractStatus}」。公司、成員、粉圈與你們的未來都被迫重新排列。`;
  s.pressure=clamp(s.pressure+18); s.companyState.alert=clamp((s.companyState.alert||0)+18);
  addFuturePath("續約後人生",`目前續約狀態：${s.contractStatus}。後續可能影響公開、巡演、同居與海外生活。`,70);
 }
 if(type==="service"){
  title="兵役/休整期";
  desc=`長時間空白期到來。舞台變少，私下時間變多，但距離、等待與不安也被放大。`;
  s.pressure=clamp(s.pressure-8); s.trust=clamp(s.trust+rand([-4,4,8])); s.mainPersonality.shadow=clamp((s.mainPersonality.shadow||0)+rand([0,5,10]));
  addFuturePath("等待線", "長期空白期會考驗信任，也可能讓關係第一次真正像普通戀人。", 66);
 }
 if(type==="studio"){
  title="成立個人工作室";
  s.careerStage="個人工作室期";
  desc=`${s.ta} 開始擁有更多自主權。公司管控下降，但責任與外界審視轉移到TA自己身上。`;
  s.pressure=clamp(s.pressure+5); s.companyState.control=clamp((s.companyState.control||70)-18); s.mainPersonality.publicWillingness=clamp((s.mainPersonality.publicWillingness||30)+8);
  addFuturePath("共同創業/幕後線", "你可能成為生活上的支柱，也可能被捲入事業決策。", 58);
 }
 if(type==="migration"){
  title="海外定居/移民";
  s.retirementStage="海外生活準備";
  desc=`你們開始討論離韓國更遠的生活。不是逃跑，而是把人生從鏡頭裡慢慢拿回來。`;
  s.risk=clamp(s.risk-12); s.buzz=clamp(s.buzz-10); s.familyRisk=clamp(s.familyRisk-5);
  addFuturePath("海外定居線", "遠離韓娛核心後，關係更自由，但也會面臨孤獨、語言與職涯轉換。", 74);
 }
 if(type==="documentary"){
  title="紀錄片回顧";
  desc=`多年後，紀錄片剪進了年輕時的舞台、機場、後台與一閃而過的模糊畫面。新粉開始問：那時候TA身邊是不是一直有一個人？`;
  s.buzz=clamp(s.buzz+18); s.proofLevel=clamp((s.proofLevel||0)+10);
  addFuturePath("傳說回顧線", "過去的秘密可能在多年後以溫柔或殘酷的方式被重新閱讀。", 62);
 }
 story=`【長期人生事件｜${title}】\n\n${desc}\n\n你們沒有停在某個結局裡。\n\n時間繼續往前，愛、事業、秘密和公開都變成更長的人生題目。`;
 s.round++; if(s.worldClock)updateWorldClock("month"); syncCareerYear(); s.lifeStage=lifeStage();
 addMilestone(title,desc,"長期事件");
 addLifeChapter(title,desc,"current");
 current.storyLog.push(story); saveCurrent(); renderAll(story);
}

function renderLife(){
 const s=current.state;
 document.getElementById("life").innerHTML=`<div class="life-card major"><b>目前人生狀態：${s.lifeStage}</b><br>
時間：${s.year}年${s.month}月 第${s.week}週｜${s.season}<br>
公開狀態：${s.publicStatus}<br>
婚姻狀態：${s.marriageStatus}<br>
家庭狀態：${s.familyStatus}<br>
事業階段：${s.careerStage}<br>
退休階段：${s.retirementStage}<br>
出道年：${s.debutYear}｜出道年資：第 ${s.careerYear||Math.max(1,(s.year||2026)-(s.debutYear||2023)+1)} 年｜目前時代：${currentEra()}<br>
合約狀態：${s.contractStatus}<br>
同居傾向：${s.cohabitation||0}%<br>
家庭線：${s.familyMode}
公開狀態：${s.publicStatus}
婚姻狀態：${s.marriageStatus}
家庭狀態：${s.familyStatus}
事業階段：${s.careerStage}
退休階段：${s.retirementStage}
出道年：${s.debutYear}
出道年資：${s.careerYear}
合約狀態：${s.contractStatus}
目前時代：${typeof currentEra==="function"?currentEra():""}
同居傾向：${s.cohabitation||0}
人生章節：${(s.lifeChapters||[]).slice(0,8).map(c=>`${c.year} ${c.title}`).join("；")||"無"}
長期里程碑：${(s.lifeMilestones||[]).slice(0,10).map(m=>`${m.year}.${m.month} ${m.title}:${m.desc}`).join("；")||"無"}
未來路線：${(s.futurePaths||[]).slice(0,10).map(p=>`${p.title}/${p.prob}%:${p.desc}`).join("；")||"無"}<br>
成年確認：${s.adultConfirmed?"已確認":"未確認，成熟事件受限"}<br><br>
這不是結局，只是目前人生線。即使公開、分手、結婚、家庭、退休，都可以繼續玩下去。</div>`;
 const ch=document.getElementById("lifeChapters");
 if(ch)ch.innerHTML=(s.lifeChapters||[]).map(c=>`<div class="chapter ${c.status==='current'?'current':''}"><b>${c.year}年｜${c.title}</b><div>${c.desc}</div><span class="tag">出道第 ${c.careerYear||'?'} 年</span></div>`).join("")||"<p class='muted'>尚無人生章節。</p>";
 const ms=document.getElementById("lifeMilestones");
 if(ms)ms.innerHTML=(s.lifeMilestones||[]).map(m=>`<div class="milestone"><b>${m.year}年${m.month}月｜${m.title}</b><div>${m.desc}</div><span class="tag">${m.type}</span></div>`).join("")||"<p class='muted'>尚無長期里程碑。</p>";
 const fp=document.getElementById("futurePaths");
 if(fp)fp.innerHTML=(s.futurePaths||[]).map(p=>`<div class="future-path"><b>${p.title}</b> <span class="weight">${p.prob}%</span><div>${p.desc}</div></div>`).join("")||"<p class='muted'>尚無未來路線。</p>";
 const box=document.getElementById("lifeEvents");
 if(box)box.innerHTML=(s.lifeEvents||[]).map(e=>`<div class="life-card ${e.type}"><b>${e.year}年${e.month}月｜${e.title}</b><div>${e.desc}</div><span class="tag">${e.type}</span></div>`).join("")||"<p class='muted'>尚無人生事件。</p>";
}
function tab(id,btn){["storyTab","memTab","timeTab","npcTab","snsTab","phoneTab","instagramTab","itemTab","universeTab","companyTab","personalityTab","lifeTab","idolTab","blackboxTab","aiTab"].forEach(x=>document.getElementById(x).classList.add("hidden"));document.getElementById(id).classList.remove("hidden");document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));btn.classList.add("active")}


function showFinalGuide(){show("guide")}
function quickHealthCheck(){
 const saves=getSaves();
 const totalMem=saves.reduce((sum,s)=>sum+(s.memories?s.memories.length:0),0);
 const ai=localStorage.getItem("sasa_api_key")?"已設定":"未設定";
 const msg=`Ultimate V11 狀態檢查\n\n存檔數：${saves.length}\n總記憶數：約 ${totalMem}\nAI Key：${ai}\n瀏覽器儲存：${typeof localStorage!=="undefined"?"可用":"不可用"}\n\n提醒：長期玩請定期匯出全部存檔。`;
 alert(msg);
}

function renderPWAStatus(){
 const box=document.getElementById("pwaStatus"); if(!box)return;
 const standalone=window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
 const sw="serviceWorker" in navigator;
 const secure=location.protocol==="https:" || location.hostname==="localhost" || location.protocol==="file:";
 box.innerHTML=`Ultimate V11｜PWA狀態：${standalone?"已用App模式開啟":"瀏覽器模式"}｜Service Worker：${sw?"支援":"不支援"}｜環境：${secure?"可部署PWA":"需要HTTPS"}<br>
 建議：下載 ZIP → 上傳到 GitHub Pages → 用 Safari 加入主畫面。`;
}

if("serviceWorker" in navigator){navigator.serviceWorker.register("sw.js").catch(()=>{})}
renderSaves();

function renderInstagram(){
 const p=document.getElementById("igProfile"); const f=document.getElementById("igFeed");
 if(!p||!current)return;
 const s=current.state;
 p.innerHTML=`<div class="pill">@${(s.ta||"idol").toLowerCase().replace(/\s/g,"_")}_official</div>
 <p>粉絲：${(s.fandomHeat||0)*1000+50000}｜追蹤中：${(s.round||1)+20}｜貼文：${(s.round||1)}</p>`;
 f.innerHTML=`<div class="card"><b>${s.ta}</b><p>${s.latestChoice||"今天的天空很好看。"} ✨</p>
 <small>❤️ ${(s.buzz||10)*100}　💬 ${(s.heart||10)}　📤 ${(s.risk||1)}</small></div>`;
}
