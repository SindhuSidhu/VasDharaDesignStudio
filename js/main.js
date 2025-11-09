// Animate portfolio images on scroll
document.addEventListener('DOMContentLoaded', function(){
  const projects = document.querySelectorAll('.project img');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {threshold:0.2});
  projects.forEach(p=>observer.observe(p));
});

// Floating WhatsApp button click
document.getElementById('whatsapp-btn').addEventListener('click', function(){
  window.open('https://wa.me/919876543210', '_blank');
});

// Planner fade-in for new options
function fadeInPlans(){
  const plans = document.querySelectorAll('.plan img');
  plans.forEach((img, i)=>{
    img.style.opacity = 0;
    img.style.transform = 'translateY(20px)';
    setTimeout(()=>{
      img.style.transition = 'all 0.6s ease-in-out';
      img.style.opacity = 1;
      img.style.transform = 'translateY(0)';
    }, i*200);
  });
}

// Call fadeInPlans after generating 2D plans
function generate2DPlans(data){
  let plans=[];
  if(data.style === "Modern"){
    plans=[
      "/VasDharaDesignStudio/assets/modern2d1.png",
      "/VasDharaDesignStudio/assets/modern2d2.png",
      "/VasDharaDesignStudio/assets/modern2d3.png"
    ];
  } else {
    plans=[
      "/VasDharaDesignStudio/assets/trad2d1.png",
      "/VasDharaDesignStudio/assets/trad2d2.png",
      "/VasDharaDesignStudio/assets/trad2d3.png"
    ];
  }
  let html='<h4>Select a 2D Floor Plan:</h4><div class="plan-options">';
  plans.forEach(plan=>{
    html+=`<div class="plan" onclick="selectPlan('${plan}')">
             <img src="${plan}" style="width:200px;border:2px solid #ccc;margin:5px;">
           </div>`;
  });
  html+='</div>';
  document.getElementById('planResults').innerHTML=html;
  fadeInPlans();
}

// Plan selection
function selectPlan(plan){
  document.getElementById('planResults').innerHTML = 
    `<p>Selected plan:</p><img src="${plan}" style="width:400px;margin-bottom:10px;"><br>`+
    `<a href="/VasDharaDesignStudio/pages/3dviewer.html?plan=${encodeURIComponent(plan)}" target="_blank">View 3D Model</a>`;
}
