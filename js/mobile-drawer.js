document.addEventListener('DOMContentLoaded', () => {
  const btnHamb = document.getElementById('btnHamb');
  const mainNav = document.querySelector('.menu-principal .navlist');
  const secNav = document.querySelector('.menu-secundario .navlist');

  btnHamb.addEventListener('click', () => {
    mainNav.classList.toggle('show');
    secNav.classList.toggle('show');
  });

  document.querySelectorAll('.menu-principal .navlist > li > a, .menu-secundario .navlist > li > a').forEach(item => {
    item.addEventListener('click', (e) => {
      const submenu = item.nextElementSibling;
      if (submenu && (submenu.classList.contains('submenu') || submenu.classList.contains('mega-menu'))) {
        if(window.innerWidth <= 992){
          e.preventDefault();
          submenu.classList.toggle('show');
        }
      }
    });
  });
});
