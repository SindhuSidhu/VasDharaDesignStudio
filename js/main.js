// VasDhara Design Studio JS

document.querySelectorAll(".nextBtn").forEach(btn =>
  btn.addEventListener("click", () => {
    const currentStep = btn.closest(".step");
    const next = currentStep.nextElementSibling;
    currentStep.classList.remove("step-active");
    next.classList.add("step-active");
  })
);

document.querySelectorAll(".prevBtn").forEach(btn =>
  btn.addEventListener("click", () => {
    const currentStep = btn.closest(".step");
    const prev = currentStep.previousElementSibling;
    currentStep.classList.remove("step-active");
    prev.classList.add("step-active");
  })
);

// Floor selection
document.querySelectorAll(".floor-icon").forEach(icon => {
  icon.addEventListener("click", () => {
    document.querySelectorAll(".floor-icon").forEach(i => i.classList.remove("active"));
    icon.classList.add("active");
    icon.closest("form").dataset.floors = icon.dataset.value;
  });
});

// Review summary & area calculation
document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const n = parseFloat(data.north) || 0;
    const s = parseFloat(data.south) || 0;
    const eSide = parseFloat(data.east) || 0;
    const wSide = parseFloat(data.west) || 0;
    const area = n * s * eSide * wSide;

    data.area = area;
    data.floors = form.dataset.floors || 1;
    localStorage.setItem("plannerData", JSON.stringify(data));
    window.location.href = "2dviewer.html";
  });
});

// Intersection fade-in effect
const fadeEls = document.querySelectorAll(".fade-in");
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
});
fadeEls.forEach(el => obs.observe(el));
