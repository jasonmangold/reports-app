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
      <div class="output-card">
        <h4>Summary Output</h4>
        <p>Entered Amount: ${formatCurrency(amount)}</p>
      </div>
    `;
    analysisOutputs.innerHTML = outputHTML;
  } catch (error) {
    console.error('Error in updateSummaryOutputs:', error);
    analysisOutputs.innerHTML = '<p class="output-error">Error rendering Summary outputs.</p>';
  }
}
