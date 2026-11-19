/* Validación del formulario de contacto */
(() => {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const nextField = form.querySelector('input[name="_next"]');

  if (nextField) {
    nextField.value = new URL("gracias.html", window.location.href).href;
  }

  form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      if (status) status.textContent = "Revisa los campos obligatorios antes de enviar.";
      return;
    }

    const honeypot = form.querySelector('input[name="_honey"]');
    if (honeypot?.value.trim()) {
      event.preventDefault();
      if (status) status.textContent = "No se pudo procesar el envío. Inténtalo de nuevo.";
      return;
    }

    if (status) status.textContent = "Enviando tu mensaje…";
  });

  form.addEventListener("input", () => {
    if (status) status.textContent = "";
  });
})();