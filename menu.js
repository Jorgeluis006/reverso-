// ==== MENÚ HAMBURGUESA MEJORADO ====
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const dropdowns = document.querySelectorAll('.dropdown');
  
  // Toggle menú principal
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });
  }
  
  // Toggle dropdowns en móviles
  dropdowns.forEach(dropdown => {
    const dropbtn = dropdown.querySelector('.dropbtn');
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    
    if (dropbtn && dropdownContent) {
      dropbtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Solo activar en móviles (900px o menos)
        if (window.innerWidth <= 900) {
          // Cerrar otros dropdowns
          dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('active');
              const otherContent = otherDropdown.querySelector('.dropdown-content');
              if (otherContent) {
                otherContent.classList.remove('active');
              }
            }
          });
          
          // Toggle del dropdown actual
          dropdown.classList.toggle('active');
          dropdownContent.classList.toggle('active');
        }
      });
    }
  });
  
  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function(e) {
    if (navMenu && navMenu.classList.contains('active')) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('open');
        
        // Cerrar todos los dropdowns
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
          const content = dropdown.querySelector('.dropdown-content');
          if (content) content.classList.remove('active');
        });
      }
    }
  });
  
  // Cerrar menú al hacer clic en un enlace (excepto dropdowns)
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 900) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('open');
      }
    });
  });
  
  // Ajustar comportamiento al redimensionar ventana
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 900) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('open');
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
          const content = dropdown.querySelector('.dropdown-content');
          if (content) content.classList.remove('active');
        });
      }
    }, 250);
  });
});
