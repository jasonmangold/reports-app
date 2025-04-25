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
      <label>Mortality Age: <input type="number" id="mortality-age" min="1" max="120" placeholder="90"></label>
      <label>Inflation (%): <input type="number" id="inflation" min="0" max="100" step="0.1" placeholder="2"></label>
      <label>ROR During Retirement (%): <input type="number" id="ror-retirement" min="0" max="100" step="0.1" placeholder="4"></label>
    `
  }
];

// Setup age display listeners for DOB inputs
export function setupAgeDisplayListeners(getAge) {
  try {
    const dobInputs = document.querySelectorAll('#c1-dob, #c2-dob');
    const isMarriedInput = document.getElementById('is-married');

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

      // Trigger initial age display
      if (input.value) {
        const event = new Event('change');
        input.dispatchEvent(event);
      }
    });

    if (isMarriedInput) {
      isMarriedInput.addEventListener('change', () => {
        const c2Dob = document.getElementById('c2-dob');
        if (c2Dob && isMarriedInput.checked && c2Dob.value) {
          const event = new Event('change');
          c2Dob.dispatchEvent(event);
        }
      });
    }
  } catch (error) {
    console.error('Error in setupAgeDisplayListeners:', error);
  }
}

// Helper function to calculate retirement income data
function calculateRetirementIncome(clientData, getAge) {
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
    depletionAge: 0
  };

  try {
    const c1Age = getAge(clientData.client1.personal.dob);
    const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
    const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
    const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
    const startAge = Math.max(c1RetirementAge, c2RetirementAge);
    const mortalityAge = parseFloat(clientData.assumptions.mortalityAge) || 90;
    const inflation = isNaN(parseFloat(clientData.assumptions.inflation)) ? 0.02 : parseFloat(clientData.assumptions.inflation) / 100;
    const rorRetirement = isNaN(parseFloat(clientData.assumptions.rorRetirement)) ? 0.04 : parseFloat(clientData.assumptions.rorRetirement) / 100;
    let monthlyNeed = Math.round(parseFloat(clientData.incomeNeeds.monthly) || 5000);

    if (!clientData.client1.personal.dob || c1Age >= c1RetirementAge || (clientData.isMarried && (!clientData.client2.personal.dob || c2Age >= c2RetirementAge))) {
      return result; // Empty result for invalid inputs
    }
    if (startAge >= mortalityAge) {
      return result; // Empty result for invalid ages
    }

    // Adjust annual need for inflation until retirement
    const yearsToRetirement = startAge - c1Age;
    let annualNeed = Math.round(monthlyNeed * 12 * Math.pow(1 + inflation, yearsToRetirement));

    // Calculate total balance at retirement
    let totalBalance = 0;
    const clients = [clientData.client1, clientData.isMarried ? clientData.client2 : null];
    clients.forEach((client, idx) => {
      if (!client) return;
      const clientAge = idx === 0 ? c1Age : c2Age;
      const clientRetirementAge = idx === 0 ? c1RetirementAge : c2RetirementAge;
      const yearsToClientRetirement = clientRetirementAge - clientAge;

      client.accounts.forEach(account => {
        let balance = Math.round(parseFloat(account.balance) || 0);
        const contribution = Math.round(parseFloat(account.contribution) || 0);
        const employmentIncome = Math.round(parseFloat(client.incomeSources.employment) || 0);
        const employerMatchPercent = isNaN(parseFloat(account.employerMatch)) ? 0 : parseFloat(account.employerMatch) / 100;
        const employerMatch = Math.round(employerMatchPercent * employmentIncome);
        const ror = isNaN(parseFloat(account.ror)) ? 0.06 : parseFloat(account.ror) / 100;

        // Future value of current balance
        const fvBalance = Math.round(balance * Math.pow(1 + ror, yearsToClientRetirement));
        // Future value of contributions (annuity)
        const fvContributions = contribution && ror ? Math.round(contribution * (Math.pow(1 + ror, yearsToClientRetirement) - 1) / ror) : 0;
        // Future value of employer match (annuity)
        const fvEmployerMatch = employerMatch && ror ? Math.round(employerMatch * (Math.pow(1 + ror, yearsToClientRetirement) - 1) / ror) : 0;

        let accountBalance = Math.round(fvBalance + fvContributions + fvEmployerMatch);

        // Apply rorRetirement if client retires before startAge
        if (clientRetirementAge < startAge) {
          const additionalYears = startAge - clientRetirementAge;
          accountBalance = Math.round(accountBalance * Math.pow(1 + rorRetirement, additionalYears));
        }

        totalBalance += accountBalance;
      });

      // Calculate future value of other assets
      if (client.other && client.other.assets) {
        client.other.assets.forEach(asset => {
          let balance = Math.round(parseFloat(asset.balance) || 0);
          const ror = isNaN(parseFloat(asset.ror)) ? 0.06 : parseFloat(asset.ror) / 100;
          let fvBalance = Math.round(balance * Math.pow(1 + ror, yearsToClientRetirement));
          if (clientRetirementAge < startAge) {
            const additionalYears = startAge - clientRetirementAge;
            fvBalance = Math.round(fvBalance * Math.pow(1 + rorRetirement, additionalYears));
          }
          totalBalance += fvBalance;
        });
      }
    });

    let balance = totalBalance;
    result.totalBalance = totalBalance;
    result.depletionAge = startAge;

    // Add starting balance row
    result.labels.push(startAge);
    result.needData.push(0);
    result.incomeData.push(0);
    result.socialSecurityData.push(0);
    result.withdrawalData.push(0);
    result.earningsData.push(0);
    result.balanceData.push(totalBalance);
    result.shortfallData.push(0);

    // Calculate timeline data
    for (let i = 0; i < mortalityAge - startAge; i++) {
      const currentAge = startAge + i + 1;
      result.labels.push(currentAge);

      // Need (inflation-adjusted from retirement start)
      const adjustedNeed = Math.round(annualNeed * Math.pow(1 + inflation, i));
      result.needData.push(adjustedNeed);

      // Income (Employment + Other)
      let employmentIncome = 0;
      if (currentAge < c1RetirementAge) {
        employmentIncome += Math.round(parseFloat(clientData.client1.incomeSources.employment) || 0);
      }
      if (clientData.isMarried && currentAge < c2RetirementAge) {
        employmentIncome += Math.round(parseFloat(clientData.client2.incomeSources.employment) || 0);
      }
      const otherIncome = Math.round(parseFloat(clientData.client1.incomeSources.other) * 12 || 0);
      const totalIncome = Math.round(employmentIncome + otherIncome);
      result.incomeData.push(totalIncome);

      // Social Security
      let socialSecurity = 0;
      if (currentAge >= c1RetirementAge) {
        socialSecurity += Math.round(parseFloat(clientData.client1.incomeSources.socialSecurity) * 12 || 0);
      }
      if (clientData.isMarried && currentAge >= c2RetirementAge) {
        socialSecurity += Math.round(parseFloat(clientData.client2.incomeSources.socialSecurity) * 12 || 0);
      }
      result.socialSecurityData.push(socialSecurity);

      // Asset Earnings
      const earnings = Math.round(balance * rorRetirement);
      result.earningsData.push(earnings);

      // Withdrawal and Shortfall
      const remainingNeed = Math.round(adjustedNeed - totalIncome - socialSecurity);
      let withdrawal = 0;
      let shortfall = 0;
      if (remainingNeed > 0) {
        const availableBalance = Math.round(balance + earnings);
        if (availableBalance >= remainingNeed) {
          withdrawal = Math.round(remainingNeed);
          balance = Math.round(availableBalance - remainingNeed);
        } else {
          withdrawal = availableBalance > 0 ? Math.round(availableBalance) : 0;
          shortfall = Math.round(remainingNeed - withdrawal);
          balance = 0;
        }
      }
      result.withdrawalData.push(withdrawal);
      result.shortfallData.push(shortfall);
      result.balanceData.push(balance);

      // Update depletion age (only set once, when balance first depletes)
      if (balance <= 0 && result.depletionAge === startAge) {
        result.depletionAge = currentAge;
      }
    }
    // Ensure depletionAge is mortalityAge if balance remains positive
    result.depletionAge = balance > 0 ? mortalityAge : result.depletionAge;
  } catch (error) {
    console.error('Error in calculateRetirementIncome:', error);
  }
  return result;
}

export function updateRetirementGraph(chartCanvas, clientData, Chart, getAge) {
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
        labels: incomeData.labels.slice(1), // Skip starting balance row
        datasets: [
          {
            label: 'Social Security',
            data: incomeData.socialSecurityData.slice(1).map(Math.round),
            backgroundColor: '#22c55e',
            stack: 'Stack0'
          },
          {
            label: 'Income',
            data: incomeData.incomeData.slice(1).map(Math.round),
            backgroundColor: '#3b82f6',
            stack: 'Stack0'
          },
          {
            label: 'Withdrawal',
            data: incomeData.withdrawalData.slice(1).map(Math.round),
            backgroundColor: '#f97316',
            stack: 'Stack0'
          },
          {
            label: 'Shortfall',
            data: incomeData.shortfallData.slice(1).map(Math.round),
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
          y: { title: { display: true, text: 'Annual Income ($)' }, stacked: true, beginAtZero: true }
        }
      }
    });
    console.log('Retirement Accumulation bar graph rendered');
    return chartInstance;
  } catch (error) {
    console.error('Error in updateRetirementGraph:', error);
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

export function updateRetirementOutputs(analysisOutputs, clientData, formatCurrency, getAge, selectedReports) {
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

    const c1Age = getAge(clientData.client1.personal.dob);
    const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
    const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
    const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
    const startAge = Math.max(c1RetirementAge, c2RetirementAge);
    const mortalityAge = parseFloat(clientData.assumptions.mortalityAge) || 90;
    const inflation = isNaN(parseFloat(clientData.assumptions.inflation)) ? 0.02 : parseFloat(clientData.assumptions.inflation) / 100;
    const rorRetirement = isNaN(parseFloat(clientData.assumptions.rorRetirement)) ? 0.04 : parseFloat(clientData.assumptions.rorRetirement) / 100;
    let monthlyNeed = Math.round(parseFloat(clientData.incomeNeeds.monthly) || 5000);

    // Add defensive checks for missing properties
    clientData.client1.other = clientData.client1.other || { assets: [] };
    clientData.client2 = clientData.client2 || { other: { assets: [] } };
    const currentSavings = Math.round(parseFloat(clientData.savingsExpenses?.monthlySavings) || 0);

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

    // Adjust monthly need for inflation until retirement
    const yearsToRetirement = startAge - c1Age;
    monthlyNeed = Math.round(monthlyNeed * Math.pow(1 + inflation, yearsToRetirement));

    const incomeGoals = [
      { age: c1RetirementAge, percentage: 100, amount: Math.round(monthlyNeed) },
      { age: c1RetirementAge + 10, percentage: 80, amount: Math.round(monthlyNeed * 0.8) },
      { age: c1RetirementAge + 15, percentage: 70, amount: Math.round(monthlyNeed * 0.7) }
    ];

    const incomeSources = [];
    if (clientData.client1.incomeSources.employment && c1Age < c1RetirementAge) {
      incomeSources.push({
        source: `${clientData.client1.personal.name || 'Client 1'}'s Employment Income`,
        details: `Until age ${c1RetirementAge}`,
        amount: Math.round(parseFloat(clientData.client1.incomeSources.employment) / 12 || 0)
      });
    }
    if (clientData.isMarried && clientData.client2.incomeSources?.employment && c2Age < c2RetirementAge) {
      incomeSources.push({
        source: `${clientData.client2.personal?.name || 'Client 2'}'s Employment Income`,
        details: `Until age ${c2RetirementAge}`,
        amount: Math.round(parseFloat(clientData.client2.incomeSources.employment) / 12 || 0)
      });
    }
    if (clientData.client1.incomeSources.socialSecurity) {
      incomeSources.push({
        source: `${clientData.client1.personal.name || 'Client 1'}'s Social Security`,
        details: `At age ${c1RetirementAge}`,
        amount: Math.round(parseFloat(clientData.client1.incomeSources.socialSecurity) || 0)
      });
    }
    if (clientData.isMarried && clientData.client2.incomeSources?.socialSecurity) {
      incomeSources.push({
        source: `${clientData.client2.personal?.name || 'Client 2'}'s Social Security`,
        details: `At age ${c2RetirementAge}`,
        amount: Math.round(parseFloat(clientData.client2.incomeSources.socialSecurity) || 0)
      });
    }
    if (clientData.client1.incomeSources.other) {
      incomeSources.push({
        source: 'Other Income',
        details: `At age ${c1RetirementAge}`,
        amount: Math.round(parseFloat(clientData.client1.incomeSources.other) || 0)
      });
    }

    // Calculate future value of assets at retirement
    let totalAssets = 0;
    const assets = [];
    const clients = [clientData.client1, clientData.isMarried ? clientData.client2 : null];
    clients.forEach((client, idx) => {
      if (!client) return;
      const clientAge = idx === 0 ? c1Age : c2Age;
      const clientRetirementAge = idx === 0 ? c1RetirementAge : c2RetirementAge;
      const yearsToClientRetirement = clientRetirementAge - clientAge;

      client.accounts.forEach(account => {
        let balance = Math.round(parseFloat(account.balance) || 0);
        const contribution = Math.round(parseFloat(account.contribution) || 0);
        const employmentIncome = Math.round(parseFloat(client.incomeSources.employment) || 0);
        const employerMatchPercent = isNaN(parseFloat(account.employerMatch)) ? 0 : parseFloat(account.employerMatch) / 100;
        const employerMatch = Math.round(employerMatchPercent * employmentIncome);
        const ror = isNaN(parseFloat(account.ror)) ? 0.06 : parseFloat(account.ror) / 100;

        // Future value of current balance
        const fvBalance = Math.round(balance * Math.pow(1 + ror, yearsToClientRetirement));
        // Future value of contributions (annuity)
        const fvContributions = contribution && ror ? Math.round(contribution * (Math.pow(1 + ror, yearsToClientRetirement) - 1) / ror) : 0;
        // Future value of employer match (annuity)
        const fvEmployerMatch = employerMatch && ror ? Math.round(employerMatch * (Math.pow(1 + ror, yearsToClientRetirement) - 1) / ror) : 0;

        let accountBalance = Math.round(fvBalance + fvContributions + fvEmployerMatch);

        if (clientRetirementAge < startAge) {
          const additionalYears = startAge - clientRetirementAge;
          accountBalance = Math.round(accountBalance * Math.pow(1 + rorRetirement, additionalYears));
        }

        if (accountBalance > 0) {
          assets.push({
            name: `${client.personal.name || (idx === 0 ? 'Client 1' : 'Client 2')}'s ${account.name || 'Retirement Account'}`,
            balance: accountBalance
          });
          totalAssets += accountBalance;
        }
      });

      if (client.other && client.other.assets) {
        client.other.assets.forEach(asset => {
          let balance = Math.round(parseFloat(asset.balance) || 0);
          const ror = isNaN(parseFloat(asset.ror)) ? 0.06 : parseFloat(asset.ror) / 100;
          let fvBalance = Math.round(balance * Math.pow(1 + ror, yearsToClientRetirement));
          if (clientRetirementAge < startAge) {
            const additionalYears = startAge - clientRetirementAge;
            fvBalance = Math.round(fvBalance * Math.pow(1 + rorRetirement, additionalYears));
          }
          if (fvBalance > 0) {
            assets.push({
              name: asset.name || 'Other Asset',
              balance: fvBalance
            });
            totalAssets += fvBalance;
          }
        });
      }
    });

    let balance = totalAssets;
    const monthlySources = Math.round(incomeSources.reduce((sum, src) => sum + (src.amount || 0), 0));
    let depletionAge = c1RetirementAge;
    for (let i = 0; i < mortalityAge - c1RetirementAge; i++) {
      const currentNeed = Math.round(monthlyNeed * Math.pow(1 + inflation, i) - monthlySources);
      balance = Math.round(balance * (1 + rorRetirement) - (currentNeed > 0 ? currentNeed * 12 : 0));
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
      const annualNeed = Math.round((monthlyNeed - monthlySources) * 12);
      requiredAtRetirement = Math.round(annualNeed * (1 - Math.pow(1 + rorRetirement, -yearsShort)) / rorRetirement);
      additionalSavings = Math.round(requiredAtRetirement / ((Math.pow(1 + rorRetirement, yearsToRetirement) - 1) / rorRetirement));
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
          const currentNeed = Math.round(monthlyNeed * Math.pow(1 + inflation, j) - monthlySources);
          tempBalance = Math.round(tempBalance * (1 + mid) - (currentNeed > 0 ? currentNeed * 12 : 0));
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
          const currentNeed = Math.round(mid * Math.pow(1 + inflation, j) - monthlySources);
          tempBalance = Math.round(tempBalance * (1 + rorRetirement) - (currentNeed > 0 ? currentNeed * 12 : 0));
          if (tempBalance <= 0) break;
        }
        if (tempBalance > 0) high = mid;
        else low = mid;
      }
      reducedMonthlyNeed = Math.round((low + high) / 2);
    }

    let newRetirementAge = c1RetirementAge;
    if (depletionAge < mortalityAge) {
      const yearsNeeded = mortalityAge - depletionAge;
      newRetirementAge = Math.ceil(c1RetirementAge + yearsNeeded);
      if (newRetirementAge > mortalityAge) newRetirementAge = mortalityAge;
    }

    // Define report options for dropdown
    const reportOptions = [
      { id: 'output-graph', label: 'Retirement Analysis', reportId: 'report-graph', title: 'Retirement Income Graph' },
      { id: 'report-social-security-optimizer', label: 'Social Security Optimizer', reportId: 'report-social-security-optimizer', title: 'Social Security Optimizer' },
      { id: 'report-capital-available', label: 'Capital Available at Retirement', reportId: 'report-capital-available', title: 'Capital Available at Retirement' },
      { id: 'output-alternatives', label: 'Alternatives to Achieving Retirement Goals', reportId: 'report-alternatives-retirement', title: 'Retirement Alternatives' },
      { id: 'output-timeline', label: 'Retirement Timeline', reportId: 'report-retirement-timeline', title: 'Retirement Income Timeline' },
      { id: 'report-retirement-fact-finder', label: 'Fact Finder', reportId: 'report-retirement-fact-finder', title: 'Retirement Fact Finder' }
    ];

    // Render Dropdown and Checkbox in output-tabs-container
    if (tabContainer) {
      tabContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div class="output-dropdown">
            <label for="output-select">Select View: </label>
            <select id="output-select" class="output-select">
              ${reportOptions.map(option => `
                <option value="${option.id}" ${option.id === 'output-graph' ? 'selected' : ''}>${option.label}</option>
              `).join('')}
            </select>
          </div>
          <label class="add-to-presentation-checkbox">
            <input type="checkbox" id="add-to-presentation" data-report="${reportOptions[0].reportId}" data-title="${reportOptions[0].title}">
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
                <option value="${option.id}" ${option.id === 'output-graph' ? 'selected' : ''}>${option.label}</option>
              `).join('')}
            </select>
          </div>
          <label class="add-to-presentation-checkbox">
            <input type="checkbox" id="add-to-presentation" data-report="${reportOptions[0].reportId}" data-title="${reportOptions[0].title}">
            Add to Presentation
          </label>
        </div>
      ` : ''}
      <div class="output-tab-content active" id="output-graph">
        <div class="output-card">
          <h3>Retirement Income Graph</h3>
          <canvas id="analysis-chart" style="max-height: 400px;"></canvas>
        </div>
      </div>
      <div class="output-tab-content" id="output-timeline" style="display: none;">
        <div class="output-card">
          <h3>Retirement Income Timeline</h3>
          <table class="output-table">
            <thead>
              <tr>
                <th>Age</th>
                <th>Need</th>
                <th>Income</th>
                <th>Social Security</th>
                <th>Withdrawal</th>
                <th>Shortfall</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              ${incomeData.labels.slice(1).map((age, i) => `
                <tr>
                  <td>${age}</td>
                  <td>${formatCurrency(incomeData.needData[i + 1])}</td>
                  <td>${formatCurrency(incomeData.incomeData[i + 1])}</td>
                  <td>${formatCurrency(incomeData.socialSecurityData[i + 1])}</td>
                  <td>${formatCurrency(incomeData.withdrawalData[i + 1])}</td>
                  <td>${formatCurrency(incomeData.shortfallData[i + 1])}</td>
                  <td>${formatCurrency(incomeData.balanceData[i + 1])}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="output-tab-content" id="output-alternatives" style="display: none;">
        <div class="output-card">
          <h3>Retirement Alternatives</h3>
          <table class="output-table">
            <thead>
              <tr>
                <th>Option</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Increase Rate of Return</td>
                <td>Increase portfolio ROR to ${(targetROR * 100).toFixed(1)}% from ${(rorRetirement * 100).toFixed(1)}%</td>
              </tr>
              <tr>
                <td>Reduce Income Needs</td>
                <td>Reduce monthly income needs to ${formatCurrency(reducedMonthlyNeed)} from ${formatCurrency(monthlyNeed)}</td>
              </tr>
              <tr>
                <td>Delay Retirement</td>
                <td>Delay retirement to age ${newRetirementAge} from age ${c1RetirementAge}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="output-tab-content" id="report-social-security-optimizer" style="display: none;">
        <div class="output-card">
          <h3>Social Security Optimizer</h3>
          <p>Optimized Social Security strategies will be displayed here. (Placeholder: Optimization logic not implemented.)</p>
        </div>
      </div>
      <div class="output-tab-content" id="report-capital-available" style="display: none;">
        <div class="output-card">
          <h3>Capital Available at Retirement</h3>
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
                <td><strong>Total</strong></td>
                <td><strong>${formatCurrency(totalAssets)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="output-tab-content" id="report-retirement-fact-finder" style="display: none;">
        <div class="output-card">
          <h3>Retirement Fact Finder</h3>
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
              <tr>
                <td>Date of Birth</td>
                <td>${clientData.client1.personal.dob || 'N/A'}</td>
                ${clientData.isMarried ? `<td>${clientData.client2.personal.dob || 'N/A'}</td>` : ''}
              </tr>
              <tr>
                <td>Retirement Age</td>
                <td>${clientData.client1.personal.retirementAge || 'N/A'}</td>
                ${clientData.isMarried ? `<td>${clientData.client2.personal.retirementAge || 'N/A'}</td>` : ''}
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
                <td>Social Security ($/mo)</td>
                <td>${formatCurrency(parseFloat(clientData.client1.incomeSources.socialSecurity) || 0)}</td>
                ${clientData.isMarried ? `<td>${formatCurrency(parseFloat(clientData.client2.incomeSources.socialSecurity) || 0)}</td>` : ''}
              </tr>
              <tr>
                <td>Other Income ($/mo)</td>
                <td>${formatCurrency(parseFloat(clientData.client1.incomeSources.other) || 0)}</td>
                ${clientData.isMarried ? `<td>${formatCurrency(parseFloat(clientData.client2.incomeSources.other) || 0)}</td>` : ''}
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
                <td>Mortality Age</td>
                <td>${clientData.assumptions.mortalityAge || 'N/A'}</td>
              </tr>
              <tr>
                <td>Inflation (%)</td>
                <td>${clientData.assumptions.inflation || 'N/A'}</td>
              </tr>
              <tr>
                <td>ROR During Retirement (%)</td>
                <td>${clientData.assumptions.rorRetirement || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Setup dropdown and checkbox interactions
    setupOutputControls(reportOptions, selectedReports);
  } catch (error) {
    console.error('Error in updateRetirementOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-card">Error rendering outputs. Please check input data.</p>';
    if (tabContainer) tabContainer.innerHTML = '';
  }
}

// Setup dropdown and checkbox interactions
function setupOutputControls(reportOptions, selectedReports) {
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
      outputDropdownChangeHandler.call(this);
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
function outputDropdownChangeHandler() {
  try {
    const selectedTab = this.value;
    document.querySelectorAll('.output-tab-content').forEach(content => {
      content.style.display = content.id === selectedTab ? 'block' : 'none';
    });
    if (selectedTab === 'output-graph') {
      setTimeout(() => {
        const chartCanvas = document.getElementById('analysis-chart');
        if (chartCanvas && typeof Chart !== 'undefined') {
          updateRetirementGraph(chartCanvas, clientData, Chart, getAge);
        }
      }, 100); // Re-render graph when switching to graph tab
    }
  } catch (error) {
    console.error('Error in outputDropdownChangeHandler:', error);
  }
}
