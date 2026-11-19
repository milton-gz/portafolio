/* Escritorios de habilidades */
(() => {
  const B = "Básico", I = "Intermedio funcional";
  const workspaces = {
    web: { title: "Desarrollo web", description: "Tecnologías que uso para construir interfaces accesibles y aplicaciones web funcionales.",
      skills: [["PHP", I, "php"], ["HTML5", I, "html"], ["CSS3", I, "css"], ["Tailwind CSS", B, "tailwind"]] },
    database: { title: "Backend y bases de datos", description: "Fundamentos para estructurar datos y conectar aplicaciones con sistemas de persistencia.",
      skills: [["MySQL", I, "mysql"], ["SQL", I, "sql"], ["SQL Server", B, "sqlserver"]] },
    programming: { title: "Programación", description: "Desarrollo de aplicaciones con herramientas de programación.",
      skills: [["Python", B, "python"], ["PySide6", B, "qt"]] },
    environment: { title: "Entorno y Linux", description: "Sistemas y herramientas que uso para desarrollar, aprender y organizar proyectos.",
      skills: [["Arch Linux", B, "arch"], ["Linux Mint", I, "mint"], ["Visual Studio Code", I, "vscode"], ["Git", B, "git"]] },
    design: { title: "Diseño y multimedia", description: "Herramientas creativas para preparar recursos visuales, video y audio.",
      skills: [["Adobe Illustrator", I, "ai"], ["Adobe Photoshop", I, "ps"], ["Adobe Premiere Pro", B, "pr"], ["Adobe Audition", B, "au"], ["Canva", I, "canva"]] }
  };

  const T = 'font-family="Arial,Helvetica,sans-serif" font-weight="700" text-anchor="middle"';
  const adobe = (bg, fg, t) => `<rect x="1.5" y="1.5" width="21" height="21" rx="4" fill="${bg}" stroke="${fg}" stroke-width="1.2"/><text x="12" y="16" font-size="10.5" ${T} fill="${fg}">${t}</text>`;
  const cyl = (c) => `<ellipse cx="12" cy="6" rx="7.5" ry="3" fill="${c}"/><path d="M4.5 8.2c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V12c0 1.7-3.4 3-7.5 3s-7.5-1.3-7.5-3zm0 6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V18c0 1.7-3.4 3-7.5 3s-7.5-1.3-7.5-3z" fill="${c}" fill-opacity=".75"/>`;
  const icons = {
    php: `<ellipse cx="12" cy="12" rx="11.500" ry="7" fill="#777BB4"/><text x="12" y="15.100" font-size="9.500" ${T} font-style="italic" letter-spacing="-.4" fill="#000">php</text>`,
    html: '<path fill="#E34F26" d="M1.500 0h21l-1.910 21.563L11.977 24l-8.564-2.438zm7.031 9.750-.232-2.718 10.059.003.230-2.622L5.412 4.410l.698 8.010h9.126l-.326 3.426-2.910.804-2.955-.810-.188-2.110H6.248l.330 4.171L12 19.351l5.379-1.443.744-8.157z"/>',
    css: '<path fill="#1572B6" d="M1.500 0h21l-1.910 21.563L11.977 24l-8.565-2.438zm17.090 4.413L5.410 4.410l.213 2.622 10.125.002-.255 2.716h-6.640l.240 2.573h6.182l-.366 3.523-2.910.804-2.956-.810-.188-2.110h-2.610l.290 3.855L12 19.288l5.373-1.530z"/>',
    tailwind: '<path fill="#06B6D4" d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6C13.7 10.6 15 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C16.3 6.2 15 4.8 12 4.8zM6 12c-3.200 0-5.200 1.600-6 4.800 1.200-1.600 2.600-2.200 4.200-1.800.9.200 1.600.900 2.300 1.600 1.200 1.200 2.500 2.600 5.500 2.600 3.200 0 5.200-1.600 6-4.800-1.200 1.600-2.600 2.200-4.200 1.800-.9-.2-1.600-.9-2.300-1.600C10.300 13.400 9 12 6 12z"/>',
    mysql: `<text x="12" y="10.2" font-size="9" ${T} fill="#00758F">My</text><text x="12" y="19.6" font-size="9.5" ${T} fill="#F29111">SQL</text>`,
    sql: cyl("currentColor"),
    sqlserver: cyl("#CC2927"),
    python: '<path fill="#3776AB" d="M11.800 2C7.600 2 7 3.800 7 5.500v2.200h5v.8H5.200C3.300 8.500 2 9.700 2 12v2.300c0 2.100 1.500 3.700 3.600 3.700h1.200v-2.500c0-2.100 1.600-3.700 3.700-3.700h5c1.700 0 2.500-1.100 2.500-2.500V5.500C18 3.400 16.500 2 14.200 2h-2.400zm-1.900 2.100a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/><path fill="#FFC331" d="M14.200 22c4.200 0 4.800-1.800 4.800-3.500v-2.200h-5v-.8h6.800c1.900 0 3.200-1.200 3.200-3.500V9.700c0-2.100-1.500-3.700-3.600-3.700h-1.200v2.500c0 2.100-1.600 3.700-3.700 3.700h-5c-1.700 0-2.500 1.100-2.500 2.500v3.800c0 2.100 1.500 3.500 3.800 3.500h2.400zm1.900-2.100a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>',
    qt: `<rect x="1.5" y="1.5" width="21" height="21" rx="4.500" fill="#41CD52"/><text x="12" y="16.200" font-size="10.500" ${T} fill="#fff">Qt</text>`,
    arch: '<path fill="#1793D1" d="M12 1.800c-1.100 2.700-1.800 4.500-3 6.800.8.800 1.700 1.800 3.300 2.900-1.700-.7-2.800-1.400-3.600-2.100-1.600 3-4 7.500-8.700 14.600 3.700-2.100 6.400-3.200 9-3.700-.1-.5-.2-1-.1-1.500.2-2.400 1.400-4.100 3.300-4.100 1.100 0 2.100.7 2.600 1.900.4 1 .5 2.200.2 3.400 2.600.5 5.200 1.700 8.300 3.700C18.600 15 16.400 11.600 14.900 9 14 7.500 13.100 5.100 12 1.800z"/>',
    mint: "img:assets/img/linux-mint.png",
    vscode: '<path fill="#007ACC" d="M21.500 3.500 17.500 1.500 8.700 9.800 4.400 6.500 2.500 7.400v9.200l1.900.9 4.300-3.300 8.800 8.300 4-2zM17.500 7.700v8.600L11.600 12zM4.400 9.600 6.700 12l-2.300 2.400z"/>',
    git: '<path fill="#F05133" d="M21.400 11.100 12.900 2.600a1.300 1.300 0 0 0-1.800 0L9.300 4.400l2.200 2.200a2 2 0 0 1 2.500 2.500l2.100 2.100a2 2 0 1 1-1.200 1.200l-2-2v5.200a2 2 0 1 1-1.700-.1V10a2 2 0 0 1-1.100-2.600L8 5.300l-5.400 5.400a1.300 1.300 0 0 0 0 1.800l8.500 8.500a1.300 1.300 0 0 0 1.800 0l8.500-8.100a1.300 1.300 0 0 0 0-1.800z"/>',
    ai: adobe("#330000", "#FF9A00", "Ai"),
    ps: adobe("#001E36", "#31A8FF", "Ps"),
    pr: adobe("#00005B", "#9999FF", "Pr"),
    au: adobe("#00241F", "#00E4BB", "Au"),
    canva: "img:assets/img/canva.png"
  };

  const tabs = [...document.querySelectorAll("[data-workspace]")];
  const panel = document.querySelector("#workspace-panel");
  const list = document.querySelector("[data-skill-list]");
  if (!tabs.length || !panel || !list) return;

  const title = document.querySelector("[data-workspace-title]");
  const description = document.querySelector("[data-workspace-description]");
  const path = document.querySelector("[data-workspace-path]");
  const manager = panel.closest(".window-manager");
  let timer;


  const render = (tab, animate = false) => {
    const ws = workspaces[tab.dataset.workspace];
    if (!ws) return;
    tabs.forEach((t) => {
      const on = t === tab;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    title.textContent = ws.title;
    description.textContent = ws.description;
    path.textContent = tab.dataset.workspace;
    manager.dataset.workspaceTheme = tab.dataset.workspace;
    panel.setAttribute("aria-labelledby", tab.id);
    if (animate) {
      panel.classList.remove("is-switching");
      clearTimeout(timer);
      requestAnimationFrame(() => panel.classList.add("is-switching"));
      timer = setTimeout(() => panel.classList.remove("is-switching"), 320);
    }
    list.replaceChildren(...ws.skills.map(([name, level, icon]) => {
      const item = document.createElement("div");
      item.className = "skill-item";
      const art = icons[icon].startsWith("img:") ? `<img src="${icons[icon].slice(4)}" alt="" width="28" height="28" loading="lazy">` : `<svg viewBox="0 0 24 24" focusable="false">${icons[icon]}</svg>`;
      item.innerHTML = `<span class="skill-prompt" aria-hidden="true">${art}</span><span class="skill-info"><span class="skill-name"></span><span class="skill-level"></span></span>`;
      item.querySelector(".skill-name").textContent = name;
      item.querySelector(".skill-level").textContent = level;
      return item;
    }));
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => render(tab, true));
    tab.addEventListener("keydown", (e) => {
      const keys = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 };
      let next = i;
      if (e.key in keys) next = (i + keys[e.key] + tabs.length) % tabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tabs.length - 1;
      else return;
      e.preventDefault();
      tabs[next].focus();
      render(tabs[next], true);
    });
  });
  render(tabs[0]);
})();
