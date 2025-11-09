// Floating WhatsApp button
document.getElementById('whatsapp-btn').addEventListener('click',function(){
  window.open('https://wa.me/919876543210','_blank');
});

// Wizard form logic
function initWizard(formId, style){
  const form = document.getElementById(formId);
  const steps = form.querySelectorAll('.step');
  let currentStep = 0;

  function showStep(step){ steps.forEach((s,i)=> s.classList.toggle('step-active', i===step)); }
  showStep(currentStep);

  form.querySelectorAll('.nextBtn').forEach(btn=>{
    btn.addEventListener('click',()=>{ if(currentStep<steps.length-1){currentStep++; showStep(currentStep); if(currentStep===2) fillReview(); }});
  });

  form.querySelectorAll('.prevBtn').forEach(btn=>{
    btn.addEventListener('click',()=>{ if(currentStep>0){currentStep--; showStep(currentStep); }});
  });

  function fillReview(){
    let html='<ul>';
    Array.from(form.elements).forEach(el=>{ if(el.name) html+=`<li><strong>${el.name}</strong>: ${el.value}</li>`; });
    html+='</ul>';
    document.getElementById('reviewDetails').innerHTML=html;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data={};
    Array.from(form.elements).forEach(el=>{ if(el.name) data[el.name]=el.value; });
    generate2DPlans(data, style);
  });
}

initWizard('plannerFormModern','Modern');
initWizard('plannerFormTrad','Traditional');

// Generate 2D Plans
function generate2DPlans(data, style){
  let plans = style==='Modern'?
    ["/VasDharaDesignStudio/assets/modern2d1.png","/VasDharaDesignStudio/assets/modern2d2.png","/VasDharaDesignStudio/assets/modern2d3.png"]:
    ["/VasDharaDesignStudio/assets/trad2d1.png","/VasDharaDesignStudio/assets/trad2d2.png","/VasDharaDesignStudio/assets/trad2d3.png"];

  let html='<h4>Select a 2D Floor Plan:</h4><div class="plan-options">';
  plans.forEach(plan=>{
    html+=`<div class="plan" onclick="selectPlan('${plan}')"><img src="${plan}" style="width:200px;margin:5px;border:2px solid #ccc;"></div>`;
  });
  html+='</div>';
  document.getElementById('planResults').innerHTML=html;
}

// Select plan -> show 3D viewer
function selectPlan(plan){
  document.getElementById('planResults').innerHTML=`<p>Selected plan:</p><img src="${plan}" style="width:400px;margin-bottom:10px;"><br>`+
    `<a href="/VasDharaDesignStudio/pages/3dviewer.html?plan=${encodeURIComponent(plan)}" target="_blank">View 3D Model</a>`;
}
