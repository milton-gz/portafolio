// form.js - VERSIÓN FINAL CORREGIDA (sin validación inicial estricta)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!contactForm) return;
    
    console.log('Formulario cargado - Iniciando validación mejorada');
    
    // Elementos del formulario
    const inputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };
    
    // Verificar que todos los inputs existan
    Object.keys(inputs).forEach(key => {
        if (!inputs[key]) {
            console.error(`Input no encontrado: ${key}`);
        }
    });
    
    // Objeto para rastrear interacción del usuario
    const userInteracted = {
        name: false,
        email: false,
        subject: false,
        message: false
    };
    
    // Inicializar: ocultar todos los mensajes de error
    function initializeForm() {
        console.log('Inicializando formulario...');
        
        Object.keys(inputs).forEach(key => {
            const input = inputs[key];
            const errorDiv = document.getElementById(`${key}-error`);
            
            if (!input) return;
            
            // Limpiar estilos de error
            input.classList.remove('border-red-500', 'focus:ring-red-500');
            input.classList.add('border-gray-300', 'dark:border-gray-700', 'focus:ring-blue-500');
            
            // Ocultar mensaje de error
            if (errorDiv) {
                errorDiv.textContent = '';
                errorDiv.classList.add('hidden');
                errorDiv.style.display = 'none';
            }
            
            // Asegurar placeholder visible
            if (!input.value.trim()) {
                if (key === 'name') input.placeholder = 'Ej: Juan';
                if (key === 'email') input.placeholder = 'Ej: juan@ejemplo.com';
                if (key === 'subject') input.placeholder = 'Ej: Consulta sobre desarrollo web';
                if (key === 'message') input.placeholder = 'Hola Milton, me gustaría consultarte sobre...';
            }
        });
        
        if (formStatus) {
            formStatus.classList.add('hidden');
            formStatus.style.display = 'none';
        }
        
        console.log('Formulario inicializado - Errores ocultos');
    }
    
    // Configurar eventos para cada campo
    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        if (!input) return;
        
        const errorDiv = document.getElementById(`${key}-error`);
        
        console.log(`Configurando eventos para: ${key}`);
        
        // Focus: marcar como interactuado
        input.addEventListener('focus', function() {
            console.log(`Campo ${key} enfocado`);
            userInteracted[key] = true;
            // Guardar placeholder temporalmente
            this.dataset.originalPlaceholder = this.placeholder;
            this.placeholder = '';
        });
        
        // Blur: restaurar placeholder si está vacío
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.placeholder = this.dataset.originalPlaceholder || '';
            }
        });
        
        // Input: limpiar error cuando el usuario escribe
        input.addEventListener('input', function() {
            userInteracted[key] = true;
            clearError(input, errorDiv);
        });
        
        // Blur: validar solo si el usuario ha interactuado
        input.addEventListener('blur', function() {
            if (userInteracted[key]) {
                console.log(`Validando campo ${key} después de interacción`);
                validateSingleField(input, key);
            }
        });
    });
    
    // Validar un solo campo (VERSIÓN SIMPLIFICADA)
    function validateSingleField(field, fieldName) {
        const errorDiv = document.getElementById(`${fieldName}-error`);
        const value = field.value.trim();
        
        console.log(`Validando ${fieldName}: "${value}"`);
        
        // Si el campo está vacío Y el usuario ha interactuado
        if (!value && userInteracted[fieldName]) {
            console.log(`Campo ${fieldName} vacío - mostrando error`);
            showError(field, errorDiv, 'Este campo es requerido');
            return false;
        }
        
        // Solo hacer validaciones adicionales si hay contenido
        if (value) {
            // Validación ESPECIAL para NOMBRE - MUY FLEXIBLE
            if (fieldName === 'name') {
                // Solo verificar que tenga al menos 2 caracteres (muy flexible)
                if (value.length < 2) {
                    showError(field, errorDiv, 'Mínimo 2 caracteres');
                    return false;
                }
                // No limitar máximo, muy permisivo
            }
            
            // Validar email
            else if (fieldName === 'email') {
                if (!isValidEmail(value)) {
                    showError(field, errorDiv, 'Por favor ingresa un email válido');
                    return false;
                }
            }
            
            // Validar asunto - mínimo 5 caracteres
            else if (fieldName === 'subject') {
                if (value.length < 5) {
                    showError(field, errorDiv, 'Mínimo 5 caracteres');
                    return false;
                }
            }
            
            // Validar mensaje - mínimo 10 caracteres
            else if (fieldName === 'message') {
                if (value.length < 10) {
                    showError(field, errorDiv, 'Mínimo 10 caracteres');
                    return false;
                }
            }
        }
        
        // Si pasa todas las validaciones o está vacío pero no se ha interactuado
        clearError(field, errorDiv);
        console.log(`Campo ${fieldName} válido`);
        return true;
    }
    
    // Mostrar error
    function showError(field, errorDiv, message) {
        if (!field || !errorDiv) {
            console.error('No se puede mostrar error: campo o errorDiv no encontrado');
            return;
        }
        
        console.log(`Mostrando error en ${field.id}: ${message}`);
        
        field.classList.add('border-red-500', 'focus:ring-red-500');
        field.classList.remove('border-gray-300', 'dark:border-gray-700', 'focus:ring-blue-500');
        
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        errorDiv.style.display = 'block';
    }
    
    // Limpiar error
    function clearError(field, errorDiv) {
        if (!field) return;
        
        field.classList.remove('border-red-500', 'focus:ring-red-500');
        field.classList.add('border-gray-300', 'dark:border-gray-700', 'focus:ring-blue-500');
        
        if (errorDiv) {
            errorDiv.classList.add('hidden');
            errorDiv.style.display = 'none';
        }
    }
    
    // Validar email (función simple)
    function isValidEmail(email) {
        // Regex simple y permisivo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        console.log(`Validando email "${email}": ${isValid ? 'válido' : 'inválido'}`);
        return isValid;
    }
    
    // Validar TODO el formulario
    function validateForm() {
        console.log('=== VALIDANDO FORMULARIO COMPLETO ===');
        
        let isValid = true;
        let firstErrorField = null;
        let errors = [];
        
        Object.keys(inputs).forEach(key => {
            // Forzar validación al enviar
            userInteracted[key] = true;
            
            const field = inputs[key];
            if (!field) {
                errors.push(`Campo ${key} no encontrado`);
                isValid = false;
                return;
            }
            
            const fieldValid = validateSingleField(field, key);
            
            if (!fieldValid) {
                isValid = false;
                errors.push(`Error en ${key}: ${field.value}`);
                if (!firstErrorField) {
                    firstErrorField = field;
                }
            }
        });
        
        console.log('Resultado validación:', {
            isValid: isValid,
            errors: errors,
            firstErrorField: firstErrorField ? firstErrorField.id : 'ninguno'
        });
        
        return { isValid, firstErrorField };
    }
    
    // Manejar envío del formulario
    contactForm.addEventListener('submit', function(e) {
        console.log('=== INTENTANDO ENVIAR FORMULARIO ===');
        
        // Validar primero
        const validation = validateForm();
        
        if (!validation.isValid) {
            console.log('Formulario inválido - previniendo envío');
            e.preventDefault(); // Prevenir envío solo si hay errores
            
            let errorMessage = 'Por favor, completa todos los campos requeridos';
            if (validation.firstErrorField && validation.firstErrorField.id === 'name') {
                errorMessage = 'Por favor, revisa el campo de nombre';
            }
            
            showStatus(errorMessage, 'error');
            
            // Enfocar el primer campo con error
            if (validation.firstErrorField) {
                validation.firstErrorField.focus();
            }
            
            return;
        }
        
        console.log('Formulario válido - procediendo con envío');
        
        // Si pasa validación, permitir que FormSubmit haga su trabajo
        // Solo mostrar estado de carga
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
        
        showStatus('Enviando tu mensaje...', 'info');
        
        console.log('Formulario enviándose a FormSubmit...');
        
        // Restaurar botón después de 8 segundos (por si hay error)
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            if (formStatus) {
                formStatus.classList.add('hidden');
                formStatus.style.display = 'none';
            }
            console.log('Botón restaurado (timeout)');
        }, 8000);
    });
    
    // Mostrar mensaje de estado
    function showStatus(message, type) {
        if (!formStatus) {
            console.error('formStatus no encontrado');
            return;
        }
        
        console.log(`Mostrando estado: ${type} - ${message}`);
        
        formStatus.textContent = message;
        formStatus.className = 'p-4 rounded-lg mt-4';
        
        // Colores según tipo
        const typeClasses = {
            success: 'bg-green-100 text-green-700 border border-green-300 dark:bg-green-900/30 dark:text-green-300',
            error: 'bg-red-100 text-red-700 border border-red-300 dark:bg-red-900/30 dark:text-red-300',
            info: 'bg-blue-100 text-blue-700 border border-blue-300 dark:bg-blue-900/30 dark:text-blue-300'
        };
        
        formStatus.className = `p-4 rounded-lg mt-4 ${typeClasses[type]}`;
        formStatus.classList.remove('hidden');
        formStatus.style.display = 'block';
        
        // Ocultar mensaje después de 5 segundos
        if (type !== 'success') {
            setTimeout(() => {
                formStatus.classList.add('hidden');
                formStatus.style.display = 'none';
                console.log('Mensaje de estado ocultado');
            }, 5000);
        }
    }
    
    // Inicializar el formulario cuando carga la página
    initializeForm();
    
    // Agregar CSS para forzar que errores estén ocultos inicialmente
    const style = document.createElement('style');
    style.textContent = `
        /* Forzar que errores estén ocultos inicialmente */
        #name-error, #email-error, #subject-error, #message-error {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
        }
        
        /* Asegurar que inputs no tengan borde rojo inicial */
        #name, #email, #subject, #message {
            border-color: #d1d5db !important; /* gray-300 */
        }
        
        .dark #name, .dark #email, .dark #subject, .dark #message {
            border-color: #374151 !important; /* gray-700 */
        }
        
        /* Placeholders visibles */
        #name::placeholder, #email::placeholder, #subject::placeholder, #message::placeholder {
            opacity: 1 !important;
            color: #9ca3af !important; /* gray-400 */
        }
        
        .dark #name::placeholder, .dark #email::placeholder, 
        .dark #subject::placeholder, .dark #message::placeholder {
            color: #6b7280 !important; /* gray-500 */
        }
    `;
    document.head.appendChild(style);
    
    console.log('form.js cargado completamente');
    
    // DEBUG: Función para probar validación manualmente
    window.debugForm = function() {
        console.log('=== DEBUG FORMULARIO ===');
        console.log('Inputs:', inputs);
        console.log('UserInteracted:', userInteracted);
        
        Object.keys(inputs).forEach(key => {
            const input = inputs[key];
            if (input) {
                console.log(`${key}: value="${input.value}", interacted=${userInteracted[key]}`);
            }
        });
        
        // Simular validación
        const result = validateForm();
        console.log('Resultado validación:', result);
    };
});
