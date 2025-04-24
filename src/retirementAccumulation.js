export const retirementAccumulationTabs = [
  {
    id: 'personal',
    label: 'Personal',
    content: `
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
    `
  },
  {
    id: 'income-needs',
    label: 'Income Needs',
    content: `
      <label>Monthly Income Needs ($): <input type="number" id="monthly-income" min="0" step="100" placeholder="5000"></label>
    `
  },
  {
    id: 'income-sources',
    label: 'Income Sources',
    content: `
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
    `
  },
  {
    id: 'capital',
    label: 'Capital',
    content: `
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
    `
  },
  {
    id: 'assumptions',
    label: 'Assumptions',
    content: `
      <label>Mortality Age: <input type="number" id="mortality-age" min="1" max="120" placeholder="90"></label>
      <label>Inflation (%): <input type="number" id="inflation" min="0" max="100" step="0.1" placeholder="2"></label>
      <label>ROR During Retirement (%): <input type="number" id="ror-retirement" min="0" max="100" step="0.1" placeholder="4"></label>
    `
  },
  {
    id: 'reports',
    label: 'Reports',
    content: `
      <div class="report-list">
        <label><input type="checkbox" class="report-checkbox" data-report="retirement-analysis"> Retirement Analysis</label>
        <label><input type="checkbox" class="report-checkbox" data-report="social-security-optimizer"> Social Security Optimizer</label>
        <label><input type="checkbox" class="report-checkbox" data-report="capital-available"> Capital Available for Retirement</label>
        <label><input type="checkbox" class="report-checkbox" data-report="alternatives-retirement"> Alternatives to Achieving Retirement Goals</label>
        <label><input type="checkbox" class="report-checkbox" data-report="retirement-timeline"> Retirement Timeline</label>
        <label><input type="checkbox" class="report-checkbox" data-report="retirement-fact-finder"> Retirement Analysis Fact Finder</label>
      </div>
    `
  }
];

// Helper function to calculate retirement income data
function calculateRetirementIncome(clientData, getAge) {
  const result = {
    labels: [],
    socialSecurityData: [],
    otherIncomeData: [],
    capitalData: [],
    shortfallData: [],
    totalBalance: 0,
    depletionAge: 0
  };

  try {
    const c1Age = getAge(clientData.client1.personal.dob);
    const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
    const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
    const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
    const startAge = Math.max(c1RetirementAge, c2RetirementAge);
    const mortalityAge = parseFloat(clientData.assumptions.mortalityAge) || 90;
    const inflation = parseFloat(clientData.assumptions.inflation) / 100 || 0.02;
    const rorRetirement = parseFloat(clientData.assumptions.rorRetirement) / 100 || 0.04;
    const monthlyNeed = parseFloat(clientData.incomeNeeds.monthly) || 5000;

    if (!clientData.client1.personal.dob || c1Age >= c1RetirementAge || (clientData.isMarried && (!clientData.client2.personal.dob || c2Age >= c2RetirementAge))) {
      return result; // Empty result for invalid inputs
    }
    if (startAge >= mortalityAge) {
      return result; // Empty result for invalid ages
    }

    const yearsToRetirement = startAge - c1Age;
    let totalBalance = 0;
    [clientData.client1, clientData.isMarried ? clientData.client2 : null].forEach((client, idx) => {
      if (!client) return;
      const clientRetirementAge = idx === 0 ? c1RetirementAge : c2RetirementAge;
      const yearsToClientRetirement = clientRetirementAge - (idx === 0 ? c1Age : c2Age);
      client.accounts.forEach(account => {
        let tempBalance = parseFloat(account.balance) || 0;
        const contribution = parseFloat(account.contribution) || 0;
        const employerMatch = (parseFloat(account.employerMatch) / 100) * contribution || 0;
        const ror = parseFloat(account.ror) / 100 || 0.06;
        for (let i = 0; i < yearsToClientRetirement; i++) {
          tempBalance += tempBalance * ror + contribution + employerMatch;
        }
        if (yearsToClientRetirement < yearsToRetirement) {
          for (let i = yearsToClientRetirement; i < yearsToRetirement; i++) {
            tempBalance += tempBalance * rorRetirement;
          }
        }
        totalBalance += tempBalance;
      });
    });
    clientData.client1.other.assets.forEach(asset => {
      let tempBalance = parseFloat(asset.balance) || 0;
      const ror = parseFloat(asset.ror) / 100 || 0.06;
      for (let i = 0; i < yearsToRetirement; i++) {
        tempBalance += tempBalance * ror;
      }
      totalBalance += tempBalance;
    });
    if (clientData.isMarried) {
      clientData.client2.other.assets.forEach(asset => {
        let tempBalance = parseFloat(asset.balance) || 0;
        const ror = parseFloat(asset.ror) / 100 || 0.06;
        for (let i = 0; i < yearsToRetirement; i++) {
          tempBalance += tempBalance * ror;
        }
        totalBalance += tempBalance;
      });
    }

    let balance = totalBalance;
    result.totalBalance = totalBalance;
    result.depletionAge = startAge;

    for (let i = 0; i <= mortalityAge - startAge; i++) {
      const currentAge = startAge + i;
      result.labels.push(currentAge);
      const adjustedMonthlyNeed = monthlyNeed * Math.pow(1 + inflation, i);
      let socialSecurity = 0;
      if (currentAge >= c1RetirementAge) {
        socialSecurity += parseFloat(clientData.client1.incomeSources.socialSecurity) || 0;
      }
      if (clientData.isMarried && currentAge >= c2RetirementAge) {
        socialSecurity += parseFloat(clientData.client2.incomeSources.socialSecurity) || 0;
      }
      result.socialSecurityData.push(socialSecurity);
      const otherIncome = parseFloat(clientData.client1.incomeSources.other) || 0;
      result.otherIncomeData.push(otherIncome);
      const remainingNeed = adjustedMonthlyNeed - socialSecurity - otherIncome;
      let capitalWithdrawal = 0;
      let shortfall = 0;
      if (remainingNeed > 0) {
        const annualWithdrawal = remainingNeed * 12;
        const availableBalance = balance * (1 + rorRetirement);
        if (availableBalance >= annualWithdrawal) {
          capitalWithdrawal = remainingNeed;
          balance = availableBalance - annualWithdrawal;
        } else {
          capitalWithdrawal = availableBalance / 12;
          shortfall = remainingNeed - capitalWithdrawal;
          balance = 0;
        }
      }
      result.capitalData.push(capitalWithdrawal);
      result.shortfallData.push(shortfall);
      if (balance <= 0 && capitalWithdrawal === 0 && socialSecurity === 0 && otherIncome === 0 && shortfall > 0) {
        result.depletionAge = currentAge;
        break;
      }
      result.depletionAge = balance > 0 ? mortalityAge : currentAge;
    }
  } catch (error) {
    console.error('Error in calculateRetirementIncome:', error);
  }
  return result;
}

export function updateRetirementGraph(chartCanvas, clientData, Chart) {
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

    const incomeData = calculateRetirementIncome(clientData, getAge);
    if (!incomeData.labels.length) {
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
      return chartInstance;
    }

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: incomeData.labels,
        datasets: [
          {
            label: 'Social Security',
            data: incomeData.socialSecurityData,
            backgroundColor: '#22c55e',
            stack: 'Stack0'
          },
          {
            label: 'Other Income',
            data: incomeData.otherIncomeData,
            backgroundColor: '#3b82f6',
            stack: 'Stack0'
          },
          {
            label: 'Capital',
            data: incomeData.capitalData,
            backgroundColor: '#f97316',
            stack: 'Stack0'
          },
          {
            label: 'Shortfall',
            data: incomeData.shortfallData,
            backgroundColor: '#ef4444',
            stack: 'Stack0'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
          title: { display: true, text: 'Retirement Income Sources by Age' }
        },
        scales: {
          x: { title: { display: true, text: 'Client 1 Age' }, stacked: true },
          y: { title: { display: true, text: 'Monthly Income ($)' }, stacked: true, beginAtZero: true }
        }
      }
    });
    console.log('Retirement Accumulation bar graph rendered');
    return chartInstance;
  } catch (error) {
    console.error('Error in updateRetirementGraph:', error);
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
    return chartInstance;
  }
}

export function updateRetirementOutputs(analysisOutputs, clientData, formatCurrency, getAge) {
  try {
    if (!analysisOutputs) {
      console.error('Analysis outputs #analysis-outputs not found');
      return;
    }

    // Get the tab container
    const tabContainer = document.getElementById('output-tabs-container');
    if (!tabContainer) {
      console.warn('Tab container #output-tabs-container not found; tabs will be rendered in analysis-outputs');
    }

    const c1Age = getAge(clientData.client1.personal.dob);
    const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
    const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
    const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
    const mortalityAge = parseFloat(clientData.assumptions.mortalityAge) || 90;
    const inflation = parseFloat(clientData.assumptions.inflation) / 100 || 0.02;
    const rorRetirement = parseFloat(clientData.assumptions.rorRetirement) / 100 || 0.04;
    const monthlyNeed = parseFloat(clientData.incomeNeeds.monthly) || 5000;

    // Add defensive checks for missing properties
    clientData.client1.other = clientData.client1.other || { assets: [] };
    clientData.client2 = clientData.client2 || { other: { assets: [] } };
    const currentSavings = parseFloat(clientData.savingsExpenses?.monthlySavings) || 0;

    if (c1Age >= c1RetirementAge || (clientData.isMarried && c2Age >= c2RetirementAge)) {
      analysisOutputs.innerHTML = '<p class="output-card">Client(s) already at or past retirement age. Please adjust retirement age or DOB.</p>';
      if (tabContainer) tabContainer.innerHTML = ''; // Clear tabs on error
      return;
    }
    if (c1RetirementAge >= mortalityAge || (clientData.isMarried && c2RetirementAge >= mortalityAge)) {
      analysisOutputs.innerHTML = '<p class="output-card">Retirement age must be less than mortality age.</p>';
      if (tabContainer) tabContainer.innerHTML = ''; // Clear tabs on error
      return;
    }

    const incomeGoals = [
      { age: c1RetirementAge, percentage: 100, amount: monthlyNeed },
      { age: c1RetirementAge + 10, percentage: 80, amount: monthlyNeed * 0.8 },
      { age: c1RetirementAge + 15, percentage: 70, amount: monthlyNeed * 0.7 }
    ];

    const incomeSources = [];
    if (clientData.client1.incomeSources.employment && c1Age < c1RetirementAge) {
      incomeSources.push({
        source: `${clientData.client1.personal.name || 'Client 1'}'s Employment Income`,
        details: `Until age ${c1RetirementAge}`,
        amount: parseFloat(clientData.client1.incomeSources.employment) / 12 || 0
      });
    }
    if (clientData.isMarried && clientData.client2.incomeSources?.employment && c2Age < c2RetirementAge) {
      incomeSources.push({
        source: `${clientData.client2.personal?.name || 'Client 2'}'s Employment Income`,
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
    if (clientData.isMarried && clientData.client2.incomeSources?.socialSecurity) {
      incomeSources.push({
        source: `${clientData.client2.personal?.name || 'Client 2'}'s Social Security`,
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
    if (clientData.isMarried && clientData.client2.accounts) {
      clientData.client2.accounts.forEach(account => {
        const balance = parseFloat(account.balance) || 0;
        if (balance > 0) {
          assets.push({
            name: `${clientData.client2.personal?.name || 'Client 2'}'s ${account.name || 'Retirement Account'}`,
            balance
          });
        }
      });
    }
    clientData.client1.other.assets.forEach(asset => {
      const balance = parseFloat(asset.balance) || 0;
      if (balance > 0) {
        assets.push({
          name: asset.name || 'Other Asset',
          balance
        });
        totalAssets += balance;
      }
    });
    if (clientData.isMarried) {
      clientData.client2.other.assets.forEach(asset => {
        const balance = parseFloat(asset.balance) || 0;
        if (balance > 0) {
          assets.push({
            name: asset.name || 'Other Asset',
            balance
          });
          totalAssets += balance;
        }
      });
    }

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

    let additionalSavings = 0;
    let requiredAtRetirement = 0;
    if (depletionAge < mortalityAge) {
      const yearsShort = mortalityAge - depletionAge;
      const annualNeed = (monthlyNeed - monthlySources) * 12;
      requiredAtRetirement = annualNeed * (1 - Math.pow(1 + rorRetirement, -yearsShort)) / rorRetirement;
      const yearsToSave = yearsToRetirement;
      additionalSavings = requiredAtRetirement / ((Math.pow(1 + rorRetirement, yearsToSave) - 1) / rorRetirement);
    }

    // Calculate Alternatives
    const incomeData = calculateRetirementIncome(clientData, getAge);
    let targetROR = rorRetirement;
    if (depletionAge < mortalityAge) {
      let low = rorRetirement;
      let high = 0.2; // Max 20% ROR
      for (let i = 0; i < 20; i++) {
        const mid = (low + high) / 2;
        let tempBalance = incomeData.totalBalance;
        for (let j = 0; j < mortalityAge - c1RetirementAge; j++) {
          const currentNeed = monthlyNeed * Math.pow(1 + inflation, j) - monthlySources;
          tempBalance = tempBalance * (1 + mid) - (currentNeed > 0 ? currentNeed * 12 : 0);
          if (tempBalance <= 0) break;
        }
        if (tempBalance > 0) high = mid;
        else low = mid;
      }
      targetROR = (low + high) / 2;
    }

    let reducedMonthlyNeed = monthlyNeed;
    if (depletionAge < mortalityAge) {
      let low = 0;
      let high = monthlyNeed;
      for (let i = 0; i < 20; i++) {
        const mid = (low + high) / 2;
        let tempBalance = incomeData.totalBalance;
        for (let j = 0; j < mortalityAge - c1RetirementAge; j++) {
          const currentNeed = mid * Math.pow(1 + inflation, j) - monthlySources;
          tempBalance = tempBalance * (1 + rorRetirement) - (currentNeed > 0 ? currentNeed * 12 : 0);
          if (tempBalance <= 0) break;
        }
        if (tempBalance > 0) high = mid;
        else low = mid;
      }
      reducedMonthlyNeed = (low + high) / 2;
    }

    let newRetirementAge = c1RetirementAge;
    if (depletionAge < mortalityAge) {
      const yearsNeeded = mortalityAge - depletionAge;
      newRetirementAge = Math.ceil(c1RetirementAge + yearsNeeded);
      if (newRetirementAge > mortalityAge) newRetirementAge = mortalityAge;
    }

    // Render Tabs in output-tabs-container
    if (tabContainer) {
      tabContainer.innerHTML = `
        <div class="output-tabs">
          <button class="output-tab-btn active" data-tab="output-graph">Graph</button>
          <button class="output-tab-btn" data-tab="output-timeline">Timeline</button>
          <button class="output-tab-btn" data-tab="output-alternatives">Alternatives</button>
        </div>
      `;
    }

    // Render Content in analysis-outputs
    analysisOutputs.innerHTML = `
      ${!tabContainer ? `
        <div class="output-tabs">
          <button class="output-tab-btn active" data-tab="output-graph">Graph</button>
          <button class="output-tab-btn" data-tab="output-timeline">Timeline</button>
          <button class="output-tab-btn" data-tab="output-alternatives">Alternatives</button>
        </div>
      ` : ''}
      <div class="output-tab-content active" id="output-graph">
        <div class="output-card">
          <h3>Retirement Income Graph</h3>
          <canvas id="analysis-chart" style="max-width: 100%;"></canvas>
        </div>
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
      </div>
      <div class="output-tab-content" id="output-timeline" style="display: none;">
        <div class="output-card">
          <h3>Retirement Income Timeline</h3>
          <table class="timeline-table">
            <thead>
              <tr>
                <th>Age</th>
                <th>Social Security ($)</th>
                <th>Other Income ($)</th>
                <th>Capital ($)</th>
                <th>Shortfall ($)</th>
              </tr>
            </thead>
            <tbody>
              ${incomeData.labels.map((age, i) => `
                <tr style="${age === c1Age ? 'font-weight: bold; background: #eff6ff;' : age === c1RetirementAge ? 'font-weight: bold; background: #d1e7ff;' : age === incomeData.depletionAge ? 'font-weight: bold; background: #ffe4e1;' : ''}">
                  <td>${age}${age === c1Age ? ' (Current)' : age === c1RetirementAge ? ' (Retirement)' : age === incomeData.depletionAge ? ' (Depletion)' : ''}</td>
                  <td>${formatCurrency(incomeData.socialSecurityData[i])}</td>
                  <td>${formatCurrency(incomeData.otherIncomeData[i])}</td>
                  <td>${formatCurrency(incomeData.capitalData[i])}</td>
                  <td>${formatCurrency(incomeData.shortfallData[i])}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="output-tab-content" id="output-alternatives" style="display: none;">
        <div class="output-card">
          <h3>Alternatives to Achieve Retirement Goals</h3>
          <ul class="alternatives-list">
            <li><strong>Save More:</strong> Increase monthly savings by ${formatCurrency(additionalSavings)} to meet retirement needs.</li>
            <li><strong>Earn Greater Rate of Return:</strong> Target a ${Math.round(targetROR * 10000) / 100}% annual return during retirement to avoid shortfall.</li>
            <li><strong>Reduce Expenses:</strong> Lower monthly income needs to ${formatCurrency(reducedMonthlyNeed)} to sustain funds until age ${mortalityAge}.</li>
            <li><strong>Retire Later:</strong> Delay retirement to age ${newRetirementAge} to extend funds to age ${mortalityAge}.</li>
          </ul>
        </div>
      </div>
    `;

    // Render the graph after the canvas is added to the DOM
    const chartCanvas = document.getElementById('analysis-chart');
    if (chartCanvas) {
      updateRetirementGraph(chartCanvas, clientData, window.Chart);
    }

    console.log('Retirement outputs with tabs rendered');
  } catch (error) {
    console.error('Error in updateRetirementOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-card">Unable to render outputs. Please ensure all required fields (DOB, retirement age, mortality age, income needs) are filled correctly.</p>';
    if (tabContainer) tabContainer.innerHTML = ''; // Clear tabs on error
  }
}

// Helper function (temporary until moved to utils.js or imported from index.js)
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
