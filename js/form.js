/* Validación y envío del formulario de contacto (Web3Forms) */
(() => {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const redirect = form.querySelector('input[name="redirect"]');

  // Web3Forms necesita una URL absoluta para volver a la página de gracias.
  if (redirect) redirect.value = new URL("gracias.html", window.location.href).href;

  form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      if (status) status.textContent = "Revisa los campos obligatorios antes de enviar.";
      return;
    }

    if (form.querySelector('input[name="botcheck"]')?.checked) {
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
