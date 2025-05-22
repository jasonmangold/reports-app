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
        <label>Name: <input type="text" id="c1-name" placeholder="Paul Johnson"></label>
        <label>Date of Birth: <input type="date" id="c1-dob"></label>
        <div id="c1-age-display" class="age-display"></div>
        <label>Retirement Age: <input type="number" id="c1-retirement-age" min="1" max="120" placeholder="67"></label>
      </div>
      <div class="client" id="client2-section" style="display: none;">
        <h5>Client 2</h5>
        <label>Name: <input type="text" id="c2-name" placeholder="Sally Johnson"></label>
        <label>Date of Birth: <input type="date" id="c2-dob"></label>
        <div id="c2-age-display" class="age-display"></div>
        <label>Retirement Age: <input type="number" id="c2-retirement-age" min="1" max="120" placeholder="67"></label>
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
        <label>Employment Income ($/yr): <input type="number" id="c1-employment" min="0" step="1000" placeholder="65000"></label>
        <label>Social Security ($/mo): <input type="number" id="c1-social-security" min="0" step="100" placeholder="2000"></label>
        <label>Other Income ($/mo): <input type="number" id="c1-other-income" min="0" step="100" placeholder="500"></label>
      </div>
      <div class="client" id="client2-income-section" style="display: none;">
        <h5>Client 2</h5>
        <label>Employment Income ($/yr): <input type="number" id="c2-employment" min="0" step="1000" placeholder="50000"></label>
        <label>Social Security ($/mo): <input type="number" id="c2-social-security" min="0" step="100" placeholder="1500"></label>
        <label>Other Income ($/mo): <input type="number" id="c2-other-income" min="0" step="100" placeholder="300"></label>
      </div>
    `
  },
  {
    id: 'capital',
    label: 'Capital',
    content: `
      <div id="c1-accounts">
        <h5>Client 1 Accounts</h5>
        <div class="account" data-account-index="0">
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
        <div class="account" data-account-index="0">
          <label>Account Name: <input type="text" id="c2-account-0-name" placeholder="IRA"></label>
          <label>Balance ($): <input type="number" id="c2-account-0-balance" min="0" step="1000" placeholder="80000"></label>
          <label>Contribution ($/yr): <input type="number" id="c2-account-0-contribution" min="0" step="1000" placeholder="8000"></label>
          <label>Employer Match (%): <input type="number" id="c2-account-0-employer-match" min="0" max="100" step="0.1" placeholder="0"></label>
          <label>ROR (%): <input type="number" id="c2-account-0-ror" min="0" max="100" step="0.1" placeholder="6"></label>
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
      <label>Inflation (%): <input type="number" id="inflation" min="0" max="100" step="0.5" placeholder="3"></label>
      <label>ROR During Retirement (%): <input type="number" id="ror-retirement" min="0" max="100" step="0.1" placeholder="4"></label>
    `
  }
];

/**
 * Sets up event listeners for date of birth inputs to display current age,
 * toggles visibility of Client 2 sections based on marital status, and handles adding new accounts.
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
        if (c2Dob && isMarried && c2Dob.value) {
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

    // Setup add account buttons
    const addAccountButtons = document.querySelectorAll('.add-account-btn');
    addAccountButtons.forEach(button => {
      button.addEventListener('click', () => {
        const client = button.dataset.client;
        const accountsContainer = document.getElementById(`${client}-accounts`);
        const accountDivs = accountsContainer.querySelectorAll('.account');
        const newIndex = accountDivs.length;

        const newAccountDiv = document.createElement('div');
        newAccountDiv.className = 'account';
        newAccountDiv.dataset.accountIndex = newIndex;
        newAccountDiv.innerHTML = `
          <label>Account Name: <input type="text" id="${client}-account-${newIndex}-name" placeholder="Account ${newIndex + 1}"></label>
          <label>Balance ($): <input type="number" id="${client}-account-${newIndex}-balance" min="0" step="1000" placeholder="0"></label>
          <label>Contribution ($/yr): <input type="number" id="${client}-account-${newIndex}-contribution" min="0" step="1000" placeholder="0"></label>
          <label>Employer Match (%): <input type="number" id="${client}-account-${newIndex}-employer-match" min="0" max="100" step="0.1" placeholder="0"></label>
          <label>ROR (%): <input type="number" id="${client}-account-${newIndex}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
          <button type="button" class="remove-account-btn" data-client="${client}" data-index="${newIndex}">Remove</button>
        `;
        accountsContainer.insertBefore(newAccountDiv, button);

        // Setup remove button
        const removeButton = newAccountDiv.querySelector('.remove-account-btn');
        removeButton.addEventListener('click', () => {
          newAccountDiv.remove();
          // Re-index remaining accounts
          const remainingAccounts = accountsContainer.querySelectorAll('.account');
          remainingAccounts.forEach((account, index) => {
            account.dataset.accountIndex = index;
            account.querySelectorAll('input').forEach(input => {
              const oldId = input.id;
              const field = oldId.split('-').pop();
              input.id = `${client}-account-${index}-${field}`;
            });
            const removeBtn = account.querySelector('.remove-account-btn');
            if (removeBtn) removeBtn.dataset.index = index;
          });
        });
      });
    });
  } catch (error) {
    console.error('Error in setupAgeDisplayListeners:', error);
  }
}

/**
 * Calculates retirement income data, including needs, income sources, withdrawals,
 * earnings, and balance over time, accounting for inflation and mortality ages.
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
    const c1Age = getAge(clientData.client1.personal.dob);
    const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
    const ageDifference = c1Age - c2Age; // Positive if Client 1 is older
    const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
    const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
    const startAge = Math.max(c1RetirementAge, c2RetirementAge);

    // Parse mortality ages with fallback
    const c1MortalityAgeRaw = parseFloat(clientData.assumptions.c1MortalityAge) || parseFloat(clientData.assumptions.mortalityAge) || 90;
    const c2MortalityAgeRaw = clientData.isMarried ? (parseFloat(clientData.assumptions.c2MortalityAge) || parseFloat(clientData.assumptions.mortalityAge) || 90) : c1MortalityAgeRaw;
    const c1MortalityAge = isNaN(c1MortalityAgeRaw) || c1MortalityAgeRaw < c1RetirementAge ? 90 : Math.min(c1MortalityAgeRaw, 120);
    const c2MortalityAge = isNaN(c2MortalityAgeRaw) || c2MortalityAgeRaw < c2RetirementAge ? 90 : Math.min(c2MortalityAgeRaw, 120);

    // Adjust maxTimelineAge to stop at mortalityAge
    const c1MaxAge = c1MortalityAge;
    const c2MaxAge = c2MortalityAge;
    const maxTimelineAge = clientData.isMarried
      ? Math.max(c1MaxAge, c2MaxAge + ageDifference)
      : c1MaxAge;

    const inflation = isNaN(parseFloat(clientData.assumptions.inflation)) ? 0.02 : parseFloat(clientData.assumptions.inflation) / 100;
    const rorRetirement = isNaN(parseFloat(clientData.assumptions.rorRetirement)) ? 0.04 : parseFloat(clientData.assumptions.rorRetirement) / 100;

    // Income needs
    const monthlyNeedInitial = parseFloat(clientData.incomeNeeds.initial) || 5000;
    const yearsAfterRetirement1 = parseInt(clientData.incomeNeeds.yearsafter1) || 5;
    const monthlyIncome1 = parseFloat(clientData.incomeNeeds.monthly1) || 4500;
    const yearsAfterRetirement2 = parseInt(clientData.incomeNeeds.yearsafter2) || 10;
    const monthlyIncome2 = parseFloat(clientData.incomeNeeds.monthly2) || 4000;

    // Adjust monthly need for inflation until retirement
    const yearsToRetirement = startAge - c1Age;
    let monthlyNeed = monthlyNeedInitial * Math.pow(1 + inflation, yearsToRetirement);

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

        // Future value calculations
        const fvBalance = balance * Math.pow(1 + ror / 12, monthsToClientRetirement);
        const fvContributions = monthlyContribution && ror ? monthlyContribution * (Math.pow(1 + ror / 12, monthsToClientRetirement) - 1) / (ror / 12) * (1 + ror / 12) : 0;
        const fvEmployerMatch = monthlyEmployerMatch && ror ? monthlyEmployerMatch * (Math.pow(1 + ror / 12, monthsToClientRetirement) - 1) / (ror / 12) * (1 + ror / 12) : 0;

        let accountBalance = fvBalance + fvContributions + fvEmployerMatch;

        // Apply rorRetirement if client retires before startAge
        if (clientRetirementAge < startAge) {
          const additionalMonths = (startAge - clientRetirementAge) * 12;
          accountBalance = accountBalance * Math.pow(1 + rorRetirement / 12, additionalMonths);
        }

        totalBalance += accountBalance;
      });
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

      // Need
      let adjustedMonthlyNeed;
      if (i < yearsAfterRetirement1) {
        adjustedMonthlyNeed = monthlyNeed * Math.pow(1 + inflation, i);
      } else if (i < yearsAfterRetirement2) {
        adjustedMonthlyNeed = monthlyIncome1 * Math.pow(1 + inflation, yearsToRetirement + i);
      } else {
        adjustedMonthlyNeed = monthlyIncome2 * Math.pow(1 + inflation, yearsToRetirement + i);
      }
      const adjustedAnnualNeed = adjustedMonthlyNeed * 12;
      result.needData.push(Math.round(adjustedAnnualNeed));

      // Income
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

      // Social Security
      let socialSecurity = 0;
      if (currentC1Age >= c1RetirementAge && currentC1Age <= c1MaxAge) {
        socialSecurity += (parseFloat(clientData.client1.incomeSources.socialSecurity) || 0) * 12;
      }
      if (clientData.isMarried && currentC2Age >= c2RetirementAge && currentC2Age <= c2MaxAge) {
        socialSecurity += (parseFloat(clientData.client2.incomeSources.socialSecurity) || 0) * 12;
      }
      result.socialSecurityData.push(Math.round(socialSecurity));

      // Monthly calculations
      let annualEarnings = 0;
      let annualWithdrawal = 0;
      let monthlyBalance = balance;
      const monthlyRor = rorRetirement / 12;
      const monthlyIncome = totalIncome / 12;
      const monthlySocialSecurity = socialSecurity / 12;

      for (let m = 0; m < 12; m++) {
        const monthlyEarnings = monthlyBalance * monthlyRor;
        monthlyBalance += monthlyEarnings;
        annualEarnings += monthlyEarnings;

        const monthlyRemainingNeed = adjustedMonthlyNeed - monthlyIncome - monthlySocialSecurity;
        let monthlyWithdrawal = 0;

        if (monthlyRemainingNeed > 0) {
          if (monthlyBalance >= monthlyRemainingNeed) {
            monthlyWithdrawal = monthlyRemainingNeed;
            monthlyBalance -= monthlyWithdrawal;
          } else {
            monthlyWithdrawal = monthlyBalance;
            monthlyBalance = 0;
          }
        } else {
          monthlyBalance += Math.abs(monthlyRemainingNeed);
        }
        annualWithdrawal += monthlyWithdrawal;
      }

      result.earningsData.push(Math.round(annualEarnings));
      result.withdrawalData.push(Math.round(annualWithdrawal));

      // Shortfall
      const shortfall = adjustedAnnualNeed - totalIncome - socialSecurity - annualWithdrawal;
      result.shortfallData.push(shortfall > 0 ? Math.round(shortfall) : 0);

      // Update balance
      balance = monthlyBalance;
      result.balanceData.push(Math.round(balance));

      // Track depletion age
      if (balance <= 0 && result.depletionAge === startAge) {
        result.depletionAge = currentC1Age;
      }
    }

    result.depletionAge = balance > 0 ? maxTimelineAge : result.depletionAge;
  } catch (error) {
    console.error('Error in calculateRetirementIncome:', error);
  }
  return result;
}

/**
 * Updates the retirement income bar graph using Chart.js.
 */
export function updateRetirementGraph(canvas, clientData, Chart, getAge, graphType = 'income', previewData = null) {
  try {
    const data = previewData || clientData;
    const c1Age = getAge(data.client1.personal.dob);
    const c1RetirementAge = parseFloat(data.client1.personal.retirementAge) || 65;
    const config = {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: graphType === 'timeline' ? 'Retirement Income Timeline' : 'Retirement Income Accumulation' }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: graphType === 'timeline' ? 'Monthly Income ($)' : 'Accumulated Value ($)' }
          },
          x: {
            title: { display: true, text: 'Time' }
          }
        }
      }
    };

    if (graphType === 'timeline') {
      // Timeline graph based on income needs
      const years = [
        0,
        parseFloat(data.incomeNeeds.yearsafterretirement1.yearsafter1) || 5,
        parseFloat(data.incomeNeeds.yearsafterretirement2.yearsafter2) || 10
      ];
      config.data.labels = ['Retirement', `+${years[1]} Years`, `+${years[2]} Years`];
      config.data.datasets = [{
        label: 'Monthly Income',
        data: [
          parseFloat(data.incomeNeeds.monthlyincomeinitial.initial) || 5000,
          parseFloat(data.incomeNeeds.monthlyincome1.monthly1) || 4500,
          parseFloat(data.incomeNeeds.monthlyincome2.monthly2) || 4000
        ],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        fill: false
      }];
    } else {
      // Accumulation graph (existing logic, placeholder)
      const yearsToRetirement = c1RetirementAge - c1Age;
      config.data.labels = Array.from({ length: yearsToRetirement }, (_, i) => `Year ${i + 1}`);
      config.data.datasets = [{
        label: 'Accumulated Value',
        data: Array.from({ length: yearsToRetirement }, (_, i) => 100000 * Math.pow(1.06, i + 1)), // Example 6% ROR
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        fill: false
      }];
    }

    const chartInstance = new Chart(canvas, config);
    return chartInstance;
  } catch (error) {
    console.error('Error in updateRetirementGraph:', error);
    return null;
  }
}

/**
 * Updates the alternatives bar graph.
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
    if (chartCanvas.chartInstance) {
      chartCanvas.chartInstance.destroy();
      chartCanvas.chartInstance = null;
    }

    const chartInstance = new Chart(ctx, {
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
    chartCanvas.chartInstance = chartInstance;
    return chartInstance;
  } catch (error) {
    console.error('Error in updateAlternativesGraph:', error);
    const ctx = chartCanvas.getContext('2d');
    const chartInstance = new Chart(ctx, {
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

    // Determine first client to retire
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
 * Calculates retirement alternatives and depletion age.
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

    const c1MortalityAgeRaw = parseFloat(clientData.assumptions.c1MortalityAge) || parseFloat(clientData.assumptions.mortalityAge) || 90;
    const c2MortalityAgeRaw = clientData.isMarried ? (parseFloat(clientData.assumptions.c2MortalityAge) || parseFloat(clientData.assumptions.mortalityAge) || 90) : c1MortalityAgeRaw;
    const c1MortalityAge = isNaN(c1MortalityAgeRaw) || c1MortalityAgeRaw < c1RetirementAge ? 90 : Math.min(c1MortalityAgeRaw, 120);
    const c2MortalityAge = isNaN(c2MortalityAgeRaw) || c2MortalityAgeRaw < c2RetirementAge ? 90 : Math.min(c2MortalityAgeRaw, 120);

    const maxTimelineAge = clientData.isMarried ? Math.max(c1MortalityAge, c2MortalityAge) : c1MortalityAge;
    const inflation = isNaN(parseFloat(clientData.assumptions.inflation)) ? 0.02 : parseFloat(clientData.assumptions.inflation) / 100;
    const rorRetirement = isNaN(parseFloat(clientData.assumptions.rorRetirement)) ? 0.04 : parseFloat(clientData.assumptions.rorRetirement) / 100;

    const monthlyNeedInitial = parseFloat(clientData.incomeNeeds.initial) || 5000;
    const yearsAfterRetirement1 = parseInt(clientData.incomeNeeds.yearsafter1) || 5;
    const monthlyIncome1 = parseFloat(clientData.incomeNeeds.monthly1) || 4500;
    const yearsAfterRetirement2 = parseInt(clientData.incomeNeeds.yearsafter2) || 10;
    const monthlyIncome2 = parseFloat(clientData.incomeNeeds.monthly2) || 4000;

    const yearsToRetirement = startAge - c1Age;
    let monthlyNeed = monthlyNeedInitial * Math.pow(1 + inflation, yearsToRetirement);

    // Aggregate income sources
    const incomeSources = [];
    if (clientData.client1.incomeSources.socialSecurity) {
      incomeSources.push({
        amount: parseFloat(clientData.client1.incomeSources.socialSecurity) || 0
      });
    }
    if (clientData.isMarried && clientData.client2.incomeSources?.socialSecurity) {
      incomeSources.push({
        amount: parseFloat(clientData.client2.incomeSources.socialSecurity) || 0
      });
    }
    if (clientData.client1.incomeSources.other) {
      incomeSources.push({
        amount: parseFloat(clientData.client1.incomeSources.other) || 0
      });
    }
    if (clientData.isMarried && clientData.client2.incomeSources?.other) {
      incomeSources.push({
        amount: parseFloat(clientData.client2.incomeSources.other) || 0
      });
    }
    result.monthlySources = incomeSources.reduce((sum, src) => sum + (src.amount || 0), 0);

    // Calculate depletion age
    let balance = incomeData.totalBalance;
    result.depletionAge = startAge;
    for (let i = 0; i <= maxTimelineAge - startAge; i++) {
      let monthlyNeedAdjusted;
      if (i < yearsAfterRetirement1) {
        monthlyNeedAdjusted = monthlyNeed * Math.pow(1 + inflation, i);
      } else if (i < yearsAfterRetirement2) {
        monthlyNeedAdjusted = monthlyIncome1 * Math.pow(1 + inflation, yearsToRetirement + i);
      } else {
        monthlyNeedAdjusted = monthlyIncome2 * Math.pow(1 + inflation, yearsToRetirement + i);
      }

      const currentNeed = monthlyNeedAdjusted - result.monthlySources;
      const annualWithdrawal = currentNeed > 0 ? currentNeed * 12 : 0;

      balance = balance * Math.pow(1 + rorRetirement, 1) - annualWithdrawal;

      if (balance <= 0) {
        result.depletionAge = startAge + i;
        break;
      }
    }
    if (balance > 0) result.depletionAge = maxTimelineAge;

    // Save More
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

      const monthsToClientRetirement = yearsToRetirement * 12;
      if (avgROR > 0 && monthsToClientRetirement > 0) {
        const monthlyROR = avgROR / 12;
        const denominator = (Math.pow(1 + monthlyROR, monthsToClientRetirement) - 1) / monthlyROR * (1 + monthlyROR);
        result.additionalMonthlySavings = capitalNeededAtRetirement / denominator;
        result.additionalMonthlySavings = Math.round(result.additionalMonthlySavings);
      } else {
        result.additionalMonthlySavings = monthsToClientRetirement > 0 ? Math.round(capitalNeededAtRetirement / monthsToClientRetirement) : 0;
      }

      const baseAmount = ((parseFloat(clientData.client1.incomeSources.employment) || 0) + (clientData.isMarried ? (parseFloat(clientData.client2.incomeSources.employment) || 0) : 0)) / 12;
      result.saveMorePercent = baseAmount > 0 ? (result.additionalMonthlySavings / baseAmount) * 100 : 0;
      result.saveMorePercent = Math.min(result.saveMorePercent, 100);
    }

    // Increase ROR
    result.targetROR = rorRetirement;
    if (result.depletionAge < maxTimelineAge) {
      let low = rorRetirement;
      let high = 0.2;
      for (let i = 0; i < 20; i++) {
        const mid = (low + high) / 2;
        let tempBalance = incomeData.totalBalance;
        for (let j = 0; j <= maxTimelineAge - startAge; j++) {
          let currentMonthlyNeed;
          if (j < yearsAfterRetirement1) {
            currentMonthlyNeed = monthlyNeed * Math.pow(1 + inflation, j);
          } else if (j < yearsAfterRetirement2) {
            currentMonthlyNeed = monthlyIncome1 * Math.pow(1 + inflation, yearsToRetirement + j);
          } else {
            currentMonthlyNeed = monthlyIncome2 * Math.pow(1 + inflation, yearsToRetirement + j);
          }
          const currentNeed = currentMonthlyNeed - result.monthlySources;
          tempBalance = tempBalance * Math.pow(1 + mid / 12, 12) - (currentNeed > 0 ? currentNeed * 12 : 0);
          if (tempBalance <= 0) break;
        }
        if (tempBalance > 0) high = mid;
        else low = mid;
      }
      result.targetROR = (low + high) / 2;
    }

    const currentRORs = [];
    const clients = [clientData.client1, clientData.isMarried ? clientData.client2 : null];
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

    // Reduce Income Needs
    result.reducedMonthlyNeed = monthlyNeedInitial;
    if (result.depletionAge < maxTimelineAge) {
      let low = 0;
      let high = monthlyNeedInitial;
      for (let i = 0; i < 20; i++) {
        const mid = (low + high) / 2;
        let tempBalance = incomeData.totalBalance;
        for (let j = 0; j <= maxTimelineAge - startAge; j++) {
          let currentMonthlyNeed;
          if (j < yearsAfterRetirement1) {
            currentMonthlyNeed = mid * Math.pow(1 + inflation, yearsToRetirement + j);
          } else if (j < yearsAfterRetirement2) {
            currentMonthlyNeed = (monthlyIncome1 / monthlyNeedInitial) * mid * Math.pow(1 + inflation, yearsToRetirement + j);
          } else {
            currentMonthlyNeed = (monthlyIncome2 / monthlyNeedInitial) * mid * Math.pow(1 + inflation, yearsToRetirement + j);
          }
          const currentNeed = currentMonthlyNeed - result.monthlySources;
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

    // Delay Retirement
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
 * Updates the content of a specific output tab without rebuilding the entire output section.
 */
function updateSpecificTab(tabId, clientData, formatCurrency, getAge, Chart) {
  try {
    const tabContent = document.getElementById(tabId);
    if (!tabContent) {
      console.warn(`Tab content #${tabId} not found`);
      return;
    }

    const incomeData = calculateRetirementIncome(clientData, getAge);
    const capitalData = calculateCapitalAccounts(clientData, getAge);
    const alternativesData = calculateRetirementAlternatives(clientData, getAge, incomeData);

    switch (tabId) {
      case 'output-graph':
        tabContent.innerHTML = `
          <div class="output-card">
            <h3>Retirement Income Graph</h3>
            <canvas id="analysis-chart" style="max-height: 400px;"></canvas>
          </div>
        `;
        const analysisChart = document.getElementById('analysis-chart');
        if (analysisChart && typeof Chart !== 'undefined') {
          updateRetirementGraph(analysisChart, clientData, Chart, getAge);
        }
        break;

      case 'output-timeline':
        tabContent.innerHTML = `
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
        `;
        break;

      case 'output-alternatives':
        tabContent.innerHTML = `
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
                  <td>Reduce monthly income needs to ${formatCurrency(Math.round(alternativesData.reducedMonthlyNeed))} from ${formatCurrency(Math.round(clientData.incomeNeeds.initial || 5000))}</td>
                </tr>
                <tr>
                  <td>Delay Retirement</td>
                  <td>Delay retirement to age ${alternativesData.newRetirementAge} from age ${parseFloat(clientData.client1.personal.retirementAge) || 65}</td>
                </tr>
              </tbody>
            </table>
            <h4>Alternatives Impact Visualization</h4>
            <canvas id="alternatives-chart" style="max-height: 400px;"></canvas>
          </div>
        `;
        const alternativesChart = document.getElementById('alternatives-chart');
        if (alternativesChart && typeof Chart !== 'undefined') {
          updateAlternativesGraph(alternativesChart, alternativesData.saveMorePercent, alternativesData.cappedRorIncreasePercent, alternativesData.cappedReductionPercent, alternativesData.cappedRetirementDelayPercent, Chart);
        }
        break;

      case 'report-capital-available':
        tabContent.innerHTML = `
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
        `;
        const capitalChart = document.getElementById('capital-growth-chart');
        if (capitalChart && typeof Chart !== 'undefined') {
          const ctx = capitalChart.getContext('2d');
          if (capitalChart.chartInstance) {
            capitalChart.chartInstance.destroy();
            capitalChart.chartInstance = null;
          }
          new Chart(ctx, {
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
        }
        break;

      case 'report-social-security-optimizer':
        tabContent.innerHTML = `
          <div class="output-card">
            <h3>Social Security Optimizer</h3>
            <p>Optimized Social Security strategies will be displayed here. (Placeholder: Optimization logic not implemented.)</p>
          </div>
        `;
        break;

      case 'report-retirement-fact-finder':
        tabContent.innerHTML = `
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
                  <td>${clientData.assumptions.c1MortalityAge || clientData.assumptions.mortalityAge || 'N/A'}</td>
                  ${clientData.isMarried ? `<td>${clientData.assumptions.c2MortalityAge || clientData.assumptions.mortalityAge || 'N/A'}</td>` : ''}
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
                  <td>${formatCurrency(Math.round(parseFloat(clientData.client1.incomeSources.employment) || 0))}</td>
                  ${clientData.isMarried ? `<td>${formatCurrency(Math.round(parseFloat(clientData.client2.incomeSources.employment) || 0))}</td>` : ''}
                </tr>
                <tr>
                  <td>Social Security ($/mo)</td>
                  <td>${formatCurrency(Math.round(parseFloat(clientData.client1.incomeSources.socialSecurity) || 0))}</td>
                  ${clientData.isMarried ? `<td>${formatCurrency(Math.round(parseFloat(clientData.client2.incomeSources.socialSecurity) || 0))}</td>` : ''}
                </tr>
                <tr>
                  <td>Other Income ($/mo)</td>
                  <td>${formatCurrency(Math.round(parseFloat(clientData.client1.incomeSources.other) || 0))}</td>
                  ${clientData.isMarried ? `<td>${formatCurrency(Math.round(parseFloat(clientData.client2.incomeSources.other) || 0))}</td>` : ''}
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
                  <td>Client 1 Mortality Age</td>
                  <td>${clientData.assumptions.c1MortalityAge || clientData.assumptions.mortalityAge || 'N/A'}</td>
                </tr>
                ${clientData.isMarried ? `
                  <tr>
                    <td>Client 2 Mortality Age</td>
                    <td>${clientData.assumptions.c2MortalityAge || clientData.assumptions.mortalityAge || 'N/A'}</td>
                  </tr>
                ` : ''}
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
        `;
        break;

      default:
        console.warn(`Unknown tab ID: ${tabId}`);
    }
  } catch (error) {
    console.error(`Error updating tab ${tabId}:`, error);
    const tabContent = document.getElementById(tabId);
    if (tabContent) {
      tabContent.innerHTML = '<p class="output-card">Error updating content. Please check input data.</p>';
    }
  }
}

/**
 * Sets up event listeners for input fields to update the current output tab on change.
 */
export function setupInputListeners(clientData, formatCurrency, getAge, Chart) {
  try {
    // Ensure DOM is fully loaded
    document.addEventListener('DOMContentLoaded', () => {
      let lastSelectedTab = 'output-graph';

      function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
          const later = () => {
            clearTimeout(timeout);
            func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      }

      function updateClientData(data) {
        try {
          // Personal
          data.isMarried = document.getElementById('is-married').checked;
          const c1Name = document.getElementById('c1-name').value;
          if (c1Name) data.client1.personal.name = c1Name;
          const c1Dob = document.getElementById('c1-dob').value;
          if (c1Dob) data.client1.personal.dob = c1Dob;
          const c1RetirementAge = document.getElementById('c1-retirement-age').value;
          if (c1RetirementAge) data.client1.personal.retirementAge = c1RetirementAge;
          if (data.isMarried) {
            data.client2.personal = data.client2.personal || {};
            const c2Name = document.getElementById('c2-name').value;
            if (c2Name) data.client2.personal.name = c2Name;
            const c2Dob = document.getElementById('c2-dob').value;
            if (c2Dob) data.client2.personal.dob = c2Dob;
            const c2RetirementAge = document.getElementById('c2-retirement-age').value;
            if (c2RetirementAge) data.client2.personal.retirementAge = c2RetirementAge;
          } else {
            data.client2 = { personal: {}, incomeSources: {}, accounts: [] };
          }

          // Income Needs
          data.incomeNeeds = {
            initial: parseFloat(document.getElementById('monthly-income-initial').value) || data.incomeNeeds.initial || 5000,
            yearsafter1: parseInt(document.getElementById('years-after-retirement-1').value) || data.incomeNeeds.yearsafter1 || 5,
            monthly1: parseFloat(document.getElementById('monthly-income-1').value) || data.incomeNeeds.monthly1 || 4500,
            yearsafter2: parseInt(document.getElementById('years-after-retirement-2').value) || data.incomeNeeds.yearsafter2 || 10,
            monthly2: parseFloat(document.getElementById('monthly-income-2').value) || data.incomeNeeds.monthly2 || 4000
          };

          // Income Sources
          data.client1.incomeSources = {
            employment: parseFloat(document.getElementById('c1-employment').value) || data.client1.incomeSources.employment || 0,
            socialSecurity: parseFloat(document.getElementById('c1-social-security').value) || data.client1.incomeSources.socialSecurity || 0,
            other: parseFloat(document.getElementById('c1-other-income').value) || data.client1.incomeSources.other || 0
          };
          if (data.isMarried) {
            data.client2.incomeSources = {
              employment: parseFloat(document.getElementById('c2-employment').value) || data.client2.incomeSources.employment || 0,
              socialSecurity: parseFloat(document.getElementById('c2-social-security').value) || data.client2.incomeSources.socialSecurity || 0,
              other: parseFloat(document.getElementById('c2-other-income').value) || data.client2.incomeSources.other || 0
            };
          } else {
            data.client2.incomeSources = { employment: 0, socialSecurity: 0, other: 0 };
          }

          // Capital Accounts
          const c1Accounts = document.querySelectorAll('#c1-accounts .account');
          const newC1Accounts = [];
          c1Accounts.forEach((account, index) => {
            const name = document.getElementById(`c1-account-${index}-name`).value;
            const balance = document.getElementById(`c1-account-${index}-balance`).value;
            const contribution = document.getElementById(`c1-account-${index}-contribution`).value;
            const employerMatch = document.getElementById(`c1-account-${index}-employer-match`).value;
            const ror = document.getElementById(`c1-account-${index}-ror`).value;
            newC1Accounts.push({
              name: name || data.client1.accounts[index]?.name || `Account ${index + 1}`,
              balance: balance ? parseFloat(balance) : parseFloat(data.client1.accounts[index]?.balance) || 0,
              contribution: contribution ? parseFloat(contribution) : parseFloat(data.client1.accounts[index]?.contribution) || 0,
              employerMatch: employerMatch ? parseFloat(employerMatch) : parseFloat(data.client1.accounts[index]?.employerMatch) || 0,
              ror: ror ? parseFloat(ror) : parseFloat(data.client1.accounts[index]?.ror) || 6
            });
          });
          data.client1.accounts = newC1Accounts.length ? newC1Accounts : data.client1.accounts;

          const c2Accounts = document.querySelectorAll('#c2-accounts .account');
          const newC2Accounts = [];
          if (data.isMarried) {
            c2Accounts.forEach((account, index) => {
              const name = document.getElementById(`c2-account-${index}-name`).value;
              const balance = document.getElementById(`c2-account-${index}-balance`).value;
              const contribution = document.getElementById(`c2-account-${index}-contribution`).value;
              const employerMatch = document.getElementById(`c2-account-${index}-employer-match`).value;
              const ror = document.getElementById(`c2-account-${index}-ror`).value;
              newC2Accounts.push({
                name: name || data.client2.accounts[index]?.name || `Account ${index + 1}`,
                balance: balance ? parseFloat(balance) : parseFloat(data.client2.accounts[index]?.balance) || 0,
                contribution: contribution ? parseFloat(contribution) : parseFloat(data.client2.accounts[index]?.contribution) || 0,
                employerMatch: employerMatch ? parseFloat(employerMatch) : parseFloat(data.client2.accounts[index]?.employerMatch) || 0,
                ror: ror ? parseFloat(ror) : parseFloat(data.client2.accounts[index]?.ror) || 6
              });
            });
          }
          data.client2.accounts = data.isMarried && newC2Accounts.length ? newC2Accounts : data.client2.accounts;

          // Assumptions
          data.assumptions = {
            c1MortalityAge: parseFloat(document.getElementById('c1-mortality-age').value) || data.assumptions.c1MortalityAge || 90,
            c2MortalityAge: data.isMarried ? (parseFloat(document.getElementById('c2-mortality-age').value) || data.assumptions.c2MortalityAge || 90) : null,
            inflation: parseFloat(document.getElementById('inflation').value) || data.assumptions.inflation || 3,
            rorRetirement: parseFloat(document.getElementById('ror-retirement').value) || data.assumptions.rorRetirement || 4
          };
        } catch (error) {
          console.error('Error in updateClientData:', error);
        }
      }

      const updateOnInputChange = debounce(() => {
        updateClientData(clientData);
        let activeTab = document.querySelector('.output-tab-content[style*="display: block"]') ||
                        document.querySelector('.output-tab-content.active');
        let currentTab;
        if (activeTab) {
          currentTab = activeTab.id;
        } else {
          const select = document.getElementById('output-select');
          currentTab = select && select.value ? select.value : lastSelectedTab;
          console.log('No active tab found, using output-select value or last selected:', currentTab);
        }
        const select = document.getElementById('output-select');
        if (select && select.value !== currentTab) {
          const previousOnChange = select.onchange;
          select.onchange = null;
          select.value = currentTab;
          select.onchange = previousOnChange;
          console.log('Updated output-select to:', currentTab);
        }
        window.currentActiveTab = currentTab;
        updateSpecificTab(currentTab, clientData, formatCurrency, getAge, Chart);
        lastSelectedTab = currentTab;
      }, 300);

      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        input.removeEventListener('input', updateOnInputChange);
        input.removeEventListener('change', updateOnInputChange);
        input.addEventListener('input', updateOnInputChange);
        input.addEventListener('change', updateOnInputChange);
      });

      const addAccountButtons = document.querySelectorAll('.add-account-btn');
      addAccountButtons.forEach(button => {
        button.removeEventListener('click', updateOnInputChange);
        button.addEventListener('click', updateOnInputChange);
      });

      const removeAccountButtons = document.querySelectorAll('.remove-account-btn');
      removeAccountButtons.forEach(button => {
        button.removeEventListener('click', updateOnInputChange);
        button.addEventListener('click', updateOnInputChange);
      });

      // Populate inputs with clientData to ensure placeholders are overridden
      if (typeof populateInputFields === 'function') {
        populateInputFields(clientData);
      } else {
        console.warn('populateInputFields function not found');
      }
    }, { once: true });
  } catch (error) {
    console.error('Error in setupInputListeners:', error);
  }
}

/**
 * Updates the retirement analysis outputs.
 */
export function updateRetirementOutputs(analysisOutputs, clientData, formatCurrency, getAge, selectedReports, Chart) {
  try {
    if (!analysisOutputs) {
      console.error('Analysis outputs #analysis-outputs not found');
      return;
    }

    const tabContainer = document.getElementById('output-tabs-container');
    const c1Age = getAge(clientData.client1.personal.dob);
    const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
    const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
    const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;

    // Validation
    if (c1Age >= c1RetirementAge || (clientData.isMarried && c2Age >= c2RetirementAge)) {
      analysisOutputs.innerHTML = '<p class="output-card">Client(s) already at or past retirement age. Please adjust retirement age or DOB.</p>';
      if (tabContainer) tabContainer.innerHTML = '';
      return;
    }

    // Define report options
    const reportOptions = [
      { id: 'output-graph', label: 'Retirement Analysis', reportId: 'report-graph', title: 'Retirement Income Graph' },
      { id: 'report-social-security-optimizer', label: 'Social Security Optimizer', reportId: 'report-social-security-optimizer', title: 'Social Security optimizer' },
      { id: 'report-capital-available', label: 'Capital Available at Retirement', reportId: 'report-capital-available', title: 'Capital Available at Retirement' },
      { id: 'output-alternatives', label: 'Alternatives to Achieving Retirement Goals', reportId: 'report-alternatives-retirement', title: 'Retirement Alternatives' },
      { id: 'output-timeline', label: 'Retirement Timeline', reportId: 'report-retirement-timeline', title: 'Retirement Income Timeline' },
      { id: 'report-retirement-fact-finder', label: 'Fact Finder', reportId: 'report-retirement-fact-finder', title: 'Retirement Fact Finder' }
    ];

    // Get current active tab or dropdown value
    let currentSelection;
    requestAnimationFrame(() => {
      let activeTab = document.querySelector('.output-tab-content[style*="display: block"]') ||
                      document.querySelector('.output-tab-content.active');
      currentSelection = activeTab ? activeTab.id : null;

      // Fallback to output-select or window.currentActiveTab
      const select = document.getElementById('output-select');
      if (!currentSelection && select && select.value) {
        currentSelection = select.value;
        console.log('No active tab found, using output-select value:', currentSelection);
      }

      // Fallback to window.currentActiveTab (set by setupInputListeners)
      if (!currentSelection && window.currentActiveTab) {
        currentSelection = window.currentActiveTab;
        console.log('No active tab or select value, using window.currentActiveTab:', currentSelection);
      }

      // Use 'output-graph' only if no selection is found (initial load)
      if (!currentSelection) {
        currentSelection = 'output-graph';
        console.log('No selection found, defaulting to:', currentSelection);
      }

      // Ensure dropdown reflects current selection
      if (select && select.value !== currentSelection) {
        const previousOnChange = select.onchange;
        select.onchange = null;
        select.value = currentSelection;
        select.onchange = previousOnChange;
        console.log('Synced output-select to:', currentSelection);
      }

      // Initialize output structure only if not already present
      if (!document.getElementById('output-select')) {
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
          ${reportOptions.map(option => `
            <div class="output-tab-content ${option.id === currentSelection ? 'active' : ''}" id="${option.id}" style="display: ${option.id === currentSelection ? 'block' : 'none'};">
              <div class="output-card">
                <h3>${option.title}</h3>
                <p>Content will be loaded...</p>
              </div>
            </div>
          `).join('')}
        `;
      } else {
        // Update visibility of existing tabs without rebuilding
        document.querySelectorAll('.output-tab-content').forEach(content => {
          const isSelected = content.id === currentSelection;
          content.style.display = isSelected ? 'block' : 'none';
          content.classList.toggle('active', isSelected);
        });
      }

      // Setup controls
      setupOutputControls(reportOptions, selectedReports, clientData, formatCurrency, getAge, Chart);

      // Update the current tab
      updateSpecificTab(currentSelection, clientData, formatCurrency, getAge, Chart);

      // Setup input listeners only if not already set
      if (!analysisOutputs.dataset.listenersSet) {
        setupInputListeners(clientData, formatCurrency, getAge, Chart);
        analysisOutputs.dataset.listenersSet = 'true';
      }
    });
  } catch (error) {
    console.error('Error in updateRetirementOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-card">Error rendering outputs. Please check input data.</p>';
    if (tabContainer) tabContainer.innerHTML = '';
  }
}
/**
 * Sets up event listeners for the output dropdown and checkbox.
 */
function setupOutputControls(reportOptions, selectedReports, clientData, formatCurrency, getAge, Chart) {
  try {
    const select = document.getElementById('output-select');
    const checkbox = document.getElementById('add-to-presentation');
    if (!select || !checkbox) {
      console.warn('Dropdown #output-select or checkbox #add-to-presentation not found');
      return;
    }

    const updateCheckboxState = () => {
      const selectedOption = reportOptions.find(option => option.id === select.value);
      if (selectedOption) {
        checkbox.dataset.report = selectedOption.reportId;
        checkbox.dataset.title = selectedOption.title;
        checkbox.checked = selectedReports.some(r => r.id === selectedOption.reportId);
      }
    };

    updateCheckboxState();

    // Remove existing listener to prevent duplicates
    select.removeEventListener('change', outputDropdownChangeHandler);
    select.addEventListener('change', outputDropdownChangeHandler = function() {
      const selectedTab = this.value;
      document.querySelectorAll('.output-tab-content').forEach(content => {
        content.style.display = content.id === selectedTab ? 'block' : 'none';
        content.classList.toggle('active', content.id === selectedTab);
      });
      updateSpecificTab(selectedTab, clientData, formatCurrency, getAge, Chart);
      updateCheckboxState();
    });

    checkbox.removeEventListener('change', checkboxChangeHandler);
    checkbox.addEventListener('change', checkboxChangeHandler = () => {
      const event = new CustomEvent('addToPresentationToggle', {
        detail: {
          reportId: checkbox.dataset.report,
          title: checkbox.dataset.title,
          isChecked: checkbox.checked
        },
        bubbles: true,
        cancelable: true
      });
      checkbox.dispatchEvent(event);

      // Update selectedReports based on checkbox state
      const reportIndex = selectedReports.findIndex(r => r.id === checkbox.dataset.report);
      if (checkbox.checked && reportIndex === -1) {
        selectedReports.push({
          id: checkbox.dataset.report,
          title: checkbox.dataset.title
        });
      } else if (!checkbox.checked && reportIndex !== -1) {
        selectedReports.splice(reportIndex, 1);
      }
    });
  } catch (error) {
    console.error('Error in setupOutputControls:', error);
  }
}

// Store handler references to allow removal
let outputDropdownChangeHandler = () => {};
let checkboxChangeHandler = () => {};
