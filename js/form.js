/* Validación y envío del formulario de contacto (Web3Forms por AJAX) */
(() => {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const button = form.querySelector('[type="submit"]');
  const label = button ? button.textContent : "";

  const setStatus = (text) => { if (status) status.textContent = text; };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("Revisa los campos obligatorios antes de enviar.");
      return;
    }

    // Casilla oculta anti-spam: las personas no la ven, los bots la marcan.
    if (form.querySelector('input[name="botcheck"]')?.checked) {
      setStatus("No se pudo procesar el envío. Inténtalo de nuevo.");
      return;
    }

    const data = new FormData(form);
    data.delete("redirect");

    if (button) { button.disabled = true; button.textContent = "Enviando…"; }
    setStatus("Enviando tu mensaje…");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      });
      const result = await response.json();

      if (response.ok && result.success) {
        window.location.href = "gracias.html";
        return;
      }
      throw new Error(result.message || "Error de envío");
    } catch (error) {
      setStatus("No se pudo enviar tu mensaje. Revisa tu conexión e inténtalo de nuevo.");
      if (button) { button.disabled = false; button.textContent = label; }
    }
  });

  form.addEventListener("input", () => setStatus(""));
})();
