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
        <label>Retirement Age: <input type="number" id="c1-retirement-age" min="1" max="120" placeholder="65"></label>
      </div>
      <div class="client" id="client2-section" style="display: none;">
        <h5>Client 2</h5>
        <label>Name: <input type="text" id="c2-name" placeholder="Sally Johnson"></label>
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
      <div>
        <h5>Income Needs Input Type</h5>
        <label><input type="radio" name="income-needs-type" id="income-needs-dollar" value="dollar" checked> Monthly Dollar Amount</label>
        <label><input type="radio" name="income-needs-type" id="income-needs-percent" value="percent"> Percentage of Employment Income</label>
      </div>
      <div id="income-needs-dollar-input">
        <label>Monthly Income Needs ($): <input type="number" id="monthly-income" min="0" step="100" placeholder="5000"></label>
        <label>Adjustment 1: Beginning <input type="number" id="adjustment1-years" min="0" step="1" placeholder="5"> years after retirement, adjust to ($): <input type="number" id="adjustment1-amount" min="0" step="100" placeholder="4000"></label>
        <label>Adjustment 2: Beginning <input type="number" id="adjustment2-years" min="0" step="1" placeholder="10"> years after retirement, adjust to ($): <input type="number" id="adjustment2-amount" min="0" step="100" placeholder="3500"></label>
      </div>
      <div id="income-needs-percent-input" style="display: none;">
        <label>Income Needs (% of Employment Income): <input type="number" id="income-percent" min="0" max="100" step="0.1" placeholder="80"></label>
        <label>Adjustment 1: Beginning <input type="number" id="adjustment1-years-percent" min="0" step="1" placeholder="5"> years after retirement, adjust to (%): <input type="number" id="adjustment1-percent" min="0" max="100" step="0.1" placeholder="70"></label>
        <label>Adjustment 2: Beginning <input type="number" id="adjustment2-years-percent" min="0" step="1" placeholder="10"> years after retirement, adjust to (%): <input type="number" id="adjustment2-percent" min="0" max="100" step="0.1" placeholder="60"></label>
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

// Setup age display listeners for DOB inputs and handle Client 2 mortality input visibility
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

    // Setup income needs input type toggle
    const incomeNeedsDollar = document.getElementById('income-needs-dollar');
    const incomeNeedsPercent = document.getElementById('income-needs-percent');
    const dollarInputs = document.getElementById('income-needs-dollar-input');
    const percentInputs = document.getElementById('income-needs-percent-input');

    if (incomeNeedsDollar && incomeNeedsPercent && dollarInputs && percentInputs) {
      const toggleInputs = () => {
        dollarInputs.style.display = incomeNeedsDollar.checked ? 'block' : 'none';
        percentInputs.style.display = incomeNeedsPercent.checked ? 'block' : 'none';
      };

      incomeNeedsDollar.addEventListener('change', toggleInputs);
      incomeNeedsPercent.addEventListener('change', toggleInputs);

      // Trigger initial visibility
      toggleInputs();
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

    // Determine income needs based on input type
    let monthlyNeed;
    const incomeNeedsType = clientData.incomeNeeds.type || 'dollar';
    if (incomeNeedsType === 'percent') {
      // Calculate total employment income
      const c1Employment = parseFloat(clientData.client1.incomeSources.employment) || 0;
      const c2Employment = clientData.isMarried ? parseFloat(clientData.client2.incomeSources.employment) || 0 : 0;
      const totalEmployment = (c1Employment + c2Employment) / 12; // Convert to monthly
      const incomePercent = parseFloat(clientData.incomeNeeds.incomePercent) || 80;
      monthlyNeed = (incomePercent / 100) * totalEmployment;
    } else {
      monthlyNeed = parseFloat(clientData.incomeNeeds.monthly) || 5000;
    }

    // Parse adjustment inputs
    const adjustment1Years = parseInt(clientData.incomeNeeds.adjustment1Years) || 0;
    const adjustment2Years = parseInt(clientData.incomeNeeds.adjustment2Years) || 0;
    let adjustment1Amount, adjustment2Amount;
    if (incomeNeedsType === 'percent') {
      const c1Employment = parseFloat(clientData.client1.incomeSources.employment) || 0;
      const c2Employment = clientData.isMarried ? parseFloat(clientData.client2.incomeSources.employment) || 0 : 0;
      const totalEmployment = (c1Employment + c2Employment) / 12;
      adjustment1Amount = ((parseFloat(clientData.incomeNeeds.adjustment1Percent) || 70) / 100) * totalEmployment;
      adjustment2Amount = ((parseFloat(clientData.incomeNeeds.adjustment2Percent) || 60) / 100) * totalEmployment;
    } else {
      adjustment1Amount = parseFloat(clientData.incomeNeeds.adjustment1Amount) || monthlyNeed;
      adjustment2Amount = parseFloat(clientData.incomeNeeds.adjustment2Amount) || monthlyNeed;
    }

    if (!clientData.client1.personal.dob || c1Age >= c1RetirementAge || (clientData.isMarried && (!clientData.client2.personal.dob || c2Age >= c2RetirementAge))) {
      console.warn('Invalid inputs: Returning empty result');
      return result;
    }
    if (startAge >= maxTimelineAge) {
      console.warn('Start age >= maxTimelineAge: Returning empty result');
      return result;
    }

    // Adjust monthly need for inflation until retirement with annual compounding
    const yearsToRetirement = startAge - c1Age;
    monthlyNeed = monthlyNeed * Math.pow(1 + inflation, yearsToRetirement);
    let annualNeed = monthlyNeed * 12;

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

        // Future value of current balance with monthly compounding (no rounding)
        const fvBalance = balance * Math.pow(1 + ror / 12, monthsToClientRetirement);
        // Future value of contributions (annuity due) with monthly compounding (no rounding)
        const fvContributions = monthlyContribution && ror ? monthlyContribution * (Math.pow(1 + ror / 12, monthsToClientRetirement) - 1) / (ror / 12) * (1 + ror / 12) : 0;
        // Future value of employer match (annuity due) with monthly compounding (no rounding)
        const fvEmployerMatch = monthlyEmployerMatch && ror ? monthlyEmployerMatch * (Math.pow(1 + ror / 12, monthsToClientRetirement) - 1) / (ror / 12) * (1 + ror / 12) : 0;

        let accountBalance = fvBalance + fvContributions + fvEmployerMatch;

        // Apply rorRetirement if client retires before startAge with monthly compounding (no rounding)
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

      // Determine the applicable monthly need based on adjustments
      let adjustedMonthlyNeed;
      if (i >= adjustment2Years && adjustment2Years > 0) {
        adjustedMonthlyNeed = adjustment2Amount * Math.pow(1 + inflation, i);
      } else if (i >= adjustment1Years && adjustment1Years > 0) {
        adjustedMonthlyNeed = adjustment1Amount * Math.pow(1 + inflation, i);
      } else {
        adjustedMonthlyNeed = monthlyNeed * Math.pow(1 + inflation, i);
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

      // Calculate monthly earnings and withdrawals, then aggregate to annual
      let annualEarnings = 0;
      let annualWithdrawal = 0;
      let monthlyBalance = balance;
      const monthlyRor = rorRetirement / 12;
      const monthlyNeedAdjusted = adjustedMonthlyNeed;
      const monthlyIncome = totalIncome / 12;
      const monthlySocialSecurity = socialSecurity / 12;

      for (let m = 0; m < 12; m++) {
        // Calculate remaining need or surplus
        const monthlyRemainingNeed = monthlyNeedAdjusted - monthlyIncome - monthlySocialSecurity;
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
          // Surplus: save the excess by setting negative withdrawal
          monthlyWithdrawal = monthlyRemainingNeed; // Negative value increases balance
          monthlyBalance -= monthlyWithdrawal; // Subtracting a negative increases balance
        }

        // Monthly earnings (calculated after withdrawal/surplus, no rounding)
        const monthlyEarnings = monthlyBalance * monthlyRor;
        monthlyBalance += monthlyEarnings;

        annualEarnings += monthlyEarnings;
        annualWithdrawal += monthlyWithdrawal;
      }

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
      }
    }

    // Ensure depletionAge is maxTimelineAge if balance remains positive
    result.depletionAge = balance > 0 ? maxTimelineAge : result.depletionAge;

    console.log('Final Labels:', result.labels);
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

    // Determine first client to retire
    const c1YearsToRetirement = c1RetirementAge - c1Age;
    const c2YearsToRetirement = clientData.isMarried ? c2RetirementAge - c2Age : Infinity;
    const firstRetirementYears = Math.min(c1YearsToRetirement, c2YearsToRetirement);
    const firstClientIsC1 = c1YearsToRetirement <= c2YearsToRetirement;
    const firstRetirementAge = firstClientIsC1 ? c1RetirementAge : c2RetirementAge;
    const firstCurrentAge = firstClientIsC1 ? c1Age : c2Age;

    // Parse mortality ages with fallback for legacy data
    const c1MortalityAgeRaw = parseFloat(clientData.assumptions.c1MortalityAge) || parseFloat(clientData.assumptions.mortalityAge);
    const c2MortalityAgeRaw = clientData.isMarried ? (parseFloat(clientData.assumptions.c2MortalityAge) || parseFloat(clientData.assumptions.mortalityAge)) : c1MortalityAgeRaw;
    const c1MortalityAge = isNaN(c1MortalityAgeRaw) || c1MortalityAgeRaw < c1RetirementAge ? 90 : Math.min(c1MortalityAgeRaw, 120);
    const c2MortalityAge = isNaN(c2MortalityAgeRaw) || c2MortalityAgeRaw < c2RetirementAge ? 90 : Math.min(c2MortalityAgeRaw, 120);

    console.log('Output Mortality Ages:', { c1MortalityAge, c2MortalityAge, c1MortalityAgeRaw, c2MortalityAgeRaw, assumptions: clientData.assumptions });

    const maxTimelineAge = clientData.isMarried ? Math.max(c1MortalityAge, c2MortalityAge) : c1MortalityAge;
    const inflation = isNaN(parseFloat(clientData.assumptions.inflation)) ? 0.02 : parseFloat(clientData.assumptions.inflation) / 100;
    const rorRetirement = isNaN(parseFloat(clientData.assumptions.rorRetirement)) ? 0.04 : parseFloat(clientData.assumptions.rorRetirement) / 100;

    // Determine income needs based on input type
    let monthlyNeed;
    const incomeNeedsType = clientData.incomeNeeds.type || 'dollar';
    if (incomeNeedsType === 'percent') {
      const c1Employment = parseFloat(clientData.client1.incomeSources.employment) || 0;
      const c2Employment = clientData.isMarried ? parseFloat(clientData.client2.incomeSources.employment) || 0 : 0;
      const totalEmployment = (c1Employment + c2Employment) / 12;
      const incomePercent = parseFloat(clientData.incomeNeeds.incomePercent) || 80;
      monthlyNeed = (incomePercent / 100) * totalEmployment;
    } else {
      monthlyNeed = parseFloat(clientData.incomeNeeds.monthly) || 5000;
    }

    // Parse adjustment inputs
    const adjustment1Years = parseInt(clientData.incomeNeeds.adjustment1Years) || 0;
    const adjustment2Years = parseInt(clientData.incomeNeeds.adjustment2Years) || 0;
    let adjustment1Amount, adjustment2Amount;
    if (incomeNeedsType === 'percent') {
      const c1Employment = parseFloat(clientData.client1.incomeSources.employment) || 0;
      const c2Employment = clientData.isMarried ? parseFloat(clientData.client2.incomeSources.employment) || 0 : 0;
      const totalEmployment = (c1Employment + c2Employment) / 12;
      adjustment1Amount = ((parseFloat(clientData.incomeNeeds.adjustment1Percent) || 70) / 100) * totalEmployment;
      adjustment2Amount = ((parseFloat(clientData.incomeNeeds.adjustment2Percent) || 60) / 100) * totalEmployment;
    } else {
      adjustment1Amount = parseFloat(clientData.incomeNeeds.adjustment1Amount) || monthlyNeed;
      adjustment2Amount = parseFloat(clientData.incomeNeeds.adjustment2Amount) || monthlyNeed;
    }

    // Add defensive checks for missing properties
    clientData.client1.other = clientData.client1.other || { assets: [] };
    clientData.client2 = clientData.client2 || { other: { assets: [] } };
    const currentSavings = parseFloat(clientData.savingsExpenses?.monthlySavings) || 0;

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
    const yearsToRetirement = startAge - c1Age;
    monthlyNeed = monthlyNeed * Math.pow(1 + inflation, yearsToRetirement);

    const incomeGoals = [
      { age: c1RetirementAge, percentage: 100, amount: Math.round(monthlyNeed) },
      { age: c1RetirementAge + adjustment1Years, percentage: (adjustment1Amount / monthlyNeed) * 100, amount: Math.round(adjustment1Amount) },
      { age: c1RetirementAge + adjustment2Years, percentage: (adjustment2Amount / monthlyNeed) * 100, amount: Math.round(adjustment2Amount) }
    ].filter(goal => goal.age <= maxTimelineAge);

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

    // Calculate future value of capital accounts only (excluding other assets)
    const capitalAccounts = [];
    let totalCapital = 0;
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

        // Calculate balances for each year from now to first retirement
        const yearlyBalances = [];
        for (let year = 0; year <= yearsToClientRetirement; year++) {
          const months = year * 12;
          // Future value of current balance
          const fvBalance = balance * Math.pow(1 + ror / 12, months);
          // Future value of contributions (annuity due)
          const fvContributions = monthlyContribution && ror ? monthlyContribution * (Math.pow(1 + ror / 12, months) - 1) / (ror / 12) * (1 + ror / 12) : 0;
          // Future value of employer match (annuity due)
          const fvEmployerMatch = monthlyEmployerMatch && ror ? monthlyEmployerMatch * (Math.pow(1 + ror / 12, months) - 1) / (ror / 12) * (1 + ror / 12) : 0;
          const yearBalance = fvBalance + fvContributions + fvEmployerMatch;
          yearlyBalances.push(Math.round(yearBalance));
        }

        if (yearlyBalances[yearlyBalances.length - 1] > 0) {
          capitalAccounts.push({
            name: `${client.personal.name || (idx === 0 ? 'Client 1' : 'Client 2')}'s ${account.name || 'Retirement Account'}`,
            balances: yearlyBalances,
            isClient1: idx === 0
          });
          totalCapital += yearlyBalances[yearlyBalances.length - 1];
        }
      });
    });

    let balance = totalCapital;
    const monthlySources = incomeSources.reduce((sum, src) => sum + (src.amount || 0), 0);
    let depletionAge = c1RetirementAge;
    for (let i = 0; i < maxTimelineAge - c1RetirementAge; i++) {
      let currentNeed;
      if (i >= adjustment2Years && adjustment2Years > 0) {
        currentNeed = adjustment2Amount * Math.pow(1 + inflation, i);
      } else if (i >= adjustment1Years && adjustment1Years > 0) {
        currentNeed = adjustment1Amount * Math.pow(1 + inflation, i);
      } else {
        currentNeed = monthlyNeed * Math.pow(1 + inflation, i);
      }
      currentNeed -= monthlySources;
      balance = balance * Math.pow(1 + rorRetirement / 12, 12) - (currentNeed > 0 ? currentNeed * 12 : 0);
      if (balance <= 0) {
        depletionAge = c1RetirementAge + i;
        break;
      }
    }
    if (balance > 0) depletionAge = maxTimelineAge;

    let additionalSavings = 0;
    let requiredAtRetirement = 0;
    if (depletionAge < maxTimelineAge) {
      const yearsShort = maxTimelineAge - depletionAge;
      let totalShortfall = 0;
      for (let i = 0; i < yearsShort; i++) {
        let yearlyNeed;
        if (i + depletionAge - c1RetirementAge >= adjustment2Years && adjustment2Years > 0) {
          yearlyNeed = adjustment2Amount * 12 * Math.pow(1 + inflation, i + depletionAge - c1RetirementAge);
        } else if (i + depletionAge - c1RetirementAge >= adjustment1Years && adjustment1Years > 0) {
          yearlyNeed = adjustment1Amount * 12 * Math.pow(1 + inflation, i + depletionAge - c1RetirementAge);
        } else {
          yearlyNeed = monthlyNeed * 12 * Math.pow(1 + inflation, i + depletionAge - c1RetirementAge);
        }
        yearlyNeed -= monthlySources * 12;
        if (yearlyNeed > 0) {
          totalShortfall += yearlyNeed / Math.pow(1 + rorRetirement, i);
        }
      }
      requiredAtRetirement = totalShortfall;
      const monthsToRetirement = (startAge - c1Age) * 12;
      additionalSavings = requiredAtRetirement / ((Math.pow(1 + rorRetirement / 12, monthsToRetirement) - 1) / (rorRetirement / 12));
    }

    // Calculate Alternatives
    const incomeData = calculateRetirementIncome(clientData, getAge);
    let targetROR = rorRetirement;
    if (depletionAge < maxTimelineAge) {
      let low = rorRetirement;
      let high = 0.2; // Max 20% ROR
      for (let i = 0; i < 20; i++) {
        const mid = (low + high) / 2;
        let tempBalance = incomeData.totalBalance;
        for (let j = 0; j < maxTimelineAge - c1RetirementAge; j++) {
          let currentNeed;
          if (j >= adjustment2Years && adjustment2Years > 0) {
            currentNeed = adjustment2Amount * Math.pow(1 + inflation, j);
          } else if (j >= adjustment1Years && adjustment1Years > 0) {
            currentNeed = adjustment1Amount * Math.pow(1 + inflation, j);
          } else {
            currentNeed = monthlyNeed * Math.pow(1 + inflation, j);
          }
          currentNeed -= monthlySources;
          tempBalance = tempBalance * Math.pow(1 + mid / 12, 12) - (currentNeed > 0 ? currentNeed * 12 : 0);
          if (tempBalance <= 0) break;
        }
        if (tempBalance > 0) high = mid;
        else low = mid;
      }
      targetROR = (low + high) / 2;
    }

    let reducedMonthlyNeed = monthlyNeed;
    if (depletionAge < maxTimelineAge) {
      let low = 0;
      let high = monthlyNeed;
      for (let i = 0; i < 20; i++) {
        const mid = (low + high) / 2;
        let tempBalance = incomeData.totalBalance;
        for (let j = 0; j < maxTimelineAge - c1RetirementAge; j++) {
          let currentNeed = mid * Math.pow(1 + inflation, j) - monthlySources;
          tempBalance = tempBalance * Math.pow(1 + rorRetirement / 12, 12) - (currentNeed > 0 ? currentNeed * 12 : 0);
          if (tempBalance <= 0) break;
        }
        if (tempBalance > 0) high = mid;
        else low = mid;
      }
      reducedMonthlyNeed = (low + high) / 2;
    }

    let newRetirementAge = c1RetirementAge;
    if (depletionAge < maxTimelineAge) {
      const yearsNeeded = maxTimelineAge - depletionAge;
      newRetirementAge = Math.ceil(c1RetirementAge + yearsNeeded);
      if (newRetirementAge > maxTimelineAge) newRetirementAge = maxTimelineAge;
    }

    // Calculate "Save More" option
    let additionalMonthlySavings = 0;
    let saveMorePercent = 0;
    if (depletionAge < maxTimelineAge) {
      // Step 1: Calculate total shortfall over the retirement period
      const shortfallValues = incomeData.shortfallData.slice(1); // Skip the initial blank row
      let totalShortfall = 0;
      for (let i = 0; i < shortfallValues.length; i++) {
        if (shortfallValues[i] > 0) {
          // Discount each year's shortfall back to the start of retirement
          const discountedShortfall = shortfallValues[i] / Math.pow(1 + rorRetirement, i);
          totalShortfall += discountedShortfall;
        }
      }

      // Step 2: Calculate the additional capital needed at retirement
      const capitalNeededAtRetirement = totalShortfall;

      // Step 3: Calculate the average ROR across all accounts
      let totalROR = 0;
      let accountCount = 0;
      clients.forEach(client => {
        if (!client) return;
        client.accounts.forEach(account => {
          const ror = isNaN(parseFloat(account.ror)) ? 0.06 : parseFloat(account.ror) / 100;
          totalROR += ror;
          accountCount++;
        });
      });
      const avgROR = accountCount > 0 ? totalROR / accountCount : 0.06; // Default to 6% if no accounts

      // Step 4: Calculate monthly savings needed to accumulate the required capital
      const monthsToRetirement = yearsToRetirement * 12;
      if (avgROR > 0 && monthsToRetirement > 0) {
        const monthlyROR = avgROR / 12;
        // Future value of an annuity formula (annuity due): FV = P * [(1 + r)^n - 1] / r * (1 + r)
        const denominator = (Math.pow(1 + monthlyROR, monthsToRetirement) - 1) / monthlyROR * (1 + monthlyROR);
        additionalMonthlySavings = capitalNeededAtRetirement / denominator;
        additionalMonthlySavings = Math.round(additionalMonthlySavings);
      } else {
        additionalMonthlySavings = monthsToRetirement > 0 ? Math.round(capitalNeededAtRetirement / monthsToRetirement) : 0;
      }

      // Step 5: Calculate percentage for the bar graph
      const baseAmount = currentSavings > 0 ? currentSavings : ((parseFloat(clientData.client1.incomeSources.employment) || 0) + (clientData.isMarried ? (parseFloat(clientData.client2.incomeSources.employment) || 0) : 0)) / 12;
      saveMorePercent = baseAmount > 0 ? (additionalMonthlySavings / baseAmount) * 100 : 0;
      saveMorePercent = Math.min(saveMorePercent, 100); // Cap at 100%
    }

    // Calculate percentages for the bar graph
    // Increase ROR Percentage
    const currentRORs = [];
    clients.forEach(client => {
      if (!client) return;
      client.accounts.forEach(account => {
        const ror = isNaN(parseFloat(account.ror)) ? 0.06 : parseFloat(account.ror) / 100;
        currentRORs.push(ror);
      });
    });
    const avgCurrentROR = currentRORs.length > 0 ? currentRORs.reduce((sum, ror) => sum + ror, 0) / currentRORs.length : 0.06;
    const rorIncreasePercent = avgCurrentROR > 0 ? ((targetROR - avgCurrentROR) / avgCurrentROR) * 100 : 0;
    const cappedRorIncreasePercent = Math.min(rorIncreasePercent, 100);

    // Reduce Income Needs Percentage
    const reductionPercent = monthlyNeed > 0 ? ((monthlyNeed - reducedMonthlyNeed) / monthlyNeed) * 100 : 0;
    const cappedReductionPercent = Math.min(reductionPercent, 100);

    // Delay Retirement Percentage
    const originalYearsToRetirement = c1RetirementAge - c1Age;
    const additionalYears = newRetirementAge - c1RetirementAge;
    const retirementDelayPercent = originalYearsToRetirement > 0 ? (additionalYears / originalYearsToRetirement) * 100 : 0;
    const cappedRetirementDelayPercent = Math.min(retirementDelayPercent, 100);

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

    // Generate labels for the bar graph (ages up to first retirement)
    const labels = Array.from({ length: firstRetirementYears + 1 }, (_, i) => firstCurrentAge + i);

    // Prepare datasets for the bar graph
    const datasets = capitalAccounts.map(account => {
      const dataset = {
        label: account.name,
        data: account.balances,
        backgroundColor: account.isClient1 ? '#22c55e' : '#3b82f6' // Green for Client 1, Blue for Client 2
      };
      // Set the same stack value for all accounts to stack them together when there are two clients
      if (clientData.isMarried) {
        dataset.stack = 'Accounts';
      }
      return dataset;
    });

    // Determine if stacking should be enabled
    const shouldStack = clientData.isMarried;

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
                <td>Increase monthly savings by ${formatCurrency(additionalMonthlySavings)}</td>
              </tr>
              <tr>
                <td>Increase Rate of Return</td>
                <td>Increase portfolio ROR to ${(targetROR * 100).toFixed(1)}% from ${(avgCurrentROR * 100).toFixed(1)}%</td>
              </tr>
              <tr>
                <td>Reduce Income Needs</td>
                <td>Reduce monthly income needs to ${formatCurrency(Math.round(reducedMonthlyNeed))} from ${formatCurrency(Math.round(monthlyNeed))} (${reductionPercent.toFixed(1)}% reduction)</td>
              </tr>
              <tr>
                <td>Delay Retirement</td>
                <td>Delay retirement to age ${newRetirementAge} from age ${c1RetirementAge}</td>
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
              ${capitalAccounts.map(account => `
                <tr>
                  <td>${account.name}</td>
                  <td>${formatCurrency(account.balances[account.balances.length - 1])}</td>
                </tr>
              `).join('')}
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>${formatCurrency(Math.round(totalCapital))}</strong></td>
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
                labels: labels,
                datasets: datasets
              },
              options: {
                responsive: true,
                plugins: {
                  legend: { display: true, position: 'top' },
                  title: { display: true, text: 'Capital Account Growth to First Retirement' }
                },
                scales: {
                  x: {
                    title: { display: true, text: `${firstClientIsC1 ? clientData.client1.personal.name || 'Client 1' : clientData.client2.personal.name || 'Client 2'} Age` },
                    stacked: shouldStack // Stack only if there are two clients
                  },
                  y: {
                    title: { display: true, text: 'Balance ($)' },
                    stacked: shouldStack, // Stack only if there are two clients
                    beginAtZero: true
                  }
                }
              }
            });
            chartCanvas.chartInstance = chartInstance;
          } else if (currentSelection === 'output-alternatives') {
            updateAlternativesGraph(chartCanvas, saveMorePercent, cappedRorIncreasePercent, cappedReductionPercent, cappedRetirementDelayPercent, Chart);
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

// Setup dropdown and checkbox interactions
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
