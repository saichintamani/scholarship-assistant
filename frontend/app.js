let attempts = 0;
let isSignUpMode = false;
const API_BASE = 'http://127.0.0.1:8000';

// --- AUTHENTICATION ---
function toggleAuthMode() {
    isSignUpMode = !isSignUpMode;
    document.getElementById('auth-title').innerText = isSignUpMode ? "Sign Up for SamvaadAI" : "Login to SamvaadAI";
    document.getElementById('auth-submit-btn').innerText = isSignUpMode ? "Register" : "Login";
}

async function submitAuth() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const endpoint = isSignUpMode ? '/register' : '/login';

    try {
        const res = await fetch(API_BASE + endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.ok) {
            if (isSignUpMode) {
                alert("Registration successful! Please login.");
                toggleAuthMode();
            } else {
                localStorage.setItem('samvaad_token', data.access_token);
                document.getElementById('auth-modal').style.display = 'none';
                checkAuthStatus();
            }
        } else {
            alert(data.detail || "Authentication failed");
        }
    } catch (e) {
        alert("Server error during authentication");
    }
}

function logout() {
    localStorage.removeItem('samvaad_token');
    checkAuthStatus();
}

async function loadDashboard() {
    const token = localStorage.getItem('samvaad_token');
    if (!token) return;

    const res = await fetch(`${API_BASE}/applications?token=${token}`);
    if (res.ok) {
        const apps = await res.json();
        const listDiv = document.getElementById('saved-list');
        if (apps.length === 0) {
            listDiv.innerHTML = "<p>No saved applications yet.</p>";
        } else {
            listDiv.innerHTML = apps.map(app => `
                <div class="list-item">
                    <strong>${app.scholarship_name}</strong>
                    <span class="badge badge-success">${app.status}</span>
                </div>
            `).join('');
        }
    }
}

function checkAuthStatus() {
    const token = localStorage.getItem('samvaad_token');
    if (token) {
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'inline-block';
        document.getElementById('dashboard').style.display = 'block';
        loadDashboard();
    } else {
        document.getElementById('login-btn').style.display = 'inline-block';
        document.getElementById('logout-btn').style.display = 'none';
        document.getElementById('dashboard').style.display = 'none';
    }
}

// --- ELIGIBILITY ENGINE ---
document.getElementById('eligibility-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    attempts++;

    const category = document.getElementById('category').value;
    const income = document.getElementById('income').value;
    const passed = document.getElementById('passed').checked;
    const language = document.getElementById('language').value;

    const payload = {
        category,
        income: parseInt(income),
        passed,
        attempts,
        language
    };

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>AI is analyzing your profile...</p>';
    resultsDiv.style.display = 'block';

    try {
        const res = await fetch(API_BASE + '/check-scholarship', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        let html = '';
        if (data.eligible) {
            html += `<h3 style="color: var(--success); margin-bottom: 8px;">Eligible! 🎉</h3>`;
        } else if (data.reason === 'Fraud detected') {
            html += `<h3 style="color: var(--error); margin-bottom: 8px;">Security Alert 🚨</h3>`;
        } else {
            html += `<h3 style="color: var(--error); margin-bottom: 8px;">Not Eligible</h3>`;
        }

        html += `<p style="margin-bottom: 16px;"><strong>AI Assessment:</strong> ${data.explanation}</p>`;

        if (data.scholarships.length > 0) {
            html += `<div style="display: flex; flex-direction: column; gap: 12px;">`;
            data.scholarships.forEach(s => {
                html += `
                    <div class="list-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>${s.name}</strong> <span class="badge badge-primary">${s.category}</span>
                            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Max Income: ₹${s.max_income} | <a href="${s.portal}" target="_blank" style="color: var(--primary);">Portal →</a></div>
                        </div>
                        <button onclick="saveApplication('${s.name}')" class="btn btn-outline" style="width: auto; font-size: 0.8rem; padding: 4px 12px;">Save</button>
                    </div>
                `;
            });
            html += `</div>`;
        }
        resultsDiv.innerHTML = html;
    } catch (err) {
        resultsDiv.innerHTML = '<p style="color: var(--error);">Error connecting to AI Engine.</p>';
    }
});

async function saveApplication(name) {
    const token = localStorage.getItem('samvaad_token');
    if (!token) {
        alert("You must be logged in to save applications!");
        document.getElementById('auth-modal').style.display = 'flex';
        return;
    }
    
    await fetch(API_BASE + '/applications/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scholarship_name: name, token })
    });
    alert("Application saved to dashboard!");
    loadDashboard();
}

// Initialize
checkAuthStatus();
