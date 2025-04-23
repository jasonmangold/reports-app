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

    // Calculate total capital at retirement
    let totalBalance = 0;
    const accounts = [...clientData.client1.accounts];
    if (clientData.isMarried) accounts.push(...clientData.client2.accounts);

    accounts.forEach(account => {
      const balance = parseFloat(account.balance) || 0;
      const contribution = parseFloat(account.contribution) || 0;
      const employerMatch = parseFloat(account.employerMatch) / 100 || 0;
      const ror = parseFloat(account.ror) / 100 || 0.06;
      const yearsToRetirement = startAge - c1Age;

      // Future value of current balance
      const fvBalance = balance * Math.pow(1 + ror, yearsToRetirement);

      // Future value of contributions (including employer match)
      const totalContribution = contribution * (1 + employerMatch);
      const fvContributions = totalContribution * (Math.pow(1 + ror, yearsToRetirement) - 1) / ror;

      totalBalance += fvBalance + fvContributions;
    });

    result.totalBalance = totalBalance;

    // Calculate annual income needs and sources from retirement to mortality
    const c1SocialSecurity = parseFloat(clientData.client1.incomeSources.socialSecurity) * 12 || 0;
    const c2SocialSecurity = clientData.isMarried ? parseFloat(clientData.client2.incomeSources.socialSecurity) * 12 || 0 : 0;
    const c1OtherIncome = parseFloat(clientData.client1.incomeSources.other) * 12 || 0;
    const c2OtherIncome = clientData.isMarried ? parseFloat(clientData.client2.incomeSources.other) * 12 || 0 : 0;

    let currentBalance = totalBalance;
    let depletionAge = mortalityAge;

    for (let age = startAge; age <= mortalityAge; age++) {
      result.labels.push(age);

      // Adjust income need for inflation
      const annualNeed = monthlyNeed * 12 * Math.pow(1 + inflation, age - startAge);

      // Income sources
      const socialSecurity = c1SocialSecurity + c2SocialSecurity;
      const otherIncome = c1OtherIncome + c2OtherIncome;
      result.socialSecurityData.push(socialSecurity);
      result.otherIncomeData.push(otherIncome);

      // Calculate required withdrawal from capital
      const totalIncome = socialSecurity + otherIncome;
      const shortfall = annualNeed - totalIncome;
      let withdrawal = 0;

      if (shortfall > 0 && currentBalance > 0) {
        // Calculate sustainable withdrawal using remaining years
        const yearsRemaining = mortalityAge - age + 1;
        const adjustedRor = (rorRetirement - inflation) / (1 + inflation);
        const withdrawalRate = yearsRemaining > 0 ? (1 - Math.pow(1 + adjustedRor, -yearsRemaining)) / currentBalance : 0;
        withdrawal = Math.min(shortfall, currentBalance * withdrawalRate);
        currentBalance -= withdrawal;
        currentBalance *= (1 + rorRetirement);
      }

      result.capitalData.push(withdrawal);
      result.shortfallData.push(Math.max(0, shortfall - withdrawal));

      if (currentBalance <= 0 && depletionAge === mortalityAge) {
        depletionAge = age;
      }
    }

    result.depletionAge = depletionAge;

  } catch (error) {
    console.error('Error in calculateRetirementIncome:', error);
  }

  return result;
}

// Update retirement graph
export function updateRetirementGraph(canvas, clientData, Chart) {
  try {
    const data = calculateRetirementIncome(clientData, getAge);
    if (!data.labels.length) {
      canvas.style.display = 'none';
      const placeholder = document.querySelector('.graph-placeholder') || document.createElement('div');
      placeholder.className = 'graph-placeholder';
      placeholder.textContent = 'Please enter valid client data to view the retirement accumulation graph.';
      canvas.parentNode.appendChild(placeholder);
      return null;
    }

    canvas.style.display = 'block';
    const placeholder = document.querySelector('.graph-placeholder');
    if (placeholder) placeholder.remove();

    return new Chart(canvas, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Social Security ($)',
            data: data.socialSecurityData,
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            stack: 'Stack 0'
          },
          {
            label: 'Other Income ($)',
            data: data.otherIncomeData,
            backgroundColor: 'rgba(34, 197, 94, 0.5)',
            stack: 'Stack 0'
          },
          {
            label: 'Capital Withdrawals ($)',
            data: data.capitalData,
            backgroundColor: 'rgba(249, 115, 22, 0.5)',
            stack: 'Stack 0'
          },
          {
            label: 'Income Shortfall ($)',
            data: data.shortfallData,
            backgroundColor: 'rgba(239, 68, 68, 0.5)',
            stack: 'Stack 0'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Retirement Income Sources by Age',
            font: { size: 16 }
          },
          legend: { position: 'top' }
        },
        scales: {
          x: {
            title: { display: true, text: 'Age' }
          },
          y: {
            title: { display: true, text: 'Annual Income ($)' },
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Error in updateRetirementGraph:', error);
    return null;
  }
}

// Update retirement outputs
export function updateRetirementOutputs(container, clientData, formatCurrency, getAge) {
  try {
    const data = calculateRetirementIncome(clientData, getAge);
    container.innerHTML = '';

    if (!data.labels.length) {
      container.innerHTML = `<p class="output-card">Please enter valid client data to view retirement accumulation outputs.</p>`;
      return;
    }

    const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
    const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
    const startAge = Math.max(c1RetirementAge, c2RetirementAge);
    const mortalityAge = parseFloat(clientData.assumptions.mortalityAge) || 90;

    // Summary card
    const summaryCard = document.createElement('div');
    summaryCard.className = 'output-card';
    summaryCard.innerHTML = `
      <h3>Retirement Summary</h3>
      <p>Total Capital at Retirement (Age ${startAge}): ${formatCurrency(data.totalBalance)}</p>
      <p>Funds Depletion Age: ${data.depletionAge}</p>
      <div class="depletion-progress">
        <progress value="${data.depletionAge - startAge}" max="${mortalityAge - startAge}"></progress>
      </div>
      <p class="disclaimer">Note: Assumes inflation and ROR during retirement as provided. Actual results may vary.</p>
    `;
    container.appendChild(summaryCard);

    // Timeline card
    const timelineCard = document.createElement('div');
    timelineCard.className = 'output-card';
    let timelineRows = '';
    data.labels.forEach((age, i) => {
      timelineRows += `
        <tr>
          <td>${age}</td>
          <td>${formatCurrency(data.socialSecurityData[i])}</td>
          <td>${formatCurrency(data.otherIncomeData[i])}</td>
          <td>${formatCurrency(data.capitalData[i])}</td>
          <td>${formatCurrency(data.shortfallData[i])}</td>
        </tr>
      `;
    });
    timelineCard.innerHTML = `
      <h3>Retirement Income Timeline</h3>
      <table class="timeline-table">
        <thead>
          <tr>
            <th>Age</th>
            <th>Social Security</th>
            <th>Other Income</th>
            <th>Capital Withdrawals</th>
            <th>Shortfall</th>
          </tr>
        </thead>
        <tbody>${timelineRows}</tbody>
      </table>
    `;
    container.appendChild(timelineCard);

    // Alternatives card
    const alternativesCard = document.createElement('div');
    alternativesCard.className = 'output-card';
    alternativesCard.innerHTML = `
      <h3>Alternatives to Reduce Shortfall</h3>
      <ul class="alternatives-list">
        <li><strong>Increase Contributions:</strong> Increasing annual contributions to retirement accounts can boost capital.</li>
        <li><strong>Delay Retirement:</strong> Working additional years can increase savings and reduce withdrawal period.</li>
        <li><strong>Adjust Income Needs:</strong> Reducing monthly income needs can lower shortfall.</li>
        <li><strong>Optimize Investments:</strong> Higher ROR through diversified investments may improve returns.</li>
      </ul>
    `;
    container.appendChild(alternativesCard);

  } catch (error) {
    console.error('Error in updateRetirementOutputs:', error);
    container.innerHTML = `<p class="output-card">An error occurred while generating outputs.</p>`;
  }
}

// Helper function to calculate age (repeated here for completeness)
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
