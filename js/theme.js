/* Lógica de cambio de tema */
(() => {
  const themeClasses = ["theme-graphite", "theme-oled", "theme-paper", "theme-nature"];
  const storageKey = "miltong-theme";
  const body = document.body;
  const selector = document.querySelector("#theme-select");
  const toggle = document.querySelector(".theme-toggle");

  const applyTheme = (theme, persist = true) => {
    const selectedTheme = themeClasses.includes(theme) ? theme : "theme-graphite";
    body.classList.remove(...themeClasses);
    body.classList.add(selectedTheme);

    if (selector) selector.value = selectedTheme;
    if (persist) localStorage.setItem(storageKey, selectedTheme);
  };

  let savedTheme = "theme-graphite";
  try {
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme && themeClasses.includes(storedTheme)) savedTheme = storedTheme;
  } catch (error) {
    console.warn("No se pudo leer la preferencia de tema.", error);
  }
  applyTheme(savedTheme, false);

  selector?.addEventListener("change", () => {
    try {
      applyTheme(selector.value);
    } catch (error) {
      console.error("No se pudo guardar la preferencia de tema.", error);
      applyTheme(selector.value, false);
    }
  });

  toggle?.addEventListener("click", () => {
    const currentTheme = themeClasses.find((theme) => body.classList.contains(theme)) || "theme-graphite";
    const nextTheme = {
      "theme-graphite": "theme-paper",
      "theme-oled": "theme-nature",
      "theme-paper": "theme-graphite",
      "theme-nature": "theme-oled"
    }[currentTheme];

    try {
      applyTheme(nextTheme);
    } catch (error) {
      console.error("No se pudo guardar la preferencia de tema.", error);
      applyTheme(nextTheme, false);
    }
  });

  /* Lógica del menú móvil */
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    navigation?.classList.toggle("is-open", !isOpen);
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Abrir menú");
    });
  });

  /* Lógica de filtros de proyectos */
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll("[data-categories]");
  const emptyMessage = document.querySelector("[data-projects-empty]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;
      let visibleCount = 0;

      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("is-active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });

      projectCards.forEach((card) => {
        const categories = (card.dataset.categories || "").split(/\s+/);
        const isVisible = selectedFilter === "all" || categories.includes(selectedFilter);
        card.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
    });
  });
})();