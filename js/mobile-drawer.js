const btnHamb = document.getElementById('btnHamb');
const nav = document.getElementById('mainNav');

btnHamb.addEventListener('click', () => {
  const expanded = btnHamb.getAttribute('aria-expanded') === 'true';
  btnHamb.setAttribute('aria-expanded', !expanded);
  nav.classList.toggle('open');
});
