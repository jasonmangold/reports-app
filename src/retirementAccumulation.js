/**
 * Defines the tabs for the retirement accumulation form, including personal details,
 * income needs, income sources, capital accounts, and assumptions.
 */
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
      <div class="income-needs-container">
        <label>Beginning at retirement: 
          <input type="number" id="monthly-income-initial" min="0" step="100" placeholder="5000">
        </label>
        <label>Beginning 
          <input type="number" id="years-after-retirement-1" min="0" max="30" step="1" placeholder="5"> 
          years after retirement:
          <input type="number" id="monthly-income-1" min="0" step="100" placeholder="4500">
        </label>
        <label>Beginning 
          <input type="number" id="years-after-retirement-2" min="0" max="30" step="1" placeholder="10"> 
          years after retirement:
          <input type="number" id="monthly-income-2" min="0" step="100" placeholder="4000">
        </label>
      </div>
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

/**
 * Sets up event listeners for date of birth inputs to display current age
 * and toggles visibility of Client 2 inputs based on marital status.
 */
export function setupAgeDisplayListeners(getAge) {
  try {
    const dobInputs = document.querySelectorAll('#c1-dob, #c2-dob');
    const isMarriedInput = document.getElementById('is-married');
    const c2MortalityLabel = document.getElementById('c2-mortality-label');
    const client2Section = document.getElementById('client2-section');
    const client2IncomeSection = document.getElementById('client2-income-section');
    const c2Accounts = document.getElementById('c2-accounts');

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

    if (isMarriedInput && c2MortalityLabel && client2Section && client2IncomeSection && c2Accounts) {
      isMarriedInput.addEventListener('change', () => {
        const isMarried = isMarriedInput.checked;
        c2MortalityLabel.style.display = isMarried ? 'block' : 'none';
        client2Section.style.display = isMarried ? 'block' : 'none';
        client2IncomeSection.style.display = isMarried ? 'block' : 'none';
        c2Accounts.style.display = isMarried ? 'block' : 'none';
        const c2Dob = document.getElementById('c2-dob');
        if (isMarried && c2Dob && c2Dob.value) {
          const event = new Event('change');
          c2Dob.dispatchEvent(event);
        }
      });

      // Trigger initial visibility
      const isMarried = isMarriedInput.checked;
      c2MortalityLabel.style.display = isMarried ? 'block' : 'none';
      client2Section.style.display = isMarried ? 'block' : 'none';
      client2IncomeSection.style.display = isMarried ? 'block' : 'none';
      c2Accounts.style.display = isMarried ? 'block' : 'none';
    }
  } catch (error) {
    console.error('Error in setupAgeDisplayListeners:', error);
  }
}

/**
 * Calculates retirement income data, including needs, income sources, withdrawals,
 * earnings, and balance over time, accounting for phased income needs and mortality ages.
 */
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
    // Get ages and retirement ages
    const c1Age = getAge(clientData.client1.personal.dob);
    const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
    const ageDifference = c1Age - c2Age; // Positive if Client 1 is older
    const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
    const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
    const startAge = Math.max(c1RetirementAge, c2RetirementAge);

    // Parse mortality ages with fallback
    const c1MortalityAgeRaw = parseFloat(clientData.assumptions.c1MortalityAge) || 90;
    const c2MortalityAgeRaw = clientData.isMarried ? (parseFloat(clientData.assumptions.c2MortalityAge) || 90) : c1MortalityAgeRaw;
    const c1MortalityAge = isNaN(c1MortalityAgeRaw) || c1MortalityAgeRaw < c1RetirementAge ? 90 : Math.min(c1MortalityAgeRaw, 120);
    const c2MortalityAge = isNaN(c2MortalityAgeRaw) || c2MortalityAgeRaw < c2RetirementAge ? 90 : Math.min(c2MortalityAgeRaw, 120);

    // Calculate max timeline
    const c1MaxAge = c1MortalityAge - 1;
    const c2MaxAge = c2MortalityAge - 1;
    const maxTimelineAge = clientData.isMarried
      ? Math.max(c1MaxAge, c2MaxAge + ageDifference)
      : c1MaxAge;

    // Get assumptions
    const inflation = isNaN(parseFloat(clientData.assumptions.inflation)) ? 0.02 : parseFloat(clientData.assumptions.inflation) / 100;
    const rorRetirement = isNaN(parseFloat(clientData.assumptions.rorRetirement)) ? 0.04 : parseFloat(clientData.assumptions.rorRetirement) / 100;
    const monthlyRor = rorRetirement / 12;

    // Get income needs from form inputs
    const monthlyNeedInitial = parseFloat(document.getElementById('monthly-income-initial')?.value) || 5000;
    const yearsAfterRetirement1 = parseInt(document.getElementById('years-after-retirement-1')?.value) || 5;
    const monthlyNeed1 = parseFloat(document.getElementById('monthly-income-1')?.value) || 4500;
    const yearsAfterRetirement2 = parseInt(document.getElementById('years-after-retirement-2')?.value) || 10;
    const monthlyNeed2 = parseFloat(document.getElementById('monthly-income-2')?.value) || 4000;

    const yearsToRetirement = startAge - c1Age;

    // Validate inputs
    if (!clientData.client1.personal.dob || c1Age >= c1RetirementAge || 
        (clientData.isMarried && (!clientData.client2.personal.dob || c2Age >= c2RetirementAge))) {
      console.warn('Invalid inputs: Returning empty result');
      return result;
    }
    if (startAge >= maxTimelineAge) {
      console.warn('Start age >= maxTimelineAge: Returning empty result');
      return result;
    }
    if (yearsAfterRetirement2 <= yearsAfterRetirement1) {
      console.warn('Adjusting yearsAfterRetirement2 to be after yearsAfterRetirement1');
      yearsAfterRetirement2 = yearsAfterRetirement1 + 1;
    }

    // Calculate total balance at retirement
    let totalBalance = 0;
    const clients = [clientData.client1, clientData.isMarried ? clientData.client2 : null];
    clients.forEach((client, idx) => {
      if (!client) return;
      const clientAge = idx === 0 ? c1Age : c2Age;
      const clientRetirementAge = idx === 0 ? c1RetirementAge : c2RetirementAge;
      const monthsToClientRetirement = (clientRetirementAge - clientAge) * 12;

      client.accounts.forEach(account => {
        let balance = Math.round(parseFloat(account.balance) || 0);
        const annualContribution = Math.round(parseFloat(account.contribution) || 0);
        const monthlyContribution = annualContribution / 12;
        const employmentIncome = Math.round(parseFloat(client.incomeSources.employment) || 0);
        const employerMatchPercent = isNaN(parseFloat(account.employerMatch)) ? 0 : parseFloat(account.employerMatch) / 100;
        const annualEmployerMatch = employerMatchPercent * employmentIncome;
        const monthlyEmployerMatch = annualEmployerMatch / 12;
        const ror = isNaN(parseFloat(account.ror)) ? 0.06 : parseFloat(account.ror) / 100;

        const fvBalance = balance * Math.pow(1 + ror / 12, monthsToClientRetirement);
        const fvContributions = monthlyContribution && ror ? monthlyContribution * (Math.pow(1 + ror / 12, monthsToClientRetirement) - 1) / (ror / 12) * (1 + ror / 12) : 0;
        const fvEmployerMatch = monthlyEmployerMatch && ror ? monthlyEmployerMatch * (Math.pow(1 + ror / 12, monthsToClientRetirement) - 1) / (ror / 12) * (1 + ror / 12) : 0;

        let accountBalance = fvBalance + fvContributions + fvEmployerMatch;

        if (clientRetirementAge < startAge) {
          const additionalMonths = (startAge - clientRetirementAge) * 12;
          accountBalance = accountBalance * Math.pow(1 + rorRetirement / 12, additionalMonths);
        }

        totalBalance += accountBalance;
      });

      if (client.other && client.other.assets) {
        client.other.assets.forEach(asset => {
          let balance = Math.round(parseFloat(asset.balance) || 0);
          const ror = isNaN(parseFloat(asset.ror)) ? 0.06 : parseFloat(asset.ror) / 100;
          let fvBalance = balance * Math.pow(1 + ror / 12, monthsToClientRetirement);
          if (clientRetirementAge < startAge) {
            const additionalMonths = (startAge - clientRetirementAge) * 12;
            fvBalance = fvBalance * Math.pow(1 + rorRetirement / 12, additionalMonths);
          }
          totalBalance += fvBalance;
        });
      }
    });

    let balance = totalBalance;
    result.totalBalance = Math.round(totalBalance);
    result.depletionAge = startAge;

    // Add blank starting row
    result.labels.push(clientData.isMarried ? `${startAge - yearsToRetirement}/${startAge - yearsToRetirement - ageDifference}` : `${startAge - yearsToRetirement}`);
    result.needData.push(0);
    result.incomeData.push(0);
    result.socialSecurityData.push(0);
    result.withdrawalData.push(0);
    result.earningsData.push(0);
    result.balanceData.push(Math.round(totalBalance));
    result.shortfallData.push(0);

    // Calculate timeline data
    for (let i = 0; i <= maxTimelineAge - startAge; i++) {
      const currentC1Age = startAge + i;
      const currentC2Age = currentC1Age - ageDifference;
      const ageLabel = clientData.isMarried
        ? `${currentC1Age <= c1MaxAge ? currentC1Age : ''}/${currentC2Age <= c2MaxAge ? currentC2Age : ''}`
        : `${currentC1Age <= c1MaxAge ? currentC1Age : ''}`;
      result.labels.push(ageLabel);

      // Determine income need
      let monthlyNeedBase;
      if (i < yearsAfterRetirement1) {
        monthlyNeedBase = monthlyNeedInitial;
      } else if (i < yearsAfterRetirement2) {
        monthlyNeedBase = monthlyNeed1;
      } else {
        monthlyNeedBase = monthlyNeed2;
      }
      const monthlyNeedAdjusted = monthlyNeedBase * Math.pow(1 + inflation, yearsToRetirement + i);
      const annualNeedAdjusted = monthlyNeedAdjusted * 12;
      result.needData.push(Math.round(annualNeedAdjusted));

      // Calculate income
      let employmentIncome = 0;
      let otherIncome = 0;
      if (currentC1Age < c1RetirementAge) {
        employmentIncome += parseFloat(clientData.client1.incomeSources.employment) || 0;
      }
      if (currentC1Age <= c1MaxAge) {
        otherIncome += (parseFloat(clientData.client1.incomeSources.other) || 0) * 12;
      }
      if (clientData.isMarried && currentC2Age < c2RetirementAge) {
        employmentIncome += parseFloat(clientData.client2.incomeSources.employment) || 0;
      }
      if (clientData.isMarried && currentC2Age <= c2MaxAge) {
        otherIncome += (parseFloat(clientData.client2.incomeSources.other) || 0) * 12;
      }
      const totalIncome = employmentIncome + otherIncome;
      result.incomeData.push(Math.round(totalIncome));

      // Calculate Social Security
      let socialSecurity = 0;
      if (currentC1Age >= c1RetirementAge && currentC1Age <= c1MaxAge) {
        socialSecurity += (parseFloat(clientData.client1.incomeSources.socialSecurity) || 0) * 12azionali: true,
        stack: true,
        bar: true,
        data: [
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
          x: { title: { display: true, text: clientData.isMarried ? 'Client 1/Client 2 Age' : 'Client 1 Age' }, stacked: true },
          y: { title: { display: true, text: 'Annual Income ($)' }, stacked: true, beginAtZero: true }
        }
      }
    });
    console.log('Retirement Accumulation bar graph rendered');
    chartCanvas.chartInstance = chartInstance;
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
    chartCanvas.chartInstance = chartInstance;
    return chartInstance;
  }
}

/**
 * Updates the alternatives bar graph, showing the impact of saving more, increasing ROR,
 * reducing income needs, and delaying retirement.
 */
export function updateAlternativesGraph(chartCanvas, saveMorePercent, rorIncreasePercent, reductionPercent, retirementDelayPercent, Chart) {
  try {
    if (!chartCanvas) {
      console.error('Chart canvas #alternatives-chart not found');
      return null;
    }
    if (typeof Chart === 'undefined') {
      console.error('Chart.js not loaded');
      return null;
    }

    const ctx = chartCanvas.getContext('2d');
    let chartInstance = null;

    if (chartCanvas.chartInstance) {
      chartCanvas.chartInstance.destroy();
      chartCanvas.chartInstance = null;
    }

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Save More', 'Increase ROR', 'Reduce Income Needs', 'Delay Retirement'],
        datasets: [
          {
            label: 'Base',
            data: [
              Math.max(0, 100 - saveMorePercent),
              Math.max(0, 100 - rorIncreasePercent),
              Math.max(0, 100 - reductionPercent),
              Math.max(0, 100 - retirementDelayPercent)
            ],
            backgroundColor: '#22c55e',
            stack: 'Stack0'
          },
          {
            label: 'Adjustment',
            data: [
              saveMorePercent,
              rorIncreasePercent,
              reductionPercent,
              retirementDelayPercent
            ],
            backgroundColor: '#ef4444',
            stack: 'Stack0'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
          title: { display: true, text: 'Retirement Alternatives Impact (%)' }
        },
        scales: {
          x: { title: { display: true, text: 'Options' }, stacked: true },
          y: {
            title: { display: true, text: 'Percentage (%)' },
            stacked: true,
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
    console.log('Alternatives bar graph rendered');
    chartCanvas.chartInstance = chartInstance;
    return chartInstance;
  } catch (error) {
    console.error('Error in updateAlternativesGraph:', error);
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
        plugins: { title: { display: true, text: 'Error rendering alternatives graph' } }
      }
    });
    chartCanvas.chartInstance = chartInstance;
    return chartInstance;
  }
}

/**
 * Calculates capital accounts' growth up to the first client's retirement.
 */
function calculateCapitalAccounts(clientData, getAge) {
  const result = {
    capitalAccounts: [],
    totalCapital: 0,
    labels: [],
    datasets: [],
    firstClientName: ''
  };

  try {
    const c1Age = getAge(clientData.client1.personal.dob);
    const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
    const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
    const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;

    const c1YearsToRetirement = c1RetirementAge - c1Age;
    const c2YearsToRetirement = clientData.isMarried ? c2RetirementAge - c2Age : Infinity;
    const firstRetirementYears = Math.min(c1YearsToRetirement, c2YearsToRetirement);
    const firstClientIsC1 = c1YearsToRetirement <= c2YearsToRetirement;
    const firstCurrentAge = firstClientIsC1 ? c1Age : c2Age;

    result.labels = Array.from({ length: firstRetirementYears + 1 }, (_, i) => firstCurrentAge + i);
    result.firstClientName = firstClientIsC1 ? clientData.client1.personal.name || 'Client 1' : clientData.client2.personal.name || 'Client 2';

    const clients = [clientData.client1, clientData.isMarried ? clientData.client2 : null];
    clients.forEach((client, idx) => {
      if (!client) return;
      const clientAge = idx === 0 ? c1Age : c2Age;
      const clientRetirementAge = idx === 0 ? c1RetirementAge : c2RetirementAge;
      const monthsToClientRetirement = (clientRetirementAge - clientAge) * 12;
      const yearsToClientRetirement = Math.min(clientRetirementAge - clientAge, firstRetirementYears);

      client.accounts.forEach(account => {
        let balance = Math.round(parseFloat(account.balance) || 0);
        const annualContribution = Math.round(parseFloat(account.contribution) || 0);
        const monthlyContribution = annualContribution / 12;
        const employmentIncome = Math.round(parseFloat(client.incomeSources.employment) || 0);
        const employerMatchPercent = isNaN(parseFloat(account.employerMatch)) ? 0 : parseFloat(account.employerMatch) / 100;
        const annualEmployerMatch = employerMatchPercent * employmentIncome;
        const monthlyEmployerMatch = annualEmployerMatch / 12;
        const ror = isNaN(parseFloat(account.ror)) ? 0.06 : parseFloat(account.ror) / 100;

        const yearlyBalances = [];
        for (let year = 0;year <= yearsToClientRetirement; year++) {
          const months = year * 12;
          const fvBalance = balance * Math.pow(1 + ror / 12, months);
          const fvContributions = monthlyContribution && ror ? monthlyContribution * (Math.pow(1 + ror / 12, months) - 1) / (ror / 12) * (1 + ror / 12) : 0;
          const fvEmployerMatch = monthlyEmployerMatch && ror ? monthlyEmployerMatch * (Math.pow(1 + ror / 12, months) - 1) / (ror / 12) * (1 + ror / 12) : 0;
          const yearBalance = fvBalance + fvContributions + fvEmployerMatch;
          yearlyBalances.push(Math.round(yearBalance));
        }

        if (yearlyBalances[yearlyBalances.length - 1] > 0) {
          const accountName = `${client.personal.name || (idx === 0 ? 'Client 1' : 'Client 2')}'s ${account.name || 'Retirement Account'}`;
          result.capitalAccounts.push({
            name: accountName,
            balances: yearlyBalances,
            isClient1: idx === 0
          });
          result.totalCapital += yearlyBalances[yearlyBalances.length - 1];
        }
      });
    });

    result.datasets = result.capitalAccounts.map(account => {
      const dataset = {
        label: account.name,
        data: account.balances,
        backgroundColor: account.isClient1 ? '#22c55e' : '#3b82f6'
      };
      if (clientData.isMarried) {
        dataset.stack = 'Accounts';
      }
      return dataset;
    });

    result.shouldStack = clientData.isMarried;
  } catch (error) {
    console.error('Error in calculateCapitalAccounts:', error);
  }

  return result;
}

/**
 * Calculates retirement alternatives and depletion age based on phased income needs.
 */
function calculateRetirementAlternatives(clientData, getAge, incomeData) {
  const result = {
    saveMorePercent: 0,
    additionalMonthlySavings: 0,
    cappedRorIncreasePercent: 0,
    targetROR: 0,
    cappedReductionPercent: 0,
    reducedMonthlyNeed: 0,
    capped 𝘁irementDelayPercent: 0,
    newRetirementAge: 0,
    depletionAge: 0,
    monthlySources: 0
  };

  try {
    const c1Age = getAge(clientData.client1.personal.dob);
    const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
    const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
    const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
    const startAge = Math.max(c1RetirementAge, c2RetirementAge);

    const c1MortalityAgeRaw = parseFloat(clientData.assumptions.c1MortalityAge) || 90;
    const c2MortalityAgeRaw = clientData.isMarried ? (parseFloat(clientData.assumptions.c2MortalityAge) || 90) : c1MortalityAgeRaw;
    const c1MortalityAge = isNaN(c1MortalityAgeRaw) || c1MortalityAgeRaw < c1RetirementAge ? 90 : Math.min(c1MortalityAgeRaw, 120);
    const c2MortalityAge = isNaN(c2MortalityAgeRaw) || c2MortalityAgeRaw < c2RetirementAge ? 90 : Math.min(c2MortalityAgeRaw, 120);

    const maxTimelineAge = clientData.isMarried ? Math.max(c1MortalityAge, c2MortalityAge) : c1MortalityAge;
    const inflation = isNaN(parseFloat(clientData.assumptions.inflation)) ? 0.02 : parseFloat(clientData.assumptions.inflation) / 100;
    const rorRetirement = isNaN(parseFloat(clientData.assumptions.rorRetirement)) ? 0.04 : parseFloat(clientData.assumptions.rorRetirement) / 100;

    const monthlyNeedInitial = parseFloat(document.getElementById('monthly-income-initial')?.value) || 5000;
    const yearsAfterRetirement1 = parseInt(document.getElementById('years-after-retirement-1')?.value) || 5;
    const monthlyNeed1 = parseFloat(document.getElementById('monthly-income-1')?.value) || 4500;
    const yearsAfterRetirement2 = parseInt(document.getElementById('years-after-retirement-2')?.value) || 10;
    const monthlyNeed2 = parseFloat(document.getElementById('monthly-income-2')?.value) || 4000;

    const yearsToRetirement = startAge - c1Age;

    // Aggregate income sources
    const incomeSources = [];
    if (clientData.client1.incomeSources.socialSecurity) {
      incomeSources.push({ amount: parseFloat(clientData.client1.incomeSources.socialSecurity) || 0 });
    }
    if (clientData.isMarried && clientData.client2.incomeSources?.socialSecurity) {
      incomeSources.push({ amount: parseFloat(clientData.client2.incomeSources.socialSecurity) || 0 });
    }
    if (clientData.client1.incomeSources.other) {
      incomeSources.push({ amount: parseFloat(clientData.client1.incomeSources.other) || 0 });
    }
    if (clientData.isMarried && clientData Ascendancy: true,
    stack: true,
    bar: true,
    data: [
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
      x: { title: { display: true, text: clientData.isMarried ? 'Client 1/Client 2 Age' : 'Client 1 Age' }, stacked: true },
      y: { title: { display: true, text: 'Annual Income ($)' }, stacked: true, beginAtZero: true }
    }
  }
});
chartCanvas.chartInstance = chartInstance;
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
chartCanvas.chartInstance = chartInstance;
return chartInstance;
}
}

/**
* Updates the alternatives bar graph, showing the impact of saving more, increasing ROR,
* reducing income needs, and delaying retirement.
*/
export function updateAlternativesGraph(chartCanvas, saveMorePercent, rorIncreasePercent, reductionPercent, retirementDelayPercent, Chart) {
try {
if (!chartCanvas) {
  console.error('Chart canvas #alternatives-chart not found');
  return null;
}
if (typeof Chart === 'undefined') {
  console.error('Chart.js not loaded');
  return null;
}

const ctx = chartCanvas.getContext('2d');
let chartInstance = null;

if (chartCanvas.chartInstance) {
  chartCanvas.chartInstance.destroy();
  chartCanvas.chartInstance = null;
}

chartInstance = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Save More', 'Increase ROR', 'Reduce Income Needs', 'Delay Retirement'],
    datasets: [
      {
        label: 'Base',
        data: [
          Math.max(0, 100 - saveMorePercent),
          Math.max(0, 100 - rorIncreasePercent),
          Math.max(0, 100 - reductionPercent),
          Math.max(0, 100 - retirementDelayPercent)
        ],
        backgroundColor: '#22c55e',
        stack: 'Stack0'
      },
      {
        label: 'Adjustment',
        data: [
          saveMorePercent,
          rorIncreasePercent,
          reductionPercent,
          retirementDelayPercent
        ],
        backgroundColor: '#ef4444',
        stack: 'Stack0'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Retirement Alternatives Impact (%)' }
    },
    scales: {
      x: { title: { display: true, text: 'Options' }, stacked: true },
      y: {
        title: { display: true, text: 'Percentage (%)' },
        stacked: true,
        beginAtZero: true,
        max: 100
      }
    }
  }
});
console.log('Alternatives bar graph rendered');
chartCanvas.chartInstance = chartInstance;
return chartInstance;
} catch (error) {
console.error('Error in updateAlternativesGraph:', error);
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
    plugins: { title: { display: true, text: 'Error rendering alternatives graph' } }
  }
});
chartCanvas.chartInstance = chartInstance;
return chartInstance;
}
}

/**
* Calculates capital accounts' growth up to the first client's retirement.
*/
function calculateCapitalAccounts(clientData, getAge) {
const result = {
capitalAccounts: [],
totalCapital: 0,
labels: [],
datasets: [],
firstClientName: ''
};

try {
const c1Age = getAge(clientData.client1.personal.dob);
const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;

const c1YearsToRetirement = c1RetirementAge - c1Age;
const c2YearsToRetirement = clientData.isMarried ? c2RetirementAge - c2Age : Infinity;
const firstRetirementYears = Math.min(c1YearsToRetirement, c2YearsToRetirement);
const firstClientIsC1 = c1YearsToRetirement <= c2YearsToRetirement;
const firstCurrentAge = firstClientIsC1 ? c1Age : c2Age;

result.labels = Array.from({ length: firstRetirementYears + 1 }, (_, i) => firstCurrentAge + i);
result.firstClientName = firstClientIsC1 ? clientData.client1.personal.name || 'Client 1' : clientData.client2.personal.name || 'Client 2';

const clients = [clientData.client1, clientData.isMarried ? clientData.client2 : null];
clients.forEach((client, idx) => {
  if (!client) return;
  const clientAge = idx === 0 ? c1Age : c2Age;
  const clientRetirementAge = idx === 0 ? c1RetirementAge : c2RetirementAge;
  const monthsToClientRetirement = (clientRetirementAge - clientAge) * 12;
  const yearsToClientRetirement = Math.min(clientRetirementAge - clientAge, firstRetirementYears);

  client.accounts.forEach(account => {
    let balance = Math.round(parseFloat(account.balance) || 0);
    const annualContribution = Math.round(parseFloat(account.contribution) || 0);
    const monthlyContribution = annualContribution / 12;
    const employmentIncome = Math.round(parseFloat(client.incomeSources.employment) || 0);
    const employerMatchPercent = isNaN(parseFloat(account.employerMatch)) ? 0 : parseFloat(account.employerMatch) / 100;
    const annualEmployerMatch = employerMatchPercent * employmentIncome;
    const monthlyEmployerMatch = annualEmployerMatch / 12;
    const ror = isNaN(parseFloat(account.ror)) ? 0.06 : parseFloat(account.ror) / 100;

    const yearlyBalances = [];
    for (let year = 0; year <= yearsToClientRetirement; year++) {
      const months = year * 12;
      const fvBalance = balance * Math.pow(1 + ror / 12, months);
      const fvContributions = monthlyContribution && ror ? monthlyContribution * (Math.pow(1 + ror / 12, months) - 1) / (ror / 12) * (1 + ror / 12) : 0;
      const fvEmployerMatch = monthlyEmployerMatch && ror ? monthlyEmployerMatch * (Math.pow(1 + ror / 12, months) - 1) / (ror / 12) * (1 + ror / 12) : 0;
      const yearBalance = fvBalance + fvContributions + fvEmployerMatch;
      yearlyBalances.push(Math.round(yearBalance));
    }

    if (yearlyBalances[yearlyBalances.length - 1] > 0) {
      const accountName = `${client.personal.name || (idx === 0 ? 'Client 1' : 'Client 2')}'s ${account.name || 'Retirement Account'}`;
      result.capitalAccounts.push({
        name: accountName,
        balances: yearlyBalances,
        isClient1: idx === 0
      });
      result.totalCapital += yearlyBalances[yearlyBalances.length - 1];
    }
  });
});

result.datasets = result.capitalAccounts.map(account => {
  const dataset = {
    label: account.name,
    data: account.balances,
    backgroundColor: account.isClient1 ? '#22c55e' : '#3b82f6'
  };
  if (clientData.isMarried) {
    dataset.stack = 'Accounts';
  }
  return dataset;
});

result.shouldStack = clientData.isMarried;
} catch (error) {
console.error('Error in calculateCapitalAccounts:', error);
}

return result;
}

/**
* Calculates retirement alternatives and depletion age based on phased income needs.
*/
function calculateRetirementAlternatives(clientData, getAge, incomeData) {
const result = {
saveMorePercent: 0,
additionalMonthlySavings: 0,
cappedRorIncreasePercent: 0,
targetROR: 0,
cappedReductionPercent: 0,
reducedMonthlyNeed: 0,
cappedRetirementDelayPercent: 0,
newRetirementAge: 0,
depletionAge: 0,
monthlySources: 0
};

try {
const c1Age = getAge(clientData.client1.personal.dob);
const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
const startAge = Math.max(c1RetirementAge, c2RetirementAge);

const c1MortalityAgeRaw = parseFloat(clientData.assumptions.c1MortalityAge) || 90;
const c2MortalityAgeRaw = clientData.isMarried ? (parseFloat(clientData.assumptions.c2MortalityAge) || 90) : c1MortalityAgeRaw;
const c1MortalityAge = isNaN(c1MortalityAgeRaw) || c1MortalityAgeRaw < c1RetirementAge ? 90 : Math.min(c1MortalityAgeRaw, 120);
const c2MortalityAge = isNaN(c2MortalityAgeRaw) || c2MortalityAgeRaw < c2RetirementAge ? 90 : Math.min(c2MortalityAgeRaw, 120);

const maxTimelineAge = clientData.isMarried ? Math.max(c1MortalityAge, c2MortalityAge) : c1MortalityAge;
const inflation = isNaN(parseFloat(clientData.assumptions.inflation)) ? 0.02 : parseFloat(clientData.assumptions.inflation) / 100;
const rorRetirement = isNaN(parseFloat(clientData.assumptions.rorRetirement)) ? 0.04 : parseFloat(clientData.assumptions.rorRetirement) / 100;

const monthlyNeedInitial = parseFloat(document.getElementById('monthly-income-initial')?.value) || 5000;
const yearsAfterRetirement1 = parseInt(document.getElementById('years-after-retirement-1')?.value) || 5;
const monthlyNeed1 = parseFloat(document.getElementById('monthly-income-1')?.value) || 4500;
const yearsAfterRetirement2 = parseInt(document.getElementById('years-after-retirement-2')?.value) || 10;
const monthlyNeed2 = parseFloat(document.getElementById('monthly-income-2')?.value) || 4000;

const yearsToRetirement = startAge - c1Age;

// Aggregate income sources
const incomeSources = [];
if (clientData.client1.incomeSources.socialSecurity) {
  incomeSources.push({ amount: parseFloat(clientData.client1.incomeSources.socialSecurity) || 0 });
}
if (clientData.isMarried && clientData.client2.incomeSources?.socialSecurity) {
  incomeSources.push({ amount: parseFloat(clientData.client2.incomeSources.socialSecurity) || 0 });
}
if (clientData.client1.incomeSources.other) {
  incomeSources.push({ amount: parseFloat(clientData.client1.incomeSources.other) || 0 });
}
if (clientData.isMarried && clientData.client2.incomeSources?.other) {
  incomeSources.push({ amount: parseFloat(clientData.client2.incomeSources.other) || 0 });
}
result.monthlySources = incomeSources.reduce((sum, src) => sum + (src.amount || 0), 0);

const currentSavings = parseFloat(clientData.savingsExpenses?.monthlySavings) || 0;

// Calculate depletion age
let balance = incomeData.totalBalance;
result.depletionAge = startAge;
for (let i = 0; i <= maxTimelineAge - startAge; i++) {
  let monthlyNeedBase;
  if (i < yearsAfterRetirement1) {
    monthlyNeedBase = monthlyNeedInitial;
  } else if (i < yearsAfterRetirement2) {
    monthlyNeedBase = monthlyNeed1;
  } else {
    monthlyNeedBase = monthlyNeed2;
  }
  const currentNeed = monthlyNeedBase * Math.pow(1 + inflation, yearsToRetirement + i) - result.monthlySources;
  balance = balance * Math.pow(1 + rorRetirement / 12, 12) - (currentNeed > 0 ? currentNeed * 12 : 0);
  if (balance <= 0) {
    result.depletionAge = startAge + i;
    break;
  }
}
if (balance > 0) result.depletionAge = maxTimelineAge;

// Calculate "Save More" option
if (result.depletionAge < maxTimelineAge) {
  const shortfallValues = incomeData.shortfallData.slice(1);
  let totalShortfall = 0;
  for (let i = 0; i < shortfallValues.length; i++) {
    if (shortfallValues[i] > 0) {
      const discountedShortfall = shortfallValues[i] / Math.pow(1 + rorRetirement, i);
      totalShortfall += discountedShortfall;
    }
  }
  const capitalNeededAtRetirement = totalShortfall;

  let totalROR = 0;
  let accountCount = 0;
  const clients = [clientData.client1, clientData.isMarried ? clientData.client2 : null];
  clients.forEach(client => {
    if (!client) return;
    client.accounts.forEach(account => {
      const ror = isNaN(parseFloat(account.ror)) ? 0.06 : parseFloat(account.ror) / 100;
      totalROR += ror;
      accountCount++;
    });
  });
  const avgROR = accountCount > 0 ? totalROR / accountCount : 0.06;

  const monthsToRetirement = yearsToRetirement * 12;
  if (avgROR > 0 && monthsToRetirement > 0) {
    const monthlyROR = avgROR / 12;
    const denominator = (Math.pow(1 + monthlyROR, monthsToRetirement) - 1) / monthlyROR * (1 + monthlyROR);
    result.additionalMonthlySavings = capitalNeededAtRetirement / denominator;
    result.additionalMonthlySavings = Math.round(result.additionalMonthlySavings);
  } else {
    result.additionalMonthlySavings = monthsToRetirement > 0 ? Math.round(capitalNeededAtRetirement / monthsToRetirement) : 0;
  }

  const baseAmount = currentSavings > 0 ? currentSavings : ((parseFloat(clientData.client1.incomeSources.employment) || 0) + (clientData.isMarried ? (parseFloat(clientData.client2.incomeSources.employment) || 0) : 0)) / 12;
  result.saveMorePercent = baseAmount > 0 ? (result.additionalMonthlySavings / baseAmount) * 100 : 0;
  result.saveMorePercent = Math.min(result.saveMorePercent, 100);
}

// Calculate "Increase ROR" option
result.targetROR = rorRetirement;
if (result.depletionAge < maxTimelineAge) {
  let low = rorRetirement;
  let high = 0.2;
  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    let tempBalance = incomeData.totalBalance;
    for (let j = 0; j <= maxTimelineAge - startAge; j++) {
      let monthlyNeedBase;
      if (j < yearsAfterRetirement1) {
        monthlyNeedBase = monthlyNeedInitial;
      } else if (j < yearsAfterRetirement2) {
        monthlyNeedBase = monthlyNeed1;
      } else {
        monthlyNeedBase = monthlyNeed2;
      }
      const currentNeed = monthlyNeedBase * Math.pow(1 + inflation, yearsToRetirement + j) - result.monthlySources;
      tempBalance = tempBalance * Math.pow(1 + mid / 12, 12) - (currentNeed > 0 ? currentNeed * 12 : 0);
      if (tempBalance <= 0) break;
    }
    if (tempBalance > 0) high = mid;
    else low = mid;
  }
  result.targetROR = (low + high) / 2;
}

const currentRORs = [];
clients.forEach(client => {
  if (!client) return;
  client.accounts.forEach(account => {
    const ror = isNaN(parseFloat(account.ror)) ? 0.06 : parseFloat(account.ror) / 100;
    currentRORs.push(ror);
  });
});
const avgCurrentROR = currentRORs.length > 0 ? currentRORs.reduce((sum, ror) => sum + ror, 0) / currentRORs.length : 0.06;
const rorIncreasePercent = avgCurrentROR > 0 ? ((result.targetROR - avgCurrentROR) / avgCurrentROR) * 100 : 0;
result.cappedRorIncreasePercent = Math.min(rorIncreasePercent, 100);

// Calculate "Reduce Income Needs" option
result.reducedMonthlyNeed = monthlyNeedInitial; // Start with initial need
if (result.depletionAge < maxTimelineAge) {
  let low = 0;
  let high = monthlyNeedInitial * 2; // Arbitrary upper bound
  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    let tempBalance = incomeData.totalBalance;
    for (let j = 0; j <= maxTimelineAge - startAge; j++) {
      let monthlyNeedBase;
      if (j < yearsAfterRetirement1) {
        monthlyNeedBase = mid;
      } else if (j < yearsAfterRetirement2) {
        monthlyNeedBase = monthlyNeed1;
      } else {
        monthlyNeedBase = monthlyNeed2;
      }
      const currentNeed = monthlyNeedBase * Math.pow(1 + inflation, yearsToRetirement + j) - result.monthlySources;
      tempBalance = tempBalance * Math.pow(1 + rorRetirement / 12, 12) - (currentNeed > 0 ? currentNeed * 12 : 0);
      if (tempBalance <= 0) break;
    }
    if (tempBalance > 0) high = mid;
    else low = mid;
  }
  result.reducedMonthlyNeed = (low + high) / 2;
}
const reductionPercent = monthlyNeedInitial > 0 ? ((monthlyNeedInitial - result.reducedMonthlyNeed) / monthlyNeedInitial) * 100 : 0;
result.cappedReductionPercent = Math.min(reductionPercent, 100);

// Calculate "Delay Retirement" option
result.newRetirementAge = c1RetirementAge;
if (result.depletionAge < maxTimelineAge) {
  const yearsNeeded = maxTimelineAge - result.depletionAge;
  result.newRetirementAge = Math.ceil(c1RetirementAge + yearsNeeded);
  if (result.newRetirementAge > maxTimelineAge) result.newRetirementAge = maxTimelineAge;
}
const originalYearsToRetirement = c1RetirementAge - c1Age;
const additionalYears = result.newRetirementAge - c1RetirementAge;
const retirementDelayPercent = originalYearsToRetirement > 0 ? (additionalYears / originalYearsToRetirement) * 100 : 0;
result.cappedRetirementDelayPercent = Math.min(retirementDelayPercent, 100);
} catch (error) {
console.error('Error in calculateRetirementAlternatives:', error);
}

return result;
}

/**
* Updates the retirement analysis outputs, including graphs, tables, and reports.
*/
export function updateRetirementOutputs(analysisOutputs, clientData, formatCurrency, getAge, selectedReports, Chart) {
try {
if (!analysisOutputs) {
  console.error('Analysis outputs #analysis-outputs not found');
  return;
}

const tabContainer = document.getElementById('output-tabs-container');
if (!tabContainer) {
  console.warn('Tab container #output-tabs-container not found; dropdown will be rendered in analysis-outputs');
}

const c1Age = getAge(clientData.client1.personal.dob);
const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
const startAge = Math.max(c1RetirementAge, c2RetirementAge);

const c1MortalityAgeRaw = parseFloat(clientData.assumptions.c1MortalityAge) || 90;
const c2MortalityAgeRaw = clientData.isMarried ? (parseFloat(clientData.assumptions.c2MortalityAge) || 90) : c1MortalityAgeRaw;
const c1MortalityAge = isNaN(c1MortalityAgeRaw) || c1MortalityAgeRaw < c1RetirementAge ? 90 : Math.min(c1MortalityAgeRaw, 120);
const c2MortalityAge = isNaN(c2MortalityAgeRaw) || c2MortalityAgeRaw < c2RetirementAge ? 90 : Math.min(c2MortalityAgeRaw, 120);

const maxTimelineAge = clientData.isMarried ? Math.max(c1MortalityAge, c2MortalityAge) : c1MortalityAge;
const inflation = isNaN(parseFloat(clientData.assumptions.inflation)) ? 0.02 : parseFloat(clientData.assumptions.inflation) / 100;

clientData.client1.other = clientData.client1.other || { assets: [] };
clientData.client2 = clientData.client2 || { other: { assets: [] } };

if (c1Age >= c1RetirementAge || (clientData.isMarried && c2Age >= c2RetirementAge)) {
  analysisOutputs.innerHTML = '<p class="output-card">Client(s) already at or past retirement age. Please adjust retirement age or DOB.</p>';
  if (tabContainer) tabContainer.innerHTML = '';
  return;
}
if (c1RetirementAge >= c1MortalityAge || (clientData.isMarried && c2RetirementAge >= c2MortalityAge)) {
  analysisOutputs.innerHTML = '<p class="output-card">Retirement age must be less than mortality age.</p>';
  if (tabContainer) tabContainer.innerHTML = '';
  return;
}

const monthlyNeedInitial = parseFloat(document.getElementById('monthly-income-initial')?.value) || 5000;
const yearsAfterRetirement1 = parseInt(document.getElementById('years-after-retirement-1')?.value) || 5;
const monthlyNeed1 = parseFloat(document.getElementById('monthly-income-1')?.value) || 4500;
const yearsAfterRetirement2 = parseInt(document.getElementById('years-after-retirement-2')?.value) || 10;
const monthlyNeed2 = parseFloat(document.getElementById('monthly-income-2')?.value) || 4000;

const incomeGoals = [
  { age: c1RetirementAge, percentage: 100, amount: Math.round(monthlyNeedInitial) },
  { age: c1RetirementAge + yearsAfterRetirement1, percentage: Math.round((monthlyNeed1 / monthlyNeedInitial) * 100), amount: Math.round(monthlyNeed1) },
  { age: c1RetirementAge + yearsAfterRetirement2, percentage: Math.round((monthlyNeed2 / monthlyNeedInitial) * 100), amount: Math.round(monthlyNeed2) }
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
    details: `At age ${c1RetirementAge} until ${c1MortalityAge}`,
    amount: Math.round(parseFloat(clientData.client1.incomeSources.socialSecurity) || 0)
  });
}
if (clientData.isMarried && clientData.client2.incomeSources?.socialSecurity) {
  incomeSources.push({
    source: `${clientData.client2.personal?.name || 'Client 2'}'s Social Security`,
    details: `At age ${c2RetirementAge} until ${c2MortalityAge}`,
    amount: Math.round(parseFloat(clientData.client2.incomeSources.socialSecurity) || 0)
  });
}
if (clientData.client1.incomeSources.other) {
  incomeInsights.push({
    source: `${clientData.client1.personal.name || 'Client 1'}'s Other Income`,
    details: `At age ${c1RetirementAge} until ${c1MortalityAge}`,
    amount: Math.round(parseFloat(clientData.client1.incomeSources.other) || 0)
  });
}
if (clientData.isMarried && clientData.client2.incomeSources?.other) {
  incomeSources.push({
    source: `${clientData.client2.personal?.name || 'Client 2'}'s Other Income`,
    details: `At age ${c2RetirementAge} until ${c2MortalityAge}`,
    amount: Math.round(parseFloat(clientData.client2.incomeSources.other) || 0)
  });
}

const capitalData = calculateCapitalAccounts(clientData, getAge);
const incomeData = calculateRetirementIncome(clientData, getAge);
const alternativesData = calculateRetirementAlternatives(clientData, getAge, incomeData);

const reportOptions = [
  { id: 'output-graph', label: 'Retirement Analysis', reportId: 'report-graph', title: 'Retirement Income Graph' },
  { id: 'report-social-security-optimizer', label: 'Social Security Optimizer', reportId: 'report-social-security-optimizer', title: 'Social Security Optimizer' },
  { id: 'report-capital-available', label: 'Capital Available at Retirement', reportId: 'report-capital-available', title: 'Capital Available at Retirement' },
  { id: 'output-alternatives', label: 'Alternatives to Achieving Retirement Goals', reportId: 'report-alternatives-retirement', title: 'Retirement Alternatives' },
  { id: 'output-timeline', label: 'Retirement Timeline', reportId: 'report-retirement-timeline', title: 'Retirement Income Timeline' },
  { id: 'report-retirement-fact-finder', label: 'Fact Finder', reportId: 'report-retirement-fact-finder', title: 'Retirement Fact Finder' }
];

const select = document.getElementById('output-select');
const currentSelection = select ? select.value : 'output-graph';

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
      <h3>Retirement Income Graph</h3>
      <canvas id="analysis-chart" style="max-height: 400px;"></canvas>
    </div>
  </div>
  <div class="output-tab-content ${currentSelection === 'output-timeline' ? 'active' : ''}" id="output-timeline" style="display: ${currentSelection === 'output-timeline' ? 'block' : 'none'};">
    <div class="output-card">
      <h3>Retirement Income Timeline</h3>
      <table class="output-table">
        <thead>
          <tr>
            <th>${clientData.isMarried ? 'Client 1/Client 2 Age' : 'Age'}</th>
            <th>Need</th>
            <th>Income</th>
            <th>Social Security</th>
            <th>Withdrawal</th>
            <th>Earnings</th>
            <th>Balance</th>
            <th>Shortfall</th>
          </tr>
        </thead>
        <tbody>
          ${incomeData.labels.map((label, i) => `
            <tr>
              <td>${label}</td>
              <td>${formatCurrency(incomeData.needData[i])}</td>
              <td>${formatCurrency(incomeData.incomeData[i])}</td>
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
  </div>
  <div class="output-tab-content ${currentSelection === 'output-alternatives' ? 'active' : ''}" id="output-alternatives" style="display: ${currentSelection === 'output-alternatives' ? 'block' : 'none'};">
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
            <td>Save More</td>
            <td>Increase monthly savings by ${formatCurrency(alternativesData.additionalMonthlySavings)}</td>
          </tr>
          <tr>
            <td>Increase Rate of Return</td>
            <td>Increase portfolio ROR to ${(alternativesData.targetROR * 100).toFixed(1)}% from ${(alternativesData.cappedRorIncreasePercent ? ((alternativesData.targetROR / (1 + alternativesData.cappedRorIncreasePercent / 100)) * 100).toFixed(1) : 6)}%</td>
          </tr>
          <tr>
            <td>Reduce Income Needs</td>
            <td>Reduce monthly income needs to ${formatCurrency(Math.round(alternativesData.reducedMonthlyNeed))} from ${formatCurrency(Math.round(monthlyNeedInitial))} (${alternativesData.cappedReductionPercent.toFixed(1)}% reduction)</td>
          </tr>
          <tr>
            <td>Delay Retirement</td>
            <td>Delay retirement to age ${alternativesData.newRetirementAge} from age ${c1RetirementAge}</td>
          </tr>
        </tbody>
      </table>
      <h4>Alternatives Impact Visualization</h4>
      <canvas id="alternatives-chart" style="max-height: 400px;"></canvas>
    </div>
  </div>
  <div class="output-tab-content ${currentSelection === 'report-social-security-optimizer' ? 'active' : ''}" id="report-social-security-optimizer" style="display: ${currentSelection === 'report-social-security-optimizer' ? 'block' : 'none'};">
    <div class="output-card">
      <h3>Social Security Optimizer</h3>
      <p>Optimized Social Security strategies will be displayed here. (Placeholder: Optimization logic not implemented.)</p>
    </div>
  </div>
  <div class="output-tab-content ${currentSelection === 'report-capital-available' ? 'active' : ''}" id="report-capital-available" style="display: ${currentSelection === 'report-capital-available' ? 'block' : 'none'};">
    <div class="output-card">
      <h3>Capital Available at Retirement</h3>
      <canvas id="capital-growth-chart" style="max-height: 400px;"></canvas>
      <table class="output-table">
        <thead>
          <tr>
            <th>Account</th>
            <th>Balance at Retirement</th>
          </tr>
        </thead>
        <tbody>
          ${capitalData.capitalAccounts.map(account => `
            <tr>
              <td>${account.name}</td>
              <td>${formatCurrency(account.balances[account.balances.length - 1])}</td>
            </tr>
          `).join('')}
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>${formatCurrency(Math.round(capitalData.totalCapital))}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
<div class="output-tab-content ${currentSelection === 'report-retirement-fact-finder' ? 'active' : ''}" id="report-retirement-fact-finder" style="display: ${currentSelection === 'report-retirement-fact-finder' ? 'block' : 'none'};">
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
          <tr>
            <td>Mortality Age</td>
            <td>${clientData.assumptions.c1MortalityAge || 'N/A'}</td>
            ${clientData.isMarried ? `<td>${clientData.assumptions.c2MortalityAge || 'N/A'}</td>` : ''}
          </tr>
        </tbody>
      </table>
      <h4>Income Goals</h4>
      <table class="output-table">
        <thead>
          <tr>
            <th>Age</th>
            <th>Percentage of Initial Need</th>
            <th>Monthly Amount</th>
          </tr>
        </thead>
        <tbody>
          ${incomeGoals.map(goal => `
            <tr>
              <td>${goal.age}</td>
              <td>${goal.percentage}%</td>
              <td>${formatCurrency(goal.amount)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <h4>Income Sources</h4>
      <table class="output-table">
        <thead>
          <tr>
            <th>Source</th>
            <th>Details</th>
            <th>Monthly Amount</th>
          </tr>
        </thead>
        <tbody>
          ${incomeSources.map(source => `
            <tr>
              <td>${source.source}</td>
              <td>${source.details}</td>
              <td>${formatCurrency(source.amount)}</td>
            </tr>
          `).join('')}
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
            <td>Client 1 Mortality Age</td>
            <td>${clientData.assumptions.c1MortalityAge || '90'}</td>
          </tr>
          ${clientData.isMarried ? `
          <tr>
            <td>Client 2 Mortality Age</td>
            <td>${clientData.assumptions.c2MortalityAge || '90'}</td>
          </tr>
          ` : ''}
          <tr>
            <td>Inflation Rate</td>
            <td>${(inflation * 100).toFixed(1)}%</td>
          </tr>
          <tr>
            <td>ROR During Retirement</td>
            <td>${(parseFloat(clientData.assumptions.rorRetirement) || 4).toFixed(1)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

${tabContainer ? `
<script>
  const outputSelect = document.getElementById('output-select');
  if (outputSelect) {
    outputSelect.addEventListener('change', () => {
      const tabs = document.querySelectorAll('.output-tab-content');
      tabs.forEach(tab => {
        tab.style.display = tab.id === outputSelect.value ? 'block' : 'none';
        tab.classList.toggle('active', tab.id === outputSelect.value);
      });
      const addToPresentation = document.getElementById('add-to-presentation');
      if (addToPresentation) {
        const selectedOption = reportOptions.find(opt => opt.id === outputSelect.value);
        addToPresentation.dataset.report = selectedOption.reportId;
        addToPresentation.dataset.title = selectedOption.title;
      }
    });
  }
</script>
` : ''}

<script>
  const analysisChartCanvas = document.getElementById('analysis-chart');
  if (analysisChartCanvas && currentSelection === 'output-graph') {
    updateRetirementGraph(analysisChartCanvas, incomeData, clientData, Chart);
  }
  const capitalChartCanvas = document.getElementById('capital-growth-chart');
  if (capitalChartCanvas && currentSelection === 'report-capital-available') {
    updateCapitalGraph(capitalChartCanvas, capitalData, Chart);
  }
  const alternativesChartCanvas = document.getElementById('alternatives-chart');
  if (alternativesChartCanvas && currentSelection === 'output-alternatives') {
    updateAlternativesGraph(
      alternativesChartCanvas,
      alternativesData.saveMorePercent,
      alternativesData.cappedRorIncreasePercent,
      alternativesData.cappedReductionPercent,
      alternativesData.cappedRetirementDelayPercent,
      Chart
    );
  }
</script>
// Setup dropdown and checkbox interactions
    setupOutputControls(reportOptions, selectedReports, clientData, Chart, getAge);

    // Render the graph if the current selection is output-graph, report-capital-available, or output-alternatives
    if (currentSelection === 'output-graph' || currentSelection === 'report-capital-available' || currentSelection === 'output-alternatives') {
      const chartCanvasId = currentSelection === 'output-graph' ? 'analysis-chart' : currentSelection === 'report-capital-available' ? 'capital-growth-chart' : 'alternatives-chart';
      const chartCanvas = document.getElementById(chartCanvasId);
      if (chartCanvas && typeof Chart !== 'undefined') {
        setTimeout(() => {
          if (currentSelection === 'output-graph') {
            updateRetirementGraph(chartCanvas, clientData, Chart, getAge);
          } else if (currentSelection === 'report-capital-available') {
            // Render the capital growth bar graph
            const ctx = chartCanvas.getContext('2d');
            let chartInstance = null;
            if (chartCanvas.chartInstance) {
              chartCanvas.chartInstance.destroy();
              chartCanvas.chartInstance = null;
            }
            chartInstance = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: capitalData.labels,
                datasets: capitalData.datasets
              },
              options: {
                responsive: true,
                plugins: {
                  legend: { display: true, position: 'top' },
                  title: { display: true, text: 'Capital Account Growth to First Retirement' }
                },
                scales: {
                  x: {
                    title: { display: true, text: `${capitalData.firstClientName} Age` },
                    stacked: capitalData.shouldStack
                  },
                  y: {
                    title: { display: true, text: 'Balance ($)' },
                    stacked: capitalData.shouldStack,
                    beginAtZero: true
                  }
                }
              }
            });
            chartCanvas.chartInstance = chartInstance;
          } else if (currentSelection === 'output-alternatives') {
            updateAlternativesGraph(chartCanvas, alternativesData.saveMorePercent, alternativesData.cappedRorIncreasePercent, alternativesData.cappedReductionPercent, alternativesData.cappedRetirementDelayPercent, Chart);
          }
        }, 100);
      }
    }
  } catch (error) {
    console.error('Error in updateRetirementOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-card">Error rendering outputs. Please check input data.</p>';
    if (tabContainer) tabContainer.innerHTML = '';
  }
}

/**
 * Sets up event listeners for the output dropdown and checkbox to handle view changes
 * and adding reports to a presentation.
 */
function setupOutputControls(reportOptions, selectedReports, clientData, Chart, getAge) {
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
      outputDropdownChangeHandler.call(this, clientData, Chart, getAge);
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

/**
 * Handles changes to the output dropdown, updating the displayed content and
 * rendering graphs as needed.
 */
function outputDropdownChangeHandler(clientData, Chart, getAge) {
  try {
    const selectedTab = this.value;
    document.querySelectorAll('.output-tab-content').forEach(content => {
      content.style.display = content.id === selectedTab ? 'block' : 'none';
    });

    if (selectedTab === 'output-graph' || selectedTab === 'report-capital-available' || selectedTab === 'output-alternatives') {
      const chartCanvasId = selectedTab === 'output-graph' ? 'analysis-chart' : selectedTab === 'report-capital-available' ? 'capital-growth-chart' : 'alternatives-chart';
      const chartCanvas = document.getElementById(chartCanvasId);
      if (chartCanvas && typeof Chart !== 'undefined') {
        setTimeout(() => {
          if (selectedTab === 'output-graph') {
            updateRetirementGraph(chartCanvas, clientData, Chart, getAge);
          } else if (selectedTab === 'report-capital-available') {
            const capitalData = calculateCapitalAccounts(clientData, getAge);
            const ctx = chartCanvas.getContext('2d');
            let chartInstance = null;
            if (chartCanvas.chartInstance) {
              chartCanvas.chartInstance.destroy();
              chartCanvas.chartInstance = null;
            }
            chartInstance = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: capitalData.labels,
                datasets: capitalData.datasets
              },
              options: {
                responsive: true,
                plugins: {
                  legend: { display: true, position: 'top' },
                  title: { display: true, text: 'Capital Account Growth to First Retirement' }
                },
                scales: {
                  x: {
                    title: { display: true, text: `${capitalData.firstClientName} Age` },
                    stacked: capitalData.shouldStack
                  },
                  y: {
                    title: { display: true, text: 'Balance ($)' },
                    stacked: capitalData.shouldStack,
                    beginAtZero: true
                  }
                }
              }
            });
            chartCanvas.chartInstance = chartInstance;
          } else if (selectedTab === 'output-alternatives') {
            const incomeData = calculateRetirementIncome(clientData, getAge);
            const alternativesData = calculateRetirementAlternatives(clientData, getAge, incomeData);
            updateAlternativesGraph(chartCanvas, alternativesData.saveMorePercent, alternativesData.cappedRorIncreasePercent, alternativesData.cappedReductionPercent, alternativesData.cappedRetirementDelayPercent, Chart);
            console.log('Alternatives bar graph re-rendered for tab change');
          }
        }, 100);
      }
    }
  } catch (error) {
    console.error('Error in outputDropdownChangeHandler:', error);
    const chartCanvas = document.getElementById('alternatives-chart');
    if (chartCanvas && typeof Chart !== 'undefined') {
      const ctx = chartCanvas.getContext('2d');
      let chartInstance = null;
      if (chartCanvas.chartInstance) {
        chartCanvas.chartInstance.destroy();
        chartCanvas.chartInstance = null;
      }
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
          plugins: { title: { display: true, text: 'Error rendering alternatives graph' } }
        }
      });
      chartCanvas.chartInstance = chartInstance;
    }
  }
}
