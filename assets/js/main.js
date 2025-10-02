// يقين - سلوك بسيط للواجهة
(function(){
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  const toggle = document.querySelector('.menu__toggle');
  const list = document.getElementById('menu-list');
  if(toggle && list){
    toggle.addEventListener('click', ()=>{
      const open = list.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(id && id.length>1){
        const el = document.querySelector(id);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:'smooth', block:'start'});
          list && list.classList.remove('is-open');
          toggle && toggle.setAttribute('aria-expanded','false');
        }
      }
    })
  });
})();
