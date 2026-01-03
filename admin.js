// Initialize admin dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminDashboard();
});

// Admin Dashboard Functionality
function initializeAdminDashboard() {
    // Sample employee data
    const employees = [
        {
            id: 'EMP-001',
            name: 'Altruistic Crab',
            position: 'Senior Developer',
            department: 'Engineering',
            email: 'a.crab@company.com',
            phone: '+1 (555) 101-1001',
            avatar: 'https://via.placeholder.com/100?text=AC',
            degree: 'Bachelor of Science in Computer Science',
            university: 'Tech University',
            gradYear: '2018',
            prevCompany: 'Innovation Labs',
            prevRole: 'Junior Developer',
            yearsExp: '3 years',
            skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS'],
            emergencyContact: '+1 (555) 201-2001',
            dob: 'March 15, 1996',
            address: '123 Tech Street, Silicon Valley, CA 94025',
            ssn: '***-**-5678',
            startDate: 'January 15, 2021',
            empType: 'Full-Time',
            baseSalary: '$95,000',
            bonus: '$8,000',
            totalComp: '$103,000',
            healthIns: 'Premium Plan',
            retirement: '6% Company Match',
            pto: '25 days',
            payFreq: 'Bi-weekly',
            lastRaise: 'January 2025',
            nextReview: 'January 2027'
        },
        {
            id: 'EMP-002',
            name: 'Competent Salmon',
            position: 'Product Manager',
            department: 'Product',
            email: 'c.salmon@company.com',
            phone: '+1 (555) 102-1002',
            avatar: 'https://via.placeholder.com/100?text=CS',
            degree: 'MBA in Product Management',
            university: 'Business School',
            gradYear: '2019',
            prevCompany: 'StartupXYZ',
            prevRole: 'Product Analyst',
            yearsExp: '4 years',
            skills: ['Product Strategy', 'Agile', 'Jira', 'Analytics', 'UX Research'],
            emergencyContact: '+1 (555) 202-2002',
            dob: 'July 22, 1994',
            address: '456 Market Street, San Francisco, CA 94102',
            ssn: '***-**-9012',
            startDate: 'March 1, 2020',
            empType: 'Full-Time',
            baseSalary: '$110,000',
            bonus: '$12,000',
            totalComp: '$122,000',
            healthIns: 'Premium Plan',
            retirement: '5% Company Match',
            pto: '20 days',
            payFreq: 'Bi-weekly',
            lastRaise: 'June 2024',
            nextReview: 'June 2026'
        },
        {
            id: 'EMP-003',
            name: 'Adorable Horn',
            position: 'UX Designer',
            department: 'Design',
            email: 'a.horn@company.com',
            phone: '+1 (555) 103-1003',
            avatar: 'https://via.placeholder.com/100?text=AH',
            degree: 'Bachelor of Fine Arts in Design',
            university: 'Art Institute',
            gradYear: '2020',
            prevCompany: 'Creative Agency',
            prevRole: 'UI Designer',
            yearsExp: '2 years',
            skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
            emergencyContact: '+1 (555) 203-2003',
            dob: 'November 8, 1998',
            address: '789 Design Lane, Austin, TX 78701',
            ssn: '***-**-3456',
            startDate: 'June 15, 2022',
            empType: 'Full-Time',
            baseSalary: '$75,000',
            bonus: '$5,000',
            totalComp: '$80,000',
            healthIns: 'Standard Plan',
            retirement: '4% Company Match',
            pto: '18 days',
            payFreq: 'Bi-weekly',
            lastRaise: 'December 2024',
            nextReview: 'December 2026'
        },
        {
            id: 'EMP-004',
            name: 'Bold Hummingbird',
            position: 'Data Analyst',
            department: 'Analytics',
            email: 'b.hummingbird@company.com',
            phone: '+1 (555) 104-1004',
            avatar: 'https://via.placeholder.com/100?text=BH',
            degree: 'Master of Science in Data Science',
            university: 'Data University',
            gradYear: '2021',
            prevCompany: 'Analytics Corp',
            prevRole: 'Junior Analyst',
            yearsExp: '2 years',
            skills: ['Python', 'SQL', 'Tableau', 'R', 'Machine Learning'],
            emergencyContact: '+1 (555) 204-2004',
            dob: 'May 3, 1997',
            address: '321 Data Drive, Seattle, WA 98101',
            ssn: '***-**-7890',
            startDate: 'September 1, 2023',
            empType: 'Full-Time',
            baseSalary: '$88,000',
            bonus: '$7,000',
            totalComp: '$95,000',
            healthIns: 'Premium Plan',
            retirement: '5% Company Match',
            pto: '22 days',
            payFreq: 'Bi-weekly',
            lastRaise: 'September 2024',
            nextReview: 'September 2026'
        }
    ];

    const adminSearchInput = document.getElementById('adminSearchInput');
    const adminSearchBtn = document.getElementById('adminSearchBtn');
    const adminSearchResults = document.getElementById('adminSearchResults');
    const adminEmployeeDetails = document.getElementById('adminEmployeeDetails');
    const closeDetailsBtn = document.getElementById('closeDetailsBtn');

    // Search functionality
    function searchEmployees(query) {
        if (!query.trim()) {
            adminSearchResults.innerHTML = '<p class="no-results">Please enter a search term</p>';
            return;
        }

        const searchTerm = query.toLowerCase();
        const results = employees.filter(emp => 
            emp.name.toLowerCase().includes(searchTerm) ||
            emp.id.toLowerCase().includes(searchTerm) ||
            emp.department.toLowerCase().includes(searchTerm) ||
            emp.position.toLowerCase().includes(searchTerm)
        );

        if (results.length === 0) {
            adminSearchResults.innerHTML = '<p class="no-results">No employees found</p>';
            return;
        }

        adminSearchResults.innerHTML = results.map(emp => `
            <div class="admin-result-card" data-emp-id="${emp.id}">
                <img src="${emp.avatar}" alt="${emp.name}" class="result-avatar">
                <div class="result-info">
                    <h4>${emp.name}</h4>
                    <p>${emp.position}</p>
                    <p class="result-dept">${emp.department} • ${emp.id}</p>
                </div>
                <button class="view-details-btn" data-emp-id="${emp.id}">View Details</button>
            </div>
        `).join('');

        // Add click handlers to view details buttons
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const empId = this.getAttribute('data-emp-id');
                showEmployeeDetails(empId);
            });
        });
    }

    // Show employee details
    function showEmployeeDetails(empId) {
        const employee = employees.find(emp => emp.id === empId);
        if (!employee) return;

        // Populate basic info
        document.getElementById('adminEmployeeAvatar').src = employee.avatar;
        document.getElementById('adminEmployeeName').textContent = employee.name;
        document.getElementById('adminEmployeePosition').textContent = employee.position;
        document.getElementById('adminEmployeeId').textContent = `ID: ${employee.id}`;

        // Resume tab
        document.getElementById('adminDegree').textContent = employee.degree;
        document.getElementById('adminUniversity').textContent = employee.university;
        document.getElementById('adminGradYear').textContent = employee.gradYear;
        document.getElementById('adminPrevCompany').textContent = employee.prevCompany;
        document.getElementById('adminPrevRole').textContent = employee.prevRole;
        document.getElementById('adminYearsExp').textContent = employee.yearsExp;

        // Update skills
        const skillsContainer = document.querySelector('.skills-container');
        skillsContainer.innerHTML = employee.skills.map(skill => 
            `<span class="skill-tag">${skill}</span>`
        ).join('');

        // Private Info tab
        document.getElementById('adminEmail').textContent = employee.email;
        document.getElementById('adminPhone').textContent = employee.phone;
        document.getElementById('adminEmergencyContact').textContent = employee.emergencyContact;
        document.getElementById('adminDob').textContent = employee.dob;
        document.getElementById('adminAddress').textContent = employee.address;
        document.getElementById('adminSsn').textContent = employee.ssn;
        document.getElementById('adminStartDate').textContent = employee.startDate;
        document.getElementById('adminEmpType').textContent = employee.empType;
        document.getElementById('adminDepartment').textContent = employee.department;

        // Salary Info tab
        document.getElementById('adminBaseSalary').textContent = `${employee.baseSalary} / year`;
        document.getElementById('adminBonus').textContent = `${employee.bonus} / year`;
        document.getElementById('adminTotalComp').textContent = `${employee.totalComp} / year`;
        document.getElementById('adminHealthIns').textContent = employee.healthIns;
        document.getElementById('admin401k').textContent = employee.retirement;
        document.getElementById('adminPto').textContent = `${employee.pto} / year`;
        document.getElementById('adminPayFreq').textContent = employee.payFreq;
        document.getElementById('adminLastRaise').textContent = employee.lastRaise;
        document.getElementById('adminNextReview').textContent = employee.nextReview;

        // Show details section
        adminEmployeeDetails.style.display = 'block';
        adminSearchResults.style.display = 'none';
    }

    // Close details
    if (closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', function() {
            adminEmployeeDetails.style.display = 'none';
            adminSearchResults.style.display = 'block';
        });
    }

    // Tab switching
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            document.getElementById(`${tabName}Tab`).classList.add('active');
        });
    });

    // Search button click
    if (adminSearchBtn) {
        adminSearchBtn.addEventListener('click', function() {
            searchEmployees(adminSearchInput.value);
        });
    }

    // Search on Enter key
    if (adminSearchInput) {
        adminSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchEmployees(this.value);
            }
        });
    }
}
