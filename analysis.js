// Initialize clientData structure
let clientData = {
  client1: {
    personal: { name: "", dob: "", retirementAge: "" },
    incomeSources: { employment: "", socialSecurity: "", other: "", interestDividends: "" },
    accounts: [{ name: "", balance: "", contribution: "", employerMatch: "", ror: "" }],
    other: { assets: [{ name: "", balance: "", ror: "", debt: "" }] }
  },
  client2: {
    personal: { name: "", dob: "", retirementAge: "" },
    incomeSources: { employment: "", socialSecurity: "", other: "", interestDividends: "" },
    accounts: [{ name: "", balance: "", contribution: "", employerMatch: "", ror: "" }],
    other: { assets: [{ name: "", balance: "", ror: "", debt: "" }] }
  },
  isMarried: false,
  incomeNeeds: { monthly: "" },
  assumptions: { mortalityAge: "", inflation: "", rorRetirement: "", analysisDate: "", graphYears: "30", goalAmount: "" },
  savingsExpenses: {
    householdExpenses: "",
    taxes: "",
    otherExpenses: "",
    monthlySavings: ""
  },
  other: {
    cash: "",
    residenceMortgage: "",
    otherDebt: ""
  }
};

// Track counts and state
let accountCount = { c1: 1, c2: 1 };
let assetCount = { c1: 0, c2: 0 };
let currentAnalysis = 'retirement-accumulation';
let graphCache = {};
let undoStack = [];
let redoStack = [];
let reportCount = 0;
let showAllLabels = false;

// DOM elements
const analysisList = document.getElementById('analysis-list');
const analysisTopics = document.querySelector('.analysis-topics');
const inputTabs = document.querySelector('.input-tabs');
const inputContent = document.querySelector('.input-content');
const exportGraphBtn = document.getElementById('export-graph-btn');
const exportPdfBtn = document.getElementById('export-pdf-btn');
const chartCanvas = document.getElementById('analysis-chart');
const clientFileName = document.getElementById('client-file-name');
const presentationCount = document.getElementById('presentation-count');
const saveProfileBtn = document.getElementById('save-profile-btn');
const loadProfileSelect = document.getElementById('load-profile-select');
const resetFormBtn = document.getElementById('reset-form-btn');
const undoBtn = document.getElementById('undo-btn');
const redoBtn = document.getElementById('redo-btn');
const startTourBtn = document.getElementById('start-tour-btn');
const showAllLabelsBtn = document.getElementById('show-all-labels-btn');
const toggleC1 = document.getElementById('toggle-c1');
const toggleC2 = document.getElementById('toggle-c2');
const toggleExpenses = document.getElementById('toggle-expenses');
const reportPreviewModal = document.getElementById('report-preview-modal');
const chartSummary = document.getElementById('chart-summary');
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const highContrastToggle = document.querySelector('.high-contrast-toggle');
let chartInstance = null;

// Formatters for US localization
const numberFormatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 });
const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const percentFormatter = new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 });

// Tab configurations
const tabConfigs = {
  'retirement-accumulation': [
    {
      id: 'personal', label: 'Personal', content: `
        <label><input type="checkbox" id="is-married" aria-label="Marital Status"> Marital Status</label>
        <div class="client">
          <h5>Client 1</h5>
          <div class="input-group">
            <input type="text" id="c1-name" placeholder="John Doe" aria-label="Client 1 Name">
            <label for="c1-name">Name</label>
          </div>
          <div class="input-group">
            <input type="date" id="c1-dob" aria-label="Client 1 Date of Birth">
            <label for="c1-dob">Date of Birth</label>
          </div>
          <div class="input-group">
            <input type="number" id="c1-retirement-age" min="1" max="120" placeholder="65" aria-label="Client 1 Retirement Age">
            <label for="c1-retirement-age">Retirement Age</label>
          </div>
        </div>
        <div class="client" id="client2-section" style="display: none;">
          <h5>Client 2</h5>
          <div class="input-group">
            <input type="text" id="c2-name" placeholder="Jane Doe" aria-label="Client 2 Name">
            <label for="c2-name">Name</label>
          </div>
          <div class="input-group">
            <input type="date" id="c2-dob" aria-label="Client 2 Date of Birth">
            <label for="c2-dob">Date of Birth</label>
          </div>
          <div class="input-group">
            <input type="number" id="c2-retirement-age" min="1" max="120" placeholder="65" aria-label="Client 2 Retirement Age">
            <label for="c2-retirement-age">Retirement Age</label>
          </div>
        </div>
      `},
    {
      id: 'income-needs', label: 'Income Needs', content: `
        <div class="input-group">
          <input type="number" id="monthly-income" min="0" step="100" placeholder="$5,000" aria-label="Monthly Income Needs in dollars">
          <label for="monthly-income">Monthly Income Needs ($)</label>
        </div>
      `},
    {
      id: 'income-sources', label: 'Income Sources', content: `
        <div class="client">
          <h5>Client 1</h5>
          <div class="input-group">
            <input type="number" id="c1-employment" min="0" step="1000" placeholder="$50,000" aria-label="Client 1 Employment Income per year">
            <label for="c1-employment">Employment Income ($/yr)</label>
          </div>
          <div class="input-group">
            <input type="number" id="c1-social-security" min="0" step="1000" placeholder="$20,000" aria-label="Client 1 Social Security per year">
            <label for="c1-social-security">Social Security ($/yr)</label>
          </div>
          <div class="input-group">
            <input type="number" id="c1-other-income" min="0" step="1000" placeholder="$10,000" aria-label="Client 1 Other Income per year">
            <label for="c1-other-income">Other Income ($/yr)</label>
          </div>
        </div>
        <div class="client" id="client2-income-section" style="display: none;">
          <h5>Client 2</h5>
          <div class="input-group">
            <input type="number" id="c2-employment" min="0" step="1000" placeholder="$40,000" aria-label="Client 2 Employment Income per year">
            <label for="c2-employment">Employment Income ($/yr)</label>
          </div>
          <div class="input-group">
            <input type="number" id="c2-social-security" min="0" step="1000" placeholder="$18,000" aria-label="Client 2 Social Security per year">
            <label for="c2-social-security">Social Security ($/yr)</label>
          </div>
          <div class="input-group">
            <input type="number" id="c2-other-income" min="0" step="1000" placeholder="$8,000" aria-label="Client 2 Other Income per year">
            <label for="c2-other-income">Other Income ($/yr)</label>
          </div>
        </div>
      `},
    {
      id: 'capital', label: 'Capital', content: `
        <div id="c1-accounts">
          <h5>Client 1 Accounts</h5>
          <div class="account">
            <div class="input-group">
              <input type="text" id="c1-account-0-name" placeholder="401(k)" aria-label="Client 1 Account 1 Name">
              <label for="c1-account-0-name">Account Name</label>
            </div>
            <div class="input-group">
              <input type="number" id="c1-account-0-balance" min="0" step="1000" placeholder="$100,000" aria-label="Client 1 Account 1 Balance in dollars">
              <label for="c1-account-0-balance">Balance ($)</label>
            </div>
            <div class="input-group">
              <input type="number" id="c1-account-0-contribution" min="0" step="1000" placeholder="$10,000" aria-label="Client 1 Account 1 Contribution per year">
              <label for="c1-account-0-contribution">Contribution ($/yr)</label>
            </div>
            <div class="input-group">
              <input type="number" id="c1-account-0-employer-match" min="0" max="100" step="0.1" placeholder="3%" aria-label="Client 1 Account 1 Employer Match percentage">
              <label for="c1-account-0-employer-match">Employer Match (%)</label>
            </div>
            <div class="input-group">
              <input type="number" id="c1-account-0-ror" min="0" max="100" step="0.1" placeholder="6%" aria-label="Client 1 Account 1 Rate of Return percentage">
              <label for="c1-account-0-ror">ROR (%) <span class="help-icon" title="Expected annual growth rate">?</span></label>
              <button type="button" class="use-default-btn" data-id="c1-account-0-ror" data-value="6">Use Default</button>
            </div>
          </div>
          <button type="button" class="add-account-btn" data-client="c1" tabindex="0">Add Account</button>
        </div>
        <div id="c2-accounts" style="display: none;">
          <h5>Client 2 Accounts</h5>
          <div class="account">
            <div class="input-group">
              <input type="text" id="c2-account-0-name" placeholder="IRA" aria-label="Client 2 Account 1 Name">
              <label for="c2-account-0-name">Account Name</label>
            </div>
            <div class="input-group">
              <input type="number" id="c2-account-0-balance" min="0" step="1000" placeholder="$80,000" aria-label="Client 2 Account 1 Balance in dollars">
              <label for="c2-account-0-balance">Balance ($)</label>
            </div>
            <div class="input-group">
              <input type="number" id="c2-account-0-contribution" min="0" step="1000" placeholder="$8,000" aria-label="Client 2 Account 1 Contribution per year">
              <label for="c2-account-0-contribution">Contribution ($/yr)</label>
            </div>
            <div class="input-group">
              <input type="number" id="c2-account-0-employer-match" min="0" max="100" step="0.1" placeholder="2%" aria-label="Client 2 Account 1 Employer Match percentage">
              <label for="c2-account-0-employer-match">Employer Match (%)</label>
            </div>
            <div class="input-group">
              <input type="number" id="c2-account-0-ror" min="0" max="100" step="0.1" placeholder="5%" aria-label="Client 2 Account 1 Rate of Return percentage">
              <label for="c2-account-0-ror">ROR (%) <span class="help-icon" title="Expected annual growth rate">?</span></label>
            </div>
          </div>
          <button type="button" class="add-account-btn" data-client="c2" tabindex="0">Add Account</button>
        </div>
      `},
    {
      id: 'assumptions', label: 'Assumptions', content: `
        <div class="input-group">
          <input type="number" id="mortality-age" min="1" max="120" placeholder="90" aria-label="Mortality Age">
          <label for="mortality-age">Mortality Age</label>
        </div>
        <div class="input-group">
          <input type="number" id="inflation" min="0" max="100" step="0.1" placeholder="2%" aria-label="Inflation percentage">
          <label for="inflation">Inflation (%) <span class="help-icon" title="Expected annual inflation rate">?</span></label>
          <button type="button" class="use-default-btn" data-id="inflation" data-value="2">Use Default</button>
        </div>
        <div class="input-group">
          <input type="number" id="ror-retirement" min="0" max="100" step="0.1" placeholder="4%" aria-label="Rate of Return During Retirement percentage">
          <label for="ror-retirement">ROR During Retirement (%) <span class="help-icon" title="Expected return during retirement">?</span></label>
        </div>
        <div class="input-group">
          <input type="number" id="graph-years" min="5" max="100" placeholder="30" aria-label="Graph Timeframe in years">
          <label for="graph-years">Graph Timeframe (years)</label>
        </div>
        <div class="input-group">
          <input type="number" id="goal-amount" min="0" step="1000" placeholder="$1,000,000" aria-label="Retirement Savings Goal in dollars">
          <label for="goal-amount">Retirement Savings Goal ($)</label>
        </div>
      `},
    {
      id: 'reports', label: 'Reports', content: `
        <div class="report-list">
          <label><input type="checkbox" class="report-checkbox" data-report="retirement-analysis" tabindex="0"> Retirement Analysis</label>
          <label><input type="checkbox" class="report-checkbox" data-report="social-security-optimizer" tabindex="0"> Social Security Optimizer</label>
          <label><input type="checkbox" class="report-checkbox" data-report="capital-available" tabindex="0"> Capital Available for Retirement</label>
          <label><input type="checkbox" class="report-checkbox" data-report="alternatives-retirement" tabindex="0"> Alternatives to Achieving Retirement Goals</label>
          <label><input type="checkbox" class="report-checkbox" data-report="retirement-timeline" tabindex="0"> Retirement Timeline</label>
          <label><input type="checkbox" class="report-checkbox" data-report="retirement-fact-finder" tabindex="0"> Retirement Analysis Fact Finder</label>
        </div>
        <button id="preview-reports-btn">Preview Reports</button>
      `},
    {
      id: 'presentation', label: 'Presentation', content: `
        <h5>Presentation Reports</h5>
        <ul id="presentation-reports" aria-label="Sortable Presentation Reports">
          <!-- Populated dynamically via updatePresentationReports -->
        </ul>
      `}
  ],
  'personal-finance': [
    {
      id: 'personal', label: 'Personal', content: `
        <label><input type="checkbox" id="is-married" aria-label="Marital Status"> Marital Status</label>
        <div class="client">
          <h5>Client 1</h5>
          <div class="input-group">
            <input type="text" id="c1-name" placeholder="John Doe" aria-label="Client 1 Name">
            <label for="c1-name">Name</label>
          </div>
        </div>
        <div class="client" id="client2-section" style="display: none;">
          <h5>Client 2</h5>
          <div class="input-group">
            <input type="text" id="c2-name" placeholder="Jane Doe" aria-label="Client 2 Name">
            <label for="c2-name">Name</label>
          </div>
        </div>
      `},
    {
      id: 'income', label: 'Income', content: `
        <div class="client">
          <h5>Client 1</h5>
          <div class="input-group">
            <input type="number" id="c1-employment" min="0" step="1000" placeholder="$50,000" aria-label="Client 1 Employment Income per year">
            <label for="c1-employment">Employment Income ($/yr)</label>
          </div>
        </div>
        <div class="client" id="client2-income-section" style="display: none;">
          <h5>Client 2</h5>
          <div class="input-group">
            <input type="number" id="c2-employment" min="0" step="1000" placeholder="$40,000" aria-label="Client 2 Employment Income per year">
            <label for="c2-employment">Employment Income ($/yr)</label>
          </div>
        </div>
        <div class="input-group">
          <input type="number" id="interest-dividends" min="0" step="1000" placeholder="$5,000" aria-label="Interest and Dividends per year">
          <label for="interest-dividends">Interest and Dividends ($/yr)</label>
        </div>
        <div class="input-group">
          <input type="number" id="other-income" min="0" step="1000" placeholder="$10,000" aria-label="Other Income per year">
          <label for="other-income">Other Income ($/yr)</label>
        </div>
      `},
    {
      id: 'savings-expenses', label: 'Savings & Expenses', content: `
        <div class="input-group">
          <input type="number" id="household-expenses" min="0" step="1000" placeholder="$30,000" aria-label="Household Expenses per year">
          <label for="household-expenses">Household Expenses ($/yr)</label>
        </div>
        <div class="input-group">
          <input type="number" id="taxes" min="0" step="1000" placeholder="$15,000" aria-label="Taxes per year">
          <label for="taxes">Taxes ($/yr)</label>
        </div>
        <div class="input-group">
          <input type="number" id="other-expenses" min="0" step="1000" placeholder="$5,000" aria-label="Other Expenses per year">
          <label for="other-expenses">Other Expenses ($/yr)</label>
        </div>
        <div class="input-group">
          <input type="number" id="monthly-savings" min="0" step="100" placeholder="$2,000" aria-label="Monthly Savings in dollars">
          <label for="monthly-savings">Monthly Savings ($)</label>
        </div>
      `},
    {
      id: 'retirement', label: 'Retirement', content: `
        <div id="c1-accounts">
          <h5>Client 1 Accounts</h5>
          <div class="account">
            <div class="input-group">
              <input type="text" id="c1-account-0-name" placeholder="401(k)" aria-label="Client 1 Account 1 Name">
              <label for="c1-account-0-name">Account Name</label>
            </div>
            <div class="input-group">
              <input type="number" id="c1-account-0-balance" min="0" step="1000" placeholder="$100,000" aria-label="Client 1 Account 1 Balance in dollars">
              <label for="c1-account-0-balance">Balance ($)</label>
            </div>
            <div class="input-group">
              <input type="number" id="c1-account-0-ror" min="0" max="100" step="0.1" placeholder="6%" aria-label="Client 1 Account 1 Rate of Return percentage">
              <label for="c1-account-0-ror">ROR (%) <span class="help-icon" title="Expected annual growth rate">?</span></label>
              <button type="button" class="use-default-btn" data-id="c1-account-0-ror" data-value="6">Use Default</button>
            </div>
          </div>
          <button type="button" class="add-account-btn" data-client="c1" tabindex="0">Add Account</button>
        </div>
        <div id="c2-accounts" style="display: none;">
          <h5>Client 2 Accounts</h5>
          <div class="account">
            <div class="input-group">
              <input type="text" id="c2-account-0-name" placeholder="IRA" aria-label="Client 2 Account 1 Name">
              <label for="c2-account-0-name">Account Name</label>
            </div>
            <div class="input-group">
              <input type="number" id="c2-account-0-balance" min="0" step="1000" placeholder="$80,000" aria-label="Client 2 Account 1 Balance in dollars">
              <label for="c2-account-0-balance">Balance ($)</label>
            </div>
            <div class="input-group">
              <input type="number" id="c2-account-0-ror" min="0" max="100" step="0.1" placeholder="5%" aria-label="Client 2 Account 1 Rate of Return percentage">
              <label for="c2-account-0-ror">ROR (%) <span class="help-icon" title="Expected annual growth rate">?</span></label>
            </div>
          </div>
          <button type="button" class="add-account-btn" data-client="c2" tabindex="0">Add Account</button>
        </div>
      `},
    {
      id: 'other', label: 'Other', content: `
        <div id="c1-assets">
          <h5>Client 1 Assets</h5>
          <div class="asset">
            <div class="input-group">
              <input type="text" id="c1-asset-0-name" placeholder="Investment Property" aria-label="Client 1 Asset 1 Name">
              <label for="c1-asset-0-name">Asset Name</label>
            </div>
            <div class="input-group">
              <input type="number" id="c1-asset-0-balance" min="0" step="1000" placeholder="$200,000" aria-label="Client 1 Asset 1 Balance in dollars">
              <label for="c1-asset-0-balance">Balance ($)</label>
            </div>
            <div class="input-group">
              <input type="number" id="c1-asset-0-ror" min="0" max="100" step="0.1" placeholder="4%" aria-label="Client 1 Asset 1 Rate of Return percentage">
              <label for="c1-asset-0-ror">ROR (%) <span class="help-icon" title="Expected annual growth rate">?</span></label>
            </div>
            <div class="input-group">
              <input type="number" id="c1-asset-0-debt" min="0" step="1000" placeholder="$50,000" aria-label="Client 1 Asset 1 Debt in dollars">
              <label for="c1-asset-0-debt">Asset Debt ($)</label>
            </div>
          </div>
          <button type="button" class="add-asset-btn" data-client="c1" tabindex="0">Add Asset</button>
        </div>
        <div id="c2-assets" style="display: none;">
          <h5>Client 2 Assets</h5>
          <div class="asset">
            <div class="input-group">
              <input type="text" id="c2-asset-0-name" placeholder="Stock Portfolio" aria-label="Client 2 Asset 1 Name">
              <label for="c2-asset-0-name">Asset Name</label>
            </div>
            <div class="input-group">
              <input type="number" id="c2-asset-0-balance" min="0" step="1000" placeholder="$150,000" aria-label="Client 2 Asset 1 Balance in dollars">
              <label for="c2-asset-0-balance">Balance ($)</label>
            </div>
            <div class="input-group">
              <input type="number" id="c2-asset-0-ror" min="0" max="100" step="0.1" placeholder="7%" aria-label="Client 2 Asset 1 Rate of Return percentage">
              <label for="c2-asset-0-ror">ROR (%) <span class="help-icon" title="Expected annual growth rate">?</span></label>
            </div>
            <div class="input-group">
              <input type="number" id="c2-asset-0-debt" min="0" step="1000" placeholder="$0" aria-label="Client 2 Asset 1 Debt in dollars">
              <label for="c2-asset-0-debt">Asset Debt ($)</label>
            </div>
          </div>
          <button type="button" class="add-asset-btn" data-client="c2" tabindex="0">Add Asset</button>
        </div>
        <div class="input-group">
          <input type="number" id="cash" min="0" step="1000" placeholder="$20,000" aria-label="Cash in dollars">
          <label for="cash">Cash ($)</label>
        </div>
        <div class="input-group">
          <input type="number" id="residence-mortgage" min="0" step="1000" placeholder="$300,000" aria-label="Residence or Mortgage in dollars">
          <label for="residence-mortgage">Residence/Mortgage ($)</label>
        </div>
        <div class="input-group">
          <input type="number" id="other-debt" min="0" step="1000" placeholder="$10,000" aria-label="Other Debt in dollars">
          <label for="other-debt">Other Debt ($)</label>
        </div>
      `},
    {
      id: 'assumptions', label: 'Assumptions', content: `
        <div class="input-group">
          <input type="date" id="analysis-date" aria-label="Analysis Date">
          <label for="analysis-date">Analysis Date</label>
        </div>
        <div class="input-group">
          <input type="number" id="graph-years" min="5" max="100" placeholder="30" aria-label="Graph Timeframe in years">
          <label for="graph-years">Graph Timeframe (years)</label>
        </div>
        <div class="input-group">
          <input type="number" id="goal-amount" min="0" step="1000" placeholder="$1,000,000" aria-label="Net Worth Goal in dollars">
          <label for="goal-amount">Net Worth Goal ($)</label>
        </div>
      `},
    {
      id: 'reports', label: 'Reports', content: `
        <div class="report-list">
          <label><input type="checkbox" class="report-checkbox" data-report="cash-flow" tabindex="0"> Cash Flow</label>
          <label><input type="checkbox" class="report-checkbox" data-report="cash-flow-detail" tabindex="0"> Cash Flow Detail</label>
          <label><input type="checkbox" class="report-checkbox" data-report="net-worth" tabindex="0"> Net Worth</label>
          <label><input type="checkbox" class="report-checkbox" data-report="weighted-average-ror" tabindex="0"> Weighted Average Rate of Return</label>
          <label><input type="checkbox" class="report-checkbox" data-report="fact-finder" tabindex="0"> Fact Finder</label>
        </div>
        <button id="preview-reports-btn">Preview Reports</button>
      `},
    {
      id: 'presentation', label: 'Presentation', content: `
        <h5>Presentation Reports</h5>
        <ul id="presentation-reports" aria-label="Sortable Presentation Reports">
          <!-- Populated dynamically via updatePresentationReports -->
        </ul>
      `}
  ]
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('Initializing page...');
    populateAnalysisTopics();
    updateTabs(currentAnalysis);
    updateClientFileName();
    setupEventDelegation();
    setupGuidedTour();
    populateLoadProfileSelect();
    updatePresentationReports();
    setTimeout(updateGraph, 0);
  } catch (error) {
    console.error('Initialization error:', error);
  }
});

// Populate analysis topics
function populateAnalysisTopics() {
  try {
    analysisTopics.innerHTML = '';
    const mobileSelect = document.createElement('select');
    mobileSelect.classList.add('analysis-topics-mobile');
    mobileSelect.style.display = window.innerWidth <= 768 ? 'block' : 'none';
    const links = analysisList?.querySelectorAll('a') || [];
    links.forEach(link => {
      const btn = document.createElement('button');
      btn.classList.add('topic-btn');
      btn.textContent = link.textContent;
      btn.dataset.analysis = link.dataset.analysis;
      btn.tabIndex = 0;
      if (link.dataset.analysis === currentAnalysis) btn.classList.add('active');
      analysisTopics.appendChild(btn);

      const option = document.createElement('option');
      option.value = link.dataset.analysis;
      option.textContent = link.textContent;
      if (link.dataset.analysis === currentAnalysis) option.selected = true;
      mobileSelect.appendChild(option);
    });
    analysisTopics.parentElement.insertBefore(mobileSelect, analysisTopics);

    document.querySelectorAll('.topic-btn').forEach(btn => {
      btn.addEventListener('click', handleTopicClick);
      btn.addEventListener('keydown', handleKeydown);
    });

    mobileSelect.addEventListener('change', (e) => {
      currentAnalysis = e.target.value;
      updateTabs(currentAnalysis);
      updateGraph();
      populateAnalysisTopics();
    });

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        links.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
        currentAnalysis = link.dataset.analysis;
        updateTabs(currentAnalysis);
        updateGraph();
        populateAnalysisTopics();
      });
    });

    window.addEventListener('resize', () => {
      mobileSelect.style.display = window.innerWidth <= 768 ? 'block' : 'none';
      analysisTopics.style.display = window.innerWidth <= 768 ? 'none' : 'flex';
    });
  } catch (error) {
    console.error('Error in populateAnalysisTopics:', error);
  }
}

function handleTopicClick(e) {
  document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  currentAnalysis = e.target.dataset.analysis;
  updateTabs(currentAnalysis);
  updateGraph();
}

function handleKeydown(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    e.target.click();
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
      btn.tabIndex = 0;
      if (index === 0) btn.classList.add('active');
      inputTabs.appendChild(btn);

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('tab-content');
      contentDiv.id = tab.id;
      contentDiv.style.display = index === 0 ? 'block' : 'none';
      contentDiv.innerHTML = tab.content;
      contentDiv.classList.add('animate');
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

// Set input value with accessibility
function setInputValue(id, value, ariaLabel, prop = 'value', isCurrency = false, isPercent = false) {
  const input = document.getElementById(id);
  if (!input) return;

  const formatValue = (val) => {
    if (val === '' || val == null) return '';
    if (prop === 'checked') return val;
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    return isCurrency ? currencyFormatter.format(num) : isPercent ? `${num}%` : numberFormatter.format(num);
  };

  input[prop] = formatValue(value);
  input.setAttribute('aria-label', ariaLabel);
}

// Populate input fields with clientData
function populateInputFields() {
  try {
    console.log('Populating input fields...');

    // Shared fields
    setInputValue('c1-name', clientData.client1.personal.name, 'Client 1 Name');
    setInputValue('c2-name', clientData.client2.personal.name, 'Client 2 Name');
    setInputValue('c1-employment', clientData.client1.incomeSources.employment, 'Client 1 Employment', 'value', true);
    setInputValue('c2-employment', clientData.client2.incomeSources.employment, 'Client 2 Employment', 'value', true);
    setInputValue('other-income', clientData.client1.incomeSources.other, 'Other Income', 'value', true);
    setInputValue('is-married', clientData.isMarried, 'Is Married', 'checked');

    // Retirement Accumulation specific
    setInputValue('c1-dob', clientData.client1.personal.dob, 'Client 1 DOB');
    setInputValue('c2-dob', clientData.client2.personal.dob, 'Client 2 DOB');
    setInputValue('c1-retirement-age', clientData.client1.personal.retirementAge, 'Client 1 Retirement Age');
    setInputValue('c2-retirement-age', clientData.client2.personal.retirementAge, 'Client 2 Retirement Age');
    setInputValue('c1-social-security', clientData.client1.incomeSources.socialSecurity, 'Client 1 Social Security', 'value', true);
    setInputValue('c2-social-security', clientData.client2.incomeSources.socialSecurity, 'Client 2 Social Security', 'value', true);
    setInputValue('monthly-income', clientData.incomeNeeds.monthly, 'Monthly Income', 'value', true);
    setInputValue('mortality-age', clientData.assumptions.mortalityAge, 'Mortality Age');
    setInputValue('inflation', clientData.assumptions.inflation, 'Inflation', 'value', false, true);
    setInputValue('ror-retirement', clientData.assumptions.rorRetirement, 'ROR Retirement', 'value', false, true);
    setInputValue('graph-years', clientData.assumptions.graphYears, 'Graph Years');
    setInputValue('goal-amount', clientData.assumptions.goalAmount, 'Goal Amount', 'value', true);

    // Personal Finance specific
    setInputValue('interest-dividends', clientData.client1.incomeSources.interestDividends, 'Interest and Dividends', 'value', true);
    setInputValue('household-expenses', clientData.savingsExpenses.householdExpenses, 'Household Expenses', 'value', true);
    setInputValue('taxes', clientData.savingsExpenses.taxes, 'Taxes', 'value', true);
    setInputValue('other-expenses', clientData.savingsExpenses.otherExpenses, 'Other Expenses', 'value', true);
    setInputValue('monthly-savings', clientData.savingsExpenses.monthlySavings, 'Monthly Savings', 'value', true);
    setInputValue('analysis-date', clientData.assumptions.analysisDate, 'Analysis Date');
    setInputValue('cash', clientData.other.cash, 'Cash', 'value', true);
    setInputValue('residence-mortgage', clientData.other.residenceMortgage, 'Residence/Mortgage', 'value', true);
    setInputValue('other-debt', clientData.other.otherDebt, 'Other Debt', 'value', true);

    // Accounts
    ['c1', 'c2'].forEach(client => {
      const clientKey = client === 'c1' ? 'client1' : 'client2';
      const accounts = clientData[clientKey].accounts;
      const container = document.getElementById(`${client}-accounts`);
      if (!container) return;

      const existingAccounts = container.querySelectorAll('.account');
      existingAccounts.forEach(account => account.remove());

      accounts.forEach((account, index) => {
        const newAccount = document.createElement('div');
        newAccount.classList.add('account');
        newAccount.innerHTML = currentAnalysis === 'personal-finance' ? `
          <div class="input-group">
            <input type="text" id="${client}-account-${index}-name" placeholder="Account ${index + 1}" aria-label="Client ${client === 'c1' ? 1 : 2} Account ${index + 1} Name">
            <label for="${client}-account-${index}-name">Account Name</label>
          </div>
          <div class="input-group">
            <input type="number" id="${client}-account-${index}-balance" min="0" step="1000" placeholder="$0" aria-label="Client ${client === 'c1' ? 1 : 2} Account ${index + 1} Balance in dollars">
            <label for="${client}-account-${index}-balance">Balance ($)</label>
          </div>
          <div class="input-group">
            <input type="number" id="${client}-account-${index}-ror" min="0" max="100" step="0.1" placeholder="0%" aria-label="Client ${client === 'c1' ? 1 : 2} Account ${index + 1} Rate of Return percentage">
            <label for="${client}-account-${index}-ror">ROR (%) <span class="help-icon" title="Expected annual growth rate">?</span></label>
            ${index === 0 && client === 'c1' ? '<button type="button" class="use-default-btn" data-id="' + client + '-account-' + index + '-ror" data-value="6">Use Default</button>' : ''}
          </div>
        ` : `
          <div class="input-group">
            <input type="text" id="${client}-account-${index}-name" placeholder="Account ${index + 1}" aria-label="Client ${client === 'c1' ? 1 : 2} Account ${index + 1} Name">
            <label for="${client}-account-${index}-name">Account Name</label>
          </div>
          <div class="input-group">
            <input type="number" id="${client}-account-${index}-balance" min="0" step="1000" placeholder="$0" aria-label="Client ${client === 'c1' ? 1 : 2} Account ${index + 1} Balance in dollars">
            <label for="${client}-account-${index}-balance">Balance ($)</label>
          </div>
          <div class="input-group">
            <input type="number" id="${client}-account-${index}-contribution" min="0" step="1000" placeholder="$0" aria-label="Client ${client === 'c1' ? 1 : 2} Account ${index + 1} Contribution per year">
            <label for="${client}-account-${index}-contribution">Contribution ($/yr)</label>
          </div>
          <div class="input-group">
            <input type="number" id="${client}-account-${index}-employer-match" min="0" max="100" step="0.1" placeholder="0%" aria-label="Client ${client === 'c1' ? 1 : 2} Account ${index + 1} Employer Match percentage">
            <label for="${client}-account-${index}-employer-match">Employer Match (%)</label>
          </div>
          <div class="input-group">
            <input type="number" id="${client}-account-${index}-ror" min="0" max="100" step="0.1" placeholder="0%" aria-label="Client ${client === 'c1' ? 1 : 2} Account ${index + 1} Rate of Return percentage">
            <label for="${client}-account-${index}-ror">ROR (%) <span class="help-icon" title="Expected annual growth rate">?</span></label>
            ${index === 0 && client === 'c1' ? '<button type="button" class="use-default-btn" data-id="' + client + '-account-' + index + '-ror" data-value="6">Use Default</button>' : ''}
          </div>
        `;
        container.insertBefore(newAccount, container.querySelector('.add-account-btn'));

        setInputValue(`${client}-account-${index}-name`, account.name, `Client ${client === 'c1' ? 1 : 2} Account ${index + 1} Name`);
        setInputValue(`${client}-account-${index}-balance`, account.balance, `Client ${client === 'c1' ? 1 : 2} Account ${index + 1} Balance`, 'value', true);
        if (currentAnalysis !== 'personal-finance') {
          setInputValue(`${client}-account-${index}-contribution`, account.contribution, `Client ${client === 'c1' ? 1 : 2} Account ${index + 1} Contribution`, 'value', true);
          setInputValue(`${client}-account-${index}-employer-match`, account.employerMatch, `Client ${client === 'c1' ? 1 : 2} Account ${index + 1} Employer Match`, 'value', false, true);
        }
        setInputValue(`${client}-account-${index}-ror`, account.ror, `Client ${client === 'c1' ? 1 : 2} Account ${index + 1} ROR`, 'value', false, true);
      });
    });

    // Assets
    ['c1', 'c2'].forEach(client => {
      const clientKey = client === 'c1' ? 'client1' : 'client2';
      const assets = clientData[clientKey].other.assets;
      const container = document.getElementById(`${client}-assets`);
      if (!container) return;

      const existingAssets = container.querySelectorAll('.asset');
      existingAssets.forEach(asset => asset.remove());

      assets.forEach((asset, index) => {
        const newAsset = document.createElement('div');
        newAsset.classList.add('asset');
        newAsset.innerHTML = `
          <div class="input-group">
            <input type="text" id="${client}-asset-${index}-name" placeholder="Asset ${index + 1}" aria-label="Client ${client === 'c1' ? 1 : 2} Asset ${index + 1} Name">
            <label for="${client}-asset-${index}-name">Asset Name</label>
          </div>
          <div class="input-group">
            <input type="number" id="${client}-asset-${index}-balance" min="0" step="1000" placeholder="$0" aria-label="Client ${client === 'c1' ? 1 : 2} Asset ${index + 1} Balance in dollars">
            <label for="${client}-asset-${index}-balance">Balance ($)</label>
          </div>
          <div class="input-group">
            <input type="number" id="${client}-asset-${index}-ror" min="0" max="100" step="0.1" placeholder="0%" aria-label="Client ${client === 'c1' ? 1 : 2} Asset ${index + 1} Rate of Return percentage">
            <label for="${client}-asset-${index}-ror">ROR (%) <span class="help-icon" title="Expected annual growth rate">?</span></label>
          </div>
          <div class="input-group">
            <input type="number" id="${client}-asset-${index}-debt" min="0" step="1000" placeholder="$0" aria-label="Client ${client === 'c1' ? 1 : 2} Asset ${index + 1} Debt in dollars">
            <label for="${client}-asset-${index}-debt">Asset Debt ($)</label>
          </div>
        `;
        container.insertBefore(newAsset, container.querySelector('.add-asset-btn'));

        setInputValue(`${client}-asset-${index}-name`, asset.name, `Client ${client === 'c1' ? 1 : 2} Asset ${index + 1} Name`);
        setInputValue(`${client}-asset-${index}-balance`, asset.balance, `Client ${client === 'c1' ? 1 : 2} Asset ${index + 1} Balance`, 'value', true);
        setInputValue(`${client}-asset-${index}-ror`, asset.ror, `Client ${client === 'c1' ? 1 : 2} Asset ${index + 1} ROR`, 'value', false, true);
        setInputValue(`${client}-asset-${index}-debt`, asset.debt, `Client ${client === 'c1' ? 1 : 2} Asset ${index + 1} Debt`, 'value', true);
      });
    });

    // Reports
    const reportCheckboxes = document.querySelectorAll('.report-checkbox');
    reportCheckboxes.forEach(checkbox => {
      checkbox.checked = clientData.reports?.includes(checkbox.dataset.report) || false;
    });
  } catch (error) {
    console.error('Error in populateInputFields:', error);
  }
}

// Toggle Client 2 sections
function toggleClient2(e) {
  const isMarried = e.target.checked;
  clientData.isMarried = isMarried;
  const client2Section = document.getElementById('client2-section');
  const client2IncomeSection = document.getElementById('client2-income-section');
  const c2Accounts = document.getElementById('c2-accounts');
  const c2Assets = document.getElementById('c2-assets');
  if (client2Section) client2Section.style.display = isMarried ? 'block' : 'none';
  if (client2IncomeSection) client2IncomeSection.style.display = isMarried ? 'block' : 'none';
  if (c2Accounts) c2Accounts.style.display = isMarried ? 'block' : 'none';
  if (c2Assets) c2Assets.style.display = isMarried ? 'block' : 'none';
  saveState();
  updateGraph();
}

// Update client file name
function updateClientFileName() {
  try {
    const name = clientData.client1.personal.name || 'No Client Selected';
    clientFileName.textContent = name;
    clientFileName.setAttribute('aria-label', `Current client: ${name}`);
  } catch (error) {
    console.error('Error in updateClientFileName:', error);
  }
}

// Setup tab switching
function setupTabSwitching() {
  try {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
        btn.classList.add('active');
        const content = document.getElementById(btn.dataset.tab);
        content.style.display = 'block';
        content.classList.add('animate');
      });
      btn.addEventListener('keydown', handleKeydown);
    });
  } catch (error) {
    console.error('Error in setupTabSwitching:', error);
  }
}

// Setup add account/asset buttons
function setupAddButtons() {
  try {
    document.querySelectorAll('.add-account-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const client = e.target.dataset.client;
        const clientKey = client === 'c1' ? 'client1' : 'client2';
        clientData[clientKey].accounts.push({ name: "", balance: "", contribution: "", employerMatch: "", ror: "" });
        accountCount[client]++;
        saveState();
        populateInputFields();
        updateGraph();
      });
      btn.addEventListener('keydown', handleKeydown);
    });

    document.querySelectorAll('.add-asset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const client = e.target.dataset.client;
        const clientKey = client === 'c1' ? 'client1' : 'client2';
        clientData[clientKey].other.assets.push({ name: "", balance: "", ror: "", debt: "" });
        assetCount[client]++;
        saveState();
        populateInputFields();
        updateGraph();
      });
      btn.addEventListener('keydown', handleKeydown);
    });
  } catch (error) {
    console.error('Error in setupAddButtons:', error);
  }
}

// Setup event delegation
function setupEventDelegation() {
  try {
    inputContent.addEventListener('input', (e) => {
      updateClientData(e);
      if (e.target.type !== 'number') updateGraph();
    });

    inputContent.addEventListener('focusout', (e) => {
      if (e.target.type === 'number') updateGraph();
    });

    inputContent.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === 'Tab') && e.target.tagName === 'INPUT') {
        e.preventDefault();
        const inputs = Array.from(document.querySelectorAll('.tab-content[style*="block"] input'));
        const currentIndex = inputs.indexOf(e.target);
        if (currentIndex < inputs.length - 1) {
          inputs[currentIndex + 1].focus();
        }
      }
    });

    inputContent.addEventListener('click', (e) => {
      if (e.target.classList.contains('use-default-btn')) {
        const id = e.target.dataset.id;
        const value = e.target.dataset.value;
        const input = document.getElementById(id);
        if (input) {
          input.value = value;
          updateClientData({ target: input });
          updateGraph();
        }
      }
    });

    document.querySelectorAll('.report-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        clientData.reports = Array.from(document.querySelectorAll('.report-checkbox:checked')).map(cb => cb.dataset.report);
        reportCount = clientData.reports.length;
        presentationCount.textContent = reportCount;
        presentationCount.classList.toggle('active', reportCount > 0);
        updatePresentationReports();
        saveState();
      });
    });
  } catch (error) {
    console.error('Error in setupEventDelegation:', error);
  }
}

// Update client data with validation
function updateClientData(e) {
  try {
    const target = e.target;
    const id = target.id;
    let value = target.type === 'checkbox' ? target.checked : target.value.replace(/[^0-9.-]+/g, '');

    // Validation
    const validateInput = (input, min, max, message) => {
      const num = parseFloat(input.value);
      const errorSpan = input.nextElementSibling?.nextElementSibling?.classList.contains('error-message') ? input.nextElementSibling.nextElementSibling : null;
      if (isNaN(num) || num < min || (max !== undefined && num > max)) {
        input.classList.add('invalid');
        if (!errorSpan) {
          const span = document.createElement('span');
          span.classList.add('error-message');
          span.textContent = message;
          input.parentElement.appendChild(span);
        }
      } else {
        input.classList.remove('invalid');
        if (errorSpan) errorSpan.remove();
      }
    };

    if (id.startsWith('c1-account-') || id.startsWith('c2-account-')) {
      const [client, , index, field] = id.split('-');
      const clientKey = client === 'c1' ? 'client1' : 'client2';
      clientData[clientKey].accounts[index] = clientData[clientKey].accounts[index] || {};
      clientData[clientKey].accounts[index][field] = value;
      if (field === 'balance' || field === 'contribution') validateInput(target, 0, undefined, 'Value must be non-negative');
      if (field === 'ror' || field === 'employer-match') validateInput(target, 0, 100, 'Value must be between 0% and 100%');
    } else if (id.startsWith('c1-asset-') || id.startsWith('c2-asset-')) {
      const [client, , index, field] = id.split('-');
      const clientKey = client === 'c1' ? 'client1' : 'client2';
      clientData[clientKey].other.assets[index] = clientData[clientKey].other.assets[index] || {};
      clientData[clientKey].other.assets[index][field] = value;
      if (field === 'balance' || field === 'debt') validateInput(target, 0, undefined, 'Value must be non-negative');
      if (field === 'ror') validateInput(target, 0, 100, 'Value must be between 0% and 100%');
    } else if (id === 'is-married') {
      clientData.isMarried = value;
      toggleClient2(e);
    } else if (id.startsWith('c1-') || id.startsWith('c2-')) {
      const [client, field] = id.split('-').slice(0, 2);
      const clientKey = client === 'c1' ? 'client1' : 'client2';
      if (field in clientData[clientKey].personal) {
        clientData[clientKey].personal[field] = value;
        if (field === 'retirement-age') validateInput(target, 1, 120, 'Age must be between 1 and 120');
      } else if (field in clientData[clientKey].incomeSources) {
        clientData[clientKey].incomeSources[field] = value;
        validateInput(target, 0, undefined, 'Value must be non-negative');
      }
    } else if (id in clientData.incomeNeeds) {
      clientData.incomeNeeds[id] = value;
      validateInput(target, 0, undefined, 'Value must be non-negative');
    } else if (id in clientData.assumptions) {
      clientData.assumptions[id] = value;
      if (id === 'mortality-age') validateInput(target, 1, 120, 'Age must be between 1 and 120');
      if (id === 'inflation' || id === 'ror-retirement') validateInput(target, 0, 100, 'Value must be between 0% and 100%');
      if (id === 'graph-years') validateInput(target, 5, 100, 'Years must be between 5 and 100');
      if (id === 'goal-amount') validateInput(target, 0, undefined, 'Value must be non-negative');
    } else if (id in clientData.savingsExpenses) {
      clientData.savingsExpenses[id] = value;
      validateInput(target, 0, undefined, 'Value must be non-negative');
    } else if (id in clientData.other) {
      clientData.other[id] = value;
      validateInput(target, 0, undefined, 'Value must be non-negative');
    }

    saveState();
    updateClientFileName();
  } catch (error) {
    console.error('Error in updateClientData:', error);
  }
}

// Save state for undo/redo
function saveState() {
  undoStack.push(JSON.stringify(clientData));
  redoStack = [];
  undoBtn.disabled = undoStack.length <= 1;
  redoBtn.disabled = true;
}

// Undo/redo handlers
undoBtn.addEventListener('click', () => {
  if (undoStack.length > 1) {
    redoStack.push(undoStack.pop());
    clientData = JSON.parse(undoStack[undoStack.length - 1]);
    updateTabs(currentAnalysis);
    updateGraph();
    undoBtn.disabled = undoStack.length <= 1;
    redoBtn.disabled = false;
  }
});

redoBtn.addEventListener('click', () => {
  if (redoStack.length > 0) {
    undoStack.push(redoStack.pop());
    clientData = JSON.parse(undoStack[undoStack.length - 1]);
    updateTabs(currentAnalysis);
    updateGraph();
    undoBtn.disabled = false;
    redoBtn.disabled = redoStack.length === 0;
  }
});

// Save/load profiles
saveProfileBtn.addEventListener('click', () => {
  const name = clientData.client1.personal.name || 'Profile ' + Date.now();
  localStorage.setItem(`profile_${name}`, JSON.stringify(clientData));
  populateLoadProfileSelect();
});

function populateLoadProfileSelect() {
  loadProfileSelect.innerHTML = '<option value="">Load Profile</option>';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('profile_')) {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = key.replace('profile_', '');
      loadProfileSelect.appendChild(option);
    }
  }
}

loadProfileSelect.addEventListener('change', (e) => {
  const key = e.target.value;
  if (key) {
    clientData = JSON.parse(localStorage.getItem(key));
    updateTabs(currentAnalysis);
    updateGraph();
    saveState();
  }
});

// Reset form
resetFormBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to reset the form?')) {
    clientData = JSON.parse(JSON.stringify({
      client1: { personal: { name: "", dob: "", retirementAge: "" }, incomeSources: { employment: "", socialSecurity: "", other: "", interestDividends: "" }, accounts: [{ name: "", balance: "", contribution: "", employerMatch: "", ror: "" }], other: { assets: [{ name: "", balance: "", ror: "", debt: "" }] } },
      client2: { personal: { name: "", dob: "", retirementAge: "" }, incomeSources: { employment: "", socialSecurity: "", other: "", interestDividends: "" }, accounts: [{ name: "", balance: "", contribution: "", employerMatch: "", ror: "" }], other: { assets: [{ name: "", balance: "", ror: "", debt: "" }] } },
      isMarried: false,
      incomeNeeds: { monthly: "" },
      assumptions: { mortalityAge: "", inflation: "", rorRetirement: "", analysisDate: "", graphYears: "30", goalAmount: "" },
      savingsExpenses: { householdExpenses: "", taxes: "", otherExpenses: "", monthlySavings: "" },
      other: { cash: "", residenceMortgage: "", otherDebt: "" }
    }));
    updateTabs(currentAnalysis);
    updateGraph();
    saveState();
  }
});

// Setup guided tour
function setupGuidedTour() {
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      classes: 'shepherd-theme-dark',
      scrollTo: { behavior: 'smooth', block: 'center' }
    }
  });

  tour.addStep({
    id: 'welcome',
    text: 'Welcome to the Analysis tool! Let’s explore the key features.',
    buttons: [{ text: 'Next', action: tour.next }]
  });

  tour.addStep({
    id: 'topics',
    text: 'Switch between analysis types (e.g., Retirement Accumulation, Personal Finance) here.',
    attachTo: { element: '.analysis-topics', on: 'bottom' },
    buttons: [{ text: 'Back', action: tour.back }, { text: 'Next', action: tour.next }]
  });

  tour.addStep({
    id: 'tabs',
    text: 'Navigate tabs to input data for personal info, income, accounts, and more.',
    attachTo: { element: '.input-tabs', on: 'right' },
    buttons: [{ text: 'Back', action: tour.back }, { text: 'Next', action: tour.next }]
  });

  tour.addStep({
    id: 'graph',
    text: 'View your financial projections here. Toggle datasets and zoom for details.',
    attachTo: { element: '#analysis-chart', on: 'left' },
    buttons: [{ text: 'Back', action: tour.back }, { text: 'Next', action: tour.next }]
  });

  tour.addStep({
    id: 'controls',
    text: 'Save profiles, reset data, or undo/redo changes here.',
    attachTo: { element: '.data-controls', on: 'top' },
    buttons: [{ text: 'Back', action: tour.back }, { text: 'Finish', action: tour.complete }]
  });

  startTourBtn.addEventListener('click', () => tour.start());
}

// Update presentation reports
function updatePresentationReports() {
  const container = document.getElementById('presentation-reports');
  if (!container) return;

  container.innerHTML = '';
  (clientData.reports || []).forEach(report => {
    const li = document.createElement('li');
    li.textContent = report.replace(/-/g, ' ').toUpperCase();
    li.dataset.report = report;
    li.tabIndex = 0;
    container.appendChild(li);
  });

  new Sortable(container, {
    animation: 150,
    onEnd: () => {
      const newOrder = Array.from(container.children).map(li => li.dataset.report);
      clientData.reports = newOrder;
      saveState();
    }
  });
}

// Update graph
function updateGraph() {
  try {
    if (!chartCanvas) return;

    // Cache key
    const cacheKey = JSON.stringify({
      clientData,
      currentAnalysis,
      showAllLabels,
      toggleC1: toggleC1.checked,
      toggleC2: toggleC2.checked,
      toggleExpenses: toggleExpenses.checked
    });

    if (graphCache[cacheKey]) {
      if (chartInstance) chartInstance.destroy();
      chartInstance = new Chart(chartCanvas, graphCache[cacheKey]);
      chartCanvas.classList.add('pulse');
      setTimeout(() => chartCanvas.classList.remove('pulse'), 500);
      updateChartSummary();
      return;
    }

    const years = parseInt(clientData.assumptions.graphYears) || 30;
    const labels = Array.from({ length: years }, (_, i) => new Date().getFullYear() + i);
    const displayLabels = showAllLabels || years <= 20 ? labels : labels.filter((_, i) => i % 5 === 0);

    const datasets = [];
    let maxValue = 0;

    // Client 1
    if (toggleC1.checked) {
      const c1Data = calculateClientData('client1', years);
      datasets.push({
        label: clientData.client1.personal.name || 'Client 1',
        data: c1Data,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: false
      });
      maxValue = Math.max(maxValue, ...c1Data);
    }

    // Client 2
    if (toggleC2.checked && clientData.isMarried) {
      const c2Data = calculateClientData('client2', years);
      datasets.push({
        label: clientData.client2.personal.name || 'Client 2',
        data: c2Data,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: false
      });
      maxValue = Math.max(maxValue, ...c2Data);
    }

    // Expenses (Personal Finance)
    if (toggleExpenses.checked && currentAnalysis === 'personal-finance') {
      const expenseData = calculateExpenses(years);
      datasets.push({
        label: 'Expenses',
        data: expenseData,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        fill: false
      });
      maxValue = Math.max(maxValue, ...expenseData);
    }

    // Chart configuration
    const config = {
      type: 'line',
      data: { labels: displayLabels, datasets },
      options: {
        responsive: true,
        plugins: {
          zoom: {
            zoom: {
              wheel: { enabled: true },
              pinch: { enabled: true },
              mode: 'xy'
            },
            pan: { enabled: true, mode: 'xy' }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = currencyFormatter.format(context.parsed.y);
                return `${context.dataset.label}: ${value} in ${context.label}`;
              }
            }
          },
          annotation: {
            annotations: clientData.assumptions.goalAmount ? [{
              type: 'line',
              yMin: parseFloat(clientData.assumptions.goalAmount),
              yMax: parseFloat(clientData.assumptions.goalAmount),
              borderColor: '#f97316',
              borderWidth: 2,
              borderDash: [5, 5],
              label: {
                content: `Goal: ${currencyFormatter.format(clientData.assumptions.goalAmount)}`,
                enabled: true,
                position: 'end'
              }
            }] : []
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => currencyFormatter.format(value)
            },
            suggestedMax: maxValue * 1.1
          }
        }
      }
    };

    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(chartCanvas, config);
    graphCache[cacheKey] = config;
    chartCanvas.classList.add('pulse');
    setTimeout(() => chartCanvas.classList.remove('pulse'), 500);
    updateChartSummary();
  } catch (error) {
    console.error('Error in updateGraph:', error);
  }
}

// Calculate client data
function calculateClientData(clientKey, years) {
  const data = [];
  let total = 0;

  clientData[clientKey].accounts.forEach(account => {
    let balance = parseFloat(account.balance) || 0;
    const contribution = parseFloat(account.contribution) || 0;
    const employerMatch = parseFloat(account.employerMatch) / 100 || 0;
    const ror = parseFloat(account.ror) / 100 || 0;

    for (let i = 0; i < years; i++) {
      balance = balance * (1 + ror) + contribution * (1 + employerMatch);
      total += balance;
      data[i] = (data[i] || 0) + balance;
    }
  });

  return data;
}

// Calculate expenses (Personal Finance)
function calculateExpenses(years) {
  const data = [];
  const expenses = parseFloat(clientData.savingsExpenses.householdExpenses) +
                  parseFloat(clientData.savingsExpenses.taxes) +
                  parseFloat(clientData.savingsExpenses.otherExpenses);
  const inflation = parseFloat(clientData.assumptions.inflation) / 100 || 0;

  let total = expenses;
  for (let i = 0; i < years; i++) {
    data.push(total);
    total *= (1 + inflation);
  }

  return data;
}

// Update chart summary for screen readers
function updateChartSummary() {
  const datasets = chartInstance?.data.datasets || [];
  const summary = datasets.map(ds => `${ds.label}: ${currencyFormatter.format(ds.data[ds.data.length - 1] || 0)} after ${clientData.assumptions.graphYears} years`).join('. ');
  chartSummary.textContent = `Graph shows financial projections: ${summary}`;
}

// Graph controls
showAllLabelsBtn.addEventListener('click', () => {
  showAllLabels = !showAllLabels;
  showAllLabelsBtn.textContent = showAllLabels ? 'Show Fewer Labels' : 'Show All Labels';
  updateGraph();
});

[toggleC1, toggleC2, toggleExpenses].forEach(toggle => {
  toggle.addEventListener('change', updateGraph);
});

// Export graph
exportGraphBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = chartCanvas.toDataURL('image/png');
  link.download = 'analysis-chart.png';
  link.click();
});

// Export PDF
exportPdfBtn.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text('Financial Analysis Report', 10, 10);

  // Add inputs
  let y = 20;
  doc.text('Client Inputs:', 10, y);
  y += 10;
  for (const [key, value] of Object.entries(clientData)) {
    if (typeof value === 'object') {
      doc.text(`${key}:`, 10, y);
      y += 10;
      for (const [subKey, subValue] of Object.entries(value)) {
        doc.text(`${subKey}: ${JSON.stringify(subValue)}`, 20, y);
        y += 10;
      }
    } else {
      doc.text(`${key}: ${value}`, 10, y);
      y += 10;
    }
  }

  // Add graph
  const imgData = chartCanvas.toDataURL('image/png');
  doc.addImage(imgData, 'PNG', 10, y, 180, 100);
  doc.save('analysis-report.pdf');
});

// Report preview
document.querySelectorAll('#preview-reports-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = document.getElementById('report-preview-content');
    content.innerHTML = '<h3>Selected Reports</h3><ul>' +
      (clientData.reports || []).map(report => `<li>${report.replace(/-/g, ' ').toUpperCase()}</li>`).join('') +
      '</ul>';
    reportPreviewModal.showModal();
  });
});

reportPreviewModal.querySelector('.close').addEventListener('click', () => {
  reportPreviewModal.close();
});

reportPreviewModal.querySelector('.save-pdf-btn').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text('Report Preview', 10, 10);
  let y = 20;
  (clientData.reports || []).forEach(report => {
    doc.text(report.replace(/-/g, ' ').toUpperCase(), 10, y);
    y += 10;
  });
  doc.save('report-preview.pdf');
});

// Dark mode toggle
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// High contrast toggle
highContrastToggle.addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'z') {
    e.preventDefault();
    undoBtn.click();
  } else if (e.ctrlKey && e.key === 'y') {
    e.preventDefault
        redoBtn.click();
  }
});

// Error handling for invalid inputs
function handleInvalidInput(input, message) {
  input.classList.add('invalid');
  const errorSpan = input.nextElementSibling?.nextElementSibling?.classList.contains('error-message')
    ? input.nextElementSibling.nextElementSibling
    : null;
  if (!errorSpan) {
    const span = document.createElement('span');
    span.classList.add('error-message');
    span.textContent = message;
    input.parentElement.appendChild(span);
  }
}

// Clear error messages
function clearErrorMessage(input) {
  input.classList.remove('invalid');
  const errorSpan = input.nextElementSibling?.nextElementSibling?.classList.contains('error-message')
    ? input.nextElementSibling.nextElementSibling
    : null;
  if (errorSpan) errorSpan.remove();
}

// Initialize Chart.js plugins
Chart.register(ChartZoom);

// Clean up on page unload
window.addEventListener('unload', () => {
  if (chartInstance) chartInstance.destroy();
});

// Log initialization completion
console.log('analysis.js initialized successfully');
