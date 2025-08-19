(function(){
  // Fade-in on scroll for sections on About page
  var options = { threshold: 0.1, rootMargin: '0px 0px -80px 0px' };
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, options);
  document.querySelectorAll('.about-section').forEach(function(sec){
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(18px)';
    sec.style.transition = 'opacity .6s ease-out, transform .6s ease-out';
    io.observe(sec);
  });

  // Count-up numbers for about stats
  var stats = document.querySelectorAll('.stat-number');
  if (stats.length) {
    var started = false;
    var host = document.querySelector('.about-stats');
    var statsObserver = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if (entry.isIntersecting && !started) {
          started = true;
          stats.forEach(function(el){
            var target = +el.getAttribute('data-target') || 0;
            var current = 0;
            var inc = Math.max(1, Math.ceil(target / 900));
            (function tick(){
              current = Math.min(target, current + inc);
              el.textContent = String(current);
              if (current < target) requestAnimationFrame(tick);
            })();
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    if (host) statsObserver.observe(host);
  }
})();

// Simple carousel for About gallery
(function(){
  var track = document.getElementById('aboutGalleryTrack');
  if (!track) return;
  var slides = track.children;
  var index = 0;
  var total = slides.length;
  var prev = document.getElementById('aboutGalleryPrev');
  var next = document.getElementById('aboutGalleryNext');
  var dotsHost = document.getElementById('aboutGalleryDots');
  var dots = [];

  function buildDots(){
    if (!dotsHost) return;
    dotsHost.innerHTML = '';
    for (var i=0;i<total;i++){
      var b = document.createElement('button');
      (function(j){ b.addEventListener('click', function(){ goTo(j); }); })(i);
      dotsHost.appendChild(b); dots.push(b);
    }
  }

  function update(){
    track.style.transform = 'translateX(' + (-index*100) + '%)';
    for (var i=0;i<dots.length;i++) dots[i].classList.toggle('active', i===index);
  }

  function goTo(i){ index = (i+total)%total; update(); }
  function step(d){ goTo(index + d); }

  prev && prev.addEventListener('click', function(){ step(-1); });
  next && next.addEventListener('click', function(){ step(1); });
  buildDots();
  update();

  var auto = setInterval(function(){ step(1); }, 5000);
  var viewport = track.parentElement;
  viewport.addEventListener('mouseenter', function(){ clearInterval(auto); auto = null; });
  viewport.addEventListener('mouseleave', function(){ if (!auto) auto = setInterval(function(){ step(1); }, 5000); });
})();

// Defensive: ensure hamburger menu exists and styles apply on About page
(function ensureHamburger(){
  function attach(){
    var headerContainer = document.querySelector('header .container');
    var nav = document.querySelector('header nav');
    if (!headerContainer || !nav) return false;
    var toggle = headerContainer.querySelector('.menu-toggle');
    if (!toggle) {
      toggle = document.createElement('div');
      toggle.className = 'menu-toggle';
      toggle.innerHTML = '<span></span><span></span><span></span>';
      headerContainer.appendChild(toggle);
    }
    if (!toggle._bound) {
      toggle.addEventListener('click', function(){
        nav.classList.toggle('active');
        toggle.classList.toggle('open');
      });
      toggle._bound = true;
    }
    // Ensure mobile styles exist (fallback if the global script hasn't injected them)
    if (!document.getElementById('about-mobile-menu-styles')){
      var s = document.createElement('style');
      s.id = 'about-mobile-menu-styles';
      s.textContent = '\n@media (max-width: 768px){\n  .menu-toggle{display:flex;position:absolute;right:0;top:18px;flex-direction:column;justify-content:space-between;width:30px;height:21px;cursor:pointer;z-index:1600;}\n  .menu-toggle span{display:block;height:3px;width:100%;background-color:var(--secondary-color);border-radius:3px;transition:var(--transition);}\n  .menu-toggle.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px);}\n  .menu-toggle.open span:nth-child(2){opacity:0;}\n  .menu-toggle.open span:nth-child(3){transform:rotate(-45deg) translate(7px,-6px);}\n  header nav{position:fixed;font-weight:600;top:0;right:0;height:100vh;width:75%;max-width:320px;background-color:rgba(255,255,255,0.12);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);flex-direction:column;align-items:flex-start;padding:80px 24px 24px;box-shadow:-10px 0 20px rgba(0,0,0,0.1);transform:translateX(100%);opacity:0;visibility:hidden;transition:transform .3s ease, opacity .3s ease, visibility .3s ease;z-index:1500;}\n  header nav.active{transform:translateX(0);opacity:1;visibility:visible;}\n  header nav ul{flex-direction:column;gap:16px;margin-top:0;width:100%;}\n  header nav ul li{margin:0;}\n  header nav ul li a{font-size:1.1rem;display:block;width:100%;padding:10px 0;position:relative;}\n}\n';
      document.head.appendChild(s);
    }
    return true;
  }
  if (!attach()) {
    document.addEventListener('headerLoaded', attach);
  }
})();


