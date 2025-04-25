import { retirementAccumulationTabs, updateRetirementGraph, updateRetirementOutputs, setupAgeDisplayListeners } from './retirementAccumulation.js';
import { personalFinanceTabs, updatePersonalFinanceGraph, updatePersonalFinanceOutputs } from './personalFinance.js';
import { summaryTabs, updateSummaryOutputs } from './summary.js';

// Client data structure with default values
let clientData = {
  client1: {
    personal: { name: "John Doe", dob: "1970-01-01", retirementAge: "65" },
    incomeSources: { employment: "50000", socialSecurity: "2000", other: "500", interestDividends: "1000" },
    accounts: [{ name: "401(k)", balance: "100000", contribution: "10000", employerMatch: "3", ror: "6" }],
    other: { assets: [{ name: "Rental Property", balance: "200000", ror: "4", debt: "50000" }] }
  },
  client2: {
    personal: { name: "Jane Doe", dob: "1972-01-01", retirementAge: "65" },
    incomeSources: { employment: "40000", socialSecurity: "1500", other: "300", interestDividends: "800" },
    accounts: [{ name: "IRA", balance: "80000", contribution: "8000", employerMatch: "0", ror: "5" }],
    other: { assets: [] }
  },
  isMarried: false,
  incomeNeeds: { monthly: "5000" },
  assumptions: { mortalityAge: "90", inflation: "2", rorRetirement: "4", analysisDate: "2025-04-25" },
  savingsExpenses: {
    householdExpenses: "3000",
    taxes: "1000",
    otherExpenses: "500",
    monthlySavings: "2000"
  },
  other: {
    assets: [{ name: "Investment Portfolio", balance: "150000", ror: "5", debt: "0" }],
    cash: "20000",
    residenceMortgage: "100000",
    otherDebt: "5000"
  }
};

// Load clientData from localStorage if available
function loadClientData() {
  const savedData = localStorage.getItem('clientData');
  if (savedData) {
    clientData = JSON.parse(savedData);
    console.log('Loaded clientData from localStorage:', clientData);
  }
}

// Save clientData to localStorage
function saveClientData() {
  localStorage.setItem('clientData', JSON.stringify(clientData));
  console.log('Saved clientData to localStorage:', clientData);
}

let accountCount = { c1: 1, c2: 1 };
let assetCount = { c1: 1, c2: 0 };
let currentAnalysis = 'retirement-accumulation';
let reportCount = 0;
let selectedReports = [];
let isTyping = false;

// DOM elements
const analysisTopics = document.querySelector('.analysis-topics');
const inputTabs = document.querySelector('.input-tabs');
const inputContent = document.querySelector('.input-content');
const recalculateBtn = document.getElementById('recalculate-btn');
const exportGraphBtn = document.getElementById('export-graph-btn');
const clientFileName = document.getElementById('client-file-name');
const presentationCount = document.getElementById('presentation-count');
const analysisOutputs = document.getElementById('analysis-outputs');
let chartInstance = null;

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
    loadClientData(); // Load saved data
    console.log('Chart.js available:', typeof Chart !== 'undefined');
    console.log('chartCanvas:', document.getElementById('analysis-chart'));
    populateAnalysisTopics();
    updateTabs(currentAnalysis);
    updateClientFileName();
    setupEventDelegation();
    updateOutputs();
    setTimeout(() => {
      updateGraph();
      setupOutputTabSwitching();
    }, 100);
  } catch (error) {
    console.error('Initialization error:', error);
    analysisOutputs.innerHTML = '<p class="output-error">Error initializing page. Please check console for details.</p>';
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
        updateOutputs();
        setTimeout(updateGraph, 100);
        setupOutputTabSwitching();
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

    const config = analysis === 'retirement-accumulation' ? retirementAccumulationTabs :
                  analysis === 'personal-finance' ? personalFinanceTabs :
                  analysis === 'summary' ? summaryTabs :
                  retirementAccumulationTabs; // Default to retirement-accumulation

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
    if (analysis === 'retirement-accumulation') {
      setupAgeDisplayListeners(getAge);
    }
  } catch (error) {
    console.error('Error in updateTabs:', error);
  }
}

// Populate input fields with clientData
function populateInputFields() {
  try {
    if (isTyping) {
      console.log('Skipping populateInputFields during typing');
      return;
    }
    console.log('Populating input fields with clientData:', JSON.stringify(clientData, null, 2));

    setInputValue('c1-name', clientData.client1.personal.name, 'Client 1 Name');
    setInputValue('c2-name', clientData.client2.personal.name, 'Client 2 Name');
    setInputValue('c1-employment', clientData.client1.incomeSources.employment, 'Client 1 Employment');
    setInputValue('c2-employment', clientData.client2.incomeSources.employment, 'Client 2 Employment');
    setInputValue('c1-social-security', clientData.client1.incomeSources.socialSecurity, 'Client 1 Social Security');
    setInputValue('c2-social-security', clientData.client2.incomeSources.socialSecurity, 'Client 2 Social Security');
    setInputValue('c1-other-income', clientData.client1.incomeSources.other, 'Client 1 Other Income');
    setInputValue('c2-other-income', clientData.client2.incomeSources.other, 'Client 2 Other Income');
    setInputValue('is-married', clientData.isMarried, 'Is Married', 'checked');
    setInputValue('c1-dob', clientData.client1.personal.dob, 'Client 1 DOB');
    setInputValue('c2-dob', clientData.client2.personal.dob, 'Client 2 DOB');
    setInputValue('c1-retirement-age', clientData.client1.personal.retirementAge, 'Client 1 Retirement Age');
    setInputValue('c2-retirement-age', clientData.client2.personal.retirementAge, 'Client 2 Retirement Age');
    setInputValue('monthly-income', clientData.incomeNeeds.monthly, 'Monthly Income');
    setInputValue('mortality-age', clientData.assumptions.mortalityAge, 'Mortality Age');
    setInputValue('inflation', clientData.assumptions.inflation, 'Inflation');
    setInputValue('ror-retirement', clientData.assumptions.rorRetirement, 'ROR Retirement');
    setInputValue('interest-dividends', clientData.client1.incomeSources.interestDividends, 'Interest and Dividends');
    setInputValue('household-expenses', clientData.savingsExpenses.householdExpenses, 'Household Expenses');
    setInputValue('taxes', clientData.savingsExpenses.taxes, 'Taxes');
    setInputValue('other-expenses', clientData.savingsExpenses.otherExpenses, 'Other Expenses');
    setInputValue('monthly-savings', clientData.savingsExpenses.monthlySavings, 'Monthly Savings');
    setInputValue('analysis-date', clientData.assumptions.analysisDate, 'Analysis Date');
    setInputValue('cash', clientData.other.cash, 'Cash');
    setInputValue('residence-mortgage', clientData.other.residenceMortgage, 'Residence/Mortgage');
    setInputValue('other-debt', clientData.other.otherDebt, 'Other Debt');
    setInputValue('summary-amount', clientData.summary?.amount, 'Summary Amount'); // Add for Summary tab

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
    if (!input) {
      console.warn(`Input #${id} not found for ${label}`);
      return;
    }
    if (property === 'checked') {
      input.checked = value;
    } else {
      input.value = value ?? '';
    }
    console.log(`Set ${label} (#${id}) to: ${input.value || 'empty'}`);
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
    if (currentAnalysis === 'retirement-accumulation') {
      setupAgeDisplayListeners(getAge);
    }
    updateOutputs();
    setTimeout(updateGraph, 100);
  } catch (error) {
    console.error('Error in tabClickHandler:', error);
  }
}

// Event delegation for inputs and buttons
function setupEventDelegation() {
  try {
    let graphTimeout;
    document.addEventListener('input', (e) => {
      if (e.target.closest('#client-input-form')) {
        isTyping = true;
        const activeElement = document.activeElement;
        console.log(`Input event on ${e.target.id}: ${e.target.value}`);
        updateClientData(e);
        saveClientData(); // Save data on input
        clearTimeout(graphTimeout);
        graphTimeout = setTimeout(() => {
          updateOutputs();
          updateGraph();
          setupOutputTabSwitching();
          isTyping = false;
          if (activeElement) activeElement.focus();
        }, 500);
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target.id === 'is-married') {
        toggleClient2(e);
        saveClientData();
        updateOutputs();
        setTimeout(updateGraph, 100);
        setupOutputTabSwitching();
        if (currentAnalysis === 'retirement-accumulation') {
          setupAgeDisplayListeners(getAge);
        }
      }
    });

    // Listen for custom event from checkbox to update report counter
    document.addEventListener('addToPresentationToggle', (e) => {
      const { reportId, reportTitle } = e.detail;
      toggleReportSelection(reportId, reportTitle);
      updateOutputs(); // Re-render outputs to update checkbox state
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
    setTimeout(updateGraph, 100);
    setupOutputTabSwitching();
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
    saveClientData();
    updateOutputs();
    setTimeout(updateGraph, 100);
    setupOutputTabSwitching();
    if (currentAnalysis === 'retirement-accumulation') {
      setupAgeDisplayListeners(getAge);
    }
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
    saveClientData();
    updateOutputs();
    setTimeout(updateGraph, 100);
    setupOutputTabSwitching();
    if (currentAnalysis === 'retirement-accumulation') {
      setupAgeDisplayListeners(getAge);
    }
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

// Validate client data
function validateClientData() {
  try {
    const errors = [];

    // Check Client 1 personal data
    if (!clientData.client1.personal.name) errors.push("Client 1 name is required.");
    if (!clientData.client1.personal.dob || new Date(clientData.client1.personal.dob) > new Date()) {
      errors.push("Client 1 date of birth is invalid.");
    }
    if (!clientData.client1.personal.retirementAge || clientData.client1.personal.retirementAge < getAge(clientData.client1.personal.dob)) {
      errors.push("Client 1 retirement age must be greater than current age.");
    }

    // Check Client 2 if married
    if (clientData.isMarried) {
      if (!clientData.client2.personal.name) errors.push("Client 2 name is required when married.");
      if (!clientData.client2.personal.dob || new Date(clientData.client2.personal.dob) > new Date()) {
        errors.push("Client 2 date of birth is invalid.");
      }
      if (!clientData.client2.personal.retirementAge || clientData.client2.personal.retirementAge < getAge(clientData.client2.personal.dob)) {
        errors.push("Client 2 retirement age must be greater than current age.");
      }
    }

    // Check income needs and assumptions
    if (!clientData.incomeNeeds.monthly || clientData.incomeNeeds.monthly <= 0) {
      errors.push("Monthly income needs must be a positive number.");
    }
    if (!clientData.assumptions.mortalityAge || clientData.assumptions.mortalityAge < 0) {
      errors.push("Mortality age must be a positive number.");
    }
    if (!clientData.assumptions.inflation || clientData.assumptions.inflation < 0) {
      errors.push("Inflation rate must be a non-negative number.");
    }
    if (!clientData.assumptions.rorRetirement || clientData.assumptions.rorRetirement < 0) {
      errors.push("Rate of return in retirement must be a non-negative number.");
    }

    // Check accounts
    ['client1', 'client2'].forEach((clientKey, idx) => {
      const client = clientKey === 'client1' || clientData.isMarried ? clientData[clientKey].accounts : [];
      client.forEach((account, i) => {
        if (!account.name) errors.push(`${clientKey === 'client1' ? 'Client 1' : 'Client 2'} Account ${i + 1} name is required.`);
        if (account.balance < 0) errors.push(`${clientKey === 'client1' ? 'Client 1' : 'Client 2'} Account ${i + 1} balance must be non-negative.`);
        if (account.ror < 0) errors.push(`${clientKey === 'client1' ? 'Client 1' : 'Client 2'} Account ${i + 1} ROR must be non-negative.`);
        if (currentAnalysis !== 'personal-finance') {
          if (account.contribution < 0) errors.push(`${clientKey === 'client1' ? 'Client 1' : 'Client 2'} Account ${i + 1} contribution must be non-negative.`);
          if (account.employerMatch < 0) errors.push(`${clientKey === 'client1' ? 'Client 1' : 'Client 2'} Account ${i + 1} employer match must be non-negative.`);
        }
      });
    });

    // Check Summary amount (if Summary tab is active)
    if (currentAnalysis === 'summary') {
      if (!clientData.summary?.amount || clientData.summary.amount <= 0) {
        errors.push("Summary amount must be a positive number.");
      }
    }

    return errors.length ? errors.join('<br>') : null;
  } catch (error) {
    console.error('Error in validateClientData:', error);
    return 'Error validating client data. Please check console for details.';
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
      else if (input.id === 'summary-amount') {
        if (!clientData.summary) clientData.summary = {};
        clientData.summary.amount = value;
      }
    }

    if (input.id === 'c1-name' || input.id === 'c2-name') updateClientFileName();
  } catch (error) {
    console.error('Error in updateClientData:', error);
  }
}

// Format currency (used for outputs only)
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

// Update graph
function updateGraph() {
  try {
    console.log('updateGraph called, currentAnalysis:', currentAnalysis);
    console.log('Chart.js available:', typeof Chart !== 'undefined');
    const chartCanvas = document.getElementById('analysis-chart');
    console.log('chartCanvas:', chartCanvas);

    if (typeof Chart === 'undefined') {
      console.error('Chart.js is not loaded. Ensure the CDN script is included in analysis.html.');
      analysisOutputs.innerHTML = '<p class="output-error">Chart.js is not loaded. Please check your network connection.</p>';
      return;
    }

    if (chartInstance) {
      console.log('Destroying existing chartInstance');
      chartInstance.destroy();
      chartInstance = null;
    }

    if (chartCanvas && Chart.getChart(chartCanvas)) {
      console.log('Destroying orphaned chart on canvas');
      Chart.getChart(chartCanvas).destroy();
    }

    if (!chartCanvas) {
      console.error('Chart canvas #analysis-chart not found. Ensure outputs are rendered first.');
      return;
    }

    if (!clientData) {
      console.error('clientData is undefined');
      analysisOutputs.innerHTML = '<p class="output-error">Client data is undefined. Please check your inputs.</p>';
      return;
    }

    const validationError = validateClientData();
    if (validationError) {
      console.error('Validation failed:', validationError);
      return;
    }

    if (currentAnalysis === 'retirement-accumulation') {
      console.log('Calling updateRetirementGraph');
      chartInstance = updateRetirementGraph(chartCanvas, clientData, Chart, getAge);
      console.log('updateRetirementGraph returned chartInstance:', chartInstance);
    } else if (currentAnalysis === 'personal-finance') {
      console.log('Calling updatePersonalFinanceGraph');
      chartInstance = updatePersonalFinanceGraph(chartCanvas, clientData, Chart);
      console.log('updatePersonalFinanceGraph returned chartInstance:', chartInstance);
    } else {
      console.warn(`No graph rendering for analysis type: ${currentAnalysis}`);
      chartCanvas.style.display = 'none'; // Hide the canvas for Summary
    }

    if (!chartInstance) {
      console.warn('No chart instance created');
    } else {
      chartCanvas.style.display = 'block'; // Show the canvas if a chart is created
    }
  } catch (error) {
    console.error('Error in updateGraph:', error);
    analysisOutputs.innerHTML = '<p class="output-error">Error rendering graph. Please check console for details.</p>';
  }
}

// Update outputs
function updateOutputs() {
  try {
    const validationError = validateClientData();
    if (validationError) {
      analysisOutputs.innerHTML = `<p class="output-error">${validationError}</p>`;
      return;
    }

    if (currentAnalysis === 'retirement-accumulation') {
      updateRetirementOutputs(analysisOutputs, clientData, formatCurrency, getAge, selectedReports, Chart);
    } else if (currentAnalysis === 'personal-finance') {
      updatePersonalFinanceOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, Chart);
    } else if (currentAnalysis === 'summary') {
      updateSummaryOutputs(analysisOutputs, clientData, formatCurrency, selectedReports);
    } else {
      analysisOutputs.innerHTML = `<p class="output-card">Outputs not available for ${currentAnalysis}.</p>`;
    }
    setupOutputTabSwitching();
  } catch (error) {
    console.error('Error in updateOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-error">Error rendering outputs. Please check console for details.</p>';
  }
}

// Output tab switching
function setupOutputTabSwitching() {
  try {
    const buttons = document.querySelectorAll('.output-tab-btn');
    if (!buttons.length) {
      console.warn('No output tab buttons found');
      return;
    }
    buttons.forEach(button => {
      button.removeEventListener('click', outputTabClickHandler);
      button.addEventListener('click', outputTabClickHandler);
    });
  } catch (error) {
    console.error('Error in setupOutputTabSwitching:', error);
  }
}

function outputTabClickHandler() {
  try {
    document.querySelectorAll('.output-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.output-tab-content').forEach(content => {
      content.style.display = 'none';
    });
    this.classList.add('active');
    const tabContent = document.getElementById(this.dataset.tab);
    if (tabContent) {
      tabContent.style.display = 'block';
    } else {
      console.warn(`Output tab content #${this.dataset.tab} not found`);
    }
    if (this.dataset.tab === 'output-graph') {
      setTimeout(updateGraph, 100);
    }
  } catch (error) {
    console.error('Error in outputTabClickHandler:', error);
  }
}

// Toggle report selection
function toggleReportSelection(reportId, reportTitle) {
  try {
    const existingReport = selectedReports.find(report => report.id === reportId);
    if (existingReport) {
      selectedReports = selectedReports.filter(report => report.id !== reportId);
      reportCount--;
    } else {
      selectedReports.push({ id: reportId, title: reportTitle, order: selectedReports.length });
      reportCount++;
    }
    presentationCount.textContent = reportCount;
    presentationCount.classList.toggle('active', reportCount > 0);
    console.log('Selected reports:', selectedReports);
  } catch (error) {
    console.error('Error in toggleReportSelection:', error);
  }
}

// Recalculate and export
recalculateBtn?.addEventListener('click', () => {
  updateOutputs();
  setTimeout(updateGraph, 100);
});

exportGraphBtn?.addEventListener('click', () => {
  try {
    const chartCanvas = document.getElementById('analysis-chart');
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
