// Smooth scroll
document.querySelectorAll('nav a').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
});

// WhatsApp button
const whatsappBtn = document.getElementById('whatsapp-btn');
if(whatsappBtn){
  whatsappBtn.addEventListener('click',()=>{window.open('https://wa.me/9876543210','_blank');});
}

// 2D Plan Generation (Prototype)
function generate2DPlans(data, type='Modern'){
  let plans = [];
  if(type==='Modern'){
    plans = [
      "/VasDharaDesignStudio/assets/modern2d1.png",
      "/VasDharaDesignStudio/assets/modern2d2.png",
      "/VasDharaDesignStudio/assets/modern2d3.png"
    ];
  } else {
    plans = [
      "/VasDharaDesignStudio/assets/trad2d1.png",
      "/VasDharaDesignStudio/assets/trad2d2.png",
      "/VasDharaDesignStudio/assets/trad2d3.png"
    ];
  }
  let html = '<h4>Select a 2D Floor Plan:</h4><div class="plan-options">';
  plans.forEach(plan=>{
    html += `<div class="plan" onclick="selectPlan('${plan}')">
               <img src="${plan}">
             </div>`;
  });
  html += '</div>';
  document.getElementById('planResults').innerHTML = html;
}

function selectPlan(plan){
  document.getElementById('planResults').innerHTML = 
    `<p>Selected Plan:</p><img src="${plan}" style="width:400px;"><br>` +
    `<a href="/VasDharaDesignStudio/pages/3dviewer.html?plan=${encodeURIComponent(plan)}" target="_blank">View 3D Model</a>`;
}
