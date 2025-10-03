// ==========================
// RFEBRILLET BANK - MOBILE-DRAWER.JS
// Maneja el botón hamburguesa y la lógica del acordeón para submenús.
// ==========================

document.addEventListener('DOMContentLoaded', () => {
    const btnHamb = document.getElementById('btnHamb');
    const mainNav = document.getElementById('mainNav');
    
    if (!btnHamb || !mainNav) return; 

    // --- LÓGICA 1: Botón Hamburguesa (Abre/Cierra Drawer) ---
    btnHamb.addEventListener('click', () => {
        // Alternar la clase para mostrar/ocultar el cajón de navegación
        mainNav.classList.toggle('is-open'); 
        
        // Actualizar atributos de accesibilidad
        const isExpanded = mainNav.classList.contains('is-open');
        btnHamb.setAttribute('aria-expanded', isExpanded);
    });

    // --- LÓGICA 2: Acordeón del Submenú (Solo en móvil) ---
    
    // Selecciona todos los botones que activan el mega menú
    document.querySelectorAll('.navitem > button').forEach(menuButton => {
        menuButton.addEventListener('click', (e) => {
            // Detener la lógica en desktop (donde opera el hover de CSS)
            if(window.innerWidth > 992) return; 
            
            const megaMenu = menuButton.nextElementSibling; // El div.mega
            
            if (megaMenu && megaMenu.classList.contains('mega')) {
                
                // 1. Cierra cualquier otro mega-menú que esté abierto
                document.querySelectorAll('.mega.is-open').forEach(openMega => {
                    if (openMega !== megaMenu) {
                        openMega.classList.remove('is-open');
                        openMega.previousElementSibling.setAttribute('aria-expanded', 'false');
                    }
                });

                // 2. Toggle del mega-menú clickeado
                megaMenu.classList.toggle('is-open');
                const isExpanded = megaMenu.classList.contains('is-open');
                menuButton.setAttribute('aria-expanded', isExpanded);
            }
        });
    });
});
