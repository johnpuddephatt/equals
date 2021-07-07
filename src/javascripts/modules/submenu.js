export default class Submenu {
  constructor(el) {
    el.addEventListener('click', subMenuLoader, false);
    function subMenuLoader(e) {
      var menuButton = document.querySelector('.menu-button');
      menuButton.classList.remove('menu-active');
      menuButton.classList.add('overlay-active');
      var target = el.dataset.overlay;
      var overlay = document.querySelector('.overlay-' + target);
      overlay.classList.toggle('active');
    }
  }
}
