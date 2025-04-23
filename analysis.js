let clientData = {
  client1: {
    personal: { name: "", dob: "", retirementAge: "" },
    incomeSources: { employment: "", socialSecurity: "", other: "", interestDividends: "" },
    accounts: [{ name: "", balance: "", contribution: "", employerMatch: "", ror: "" }], // Shared for both analyses
  },
  client2: {
    personal: { name: "", dob: "", retirementAge: "" },
    incomeSources: { employment: "", socialSecurity: "", other: "", interestDividends: "" },
    accounts: [{ name: "", balance: "", contribution: "", employerMatch: "", ror: "" }],
  },
  isMarried: false,
  incomeNeeds: { monthly: "" },
  assumptions: { mortalityAge: "", inflation: "", rorRetirement: "", analysisDate: "" },
  savingsExpenses: {
    householdExpenses: "",
    taxes: "",
    otherExpenses: "",
    monthlySavings: ""
  },
  other: {
    assets: [{ name: "", balance: "", ror: "", debt: "" }],
    cash: "",
    residenceMortgage: "",
    otherDebt: ""
  }
};

let accountCount = { c1: 1, c2: 1 };
let assetCount = { c1: 0, c2: 0 };
let currentAnalysis = 'retirement-accumulation';

// DOM elements
const analysisList = document.getElementById('analysis-list');
const analysisTopics = document.querySelector('.analysis-topics');
const inputTabs = document.querySelector('.input-tabs');
const inputContent = document.querySelector('.input-content');
const recalculateBtn = document.getElementById('recalculate-btn');
const exportGraphBtn = document.getElementById('export-graph-btn');
const chartCanvas = document.getElementById('analysis-chart');
const clientFileName = document.getElementById('client-file-name');
const presentationCount = document.getElementById('presentation-count');
let chartInstance = null;
let reportCount = 0;

// Tab configurations
const tabConfigs = {
  'retirement-accumulation': [
    { id: 'personal', label: 'Personal', content: `
      <label>Marital Status: <input type="checkbox" id="is-married"></label>
      <div class="client">
        <h5>Client 1</h5>
        <label>Name: <input type="text" id="c1-name" placeholder="John Doe"></label>
        <label>Date of Birth: <input type="date" id="c1-dob"></label>
        <label>Retirement Age: <input type="number" id="c1-retirement-age" min="1" max="120" placeholder="65"></label>
      </div>
      <div class="client" id="client2-section" style="display: none;">
        <h5>Client 2</h5>
        <label>Name: <input type="text" id="c2-name" placeholder="Jane Doe"></label>
        <label>Date of Birth: <input type="date" id="c2-dob"></label>
        <label>Retirement Age: <input type="number" id="c2-retirement-age" min="1" max="120" placeholder="65"></label>
      </div>
    `},
    { id: 'income-needs', label: 'Income Needs', content: `
      <label>Monthly Income Needs ($): <input type="number" id="monthly-income" min="0" step="100" placeholder="5000"></label>
    `},
    { id: 'income-sources', label: 'Income Sources', content: `
      <div class="client">
        <h5>Client 1</h5>
        <label>Employment Income ($/yr): <input type="number" id="c1-employment" min="0" step="1000" placeholder="50000"></label>
        <label>Social Security ($/yr): <input type="number" id="c1-social-security" min="0" step="1000" placeholder="20000"></label>
        <label>Other Income ($/yr): <input type="number" id="c1-other-income" min="0" step="1000" placeholder="10000"></label>
      </div>
      <div class="client" id="client2-income-section" style="display: none;">
        <h5>Client 2</h5>
        <label>Employment Income ($/yr): <input type="number" id="c2-employment" min="0" step="1000" placeholder="40000"></label>
        <label>Social Security ($/yr): <input type="number" id="c2-social-security" min="0" step="1000" placeholder="18000"></label>
        <label>Other Income ($/yr): <input type="number" id="c2-other-income" min="0" step="1000" placeholder="8000"></label>
      </div>
    `},
    { id: 'capital', label: 'Capital', content: `
      <div id="c1-accounts">
        <h5>Client 1 Accounts</h5>
        <div class="account">
          <label>Account Name: <input type="text" id="c1-account-0-name" placeholder="401(k)"></label>
          <label>Balance ($): <input type="number" id="c1-account-0-balance" min="0" step="1000" placeholder="100000"></label>
          <label>Contribution ($/yr): <input type="number" id="c1-account-0-contribution" min="0" step="1000" placeholder="10000"></label>
          <label>Employer Match (%): <input type="number" id="c1-account-0-employer-match" min="0" max="100" step="0.1" placeholder="3"></label>
          <label>ROR (%): <input type="number" id="c1-account-0-ror" min="0" max="100" step="0.1" placeholder="6"></label>
        </div>
        <button type="button" class="add-account-btn" data-client="c1">Add Account</button>
      </div>
      <div id="c2-accounts" style="display: none;">
        <h5>Client 2 Accounts</h5>
        <div class="account">
          <label>Account Name: <input type="text" id="c2-account-0-name" placeholder="IRA"></label>
          <label>Balance ($): <input type="number" id="c2-account-0-balance" min="0" step="1000" placeholder="80000"></label>
          <label>Contribution ($/yr): <input type="number" id="c2-account-0-contribution" min="0" step="1000" placeholder="8000"></label>
          <label>Employer Match (%): <input type="number" id="c2-account-0-employer-match" min="0" max="100" step="0.1" placeholder="2"></label>
          <label>ROR (%): <input type="number" id="c2-account-0-ror" min="0" max="100" step="0.1" placeholder="5"></label>
        </div>
        <button type="button" class="add-account-btn" data-client="c2">Add Account</button>
      </div>
    `},
    { id: 'assumptions', label: 'Assumptions', content: `
      <label>Mortality Age: <input type="number" id="mortality-age" min="1" max="120" placeholder="90"></label>
      <label>Inflation (%): <input type="number" id="inflation" min="0" max="100" step="0.1" placeholder="2"></label>
      <label>ROR During Retirement (%): <input type="number" id="ror-retirement" min="0" max="100" step="0.1" placeholder="4"></label>
    `},
    { id: 'reports', label: 'Reports', content: `
      <div class="report-list">
        <label><input type="checkbox" class="report-checkbox" data-report="retirement-analysis"> Retirement Analysis</label>
        <label><input type="checkbox" class="report-checkbox" data-report="social-security-optimizer"> Social Security Optimizer</label>
        <label><input type="checkbox" class="report-checkbox" data-report="capital-available"> Capital Available for Retirement</label>
        <label><input type="checkbox" class="report-checkbox" data-report="alternatives-retirement"> Alternatives to Achieving Retirement Goals</label>
        <label><input type="checkbox" class="report-checkbox" data-report="retirement-timeline"> Retirement Timeline</label>
        <label><input type="checkbox" class="report-checkbox" data-report="retirement-fact-finder"> Retirement Analysis Fact Finder</label>
      </div>
    `}
  ],
  'personal-finance': [
    { id: 'personal', label: 'Personal', content: `
      <label>Marital Status: <input type="checkbox" id="is-married"></label>
      <div class="client">
        <h5>Client 1</h5>
        <label>Name: <input type="text" id="c1-name" placeholder="John Doe"></label>
      </div>
      <div class="client" id="client2-section" style="display: none;">
        <h5>Client 2</h5>
        <label>Name: <input type="text" id="c2-name" placeholder="Jane Doe"></label>
      </div>
    `},
    { id: 'income', label: 'Income', content: `
      <div class="client">
        <h5>Client 1</h5>
        <label>Employment Income ($/yr): <input type="number" id="c1-employment" min="0" step="1000" placeholder="50000"></label>
      </div>
      <div class="client" id="client2-income-section" style="display: none;">
        <h5>Client 2</h5>
        <label>Employment Income ($/yr): <input type="number" id="c2-employment" min="0" step="1000" placeholder="40000"></label>
      </div>
      <label>Interest and Dividends ($/yr): <input type="number" id="interest-dividends" min="0" step="1000" placeholder="5000"></label>
      <label>Other Income ($/yr): <input type="number" id="other-income" min="0" step="1000" placeholder="10000"></label>
    `},
    { id: 'savings-expenses', label: 'Savings & Expenses', content: `
      <label>Household Expenses ($/yr): <input type="number" id="household-expenses" min="0" step="1000" placeholder="30000"></label>
      <label>Taxes ($/yr): <input type="number" id="taxes" min="0" step="1000" placeholder="15000"></label>
      <label>Other Expenses ($/yr): <input type="number" id="other-expenses" min="0" step="1000" placeholder="5000"></label>
      <label>Monthly Savings ($): <input type="number" id="monthly-savings" min="0" step="100" placeholder="2000"></label>
    `},
    { id: 'retirement', label: 'Retirement', content: `
      <div id="c1-accounts">
        <h5>Client 1 Accounts</h5>
        <div class="account">
          <label>Account Name: <input type="text" id="c1-account-0-name" placeholder="401(k)"></label>
          <label>Balance ($): <input type="number" id="c1-account-0-balance" min="0" step="1000" placeholder="100000"></label>
          <label>ROR (%): <input type="number" id="c1-account-0-ror" min="0" max="100" step="0.1" placeholder="6"></label>
        </div>
        <button type="button" class="add-account-btn" data-client="c1">Add Account</button>
      </div>
      <div id="c2-accounts" style="display: none;">
        <h5>Client 2 Accounts</h5>
        <div class="account">
          <label>Account Name: <input type="text" id="c2-account-0-name" placeholder="IRA"></label>
          <label>Balance ($): <input type="number" id="c2-account-0-balance" min="0" step="1000" placeholder="80000"></label>
          <label>ROR (%): <input type="number" id="c2-account-0-ror" min="0" max="100" step="0.1" placeholder="5"></label>
        </div>
        <button type="button" class="add-account-btn" data-client="c2">Add Account</button>
      </div>
    `},
    { id: 'other', label: 'Other', content: `
      <div id="c1-assets">
        <h5>Client 1 Assets</h5>
        <div class="asset">
          <label>Asset Name: <input type="text" id="c1-asset-0-name" placeholder="Investment Property"></label>
          <label>Balance ($): <input type="number" id="c1-asset-0-balance" min="0" step="1000" placeholder="200000"></label>
          <label>ROR (%): <input type="number" id="c1-asset-0-ror" min="0" max="100" step="0.1" placeholder="4"></label>
          <label>Asset Debt ($): <input type="number" id="c1-asset-0-debt" min="0" step="1000" placeholder="50000"></label>
        </div>
        <button type="button" class="add-asset-btn" data-client="c1">Add Asset</button>
      </div>
      <div id="c2-assets" style="display: none;">
        <h5>Client 2 Assets</h5>
        <div class="asset">
          <label>Asset Name: <input type="text" id="c2-asset-0-name" placeholder="Stock Portfolio"></label>
          <label>Balance ($): <input type="number" id="c2-asset-0-balance" min="0" step="1000" placeholder="150000"></label>
          <label>ROR (%): <input type="number" id="c2-asset-0-ror" min="0" max="100" step="0.1" placeholder="7"></label>
          <label>Asset Debt ($): <input type="number" id="c2-asset-0-debt" min="0" step="1000" placeholder="0"></label>
        </div>
        <button type="button" class="add-asset-btn" data-client="c2">Add Asset</button>
      </div>
      <label>Cash ($): <input type="number" id="cash" min="0" step="1000" placeholder="20000"></label>
      <label>Residence/Mortgage ($): <input type="number" id="residence-mortgage" min="0" step="1000" placeholder="300000"></label>
      <label>Other Debt ($): <input type="number" id="other-debt" min="0" step="1000" placeholder="10000"></label>
    `},
    { id: 'assumptions', label: 'Assumptions', content: `
      <label>Analysis Date: <input type="date" id="analysis-date"></label>
    `},
    { id: 'reports', label: 'Reports', content: `
      <div class="report-list">
        <label><input type="checkbox" class="report-checkbox" data-report="cash-flow"> Cash Flow</label>
        <label><input type="checkbox" class="report-checkbox" data-report="cash-flow-detail"> Cash Flow Detail</label>
        <label><input type="checkbox" class="report-checkbox" data-report="net-worth"> Net Worth</label>
        <label><input type="checkbox" class="report-checkbox" data-report="weighted-average-ror"> Weighted Average Rate of Return</label>
        <label><input type="checkbox" class="report-checkbox" data-report="fact-finder"> Fact Finder</label>
      </div>
    `}
  ]
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  populateAnalysisTopics();
  updateTabs(currentAnalysis);
  updateGraph();
  updateClientFileName();
  setupEventDelegation();
});

// Populate analysis topics
function populateAnalysisTopics() {
  analysisTopics.innerHTML = '';
  analysisList.querySelectorAll('a').forEach(link => {
    const btn = document.createElement('button');
    btn.classList.add('topic-btn');
    btn.textContent = link.textContent;
    btn.dataset.analysis = link.dataset.analysis;
    if (link.dataset.analysis === currentAnalysis) btn.classList.add('active');
    analysisTopics.appendChild(btn);
  });

  document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentAnalysis = btn.dataset.analysis;
      updateTabs(currentAnalysis);
      updateGraph();
    });
  });

  analysisList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      analysisList.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
      currentAnalysis = link.dataset.analysis;
      updateTabs(currentAnalysis);
      updateGraph();
      populateAnalysisTopics();
    });
  });
}

// Update tabs and content
function updateTabs(analysis) {
  // Clear existing content
  inputTabs.innerHTML = '';
  inputContent.innerHTML = '';

  const config = tabConfigs[analysis] || tabConfigs['retirement-accumulation'];
  
  config.forEach((tab, index) => {
    const btn = document.createElement('button');
    btn.classList.add('tab-btn');
    btn.dataset.tab = tab.id;
    btn.textContent = tab.label;
    if (index === 0) btn.classList.add('active');
    inputTabs.appendChild(btn);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('tab-content');
    contentDiv.id = tab.id;
    contentDiv.style.display = index === 0 ? 'block' : 'none';
    contentDiv.innerHTML = tab.content;
    inputContent.appendChild(contentDiv);
  });

  // Populate input fields with clientData
  populateInputFields();

  // Update client file name and marital status
  updateClientFileName();
  const isMarriedInput = document.getElementById('is-married');
  if (isMarriedInput) isMarriedInput.checked = clientData.isMarried;

  // Re-attach event listeners
  setupTabSwitching();
  setupAddButtons();
}

// Populate input fields with clientData
function populateInputFields() {
  // Personal
  setInputValue('c1-name', clientData.client1.personal.name);
  setInputValue('c2-name', clientData.client2.personal.name);
  setInputValue('c1-dob', clientData.client1.personal.dob);
  setInputValue('c2-dob', clientData.client2.personal.dob);
  setInputValue('c1-retirement-age', clientData.client1.personal.retirementAge);
  setInputValue('c2-retirement-age', clientData.client2.personal.retirementAge);

  // Income Needs
  setInputValue('monthly-income', clientData.incomeNeeds.monthly);

  // Income Sources
  setInputValue('c1-employment', clientData.client1.incomeSources.employment);
  setInputValue('c2-employment', clientData.client2.incomeSources.employment);
  setInputValue('c1-social-security', clientData.client1.incomeSources.socialSecurity);
  setInputValue('c2-social-security', clientData.client2.incomeSources.socialSecurity);
  setInputValue('c1-other-income', clientData.client1.incomeSources.other);
  setInputValue('c2-other-income', clientData.client2.incomeSources.other);
  setInputValue('interest-dividends', clientData.client1.incomeSources.interestDividends);

  // Accounts
  ['c1', 'c2'].forEach(client => {
    const clientKey = client === 'c1' ? 'client1' : 'client2';
    const accounts = clientData[clientKey].accounts;
    const container = document.getElementById(`${client}-accounts`);
    if (!container) return;

    // Clear existing accounts except the first
    const existingAccounts = container.querySelectorAll('.account');
    if (existingAccounts.length > 1) {
      for (let i = 1; i < existingAccounts.length; i++) {
        existingAccounts[i].remove();
      }
    }

    // Populate first account
    if (accounts[0]) {
      setInputValue(`${client}-account-0-name`, accounts[0].name);
      setInputValue(`${client}-account-0-balance`, accounts[0].balance);
      setInputValue(`${client}-account-0-ror`, accounts[0].ror);
      setInputValue(`${client}-account-0-contribution`, accounts[0].contribution);
      setInputValue(`${client}-account-0-employer-match`, accounts[0].employerMatch);
    }

    // Add additional accounts
    for (let i = 1; i < accounts.length; i++) {
      const newAccount = document.createElement('div');
      newAccount.classList.add('account');
      newAccount.innerHTML = currentAnalysis === 'personal-finance' ? `
        <label>Account Name: <input type="text" id="${client}-account-${i}-name" placeholder="Account ${i + 1}"></label>
        <label>Balance ($): <input type="number" id="${client}-account-${i}-balance" min="0" step="1000" placeholder="0"></label>
        <label>ROR (%): <input type="number" id="${client}-account-${i}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
      ` : `
        <label>Account Name: <input type="text" id="${client}-account-${i}-name" placeholder="Account ${i + 1}"></label>
        <label>Balance ($): <input type="number" id="${client}-account-${i}-balance" min="0" step="1000" placeholder="0"></label>
        <label>Contribution ($/yr): <input type="number" id="${client}-account-${i}-contributio" min="0" step="1000" placeholder="0"></label>
        <label>Employer Match (%): <input type="number" id="${client}-account-${i}-employer-match" min="0" max="100" step="0.1" placeholder="0"></label>
        <label>ROR (%): <input type="number" id="${client}-account-${i}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
      `;
      const addButton = container.querySelector('.add-account-btn');
      container.insertBefore(newAccount, addButton);
      setInputValue(`${client}-account-${i}-name`, accounts[i].name);
      setInputValue(`${client}-account-${i}-balance`, accounts[i].balance);
      setInputValue(`${client}-account-${i}-ror`, accounts[i].ror);
      setInputValue(`${client}-account-${i}-contribution`, accounts[i].contribution);
      setInputValue(`${client}-account-${i}-employer-match`, accounts[i].employerMatch);
    }
    accountCount[client] = accounts.length;
  });

  // Savings & Expenses
  setInputValue('household-expenses', clientData.savingsExpenses.householdExpenses);
  setInputValue('taxes', clientData.savingsExpenses.taxes);
  setInputValue('other-expenses', clientData.savingsExpenses.otherExpenses);
  setInputValue('monthly-savings', clientData.savingsExpenses.monthlySavings);

  // Other
  ['c1', 'c2'].forEach(client => {
    const clientKey = client === 'c1' ? 'client1' : 'client2';
    const assets = clientData[clientKey].other?.assets || [];
    const container = document.getElementById(`${client}-assets`);
    if (!container) return;

    const existingAssets = container.querySelectorAll('.asset');
    if (existingAssets.length > 1) {
      for (let i = 1; i < existingAssets.length; i++) {
        existingAssets[i].remove();
      }
    }

    if (assets[0]) {
      setInputValue(`${client}-asset-0-name`, assets[0].name);
      setInputValue(`${client}-asset-0-balance`, assets[0].balance);
      setInputValue(`${client}-asset-0-ror`, assets[0].ror);
      setInputValue(`${client}-asset-0-debt`, assets[0].debt);
    }

    for (let i = 1; i < assets.length; i++) {
      const newAsset = document.createElement('div');
      newAsset.classList.add('asset');
      newAsset.innerHTML = `
        <label>Asset Name: <input type="text" id="${client}-asset-${i}-name" placeholder="Asset ${i + 1}"></label>
        <label>Balance ($): <input type="number" id="${client}-asset-${i}-balance" min="0" step="1000" placeholder="0"></label>
        <label>ROR (%): <input type="number" id="${client}-asset-${i}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
        <label>Asset Debt ($): <input type="number" id="${client}-asset-${i}-debt" min="0" step="1000" placeholder="0"></label>
      `;
      const addButton = container.querySelector('.add-asset-btn');
      container.insertBefore(newAsset, addButton);
      setInputValue(`${client}-asset-${i}-name`, assets[i].name);
      setInputValue(`${client}-asset-${i}-balance`, assets[i].balance);
      setInputValue(`${client}-asset-${i}-ror`, assets[i].ror);
      setInputValue(`${client}-asset-${i}-debt`, assets[i].debt);
    }
    assetCount[client] = assets.length;
  });
  setInputValue('cash', clientData.other.cash);
  setInputValue('residence-mortgage', clientData.other.residenceMortgage);
  setInputValue('other-debt', clientData.other.otherDebt);

  // Assumptions
  setInputValue('mortality-age', clientData.assumptions.mortalityAge);
  setInputValue('inflation', clientData.assumptions.inflation);
  setInputValue('ror-retirement', clientData.assumptions.rorRetirement);
  setInputValue('analysis-date', clientData.assumptions.analysisDate);
}

// Helper to set input value
function setInputValue(id, value) {
  const input = document.getElementById(id);
  if (input && value !== undefined && value !== "") {
    input.value = value;
  }
}

// Tab switching
function setupTabSwitching() {
  inputTabs.querySelectorAll('.tab-btn').forEach(button => {
    button.removeEventListener('click', tabClickHandler);
    button.addEventListener('click', tabClickHandler);
  });
}

function tabClickHandler() {
  inputTabs.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  this.classList.add('active');
  inputContent.querySelectorAll('.tab-content').forEach(content => {
    content.style.display = content.id === this.dataset.tab ? 'block' : 'none';
  });
}

// Event delegation for inputs and checkboxes
function setupEventDelegation() {
  document.addEventListener('input', (e) => {
    if (e.target.closest('#client-input-form')) {
      updateClientData(e);
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.id === 'is-married') {
      toggleClient2(e);
    } else if (e.target.classList.contains('report-checkbox')) {
      reportCount += e.target.checked ? 1 : -1;
      presentationCount.textContent = reportCount;
      presentationCount.classList.toggle('active', reportCount > 0);
    }
  });
}

// Toggle Client 2 inputs
function toggleClient2(e) {
  clientData.isMarried = e.target.checked;
  document.getElementById('client2-section').style.display = e.target.checked ? 'block' : 'none';
  document.getElementById('client2-income-section').style.display = e.target.checked ? 'block' : 'none';
  document.getElementById('c2-accounts').style.display = e.target.checked ? 'block' : 'none';
  const c2Assets = document.getElementById('c2-assets');
  if (c2Assets) c2Assets.style.display = e.target.checked ? 'block' : 'none';
  updateClientFileName();
  updateGraph();
}

// Add account/asset buttons
function setupAddButtons() {
  document.querySelectorAll('.add-account-btn').forEach(btn => {
    btn.removeEventListener('click', addAccountHandler);
    btn.addEventListener('click', addAccountHandler);
  });

  document.querySelectorAll('.add-asset-btn').forEach(btn => {
    btn.removeEventListener('click', addAssetHandler);
    btn.addEventListener('click', addAssetHandler);
  });
}

function addAccountHandler(e) {
  const client = e.target.dataset.client;
  const container = document.getElementById(`${client}-accounts`);
  const count = accountCount[client]++;
  const newAccount = document.createElement('div');
  newAccount.classList.add('account');
  newAccount.innerHTML = currentAnalysis === 'personal-finance' ? `
    <label>Account Name: <input type="text" id="${client}-account-${count}-name" placeholder="Account ${count + 1}"></label>
    <label>Balance ($): <input type="number" id="${client}-account-${count}-balance" min="0" step="1000" placeholder="0"></label>
    <label>ROR (%): <input type="number" id="${client}-account-${count}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
  ` : `
    <label>Account Name: <input type="text" id="${client}-account-${count}-name" placeholder="Account ${count + 1}"></label>
    <label>Balance ($): <input type="number" id="${client}-account-${count}-balance" min="0" step="1000" placeholder="
