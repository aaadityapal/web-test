(function() {
    // Project data for all categories
    const projectData = {
        residential: [
            {
                id: 'luxury-villa-delhi',
                title: 'Luxury Villa in Delhi',
                location: 'Delhi',
                area: 4500,
                year: 2023,
                category: 'Residential',
                description: 'A modern luxury villa with spacious interiors, sustainable features, and a stunning outdoor space designed for comfort and elegance.',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=70'
                ]
            },
            {
                id: 'jewar-residence',
                title: 'Residence at Jewar',
                location: 'Greater Noida',
                area: 3200,
                year: 2022,
                category: 'Residential',
                description: 'Contemporary family home featuring open-plan living spaces, energy-efficient design, and seamless indoor-outdoor flow.',
                image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=70'
                ]
            },
            {
                id: 'noida-apartment',
                title: 'Modern Apartment Complex',
                location: 'Noida',
                area: 12000,
                year: 2021,
                category: 'Residential',
                description: 'A multi-unit residential complex with modern amenities, thoughtful layouts, and community spaces designed for urban living.',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=70'
                ]
            }
        ],
        commercial: [
            {
                id: 'tech-park-gurgaon',
                title: 'Tech Park',
                location: 'Gurgaon',
                area: 45000,
                year: 2022,
                category: 'Commercial',
                description: 'A state-of-the-art office complex designed for technology companies with flexible workspaces, collaborative areas, and sustainable features.',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=70'
                ]
            },
            {
                id: 'retail-center-delhi',
                title: 'Urban Retail Center',
                location: 'Delhi',
                area: 28000,
                year: 2021,
                category: 'Commercial',
                description: 'A modern shopping destination featuring an innovative layout, striking façade, and carefully designed customer experience.',
                image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1519567241046-7bc37b86e6a2?auto=format&fit=crop&w=1200&q=70'
                ]
            },
            {
                id: 'office-tower-noida',
                title: 'Corporate Office Tower',
                location: 'Noida',
                area: 35000,
                year: 2023,
                category: 'Commercial',
                description: 'A sleek, energy-efficient office tower with cutting-edge facilities, designed to optimize productivity and employee wellbeing.',
                image: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1613746203812-717e6e5db3e3?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1498409785966-ab341407de6e?auto=format&fit=crop&w=1200&q=70'
                ]
            }
        ],
        institutional: [
            {
                id: 'university-campus-delhi',
                title: 'University Campus',
                location: 'Delhi',
                area: 120000,
                year: 2021,
                category: 'Institutional',
                description: 'A comprehensive university campus with modern educational facilities, student housing, and recreational spaces designed to inspire learning.',
                image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=70'
                ]
            },
            {
                id: 'hospital-bharatpur',
                title: 'Modern Hospital',
                location: 'Bharatpur',
                area: 22000,
                year: 2022,
                category: 'Institutional',
                description: 'A patient-centered healthcare facility with advanced medical infrastructure, healing environments, and efficient operational flow.',
                image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=70'
                ]
            },
            {
                id: 'research-center-rohtak',
                title: 'Research Center',
                location: 'Rohtak',
                area: 18000,
                year: 2023,
                category: 'Institutional',
                description: 'A specialized research facility with laboratories, collaborative spaces, and sustainable design principles.',
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1581093458791-9cd6747f4ad5?auto=format&fit=crop&w=1200&q=70'
                ]
            }
        ],
        hospitality: [
            {
                id: 'luxury-hotel-mumbai',
                title: 'Luxury Hotel',
                location: 'Mumbai',
                area: 38000,
                year: 2022,
                category: 'Hospitality',
                description: 'An upscale hotel offering exceptional guest experiences through thoughtful design, luxury amenities, and distinctive architectural elements.',
                image: 'https://images.unsplash.com/photo-1551776235-dde6d4829808?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1551776235-dde6d4829808?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=70'
                ]
            },
            {
                id: 'boutique-resort-goa',
                title: 'Boutique Beach Resort',
                location: 'Goa',
                area: 15000,
                year: 2023,
                category: 'Hospitality',
                description: 'A coastal retreat that blends local architectural traditions with modern luxury, creating a unique and immersive guest experience.',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=70'
                ]
            },
            {
                id: 'cafe-dwarka',
                title: 'Modern Café',
                location: 'Dwarka',
                area: 2800,
                year: 2022,
                category: 'Hospitality',
                description: 'A contemporary café space with innovative interior design, comfortable seating arrangements, and an atmosphere that encourages social interaction.',
                image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=70'
                ]
            }
        ],
        interior: [
            {
                id: 'corporate-office-interior',
                title: 'Corporate Office Interior',
                location: 'Gurgaon',
                area: 12000,
                year: 2023,
                category: 'Interior',
                description: 'A modern workplace interior designed to foster collaboration, creativity, and employee wellbeing through thoughtful space planning and design elements.',
                image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1604328471151-b82f15a36262?auto=format&fit=crop&w=1200&q=70'
                ]
            },
            {
                id: 'luxury-apartment-interior',
                title: 'Luxury Apartment Interior',
                location: 'Delhi',
                area: 3800,
                year: 2022,
                category: 'Interior',
                description: 'Sophisticated interior design for a high-end apartment featuring custom furnishings, premium materials, and seamless integration of technology.',
                image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=70'
                ]
            },
            {
                id: 'restaurant-interior-design',
                title: 'Fine Dining Restaurant',
                location: 'Noida',
                area: 4200,
                year: 2023,
                category: 'Interior',
                description: 'A distinctive restaurant interior that creates a memorable dining experience through atmospheric lighting, custom furniture, and carefully curated materials.',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=70'
                ]
            }
        ],
        urban: [
            {
                id: 'mixed-use-development',
                title: 'Mixed-Use Development',
                location: 'Gurgaon',
                area: 85000,
                year: 2023,
                category: 'Urban Planning',
                description: 'An integrated urban development combining residential, commercial, and recreational spaces to create a vibrant, walkable community.',
                image: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=70'
                ]
            },
            {
                id: 'public-plaza-design',
                title: 'Public Plaza',
                location: 'Delhi',
                area: 18000,
                year: 2022,
                category: 'Urban Planning',
                description: 'A thoughtfully designed public space that enhances urban life through landscaping, seating areas, and interactive elements.',
                image: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=70'
                ]
            },
            {
                id: 'sustainable-township',
                title: 'Sustainable Township',
                location: 'Greater Noida',
                area: 250000,
                year: 2023,
                category: 'Urban Planning',
                description: 'A comprehensive township development with sustainable infrastructure, green spaces, and community facilities designed for modern living.',
                image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=70',
                images: [
                    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200&q=70',
                    'https://images.unsplash.com/photo-1486744328743-c1759f2b5c18?auto=format&fit=crop&w=1200&q=70'
                ]
            }
        ]
    };

    // Function to create project cards
    function createProjectCard(project) {
        // Create image carousel HTML if multiple images exist
        let carouselHtml = '';
        if (project.images && project.images.length > 1) {
            carouselHtml = `
                <div class="image-carousel" data-project-id="${project.id}">
                    <div class="carousel-container">
                        ${project.images.map((img, index) => 
                            `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img src="${img}" alt="${project.title} - Image ${index + 1}" loading="lazy">
                            </div>`
                        ).join('')}
                    </div>
                    <div class="carousel-controls">
                        <button class="carousel-nav prev" aria-label="Previous image"><i class="fas fa-chevron-left"></i></button>
                        <div class="carousel-indicators">
                            ${project.images.map((_, index) => 
                                `<button class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to image ${index + 1}"></button>`
                            ).join('')}
                        </div>
                        <button class="carousel-nav next" aria-label="Next image"><i class="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            `;
        } else {
            // Fallback to single image if no images array or only one image
            carouselHtml = `<img src="${project.image}" alt="${project.title}">`;
        }

        return `
            <div class="showcase-card" data-id="${project.id}">
                <div class="showcase-card-media">
                    <span class="showcase-card-badge">${project.category}</span>
                    ${carouselHtml}
                </div>
                <div class="showcase-card-content">
                    <h3 class="showcase-card-title">${project.title}</h3>
                    <div class="showcase-card-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${project.location}</span>
                        <span><i class="fas fa-ruler-combined"></i> ${project.area.toLocaleString()} sqft</span>
                        <span><i class="fas fa-calendar-alt"></i> ${project.year}</span>
                    </div>
                    <p class="showcase-card-description">${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}</p>
                    <div class="showcase-card-footer">
                        <a href="#" class="showcase-card-link view-project" data-id="${project.id}">View Details <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to populate category grids
    function populateCategoryGrids() {
        // Populate each category grid
        Object.keys(projectData).forEach(category => {
            const grid = document.querySelector(`.${category}-grid`);
            if (grid && projectData[category]) {
                const projects = projectData[category].slice(0, 3); // Show up to 3 projects per category
                grid.innerHTML = projects.map(createProjectCard).join('');
            }
        });
    }

    // Hero slideshow functionality
    function setupSlideshow() {
        const slides = document.querySelectorAll('.showcase-hero .slide');
        if (!slides.length) return;

        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Initialize slideshow
        showSlide(0);
        setInterval(nextSlide, 5000);
    }

    // Project lightbox functionality
    function setupLightbox() {
        const lightbox = document.getElementById('projectLightbox');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxCarousel = document.getElementById('lightboxCarousel');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxMeta = document.getElementById('lightboxMeta');
        const lightboxDescription = document.getElementById('lightboxDescription');
        
        // Flatten all projects for easy access
        const allProjects = Object.values(projectData).flat();
        
        // Track current project and image index
        let currentProject = null;
        let currentImageIndex = 0;
        
        function createCarouselItems(project) {
            if (!project.images || !project.images.length) {
                // Fallback to single image
                return `<div class="lightbox-carousel-item active">
                    <img src="${project.image}" alt="${project.title}">
                </div>`;
            }
            
            return project.images.map((img, index) => `
                <div class="lightbox-carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${img}" alt="${project.title} - Image ${index + 1}">
                </div>
            `).join('');
        }
        
        function createCarouselIndicators(project) {
            if (!project.images || project.images.length <= 1) return '';
            
            return `
                <div class="lightbox-carousel-indicators">
                    ${project.images.map((_, index) => `
                        <button class="lightbox-indicator ${index === 0 ? 'active' : ''}" 
                                data-index="${index}" 
                                aria-label="Go to image ${index + 1}"></button>
                    `).join('')}
                </div>
            `;
        }
        
        function createCarouselControls(project) {
            if (!project.images || project.images.length <= 1) return '';
            
            return `
                <button class="lightbox-carousel-nav prev" id="lightboxPrev" aria-label="Previous image">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="lightbox-carousel-nav next" id="lightboxNext" aria-label="Next image">
                    <i class="fas fa-chevron-right"></i>
                </button>
            `;
        }
        
        function showCarouselImage(index) {
            if (!currentProject || !currentProject.images) return;
            
            // Ensure index is within bounds
            if (index < 0) index = currentProject.images.length - 1;
            if (index >= currentProject.images.length) index = 0;
            
            currentImageIndex = index;
            
            // Update carousel items
            const items = lightboxCarousel.querySelectorAll('.lightbox-carousel-item');
            items.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
            
            // Update indicators
            const indicators = lightbox.querySelectorAll('.lightbox-indicator');
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
        }
        
        function openLightbox(projectId) {
            const project = allProjects.find(p => p.id === projectId);
            if (!project) return;
            
            currentProject = project;
            currentImageIndex = 0;
            
            // Create carousel HTML
            lightboxCarousel.innerHTML = `
                <div class="lightbox-carousel-container">
                    ${createCarouselItems(project)}
                </div>
                ${createCarouselControls(project)}
                ${createCarouselIndicators(project)}
            `;
            
            lightboxTitle.textContent = project.title;
            
            lightboxMeta.innerHTML = `
                <span><i class="fas fa-map-marker-alt"></i> ${project.location}</span>
                <span><i class="fas fa-ruler-combined"></i> ${project.area.toLocaleString()} sqft</span>
                <span><i class="fas fa-calendar-alt"></i> ${project.year}</span>
                <span><i class="fas fa-tag"></i> ${project.category}</span>
            `;
            
            lightboxDescription.textContent = project.description;
            
            // Show lightbox
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            
            // Add event listeners for carousel controls
            const prevBtn = lightbox.querySelector('#lightboxPrev');
            const nextBtn = lightbox.querySelector('#lightboxNext');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => showCarouselImage(currentImageIndex - 1));
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => showCarouselImage(currentImageIndex + 1));
            }
            
            // Add event listeners for indicators
            const indicators = lightbox.querySelectorAll('.lightbox-indicator');
            indicators.forEach(indicator => {
                indicator.addEventListener('click', () => {
                    const index = parseInt(indicator.getAttribute('data-index'), 10);
                    showCarouselImage(index);
                });
            });
            
            // Add keyboard navigation for carousel
            lightbox.addEventListener('keydown', handleCarouselKeydown);
            
            // Add touch swipe support
            const carouselContainer = lightbox.querySelector('.lightbox-carousel-container');
            if (carouselContainer) {
                let touchStartX = 0;
                let touchEndX = 0;
                
                carouselContainer.addEventListener('touchstart', e => {
                    touchStartX = e.changedTouches[0].screenX;
                }, { passive: true });
                
                carouselContainer.addEventListener('touchend', e => {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                }, { passive: true });
                
                function handleSwipe() {
                    const threshold = 50; // Minimum swipe distance
                    if (touchStartX - touchEndX > threshold) {
                        // Swipe left, show next
                        showCarouselImage(currentImageIndex + 1);
                    } else if (touchEndX - touchStartX > threshold) {
                        // Swipe right, show previous
                        showCarouselImage(currentImageIndex - 1);
                    }
                }
            }
        }
        
        function handleCarouselKeydown(e) {
            if (e.key === 'ArrowLeft') {
                showCarouselImage(currentImageIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showCarouselImage(currentImageIndex + 1);
            }
        }
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            
            // Remove keyboard event listener
            lightbox.removeEventListener('keydown', handleCarouselKeydown);
            
            // Reset current project
            currentProject = null;
            currentImageIndex = 0;
        }
        
        // Event delegation for project card clicks
        document.addEventListener('click', function(e) {
            // Check if clicked element or its parent is a project card or view-project link
            const card = e.target.closest('.showcase-card');
            const viewLink = e.target.closest('.view-project');
            
            if (viewLink) {
                e.preventDefault();
                openLightbox(viewLink.getAttribute('data-id'));
            } else if (card && !e.target.closest('.image-carousel')) {
                openLightbox(card.getAttribute('data-id'));
            }
        });
        
        // Close lightbox when clicking the close button
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        // Close lightbox when clicking outside the content
        if (lightbox) {
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
        }
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // Request call button functionality
    function setupRequestCallButton() {
        const requestCallBtn = document.getElementById('requestCallBtn');
        if (requestCallBtn) {
            requestCallBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const requestModal = document.getElementById('requestCallModal');
                if (requestModal) {
                    requestModal.classList.add('active');
                    requestModal.setAttribute('aria-hidden', 'false');
                }
            });
        }
    }

    // Typewriter effect for the title
    function setupTypewriter() {
        const typewriterElement = document.getElementById('typewriter');
        if (!typewriterElement) return;
        
        // Clear any existing content first
        typewriterElement.textContent = '';
        
        // Set the exact text without animation
        typewriterElement.textContent = "Our Project Showcase";
    }

    // Setup image carousels for project cards
    function setupImageCarousels() {
        const carousels = document.querySelectorAll('.image-carousel');
        
        carousels.forEach(carousel => {
            const container = carousel.querySelector('.carousel-container');
            const items = carousel.querySelectorAll('.carousel-item');
            const indicators = carousel.querySelectorAll('.indicator');
            const prevBtn = carousel.querySelector('.carousel-nav.prev');
            const nextBtn = carousel.querySelector('.carousel-nav.next');
            
            if (!items.length) return;
            
            let currentIndex = 0;
            const maxIndex = items.length - 1;
            
            // Function to show a specific slide
            function showSlide(index) {
                // Ensure index is within bounds
                if (index < 0) index = maxIndex;
                if (index > maxIndex) index = 0;
                
                currentIndex = index;
                
                // Update active classes
                items.forEach((item, i) => {
                    item.classList.toggle('active', i === currentIndex);
                });
                
                indicators.forEach((indicator, i) => {
                    indicator.classList.toggle('active', i === currentIndex);
                });
            }
            
            // Event listeners for controls
            if (prevBtn) {
                prevBtn.addEventListener('click', e => {
                    e.stopPropagation(); // Prevent card click
                    showSlide(currentIndex - 1);
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', e => {
                    e.stopPropagation(); // Prevent card click
                    showSlide(currentIndex + 1);
                });
            }
            
            // Event listeners for indicators
            indicators.forEach((indicator, i) => {
                indicator.addEventListener('click', e => {
                    e.stopPropagation(); // Prevent card click
                    showSlide(i);
                });
            });
            
            // Touch/swipe support
            let touchStartX = 0;
            let touchEndX = 0;
            
            carousel.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            carousel.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                const threshold = 50; // Minimum swipe distance
                if (touchStartX - touchEndX > threshold) {
                    // Swipe left, show next
                    showSlide(currentIndex + 1);
                } else if (touchEndX - touchStartX > threshold) {
                    // Swipe right, show previous
                    showSlide(currentIndex - 1);
                }
            }
            
            // Prevent carousel clicks from triggering card click
            carousel.addEventListener('click', e => {
                e.stopPropagation();
            });
        });
    }

    // Initialize all functionality when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        populateCategoryGrids();
        setupSlideshow();
        setupLightbox();
        setupRequestCallButton();
        setupTypewriter();
        setupImageCarousels();
    });

    // Re-initialize when header is loaded (in case DOM was already loaded)
    document.addEventListener('headerLoaded', function() {
        setupRequestCallButton();
        // Only setup typewriter if it hasn't been initialized yet
        const typewriterElement = document.getElementById('typewriter');
        if (typewriterElement && !typewriterElement.textContent) {
            setupTypewriter();
        }
        // Setup image carousels after grid population
        setupImageCarousels();
    });
})();
