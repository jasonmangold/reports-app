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
    const workspace = document.getElementById('calculator-workspace');
    if (calcId === 'mortgage') {
      workspace.innerHTML = `
        <div class="client-inputs">
          <h3>Client Inputs</h3>
          <div class="input-container">
            <form id="mortgage-form">
              <label for="loan-amount">Loan Amount ($):</label>
              <input type="number" id="loan-amount" name="loan-amount" value="200000" required>
              <label for="interest-rate">Interest Rate (%):</label>
              <input type="number" id="interest-rate" name="interest-rate" step="0.01" value="4.5" required>
              <label for="loan-term">Loan Term (years):</label>
              <input type="number" id="loan-term" name="loan-term" value="30" required>
            </form>
          </div>
        </div>
        <div class="graph-outputs">
          <h3>Analysis Outputs</h3>
          <canvas id="mortgage-chart"></canvas>
          <div id="mortgage-result"></div>
          <button id="recalculate-btn">Recalculate</button>
          <button id="export-graph-btn">Export Graph</button>
        </div>
      `;
      calculateMortgage();
      document.getElementById('recalculate-btn').addEventListener('click', calculateMortgage);
      document.getElementById('export-graph-btn').addEventListener('click', () => {
        const canvas = document.getElementById('mortgage-chart');
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'mortgage-chart.png';
        link.click();
      });
    } else if (calcId === 'future-value') {
      workspace.innerHTML = `
        <div class="client-inputs">
          <h3>Client Inputs</h3>
          <div class="input-container">
            <form id="future-value-form">
              <label for="initial-investment">Initial Investment ($):</label>
              <input type="number" id="initial-investment" name="initial-investment" value="10000" step="0.01" required>
              <label for="periodic-contribution">Periodic Contribution ($):</label>
              <input type="number" id="periodic-contribution" name="periodic-contribution" value="500" step="0.01" required>
              <label for="contribution-frequency">Contribution Frequency:</label>
              <select id="contribution-frequency" name="contribution-frequency">
                <option value="12">Monthly</option>
                <option value="4">Quarterly</option>
                <option value="1">Annually</option>
              </select>
              <label for="interest-rate">Annual Interest Rate (%):</label>
              <input type="number" id="interest-rate" name="interest-rate" value="5" step="0.01" required>
              <label for="time-period">Time Period (years):</label>
              <input type="number" id="time-period" name="time-period" value="10" required>
              <label for="compounding-frequency">Compounding Frequency:</label>
              <select id="compounding-frequency" name="compounding-frequency">
                <option value="12">Monthly</option>
                <option value="4">Quarterly</option>
                <option value="1">Annually</option>
              </select>
            </form>
          </div>
        </div>
        <div class="graph-outputs">
          <h3>Analysis Outputs</h3>
          <canvas id="future-value-chart"></canvas>
          <div id="future-value-result"></div>
          <button id="recalculate-btn">Recalculate</button>
          <button id="export-graph-btn">Export Graph</button>
        </div>
      `;
      calculateFutureValue();
      document.getElementById('recalculate-btn').addEventListener('click', calculateFutureValue);
      document.getElementById('export-graph-btn').addEventListener('click', () => {
        const canvas = document.getElementById('future-value-chart');
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'future-value-chart.png';
        link.click();
      });
    } else {
      workspace.innerHTML = `<p>Select a calculator to begin.</p>`;
    }
  }

  function calculateMortgage() {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
    const loanTerm = parseInt(document.getElementById('loan-term').value) * 12;

    const monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / 
                          (Math.pow(1 + interestRate, loanTerm) - 1);
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;

    document.getElementById('mortgage-result').innerHTML = `
      <p>Monthly Payment: $${monthlyPayment.toFixed(2)}</p>
      <p>Total Payment: $${totalPayment.toFixed(2)}</p>
      <p>Total Interest: $${totalInterest.toFixed(2)}</p>
    `;

    const ctx = document.getElementById('mortgage-chart').getContext('2d');
    if (window.mortgageChart) window.mortgageChart.destroy();
    window.mortgageChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Principal', 'Interest'],
        datasets: [{
          data: [loanAmount, totalInterest],
          backgroundColor: ['#005ea2', '#ff6f61']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
  }

  function calculateFutureValue() {
    const initialInvestment = parseFloat(document.getElementById('initial-investment').value);
    const periodicContribution = parseFloat(document.getElementById('periodic-contribution').value);
    const contributionFrequency = parseInt(document.getElementById('contribution-frequency').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
    const timePeriod = parseInt(document.getElementById('time-period').value);
    const compoundingFrequency = parseInt(document.getElementById('compounding-frequency').value);

    // Calculate effective interest rate and number of periods
    const ratePerPeriod = interestRate / compoundingFrequency;
    const totalPeriods = timePeriod * compoundingFrequency;

    // Future value of initial investment (compound interest)
    const fvInitial = initialInvestment * Math.pow(1 + ratePerPeriod, totalPeriods);

    // Future value of periodic contributions (annuity formula)
    const periodsPerContribution = compoundingFrequency / contributionFrequency;
    let fvContributions = 0;
    if (periodicContribution > 0 && contributionFrequency > 0) {
      const contributionRate = interestRate / contributionFrequency;
      const totalContributionPeriods = timePeriod * contributionFrequency;
      fvContributions = periodicContribution * (Math.pow(1 + contributionRate, totalContributionPeriods) - 1) / contributionRate;
      // Adjust for different compounding and contribution frequencies
      if (contributionFrequency !== compoundingFrequency) {
        fvContributions *= Math.pow(1 + ratePerPeriod, periodsPerContribution);
      }
    }

    // Total future value
    const totalFutureValue = fvInitial + fvContributions;
    const totalPrincipal = initialInvestment + (periodicContribution * timePeriod * contributionFrequency);
    const totalInterest = totalFutureValue - totalPrincipal;

    // Display results
    document.getElementById('future-value-result').innerHTML = `
      <p>Future Value: $${totalFutureValue.toFixed(2)}</p>
      <p>Total Contributions: $${totalPrincipal.toFixed(2)}</p>
      <p>Total Interest: $${totalInterest.toFixed(2)}</p>
    `;

    // Create pie chart
    const ctx = document.getElementById('future-value-chart').getContext('2d');
    if (window.fvChart) window.fvChart.destroy();
    window.fvChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Principal', 'Interest'],
        datasets: [{
          data: [totalPrincipal, totalInterest],
          backgroundColor: ['#005ea2', '#ff6f61']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
  }

  // Initialize with no calculator selected
  loadCalculator('');
});
