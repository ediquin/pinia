/**
 * CAPYBARA CONSTRUCTION PAGE
 * Script principal para la página en construcción
 */

// ===========================================
// CONFIGURACIÓN
// ===========================================
const CONFIG = {
    capybaraCreationInterval: 3000, // Intervalo para crear capibaras flotantes (ms)
    capybaraLifetime: 10000,        // Tiempo de vida de capibaras flotantes (ms)
    clickAnimationDuration: 500,    // Duración de animación de click (ms)
};

// ===========================================
// FUNCIONES PRINCIPALES
// ===========================================

/**
 * Crea un capybara flotante dinámico
 */
function createFloatingCapybara() {
    const capybara = document.createElement('div');
    capybara.innerHTML = '🦫';
    capybara.className = 'floating-capibaras';
    
    // Posición aleatoria
    capybara.style.left = Math.random() * 100 + '%';
    capybara.style.top = Math.random() * 100 + '%';
    
    // Animación aleatoria
    capybara.style.animationDuration = (Math.random() * 5 + 5) + 's';
    capybara.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    
    // Agregar al DOM
    document.body.appendChild(capybara);
    
    // Remover después del tiempo configurado
    setTimeout(() => {
        if (capybara.parentNode) {
            capybara.remove();
        }
    }, CONFIG.capybaraLifetime);
}

/**
 * Maneja el efecto de click en el capybara principal
 */
function handleCapybaraClick() {
    const capybaraIcon = document.querySelector('.capybara-icon');
    
    if (!capybaraIcon) return;
    
    // Aplicar transformación
    capybaraIcon.style.transform = 'scale(1.2) rotate(360deg)';
    capybaraIcon.style.transition = `transform ${CONFIG.clickAnimationDuration}ms ease`;
    
    // Restaurar estado original
    setTimeout(() => {
        capybaraIcon.style.transform = 'scale(1)';
    }, CONFIG.clickAnimationDuration);
}

/**
 * Inicializa todos los event listeners
 */
function initializeEventListeners() {
    const capybaraIcon = document.querySelector('.capybara-icon');
    
    if (capybaraIcon) {
        capybaraIcon.addEventListener('click', handleCapybaraClick);
        
        // Agregar efecto de hover mejorado
        capybaraIcon.addEventListener('mouseenter', () => {
            capybaraIcon.style.filter = 'brightness(1.1)';
        });
        
        capybaraIcon.addEventListener('mouseleave', () => {
            capybaraIcon.style.filter = 'brightness(1)';
        });
    }
}

/**
 * Inicia la creación periódica de capibaras flotantes
 */
function startCapybaraGeneration() {
    setInterval(createFloatingCapybara, CONFIG.capybaraCreationInterval);
}

/**
 * Verifica si el dispositivo soporta animaciones
 */
function supportsAnimations() {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Función de inicialización principal
 */
function init() {
    // Verificar que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    // Inicializar componentes
    initializeEventListeners();
    
    // Solo iniciar animaciones si están soportadas
    if (supportsAnimations()) {
        startCapybaraGeneration();
    }
    
    console.log('🦫 Capybara Construction Page inicializada correctamente');
}

// ===========================================
// UTILIDADES ADICIONALES
// ===========================================

/**
 * Maneja errores de carga de imágenes
 */
function handleImageError() {
    const capybaraIcon = document.querySelector('.capybara-icon');
    if (capybaraIcon) {
        capybaraIcon.onerror = function() {
            console.warn('Error al cargar la imagen del capybara');
            // Fallback a emoji si la imagen no carga
            const fallback = document.createElement('div');
            fallback.innerHTML = '🦫';
            fallback.className = 'capybara-icon';
            fallback.style.fontSize = '6rem';
            fallback.style.lineHeight = '120px';
            this.parentNode.replaceChild(fallback, this);
        };
    }
}

/**
 * Mejora la accesibilidad
 */
function enhanceAccessibility() {
    // Permitir navegación por teclado del capybara principal
    const capybaraIcon = document.querySelector('.capybara-icon');
    if (capybaraIcon) {
        capybaraIcon.setAttribute('tabindex', '0');
        capybaraIcon.setAttribute('role', 'button');
        capybaraIcon.setAttribute('aria-label', 'Capybara animado - Presiona para interactuar');
        
        // Soporte para tecla Enter/Espacio
        capybaraIcon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCapybaraClick();
            }
        });
    }
}

// ===========================================
// INICIALIZACIÓN
// ===========================================

// Inicializar cuando el script se carga
init();

// Agregar mejoras adicionales
document.addEventListener('DOMContentLoaded', () => {
    handleImageError();
    enhanceAccessibility();
});