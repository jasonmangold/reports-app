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

// Define report options specific to Personal Finance
const reportOptions = [
  { id: 'output-graph', label: 'Net Worth Graph', reportId: 'report-net-worth-graph', title: 'Net Worth Graph' },
  { id: 'report-cash-flow', label: 'Cash Flow', reportId: 'report-cash-flow', title: 'Cash Flow' },
  { id: 'report-cash-flow-detail', label: 'Cash Flow Detail', reportId: 'report-cash-flow-detail', title: 'Cash Flow Detail' },
  { id: 'report-net-worth', label: 'Net Worth', reportId: 'report-net-worth', title: 'Net Worth' },
  { id: 'report-weighted-average-ror', label: 'Weighted Average ROR', reportId: 'report-weighted-average-ror', title: 'Weighted Average Rate of Return' },
  { id: 'report-fact-finder', label: 'Fact Finder', reportId: 'report-fact-finder', title: 'Personal Finance Fact Finder' }
];

export function updatePersonalFinanceGraph(chartCanvas, clientData, Chart) {
  try {
    if (!chartCanvas) {
      console.error('Chart canvas #analysis-chart not found');
      return null;
    }
    if (typeof Chart === 'undefined') {
      console.error('Chart.js not loaded');
      return null;
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
    return chartInstance;
  } catch (error) {
    console.error('Error in updatePersonalFinanceGraph:', error);
    const ctx = chartCanvas.getContext('2d');
    let chartInstance = new Chart(ctx, {
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
    return chartInstance;
  }
}

export function updatePersonalFinanceOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, Chart) {
  try {
    if (!analysisOutputs) {
      console.error('Analysis outputs #analysis-outputs not found');
      return;
    }

    // Get the tab container
    const tabContainer = document.getElementById('output-tabs-container');
    if (!tabContainer) {
      console.warn('Tab container #output-tabs-container not found; dropdown will be rendered in analysis-outputs');
    }

    // Calculate Net Worth and Cash Flow for reports
    let netWorth = 0;
    let totalAssets = 0;
    let totalLiabilities = 0;
    const assets = [];
    const liabilities = [];
    const clients = [clientData.client1, clientData.isMarried ? clientData.client2 : null];

    clients.forEach((client, idx) => {
      if (!client) return;
      client.accounts.forEach(account => {
        const balance = parseFloat(account.balance) || 0;
        if (balance > 0) {
          assets.push({
            name: `${client.personal.name || (idx === 0 ? 'Client 1' : 'Client 2')}'s ${account.name || 'Account'}`,
            balance: balance
          });
          totalAssets += balance;
        }
      });
      if (client.other && client.other.assets) {
        client.other.assets.forEach(asset => {
          const balance = parseFloat(asset.balance) || 0;
          const debt = parseFloat(asset.debt) || 0;
          if (balance > 0) {
            assets.push({
              name: asset.name || 'Other Asset',
              balance: balance
            });
            totalAssets += balance;
          }
          if (debt > 0) {
            liabilities.push({
              name: asset.name || 'Other Asset Debt',
              amount: debt
            });
            totalLiabilities += debt;
          }
        });
      }
    });

    const cash = parseFloat(clientData.other.cash) || 0;
    if (cash > 0) {
      assets.push({ name: 'Cash', balance: cash });
      totalAssets += cash;
    }

    const residenceMortgage = parseFloat(clientData.other.residenceMortgage) || 0;
    if (residenceMortgage > 0) {
      liabilities.push({ name: 'Residence/Mortgage', amount: residenceMortgage });
      totalLiabilities += residenceMortgage;
    }

    const otherDebt = parseFloat(clientData.other.otherDebt) || 0;
    if (otherDebt > 0) {
      liabilities.push({ name: 'Other Debt', amount: otherDebt });
      totalLiabilities += otherDebt;
    }

    netWorth = totalAssets - totalLiabilities;

    // Calculate Cash Flow
    const annualSavings = (parseFloat(clientData.savingsExpenses.monthlySavings) || 0) * 12;
    const expenses = (parseFloat(clientData.savingsExpenses.householdExpenses) || 0) +
                    (parseFloat(clientData.savingsExpenses.taxes) || 0) +
                    (parseFloat(clientData.savingsExpenses.otherExpenses) || 0);
    const income = (parseFloat(clientData.client1.incomeSources.employment) || 0) +
                   (clientData.isMarried ? parseFloat(clientData.client2.incomeSources.employment) || 0 : 0) +
                   (parseFloat(clientData.client1.incomeSources.interestDividends) || 0) +
                   (parseFloat(clientData.client1.incomeSources.other) || 0);
    const cashFlow = income + annualSavings - expenses;

    // Calculate Weighted Average ROR
    let totalWeightedROR = 0;
    let totalBalanceForROR = 0;
    clients.forEach((client, idx) => {
      if (!client) return;
      client.accounts.forEach(account => {
        const balance = parseFloat(account.balance) || 0;
        const ror = parseFloat(account.ror) || 0;
        totalWeightedROR += balance * ror;
        totalBalanceForROR += balance;
      });
      if (client.other && client.other.assets) {
        client.other.assets.forEach(asset => {
          const balance = parseFloat(asset.balance) || 0;
          const ror = parseFloat(asset.ror) || 0;
          totalWeightedROR += balance * ror;
          totalBalanceForROR += balance;
        });
      }
    });
    const weightedAverageROR = totalBalanceForROR > 0 ? (totalWeightedROR / totalBalanceForROR).toFixed(2) : 0;

    // Preserve the current dropdown selection
    const select = document.getElementById('output-select');
    const currentSelection = select ? select.value : 'output-graph';

    // Render Dropdown and Checkbox in output-tabs-container
    if (tabContainer) {
      tabContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div class="output-dropdown">
            <label for="output-select">Select View: </label>
            <select id="output-select" class="output-select">
              ${reportOptions.map(option => `
                <option value="${option.id}" ${option.id === currentSelection ? 'selected' : ''}>${option.label}</option>
              `).join('')}
            </select>
          </div>
          <label class="add-to-presentation-checkbox">
            <input type="checkbox" id="add-to-presentation" data-report="${reportOptions.find(opt => opt.id === currentSelection).reportId}" data-title="${reportOptions.find(opt => opt.id === currentSelection).title}">
            Add to Presentation
          </label>
        </div>
      `;
    }

    // Render Content in analysis-outputs
    analysisOutputs.innerHTML = `
      ${!tabContainer ? `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div class="output-dropdown">
            <label for="output-select">Select View: </label>
            <select id="output-select" class="output-select">
              ${reportOptions.map(option => `
                <option value="${option.id}" ${option.id === currentSelection ? 'selected' : ''}>${option.label}</option>
              `).join('')}
            </select>
          </div>
          <label class="add-to-presentation-checkbox">
            <input type="checkbox" id="add-to-presentation" data-report="${reportOptions.find(opt => opt.id === currentSelection).reportId}" data-title="${reportOptions.find(opt => opt.id === currentSelection).title}">
            Add to Presentation
          </label>
        </div>
      ` : ''}
      <div class="output-tab-content ${currentSelection === 'output-graph' ? 'active' : ''}" id="output-graph" style="display: ${currentSelection === 'output-graph' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Net Worth Graph</h3>
          <canvas id="analysis-chart" style="max-height: 400px;"></canvas>
        </div>
      </div>
      <div class="output-tab-content ${currentSelection === 'report-cash-flow' ? 'active' : ''}" id="report-cash-flow" style="display: ${currentSelection === 'report-cash-flow' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Cash Flow</h3>
          <table class="output-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Income</td>
                <td>${formatCurrency(income)}</td>
              </tr>
              <tr>
                <td>Total Expenses</td>
                <td>${formatCurrency(expenses)}</td>
              </tr>
              <tr>
                <td>Annual Savings</td>
                <td>${formatCurrency(annualSavings)}</td>
              </tr>
              <tr>
                <td><strong>Net Cash Flow</strong></td>
                <td><strong>${formatCurrency(cashFlow)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="output-tab-content ${currentSelection === 'report-cash-flow-detail' ? 'active' : ''}" id="report-cash-flow-detail" style="display: ${currentSelection === 'report-cash-flow-detail' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Cash Flow Detail</h3>
          <table class="output-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${clientData.client1.personal.name || 'Client 1'} Employment Income</td>
                <td>${formatCurrency(parseFloat(clientData.client1.incomeSources.employment) || 0)}</td>
              </tr>
              ${clientData.isMarried ? `
              <tr>
                <td>${clientData.client2.personal.name || 'Client 2'} Employment Income</td>
                <td>${formatCurrency(parseFloat(clientData.client2.incomeSources.employment) || 0)}</td>
              </tr>
              ` : ''}
              <tr>
                <td>Interest and Dividends</td>
                <td>${formatCurrency(parseFloat(clientData.client1.incomeSources.interestDividends) || 0)}</td>
              </tr>
              <tr>
                <td>Other Income</td>
                <td>${formatCurrency(parseFloat(clientData.client1.incomeSources.other) || 0)}</td>
              </tr>
              <tr>
                <td>Household Expenses</td>
                <td>${formatCurrency(parseFloat(clientData.savingsExpenses.householdExpenses) || 0)}</td>
              </tr>
              <tr>
                <td>Taxes</td>
                <td>${formatCurrency(parseFloat(clientData.savingsExpenses.taxes) || 0)}</td>
              </tr>
              <tr>
                <td>Other Expenses</td>
                <td>${formatCurrency(parseFloat(clientData.savingsExpenses.otherExpenses) || 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="output-tab-content ${currentSelection === 'report-net-worth' ? 'active' : ''}" id="report-net-worth" style="display: ${currentSelection === 'report-net-worth' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Net Worth</h3>
          <h4>Assets</h4>
          <table class="output-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              ${assets.map(asset => `
                <tr>
                  <td>${asset.name}</td>
                  <td>${formatCurrency(asset.balance)}</td>
                </tr>
              `).join('')}
              <tr>
                <td><strong>Total Assets</strong></td>
                <td><strong>${formatCurrency(totalAssets)}</strong></td>
              </tr>
            </tbody>
          </table>
          <h4>Liabilities</h4>
          <table class="output-table">
            <thead>
              <tr>
                <th>Liability</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${liabilities.map(liability => `
                <tr>
                  <td>${liability.name}</td>
                  <td>${formatCurrency(liability.amount)}</td>
                </tr>
              `).join('')}
              <tr>
                <td><strong>Total Liabilities</strong></td>
                <td><strong>${formatCurrency(totalLiabilities)}</strong></td>
              </tr>
            </tbody>
          </table>
          <h4>Summary</h4>
          <table class="output-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Assets</td>
                <td>${formatCurrency(totalAssets)}</td>
              </tr>
              <tr>
                <td>Total Liabilities</td>
                <td>${formatCurrency(totalLiabilities)}</td>
              </tr>
              <tr>
                <td><strong>Net Worth</strong></td>
                <td><strong>${formatCurrency(netWorth)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="output-tab-content ${currentSelection === 'report-weighted-average-ror' ? 'active' : ''}" id="report-weighted-average-ror" style="display: ${currentSelection === 'report-weighted-average-ror' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Weighted Average Rate of Return</h3>
          <table class="output-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Weighted Average ROR</td>
                <td>${weightedAverageROR}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="output-tab-content ${currentSelection === 'report-fact-finder' ? 'active' : ''}" id="report-fact-finder" style="display: ${currentSelection === 'report-fact-finder' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Personal Finance Fact Finder</h3>
          <table class="output-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Client 1</th>
                ${clientData.isMarried ? '<th>Client 2</th>' : ''}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>${clientData.client1.personal.name || 'N/A'}</td>
                ${clientData.isMarried ? `<td>${clientData.client2.personal.name || 'N/A'}</td>` : ''}
              </tr>
            </tbody>
          </table>
          <h4>Income Sources</h4>
          <table class="output-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Client 1</th>
                ${clientData.isMarried ? '<th>Client 2</th>' : ''}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Employment ($/yr)</td>
                <td>${formatCurrency(parseFloat(clientData.client1.incomeSources.employment) || 0)}</td>
                ${clientData.isMarried ? `<td>${formatCurrency(parseFloat(clientData.client2.incomeSources.employment) || 0)}</td>` : ''}
              </tr>
              <tr>
                <td>Interest and Dividends ($/yr)</td>
                <td>${formatCurrency(parseFloat(clientData.client1.incomeSources.interestDividends) || 0)}</td>
                ${clientData.isMarried ? `<td>${formatCurrency(parseFloat(clientData.client2.incomeSources.interestDividends) || 0)}</td>` : ''}
              </tr>
              <tr>
                <td>Other Income ($/yr)</td>
                <td>${formatCurrency(parseFloat(clientData.client1.incomeSources.other) || 0)}</td>
                ${clientData.isMarried ? `<td>${formatCurrency(parseFloat(clientData.client2.incomeSources.other) || 0)}</td>` : ''}
              </tr>
            </tbody>
          </table>
          <h4>Savings & Expenses</h4>
          <table class="output-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Household Expenses ($/yr)</td>
                <td>${formatCurrency(parseFloat(clientData.savingsExpenses.householdExpenses) || 0)}</td>
              </tr>
              <tr>
                <td>Taxes ($/yr)</td>
                <td>${formatCurrency(parseFloat(clientData.savingsExpenses.taxes) || 0)}</td>
              </tr>
              <tr>
                <td>Other Expenses ($/yr)</td>
                <td>${formatCurrency(parseFloat(clientData.savingsExpenses.otherExpenses) || 0)}</td>
              </tr>
              <tr>
                <td>Monthly Savings ($)</td>
                <td>${formatCurrency(parseFloat(clientData.savingsExpenses.monthlySavings) || 0)}</td>
              </tr>
            </tbody>
          </table>
          <h4>Assumptions</h4>
          <table class="output-table">
            <thead>
              <tr>
                <th>Assumption</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Analysis Date</td>
                <td>${clientData.assumptions.analysisDate || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Setup dropdown and checkbox interactions
    setupOutputControls(reportOptions, selectedReports, clientData, Chart);

    // Render the graph if the current selection is output-graph
    if (currentSelection === 'output-graph') {
      const chartCanvas = document.getElementById('analysis-chart');
      if (chartCanvas && typeof Chart !== 'undefined') {
        setTimeout(() => {
          updatePersonalFinanceGraph(chartCanvas, clientData, Chart);
        }, 100);
      }
    }
  } catch (error) {
    console.error('Error in updatePersonalFinanceOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-card">Unable to render outputs. Please ensure all required fields are filled correctly.</p>';
    if (tabContainer) tabContainer.innerHTML = '';
  }
}

// Setup dropdown and checkbox interactions
function setupOutputControls(reportOptions, selectedReports, clientData, Chart) {
  try {
    const select = document.getElementById('output-select');
    const checkbox = document.getElementById('add-to-presentation');
    if (!select || !checkbox) {
      console.warn('Dropdown #output-select or checkbox #add-to-presentation not found');
      return;
    }

    // Function to update checkbox state based on selected option
    const updateCheckboxState = () => {
      const selectedOption = reportOptions.find(option => option.id === select.value);
      if (selectedOption) {
        checkbox.dataset.report = selectedOption.reportId;
        checkbox.dataset.title = selectedOption.title;
        checkbox.checked = selectedReports.some(r => r.id === selectedOption.reportId);
      }
    };

    // Initial state
    updateCheckboxState();

    // Update checkbox state when dropdown changes
    select.removeEventListener('change', outputDropdownChangeHandler);
    select.addEventListener('change', function() {
      outputDropdownChangeHandler.call(this, clientData, Chart);
      updateCheckboxState();
    });

    // Handle checkbox change by dispatching a custom event
    checkbox.addEventListener('change', () => {
      const event = new CustomEvent('addToPresentationToggle', {
        detail: {
          reportId: checkbox.dataset.report,
          reportTitle: checkbox.dataset.title
        },
        bubbles: true
      });
      checkbox.dispatchEvent(event);
    });
  } catch (error) {
    console.error('Error in setupOutputControls:', error);
  }
}

// Dropdown change handler
function outputDropdownChangeHandler(clientData, Chart) {
  try {
    const selectedTab = this.value;
    document.querySelectorAll('.output-tab-content').forEach(content => {
      content.style.display = content.id === selectedTab ? 'block' : 'none';
    });
    if (selectedTab === 'output-graph') {
      setTimeout(() => {
        const chartCanvas = document.getElementById('analysis-chart');
        if (chartCanvas && typeof Chart !== 'undefined') {
          updatePersonalFinanceGraph(chartCanvas, clientData, Chart);
        }
      }, 100); // Re-render graph when switching to graph tab
    }
  } catch (error) {
    console.error('Error in outputDropdownChangeHandler:', error);
  }
}
