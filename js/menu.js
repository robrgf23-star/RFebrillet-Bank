async function initMenu() {
  try {
    const res = await fetch('data/menu.json');
    if (!res.ok) throw new Error('Error al cargar menu.json');
    const menuData = await res.json();
    
    const navContainer = document.getElementById('mainNav'); 
    
    // 1. Crear la lista UL principal
    const navlist = document.createElement('ul');
    navlist.classList.add('navlist');
    
    // 2. Insertar elementos estáticos (enlaces que no tienen submenú complejo)
    navlist.innerHTML = `
      <li><a href="index.html">Inicio</a></li>
      <li><a href="#productos">Productos</a></li>
      <li><a href="#servicios">Servicios</a></li>
    `;
    
    // 3. Insertar elementos dinámicos (los que tienen Mega Menú)
    menuData.forEach(menu => {
      const li = document.createElement('li');
      li.classList.add('navitem'); // Clase importante para CSS
      
      // La etiqueta es un <button> para el menú desktop/móvil que abre el submenú
      li.innerHTML = `
        <button aria-expanded="false">${menu.label}</button>
        <div class="mega" role="region">
          ${menu.columns.map(col => `
            <div class="col">
              <h4>${col.title}</h4>
              <ul>
                ${col.items.map(item => `<li><a href="${item.href}">${item.label}</a></li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      `;
      navlist.appendChild(li);
    });

    // 4. Insertar los últimos enlaces estáticos
    navlist.innerHTML += `
      <li><a href="#canales">Canales Digitales</a></li>
      <li><a href="#nosotros">Nosotros</a></li>
      <li><a href="#contacto">Contacto</a></li>
    `;

    // 5. Agregar la lista al contenedor <nav>
    navContainer.appendChild(navlist);

  } catch (error) {
    console.error('Fallo al inicializar el menú:', error);
  }
}

document.addEventListener('DOMContentLoaded', initMenu);