// Sample data structure for client inputs
let clientData = {
  client1: {
    personal: { name: "", dob: "", retirementAge: "" },
    incomeNeeds: { monthly: "" },
    incomeSources: { employment: "", socialSecurity: "", other: "" },
    capital: [{ balance: "", contribution: "", employerMatch: "", ror: "" }]
  },
  client2: {
    personal: { name: "", dob: "", retirementAge: "" },
    incomeSources: { employment: "", socialSecurity: "", other: "" },
    capital: [{ balance: "", contribution: "", employerMatch: "", ror: "" }]
  },
  isMarried: false,
  assumptions: { mortalityAge: "", inflation: "", rorRetirement: "" }
};

// DOM elements
const analysisList = document.getElementById('analysis-list');
const inputFields = document.getElementById('input-fields');
const recalculateBtn = document.getElementById('recalculate-btn');
const exportGraphBtn = document.getElementById('export-graph-btn');
const chartCanvas = document.getElementById('analysis-chart');
let chartInstance = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Default to Retirement Accumulation
  renderInputs('retirement-accumulation');
  updateGraph();
});

// Handle analysis selection
analysisList.addEventListener('click', (e) => {
  e.preventDefault();
  const target = e.target;
  if (target.tagName === 'A') {
    analysisList.querySelectorAll('a').forEach(a => a.classList.remove('active'));
    target.classList.add('active');
    const analysis = target.getAttribute('data-analysis');
    renderInputs(analysis);
    updateGraph();
  }
});

// Render inputs for Retirement Accumulation
function renderInputs(analysis) {
  if (analysis !== 'retirement-accumulation') return; // Placeholder for other analyses

  inputFields.innerHTML = `
    <div class="input-section">
      <h4>Personal</h4>
      <label>Marital Status: <input type="checkbox" id="is-married" ${clientData.isMarried ? 'checked' : ''}></label>
      <div class="client-inputs">
        <div class="client">
          <h5>Client 1</h5>
          <label>Name: <input type="text" id="c1-name" value="${clientData.client1.personal.name}"></label>
          <label>Date of Birth: <input type="date" id="c1-dob" value="${clientData.client1.personal.dob}"></label>
          <label>Retirement Age: <input type="number" id="c1-retirement-age" value="${clientData.client1.personal.retirementAge}" min="1" max="120"></label>
        </div>
        <div class="client" id="client2-section" style="display: ${clientData.isMarried ? 'block' : 'none'};">
          <h5>Client 2</h5>
          <label>Name: <input type="text" id="c2-name" value="${clientData.client2.personal.name}"></label>
          <label>Date of Birth: <input type="date" id="c2-dob" value="${clientData.client2.personal.dob}"></label>
          <label>Retirement Age: <input type="number" id="c2-retirement-age" value="${clientData.client2.personal.retirementAge}" min="1" max="120"></label>
        </div>
      </div>
    </div>
    <div class="input-section">
      <h4>Income Needs</h4>
      <label>Monthly Income Needs ($): <input type="number" id="monthly-income" value="${clientData.incomeNeeds.monthly}" min="0" step="100"></label>
    </div>
    <div class="input-section">
      <h4>Income Sources</h4>
      <div class="client">
        <h5>Client 1</h5>
        <label>Employment Income ($/yr): <input type="number" id="c1-employment" value="${clientData.client1.incomeSources.employment}" min="0" step="1000"></label>
        <label>Social Security ($/yr): <input type="number" id="c1-social-security" value="${clientData.client1.incomeSources.socialSecurity}" min="0" step="1000"></label>
        <label>Other Income ($/yr): <input type="number" id="c1-other-income" value="${clientData.client1.incomeSources.other}" min="0" step="1000"></label>
      </div>
      <div class="client" id="client2-income-section" style="display: ${clientData.isMarried ? 'block' : 'none'};">
        <h5>Client 2</h5>
        <label>Employment Income ($/yr): <input type="number" id="c2-employment" value="${clientData.client2.incomeSources.employment}" min="0" step="1000"></label>
        <label>Social Security ($/yr): <input type="number" id="c2-social-security" value="${clientData.client2.incomeSources.socialSecurity}" min="0" step="1000"></label>
        <label>Other Income ($/yr): <input type="number" id="c2-other-income" value="${clientData.client2.incomeSources.other}" min="0" step="1000"></label>
      </div>
    </div>
    <div class="input-section">
      <h4>Capital</h4>
      <div id="c1-accounts">
        <h5>Client 1 Accounts</h5>
        ${renderAccounts('c1', clientData.client1.capital)}
        <button type="button" class="add-account-btn" data-client="c1">Add Account</button>
      </div>
      <div id="c2-accounts" style="display: ${clientData.isMarried ? 'block' : 'none'};">
        <h5>Client 2 Accounts</h5>
        ${renderAccounts('c2', clientData.client2.capital)}
        <button type="button" class="add-account-btn" data-client="c2">Add Account</button>
      </div>
    </div>
    <div class="input-section">
      <h4>Assumptions</h4>
      <label>Mortality Age: <input type="number" id="mortality-age" value="${clientData.assumptions.mortalityAge}" min="1" max="120"></label>
      <label>Inflation (%): <input type="number" id="inflation" value="${clientData.assumptions.inflation}" min="0" max="100" step="0.1"></label>
      <label>ROR During Retirement (%): <input type="number" id="ror-retirement" value="${clientData.assumptions.rorRetirement}" min="0" max="100" step="0.1"></label>
    </div>
  `;

  // Event listeners for dynamic updates
  document.getElementById('is-married').addEventListener('change', (e) => {
    clientData.isMarried = e.target.checked;
    document.getElementById('client2-section').style.display = e.target.checked ? 'block' : 'none';
    document.getElementById('client2-income-section').style.display = e.target.checked ? 'block' : 'none';
    document.getElementById('c2-accounts').style.display = e.target.checked ? 'block' : 'none';
    updateGraph();
  });

  document.querySelectorAll('.add-account-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const client = e.target.getAttribute('data-client');
      const newAccount = { balance: "", contribution: "", employerMatch: "", ror: "" };
      clientData[client === 'c1' ? 'client1' : 'client2'].capital.push(newAccount);
      renderInputs(analysis);
      updateGraph();
    });
  });

  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', updateClientData);
  });
}

// Render capital accounts dynamically
function renderAccounts(clientPrefix, accounts) {
  return accounts.map((account, index) => `
    <div class="account">
      <label>Balance ($): <input type="number" data-client="${clientPrefix}" data-index="${index}" data-field="balance" value="${account.balance}" min="0" step="1000"></label>
      <label>Contribution ($/yr): <input type="number" data-client="${clientPrefix}" data-index="${index}" data-field="contribution" value="${account.contribution}" min="0" step="1000"></label>
      <label>Employer Match (%): <input type="number" data-client="${clientPrefix}" data-index="${index}" data-field="employerMatch" value="${account.employerMatch}" min="0" max="100" step="0.1"></label>
      <label>ROR (%): <input type="number" data-client="${clientPrefix}" data-index="${index}" data-field="ror" value="${account.ror}" min="0" max="100" step="0.1"></label>
    </div>
  `).join('');
}

// Update client data from inputs
function updateClientData(e) {
  const input = e.target;
  const value = input.type === 'number' ? (input.value === '' ? '' : parseFloat(input.value)) : input.value;

  if (input.id === 'is-married') return; // Handled separately

  if (input.id.startsWith('c1-')) {
    if (input.id === 'c1-name') clientData.client1.personal.name = value;
    else if (input.id === 'c1-dob') clientData.client1.personal.dob = value;
    else if (input.id === 'c1-retirement-age') clientData.client1.personal.retirementAge = value;
    else if (input.id === 'c1-employment') clientData.client1.incomeSources.employment = value;
    else if (input.id === 'c1-social-security') clientData.client1.incomeSources.socialSecurity = value;
    else if (input.id === 'c1-other-income') clientData.client1.incomeSources.other = value;
  } else if (input.id.startsWith('c2-')) {
    if (input.id === 'c2-name') clientData.client2.personal.name = value;
    else if (input.id === 'c2-dob') clientData.client2.personal.dob = value;
    else if (input.id === 'c2-retirement-age') clientData.client2.personal.retirementAge = value;
    else if (input.id === 'c2-employment') clientData.client2.incomeSources.employment = value;
    else if (input.id === 'c2-social-security') clientData.client2.incomeSources.socialSecurity = value;
    else if (input.id === 'c2-other-income') clientData.client2.incomeSources.other = value;
  } else if (input.id === 'monthly-income') {
    clientData.incomeNeeds.monthly = value;
  } else if (input.id === 'mortality-age') {
    clientData.assumptions.mortalityAge = value;
  } else if (input.id === 'inflation') {
    clientData.assumptions.inflation = value;
  } else if (input.id === 'ror-retirement') {
    clientData.assumptions.rorRetirement = value;
  } else if (input.dataset.field) {
    const client = input.dataset.client === 'c1' ? 'client1' : 'client2';
    const index = parseInt(input.dataset.index);
    const field = input.dataset.field;
    clientData[client].capital[index][field] = value;
  }

  updateGraph();
}

// Update the graph based on inputs
function updateGraph() {
  const ctx = chartCanvas.getContext('2d');
  if (chartInstance) chartInstance.destroy();

  // Simplified calculation for demo (Retirement Accumulation)
  const yearsToRetirement = clientData.client1.personal.retirementAge - getAge(clientData.client1.personal.dob) || 30;
  const yearsInRetirement = clientData.assumptions.mortalityAge - clientData.client1.personal.retirementAge || 25;
  const inflation = clientData.assumptions.inflation / 100 || 0.02;
  const ror = clientData.client1.capital[0]?.ror / 100 || 0.06;
  const rorRetirement = clientData.assumptions.rorRetirement / 100 || 0.04;

  let balance = parseFloat(clientData.client1.capital[0]?.balance) || 0;
  const contribution = parseFloat(clientData.client1.capital[0]?.contribution) || 0;
  const employerMatch = (parseFloat(clientData.client1.capital[0]?.employerMatch) / 100) * contribution || 0;

  const data = [];
  const labels = [];
  let year = new Date().getFullYear();

  // Accumulation phase
  for (let i = 0; i < yearsToRetirement; i++) {
    balance = balance * (1 + ror) + contribution + employerMatch;
    data.push(balance);
    labels.push(year + i);
  }

  // Retirement phase (simplified withdrawal)
  const monthlyNeed = (parseFloat(clientData.incomeNeeds.monthly) || 5000) * 12;
  for (let i = 0; i < yearsInRetirement; i++) {
    balance = balance * (1 + rorRetirement) - monthlyNeed * Math.pow(1 + inflation, i);
    if (balance < 0) balance = 0;
    data.push(balance);
    labels.push(year + yearsToRetirement + i);
  }

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Retirement Savings ($)',
        data: data,
        borderColor: '#3b82f6',
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Year' } },
        y: { title: { display: true, text: 'Savings ($)' } }
      }
    }
  });
}

// Helper to calculate age from DOB
function getAge(dob) {
  if (!dob) return 0;
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}

// Recalculate button
recalculateBtn.addEventListener('click', updateGraph);

// Export graph (simplified as image download)
exportGraphBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = chartCanvas.toDataURL('image/png');
  link.download = 'retirement-accumulation-graph.png';
  link.click();
});
