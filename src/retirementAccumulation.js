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
        <div id="c1-age-display" class="age-display"></div>
        <label>Retirement Age: <input type="number" id="c1-retirement-age" min="1" max="120" placeholder="65"></label>
      </div>
      <div class="client" id="client2-section" style="display: none;">
        <h5>Client 2</h5>
        <label>Name: <input type="text" id="c2-name" placeholder="Jane Doe"></label>
        <label>Date of Birth: <input type="date" id="c2-dob"></label>
        <div id="c2-age-display" class="age-display"></div>
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
      <label>Client 1 Mortality Age: <input type="number" id="c1-mortality-age" min="1" max="120" placeholder="90"></label>
      <label id="c2-mortality-label" style="display: none;">Client 2 Mortality Age: <input type="number" id="c2-mortality-age" min="1" max="120" placeholder="90"></label>
      <label>Inflation (%): <input type="number" id="inflation" min="0" max="100" step="0.1" placeholder="2"></label>
      <label>ROR During Retirement (%): <input type="number" id="ror-retirement" min="0" max="100" step="0.1" placeholder="4"></label>
    `
  }
];

// Setup age display listeners
export function setupAgeDisplayListeners(getAge) {
  try {
    const dobInputs = document.querySelectorAll('#c1-dob, #c2-dob');
    const isMarriedInput = document.getElementById('is-married');
    const c2MortalityLabel = document.getElementById('c2-mortality-label');

    dobInputs.forEach(input => {
      input.addEventListener('change', () => {
        const clientPrefix = input.id.split('-')[0];
        const ageDisplay = document.getElementById(`${clientPrefix}-age-display`);
        const dob = input.value;
        const age = getAge(dob);
        if (age > 0) {
          ageDisplay.textContent = `Current Age: ${age}`;
        } else {
          ageDisplay.textContent = '';
        }
      });

      if (input.value) {
        const event = new Event('change');
        input.dispatchEvent(event);
      }
    });

    if (isMarriedInput && c2MortalityLabel) {
      isMarriedInput.addEventListener('change', () => {
        c2MortalityLabel.style.display = isMarriedInput.checked ? 'block' : 'none';
        const c2Dob = document.getElementById('c2-dob');
        if (c2Dob && isMarriedInput.checked && c2Dob.value) {
          const event = new Event('change');
          c2Dob.dispatchEvent(event);
        }
      });

      c2MortalityLabel.style.display = isMarriedInput.checked ? 'block' : 'none';
    }
  } catch (error) {
    console.error('Error in setupAgeDisplayListeners:', error);
  }
}

// Calculate retirement income and balance data
export function calculateRetirementIncome(clientData, getAge) {
  const result = {
    labels: [],
    needData: [],
    incomeData: [],
    socialSecurityData: [],
    withdrawalData: [],
    earningsData: [],
    balanceData: [],
    shortfallData: [],
    totalBalance: 0,
    depletionAge: 0,
    totalShortfall: 0
  };

  try {
    const c1Age = getAge(clientData.client1.personal.dob);
    const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
    const ageDifference = c1Age - c2Age;
    const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
    const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
    const startAge = Math.max(c1RetirementAge, c2RetirementAge);

    const c1MortalityAgeRaw = parseFloat(clientData.assumptions.c1MortalityAge) || parseFloat(clientData.assumptions.mortalityAge) || 90;
    const c2MortalityAgeRaw = clientData.isMarried ? (parseFloat(clientData.assumptions.c2MortalityAge) || parseFloat(clientData.assumptions.mortalityAge) || 90) : c1MortalityAgeRaw;
    const c1MortalityAge = isNaN(c1MortalityAgeRaw) || c1MortalityAgeRaw < c1RetirementAge ? 90 : Math.min(c1MortalityAgeRaw, 120);
    const c2MortalityAge = isNaN(c2MortalityAgeRaw) || c2MortalityAgeRaw < c2RetirementAge ? 90 : Math.min(c2MortalityAgeRaw, 120);
    const maxTimelineAge = clientData.isMarried ? Math.max(c1MortalityAge - 1, c2MortalityAge - 1 + ageDifference) : c1MortalityAge - 1;

    const inflationRate = (parseFloat(clientData.assumptions.inflation) || 2) / 100;
    const rorRetirement = (parseFloat(clientData.assumptions.rorRetirement) || 4) / 100;

    let totalBalance = 0;
    ['client1', 'client2'].forEach(clientKey => {
      if (clientKey === 'client2' && !clientData.isMarried) return;
      clientData[clientKey].accounts.forEach(account => {
        totalBalance += parseFloat(account.balance) || 0;
      });
    });

    ['client1', 'client2'].forEach(clientKey => {
      if (clientKey === 'client2' && !clientData.isMarried) return;
      const client = clientData[clientKey];
      const retirementAge = clientKey === 'client1' ? c1RetirementAge : c2RetirementAge;
      const currentAge = clientKey === 'client1' ? c1Age : c2Age;
      const yearsToRetirement = retirementAge - currentAge;
      if (yearsToRetirement <= 0) return;

      client.accounts.forEach(account => {
        const balance = parseFloat(account.balance) || 0;
        const contribution = parseFloat(account.contribution) || 0;
        const employerMatch = (parseFloat(account.employerMatch) || 0) / 100;
        const ror = (parseFloat(account.ror) || 5) / 100;
        const matchedContribution = contribution * (1 + employerMatch);
        const futureValue = balance * Math.pow(1 + ror, yearsToRetirement) +
                           (matchedContribution * (Math.pow(1 + ror, yearsToRetirement) - 1)) / ror;
        totalBalance += futureValue - balance;
      });
    });

    result.totalBalance = totalBalance;

    let balance = totalBalance;
    let depletionAge = 0;
    let totalShortfall = 0;

    for (let age = startAge; age <= maxTimelineAge; age++) {
      result.labels.push(age);

      const yearsFromStart = age - startAge;
      const monthlyNeed = (parseFloat(clientData.incomeNeeds.monthly) || 5000) * Math.pow(1 + inflationRate, yearsFromStart);
      const annualNeed = monthlyNeed * 12;
      result.needData.push(annualNeed);

      let c1SocialSecurity = 0;
      let c2SocialSecurity = 0;
      if (age >= c1RetirementAge && age < c1MortalityAge) {
        c1SocialSecurity = (parseFloat(clientData.client1.incomeSources.socialSecurity) || 0) * 12 * Math.pow(1 + inflationRate, yearsFromStart);
      }
      if (clientData.isMarried && age >= c2RetirementAge && age < c2MortalityAge + ageDifference) {
        c2SocialSecurity = (parseFloat(clientData.client2.incomeSources.socialSecurity) || 0) * 12 * Math.pow(1 + inflationRate, yearsFromStart);
      }
      const totalSocialSecurity = c1SocialSecurity + c2SocialSecurity;
      result.socialSecurityData.push(totalSocialSecurity);

      let c1OtherIncome = 0;
      let c2OtherIncome = 0;
      if (age >= c1RetirementAge && age < c1MortalityAge) {
        c1OtherIncome = (parseFloat(clientData.client1.incomeSources.other) || 0) * 12 * Math.pow(1 + inflationRate, yearsFromStart);
      }
      if (clientData.isMarried && age >= c2RetirementAge && age < c2MortalityAge + ageDifference) {
        c2OtherIncome = (parseFloat(clientData.client2.incomeSources.other) || 0) * 12 * Math.pow(1 + inflationRate, yearsFromStart);
      }
      const totalOtherIncome = c1OtherIncome + c2OtherIncome;
      result.incomeData.push(totalOtherIncome);

      const totalIncome = totalSocialSecurity + totalOtherIncome;
      const shortfall = annualNeed - totalIncome;
      result.shortfallData.push(Math.max(0, shortfall));

      let withdrawal = shortfall > 0 ? shortfall : 0;
      if (balance <= 0) {
        withdrawal = 0;
        balance = 0;
      } else if (withdrawal > balance) {
        withdrawal = balance;
        balance = 0;
      } else {
        balance -= withdrawal;
      }
      result.withdrawalData.push(withdrawal);

      const earnings = balance * rorRetirement;
      result.earningsData.push(earnings);
      balance += earnings;

      result.balanceData.push(balance);

      if (balance <= 0 && depletionAge === 0) {
        depletionAge = age;
      }
      if (shortfall > 0) {
        totalShortfall += shortfall;
      }
    }

    result.depletionAge = depletionAge || maxTimelineAge + 1;
    result.totalShortfall = totalShortfall;

    return result;
  } catch (error) {
    console.error('Error in calculateRetirementIncome:', error);
    return result;
  }
}

// Update retirement graph
export function updateRetirementGraph(chartCanvas, clientData, Chart, getAge, outputType = 'income', previewData = null) {
  try {
    if (!clientData.scenarios.base) {
      clientData.scenarios.base = {
        name: 'Base Case',
        data: calculateRetirementIncome(clientData, getAge)
      };
    }
    const baseData = clientData.scenarios.base.data;

    const scenariosList = document.getElementById('scenarios-list');
    const selectedScenarios = scenariosList ? Array.from(scenariosList.selectedOptions).map(opt => opt.value) : [];
    const datasets = [];

    const colors = {
      base: {
        balance: 'rgba(54, 162, 235, 0.8)', // Blue for Base Case balance
        withdrawals: 'rgba(54, 162, 235, 0.8)', // Blue
        socialSecurity: 'rgba(255, 159, 64, 0.8)', // Orange
        otherIncome: 'rgba(75, 192, 192, 0.8)', // Green
        shortfall: 'rgba(255, 99, 132, 0.8)' // Red
      },
      scenarios: [
        'rgba(255, 99, 132, 0.8)', // Red
        'rgba(75, 192, 192, 0.8)', // Green
        'rgba(255, 159, 64, 0.8)', // Orange
        'rgba(153, 102, 255, 0.8)', // Purple
        'rgba(255, 205, 86, 0.8)' // Yellow
      ]
    };

    if (outputType === 'income') {
      datasets.push(
        {
          label: 'Other Income',
          data: baseData.incomeData,
          backgroundColor: colors.base.otherIncome,
          stack: 'Stack 0'
        },
        {
          label: 'Social Security',
          data: baseData.socialSecurityData,
          backgroundColor: colors.base.socialSecurity,
          stack: 'Stack 0'
        },
        {
          label: 'Withdrawals',
          data: baseData.withdrawalData,
          backgroundColor: colors.base.withdrawals,
          stack: 'Stack 0'
        },
        {
          label: 'Shortfall',
          type: 'line',
          data: baseData.shortfallData,
          borderColor: colors.base.shortfall,
          backgroundColor: colors.base.shortfall,
          borderWidth: 2,
          fill: false,
          tension: 0.1
        }
      );
    } else if (outputType === 'balance') {
      if (selectedScenarios.includes('base') || selectedScenarios.length === 0) {
        datasets.push({
          label: clientData.scenarios.base.name,
          data: baseData.balanceData,
          borderColor: colors.base.balance.replace('0.8', '1'),
          backgroundColor: colors.base.balance,
          borderWidth: 2,
          fill: false,
          tension: 0.1
        });
      }
      clientData.scenarios.whatIf.forEach((scenario, index) => {
        if (selectedScenarios.includes(index.toString())) {
          datasets.push({
            label: scenario.name,
            data: scenario.data.balanceData,
            borderColor: colors.scenarios[index % colors.scenarios.length].replace('0.8', '1'),
            backgroundColor: colors.scenarios[index % colors.scenarios.length],
            borderWidth: 2,
            fill: false,
            tension: 0.1
          });
        }
      });
      if (previewData) {
        const previewResult = calculateRetirementIncome(previewData, getAge);
        datasets.push({
          label: 'Preview Scenario',
          data: previewResult.balanceData,
          borderColor: 'rgba(128, 128, 128, 1)',
          backgroundColor: 'rgba(128, 128, 128, 0.5)',
          borderWidth: 2,
          fill: false,
          tension: 0.1,
          borderDash: [5, 5]
        });
      }
    }

    const chartConfig = {
      type: outputType === 'income' ? 'bar' : 'line',
      data: {
        labels: baseData.labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: outputType === 'income' ? 'Retirement Income Sources by Age' : 'Retirement Account Balance Over Time'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Age'
            }
          },
          y: {
            title: {
              display: true,
              text: outputType === 'income' ? 'Annual Income ($)' : 'Balance ($)'
            },
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return `$${value.toLocaleString()}`;
              }
            },
            stacked: outputType === 'income' ? true : false
          }
        }
      }
    };

    const chartInstance = new Chart(chartCanvas, chartConfig);
    return chartInstance;
  } catch (error) {
    console.error('Error in updateRetirementGraph:', error);
    return null;
  }
}

// Update retirement outputs
export function updateRetirementOutputs(analysisOutputs, clientData, formatCurrency, getAge, selectedReports, Chart) {
  try {
    const incomeData = calculateRetirementIncome(clientData, getAge);

    const outputOptions = [
      { id: 'retirement-analysis', label: 'Retirement Analysis' },
      { id: 'retirement-timeline', label: 'Retirement Timeline' },
      { id: 'retirement-income', label: 'Retirement Income' },
      { id: 'retirement-shortfall', label: 'Retirement Shortfall' }
    ];

    let contentHTML = `
      <style>
        .output-card {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #fff;
          margin-bottom: 20px;
          width: 100%;
          box-sizing: border-box;
        }
        .output-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          table-layout: auto;
        }
        .output-table th, .output-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: right;
        }
        .output-table th {
          background: #f4f4f4;
        }
        .output-table th:first-child, .output-table td:first-child {
          text-align: left;
        }
        .output-select {
          padding: 5px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 10px;
          width: 200px;
        }
        .add-to-presentation {
          margin: 10px 0;
        }
        .graph-controls {
          margin-bottom: 10px;
        }
        .graph-type {
          padding: 5px;
          border-radius: 4px;
        }
        #what-if-scenarios {
          margin-top: 20px;
        }
        .scenario-btn {
          padding: 8px 12px;
          margin: 0 5px 10px 0;
          background: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .scenario-btn:hover {
          background: #0056b3;
        }
        #scenario-controls label {
          margin-right: 10px;
        }
        #scenario-controls input[type="text"] {
          padding: 5px;
          margin-right: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        #scenario-select select {
          padding: 5px;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 200px;
        }
        #sliders {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        .slider-group {
          display: flex;
          flex-direction: column;
        }
        .slider-group label {
          margin-bottom: 5px;
          font-weight: bold;
        }
        .slider-group input[type="range"] {
          width: 100%;
          margin-bottom: 5px;
        }
        .slider-group input[type="number"] {
          width: 100px;
          padding: 5px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        @media (max-width: 600px) {
          #sliders {
            grid-template-columns: 1fr;
          }
          .slider-group input[type="number"] {
            width: 80px;
          }
          .output-table {
            font-size: 14px;
          }
          .output-table th, .output-table td {
            padding: 6px;
          }
        }
      </style>
      <div class="output-card">
        <select id="output-select" class="output-select">
          ${outputOptions.map(opt => `<option value="${opt.id}"${opt.id === 'retirement-analysis' ? ' selected' : ''}>${opt.label}</option>`).join('')}
        </select>
    `;

    // Retirement Analysis (Graph)
    contentHTML += `
      <div id="retirement-analysis" class="output-content" style="display: block;">
        <h3>Retirement Analysis</h3>
        <div class="graph-controls">
          <label for="graph-type">Graph Type: </label>
          <select id="graph-type" class="graph-type">
            <option value="income" selected>Income Sources (Bar)</option>
            <option value="balance">Balance Over Time (Line)</option>
          </select>
        </div>
        <canvas id="analysis-chart" style="max-height: 400px;"></canvas>
        <div id="what-if-scenarios">
          <h4>What If Scenarios</h4>
          <button id="save-base-case" class="scenario-btn">Save as Base Case</button>
          <div id="scenario-controls">
            <label>Scenario Name: <input type="text" id="scenario-name" placeholder="e.g., Higher Savings"></label>
            <button id="apply-scenario" class="scenario-btn">Apply Scenario</button>
            <button id="reset-scenario" class="scenario-btn">Reset to Base Case</button>
          </div>
          <div id="scenario-select">
            <label for="scenarios-list">Compare Scenarios: </label>
            <select id="scenarios-list" multiple size="3">
              ${clientData.scenarios.base ? `<option value="base" selected>${clientData.scenarios.base.name}</option>` : ''}
              ${clientData.scenarios.whatIf.map((scenario, index) => `<option value="${index}" selected>${scenario.name}</option>`).join('')}
            </select>
          </div>
          <div id="sliders">
            <div class="slider-group">
              <label>Client 1 Retirement Age: <span id="c1-retirement-age-value">${clientData.client1.personal.retirementAge} years</span></label>
              <input type="range" id="c1-retirement-age-slider" min="50" max="80" step="1" value="${clientData.client1.personal.retirementAge || 65}">
              <input type="number" id="c1-retirement-age-number" min="50" max="80" step="1" value="${clientData.client1.personal.retirementAge || 65}">
            </div>
            ${clientData.isMarried ? `
            <div class="slider-group">
              <label>Client 2 Retirement Age: <span id="c2-retirement-age-value">${clientData.client2.personal.retirementAge} years</span></label>
              <input type="range" id="c2-retirement-age-slider" min="50" max="80" step="1" value="${clientData.client2.personal.retirementAge || 65}">
              <input type="number" id="c2-retirement-age-number" min="50" max="80" step="1" value="${clientData.client2.personal.retirementAge || 65}">
            </div>
            ` : ''}
            <div class="slider-group">
              <label>Client 1 Social Security ($/mo): <span id="c1-social-security-value">$${clientData.client1.incomeSources.socialSecurity}</span></label>
              <input type="range" id="c1-social-security-slider" min="0" max="5000" step="100" value="${clientData.client1.incomeSources.socialSecurity || 0}">
              <input type="number" id="c1-social-security-number" min="0" max="5000" step="100" value="${clientData.client1.incomeSources.socialSecurity || 0}">
            </div>
            ${clientData.isMarried ? `
            <div class="slider-group">
              <label>Client 2 Social Security ($/mo): <span id="c2-social-security-value">$${clientData.client2.incomeSources.socialSecurity}</span></label>
              <input type="range" id="c2-social-security-slider" min="0" max="5000" step="100" value="${clientData.client2.incomeSources.socialSecurity || 0}">
              <input type="number" id="c2-social-security-number" min="0" max="5000" step="100" value="${clientData.client2.incomeSources.socialSecurity || 0}">
            </div>
            ` : ''}
            <div class="slider-group">
              <label>Monthly Contributions ($): <span id="monthly-contribution-value">$${Math.round((clientData.client1.accounts.reduce((sum, acc) => sum + (parseFloat(acc.contribution) || 0), 0) + (clientData.isMarried ? clientData.client2.accounts.reduce((sum, acc) => sum + (parseFloat(acc.contribution) || 0), 0) : 0)) / 12)}</span></label>
              <input type="range" id="monthly-contribution-slider" min="0" max="5000" step="50" value="${Math.round((clientData.client1.accounts.reduce((sum, acc) => sum + (parseFloat(acc.contribution) || 0), 0) + (clientData.isMarried ? clientData.client2.accounts.reduce((sum, acc) => sum + (parseFloat(acc.contribution) || 0), 0) : 0)) / 12)}">
              <input type="number" id="monthly-contribution-number" min="0" max="5000" step="50" value="${Math.round((clientData.client1.accounts.reduce((sum, acc) => sum + (parseFloat(acc.contribution) || 0), 0) + (clientData.isMarried ? clientData.client2.accounts.reduce((sum, acc) => sum + (parseFloat(acc.contribution) || 0), 0) : 0)) / 12)}">
            </div>
            <div class="slider-group">
              <label>Pre-Retirement ROR (%): <span id="ror-value">${clientData.client1.accounts[0]?.ror || 6}%</span></label>
              <input type="range" id="ror-slider" min="0" max="10" step="0.1" value="${clientData.client1.accounts[0]?.ror || 6}">
              <input type="number" id="ror-number" min="0" max="10" step="0.1" value="${clientData.client1.accounts[0]?.ror || 6}">
            </div>
            <div class="slider-group">
              <label>Post-Retirement ROR (%): <span id="ror-retirement-value">${clientData.assumptions.rorRetirement}%</span></label>
              <input type="range" id="ror-retirement-slider" min="0" max="10" step="0.1" value="${clientData.assumptions.rorRetirement || 4}">
              <input type="number" id="ror-retirement-number" min="0" max="10" step="0.1" value="${clientData.assumptions.rorRetirement || 4}">
            </div>
            <div class="slider-group">
              <label>Monthly Income Needs ($): <span id="monthly-income-value">$${clientData.incomeNeeds.monthly}</span></label>
              <input type="range" id="monthly-income-slider" min="1000" max="10000" step="100" value="${clientData.incomeNeeds.monthly || 5000}">
              <input type="number" id="monthly-income-number" min="1000" max="10000" step="100" value="${clientData.incomeNeeds.monthly || 5000}">
            </div>
            <div class="slider-group">
              <label>Inflation (%): <span id="inflation-value">${clientData.assumptions.inflation}%</span></label>
              <input type="range" id="inflation-slider" min="0" max="10" step="0.1" value="${clientData.assumptions.inflation || 2}">
              <input type="number" id="inflation-number" min="0" max="10" step="0.1" value="${clientData.assumptions.inflation || 2}">
            </div>
            <div class="slider-group">
              <label>Client 1 Mortality Age: <span id="c1-mortality-age-value">${clientData.assumptions.c1MortalityAge} years</span></label>
              <input type="range" id="c1-mortality-age-slider" min="60" max="120" step="1" value="${clientData.assumptions.c1MortalityAge || 90}">
              <input type="number" id="c1-mortality-age-number" min="60" max="120" step="1" value="${clientData.assumptions.c1MortalityAge || 90}">
            </div>
            ${clientData.isMarried ? `
            <div class="slider-group">
              <label>Client 2 Mortality Age: <span id="c2-mortality-age-value">${clientData.assumptions.c2MortalityAge} years</span></label>
              <input type="range" id="c2-mortality-age-slider" min="60" max="120" step="1" value="${clientData.assumptions.c2MortalityAge || 90}">
              <input type="number" id="c2-mortality-age-number" min="60" max="120" step="1" value="${clientData.assumptions.c2MortalityAge || 90}">
            </div>
            ` : ''}
          </div>
          <div id="scenario-comparison">
            <h4>Scenario Comparison</h4>
            <table class="output-table">
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>Total Balance at Retirement</th>
                  <th>Depletion Age</th>
                  <th>Total Shortfall</th>
                </tr>
              </thead>
              <tbody id="comparison-table-body">
                ${clientData.scenarios.base ? `
                <tr>
                  <td>${clientData.scenarios.base.name}</td>
                  <td>${formatCurrency(clientData.scenarios.base.data.totalBalance)}</td>
                  <td>${clientData.scenarios.base.data.depletionAge > clientData.scenarios.base.data.labels[clientData.scenarios.base.data.labels.length - 1] ? 'N/A' : clientData.scenarios.base.data.depletionAge}</td>
                  <td>${formatCurrency(clientData.scenarios.base.data.totalShortfall)}</td>
                </tr>
                ` : ''}
                ${clientData.scenarios.whatIf.map(scenario => `
                <tr>
                  <td>${scenario.name}</td>
                  <td>${formatCurrency(scenario.data.totalBalance)}</td>
                  <td>${scenario.data.depletionAge > scenario.data.labels[scenario.data.labels.length - 1] ? 'N/A' : scenario.data.depletionAge}</td>
                  <td>${formatCurrency(scenario.data.totalShortfall)}</td>
                </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Retirement Timeline
    contentHTML += `
      <div id="retirement-timeline" class="output-content" style="display: none;">
        <h3>Retirement Timeline</h3>
        <table class="output-table">
          <thead>
            <tr>
              <th>Age</th>
              <th>Need Income</th>
              <th>Social Security</th>
              <th>Withdrawal</th>
              <th>Earnings</th>
              <th>Balance</th>
              <th>Shortfall</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Start</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>${formatCurrency(incomeData.totalBalance)}</td>
              <td>-</td>
            </tr>
            ${incomeData.labels.map((age, i) => `
              <tr>
                <td>${age}</td>
                <td>${formatCurrency(incomeData.needData[i])}</td>
                <td>${formatCurrency(incomeData.socialSecurityData[i])}</td>
                <td>${formatCurrency(incomeData.withdrawalData[i])}</td>
                <td>${formatCurrency(incomeData.earningsData[i])}</td>
                <td>${formatCurrency(incomeData.balanceData[i])}</td>
                <td>${formatCurrency(incomeData.shortfallData[i])}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Retirement Income
    contentHTML += `
      <div id="retirement-income" class="output-content" style="display: none;">
        <h3>Retirement Income</h3>
        <table class="output-table">
          <thead>
            <tr>
              <th>Age</th>
              <th>Social Security</th>
              <th>Other Income</th>
              <th>Withdrawals</th>
              <th>Total Income</th>
            </tr>
          </thead>
          <tbody>
            ${incomeData.labels.map((age, i) => `
              <tr>
                <td>${age}</td>
                <td>${formatCurrency(incomeData.socialSecurityData[i])}</td>
                <td>${formatCurrency(incomeData.incomeData[i])}</td>
                <td>${formatCurrency(incomeData.withdrawalData[i])}</td>
                <td>${formatCurrency(incomeData.socialSecurityData[i] + incomeData.incomeData[i] + incomeData.withdrawalData[i])}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Retirement Shortfall
    contentHTML += `
      <div id="retirement-shortfall" class="output-content" style="display: none;">
        <h3>Retirement Shortfall</h3>
        <table class="output-table">
          <thead>
            <tr>
              <th>Age</th>
              <th>Income Need</th>
              <th>Total Income</th>
              <th>Shortfall</th>
            </tr>
          </thead>
          <tbody>
            ${incomeData.labels.map((age, i) => `
              <tr>
                <td>${age}</td>
                <td>${formatCurrency(incomeData.needData[i])}</td>
                <td>${formatCurrency(incomeData.socialSecurityData[i] + incomeData.incomeData[i] + incomeData.withdrawalData[i])}</td>
                <td>${formatCurrency(incomeData.shortfallData[i])}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    contentHTML += `
      <label class="add-to-presentation">
        <input type="checkbox" id="add-to-presentation" ${selectedReports.some(report => report.id === 'retirement-accumulation') ? 'checked' : ''}>
        Add to Presentation
      </label>
      </div>
    `;

    analysisOutputs.innerHTML = contentHTML;

    // Setup output dropdown switching
    const outputSelect = document.getElementById('output-select');
    if (outputSelect) {
      outputSelect.addEventListener('change', () => {
        document.querySelectorAll('.output-content').forEach(content => {
          content.style.display = content.id === outputSelect.value ? 'block' : 'none';
        });
        if (outputSelect.value === 'retirement-analysis') {
          setTimeout(() => updateRetirementGraph(document.getElementById('analysis-chart'), clientData, Chart, getAge, document.getElementById('graph-type').value), 100);
        }
      });
    }

    // Setup presentation checkbox
    const presentationCheckbox = document.getElementById('add-to-presentation');
    if (presentationCheckbox) {
      presentationCheckbox.addEventListener('change', () => {
        const event = new CustomEvent('addToPresentationToggle', {
          detail: { reportId: 'retirement-accumulation', reportTitle: 'Retirement Accumulation' }
        });
        document.dispatchEvent(event);
      });
    }

  } catch (error) {
    console.error('Error in updateRetirementOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-error">Error rendering outputs. Please check console for details.</p>';
  }
}
