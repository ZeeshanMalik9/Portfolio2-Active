// Smooth scrolling for navigation
// function scrollToSection(sectionId) {
//     const section = document.getElementById(sectionId);
//     if (section) {
//         section.scrollIntoView({ behavior: 'smooth' });
//     }
// }

// Theme changing functionality
function changeTheme(color) {
    const colors = {
        skyblue: '#87CEEB',
        yellow: '#FFD700',
        black: '#000',
        gray: '#808080',
        orange: '#ffa500',
        greenYellow: '#adff2f',
        white: '#0ffff0'

    };

    if (colors[color]) {
        // Change background color of sections
        document.querySelectorAll('section').forEach(section => {
            section.style.backgroundColor = colors[color];
            section.style.color = '#ffffff';
        });

        // Keep navigation and cards white
        document.querySelector('.navigation').style.backgroundColor = '#ffffff';
        document.querySelector('.nametext').style.color = colors[color];
        document.querySelectorAll('.menuContainer button').forEach(button => {
            button.style.color = colors[color];
        });

        // Keep cards white
        document.querySelectorAll('.skilBox, .experienceCard, .cirtificateCard, .contactCard').forEach(card => {
            card.style.backgroundColor = '#ffffff';
            card.style.color = '#333';
        });

        // Update footer
        document.querySelector('footer').style.backgroundColor = '#333';
        document.querySelector('footer').style.color = '#ffffff';

        //Project Card color
        document.querySelectorAll('.projButton').forEach(button => {
            button.style.backgroundColor = colors[color];
            button.style.color = '#ffffff';
            button.style.transition = '0.5s';
            
            // Add hover event listeners
            button.addEventListener('mouseenter', () => {
                button.style.backgroundColor = '#0056b3';
                button.style.color = 'black';
                button.style.fontWeight = '700';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.backgroundColor = colors[color];
                button.style.color = '#ffffff';
                button.style.fontWeight = '500';
            });
        });
    }
}

// Gallery modal functionality
function openGalleryModal(card) {
    // Create modal if it doesn't exist
    let modal = document.querySelector('.gallery-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'gallery-modal';
        document.body.appendChild(modal);

        modal.innerHTML = `
            <div class="gallery-modal-content">
                <img src="" alt="Gallery Image">
                <p class="gallery-description">Image Description</p>
                <button onclick="closeGalleryModal()">Close</button>
            </div>
        `;

        // Style the modal
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';

        const content = modal.querySelector('.gallery-modal-content');
        content.style.backgroundColor = 'white';
        content.style.padding = '2rem';
        content.style.borderRadius = '10px';
        content.style.maxWidth = '80%';
        content.style.maxHeight = '80%';
    }

    modal.style.display = 'flex';
}

function closeGalleryModal() {
    const modal = document.querySelector('.gallery-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Contact form submitted');
});

document.getElementById('complementForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Complement form submitted');
});

// Skills slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const skillSlider = document.querySelector('.skillSlider');
    const prevButton = document.querySelector('.prev-arrow');
    const nextButton = document.querySelector('.next-arrow');
    
    if (skillSlider && prevButton && nextButton) {
        let currentPosition = 0;
        
        function getVisibleItems() {
            const width = window.innerWidth;
            if (width > 1200) return 4;
            if (width > 900) return 3;
            if (width > 600) return 2;
            return 1;
        }

        function updateSliderPosition() {
            const visibleItems = getVisibleItems();
            const itemWidth = skillSlider.offsetWidth / visibleItems;
            const maxPosition = Math.max(0, skillSlider.children.length - visibleItems);
            
            // Ensure currentPosition is within bounds
            currentPosition = Math.min(currentPosition, maxPosition);
            
            skillSlider.style.transform = `translateX(${-currentPosition * itemWidth}px)`;
            
            // Update button states
            prevButton.style.opacity = currentPosition === 0 ? '0.5' : '1';
            prevButton.style.cursor = currentPosition === 0 ? 'default' : 'pointer';
            
            nextButton.style.opacity = currentPosition >= maxPosition ? '0.5' : '1';
            nextButton.style.cursor = currentPosition >= maxPosition ? 'default' : 'pointer';
        }

        prevButton.addEventListener('click', () => {
            if (currentPosition > 0) {
                currentPosition--;
                updateSliderPosition();
            }
        });

        nextButton.addEventListener('click', () => {
            const visibleItems = getVisibleItems();
            const maxPosition = Math.max(0, skillSlider.children.length - visibleItems);
            
            if (currentPosition < maxPosition) {
                currentPosition++;
                updateSliderPosition();
            }
        });

        // Initialize slider
        updateSliderPosition();

        // Update on window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                currentPosition = 0;
                updateSliderPosition();
            }, 250);
        });
    }
});

// Experience slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const expSlider = document.querySelector('.experienceSlider');
    const expPrevBtn = document.getElementById('expPrevBtn');
    const expNextBtn = document.getElementById('expNextBtn');
    
    if (expSlider && expPrevBtn && expNextBtn) {
        let currentExpPosition = 0;
        const totalExperiences = expSlider.children.length;
        
        function updateExperiencePosition() {
            const cardWidth = expSlider.offsetWidth;
            expSlider.style.transform = `translateX(${-currentExpPosition * cardWidth}px)`;
            
            // Update button states
            expPrevBtn.style.opacity = currentExpPosition === 0 ? '0' : '1';
            expPrevBtn.style.cursor = currentExpPosition === 0 ? 'default' : 'pointer';
            
            expNextBtn.style.opacity = currentExpPosition >= totalExperiences - 1 ? '0' : '1';
            expNextBtn.style.cursor = currentExpPosition >= totalExperiences - 1 ? 'default' : 'pointer';
        }

        expPrevBtn.addEventListener('click', () => {
            if (currentExpPosition >= -1) {
                currentExpPosition--;
                updateExperiencePosition();
            }
        });

        expNextBtn.addEventListener('click', () => {
            if (currentExpPosition < totalExperiences - 1) {
                currentExpPosition++;
                updateExperiencePosition();
            }
        });

        // Initialize experience slider
        updateExperiencePosition();

        // Update on window resize
        let expResizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(expResizeTimer);
            expResizeTimer = setTimeout(() => {
                currentExpPosition = 0;
                updateExperiencePosition();
            }, 250);
        });
    }
});

// Projects Slider
const projectsSlider = document.querySelector('.projectsSlider');
const projectCards = Array.from(document.querySelectorAll('.projectCard'));
const projPrevBtn = document.getElementById('projPrevBtn');
const projNextBtn = document.getElementById('projNextBtn');

let currentIndex = 0;

function updateCards() {
    projectCards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next');
        
        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === getPrevIndex()) {
            card.classList.add('prev');
        } else if (index === getNextIndex()) {
            card.classList.add('next');
        }
    });
}

function getPrevIndex() {
    return (currentIndex - 1 + projectCards.length) % projectCards.length;
}

function getNextIndex() {
    return (currentIndex + 1) % projectCards.length;
}

function slideNext() {
    currentIndex = getNextIndex();
    updateCards();
}

function slidePrev() {
    currentIndex = getPrevIndex();
    updateCards();
}

projNextBtn.addEventListener('click', slideNext);
projPrevBtn.addEventListener('click', slidePrev);

// Add touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

projectsSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

projectsSlider.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
});

projectsSlider.addEventListener('touchend', () => {
    const touchDiff = touchStartX - touchEndX;
    if (Math.abs(touchDiff) > 50) { // Minimum swipe distance
        if (touchDiff > 0) {
            slideNext();
        } else {
            slidePrev();
        }
    }
});

// Initialize the first card as active
updateCards();

// Initialize theme
document.addEventListener('DOMContentLoaded', function() {
    changeTheme('gray'); // Set default theme to gray
});

// Handle color picker visibility on scroll
window.addEventListener('scroll', () => {
    const homeSection = document.getElementById('home');
    const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;
    const scrollPosition = window.scrollY;
    const menuColorPicker = document.querySelector('.menuColorPicker');
    const originalColorPicker = document.querySelector('.choosePageColor');

    if (scrollPosition > homeSectionBottom) {
        menuColorPicker.style.display = 'block';
        originalColorPicker.style.display = 'none';
    } else {
        menuColorPicker.style.display = 'none';
        originalColorPicker.style.display = 'flex';
    }
});

// Add hover functionality for color picker
const menuColorPicker = document.querySelector('.menuColorPicker');
const menuColorList = document.querySelector('.menuColorList');
let timeoutId;

menuColorPicker.addEventListener('mouseenter', () => {
    clearTimeout(timeoutId);
    menuColorList.classList.add('show');
});

menuColorPicker.addEventListener('mouseleave', () => {
    timeoutId = setTimeout(() => {
        menuColorList.classList.remove('show');
    }, 300); // Small delay to make interaction smoother
});

menuColorList.addEventListener('mouseenter', () => {
    clearTimeout(timeoutId);
});

menuColorList.addEventListener('mouseleave', () => {
    timeoutId = setTimeout(() => {
        menuColorList.classList.remove('show');
    }, 300);
});

// Remove old click handlers since we're using hover now
function toggleColorList() {
    // Function kept for compatibility but no longer needed
}

// Remove the document click handler since we're using hover
document.removeEventListener('click', (event) => {
    const menuColorPicker = document.querySelector('.menuColorPicker');
    const menuColorList = document.querySelector('.menuColorList');
    
    if (!menuColorPicker.contains(event.target)) {
        menuColorList.classList.remove('show');
    }
});
