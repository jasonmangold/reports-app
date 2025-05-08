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
 * and toggles visibility of Client 2 mortality input based on marital status.
 */
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

      // Trigger initial age display
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

      // Trigger initial visibility based on current marital status
      c2MortalityLabel.style.display = isMarriedInput.checked ? 'block' : 'none';
    }
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

    // Parse mortality ages with fallback for legacy data
    const c1MortalityAgeRaw = parseFloat(clientData.assumptions.c1MortalityAge) || parseFloat(clientData.assumptions.mortalityAge) || 90;
    const c2MortalityAgeRaw = clientData.isMarried ? (parseFloat(clientData.assumptions.c2MortalityAge) || parseFloat(clientData.assumptions.mortalityAge) || 90) : c1MortalityAgeRaw;
    const c1MortalityAge = isNaN(c1MortalityAgeRaw) || c1MortalityAgeRaw < c1RetirementAge ? 90 : Math.min(c1MortalityAgeRaw, 120);
    const c2MortalityAge = isNaN(c2MortalityAgeRaw) || c2MortalityAgeRaw < c2RetirementAge ? 90 : Math.min(c2MortalityAgeRaw, 120);

    // Debug mortality ages
    console.log('Parsed Mortality Ages:', { c1MortalityAge, c2MortalityAge, c1MortalityAgeRaw, c2MortalityAgeRaw, assumptions: clientData.assumptions });

    // Adjust maxTimelineAge to stop at mortalityAge - 1 for each client
    const c1MaxAge = c1MortalityAge - 1; // Last year before Client 1's mortality
    const c2MaxAge = c2MortalityAge - 1; // Last year before Client 2's mortality
    const maxTimelineAge = clientData.isMarried
      ? Math.max(c1MaxAge, c2MaxAge + ageDifference) // Ensure Client 2 reaches their max age
      : c1MaxAge;
    console.log('Max Timeline Age:', maxTimelineAge);
    console.log('Start Age:', startAge, 'Age Difference:', ageDifference);

    const inflation = isNaN(parseFloat(clientData.assumptions.inflation)) ? 0.02 : parseFloat(clientData.assumptions.inflation) / 100;
    const rorRetirement = isNaN(parseFloat(clientData.assumptions.rorRetirement)) ? 0.04 : parseFloat(clientData.assumptions.rorRetirement) / 100;

    // Inputs from clientData.incomeNeeds
    const monthlyNeedInitial = parseFloat(clientData.incomeNeeds.initial) || 5000;
    const yearsAfterRetirement1 = parseInt(clientData.incomeNeeds.yearsafter1) || 5;
    const monthlyIncome1 = parseFloat(clientData.incomeNeeds.monthly1) || 4500;
    const yearsAfterRetirement2 = parseInt(clientData.incomeNeeds.yearsafter2) || 10;
    const monthlyIncome2 = parseFloat(clientData.incomeNeeds.monthly2) || 4000;

    // Debug income needs
    console.log('Income Needs:', { monthlyNeedInitial, yearsAfterRetirement1, monthlyIncome1, yearsAfterRetirement2, monthlyIncome2 });

    // Adjust monthly need for inflation until retirement with annual compounding
    const yearsToRetirement = startAge - c1Age;
    let monthlyNeed = monthlyNeedInitial * Math.pow(1 + inflation, yearsToRetirement);

    // Calculate total balance at retirement with monthly compounding
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

        // Future value of current balance with monthly compounding
        const fvBalance = balance * Math.pow(1 + ror / 12, monthsToClientRetirement);
        // Future value of contributions (annuity due) with monthly compounding
        const fvContributions = monthlyContribution && ror ? monthlyContribution * (Math.pow(1 + ror / 12, monthsToClientRetirement) - 1) / (ror / 12) * (1 + ror / 12) : 0;
        // Future value of employer match (annuity due) with monthly compounding
        const fvEmployerMatch = monthlyEmployerMatch && ror ? monthlyEmployerMatch * (Math.pow(1 + ror / 12, monthsToClientRetirement) - 1) / (ror / 12) * (1 + ror / 12) : 0;

        let accountBalance = fvBalance + fvContributions + fvEmployerMatch;

        // Apply rorRetirement if client retires before startAge with monthly compounding
        if (clientRetirementAge < startAge) {
          const additionalMonths = (startAge - clientRetirementAge) * 12;
          accountBalance = accountBalance * Math.pow(1 + rorRetirement / 12, additionalMonths);
        }

        totalBalance += accountBalance;
      });

      // Calculate future value of other assets with monthly compounding
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

    // Add blank starting row with only balance
    result.labels.push(clientData.isMarried ? `${startAge - yearsToRetirement}/${startAge - yearsToRetirement - ageDifference}` : `${startAge - yearsToRetirement}`);
    result.needData.push(0);
    result.incomeData.push(0);
    result.socialSecurityData.push(0);
    result.withdrawalData.push(0);
    result.earningsData.push(0);
    result.balanceData.push(Math.round(totalBalance));
    result.shortfallData.push(0);

    // Calculate timeline data with monthly compounding, displayed annually
    for (let i = 0; i <= maxTimelineAge - startAge; i++) {
      const currentC1Age = startAge + i;
      const currentC2Age = currentC1Age - ageDifference;
      // Format age label, stopping at mortalityAge - 1
      const ageLabel = clientData.isMarried
        ? `${currentC1Age <= c1MaxAge ? currentC1Age : ''}/${currentC2Age <= c2MaxAge ? currentC2Age : ''}`
        : `${currentC1Age <= c1MaxAge ? currentC1Age : ''}`;
      result.labels.push(ageLabel);
      console.log(`Age ${i}: C1=${currentC1Age}, C2=${currentC2Age}, Label=${ageLabel}`);

      // Need (inflation-adjusted with adjustments)
      let adjustedMonthlyNeed;
      if (i < yearsAfterRetirement1) {
        // Years 0–4: Initial need adjusted from retirement start
        adjustedMonthlyNeed = monthlyNeed * Math.pow(1 + inflation, i);
      } else if (i < yearsAfterRetirement2) {
        // Years 5–9: Adjusted need from current date to year i
        adjustedMonthlyNeed = monthlyIncome1 * Math.pow(1 + inflation, yearsToRetirement + i);
      } else {
        // Years 10+: Adjusted need from current date to year i
        adjustedMonthlyNeed = monthlyIncome2 * Math.pow(1 + inflation, yearsToRetirement + i);
      }
      const adjustedAnnualNeed = adjustedMonthlyNeed * 12;
      result.needData.push(Math.round(adjustedAnnualNeed));

      // Income (Employment + Other)
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

      // Calculate monthly earnings and withdrawals
      let annualEarnings = 0;
      let annualWithdrawal = 0;
      let monthlyBalance = balance;
      const monthlyRor = rorRetirement / 12;
      const monthlyIncome = totalIncome / 12;
      const monthlySocialSecurity = socialSecurity / 12;

      for (let m = 0; m < 12; m++) {
        // Calculate monthly earnings
        const monthlyEarnings = monthlyBalance * monthlyRor;
        monthlyBalance += monthlyEarnings;
        annualEarnings += monthlyEarnings;

        // Calculate remaining need or surplus
        const monthlyRemainingNeed = adjustedMonthlyNeed - monthlyIncome - monthlySocialSecurity;
        let monthlyWithdrawal = 0;

        if (monthlyRemainingNeed > 0) {
          // Need exceeds income + Social Security: withdraw from balance
          if (monthlyBalance >= monthlyRemainingNeed) {
            monthlyWithdrawal = monthlyRemainingNeed;
            monthlyBalance -= monthlyWithdrawal;
          } else {
            monthlyWithdrawal = monthlyBalance;
            monthlyBalance = 0;
          }
        } else {
          // Surplus: show $0 withdrawal and save the excess
          monthlyWithdrawal = 0;
          monthlyBalance += Math.abs(monthlyRemainingNeed); // Add surplus to balance
        }
        annualWithdrawal += monthlyWithdrawal;
      } // Close inner monthly loop

      result.earningsData.push(Math.round(annualEarnings));
      result.withdrawalData.push(Math.round(annualWithdrawal));

      // Shortfall (only positive values)
      const shortfall = adjustedAnnualNeed - totalIncome - socialSecurity - annualWithdrawal;
      result.shortfallData.push(shortfall > 0 ? Math.round(shortfall) : 0);

      // Update balance
      balance = monthlyBalance;
      result.balanceData.push(Math.round(balance));

      // Update depletion age
      if (balance <= 0 && result.depletionAge === startAge) {
        result.depletionAge = currentC1Age;
        break; // Stop once balance is depleted
      }
    } // Close outer yearly loop

    // Ensure depletionAge is maxTimelineAge if balance remains positive
    result.depletionAge = balance > 0 ? maxTimelineAge : result.depletionAge;

    console.log('Final Labels:', result.labels);
  } catch (error) {
    console.error('Error in calculateRetirementIncome:', error);
  }
  return result;
}


/**
 * Updates the retirement income bar graph using Chart.js, displaying Social Security,
 * income, withdrawals, and shortfall over time.
 */
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

    // Destroy existing chart if it exists
    if (chartCanvas.chartInstance) {
      chartCanvas.chartInstance.destroy();
      chartCanvas.chartInstance = null;
    }

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
      chartCanvas.chartInstance = chartInstance;
      return chartInstance;
    }

chartInstance = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: incomeData.labels.slice(1), // Skip starting blank row
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
      },
      {
        label: 'Income Need',
        type: 'line', // Specify line chart type
        data: incomeData.needData.slice(1).map(Math.round), // Assumes incomeNeedData is available
        borderColor: '#000000', // Black line for visibility
        borderWidth: 2,
        fill: false, // No fill under the line
        pointRadius: 0, // Optional: hide points for cleaner look
        yAxisID: 'y' // Ensure it uses the same y-axis
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

    // Destroy existing chart if it exists
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
            backgroundColor: '#22c55e', // Green for the base
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
            backgroundColor: '#ef4444', // Red for the adjustment
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
 * Calculates capital accounts' growth up to the first client's retirement, returning
 * accounts, total capital, labels, and datasets for the capital growth graph.
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

    // Generate age labels
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
 * Calculates retirement alternatives (save more, increase ROR, reduce income needs,
 * delay retirement) and depletion age.
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

    const c1MortalityAgeRaw = parseFloat(clientData.assumptions.c1MortalityAge) || parseFloat(clientData.assumptions.mortalityAge);
    const c2MortalityAgeRaw = clientData.isMarried ? (parseFloat(clientData.assumptions.c2MortalityAge) || parseFloat(clientData.assumptions.mortalityAge)) : c1MortalityAgeRaw;
    const c1MortalityAge = isNaN(c1MortalityAgeRaw) || c1MortalityAgeRaw < c1RetirementAge ? 90 : Math.min(c1MortalityAgeRaw, 120);
    const c2MortalityAge = isNaN(c2MortalityAgeRaw) || c2MortalityAgeRaw < c2RetirementAge ? 90 : Math.min(c2MortalityAgeRaw, 120);

    const maxTimelineAge = clientData.isMarried ? Math.max(c1MortalityAge, c2MortalityAge) : c1MortalityAge;
    const inflation = isNaN(parseFloat(clientData.assumptions.inflation)) ? 0.02 : parseFloat(clientData.assumptions.inflation) / 100;
    const rorRetirement = isNaN(parseFloat(clientData.assumptions.rorRetirement)) ? 0.04 : parseFloat(clientData.assumptions.rorRetirement) / 100;
    let monthlyNeed = parseFloat(clientData.incomeNeeds.monthly) || 5000;

    const yearsToRetirement = startAge - c1Age;
    monthlyNeed = monthlyNeed * Math.pow(1 + inflation, yearsToRetirement);

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
    result.monthlySources = incomeSources.reduce( (sum, src) => sum + (src.amount || 0), 0);

    const currentSavings = parseFloat(clientData.savingsExpenses?.monthlySavings) || 0;

// Calculate depletion age
let balance = incomeData.totalBalance;
result.depletionAge = startAge;
for (let i = 0; i <= maxTimelineAge - startAge; i++) {
  let monthlyNeedAdjusted;

  // Determine monthly need based on years after retirement
  if (i < yearsAfterRetirement1) {
    // Years 0–4: Initial need adjusted from retirement start
    monthlyNeedAdjusted = monthlyNeed * Math.pow(1 + inflation, i);
  } else if (i < yearsAfterRetirement2) {
    // Years 5–9: $4500 adjusted from current date to year i
    monthlyNeedAdjusted = monthlyIncome1 * Math.pow(1 + inflation, yearsToRetirement + i);
  } else {
    // Years 10+: $4000 adjusted from current date to year i
    monthlyNeedAdjusted = monthlyIncome2 * Math.pow(1 + inflation, yearsToRetirement + i);
  }

  // Calculate annual need after accounting for income sources
  const currentNeed = monthlyNeedAdjusted - result.monthlySources;
  const annualWithdrawal = currentNeed > 0 ? currentNeed * 12 : 0;

  // Update balance: apply annual return, subtract withdrawal
  balance = balance * Math.pow(1 + rorRetirement, 1) - annualWithdrawal;

  // Check for depletion
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

      // Calculate average ROR across all accounts
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

      // Calculate monthly savings needed
      const monthsToClientRetirement = yearsToRetirement * 12;
      if (avgROR > 0 && monthsToClientRetirement > 0) {
        const monthlyROR = avgROR / 12;
        const denominator = (Math.pow(1 + monthlyROR, monthsToClientRetirement) - 1) / monthlyROR * (1 + monthlyROR);
        result.additionalMonthlySavings = capitalNeededAtRetirement / denominator;
        result.additionalMonthlySavings = Math.round(result.additionalMonthlySavings);
      } else {
        result.additionalMonthlySavings = monthsToClientRetirement > 0 ? Math.round(capitalNeededAtRetirement / monthsToClientRetirement) : 0;
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
          const currentNeed = monthlyNeed * Math.pow(1 + inflation, j) - result.monthlySources;
          tempBalance = tempBalance * Math.pow(1 + mid / 12, 12) - (currentNeed > 0 ? currentNeed * 12 : 0);
          if (tempBalance <= 0) break;
        }
        if (tempBalance > 0) high = mid;
        else low = mid;
      }
      result.targetROR = (low + high) / 2;
    }

    // Calculate ROR increase percentage
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
    result.reducedMonthlyNeed = monthlyNeed;
    if (result.depletionAge < maxTimelineAge) {
      let low = 0;
      let high = monthlyNeed;
      for (let i = 0; i < 20; i++) {
        const mid = (low + high) / 2;
        let tempBalance = incomeData.totalBalance;
        for (let j = 0; j <= maxTimelineAge - startAge; j++) {
          const currentNeed = mid * Math.pow(1 + inflation, j) - result.monthlySources;
          tempBalance = tempBalance * Math.pow(1 + rorRetirement / 12, 12) - (currentNeed > 0 ? currentNeed * 12 : 0);
          if (tempBalance <= 0) break;
        }
        if (tempBalance > 0) high = mid;
        else low = mid;
      }
      result.reducedMonthlyNeed = (low + high) / 2;
    }
    const reductionPercent = monthlyNeed > 0 ? ((monthlyNeed - result.reducedMonthlyNeed) / monthlyNeed) * 100 : 0;
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
 * Updates the retirement analysis outputs, including graphs, tables, and reports
 * for retirement income, capital growth, alternatives, and fact finder.
 */
export function updateRetirementOutputs(analysisOutputs, clientData, formatCurrency, getAge, selectedReports, Chart) {
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

    // Parse mortality ages with fallback for legacy data
    const c1MortalityAgeRaw = parseFloat(clientData.assumptions.c1MortalityAge) || parseFloat(clientData.assumptions.mortalityAge);
    const c2MortalityAgeRaw = clientData.isMarried ? (parseFloat(clientData.assumptions.c2MortalityAge) || parseFloat(clientData.assumptions.mortalityAge)) : c1MortalityAgeRaw;
    const c1MortalityAge = isNaN(c1MortalityAgeRaw) || c1MortalityAgeRaw < c1RetirementAge ? 90 : Math.min(c1MortalityAgeRaw, 120);
    const c2MortalityAge = isNaN(c2MortalityAgeRaw) || c2MortalityAgeRaw < c2RetirementAge ? 90 : Math.min(c2MortalityAgeRaw, 120);

    console.log('Output Mortality Ages:', { c1MortalityAge, c2MortalityAge, c1MortalityAgeRaw, c2MortalityAgeRaw, assumptions: clientData.assumptions });

    const maxTimelineAge = clientData.isMarried ? Math.max(c1MortalityAge, c2MortalityAge) : c1MortalityAge;
    const inflation = isNaN(parseFloat(clientData.assumptions.inflation)) ? 0.02 : parseFloat(clientData.assumptions.inflation) / 100;
    let monthlyNeed = parseFloat(clientData.incomeNeeds.monthly) || 5000;

    // Add defensive checks for missing properties
    clientData.client1.other = clientData.client1.other || { assets: [] };
    clientData.client2 = clientData.client2 || { other: { assets: [] } };

    if (c1Age >= c1RetirementAge || (clientData.isMarried && c2Age >= c2RetirementAge)) {
      analysisOutputs.innerHTML = '<p class="output-card">Client(s) already at or past retirement age. Please adjust retirement age or DOB.</p>';
      if (tabContainer) tabContainer.innerHTML = ''; // Clear tabs on error
      return;
    }
    if (c1RetirementAge >= c1MortalityAge || (clientData.isMarried && c2RetirementAge >= c2MortalityAge)) {
      analysisOutputs.innerHTML = '<p class="output-card">Retirement age must be less than mortality age.</p>';
      if (tabContainer) tabContainer.innerHTML = ''; // Clear tabs on error
      return;
    }

// Adjust monthly need for inflation until retirement with annual compounding
const monthlyNeedInitial = parseFloat(clientData.incomeNeeds.initial) || 5000;
const yearsAfterRetirement1 = parseInt(clientData.incomeNeeds.yearsafter1) || 5;
const monthlyIncome1 = parseFloat(clientData.incomeNeeds.monthly1) || 4500;
const yearsAfterRetirement2 = parseInt(clientData.incomeNeeds.yearsafter2) || 10;
const monthlyIncome2 = parseFloat(clientData.incomeNeeds.monthly2) || 4000;
const yearsToRetirement = startAge - c1Age;
// const monthlyNeed = monthlyNeedInitial * Math.pow(1 + inflation, yearsToRetirement);

const incomeGoals = [
  {
    age: c1RetirementAge,
    percentage: 100,
    amount: Math.round(monthlyNeed)
  },
  {
    age: c1RetirementAge + yearsAfterRetirement1,
    percentage: Math.round((monthlyIncome1 / monthlyNeedInitial) * 100),
    amount: Math.round(monthlyIncome1 * Math.pow(1 + inflation, yearsToRetirement + yearsAfterRetirement1))
  },
  {
    age: c1RetirementAge + yearsAfterRetirement2,
    percentage: Math.round((monthlyIncome2 / monthlyNeedInitial) * 100),
    amount: Math.round(monthlyIncome2 * Math.pow(1 + inflation, yearsToRetirement + yearsAfterRetirement2))
  }
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
      incomeSources.push({
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

    // Calculate capital accounts
    const capitalData = calculateCapitalAccounts(clientData, getAge);
    const incomeData = calculateRetirementIncome(clientData, getAge);
    const alternativesData = calculateRetirementAlternatives(clientData, getAge, incomeData);

    // Define report options for dropdown
    const reportOptions = [
      { id: 'output-graph', label: 'Retirement Analysis', reportId: 'report-graph', title: 'Retirement Income Graph' },
      { id: 'report-social-security-optimizer', label: 'Social Security Optimizer', reportId: 'report-social-security-optimizer', title: 'Social Security optimizer' },
      { id: 'report-capital-available', label: 'Capital Available at Retirement', reportId: 'report-capital-available', title: 'Capital Available at Retirement' },
      { id: 'output-alternatives', label: 'Alternatives to Achieving Retirement Goals', reportId: 'report-alternatives-retirement', title: 'Retirement Alternatives' },
      { id: 'output-timeline', label: 'Retirement Timeline', reportId: 'report-retirement-timeline', title: 'Retirement Income Timeline' },
      { id: 'report-retirement-fact-finder', label: 'Fact Finder', reportId: 'report-retirement-fact-finder', title: 'Retirement Fact Finder' }
    ];

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
                <td>Reduce monthly income needs to ${formatCurrency(Math.round(alternativesData.reducedMonthlyNeed))} from ${formatCurrency(Math.round(monthlyNeed))} (${alternativesData.cappedReductionPercent.toFixed(1)}% reduction)</td>
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
      </div>
    `;

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
