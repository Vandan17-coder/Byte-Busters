// Login and Signup Elements
const loginForm = document.getElementById('loginForm');
const loginModal = document.getElementById('loginModal');
const signupForm = document.getElementById('signupForm');
const signupModal = document.getElementById('signupModal');
const errorMessage = document.getElementById('errorMessage');
const signupErrorMessage = document.getElementById('signupErrorMessage');
const navbar = document.getElementById('navbar');
const mainContent = document.getElementById('mainContent');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');
const logoFileInput = document.getElementById('logo');
const logoFileName = document.getElementById('logoFileName');

// Sample employee credentials (in real app, this would be server-side)
let validCredentials = [
    { username: 'admin', password: 'admin123' },
    { username: 'employee', password: 'emp123' },
    { username: 'user', password: 'password' }
];

// Switch to Signup form
if (switchToSignup) {
    switchToSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.remove('show');
        loginModal.classList.add('hidden');
        signupModal.classList.add('show');
    });
}

// Switch to Login form
if (switchToLogin) {
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.classList.remove('show');
        loginModal.classList.add('show');
    });
}

// Logo file input handler
if (logoFileInput) {
    logoFileInput.addEventListener('change', function(e) {
        const fileName = e.target.files[0]?.name || 'No file chosen';
        logoFileName.textContent = fileName;
    });
}

// Signup form submission
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const companyName = document.getElementById('companyName').value.trim();
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const logoFile = logoFileInput.files[0];
        
        // Clear error message
        signupErrorMessage.classList.remove('show');
        signupErrorMessage.textContent = '';
        
        // Validation
        let errorMsg = '';
        
        if (!companyName) {
            errorMsg = 'Company name is required';
        } else if (!fullName) {
            errorMsg = 'Full name is required';
        } else if (!email || !email.includes('@')) {
            errorMsg = 'Valid email is required';
        } else if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            errorMsg = 'Phone number must be exactly 10 digits';
        } else if (password.length < 6) {
            errorMsg = 'Password must be at least 6 characters';
        } else if (password !== confirmPassword) {
            errorMsg = 'Passwords do not match';
        } else if (!logoFile) {
            errorMsg = 'Please upload a company logo';
        }
        
        if (errorMsg) {
            signupErrorMessage.textContent = errorMsg;
            signupErrorMessage.classList.add('show');
            return;
        }
        
        // Add new user to credentials
        const newUsername = email.split('@')[0]; // Use email prefix as username
        validCredentials.push({
            username: newUsername,
            password: password,
            companyName: companyName,
            fullName: fullName,
            email: email,
            phone: phone
        });
        
        // Show success message
        signupErrorMessage.classList.remove('show');
        alert(`Account created successfully!\nYou can now login with username: ${newUsername}`);
        
        // Reset form and switch to login
        signupForm.reset();
        logoFileName.textContent = 'No file chosen';
        signupModal.classList.remove('show');
        loginModal.classList.add('show');
    });
}

// Login validation
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Validate credentials
        const isValid = validCredentials.some(cred => 
            cred.username === username && cred.password === password
        );
        
        if (isValid) {
            // Clear error message
            errorMessage.classList.remove('show');
            errorMessage.textContent = '';
            
            // Hide login modal and show dashboard
            loginModal.classList.remove('show');
            loginModal.classList.add('hidden');
            navbar.style.display = 'block';
            mainContent.style.display = 'block';
            document.body.style.overflow = 'auto';
            
            // Update employee name in check-in modal
            const employeeNameDisplay = document.getElementById('employeeName');
            if (employeeNameDisplay) {
                employeeNameDisplay.textContent = username.charAt(0).toUpperCase() + username.slice(1);
            }
            
            // Clear form
            loginForm.reset();
        } else {
            // Show error message
            errorMessage.textContent = 'Invalid Credentials';
            errorMessage.classList.add('show');
            document.getElementById('password').value = '';
        }
    });
}

// Password show/hide toggle
document.querySelectorAll('.password-toggle').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('data-target');
        const passwordField = document.getElementById(targetId);
        
        if (passwordField) {
            const isPassword = passwordField.type === 'password';
            passwordField.type = isPassword ? 'text' : 'password';
            
            // Update eye icon
            this.classList.toggle('showing');
        }
    });
});

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
