// ================================================
// Enterprise Dashboard - Main JavaScript
// Data Management & Utility Functions
// ================================================

// ===== Authentication =====
function checkAuth() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        window.location.href = 'index.html';
    }
}

function loadUserInfo() {
    const userName = localStorage.getItem('userName') || 'Admin User';
    const userRole = localStorage.getItem('userRole') || 'Administrator';
    
    const userNameElements = document.querySelectorAll('#userName');
    const userRoleElements = document.querySelectorAll('#userRole');
    const userAvatarElements = document.querySelectorAll('#userAvatar');
    
    userNameElements.forEach(el => el.textContent = userName);
    userRoleElements.forEach(el => el.textContent = userRole);
    userAvatarElements.forEach(el => el.textContent = userName.charAt(0).toUpperCase());
}

// ===== Local Storage Data Management =====

// Initialize sample data if not exists
function initializeSampleData() {
    if (!localStorage.getItem('clients')) {
        const sampleClients = [
            {
                id: 1,
                name: 'John Smith',
                email: 'john.smith@techcorp.com',
                phone: '+1 (555) 123-4567',
                company: 'TechCorp Solutions',
                address: '123 Tech Street, San Francisco, CA 94105',
                addedDate: '2024-01-15'
            },
            {
                id: 2,
                name: 'Sarah Johnson',
                email: 'sarah.j@innovate.com',
                phone: '+1 (555) 234-5678',
                company: 'Innovate Digital',
                address: '456 Innovation Ave, New York, NY 10001',
                addedDate: '2024-02-20'
            },
            {
                id: 3,
                name: 'Michael Chen',
                email: 'mchen@globaltech.com',
                phone: '+1 (555) 345-6789',
                company: 'Global Tech Industries',
                address: '789 Global Plaza, Austin, TX 78701',
                addedDate: '2024-03-10'
            },
            {
                id: 4,
                name: 'Emily Davis',
                email: 'emily.davis@startup.io',
                phone: '+1 (555) 456-7890',
                company: 'Startup Ventures',
                address: '321 Startup Lane, Seattle, WA 98101',
                addedDate: '2024-04-05'
            },
            {
                id: 5,
                name: 'David Wilson',
                email: 'dwilson@enterprise.com',
                phone: '+1 (555) 567-8901',
                company: 'Enterprise Systems',
                address: '654 Enterprise Blvd, Boston, MA 02101',
                addedDate: '2024-05-12'
            }
        ];
        localStorage.setItem('clients', JSON.stringify(sampleClients));
    }
    
    if (!localStorage.getItem('projects')) {
        const sampleProjects = [
            {
                id: 1,
                clientId: 1,
                title: 'E-commerce Platform Development',
                description: 'Build a modern e-commerce platform with payment integration',
                startDate: '2024-01-20',
                endDate: '2024-04-30',
                status: 'completed'
            },
            {
                id: 2,
                clientId: 1,
                title: 'Mobile App Development',
                description: 'iOS and Android mobile application',
                startDate: '2024-05-01',
                endDate: '2024-08-15',
                status: 'ongoing'
            },
            {
                id: 3,
                clientId: 2,
                title: 'Website Redesign',
                description: 'Complete website redesign with modern UI/UX',
                startDate: '2024-03-01',
                endDate: '2024-05-30',
                status: 'completed'
            },
            {
                id: 4,
                clientId: 2,
                title: 'SEO Optimization',
                description: 'Search engine optimization and content strategy',
                startDate: '2024-06-01',
                endDate: '2024-07-30',
                status: 'ongoing'
            },
            {
                id: 5,
                clientId: 3,
                title: 'Cloud Migration',
                description: 'Migrate infrastructure to AWS cloud',
                startDate: '2024-04-01',
                endDate: '2024-09-30',
                status: 'ongoing'
            },
            {
                id: 6,
                clientId: 3,
                title: 'API Development',
                description: 'RESTful API development for third-party integrations',
                startDate: '2024-02-15',
                endDate: '2024-04-15',
                status: 'completed'
            },
            {
                id: 7,
                clientId: 4,
                title: 'CRM System Implementation',
                description: 'Custom CRM system for sales team',
                startDate: '2024-05-15',
                endDate: '2024-11-30',
                status: 'pending'
            },
            {
                id: 8,
                clientId: 4,
                title: 'Data Analytics Dashboard',
                description: 'Business intelligence dashboard with real-time analytics',
                startDate: '2024-06-01',
                endDate: '2024-08-30',
                status: 'ongoing'
            },
            {
                id: 9,
                clientId: 5,
                title: 'Security Audit',
                description: 'Comprehensive security audit and penetration testing',
                startDate: '2024-03-01',
                endDate: '2024-03-31',
                status: 'completed'
            },
            {
                id: 10,
                clientId: 5,
                title: 'DevOps Pipeline Setup',
                description: 'CI/CD pipeline implementation with automated testing',
                startDate: '2024-07-01',
                endDate: '2024-12-31',
                status: 'hold'
            }
        ];
        localStorage.setItem('projects', JSON.stringify(sampleProjects));
    }
}

// Initialize data on page load
initializeSampleData();

// ===== Client Management Functions =====
function getClients() {
    const clients = localStorage.getItem('clients');
    return clients ? JSON.parse(clients) : [];
}

function addClient(clientData) {
    const clients = getClients();
    const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    const newClient = {
        id: newId,
        ...clientData,
        addedDate: new Date().toISOString().split('T')[0]
    };
    clients.push(newClient);
    localStorage.setItem('clients', JSON.stringify(clients));
    return newClient;
}

function updateClient(id, clientData) {
    const clients = getClients();
    const index = clients.findIndex(c => c.id === id);
    if (index !== -1) {
        clients[index] = { ...clients[index], ...clientData };
        localStorage.setItem('clients', JSON.stringify(clients));
        return clients[index];
    }
    return null;
}

function removeClient(id) {
    let clients = getClients();
    clients = clients.filter(c => c.id !== id);
    localStorage.setItem('clients', JSON.stringify(clients));
    
    // Also remove associated projects
    let projects = getProjects();
    projects = projects.filter(p => p.clientId !== id);
    localStorage.setItem('projects', JSON.stringify(projects));
}

// ===== Project Management Functions =====
function getProjects() {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : [];
}

function addProject(projectData) {
    const projects = getProjects();
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const newProject = {
        id: newId,
        ...projectData
    };
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    return newProject;
}

function updateProject(id, projectData) {
    const projects = getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
        projects[index] = { ...projects[index], ...projectData };
        localStorage.setItem('projects', JSON.stringify(projects));
        return projects[index];
    }
    return null;
}

function removeProject(id) {
    let projects = getProjects();
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem('projects', JSON.stringify(projects));
}

// ===== Utility Functions =====
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function calculateDaysDifference(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function getStatusColor(status) {
    const colors = {
        pending: '#FBBC05',
        ongoing: '#1A73E8',
        completed: '#34A853',
        hold: '#EA4335'
    };
    return colors[status] || '#5F6368';
}

// ===== Export Functions =====
function exportToCSV(data, filename) {
    if (data.length === 0) {
        alert('No data to export');
        return;
    }
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => {
            const value = row[header];
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ===== Notification System =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.style.animation = 'slideIn 0.3s ease-out';
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 'info-circle';
    
    notification.innerHTML = `
        <i class="bi bi-${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== Search and Filter Utilities =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== Validation Functions =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone);
}

// ===== Console Welcome Message =====
console.log('%c Enterprise Dashboard ', 'background: #1A73E8; color: white; font-size: 20px; padding: 10px;');
console.log('%c Powered by MGX Platform ', 'background: #34A853; color: white; font-size: 14px; padding: 5px;');
console.log('Version 1.0.0');