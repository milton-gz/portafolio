// form.js - VERSIÓN QUE CAPTURA VALORES ANTES DE BORRARSE
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ form.js cargado - Captura temprana activada');
    
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!contactForm) return;
    
    // 1. DESACTIVAR CUALQUIER comportamiento automático
    contactForm.setAttribute('novalidate', 'novalidate');
    
    // 2. Guardar referencias a los inputs
    const inputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };
    
    // 3. Variable para guardar valores ANTES de validar
    let capturedValues = {};
    
    // 4. INTERCEPTAR el clic del botón ANTES que el submit
    submitBtn.addEventListener('click', function(e) {
        console.log('🟡 CLIC EN BOTÓN - Capturando valores...');
        
        // Capturar valores INMEDIATAMENTE
        capturedValues = {
            name: inputs.name ? inputs.name.value : '',
            email: inputs.email ? inputs.email.value : '',
            subject: inputs.subject ? inputs.subject.value : '',
            message: inputs.message ? inputs.message.value : ''
        };
        
        console.log('📝 Valores capturados:', capturedValues);
        
        // NO prevenir el comportamiento aquí todavía
        // Solo capturamos los valores
    });
    
    // 5. Función para validar usando valores CAPTURADOS
    function validateWithCapturedValues() {
        console.log('🔍 Validando con valores capturados:', capturedValues);
        
        let allValid = true;
        
        // Validar NOMBRE
        if (!capturedValues.name || capturedValues.name.trim().length === 0) {
            console.log('❌ Nombre vacío (capturado)');
            showError(inputs.name, 'Este campo es requerido');
            allValid = false;
        } else if (capturedValues.name.trim().length < 2) {
            console.log('❌ Nombre muy corto:', capturedValues.name);
            showError(inputs.name, 'Mínimo 2 caracteres');
            allValid = false;
        } else {
            clearError(inputs.name);
            console.log('✅ Nombre válido:', capturedValues.name);
        }
        
        // Validar EMAIL
        if (!capturedValues.email || capturedValues.email.trim().length === 0) {
            showError(inputs.email, 'Este campo es requerido');
            allValid = false;
        } else if (!isValidEmail(capturedValues.email)) {
            showError(inputs.email, 'Por favor ingresa un email válido');
            allValid = false;
        } else {
            clearError(inputs.email);
        }
        
        // Validar ASUNTO
        if (!capturedValues.subject || capturedValues.subject.trim().length === 0) {
            showError(inputs.subject, 'Este campo es requerido');
            allValid = false;
        } else if (capturedValues.subject.trim().length < 5) {
            showError(inputs.subject, 'Mínimo 5 caracteres');
            allValid = false;
        } else {
            clearError(inputs.subject);
        }
        
        // Validar MENSAJE
        if (!capturedValues.message || capturedValues.message.trim().length === 0) {
            showError(inputs.message, 'Este campo es requerido');
            allValid = false;
        } else if (capturedValues.message.trim().length < 10) {
            showError(inputs.message, 'Mínimo 10 caracteres');
            allValid = false;
        } else {
            clearError(inputs.message);
        }
        
        console.log('📊 Validación completa:', allValid ? '✅ VÁLIDO' : '❌ INVALIDO');
        return allValid;
    }
    
    // 6. Funciones auxiliares
    function showError(input, message) {
        if (!input) return;
        
        const errorDiv = document.getElementById(`${input.id}-error`);
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
            errorDiv.style.display = 'block';
        }
        
        input.classList.add('border-red-500', 'focus:ring-red-500');
        input.classList.remove('border-gray-300', 'dark:border-gray-700', 'focus:ring-blue-500');
    }
    
    function clearError(input) {
        if (!input) return;
        
        const errorDiv = document.getElementById(`${input.id}-error`);
        if (errorDiv) {
            errorDiv.classList.add('hidden');
            errorDiv.style.display = 'none';
        }
        
        input.classList.remove('border-red-500', 'focus:ring-red-500');
        input.classList.add('border-gray-300', 'dark:border-gray-700', 'focus:ring-blue-500');
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // 7. MANEJADOR PRINCIPAL del formulario
    contactForm.addEventListener('submit', function(event) {
        console.log('🟡 EVENTO SUBMIT - Usando valores capturados');
        
        // PREVENIR SIEMPRE el envío automático
        event.preventDefault();
        event.stopPropagation();
        
        // Validar usando los valores CAPTURADOS (no los actuales)
        const isValid = validateWithCapturedValues();
        
        if (!isValid) {
            console.log('🔴 NO enviar - Errores encontrados');
            
            // Mostrar mensaje general
            showFormStatus('Por favor, corrige los errores en el formulario', 'error');
            return;
        }
        
        console.log('🟢 TODO VÁLIDO - Enviando formulario...');
        
        // Preparar envío
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
        
        showFormStatus('Enviando tu mensaje...', 'info');
        
        // Crear FormData con los valores ORIGINALES del formulario
        // (restaurar valores si se borraron)
        restoreFormValues();
        
        const formData = new FormData(contactForm);
        
        // Enviar con Fetch
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                // Éxito - redirigir
                window.location.href = 'https://miltongtzz.github.io/portafolio/gracias.html';
            } else {
                throw new Error('Error ' + response.status);
            }
        })
        .catch(error => {
            console.error('❌ Error:', error);
            showFormStatus('Error al enviar. Intenta nuevamente.', 'error');
            
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Fallback tradicional
            setTimeout(() => {
                restoreFormValues();
                const handler = arguments.callee;
                contactForm.removeEventListener('submit', handler);
                contactForm.submit();
            }, 2000);
        });
    });
    
    // 8. Función para RESTAURAR valores si se borraron
    function restoreFormValues() {
        console.log('🔄 Restaurando valores en el formulario...');
        
        if (inputs.name && capturedValues.name !== undefined) {
            inputs.name.value = capturedValues.name;
        }
        if (inputs.email && capturedValues.email !== undefined) {
            inputs.email.value = capturedValues.email;
        }
        if (inputs.subject && capturedValues.subject !== undefined) {
            inputs.subject.value = capturedValues.subject;
        }
        if (inputs.message && capturedValues.message !== undefined) {
            inputs.message.value = capturedValues.message;
        }
    }
    
    // 9. Función para mostrar estado
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
    }
    
    // 10. Limpiar errores al escribir
    Object.values(inputs).forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                clearError(this);
                // Actualizar valores capturados también
                capturedValues[this.id] = this.value;
            });
        }
    });
    
    console.log('✅ Sistema de captura temprana configurado');
    
    // 11. DEBUG
    window.verValores = function() {
        console.log('=== VALORES ACTUALES ===');
        console.log('Capturados:', capturedValues);
        console.log('En inputs:');
        Object.entries(inputs).forEach(([key, input]) => {
            if (input) {
                console.log(`${key}: "${input.value}" (capturado: "${capturedValues[key]}")`);
            }
        });
    };
});
