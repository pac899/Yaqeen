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

  // Shadow header on scroll
  const header = document.querySelector('.nav');
  const toTop = document.getElementById('toTop');
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if(header){
      header.classList.toggle('nav--scrolled', y > 10);
    }
    if(toTop){
      if(y > 300) toTop.classList.add('is-visible');
      else toTop.classList.remove('is-visible');
    }
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  if(toTop){
    toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
  }

  // Reveal on scroll using IntersectionObserver
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('reveal--visible');
          io.unobserve(entry.target);
        }
      })
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(el=> io.observe(el));
  } else {
    // Fallback
    revealEls.forEach(el=> el.classList.add('reveal--visible'));
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('.lightbox__img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox__close') : null;
  const openLightbox = (src, alt) => {
    if(!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'عرض الصورة';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    if(!lightbox || !lightboxImg) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden','true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  };
  if(lightbox){
    lightbox.addEventListener('click', (e)=>{
      if(e.target === lightbox) closeLightbox();
    });
  }
  if(lightboxClose){
    lightboxClose.addEventListener('click', closeLightbox);
  }
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') closeLightbox();
  });

  const galleryImgs = document.querySelectorAll('[data-lightbox-src]');
  galleryImgs.forEach(img=>{
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', ()=>{
      const src = img.getAttribute('data-lightbox-src');
      openLightbox(src, img.alt || '');
    });
  });
})();
