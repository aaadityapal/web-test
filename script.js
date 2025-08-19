// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'var(--light-color)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply observer to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Apply observer to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Apply observer to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
    
    // Style the message
    successMessage.style.position = 'fixed';
    successMessage.style.top = '20px';
    successMessage.style.right = '20px';
    successMessage.style.backgroundColor = 'var(--primary-color)';
    successMessage.style.color = 'white';
    successMessage.style.padding = '15px 25px';
    successMessage.style.borderRadius = '5px';
    successMessage.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    successMessage.style.zIndex = '10000';
    successMessage.style.opacity = '0';
    successMessage.style.transform = 'translateX(20px)';
    successMessage.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    
    // Add message to the page
    document.body.appendChild(successMessage);
    
    // Animate in
    setTimeout(() => {
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateX(0)';
    }, 10);
    
    // Reset form
    this.reset();
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateX(20px)';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 300);
    }, 5000);
});

// Parallax effect disabled to prevent overlap with header and other hero elements

// Dynamic project card rotation based on mouse position
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.querySelector('.card-3d').style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.card-3d').style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Counter animation for stats
const counters = document.querySelectorAll('.stat-item h3');
const speed = 1500; // slower counting

const countUp = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 25);
            } else {
                counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
            }
        };
        updateCount();
    });
};

// Trigger counter animation when stats section is in view
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            countUp();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add data-target attributes to stat counters
document.querySelectorAll('.stat-item h3').forEach(counter => {
    const text = counter.innerText;
    const number = parseInt(text);
    if (!isNaN(number)) {
        counter.setAttribute('data-target', number);
    }
});

// Impact stats counters (unique classes)
const impactCounters = document.querySelectorAll('.impact-stat-number');
const impactSpeed = 900; // slower counting for impact stats
const runImpactCount = () => {
    impactCounters.forEach(el => {
        const update = () => {
            const target = +el.getAttribute('data-target');
            const currentText = el.innerText.replace(/\D/g, '');
            const count = currentText ? +currentText : 0;
            const inc = Math.max(1, Math.ceil(target / impactSpeed));
            if (count < target) {
                el.innerText = (count + inc) + (el.getAttribute('data-suffix') || '');
                requestAnimationFrame(update);
            } else {
                el.innerText = target + (el.getAttribute('data-suffix') || '');
            }
        };
        update();
    });
};

const impactSection = document.querySelector('.impact-stats-section');
if (impactSection && impactCounters.length) {
    const impactObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runImpactCount();
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    impactObserver.observe(impactSection);
}

// Infinite scrolling background for hero section
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

// Typewriter effect for hero heading
(function () {
    const element = document.getElementById('typewriter');
    if (!element) return;

    const phrases = [
        "Creating Inspiring Spaces with ArchitectsHive",
        
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const TYPE_SPEED = 70;     // ms per character when typing
    const DELETE_SPEED = 45;   // ms per character when deleting
    const HOLD_TIME = 1500;    // ms to hold when a word completes

    function renderTextWithAccent(text) {
        if (!text) {
            element.textContent = '';
            return;
        }
        const trimmed = text.replace(/\s+$/,'');
        const lastSpace = trimmed.lastIndexOf(' ');
        if (lastSpace === -1) {
            element.innerHTML = `<span class="type-accent">${trimmed}</span>`;
            return;
        }
        const before = trimmed.slice(0, lastSpace);
        const last = trimmed.slice(lastSpace + 1);
        element.innerHTML = `${before} <span class="type-accent">${last}</span>`;
    }

    function tick() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            charIndex = Math.max(0, charIndex - 1);
        } else {
            charIndex = Math.min(current.length, charIndex + 1);
        }

        renderTextWithAccent(current.slice(0, charIndex));

        if (!isDeleting && charIndex === current.length) {
            setTimeout(() => { isDeleting = true; tick(); }, HOLD_TIME);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);
    }

    tick();
})();

// Build featured product cards mimicking e‑commerce layout
(function buildProducts(){
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  const products = [
    { img: 'floor_plans/500SQFT.jpg', title: 'Architect Design Package: upto 500 Sq.Ft. Projects.', sub: '', price: '₹7,499.00' },
    { img: 'floor_plans/501-1000SQFT.jpg', title: 'Architect Design Package:  501 to 1000 Sq.Ft. Projects.', sub: '', price: '₹9,999.00' },
    { img: 'floor_plans/1000-1500SQFT.jpg', title: 'Architect Design Package: 1001 to 1500 Sq.Ft.', sub: '', price: '₹12,699.00' },
    { img: 'floor_plans/1501-2000SQFT.jpg', title: 'Architect Design Package: 1501 to 2000 Sq.Ft.', sub: '', price: '₹16,099.00' },
    { img: 'floor_plans/2001-2500SQFT.jpg', title: 'Architect Design Package: 2001 to 2500 Sq.Ft.', sub: '', price: '₹16,499.00' },
    { img: 'floor_plans/2501-3000SQFT.jpg', title: 'Architect Design Package: 2501 to 3000 Sq.Ft.', sub: '', price: '₹21,999.00' },
    { img: 'floor_plans/3001-3500SQFT.jpg', title: 'Architect Design Package: 3001 to 3500 Sq.Ft.', sub: '', price: '₹22,999.00' },
    { img: 'floor_plans/3501-4000SQFT.jpg', title: 'Architect Design Package: 3501 to 4000 Sq.Ft.', sub: '', price: '₹26,499.00' },
    { img: 'floor_plans/4001-4500SQFT.jpg', title: 'Architect Design Package: 4001 to 4500 Sq.Ft.', sub: '', price: '₹27,999.00' },
    { img: 'floor_plans/4501-5000SQFT.jpg', title: 'Architect Design Package: 4501 to 5000 Sq.Ft.', sub: '', price: '₹28,999.00' },
  ];
  const exists = (src) => new Promise(res=>{ const i=new Image(); i.onload=()=>res(true); i.onerror=()=>res(false); i.src=src; });
  Promise.all(products.map(p=>exists(p.img))).then(flags=>{
    const items = products.filter((p,idx)=>flags[idx]);
    grid.innerHTML = items.map(p=>`
      <div class="product-card">
        <div class="product-media"><img src="${p.img}" alt="${p.title}"></div>
        <div class="product-title">${p.title}</div>
        ${p.sub?`<div class="product-sub">${p.sub}</div>`:''}
        <div class="product-price">${p.price}</div>
        <div class="product-actions">
          <button class="btn-preview" data-img="${p.img}" data-title="${p.title}">Preview</button>
          <button class="btn-buy" data-title="${p.title}">Buy Now</button>
        </div>
      </div>`).join('');
    grid.querySelectorAll('.btn-buy').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const headerCta = document.querySelector('.header-cta');
        if (headerCta) headerCta.click();
      });
    });
    // preview lightbox for products
    const viewer = document.getElementById('productViewer');
    const viewerImg = document.getElementById('productViewerImg');
    const viewerCaption = document.getElementById('productViewerCaption');
    const btnClose = document.getElementById('productViewerClose');
    const btnPrev = document.getElementById('productPrev');
    const btnNext = document.getElementById('productNext');
    let current = 0;
    const open = (i)=>{ current=i; viewerImg.src = items[i].img; viewerCaption.textContent = items[i].title; viewer.classList.add('active'); };
    const close = ()=> viewer.classList.remove('active');
    const prev = ()=> open((current-1+items.length)%items.length);
    const next = ()=> open((current+1)%items.length);
    grid.querySelectorAll('.btn-preview').forEach((btn,i)=> btn.addEventListener('click',()=> open(i)));
    btnClose && btnClose.addEventListener('click', close);
    btnPrev && btnPrev.addEventListener('click', prev);
    btnNext && btnNext.addEventListener('click', next);
    viewer && viewer.addEventListener('click',(e)=>{ if(e.target===viewer) close(); });
  });
})();

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Show the first slide immediately and delay auto-advance slightly to avoid early CLS
if (slides.length > 0) {
    showSlide(0);
    setTimeout(() => setInterval(nextSlide, 5000), 800);
}

// Hire Us Now form submission
document.getElementById('hireForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[name="name"]').value;
    const number = this.querySelector('input[name="number"]').value;
    const email = this.querySelector('input[name="email"]').value;
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    
    // Customize message based on whether email was provided
    if (email) {
        successMessage.textContent = `Thank you, ${name}! We'll contact you soon at ${email}.`;
    } else {
        successMessage.textContent = `Thank you, ${name}! We'll contact you soon at ${number}.`;
    }
    
    // Style the message
    successMessage.style.position = 'fixed';
    successMessage.style.top = '20px';
    successMessage.style.right = '20px';
    successMessage.style.backgroundColor = 'var(--primary-color)';
    successMessage.style.color = 'white';
    successMessage.style.padding = '15px 25px';
    successMessage.style.borderRadius = '5px';
    successMessage.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    successMessage.style.zIndex = '10000';
    successMessage.style.opacity = '0';
    successMessage.style.transform = 'translateX(20px)';
    successMessage.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    successMessage.style.maxWidth = '300px';
    successMessage.style.textAlign = 'center';
    
    // Add message to the page
    document.body.appendChild(successMessage);
    
    // Animate in
    setTimeout(() => {
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateX(0)';
    }, 10);
    
    // Reset form
    this.reset();
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateX(20px)';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 300);
    }, 5000);
});

// Mobile menu toggle (for responsive design) with right-side drawer
function initHeaderInteractions() {
    const headerContainer = document.querySelector('header .container');
    const nav = document.querySelector('nav');
    if (!headerContainer || !nav) return;

    const existingToggle = headerContainer.querySelector('.menu-toggle');
    const menuToggle = existingToggle || document.createElement('div');
    if (!existingToggle) {
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        headerContainer.appendChild(menuToggle);
    }

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('open');
    });

// Add CSS for mobile menu
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    .menu-toggle {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 30px;
        height: 21px;
        cursor: pointer;
        z-index: 1600;
    }
    
    .menu-toggle span {
        display: block;
        height: 3px;
        width: 100%;
        background-color: var(--secondary-color);
        border-radius: 3px;
        transition: var(--transition);
    }
    
    .menu-toggle.open span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .menu-toggle.open span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-toggle.open span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    nav { display: flex !important; }

    @media (max-width: 768px) {
        .menu-toggle { display: flex; position: absolute; right: 0; top: 18px; }

        nav {
            position: fixed;
            font-weight: 600;
            top: 0;
            right: 0;
            height: 100vh;
            width: 75%;
            max-width: 320px;
            background-color: rgba(255,255,255,0.12);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            flex-direction: column;
            align-items: flex-start;
            padding: 80px 24px 24px;
            box-shadow: -10px 0 20px rgba(0,0,0,0.1);
            transform: translateX(100%);
            opacity: 0;
            visibility: hidden;
            transition: transform .3s ease, opacity .3s ease, visibility .3s ease;
            z-index: 1500;
        }

        nav.active { transform: translateX(0); opacity: 1; visibility: visible; }

        nav ul { flex-direction: column; gap: 16px; margin-top: 0; width: 100%; }
        nav ul li { margin: 0; }
        nav ul li a { font-size: 1.1rem; display: block; width: 100%; padding: 10px 0; position: relative; }
        nav ul li a:hover, nav ul li a:focus-visible {
            color: var(--secondary-color);
            text-decoration: underline;
            text-decoration-color: var(--primary-color);
            text-decoration-thickness: 2px;
            text-underline-offset: 4px;
        }
    }
`;
document.head.appendChild(mobileMenuStyles);
}

// Re-init header-dependent scripts after header partial loads
document.addEventListener('headerLoaded', initHeaderInteractions);
// Also try once on initial load (in case header exists in DOM already)
initHeaderInteractions();

// Avatar dropdown toggle
const authButton = document.getElementById('authButton');
const authDropdown = document.getElementById('authDropdown');
if (authButton && authDropdown) {
    const toggleDropdown = () => {
        const isOpen = authDropdown.style.display === 'block';
        authDropdown.style.display = isOpen ? 'none' : 'block';
        authButton.setAttribute('aria-expanded', String(!isOpen));
        authDropdown.setAttribute('aria-hidden', String(isOpen));
    };
    authButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
    });
    document.addEventListener('click', (e) => {
        if (!authDropdown.contains(e.target) && e.target !== authButton) {
            authDropdown.style.display = 'none';
            authButton.setAttribute('aria-expanded', 'false');
            authDropdown.setAttribute('aria-hidden', 'true');
        }
    });
}

// Request a Call modal logic (works with dynamic header)
function initRequestCallModalHandlers() {
    const headerCta = document.querySelector('.header-cta');
    const mobileRequestLink = document.querySelector('nav .mobile-actions .request-link');
    const requestModal = document.getElementById('requestCallModal');
    const closeRequestCall = document.getElementById('closeRequestCall');

    if (!requestModal) return;

    const openRequestModal = (e) => {
        if (e) e.preventDefault();
        requestModal.classList.add('active');
        requestModal.setAttribute('aria-hidden', 'false');
    };
    const closeRequestModal = () => {
        requestModal.classList.remove('active');
        requestModal.setAttribute('aria-hidden', 'true');
    };

    if (headerCta) headerCta.onclick = openRequestModal;
    if (mobileRequestLink) {
        mobileRequestLink.onclick = (e) => {
            openRequestModal(e);
            const navEl = document.querySelector('nav');
            const toggleEl = document.querySelector('.menu-toggle');
            if (navEl) navEl.classList.remove('active');
            if (toggleEl) toggleEl.classList.remove('open');
        };
    }
    if (closeRequestCall) closeRequestCall.onclick = closeRequestModal;
    if (!requestModal.dataset.bound) {
        requestModal.addEventListener('click', (e) => { if (e.target === requestModal) closeRequestModal(); });
        requestModal.dataset.bound = '1';
    }
}

document.addEventListener('headerLoaded', initRequestCallModalHandlers);
initRequestCallModalHandlers();

// Handle Request a Call form submission (simple success feedback)
const requestCallForm = document.getElementById('requestCallForm');
if (requestCallForm) {
    requestCallForm.addEventListener('submit', function(e) {
        e.preventDefault();
        closeRequestModal();
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thanks! We will call you shortly.';
        successMessage.style.position = 'fixed';
        successMessage.style.top = '20px';
        successMessage.style.right = '20px';
        successMessage.style.backgroundColor = 'var(--primary-color)';
        successMessage.style.color = 'white';
        successMessage.style.padding = '12px 18px';
        successMessage.style.borderRadius = '8px';
        successMessage.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        successMessage.style.zIndex = '3000';
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(-8px)';
        successMessage.style.transition = 'opacity .25s ease, transform .25s ease';
        document.body.appendChild(successMessage);
        setTimeout(() => { successMessage.style.opacity = '1'; successMessage.style.transform = 'translateY(0)'; }, 10);
        setTimeout(() => { successMessage.style.opacity = '0'; successMessage.style.transform = 'translateY(-8px)'; setTimeout(() => successMessage.remove(), 250); }, 3000);
        this.reset();
    });
}

// Load floor plan images from /floor_plans folder (assumes filenames 1.jpg..12.jpg or .png)
(function loadPlans() {
  const grid = document.getElementById('plansGrid');
  if (!grid) return;
  // explicit filenames provided by user
  const files = [
    '500SQFT.jpg',
    '501-1000SQFT.jpg',
    '1000-1500SQFT.jpg',
    '1501-2000SQFT.jpg',
    '2001-2500SQFT.jpg',
    '2501-3000SQFT.jpg',
    '3001-3500SQFT.jpg',
    '3501-4000SQFT.jpg',
    '4001-4500SQFT.jpg',
    '4501-5000SQFT.jpg'
  ];
  const candidates = files.map((name) => ({
    src: `floor_plans/${name}`,
    caption: name.replace(/\.jpg$/i, '').replace(/-/g, '–')
  }));
  // Try to load each candidate; append successful ones
  const checkImage = (entry) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(entry);
    img.onerror = () => resolve(null);
    img.src = entry.src;
  });
  Promise.all(candidates.map(checkImage)).then((results) => {
    const unique = new Map();
    results.forEach(r => { if (r && !unique.has(r.src)) unique.set(r.src, r); });
    const items = Array.from(unique.values()).slice(0, 12);
    if (items.length === 0) {
      grid.innerHTML = '<p style="text-align:center;color:#6b7280">No plans found in folder.</p>';
      return;
    }
    grid.innerHTML = items.map((p, idx) => (
      `<div class="plan-card" data-index="${idx}">
         <img src="${p.src}" alt="${p.caption}">
         <div class="plan-caption">${p.caption}</div>
       </div>`
    )).join('');

    // Lightbox viewer
    const viewer = document.getElementById('planViewer');
    const viewerImg = document.getElementById('planViewerImg');
    const viewerCaption = document.getElementById('planViewerCaption');
    const btnClose = document.getElementById('planViewerClose');
    const btnPrev = document.getElementById('planPrev');
    const btnNext = document.getElementById('planNext');
    let current = 0;
    function openAt(i){
      current = i;
      const it = items[current];
      viewerImg.src = it.src;
      viewerCaption.textContent = it.caption;
      viewer.classList.add('active');
      viewer.setAttribute('aria-hidden','false');
    }
    function close(){ viewer.classList.remove('active'); viewer.setAttribute('aria-hidden','true'); }
    function prev(){ openAt((current - 1 + items.length) % items.length); }
    function next(){ openAt((current + 1) % items.length); }
    grid.querySelectorAll('.plan-card').forEach(card=>{
      card.addEventListener('click',()=>openAt(+card.dataset.index));
    });
    btnClose && btnClose.addEventListener('click', close);
    btnPrev && btnPrev.addEventListener('click', prev);
    btnNext && btnNext.addEventListener('click', next);
    viewer && viewer.addEventListener('click', (e)=>{ if(e.target===viewer) close(); });
  });
})();
