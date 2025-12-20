// Manejo del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!contactForm) return;
    
    // Configuración para desarrollo local (sin redirección)
    // Si estás en localhost, desactivar la redirección
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const nextInput = contactForm.querySelector('input[name="_next"]');
        if (nextInput) {
            nextInput.value = ''; // Vaciar para evitar redirección en local
        }
    }
    
    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    function validateField(e) {
        const field = e.target;
        const errorSpan = document.getElementById(`${field.id}-error`);
        
        if (!field.value.trim()) {
            showError(field, errorSpan, 'Este campo es requerido');
            return false;
        }
        
        if (field.type === 'email' && !isValidEmail(field.value)) {
            showError(field, errorSpan, 'Por favor ingresa un email válido');
            return false;
        }
        
        if (field.minLength && field.value.length < field.minLength) {
            showError(field, errorSpan, `Mínimo ${field.minLength} caracteres`);
            return false;
        }
        
        clearError(field, errorSpan);
        return true;
    }
    
    function showError(field, errorSpan, message) {
        field.classList.add('border-red-500', 'focus:ring-red-500');
        field.classList.remove('border-border', 'focus:ring-primary');
        
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.classList.remove('hidden');
        }
    }
    
    function clearError(field, errorSpan) {
        field.classList.remove('border-red-500', 'focus:ring-red-500');
        field.classList.add('border-border', 'focus:ring-primary');
        
        if (errorSpan) {
            errorSpan.classList.add('hidden');
        }
    }
    
    function clearFieldError(e) {
        const field = e.target;
        const errorSpan = document.getElementById(`${field.id}-error`);
        clearError(field, errorSpan);
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Manejo del envío del formulario
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar todos los campos
        let isValid = true;
        inputs.forEach(input => {
            const event = new Event('blur');
            input.dispatchEvent(event);
            if (input.classList.contains('border-red-500')) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showStatus('Por favor, corrige los errores en el formulario', 'error');
            return;
        }
        
        // Deshabilitar botón y mostrar carga
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
        
        try {
            // Enviar formulario usando FormSubmit
            const formData = new FormData(contactForm);
            
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Éxito
                showStatus('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
                contactForm.reset();
                
                // Resetear errores
                inputs.forEach(input => {
                    const errorSpan = document.getElementById(`${input.id}-error`);
                    clearError(input, errorSpan);
                });
                
            } else {
                // Error del servidor
                const data = await response.json();
                throw new Error(data.error || 'Error al enviar el mensaje');
            }
            
        } catch (error) {
            // Error de red o del servidor
            console.error('Error:', error);
            
            // Fallback: enviar usando el método tradicional
            showStatus('Enviando... Serás redirigido a confirmación.', 'info');
            
            // Esperar un momento y luego enviar el formulario tradicionalmente
            setTimeout(() => {
                contactForm.removeEventListener('submit', arguments.callee);
                contactForm.submit();
            }, 1000);
            
        } finally {
            // Restaurar botón después de 3 segundos
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                formStatus.classList.add('hidden');
            }, 3000);
        }
    });
    
    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'mt-4 p-4 rounded-lg block';
        
        switch(type) {
            case 'success':
                formStatus.classList.add('bg-green-100', 'text-green-700', 'border', 'border-green-300');
                break;
            case 'error':
                formStatus.classList.add('bg-red-100', 'text-red-700', 'border', 'border-red-300');
                break;
            case 'info':
                formStatus.classList.add('bg-blue-100', 'text-blue-700', 'border', 'border-blue-300');
                break;
        }
        
        formStatus.classList.remove('hidden');
    }
});
