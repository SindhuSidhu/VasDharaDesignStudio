// Smooth scroll for sections
document.querySelectorAll('nav a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// Fade-in sections on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', ()=>{
  sections.forEach(s=>{
    const top = s.getBoundingClientRect().top;
    if(top < window.innerHeight - 100){
      s.classList.add('visible');
    }
  });
});

// WhatsApp floating button
document.getElementById('whatsapp-btn').addEventListener('click', ()=>{
  window.open('https://wa.me/9876543210','_blank');
});

// Placeholder: connect 2D plan API
async function submitPlanner(formId, containerId){
  const form = document.getElementById(formId);
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const data = {
      length: form.length.value,
      width: form.width.value,
      bhk: form.bhk.value,
      style: form.style.value,
      requirements: form.requirements.value
    };
    const res = await fetch('http://localhost:5000/generate-2d',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data)
    });
    const plans = await res.json();
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    plans.forEach(p=>{
      const div = document.createElement('div');
      div.classList.add('project');
      div.innerHTML=`<img src="${p.image}" style="width:100%;border-radius:10px"><button onclick="view3D('${p.id}')">View 3D</button>`;
      container.appendChild(div);
    });
  });
}

// Placeholder: view 3D
function view3D(planId){
  window.location.href=`pages/3dviewer.html?plan=${planId}`;
}
