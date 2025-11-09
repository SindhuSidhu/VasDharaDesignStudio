// Floating WhatsApp Button
const whatsappBtn = document.getElementById('whatsapp-btn');
if(whatsappBtn){
  whatsappBtn.addEventListener('click',()=>window.open('https://wa.me/919876543210','_blank'));
}

// Fade-in effect on scroll
const faders = document.querySelectorAll('.hero, .service, .project, .contact-card');
const appearOptions = {threshold:0.2,rootMargin:"0px 0px -50px 0px"};
const appearOnScroll = new IntersectionObserver(function(entries,appearOnScroll){
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    entry.target.classList.add('fade-in');
    appearOnScroll.unobserve(entry.target);
  });
},appearOptions);
faders.forEach(fader=>appearOnScroll.observe(fader));

// Planner 2D placeholder
function submitPlanner(formId,resultId){
  const form=document.getElementById(formId);
  if(!form)return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const output=`<div style="padding:12px;background:#f0f0f0;border-radius:8px;">
      <strong>2D Plan Generated:</strong><br>
      Style: ${data.style}<br>
      BHK: ${data.bhk}<br>
      Plot: ${data.length} x ${data.width} ft<br>
      Requirements: ${data.requirements || 'None'}
      <br><a href="/VasDharaDesignStudio/pages/3dviewer.html?plan=plan1" target="_blank">View 3D Model</a>
    </div>`;
    document.getElementById(resultId).innerHTML=output;
  });
}

// Contact Form placeholder
function handleContact(e){
  e.preventDefault();
  const name=document.getElementById('name').value;
  document.getElementById('formMsg').textContent=`Thanks ${name}! We received your message.`;
  document.getElementById('contactForm').reset();
}
