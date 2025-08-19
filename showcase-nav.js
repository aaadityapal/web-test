// Mobile navigation functionality for showcase page
(function() {
    // Initialize header interactions including mobile menu
    function initHeaderInteractions() {
        const headerContainer = document.querySelector('header .container');
        const nav = document.querySelector('nav');
        if (!headerContainer || !nav) return;

        // Create hamburger menu toggle if it doesn't exist
        const existingToggle = headerContainer.querySelector('.menu-toggle');
        const menuToggle = existingToggle || document.createElement('div');
        if (!existingToggle) {
            menuToggle.className = 'menu-toggle';
            menuToggle.innerHTML = '<span></span><span></span><span></span>';
            headerContainer.appendChild(menuToggle);
        }

        // Toggle menu open/closed on click
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
                    background-color: rgba(0,0,0,0.75);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 80px 24px 24px;
                    box-shadow: -10px 0 20px rgba(0,0,0,0.3);
                    transform: translateX(100%);
                    opacity: 0;
                    visibility: hidden;
                    transition: transform .3s ease, opacity .3s ease, visibility .3s ease;
                    z-index: 1500;
                }

                nav.active { transform: translateX(0); opacity: 1; visibility: visible; }

                nav ul { flex-direction: column; gap: 16px; margin-top: 0; width: 100%; }
                nav ul li { margin: 0; }
                nav ul li a { 
                    font-size: 1.1rem; 
                    display: block; 
                    width: 100%; 
                    padding: 10px 0; 
                    position: relative;
                    color: #ffffff;
                }
                nav ul li a:hover, nav ul li a:focus-visible {
                    color: var(--primary-color);
                    text-decoration: underline;
                    text-decoration-color: var(--primary-color);
                    text-decoration-thickness: 2px;
                    text-underline-offset: 4px;
                }
                
                /* Style for mobile actions in nav panel */
                nav .mobile-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-top: 24px;
                    width: 100%;
                    border-top: 1px solid rgba(255,255,255,0.2);
                    padding-top: 16px;
                }
                
                nav .mobile-actions a {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 10px 0;
                    border-radius: 8px;
                }
                
                nav .mobile-actions a i {
                    font-size: 18px;
                    color: var(--primary-color);
                }
            }
        `;
        document.head.appendChild(mobileMenuStyles);
    }

    // Close mobile menu when clicking on a link
    function setupNavLinkHandlers() {
        const nav = document.querySelector('nav');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (nav) {
            const links = nav.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', function() {
                    // Only close menu on small screens
                    if (window.innerWidth <= 768) {
                        nav.classList.remove('active');
                        if (menuToggle) menuToggle.classList.remove('open');
                    }
                });
            });
        }
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initHeaderInteractions();
        setupNavLinkHandlers();
    });

    // Re-initialize when header is loaded (in case DOM was already loaded)
    document.addEventListener('headerLoaded', function() {
        initHeaderInteractions();
        setupNavLinkHandlers();
    });
})();
