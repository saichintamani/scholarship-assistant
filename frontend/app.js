let attempts = 0;
let isSignUpMode = false;
const API_BASE = 'http://127.0.0.1:8000';

// --- AUTHENTICATION & DASHBOARD ---
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

    // Load Saved Apps
    const appRes = await fetch(`${API_BASE}/applications?token=${token}`);
    if (appRes.ok) {
        const apps = await appRes.json();
        const listDiv = document.getElementById('saved-list');
        if (apps.length === 0) {
            listDiv.innerHTML = "<p style='color: var(--text-muted); font-size: 0.9rem;'>No saved applications yet.</p>";
        } else {
            listDiv.innerHTML = apps.map(app => `
                <div class="list-item">
                    <strong>${app.scholarship_name}</strong>
                    <span class="badge badge-success">${app.status}</span>
                </div>
            `).join('');
        }
    }

    // Load Alerts (Autonomous Matches)
    const alertRes = await fetch(`${API_BASE}/alerts?token=${token}`);
    if (alertRes.ok) {
        const alerts = await alertRes.json();
        const alertsDiv = document.getElementById('alerts-list');
        if (alerts.length === 0) {
            alertsDiv.innerHTML = "No new scholarship matches found yet.";
        } else {
            alertsDiv.innerHTML = alerts.map(a => `
                <div style="padding: 8px 0; border-bottom: 1px solid var(--border);">
                    <span style="color: var(--primary);">•</span> ${a.message}
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

// --- OCR DOCUMENT VERIFICATION ---
async function verifyDocument() {
    const token = localStorage.getItem('samvaad_token');
    const fileInput = document.getElementById('document-upload');
    const statusDiv = document.getElementById('ocr-status');

    if (!fileInput.files[0]) {
        statusDiv.innerHTML = "<span style='color: var(--error);'>Please select an image first.</span>";
        return;
    }

    statusDiv.innerHTML = "Processing image with AI Vision...";

    const reader = new FileReader();
    reader.onload = async function(e) {
        const base64Image = e.target.result.split(',')[1];
        
        try {
            const res = await fetch(API_BASE + '/verify-document', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, image_base64: base64Image })
            });
            const data = await res.json();
            
            if(data.verified) {
                statusDiv.innerHTML = `<span style='color: var(--success);'>${data.message}</span>`;
                document.getElementById('verified-badge').style.display = 'inline-block';
                document.getElementById('income').value = data.message.match(/\d+/)[0]; // auto-fill income
            } else {
                statusDiv.innerHTML = `<span style='color: var(--error);'>${data.message}</span>`;
            }
        } catch (err) {
            statusDiv.innerHTML = "<span style='color: var(--error);'>Server connection error.</span>";
        }
    };
    reader.readAsDataURL(fileInput.files[0]);
}

// --- RAG CHATBOT ---
function toggleChat() {
    const chat = document.getElementById('chatbot');
    const btn = document.getElementById('chat-toggle');
    if (chat.style.display === 'flex') {
        chat.style.display = 'none';
        btn.style.display = 'block';
    } else {
        chat.style.display = 'flex';
        btn.style.display = 'none';
    }
}

async function sendChat() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;

    const messagesDiv = document.getElementById('chat-messages');
    messagesDiv.innerHTML += `<div class="msg user">${msg}</div>`;
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    messagesDiv.innerHTML += `<div class="msg bot" id="typing">Thinking...</div>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    try {
        const res = await fetch(API_BASE + '/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg })
        });
        const data = await res.json();
        
        document.getElementById('typing').remove();
        messagesDiv.innerHTML += `<div class="msg bot">${data.response}</div>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } catch (e) {
        document.getElementById('typing').innerText = "Connection failed.";
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

    // Background Auth Profile update (for alerts)
    const token = localStorage.getItem('samvaad_token');
    if(token) {
        fetch(API_BASE + '/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, category, income: parseInt(income) })
        });
    }

    const payload = { category, income: parseInt(income), passed, attempts, language };
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
