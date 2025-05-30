import { retirementAccumulationTabs, updateRetirementGraph, updateRetirementOutputs, setupAgeDisplayListeners } from './retirementAccumulation.js';
import { personalFinanceTabs, updatePersonalFinanceGraph, updatePersonalFinanceOutputs } from './personalFinance.js';
import { summaryTabs, updateSummaryOutputs } from './summary.js';
import { clientProfileTabs } from './clientProfile.js';

// === Data Structures ===
let clientData = {
  client1: {
    personal: { name: "Paul Johnson", dob: "1980-01-01", retirementAge: "67" },
    incomeSources: { employment: "65000", socialSecurity: "2000", other: "500", interestDividends: "1000" },
    accounts: [{ name: "401(k)", balance: "100000", contribution: "10000", employerMatch: "3", ror: "6" }],
    other: { assets: [{ name: "Rental Property", balance: "200000", ror: "4", debt: "50000" }] },
    insurance: { lifeInsurance: "0", disabilityInsurance: "0", longTermCare: "0" }
  },
  client2: {
    personal: { name: "Sally Johnson", dob: "1982-01-01", retirementAge: "67" },
    incomeSources: { employment: "50000", socialSecurity: "1500", other: "300", interestDividends: "800" },
    accounts: [{ name: "IRA", balance: "80000", contribution: "8000", employerMatch: "0", ror: "6" }],
    other: { assets: [] },
    insurance: { lifeInsurance: "0", disabilityInsurance: "0", longTermCare: "0" }
  },
  isMarried: false,
  incomeNeeds: {
    monthlyincomeinitial: { initial: "5000" },
    yearsafterretirement1: { yearsafter1: "5" },
    monthlyincome1: { monthly1: "4500" },
    yearsafterretirement2: { yearsafter2: "10" },
    monthlyincome2: { monthly2: "4000" }
  },
  assumptions: { 
    mortalityAge: "90", 
    c1MortalityAge: "90", 
    c2MortalityAge: "90", 
    inflation: "3", 
    rorRetirement: "4", 
    analysisDate: "2025-05-06" 
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

const clients = [
  { id: 1, name: "Paul Johnson", data: clientData.client1 },
  { id: 2, name: "Sally Johnson", data: clientData.client2 }
];

const analysisTopicsList = [
  { id: 'client-profile', label: 'Client Profile', group: 'Client Info' },
  { id: 'summary', label: 'Summary', group: 'Client Info' },
  { id: 'education-funding', label: 'Education Funding', group: 'Investments' },
  { id: 'survivor-needs', label: 'Survivor Needs', group: 'Insurance' },
  { id: 'retirement-accumulation', label: 'Retirement Accumulation', group: 'Retirement' },
  { id: 'retirement-distribution', label: 'Retirement Distribution', group: 'Retirement' },
  { id: 'social-security', label: 'Social Security', group: 'Retirement' },
  { id: 'disability-income-needs', label: 'Disability Income Needs', group: 'Insurance' },
  { id: 'critical-illness', label: 'Critical Illness', group: 'Insurance' },
  { id: 'long-term-care-needs', label: 'Long-Term Care Needs', group: 'Insurance' },
  { id: 'estate-analysis', label: 'Estate Analysis', group: 'Investments' },
  { id: 'accumulation-funding', label: 'Accumulation Funding', group: 'Investments' },
  { id: 'asset-allocation', label: 'Asset Allocation', group: 'Investments' },
  { id: 'charitable-remainder-trust', label: 'Charitable Remainder Trust', group: 'Investments' },
  { id: 'personal-finance', label: 'Personal Finance', group: 'Investments' },
  { id: 'debt-repayment', label: 'Debt Repayment', group: 'Investments' },
  { id: 'business-continuation', label: 'Business Continuation', group: 'Other' },
  { id: 'key-employee', label: 'Key Employee', group: 'Other' }
];

// === State Variables ===
let accountCount = { c1: 1, c2: 1 };
let assetCount = { c1: 1, c2: 0 };
let currentAnalysis = 'retirement-accumulation';
let reportCount = 0;
let selectedReports = [];
let isTyping = false;
let selectedClientId = 1;
let chartInstance = null;

// === DOM Elements ===
const analysisTopics = document.querySelector('.analysis-topics-container');
const inputTabs = document.querySelector('.input-tabs');
const inputContent = document.querySelector('.input-content');
const recalculateBtn = document.getElementById('recalculate-btn');
const exportGraphBtn = document.getElementById('export-graph-btn');
const clientFileName = document.getElementById('client-file-name');
const presentationCount = document.getElementById('presentation-count');
const analysisOutputs = document.getElementById('analysis-outputs');
const outputTabsContainer = document.getElementById('output-tabs-container');
const analysisWorkspace = document.querySelector('.analysis-workspace');
const clientModal = document.getElementById('client-modal');
const closeModalBtn = document.getElementById('close-modal');
const clientList = document.getElementById('client-list');
const clientSearch = document.getElementById('client-search');

// === Initialization ===
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('Initializing page...');
    loadClientData();
    loadSelectedReports();
    console.log('Chart.js available:', typeof Chart !== 'undefined');
    console.log('chartCanvas:', document.getElementById('analysis-chart'));

    // Check for editReportId and editReportType
    const editReportId = localStorage.getItem('editReportId');
    const editReportType = localStorage.getItem('editReportType');
    if (editReportId && editReportType) {
      // Map editReportType to analysis topic and output
      if (editReportType === 'retirement-accumulation') {
        currentAnalysis = 'retirement-accumulation';
      } else if (editReportType === 'retirement-timeline') {
        currentAnalysis = 'retirement-accumulation'; // Timeline is an output under accumulation
      } else if (editReportType === 'personal-finance') {
        currentAnalysis = 'personal-finance';
      } else if (editReportType === 'summary') {
        currentAnalysis = 'summary';
      }
      const select = document.getElementById('analysis-topic-select');
      if (select) {
        select.value = currentAnalysis;
      }
    }

    populateAnalysisTopics();
    updateTabs(currentAnalysis);
    populateClientList();
    updateClientFileName();
    setupEventDelegation();
    
    // Set output-select for editReportType
    const outputSelect = document.getElementById('output-select');
    if (editReportId && editReportType && outputSelect) {
      if (editReportType === 'retirement-timeline') {
        outputSelect.value = 'output-retirement-timeline'; // Adjust to match your option value
      } else if (editReportType === 'retirement-accumulation') {
        outputSelect.value = 'output-graph';
      } else if (editReportType === 'personal-finance') {
        outputSelect.value = 'output-graph';
      } else if (editReportType === 'summary') {
        outputSelect.value = 'output-summary';
      }
      // Trigger change event
      const event = new Event('change');
      outputSelect.dispatchEvent(event);
    }

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
    }, 100);
    setupProfileDropdown();

    // Clear editReportId and editReportType
    localStorage.removeItem('editReportId');
    localStorage.removeItem('editReportType');
  } catch (error) {
    console.error('Initialization error:', error);
    analysisOutputs.innerHTML = '<p class="output-error">Error initializing page. Please check console for details.</p>';
  }
});

// === Local Storage Management ===
function loadClientData() {
  try {
    const savedData = localStorage.getItem('clientData');
    if (savedData) {
      clientData = JSON.parse(savedData);
      ['client1', 'client2'].forEach(clientKey => {
        clientData[clientKey].insurance = clientData[clientKey].insurance || {
          lifeInsurance: 0,
          disabilityInsurance: 0,
          longTermCare: 0
        };
        clientData[clientKey].insurance.lifeInsurance = parseFloat(clientData[clientKey].insurance.lifeInsurance) || 0;
        clientData[clientKey].insurance.disabilityInsurance = parseFloat(clientData[clientKey].insurance.disabilityInsurance) || 0;
        clientData[clientKey].insurance.longTermCare = parseFloat(clientData[clientKey].insurance.longTermCare) || 0;
        clientData[clientKey].accounts = clientData[clientKey].accounts.map(account => ({
          name: account.name || `Account ${clientData[clientKey].accounts.indexOf(account) + 1}`,
          balance: parseFloat(account.balance) || 0,
          contribution: parseFloat(account.contribution) || 0,
          employerMatch: parseFloat(account.employerMatch) || 0,
          ror: parseFloat(account.ror) || 6
        }));
      });
      clientData.assumptions.c1MortalityAge = parseInt(clientData.assumptions.c1MortalityAge) || parseInt(clientData.assumptions.mortalityAge) || 90;
      clientData.assumptions.c2MortalityAge = parseInt(clientData.assumptions.c2MortalityAge) || parseInt(clientData.assumptions.mortalityAge) || 90;
      clientData.assumptions.inflation = parseFloat(clientData.assumptions.inflation) || 3;
      clientData.assumptions.rorRetirement = parseFloat(clientData.assumptions.rorRetirement) || 4;
      clientData.scenarios = clientData.scenarios || { base: null, whatIf: [] };
      clientData.incomeNeeds = {
        monthlyincomeinitial: { initial: clientData.incomeNeeds.initial || "5000" },
        yearsafterretirement1: { yearsafter1: clientData.incomeNeeds.yearsafter1 || "5" },
        monthlyincome1: { monthly1: clientData.incomeNeeds.monthly1 || "4500" },
        yearsafterretirement2: { yearsafter2: clientData.incomeNeeds.yearsafter2 || "10" },
        monthlyincome2: { monthly2: clientData.incomeNeeds.monthly2 || "4000" }
      };
    }
    console.log('Loaded clientData:', clientData);
  } catch (error) {
    console.error('Error in loadClientData:', error);
  }
}

function loadSelectedReports() {
  try {
    const savedReports = localStorage.getItem('selectedReports');
    if (savedReports) {
      selectedReports = JSON.parse(savedReports);
      reportCount = selectedReports.length;
      presentationCount.textContent = reportCount;
      presentationCount.classList.toggle('active', reportCount > 0);
    }
  } catch (error) {
    console.error('Error in loadSelectedReports:', error);
  }
}

function saveClientData() {
  try {
    localStorage.setItem('clientData', JSON.stringify(clientData));
    console.log('Saved clientData to localStorage:', clientData);
  } catch (error) {
    console.error('Error in saveClientData:', error);
  }
}

// Save chart configuration to localStorage
function saveChartConfig(analysisType, chartInstance) {
  try {
    if (chartInstance) {
      const chartConfig = {
        type: chartInstance.config.type,
        data: chartInstance.data,
        options: chartInstance.options
      };
      const key = analysisType === 'retirement-timeline' ? 'retirement-accumulation-timeline' : analysisType;
      localStorage.setItem(`chartConfig_${key}`, JSON.stringify(chartConfig));
      console.log(`Saved chart config for ${key}:`, chartConfig);
    }
  } catch (error) {
    console.error('Error in saveChartConfig:', error);
  }
}

// Load chart configuration from localStorage
function loadChartConfig(analysisType) {
  try {
    const key = analysisType === 'retirement-timeline' ? 'retirement-accumulation-timeline' : analysisType;
    const savedConfig = localStorage.getItem(`chartConfig_${key}`);
    return savedConfig ? JSON.parse(savedConfig) : null;
  } catch (error) {
    console.error('Error in loadChartConfig:', error);
    return null;
  }
}


// === UI Population Functions ===
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

function populateAnalysisTopics() {
  try {
    const select = document.getElementById('analysis-topic-select');
    if (!select) {
      console.error('Analysis topic select element not found');
      return;
    }
    select.innerHTML = '';
    const groups = [
      { name: 'Client Info', topics: [] },
      { name: 'Retirement', topics: [] },
      { name: 'Insurance', topics: [] },
      { name: 'Investments', topics: [] },
      { name: 'Other', topics: [] }
    ];
    analysisTopicsList.forEach(topic => {
      const group = groups.find(g => g.name === topic.group);
      if (group) group.topics.push(topic);
    });
    groups.forEach(group => {
      if (group.topics.length > 0) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = group.name;
        group.topics.forEach(topic => {
          const option = document.createElement('option');
          option.value = topic.id;
          option.textContent = topic.label;
          if (topic.id === currentAnalysis) option.selected = true;
          optgroup.appendChild(option);
        });
        select.appendChild(optgroup);
      }
    });
    select.addEventListener('change', (e) => {
      e.stopPropagation();
      console.log('Analysis topic selected:', e.target.value);
      currentAnalysis = e.target.value;
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
    });
  } catch (error) {
    console.error('Error in populateAnalysisTopics:', error);
  }
}

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
    setIfExists('monthly-income-initial', clientData.incomeNeeds.monthlyincomeinitial.initial, 'Monthly Income Initial');
    setIfExists('years-after-retirement-1', clientData.incomeNeeds.yearsafterretirement1.yearsafter1, 'Years After Retirement 1');
    setIfExists('monthly-income-1', clientData.incomeNeeds.monthlyincome1.monthly1, 'Monthly Income 1');
    setIfExists('years-after-retirement-2', clientData.incomeNeeds.yearsafterretirement2.yearsafter2, 'Years After Retirement 2');
    setIfExists('monthly-income-2', clientData.incomeNeeds.monthlyincome2.monthly2, 'Monthly Income 2');
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

// === Event Listeners ===
function setupClientModalListeners() {
  try {
    const clientModal = document.getElementById('client-modal');
    const clientList = document.getElementById('client-list');
    const clientSearch = document.getElementById('client-search');
    const clientFileName = document.getElementById('client-file-name');

    if (!clientModal || !clientList || !clientSearch || !clientFileName) {
      console.warn('Modal elements missing:', {
        clientModal: clientModal,
        clientList: clientList,
        clientSearch: clientSearch,
        clientFileName: clientFileName
      });
      return;
    }

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
      clientFileName.setAttribute('aria-expanded', 'false');
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

function setupProfileDropdown() {
  try {
    const profilePic = document.getElementById('profile-pic');
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (profilePic && dropdownMenu) {
      profilePic.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdownMenu.style.display === 'block';
        dropdownMenu.style.display = isOpen ? 'none' : 'block';
        profilePic.setAttribute('aria-expanded', !isOpen);
      });
      document.addEventListener('click', (e) => {
        if (!profilePic.contains(e.target) && !dropdownMenu.contains(e.target)) {
          dropdownMenu.style.display = 'none';
          profilePic.setAttribute('aria-expanded', 'false');
        }
      });
      document.getElementById('help-link').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Help: Please visit our support page for assistance.');
        dropdownMenu.style.display = 'none';
        profilePic.setAttribute('aria-expanded', 'false');
      });
      document.getElementById('settings-link').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Settings: User settings are not yet implemented.');
        dropdownMenu.style.display = 'none';
        profilePic.setAttribute('aria-expanded', 'false');
      });
      document.getElementById('logout-link').addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
          alert('Logging out...');
          window.location.href = '/login';
        }
        dropdownMenu.style.display = 'none';
        profilePic.setAttribute('aria-expanded', 'false');
      });
    } else {
      console.warn('Profile picture or dropdown menu elements not found.');
    }
  } catch (error) {
    console.error('Error in setupProfileDropdown:', error);
  }
}

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
      const select = document.getElementById('analysis-topic-select');
      if (select) select.value = 'client-profile';
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
    clientData.scenarios.base = null;
    updateOutputs();
    if (currentAnalysis !== 'client-profile') {
      setTimeout(updateGraph, 100);
    }
    if (currentAnalysis === 'retirement-accumulation' || currentAnalysis === 'client-profile') {
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
    clientData.scenarios.base = null;
    updateOutputs();
    if (currentAnalysis !== 'client-profile') {
      setTimeout(updateGraph, 100);
    }
    if (currentAnalysis === 'retirement-accumulation' || currentAnalysis === 'client-profile') {
      setupAgeDisplayListeners(getAge);
    }
  } catch (error) {
    console.error('Error in addAssetHandler:', error);
  }
}

// === Core Logic ===
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
      } else if (input.id === `${prefix}-interest-dividends`) {
        clientData[clientKey].incomeSources.interestDividends = value;
      } else if (input.id === `${prefix}-life-insurance`) {
        clientData[clientKey].insurance.lifeInsurance = value;
      } else if (input.id === `${prefix}-disability-insurance`) {
        clientData[clientKey].insurance.disabilityInsurance = value;
      } else if (input.id === `${prefix}-long-term-care`) {
        clientData[clientKey].insurance.longTermCare = value;
      } else if (input.id === `${prefix}-mortality-age`) {
        clientData.assumptions[`${prefix}MortalityAge`] = value;
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
      if (input.id === 'monthly-income-initial') clientData.incomeNeeds.monthlyincomeinitial.initial = value;
      else if (input.id === 'years-after-retirement-1') clientData.incomeNeeds.yearsafterretirement1.yearsafter1 = value;
      else if (input.id === 'monthly-income-1') clientData.incomeNeeds.monthlyincome1.monthly1 = value;
      else if (input.id === 'years-after-retirement-2') clientData.incomeNeeds.yearsafterretirement2.yearsafter2 = value;
      else if (input.id === 'monthly-income-2') clientData.incomeNeeds.monthlyincome2.monthly2 = value;
      else if (input.id === 'inflation') clientData.assumptions.inflation = value;
      else if (input.id === 'ror-retirement') clientData.assumptions.rorRetirement = value;
      else if (input.id === 'household-expenses') clientData.savingsExpenses.householdExpenses = value;
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

function updateGraph(previewData = null) {
  try {
    console.log('updateGraph called, currentAnalysis:', currentAnalysis);
    console.log('Chart.js available:', typeof Chart !== 'undefined');
    const chartCanvas = document.getElementById('analysis-chart');
    console.log('chartCanvas:', chartCanvas);
    const select = document.getElementById('output-select');
    const outputType = select ? select.value : 'output-graph';
    console.log('outputType:', outputType);
    const isGraphTabActive = outputType === 'output-graph' || outputType === 'output-retirement-timeline';
    console.log('isGraphTabActive:', isGraphTabActive, 'output-select value:', select?.value);
    if (!isGraphTabActive) {
      console.log('Skipping graph update: graph output is not selected');
      if (chartCanvas) chartCanvas.style.display = 'none';
      return;
    }
    if (typeof Chart === 'undefined') {
      console.error('Chart.js is not loaded.');
      analysisOutputs.innerHTML = '<p class="output-error">Chart.js is not loaded. Please check your network connection.</p>';
      return;
    }
    if (!chartCanvas) {
      console.error('Chart canvas #analysis-chart not found.');
      return;
    }
    if (chartInstance) {
      console.log('Destroying existing chartInstance');
      chartInstance.destroy();
      chartInstance = null;
    }
    if (Chart.getChart(chartCanvas)) {
      console.log('Destroying orphaned chart on canvas');
      Chart.getChart(chartCanvas).destroy();
    }
    if (!clientData) {
      console.error('clientData is undefined');
      analysisOutputs.innerHTML = '<p class="output-error">Client data is undefined. Please check your inputs.</p>';
      return;
    }
    const validationError = validateClientData();
    if (validationError) {
      console.error('Validation failed:', validationError);
      analysisOutputs.innerHTML = `<p class="output-error">${validationError}</p>`;
      return;
    }
    // Try to load saved chart config
    const configKey = outputType === 'output-retirement-timeline' ? 'retirement-accumulation-timeline' : currentAnalysis;
    const savedConfig = loadChartConfig(configKey);
    if (savedConfig && !previewData) {
      console.log('Using saved chart config for', configKey);
      chartInstance = new Chart(chartCanvas, savedConfig);
      chartCanvas.style.display = 'block';
    } else {
      if (currentAnalysis === 'retirement-accumulation') {
        console.log('Calling updateRetirementGraph');
        const graphType = outputType === 'output-retirement-timeline' ? 'timeline' : 'income';
        chartInstance = updateRetirementGraph(chartCanvas, clientData, Chart, getAge, graphType, previewData);
        console.log('updateRetirementGraph returned chartInstance:', chartInstance);
      } else if (currentAnalysis === 'personal-finance') {
        console.log('Calling updatePersonalFinanceGraph');
        chartInstance = updatePersonalFinanceGraph(chartCanvas, clientData, Chart);
        console.log('updatePersonalFinanceGraph returned chartInstance:', chartInstance);
      } else {
        console.warn(`No graph rendering for analysis type: ${currentAnalysis}`);
        chartCanvas.style.display = 'none';
        return;
      }
      // Save the new chart config
      if (chartInstance) {
        saveChartConfig(configKey, chartInstance);
      }
    }
    if (!chartInstance) {
      console.warn('No chart instance created');
      chartCanvas.style.display = 'none';
    } else {
      chartCanvas.style.display = 'block';
    }
  } catch (error) {
    console.error('Error in updateGraph:', error);
    analysisOutputs.innerHTML = '<p class="output-error">Error rendering graph. Please check console for details.</p>';
  }
}

function updateOutputs() {
  try {
    const activeTabBefore = document.querySelector('.output-tab-content.active')?.id || 'none';
    console.log('updateOutputs called, currentAnalysis:', currentAnalysis, 'activeTabBefore:', activeTabBefore);
    const validationError = validateClientData();
    if (validationError) {
      analysisOutputs.innerHTML = `<p class="output-error">${validationError}</p>`;
      if (outputTabsContainer) outputTabsContainer.innerHTML = '';
      return;
    }
    analysisOutputs.innerHTML = '';
    if (outputTabsContainer) outputTabsContainer.innerHTML = '';
    const outputSelect = document.getElementById('output-select');
    const outputType = outputSelect ? outputSelect.value : 'output-graph';
    
    if (currentAnalysis === 'retirement-accumulation') {
      if (outputType === 'output-retirement-timeline') {
        // Render timeline-specific outputs
        updateRetirementOutputs(analysisOutputs, clientData, formatCurrency, getAge, selectedReports, Chart, 'timeline');
      } else {
        updateRetirementOutputs(analysisOutputs, clientData, formatCurrency, getAge, selectedReports, Chart);
      }
    } else if (currentAnalysis === 'personal-finance') {
      updatePersonalFinanceOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, Chart);
    } else if (currentAnalysis === 'summary') {
      updateSummaryOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, Chart, getAge);
    } else if (currentAnalysis === 'client-profile') {
      analysisOutputs.innerHTML = '';
    } else {
      analysisOutputs.innerHTML = `<p class="output-card">Outputs not available for ${currentAnalysis}.</p>`;
    }
    // Sync checkbox states
    const checkboxes = document.querySelectorAll('input[type="checkbox"][data-report-id]');
    checkboxes.forEach(checkbox => {
      const reportId = checkbox.dataset.reportId;
      checkbox.checked = selectedReports.some(report => report.id === reportId);
    });
    // Ensure input tabs are visible
    inputTabs.style.display = 'block';
    inputContent.style.display = 'block';
    const activeTabAfter = document.querySelector('.output-tab-content.active')?.id || 'none';
    console.log('updateOutputs completed, activeTabAfter:', activeTabAfter);
  } catch (error) {
    console.error('Error in updateOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-error">Error rendering outputs. Please check console for details.</p>';
    if (outputTabsContainer) outputTabsContainer.innerHTML = '';
  }
}

// === Helper Functions ===
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

function toggleClient2(e) {
  try {
    clientData.isMarried = e.target.checked;
    document.getElementById('client2-section').style.display = e.target.checked ? 'block' : 'none';
    document.getElementById('client2-income-section').style.display = e.target.checked ? 'block' : 'none';
    document.getElementById('c2-accounts').style.display = e.target.checked ? 'block' : 'none';
    const c2Assets = document.getElementById('c2-assets');
    if (c2Assets) c2Assets.style.display = e.target.checked ? 'block' : 'none';
    const c2Insurance = document.getElementById('client2-insurance-section');
    if (c2Insurance) c2Insurance.style.display = e.target.checked ? 'block' : 'none';
    updateClientFileName();
    updateOutputs();
    if (currentAnalysis !== 'client-profile') {
      setTimeout(updateGraph, 100);
    }
  } catch (error) {
    console.error('Error in toggleClient2:', error);
  }
}

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

function validateClientData() {
  try {
    const errors = [];
    if (!clientData || !clientData.incomeNeeds) {
      errors.push("Income needs data is missing or incomplete.");
      return errors.join('<br>');
    }
    if (!clientData.client1.personal.name) errors.push("Client 1 name is required.");
    if (!clientData.client1.personal.dob || new Date(clientData.client1.personal.dob) > new Date()) {
      errors.push("Client 1 date of birth is invalid.");
    }
    if (!clientData.client1.personal.retirementAge || clientData.client1.personal.retirementAge < getAge(clientData.client1.personal.dob)) {
      errors.push("Client 1 retirement age must be greater than current age.");
    }
    if (clientData.isMarried) {
      if (!clientData.client2.personal.name) errors.push("Client 2 name is required when married.");
      if (!clientData.client2.personal.dob || new Date(clientData.client2.personal.dob) > new Date()) {
        errors.push("Client 2 date of birth is invalid.");
      }
      if (!clientData.client2.personal.retirementAge || clientData.client2.personal.retirementAge < getAge(clientData.client2.personal.dob)) {
        errors.push("Client 2 retirement age must be greater than current age.");
      }
    }
    const incomeNeeds = clientData.incomeNeeds;
    const isPositiveNumber = (value) => {
      const num = parseFloat(value);
      return !isNaN(num) && num > 0;
    };
    if (!clientData.assumptions.c1MortalityAge || clientData.assumptions.c1MortalityAge < 0) {
      errors.push("Client 1 mortality age must be a positive number.");
    }
    if (clientData.isMarried && (!clientData.assumptions.c2MortalityAge || clientData.assumptions.c2MortalityAge < 0)) {
      errors.push("Client 2 mortality age must be a positive number.");
    }
    if (clientData.assumptions.inflation == null || clientData.assumptions.inflation < 0) {
      errors.push("Inflation rate must be a non-negative number.");
    }
    if (clientData.assumptions.rorRetirement == null || clientData.assumptions.rorRetirement < 0) {
      errors.push("Rate of return in retirement must be a non-negative number.");
    }
    ['client1', 'client2'].forEach((clientKey, idx) => {
      const client = clientData[clientKey].accounts;
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
    if (currentAnalysis === 'summary') {
      if (!clientData.summary?.topics || clientData.summary.topics.length === 0) {
        errors.push("At least one topic must be selected for Financial Fitness Score.");
      }
    }
    return errors.length ? errors.join('<br>') : null;
  } catch (error) {
    console.error('Error in validateClientData:', error);
    return 'Error validating client data. Please check console for details.';
  }
}

function formatCurrency(value) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
  } catch (error) {
    console.error('Error in formatCurrency:', error);
    return '$0';
  }
}

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

function toggleReportSelection(reportId, reportTitle) {
  try {
    const existingReport = selectedReports.find(report => report.id === reportId);
    if (existingReport) {
      selectedReports = selectedReports.filter(report => report.id !== reportId);
      reportCount--;
    } else {
      // Ensure title is included, default to reportId if title is undefined
      const title = reportTitle || reportId.replace('report-', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      selectedReports.push({ id: reportId, title: title, order: selectedReports.length });
      reportCount++;
    }
    localStorage.setItem('selectedReports', JSON.stringify(selectedReports));
    presentationCount.textContent = reportCount;
    presentationCount.classList.toggle('active', reportCount > 0);
    console.log('Selected reports:', selectedReports);
  } catch (error) {
    console.error('Error in toggleReportSelection:', error);
  }
}

// === Button Handlers ===
recalculateBtn?.addEventListener('click', () => {
  try {
    updateOutputs();
    if (currentAnalysis !== 'client-profile') {
      setTimeout(updateGraph, 100);
    }
  } catch (error) {
    console.error('Error in recalculateBtn handler:', error);
  }
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

// === Exports ===
export { formatCurrency, getAge };
