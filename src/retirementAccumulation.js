export function updateRetirementOutputs(analysisOutputs, clientData, formatCurrency, getAge) {
  try {
    if (!analysisOutputs) {
      console.error('Analysis outputs #analysis-outputs not found');
      return;
    }

    const c1Age = getAge(clientData.client1.personal.dob);
    const c2Age = clientData.isMarried ? getAge(clientData.client2.personal.dob) : c1Age;
    const c1RetirementAge = parseFloat(clientData.client1.personal.retirementAge) || 65;
    const c2RetirementAge = clientData.isMarried ? parseFloat(clientData.client2.personal.retirementAge) || 65 : c1RetirementAge;
    const mortalityAge = parseFloat(clientData.assumptions.mortalityAge) || 90;
    const inflation = parseFloat(clientData.assumptions.inflation) / 100 || 0.02;
    const rorRetirement = parseFloat(clientData.assumptions.rorRetirement) / 100 || 0.04;
    const monthlyNeed = parseFloat(clientData.incomeNeeds.monthly) || 5000;

    if (c1Age >= c1RetirementAge || (clientData.isMarried && c2Age >= c2RetirementAge)) {
      analysisOutputs.innerHTML = '<p class="output-card">Client(s) already at or past retirement age. Please adjust retirement age or DOB.</p>';
      return;
    }
    if (c1RetirementAge >= mortalityAge || (clientData.isMarried && c2RetirementAge >= mortalityAge)) {
      analysisOutputs.innerHTML = '<p class="output-card">Retirement age must be less than mortality age.</p>';
      return;
    }

    const incomeGoals = [
      { age: c1RetirementAge, percentage: 100, amount: monthlyNeed },
      { age: c1RetirementAge + 10, percentage: 80, amount: monthlyNeed * 0.8 },
      { age: c1RetirementAge + 15, percentage: 70, amount: monthlyNeed * 0.7 }
    ];

    const incomeSources = [];
    if (clientData.client1.incomeSources.employment && c1Age < c1RetirementAge) {
      incomeSources.push({
        source: `${clientData.client1.personal.name || 'Client 1'}'s Employment Income`,
        details: `Until age ${c1RetirementAge}`,
        amount: parseFloat(clientData.client1.incomeSources.employment) / 12 || 0
      });
    }
    if (clientData.isMarried && clientData.client2.incomeSources.employment && c2Age < c2RetirementAge) {
      incomeSources.push({
        source: `${clientData.client2.personal.name || 'Client 2'}'s Employment Income`,
        details: `Until age ${c2RetirementAge}`,
        amount: parseFloat(clientData.client2.incomeSources.employment) / 12 || 0
      });
    }
    if (clientData.client1.incomeSources.socialSecurity) {
      incomeSources.push({
        source: `${clientData.client1.personal.name || 'Client 1'}'s Social Security`,
        details: `At age ${c1RetirementAge}`,
        amount: parseFloat(clientData.client1.incomeSources.socialSecurity) || 0
      });
    }
    if (clientData.isMarried && clientData.client2.incomeSources.socialSecurity) {
      incomeSources.push({
        source: `${clientData.client2.personal.name || 'Client 2'}'s Social Security`,
        details: `At age ${c2RetirementAge}`,
        amount: parseFloat(clientData.client2.incomeSources.socialSecurity) || 0
      });
    }
    if (clientData.client1.incomeSources.other) {
      incomeSources.push({
        source: 'Other Income',
        details: `At age ${c1RetirementAge}`,
        amount: parseFloat(clientData.client1.incomeSources.other) || 0
      });
    }

    let totalAssets = 0;
    const assets = [];
    clientData.client1.accounts.forEach(account => {
      const balance = parseFloat(account.balance) || 0;
      if (balance > 0) {
        assets.push({
          name: `${clientData.client1.personal.name || 'Client 1'}'s ${account.name || 'Retirement Account'}`,
          balance
        });
        totalAssets += balance;
      }
    });
    if (clientData.isMarried) {
      clientData.client2.accounts.forEach(account => {
        const balance = parseFloat(account.balance) || 0;
        if (balance > 0) {
          assets.push({
            name: `${clientData.client2.personal.name || 'Client 2'}'s ${account.name || 'Retirement Account'}`,
            balance
          });
        }
      });
    }
    clientData.client1.other.assets.forEach(asset => {
      const balance = parseFloat(asset.balance) || 0;
      if (balance > 0) {
        assets.push({
          name: asset.name || 'Other Asset',
          balance
        });
        totalAssets += balance;
      }
    });
    if (clientData.isMarried) {
      clientData.client2.other.assets.forEach(asset => {
        const balance = parseFloat(asset.balance) || 0;
        if (balance > 0) {
          assets.push({
            name: asset.name || 'Other Asset',
            balance
          });
          totalAssets += balance;
        }
      });
    }

    let balance = totalAssets;
    const yearsToRetirement = Math.max(c1RetirementAge - c1Age, clientData.isMarried ? c2RetirementAge - c2Age : 0);
    [clientData.client1, clientData.isMarried ? clientData.client2 : null].forEach((client, idx) => {
      if (!client) return;
      client.accounts.forEach(account => {
        let tempBalance = parseFloat(account.balance) || 0;
        const contribution = parseFloat(account.contribution) || 0;
        const employerMatch = (parseFloat(account.employerMatch) / 100) * contribution || 0;
        const ror = parseFloat(account.ror) / 100 || 0.06;
        for (let i = 0; i < yearsToRetirement; i++) {
          tempBalance += tempBalance * ror + contribution + employerMatch;
        }
        balance += tempBalance - (parseFloat(account.balance) || 0);
      });
    });

    let depletionAge = c1RetirementAge;
    const monthlySources = incomeSources.reduce((sum, src) => sum + (src.amount || 0), 0);
    for (let i = 0; i < mortalityAge - c1RetirementAge; i++) {
      const currentNeed = monthlyNeed * Math.pow(1 + inflation, i) - monthlySources;
      balance = balance * (1 + rorRetirement) - (currentNeed > 0 ? currentNeed * 12 : 0);
      if (balance <= 0) {
        depletionAge = c1RetirementAge + i;
        break;
      }
    }
    if (balance > 0) depletionAge = mortalityAge;

    const currentSavings = parseFloat(clientData.savingsExpenses.monthlySavings) || 0;
    let additionalSavings = 0;
    let requiredAtRetirement = 0;
    if (depletionAge < mortalityAge) {
      const yearsShort = mortalityAge - depletionAge;
      const annualNeed = (monthlyNeed - monthlySources) * 12;
      requiredAtRetirement = annualNeed * (1 - Math.pow(1 + rorRetirement, -yearsShort)) / rorRetirement;
      const yearsToSave = yearsToRetirement;
      additionalSavings = requiredAtRetirement / ((Math.pow(1 + rorRetirement, yearsToSave) - 1) / rorRetirement);
    }

    // Calculate Alternatives
    const incomeData = calculateRetirementIncome(clientData, getAge);
    let targetROR = rorRetirement;
    if (depletionAge < mortalityAge) {
      let low = rorRetirement;
      let high = 0.2; // Max 20% ROR
      for (let i = 0; i < 20; i++) {
        const mid = (low + high) / 2;
        let tempBalance = incomeData.totalBalance;
        for (let j = 0; j < mortalityAge - c1RetirementAge; j++) {
          const currentNeed = monthlyNeed * Math.pow(1 + inflation, j) - monthlySources;
          tempBalance = tempBalance * (1 + mid) - (currentNeed > 0 ? currentNeed * 12 : 0);
          if (tempBalance <= 0) break;
        }
        if (tempBalance > 0) high = mid;
        else low = mid;
      }
      targetROR = (low + high) / 2;
    }

    let reducedMonthlyNeed = monthlyNeed;
    if (depletionAge < mortalityAge) {
      let low = 0;
      let high = monthlyNeed;
      for (let i = 0; i < 20; i++) {
        const mid = (low + high) / 2;
        let tempBalance = incomeData.totalBalance;
        for (let j = 0; j < mortalityAge - c1RetirementAge; j++) {
          const currentNeed = mid * Math.pow(1 + inflation, j) - monthlySources;
          tempBalance = tempBalance * (1 + rorRetirement) - (currentNeed > 0 ? currentNeed * 12 : 0);
          if (tempBalance <= 0) break;
        }
        if (tempBalance > 0) high = mid;
        else low = mid;
      }
      reducedMonthlyNeed = (low + high) / 2;
    }

    let newRetirementAge = c1RetirementAge;
    if (depletionAge < mortalityAge) {
      const yearsNeeded = mortalityAge - depletionAge;
      newRetirementAge = Math.ceil(c1RetirementAge + yearsNeeded);
      if (newRetirementAge > mortalityAge) newRetirementAge = mortalityAge;
    }

    // Render Outputs with Tabs
    analysisOutputs.innerHTML = `
      <div class="output-tabs">
        <button class="output-tab-btn active" data-tab="output-graph">Graph</button>
        <button class="output-tab-btn" data-tab="output-timeline">Timeline</button>
        <button class="output-tab-btn" data-tab="output-alternatives">Alternatives</button>
      </div>
      <div class="output-tab-content active" id="output-graph">
        <div class="output-card">
          <h3>Income Goals</h3>
          <p>Your desired monthly retirement income in today's dollars:</p>
          <table class="output-table">
            <thead>
              <tr>
                <th>Client 1 Age</th>
                <th>Client 2 Age</th>
                <th>% of Current Income</th>
                <th>Monthly Amount</th>
              </tr>
            </thead>
            <tbody>
              ${incomeGoals.map(goal => `
                <tr>
                  <td>${goal.age}</td>
                  <td>${clientData.isMarried ? goal.age - (c1RetirementAge - c2RetirementAge) : '-'}</td>
                  <td>${goal.percentage.toFixed(2)}%</td>
                  <td>${formatCurrency(goal.amount)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="output-card">
          <h3>Income Sources</h3>
          <p>Monthly income sources to support your retirement goals:</p>
          <table class="output-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Details</th>
                <th>Monthly Amount</th>
              </tr>
            </thead>
            <tbody>
              ${incomeSources.length ? incomeSources.map(src => `
                <tr>
                  <td>${src.source}</td>
                  <td>${src.details}</td>
                  <td>${formatCurrency(src.amount)}</td>
                </tr>
              `).join('') : '<tr><td colspan="3">No income sources provided.</td></tr>'}
            </tbody>
          </table>
        </div>
        <div class="output-card">
          <h3>Assets Available at Retirement</h3>
          <p>Applied assets for retirement funding:</p>
          <table class="output-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              ${assets.length ? assets.map(asset => `
                <tr>
                  <td>${asset.name}</td>
                  <td>${formatCurrency(asset.balance)}</td>
                </tr>
              `).join('') : '<tr><td colspan="2">No assets provided.</td></tr>'}
            </tbody>
          </table>
        </div>
        <div class="output-card">
          <h3>Results</h3>
          <div class="results-highlight">
            <p>Your funds will be depleted at Client 1's age ${depletionAge}.</p>
            <p>Current monthly savings of ${formatCurrency(currentSavings)} need to increase by ${formatCurrency(additionalSavings)} at ${rorRetirement * 100}% ROR.</p>
            ${requiredAtRetirement > 0 ? `<p>Additional ${formatCurrency(requiredAtRetirement)} required at retirement.</p>` : ''}
          </div>
          <div class="depletion-progress">
            <progress value="${depletionAge - c1RetirementAge}" max="${mortalityAge - c1RetirementAge}"></progress>
            <p>Retirement duration: ${depletionAge - c1RetirementAge} of ${mortalityAge - c1RetirementAge} years</p>
          </div>
          <p class="disclaimer">Values shown are hypothetical and not a promise of future performance.</p>
        </div>
        <div class="output-card">
          <h3>Retirement Income Graph</h3>
          <p class="graph-placeholder">View the retirement income chart above in the main graph area.</p>
        </div>
      </div>
      <div class="output-tab-content" id="output-timeline" style="display: none;">
        <div class="output-card">
          <h3>Retirement Income Timeline</h3>
          <table class="timeline-table">
            <thead>
              <tr>
                <th>Age</th>
                <th>Social Security ($)</th>
                <th>Other Income ($)</th>
                <th>Capital ($)</th>
                <th>Shortfall ($)</th>
              </tr>
            </thead>
            <tbody>
              ${incomeData.labels.map((age, i) => `
                <tr style="${age === c1Age ? 'font-weight: bold; background: #eff6ff;' : age === c1RetirementAge ? 'font-weight: bold; background: #d1e7ff;' : age === incomeData.depletionAge ? 'font-weight: bold; background: #ffe4e1;' : ''}">
                  <td>${age}${age === c1Age ? ' (Current)' : age === c1RetirementAge ? ' (Retirement)' : age === incomeData.depletionAge ? ' (Depletion)' : ''}</td>
                  <td>${formatCurrency(incomeData.socialSecurityData[i])}</td>
                  <td>${formatCurrency(incomeData.otherIncomeData[i])}</td>
                  <td>${formatCurrency(incomeData.capitalData[i])}</td>
                  <td>${formatCurrency(incomeData.shortfallData[i])}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="output-tab-content" id="output-alternatives" style="display: none;">
        <div class="output-card">
          <h3>Alternatives to Achieve Retirement Goals</h3>
          <ul class="alternatives-list">
            <li><strong>Save More:</strong> Increase monthly savings by ${formatCurrency(additionalSavings)} to meet retirement needs.</li>
            <li><strong>Earn Greater Rate of Return:</strong> Target a ${Math.round(targetROR * 10000) / 100}% annual return during retirement to avoid shortfall.</li>
            <li><strong>Reduce Expenses:</strong> Lower monthly income needs to ${formatCurrency(reducedMonthlyNeed)} to sustain funds until age ${mortalityAge}.</li>
            <li><strong>Retire Later:</strong> Delay retirement to age ${newRetirementAge} to extend funds to age ${mortalityAge}.</li>
          </ul>
        </div>
      </div>
    `;
    console.log('Retirement outputs with tabs rendered');
  } catch (error) {
    console.error('Error in updateRetirementOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-card">Unable to render outputs. Please ensure all required fields (DOB, retirement age, mortality age, income needs) are filled correctly.</p>';
  }
}
