export const calculatorTabs = []; // No tabs by default in Client Inputs

// Define the Future Value of Single Sum and Periodic Additions content for sidebar access
const futureValueContent = `
  <form id="client-input-form">
    <h4>Future Value Inputs</h4>
    <div class="input-group">
      <label for="principal">Initial Investment ($)</label>
      <input type="number" id="principal" name="principal" min="0" step="0.01" required>
    </div>
    <div class="input-group">
      <label for="periodic-contribution">Periodic Contribution ($)</label>
      <input type="number" id="periodic-contribution" name="periodic-contribution" min="0" step="0.01" required>
    </div>
    <div class="input-group">
      <label for="contribution-frequency">Contribution Frequency</label>
      <select id="contribution-frequency" name="contribution-frequency" required>
        <option value="1">Annually</option>
        <option value="4">Quarterly</option>
        <option value="12">Monthly</option>
        <option value="365">Daily</option>
      </select>
    </div>
    <div class="input-group">
      <label for="interest-rate">Annual Interest Rate (%)</label>
      <input type="number" id="interest-rate" name="interest-rate" min="0" max="100" step="0.01" required>
    </div>
    <div class="input-group">
      <label for="years">Time Period (Years)</label>
      <input type="number" id="years" name="years" min="1" step="1" required>
    </div>
    <div class="input-group">
      <label for="compounding">Compounding Frequency</label>
      <select id="compounding" name="compounding" required>
        <option value="1">Annually</option>
        <option value="4">Quarterly</option>
        <option value="12">Monthly</option>
        <option value="365">Daily</option>
      </select>
    </div>
  </form>
`;

export const reportOptions = [
  {
    id: 'output-future-value',
    label: 'Future Value',
    reportId: 'report-future-value',
    title: 'Future Value of a Single Sum and Periodic Additions (A364L)'
  }
];

function calculateFutureValue(principal, periodicContribution, contributionFrequency, rate, years, compounding) {
  try {
    const r = parseFloat(rate) / 100; // Annual interest rate as decimal
    const n = parseInt(compounding); // Compounding frequency per year
    const t = parseFloat(years); // Time period in years
    const pv = parseFloat(principal) || 0; // Initial investment
    const pmt = parseFloat(periodicContribution) || 0; // Periodic contribution
    const m = parseInt(contributionFrequency); // Contribution frequency per year

    if (isNaN(pv) || isNaN(pmt) || isNaN(r) || isNaN(n) || isNaN(m) || isNaN(t) || pv < 0 || pmt < 0 || r < 0 || n <= 0 || m <= 0 || t <= 0) {
      throw new Error('Invalid input values');
    }

    // Future Value of Single Sum: FV = PV * (1 + r/n)^(n*t)
    const fvSingleSum = pv * Math.pow(1 + r / n, n * t);

    // Future Value of Periodic Additions (ordinary annuity): FV = PMT * [((1 + r/n)^(n*t) - 1) / (r/n)]
    // Adjust for contribution frequency alignment with compounding
    let fvPeriodic = 0;
    if (pmt > 0 && m > 0) {
      const periods = t * m; // Total number of contribution periods
      const ratePerPeriod = r / n; // Rate per compounding period
      const effectiveRate = Math.pow(1 + ratePerPeriod, n / m) - 1; // Effective rate per contribution period
      fvPeriodic = pmt * ((Math.pow(1 + effectiveRate, periods) - 1) / effectiveRate);
    }

    // Total Future Value
    const totalFv = fvSingleSum + fvPeriodic;

    return {
      futureValue: totalFv,
      singleSumFv: fvSingleSum,
      periodicFv: fvPeriodic,
      totalGrowth: totalFv - pv - (pmt * m * t) // Growth = Total FV - Initial Investment - Total Contributions
    };
  } catch (error) {
    console.error('Error in calculateFutureValue:', error);
    return null;
  }
}

export function updateCalculatorOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, Chart) {
  try {
    if (!analysisOutputs) {
      console.error('Analysis outputs #analysis-outputs not found');
      return;
    }

    const tabContainer = document.getElementById('output-tabs-container');
    const select = document.getElementById('output-select');
    const currentSelection = select ? select.value : 'output-future-value';

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

    const principal = parseFloat(clientData.futureValue?.principal) || 0;
    const periodicContribution = parseFloat(clientData.futureValue?.periodicContribution) || 0;
    const contributionFrequency = parseInt(clientData.futureValue?.contributionFrequency) || 1;
    const interestRate = parseFloat(clientData.futureValue?.interestRate) || 0;
    const years = parseFloat(clientData.futureValue?.years) || 0;
    const compounding = parseInt(clientData.futureValue?.compounding) || 1;

    const result = calculateFutureValue(principal, periodicContribution, contributionFrequency, interestRate, years, compounding);
    const isValid = result && principal >= 0 && periodicContribution >= 0 && years >= 0;

    const labels = isValid ? ['Initial Investment', 'Contributions', 'Future Value'] : ['No Data'];
    const data = isValid ? [principal, periodicContribution * contributionFrequency * years, result ? result.futureValue : 0] : [0];
    const backgroundColors = isValid
      ? ['rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(54, 162, 235, 0.6)']
      : ['rgba(255, 99, 132, 0.6)'];

    const chartCanvas = document.getElementById('future-value-chart');
    if (chartCanvas && Chart.getChart(chartCanvas)) {
      Chart.getChart(chartCanvas).destroy();
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
          <label class="add-to-presentation-checkbox Criminative: true
            </input>
            Add to Presentation
          </label>
        </div>
      ` : ''}
      <div class="output-tab-content ${currentSelection === 'output-future-value' ? 'active' : ''}" id="output-future-value" style="display: ${currentSelection === 'output-future-value' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Future Value</h3>
          ${isValid && (principal > 0 || periodicContribution > 0) && years > 0 ? `
            <p>Initial Investment: ${formatCurrency(principal)}</p>
            <p>Total Contributions: ${formatCurrency(periodicContribution * contributionFrequency * years)}</p>
            <p>Future Value: ${formatCurrency(result.futureValue)}</p>
            <p>Future Value (Single Sum): ${formatCurrency(result.singleSumFv)}</p>
            <p>Future Value (Periodic Additions): ${formatCurrency(result.periodicFv)}</p>
            <p>Total Growth: ${formatCurrency(result.totalGrowth)}</p>
            <canvas id="future-value-chart" style="max-height: 400px;"></canvas>
          ` : `
            <p>Please enter valid inputs to calculate the future value.</p>
          `}
        </div>
      </div>
    `;

    if (isValid && (principal > 0 || periodicContribution > 0) && years > 0) {
      const ctx = document.getElementById('future-value-chart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Amount ($)',
            data: data,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount ($)'
              },
              ticks: {
                callback: value => formatCurrency(value)
              }
            },
            x: {
              title: {
                display: true,
                text: 'Investment Components'
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    setupOutputControls(reportOptions, selectedReports, clientData);
    setupFormInputs(clientData);
  } catch (error) {
    console.error('Error in updateCalculatorOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-card">Unable to render outputs. Please ensure all required fields are filled correctly.</p>';
    if (tabContainer) tabContainer.innerHTML = '';
  }
}

function setupFormInputs(clientData) {
  const form = document.getElementById('client-input-form');
  if (!form) return;

  form.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('change', () => {
      if (!clientData.futureValue) clientData.futureValue = {};
      clientData.futureValue[input.name] = input.value;
      updateCalculatorOutputs(document.getElementById('analysis-outputs'), clientData, formatCurrency, [], Chart);
    });
  });
}

function setupOutputControls(reportOptions, selectedReports, clientData) {
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

    select.removeEventListener('change', outputDropdownChangeHandler);
    select.addEventListener('change', function() {
      outputDropdownChangeHandler.call(this, clientData);
      updateCheckboxState();
    });

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

function outputDropdownChangeHandler(clientData) {
  try {
    const selectedTab = this.value;
    document.querySelectorAll('.output-tab-content').forEach(content => {
      content.style.display = content.id === selectedTab ? 'block' : 'none';
    });
  } catch (error) {
    console.error('Error in outputDropdownChangeHandler:', error);
  }
}

// Initialize the calculator page
document.addEventListener('DOMContentLoaded', () => {
  const inputTabs = document.querySelector('.input-tabs');
  const inputContent = document.querySelector('.input-content');
  const analysisOutputs = document.getElementById('analysis-outputs');
  const recalculateBtn = document.getElementById('recalculate-btn');

  if (!inputTabs || !inputContent || !analysisOutputs) {
    console.error('Required elements not found');
    return;
  }

  // Client data storage
  let clientData = { futureValue: {} };
  let selectedReports = [];

  // Currency formatter
  const formatCurrency = value => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  // Clear input tabs and content initially
  inputTabs.innerHTML = '';
  inputContent.innerHTML = '';

  // Initial output render with empty data
  updateCalculatorOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, Chart);

  // Recalculate button
  if (recalculateBtn) {
    recalculateBtn.addEventListener('click', () => {
      updateCalculatorOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, Chart);
    });
  }

  // Sidebar calculator selection
// Inside the DOMContentLoaded event listener
document.querySelectorAll('.calculator-sidebar li').forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    const target = e.target.closest('li');
    if (!target) return;

    const text = target.textContent.trim();

    if (text === 'Future Value of a Single Sum and Periodic Additions (A364L)') {
      inputTabs.innerHTML = '<button class="tab-button active" data-tab="future-value">Future Value of Single Sum and Periodic Additions</button>';
      inputContent.innerHTML = futureValueContent;
      setupFormInputs(clientData);
      updateCalculatorOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, Chart);
    }

    const details = target.closest('details');
    if (details) {
      details.open = true;
    }
  });
});
});
