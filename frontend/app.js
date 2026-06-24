async function checkScholarship() {
  const btn = document.querySelector('.action-btn');
  const resultContainer = document.getElementById("result");
  
  btn.classList.add('loading');
  resultContainer.classList.add('hidden');
  
  const payload = {
    category: document.getElementById("category").value,
    income: parseInt(document.getElementById("income").value),
    passed: document.getElementById("passed").value === "yes",
    attempts: parseInt(document.getElementById("attempts").value)
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/check-scholarship", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    // Simulate slight network delay for dramatic AI effect
    setTimeout(() => {
      renderResult(data);
      btn.classList.remove('loading');
    }, 600);

  } catch (error) {
    btn.classList.remove('loading');
    resultContainer.classList.remove('hidden');
    resultContainer.innerHTML = `
      <div class="result-header">
        <span class="error-icon">⚠️</span> Backend Offline
      </div>
      <p class="explanation">Make sure uvicorn is running on port 8000.</p>
    `;
  }
}

function renderResult(data) {
  const resultContainer = document.getElementById("result");
  resultContainer.classList.remove('hidden');
  
  let html = '';
  
  if (data.eligible && data.scholarships.length > 0) {
    html += `
      <div class="result-header">
        <span class="success-icon">✅</span> AI Verification Complete
      </div>
      <div class="explanation">
        ${data.explanation}
      </div>
      <div class="scholarship-grid">
    `;
    
    data.scholarships.forEach(s => {
      html += `
        <div class="scholarship-card">
          <span class="scholarship-name">${s.name}</span>
          <a href="${s.portal}" target="_blank" class="apply-link">Apply Now ↗</a>
        </div>
      `;
    });
    
    html += `</div>`;
  } else {
    html += `
      <div class="result-header">
        <span class="error-icon">❌</span> Not Eligible
      </div>
      <div class="explanation">
        ${data.explanation}
      </div>
    `;
  }
  
  resultContainer.innerHTML = html;
}
