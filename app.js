const rand=a=>a[Math.floor(Math.random()*a.length)];
const clamp=n=>Math.max(0,Math.min(100,Math.round(n)));
const APP_VERSION="Ultimate V11";
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

function startNewGame(){
 const target=document.getElementById("target").value.trim()||"隨機原創";
 const group=detectGroup(target)||"原創團體";
 const data=KDB[group]||{company:"虛構企劃社",fandom:"粉絲",members:["成員A","成員B","成員C"],same:["RIIZE","TXT","IVE"],rivals:["RIIZE","TXT","ENHYPEN","SEVENTEEN"]};
 const ta=target==="隨機原創"?rand(["姜瑞允","韓律","尹采河","李成曜"]):target;
 const roles=[...document.querySelectorAll("#roleChecks input:checked")].map(x=>x.value);
 const role=roles.length?roles.join("＋"):"愛豆同行";
 const rel=document.getElementById("relation").value;
 const st=baseStats(rel);
 const npcs={};
 [...data.members,...data.same,...data.rivals,"經紀人","造型組長","品牌方PR"].forEach(n=>{
  if(!String(ta).toLowerCase().includes(String(n).toLowerCase())){
    const isStaff=["經紀人","造型組長","品牌方PR"].includes(n);
    npcs[n]={awareness:Math.floor(Math.random()*26),closeness:isStaff?20:Math.floor(Math.random()*45),pressure:isStaff?55:Math.floor(Math.random()*35),stance:rand(isStaff?["公司優先","觀察中","理性提醒"]:["假裝不知道","理性提醒","幫忙隱瞞","公司優先","觀察中"]),type:isStaff?"staff":(data.members.includes(n)?"member":(data.same.includes(n)?"sameCompany":"industry"))}
  }
})
 current={
  id:uid(),version:APP_VERSION,title:document.getElementById("saveTitle").value.trim()||`${ta}線`,
  createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),
  state:{round:1,year:2026,month:4,week:1,season:"回歸期",lifeStage:"秘密人生開始",role,ta,group,company:data.company,fandom:data.fandom,relation:rel,scene:document.getElementById("scene").value,call:document.getElementById("callName").value||"你",playerBio:document.getElementById("playerBio").value,extraNote:document.getElementById("extraNote").value,mode:document.getElementById("mode").value,matureLevel:document.getElementById("matureLevel").value,adultConfirmed:document.getElementById("adultConfirm").checked,familyMode:document.getElementById("familyMode").value,heart:st[0],trust:st[1],risk:st[2],pressure:st[3],possess:st[4],buzz:st[5],intimacy:st[6],stayRisk:0,marriage:0,familyRisk:0,cohabitation:0,publicStatus:"未公開",marriageStatus:"未婚",familyStatus:"未開啟",careerStage:"現役活動中",retirementStage:"未退休",lifeEvents:[],phoneMessages:[],notifications:[],items:[],fandomHeat:st[5],searchRank:0,proofLevel:0,companyStatement:"尚未回應",fandomSplit:0,knetzMood:35,ifansMood:62,dispatchFocus:0,xHeat:0,trendWashPower:0,photoVault:[],xAccounts:makeXAccounts(group,ta),watchers:makeWatchers(group),npcs},
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
 return `你是《嫂嫂模擬器 V5.4》的遊戲主持人。

【絕對規則】
- 這是平行世界同人向虛構。若出現現實藝人、團體或公司，只能使用公開職業背景，不得聲稱任何真實私生活。
- 所有戀愛與親密事件限定成年角色。若年齡未確認，禁止親密內容。
- 可寫成年角色之間的曖昧、親吻、留宿、事後清晨、車內張力與海外飯店氛圍，但必須淡出，不描寫露骨身體細節或具體性行為過程。
- 使用第二人稱「你」。
- 玩家只能知道自己看到、聽到、感受到的內容。
- 不直接寫 TA 真心，例如「TA其實愛你」。只能用外顯細節表現：眼神停頓、訊息撤回、語氣變淡、避開鏡頭、手指停住。
- 結局不是 END，而是目前人生狀態。即使公開、分手、結婚、家庭、退休，都可以繼續玩。
- 每回合要保留韓娛風險：公司、粉圈、成員、站姐、Bubble、Naver、Threads、Theqoo、行程、鏡頭。

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
同居傾向：${s.cohabitation||0}

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
物品伏筆：${(s.items||[]).slice(0,12).map(i=>`${i.name}：${i.desc}，風險${i.risk}，${i.used?"已回收":"未回收"}`).join("；")||"無"}

【粉圈動態】
${sns}

【最近劇情】
${recentStory}

【玩家本回合行動】
${playerAction}

請輸出本回合：
【劇情正文】
第二人稱敘事，包含 TA 或 NPC 對話。

【當前風險變化】
用自然語言說明哪些數值可能上升或下降，不要輸出 JSON。

【可延續伏筆】
列出 1-3 個可之後回收的記憶點。

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
 if(info)info.innerHTML=`<span class="pill">目前模式：${current.state.mode==="ai"?"AI 自動續寫":"本機劇情引擎"}</span><span class="pill">API Key：${localStorage.getItem("sasa_api_key")?"已設定":"未設定"}</span><span class="pill">模型：${localStorage.getItem("sasa_model")||"gpt-4.1-mini"}</span>`;
}
function copyAIPrompt(){
 const txt=document.getElementById("aiPromptPreview")?.textContent||buildAIPrompt("");
 navigator.clipboard?.writeText(txt).then(()=>alert("已複製提示包")).catch(()=>alert("無法自動複製，可手動選取文字。"));
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
  addNotification("Bubble",`${s.ta}：${msg}`,"bubble");
  s.fandomHeat=clamp((s.fandomHeat||0)+4);
  story=`【手機事件｜Bubble】\n\n通知跳出來時，你正在看粉圈討論。\n\n${s.ta}：${msg}\n\n粉絲會把它當成福利。\n\n你卻知道，這句話的重量不只如此。`;
 }
 if(type==="dm"){
  addPhoneMessage("你","你現在方便說話嗎？","me");
  addPhoneMessage(s.ta,"五分鐘後。不要打電話。","dm");
  story=`【手機事件｜私人訊息】\n\n你傳出訊息後，對方顯示輸入中很久。\n\n最後只回：\n「五分鐘後。不要打電話。」\n\n這句話讓你意識到，旁邊可能有人。`;
  s.risk=clamp(s.risk+2);
 }
 if(type==="missed"){
  addNotification("未接來電",`${s.ta} 來電 3 通`,"call");
  story=`【手機事件｜未接來電】\n\n螢幕亮了三次。\n\n全都是 ${s.ta}。\n\n但你不能在這個地方接起來。`;
  s.heart=clamp(s.heart+2); s.risk=clamp(s.risk+3);
 }
 if(type==="delete"){
  addPhoneMessage(s.ta,"剛剛那句當我沒說。","deleted");
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
function renderPhone(){
 const el=document.getElementById("phoneView"); if(!el||!current)return;
 const s=current.state;
 const msgs=s.phoneMessages||[];
 const notifs=s.notifications||[];
 el.innerHTML=`<div class="phone"><div class="phone-screen"><h3>手機通知</h3>${notifs.slice(0,4).map(n=>`<div class="notif"><b>${n.title}</b><div>${n.body}</div><div class="small">${n.year}年${n.month}月</div></div>`).join("")||"<p class='muted'>暫無通知。</p>"}<h3>Bubble / 私訊</h3>${msgs.slice(-12).map(m=>`<div class="bubble-msg ${m.sender==="你"?"me":""}"><b>${m.sender}</b><br>${m.kind==="deleted"?"（訊息已撤回）":m.text}<div class="small">${m.year}.${m.month}</div></div>`).join("")||"<p class='muted'>尚無訊息。</p>"}</div></div>`;
}
function renderItems(){
 const el=document.getElementById("items"); if(!el||!current)return;
 const s=current.state;
 el.innerHTML=(s.items||[]).map(i=>`<div class="item-card ${i.risk>40?'risk':''}"><b>${i.name}</b> <span class="tag">${i.used?"已回收":"未回收"}</span><div>${i.desc}</div><div class="small">擁有者：${i.owner}｜初次出現：${i.firstSeen}｜情感值：${i.emotional}｜風險：${i.risk}</div></div>`).join("")||"<p class='muted'>尚無物品伏筆。</p>";
}

function renderAll(text){
 if(!current)return;
 const s=current.state;
 document.getElementById("pname").textContent=s.ta;
 document.getElementById("pdesc").textContent=`${s.group}｜${s.company}｜${s.fandom}`;
 document.getElementById("story").textContent=text;
 renderChoices();renderStatus();renderMemories();renderMemoryClusters();renderRecallHooks();renderTimeline();renderNPCs();renderSNS();renderPhone();renderItems();renderLife();renderAIPrompt()
}
function renderChoices(){
 const cs=[["A","低聲警告TA：不要再留下會被猜到的東西。"],["B","裝作沒事，繼續完成眼前的工作 / 場面。"],["C","試探追問：你剛剛那句，是故意說給我聽的嗎？"],["D","拉開距離，先保護自己。"]];
 document.getElementById("choices").innerHTML="<h2>可選行動</h2>"+cs.map(c=>`<button onclick="choose('${c[0]}','${c[1]}')">${c[0]}. ${c[1]}</button>`).join("")
}
function renderStatus(){
 const s=current.state;
 const m=(n,v,type="")=>`<div class="meter"><div class="meter-row"><span>${n}</span><b>${v}</b></div><div class="bar"><div class="fill ${type}" style="width:${v}%"></div></div></div>`;
 document.getElementById("status").innerHTML=`<span class="pill">回合：${s.round}</span><span class="pill">${s.year}年${s.month}月 第${s.week}週</span><span class="pill">${s.season}</span><span class="pill">人生：${s.lifeStage}</span><span class="pill">身份：${s.role}</span><span class="pill">關係：${s.relation}</span>${m("心動值",s.heart,"good")}${m("信任值",s.trust,"good")}${m("親密度",s.intimacy,"good")}${m("曝光風險",s.risk,"danger")}${m("事業壓力",s.pressure,"danger")}${m("占有欲",s.possess)}${m("輿論溫度",s.buzz,"danger")}${m("粉圈熱度",s.fandomHeat||0,"danger")}${m("X熱度",s.xHeat||0,"danger")}${m("Dispatch關注",s.dispatchFocus||0,"danger")}${m("實錘程度",s.proofLevel||0,"danger")}${m("留宿風險",s.stayRisk,"danger")}${m("婚姻穩定",s.marriage,"good")}${m("同居傾向",s.cohabitation||0,"good")}${m("家庭公開風險",s.familyRisk,"danger")}<span class="pill">最高NPC察覺：${Math.max(0,...Object.values(s.npcs||{}).map(v=>v.awareness||0))}%</span><span class="pill">模式：${s.mode==="ai"?"AI續寫":"本機"}</span>`
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
function exportAllSaves(){downloadJSON("sasa-ultimate-v11-all-saves.json",{version:APP_VERSION,exportedAt:new Date().toISOString(),saves:getSaves()})}
function exportOneSave(id){const s=getSaves().find(x=>x.id===id); if(!s)return; downloadJSON(`${s.title||"sasa-save"}-ultimate-v11.json`,{version:APP_VERSION,exportedAt:new Date().toISOString(),saves:[s]})}
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

function renderLife(){
 const s=current.state;
 document.getElementById("life").innerHTML=`<div class="life-card major"><b>目前人生狀態：${s.lifeStage}</b><br>
時間：${s.year}年${s.month}月 第${s.week}週｜${s.season}<br>
公開狀態：${s.publicStatus}<br>
婚姻狀態：${s.marriageStatus}<br>
家庭狀態：${s.familyStatus}<br>
事業階段：${s.careerStage}<br>
退休階段：${s.retirementStage}<br>
同居傾向：${s.cohabitation||0}%<br>
家庭線：${s.familyMode}
公開狀態：${s.publicStatus}
婚姻狀態：${s.marriageStatus}
家庭狀態：${s.familyStatus}
事業階段：${s.careerStage}
退休階段：${s.retirementStage}
同居傾向：${s.cohabitation||0}<br>
成年確認：${s.adultConfirmed?"已確認":"未確認，成熟事件受限"}<br><br>
這不是結局，只是目前人生線。即使公開、分手、結婚、家庭、退休，都可以繼續玩下去。</div>`;
 const box=document.getElementById("lifeEvents");
 if(box)box.innerHTML=(s.lifeEvents||[]).map(e=>`<div class="life-card ${e.type}"><b>${e.year}年${e.month}月｜${e.title}</b><div>${e.desc}</div><span class="tag">${e.type}</span></div>`).join("")||"<p class='muted'>尚無人生事件。</p>";
}
function tab(id,btn){["storyTab","memTab","timeTab","npcTab","snsTab","phoneTab","itemTab","lifeTab","aiTab"].forEach(x=>document.getElementById(x).classList.add("hidden"));document.getElementById(id).classList.remove("hidden");document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));btn.classList.add("active")}


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
