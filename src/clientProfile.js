export const clientProfileTabs = [
  {
    id: 'client-profile',
    label: 'Client Profile',
    content: `
      <div class="client-profile">
        <div class="sub-tabs">
          <button class="sub-tab-btn active" data-sub-tab="personal-information">Personal Information</button>
          <button class="sub-tab-btn" data-sub-tab="income">Income</button>
          <button class="sub-tab-btn" data-sub-tab="income-needs">Income Needs</button>
          <button class="sub-tab-btn" data-sub-tab="assets">Assets</button>
          <button class="sub-tab-btn" data-sub-tab="liabilities">Liabilities</button>
          <button class="sub-tab-btn" data-sub-tab="insurance">Insurance</button>
          <button class="sub-tab-btn" data-sub-tab="savings-expenses">Savings and Expenses</button>
          <button class="sub-tab-btn" data-sub-tab="assumptions">Assumptions</button>
        </div>
        <div class="sub-tab-content" id="personal-information" style="display: block;">
          <label>Marital Status: <input type="checkbox" id="is-married"></label>
          <div class="client">
            <h5>Client 1</h5>
            <label>Name: <input type="text" id="c1-name" placeholder="John Doe"></label>
            <label>Date of Birth: <input type="date" id="c1-dob"></label>
            <div id="c1-age-display" class="age-display"></div>
            <label>Retirement Age: <input type="number" id="c1-retirement-age" min="1" max="120" placeholder="65"></label>
          </div>
          <div class="client" id="client2-section" style="display: none;">
            <h5>Client 2</h5>
            <label>Name: <input type="text" id="c2-name" placeholder="Jane Doe"></label>
            <label>Date of Birth: <input type="date" id="c2-dob"></label>
            <div id="c2-age-display" class="age-display"></div>
            <label>Retirement Age: <input type="number" id="c2-retirement-age" min="1" max="120" placeholder="65"></label>
          </div>
        </div>
        <div class="sub-tab-content" id="income" style="display: none;">
          <div class="client">
            <h5>Client 1</h5>
            <label>Employment Income ($/yr): <input type="number" id="c1-employment" min="0" step="1000" placeholder="50000"></label>
            <label>Social Security ($/mo): <input type="number" id="c1-social-security" min="0" step="100" placeholder="2000"></label>
            <label>Other Income ($/mo): <input type="number" id="c1-other-income" min="0" step="100" placeholder="500"></label>
            <label>Interest & Dividends ($/mo): <input type="number" id="c1-interest-dividends" min="0" step="100" placeholder="1000"></label>
          </div>
          <div class="client" id="client2-income-section" style="display: none;">
            <h5>Client 2</h5>
            <label>Employment Income ($/yr): <input type="number" id="c2-employment" min="0" step="1000" placeholder="40000"></label>
            <label>Social Security ($/mo): <input type="number" id="c2-social-security" min="0" step="100" placeholder="1500"></label>
            <label>Other Income ($/mo): <input type="number" id="c2-other-income" min="0" step="100" placeholder="300"></label>
            <label>Interest & Dividends ($/mo): <input type="number" id="c2-interest-dividends" min="0" step="100" placeholder="800"></label>
          </div>
        </div>
        <div class="sub-tab-content" id="income-needs" style="display: none;">
          <div class="income-needs">
            <label>Monthly Income Needs ($): <input type="number" id="monthly-income" min="0" step="100" placeholder="5000"></label>
          </div>
        </div>
        <div class="sub-tab-content" id="assets" style="display: none;">
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
              <label>Employer Match (%): <input type="number" id="c2-account-0-employer-match" min="0" max="100" step="0.1" placeholder="0"></label>
              <label>ROR (%): <input type="number" id="c2-account-0-ror" min="0" max="100" step="0.1" placeholder="5"></label>
            </div>
            <button type="button" class="add-account-btn" data-client="c2">Add Account</button>
          </div>
          <div id="c1-assets">
            <h5>Client 1 Other Assets</h5>
            <div class="asset">
              <label>Asset Name: <input type="text" id="c1-asset-0-name" placeholder="Rental Property"></label>
              <label>Balance ($): <input type="number" id="c1-asset-0-balance" min="0" step="1000" placeholder="200000"></label>
              <label>ROR (%): <input type="number" id="c1-asset-0-ror" min="0" max="100" step="0.1" placeholder="4"></label>
              <label>Asset Debt ($): <input type="number" id="c1-asset-0-debt" min="0" step="1000" placeholder="50000"></label>
            </div>
            <button type="button" class="add-asset-btn" data-client="c1">Add Asset</button>
          </div>
          <div id="c2-assets" style="display: none;">
            <h5>Client 2 Other Assets</h5>
            <div class="asset">
              <label>Asset Name: <input type="text" id="c2-asset-0-name" placeholder="Asset 1"></label>
              <label>Balance ($): <input type="number" id="c2-asset-0-balance" min="0" step="1000" placeholder="0"></label>
              <label>ROR (%): <input type="number" id="c2-asset-0-ror" min="0" max="100" step="0.1" placeholder="0"></label>
              <label>Asset Debt ($): <input type="number" id="c2-asset-0-debt" min="0" step="1000" placeholder="0"></label>
            </div>
            <button type="button" class="add-asset-btn" data-client="c2">Add Asset</button>
          </div>
          <div class="other-assets">
            <h5>Other Assets</h5>
            <label>Cash ($): <input type="number" id="cash" min="0" step="1000" placeholder="20000"></label>
          </div>
        </div>
        <div class="sub-tab-content" id="liabilities" style="display: none;">
          <div class="liabilities">
            <label>Residence/Mortgage ($): <input type="number" id="residence-mortgage" min="0" step="1000" placeholder="100000"></label>
            <label>Other Debt ($): <input type="number" id="other-debt" min="0" step="1000" placeholder="5000"></label>
          </div>
        </div>
        <div class="sub-tab-content" id="insurance" style="display: none;">
          <div class="client">
            <h5>Client 1</h5>
            <label>Life Insurance ($): <input type="number" id="c1-life-insurance" min="0" step="1000" placeholder="0"></label>
            <label>Disability Insurance ($): <input type="number" id="c1-disability-insurance" min="0" step="1000" placeholder="0"></label>
            <label>Long-Term Care ($): <input type="number" id="c1-long-term-care" min="0" step="1000" placeholder="0"></label>
          </div>
          <div class="client" id="client2-insurance-section" style="display: none;">
            <h5>Client 2</h5>
            <label>Life Insurance ($): <input type="number" id="c2-life-insurance" min="0" step="1000" placeholder="0"></label>
            <label>Disability Insurance ($): <input type="number" id="c2-disability-insurance" min="0" step="1000" placeholder="0"></label>
            <label>Long-Term Care ($): <input type="number" id="c2-long-term-care" min="0" step="1000" placeholder="0"></label>
          </div>
        </div>
        <div class="sub-tab-content" id="savings-expenses" style="display: none;">
          <div class="savings-expenses">
            <label>Household Expenses ($/mo): <input type="number" id="household-expenses" min="0" step="100" placeholder="3000"></label>
            <label>Taxes ($/mo): <input type="number" id="taxes" min="0" step="100" placeholder="1000"></label>
            <label>Other Expenses ($/mo): <input type="number" id="other-expenses" min="0" step="100" placeholder="500"></label>
            <label>Monthly Savings ($): <input type="number" id="monthly-savings" min="0" step="100" placeholder="2000"></label>
          </div>
        </div>
        <div class="sub-tab-content" id="assumptions" style="display: none;">
          <div class="assumptions">
            <label>Mortality Age: <input type="number" id="mortality-age" min="1" max="120" placeholder="90"></label>
            <label>Inflation (%): <input type="number" id="inflation" min="0" max="100" step="0.1" placeholder="2"></label>
            <label>ROR During Retirement (%): <input type="number" id="ror-retirement" min="0" max="100" step="0.1" placeholder="4"></label>
            <label>Analysis Date: <input type="date" id="analysis-date" placeholder="2025-04-25"></label>
          </div>
        </div>
      </div>
    `
  }
];
