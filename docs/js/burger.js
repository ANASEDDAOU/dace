// burger.js

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-toggle').forEach(toggle => {
      const nav     = toggle.closest('nav');
      const navList = nav.querySelector('.nav-list');
      const body    = document.body;
  
      toggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        body.classList.toggle('no-scroll', navList.classList.contains('active'));
      });
  
      navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navList.classList.remove('active');
          body.classList.remove('no-scroll');
        });
      });
    });
  });
  