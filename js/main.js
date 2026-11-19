/* Reloj de la barra y sección activa en la navegación */
(() => {
  const clock = document.querySelector("[data-clock]");
  const tick = () => { if (clock) clock.textContent = new Date().toLocaleTimeString("es-SV", { hour: "2-digit", minute: "2-digit", hour12: false }); };
  tick(); setInterval(tick, 30000);

  const links = [...document.querySelectorAll(".primary-navigation a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => io.observe(s));
})();
