import { retirementAccumulationTabs, setupAgeDisplayListeners, updateRetirementOutputs, updateRetirementGraph } from './retirementAccumulation.js';

// Initialize selectedReports array to track presentation items
let selectedReports = [];

// Populate analysis topics (simulating the list from the screenshot)
const analysisTopics = [
  'SURVIVOR NEEDS',
  'RETIREMENT ACCUMULATION',
  'RETIREMENT DISTRIBUTION',
  'SOCIAL SECURITY',
  'DISABILITY INCOME NEEDS',
  'CRITICAL ILLNESS',
  'LONG-TERM CARE NEEDS',
  'ESTATE ANALYSIS',
  'EDUCATION FUNDING',
  'ASSET ALLOCATION',
  'CHARITABLE REMAINDER TRUST',
  'PERSONAL FINANCE',
  'DEBT REPAYMENT'
];

// Populate the analysis topics list
const analysisTopicsContainer = document.querySelector('.analysis-topics');
if (analysisTopicsContainer) {
  analysisTopicsContainer.innerHTML = analysisTopics.map(topic => {
    const isActive = topic === 'RETIREMENT ACCUMULATION';
    return `<a href="#" class="${isActive ? 'active' : ''}">${topic}</a>`;
  }).join('');
}

// Populate client input tabs
const inputTabsContainer = document.querySelector('.input-tabs');
if (inputTabsContainer) {
  inputTabsContainer.innerHTML = retirementAccumulationTabs.map(tab => `
    <button class="tab-button ${tab.id === 'personal' ? 'active' : ''}" data-tab="${tab.id}">${tab.label}</button>
  `).join('');
}

// Tab switching logic
const tabButtons = document.querySelectorAll('.tab-button');
const tabContent = document.querySelector('.input-content');
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const tabId = button.getAttribute('data-tab');
    const tab = retirementAccumulationTabs.find(t => t.id === tabId);
    tabContent.innerHTML = tab.content;

    setupAgeDisplayListeners(getAge);
  });
});

// Trigger the first tab by default
if (tabButtons.length > 0) {
  tabButtons[0].click();
}

// Helper functions
function getAge(dob) {
  if (!dob) return 0;
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function formatCurrency(amount) {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function collectClientData() {
  return {
    isMarried: document.getElementById('is-married')?.checked || false,
    client1: {
      personal: {
        name: document.getElementById('c1-name')?.value || 'John Doe',
        dob: document.getElementById('c1-dob')?.value || '1970-01-01',
        retirementAge: document.getElementById('c1-retirement-age')?.value || '65'
      },
      incomeSources: {
        employment: document.getElementById('c1-employment')?.value || '50000',
        socialSecurity: document.getElementById('c1-social-security')?.value || '2000',
        other: document.getElementById('c1-other-income')?.value || '500'
      },
      accounts: [
        {
          name: document.getElementById('c1-account-0-name')?.value || '401(k)',
          balance: document.getElementById('c1-account-0-balance')?.value || '100000',
          contribution: document.getElementById('c1-account-0-contribution')?.value || '10000',
          employerMatch: document.getElementById('c1-account-0-employer-match')?.value || '3',
          ror: document.getElementById('c1-account-0-ror')?.value || '6'
        }
      ]
    },
    client2: {
      personal: {
        name: document.getElementById('c2-name')?.value || 'Jane Doe',
        dob: document.getElementById('c2-dob')?.value || '',
        retirementAge: document.getElementById('c2-retirement-age')?.value || '65'
      },
      incomeSources: {
        employment: document.getElementById('c2-employment')?.value || '40000',
        socialSecurity: document.getElementById('c2-social-security')?.value || '1800',
        other: document.getElementById('c2-other-income')?.value || '400'
      },
      accounts: [
        {
          name: document.getElementById('c2-account-0-name')?.value || 'IRA',
          balance: document.getElementById('c2-account-0-balance')?.value || '80000',
          contribution: document.getElementById('c2-account-0-contribution')?.value || '8000',
          employerMatch: document.getElementById('c2-account-0-employer-match')?.value || '2',
          ror: document.getElementById('c2-account-0-ror')?.value || '5'
        }
      ]
    },
    incomeNeeds: {
      monthly: document.getElementById('monthly-income')?.value || '5000'
    },
    assumptions: {
      mortalityAge: document.getElementById('mortality-age')?.value || '90',
      inflation: document.getElementById('inflation')?.value || '2',
      rorRetirement: document.getElementById('ror-retirement')?.value || '4'
    }
  };
}

// Initialize outputs
const clientData = collectClientData();
updateRetirementOutputs(
  document.getElementById('analysis-outputs'),
  clientData,
  formatCurrency,
  getAge,
  selectedReports
);

// Recalculate button
document.getElementById('recalculate-btn').addEventListener('click', () => {
  const clientData = collectClientData();
  updateRetirementOutputs(
    document.getElementById('analysis-outputs'),
    clientData,
    formatCurrency,
    getAge,
    selectedReports
  );
});

// Export Graph button
document.getElementById('export-graph-btn').addEventListener('click', () => {
  const chartCanvas = document.getElementById('analysis-chart');
  if (chartCanvas) {
    const chartInstance = Chart.getChart(chartCanvas); // Get the Chart.js instance
    if (chartInstance) {
      const imageUrl = chartInstance.toBase64Image(); // Export as base64 image
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'retirement-income-graph.png';
      link.click();
    } else {
      console.error('No Chart.js instance found for the canvas');
      alert('Please switch to the Graph view to export the chart.');
    }
  } else {
    console.error('Chart canvas #analysis-chart not found');
    alert('Chart not available. Please ensure the Graph view is loaded.');
  }
});
