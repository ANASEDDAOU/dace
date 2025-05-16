document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
  
    if (!toggle || !navList) {
      console.warn("⛔️ Burger-menu niet gevonden op deze pagina.");
      return;
    }
  
    toggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  });
  