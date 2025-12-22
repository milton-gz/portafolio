// Theme System with 6 Color Schemes
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeIcon = document.getElementById('theme-icon');
const themeIconMobile = document.getElementById('theme-icon-mobile');

// Color schemes array (6 paletas)
const colorSchemes = ['blue', 'green', 'purple', 'amber', 'neon', 'cyan'];

// Font imports for each theme
const themeFonts = {
    'blue': {
        heading: 'Inter',
        body: 'Inter'
    },
    'green': {
        heading: 'Montserrat',
        body: 'Open Sans'
    },
    'purple': {
        heading: 'Playfair Display',
        body: 'Raleway'
    },
    'amber': {
        heading: 'Poppins',
        body: 'Nunito'
    },
    'neon': {
        heading: 'Orbitron',
        body: 'Exo 2'
    },
    'cyan': {
        heading: 'Ubuntu',
        body: 'Roboto'
    }
};

// Load fonts dynamically
function loadThemeFonts(scheme) {
    const fonts = themeFonts[scheme];
    
    // You would need to add these to your HTML or use @import
    // For now, we'll just update CSS variables
    document.documentElement.style.setProperty('--font-heading', fonts.heading);
    document.documentElement.style.setProperty('--font-body', fonts.body);
}

// Initialize theme from localStorage or system preference
function initializeTheme() {
    // Theme mode (dark/light)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateThemeIcons(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeIcons(false);
    }
    
    // Color scheme
    const savedColorScheme = localStorage.getItem('color-scheme') || 'blue';
    applyColorScheme(savedColorScheme);
    
    // Update color options UI
    updateColorOptions();
}

// Toggle dark/light mode
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeIcons(isDarkMode);
    updateColorOptions();
    
    // Apply theme-specific styles
    const currentScheme = localStorage.getItem('color-scheme') || 'blue';
    applyColorScheme(currentScheme);
}

// Update theme icons
function updateThemeIcons(isDark) {
    if (isDark) {
        themeIcon?.classList.replace('fa-moon', 'fa-sun');
        themeIconMobile?.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon?.classList.replace('fa-sun', 'fa-moon');
        themeIconMobile?.classList.replace('fa-sun', 'fa-moon');
    }
}

// Apply color scheme
function applyColorScheme(scheme) {
    // Validate scheme
    if (!colorSchemes.includes(scheme)) {
        scheme = 'blue';
    }
    
    // Remove all color scheme classes
    colorSchemes.forEach(s => {
        document.body.classList.remove(`color-scheme-${s}`);
    });
    
    // Add the selected scheme
    document.body.classList.add(`color-scheme-${scheme}`);
    
    // Load theme fonts
    loadThemeFonts(scheme);
    
    // Update active state in UI
    const colorOptions = document.querySelectorAll('.color-option, .color-dot-glass');
    colorOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-scheme') === scheme) {
            option.classList.add('active');
        }
    });
    
    // Save to localStorage
    localStorage.setItem('color-scheme', scheme);
    
    // Dispatch custom event for other components
    document.dispatchEvent(new CustomEvent('colorschemechange', { 
        detail: { scheme } 
    }));
    
    // Add animation effect
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 1000);
}

// Update color options based on current theme
function updateColorOptions() {
    const colorOptions = document.querySelectorAll('.color-option, .color-dot-glass');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    colorOptions.forEach(option => {
        const scheme = option.getAttribute('data-scheme');
        if (option.classList.contains('active')) {
            option.style.borderColor = isDarkMode ? '#e2e8f0' : '#1e293b';
        }
        
        // Update option colors based on scheme
        switch(scheme) {
            case 'blue':
                option.style.backgroundColor = '#4f46e5';
                break;
            case 'green':
                option.style.backgroundColor = '#059669';
                break;
            case 'purple':
                option.style.backgroundColor = '#7c3aed';
                break;
            case 'amber':
                option.style.backgroundColor = '#d97706';
                break;
            case 'neon':
                option.style.backgroundColor = '#db2777';
                break;
            case 'cyan':
                option.style.backgroundColor = '#0891b2';
                break;
        }
    });
}

// Color Scheme Changer
function setupColorSchemeButtons() {
    const colorOptions = document.querySelectorAll('.color-option, .color-dot-glass');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const scheme = this.getAttribute('data-scheme');
            if (colorSchemes.includes(scheme)) {
                applyColorScheme(scheme);
                
                // Add click animation
                this.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.2)';
                }, 150);
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
        });
        
        // Add tooltip
        const scheme = option.getAttribute('data-scheme');
        const schemeNames = {
            'blue': 'Azul Profesional',
            'green': 'Verde Natural',
            'purple': 'Púrpura Creativo',
            'amber': 'Ámbar Energético',
            'neon': 'Rosa Neón',
            'cyan': 'Cian Profundo'
        };
        option.setAttribute('title', schemeNames[scheme]);
    });
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        initializeTheme();
    }
});

// Initialize everything
function initThemeSystem() {
    initializeTheme();
    setupColorSchemeButtons();
    
    // Event listeners for theme toggles
    themeToggle?.addEventListener('click', toggleTheme);
    themeToggleMobile?.addEventListener('click', toggleTheme);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initThemeSystem,
        toggleTheme,
        applyColorScheme,
        colorSchemes
    };
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSystem);
} else {
    initThemeSystem();
}
