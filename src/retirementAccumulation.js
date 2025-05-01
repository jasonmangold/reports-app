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

// Setup age display listeners for DOB inputs and handle Client 2 visibility
export function setupAgeDisplayListeners(getAge) {
  try {
    const dobInputs = document.querySelectorAll('#c1-dob, #c2-dob');
    const isMarriedInput = document.getElementById('is-married');
    const c2MortalityLabel = document.getElementById('c2-mortality-label');
    const client2Section = document.getElementById('client2-section');
    const client2IncomeSection = document.getElementById('client2-income-section');
    const c2Accounts = document.getElementById('c2-accounts');

    // Update age displays on DOB change
    dobInputs.forEach(input => {
      input.addEventListener('change', () => {
        const clientPrefix = input.id.split('-')[0];
        const ageDisplay = document.getElementById(`${clientPrefix}-age-display`);
        const dob = input.value;
        const age = getAge(dob);
        if (age > 0 && ageDisplay) {
          ageDisplay.textContent = `Current Age: ${age}`;
        } else if (ageDisplay) {
          ageDisplay.textContent = '';
        }
      });

      // Trigger initial age display
      if (input.value) {
        input.dispatchEvent(new Event('change'));
      }
    });

    // Toggle visibility of Client 2 sections based on marital status
    if (isMarriedInput) {
      const toggleClient2Visibility = () => {
        const isChecked = isMarriedInput.checked;
        if (client2Section) client2Section.style.display = isChecked ? 'block' : 'none';
        if (client2IncomeSection) client2IncomeSection.style.display = isChecked ? 'block' : 'none';
        if (c2Accounts) c2Accounts.style.display = isChecked ? 'block' : 'none';
        if (c2MortalityLabel) c2MortalityLabel.style.display = isChecked ? 'block' : 'none';
        // Trigger age update for Client 2 if visible
        if (isChecked && document.getElementById('c2-dob')?.value) {
          document.getElementById('c2-dob').dispatchEvent(new Event('change'));
        }
      };
      isMarriedInput.addEventListener('change', toggleClient2Visibility);
      toggleClient2Visibility(); // Initial visibility
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
      toggleInputs(); // Initial visibility
    }
  } catch (error) {
    console.error('Error in setupAgeDisplayListeners:', error);
  }
}

// Calculate retirement income data
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
    depletionAge: 0
  };

  try {
    // Validate inputs
    if (!clientData?.client1?.personal?.dob || !getAge(clientData.client1.personal.dob)) {
      console.warn('Invalid Client 1 DOB');
      return result;
    }
    if (clientData.isMarried && (!clientData?.client2?.personal?.dob || !getAge(clientData.client2.personal.dob))) {
      console.warn('Invalid Client 2 DOB');
      return result;
    }

    // Calculate ages
    const c1Age = getAge(clientData.client1.personal.dob);
    const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
    const ageDifference = c1Age - c2Age; // Positive if Client 1 is older
    const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
    const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
    const startAge = Math.max(c1RetirementAge, c2RetirementAge);

    // Parse mortality ages with fallback
    const c1MortalityAge = parseFloat(clientData.assumptions.c1MortalityAge) || parseFloat(clientData.assumptions.mortalityAge) || 90;
    const c2MortalityAge = clientData.isMarried ? (parseFloat(clientData.assumptions.c2MortalityAge) || parseFloat(clientData.assumptions.mortalityAge) || 90) : c1MortalityAge;
    const c1MaxAge = Math.max(c1RetirementAge, Math.min(c1MortalityAge, 120) - 1);
    const c2MaxAge = clientData.isMarried ? Math.max(c2RetirementAge, Math.min(c2MortalityAge, 120) - 1) : c1MaxAge;
    const maxTimelineAge = clientData.isMarried ? Math.max(c1MaxAge, c2MaxAge + ageDifference) : c1MaxAge;

    // Validate retirement ages
    if (c1Age >= c1RetirementAge || (clientData.isMarried && c2Age >= c2RetirementAge)) {
      console.warn('Client(s) already at or past retirement age');
      return result;
    }
    if (startAge >= maxTimelineAge) {
      console.warn('Start age >= max timeline age');
      return result;
    }

    // Parse assumptions
    const inflation = parseFloat(clientData.assumptions.inflation) / 100 || 0.02;
    const rorRetirement = parseFloat(clientData.assumptions.rorRetirement) / 100 || 0.04;

    // Determine income needs
    let monthlyNeed;
    const incomeNeedsType = clientData.incomeNeeds?.type || 'dollar';
    if (incomeNeedsType === 'percent') {
      const c1Employment = parseFloat(clientData.client1.incomeSources.employment) || 0;
      const c2Employment = clientData.isMarried ? parseFloat(clientData.client2.incomeSources.employment) || 0 : 0;
      const totalEmployment = (c1Employment + c2Employment) / 12;
      const incomePercent = parseFloat(clientData.incomeNeeds.incomePercent) || 80;
      monthlyNeed = (incomePercent / 100) * totalEmployment;
    } else {
      monthlyNeed = parseFloat(clientData.incomeNeeds.monthly) || 5000;
    }

    // Parse adjustments
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

    // Adjust monthly need for inflation until retirement
    const yearsToRetirement = startAge - c1Age;
    monthlyNeed *= Math.pow(1 + inflation, yearsToRetirement);

    // Calculate total balance at retirement
    let totalBalance = 0;
    const clients = [clientData.client1, clientData.isMarried ? clientData.client2 : null];
    clients.forEach((client, idx) => {
      if (!client) return;
      const clientAge = idx === 0 ? c1Age : c2Age;
      const clientRetirementAge = idx === 0 ? c1RetirementAge : c2RetirementAge;
      const monthsToRetirement = (clientRetirementAge - clientAge) * 12;

      // Calculate account growth
      (client.accounts || []).forEach(account => {
        const balance = parseFloat(account.balance) || 0;
        const annualContribution = parseFloat(account.contribution) || 0;
        const monthlyContribution = annualContribution / 12;
        const employmentIncome = parseFloat(client.incomeSources.employment) || 0;
        const employerMatchPercent = parseFloat(account.employerMatch) / 100 || 0;
        const annualEmployerMatch = employerMatchPercent * employmentIncome;
        const monthlyEmployerMatch = annualEmployerMatch / 12;
        const ror = parseFloat(account.ror) / 100 || 0.06;

        const fvBalance = balance * Math.pow(1 + ror / 12, monthsToRetirement);
        const fvContributions = monthlyContribution && ror ? monthlyContribution * (Math.pow(1 + ror / 12, monthsToRetirement) - 1) / (ror / 12) * (1 + ror / 12) : 0;
        const fvEmployerMatch = monthlyEmployerMatch && ror ? monthlyEmployerMatch * (Math.pow(1 + ror / 12, monthsToRetirement) - 1) / (ror / 12) * (1 + ror / 12) : 0;
        let accountBalance = fvBalance + fvContributions + fvEmployerMatch;

        // Adjust for early retirement
        if (clientRetirementAge < startAge) {
          const additionalMonths = (startAge - clientRetirementAge) * 12;
          accountBalance *= Math.pow(1 + rorRetirement / 12, additionalMonths);
        }

        totalBalance += accountBalance;
      });

      // Calculate other assets
      if (client.other?.assets) {
        client.other.assets.forEach(asset => {
          const balance = parseFloat(asset.balance) || 0;
          const ror = parseFloat(asset.ror) / 100 || 0.06;
          let fvBalance = balance * Math.pow(1 + ror / 12, monthsToRetirement);
          if (clientRetirementAge < startAge) {
            const additionalMonths = (startAge - clientRetirementAge) * 12;
            fvBalance *= Math.pow(1 + rorRetirement / 12, additionalMonths);
          }
          totalBalance += fvBalance;
        });
      }
    });

    let balance = totalBalance;
    result.totalBalance = Math.round(totalBalance);
    result.depletionAge = startAge;

    // Add initial row
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

      // Determine monthly need
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

      // Calculate income
      let employmentIncome = 0;
      let otherIncome = 0;
      if (currentC1Age < c1RetirementAge && currentC1Age <= c1MaxAge) {
        employmentIncome += parseFloat(clientData.client1.incomeSources.employment) || 0;
      }
      if (currentC1Age <= c1MaxAge) {
        otherIncome += (parseFloat(clientData.client1.incomeSources.other) || 0) * 12;
      }
      if (clientData.isMarried && currentC2Age < c2RetirementAge && currentC2Age <= c2MaxAge) {
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
        socialSecurity += (parseFloat(clientData.client1.incomeSources.socialSecurity) || 0) * 12;
      }
      if (clientData.isMarried && currentC2Age >= c2RetirementAge && currentC2Age <= c2MaxAge) {
        socialSecurity += (parseFloat(clientData.client2.incomeSources.socialSecurity) || 0) * 12;
      }
      result.socialSecurityData.push(Math.round(socialSecurity));

      // Calculate monthly transactions
      let annualEarnings = 0;
      let annualWithdrawal = 0;
      let monthlyBalance = balance;
      const monthlyRor = rorRetirement / 12;
      const monthlyIncome = totalIncome / 12;
      const monthlySocialSecurity = socialSecurity / 12;

      for (let m = 0; m < 12; m++) {
        const monthlyRemainingNeed = adjustedMonthlyNeed - monthlyIncome - monthlySocialSecurity;
        let monthlyWithdrawal = 0;

        if (monthlyRemainingNeed > 0) {
          monthlyWithdrawal = Math.min(monthlyRemainingNeed, monthlyBalance);
          monthlyBalance -= monthlyWithdrawal;
        } else {
          monthlyWithdrawal = monthlyRemainingNeed; // Negative increases balance
          monthlyBalance -= monthlyWithdrawal;
        }

        const monthlyEarnings = monthlyBalance * monthlyRor;
        monthlyBalance += monthlyEarnings;

        annualEarnings += monthlyEarnings;
        annualWithdrawal += monthlyWithdrawal;
      }

      result.earningsData.push(Math.round(annualEarnings));
      result.withdrawalData.push(Math.round(annualWithdrawal));

      const shortfall = adjustedAnnualNeed - totalIncome - socialSecurity - annualWithdrawal;
      result.shortfallData.push(shortfall > 0 ? Math.round(shortfall) : 0);

      balance = monthlyBalance;
      result.balanceData.push(Math.round(balance));

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

// Update retirement income graph
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
    if (chartCanvas.chartInstance) {
      chartCanvas.chartInstance.destroy();
    }

    const incomeData = calculateRetirementIncome(clientData, getAge);
    if (!incomeData.labels.length) {
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
          plugins: {
            title: { display: true, text: 'Please enter valid DOB and retirement age' }
          }
        }
      });
      chartCanvas.chartInstance = chartInstance;
      return chartInstance;
    }

    const chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: incomeData.labels.slice(1),
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
    chartCanvas.chartInstance = chartInstance;
    return chartInstance;
  } catch (error) {
    console.error('Error in updateRetirementGraph:', error);
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
        plugins: { title: { display: true, text: 'Error rendering graph' } }
      }
    });
    chartCanvas.chartInstance = chartInstance;
    return chartInstance;
  }
}

// Update alternatives graph
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

// Update retirement outputs
export function updateRetirementOutputs(analysisOutputs, clientData, formatCurrency, getAge, selectedReports, Chart) {
  try {
    if (!analysisOutputs) {
      console.error('Analysis outputs #analysis-outputs not found');
      return;
    }

    const tabContainer = document.getElementById('output-tabs-container');
    const incomeData = calculateRetirementIncome(clientData, getAge);

    // Validate inputs
    const c1Age = getAge(clientData.client1.personal.dob);
    const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
    const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
    const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
    const startAge = Math.max(c1RetirementAge, c2RetirementAge);
    const c1MortalityAge = parseFloat(clientData.assumptions.c1MortalityAge) || parseFloat(clientData.assumptions.mortalityAge) || 90;
    const c2MortalityAge = clientData.isMarried ? (parseFloat(clientData.assumptions.c2MortalityAge) || parseFloat(clientData.assumptions.mortalityAge) || 90) : c1MortalityAge;
    const maxTimelineAge = clientData.isMarried ? Math.max(c1MortalityAge, c2MortalityAge) : c1MortalityAge;

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

    // Calculate retirement timeline
    const c1YearsToRetirement = c1RetirementAge - c1Age;
    const c2YearsToRetirement = clientData.isMarried ? c2RetirementAge - c2Age : Infinity;
    const firstRetirementYears = Math.min(c1YearsToRetirement, c2YearsToRetirement);
    const firstClientIsC1 = c1YearsToRetirement <= c2YearsToRetirement;
    const firstRetirementAge = firstClientIsC1 ? c1RetirementAge : c2RetirementAge;
    const firstCurrentAge = firstClientIsC1 ? c1Age : c2Age;

    // Parse assumptions
    const inflation = parseFloat(clientData.assumptions.inflation) / 100 || 0.02;
    const rorRetirement = parseFloat(clientData.assumptions.rorRetirement) / 100 || 0.04;

    // Determine income needs
    let monthlyNeed;
    const incomeNeedsType = clientData.incomeNeeds?.type || 'dollar';
    if (incomeNeedsType === 'percent') {
      const c1Employment = parseFloat(clientData.client1.incomeSources.employment) || 0;
      const c2Employment = clientData.isMarried ? parseFloat(clientData.client2.incomeSources.employment) || 0 : 0;
      const totalEmployment = (c1Employment + c2Employment) / 12;
      const incomePercent = parseFloat(clientData.incomeNeeds.incomePercent) || 80;
      monthlyNeed = (incomePercent / 100) * totalEmployment;
    } else {
      monthlyNeed = parseFloat(clientData.incomeNeeds.monthly) || 5000;
    }

    // Parse adjustments
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

    // Adjust monthly need for inflation
    const yearsToRetirement = startAge - c1Age;
    monthlyNeed *= Math.pow(1 + inflation, yearsToRetirement);

    // Define income goals
    const incomeGoals = [
      { age: c1RetirementAge, percentage: 100, amount: Math.round(monthlyNeed) },
      { age: c1RetirementAge + adjustment1Years, percentage: (adjustment1Amount / monthlyNeed) * 100, amount: Math.round(adjustment1Amount) },
      { age: c1RetirementAge + adjustment2Years, percentage: (adjustment2Amount / monthlyNeed) * 100, amount: Math.round(adjustment2Amount) }
    ].filter(goal => goal.age <= maxTimelineAge);

    // Define income sources
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
    const capitalAccounts = [];
    let totalCapital = 0;
    const clients = [clientData.client1, clientData.isMarried ? clientData.client2 : null];
    clients.forEach((client, idx) => {
      if (!client) return;
      const clientAge = idx === 0 ? c1Age : c2Age;
      const clientRetirementAge = idx === 0 ? c1RetirementAge : c2RetirementAge;
      const yearsToClientRetirement = Math.min(clientRetirementAge - clientAge, firstRetirementYears);

      (client.accounts || []).forEach(account => {
        const balance = parseFloat(account.balance) || 0;
        const annualContribution = parseFloat(account.contribution) || 0;
        const monthlyContribution = annualContribution / 12;
        const employmentIncome = parseFloat(client.incomeSources.employment) || 0;
        const employerMatchPercent = parseFloat(account.employerMatch) / 100 || 0;
        const annualEmployerMatch = employerMatchPercent * employmentIncome;
        const monthlyEmployerMatch = annualEmployerMatch / 12;
        const ror = parseFloat(account.ror) / 100 || 0.06;

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
          capitalAccounts.push({
            name: `${client.personal.name || (idx === 0 ? 'Client 1' : 'Client 2')}'s ${account.name || 'Retirement Account'}`,
            balances: yearlyBalances,
            isClient1: idx === 0
          });
          totalCapital += yearlyBalances[yearlyBalances.length - 1];
        }
      });
    });

    // Calculate alternatives
    const monthlySources = incomeSources.reduce((sum, src) => sum + (src.amount || 0), 0);
    let additionalMonthlySavings = 0;
    let saveMorePercent = 0;
    let targetROR = rorRetirement;
    let reducedMonthlyNeed = monthlyNeed;
    let newRetirementAge = c1RetirementAge;

    if (incomeData.depletionAge < maxTimelineAge) {
      // Save More
      const shortfallValues = incomeData.shortfallData.slice(1);
      let totalShortfall = 0;
      for (let i = 0; i < shortfallValues.length; i++) {
        if (shortfallValues[i] > 0) {
          totalShortfall += shortfallValues[i] / Math.pow(1 + rorRetirement, i);
        }
      }
      const monthsToRetirement = yearsToRetirement * 12;
      const avgROR = clients.reduce((sum, client) => {
        if (!client) return sum;
        return sum + (client.accounts || []).reduce((s, a) => s + (parseFloat(a.ror) / 100 || 0.06), 0) / (client.accounts?.length || 1);
      }, 0) / (clients.filter(c => c).length || 1);
      const monthlyROR = avgROR / 12;
      additionalMonthlySavings = monthsToRetirement > 0 && monthlyROR > 0 ?
        totalShortfall / ((Math.pow(1 + monthlyROR, monthsToRetirement) - 1) / monthlyROR * (1 + monthlyROR)) :
        monthsToRetirement > 0 ? totalShortfall / monthsToRetirement : 0;
      additionalMonthlySavings = Math.round(additionalMonthlySavings);
      const currentSavings = parseFloat(clientData.savingsExpenses?.monthlySavings) || 0;
      const baseAmount = currentSavings > 0 ? currentSavings :
        ((parseFloat(clientData.client1.incomeSources.employment) || 0) + (clientData.isMarried ? parseFloat(clientData.client2.incomeSources.employment) || 0 : 0)) / 12;
      saveMorePercent = baseAmount > 0 ? (additionalMonthlySavings / baseAmount) * 100 : 0;
      saveMorePercent = Math.min(saveMorePercent, 100);

      // Increase ROR
      let low = rorRetirement;
      let high = 0.2;
      for (let i = 0; i < 20; i++) {
        const mid = (low + high) / 2;
        let tempBalance = incomeData.totalBalance;
        for (let j = 0; j < maxTimelineAge - c1RetirementAge; j++) {
          let currentNeed = (j >= adjustment2Years && adjustment2Years > 0 ? adjustment2Amount :
                             j >= adjustment1Years && adjustment1Years > 0 ? adjustment1Amount :
                             monthlyNeed) * Math.pow(1 + inflation, j) - monthlySources;
          tempBalance = tempBalance * Math.pow(1 + mid / 12, 12) - (currentNeed > 0 ? currentNeed * 12 : 0);
          if (tempBalance <= 0) break;
        }
        if (tempBalance > 0) high = mid;
        else low = mid;
      }
      targetROR = (low + high) / 2;

      // Reduce Income Needs
      low = 0;
      high = monthlyNeed;
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

      // Delay Retirement
      const yearsNeeded = maxTimelineAge - incomeData.depletionAge;
      newRetirementAge = Math.ceil(c1RetirementAge + yearsNeeded);
      if (newRetirementAge > maxTimelineAge) newRetirementAge = maxTimelineAge;
    }

    // Calculate percentages for alternatives graph
    const currentRORs = [];
    clients.forEach(client => {
      if (!client) return;
      (client.accounts || []).forEach(account => {
        currentRORs.push(parseFloat(account.ror) / 100 || 0.06);
      });
    });
    const avgCurrentROR = currentRORs.length > 0 ? currentRORs.reduce((sum, ror) => sum + ror, 0) / currentRORs.length : 0.06;
    const rorIncreasePercent = avgCurrentROR > 0 ? ((targetROR - avgCurrentROR) / avgCurrentROR) * 100 : 0;
    const cappedRorIncreasePercent = Math.min(rorIncreasePercent, 100);
    const reductionPercent = monthlyNeed > 0 ? ((monthlyNeed - reducedMonthlyNeed) / monthlyNeed) * 100 : 0;
    const cappedReductionPercent = Math.min(reductionPercent, 100);
    const originalYearsToRetirement = c1RetirementAge - c1Age;
    const additionalYears = newRetirementAge - c1RetirementAge;
    const retirementDelayPercent = originalYearsToRetirement > 0 ? (additionalYears / originalYearsToRetirement) * 100 : 0;
    const cappedRetirementDelayPercent = Math.min(retirementDelayPercent, 100);

    // Define report options
    const reportOptions = [
      { id: 'output-graph', label: 'Retirement Analysis', reportId: 'report-graph', title: 'Retirement Income Graph' },
      { id: 'report-social-security-optimizer', label: 'Social Security Optimizer', reportId: 'report-social-security-optimizer', title: 'Social Security Optimizer' },
      { id: 'report-capital-available', label: 'Capital Available at Retirement', reportId: 'report-capital-available', title: 'Capital Available at Retirement' },
      { id: 'output-alternatives', label: 'Alternatives to Achieving Retirement Goals', reportId: 'report-alternatives-retirement', title: 'Retirement Alternatives' },
      { id: 'output-timeline', label: 'Retirement Timeline', reportId: 'report-retirement-timeline', title: 'Retirement Income Timeline' },
      { id: 'report-retirement-fact-finder', label: 'Fact Finder', reportId: 'report-retirement-fact-finder', title: 'Retirement Fact Finder' }
    ];

    // Preserve current selection
    const select = document.getElementById('output-select');
    const currentSelection = select?.value || 'output-graph';

    // Render UI
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
            <input type="checkbox" id="add-to-presentation" data-report="${reportOptions.find(opt => opt.id === currentSelection)?.reportId}" data-title="${reportOptions.find(opt => opt.id === currentSelection)?.title}" ${selectedReports.some(r => r.id === reportOptions.find(opt => opt.id === currentSelection)?.reportId) ? 'checked' : ''}>
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
            <input type="checkbox" id="add-to-presentation" data-report="${reportOptions.find(opt => opt.id === currentSelection)?.reportId}" data-title="${reportOptions.find(opt => opt.id === currentSelection)?.title}" ${selectedReports.some(r => r.id === reportOptions.find(opt => opt.id === currentSelection)?.reportId) ? 'checked' : ''}>
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

    // Setup interactions
    setupOutputControls(reportOptions, selectedReports, clientData, Chart, getAge, {
      incomeData,
      capitalAccounts,
      firstRetirementYears,
      firstCurrentAge,
      firstClientIsC1,
      saveMorePercent,
      cappedRorIncreasePercent,
      cappedReductionPercent,
      cappedRetirementDelayPercent
    });

    // Render graphs
    if (['output-graph', 'report-capital-available', 'output-alternatives'].includes(currentSelection) && typeof Chart !== 'undefined') {
      const chartCanvasId = currentSelection === 'output-graph' ? 'analysis-chart' :
                           currentSelection === 'report-capital-available' ? 'capital-growth-chart' :
                           'alternatives-chart';
      const chartCanvas = document.getElementById(chartCanvasId);
      if (chartCanvas) {
        setTimeout(() => {
          if (currentSelection === 'output-graph') {
            updateRetirementGraph(chartCanvas, clientData, Chart, getAge);
          } else if (currentSelection === 'report-capital-available') {
            const labels = Array.from({ length: firstRetirementYears + 1 }, (_, i) => firstCurrentAge + i);
            const datasets = capitalAccounts.map(account => ({
              label: account.name,
              data: account.balances,
              backgroundColor: account.isClient1 ? '#22c55e' : '#3b82f6',
              stack: clientData.isMarried ? 'Accounts' : undefined
            }));
            const ctx = chartCanvas.getContext('2d');
            if (chartCanvas.chartInstance) {
              chartCanvas.chartInstance.destroy();
            }
            const chartInstance = new Chart(ctx, {
              type: 'bar',
              data: { labels, datasets },
              options: {
                responsive: true,
                plugins: {
                  legend: { display: true, position: 'top' },
                  title: { display: true, text: 'Capital Account Growth to First Retirement' }
                },
                scales: {
                  x: {
                    title: { display: true, text: `${firstClientIsC1 ? clientData.client1.personal.name || 'Client 1' : clientData.client2.personal.name || 'Client 2'} Age` },
                    stacked: clientData.isMarried
                  },
                  y: {
                    title: { display: true, text: 'Balance ($)' },
                    stacked: clientData.isMarried,
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

// Setup output controls
export function setupOutputControls(reportOptions, selectedReports, clientData, Chart, getAge, graphData = {}) {
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

    select.addEventListener('change', () => {
      const selectedValue = select.value;
      reportOptions.forEach(option => {
        const content = document.getElementById(option.id);
        if (content) {
          content.style.display = option.id === selectedValue ? 'block' : 'none';
          content.classList.toggle('active', option.id === selectedValue);
        }
      });

      updateCheckboxState();

      if (['output-graph', 'report-capital-available', 'output-alternatives'].includes(selectedValue) && typeof Chart !== 'undefined') {
        const chartCanvasId = selectedValue === 'output-graph' ? 'analysis-chart' :
                             selectedValue === 'report-capital-available' ? 'capital-growth-chart' :
                             'alternatives-chart';
        const chartCanvas = document.getElementById(chartCanvasId);
        if (chartCanvas) {
          setTimeout(() => {
            if (selectedValue === 'output-graph') {
              updateRetirementGraph(chartCanvas, clientData, Chart, getAge);
            } else if (selectedValue === 'report-capital-available') {
              const { capitalAccounts, firstRetirementYears, firstCurrentAge, firstClientIsC1 } = graphData;
              const labels = Array.from({ length: (firstRetirementYears || 0) + 1 }, (_, i) => (firstCurrentAge || 0) + i);
              const datasets = (capitalAccounts || []).map(account => ({
                label: account.name,
                data: account.balances,
                backgroundColor: account.isClient1 ? '#22c55e' : '#3b82f6',
                stack: clientData.isMarried ? 'Accounts' : undefined
              }));
              const ctx = chartCanvas.getContext('2d');
              if (chartCanvas.chartInstance) {
                chartCanvas.chartInstance.destroy();
              }
              const chartInstance = new Chart(ctx, {
                type: 'bar',
                data: { labels, datasets },
                options: {
                  responsive: true,
                  plugins: {
                    legend: { display: true, position: 'top' },
                    title: { display: true, text: 'Capital Account Growth to First Retirement' }
                  },
                  scales: {
                    x: {
                      title: { display: true, text: `${firstClientIsC1 ? clientData.client1.personal.name || 'Client 1' : clientData.client2.personal.name || 'Client 2'} Age` },
                      stacked: clientData.isMarried
                    },
                    y: {
                      title: { display: true, text: 'Balance ($)' },
                      stacked: clientData.isMarried,
                      beginAtZero: true
                    }
                  }
                }
              });
              chartCanvas.chartInstance = chartInstance;
            } else if (selectedValue === 'output-alternatives') {
              const { saveMorePercent, cappedRorIncreasePercent, cappedReductionPercent, cappedRetirementDelayPercent } = graphData;
              updateAlternativesGraph(chartCanvas, saveMorePercent || 0, cappedRorIncreasePercent || 0, cappedReductionPercent || 0, cappedRetirementDelayPercent || 0, Chart);
            }
          }, 100);
        }
      }
    });

    checkbox.addEventListener('change', () => {
      const reportId = checkbox.dataset.report;
      const title = checkbox.dataset.title;
      if (checkbox.checked) {
        if (!selectedReports.some(r => r.id === reportId)) {
          selectedReports.push({ id: reportId, title });
        }
      } else {
        const index = selectedReports.findIndex(r => r.id === reportId);
        if (index !== -1) {
          selectedReports.splice(index, 1);
        }
      }
    });
  } catch (error) {
    console.error('Error in setupOutputControls:', error);
  }
}
