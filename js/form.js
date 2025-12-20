// form.js - VERSIÓN CORREGIDA (sin validación inicial)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!contactForm) return;
    
    // Objeto para rastrear qué campos han sido interactuados
    const interactedFields = new Set();
    
    // Obtener todos los campos requeridos
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    
    // Configurar eventos para cada campo
    inputs.forEach(input => {
        // Marcar cuando el usuario interactúa por primera vez
        input.addEventListener('focus', function() {
            interactedFields.add(this.id);
            // Ocultar placeholder temporalmente
            this.dataset.placeholder = this.placeholder;
            this.placeholder = '';
        });
        
        // Restaurar placeholder si el campo queda vacío
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.placeholder = this.dataset.placeholder || '';
            }
        });
        
        // Validar solo cuando el usuario sale del campo Y ha interactuado antes
        input.addEventListener('blur', function() {
            if (interactedFields.has(this.id)) {
                validateField(this);
            }
        });
        
        // Limpiar error cuando el usuario escribe
        input.addEventListener('input', function() {
            interactedFields.add(this.id);
            clearFieldError(this);
        });
    });
    
    // Validar un campo específico
    function validateField(field) {
        const errorSpan = document.getElementById(`${field.id}-error`);
        
        // Solo validar si el campo está vacío
        if (!field.value.trim()) {
            showError(field, errorSpan, 'Este campo es requerido');
            return false;
        }
        
        // Validaciones adicionales solo si hay contenido
        if (field.value.trim()) {
            if (field.type === 'email' && !isValidEmail(field.value)) {
                showError(field, errorSpan, 'Por favor ingresa un email válido');
                return false;
            }
            
            if (field.minLength && field.value.length < field.minLength) {
                showError(field, errorSpan, `Mínimo ${field.minLength} caracteres`);
                return false;
            }
        }
        
        clearError(field, errorSpan);
        return true;
    }
    
    // Validar campo específico (versión para evento)
    function validateFieldEvent(e) {
        validateField(e.target);
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
    
    function clearFieldError(field) {
        const errorSpan = document.getElementById(`${field.id}-error`);
        clearError(field, errorSpan);
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Validación antes de enviar
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Forzar validación de todos los campos al enviar
        inputs.forEach(input => {
            // Marcar como interactuado
            interactedFields.add(input.id);
            
            // Validar
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showStatus('Por favor, completa todos los campos requeridos', 'error');
            return;
        }
        
        // Si pasa validación, proceder con FormSubmit
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
        
        showStatus('Enviando tu mensaje...', 'info');
        
        // FormSubmit manejará el envío y redirección
        // Restaurar botón después de 8 segundos (solo por si hay error)
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            if (formStatus) {
                formStatus.classList.add('hidden');
            }
        }, 8000);
    });
    
    function showStatus(message, type) {
        if (!formStatus) return;
        
        formStatus.textContent = message;
        formStatus.className = 'mt-4 p-4 rounded-lg block';
        
        switch(type) {
            case 'success':
                formStatus.classList.add('bg-green-100', 'text-green-700', 'border', 'border-green-300', 'dark:bg-green-900/30', 'dark:text-green-300');
                break;
            case 'error':
                formStatus.classList.add('bg-red-100', 'text-red-700', 'border', 'border-red-300', 'dark:bg-red-900/30', 'dark:text-red-300');
                break;
            case 'info':
                formStatus.classList.add('bg-blue-100', 'text-blue-700', 'border', 'border-blue-300', 'dark:bg-blue-900/30', 'dark:text-blue-300');
                break;
        }
        
        formStatus.classList.remove('hidden');
        
        // Ocultar mensaje después de 5 segundos (excepto éxito)
        if (type !== 'success') {
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);
        }
    }
    
    // Inicialización: ocultar todos los errores al cargar
    function initializeForm() {
        inputs.forEach(input => {
            const errorSpan = document.getElementById(`${input.id}-error`);
            if (errorSpan) {
                errorSpan.classList.add('hidden');
            }
        });
        
        if (formStatus) {
            formStatus.classList.add('hidden');
        }
    }
    
    // Ejecutar inicialización
    initializeForm();
});
