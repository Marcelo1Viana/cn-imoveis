const WA="5511933569700";
// CRM: cole aqui o endereço do webhook (Google Sheets, RD Station, HubSpot, Pipedrive etc.). Vazio = só WhatsApp.
const CRM_WEBHOOK="";
const link=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
document.querySelectorAll("[data-wa]").forEach(a=>{a.href=link(a.dataset.wa);a.target="_blank";a.rel="noopener"});
const hd=document.getElementById("hd"),nav=document.getElementById("nav");
addEventListener("scroll",()=>hd.classList.toggle("on",scrollY>30),{passive:true});
document.getElementById("bg").onclick=()=>nav.classList.toggle("open");
nav.querySelectorAll("a").forEach(a=>a.onclick=()=>nav.classList.remove("open"));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll(".rv").forEach(el=>io.observe(el));
// máscaras
const tel=document.getElementById("tel");
tel.oninput=()=>{let v=tel.value.replace(/\D/g,"").slice(0,11);v=v.replace(/^(\d{2})(\d)/,"($1) $2").replace(/(\d{5})(\d{1,4})$/,"$1-$2");tel.value=v};
const ent=document.getElementById("ent");
ent.oninput=()=>{let v=ent.value.replace(/\D/g,"");ent.value=v?"R$ "+(parseInt(v,10)/100).toLocaleString("pt-BR",{minimumFractionDigits:2}):""};
document.querySelectorAll('input[name=casado]').forEach(r=>r.onchange=()=>document.getElementById("spouse").classList.toggle("show",r.value==="Sim"&&r.checked));
// formulário
const val=n=>(document.querySelector(`input[name=${n}]:checked`)||{}).value;
document.getElementById("f").onsubmit=e=>{
e.preventDefault();
const nome=document.getElementById("nome").value.trim(),t=tel.value.replace(/\D/g,"");
const bad1=nome.length<2,bad2=t.length<10;
e1.style.display=bad1?"block":"none";e2.style.display=bad2?"block":"none";
if(bad1||bad2)return;
let m=`Olá! Quero simular meu primeiro imóvel.\n\nNome: ${nome}\nTelefone: ${tel.value}`;
[["Nome limpo",val("limpo")],["Casado(a)",val("casado")],["Cônjuge com nome limpo",val("casado")==="Sim"?val("conj"):null],["Trabalha registrado",val("clt")],["Entrada",ent.value]].forEach(([k,v])=>{if(v)m+=`\n${k}: ${v}`});
const u=link(m);document.getElementById("again").href=u;
const lead={nome,telefone:tel.value,nome_limpo:val("limpo")||"",casado:val("casado")||"",conjuge_nome_limpo:val("casado")==="Sim"?(val("conj")||""):"",trabalha_registrado:val("clt")||"",entrada:ent.value,data:new Date().toISOString(),origem:location.href};
if(CRM_WEBHOOK){try{fetch(CRM_WEBHOOK,{method:"POST",mode:"no-cors",keepalive:true,headers:{"Content-Type":"text/plain"},body:JSON.stringify(lead)}).catch(()=>{})}catch(_){}}
fields.style.display="none";ok.style.display="block";document.getElementById("again").click();
};
// áreas de atuação
(function(){
const B={C:["Cury","#9C4646"],P:["Plano&Plano","#b8863c"],V:["Vibra","#7d3838"],Y:["Cyrela","#5e2a2a"]};
const R={
"Zona Leste":{a:"Itaquera, Tatuapé, Penha, Mooca, São Mateus, Guaianases, Vila Matilde, Cidade Tiradentes",p:[["C","Parque Itaquera","Itaquera","2 dorm. · 38 m²","220.000"],["P","Vila Matilde Club","Vila Matilde","2 dorm. · 41 m²","245.000"],["Y","Tatuapé Prime","Tatuapé","2 dorm. · 58 m²","520.000"]]},
"Zona Oeste":{a:"Lapa, Pinheiros, Butantã, Vila Leopoldina, Jaguaré, Barra Funda, Rio Pequeno",p:[["V","Vila Leopoldina Home","Vila Leopoldina","2 dorm. · 45 m²","390.000"],["C","Jaguaré Vivere","Jaguaré","2 dorm. · 40 m²","255.000"],["Y","Lapa Essence","Lapa","3 dorm. · 72 m²","690.000"]]},
"Zona Sul":{a:"Santo Amaro, Jabaquara, Ipiranga, Saúde, Campo Limpo, Cidade Ademar, Capela do Socorro",p:[["P","Jabaquara Station","Jabaquara","2 dorm. · 36 m²","235.000"],["C","Campo Limpo Parque","Campo Limpo","2 dorm. · 39 m²","230.000"],["Y","Santo Amaro Square","Santo Amaro","2 dorm. · 55 m²","480.000"]]},
"Zona Norte":{a:"Santana, Tucuruvi, Freguesia do Ó, Casa Verde, Vila Maria, Brasilândia, Jaçanã",p:[["P","Tucuruvi Living","Tucuruvi","2 dorm. · 37 m²","240.000"],["V","Santana Urban","Santana","2 dorm. · 44 m²","360.000"],["C","Brasilândia Bosque","Brasilândia","2 dorm. · 38 m²","215.000"]]},
"Guarulhos":{a:"Centro, Vila Augusta, Macedo, Gopoúva, Bonsucesso, Cumbica, Picanço",p:[["C","Guarulhos Garden","Vila Augusta","2 dorm. · 41 m²","265.000"],["P","Macedo Prime","Macedo","2 dorm. · 43 m²","275.000"],["Y","Gopoúva Club","Gopoúva","3 dorm. · 66 m²","450.000"]]},
"ABC Paulista":{c:{"Santo André":{a:"Centro, Jardim, Vila Assunção, Campestre, Utinga",p:[["C","Santo André Vivere","Jardim","2 dorm. · 40 m²","270.000"],["Y","Campestre Signature","Campestre","3 dorm. · 78 m²","720.000"]]},
"São Bernardo do Campo":{a:"Centro, Rudge Ramos, Baeta Neves, Taboão, Nova Petrópolis",p:[["P","Rudge Ramos Home","Rudge Ramos","2 dorm. · 42 m²","285.000"],["V","SBC Central","Centro","2 dorm. · 50 m²","410.000"]]},
"São Caetano do Sul":{a:"Santa Paula, Barcelona, Fundação, Centro, Osvaldo Cruz",p:[["Y","Santa Paula Prime","Santa Paula","2 dorm. · 60 m²","560.000"],["V","Barcelona Urban","Barcelona","2 dorm. · 48 m²","430.000"]]},
"Diadema":{a:"Centro, Vila Nogueira, Eldorado, Taboão, Piraporinha",p:[["C","Diadema Parque","Centro","2 dorm. · 38 m²","235.000"],["P","Eldorado Club","Eldorado","2 dorm. · 40 m²","248.000"]]}}}};
let reg="Zona Leste",cid="Santo André";
const $=i=>document.getElementById(i);
const btns=(el,names,cur,fn)=>{el.innerHTML="";names.forEach(n=>{const b=document.createElement("button");b.textContent=n;b.type="button";b.className=n===cur?"on":"";b.onclick=()=>fn(n);el.appendChild(b)})};
function draw(){
btns($("tabs"),Object.keys(R),reg,n=>{reg=n;draw()});
const abc=!!R[reg].c;$("subtabs").style.display=abc?"flex":"none";
if(abc)btns($("subtabs"),Object.keys(R[reg].c),cid,n=>{cid=n;draw()});
const d=abc?R[reg].c[cid]:R[reg];
$("areas").innerHTML="<b>Regiões atendidas:</b> "+d.a;
$("proj").innerHTML=d.p.map(([b,n,l,t,v],i)=>`<article class="proj" style="animation-delay:${i*.08}s"><div class="art" style="--b:${B[b][1]};background:linear-gradient(#f5e6e1,#fff)"><span class="badge">${B[b][0]}</span></div><div class="pb"><span class="by">${B[b][0]}</span><h3>${n}</h3><p class="loc">${l} · ${abc?cid:reg}</p><div class="specs"><span>${t}</span></div><p class="price">A partir de<b>R$ ${v}</b></p><a class="btn" target="_blank" rel="noopener" href="${link("Olá! Tenho interesse no "+n+" ("+B[b][0]+") em "+l+".")}">Quero saber mais</a></div></article>`).join("");
}
draw();
})();
