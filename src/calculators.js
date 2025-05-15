export const calculatorTabs = [
  {
    id: 'investment-growth',
    label: 'Investment Growth',
    content: `
      <h4>Investment Growth Inputs</h4>
      <div class="input-group">
        <label for="principal">Initial Investment ($)</label>
        <input type="number" id="principal" name="principal" min="0" step="0.01" required>
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
    `
  }
];

export const reportOptions = [
  {
    id: 'output-future-value',
    label: 'Future Value',
    reportId: 'report-future-value',
    title: 'Investment Growth Future Value'
  }
];

function calculateFutureValue(principal, rate, years, compounding) {
  try {
    const r = parseFloat(rate) / 100; // Convert percentage to decimal
    const n = parseInt(compounding);
    const t = parseFloat(years);
    const pv = parseFloat(principal);

    if (isNaN(pv) || isNaN(r) || isNaN(n) || isNaN(t) || pv < 0 || r < 0 || n <= 0 || t <= 0) {
      throw new Error('Invalid input values');
    }

    // Future Value formula: FV = PV * (1 + r/n)^(n*t)
    const fv = pv * Math.pow(1 + r / n, n * t);
    return {
      futureValue: fv,
      growth: fv - pv
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

    // Render dropdown in output-tabs-container
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

    // Get input values from clientData or form
    const principal = parseFloat(clientData.investmentGrowth?.principal) || 0;
    const interestRate = parseFloat(clientData.investmentGrowth?.interestRate) || 0;
    const years = parseFloat(clientData.investmentGrowth?.years) || 0;
    const compounding = parseInt(clientData.investmentGrowth?.compounding) || 1;

    // Calculate future value
    const result = calculateFutureValue(principal, interestRate, years, compounding);
    const isValid = result && principal > 0 && years > 0;

    // Prepare data for bar graph
    const labels = isValid ? ['Initial Investment', 'Future Value'] : ['No Data'];
    const data = isValid ? [principal, result.futureValue] : [0];
    const backgroundColors = isValid
      ? ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)']
      : ['rgba(255, 99, 132, 0.6)'];

    // Destroy any existing chart
    const chartCanvas = document.getElementById('future-value-chart');
    if (chartCanvas && Chart.getChart(chartCanvas)) {
      Chart.getChart(chartCanvas).destroy();
    }

    // Render output content
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
      <div class="output-tab-content ${currentSelection === 'output-future-value' ? 'active' : ''}" id="output-future-value" style="display: ${currentSelection === 'output-future-value' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Future Value</h3>
          ${isValid ? `
            <p>Initial Investment: ${formatCurrency(principal)}</p>
            <p>Future Value: ${formatCurrency(result.futureValue)}</p>
            <p>Growth: ${formatCurrency(result.growth)}</p>
            <canvas id="future-value-chart" style="max-height: 400px;"></canvas>
          ` : `
            <p>Please enter valid inputs to calculate the future value.</p>
          `}
        </div>
      </div>
    `;

    // Render bar graph if valid
    if (isValid) {
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
                text: 'Investment'
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

    // Setup dropdown and checkbox interactions
    setupOutputControls(reportOptions, selectedReports, clientData);

    // Setup form input listeners
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
      if (!clientData.investmentGrowth) clientData.investmentGrowth = {};
      clientData.investmentGrowth[input.name] = input.value;
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
  let clientData = { investmentGrowth: {} };
  let selectedReports = [];

  // Currency formatter
  const formatCurrency = value => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  // Render input tabs
  inputTabs.innerHTML = calculatorTabs.map(tab => `
    <button class="tab-button ${tab.id === 'investment-growth' ? 'active' : ''}" data-tab="${tab.id}">${tab.label}</button>
  `).join('');

  // Render initial tab content
  inputContent.innerHTML = calculatorTabs.find(tab => tab.id === 'investment-growth').content;

  // Tab switching
  inputTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-button')) {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      const tabId = e.target.dataset.tab;
      const tab = calculatorTabs.find(t => t.id === tabId);
      inputContent.innerHTML = tab.content;
      setupFormInputs(clientData);
    }
  });

  // Initial output render
  updateCalculatorOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, Chart);

  // Recalculate button
  if (recalculateBtn) {
    recalculateBtn.addEventListener('click', () => {
      updateCalculatorOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, Chart);
    });
  }

  // Sidebar calculator selection (for Investment Growth)
  document.querySelectorAll('.calculator-sidebar li').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.textContent === 'Investment Growth') {
        inputTabs.querySelector('.tab-button').click();
      }
    });
  });
});
