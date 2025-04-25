export const summaryTabs = [
  {
    id: 'summary-basic',
    label: 'Basic',
    content: `
      <h4>Summary Input</h4>
      <label>Amount ($): <input type="number" id="summary-amount" min="0" step="100" placeholder="1000"></label>
    `
  }
];

export function updateSummaryOutputs(analysisOutputs, clientData, formatCurrency) {
  try {
    const amount = parseFloat(clientData.summary?.amount) || 0;
    let outputHTML = `
      <div class="output-tabs">
        <button class="output-tab-btn active" data-tab="output-analysis-goals">Analysis Goals</button>
        <button class="output-tab-btn" data-tab="output-financial-inventory">Financial Inventory</button>
        <button class="output-tab-btn" data-tab="output-financial-fitness">Financial Fitness</button>
      </div>
      <div class="output-tab-content" id="output-analysis-goals" style="display: block;">
        <div class="output-card">
          <h4>Analysis Goals</h4>
          <p>Entered Amount: ${formatCurrency(amount)}</p>
        </div>
      </div>
      <div class="output-tab-content" id="output-financial-inventory" style="display: none;">
        <div class="output-card">
          <h4>Financial Inventory</h4>
          <p>Entered Amount: ${formatCurrency(amount)}</p>
        </div>
      </div>
      <div class="output-tab-content" id="output-financial-fitness" style="display: none;">
        <div class="output-card">
          <h4>Financial Fitness</h4>
          <p>Entered Amount: ${formatCurrency(amount)}</p>
        </div>
      </div>
    `;
    analysisOutputs.innerHTML = outputHTML;
  } catch (error) {
    console.error('Error in updateSummaryOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-error">Error rendering Summary outputs.</p>';
  }
}
