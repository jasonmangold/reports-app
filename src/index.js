import { retirementAccumulationTabs, updateRetirementGraph, updateRetirementOutputs } from './retirementAccumulation.js';
import { personalFinanceTabs, updatePersonalFinanceGraph, updatePersonalFinanceOutputs } from './personalFinance.js';

// Client data structure
let clientData = {
  client1: {
    personal: { name: "", dob: "", retirementAge: "" },
    incomeSources: { employment: "", socialSecurity: "", other: "", interestDividends: "" },
    accounts: [{ name: "", balance: "", contribution: "", employerMatch: "", ror: "" }],
    other: { assets: [] }
  },
  client2: {
    personal: { name: "", dob: "", retirementAge: "" },
    incomeSources: { employment: "", socialSecurity: "", other: "", interestDividends: "" },
    accounts: [{ name: "", balance: "", contribution: "", employerMatch: "", ror: "" }],
    other: { assets: [] }
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
    console.log('Chart.js available:', typeof Chart !== 'undefined');
    console.log('chartCanvas:', chartCanvas);
    populateAnalysisTopics();
    updateTabs(currentAnalysis);
    updateClientFileName();
    setupEventDelegation();
    setTimeout(() => {
      updateGraph();
      updateOutputs();
      setupOutputTabSwitching();
    }, 0);
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

    const config = analysis === 'retirement-accumulation' ? retirementAccumulationTabs : analysis === 'personal-finance' ? personalFinanceTabs : retirementAccumulationTabs;

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
    if ( trilogy
    input) {
      input[property] = value ?? '';
      console.log(`Set ${label} (#${id}) to: ${value ?? 'empty'}`);
    } else {
      console.warn(`Input #${id} not found for ${label}`);
    }
  } catch (error) {
    console.error(`Error setting input #${id}:`, error);
  }
}

// Tab switching for input tabs
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

// Tab switching for output tabs
function setupOutputTabSwitching() {
  try {
    document.querySelectorAll('.output-tab-btn').forEach(button => {
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
    this.classList.add('active');
    document.querySelectorAll('.output-tab-content').forEach(content => {
      content.style.display = content.id === this.dataset.tab ? 'block' : 'none';
    });
  } catch (error) {
    console.error('Error in outputTabClickHandler:', error);
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
        clearTimeout(graphTimeout);
        graphTimeout = setTimeout(() => {
          updateGraph();
          updateOutputs();
          setupOutputTabSwitching();
          if (activeElement) activeElement.focus();
        }, 500);
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target.id === 'is-married') {
        toggleClient2(e);
        updateGraph();
        updateOutputs();
        setupOutputTabSwitching();
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
    updateGraph();
    updateOutputs();
    setupOutputTabSwitching();
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
    setupOutputTabSwitching();
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

// Update graph
function updateGraph() {
  try {
    console.log('updateGraph called, currentAnalysis:', currentAnalysis);
    console.log('chartCanvas:', chartCanvas);
    console.log('clientData:', clientData);

    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      console.error('Chart.js is not loaded. Ensure the CDN script is included in analysis.html.');
      return;
    }

    // Destroy existing chart instance to prevent overlap
    if (chartInstance) {
      console.log('Destroying existing chartInstance');
      chartInstance.destroy();
      chartInstance = null;
    }

    // Additional safety: Clear any existing charts on the canvas
    if (chartCanvas && Chart.getChart(chartCanvas)) {
      console.log('Destroying orphaned chart on canvas');
      Chart.getChart(chartCanvas).destroy();
    }

    if (!chartCanvas) {
      console.error('Chart canvas not found');
      return;
    }

    if (!clientData) {
      console.error('clientData is undefined');
      return;
    }

    if (currentAnalysis === 'retirement-accumulation') {
      console.log('Calling updateRetirementGraph');
      chartInstance = updateRetirementGraph(chartCanvas, clientData, Chart);
      console.log('updateRetirementGraph returned chartInstance:', chartInstance);
    } else if (currentAnalysis === 'personal-finance') {
      console.log('Calling updatePersonalFinanceGraph');
      chartInstance = updatePersonalFinanceGraph(chartCanvas, clientData, Chart);
      console.log('updatePersonalFinanceGraph returned chartInstance:', chartInstance);
    } else {
      console.warn(`No graph rendering for analysis type: ${currentAnalysis}`);
    }

    if (!chartInstance) {
      console.warn('No chart instance created');
    }
  } catch (error) {
    console.error('Error in updateGraph:', error);
  }
}

// Update outputs
function updateOutputs() {
  try {
    if (currentAnalysis === 'retirement-accumulation') {
      updateRetirementOutputs(analysisOutputs, clientData, formatCurrency, getAge);
    } else if (currentAnalysis === 'personal-finance') {
      updatePersonalFinanceOutputs(analysisOutputs, clientData, formatCurrency);
    } else {
      analysisOutputs.innerHTML = `<p class="output-card">Outputs not available for ${currentAnalysis}.</p>`;
    }
  } catch (error) {
    console.error('Error in updateOutputs:', error);
  }
}

// Recalculate and export
recalculateBtn?.addEventListener('click', () => {
  updateGraph();
  updateOutputs();
  setupOutputTabSwitching();
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
