// Data
const formAccessData = {
    "Registration Form": 50,
    "Feedback Form": 30,
    "Survey Form": 40,
};

const loginLogs = [
    { user: "Lucy", time: "2024-12-06 10:00", status: "Success" },
    { user: "Lebron", time: "2024-12-06 11:00", status: "Failed" },
];

// Show Section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Load Dashboard Stats
function loadDashboardStats() {
    document.getElementById('total-users').innerText = "100";
    document.getElementById('active-forms').innerText = "5";
}

// Load Login Logs
function loadLoginLogs() {
    const tableBody = document.getElementById('login-logs');
    tableBody.innerHTML = loginLogs.map(
        log => `
            <tr>
                <td>${log.user}</td>
                <td>${log.time}</td>
                <td>${log.status}</td>
            </tr>
        `
    ).join('');
}

// Load Forms List
function loadFormsList() {
    const forms = [
        { name: "Registration Form", status: "Active" },
        { name: "Feedback Form", status: "Inactive" },
    ];

    const tableBody = document.getElementById('forms-list');
    tableBody.innerHTML = forms.map(
        form => `
            <tr>
                <td>${form.name}</td>
                <td>${form.status}</td>
                <td>
                    <button onclick="toggleFormStatus('${form.name}')">
                        ${form.status === "Active" ? "Disable" : "Enable"}
                    </button>
                </td>
            </tr>
        `
    ).join('');
}

// Toggle Form Status
function toggleFormStatus(formName) {
    alert(`Toggled status for form: ${formName}`);
}

// Initialize Charts
function initializeCharts() {
    const formAccessChartCtx = document.getElementById('form-access-chart').getContext('2d');
    new Chart(formAccessChartCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(formAccessData),
            datasets: [{
                label: 'Form Access Count',
                data: Object.values(formAccessData),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }],
        },
    });

    const loginStatusChartCtx = document.getElementById('login-status-chart').getContext('2d');
    const statusCounts = loginLogs.reduce((counts, log) => {
        counts[log.status] = (counts[log.status] || 0) + 1;
        return counts;
    }, {});
    new Chart(loginStatusChartCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(statusCounts),
            datasets: [{
                label: 'Login Status',
                data: Object.values(statusCounts),
                backgroundColor: ['#4CAF50', '#FF5722'],
            }],
        },
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadDashboardStats();
    loadLoginLogs();
    loadFormsList();
    initializeCharts();
});
