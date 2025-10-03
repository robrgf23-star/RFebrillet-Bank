// ==========================
// RFEBRILLET BANK - MENU.JS
// Construye el menú principal y el sub-menú a partir de JSON.
// ==========================

/**
 * Función genérica para construir una lista de menú con Mega Menú.
 * @param {Array<Object>} menuData - Datos del menú.
 * @param {string} containerSelector - Selector del contenedor de destino (ej: '#mainNav').
 * @param {boolean} isSubMenu - Indica si es el sub-menú (para aplicar clases específicas).
 */
function buildMenu(menuData, containerSelector, isSubMenu = false) {
    const navContainer = document.querySelector(containerSelector);
    if (!navContainer) return;
    
    const navlist = document.createElement('ul');
    navlist.classList.add('navlist');
    
    // Si es el sub-menú, usamos una clase de estilo horizontal diferente
    if (isSubMenu) {
        navlist.classList.remove('navlist');
        navlist.classList.add('sub-navlist');
    }
    
    // Insertar elementos
    menuData.forEach(menu => {
        const li = document.createElement('li');
        li.classList.add('navitem'); // Clase importante para CSS (maneja el hover/acordeón)
        
        // Botón para desplegar el submenú (Mega)
        li.innerHTML = `
            <button aria-expanded="false" id="${menu.id}-btn">${menu.label}</button>
            <div class="mega" role="region" aria-labelledby="${menu.id}-btn">
                <div class="mega-cols">
                    ${menu.columns.map(col => `
                        <div class="col">
                            <h4>${col.title}</h4>
                            <ul>
                                ${col.items.map(item => 
                                    `<li><a href="${item.href}">${item.label}</a></li>`
                                ).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        navlist.appendChild(li);
    });

    // Agregar la lista al contenedor <nav>
    navContainer.appendChild(navlist);
}


async function initMainMenu() {
    try {
        const res = await fetch('data/menu.json');
        if (!res.ok) throw new Error('Error al cargar data/menu.json (Menú Principal)');
        const menuData = await res.json();
        
        const navContainer = document.getElementById('mainNav');
        if (!navContainer) return;
        
        // 1. Crear la lista UL principal
        const navlist = document.createElement('ul');
        navlist.classList.add('navlist');
        
        // --- 2. Elementos estáticos al inicio (Inicio, Productos, Servicios) ---
        navlist.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#servicios">Servicios</a></li>
        `;

        // --- 3. Insertar elementos dinámicos (Mega Menús Personas/Empresas) ---
        menuData.forEach(menu => {
            const li = document.createElement('li');
            li.classList.add('navitem'); 
            
            li.innerHTML = `
                <button aria-expanded="false" id="${menu.id}-btn">${menu.label}</button>
                <div class="mega" role="region" aria-labelledby="${menu.id}-btn">
                    <div class="mega-cols">
                        ${menu.columns.map(col => `
                            <div class="col">
                                <h4>${col.title}</h4>
                                <ul>
                                    ${col.items.map(item => 
                                        `<li><a href="${item.href}">${item.label}</a></li>`
                                    ).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            navlist.appendChild(li);
        });

        // --- 4. Elementos estáticos al final (Canales, Nosotros, Contacto) ---
        navlist.innerHTML += `
            <li><a href="#canales">Canales Digitales</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#contacto">Contacto</a></li>
        `;

        navContainer.appendChild(navlist);

    } catch (error) {
        console.error('Fallo al inicializar el Menú Principal:', error);
    }
}

async function initSubMenu() {
    try {
        const res = await fetch('data/sub-menu-data.json');
        if (!res.ok) throw new Error('Error al cargar data/sub-menu-data.json (Sub Menú)');
        const subMenuData = await res.json();
        
        // Reutilizamos la lógica de construcción de menú, marcando que es el sub-menú
        buildMenu(subMenuData, '#subMenuNav .container', true);

    } catch (error) {
        console.error('Fallo al inicializar el Sub Menú:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // Inicializar ambos menús
    initMainMenu();
    initSubMenu();
});
