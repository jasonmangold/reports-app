export const summaryTabs = [
  {
    id: 'summary-input',
    label: 'Summary Input',
    content: `
      <div id="summary-content">
        <!-- Content will be dynamically updated based on dropdown selection -->
      </div>
    `
  }
];

// Define report options specific to Summary
const reportOptions = [
  { id: 'financial-fitness', label: 'Financial Fitness', reportId: 'report-financial-fitness', title: 'Financial Fitness Report' },
  { id: 'financial-inventory', label: 'Financial Inventory', reportId: 'report-financial-inventory', title: 'Financial Inventory' },
  { id: 'analysis-goals', label: 'Analysis Goals', reportId: 'report-analysis-goals', title: 'Analysis Goals Timeline' }
];

// Topics for Financial Fitness
const fitnessTopics = [
  { id: 'accumulation-funding', label: 'Accumulation Funding' },
  { id: 'critical-illness', label: 'Critical Illness' },
  { id: 'debt', label: 'Debt' },
  { id: 'disability', label: 'Disability' },
  { id: 'education-funding', label: 'Education Funding' },
  { id: 'long-term-care', label: 'Long Term Care' },
  { id: 'retirement-accumulation', label: 'Retirement Accumulation' },
  { id: 'retirement-distribution', label: 'Retirement Distribution' },
  { id: 'survivor', label: 'Survivor' }
];

// Goals for Analysis Goals timeline
const analysisGoals = [
  { id: 'accumulation-funding', label: 'Accumulation Funding', defaultYear: 2030 },
  { id: 'retirement', label: 'Retirement', defaultYear: null }, // Will use retirement age
  { id: 'education-funding', label: 'Education Funding', defaultYear: 2035 },
  { id: 'debt-repayment', label: 'Debt Repayment', defaultYear: 2028 }
];

// Financial Inventory inputs (same as Personal Finance)
const financialInventoryInputs = `
  <div class="tab-content" id="personal">
    <label>Marital Status: <input type="checkbox" id="is-married"></label>
    <div class="client">
      <h5>Client 1</h5>
      <label>Name: <input type="text" id="c1-name" placeholder="John Doe"></label>
    </div>
    <div class="client" id="client2-section" style="display: none;">
      <h5>Client 2</h5>
      <label>Name: <input type="text" id="c2-name" placeholder="Jane Doe"></label>
    </div>
  </div>
  <div class="tab-content" id="income">
    <div class="client">
      <h5>Client 1</h5>
      <label>Employment Income ($/yr): <input type="number" id="c1-employment" min="0" step="1000" placeholder="50000"></label>
    </div>
    <div class="client" id="client2-income-section" style="display: none;">
      <h5>Client 2</h5>
      <label>Employment Income ($/yr): <input type="number" id="c2-employment" min="0" step="1000" placeholder="40000"></label>
    </div>
    <label>Interest and Dividends ($/yr): <input type="number" id="interest-dividends" min="0" step="1000" placeholder="5000"></label>
    <label>Other Income ($/yr): <input type="number" id="other-income" min="0" step="1000" placeholder="10000"></label>
  </div>
  <div class="tab-content" id="savings-expenses">
    <label>Household Expenses ($/yr): <input type="number" id="household-expenses" min="0" step="1000" placeholder="30000"></label>
    <label>Taxes ($/yr): <input type="number" id="taxes" min="0" step="1000" placeholder="15000"></label>
    <label>Other Expenses ($/yr): <input type="number" id="other-expenses" min="0" step="1000" placeholder="5000"></label>
    <label>Monthly Savings ($): <input type="number" id="monthly-savings" min="0" step="100" placeholder="2000"></label>
  </div>
  <div class="tab-content" id="retirement">
    <div id="c1-accounts">
      <h5>Client 1 Accounts</h5>
      <div class="account">
        <label>Account Name: <input type="text" id="c1-account-0-name" placeholder="401(k)"></label>
        <label>Balance ($): <input type="number" id="c1-account-0-balance" min="0" step="1000" placeholder="100000"></label>
        <label>ROR (%): <input type="number" id="c1-account-0-ror" min="0" max="100" step="0.1" placeholder="6"></label>
      </div>
      <button type="button" class="add-account-btn" data-client="c1">Add Account</button>
    </div>
    <div id="c2-accounts" style="display: none;">
      <h5>Client 2 Accounts</h5>
      <div class="account">
        <label>Account Name: <input type="text" id="c2-account-0-name" placeholder="IRA"></label>
        <label>Balance ($): <input type="number" id="c2-account-0-balance" min="0" step="1000" placeholder="80000"></label>
        <label>ROR (%): <input type="number" id="c2-account-0-ror" min="0" max="100" step="0.1" placeholder="5"></label>
      </div>
      <button type="button" class="add-account-btn" data-client="c2">Add Account</button>
    </div>
  </div>
  <div class="tab-content" id="other">
    <div id="c1-assets">
      <h5>Client 1 Assets</h5>
      <div class="asset">
        <label>Asset Name: <input type="text" id="c1-asset-0-name" placeholder="Investment Property"></label>
        <label>Balance ($): <input type="number" id="c1-asset-0-balance" min="0" step="1000" placeholder="200000"></label>
        <label>ROR (%): <input type="number" id="c1-asset-0-ror" min="0" max="100" step="0.1" placeholder="4"></label>
        <label>Asset Debt ($): <input type="number" id="c1-asset-0-debt" min="0" step="1000" placeholder="50000"></label>
      </div>
      <button type="button" class="add-asset-btn" data-client="c1">Add Asset</button>
    </div>
    <div id="c2-assets" style="display: none;">
      <h5>Client 2 Assets</h5>
      <div class="asset">
        <label>Asset Name: <input type="text" id="c2-asset-0-name" placeholder="Stock Portfolio"></label>
        <label>Balance ($): <input type="number" id="c2-asset-0-balance" min="0" step="1000" placeholder="150000"></label>
        <label>ROR (%): <input type="number" id="c2-asset-0-ror" min="0" max="100" step="0.1" placeholder="7"></label>
        <label>Asset Debt ($): <input type="number" id="c2-asset-0-debt" min="0" step="1000" placeholder="0"></label>
      </div>
      <button type="button" class="add-asset-btn" data-client="c2">Add Asset</button>
    </div>
    <label>Cash ($): <input type="number" id="cash" min="0" step="1000" placeholder="20000"></label>
    <label>Residence/Mortgage ($): <input type="number" id="residence-mortgage" min="0" step="1000" placeholder="300000"></label>
    <label>Other Debt ($): <input type="number" id="other-debt" min="0" step="1000" placeholder="10000"></label>
  </div>
  <div class="tab-content" id="assumptions">
    <label>Analysis Date: <input type="date" id="analysis-date"></label>
  </div>
`;

// Update Client Inputs based on dropdown selection
export function updateSummaryInputs(inputContent, clientData, selectedView) {
  try {
    const summaryContent = inputContent.querySelector('#summary-content');
    if (!summaryContent) {
      console.error('Summary content #summary-content not found');
      return;
    }

    if (selectedView === 'financial-fitness') {
      summaryContent.innerHTML = `
        <h5>Select Topics for Financial Fitness Score</h5>
        <div class="fitness-topics">
          ${fitnessTopics.map(topic => `
            <label>
              <input type="checkbox" class="fitness-topic-checkbox" data-topic="${topic.id}">
              ${topic.label}
            </label>
          `).join('')}
        </div>
      `;
    } else if (selectedView === 'financial-inventory') {
      summaryContent.innerHTML = financialInventoryInputs;

      // Populate inputs with clientData
      const setInputValue = (id, value, property = 'value') => {
        const input = document.getElementById(id);
        if (input) {
          if (property === 'checked') input.checked = value;
          else input.value = value ?? '';
        }
      };

      setInputValue('is-married', clientData.isMarried, 'checked');
      setInputValue('c1-name', clientData.client1.personal.name);
      setInputValue('c2-name', clientData.client2.personal.name);
      setInputValue('c1-employment', clientData.client1.incomeSources.employment);
      setInputValue('c2-employment', clientData.client2.incomeSources.employment);
      setInputValue('interest-dividends', clientData.client1.incomeSources.interestDividends);
      setInputValue('other-income', clientData.client1.incomeSources.other);
      setInputValue('household-expenses', clientData.savingsExpenses.householdExpenses);
      setInputValue('taxes', clientData.savingsExpenses.taxes);
      setInputValue('other-expenses', clientData.savingsExpenses.otherExpenses);
      setInputValue('monthly-savings', clientData.savingsExpenses.monthlySavings);
      setInputValue('cash', clientData.other.cash);
      setInputValue('residence-mortgage', clientData.other.residenceMortgage);
      setInputValue('other-debt', clientData.other.otherDebt);
      setInputValue('analysis-date', clientData.assumptions.analysisDate);

      ['c1', 'c2'].forEach(client => {
        const clientKey = client === 'c1' ? 'client1' : 'client2';
        const accounts = clientData[clientKey].accounts;
        const container = document.getElementById(`${client}-accounts`);
        if (!container) return;

        const existingAccounts = container.querySelectorAll('.account');
        existingAccounts.forEach(account => account.remove());

        accounts.forEach((account, index) => {
          const newAccount = document.createElement('div');
          newAccount.classList.add('account');
          newAccount.innerHTML = `
            <label>Account Name: <input type="text" id="${client}-account-${index}-name" placeholder="Account ${index + 1}"></label>
            <label>Balance ($): <input type="number" id="${client}-account-${index}-balance" min="0" step="1000" placeholder="0"></label>
            <label>ROR (%): <input type="number" id="${client}-account-${index}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
          `;
          const addButton = container.querySelector('.add-account-btn');
          container.insertBefore(newAccount, addButton);

          setInputValue(`${client}-account-${index}-name`, account.name);
          setInputValue(`${client}-account-${index}-balance`, account.balance);
          setInputValue(`${client}-account-${index}-ror`, account.ror);
        });

        const assets = clientData[clientKey].other?.assets || [];
        const assetContainer = document.getElementById(`${client}-assets`);
        if (!assetContainer) return;

        const existingAssets = assetContainer.querySelectorAll('.asset');
        existingAssets.forEach(asset => asset.remove());

        assets.forEach((asset, index) => {
          const newAsset = document.createElement('div');
          newAsset.classList.add('asset');
          newAsset.innerHTML = `
            <label>Asset Name: <input type="text" id="${client}-asset-${index}-name" placeholder="Asset ${index + 1}"></label>
            <label>Balance ($): <input type="number" id="${client}-asset-${index}-balance" min="0" step="1000" placeholder="0"></label>
            <label>ROR (%): <input type="number" id="${client}-asset-${index}-ror" min="0" max="100" step="0.1" placeholder="0"></label>
            <label>Asset Debt ($): <input type="number" id="${client}-asset-${index}-debt" min="0" step="1000" placeholder="0"></label>
          `;
          const addButton = assetContainer.querySelector('.add-asset-btn');
          assetContainer.insertBefore(newAsset, addButton);

          setInputValue(`${client}-asset-${index}-name`, asset.name);
          setInputValue(`${client}-asset-${index}-balance`, asset.balance);
          setInputValue(`${client}-asset-${index}-ror`, asset.ror);
          setInputValue(`${client}-asset-${index}-debt`, asset.debt);
        });
      });

      // Toggle Client 2 visibility
      document.getElementById('client2-section').style.display = clientData.isMarried ? 'block' : 'none';
      document.getElementById('client2-income-section').style.display = clientData.isMarried ? 'block' : 'none';
      document.getElementById('c2-accounts').style.display = clientData.isMarried ? 'block' : 'none';
      const c2Assets = document.getElementById('c2-assets');
      if (c2Assets) c2Assets.style.display = clientData.isMarried ? 'block' : 'none';
    } else if (selectedView === 'analysis-goals') {
      summaryContent.innerHTML = `
        <h5>Select Goals for Timeline</h5>
        <div class="analysis-goals">
          ${analysisGoals.map(goal => `
            <label>
              <input type="checkbox" class="analysis-goal-checkbox" data-goal="${goal.id}">
              ${goal.label}
            </label>
          `).join('')}
        </div>
      `;
    }
  } catch (error) {
    console.error('Error in updateSummaryInputs:', error);
    inputContent.innerHTML = '<p>Error rendering inputs. Please check console for details.</p>';
  }
}

export function updateSummaryOutputs(analysisOutputs, clientData, formatCurrency, selectedReports, getAge) {
  try {
    if (!analysisOutputs) {
      console.error('Analysis outputs #analysis-outputs not found');
      return;
    }

    const tabContainer = document.getElementById('output-tabs-container');
    if (!tabContainer) {
      console.warn('Tab container #output-tabs-container not found; dropdown will be rendered in analysis-outputs');
    }

    // Preserve the current dropdown selection (default to financial-fitness)
    const select = document.getElementById('output-select');
    const currentSelection = select ? select.value : 'financial-fitness';

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

    // Calculate Financial Fitness Score (only Retirement Accumulation and Debt are available)
    const calculateFitnessScore = () => {
      const selectedTopics = Array.from(document.querySelectorAll('.fitness-topic-checkbox:checked')).map(checkbox => checkbox.dataset.topic);
      if (selectedTopics.length === 0) return { score: 0, details: 'No topics selected.' };

      let totalScore = 0;
      let topicCount = 0;

      if (selectedTopics.includes('retirement-accumulation')) {
        let retirementScore = 0;
        let totalBalance = 0;
        const clients = [clientData.client1, clientData.isMarried ? clientData.client2 : null];
        clients.forEach(client => {
          if (!client) return;
          client.accounts.forEach(account => {
            totalBalance += parseFloat(account.balance) || 0;
          });
        });
        const monthlyIncomeNeeds = (parseFloat(clientData.incomeNeeds.monthly) || 0) * 12;
        const yearsToRetirement = Math.min(
          parseInt(clientData.client1.personal.retirementAge) - getAge(clientData.client1.personal.dob),
          clientData.isMarried ? parseInt(clientData.client2.personal.retirementAge) - getAge(clientData.client2.personal.dob) : Infinity
        );
        const targetSavings = monthlyIncomeNeeds * 20; // Rough estimate: 20 years of income needs
        if (yearsToRetirement > 0 && targetSavings > 0) {
          const annualSavingsNeeded = (targetSavings - totalBalance) / yearsToRetirement;
          const currentSavings = (parseFloat(clientData.savingsExpenses.monthlySavings) || 0) * 12;
          retirementScore = Math.min(10, Math.max(1, (currentSavings / annualSavingsNeeded) * 10));
        } else {
          retirementScore = totalBalance > 0 ? 5 : 1; // Fallback score
        }
        totalScore += retirementScore;
        topicCount++;
      }

      if (selectedTopics.includes('debt')) {
        let debtScore = 0;
        const totalDebt = (parseFloat(clientData.other.residenceMortgage) || 0) + (parseFloat(clientData.other.otherDebt) || 0);
        clients.forEach(client => {
          if (!client) return;
          if (client.other && client.other.assets) {
            client.other.assets.forEach(asset => {
              totalDebt += parseFloat(asset.debt) || 0;
            });
          }
        });
        const annualIncome = (parseFloat(clientData.client1.incomeSources.employment) || 0) +
                             (clientData.isMarried ? parseFloat(clientData.client2.incomeSources.employment) || 0 : 0) +
                             (parseFloat(clientData.client1.incomeSources.interestDividends) || 0) +
                             (parseFloat(clientData.client1.incomeSources.other) || 0);
        const debtToIncomeRatio = annualIncome > 0 ? totalDebt / annualIncome : 0;
        if (debtToIncomeRatio <= 0.36) debtScore = 8; // Good ratio
        else if (debtToIncomeRatio <= 0.5) debtScore = 5; // Moderate
        else debtScore = 3; // High debt burden
        totalScore += debtScore;
        topicCount++;
      }

      // Placeholder scores for other topics
      selectedTopics.forEach(topic => {
        if (!['retirement-accumulation', 'debt'].includes(topic)) {
          totalScore += 5; // Neutral score for unimplemented topics
          topicCount++;
        }
      });

      const averageScore = topicCount > 0 ? (totalScore / topicCount).toFixed(1) : 0;
      return { score: averageScore, details: `${topicCount} topic(s) evaluated.` };
    };

    // Financial Inventory (same as Personal Finance)
    let netWorth = 0;
    let totalAssets = 0;
    let totalLiabilities = 0;
    const assets = [];
    const liabilities = [];
    const clients = [clientData.client1, clientData.isMarried ? clientData.client2 : null];

    clients.forEach((client, idx) => {
      if (!client) return;
      client.accounts.forEach(account => {
        const balance = parseFloat(account.balance) || 0;
        if (balance > 0) {
          assets.push({
            name: `${client.personal.name || (idx === 0 ? 'Client 1' : 'Client 2')}'s ${account.name || 'Account'}`,
            balance: balance
          });
          totalAssets += balance;
        }
      });
      if (client.other && client.other.assets) {
        client.other.assets.forEach(asset => {
          const balance = parseFloat(asset.balance) || 0;
          const debt = parseFloat(asset.debt) || 0;
          if (balance > 0) {
            assets.push({
              name: asset.name || 'Other Asset',
              balance: balance
            });
            totalAssets += balance;
          }
          if (debt > 0) {
            liabilities.push({
              name: asset.name || 'Other Asset Debt',
              amount: debt
            });
            totalLiabilities += debt;
          }
        });
      }
    });

    const cash = parseFloat(clientData.other.cash) || 0;
    if (cash > 0) {
      assets.push({ name: 'Cash', balance: cash });
      totalAssets += cash;
    }

    const residenceMortgage = parseFloat(clientData.other.residenceMortgage) || 0;
    if (residenceMortgage > 0) {
      liabilities.push({ name: 'Residence/Mortgage', amount: residenceMortgage });
      totalLiabilities += residenceMortgage;
    }

    const otherDebt = parseFloat(clientData.other.otherDebt) || 0;
    if (otherDebt > 0) {
      liabilities.push({ name: 'Other Debt', amount: otherDebt });
      totalLiabilities += otherDebt;
    }

    netWorth = totalAssets - totalLiabilities;

    const annualSavings = (parseFloat(clientData.savingsExpenses.monthlySavings) || 0) * 12;
    const expenses = (parseFloat(clientData.savingsExpenses.householdExpenses) || 0) +
                    (parseFloat(clientData.savingsExpenses.taxes) || 0) +
                    (parseFloat(clientData.savingsExpenses.otherExpenses) || 0);
    const income = (parseFloat(clientData.client1.incomeSources.employment) || 0) +
                   (clientData.isMarried ? parseFloat(clientData.client2.incomeSources.employment) || 0 : 0) +
                   (parseFloat(clientData.client1.incomeSources.interestDividends) || 0) +
                   (parseFloat(clientData.client1.incomeSources.other) || 0);

    // Analysis Goals Timeline
    const timelineEvents = [];
    const selectedGoals = Array.from(document.querySelectorAll('.analysis-goal-checkbox:checked')).map(checkbox => checkbox.dataset.goal);
    if (selectedGoals.length > 0) {
      const analysisDate = new Date(clientData.assumptions.analysisDate || '2025-04-25');
      const startYear = analysisDate.getFullYear();
      selectedGoals.forEach(goalId => {
        const goal = analysisGoals.find(g => g.id === goalId);
        if (!goal) return;
        let year, clientAge;
        if (goal.id === 'retirement') {
          const c1RetirementAge = parseInt(clientData.client1.personal.retirementAge) || 65;
          const c1Age = getAge(clientData.client1.personal.dob);
          year = startYear + (c1RetirementAge - c1Age);
          clientAge = c1RetirementAge;
          if (clientData.isMarried) {
            const c2RetirementAge = parseInt(clientData.client2.personal.retirementAge) || 65;
            const c2Age = getAge(clientData.client2.personal.dob);
            const c2Year = startYear + (c2RetirementAge - c2Age);
            timelineEvents.push({
              year: c2Year,
              age: c2RetirementAge,
              label: `${clientData.client2.personal.name || 'Client 2'} Retirement`
            });
          }
        } else {
          year = goal.defaultYear;
          const yearsDiff = year - startYear;
          const c1Age = getAge(clientData.client1.personal.dob);
          clientAge = c1Age + yearsDiff;
        }
        timelineEvents.push({
          year,
          age: clientAge,
          label: goal.id === 'retirement' ? `${clientData.client1.personal.name || 'Client 1'} Retirement` : goal.label
        });
      });
      timelineEvents.sort((a, b) => a.year - b.year);
    }

    // Render Outputs
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
      <div class="output-tab-content ${currentSelection === 'financial-fitness' ? 'active' : ''}" id="financial-fitness" style="display: ${currentSelection === 'financial-fitness' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Financial Fitness Score</h3>
          ${selectedGoals.length === 0 ? `
            <p>Please select at least one topic in the Client Inputs to calculate the score.</p>
          ` : `
            <p><strong>Score: ${calculateFitnessScore().score} / 10</strong></p>
            <p>${calculateFitnessScore().details}</p>
          `}
        </div>
      </div>
      <div class="output-tab-content ${currentSelection === 'financial-inventory' ? 'active' : ''}" id="financial-inventory" style="display: ${currentSelection === 'financial-inventory' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Financial Inventory</h3>
          <h4>Income</h4>
          <table class="output-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${clientData.client1.personal.name || 'Client 1'} Employment Income</td>
                <td>${formatCurrency(parseFloat(clientData.client1.incomeSources.employment) || 0)}</td>
              </tr>
              ${clientData.isMarried ? `
              <tr>
                <td>${clientData.client2.personal.name || 'Client 2'} Employment Income</td>
                <td>${formatCurrency(parseFloat(clientData.client2.incomeSources.employment) || 0)}</td>
              </tr>
              ` : ''}
              <tr>
                <td>Interest and Dividends</td>
                <td>${formatCurrency(parseFloat(clientData.client1.incomeSources.interestDividends) || 0)}</td>
              </tr>
              <tr>
                <td>Other Income</td>
                <td>${formatCurrency(parseFloat(clientData.client1.incomeSources.other) || 0)}</td>
              </tr>
              <tr>
                <td><strong>Total Income</strong></td>
                <td><strong>${formatCurrency(income)}</strong></td>
              </tr>
            </tbody>
          </table>
          <h4>Savings & Expenses</h4>
          <table class="output-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Household Expenses</td>
                <td>${formatCurrency(parseFloat(clientData.savingsExpenses.householdExpenses) || 0)}</td>
              </tr>
              <tr>
                <td>Taxes</td>
                <td>${formatCurrency(parseFloat(clientData.savingsExpenses.taxes) || 0)}</td>
              </tr>
              <tr>
                <td>Other Expenses</td>
                <td>${formatCurrency(parseFloat(clientData.savingsExpenses.otherExpenses) || 0)}</td>
              </tr>
              <tr>
                <td><strong>Total Expenses</strong></td>
                <td><strong>${formatCurrency(expenses)}</strong></td>
              </tr>
              <tr>
                <td>Annual Savings</td>
                <td>${formatCurrency(annualSavings)}</td>
              </tr>
            </tbody>
          </table>
          <h4>Assets</h4>
          <table class="output-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              ${assets.map(asset => `
                <tr>
                  <td>${asset.name}</td>
                  <td>${formatCurrency(asset.balance)}</td>
                </tr>
              `).join('')}
              <tr>
                <td><strong>Total Assets</strong></td>
                <td><strong>${formatCurrency(totalAssets)}</strong></td>
              </tr>
            </tbody>
          </table>
          <h4>Liabilities</h4>
          <table class="output-table">
            <thead>
              <tr>
                <th>Liability</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${liabilities.map(liability => `
                <tr>
                  <td>${liability.name}</td>
                  <td>${formatCurrency(liability.amount)}</td>
                </tr>
              `).join('')}
              <tr>
                <td><strong>Total Liabilities</strong></td>
                <td><strong>${formatCurrency(totalLiabilities)}</strong></td>
              </tr>
            </tbody>
          </table>
          <h4>Net Worth</h4>
          <table class="output-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Assets</td>
                <td>${formatCurrency(totalAssets)}</td>
              </tr>
              <tr>
                <td>Total Liabilities</td>
                <td>${formatCurrency(totalLiabilities)}</td>
              </tr>
              <tr>
                <td><strong>Net Worth</strong></td>
                <td><strong>${formatCurrency(netWorth)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="output-tab-content ${currentSelection === 'analysis-goals' ? 'active' : ''}" id="analysis-goals" style="display: ${currentSelection === 'analysis-goals' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Analysis Goals Timeline</h3>
          ${selectedGoals.length === 0 ? `
            <p>Please select at least one goal in the Client Inputs to display the timeline.</p>
          ` : `
            <div class="timeline">
              ${timelineEvents.map(event => `
                <div class="timeline-event">
                  <div class="timeline-year">${event.year}</div>
                  <div class="timeline-content">
                    <strong>${event.label}</strong><br>
                    Age: ${event.age}
                  </div>
                </div>
              `).join('')}
            </div>
            <style>
              .timeline {
                position: relative;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px 0;
              }
              .timeline-event {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
              }
              .timeline-year {
                width: 100px;
                font-weight: bold;
                text-align: right;
                padding-right: 20px;
              }
              .timeline-content {
                flex: 1;
                padding: 10px;
                border-left: 2px solid #3b82f6;
                position: relative;
              }
              .timeline-content:before {
                content: '';
                position: absolute;
                left: -6px;
                top: 50%;
                width: 10px;
                height: 10px;
                background: #3b82f6;
                border-radius: 50%;
                transform: translateY(-50%);
              }
            </style>
          `}
        </div>
      </div>
    `;

    // Setup dropdown and checkbox interactions
    setupOutputControls(reportOptions, selectedReports);

    // Update Client Inputs based on current selection
    const inputContent = document.querySelector('.input-content');
    if (inputContent) {
      updateSummaryInputs(inputContent, clientData, currentSelection);
    }
  } catch (error) {
    console.error('Error in updateSummaryOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-card">Unable to render outputs. Please ensure all required fields are filled correctly.</p>';
    if (tabContainer) tabContainer.innerHTML = '';
  }
}

// Setup dropdown and checkbox interactions
function setupOutputControls(reportOptions, selectedReports) {
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
      outputDropdownChangeHandler.call(this);
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

// Dropdown change handler
function outputDropdownChangeHandler() {
  try {
    const selectedTab = this.value;
    document.querySelectorAll('.output-tab-content').forEach(content => {
      content.style.display = content.id === selectedTab ? 'block' : 'none';
    });

    const inputContent = document.querySelector('.input-content');
    if (inputContent) {
      const clientData = JSON.parse(localStorage.getItem('clientData') || '{}');
      updateSummaryInputs(inputContent, clientData, selectedTab);
    }
  } catch (error) {
    console.error('Error in outputDropdownChangeHandler:', error);
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
      return chartInstance;
    }

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: incomeData.labels.slice(1), // Skip starting balance row
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
          x: { title: { display: true, text: 'Client 1 Age' }, stacked: true },
          y: { title: { display: true, text: 'Annual Income ($)' }, stacked: true, beginAtZero: true }
        }
      }
    });
    console.log('Retirement Accumulation bar graph rendered');
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
    return chartInstance;
  }
}
