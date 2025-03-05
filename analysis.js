// Data structure to store client inputs
let clientData = {
  client1: {
    personal: { name: "", dob: "", retirementAge: "" },
    incomeSources: { employment: "", socialSecurity: "", other: "" },
    capital: [{ balance: "", contribution: "", employerMatch: "", ror: "" }]
  },
  client2: {
    personal: { name: "", dob: "", retirementAge: "" },
    incomeSources: { employment: "", socialSecurity: "", other: "" },
    capital: [{ balance: "", contribution: "", employerMatch: "", ror: "" }]
  },
  isMarried: false,
  incomeNeeds: { monthly: "" },
  assumptions: { mortalityAge: "", inflation: "", rorRetirement: "" }
};

let accountCount = { c1: 1, c2: 1 }; // Track number of accounts per client

// DOM elements
const analysisList = document.getElementById('analysis-list');
const recalculateBtn = document.getElementById('recalculate-btn');
const exportGraphBtn = document.getElementById('export-graph-btn');
const chartCanvas = document.getElementById('analysis-chart');
let chartInstance = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateGraph(); // Initial graph render with placeholder data
});

// Handle analysis selection (placeholder for future expansion)
analysisList.addEventListener('click', (e) => {
  e.preventDefault();
  const target = e.target;
  if (target.tagName === 'A') {
    analysisList.querySelectorAll('a').forEach(a => a.classList.remove('active'));
    target.classList.add('active');
    // Future: Switch inputs based on analysis
    updateGraph();
  }
});

// Toggle Client 2 inputs based on marital status
document.getElementById('is-married').addEventListener('change', (e) => {
  clientData.isMarried = e.target.checked;
  document.getElementById('client2-section').style.display = e.target.checked ? 'block' : 'none';
  document.getElementById('client2-income-section').style.display = e.target.checked ? 'block' : 'none';
  document.getElementById('c2-accounts').style.display = e.target.checked ? 'block' : 'none';
  updateGraph();
});

// Add account functionality
document.querySelectorAll('.add-account-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const client = e.target.getAttribute('data-client');
    const container = document.getElementById(`${client}-accounts`);
    const count = accountCount[client]++;
    const newAccount = document.createElement('div');
    newAccount.classList.add('account');
    newAccount.innerHTML = `
      <label>Balance ($): <input type="number" id="${client}-account-${count}-balance" min="0" step="1000" placeholder="0"></label>
      <label>Contribution ($/yr): <input type="number" id="${client}-account-${count}-contribution" min="0" step="1000" placeholder="0"></label>
      <label>Employer Match (%): <input type="number" id="${client}-account-${count}-employer-match" min="0" max="100" step="0.1" placeholder="0"></label>
      <label>ROR (%): <input type="number" id="${client}-account-${count}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
    `;
    container.insertBefore(newAccount, btn);
    clientData[client === 'c1' ? 'client1' : 'client2'].capital.push({ balance: "", contribution: "", employerMatch: "", ror: "" });
    newAccount.querySelectorAll('input').forEach(input => input.addEventListener('input', updateClientData));
    updateGraph();
  });
});

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
    else if (input.id.startsWith('c1-account-')) {
      const [_, __, index, field] = input.id.split('-');
      clientData.client1.capital[parseInt(index)][field] = value;
    }
  } else if (input.id.startsWith('c2-')) {
    if (input.id === 'c2-name') clientData.client2.personal.name = value;
    else if (input.id === 'c2-dob') clientData.client2.personal.dob = value;
    else if (input.id === 'c2-retirement-age') clientData.client2.personal.retirementAge = value;
    else if (input.id === 'c2-employment') clientData.client2.incomeSources.employment = value;
    else if (input.id === 'c2-social-security') clientData.client2.incomeSources.socialSecurity = value;
    else if (input.id === 'c2-other-income') clientData.client2.incomeSources.other = value;
    else if (input.id.startsWith('c2-account-')) {
      const [_, __, index, field] = input.id.split('-');
      clientData.client2.capital[parseInt(index)][field] = value;
    }
  } else if (input.id === 'monthly-income') {
    clientData.incomeNeeds.monthly = value;
  } else if (input.id === 'mortality-age') {
    clientData.assumptions.mortalityAge = value;
  } else if (input.id === 'inflation') {
    clientData.assumptions.inflation = value;
  } else if (input.id === 'ror-retirement') {
    clientData.assumptions.rorRetirement = value;
  }

  updateGraph();
}

// Add input listeners to initial fields
document.querySelectorAll('#client-input-form input').forEach(input => {
  input.addEventListener('input', updateClientData);
});

// Update graph
function updateGraph() {
  const ctx = chartCanvas.getContext('2d');
  if (chartInstance) chartInstance.destroy();

  const yearsToRetirement = clientData.client1.personal.retirementAge - getAge(clientData.client1.personal.dob) || 30;
  const yearsInRetirement = clientData.assumptions.mortalityAge - clientData.client1.personal.retirementAge || 25;
  const inflation = clientData.assumptions.inflation / 100 || 0.02;
  const rorRetirement = clientData.assumptions.rorRetirement / 100 || 0.04;

  let totalBalance = 0;
  const data = [];
  const labels = [];
  let year = new Date().getFullYear();

  // Aggregate all accounts for Client 1 and Client 2
  [clientData.client1, clientData.client2].forEach((client, idx) => {
    if (idx === 1 && !clientData.isMarried) return;
    client.capital.forEach(account => {
      const balance = parseFloat(account.balance) || 0;
      const contribution = parseFloat(account.contribution) || 0;
      const employerMatch = (parseFloat(account.employerMatch) / 100) * contribution || 0;
      const ror = parseFloat(account.ror) / 100 || 0.06;

      let tempBalance = balance;
      for (let i = 0; i < yearsToRetirement; i++) {
        tempBalance = tempBalance * (1 + ror) + contribution + employerMatch;
        if (idx === 0) {
          data[i] = (data[i] || 0) + tempBalance;
          labels[i] = year + i;
        } else {
          data[i] += tempBalance;
        }
      }
      totalBalance += tempBalance;
    });
  });

  // Retirement phase
  const monthlyNeed = (parseFloat(clientData.incomeNeeds.monthly) || 5000) * 12;
  for (let i = 0; i < yearsInRetirement; i++) {
    totalBalance = totalBalance * (1 + rorRetirement) - monthlyNeed * Math.pow(1 + inflation, i);
    if (totalBalance < 0) totalBalance = 0;
    data.push(totalBalance);
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

// Calculate age from DOB
function getAge(dob) {
  if (!dob) return 0;
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}

// Recalculate and export
recalculateBtn.addEventListener('click', updateGraph);
exportGraphBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = chartCanvas.toDataURL('image/png');
  link.download = 'retirement-accumulation-graph.png';
  link.click();
});
