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

// Define report options specific to Summary
const reportOptions = [
  { id: 'output-analysis-goals', label: 'Analysis Goals', reportId: 'report-analysis-goals', title: 'Analysis Goals' },
  { id: 'output-financial-inventory', label: 'Financial Inventory', reportId: 'report-financial-inventory', title: 'Financial Inventory' },
  { id: 'output-financial-fitness', label: 'Financial Fitness', reportId: 'report-financial-fitness', title: 'Financial Fitness' }
];

export function updateSummaryOutputs(analysisOutputs, clientData, formatCurrency, selectedReports) {
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

    const amount = parseFloat(clientData.summary?.amount) || 0;

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
          <p>Entered Amount: ${formatCurrency(amount)}</p>
        </div>
      </div>
      <div class="output-tab-content ${currentSelection === 'output-financial-inventory' ? 'active' : ''}" id="output-financial-inventory" style="display: ${currentSelection === 'output-financial-inventory' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Financial Inventory</h3>
          <p>Entered Amount: ${formatCurrency(amount)}</p>
        </div>
      </div>
      <div class="output-tab-content ${currentSelection === 'output-financial-fitness' ? 'active' : ''}" id="output-financial-fitness" style="display: ${currentSelection === 'output-financial-fitness' ? 'block' : 'none'};">
        <div class="output-card">
          <h3>Financial Fitness</h3>
          <p>Entered Amount: ${formatCurrency(amount)}</p>
        </div>
      </div>
    `;

    // Setup dropdown and checkbox interactions
    setupOutputControls(reportOptions, selectedReports, clientData);
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
