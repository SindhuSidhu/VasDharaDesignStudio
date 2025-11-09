document.addEventListener("DOMContentLoaded", function() {
  // Floors icon selection
  document.querySelectorAll(".floor-icon").forEach(icon=>{
    icon.addEventListener("click", function(){
      document.querySelectorAll(".floor-icon").forEach(i=>i.classList.remove("selected"));
      this.classList.add("selected");
    })
  });

  // Step-by-step form
  const forms = document.querySelectorAll("form");
  forms.forEach(form=>{
    const steps = form.querySelectorAll(".step");
    let currentStep=0;
    const nextBtn=form.querySelectorAll(".nextBtn");
    const prevBtn=form.querySelectorAll(".prevBtn");

    nextBtn.forEach(btn=>{
      btn.addEventListener("click",()=>{
        if(currentStep<steps.length-1){
          steps[currentStep].classList.remove("step-active");
          currentStep++;
          steps[currentStep].classList.add("step-active");
          if(currentStep==steps.length-1) showReview(form);
        }
      })
    });
    prevBtn.forEach(btn=>{
      btn.addEventListener("click",()=>{
        if(currentStep>0){
          steps[currentStep].classList.remove("step-active");
          currentStep--;
          steps[currentStep].classList.add("step-active");
        }
      })
    });

    form.addEventListener("submit",(e)=>{
      e.preventDefault();
      // Save data to localStorage to use in 2D page
      const data = getFormData(form);
      localStorage.setItem("plannerData", JSON.stringify(data));
      window.location.href="2dviewer.html";
    });
  });

  function getFormData(form){
    const data={};
    form.querySelectorAll("input,select,textarea").forEach(inp=>{
      if(inp.type=="checkbox"){
        data[inp.name]=inp.checked;
      }else{
        data[inp.name]=inp.value;
      }
    });
    const floor=document.querySelector(".floor-icon.selected");
    data.floors=floor?floor.dataset.value:1;
    // Calculate area (simplified)
    const n=parseFloat(data.north), s=parseFloat(data.south),
          e=parseFloat(data.east), w=parseFloat(data.west);
    data.area=( (n+s)/2 * (e+w)/2 ).toFixed(2);
    return data;
  }

  function showReview(form){
    const reviewDiv=form.querySelector("#reviewDetails") || form.querySelector("#reviewDetailsTrad");
    const data=getFormData(form);
    let html="<div class='review-card'><h4>Review Your Details</h4><ul>";
    for(let key in data){
      html+=`<li><strong>${key}:</strong> ${data[key]}</li>`;
    }
    html+="</ul></div>";
    reviewDiv.innerHTML=html;
  }
});
