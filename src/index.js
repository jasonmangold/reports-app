import { retirementAccumulationTabs, updateRetirementGraph, updateRetirementOutputs } from './retirementAccumulation.js';
import { personalFinanceTabs, updatePersonalFinanceGraph, updatePersonalFinanceOutputs } from './personalFinance.js';
import { summaryTabs, updateSummaryInputs, updateSummaryOutputs } from './summary.js';

let chartInstance = null;
let currentAnalysis = 'retirement-accumulation';
let selectedReports = [];

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded, initializing UI...');
  initializeUI();
  loadClientData();
});

function initializeUI() {
  try {
    setupAnalysisDropdown();
  } catch (error) {
    console.error('Failed to setup analysis dropdown:', error);
  }

  try {
    setupTabs();
  } catch (error) {
    console.error('Failed to setup tabs:', error);
  }

  try {
    setupEventListeners();
  } catch (error) {
    console.error('Failed to setup event listeners:', error);
  }

  try {
    updateOutputs();
  } catch (error) {
    console.error('Failed to update outputs:', error);
    const analysisOutputs = document.getElementById('analysis-outputs');
    if (analysisOutputs) {
      analysisOutputs.innerHTML = '<p class="output-card">Error loading outputs. Please check the console for details.</p>';
    }
  }

  try {
    updatePresentationCount();
  } catch (error) {
    console.error('Failed to update presentation count:', error);
  }
}

function setupAnalysisDropdown() {
  const analysisDropdown = document.getElementById('analysis-dropdown');
  if (!analysisDropdown) {
    console.error('Analysis dropdown #analysis-dropdown not found. Please ensure the element exists in the HTML.');
    throw new Error('Analysis dropdown not found');
  }
  analysisDropdown.addEventListener('change', (e) => {
    currentAnalysis = e.target.value;
    setupTabs();
    updateOutputs();
    updateGraph();
  });
}

function setupTabs() {
  const config = currentAnalysis === 'retirement-accumulation' ? retirementAccumulationTabs :
                currentAnalysis === 'personal-finance' ? personalFinanceTabs :
                currentAnalysis === 'summary' ? summaryTabs :
                retirementAccumulationTabs;

  const tabContainer = document.getElementById('input-tabs');
  const inputContent = document.querySelector('.input-content');
  if (!tabContainer || !inputContent) {
    const errorMsg = 'Input tabs #input-tabs or .input-content not found.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  tabContainer.innerHTML = '';
  inputContent.innerHTML = '';

  config.forEach((tab, index) => {
    const tabButton = document.createElement('button');
    tabButton.classList.add('tab-button');
    tabButton.dataset.tab = tab.id;
    tabButton.textContent = tab.label;
    if (index === 0) tabButton.classList.add('active');
    tabContainer.appendChild(tabButton);

    const tabContent = document.createElement('div');
    tabContent.classList.add('tab-content');
    tabContent.id = tab.id;
    tabContent.innerHTML = tab.content;
    tabContent.style.display = index === 0 ? 'block' : 'none';
    inputContent.appendChild(tabContent);
  });

  const clientData = JSON.parse(localStorage.getItem('clientData') || '{}');
  populateInputFields(clientData);
  if (currentAnalysis === 'summary') {
    updateSummaryInputs(inputContent, clientData, document.getElementById('output-select')?.value || 'financial-fitness');
  }

  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');

      button.classList.add('active');
      document.getElementById(button.dataset.tab).style.display = 'block';
    });
  });
}

function populateInputFields(clientData) {
  const setInputValue = (id, value, property = 'value') => {
    const input = document.getElementById(id);
    if (input) {
      if (property === 'checked') input.checked = value;
      else input.value = value ?? '';
    }
  };

  setInputValue('is-married', clientData.isMarried, 'checked');
  setInputValue('c1-name', clientData.client1?.personal?.name);
  setInputValue('c1-dob', clientData.client1?.personal?.dob);
  setInputValue('c1-retirement-age', clientData.client1?.personal?.retirementAge);
  setInputValue('c1-employment', clientData.client1?.incomeSources?.employment);
  setInputValue('c1-social-security', clientData.client1?.incomeSources?.socialSecurity);
  setInputValue('c1-other-retirement', clientData.client1?.incomeSources?.otherRetirement);
  setInputValue('c2-name', clientData.client2?.personal?.name);
  setInputValue('c2-dob', clientData.client2?.personal?.dob);
  setInputValue('c2-retirement-age', clientData.client2?.personal?.retirementAge);
  setInputValue('c2-employment', clientData.client2?.incomeSources?.employment);
  setInputValue('c2-social-security', clientData.client2?.incomeSources?.socialSecurity);
  setInputValue('c2-other-retirement', clientData.client2?.incomeSources?.otherRetirement);
  setInputValue('interest-dividends', clientData.client1?.incomeSources?.interestDividends);
  setInputValue('other-income', clientData.client1?.incomeSources?.other);
  setInputValue('household-expenses', clientData.savingsExpenses?.householdExpenses);
  setInputValue('taxes', clientData.savingsExpenses?.taxes);
  setInputValue('other-expenses', clientData.savingsExpenses?.otherExpenses);
  setInputValue('monthly-savings', clientData.savingsExpenses?.monthlySavings);
  setInputValue('monthly-income-needs', clientData.incomeNeeds?.monthly);
  setInputValue('social-security-age', clientData.incomeNeeds?.socialSecurityAge);
  setInputValue('cash', clientData.other?.cash);
  setInputValue('residence-mortgage', clientData.other?.residenceMortgage);
  setInputValue('other-debt', clientData.other?.otherDebt);
  setInputValue('analysis-date', clientData.assumptions?.analysisDate);

  ['c1', 'c2'].forEach(client => {
    const clientKey = client === 'c1' ? 'client1' : 'client2';
    const accounts = clientData[clientKey]?.accounts || [];
    const container = document.getElementById(`${client}-accounts`);
    if (!container) return;

    const existingAccounts = container.querySelectorAll('.account');
    existingAccounts.forEach(account => account.remove());

    accounts.forEach((account, index) => {
      const newAccount = document.createElement('div');
      newAccount.classList.add('account');
      newAccount.innerHTML = `
        <label>Account Name: <input type="text" id="${client}-account-${index}-name" placeholder="Account ${index + 1}"></label>
        <label>Balance ($): <input type="number" id="${client}-account-${index}-balance" min="0" step="1000" placeholder="0"></label>
        <label>ROR (%): <input type="number" id="${client}-account-${index}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
      `;
      const addButton = container.querySelector('.add-account-btn');
      container.insertBefore(newAccount, addButton);

      setInputValue(`${client}-account-${index}-name`, account.name);
      setInputValue(`${client}-account-${index}-balance`, account.balance);
      setInputValue(`${client}-account-${index}-ror`, account.ror);
    });

    const assets = clientData[clientKey]?.other?.assets || [];
    const assetContainer = document.getElementById(`${client}-assets`);
    if (!assetContainer) return;

    const existingAssets = assetContainer.querySelectorAll('.asset');
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
      const addButton = assetContainer.querySelector('.add-asset-btn');
      assetContainer.insertBefore(newAsset, addButton);

      setInputValue(`${client}-asset-${index}-name`, asset.name);
      setInputValue(`${client}-asset-${index}-balance`, asset.balance);
      setInputValue(`${client}-asset-${index}-ror`, asset.ror);
      setInputValue(`${client}-asset-${index}-debt`, asset.debt);
    });
  });

  const client2Section = document.getElementById('client2-section');
  const client2IncomeSection = document.getElementById('client2-income-section');
  const c2Accounts = document.getElementById('c2-accounts');
  const c2Assets = document.getElementById('c2-assets');
  const displayStyle = clientData.isMarried ? 'block' : 'none';
  if (client2Section) client2Section.style.display = displayStyle;
  if (client2IncomeSection) client2IncomeSection.style.display = displayStyle;
  if (c2Accounts) c2Accounts.style.display = displayStyle;
  if (c2Assets) c2Assets.style.display = displayStyle;
}

function setupEventListeners() {
  const inputContent = document.querySelector('.input-content');
  if (!inputContent) {
    console.error('.input-content not found for event listeners.');
    return;
  }

  inputContent.addEventListener('change', (e) => {
    const clientData = collectClientData();
    localStorage.setItem('clientData', JSON.stringify(clientData));
    updateOutputs();
    updateGraph();
  });

  inputContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-account-btn')) {
      const client = e.target.dataset.client;
      const container = document.getElementById(`${client}-accounts`);
      const index = container.querySelectorAll('.account').length;
      const newAccount = document.createElement('div');
      newAccount.classList.add('account');
      newAccount.innerHTML = `
        <label>Account Name: <input type="text" id="${client}-account-${index}-name" placeholder="Account ${index + 1}"></label>
        <label>Balance ($): <input type="number" id="${client}-account-${index}-balance" min="0" step="1000" placeholder="0"></label>
        <label>ROR (%): <input type="number" id="${client}-account-${index}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
      `;
      container.insertBefore(newAccount, e.target);
      collectClientData();
    }

    if (e.target.classList.contains('add-asset-btn')) {
      const client = e.target.dataset.client;
      const container = document.getElementById(`${client}-assets`);
      const index = container.querySelectorAll('.asset').length;
      const newAsset = document.createElement('div');
      newAsset.classList.add('asset');
      newAsset.innerHTML = `
        <label>Asset Name: <input type="text" id="${client}-asset-${index}-name" placeholder="Asset ${index + 1}"></label>
        <label>Balance ($): <input type="number" id="${client}-asset-${index}-balance" min="0" step="1000" placeholder="0"></label>
        <label>ROR (%): <input type="number" id="${client}-asset-${index}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
        <label>Asset Debt ($): <input type="number" id="${client}-asset-${index}-debt" min="0" step="1000" placeholder="0"></label>
      `;
      container.insertBefore(newAsset, e.target);
      collectClientData();
    }
  });

  document.addEventListener('addToPresentationToggle', (e) => {
    const { reportId, reportTitle } = e.detail;
    if (selectedReports.some(r => r.id === reportId)) {
      selectedReports = selectedReports.filter(r => r.id !== reportId);
    } else {
      selectedReports.push({ id: reportId, title: reportTitle });
    }
    updatePresentationCount();
  });

  const recalculateBtn = document.getElementById('recalculate-btn');
  if (recalculateBtn) {
    recalculateBtn.addEventListener('click', () => {
      const clientData = collectClientData();
      localStorage.setItem('clientData', JSON.stringify(clientData));
      updateOutputs();
      updateGraph();
    });
  }

  const exportGraphBtn = document.getElementById('export-graph-btn');
  if (exportGraphBtn) {
    exportGraphBtn.addEventListener('click', () => {
      const chartCanvas = document.getElementById('analysis-chart');
      if (!chartCanvas) {
        alert('No graph available to export.');
        return;
      }
      const link = document.createElement('a');
      link.href = chartCanvas.toDataURL('image/png');
      link.download = 'analysis-graph.png';
      link.click();
    });
  }
}

function collectClientData() {
  const getInputValue = (id, property = 'value') => {
    const input = document.getElementById(id);
    return input ? (property === 'checked' ? input.checked : input.value) : null;
  };

  const clientData = {
    isMarried: getInputValue('is-married', 'checked') || false,
    client1: {
      personal: {
        name: getInputValue('c1-name'),
        dob: getInputValue('c1-dob'),
        retirementAge: getInputValue('c1-retirement-age')
      },
      incomeSources: {
        employment: getInputValue('c1-employment'),
        socialSecurity: getInputValue('c1-social-security'),
        otherRetirement: getInputValue('c1-other-retirement'),
        interestDividends: getInputValue('interest-dividends'),
        other: getInputValue('other-income')
      },
      accounts: []
    },
    client2: {
      personal: {
        name: getInputValue('c2-name'),
        dob: getInputValue('c2-dob'),
        retirementAge: getInputValue('c2-retirement-age')
      },
      incomeSources: {
        employment: getInputValue('c2-employment'),
        socialSecurity: getInputValue('c2-social-security'),
        otherRetirement: getInputValue('c2-other-retirement')
      },
      accounts: []
    },
    savingsExpenses: {
      householdExpenses: getInputValue('household-expenses'),
      taxes: getInputValue('taxes'),
      otherExpenses: getInputValue('other-expenses'),
      monthlySavings: getInputValue('monthly-savings')
    },
    incomeNeeds: {
      monthly: getInputValue('monthly-income-needs'),
      socialSecurityAge: getInputValue('social-security-age')
    },
    other: {
      cash: getInputValue('cash'),
      residenceMortgage: getInputValue('residence-mortgage'),
      otherDebt: getInputValue('other-debt'),
      assets: []
    },
    assumptions: {
      analysisDate: getInputValue('analysis-date')
    }
  };

  ['c1', 'c2'].forEach(client => {
    const clientKey = client === 'c1' ? 'client1' : 'client2';
    const container = document.getElementById(`${client}-accounts`);
    if (container) {
      const accounts = container.querySelectorAll('.account');
      accounts.forEach((account, index) => {
        clientData[clientKey].accounts.push({
          name: getInputValue(`${client}-account-${index}-name`),
          balance: getInputValue(`${client}-account-${index}-balance`),
          ror: getInputValue(`${client}-account-${index}-ror`)
        });
      });
    }

    const assetContainer = document.getElementById(`${client}-assets`);
    if (assetContainer) {
      const assets = assetContainer.querySelectorAll('.asset');
      assets.forEach((asset, index) => {
        if (!clientData[clientKey].other) clientData[clientKey].other = {};
        if (!clientData[clientKey].other.assets) clientData[clientKey].other.assets = [];
        clientData[clientKey].other.assets.push({
          name: getInputValue(`${client}-asset-${index}-name`),
          balance: getInputValue(`${client}-asset-${index}-balance`),
          ror: getInputValue(`${client}-asset-${index}-ror`),
          debt: getInputValue(`${client}-asset-${index}-debt`)
        });
      });
    }
  });

  localStorage.setItem('clientData', JSON.stringify(clientData));
  return clientData;
}

function loadClientData() {
  const clientData = JSON.parse(localStorage.getItem('clientData') || '{}');
  populateInputFields(clientData);
  updateOutputs();
  updateGraph();
}

function updateOutputs() {
  const analysisOutputs = document.getElementById('analysis-outputs');
  if (!analysisOutputs) {
    console.error('Analysis outputs #analysis-outputs not found.');
    return;
  }

  const clientData = JSON.parse(localStorage.getItem('clientData') || '{}');

  const formatCurrency = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? '$0.00' : `$${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  const getAge = (dob) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (currentAnalysis === 'retirement-accumulation') {
    updateRetirementOutputs(analysisOutputs, clientData, formatCurrency, getAge, selectedReports, Chart);
  } else if (currentAnalysis === 'personal-finance') {
    updatePersonalFinanceOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, Chart);
  } else if (currentAnalysis === 'summary') {
    updateSummaryOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, getAge);
  } else {
    analysisOutputs.innerHTML = `<p class="output-card">Outputs not available for ${currentAnalysis}.</p>`;
  }
}

function updateGraph() {
  const chartCanvas = document.getElementById('analysis-chart');
  const clientData = JSON.parse(localStorage.getItem('clientData') || '{}');

  const getAge = (dob) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  if (currentAnalysis === 'retirement-accumulation') {
    chartInstance = updateRetirementGraph(chartCanvas, clientData, Chart, getAge);
  } else if (currentAnalysis === 'personal-finance') {
    chartInstance = updatePersonalFinanceGraph(chartCanvas, clientData, Chart);
  } else if (currentAnalysis === 'summary') {
    // No graph for Summary
  } else {
    console.warn(`No graph rendering for analysis type: ${currentAnalysis}`);
  }
}

function updatePresentationCount() {
  const presentationCount = document.getElementById('presentation-count');
  if (presentationCount) {
    presentationCount.textContent = selectedReports.length;
  }
}
