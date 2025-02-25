document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Countdown Timer - Updated to March 3rd, 2025
    const countdownDate = new Date('2025-03-03T00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.querySelector('.days').textContent = days.toString().padStart(2, '0');
        document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.countdown-timer').innerHTML = '<h2>Event Has Started!</h2>';
        }
    }

    const countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
    });

    // Event Categories Navigation
    const eventCategories = {
        'pre-techfest': document.querySelector('.gamethon-section'),
        'technical': document.querySelector('.technical-section'),
        'non-technical': document.querySelector('.non-technical-section')
    };

    let activeCategory = null;

    function showCategory(category) {
        if (activeCategory === category) return;
        
        // Hide all sections with fade out
        Object.values(eventCategories).forEach(section => {
            if (section) {
                section.style.opacity = '0';
                section.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 500);
            }
        });

        // Show selected section with fade in
        if (category && eventCategories[category]) {
            setTimeout(() => {
                eventCategories[category].style.display = 'block';
                setTimeout(() => {
                    eventCategories[category].style.opacity = '1';
                    eventCategories[category].style.transform = 'translateX(0)';
                }, 50);
            }, 500);
        }
        
        activeCategory = category;
    }

    // Banner Slideshow
    const bannerImages = [
        'assets/navonmesa/banner1.jpg',
        'assets/navonmesa/banner2.jpg',
        'assets/navonmesa/banner3.jpg'
    ];

    let currentBannerIndex = 0;
    const heroSection = document.querySelector('.hero-section');

    function changeBanner() {
        const nextIndex = (currentBannerIndex + 1) % bannerImages.length;
        const nextImage = new Image();
        nextImage.src = bannerImages[nextIndex];
        
        nextImage.onload = () => {
            if (heroSection) {
                heroSection.style.backgroundImage = `url(${bannerImages[nextIndex]})`;
                currentBannerIndex = nextIndex;
            }
        };
    }

    setInterval(changeBanner, 5000);

    // Floating Navigation with Initial Message
    const floatingNav = document.createElement('div');
    floatingNav.className = 'floating-nav';
    floatingNav.innerHTML = `
        <div class="nav-tooltip initial-show">
            <i class="fas fa-arrow-down"></i>
            Navigate between event categories using the menu at the bottom
        </div>
        <button class="nav-btn active" data-category="pre-techfest" data-tooltip="GameThon 2025 - Pre-TechFest Event">
            <i class="fas fa-gamepad"></i>
            <span>Pre-TechFest</span>
            <div class="btn-info">
                <span class="event-count">1 Event</span>
                <span class="event-type">GameThon 2025</span>
            </div>
        </button>
        <button class="nav-btn" data-category="technical" data-tooltip="4 Technical Competitions">
            <i class="fas fa-microchip"></i>
            <span>Technical</span>
            <div class="btn-info">
                <span class="event-count">4 Events</span>
                <span class="event-type">RoboWars, CodeStorm & More</span>
            </div>
        </button>
        <button class="nav-btn" data-category="non-technical" data-tooltip="5 Non-Technical Events">
            <i class="fas fa-palette"></i>
            <span>Non-Technical</span>
            <div class="btn-info">
                <span class="event-count">5 Events</span>
                <span class="event-type">Photography, Art & More</span>
            </div>
        </button>
    `;

    document.body.appendChild(floatingNav);

    // Handle tooltip visibility
    const tooltip = floatingNav.querySelector('.nav-tooltip');
    let isScrolling;

    // Show tooltip initially
    setTimeout(() => {
        tooltip.classList.add('show');
    }, 1000);

    // Handle scroll
    window.addEventListener('scroll', () => {
        tooltip.classList.remove('show');
        tooltip.classList.remove('initial-show');
        
        window.clearTimeout(isScrolling);
        
        isScrolling = setTimeout(() => {
            if (floatingNav.matches(':hover')) {
                tooltip.classList.add('show');
            }
        }, 100);
    });

    // Handle hover
    floatingNav.addEventListener('mouseenter', () => {
        tooltip.classList.remove('initial-show');
        tooltip.classList.add('show');
    });

    floatingNav.addEventListener('mouseleave', () => {
        if (!tooltip.classList.contains('initial-show')) {
            tooltip.classList.remove('show');
        }
    });

    // Enhanced Navigation Handlers
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showCategory(btn.dataset.category);
            
            // Show success message
            const toast = document.createElement('div');
            toast.className = 'nav-toast';
            toast.innerHTML = `
                <i class="fas fa-check-circle"></i>
                Showing ${btn.querySelector('span').textContent} Events
            `;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => toast.remove(), 300);
                }, 2000);
            }, 100);
        });

        // Add hover effect to show more info
        btn.addEventListener('mouseenter', () => {
            const btnInfo = btn.querySelector('.btn-info');
            btnInfo.style.opacity = '1';
            btnInfo.style.transform = 'translateY(0)';
        });

        btn.addEventListener('mouseleave', () => {
            const btnInfo = btn.querySelector('.btn-info');
            btnInfo.style.opacity = '0';
            btnInfo.style.transform = 'translateY(10px)';
        });
    });

    // Initialize with first category
    showCategory('pre-techfest');

    // Event Card Preview
    const previewOverlay = document.createElement('div');
    previewOverlay.className = 'preview-overlay';
    document.body.appendChild(previewOverlay);

    // Event Card Handlers
    document.querySelectorAll('.event-card').forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });

        // Add click handler for preview
        card.addEventListener('click', function() {
            const eventDetails = {
                title: this.querySelector('h3').textContent,
                description: this.querySelector('p').textContent,
                icon: this.querySelector('.event-icon i').className
            };
            
            previewOverlay.innerHTML = `
                <div class="preview-content">
                    <i class="close-preview fas fa-times"></i>
                    <i class="${eventDetails.icon} preview-icon"></i>
                    <h2>${eventDetails.title}</h2>
                    <p>${eventDetails.description}</p>
                    <div class="preview-details">
                        <div class="detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>Date: ${this.querySelector('.event-details') ? 
                                this.querySelector('.event-details').innerHTML.split('<br>')[0].replace('<strong>📅 Date:</strong> ', '') : 
                                'March 3, 2025'}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Venue: ${this.querySelector('.event-details') ? 
                                this.querySelector('.event-details').innerHTML.split('<br>')[1].replace('<strong>📍 Venue:</strong> ', '') : 
                                'SRMIST Vadapalani'}</span>
                        </div>
                    </div>
                </div>
            `;
            
            previewOverlay.style.display = 'flex';
            setTimeout(() => {
                previewOverlay.style.opacity = '1';
                previewOverlay.querySelector('.preview-content').style.transform = 'translateY(0)';
            }, 50);
            
            const closeBtn = previewOverlay.querySelector('.close-preview');
            if (closeBtn) {
                closeBtn.addEventListener('click', closePreview);
            }
        });
    });

    function closePreview() {
        previewOverlay.style.opacity = '0';
        previewOverlay.querySelector('.preview-content').style.transform = 'translateY(20px)';
        setTimeout(() => {
            previewOverlay.style.display = 'none';
        }, 300);
    }

    // Registration Form Handling
    const registrationForm = document.getElementById('eventRegistration');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const event = document.getElementById('eventSelect').value;

            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert(`Thank you ${name}! Your registration for ${event} has been received. We'll contact you at ${email} with further details.`);
                this.reset();
                submitBtn.textContent = 'Submit Registration';
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && previewOverlay.style.display === 'flex') {
            closePreview();
        }
    });

    // Mobile Tab System
    if (window.innerWidth <= 768) {
        // Remove tab functionality since we're showing all sections
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.style.display = 'none'; // Hide the tab buttons
        });

        // Ensure register buttons work in mobile view
        document.querySelectorAll('.register-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event card click
                if (this.hasAttribute('onclick')) {
                    const href = this.getAttribute('onclick').match(/'([^']+)'/)[1];
                    window.location.href = href;
                }
            });
        });
    }
}); 