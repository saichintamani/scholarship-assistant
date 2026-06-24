async function checkEligibility() {
  const btn = document.getElementById('submit-btn');
  const resultDiv = document.getElementById('result');
  
  // Visual Loading State
  btn.innerHTML = 'Analyzing...';
  btn.disabled = true;
  btn.style.opacity = '0.7';
  resultDiv.style.display = 'none';

  const payload = {
    category: document.getElementById('category').value,
    income: parseInt(document.getElementById('income').value) || 0,
    passed: document.getElementById('passed').value === 'true',
    attempts: parseInt(document.getElementById('attempts').value) || 1
  };

  try {
    const response = await fetch('http://127.0.0.1:8000/check-eligibility', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    // Reset Button
    btn.innerHTML = 'Check My Eligibility';
    btn.disabled = false;
    btn.style.opacity = '1';

    // Render Result
    resultDiv.style.display = 'block';
    
    if (data.fraud_alert) {
      resultDiv.style.borderLeftColor = 'var(--error)';
      resultDiv.style.backgroundColor = 'var(--error-bg)';
      resultDiv.innerHTML = `
        <h4 style="color: var(--error-text); margin-bottom: 8px;">Security Alert</h4>
        <p style="color: var(--error-text); font-weight: 500;">Your application has been flagged for manual review due to suspicious activity.</p>
      `;
      return;
    }

    if (data.eligible) {
      resultDiv.style.borderLeftColor = 'var(--success)';
      resultDiv.style.backgroundColor = 'var(--success-bg)';
      resultDiv.innerHTML = `
        <h4 style="color: var(--success-text); margin-bottom: 8px;">Congratulations! You are Eligible.</h4>
        <p style="color: var(--success-text);">${data.explanation}</p>
        <div style="margin-top: 16px;">
          ${data.scholarships.map(s => `
            <a href="${s.portal}" target="_blank" class="btn btn-accent" style="margin-bottom: 8px;">Apply for ${s.name} →</a>
          `).join('')}
        </div>
      `;
    } else {
      resultDiv.style.borderLeftColor = 'var(--error)';
      resultDiv.style.backgroundColor = 'var(--bg-main)';
      resultDiv.innerHTML = `
        <h4 style="color: var(--error); margin-bottom: 8px;">Not Eligible</h4>
        <p style="color: var(--text-main);">${data.explanation}</p>
      `;
    }

  } catch (error) {
    btn.innerHTML = 'Check My Eligibility';
    btn.disabled = false;
    btn.style.opacity = '1';
    
    resultDiv.style.display = 'block';
    resultDiv.style.borderLeftColor = 'var(--error)';
    resultDiv.innerHTML = `<h4 style="color: var(--error);">Error: Cannot reach the server. Make sure the backend is running.</h4>`;
  }
}
