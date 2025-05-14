document.addEventListener('DOMContentLoaded', () => {
  // Load header
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const navLinks = document.querySelectorAll('nav ul li a');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
          link.classList.add('active');
        }
      });
      const profilePic = document.getElementById('profile-pic');
      const dropdownMenu = document.getElementById('dropdown-menu');
      if (profilePic && dropdownMenu) {
        profilePic.addEventListener('click', () => {
          dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
        document.addEventListener('click', (e) => {
          if (!profilePic.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.style.display = 'none';
          }
        });
      }
    })
    .catch(error => console.error('Error loading header:', error));

  // Calculator data
  const calculators = {
    'Borrowing': [
      { id: 'mortgage', name: 'Mortgage Calculator' },
      { id: 'auto-loan', name: 'Auto Loan Calculator' }
    ],
    'Discussing Organization': [
      { id: 'business-loan', name: 'Business Loan Calculator' }
    ],
    'Education Funding': [
      { id: 'student-loan', name: 'Student Loan Calculator' }
    ],
    'Estate Planning': [
      { id: 'estate-tax', name: 'Estate Tax Calculator' }
    ],
    'Health and Medical': [
      { id: 'medical-expense', name: 'Medical Expense Calculator' }
    ],
    'Income Taxes': [
      { id: 'tax-bracket', name: 'Tax Bracket Calculator' }
    ],
    'Investments': [
      { id: 'investment-return', name: 'Investment Return Calculator' }
    ],
    'Life Insurance': [
      { id: 'life-insurance', name: 'Life Insurance Needs Calculator' }
    ],
    'Personal Finance': [
      { id: 'budget-planner', name: 'Budget Planner' },
      { id: 'future-value', name: 'Future Value of a Single Sum and Periodic Additions' }
    ],
    'Retirement Planning': [
      { id: 'retirement-savings', name: 'Retirement Savings Calculator' }
    ]
  };

  // Tab definitions
  const calculatorTabs = [
    { id: 'inputs', label: 'Inputs' },
    { id: 'outputs', label: 'Outputs' }
  ];

  // Populate calculator dropdown
  const select = document.getElementById('calculator-topic-select');
  Object.keys(calculators).forEach(category => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = category;
    calculators[category].forEach(calc => {
      const option = document.createElement('option');
      option.value = calc.id;
      option.textContent = calc.name;
      optgroup.appendChild(option);
    });
    select.appendChild(optgroup);
  });

  // Load calculator content
  select.addEventListener('change', (e) => {
    const calcId = e.target.value;
    loadCalculator(calcId);
  });

  function loadCalculator(calcId) {
    const tabsContainer = document.getElementById('calculator-tabs');
    tabsContainer.innerHTML = `
      <div class="tab-list">
        ${calculatorTabs.map(tab => `
          <button class="tab-button ${tab.id === 'inputs' ? 'active' : ''}" data-tab="${tab.id}">${tab.label}</button>
        `).join('')}
      </div>
      ${calculatorTabs.map(tab => `
        <div class="tab-content ${tab.id === 'inputs' ? 'active' : ''}" id="${tab.id}">
          <div class="output-card">
            <h3>${tab.label}</h3>
            <div id="${tab.id}-content"></div>
          </div>
        </div>
      `).join('')}
    `;

    // Setup tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
        updateTabContent(calcId, tabId);
      });
    });

    // Load initial content
    updateTabContent(calcId, 'inputs');
  }

  function updateTabContent(calcId, tabId) {
    const contentDiv = document.getElementById(`${tabId}-content`);
    if (calcId === 'mortgage') {
      if (tabId === 'inputs') {
        contentDiv.innerHTML = `
          <div class="input-container">
            <form id="mortgage-form">
              <label>Loan Amount ($):<input type="number" id="loan-amount" name="loan-amount" value="200000" required></label>
              <label>Interest Rate (%):<input type="number" id="interest-rate" name="interest-rate" step="0.01" value="4.5" required></label>
              <label>Loan Term (years):<input type="number" id="loan-term" name="loan-term" value="30" required></label>
              <button type="button" id="recalculate-btn">Recalculate</button>
            </form>
          </div>
        `;
        document.getElementById('recalculate-btn').addEventListener('click', () => {
          calculateMortgage();
          document.querySelector('.tab-button[data-tab="outputs"]').click();
        });
      } else if (tabId === 'outputs') {
        calculateMortgage();
      }
    } else if (calcId === 'future-value') {
      if (tabId === 'inputs') {
        contentDiv.innerHTML = `
          <div class="input-container">
            <form id="future-value-form">
              <label>Initial Investment ($):<input type="number" id="initial-investment" name="initial-investment" value="10000" step="0.01" required></label>
              <label>Periodic Contribution ($):<input type="number" id="periodic-contribution" name="periodic-contribution" value="500" step="0.01" required></label>
              <label>Contribution Frequency:<select id="contribution-frequency" name="contribution-frequency">
                <option value="12">Monthly</option>
                <option value="4">Quarterly</option>
                <option value="1">Annually</option>
              </select></label>
              <label>Annual Interest Rate (%):<input type="number" id="interest-rate" name="interest-rate" value="5" step="0.01" required></label>
              <label>Time Period (years):<input type="number" id="time-period" name="time-period" value="10" required></label>
              <label>Compounding Frequency:<select id="compounding-frequency" name="compounding-frequency">
                <option value="12">Monthly</option>
                <option value="4">Quarterly</option>
                <option value="1">Annually</option>
              </select></label>
              <button type="button" id="recalculate-btn">Recalculate</button>
            </form>
          </div>
        `;
        document.getElementById('recalculate-btn').addEventListener('click', () => {
          calculateFutureValue();
          document.querySelector('.tab-button[data-tab="outputs"]').click();
        });
      } else if (tabId === 'outputs') {
        calculateFutureValue();
      }
    } else {
      contentDiv.innerHTML = `<p>Select a calculator to begin.</p>`;
    }
  }

  function calculateMortgage() {
    const contentDiv = document.getElementById('outputs-content');
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
    const loanTerm = parseInt(document.getElementById('loan-term').value) * 12;

    const monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / 
                          (Math.pow(1 + interestRate, loanTerm) - 1);
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;

    contentDiv.innerHTML = `
      <table class="output-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monthly Payment</td>
            <td>$${monthlyPayment.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total Payment</td>
            <td>$${totalPayment.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total Interest</td>
            <td>$${totalInterest.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <canvas id="mortgage-chart"></canvas>
      <button id="export-graph-btn">Export Graph</button>
    `;

    const ctx = document.getElementById('mortgage-chart').getContext('2d');
    if (window.mortgageChart) window.mortgageChart.destroy();
    window.mortgageChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Principal', 'Interest'],
        datasets: [{
          data: [loanAmount, totalInterest],
          backgroundColor: ['#22c55e', '#ef4444']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Mortgage Payment Breakdown' }
        }
      }
    });

    document.getElementById('export-graph-btn').addEventListener('click', () => {
      const canvas = document.getElementById('mortgage-chart');
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'mortgage-chart.png';
      link.click();
    });
  }

  function calculateFutureValue() {
    const contentDiv = document.getElementById('outputs-content');
    const initialInvestment = parseFloat(document.getElementById('initial-investment').value);
    const periodicContribution = parseFloat(document.getElementById('periodic-contribution').value);
    const contributionFrequency = parseInt(document.getElementById('contribution-frequency').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
    const timePeriod = parseInt(document.getElementById('time-period').value);
    const compoundingFrequency = parseInt(document.getElementById('compounding-frequency').value);

    const ratePerPeriod = interestRate / compoundingFrequency;
    const totalPeriods = timePeriod * compoundingFrequency;
    const fvInitial = initialInvestment * Math.pow(1 + ratePerPeriod, totalPeriods);

    let fvContributions = 0;
    if (periodicContribution > 0 && contributionFrequency > 0) {
      const contributionRate = interestRate / contributionFrequency;
      const totalContributionPeriods = timePeriod * contributionFrequency;
      fvContributions = periodicContribution * (Math.pow(1 + contributionRate, totalContributionPeriods) - 1) / contributionRate;
      if (contributionFrequency !== compoundingFrequency) {
        const periodsPerContribution = compoundingFrequency / contributionFrequency;
        fvContributions *= Math.pow(1 + ratePerPeriod, periodsPerContribution);
      }
    }

    const totalFutureValue = fvInitial + fvContributions;
    const totalPrincipal = initialInvestment + (periodicContribution * timePeriod * contributionFrequency);
    const totalInterest = totalFutureValue - totalPrincipal;

    contentDiv.innerHTML = `
      <table class="output-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Future Value</td>
            <td>$${totalFutureValue.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total Contributions</td>
            <td>$${totalPrincipal.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total Interest</td>
            <td>$${totalInterest.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <canvas id="future-value-chart"></canvas>
      <button id="export-graph-btn">Export Graph</button>
    `;

    const ctx = document.getElementById('future-value-chart').getContext('2d');
    if (window.fvChart) window.fvChart.destroy();
    window.fvChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Principal', 'Interest'],
        datasets: [{
          data: [totalPrincipal, totalInterest],
          backgroundColor: ['#22c55e', '#ef4444']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Future Value Breakdown' }
        }
      }
    });

    document.getElementById('export-graph-btn').addEventListener('click', () => {
      const canvas = document.getElementById('future-value-chart');
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'future-value-chart.png';
      link.click();
    });
  }

  // Initialize with no calculator selected
  loadCalculator('');
});
