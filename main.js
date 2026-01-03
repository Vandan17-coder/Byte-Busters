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

// Profile Dropdown Menu
const profileAvatar = document.querySelector('.profile-avatar');
const profileContainer = document.querySelector('.profile-container');
const profileDropdown = document.querySelector('.profile-dropdown');

if (profileAvatar) {
    profileAvatar.addEventListener('click', function(e) {
        e.stopPropagation();
        profileContainer.classList.toggle('active');
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (profileContainer && !profileContainer.contains(e.target)) {
        profileContainer.classList.remove('active');
    }
});

// Profile Dropdown Items Click Handlers
const myProfileLink = document.querySelector('a[href="#myprofile"]');
const logoutLink = document.querySelector('a[href="#logout"]');

if (myProfileLink) {
    myProfileLink.addEventListener('click', function(e) {
        e.preventDefault();
        profileContainer.classList.remove('active');
        console.log('Navigating to My Profile');
        // You can add navigation logic here
        alert('My Profile page will open here');
    });
}

if (logoutLink) {
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        profileContainer.classList.remove('active');
        console.log('User logging out');
        // You can add logout logic here
        alert('Logging out... See you soon!');
    });
}

// Icon click handlers
const iconCircle = document.querySelector('.icon-circle');

if (iconCircle) {
    iconCircle.addEventListener('click', function() {
        console.log('Circle icon clicked');
    });
}

// Random data generator for employee information
function generateRandomEmployeeData() {
    const positions = ['Software Engineer', 'Product Manager', 'Designer', 'Data Analyst', 'HR Manager', 'Sales Executive', 'DevOps Engineer', 'UX Designer'];
    const departments = ['Engineering', 'Product', 'Design', 'Analytics', 'HR', 'Sales', 'Operations', 'Marketing'];
    const statuses = ['Active', 'On Leave', 'Remote', 'Inactive'];
    
    const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Robert', 'Amanda'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];
    const randomDepartment = departments[Math.floor(Math.random() * departments.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomPhone = `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
    const randomEmail = `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@company.com`;
    
    return {
        name: `${randomFirstName} ${randomLastName}`,
        position: randomPosition,
        department: randomDepartment,
        email: randomEmail,
        phone: randomPhone,
        status: randomStatus
    };
}

// Employee Card Click Handler
const employeeCards = document.querySelectorAll('.employee-card');
const employeeModal = document.getElementById('employeeModal');
const modalClose = document.querySelector('.modal-close');
const modalCloseBtn = document.querySelector('.modal-close-btn');

employeeCards.forEach(card => {
    card.addEventListener('click', function() {
        const employeeName = this.querySelector('.employee-name').textContent;
        const employeeData = generateRandomEmployeeData();
        
        // Populate modal with data
        document.getElementById('modalName').textContent = employeeName;
        document.getElementById('modalPosition').textContent = employeeData.position;
        document.getElementById('modalDepartment').textContent = employeeData.department;
        document.getElementById('modalEmail').textContent = employeeData.email;
        document.getElementById('modalPhone').textContent = employeeData.phone;
        document.getElementById('modalStatus').textContent = employeeData.status;
        
        // Show modal
        employeeModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal function
function closeEmployeeModal() {
    employeeModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Modal close button handlers
if (modalClose) {
    modalClose.addEventListener('click', closeEmployeeModal);
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeEmployeeModal);
}

// Close modal when clicking outside
if (employeeModal) {
    employeeModal.addEventListener('click', function(e) {
        if (e.target === employeeModal) {
            closeEmployeeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && employeeModal.classList.contains('show')) {
        closeEmployeeModal();
    }
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
