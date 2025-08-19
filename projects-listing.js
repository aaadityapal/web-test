// Projects Listing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page once the header is loaded
    document.addEventListener('headerLoaded', initProjectsPage);
    
    // If header is already loaded, initialize immediately
    if (document.querySelector('header')) {
        initProjectsPage();
    }
});

// Initialize the projects page
function initProjectsPage() {
    loadCategoryFromURL();
    setupFilters();
    setupSearch();
    loadProjects();
}

// Load category from URL parameters
function loadCategoryFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        // Update category filter
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter && categoryFilter.querySelector(`option[value="${category}"]`)) {
            categoryFilter.value = category;
        }
        
        // Update page header based on category
        updateCategoryHeader(category);
        
        // Add active filter tag
        addActiveFilter('category', getCategoryDisplayName(category), category);
    }
}

// Update the category header content and background
function updateCategoryHeader(category) {
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryDescription = document.getElementById('categoryDescription');
    const categoryBannerImage = document.getElementById('categoryBannerImage');
    
    if (categoryTitle && categoryDescription && categoryBannerImage) {
        const categoryData = getCategoryData(category);
        
        categoryTitle.textContent = categoryData.title;
        categoryDescription.textContent = categoryData.description;
        categoryBannerImage.src = categoryData.bannerImage;
        categoryBannerImage.alt = categoryData.title;
    }
}

// Get category display data
function getCategoryData(category) {
    const categories = {
        'residential': {
            title: 'Residential Projects',
            description: 'ArchitectsHive is an architecture firm that specializes in designing beautiful and functional residences. Recently, they have been working on several exciting projects – from luxurious condominiums to modern apartments. Check out their portfolio to find out more about their work.',
            bannerImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80'
        },
        'commercial': {
            title: 'Commercial Projects',
            description: 'ArchitectsHive is a leading architecture firm that specializes in making industrial plans. We are proud to showcase our recent projects, which are sure to impress. Take a look and read more about the innovative projects we have been working on.',
            bannerImage: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&w=1920&q=80'
        },
        'institutional': {
            title: 'Institutional Projects',
            description: 'ArchitectsHive, a trailblazing architectural firm founded with a vision to redefine spaces, has created institutions that seamlessly blend innovation, functionality, and aesthetic excellence. With a portfolio characterized by an ingenious synthesis of form and purpose, their institutions stand as architectural marvels.',
            bannerImage: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1920&q=80'
        },
        'hospitality': {
            title: 'Hospitality Projects',
            description: 'Unlock the potential of your healthcare plans with ArchitectsHive! Our team of experts is here to help you design the perfect plan for your needs. With us, you can rest assured that your healthcare will be taken care of.',
            bannerImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80'
        },
        'interior': {
            title: 'Interior Design Projects',
            description: 'Transforming spaces with aesthetics and functionality.',
            bannerImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80'
        },
        'urban': {
            title: 'Urban Planning Projects',
            description: 'Designing communities and public spaces for sustainable living.',
            bannerImage: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1920&q=80'
        },
        'all': {
            title: 'All Projects',
            description: 'Explore our complete portfolio of architectural projects across various domains.',
            bannerImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80'
        }
    };
    
    return categories[category] || categories['all'];
}

// Get category display name
function getCategoryDisplayName(category) {
    const displayNames = {
        'residential': 'Residential',
        'commercial': 'Commercial',
        'institutional': 'Institutional',
        'hospitality': 'Hospitality',
        'interior': 'Interior Design',
        'urban': 'Urban Planning',
        'all': 'All Categories'
    };
    
    return displayNames[category] || 'All Categories';
}

// Setup filter functionality
function setupFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const yearFilter = document.getElementById('yearFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const category = this.value;
            
            // Update URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            if (category === 'all') {
                urlParams.delete('category');
            } else {
                urlParams.set('category', category);
            }
            
            // Update browser history without reloading the page
            const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
            window.history.pushState({}, '', newUrl);
            
            // Update header if category changed
            if (category !== 'all') {
                updateCategoryHeader(category);
                addActiveFilter('category', getCategoryDisplayName(category), category);
            } else {
                updateCategoryHeader('all');
                removeActiveFilter('category');
            }
            
            // Filter projects
            filterProjects();
        });
    }
    
    if (yearFilter) {
        yearFilter.addEventListener('change', function() {
            const year = this.value;
            
            if (year !== 'all') {
                addActiveFilter('year', year, year);
            } else {
                removeActiveFilter('year');
            }
            
            // Filter projects
            filterProjects();
        });
    }
    
    // Reset filters button
    const resetFiltersBtn = document.getElementById('resetFilters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetAllFilters);
    }
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput && searchButton) {
        // Search on button click
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                addActiveFilter('search', `"${searchTerm}"`, searchTerm);
            } else {
                removeActiveFilter('search');
            }
            
            filterProjects();
        });
        
        // Search on Enter key
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                searchButton.click();
            }
        });
    }
}

// Add active filter tag
function addActiveFilter(type, label, value) {
    const activeFilters = document.getElementById('activeFilters');
    
    if (activeFilters) {
        // Remove existing filter of same type
        removeActiveFilter(type);
        
        // Create new filter tag
        const filterTag = document.createElement('div');
        filterTag.className = 'filter-tag';
        filterTag.dataset.type = type;
        filterTag.dataset.value = value;
        
        filterTag.innerHTML = `
            ${label}
            <span class="remove-filter" title="Remove filter">&times;</span>
        `;
        
        // Add click event to remove filter
        const removeBtn = filterTag.querySelector('.remove-filter');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                removeActiveFilter(type);
                
                // Reset the corresponding filter control
                if (type === 'category') {
                    document.getElementById('categoryFilter').value = 'all';
                    updateCategoryHeader('all');
                    
                    // Update URL
                    const urlParams = new URLSearchParams(window.location.search);
                    urlParams.delete('category');
                    const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
                    window.history.pushState({}, '', newUrl);
                }
                
                if (type === 'year') {
                    document.getElementById('yearFilter').value = 'all';
                }
                
                if (type === 'search') {
                    document.getElementById('searchInput').value = '';
                }
                
                // Re-filter projects
                filterProjects();
            });
        }
        
        activeFilters.appendChild(filterTag);
    }
}

// Remove active filter tag
function removeActiveFilter(type) {
    const activeFilters = document.getElementById('activeFilters');
    
    if (activeFilters) {
        const existingFilter = activeFilters.querySelector(`.filter-tag[data-type="${type}"]`);
        
        if (existingFilter) {
            activeFilters.removeChild(existingFilter);
        }
    }
}

// Reset all filters
function resetAllFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const yearFilter = document.getElementById('yearFilter');
    const searchInput = document.getElementById('searchInput');
    const activeFilters = document.getElementById('activeFilters');
    
    if (categoryFilter) categoryFilter.value = 'all';
    if (yearFilter) yearFilter.value = 'all';
    if (searchInput) searchInput.value = '';
    if (activeFilters) activeFilters.innerHTML = '';
    
    // Update category header
    updateCategoryHeader('all');
    
    // Update URL
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('category');
    const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
    window.history.pushState({}, '', newUrl);
    
    // Re-filter projects
    filterProjects();
    
    // Hide no results message if visible
    const noResults = document.getElementById('noResults');
    if (noResults) noResults.style.display = 'none';
}

// Project data - 15 projects across different categories
const projectsData = [
    // Residential Projects
    {
        id: 'res-001',
        title: 'Modern Lakeside Villa',
        category: 'residential',
        year: '2023',
        location: 'Lake Como, Italy',
        area: '4,500 sq ft',
        architect: 'Emma Richardson',
        client: 'Johnson Family',
        address: 'Via Panoramica 42, Lake Como, Italy',
        completion: 'December 2023',
        description: 'A contemporary lakeside villa featuring floor-to-ceiling windows, sustainable materials, and seamless indoor-outdoor living spaces that maximize the stunning water views. The design incorporates passive solar principles and a green roof system to minimize environmental impact while providing exceptional comfort year-round.',
        images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        id: 'res-002',
        title: 'Urban Micro Apartment',
        category: 'residential',
        year: '2022',
        location: 'Tokyo, Japan',
        area: '450 sq ft',
        architect: 'Hiroshi Tanaka',
        description: 'An innovative micro-apartment design that maximizes functionality in minimal space through transformable furniture, hidden storage, and smart home technology.',
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        id: 'res-003',
        title: 'Desert Retreat House',
        category: 'residential',
        year: '2021',
        location: 'Scottsdale, Arizona',
        area: '3,200 sq ft',
        architect: 'Carlos Mendez',
        description: 'A sustainable desert home that harmonizes with its environment through passive cooling, locally sourced materials, and a design that frames dramatic landscape views.',
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687644-c7f34bc91088?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    
    // Commercial Projects
    {
        id: 'com-001',
        title: 'Sustainable Office Tower',
        category: 'commercial',
        year: '2023',
        location: 'Copenhagen, Denmark',
        area: '125,000 sq ft',
        architect: 'Nordic Architecture Group',
        description: 'A LEED Platinum certified office tower featuring renewable energy systems, biophilic design elements, and flexible workspaces that promote collaboration and wellbeing.',
        images: [
            'https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        id: 'com-002',
        title: 'Retail Flagship Store',
        category: 'commercial',
        year: '2022',
        location: 'Milan, Italy',
        area: '15,000 sq ft',
        architect: 'Studio Moderno',
        description: 'An experiential retail environment that blends digital and physical shopping experiences through interactive displays, modular spaces, and immersive brand storytelling.',
        images: [
            'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        id: 'com-003',
        title: 'Innovation Hub',
        category: 'commercial',
        year: '2021',
        location: 'Singapore',
        area: '45,000 sq ft',
        architect: 'Future Design Associates',
        description: 'A dynamic co-working and innovation center designed to foster creativity and collaboration through adaptable spaces, advanced technology infrastructure, and community-focused amenities.',
        images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    
    // Institutional Projects
    {
        id: 'inst-001',
        title: 'Contemporary Art Museum',
        category: 'institutional',
        year: '2023',
        location: 'Berlin, Germany',
        area: '80,000 sq ft',
        architect: 'Schmidt & Partners',
        description: 'A museum designed to showcase contemporary art through flexible exhibition spaces, dramatic natural lighting, and a facade that serves as a canvas for digital art projections.',
        images: [
            'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        id: 'inst-002',
        title: 'University Research Center',
        category: 'institutional',
        year: '2022',
        location: 'Boston, Massachusetts',
        area: '110,000 sq ft',
        architect: 'Academic Design Group',
        description: 'A state-of-the-art research facility featuring collaborative laboratories, adaptable learning spaces, and sustainable design strategies that reduce energy consumption by 60%.',
        images: [
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        id: 'inst-003',
        title: 'Children\'s Hospital',
        category: 'institutional',
        year: '2021',
        location: 'Oslo, Norway',
        area: '200,000 sq ft',
        architect: 'Healing Spaces Architects',
        description: 'A pediatric hospital designed to promote healing through playful interiors, abundant natural light, therapeutic gardens, and family-centered care spaces that reduce stress and anxiety.',
        images: [
            'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    
    // Hospitality Projects
    {
        id: 'hosp-001',
        title: 'Eco-Luxury Resort',
        category: 'hospitality',
        year: '2023',
        location: 'Bali, Indonesia',
        area: '35,000 sq ft',
        architect: 'Sustainable Retreats Design',
        description: 'An eco-conscious luxury resort that integrates with its tropical setting through locally sourced materials, traditional building techniques, and regenerative landscape design.',
        images: [
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        id: 'hosp-002',
        title: 'Boutique Urban Hotel',
        category: 'hospitality',
        year: '2022',
        location: 'Lisbon, Portugal',
        area: '28,000 sq ft',
        architect: 'Heritage Modern Studio',
        description: 'A boutique hotel housed in a restored historic building that balances preservation with contemporary design, featuring custom furnishings and art that celebrate local culture.',
        images: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    
    // Interior Design Projects
    {
        id: 'int-001',
        title: 'Minimalist Penthouse',
        category: 'interior',
        year: '2023',
        location: 'New York, USA',
        area: '3,800 sq ft',
        architect: 'Pure Space Interiors',
        description: 'A refined penthouse interior defined by clean lines, curated materials, and statement lighting that frames spectacular city views through floor-to-ceiling windows.',
        images: [
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        id: 'int-002',
        title: 'Creative Agency Workspace',
        category: 'interior',
        year: '2022',
        location: 'Barcelona, Spain',
        area: '12,000 sq ft',
        architect: 'Workspace Evolution',
        description: 'A dynamic office interior for a creative agency featuring flexible work zones, collaborative spaces, and playful design elements that inspire creativity and reflect the company\'s brand identity.',
        images: [
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    
    // Urban Planning Projects
    {
        id: 'urb-001',
        title: 'Riverside District Revitalization',
        category: 'urban',
        year: '2023',
        location: 'Rotterdam, Netherlands',
        area: '1,200,000 sq ft',
        architect: 'Urban Future Collaborative',
        description: 'A comprehensive urban renewal project transforming a former industrial waterfront into a mixed-use district with public spaces, sustainable infrastructure, and flood-resilient design strategies.',
        images: [
            'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        id: 'urb-002',
        title: 'Smart Neighborhood Development',
        category: 'urban',
        year: '2022',
        location: 'Helsinki, Finland',
        area: '850,000 sq ft',
        architect: 'Nordic Urban Planners',
        description: 'A forward-thinking residential neighborhood integrating smart city technologies, communal green spaces, car-free zones, and energy-positive buildings that produce more energy than they consume.',
        images: [
            'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1444084316824-dc26d6657664?auto=format&fit=crop&w=1200&q=80'
        ]
    }
];

// Load projects based on current filters
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const projectsCount = document.getElementById('projectsCount');
    const noResults = document.getElementById('noResults');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    console.log("Loading projects, data:", projectsData);
    
    if (projectsGrid && projectsCount) {
        // Clear existing projects
        projectsGrid.innerHTML = '';
        
        // Get filtered projects
        const filteredProjects = getFilteredProjects();
        console.log("Filtered projects:", filteredProjects);
        
        // Update projects count
        updateProjectsCount(filteredProjects.length);
        
        // Show/hide no results message
        if (noResults) {
            noResults.style.display = filteredProjects.length === 0 ? 'block' : 'none';
        }
        
        // Show/hide load more button (only show if we have more than 6 projects)
        if (loadMoreBtn) {
            loadMoreBtn.style.display = filteredProjects.length > 6 ? 'inline-flex' : 'none';
        }
        
        // Display first 6 projects initially
        const initialProjects = filteredProjects.slice(0, 6);
        
        // Render projects
        initialProjects.forEach(project => {
            // Ensure project has all required fields
            if (!project.images || project.images.length === 0) {
                console.warn(`Project ${project.id} has no images!`, project);
            }
            
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
        
        // Setup load more functionality
        if (loadMoreBtn) {
            // Remove existing event listeners
            loadMoreBtn.replaceWith(loadMoreBtn.cloneNode(true));
            
            // Get the new button reference
            const newLoadMoreBtn = document.getElementById('loadMoreBtn');
            
            // Add event listener to new button
            if (newLoadMoreBtn) {
                newLoadMoreBtn.addEventListener('click', function() {
                    // Show loading spinner
                    const spinner = this.querySelector('.fa-spinner');
                    if (spinner) spinner.style.display = 'inline-block';
                    
                    // Disable button during loading
                    this.disabled = true;
                    
                    // Simulate loading delay
                    setTimeout(() => {
                        // Get current project count
                        const currentCount = projectsGrid.children.length;
                        
                        // Get next batch of projects
                        const nextProjects = filteredProjects.slice(currentCount, currentCount + 6);
                        
                        // Render next batch
                        nextProjects.forEach(project => {
                            const projectCard = createProjectCard(project);
                            projectsGrid.appendChild(projectCard);
                        });
                        
                        // Hide spinner
                        if (spinner) spinner.style.display = 'none';
                        
                        // Enable button
                        this.disabled = false;
                        
                        // Hide load more button if all projects are loaded
                        if (projectsGrid.children.length >= filteredProjects.length) {
                            this.style.display = 'none';
                        }
                        
                        // Setup image carousels for new cards
                        setupImageCarousels();
                    }, 800); // Simulate network delay
                });
            }
        }
        
        // Setup image carousels
        setupImageCarousels();
        
        // Setup lightbox
        setupLightbox();
    }
}

// Get filtered projects based on current filters
function getFilteredProjects() {
    const categoryFilter = document.getElementById('categoryFilter');
    const yearFilter = document.getElementById('yearFilter');
    const searchInput = document.getElementById('searchInput');
    
    let filteredProjects = [...projectsData];
    
    // Filter by category
    if (categoryFilter && categoryFilter.value !== 'all') {
        filteredProjects = filteredProjects.filter(project => project.category === categoryFilter.value);
    }
    
    // Filter by year
    if (yearFilter && yearFilter.value !== 'all') {
        filteredProjects = filteredProjects.filter(project => project.year === yearFilter.value);
    }
    
    // Filter by search term
    if (searchInput && searchInput.value.trim() !== '') {
        const searchTerm = searchInput.value.trim().toLowerCase();
        filteredProjects = filteredProjects.filter(project => {
            return (
                project.title.toLowerCase().includes(searchTerm) ||
                project.description.toLowerCase().includes(searchTerm) ||
                project.location.toLowerCase().includes(searchTerm) ||
                project.architect.toLowerCase().includes(searchTerm)
            );
        });
    }
    
    return filteredProjects;
}

// Filter projects based on current filters
function filterProjects() {
    loadProjects();
}

// Update projects count text
function updateProjectsCount(count) {
    const projectsCount = document.getElementById('projectsCount');
    
    if (projectsCount) {
        if (count === 0) {
            projectsCount.textContent = 'No projects found';
        } else if (count === 1) {
            projectsCount.textContent = 'Showing 1 project';
        } else {
            projectsCount.textContent = `Showing ${count} projects`;
        }
    }
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'listing-project-card';
    card.dataset.id = project.id;
    
    // Create carousel HTML if multiple images
    let mediaHTML = '';
    if (project.images.length > 1) {
        mediaHTML = `
            <div class="image-carousel">
                <div class="carousel-container">
                    ${project.images.map((img, index) => `
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <img src="${img}" alt="${project.title} - Image ${index + 1}">
                        </div>
                    `).join('')}
                </div>
                <div class="carousel-controls">
                    <div class="carousel-nav carousel-prev" aria-label="Previous image">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                    <div class="carousel-indicators">
                        ${project.images.map((_, index) => `
                            <span class="carousel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></span>
                        `).join('')}
                    </div>
                    <div class="carousel-nav carousel-next" aria-label="Next image">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Single image
        mediaHTML = `<img src="${project.images[0]}" alt="${project.title}">`;
    }
    
    card.innerHTML = `
        <div class="listing-project-media">
            <span class="listing-project-badge">${getCategoryDisplayName(project.category)}</span>
            <span class="listing-project-year">${project.year}</span>
            ${mediaHTML}
        </div>
        <div class="listing-project-content">
            <h3 class="listing-project-title">${project.title}</h3>
            <div class="listing-project-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${project.location}</span>
                <span><i class="fas fa-ruler-combined"></i> ${project.area}</span>
            </div>
            <p class="listing-project-description">${truncateText(project.description, 120)}</p>
            <div class="listing-project-footer">
                <span><i class="fas fa-user"></i> ${project.architect}</span>
                <a href="#" class="listing-project-link view-project" data-id="${project.id}">View Details <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `;
    
    // Add click event to open lightbox for the entire card
    card.addEventListener('click', function(e) {
        // Don't open lightbox if carousel controls were clicked
        if (e.target.closest('.carousel-controls')) {
            e.stopPropagation();
            return;
        }
        
        openLightbox(project);
    });
    
    // Add specific click event for the View Details link
    const viewDetailsLink = card.querySelector('.view-project');
    if (viewDetailsLink) {
        viewDetailsLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            e.stopPropagation(); // Prevent triggering the card click event
            openLightbox(project);
        });
    }
    
    return card;
}

// Truncate text to specified length
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Setup image carousels
function setupImageCarousels() {
    const carousels = document.querySelectorAll('.image-carousel');
    
    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        
        if (!items.length) return;
        
        let currentIndex = 0;
        
        // Function to show slide
        const showSlide = (index) => {
            // Update current index
            currentIndex = (index + items.length) % items.length;
            
            // Update active class on items
            items.forEach((item, i) => {
                item.classList.toggle('active', i === currentIndex);
            });
            
            // Update active class on indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });
        };
        
        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click
                showSlide(currentIndex - 1);
            });
        }
        
        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click
                showSlide(currentIndex + 1);
            });
        }
        
        // Indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click
                showSlide(index);
            });
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left (next)
                showSlide(currentIndex + 1);
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right (prev)
                showSlide(currentIndex - 1);
            }
        };
    });
}

// Setup lightbox functionality
function setupLightbox() {
    const lightbox = document.getElementById('projectLightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    
    if (lightbox && lightboxClose) {
        // Close lightbox when close button is clicked
        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close lightbox when clicking outside content
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
        
        // Close lightbox on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
                closeLightbox();
            }
        });
    }
}

// Open lightbox with project details
function openLightbox(project) {
    console.log("Opening lightbox for project:", project);
    
    const lightbox = document.getElementById('projectLightbox');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxCarousel = document.getElementById('lightboxCarousel');
    const lightboxClient = document.getElementById('lightboxClient');
    const lightboxArea = document.getElementById('lightboxArea');
    const lightboxAddress = document.getElementById('lightboxAddress');
    const lightboxCompletion = document.getElementById('lightboxCompletion');
    const lightboxLocation = document.getElementById('lightboxLocation');
    const lightboxYear = document.getElementById('lightboxYear');
    const lightboxArchitect = document.getElementById('lightboxArchitect');
    
    // Check if we have the minimum required elements
    if (!lightbox) {
        console.error("Lightbox element not found!");
        return;
    }
    
    // Set project details
    if (lightboxTitle) lightboxTitle.textContent = project.title;
    
    // Set category
    if (lightboxCategory) lightboxCategory.textContent = getCategoryDisplayName(project.category);
    
    // Set stats
    if (lightboxLocation) lightboxLocation.textContent = project.location;
    if (lightboxYear) lightboxYear.textContent = project.year;
    if (lightboxArea) lightboxArea.textContent = project.area;
    if (lightboxArchitect) lightboxArchitect.textContent = project.architect;
    
    // Set additional project details
    if (lightboxClient) lightboxClient.textContent = project.client || 'Not specified';
    if (lightboxAddress) lightboxAddress.textContent = project.address || project.location || 'Not specified';
    if (lightboxCompletion) lightboxCompletion.textContent = project.completion || project.year || 'Not specified';
    
    // Set description
    if (lightboxDescription) lightboxDescription.textContent = project.description;
    
    // Create carousel HTML if carousel element exists
    if (lightboxCarousel && project.images && project.images.length > 0) {
        console.log("Setting up carousel with images:", project.images);
        
        // Clear any existing content
        lightboxCarousel.innerHTML = '';
        lightboxCarousel.style.background = 'transparent';
        
        // Create container
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'lightbox-carousel-container';
        carouselContainer.style.background = 'transparent';
        
        // Add carousel items
        project.images.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = `lightbox-carousel-item ${index === 0 ? 'active' : ''}`;
            
            const imgEl = document.createElement('img');
            imgEl.src = img;
            imgEl.alt = `${project.title} - Image ${index + 1}`;
            
            item.appendChild(imgEl);
            carouselContainer.appendChild(item);
        });
        
        // Add navigation
        const navEl = document.createElement('div');
        navEl.className = 'lightbox-carousel-nav';
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'lightbox-prev';
        prevBtn.setAttribute('aria-label', 'Previous image');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'lightbox-next';
        nextBtn.setAttribute('aria-label', 'Next image');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        navEl.appendChild(prevBtn);
        navEl.appendChild(nextBtn);
        
        // Add indicators
        const indicatorsEl = document.createElement('div');
        indicatorsEl.className = 'lightbox-carousel-indicators';
        
        project.images.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `lightbox-indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('data-index', index);
            indicator.setAttribute('aria-label', `Image ${index + 1}`);
            indicatorsEl.appendChild(indicator);
        });
        
        // Append all elements to carousel
        lightboxCarousel.appendChild(carouselContainer);
        lightboxCarousel.appendChild(navEl);
        lightboxCarousel.appendChild(indicatorsEl);
    }
    
    // Show lightbox with animation
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Add entrance animation class
    setTimeout(() => {
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        if (lightboxContent) {
            lightboxContent.classList.add('lightbox-animate-in');
        }
    }, 10);
    
    // Setup lightbox carousel with auto-scrolling
    setupLightboxCarousel(true);
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('projectLightbox');
    
    if (lightbox) {
        // Add exit animation
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        if (lightboxContent) {
            lightboxContent.classList.remove('lightbox-animate-in');
            
            // Wait for animation to complete before hiding
            setTimeout(() => {
                lightbox.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = ''; // Restore scrolling
            }, 300);
        } else {
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Restore scrolling
        }
        
        // Clear any auto-scroll intervals
        const autoScrollIntervals = window.autoScrollIntervals || [];
        autoScrollIntervals.forEach(interval => clearInterval(interval));
        window.autoScrollIntervals = [];
    }
}

// Setup lightbox carousel
function setupLightboxCarousel(enableAutoScroll = false) {
    console.log("Setting up lightbox carousel, auto-scroll:", enableAutoScroll);
    
    const lightboxCarousel = document.getElementById('lightboxCarousel');
    
    if (!lightboxCarousel) {
        console.error("Lightbox carousel element not found!");
        return;
    }
    
    const items = lightboxCarousel.querySelectorAll('.lightbox-carousel-item');
    console.log("Found carousel items:", items.length);
    
    const prevBtn = lightboxCarousel.querySelector('.lightbox-prev');
    const nextBtn = lightboxCarousel.querySelector('.lightbox-next');
    const indicators = lightboxCarousel.querySelectorAll('.lightbox-indicator');
    
    if (!items.length) {
        console.error("No carousel items found!");
        return;
    }
    
    let currentIndex = 0;
    let autoScrollInterval;
    
    // Function to show slide
    const showSlide = (index) => {
        // Update current index
        currentIndex = (index + items.length) % items.length;
        
        // Update active class on items
        items.forEach((item, i) => {
            item.classList.toggle('active', i === currentIndex);
        });
        
        // Update active class on indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
    };
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
            resetAutoScroll(); // Reset auto-scroll timer when manually navigating
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
            resetAutoScroll(); // Reset auto-scroll timer when manually navigating
        });
    }
    
    // Indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetAutoScroll(); // Reset auto-scroll timer when manually navigating
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (document.getElementById('projectLightbox').getAttribute('aria-hidden') === 'false') {
            if (e.key === 'ArrowLeft') {
                showSlide(currentIndex - 1);
                resetAutoScroll(); // Reset auto-scroll timer when manually navigating
            } else if (e.key === 'ArrowRight') {
                showSlide(currentIndex + 1);
                resetAutoScroll(); // Reset auto-scroll timer when manually navigating
            }
        }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightboxCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        resetAutoScroll(); // Reset auto-scroll timer when touching
    }, { passive: true });
    
    lightboxCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    const handleSwipe = () => {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left (next)
            showSlide(currentIndex + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right (prev)
            showSlide(currentIndex - 1);
        }
    };
    
    // Auto-scrolling functionality
    function startAutoScroll() {
        if (enableAutoScroll && items.length > 1) {
            autoScrollInterval = setInterval(() => {
                showSlide(currentIndex + 1);
            }, 5000); // Change slide every 5 seconds
        }
    }
    
    function resetAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            startAutoScroll();
        }
    }
    
    // Pause auto-scroll when hovering over carousel
    lightboxCarousel.addEventListener('mouseenter', () => {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    });
    
    // Resume auto-scroll when mouse leaves carousel
    lightboxCarousel.addEventListener('mouseleave', () => {
        if (enableAutoScroll) {
            startAutoScroll();
        }
    });
    
    // Start auto-scrolling if enabled
    startAutoScroll();
    
    // Clean up auto-scroll when lightbox is closed
    const lightboxClose = document.getElementById('lightboxClose');
    if (lightboxClose) {
        const originalClickHandler = lightboxClose.onclick;
        lightboxClose.onclick = function() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
            }
            if (originalClickHandler) {
                originalClickHandler();
            } else {
                closeLightbox();
            }
        };
    }
    
    // Also clean up when clicking outside the lightbox content
    const lightbox = document.getElementById('projectLightbox');
    if (lightbox) {
        const originalClickHandler = lightbox.onclick;
        lightbox.onclick = function(e) {
            if (e.target === lightbox) {
                if (autoScrollInterval) {
                    clearInterval(autoScrollInterval);
                }
                if (originalClickHandler) {
                    originalClickHandler(e);
                } else {
                    closeLightbox();
                }
            }
        };
    }
}
