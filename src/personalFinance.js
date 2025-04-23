export const personalFinanceTabs = [
  {
    id: 'personal',
    label: 'Personal',
    content: `
      <label>Marital Status: <input type="checkbox" id="is-married"></label>
      <div class="client">
        <h5>Client 1</h5>
        <label>Name: <input type="text" id="c1-name" placeholder="John Doe"></label>
      </div>
      <div class="client" id="client2-section" style="display: none;">
        <h5>Client 2</h5>
        <label>Name: <input type="text" id="c2-name" placeholder="Jane Doe"></label>
      </div>
    `
  },
  {
    id: 'income',
    label: 'Income',
    content: `
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
    `
  },
  {
    id: 'savings-expenses',
    label: 'Savings & Expenses',
    content: `
      <label>Household Expenses ($/yr): <input type="number" id="household-expenses" min="0" step="1000" placeholder="30000"></label>
      <label>Taxes ($/yr): <input type="number" id="taxes" min="0" step="1000" placeholder="15000"></label>
      <label>Other Expenses ($/yr): <input type="number" id="other-expenses" min="0" step="1000" placeholder="5000"></label>
      <label>Monthly Savings ($): <input type="number" id="monthly-savings" min="0" step="100" placeholder="2000"></label>
    `
  },
  {
    id: 'retirement',
    label: 'Retirement',
    content: `
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
    `
  },
  {
    id: 'other',
    label: 'Other',
    content: `
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
    `
  },
  {
    id: 'assumptions',
    label: 'Assumptions',
    content: `
      <label>Analysis Date: <input type="date" id="analysis-date"></label>
    `
  },
  {
    id: 'reports',
    label: 'Reports',
    content: `
      <div class="report-list">
        <label><input type="checkbox" class="report-checkbox" data-report="cash-flow"> Cash Flow</label>
        <label><input type="checkbox" class="report-checkbox" data-report="cash-flow-detail"> Cash Flow Detail</label>
        <label><input type="checkbox" class="report-checkbox" data-report="net-worth"> Net Worth</label>
        <label><input type="checkbox" class="report-checkbox" data-report="weighted-average-ror"> Weighted Average Rate of Return</label>
        <label><input type="checkbox" class="report-checkbox" data-report="fact-finder"> Fact Finder</label>
      </div>
    `
  }
];

export function updatePersonalFinanceGraph(chartCanvas, clientData, Chart) {
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
    let chartInstance = null;
    if (chartInstance) {
      chartInstance.destroy();
    }

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
  } catch (error) {
    console.error('Error in updatePersonalFinanceGraph:', error);
    const ctx = chartCanvas.getContext('2d');
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
        plugins: { title: { display: true, text: 'Error rendering graph' } }
      }
    });
  }
}

export function updatePersonalFinanceOutputs(analysisOutputs, clientData, formatCurrency) {
  try {
    if (!analysisOutputs) {
      console.error('Analysis outputs #analysis-outputs not found');
      return;
    }

    analysisOutputs.innerHTML = '<p class="output-card">Outputs available for Retirement Accumulation only.</p>';
    console.log('Personal Finance outputs rendered (placeholder)');
  } catch (error) {
    console.error('Error in updatePersonalFinanceOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-card">Unable to render outputs. Please ensure all required fields are filled correctly.</p>';
  }
}
