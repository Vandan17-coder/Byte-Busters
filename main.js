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

// Icon click handlers
const iconCircle = document.querySelector('.icon-circle');
const iconRectangle = document.querySelector('.icon-rectangle');

if (iconCircle) {
    iconCircle.addEventListener('click', function() {
        console.log('Circle icon clicked');
    });
}

if (iconRectangle) {
    iconRectangle.addEventListener('click', function() {
        console.log('Rectangle icon clicked');
    });
}

// Employee Card Click Handler
const employeeCards = document.querySelectorAll('.employee-card');
employeeCards.forEach(card => {
    card.addEventListener('click', function() {
        const employeeName = this.querySelector('.employee-name').textContent;
        console.log('Clicked on employee:', employeeName);
        // You can add modal or detail view functionality here
    });
});

// Search Functionality
const searchBox = document.querySelector('.search-box');
if (searchBox) {
    searchBox.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.employee-card');
        
        cards.forEach(card => {
            const employeeName = card.querySelector('.employee-name').textContent.toLowerCase();
            if (employeeName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Filter Button Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filterValue = this.textContent;
        console.log('Filter applied:', filterValue);
        // Add filter logic here if needed
    });
});

// Random attendance indicator status
function setRandomAttendanceStatus() {
    const indicators = document.querySelectorAll('.attendance-indicator');
    indicators.forEach(indicator => {
        const isPresent = Math.random() > 0.5;
        if (isPresent) {
            indicator.classList.add('present');
            indicator.title = 'Present';
        } else {
            indicator.classList.add('absent');
            indicator.title = 'Absent';
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setRandomAttendanceStatus();
});
