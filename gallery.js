document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-image');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Filter buttons click handler
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Lightbox functionality
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const mainImg = item.querySelector('.gallery-item-inner > img').src;
            const content = item.querySelector('.gallery-item-content').innerHTML;
            const extraContainer = item.querySelector('.gallery-item-extra');
            
            // Create lightbox content
            let lightboxHTML = `
                <div class="lightbox-content">
                    <button class="close-lightbox">
                        <i class="fas fa-times"></i>
                    </button>
                    <button class="caption-toggle" title="Toggle Details">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <button class="lightbox-nav prev">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="lightbox-nav next">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <div class="lightbox-images">
                        <div class="lightbox-image-container">
                            <img src="${mainImg}" alt="" class="lightbox-image">
                        </div>`;
            
            // Add extra images if they exist
            if (extraContainer) {
                const extraImages = extraContainer.querySelectorAll('img');
                extraImages.forEach(img => {
                    lightboxHTML += `
                        <div class="lightbox-image-container">
                            <img src="${img.src}" alt="" class="lightbox-image">
                        </div>`;
                });
                
                const extraDetails = extraContainer.querySelector('.extra-details');
                const teamMembers = extraContainer.querySelector('.team-members');
                
                lightboxHTML += `
                    </div>
                    <div class="lightbox-caption">
                        <h3>${item.querySelector('.gallery-item-content h3').textContent}</h3>
                        ${extraDetails ? extraDetails.innerHTML : ''}
                        ${teamMembers ? teamMembers.outerHTML : ''}
                    </div>`;
            } else {
                lightboxHTML += `
                    </div>
                    <div class="lightbox-caption">
                        <h3>${item.querySelector('.gallery-item-content h3').textContent}</h3>
                        <p>${item.querySelector('.gallery-item-content p').textContent}</p>
                    </div>`;
            }
            
            lightboxHTML += `</div>`;
            
            // Update lightbox content
            lightbox.innerHTML = lightboxHTML;
                
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Reattach close button listener
            const newCloseBtn = lightbox.querySelector('.close-lightbox');
            newCloseBtn.addEventListener('click', () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            });

            // Add navigation functionality
            const imagesContainer = lightbox.querySelector('.lightbox-images');
            const prevBtn = lightbox.querySelector('.lightbox-nav.prev');
            const nextBtn = lightbox.querySelector('.lightbox-nav.next');

            const scrollAmount = imagesContainer.clientWidth * 0.8; // 80% of container width

            prevBtn.addEventListener('click', () => {
                imagesContainer.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });

            nextBtn.addEventListener('click', () => {
                imagesContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            // Optional: Add keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (lightbox.classList.contains('active')) {
                    if (e.key === 'ArrowLeft') {
                        imagesContainer.scrollBy({
                            left: -scrollAmount,
                            behavior: 'smooth'
                        });
                    } else if (e.key === 'ArrowRight') {
                        imagesContainer.scrollBy({
                            left: scrollAmount,
                            behavior: 'smooth'
                        });
                    } else if (e.key === 'Escape') {
                        lightbox.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                }
            });

            // Optional: Add touch swipe support
            let touchStartX = 0;
            let touchEndX = 0;

            imagesContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            imagesContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Swipe left
                        imagesContainer.scrollBy({
                            left: scrollAmount,
                            behavior: 'smooth'
                        });
                    } else {
                        // Swipe right
                        imagesContainer.scrollBy({
                            left: -scrollAmount,
                            behavior: 'smooth'
                        });
                    }
                }
            }

            // Add after setting up the lightbox:
            const captionToggle = lightbox.querySelector('.caption-toggle');
            const caption = lightbox.querySelector('.lightbox-caption');

            captionToggle.addEventListener('click', () => {
                caption.classList.toggle('hide');
                captionToggle.classList.toggle('active');
                lightbox.querySelector('.lightbox-content').classList.toggle('content-hidden');
                
                // Update the icon based on state
                const icon = captionToggle.querySelector('i');
                if (caption.classList.contains('hide')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });

            // Show caption by default and set initial icon
            caption.classList.remove('hide');
            captionToggle.querySelector('i').classList.remove('fa-chevron-up');
            captionToggle.querySelector('i').classList.add('fa-chevron-down');

            // Optional: Show caption by default for items with team members
            if (extraContainer && extraContainer.querySelector('.team-members')) {
                setTimeout(() => {
                    caption.classList.add('show');
                    captionToggle.classList.add('active');
                }, 500);
            }
        });
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Stagger animation for gallery items on load
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}); 