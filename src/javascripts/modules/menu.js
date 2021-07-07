export default class Menu {
  constructor(el) {
    el.addEventListener('click', menuLoader, false);
    function menuLoader(e) {
      if (e.target.classList.contains('overlay-active')) {
        e.target.classList.remove('overlay-active');
        var overlays = document.querySelectorAll('.overlay'), i;
        for (i = 0; i < overlays.length; ++i) {
          overlays[i].classList.remove('active');
        }
      }
      else {
        e.target.classList.toggle('menu-active');
      }
    }
  }
}
