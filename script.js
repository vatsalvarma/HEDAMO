const products=[
{ name:"Clinical Data Exchange",category:"Medical",producer:"HealthCorp",status:"Published",updated:"2026-01-04",declaredBy:"HealthCorp",evidence:3,image:"clinic.png",versions:[{date:"2025-11-10",status:"Submitted"},{date:"2026-01-04",status:"Published"}]},
{ name:"Patient Record Sync",category:"Medical",producer:"MediLink",status:"Draft",updated:"2025-12-22",declaredBy:"MediLink",evidence:0,image:"https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",versions:[{date:"2025-12-22",status:"Draft"},{date:"2026-01-02",status:"Draft"}]},
{ name:"Municipal Finance Ledger",category:"Financial",producer:"Civic Systems",status:"Submitted",updated:"2026-01-01",declaredBy:"Civic Systems",evidence:1,image:"https://images.unsplash.com/photo-1554224155-6726b3ff858f",versions:[{date:"2025-12-01",status:"Draft"},{date:"2026-01-01",status:"Submitted"}]},
{ name:"Tax Reporting Portal",category:"Financial",producer:"GovTech Labs",status:"Published",updated:"2025-12-28",declaredBy:"GovTech Labs",evidence:2,image:"https://images.unsplash.com/photo-1554224154-22dec7ec8818",versions:[{date:"2025-10-10",status:"Submitted"},{date:"2025-12-28",status:"Published"}]},
{ name:"Transport Asset Registry",category:"Infrastructure",producer:"InfraWorks",status:"Draft",updated:"2025-12-10",declaredBy:"InfraWorks",evidence:0,image:"https://images.unsplash.com/photo-1509395176047-4a66953fd231",versions:[{date:"2025-12-10",status:"Draft"},{date:"2025-12-20",status:"Draft"}]},
{ name:"Utility Usage Monitor",category:"Infrastructure",producer:"GridSense",status:"Submitted",updated:"2026-01-03",declaredBy:"GridSense",evidence:1,image:"https://images.unsplash.com/photo-1581092160562-40aa08e78837",versions:[{date:"2025-11-20",status:"Draft"},{date:"2026-01-03",status:"Submitted"}]},
{ name:"Claims Processing Engine",category:"Medical",producer:"CareLogic",status:"Published",updated:"2025-12-30",declaredBy:"CareLogic",evidence:4,image:"https://images.unsplash.com/photo-1576678927484-cc907957088c",versions:[{date:"2025-10-30",status:"Submitted"},{date:"2025-12-30",status:"Published"}]},
{ name:"Budget Forecast Tool",category:"Financial",producer:"FiscalOne",status:"Draft",updated:"2026-01-05",declaredBy:"FiscalOne",evidence:0,image:"budget.webp",versions:[{date:"2026-01-02",status:"Draft"},{date:"2026-01-05",status:"Draft"}]}
];

const grid=document.getElementById("grid");

function renderSkeleton(){
grid.innerHTML="";
for(let i=0;i<4;i++){
  const d=document.createElement("div");
  d.className="skeleton";
  grid.appendChild(d);
}}

function renderList(list){
grid.innerHTML="";
if(!list.length){
  grid.innerHTML=`<div class="empty">No products match the selected criteria.</div>`;
  return;
}
list.forEach(p=>{
  const c=document.createElement("div");
  c.className="card";
  c.innerHTML=`
    <img src="${p.image}">
    <h3>${p.name}</h3>
    <div class="meta">${p.category} · ${p.producer}</div>
    <div class="footer">
      <span class="badge ${p.status}">${p.status}</span>
      <span>${p.updated}</span>
    </div>`;
  c.onclick=()=>showDetail(p);
  grid.appendChild(c);
});
}

function showDetail(p){
grid.innerHTML=`
<div class="detail">
  <div class="back" onclick="renderList(products)">← Back to list</div>
  <img src="${p.image}">
  <h2>${p.name}</h2>

  <div class="section">
    <strong>Disclosure summary</strong><br>
    Declared by: ${p.declaredBy}<br>
    Declaration date: ${p.updated}<br>
    Evidence attached by producer: ${p.evidence}
  </div>

  <div class="section">
    <strong>Version history</strong><br>
    ${p.versions.map(v=>`${v.date} — ${v.status}`).join("<br>")}
  </div>

  <div class="disclaimer">
    This page presents producer-declared information; it is not certification or verification.
  </div>
</div>`;
}

function applyFilters(){
let list=[...products];
const q=search.value.toLowerCase();
if(q) list=list.filter(p=>p.name.toLowerCase().includes(q)||p.producer.toLowerCase().includes(q));
if(categoryFilter.value) list=list.filter(p=>p.category===categoryFilter.value);
if(statusFilter.value) list=list.filter(p=>p.status===statusFilter.value);
list.sort(sort.value==="name"
  ?(a,b)=>a.name.localeCompare(b.name)
  :(a,b)=>new Date(b.updated)-new Date(a.updated)
);
renderList(list);
}

document.querySelectorAll("input,select").forEach(el=>el.addEventListener("input",applyFilters));

function showPage(id){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

window.addEventListener("hashchange",()=>{
showPage(location.hash.replace("#","")||"home");
});

renderSkeleton();
setTimeout(()=>renderList(products),600);

  /* ===== SCROLL REVEAL LOGIC ===== */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
    }
  });
},{threshold:.12});

function applyReveal(){
  document.querySelectorAll("section, .card, .detail").forEach(el=>{
    el.classList.add("reveal");
    observer.observe(el);
  });
}

/* Apply after initial render */
setTimeout(applyReveal,700);
