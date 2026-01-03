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
const profileModal = document.getElementById('profileModal');
const profileClose = document.querySelector('.profile-close');
const profileCloseBtn = document.getElementById('profileCloseBtn');
const profileEditBtn = document.getElementById('profileEditBtn');

if (myProfileLink) {
    myProfileLink.addEventListener('click', function(e) {
        e.preventDefault();
        profileContainer.classList.remove('active');
        // Open profile modal
        profileModal.classList.add('show');
        document.body.style.overflow = 'hidden';
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

// Profile Modal Close Handlers
function closeProfileModal() {
    profileModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

if (profileClose) {
    profileClose.addEventListener('click', closeProfileModal);
}

if (profileCloseBtn) {
    profileCloseBtn.addEventListener('click', closeProfileModal);
}

if (profileEditBtn) {
    profileEditBtn.addEventListener('click', function() {
        alert('Edit Profile functionality coming soon!');
    });
}

// Close profile modal when clicking outside
if (profileModal) {
    profileModal.addEventListener('click', function(e) {
        if (e.target === profileModal) {
            closeProfileModal();
        }
    });
}

// Close profile modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && profileModal.classList.contains('show')) {
        closeProfileModal();
    }
});

// Icon click handlers
const iconCircle = document.querySelector('.icon-circle');

// Check In / Check Out Modal Elements
let checkInTime = null;
let isCheckedIn = false;

const checkInOutModal = document.getElementById('checkInOutModal');
const checkinClose = document.querySelector('.checkin-close');
const checkInBtn = document.getElementById('checkInBtn');
const checkOutBtn = document.getElementById('checkOutBtn');
const checkInAction = document.getElementById('checkInAction');
const checkOutAction = document.getElementById('checkOutAction');
const checkInTimeDisplay = document.getElementById('checkInTimeDisplay');

if (iconCircle) {
    iconCircle.addEventListener('click', function() {
        checkInOutModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        updateCheckInOutDisplay();
    });
}

// Update check-in/out display
function updateCheckInOutDisplay() {
    if (isCheckedIn) {
        checkInAction.style.display = 'none';
        checkOutAction.style.display = 'block';
        if (checkInTime) {
            const hours = String(checkInTime.getHours() % 12 || 12).padStart(2, '0');
            const minutes = String(checkInTime.getMinutes()).padStart(2, '0');
            const ampm = checkInTime.getHours() >= 12 ? 'PM' : 'AM';
            checkInTimeDisplay.textContent = `Since ${hours}:${minutes}${ampm}`;
        }
    } else {
        checkInAction.style.display = 'block';
        checkOutAction.style.display = 'none';
    }
}

// Check In button
if (checkInBtn) {
    checkInBtn.addEventListener('click', function() {
        isCheckedIn = true;
        checkInTime = new Date();
        updateCheckInOutDisplay();
        // Change icon color to green
        iconCircle.style.backgroundColor = '#10b981';
    });
}

// Check Out button
if (checkOutBtn) {
    checkOutBtn.addEventListener('click', function() {
        isCheckedIn = false;
        checkInTime = null;
        updateCheckInOutDisplay();
        // Change icon color back to red
        iconCircle.style.backgroundColor = '#e74c3c';
    });
}

// Close modal function
function closeCheckInOutModal() {
    checkInOutModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

if (checkinClose) {
    checkinClose.addEventListener('click', closeCheckInOutModal);
}

// Close modal when clicking outside
if (checkInOutModal) {
    checkInOutModal.addEventListener('click', function(e) {
        if (e.target === checkInOutModal) {
            closeCheckInOutModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && checkInOutModal.classList.contains('show')) {
        closeCheckInOutModal();
    }
});

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
        
        // Get attendance indicator status from the card
        const attendanceIndicator = this.querySelector('.attendance-indicator');
        let statusText = 'Active';
        
        if (attendanceIndicator) {
            if (attendanceIndicator.classList.contains('present')) {
                statusText = 'Present';
            } else if (attendanceIndicator.classList.contains('on-leave')) {
                statusText = 'On Leave';
            } else if (attendanceIndicator.classList.contains('absent')) {
                statusText = 'Absent';
            }
        }
        
        // Populate modal with data
        document.getElementById('modalName').textContent = employeeName;
        document.getElementById('modalPosition').textContent = employeeData.position;
        document.getElementById('modalDepartment').textContent = employeeData.department;
        document.getElementById('modalEmail').textContent = employeeData.email;
        document.getElementById('modalPhone').textContent = employeeData.phone;
        document.getElementById('modalStatus').textContent = statusText;
        
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
        const statuses = ['present', 'on-leave', 'absent'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Remove all status classes
        indicator.classList.remove('present', 'on-leave', 'absent');
        
        // Add the random status class
        indicator.classList.add(randomStatus);
        
        // Set tooltip based on status
        if (randomStatus === 'present') {
            indicator.title = 'Present - Employee is in the office';
        } else if (randomStatus === 'on-leave') {
            indicator.title = 'On Leave - Employee is on leave';
        } else if (randomStatus === 'absent') {
            indicator.title = 'Absent - Employee has not applied time off and is absent';
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setRandomAttendanceStatus();
});
