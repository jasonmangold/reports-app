import { retirementAccumulationTabs, updateRetirementGraph, updateRetirementOutputs, setupAgeDisplayListeners } from './retirementAccumulation.js';
import { personalFinanceTabs, updatePersonalFinanceGraph, updatePersonalFinanceOutputs } from './personalFinance.js';
import { summaryTabs, updateSummaryOutputs } from './summary.js';
import { clientProfileTabs } from './clientProfile.js';

// Client data structure with default values
let clientData = {
  client1: {
    personal: { name: "Jason Mangold", dob: "1970-01-01", retirementAge: "65" },
    incomeSources: { employment: "50000", socialSecurity: "2000", other: "500", interestDividends: "1000" },
    accounts: [{ name: "401(k)", balance: "100000", contribution: "10000", employerMatch: "3", ror: "6" }],
    other: { assets: [{ name: "Rental Property", balance: "200000", ror: "4", debt: "50000" }] },
    insurance: { lifeInsurance: "0", disabilityInsurance: "0", longTermCare: "0" }
  },
  client2: {
    personal: { name: "Jane Doe", dob: "1972-01-01", retirementAge: "65" },
    incomeSources: { employment: "40000", socialSecurity: "1500", other: "300", interestDividends: "800" },
    accounts: [{ name: "IRA", balance: "80000", contribution: "8000", employerMatch: "0", ror: "5" }],
    other: { assets: [] },
    insurance: { lifeInsurance: "0", disabilityInsurance: "0", longTermCare: "0" }
  },
  isMarried: false,
  incomeNeeds: { monthly: "5000" },
  assumptions: { 
    mortalityAge: "90", 
    c1MortalityAge: "90", 
    c2MortalityAge: "90", 
    inflation: "3", 
    rorRetirement: "4", 
    analysisDate: "2025-04-25" 
  },
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
  },
  summary: {
    topics: ['Accumulation Funding', 'Critical Illness', 'Debt', 'Disability', 'Education Funding', 'Long Term Care', 'Retirement Accumulation']
  },
  scenarios: {
    base: null,
    whatIf: []
  }
};

// List of clients for the modal
const clients = [
  { id: 1, name: "Jason Mangold", data: clientData.client1 },
  { id: 2, name: "Jane Doe", data: clientData.client2 }
];

// Load clientData from localStorage if available
function loadClientData() {
  const savedData = localStorage.getItem('clientData');
  if (savedData) {
    clientData = JSON.parse(savedData);
    clientData.client1.insurance = clientData.client1.insurance || { lifeInsurance: "0", disabilityInsurance: "0", longTermCare: "0" };
    clientData.client2.insurance = clientData.client2.insurance || { lifeInsurance: "0", disabilityInsurance: "0", longTermCare: "0" };
    clientData.assumptions.c1MortalityAge = clientData.assumptions.c1MortalityAge || clientData.assumptions.mortalityAge || "90";
    clientData.assumptions.c2MortalityAge = clientData.assumptions.c2MortalityAge || clientData.assumptions.mortalityAge || "90";
    clientData.scenarios = clientData.scenarios || { base: null, whatIf: [] };
    console.log('Loaded clientData from localStorage:', clientData);
  }
}

// Load selectedReports from localStorage if available
function loadSelectedReports() {
  const savedReports = localStorage.getItem('selectedReports');
  if (savedReports) {
    selectedReports = JSON.parse(savedReports);
    reportCount = selectedReports.length;
    presentationCount.textContent = reportCount;
    presentationCount.classList.toggle('active', reportCount > 0);
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
let selectedClientId = 1;
let chartInstance = null;

// DOM elements
const analysisTopics = document.querySelector('.analysis-topics');
const inputTabs = document.querySelector('.input-tabs');
const inputContent = document.querySelector('.input-content');
const recalculateBtn = document.getElementById('recalculate-btn');
const exportGraphBtn = document.getElementById('export-graph-btn');
const clientFileName = document.getElementById('client-file-name');
const presentationCount = document.getElementById('presentation-count');
const analysisOutputs = document.getElementById('analysis-outputs');
const outputTabsContainer = document.getElementById('output-tabs-container');
const analysisWorkspace = document.querySelector('.analysis-workspace');
const clientFileToggle = document.getElementById('client-file-toggle');
const clientModal = document.getElementById('client-modal');
const closeModalBtn = document.getElementById('close-modal');
const clientList = document.getElementById('client-list');
const clientSearch = document.getElementById('client-search');

// Analysis topics list
const analysisTopicsList = [
  { id: 'client-profile', label: 'Client Profile' },
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
    loadClientData();
    loadSelectedReports();
    console.log('Chart.js available:', typeof Chart !== 'undefined');
    console.log('chartCanvas:', document.getElementById('analysis-chart'));
    populateAnalysisTopics();
    updateTabs(currentAnalysis);
    populateClientList();
    updateClientFileName();
    setupEventDelegation();
    setupClientModalListeners();
    updateOutputs();
    if (currentAnalysis === 'client-profile') {
      analysisWorkspace.classList.add('client-profile-active');
      console.log('Added client-profile-active to analysisWorkspace');
    } else {
      analysisWorkspace.classList.remove('client-profile-active');
      console.log('Removed client-profile-active from analysisWorkspace');
    }
    setTimeout(() => {
      if (currentAnalysis !== 'client-profile') {
        updateGraph();
      }
      setupOutputTabSwitching();
      setupWhatIfControls();
    }, 100);
  } catch (error) {
    console.error('Initialization error:', error);
    analysisOutputs.innerHTML = '<p class="output-error">Error initializing page. Please check console for details.</p>';
  }
});

// Populate client list in the modal
function populateClientList() {
  try {
    clientList.innerHTML = '';
    clients.forEach(client => {
      const li = document.createElement('li');
      li.textContent = client.name;
      li.dataset.clientId = client.id;
      if (client.id === selectedClientId) {
        li.classList.add('selected');
        clientFileName.textContent = client.name;
      }
      clientList.appendChild(li);
    });
  } catch (error) {
    console.error('Error in populateClientList:', error);
  }
}

// Setup listeners for the client modal
function setupClientModalListeners() {
  try {
    clientFileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = clientModal.style.display === 'block';
      clientModal.style.display = isOpen ? 'none' : 'block';
      clientFileToggle.setAttribute('aria-expanded', !isOpen);
    });

    closeModalBtn.addEventListener('click', () => {
      clientModal.style.display = 'none';
      clientFileToggle.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', (e) => {
      if (!clientFileToggle.contains(e.target) && !clientModal.contains(e.target)) {
        clientModal.style.display = 'none';
        clientFileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    clientList.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li) return;

      selectedClientId = parseInt(li.dataset.clientId);
      clientList.querySelectorAll('li').forEach(item => item.classList.remove('selected'));
      li.classList.add('selected');
      clientFileName.textContent = li.textContent;

      const selectedClient = clients.find(client => client.id === selectedClientId);
      if (selectedClient) {
        clientData.client1 = selectedClient.data;
        if (clientData.isMarried && clients.length > 1) {
          const otherClient = clients.find(client => client.id !== selectedClientId);
          clientData.client2 = otherClient ? otherClient.data : clientData.client2;
        }
        clientData.scenarios = { base: null, whatIf: [] };
        saveClientData();
        updateTabs(currentAnalysis);
        updateOutputs();
        if (currentAnalysis !== 'client-profile') {
          setTimeout(updateGraph, 100);
        }
      }

      clientModal.style.display = 'none';
      clientFileToggle.setAttribute('aria-expanded', 'false');
    });

    clientSearch.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const clientItems = clientList.querySelectorAll('li');
      clientItems.forEach(item => {
        const clientName = item.textContent.toLowerCase();
        item.style.display = clientName.includes(searchTerm) ? 'block' : 'none';
      });
    });
  } catch (error) {
    console.error('Error in setupClientModalListeners:', error);
  }
}

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

    document.querySelectorAll('.analysis-topics .topic-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('Topic button clicked:', btn.dataset.analysis);
        document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentAnalysis = btn.dataset.analysis;
        if (currentAnalysis === 'client-profile') {
          analysisWorkspace.classList.add('client-profile-active');
          console.log('Added client-profile-active to analysisWorkspace');
        } else {
          analysisWorkspace.classList.remove('client-profile-active');
          console.log('Removed client-profile-active from analysisWorkspace');
        }
        updateTabs(currentAnalysis);
        updateOutputs();
        if (currentAnalysis !== 'client-profile') {
          setTimeout(updateGraph, 100);
        }
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
                  analysis === 'client-profile' ? clientProfileTabs :
                  retirementAccumulationTabs;

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
    if (analysis === 'client-profile') {
      setupSubTabSwitching();
    }
    setupAddButtons();
    if (analysis === 'retirement-accumulation' || analysis === 'client-profile') {
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

    const setIfExists = (id, value, label, property = 'value') => {
      const input = document.getElementById(id);
      if (input) {
        setInputValue(id, value, label, property);
      } else {
        console.log(`Skipping ${label} (#${id}) as it is not present in current tab`);
      }
    };

    setIfExists('c1-name', clientData.client1.personal.name, 'Client 1 Name');
    setIfExists('c2-name', clientData.client2.personal.name, 'Client 2 Name');
    setIfExists('c1-employment', clientData.client1.incomeSources.employment, 'Client 1 Employment');
    setIfExists('c2-employment', clientData.client2.incomeSources.employment, 'Client 2 Employment');
    setIfExists('c1-social-security', clientData.client1.incomeSources.socialSecurity, 'Client 1 Social Security');
    setIfExists('c2-social-security', clientData.client2.incomeSources.socialSecurity, 'Client 2 Social Security');
    setIfExists('c1-other-income', clientData.client1.incomeSources.other, 'Client 1 Other Income');
    setIfExists('c2-other-income', clientData.client2.incomeSources.other, 'Client 2 Other Income');
    setIfExists('is-married', clientData.isMarried, 'Is Married', 'checked');
    setIfExists('c1-dob', clientData.client1.personal.dob, 'Client 1 DOB');
    setIfExists('c2-dob', clientData.client2.personal.dob, 'Client 2 DOB');
    setIfExists('c1-retirement-age', clientData.client1.personal.retirementAge, 'Client 1 Retirement Age');
    setIfExists('c2-retirement-age', clientData.client2.personal.retirementAge, 'Client 2 Retirement Age');
    setIfExists('monthly-income', clientData.incomeNeeds.monthly, 'Monthly Income');
    setIfExists('mortality-age', clientData.assumptions.mortalityAge, 'Mortality Age');
    setIfExists('c1-mortality-age', clientData.assumptions.c1MortalityAge, 'Client 1 Mortality Age');
    setIfExists('c2-mortality-age', clientData.assumptions.c2MortalityAge, 'Client 2 Mortality Age');
    setIfExists('inflation', clientData.assumptions.inflation, 'Inflation');
    setIfExists('ror-retirement', clientData.assumptions.rorRetirement, 'ROR Retirement');
    setIfExists('c1-interest-dividends', clientData.client1.incomeSources.interestDividends, 'Client 1 Interest and Dividends');
    setIfExists('c2-interest-dividends', clientData.client2.incomeSources.interestDividends, 'Client 2 Interest and Dividends');
    setIfExists('household-expenses', clientData.savingsExpenses.householdExpenses, 'Household Expenses');
    setIfExists('taxes', clientData.savingsExpenses.taxes, 'Taxes');
    setIfExists('other-expenses', clientData.savingsExpenses.otherExpenses, 'Other Expenses');
    setIfExists('monthly-savings', clientData.savingsExpenses.monthlySavings, 'Monthly Savings');
    setIfExists('analysis-date', clientData.assumptions.analysisDate, 'Analysis Date');
    setIfExists('cash', clientData.other.cash, 'Cash');
    setIfExists('residence-mortgage', clientData.other.residenceMortgage, 'Residence/Mortgage');
    setIfExists('other-debt', clientData.other.otherDebt, 'Other Debt');
    setIfExists('c1-life-insurance', clientData.client1.insurance.lifeInsurance, 'Client 1 Life Insurance');
    setIfExists('c2-life-insurance', clientData.client2.insurance.lifeInsurance, 'Client 2 Life Insurance');
    setIfExists('c1-disability-insurance', clientData.client1.insurance.disabilityInsurance, 'Client 1 Disability Insurance');
    setIfExists('c2-disability-insurance', clientData.client2.insurance.disabilityInsurance, 'Client 2 Disability Insurance');
    setIfExists('c1-long-term-care', clientData.client1.insurance.longTermCare, 'Client 1 Long-Term Care');
    setIfExists('c2-long-term-care', clientData.client2.insurance.longTermCare, 'Client 2 Long-Term Care');

    ['c1', 'c2'].forEach(client => {
      const clientKey = client === 'c1' ? 'client1' : 'client2';
      const accounts = clientData[clientKey].accounts;
      const container = document.getElementById(`${client}-accounts`);
      if (!container) {
        console.log(`Container #${client}-accounts not found in current tab`);
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
      if (!container) {
        console.log(`Container #${client}-assets not found in current tab`);
        return;
      }

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

function tabClickHandler(e) {
  try {
    e.stopPropagation();
    e.preventDefault();
    console.log('Main tab clicked:', this.dataset.tab);
    inputTabs.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    inputContent.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = content.id === this.dataset.tab ? 'block' : 'none';
    });
    if (currentAnalysis === 'retirement-accumulation' || currentAnalysis === 'client-profile') {
      setupAgeDisplayListeners(getAge);
    }
    updateOutputs();
    if (currentAnalysis !== 'client-profile') {
      setTimeout(updateGraph, 100);
    }
    if (currentAnalysis === 'client-profile') {
      setupSubTabSwitching();
    }
  } catch (error) {
    console.error('Error in tabClickHandler:', error);
  }
}

// Sub-tab switching for Client Profile
function setupSubTabSwitching() {
  try {
    const subTabs = document.querySelectorAll('.sub-tab-btn:not(.topic-btn)');
    if (!subTabs.length) {
      console.warn('No sub-tab buttons found for Client Profile');
      return;
    }
    subTabs.forEach(button => {
      button.removeEventListener('click', subTabClickHandler);
      button.addEventListener('click', subTabClickHandler);
    });
  } catch (error) {
    console.error('Error in setupSubTabSwitching:', error);
  }
}

function subTabClickHandler(e) {
  try {
    e.stopPropagation();
    e.preventDefault();
    console.log('Sub-tab clicked:', this.dataset.subTab);
    if (currentAnalysis !== 'client-profile') {
      console.warn('currentAnalysis unexpectedly changed to:', currentAnalysis);
      currentAnalysis = 'client-profile';
      document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
      const clientProfileBtn = document.querySelector('.topic-btn[data-analysis="client-profile"]');
      if (clientProfileBtn) clientProfileBtn.classList.add('active');
    }
    document.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.sub-tab-content').forEach(content => {
      content.style.display = 'none';
    });
    this.classList.add('active');
    const subTabContent = document.getElementById(this.dataset.subTab);
    if (subTabContent) {
      subTabContent.style.display = 'block';
    } else {
      console.warn(`Sub-tab content #${this.dataset.subTab} not found`);
    }
    populateInputFields();
    setupAgeDisplayListeners(getAge);
    setupAddButtons();
  } catch (error) {
    console.error('Error in subTabClickHandler:', error);
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
        saveClientData();
        clientData.scenarios.base = null;
        clearTimeout(graphTimeout);
        graphTimeout = setTimeout(() => {
          updateOutputs();
          if (currentAnalysis !== 'client-profile') {
            updateGraph();
          }
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
        clientData.scenarios = { base: null, whatIf: [] };
        updateOutputs();
        if (currentAnalysis !== 'client-profile') {
          setTimeout(updateGraph, 100);
        }
        setupOutputTabSwitching();
        if (currentAnalysis === 'retirement-accumulation' || currentAnalysis === 'client-profile') {
          setupAgeDisplayListeners(getAge);
        }
      }
    });

    document.addEventListener('addToPresentationToggle', (e) => {
      const { reportId, reportTitle } = e.detail;
      toggleReportSelection(reportId, reportTitle);
      updateOutputs();
    });
  } catch (error) {
    console.error('Error in setupEventDelegation:', error);
  }
}

// Setup What If scenario controls
function setupWhatIfControls() {
  try {
    const graphTypeSelect = document.getElementById('graph-type');
    const saveBaseCaseBtn = document.getElementById('save-base-case');
    const applyScenarioBtn = document.getElementById('apply-scenario');
    const resetScenarioBtn = document.getElementById('reset-scenario');
    const scenarioNameInput = document.getElementById('scenario-name');
    const scenariosList = document.getElementById('scenarios-list');
    const comparisonTableBody = document.getElementById('comparison-table-body');

    let previewData = JSON.parse(JSON.stringify(clientData));
    let debounceTimeout;

    // Helper to update graph with preview data
    const updateGraphWithPreview = () => {
      if (document.getElementById('output-select').value !== 'retirement-analysis') return;
      if (chartInstance) chartInstance.destroy();
      const outputType = graphTypeSelect.value;
      chartInstance = updateRetirementGraph(
        document.getElementById('analysis-chart'),
        clientData,
        Chart,
        getAge,
        outputType,
        outputType === 'balance' ? previewData : null
      );
    };

    // Helper to update comparison table
    const updateComparisonTable = () => {
      const selectedScenarios = Array.from(scenariosList.selectedOptions).map(opt => opt.value);
      comparisonTableBody.innerHTML = '';
      if (clientData.scenarios.base && (selectedScenarios.includes('base') || selectedScenarios.length === 0)) {
        comparisonTableBody.innerHTML += `
          <tr>
            <td>${clientData.scenarios.base.name}</td>
            <td>${formatCurrency(clientData.scenarios.base.data.totalBalance)}</td>
            <td>${clientData.scenarios.base.data.depletionAge > clientData.scenarios.base.data.labels[clientData.scenarios.base.data.labels.length - 1] ? 'N/A' : clientData.scenarios.base.data.depletionAge}</td>
            <td>${formatCurrency(clientData.scenarios.base.data.totalShortfall)}</td>
          </tr>
        `;
      }
      clientData.scenarios.whatIf.forEach((scenario, index) => {
        if (selectedScenarios.includes(index.toString())) {
          comparisonTableBody.innerHTML += `
            <tr>
              <td>${scenario.name}</td>
              <td>${formatCurrency(scenario.data.totalBalance)}</td>
              <td>${scenario.data.depletionAge > scenario.data.labels[scenario.data.labels.length - 1] ? 'N/A' : scenario.data.depletionAge}</td>
              <td>${formatCurrency(scenario.data.totalShortfall)}</td>
            </tr>
          `;
        }
      });
    };

    // Graph type toggle
    if (graphTypeSelect) {
      graphTypeSelect.addEventListener('change', () => {
        updateGraphWithPreview();
      });
    }

    // Save Base Case
    if (saveBaseCaseBtn) {
      saveBaseCaseBtn.addEventListener('click', () => {
        clientData.scenarios.base = {
          name: 'Base Case',
          data: calculateRetirementIncome(clientData, getAge)
        };
        scenariosList.innerHTML = `<option value="base" selected>Base Case</option>` + clientData.scenarios.whatIf.map((s, i) => `<option value="${i}" selected>${s.name}</option>`).join('');
        saveClientData();
        updateComparisonTable();
        updateGraphWithPreview();
      });
    }

    // Apply Scenario
    if (applyScenarioBtn && scenarioNameInput) {
      applyScenarioBtn.addEventListener('click', () => {
        const scenarioName = scenarioNameInput.value.trim() || `Scenario ${clientData.scenarios.whatIf.length + 1}`;
        if (clientData.scenarios.whatIf.length >= 5) {
          alert('Maximum 5 scenarios allowed.');
          return;
        }
        clientData.scenarios.whatIf.push({
          name: scenarioName,
          data: calculateRetirementIncome(previewData, getAge)
        });
        scenariosList.innerHTML = (clientData.scenarios.base ? `<option value="base" selected>Base Case</option>` : '') +
                                  clientData.scenarios.whatIf.map((s, i) => `<option value="${i}" selected>${s.name}</option>`).join('');
        scenarioNameInput.value = '';
        saveClientData();
        updateComparisonTable();
        updateGraphWithPreview();
      });
    }

    // Reset to Base Case
    if (resetScenarioBtn) {
      resetScenarioBtn.addEventListener('click', () => {
        if (clientData.scenarios.base) {
          previewData = JSON.parse(JSON.stringify(clientData));
          // Reset sliders to Base Case values
          const sliders = [
            { id: 'c1-retirement-age', value: clientData.client1.personal.retirementAge || 65, unit: 'years' },
            { id: 'c2-retirement-age', value: clientData.isMarried ? clientData.client2.personal.retirementAge || 65 : 65, unit: 'years', skip: !clientData.isMarried },
            { id: 'c1-social-security', value: clientData.client1.incomeSources.socialSecurity || 0, unit: '$' },
            { id: 'c2-social-security', value: clientData.isMarried ? clientData.client2.incomeSources.socialSecurity || 0 : 0, unit: '$', skip: !clientData.isMarried },
            { id: 'monthly-contribution', value: Math.round((clientData.client1.accounts.reduce((sum, acc) => sum + (parseFloat(acc.contribution) || 0), 0) + (clientData.isMarried ? clientData.client2.accounts.reduce((sum, acc) => sum + (parseFloat(acc.contribution) || 0), 0) : 0)) / 12), unit: '$' },
            { id: 'ror', value: clientData.client1.accounts[0]?.ror || 6, unit: '%' },
            { id: 'ror-retirement', value: clientData.assumptions.rorRetirement || 4, unit: '%' },
            { id: 'monthly-income', value: clientData.incomeNeeds.monthly || 5000, unit: '$' },
            { id: 'inflation', value: clientData.assumptions.inflation || 2, unit: '%' },
            { id: 'c1-mortality-age', value: clientData.assumptions.c1MortalityAge || 90, unit: 'years' },
            { id: 'c2-mortality-age', value: clientData.isMarried ? clientData.assumptions.c2MortalityAge || 90 : 90, unit: 'years', skip: !clientData.isMarried }
          ];
          sliders.forEach(slider => {
            if (slider.skip) return;
            const rangeInput = document.getElementById(`${slider.id}-slider`);
            const numberInput = document.getElementById(`${slider.id}-number`);
            const valueSpan = document.getElementById(`${slider.id}-value`);
            if (rangeInput && numberInput && valueSpan) {
              rangeInput.value = slider.value;
              numberInput.value = slider.value;
              valueSpan.textContent = `${slider.unit === '$' ? '$' : ''}${slider.value}${slider.unit === '%' || slider.unit === 'years' ? slider.unit : ''}`;
            }
          });
          updateGraphWithPreview();
        }
      });
    }

    // Scenario selection
    if (scenariosList) {
      scenariosList.addEventListener('change', () => {
        updateComparisonTable();
        updateGraphWithPreview();
      });
    }

    // Slider event listeners
    const sliders = [
      { id: 'c1-retirement-age', path: ['client1', 'personal', 'retirementAge'], unit: 'years' },
      { id: 'c2-retirement-age', path: ['client2', 'personal', 'retirementAge'], unit: 'years', skip: !clientData.isMarried },
      { id: 'c1-social-security', path: ['client1', 'incomeSources', 'socialSecurity'], unit: '$' },
      { id: 'c2-social-security', path: ['client2', 'incomeSources', 'socialSecurity'], unit: '$', skip: !clientData.isMarried },
      { id: 'monthly-contribution', path: null, unit: '$' }, // Special case
      { id: 'ror', path: null, unit: '%' }, // Special case
      { id: 'ror-retirement', path: ['assumptions', 'rorRetirement'], unit: '%' },
      { id: 'monthly-income', path: ['incomeNeeds', 'monthly'], unit: '$' },
      { id: 'inflation', path: ['assumptions', 'inflation'], unit: '%' },
      { id: 'c1-mortality-age', path: ['assumptions', 'c1MortalityAge'], unit: 'years' },
      { id: 'c2-mortality-age', path: ['assumptions', 'c2MortalityAge'], unit: 'years', skip: !clientData.isMarried }
    ];

    sliders.forEach(slider => {
      if (slider.skip) return;
      const rangeInput = document.getElementById(`${slider.id}-slider`);
      const numberInput = document.getElementById(`${slider.id}-number`);
      const valueSpan = document.getElementById(`${slider.id}-value`);

      if (rangeInput && numberInput && valueSpan) {
        const updatePreview = () => {
          const value = parseFloat(rangeInput.value);
          if (slider.id === 'monthly-contribution') {
            const annualContribution = value * 12;
            const accountCount = clientData.client1.accounts.length + (clientData.isMarried ? clientData.client2.accounts.length : 0);
            const contributionPerAccount = accountCount > 0 ? annualContribution / accountCount : 0;
            previewData.client1.accounts = previewData.client1.accounts.map(acc => ({
              ...acc,
              contribution: contributionPerAccount.toString()
            }));
            if (clientData.isMarried) {
              previewData.client2.accounts = previewData.client2.accounts.map(acc => ({
                ...acc,
                contribution: contributionPerAccount.toString()
              }));
            }
          } else if (slider.id === 'ror') {
            previewData.client1.accounts = previewData.client1.accounts.map(acc => ({
              ...acc,
              ror: value.toString()
            }));
            if (clientData.isMarried) {
              previewData.client2.accounts = previewData.client2.accounts.map(acc => ({
                ...acc,
                ror: value.toString()
              }));
            }
          } else {
            let target = previewData;
            for (let i = 0; i < slider.path.length - 1; i++) {
              target = target[slider.path[i]];
            }
            target[slider.path[slider.path.length - 1]] = value.toString();
          }
          valueSpan.textContent = `${slider.unit === '$' ? '$' : ''}${value}${slider.unit === '%' || slider.unit === 'years' ? slider.unit : ''}`;
          clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(updateGraphWithPreview, 500);
        };

        rangeInput.addEventListener('input', () => {
          numberInput.value = rangeInput.value;
          updatePreview();
        });

        numberInput.addEventListener('input', () => {
          const value = Math.max(parseFloat(numberInput.min), Math.min(parseFloat(numberInput.max), parseFloat(numberInput.value) || 0));
          rangeInput.value = value;
          numberInput.value = value;
          updatePreview();
        });
      }
    });
  } catch (error) {
    console.error('Error in setupWhatIfControls:', error);
  }
}

// Toggle Client 2 visibility
function toggleClient2(e) {
  try {
    clientData.isMarried = e.target.checked;
    console.log('isMarried toggled:', clientData.isMarried);
    const client2Section = document.getElementById('client2-section');
    const client2IncomeSection = document.getElementById('client2-income-section');
    const client2Accounts = document.getElementById('c2-accounts');
    const client2Assets = document.getElementById('c2-assets');
    const displayStyle = clientData.isMarried ? 'block' : 'none';
    if (client2Section) client2Section.style.display = displayStyle;
    if (client2IncomeSection) client2IncomeSection.style.display = displayStyle;
    if (client2Accounts) client2Accounts.style.display = displayStyle;
    if (client2Assets) client2Assets.style.display = displayStyle;
  } catch (error) {
    console.error('Error in toggleClient2:', error);
  }
}

// Update client data from inputs
function updateClientData(e) {
  try {
    const input = e.target;
    const id = input.id;
    console.log(`Updating clientData for ${id}: ${input.value}`);

    const updateNested = (obj, path, value) => {
      let current = obj;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
    };

    const updateAccounts = (client, index, field, value) => {
      const clientKey = client === 'c1' ? 'client1' : 'client2';
      if (!clientData[clientKey].accounts[index]) {
        clientData[clientKey].accounts[index] = { name: '', balance: '0', contribution: '0', employerMatch: '0', ror: '0' };
      }
      clientData[clientKey].accounts[index][field] = value;
    };

    const updateAssets = (client, index, field, value) => {
      const clientKey = client === 'c1' ? 'client1' : 'client2';
      if (!clientData[clientKey].other.assets[index]) {
        clientData[clientKey].other.assets[index] = { name: '', balance: '0', ror: '0', debt: '0' };
      }
      clientData[clientKey].other.assets[index][field] = value;
    };

    const mappings = [
      { regex: /^c1-name$/, path: ['client1', 'personal', 'name'] },
      { regex: /^c2-name$/, path: ['client2', 'personal', 'name'] },
      { regex: /^c1-dob$/, path: ['client1', 'personal', 'dob'] },
      { regex: /^c2-dob$/, path: ['client2', 'personal', 'dob'] },
      { regex: /^c1-retirement-age$/, path: ['client1', 'personal', 'retirementAge'] },
      { regex: /^c2-retirement-age$/, path: ['client2', 'personal', 'retirementAge'] },
      { regex: /^c1-employment$/, path: ['client1', 'incomeSources', 'employment'] },
      { regex: /^c2-employment$/, path: ['client2', 'incomeSources', 'employment'] },
      { regex: /^c1-social-security$/, path: ['client1', 'incomeSources', 'socialSecurity'] },
      { regex: /^c2-social-security$/, path: ['client2', 'incomeSources', 'socialSecurity'] },
      { regex: /^c1-other-income$/, path: ['client1', 'incomeSources', 'other'] },
      { regex: /^c2-other-income$/, path: ['client2', 'incomeSources', 'other'] },
      { regex: /^c1-interest-dividends$/, path: ['client1', 'incomeSources', 'interestDividends'] },
      { regex: /^c2-interest-dividends$/, path: ['client2', 'incomeSources', 'interestDividends'] },
      { regex: /^monthly-income$/, path: ['incomeNeeds', 'monthly'] },
      { regex: /^mortality-age$/, path: ['assumptions', 'mortalityAge'] },
      { regex: /^c1-mortality-age$/, path: ['assumptions', 'c1MortalityAge'] },
      { regex: /^c2-mortality-age$/, path: ['assumptions', 'c2MortalityAge'] },
      { regex: /^inflation$/, path: ['assumptions', 'inflation'] },
      { regex: /^ror-retirement$/, path: ['assumptions', 'rorRetirement'] },
      { regex: /^household-expenses$/, path: ['savingsExpenses', 'householdExpenses'] },
      { regex: /^taxes$/, path: ['savingsExpenses', 'taxes'] },
      { regex: /^other-expenses$/, path: ['savingsExpenses', 'otherExpenses'] },
      { regex: /^monthly-savings$/, path: ['savingsExpenses', 'monthlySavings'] },
      { regex: /^analysis-date$/, path: ['assumptions', 'analysisDate'] },
      { regex: /^cash$/, path: ['other', 'cash'] },
      { regex: /^residence-mortgage$/, path: ['other', 'residenceMortgage'] },
      { regex: /^other-debt$/, path: ['other', 'otherDebt'] },
      { regex: /^c1-life-insurance$/, path: ['client1', 'insurance', 'lifeInsurance'] },
      { regex: /^c2-life-insurance$/, path: ['client2', 'insurance', 'lifeInsurance'] },
      { regex: /^c1-disability-insurance$/, path: ['client1', 'insurance', 'disabilityInsurance'] },
      { regex: /^c2-disability-insurance$/, path: ['client2', 'insurance', 'disabilityInsurance'] },
      { regex: /^c1-long-term-care$/, path: ['client1', 'insurance', 'longTermCare'] },
      { regex: /^c2-long-term-care$/, path: ['client2', 'insurance', 'longTermCare'] },
      { regex: /^(c[1-2])-account-(\d+)-name$/, handler: (match) => updateAccounts(match[1], parseInt(match[2]), 'name', input.value) },
      { regex: /^(c[1-2])-account-(\d+)-balance$/, handler: (match) => updateAccounts(match[1], parseInt(match[2]), 'balance', input.value) },
      { regex: /^(c[1-2])-account-(\d+)-contribution$/, handler: (match) => updateAccounts(match[1], parseInt(match[2]), 'contribution', input.value) },
      { regex: /^(c[1-2])-account-(\d+)-employer-match$/, handler: (match) => updateAccounts(match[1], parseInt(match[2]), 'employerMatch', input.value) },
      { regex: /^(c[1-2])-account-(\d+)-ror$/, handler: (match) => updateAccounts(match[1], parseInt(match[2]), 'ror', input.value) },
      { regex: /^(c[1-2])-asset-(\d+)-name$/, handler: (match) => updateAssets(match[1], parseInt(match[2]), 'name', input.value) },
      { regex: /^(c[1-2])-asset-(\d+)-balance$/, handler: (match) => updateAssets(match[1], parseInt(match[2]), 'balance', input.value) },
      { regex: /^(c[1-2])-asset-(\d+)-ror$/, handler: (match) => updateAssets(match[1], parseInt(match[2]), 'ror', input.value) },
      { regex: /^(c[1-2])-asset-(\d+)-debt$/, handler: (match) => updateAssets(match[1], parseInt(match[2]), 'debt', input.value) }
    ];

    for (const mapping of mappings) {
      if (mapping.regex.test(id)) {
        if (mapping.handler) {
          mapping.handler(id.match(mapping.regex));
        } else {
          updateNested(clientData, mapping.path, input.value);
        }
        break;
      }
    }
  } catch (error) {
    console.error('Error in updateClientData:', error);
  }
}

// Setup add account/asset buttons
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
    const clientKey = client === 'c1' ? 'client1' : 'client2';
    const container = document.getElementById(`${client}-accounts`);
    const index = accountCount[client]++;
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
    clientData[clientKey].accounts.push({ name: '', balance: '0', contribution: '0', employerMatch: '0', ror: '0' });
    saveClientData();
    clientData.scenarios.base = null;
    updateOutputs();
    if (currentAnalysis !== 'client-profile') {
      setTimeout(updateGraph, 100);
    }
  } catch (error) {
    console.error('Error in addAccountHandler:', error);
  }
}

function addAssetHandler(e) {
  try {
    const client = e.target.dataset.client;
    const clientKey = client === 'c1' ? 'client1' : 'client2';
    const container = document.getElementById(`${client}-assets`);
    const index = assetCount[client]++;
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
    clientData[clientKey].other.assets.push({ name: '', balance: '0', ror: '0', debt: '0' });
    saveClientData();
    updateOutputs();
  } catch (error) {
    console.error('Error in addAssetHandler:', error);
  }
}

// Update outputs based on current analysis
function updateOutputs() {
  try {
    console.log(`Updating outputs for ${currentAnalysis}`);
    if (currentAnalysis === 'retirement-accumulation') {
      updateRetirementOutputs(analysisOutputs, clientData, formatCurrency, getAge, selectedReports, Chart);
    } else if (currentAnalysis === 'personal-finance') {
      updatePersonalFinanceOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, Chart);
    } else if (currentAnalysis === 'summary') {
      updateSummaryOutputs(analysisOutputs, clientData, formatCurrency, selectedReports);
    } else if (currentAnalysis === 'client-profile') {
      analysisOutputs.innerHTML = '<p class="output-message">Select a client profile tab to view details.</p>';
    } else {
      analysisOutputs.innerHTML = '<p class="output-message">Select an analysis topic to view outputs.</p>';
    }
    setupWhatIfControls();
  } catch (error) {
    console.error('Error in updateOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-error">Error rendering outputs. Please check console for details.</p>';
  }
}

// Update graph based on current analysis
function updateGraph() {
  try {
    console.log(`Updating graph for ${currentAnalysis}`);
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
    if (currentAnalysis === 'retirement-accumulation') {
      const outputSelect = document.getElementById('output-select');
      if (outputSelect?.value === 'retirement-analysis') {
        const graphType = document.getElementById('graph-type')?.value || 'income';
        chartInstance = updateRetirementGraph(
          document.getElementById('analysis-chart'),
          clientData,
          Chart,
          getAge,
          graphType
        );
      }
    } else if (currentAnalysis === 'personal-finance') {
      chartInstance = updatePersonalFinanceGraph(
        document.getElementById('analysis-chart'),
        clientData,
        Chart
      );
    }
  } catch (error) {
    console.error('Error in updateGraph:', error);
  }
}

// Setup output tab switching
function setupOutputTabSwitching() {
  try {
    const outputSelect = document.getElementById('output-select');
    if (outputSelect) {
      outputSelect.removeEventListener('change', outputSelectHandler);
      outputSelect.addEventListener('change', outputSelectHandler);
    }
  } catch (error) {
    console.error('Error in setupOutputTabSwitching:', error);
  }
}

function outputSelectHandler() {
  try {
    document.querySelectorAll('.output-content').forEach(content => {
      content.style.display = content.id === this.value ? 'block' : 'none';
    });
    if (this.value === 'retirement-analysis' && currentAnalysis === 'retirement-accumulation') {
      setTimeout(updateGraph, 100);
    }
  } catch (error) {
    console.error('Error in outputSelectHandler:', error);
  }
}

// Toggle report selection for presentation
function toggleReportSelection(reportId, reportTitle) {
  try {
    const index = selectedReports.findIndex(report => report.id === reportId);
    if (index === -1) {
      selectedReports.push({ id: reportId, title: reportTitle });
    } else {
      selectedReports.splice(index, 1);
    }
    reportCount = selectedReports.length;
    presentationCount.textContent = reportCount;
    presentationCount.classList.toggle('active', reportCount > 0);
    localStorage.setItem('selectedReports', JSON.stringify(selectedReports));
    console.log('Updated selectedReports:', selectedReports);
  } catch (error) {
    console.error('Error in toggleReportSelection:', error);
  }
}

// Helper functions
function getAge(dob) {
  try {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  } catch (error) {
    console.error('Error in getAge:', error);
    return 0;
  }
}

function formatCurrency(value) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
  } catch (error) {
    console.error('Error in formatCurrency:', error);
    return value;
  }
}

function updateClientFileName() {
  try {
    const selectedClient = clients.find(client => client.id === selectedClientId);
    if (selectedClient) {
      clientFileName.textContent = selectedClient.name;
    }
  } catch (error) {
    console.error('Error in updateClientFileName:', error);
  }
}
