// WhatsApp floating button
document.getElementById('whatsapp-btn')?.addEventListener('click',()=>window.open('https://wa.me/919876543210','_blank'));

// Wizard Form
function initWizard(formId, style){
  const form = document.getElementById(formId);
  if(!form) return;
  const steps = form.querySelectorAll('.step');
  let currentStep=0;
  const reviewDiv = document.getElementById('reviewDetails');
  const planResults = document.getElementById('planResults');
  showStep(currentStep);

  function showStep(step){
    steps.forEach((s,i)=> s.classList.toggle('step-active', i===step));
  }

  form.querySelectorAll('.nextBtn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(currentStep<steps.length-1){
        currentStep++; showStep(currentStep);
        if(currentStep===2) fillReview();
      }
    });
  });

  form.querySelectorAll('.prevBtn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(currentStep>0){ currentStep--; showStep(currentStep); }
    });
  });

  function fillReview(){
    let html='<ul>';
    Array.from(form.elements).forEach(el=>{ if(el.name) html+=`<li><strong>${el.name}</strong>: ${el.value}</li>`; });
    html+='</ul>';
    reviewDiv.innerHTML=html;
  }

  form.addEventListener('submit',e=>{
    e.preventDefault();
    const data={}; Array.from(form.elements).forEach(el=>{ if(el.name) data[el.name]=el.value; });
    // Redirect to 2D viewer page with parameters
    const planStyle = style==='Modern'?'modern':'trad';
    const planUrl = `/VasDharaDesignStudio/pages/2dviewer.html?style=${planStyle}`;
    window.location.href = planUrl;
  });
}

initWizard('plannerFormModern','Modern');
initWizard('plannerFormTrad','Traditional');
