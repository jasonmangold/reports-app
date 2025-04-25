export const summaryTabs = [
  {
    id: 'summary-basic',
    label: 'Basic',
    content: `
      <h4>Summary Input</h4>
      <h5>Select Topics for Financial Fitness Score</h5>
      <div class="topic-checkboxes">
        <label><input type="checkbox" id="topic-accumulation-funding" data-topic="Accumulation Funding"> Accumulation Funding</label><br>
        <label><input type="checkbox" id="topic-critical-illness" data-topic="Critical Illness"> Critical Illness</label><br>
        <label><input type="checkbox" id="topic-debt" data-topic="Debt"> Debt</label><br>
        <label><input type="checkbox" id="topic-disability" data-topic="Disability"> Disability</label><br>
        <label><input type="checkbox" id="topic-education-funding" data-topic="Education Funding"> Education Funding</label><br>
        <label><input type="checkbox" id="topic-long-term-care" data-topic="Long Term Care"> Long Term Care</label><br>
        <label><input type="checkbox" id="topic-retirement-accumulation" data-topic="Retirement Accumulation"> Retirement Accumulation</label><br>
        <label><input type="checkbox" id="topic-retirement-distribution" data-topic="Retirement Distribution"> Retirement Distribution</label><br>
        <label><input type="checkbox" id="topic-survivor" data-topic="Survivor"> Survivor</label>
      </div>
    `
  }
];

// Define report options specific to Summary
const reportOptions = [
  { id: 'output-analysis-goals', label: 'Analysis Goals', reportId: 'report-analysis-goals', title: 'Analysis Goals' },
  { id: 'output-financial-inventory', label: 'Financial Inventory', reportId: 'report-financial-inventory', title: 'Financial Inventory' },
  { id: 'output-financial-fitness', label: 'Financial Fitness', reportId: 'report-financial-fitness', title: 'Financial Fitness' }
];

// Calculate debt-to-income ratio and score for Debt
function calculateDebtScore(clientData) {
  // Total annual income (Client 1 + Client 2 if married)
  const income1 = parseFloat(clientData.client1.incomeSources.employment || 0) +
                 parseFloat(clientData.client1.incomeSources.socialSecurity || 0) +
                 parseFloat(clientData.client1.incomeSources.other || 0) +
                 parseFloat(clientData.client1.incomeSources.interestDividends || 0);
  const income2 = clientData.isMarried ? 
                  (parseFloat(clientData.client2.incomeSources.employment || 0) +
                   parseFloat(clientData.client2.incomeSources.socialSecurity || 0) +
                   parseFloat(clientData.client2.incomeSources.other || 0) +
                   parseFloat(clientData.client2.incomeSources.interestDividends || 0)) : 0;
  const totalIncome = income1 + income2;

  // Total debt (residence/mortgage + other debt + asset debts)
  const residenceMortgage = parseFloat(clientData.other.residenceMortgage || 0);
  const otherDebt = parseFloat(clientData.other.otherDebt || 0);
  const assetDebt1 = clientData.client1.other.assets.reduce((sum, asset) => sum + parseFloat(asset.debt || 0), 0);
  const assetDebt2 = clientData.isMarried ? clientData.client2.other.assets.reduce((sum, asset) => sum + parseFloat(asset.debt || 0), 0) : 0;
  const totalDebt = residenceMortgage + otherDebt + assetDebt1 + assetDebt2;

  if (totalIncome === 0) return 1; // If no income, worst score

  const debtToIncomeRatio = (totalDebt / totalIncome) * 100; // As a percentage
  // Score: If DTI < 35%, scale inversely (lower DTI = higher score)
  if (debtToIncomeRatio < 35) {
    // Map DTI 0% to score 10, 35% to score 4
    const score = Math.round(10 - (debtToIncomeRatio / 35) * 6);
    return Math.max(4, Math.min(10, score)); // Ensure score is between 4 and 10
  } else {
    // DTI >= 35%, score decreases as DTI increases
    if (debtToIncomeRatio < 50) return 3;
    if (debtToIncomeRatio < 75) return 2;
    return 1;
  }
}

// Calculate retirement funding percentage and score
function calculateRetirementAccumulationScore(clientData, getAge) {
  // Simplified: Estimate required savings based on income needs
  const monthlyNeeds = parseFloat(clientData.incomeNeeds.monthly || 0);
  const annualNeeds = monthlyNeeds * 12;
  const client1Age = getAge(clientData.client1.personal.dob);
  const client1RetirementAge = parseFloat(clientData.client1.personal.retirementAge || 65);
  const yearsToRetirement = Math.max(0, client1RetirementAge - client1Age);
  const yearsInRetirement = parseFloat(clientData.assumptions.mortalityAge || 90) - client1RetirementAge;
  const inflationRate = parseFloat(clientData.assumptions.inflation || 2) / 100;

  // Future value of annual needs at retirement, adjusted for inflation
  const futureAnnualNeeds = annualNeeds * Math.pow(1 + inflationRate, yearsToRetirement);
  const totalNeeded = futureAnnualNeeds * yearsInRetirement;

  // Current savings (accounts + assets - debts)
  const accountsTotal = clientData.client1.accounts.reduce((sum, acc) => sum + parseFloat(acc.balance || 0), 0) +
                       (clientData.isMarried ? clientData.client2.accounts.reduce((sum, acc) => sum + parseFloat(acc.balance || 0), 0) : 0);
  const assetsTotal = clientData.client1.other.assets.reduce((sum, asset) => sum + parseFloat(asset.balance || 0), 0) +
                      (clientData.isMarried ? clientData.client2.other.assets.reduce((sum, asset) => sum + parseFloat(asset.balance || 0), 0) : 0);
  const totalDebt = parseFloat(clientData.other.residenceMortgage || 0) +
                    parseFloat(clientData.other.otherDebt || 0) +
                    clientData.client1.other.assets.reduce((sum, asset) => sum + parseFloat(asset.debt || 0), 0) +
                    (clientData.isMarried ? clientData.client2.other.assets.reduce((sum, asset) => sum + parseFloat(asset.debt || 0), 0) : 0);
  let currentSavings = accountsTotal + assetsTotal - totalDebt;

  // Future value of current savings at retirement
  const avgRor = clientData.client1.accounts.length > 0 ?
                 clientData.client1.accounts.reduce((sum, acc) => sum + parseFloat(acc.ror || 0), 0) / clientData.client1.accounts.length : 0;
  const futureSavings = currentSavings * Math.pow(1 + (avgRor / 100), yearsToRetirement);

  if (totalNeeded <= 0) return 1; // If no needs, worst score

  const fundingPercentage = (futureSavings / totalNeeded) * 100;
  // Score: 100% funded = 10, 0% funded = 1
  const score = Math.round((fundingPercentage / 100) * 10);
  return Math.max(1, Math.min(10, score));
}

export function updateSummaryOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, Chart, getAge) {
  try {
    if (!analysisOutputs) {
      console.error('Analysis outputs #analysis-outputs not found');
      return;
    }

    // Get the tab container (for the dropdown)
    const tabContainer = document.getElementById('output-tabs-container');
    if (!tabContainer) {
      console.warn('Tab container #output-tabs-container not found; dropdown will be rendered in analysis-outputs');
    }

    // Preserve the current dropdown selection
    const select = document.getElementById('output-select');
    const currentSelection = select ? select.value : 'output-analysis-goals';

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

    // Get selected topics from clientData
    const selectedTopics = clientData.summary?.topics || [];

    // Calculate Financial Fitness scores
    const scores = {};
    let totalScore = 0;
    let topicCount = 0;

    if (selectedTopics.length === 0) {
      scores['No Topics Selected'] = 0;
    } else {
      selectedTopics.forEach(topic => {
        let score;
        if (topic === 'Retirement Accumulation') {
          score = calculateRetirementAccumulationScore(clientData, getAge);
        } else if (topic === 'Debt') {
          score = calculateDebtScore(clientData);
        } else {
          // Placeholder scores for other topics
          const placeholderScores = {
            'Accumulation Funding': 7,
            'Critical Illness': 4,
            'Disability': 5,
            'Education Funding': 6,
            'Long Term Care': 3,
            'Retirement Distribution': 8,
            'Survivor': 2
          };
          score = placeholderScores[topic] || 5; // Default to 5 if not specified
        }
        scores[topic] = score;
        totalScore += score;
        topicCount++;
      });
    }

    // Calculate average score
    const averageScore = topicCount > 0 ? Math.round(totalScore / topicCount) : 0;

    // Prepare data for bar graph
    const labels = Object.keys(scores);
    const data = Object.values(scores);
    const backgroundColors = data.map(score => {
      if (score >= 8) return 'rgba(75, 192, 192, 0.6)'; // Green
      if (score >= 4) return 'rgba(255, 206, 86, 0.6)'; // Yellow
      return 'rgba(255, 99, 132, 0.6)'; // Red
    });

    // Destroy any existing chart
    const chartCanvas = document.getElementById('financial-fitness-chart');
    if (chartCanvas && Chart.getChart(chartCanvas)) {
      Chart.getChart(chartCanvas).destroy();
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
      <div class="output-tab-content ${currentSelection === 'output-analysis-goals' ? 'active' : ''}" id="output-analysis-goals" style="display: ${currentSelection === 'output-analysis-goals' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Analysis Goals</h3>
          <p>Selected Topics: ${selectedTopics.length > 0 ? selectedTopics.join(', ') : 'None'}</p>
        </div>
      </div>
      <div class="output-tab-content ${currentSelection === 'output-financial-inventory' ? 'active' : ''}" id="output-financial-inventory" style="display: ${currentSelection === 'output-financial-inventory' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Financial Inventory</h3>
          <p>Selected Topics: ${selectedTopics.length > 0 ? selectedTopics.join(', ') : 'None'}</p>
        </div>
      </div>
      <div class="output-tab-content ${currentSelection === 'output-financial-fitness' ? 'active' : ''}" id="output-financial-fitness" style="display: ${currentSelection === 'output-financial-fitness' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Financial Fitness</h3>
          ${selectedTopics.length === 0 ? `
            <p>No topics selected. Please select at least one topic to calculate your Financial Fitness Score.</p>
          ` : `
            <p>Overall Financial Fitness Score: ${averageScore} / 10</p>
            <canvas id="financial-fitness-chart" style="max-height: 400px;"></canvas>
          `}
        </div>
      </div>
    `;

    // Render the bar graph if topics are selected
    if (selectedTopics.length > 0) {
      const ctx = document.getElementById('financial-fitness-chart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Score (1-10)',
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
              max: 10,
              ticks: {
                stepSize: 1
              },
              title: {
                display: true,
                text: 'Score (1-10)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Topics'
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

    // Setup checkbox listeners for topics
    document.querySelectorAll('.topic-checkboxes input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const selected = Array.from(document.querySelectorAll('.topic-checkboxes input[type="checkbox"]:checked'))
                             .map(cb => cb.dataset.topic);
        if (!clientData.summary) clientData.summary = {};
        clientData.summary.topics = selected;
        updateSummaryOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, Chart, getAge);
      });
    });

    // Initialize checkbox states
    document.querySelectorAll('.topic-checkboxes input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = selectedTopics.includes(checkbox.dataset.topic);
    });
  } catch (error) {
    console.error('Error in updateSummaryOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-card">Unable to render outputs. Please ensure all required fields are filled correctly.</p>';
    if (tabContainer) tabContainer.innerHTML = '';
  }
}

// Setup dropdown and checkbox interactions
function setupOutputControls(reportOptions, selectedReports, clientData) {
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
      outputDropdownChangeHandler.call(this, clientData);
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

// Dropdown change handler
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
