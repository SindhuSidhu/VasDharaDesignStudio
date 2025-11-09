document.addEventListener("DOMContentLoaded", () => {
  // Fade-in elements
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = { threshold: 0, rootMargin: "0px 0px -100px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  // Step-by-step planner form
  const form = document.querySelector("form");
  if (form) {
    let currentStep = 0;
    const steps = form.querySelectorAll(".step");
    const nextBtns = form.querySelectorAll(".nextBtn");
    const prevBtns = form.querySelectorAll(".prevBtn");

    function showStep(index) {
      steps.forEach((step, i) => step.classList.toggle("step-active", i === index));
    }
    showStep(currentStep);

    nextBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
          currentStep++;
          showStep(currentStep);
        }
      });
    });

    prevBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        if (currentStep > 0) {
          currentStep--;
          showStep(currentStep);
        }
      });
    });

    form.addEventListener("submit", e => {
      e.preventDefault();
      // Collect data and redirect to 2D viewer page
      const formData = new FormData(form);
      const query = new URLSearchParams(formData).toString();
      window.location.href = "2dviewer.html?" + query;
    });
  }
});
