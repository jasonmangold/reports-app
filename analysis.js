let clientData = {
  client1: {
    personal: { name: "", dob: "", retirementAge: "" },
    incomeSources: { employment: "", socialSecurity: "", other: "", interestDividends: "" },
    accounts: [{ name: "", balance: "", contribution: "", employerMatch: "", ror: "" }],
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
const analysisTopics = document.querySelector('.analysis-topics');
const inputTabs = document.querySelector('.input-tabs');
const inputContent = document.querySelector('.input-content');
const recalculateBtn = document.getElementById('recalculate-btn');
const exportGraphBtn = document.getElementById('export-graph-btn');
const chartCanvas = document.getElementById('analysis-chart');
const clientFileName = document.getElementById('client-file-name');
const presentationCount = document.getElementById('presentation-count');
const analysisOutputs = document.getElementById('analysis-outputs');
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
        <label>Social Security ($/mo): <input type="number" id="c1-social-security" min="0" step="100" placeholder="2000"></label>
        <label>Other Income ($/mo): <input type="number" id="c1-other-income" min="0" step="100" placeholder="500"></label>
      </div>
      <div class="client" id="client2-income-section" style="display: none;">
        <h5>Client 2</h5>
        <label>Employment Income ($/yr): <input type="number" id="c2-employment" min="0" step="1000" placeholder="40000"></label>
        <label>Social Security ($/mo): <input type="number" id="c2-social-security" min="0" step="100" placeholder="1800"></label>
        <label>Other Income ($/mo): <input type="number" id="c2-other-income" min="0" step="100" placeholder="400"></label>
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

// Analysis topics list
const analysisTopicsList = [
  { id: 'summary', label: 'Summary' },
  { id: 'education-funding', label: 'Education Funding' },
  { id: 'survivor-needs', label: 'Survivor Needs' },
  { id: 'retirement-accumulation', label: 'Retirement Accumulation' },
  { id: 'retirement-distribution', label: 'Retirement Distribution' },
  { id: 'social-security', label: 'Social Security' },
  { id: 'disability-income-needs', label: 'Disability Income Needs' },
  { id: 'critical-illness', label: 'Critical Illness' },
  { id: 'long-term-care-needs', label: 'Long-Term Care Needs' },
  { id: 'estate-analysis', label: 'Estate Analysis' },
  { id: 'accumulation-funding', label: 'Accumulation Funding' },
  { id: 'asset-allocation', label: 'Asset Allocation' },
  { id: 'charitable-remainder-trust', label: 'Charitable Remainder Trust' },
  { id: 'personal-finance', label: 'Personal Finance' },
  { id: 'debt-repayment', label: 'Debt Repayment' },
  { id: 'business-continuation', label: 'Business Continuation' },
  { id: 'key-employee', label: 'Key Employee' }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('Initializing page...');
    populateAnalysisTopics();
    updateTabs(currentAnalysis);
    updateClientFileName();
    setupEventDelegation();
    setTimeout(() => {
      updateGraph();
      updateOutputs();
    }, 0); // Defer graph and outputs update
  } catch (error) {
    console.error('Initialization error:', error);
  }
});

// Populate analysis topics
function populateAnalysisTopics() {
  try {
    analysisTopics.innerHTML = '';
    analysisTopicsList.forEach(topic => {
      const btn = document.createElement('button');
      btn.classList.add('topic-btn');
      btn.textContent = topic.label;
      btn.dataset.analysis = topic.id;
      if (topic.id === currentAnalysis) btn.classList.add('active');
      analysisTopics.appendChild(btn);
    });

    document.querySelectorAll('.topic-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentAnalysis = btn.dataset.analysis;
        updateTabs(currentAnalysis);
        updateGraph();
        updateOutputs();
      });
    });
  } catch (error) {
    console.error('Error in populateAnalysisTopics:', error);
  }
}

// Update tabs and content
function updateTabs(analysis) {
  try {
    console.log(`Updating tabs for ${analysis}`);
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

    populateInputFields();
    updateClientFileName();
    const isMarriedInput = document.getElementById('is-married');
    if (isMarriedInput) {
      isMarriedInput.checked = clientData.isMarried;
      toggleClient2({ target: isMarriedInput });
    }

    setupTabSwitching();
    setupAddButtons();
  } catch (error) {
    console.error('Error in updateTabs:', error);
  }
}

// Populate input fields with clientData
function populateInputFields() {
  try {
    console.log('Populating input fields with clientData:', JSON.stringify(clientData, null, 2));

    // Shared fields
    setInputValue('c1-name', clientData.client1.personal.name, 'Client 1 Name');
    setInputValue('c2-name', clientData.client2.personal.name, 'Client 2 Name');
    setInputValue('c1-employment', clientData.client1.incomeSources.employment, 'Client 1 Employment');
    setInputValue('c2-employment', clientData.client2.incomeSources.employment, 'Client 2 Employment');
    setInputValue('c1-social-security', clientData.client1.incomeSources.socialSecurity, 'Client 1 Social Security');
    setInputValue('c2-social-security', clientData.client2.incomeSources.socialSecurity, 'Client 2 Social Security');
    setInputValue('c1-other-income', clientData.client1.incomeSources.other, 'Client 1 Other Income');
    setInputValue('c2-other-income', clientData.client2.incomeSources.other, 'Client 2 Other Income');
    setInputValue('is-married', clientData.isMarried, 'Is Married', 'checked');

    // Retirement Accumulation specific
    setInputValue('c1-dob', clientData.client1.personal.dob, 'Client 1 DOB');
    setInputValue('c2-dob', clientData.client2.personal.dob, 'Client 2 DOB');
    setInputValue('c1-retirement-age', clientData.client1.personal.retirementAge, 'Client 1 Retirement Age');
    setInputValue('c2-retirement-age', clientData.client2.personal.retirementAge, 'Client 2 Retirement Age');
    setInputValue('monthly-income', clientData.incomeNeeds.monthly, 'Monthly Income');
    setInputValue('mortality-age', clientData.assumptions.mortalityAge, 'Mortality Age');
    setInputValue('inflation', clientData.assumptions.inflation, 'Inflation');
    setInputValue('ror-retirement', clientData.assumptions.rorRetirement, 'ROR Retirement');

    // Personal Finance specific
    setInputValue('interest-dividends', clientData.client1.incomeSources.interestDividends, 'Interest and Dividends');
    setInputValue('household-expenses', clientData.savingsExpenses.householdExpenses, 'Household Expenses');
    setInputValue('taxes', clientData.savingsExpenses.taxes, 'Taxes');
    setInputValue('other-expenses', clientData.savingsExpenses.otherExpenses, 'Other Expenses');
    setInputValue('monthly-savings', clientData.savingsExpenses.monthlySavings, 'Monthly Savings');
    setInputValue('analysis-date', clientData.assumptions.analysisDate, 'Analysis Date');
    setInputValue('cash', clientData.other.cash, 'Cash');
    setInputValue('residence-mortgage', clientData.other.residenceMortgage, 'Residence/Mortgage');
    setInputValue('other-debt', clientData.other.otherDebt, 'Other Debt');

    // Accounts
    ['c1', 'c2'].forEach(client => {
      const clientKey = client === 'c1' ? 'client1' : 'client2';
      const accounts = clientData[clientKey].accounts;
      const container = document.getElementById(`${client}-accounts`);
      if (!container) {
        console.warn(`Container #${client}-accounts not found`);
        return;
      }

      const existingAccounts = container.querySelectorAll('.account');
      existingAccounts.forEach(account => account.remove());

      accounts.forEach((account, index) => {
        const newAccount = document.createElement('div');
        newAccount.classList.add('account');
        newAccount.innerHTML = currentAnalysis === 'personal-finance' ? `
          <label>Account Name: <input type="text" id="${client}-account-${index}-name" placeholder="Account ${index + 1}"></label>
          <label>Balance ($): <input type="number" id="${client}-account-${index}-balance" min="0" step="1000" placeholder="0"></label>
          <label>ROR (%): <input type="number" id="${client}-account-${index}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
        ` : `
          <label>Account Name: <input type="text" id="${client}-account-${index}-name" placeholder="Account ${index + 1}"></label>
          <label>Balance ($): <input type="number" id="${client}-account-${index}-balance" min="0" step="1000" placeholder="0"></label>
          <label>Contribution ($/yr): <input type="number" id="${client}-account-${index}-contribution" min="0" step="1000" placeholder="0"></label>
          <label>Employer Match (%): <input type="number" id="${client}-account-${index}-employer-match" min="0" max="100" step="0.1" placeholder="0"></label>
          <label>ROR (%): <input type="number" id="${client}-account-${index}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
        `;
        const addButton = container.querySelector('.add-account-btn');
        container.insertBefore(newAccount, addButton);

        setInputValue(`${client}-account-${index}-name`, account.name, `Account ${index} Name`);
        setInputValue(`${client}-account-${index}-balance`, account.balance, `Account ${index} Balance`);
        setInputValue(`${client}-account-${index}-ror`, account.ror, `Account ${index} ROR`);
        if (currentAnalysis !== 'personal-finance') {
          setInputValue(`${client}-account-${index}-contribution`, account.contribution, `Account ${index} Contribution`);
          setInputValue(`${client}-account-${index}-employer-match`, account.employerMatch, `Account ${index} Employer Match`);
        }
      });
      accountCount[client] = accounts.length;
      console.log(`Populated ${client} accounts:`, accounts);
    });

    // Assets
    ['c1', 'c2'].forEach(client => {
      const clientKey = client === 'c1' ? 'client1' : 'client2';
      const assets = clientData[clientKey].other?.assets || [];
      const container = document.getElementById(`${client}-assets`);
      if (!container) return;

      const existingAssets = container.querySelectorAll('.asset');
      existingAssets.forEach(asset => asset.remove());

      assets.forEach((asset, index) => {
        const newAsset = document.createElement('div');
        newAsset.classList.add('asset');
        newAsset.innerHTML = `
          <label>Asset Name: <input type="text" id="${client}-asset-${index}-name" placeholder="Asset ${index + 1}"></label>
          <label>Balance ($): <input type="number" id="${client}-asset-${index}-balance" min="0" step="1000" placeholder="0"></label>
          <label>ROR (%): <input type="number" id="${client}-asset-${index}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
          <label>Asset Debt ($): <input type="number" id="${client}-asset-${index}-debt" min="0" step="1000" placeholder="0"></label>
        `;
        const addButton = container.querySelector('.add-asset-btn');
        container.insertBefore(newAsset, addButton);

        setInputValue(`${client}-asset-${index}-name`, asset.name, `Asset ${index} Name`);
        setInputValue(`${client}-asset-${index}-balance`, asset.balance, `Asset ${index} Balance`);
        setInputValue(`${client}-asset-${index}-ror`, asset.ror, `Asset ${index} ROR`);
        setInputValue(`${client}-asset-${index}-debt`, asset.debt, `Asset ${index} Debt`);
      });
      assetCount[client] = assets.length;
    });
  } catch (error) {
    console.error('Error in populateInputFields:', error);
  }
}

// Helper to set input value
function setInputValue(id, value, label, property = 'value') {
  try {
    const input = document.getElementById(id);
    if (input) {
      input[property] = value ?? '';
      console.log(`Set ${label} (#${id}) to: ${value ?? 'empty'}`);
    } else {
      console.warn(`Input #${id} not found for ${label}`);
    }
  } catch (error) {
    console.error(`Error setting input #${id}:`, error);
  }
}

// Tab switching
function setupTabSwitching() {
  try {
    inputTabs.querySelectorAll('.tab-btn').forEach(button => {
      button.removeEventListener('click', tabClickHandler);
      button.addEventListener('click', tabClickHandler);
    });
  } catch (error) {
    console.error('Error in setupTabSwitching:', error);
  }
}

function tabClickHandler() {
  try {
    inputTabs.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    inputContent.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = content.id === this.dataset.tab ? 'block' : 'none';
    });
  } catch (error) {
    console.error('Error in tabClickHandler:', error);
  }
}

// Event delegation for inputs and checkboxes
function setupEventDelegation() {
  try {
    let graphTimeout;
    document.addEventListener('input', (e) => {
      if (e.target.closest('#client-input-form')) {
        const activeElement = document.activeElement;
        updateClientData(e);
        // Debounce graph and outputs update
        clearTimeout(graphTimeout);
        graphTimeout = setTimeout(() => {
          updateGraph();
          updateOutputs();
          if (activeElement) activeElement.focus(); // Restore focus
        }, 500);
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target.id === 'is-married') {
        toggleClient2(e);
        updateGraph();
        updateOutputs();
      } else if (e.target.classList.contains('report-checkbox')) {
        reportCount += e.target.checked ? 1 : -1;
        presentationCount.textContent = reportCount;
        presentationCount.classList.toggle('active', reportCount > 0);
      }
    });
  } catch (error) {
    console.error('Error in setupEventDelegation:', error);
  }
}

// Toggle Client 2 inputs
function toggleClient2(e) {
  try {
    clientData.isMarried = e.target.checked;
    document.getElementById('client2-section').style.display = e.target.checked ? 'block' : 'none';
    document.getElementById('client2-income-section').style.display = e.target.checked ? 'block' : 'none';
    document.getElementById('c2-accounts').style.display = e.target.checked ? 'block' : 'none';
    const c2Assets = document.getElementById('c2-assets');
    if (c2Assets) c2Assets.style.display = e.target.checked ? 'block' : 'none';
    updateClientFileName();
    updateOutputs();
  } catch (error) {
    console.error('Error in toggleClient2:', error);
  }
}

// Add account/asset buttons
function setupAddButtons() {
  try {
    document.querySelectorAll('.add-account-btn').forEach(btn => {
      btn.removeEventListener('click', addAccountHandler);
      btn.addEventListener('click', addAccountHandler);
    });

    document.querySelectorAll('.add-asset-btn').forEach(btn => {
      btn.removeEventListener('click', addAssetHandler);
      btn.addEventListener('click', addAssetHandler);
    });
  } catch (error) {
    console.error('Error in setupAddButtons:', error);
  }
}

function addAccountHandler(e) {
  try {
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
      <label>Balance ($): <input type="number" id="${client}-account-${count}-balance" min="0" step="1000" placeholder="0"></label>
      <label>Contribution ($/yr): <input type="number" id="${client}-account-${count}-contribution" min="0" step="1000" placeholder="0"></label>
      <label>Employer Match (%): <input type="number" id="${client}-account-${count}-employer-match" min="0" max="100" step="0.1" placeholder="0"></label>
      <label>ROR (%): <input type="number" id="${client}-account-${count}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
    `;
    container.insertBefore(newAccount, e.target);
    const clientKey = client === 'c1' ? 'client1' : 'client2';
    clientData[clientKey].accounts.push({ name: "", balance: "", ror: "", contribution: "", employerMatch: "" });
    populateInputFields();
    updateGraph();
    updateOutputs();
  } catch (error) {
    console.error('Error in addAccountHandler:', error);
  }
}

function addAssetHandler(e) {
  try {
    const client = e.target.dataset.client;
    const container = document.getElementById(`${client}-assets`);
    const count = assetCount[client]++;
    const newAsset = document.createElement('div');
    newAsset.classList.add('asset');
    newAsset.innerHTML = `
      <label>Asset Name: <input type="text" id="${client}-asset-${count}-name" placeholder="Asset ${count + 1}"></label>
      <label>Balance ($): <input type="number" id="${client}-asset-${count}-balance" min="0" step="1000" placeholder="0"></label>
      <label>ROR (%): <input type="number" id="${client}-asset-${count}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
      <label>Asset Debt ($): <input type="number" id="${client}-asset-${count}-debt" min="0" step="1000" placeholder="0"></label>
    `;
    container.insertBefore(newAsset, e.target);
    const clientKey = client === 'c1' ? 'client1' : 'client2';
    clientData[clientKey].other.assets.push({ name: "", balance: "", ror: "", debt: "" });
    populateInputFields();
    updateGraph();
    updateOutputs();
  } catch (error) {
    console.error('Error in addAssetHandler:', error);
  }
}

// Update client file name
function updateClientFileName() {
  try {
    let name = clientData.client1.personal.name || 'No Client Selected';
    if (clientData.isMarried && clientData.client2.personal.name) {
      name = `${clientData.client1.personal.name} & ${clientData.client2.personal.name}`;
    }
    clientFileName.textContent = name;
    localStorage.setItem('clientFileName', name);
  } catch (error) {
    console.error('Error in updateClientFileName:', error);
  }
}

// Update client data
function updateClientData(e) {
  try {
    const input = e.target;
    if (input.id === 'is-married') return;
    
    const value = input.type === 'number' ? (input.value === '' ? '' : parseFloat(input.value)) : input.value;
    console.log(`Updating ${input.id} with value: ${value}`);

    const clientKey = input.id.startsWith('c1-') ? 'client1' : input.id.startsWith('c2-') ? 'client2' : null;

    if (clientKey) {
      const prefix = clientKey === 'client1' ? 'c1' : 'c2';
      if (input.id === `${prefix}-name`) {
        clientData[clientKey].personal.name = value;
      } else if (input.id === `${prefix}-dob`) {
        clientData[clientKey].personal.dob = value;
      } else if (input.id === `${prefix}-retirement-age`) {
        clientData[clientKey].personal.retirementAge = value;
      } else if (input.id === `${prefix}-employment`) {
        clientData[clientKey].incomeSources.employment = value;
      } else if (input.id === `${prefix}-social-security`) {
        clientData[clientKey].incomeSources.socialSecurity = value;
      } else if (input.id === `${prefix}-other-income`) {
        clientData[clientKey].incomeSources.other = value;
      } else if (input.id.startsWith(`${prefix}-account-`)) {
        const [, , index, field] = input.id.split('-');
        clientData[clientKey].accounts[parseInt(index)] = {
          ...clientData[clientKey].accounts[parseInt(index)],
          [field]: value
        };
      } else if (input.id.startsWith(`${prefix}-asset-`)) {
        const [, , index, field] = input.id.split('-');
        clientData[clientKey].other.assets[parseInt(index)] = {
          ...clientData[clientKey].other.assets[parseInt(index)],
          [field]: value
        };
      }
    } else {
      if (input.id === 'monthly-income') clientData.incomeNeeds.monthly = value;
      else if (input.id === 'mortality-age') clientData.assumptions.mortalityAge = value;
      else if (input.id === 'inflation') clientData.assumptions.inflation = value;
      else if (input.id === 'ror-retirement') clientData.assumptions.rorRetirement = value;
      else if (input.id === 'interest-dividends') {
        clientData.client1.incomeSources.interestDividends = value;
        if (clientData.isMarried) clientData.client2.incomeSources.interestDividends = value;
      } else if (input.id === 'other-income') {
        clientData.client1.incomeSources.other = value;
        if (clientData.isMarried) clientData.client2.incomeSources.other = value;
      } else if (input.id === 'household-expenses') clientData.savingsExpenses.householdExpenses = value;
      else if (input.id === 'taxes') clientData.savingsExpenses.taxes = value;
      else if (input.id === 'other-expenses') clientData.savingsExpenses.otherExpenses = value;
      else if (input.id === 'monthly-savings') clientData.savingsExpenses.monthlySavings = value;
      else if (input.id === 'analysis-date') clientData.assumptions.analysisDate = value;
      else if (input.id === 'cash') clientData.other.cash = value;
      else if (input.id === 'residence-mortgage') clientData.other.residenceMortgage = value;
      else if (input.id === 'other-debt') clientData.other.otherDebt = value;
    }

    if (input.id === 'c1-name' || input.id === 'c2-name') updateClientFileName();
  } catch (error) {
    console.error('Error in updateClientData:', error);
  }
}

// Format currency
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
}

// Calculate age
function getAge(dob) {
  try {
    if (!dob) return 0;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return Math.max(0, age);
  } catch (error) {
    console.error('Error in getAge:', error);
    return 0;
  }
}

// Update outputs
function updateOutputs() {
  try {
    if (!analysisOutputs) {
      console.error('Analysis outputs #analysis-outputs not found');
      return;
    }

    if (currentAnalysis !== 'retirement-accumulation') {
      analysisOutputs.innerHTML = '<p class="output-card">Outputs available for Retirement Accumulation only.</p>';
      return;
    }

    // Input validation with fallback values
    const c1Age = getAge(clientData.client1.personal.dob);
    const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
    const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
    const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
    const mortalityAge = parseFloat(clientData.assumptions.mortalityAge) || 90;
    const inflation = parseFloat(clientData.assumptions.inflation) / 100 || 0.02;
    const rorRetirement = parseFloat(clientData.assumptions.rorRetirement) / 100 || 0.04;
    const monthlyNeed = parseFloat(clientData.incomeNeeds.monthly) || 5000;

    // Check for valid inputs
    if (c1Age >= c1RetirementAge || (clientData.isMarried && c2Age >= c2RetirementAge)) {
      analysisOutputs.innerHTML = '<p class="output-card">Client(s) already at or past retirement age. Please adjust retirement age or DOB.</p>';
      return;
    }
    if (c1RetirementAge >= mortalityAge || (clientData.isMarried && c2RetirementAge >= mortalityAge)) {
      analysisOutputs.innerHTML = '<p class="output-card">Retirement age must be less than mortality age.</p>';
      return;
    }

    // Income Goals
    const incomeGoals = [
      { age: c1RetirementAge, percentage: 100, amount: monthlyNeed },
      { age: c1RetirementAge + 10, percentage: 80, amount: monthlyNeed * 0.8 },
      { age: c1RetirementAge + 15, percentage: 70, amount: monthlyNeed * 0.7 }
    ];

    // Income Sources
    const incomeSources = [];
    if (clientData.client1.incomeSources.employment && c1Age < c1RetirementAge) {
      incomeSources.push({
        source: `${clientData.client1.personal.name || 'Client 1'}'s Employment Income`,
        details: `Until age ${c1RetirementAge}`,
        amount: parseFloat(clientData.client1.incomeSources.employment) / 12 || 0
      });
    }
    if (clientData.isMarried && clientData.client2.incomeSources.employment && c2Age < c2RetirementAge) {
      incomeSources.push({
        source: `${clientData.client2.personal.name || 'Client 2'}'s Employment Income`,
        details: `Until age ${c2RetirementAge}`,
        amount: parseFloat(clientData.client2.incomeSources.employment) / 12 || 0
      });
    }
    if (clientData.client1.incomeSources.socialSecurity) {
      incomeSources.push({
        source: `${clientData.client1.personal.name || 'Client 1'}'s Social Security`,
        details: `At age ${c1RetirementAge}`,
        amount: parseFloat(clientData.client1.incomeSources.socialSecurity) || 0
      });
    }
    if (clientData.isMarried && clientData.client2.incomeSources.socialSecurity) {
      incomeSources.push({
        source: `${clientData.client2.personal.name || 'Client 2'}'s Social Security`,
        details: `At age ${c2RetirementAge}`,
        amount: parseFloat(clientData.client2.incomeSources.socialSecurity) || 0
      });
    }
    if (clientData.client1.incomeSources.other) {
      incomeSources.push({
        source: 'Other Income',
        details: `At age ${c1RetirementAge}`,
        amount: parseFloat(clientData.client1.incomeSources.other) || 0
      });
    }

    // Assets
    let totalAssets = 0;
    const assets = [];
    clientData.client1.accounts.forEach(account => {
      const balance = parseFloat(account.balance) || 0;
      if (balance > 0) {
        assets.push({
          name: `${clientData.client1.personal.name || 'Client 1'}'s ${account.name || 'Retirement Account'}`,
          balance
        });
        totalAssets += balance;
      }
    });
    if (clientData.isMarried) {
      clientData.client2.accounts.forEach(account => {
        const balance = parseFloat(account.balance) || 0;
        if (balance > 0) {
          assets.push({
            name: `${clientData.client2.personal.name || 'Client 2'}'s ${account.name || 'Retirement Account'}`,
            balance
          });
          totalAssets += balance;
        }
      });
    }
    clientData.other.assets.forEach(asset => {
      const balance = parseFloat(asset.balance) || 0;
      if (balance > 0) {
        assets.push({
          name: asset.name || 'Other Asset',
          balance
        });
        totalAssets += balance;
      }
    });

    // Calculate retirement balance
    let balance = totalAssets;
    const yearsToRetirement = Math.max(c1RetirementAge - c1Age, clientData.isMarried ? c2RetirementAge - c2Age : 0);
    [clientData.client1, clientData.isMarried ? clientData.client2 : null].forEach((client, idx) => {
      if (!client) return;
      client.accounts.forEach(account => {
        let tempBalance = parseFloat(account.balance) || 0;
        const contribution = parseFloat(account.contribution) || 0;
        const employerMatch = (parseFloat(account.employerMatch) / 100) * contribution || 0;
        const ror = parseFloat(account.ror) / 100 || 0.06;
        for (let i = 0; i < yearsToRetirement; i++) {
          tempBalance += tempBalance * ror + contribution + employerMatch;
        }
        balance += tempBalance - (parseFloat(account.balance) || 0);
      });
    });

    // Calculate depletion
    let depletionAge = c1RetirementAge;
    const monthlySources = incomeSources.reduce((sum, src) => sum + (src.amount || 0), 0);
    for (let i = 0; i < mortalityAge - c1RetirementAge; i++) {
      const currentNeed = monthlyNeed * Math.pow(1 + inflation, i) - monthlySources;
      balance = balance * (1 + rorRetirement) - (currentNeed > 0 ? currentNeed * 12 : 0);
      if (balance <= 0) {
        depletionAge = c1RetirementAge + i;
        break;
      }
    }
    if (balance > 0) depletionAge = mortalityAge;

    // Calculate additional savings needed
    const currentSavings = parseFloat(clientData.savingsExpenses.monthlySavings) || 0;
    let additionalSavings = 0;
    let requiredAtRetirement = 0;
    if (depletionAge < mortalityAge) {
      const yearsShort = mortalityAge - depletionAge;
      const annualNeed = (monthlyNeed - monthlySources) * 12;
      requiredAtRetirement = annualNeed * (1 - Math.pow(1 + rorRetirement, -yearsShort)) / rorRetirement;
      const yearsToSave = yearsToRetirement;
      additionalSavings = requiredAtRetirement / ((Math.pow(1 + rorRetirement, yearsToSave) - 1) / rorRetirement);
    }

    // Render outputs
    analysisOutputs.innerHTML = `
      <div class="output-card">
        <h3>Income Goals</h3>
        <p>Your desired monthly retirement income in today's dollars:</p>
        <table class="output-table">
          <thead>
            <tr>
              <th>Client 1 Age</th>
              <th>Client 2 Age</th>
              <th>% of Current Income</th>
              <th>Monthly Amount</th>
            </tr>
          </thead>
          <tbody>
            ${incomeGoals.map(goal => `
              <tr>
                <td>${goal.age}</td>
                <td>${clientData.isMarried ? goal.age - (c1RetirementAge - c2RetirementAge) : '-'}</td>
                <td>${goal.percentage.toFixed(2)}%</td>
                <td>${formatCurrency(goal.amount)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="output-card">
        <h3>Income Sources</h3>
        <p>Monthly income sources to support your retirement goals:</p>
        <table class="output-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Details</th>
              <th>Monthly Amount</th>
            </tr>
          </thead>
          <tbody>
            ${incomeSources.length ? incomeSources.map(src => `
              <tr>
                <td>${src.source}</td>
                <td>${src.details}</td>
                <td>${formatCurrency(src.amount)}</td>
              </tr>
            `).join('') : '<tr><td colspan="3">No income sources provided.</td></tr>'}
          </tbody>
        </table>
      </div>
      <div class="output-card">
        <h3>Assets Available at Retirement</h3>
        <p>Applied assets for retirement funding:</p>
        <table class="output-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            ${assets.length ? assets.map(asset => `
              <tr>
                <td>${asset.name}</td>
                <td>${formatCurrency(asset.balance)}</td>
              </tr>
            `).join('') : '<tr><td colspan="2">No assets provided.</td></tr>'}
          </tbody>
        </table>
      </div>
      <div class="output-card">
        <h3>Results</h3>
        <div class="results-highlight">
          <p>Your funds will be depleted at Client 1's age ${depletionAge}.</p>
          <p>Current monthly savings of ${formatCurrency(currentSavings)} need to increase by ${formatCurrency(additionalSavings)} at ${rorRetirement * 100}% ROR.</p>
          ${requiredAtRetirement > 0 ? `<p>Additional ${formatCurrency(requiredAtRetirement)} required at retirement.</p>` : ''}
        </div>
        <div class="depletion-progress">
          <progress value="${depletionAge - c1RetirementAge}" max="${mortalityAge - c1RetirementAge}"></progress>
          <p>Retirement duration: ${depletionAge - c1RetirementAge} of ${mortalityAge - c1RetirementAge} years</p>
        </div>
        <p class="disclaimer">Values shown are hypothetical and not a promise of future performance.</p>
      </div>
    `;
    console.log('Analysis outputs rendered');
  } catch (error) {
    console.error('Error in updateOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-card">Unable to render outputs. Please ensure all required fields (DOB, retirement age, mortality age, income needs) are filled correctly.</p>';
  }
}

// Update graph
function updateGraph() {
  try {
    if (!chartCanvas) {
      console.error('Chart canvas #analysis-chart not found');
      return;
    }
    if (typeof Chart === 'undefined') {
      console.error('Chart.js not loaded');
      return;
    }

    const ctx = chartCanvas.getContext('2d');
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }

    if (currentAnalysis === 'personal-finance') {
      const years = 30;
      const labels = [];
      const data = [];
      const startYear = new Date(clientData.assumptions.analysisDate || new Date()).getFullYear();
      
      let netWorth = 0;
      [clientData.client1, clientData.client2].forEach((client, idx) => {
        if (idx === 1 && !clientData.isMarried) return;
        client.accounts.forEach(account => {
          const balance = parseFloat(account.balance) || 0;
          netWorth += balance;
        });
        client.other?.assets?.forEach(asset => {
          const balance = parseFloat(asset.balance) || 0;
          const debt = parseFloat(asset.debt) || 0;
          netWorth += balance - debt;
        });
      });
      netWorth += parseFloat(clientData.other.cash) || 0;
      netWorth -= parseFloat(clientData.other.residenceMortgage) || 0;
      netWorth -= parseFloat(clientData.other.otherDebt) || 0;

      const annualSavings = (parseFloat(clientData.savingsExpenses.monthlySavings) || 0) * 12;
      const expenses = (parseFloat(clientData.savingsExpenses.householdExpenses) || 0) +
                      (parseFloat(clientData.savingsExpenses.taxes) || 0) +
                      (parseFloat(clientData.savingsExpenses.otherExpenses) || 0);
      const income = (parseFloat(clientData.client1.incomeSources.employment) || 0) +
                     (clientData.isMarried ? parseFloat(clientData.client2.incomeSources.employment) || 0 : 0) +
                     (parseFloat(clientData.client1.incomeSources.interestDividends) || 0) +
                     (parseFloat(clientData.client1.incomeSources.other) || 0);
      const ror = 0.05;

      for (let i = 0; i < years; i++) {
        netWorth = netWorth * (1 + ror) + (income + annualSavings - expenses);
        data.push(Math.max(0, netWorth));
        labels.push(startYear + i);
      }

      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Net Worth ($)',
            data: data,
            borderColor: '#3b82f6',
            fill: false
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: { title: { display: true, text: 'Year' } },
            y: { title: { display: true, text: 'Net Worth ($)' } }
          }
        }
      });
      console.log('Personal Finance graph rendered');
    } else {
      // Input validation with fallback values
      const c1Age = getAge(clientData.client1.personal.dob);
      const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
      const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
      const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
      const startAge = Math.max(c1RetirementAge, c2RetirementAge); // Start at latest retirement age
      const mortalityAge = parseFloat(clientData.assumptions.mortalityAge) || 90;
      const inflation = parseFloat(clientData.assumptions.inflation) / 100 || 0.02;
      const rorRetirement = parseFloat(clientData.assumptions.rorRetirement) / 100 || 0.04;
      const monthlyNeed = parseFloat(clientData.incomeNeeds.monthly) || 5000;

      // Validate inputs
      if (!clientData.client1.personal.dob || c1Age >= c1RetirementAge || (clientData.isMarried && (!clientData.client2.personal.dob || c2Age >= c2RetirementAge))) {
        chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Error'],
            datasets: [{
              label: 'Error',
              data: [0],
              backgroundColor: '#ef4444'
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: { display: true, text: 'Please enter valid DOB and retirement age' }
            }
          }
        });
        console.log('Invalid inputs for graph');
        return;
      }
      if (startAge >= mortalityAge) {
        chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Error'],
            datasets: [{
              label: 'Error',
              data: [0],
              backgroundColor: '#ef4444'
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: { display: true, text: 'Retirement age must be less than mortality age' }
            }
          }
        });
        console.log('Invalid retirement/mortality age');
        return;
      }

      // Calculate total capital at retirement
      let totalBalance = 0;
      const yearsToRetirement = startAge - c1Age;
      [clientData.client1, clientData.isMarried ? clientData.client2 : null].forEach((client, idx) => {
        if (!client) return;
        const clientRetirementAge = idx === 0 ? c1RetirementAge : c2RetirementAge;
        const yearsToClientRetirement = clientRetirementAge - (idx === 0 ? c1Age : c2Age);
        client.accounts.forEach(account => {
          let tempBalance = parseFloat(account.balance) || 0;
          const contribution = parseFloat(account.contribution) || 0;
          const employerMatch = (parseFloat(account.employerMatch) / 100) * contribution || 0;
          const ror = parseFloat(account.ror) / 100 || 0.06;
          // Grow balance until client's retirement age
          for (let i = 0; i < yearsToClientRetirement; i++) {
            tempBalance += tempBalance * ror + contribution + employerMatch;
          }
          // If this client's retirement is earlier, grow at rorRetirement until startAge
          if (yearsToClientRetirement < yearsToRetirement) {
            for (let i = yearsToClientRetirement; i < yearsToRetirement; i++) {
              tempBalance += tempBalance * rorRetirement;
            }
          }
          totalBalance += tempBalance;
        });
      });
      // Add other assets
      clientData.other.assets.forEach(asset => {
        let tempBalance = parseFloat(asset.balance) || 0;
        const ror = parseFloat(asset.ror) / 100 || 0.06;
        for (let i = 0; i < yearsToRetirement; i++) {
          tempBalance += tempBalance * ror;
        }
        totalBalance += tempBalance;
      });

      // Prepare data for retirement period
      const labels = [];
      const capitalData = [];
      const socialSecurityData = [];
      const otherIncomeData = [];
      let balance = totalBalance;
      const startYear = new Date().getFullYear() + yearsToRetirement;

      for (let i = 0; i <= mortalityAge - startAge; i++) {
        const currentAge = startAge + i;
        labels.push(startYear + i);

        // Calculate inflation-adjusted monthly need
        const adjustedMonthlyNeed = monthlyNeed * Math.pow(1 + inflation, i);

        // Social Security
        let socialSecurity = 0;
        if (currentAge >= c1RetirementAge) {
          socialSecurity += parseFloat(clientData.client1.incomeSources.socialSecurity) || 0;
        }
        if (clientData.isMarried && currentAge >= c2RetirementAge) {
          socialSecurity += parseFloat(clientData.client2.incomeSources.socialSecurity) || 0;
        }
        socialSecurityData.push(socialSecurity);

        // Other Income
        const otherIncome = parseFloat(clientData.client1.incomeSources.other) || 0;
        otherIncomeData.push(otherIncome);

        // Capital withdrawal
        const remainingNeed = adjustedMonthlyNeed - socialSecurity - otherIncome;
        let capitalWithdrawal = 0;
        if (remainingNeed > 0 && balance > 0) {
          capitalWithdrawal = Math.min(remainingNeed, balance * rorRetirement / 12);
          balance = balance * (1 + rorRetirement) - capitalWithdrawal * 12;
          if (balance < 0) {
            capitalWithdrawal = (remainingNeed * 12 - (balance * (1 + rorRetirement))) / 12;
            balance = 0;
          }
        }
        capitalData.push(capitalWithdrawal);

        if (balance <= 0 && capitalWithdrawal === 0 && socialSecurity === 0 && otherIncome === 0) {
          break; // Stop if no more funds or income
        }
      }

      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Capital',
              data: capitalData,
              backgroundColor: '#f97316', // Orange
              stack: 'Stack0'
            },
            {
              label: 'Social Security',
              data: socialSecurityData,
              backgroundColor: '#22c55e', // Green
              stack: 'Stack0'
            },
            {
              label: 'Other Income',
              data: otherIncomeData,
              backgroundColor: '#3b82f6', // Blue
              stack: 'Stack0'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            title: {
              display: true,
              text: 'Retirement Income Sources by Year'
            }
          },
          scales: {
            x: {
              title: { display: true, text: 'Year' },
              stacked: true
            },
            y: {
              title: { display: true, text: 'Monthly Income ($)' },
              stacked: true,
              beginAtZero: true
            }
          }
        }
      });
      console.log('Retirement Accumulation bar graph rendered');
    }
  } catch (error) {
    console.error('Error in updateGraph:', error);
    if (ctx) {
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Error'],
          datasets: [{
            label: 'Error',
            data: [0],
            backgroundColor: '#ef4444'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: 'Error rendering graph' }
          }
        }
      });
    }
  }
}

// Recalculate and export
recalculateBtn?.addEventListener('click', () => {
  updateGraph();
  updateOutputs();
});
exportGraphBtn?.addEventListener('click', () => {
  try {
    if (!chartCanvas) {
      console.error('Chart canvas not found for export');
      return;
    }
    const link = document.createElement('a');
    link.href = chartCanvas.toDataURL('image/png');
    link.download = `${currentAnalysis}-graph.png`;
    link.click();
  } catch (error) {
    console.error('Error in exportGraph:', error);
  }
});
