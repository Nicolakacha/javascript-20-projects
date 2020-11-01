const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const navItems = document.querySelectorAll('li');

menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
})

function navAnimation(d1, d2) {
  navItems.forEach((nav, i) => {
    nav.classList.replace(`slide-${d1}-${i+1}`, `slide-${d2}-${i+1}`);
  })
};

function toggleNav() {
  menuBars.classList.toggle('change');
  overlay.classList.toggle('overlay-active');
  if (overlay.classList.contains('overlay-active')) {
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right')
    navAnimation('out', 'in');  
  } else {
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left')
    navAnimation('in', 'out');
  }
}