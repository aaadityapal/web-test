(function(){
  // Ensure autoplay starts after header loads (some browsers block until interaction)
  document.addEventListener('headerLoaded', function(){
    var v = document.getElementById('projectsHeroVideo');
    if (v && v.paused) {
      var playPromise = v.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(function(){ /* ignore autoplay rejection */ });
      }
    }
  });
  var projects = [
    {
      id: 'jewar',
      name: 'Residence At Jewar, Greater Noida',
      category: 'residential',
      city: 'Greater Noida',
      areaSqft: 3200,
      badge: 'Residential',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'sector-12',
      name: 'Sector 12 Residence, Noida',
      category: 'residential',
      city: 'Noida',
      areaSqft: 2100,
      badge: 'Residential',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'loni',
      name: 'Residential Project in Loni',
      category: 'residential',
      city: 'Loni',
      areaSqft: 1800,
      badge: 'Residential',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'rohtak',
      name: 'Residential Project in Rohtak',
      category: 'residential',
      city: 'Rohtak',
      areaSqft: 2400,
      badge: 'Residential',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'muradnagar',
      name: 'Residential Project in Muradnagar',
      category: 'residential',
      city: 'Muradnagar',
      areaSqft: 2200,
      badge: 'Residential',
      image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2cb9?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'sector-40',
      name: 'Residence in Sector-40, Noida',
      category: 'residential',
      city: 'Noida',
      areaSqft: 2600,
      badge: 'Residential',
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'hotel-mumbai',
      name: 'Boutique Hotel, Mumbai',
      category: 'hospitality',
      city: 'Mumbai',
      areaSqft: 12000,
      badge: 'Hospitality',
      image: 'https://images.unsplash.com/photo-1551776235-dde6d4829808?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'cafe-dwarka',
      name: 'Cafe in Dwarka',
      category: 'commercial',
      city: 'Dwarka',
      areaSqft: 2800,
      badge: 'Commercial',
      image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'oyo-hosiyarpur',
      name: 'OYO Hotel, Hosiyarpur',
      category: 'hospitality',
      city: 'Hosiyarpur',
      areaSqft: 15000,
      badge: 'Hospitality',
      image: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'sweet-shop-delhi',
      name: 'Sweet Shop, Delhi',
      category: 'commercial',
      city: 'Delhi',
      areaSqft: 1200,
      badge: 'Commercial',
      image: 'https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'labs-rohtak',
      name: 'Laboratory, Rohtak',
      category: 'institutional',
      city: 'Rohtak',
      areaSqft: 6400,
      badge: 'Institutional',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'hospital-bharatpur',
      name: 'Hospital, Bharatpur',
      category: 'institutional',
      city: 'Bharatpur',
      areaSqft: 22000,
      badge: 'Institutional',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=70'
    }
  ];

  var state = {
    query: '',
    category: 'all',
    sort: 'newest',
    filtered: projects.slice()
  };

  function renderProjects() {
    var grid = document.getElementById('projectsGrid');
    if (!grid) return;
    var list = state.filtered
      .filter(function(p){
        if (state.category !== 'all' && p.category !== state.category) return false;
        if (!state.query) return true;
        var q = state.query.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      })
      .sort(function(a,b){
        if (state.sort === 'newest' || state.sort === 'oldest') {
          // No date field: keep original order for newest, reverse for oldest
          return state.sort === 'newest' ? 0 : 0;
        }
        if (state.sort === 'areaDesc') return b.areaSqft - a.areaSqft;
        if (state.sort === 'areaAsc') return a.areaSqft - b.areaSqft;
        return 0;
      });

    grid.innerHTML = list.map(function(p, idx){
      return (
        '<article class="project-card" data-id="'+p.id+'">\
          <div class="project-media">\
            <span class="project-badge">'+p.badge+'</span>\
            <img src="'+p.image+'" alt="'+p.name+' image" loading="lazy"/>\
          </div>\
          <div class="project-body">\
            <h3 class="project-title">'+p.name+'</h3>\
            <div class="project-meta">\
              <span><i class="fas fa-city"></i> '+p.city+'</span>\
              <span><i class="fas fa-ruler-combined"></i> '+p.areaSqft.toLocaleString()+' sqft</span>\
              <span><i class="fas fa-tag"></i> '+p.category.charAt(0).toUpperCase()+p.category.slice(1)+'</span>\
            </div>\
            <div class="project-actions">\
              <button class="btn-primary" data-action="view" data-index="'+idx+'"><i class="fas fa-eye"></i> View</button>\
              <a class="btn-dark" href="#contact"><i class="fas fa-paper-plane"></i> Enquire</a>\
            </div>\
          </div>\
        </article>'
      );
    }).join('');
  }

  function setActiveChip(target) {
    var chips = document.querySelectorAll('.filters .chip');
    for (var i=0;i<chips.length;i++) { chips[i].classList.remove('active'); }
    if (target) target.classList.add('active');
  }

  function attachEvents() {
    var search = document.getElementById('searchInput');
    if (search) {
      search.addEventListener('input', function(e){
        state.query = e.target.value || '';
        renderProjects();
      });
    }

    var sort = document.getElementById('sortSelect');
    if (sort) {
      sort.addEventListener('change', function(e){
        state.sort = e.target.value;
        renderProjects();
      });
    }

    var filters = document.querySelector('.filters');
    if (filters) {
      filters.addEventListener('click', function(e){
        var btn = e.target.closest('.chip');
        if (!btn) return;
        state.category = btn.getAttribute('data-category') || 'all';
        setActiveChip(btn);
        renderProjects();
      });
    }

    var grid = document.getElementById('projectsGrid');
    if (grid) {
      grid.addEventListener('click', function(e){
        var btn = e.target.closest('[data-action="view"]');
        if (!btn) return;
        var index = parseInt(btn.getAttribute('data-index'), 10);
        openViewer(index);
      });
    }

    var closeBtn = document.getElementById('projectViewerClose');
    var overlay = document.getElementById('projectViewer');
    if (closeBtn && overlay) {
      closeBtn.addEventListener('click', function(){ closeViewer(); });
      overlay.addEventListener('click', function(e){ if (e.target === overlay) closeViewer(); });
    }

    var prevBtn = document.getElementById('projectPrev');
    var nextBtn = document.getElementById('projectNext');
    if (prevBtn) prevBtn.addEventListener('click', function(){ stepViewer(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function(){ stepViewer(1); });
    document.addEventListener('keydown', function(e){
      if (!viewer.open) return;
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowLeft') stepViewer(-1);
      if (e.key === 'ArrowRight') stepViewer(1);
    });
  }

  var viewer = { open: false, index: 0 };
  function openViewer(index) {
    viewer.open = true; viewer.index = index;
    var item = state.filtered[index];
    var img = document.getElementById('projectViewerImg');
    var cap = document.getElementById('projectViewerCaption');
    var overlay = document.getElementById('projectViewer');
    if (item && img && cap && overlay) {
      img.src = item.image;
      img.alt = item.name + ' image large view';
      cap.textContent = item.name + ' • ' + item.city + ' • ' + item.areaSqft.toLocaleString() + ' sqft';
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
    }
  }
  function closeViewer() {
    viewer.open = false;
    var overlay = document.getElementById('projectViewer');
    if (overlay) {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
    }
  }
  function stepViewer(delta) {
    var max = state.filtered.length;
    viewer.index = (viewer.index + delta + max) % max;
    openViewer(viewer.index);
  }

  // Initialize
  state.filtered = projects.slice();
  renderProjects();
  attachEvents();
})();


