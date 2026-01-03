// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Icon click handlers (optional - add functionality as needed)
const iconCircle = document.querySelector('.icon-circle');
const iconRectangle = document.querySelector('.icon-rectangle');

if (iconCircle) {
    iconCircle.addEventListener('click', function() {
        console.log('Circle icon clicked');
        // Add your functionality here
    });
}

if (iconRectangle) {
    iconRectangle.addEventListener('click', function() {
        console.log('Rectangle icon clicked');
        // Add your functionality here
    });
}
