async function loadMenu() {
  const res = await fetch('data/menu.json');
  const menuData = await res.json();
  const nav = document.querySelector('.navlist');

  menuData.forEach(menu => {
    const li = document.createElement('li');
    li.classList.add('navitem');
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
    nav.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', loadMenu);
