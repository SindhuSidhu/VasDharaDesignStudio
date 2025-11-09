document.getElementById('whatsapp-btn')?.addEventListener('click',()=>window.open('https://wa.me/919876543210','_blank'));

// Fade-in
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold:0.2, rootMargin:"0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver(function(entries, observer){
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader=>appearOnScroll.observe(fader));

// Wizard
function initWizard(formId, style){
  const form = document.getElementById(formId);
  if(!form) return;
  const steps = form.querySelectorAll('.step');
  let currentStep=0;
  const reviewDiv = document.getElementById('reviewDetails');
  showStep(currentStep);

  function showStep(step){
    steps.forEach((s,i)=> s.classList.toggle('step-active', i===step));
  }

  form.querySelectorAll('.nextBtn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(currentStep<steps.length-1){ currentStep++; showStep(currentStep); if(currentStep===2) fillReview(); }
    });
  });
  form.querySelectorAll('.prevBtn').forEach(btn=>{
    btn.addEventListener('click',()=>{ if(currentStep>0){ currentStep--; showStep(currentStep); } });
  });

  function fillReview(){
    let html='<ul>';
    Array.from(form.elements).forEach(el=>{ if(el.name) html+=`<li><strong>${el.name}</strong>: ${el.value}</li>`; });
    html+='</ul>';
    reviewDiv.innerHTML=html;
  }

  form.addEventListener('submit',e=>{
    e.preventDefault();
    // redirect to 2D viewer
    const planStyle = style==='Modern'?'modern':'trad';
    window.location.href = `/VasDharaDesignStudio/pages/2dviewer.html?style=${planStyle}`;
  });
}

initWizard('plannerFormModern','Modern');
initWizard('plannerFormTrad','Traditional');

// Placeholder AI 2D generation
function generateAI2DPlans(data){
  const plans = [
    "/VasDharaDesignStudio/assets/modern2d1.png",
    "/VasDharaDesignStudio/assets/modern2d2.png",
    "/VasDharaDesignStudio/assets/modern2d3.png"
  ];
  return plans;
}
