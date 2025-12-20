// form.js - VERSIÓN FINAL CON BOTÓN SUBMIT
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ form.js cargado - Botón submit activo');
    
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!contactForm || !submitBtn) {
        console.error('❌ Elementos no encontrados');
        return;
    }
    
    // 1. DESACTIVAR validación HTML nativa
    contactForm.setAttribute('novalidate', 'novalidate');
    
    // 2. Referencias a inputs
    const inputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };
    
    // 3. Variable para capturar valores TEMPRANO
    let formValues = {};
    
    // 4. INTERCEPTAR el MOUSEDOWN (ANTES del click/submit)
    submitBtn.addEventListener('mousedown', function(e) {
        console.log('🟡 MOUSEDOWN - Capturando valores TEMPRANO...');
        
        // Capturar valores cuando el usuario PRESIONA el botón (antes de soltar)
        formValues = {
            name: inputs.name ? inputs.name.value : '',
            email: inputs.email ? inputs.email.value : '',
            subject: inputs.subject ? inputs.subject.value : '',
            message: inputs.message ? inputs.message.value : ''
        };
        
        console.log('📝 Valores capturados (mousedown):', formValues);
    });
    
    // 5. También capturar en touchstart para móviles
    submitBtn.addEventListener('touchstart', function(e) {
        console.log('📱 TOUCHSTART - Capturando valores...');
        
        formValues = {
            name: inputs.name ? inputs.name.value : '',
            email: inputs.email ? inputs.email.value : '',
            subject: inputs.subject ? inputs.subject.value : '',
            message: inputs.message ? inputs.message.value : ''
        };
    });
    
    // 6. Función de validación
    function validateForm() {
        console.log('🔍 Validando con valores:', formValues);
        
        let isValid = true;
        
        // Validar NOMBRE
        if (!formValues.name || formValues.name.trim().length === 0) {
            showError(inputs.name, 'Este campo es requerido');
            isValid = false;
        } else if (formValues.name.trim().length < 2) {
            showError(inputs.name, 'Mínimo 2 caracteres');
            isValid = false;
        } else {
            clearError(inputs.name);
        }
        
        // Validar EMAIL
        if (!formValues.email || formValues.email.trim().length === 0) {
            showError(inputs.email, 'Este campo es requerido');
            isValid = false;
        } else if (!isValidEmail(formValues.email)) {
            showError(inputs.email, 'Por favor ingresa un email válido');
            isValid = false;
        } else {
            clearError(inputs.email);
        }
        
        // Validar ASUNTO
        if (!formValues.subject || formValues.subject.trim().length === 0) {
            showError(inputs.subject, 'Este campo es requerido');
            isValid = false;
        } else if (formValues.subject.trim().length < 5) {
            showError(inputs.subject, 'Mínimo 5 caracteres');
            isValid = false;
        } else {
            clearError(inputs.subject);
        }
        
        // Validar MENSAJE
        if (!formValues.message || formValues.message.trim().length === 0) {
            showError(inputs.message, 'Este campo es requerido');
            isValid = false;
        } else if (formValues.message.trim().length < 10) {
            showError(inputs.message, 'Mínimo 10 caracteres');
            isValid = false;
        } else {
            clearError(inputs.message);
        }
        
        console.log('✅ Validación:', isValid ? 'VÁLIDO' : 'INVÁLIDO');
        return isValid;
    }
    
    // 7. Funciones auxiliares
    function showError(input, message) {
        if (!input) return;
        
        const errorDiv = document.getElementById(`${input.id}-error`);
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
        }
        
        input.classList.add('border-red-500', 'focus:ring-red-500');
        input.classList.remove('border-gray-300', 'dark:border-gray-700', 'focus:ring-blue-500');
    }
    
    function clearError(input) {
        if (!input) return;
        
        const errorDiv = document.getElementById(`${input.id}-error`);
        if (errorDiv) {
            errorDiv.classList.add('hidden');
        }
        
        input.classList.remove('border-red-500', 'focus:ring-red-500');
        input.classList.add('border-gray-300', 'dark:border-gray-700', 'focus:ring-blue-500');
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // 8. MANEJADOR PRINCIPAL del formulario
    contactForm.addEventListener('submit', function(event) {
        console.log('🟡 EVENTO SUBMIT - Iniciando validación...');
        
        // PREVENIR el envío automático
        event.preventDefault();
        
        // Si no hay valores capturados (por si se saltó mousedown), capturar ahora
        if (!formValues.name && inputs.name) {
            formValues.name = inputs.name.value;
            formValues.email = inputs.email.value;
            formValues.subject = inputs.subject.value;
            formValues.message = inputs.message.value;
            console.log('⚠️ Valores capturados en submit:', formValues);
        }
        
        // Validar el formulario
        const isValid = validateForm();
        
        if (!isValid) {
            console.log('🔴 Validación fallida - No enviar');
            showFormStatus('Por favor, corrige los errores en el formulario', 'error');
            return;
        }
        
        console.log('🟢 Validación exitosa - Enviando...');
        
        // Mostrar estado de carga
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
        
        showFormStatus('Enviando tu mensaje...', 'info');
        
        // Asegurar que los valores estén en los inputs antes de enviar
        if (inputs.name) inputs.name.value = formValues.name;
        if (inputs.email) inputs.email.value = formValues.email;
        if (inputs.subject) inputs.subject.value = formValues.subject;
        if (inputs.message) inputs.message.value = formValues.message;
        
        // Crear FormData
        const formData = new FormData(contactForm);
        
        // Enviar con Fetch API
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            console.log('📨 Respuesta recibida:', response.status);
            
            if (response.ok) {
                // Redirigir a página de gracias
                console.log('✅ Éxito - Redirigiendo...');
                window.location.href = 'https://milton-gz.github.io/portafolio/gracias.html';
            } else {
                throw new Error('Error ' + response.status);
            }
        })
        .catch(error => {
            console.error('❌ Error en el envío:', error);
            
            // Mostrar error
            showFormStatus('Error al enviar. Intenta nuevamente.', 'error');
            
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Fallback: envío tradicional después de 2 segundos
            setTimeout(() => {
                console.log('🔄 Intentando envío tradicional...');
                // Quitar temporalmente el event listener
                const currentHandler = arguments.callee;
                contactForm.removeEventListener('submit', currentHandler);
                // Enviar
                contactForm.submit();
            }, 2000);
        });
    });
    
    // 9. Función para mostrar estado del formulario
    function showFormStatus(message, type) {
        const formStatus = document.getElementById('form-status');
        if (!formStatus) return;
        
        formStatus.textContent = message;
        formStatus.className = 'p-4 rounded-lg mt-4';
        
        if (type === 'error') {
            formStatus.classList.add('bg-red-100', 'text-red-700', 'border', 'border-red-300');
        } else if (type === 'info') {
            formStatus.classList.add('bg-blue-100', 'text-blue-700', 'border', 'border-blue-300');
        } else if (type === 'success') {
            formStatus.classList.add('bg-green-100', 'text-green-700', 'border', 'border-green-300');
        }
        
        formStatus.classList.remove('hidden');
        
        // Ocultar después de 5 segundos (si no es éxito)
        if (type !== 'success') {
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);
        }
    }
    
    // 10. Limpiar errores cuando el usuario escribe
    Object.values(inputs).forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                clearError(this);
                // Actualizar valores en tiempo real
                formValues[this.id] = this.value;
            });
            
            // También limpiar al hacer blur
            input.addEventListener('blur', function() {
                formValues[this.id] = this.value;
            });
        }
    });
    
    console.log('✅ Formulario configurado correctamente');
    
    // 11. FUNCIONES DE DEBUG
    window.verEstado = function() {
        console.log('=== ESTADO ACTUAL ===');
        console.log('Valores capturados:', formValues);
        console.log('Valores en inputs:');
        Object.entries(inputs).forEach(([key, input]) => {
            if (input) {
                console.log(`${key}: "${input.value}"`);
            }
        });
    };
    
    window.simularEnvio = function() {
        console.log('🧪 Simulando envío...');
        contactForm.dispatchEvent(new Event('submit'));
    };
});
