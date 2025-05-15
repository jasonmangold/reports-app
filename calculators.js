let currentCalculator = 'mortgage';
let reportCount = 0;

// Calculator data
const calculators = {
  'Borrowing': [
    { id: 'mortgage', name: 'Mortgage Calculator' },
    { id: 'auto-loan', name: 'Auto Loan Calculator' }
  ],
  'Personal Finance': [
    { id: 'future-value', name: 'Future Value of a Single Sum and Periodic Additions' }
  ]
};

// DOM elements
const calculatorSidebar = document.getElementById('calculator-sidebar');
const inputContent = document.querySelector('.input-content');
const analysisOutputs = document.getElementById('analysis-outputs');
const presentationCount = document.getElementById('presentation-count');
let chartInstance = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('Initializing calculators...');
    populateCalculatorSidebar();
    updateTabContent(currentCalculator);
    updateOutputContent(currentCalculator);
    setupEventDelegation();
  } catch (error) {
    console.error('Initialization error:', error);
  }
});

// Populate calculator sidebar
function populateCalculatorSidebar() {
  try {
    calculatorSidebar.innerHTML = '';
    Object.keys(calculators).forEach(category => {
      const folder = document.createElement('div');
      folder.className = 'sidebar-folder';
      folder.innerHTML = `<h3 class="folder-title">${category}</h3>`;
      const calcList = document.createElement('ul');
      calcList.className = 'calc-list';
      calculators[category].forEach(calc => {
        const li = document.createElement('li');
        li.className = 'calc-item';
        li.dataset.calcId = calc.id;
        li.textContent = calc.name;
        if (calc.id === currentCalculator) li.classList.add('selected');
        calcList.appendChild(li);
      });
      folder.appendChild(calcList);
      calculatorSidebar.appendChild(folder);
    });

    // Add event listeners to calculator items
    document.querySelectorAll('.calc-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const calcId = e.target.dataset.calcId;
        currentCalculator = calcId;
        updateTabContent(calcId);
        updateOutputContent(calcId);
        document.querySelectorAll('.calc-item').forEach(i => i.classList.remove('selected'));
        e.target.classList.add('selected');
      });
    });
  } catch (error) {
    console.error('Error in populateCalculatorSidebar:', error);
  }
}

// Update input content for calculators
function updateTabContent(calcId) {
  try {
    inputContent.innerHTML = '';
    if (calcId === 'mortgage') {
      inputContent.innerHTML = `
        <div class="input-container">
          <h3>Inputs</h3>
          <form id="mortgage-form">
            <label>Loan Amount ($):<input type="number" id="loan-amount" name="loan-amount" value="200000" step="1000" min="0" required></label>
            <label>Interest Rate (%):<input type="number" id="interest-rate" name="interest-rate" step="0.01" value="4.5" min="0" required></label>
            <label>Loan Term (years):<input type="number" id="loan-term" name="loan-term" value="30" min="1" required></label>
            <button type="button" id="recalculate-btn">Recalculate</button>
          </form>
        </div>
      `;
      document.getElementById('recalculate-btn').addEventListener('click', () => {
        updateOutputContent(calcId);
      });
    } else if (calcId === 'future-value') {
      inputContent.innerHTML = `
        <div class="input-container">
          <h3>Inputs</h3>
          <form id="future-value-form">
            <label>Initial Investment ($):<input type="number" id="initial-investment" name="initial-investment" value="10000" step="0.01" min="0" required></label>
            <label>Periodic Contribution ($):<input type="number" id="periodic-contribution" name="periodic-contribution" value="500" step="0.01" min="0" required></label>
            <label>Contribution Frequency:<select id="contribution-frequency" name="contribution-frequency">
              <option value="12">Monthly</option>
              <option value="4">Quarterly</option>
              <option value="1">Annually</option>
            </select></label>
            <label>Annual Interest Rate (%):<input type="number" id="interest-rate" name="interest-rate" value="5" step="0.01" min="0" required></label>
            <label>Time Period (years):<input type="number" id="time-period" name="time-period" value="10" min="1" required></label>
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
        updateOutputContent(calcId);
      });
    } else if (calcId === 'auto-loan') {
      inputContent.innerHTML = `
        <div class="input-container">
          <h3>Inputs</h3>
          <form id="auto-loan-form">
            <label>Loan Amount ($):<input type="number" id="loan-amount" name="loan-amount" value="25000" step="1000" min="0" required></label>
            <label>Interest Rate (%):<input type="number" id="interest-rate" name="interest-rate" step="0.01" value="6.0" min="0" required></label>
            <label>Loan Term (years):<input type="number" id="loan-term" name="loan-term" value="5" min="1" required></label>
            <button type="button" id="recalculate-btn">Recalculate</button>
          </form>
        </div>
      `;
      document.getElementById('recalculate-btn').addEventListener('click', () => {
        updateOutputContent(calcId);
      });
    } else {
      inputContent.innerHTML = '<p>Select a calculator to begin.</p>';
    }
  } catch (error) {
    console.error('Error in updateTabContent:', error);
    inputContent.innerHTML = '<p>Error loading calculator inputs.</p>';
  }
}

// Update output content for calculators
function updateOutputContent(calcId) {
  try {
    analysisOutputs.innerHTML = '<h3>Calculator Results</h3>';
    if (calcId === 'mortgage') {
      calculateMortgage();
    } else if (calcId === 'future-value') {
      calculateFutureValue();
    } else if (calcId === 'auto-loan') {
      calculateAutoLoan();
    } else {
      analysisOutputs.innerHTML = '<p>Select a calculator and recalculate to see results.</p>';
    }
  } catch (error) {
    console.error('Error in updateOutputContent:', error);
    analysisOutputs.innerHTML = '<p class="output-card">Error calculating results. Please check inputs.</p>';
  }
}

// Event delegation for presentation checkbox
function setupEventDelegation() {
  try {
    document.addEventListener('change', (e) => {
      if (e.target.id === 'add-to-presentation') {
        reportCount += e.target.checked ? 1 : -1;
        presentationCount.textContent = reportCount;
        presentationCount.classList.toggle('active', reportCount > 0);
      }
    });
  } catch (error) {
    console.error('Error in setupEventDelegation:', error);
  }
}

// Format currency
function formatCurrency(value) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
  } catch (error) {
    console.error('Error in formatCurrency:', error);
    return '$' + value.toFixed(0);
  }
}

// Calculator functions
function calculateMortgage() {
  try {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value) || 200000;
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12 || 0.045 / 12;
    const loanTerm = parseInt(document.getElementById('loan-term').value) * 12 || 30 * 12;

    const monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / 
                          (Math.pow(1 + interestRate, loanTerm) - 1);
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;

    analysisOutputs.innerHTML = `
      <div class="output-card">
        <h3>Mortgage Calculator Results</h3>
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
              <td>${formatCurrency(monthlyPayment)}</td>
            </tr>
            <tr>
              <td>Total Payment</td>
              <td>${formatCurrency(totalPayment)}</td>
            </tr>
            <tr>
              <td>Total Interest</td>
              <td>${formatCurrency(totalInterest)}</td>
            </tr>
          </tbody>
        </table>
        <canvas id="analysis-chart"></canvas>
        <button id="export-graph-btn">Export Graph</button>
      </div>
    `;

    const ctx = document.getElementById('analysis-chart').getContext('2d');
    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx, {
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
      try {
        const canvas = document.getElementById('analysis-chart');
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'mortgage-chart.png';
        link.click();
      } catch (error) {
        console.error('Error exporting graph:', error);
      }
    });
  } catch (error) {
    console.error('Error in calculateMortgage:', error);
    analysisOutputs.innerHTML = '<p class="output-card">Error calculating mortgage. Please check inputs.</p>';
  }
}

function calculateFutureValue() {
  try {
    const initialInvestment = parseFloat(document.getElementById('initial-investment').value) || 10000;
    const periodicContribution = parseFloat(document.getElementById('periodic-contribution').value) || 500;
    const contributionFrequency = parseInt(document.getElementById('contribution-frequency').value) || 12;
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 || 0.05;
    const timePeriod = parseInt(document.getElementById('time-period').value) || 10;
    const compoundingFrequency = parseInt(document.getElementById('compounding-frequency').value) || 12;

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

    analysisOutputs.innerHTML = `
      <div class="output-card">
        <h3>Future Value Calculator Results</h3>
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
              <td>${formatCurrency(totalFutureValue)}</td>
            </tr>
            <tr>
              <td>Total Contributions</td>
              <td>${formatCurrency(totalPrincipal)}</td>
            </tr>
            <tr>
              <td>Total Interest</td>
              <td>${formatCurrency(totalInterest)}</td>
            </tr>
          </tbody>
        </table>
        <canvas id="analysis-chart"></canvas>
        <button id="export-graph-btn">Export Graph</button>
      </div>
    `;

    const ctx = document.getElementById('analysis-chart').getContext('2d');
    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx, {
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
      try {
        const canvas = document.getElementById('analysis-chart');
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'future-value-chart.png';
        link.click();
      } catch (error) {
        console.error('Error exporting graph:', error);
      }
    });
  } catch (error) {
    console.error('Error in calculateFutureValue:', error);
    analysisOutputs.innerHTML = '<p class="output-card">Error calculating future value. Please check inputs.</p>';
  }
}

function calculateAutoLoan() {
  try {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value) || 25000;
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12 || 0.06 / 12;
    const loanTerm = parseInt(document.getElementById('loan-term').value) * 12 || 5 * 12;

    const monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / 
                          (Math.pow(1 + interestRate, loanTerm) - 1);
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;

    analysisOutputs.innerHTML = `
      <div class="output-card">
        <h3>Auto Loan Calculator Results</h3>
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
              <td>${formatCurrency(monthlyPayment)}</td>
            </tr>
            <tr>
              <td>Total Payment</td>
              <td>${formatCurrency(totalPayment)}</td>
            </tr>
            <tr>
              <td>Total Interest</td>
              <td>${formatCurrency(totalInterest)}</td>
            </tr>
          </tbody>
        </table>
        <canvas id="analysis-chart"></canvas>
        <button id="export-graph-btn">Export Graph</button>
      </div>
    `;

    const ctx = document.getElementById('analysis-chart').getContext('2d');
    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx, {
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
          title: { display: true, text: 'Auto Loan Payment Breakdown' }
        }
      }
    });

    document.getElementById('export-graph-btn').addEventListener('click', () => {
      try {
        const canvas = document.getElementById('analysis-chart');
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'auto-loan-chart.png';
        link.click();
      } catch (error) {
        console.error('Error exporting graph:', error);
      }
    });
  } catch (error) {
    console.error('Error in calculateAutoLoan:', error);
    analysisOutputs.innerHTML = '<p class="output-card">Error calculating auto loan. Please check inputs.</p>';
  }
}
