import { formatCurrency, getAge } from './index.js';
import { updateRetirementGraph, updateRetirementOutputs } from './retirementAccumulation.js';
import { updatePersonalFinanceGraph, updatePersonalFinanceOutputs } from './personalFinance.js';
import { updateSummaryOutputs } from './summary.js';

// Load clientData, selectedReports, and presentationOptions from localStorage
let clientData = JSON.parse(localStorage.getItem('clientData')) || {
  client1: {
    personal: { name: "Paul Johnson", dob: "1980-01-01", retirementAge: "67" },
    incomeSources: { employment: "65000", socialSecurity: "2000", other: "500", interestDividends: "1000" },
    accounts: [{ name: "401(k)", balance: "100000", contribution: "10000", employerMatch: "3", ror: "6" }],
    other: { assets: [{ name: "Rental Property", balance: "200000", ror: "4", debt: "50000" }] },
    insurance: { lifeInsurance: "0", disabilityInsurance: "0", longTermCare: "0" }
  },
  client2: {
    personal: { name: "Sally Johnson", dob: "1982-01-01", retirementAge: "67" },
    incomeSources: { employment: "50000", socialSecurity: "1500", other: "300", interestDividends: "800" },
    accounts: [{ name: "IRA", balance: "80000", contribution: "8000", employerMatch: "0", ror: "6" }],
    other: { assets: [] },
    insurance: { lifeInsurance: "0", disabilityInsurance: "0", longTermCare: "0" }
  },
  isMarried: false
};
let selectedReports = JSON.parse(localStorage.getItem('selectedReports')) || [];
let presentationOptions = JSON.parse(localStorage.getItem('presentationOptions')) || {
  includeTitlePage: true,
  includeToc: false,
  includePersonalProfile: false,
  includeRecordOfReports: false,
  includeDisclaimer: true,
  includeDisclosure: true,
  disclaimerPlacement: 'end',
  includeHeader: false,
  headerText: '',
  includeFooter: false,
  footerText: '',
  includePageNumbers: true,
  includePresentationDate: true,
  presentationDate: '05/21/2025'
};
let reportCount = selectedReports.length;
let selectedClientId = 1;

// Client list for modal
const clients = [
  { id: 1, name: clientData.client1.personal.name, data: clientData.client1 },
  { id: 2, name: clientData.client2.personal.name, data: clientData.client2 }
];

// DOM elements
const reportList = document.getElementById('report-list');
const previewBtn = document.getElementById('preview-presentation-btn');
const presentationOptionsBtn = document.getElementById('presentation-options-btn');
const presentationCount = document.getElementById('presentation-count');
const pdfPreviewModal = document.getElementById('pdf-preview-modal');
const pdfPreviewContent = document.getElementById('pdf-preview-content');
const closePdfModal = document.getElementById('close-pdf-modal');
const downloadPdfBtn = document.getElementById('download-pdf-btn');
const titleInput = document.getElementById('presentation-title-input');
const clientNameInput = document.getElementById('client-name-input');
const clientAddressInput = document.getElementById('client-address-input');
const clientPhoneInput = document.getElementById('client-phone-input');
const clientInfo = document.getElementById('client-info');
const clientList = document.getElementById('client-list');
const clientSearch = document.getElementById('client-search');

// Load chart configuration from localStorage
function loadChartConfig(analysisType) {
  try {
    const savedConfig = localStorage.getItem(`chartConfig_${analysisType}`);
    return savedConfig ? JSON.parse(savedConfig) : null;
  } catch (error) {
    console.error('Error in loadChartConfig:', error);
    return null;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('Initializing presentation page...');
    console.log('Loaded selectedReports:', selectedReports);
    selectedReports = JSON.parse(localStorage.getItem('selectedReports')) || [];
    selectedReports = selectedReports.filter(report => 
      report && typeof report === 'object' && report.id && typeof report.title === 'string'
    );
    console.log('Filtered selectedReports:', selectedReports);
    reportCount = selectedReports.length;
    localStorage.setItem('selectedReports', JSON.stringify(selectedReports));
    updateClientInfo();
    populateClientList();
    populateReportList();
    setupDragAndDrop();
    updatePreviewButton();
    setupModalEvents();
    setupInputEvents();
    setupPresentationOptions();
    setupClientSearch();
  } catch (error) {
    console.error('Initialization error:', error);
    reportList.innerHTML = '<p class="output-error">Error initializing page. Please check console for details.</p>';
  }
});

// Update client information
function updateClientInfo() {
  try {
    const name = clientNameInput?.value.trim() || clientData.client1?.personal?.name || 'No Client Selected';
    const address = clientAddressInput?.value.trim();
    const phone = clientPhoneInput?.value.trim();
    let clientInfoText = name;
    if (clientData.isMarried && clientData.client2?.personal?.name && !clientNameInput?.value.trim()) {
      clientInfoText = `${clientData.client1.personal.name} & ${clientData.client2.personal.name}`;
    }
    if (address) clientInfoText += `<br>${address}`;
    if (phone) clientInfoText += `<br>${phone}`;
    clientInfo.innerHTML = clientInfoText;
  } catch (error) {
    console.error('Error in updateClientInfo:', error);
  }
}

// Populate client list in modal
function populateClientList() {
  try {
    if (!clientList) {
      console.error('clientList element not found');
      return;
    }
    clientList.innerHTML = '';
    clients.forEach(client => {
      const li = document.createElement('li');
      li.textContent = client.name;
      li.dataset.clientId = client.id;
      if (client.id === selectedClientId) {
        li.classList.add('selected');
      }
      li.addEventListener('click', () => {
        selectedClientId = client.id;
        clientData.client1 = client.data;
        localStorage.setItem('clientData', JSON.stringify(clientData));
        updateClientInfo();
        clientList.querySelectorAll('li').forEach(item => item.classList.remove('selected'));
        li.classList.add('selected');
        const clientModal = document.getElementById('client-modal');
        if (clientModal) clientModal.style.display = 'none';
      });
      clientList.appendChild(li);
    });
  } catch (error) {
    console.error('Error in populateClientList:', error);
  }
}

// Setup client search functionality
function setupClientSearch() {
  try {
    clientSearch.addEventListener('input', () => {
      const searchTerm = clientSearch.value.toLowerCase();
      const filteredClients = clients.filter(client => client.name.toLowerCase().includes(searchTerm));
      clientList.innerHTML = '';
      filteredClients.forEach(client => {
        const li = document.createElement('li');
        li.textContent = client.name;
        li.dataset.clientId = client.id;
        if (client.id === selectedClientId) {
          li.classList.add('selected');
        }
        li.addEventListener('click', () => {
          selectedClientId = client.id;
          clientData.client1 = client.data;
          localStorage.setItem('clientData', JSON.stringify(clientData));
          updateClientInfo();
          clientList.querySelectorAll('li').forEach(item => item.classList.remove('selected'));
          li.classList.add('selected');
          document.getElementById('client-modal').style.display = 'none';
        });
        clientList.appendChild(li);
      });
    });
  } catch (error) {
    console.error('Error in setupClientSearch:', error);
  }
}

// Update populateReportList to include Edit button and title click handler
function populateReportList() {
  try {
    reportList.innerHTML = '';
    if (!Array.isArray(selectedReports) || selectedReports.length === 0) {
      reportList.innerHTML = '<p>No reports selected for presentation.</p>';
      return;
    }

    const validReports = selectedReports.filter(report => 
      report && typeof report === 'object' && report.id && typeof report.title === 'string'
    );

    if (validReports.length === 0) {
      reportList.innerHTML = '<p>No valid reports available.</p>';
      return;
    }

    validReports.forEach((report, index) => {
      const reportItem = document.createElement('div');
      reportItem.classList.add('report-item');
      reportItem.dataset.reportId = report.id;
      reportItem.draggable = true;
      reportItem.innerHTML = `
        <span class="report-title" style="cursor: pointer;">${report.title}</span>
        <button class="remove-report-btn" data-report-id="${report.id}">Remove</button>
        <button class="edit-report-btn" data-report-id="${report.id}">Edit Inputs</button>
      `;
      // Add click event for preview
      reportItem.querySelector('.report-title').addEventListener('click', async () => {
        const modal = document.getElementById('report-preview-modal');
        const content = document.getElementById('report-preview-content');
        content.innerHTML = '<p>Loading preview...</p>';
        modal.style.display = 'flex';
        const tempContainer = document.createElement('div');
        tempContainer.style.width = '800px';
        tempContainer.style.background = '#fff';
        if (report.id.includes('retirement')) {
          await renderRetirementReport(tempContainer, report.id);
        } else if (report.id.includes('personal-finance')) {
          await renderPersonalFinanceReport(tempContainer, report.id);
        } else if (report.id.includes('summary')) {
          await renderSummaryReport(tempContainer, report.id);
        } else {
          tempContainer.innerHTML = `<h2>${report.title}</h2><p>Data not available for preview.</p>`;
        }
        content.innerHTML = '';
        content.appendChild(tempContainer);
        // Set up Edit Inputs button in modal
        const editBtn = document.getElementById('edit-report-inputs-btn');
        editBtn.dataset.reportId = report.id;
      });
      reportList.appendChild(reportItem);
    });

    reportCount = validReports.length;
    presentationCount.textContent = reportCount;
    presentationCount.classList.toggle('active', reportCount > 0);
    localStorage.setItem('selectedReports', JSON.stringify(validReports));
    updatePreviewButton();
  } catch (error) {
    console.error('Error in populateReportList:', error);
    reportList.innerHTML = `<p class="output-error">Error populating report list: ${error.message}</p>`;
  }
}


// Update setupDragAndDrop to handle Edit button clicks
function setupDragAndDrop() {
  try {
    reportList.addEventListener('dragstart', (e) => {
      const reportItem = e.target.closest('.report-item');
      if (reportItem) {
        e.dataTransfer.setData('text/plain', reportItem.dataset.reportId);
        reportItem.classList.add('dragging');
      }
    });

    reportList.addEventListener('dragend', (e) => {
      const reportItem = e.target.closest('.report-item');
      if (reportItem) {
        reportItem.classList.remove('dragging');
      }
    });

    reportList.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(reportList, e.clientY);
      const dragging = document.querySelector('.dragging');
      if (afterElement == null) {
        reportList.appendChild(dragging);
      } else {
        reportList.insertBefore(dragging, afterElement);
      }
    });

    reportList.addEventListener('drop', (e) => {
      e.preventDefault();
      const reportId = e.dataTransfer.getData('text/plain');
      const newOrder = Array.from(reportList.children).map(item => item.dataset.reportId);
      selectedReports = newOrder
        .map(id => selectedReports.find(report => report.id === id))
        .filter(report => report !== undefined);
      saveSelectedReports();
    });

    reportList.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-report-btn')) {
        const reportId = e.target.dataset.reportId;
        selectedReports = selectedReports.filter(report => report.id !== reportId);
        reportCount--;
        saveSelectedReports();
        populateReportList();
        updatePreviewButton();
      } else if (e.target.classList.contains('edit-report-btn')) {
        const reportId = e.target.dataset.reportId;
        localStorage.setItem('editReportId', reportId);
        window.location.href = 'analysis.html';
      }
    });
  } catch (error) {
    console.error('Error in setupDragAndDrop:', error);
  }
}

// Helper function to determine where to drop
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.report-item:not(.dragging)')];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Update preview button state
function updatePreviewButton() {
  previewBtn.disabled = selectedReports.length === 0;
}

// Save selectedReports to localStorage
function saveSelectedReports() {
  localStorage.setItem('selectedReports', JSON.stringify(selectedReports));
  presentationCount.textContent = reportCount;
  presentationCount.classList.toggle('active', reportCount > 0);
}

// Setup input events for title and client info
function setupInputEvents() {
  if (titleInput) {
    titleInput.addEventListener('input', () => {
      localStorage.setItem('presentationTitle', titleInput.value);
    });
  }
  if (clientNameInput) {
    clientNameInput.addEventListener('input', () => {
      localStorage.setItem('clientName', clientNameInput.value);
      updateClientInfo();
    });
  }
  if (clientAddressInput) {
    clientAddressInput.addEventListener('input', () => {
      localStorage.setItem('clientAddress', clientAddressInput.value);
      updateClientInfo();
    });
  }
  if (clientPhoneInput) {
    clientPhoneInput.addEventListener('input', () => {
      localStorage.setItem('clientPhone', clientPhoneInput.value);
      updateClientInfo();
    });
  }
}

// Setup presentation options modal
function setupPresentationOptions() {
  if (presentationOptionsBtn) {
    presentationOptionsBtn.addEventListener('click', () => {
      document.getElementById('presentation-options-modal').style.display = 'flex';
    });
  }
  const closeOptionsModal = document.getElementById('close-options-modal');
  if (closeOptionsModal) {
    closeOptionsModal.addEventListener('click', () => {
      document.getElementById('presentation-options-modal').style.display = 'none';
    });
  }
  const includeHeaderCheckbox = document.getElementById('include-header');
  const headerTextInput = document.getElementById('header-text');
  if (includeHeaderCheckbox && headerTextInput) {
    headerTextInput.disabled = !includeHeaderCheckbox.checked;
    includeHeaderCheckbox.addEventListener('change', (e) => {
      headerTextInput.disabled = !e.target.checked;
      presentationOptions.includeHeader = e.target.checked;
      presentationOptions.headerText = headerTextInput.value;
      localStorage.setItem('presentationOptions', JSON.stringify(presentationOptions));
    });
    headerTextInput.addEventListener('input', () => {
      presentationOptions.headerText = headerTextInput.value;
      localStorage.setItem('presentationOptions', JSON.stringify(presentationOptions));
    });
  }
  const includeFooterCheckbox = document.getElementById('include-footer');
  const footerTextInput = document.getElementById('footer-text');
  if (includeFooterCheckbox && footerTextInput) {
    footerTextInput.disabled = !includeFooterCheckbox.checked;
    includeFooterCheckbox.addEventListener('change', (e) => {
      footerTextInput.disabled = !e.target.checked;
      presentationOptions.includeFooter = e.target.checked;
      presentationOptions.footerText = footerTextInput.value;
      localStorage.setItem('presentationOptions', JSON.stringify(presentationOptions));
    });
    footerTextInput.addEventListener('input', () => {
      presentationOptions.footerText = footerTextInput.value;
      localStorage.setItem('presentationOptions', JSON.stringify(presentationOptions));
    });
  }
  const optionCheckboxes = [
    'include-title-page', 'include-toc', 'include-personal-profile',
    'include-record-of-reports', 'include-disclaimer', 'include-disclosure',
    'include-page-numbers', 'include-presentation-date'
  ];
  optionCheckboxes.forEach(id => {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      checkbox.addEventListener('change', (e) => {
        const optionKey = id.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        presentationOptions[optionKey] = e.target.checked;
        localStorage.setItem('presentationOptions', JSON.stringify(presentationOptions));
      });
    }
  });
  const disclaimerPlacement = document.getElementById('disclaimer-placement');
  if (disclaimerPlacement) {
    disclaimerPlacement.addEventListener('change', (e) => {
      presentationOptions.disclaimerPlacement = e.target.value;
      localStorage.setItem('presentationOptions', JSON.stringify(presentationOptions));
    });
  }
  const presentationDateInput = document.getElementById('presentation-date');
  if (presentationDateInput) {
    presentationDateInput.addEventListener('input', () => {
      presentationOptions.presentationDate = presentationDateInput.value;
      localStorage.setItem('presentationOptions', JSON.stringify(presentationOptions));
    });
  }
}

// Update setupModalEvents to include report preview modal
function setupModalEvents() {
  previewBtn.addEventListener('click', generatePresentationPreview);
  closePdfModal.addEventListener('click', () => {
    pdfPreviewModal.style.display = 'none';
  });
  downloadPdfBtn.addEventListener('click', downloadPresentationPDF);

  // New report preview modal events
  const closeReportModal = document.getElementById('close-report-modal');
  if (closeReportModal) {
    closeReportModal.addEventListener('click', () => {
      document.getElementById('report-preview-modal').style.display = 'none';
    });
  }
  const editReportInputsBtn = document.getElementById('edit-report-inputs-btn');
  if (editReportInputsBtn) {
    editReportInputsBtn.addEventListener('click', () => {
      const reportId = editReportInputsBtn.dataset.reportId;
      localStorage.setItem('editReportId', reportId);
      window.location.href = 'analysis.html';
    });
  }
}
  
// Render report functions
async function renderRetirementReport(container, reportId) {
  try {
    const reportDiv = document.createElement('div');
    reportDiv.classList.add('report-preview');
    reportDiv.style.padding = '20px';
    reportDiv.style.marginBottom = '20px';
    reportDiv.style.background = '#fff';

    const title = selectedReports.find(r => r.id === reportId)?.title || 'Retirement Accumulation';
    reportDiv.innerHTML = `<h2>${title}</h2>`;

    // Render non-chart outputs
    const outputContainer = document.createElement('div');
    updateRetirementOutputs(outputContainer, clientData, formatCurrency, getAge, selectedReports, Chart);
    reportDiv.appendChild(outputContainer);

    // Render chart if applicable
    if (reportId.includes('graph') || reportId.includes('timeline')) {
      const chartContainer = document.createElement('div');
      chartContainer.style.width = '100%';
      chartContainer.style.height = '400px';
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 400;
      chartContainer.appendChild(canvas);
      reportDiv.appendChild(chartContainer);

      const savedConfig = loadChartConfig('retirement-accumulation');
      const graphType = reportId.includes('timeline') ? 'timeline' : 'income';
      if (savedConfig) {
        // Modify config for timeline if needed
        let modifiedConfig = JSON.parse(JSON.stringify(savedConfig));
        if (graphType === 'timeline') {
          // Adjust config for timeline (simplified; assumes updateRetirementGraph handles type internally)
          modifiedConfig.options.plugins = modifiedConfig.options.plugins || {};
          modifiedConfig.options.plugins.title = { display: true, text: 'Retirement Timeline' };
        }
        new Chart(canvas, modifiedConfig);
      } else {
        // Fallback to generating chart
        updateRetirementGraph(canvas, clientData, Chart, getAge, graphType);
      }

      // Ensure chart is non-interactive and convert to image
      await new Promise(resolve => setTimeout(resolve, 500));
      const img = document.createElement('img');
      img.src = canvas.toDataURL('image/png');
      img.style.width = '100%';
      img.style.height = 'auto';
      chartContainer.innerHTML = '';
      chartContainer.appendChild(img);

      // Destroy chart instance to prevent interactivity
      const chartInstance = Chart.getChart(canvas);
      if (chartInstance) {
        chartInstance.destroy();
      }
    }

    container.appendChild(reportDiv);
  } catch (error) {
    console.error('Error in renderRetirementReport:', error);
    container.innerHTML += `<p class="output-error">Error rendering retirement report: ${error.message}</p>`;
  }
}

async function renderPersonalFinanceReport(container, reportId) {
  try {
    const reportDiv = document.createElement('div');
    reportDiv.classList.add('report-preview');
    reportDiv.style.padding = '20px';
    reportDiv.style.marginBottom = '20px';
    reportDiv.style.background = '#fff';

    const title = selectedReports.find(r => r.id === reportId)?.title || 'Personal Finance';
    reportDiv.innerHTML = `<h2>${title}</h2>`;

    // Render non-chart outputs
    const outputContainer = document.createElement('div');
    updatePersonalFinanceOutputs(outputContainer, clientData, formatCurrency, selectedReports, Chart);
    reportDiv.appendChild(outputContainer);

    // Render chart if applicable
    if (reportId.includes('graph')) {
      const chartContainer = document.createElement('div');
      chartContainer.style.width = '100%';
      chartContainer.style.height = '400px';
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 400;
      chartContainer.appendChild(canvas);
      reportDiv.appendChild(chartContainer);

      const savedConfig = loadChartConfig('personal-finance');
      if (savedConfig) {
        new Chart(canvas, savedConfig);
      } else {
        // Fallback to generating chart
        updatePersonalFinanceGraph(canvas, clientData, Chart);
      }

      // Convert to image
      await new Promise(resolve => setTimeout(resolve, 500));
      const img = document.createElement('img');
      img.src = canvas.toDataURL('image/png');
      img.style.width = '100%';
      img.style.height = 'auto';
      chartContainer.innerHTML = '';
      chartContainer.appendChild(img);

      // Destroy chart instance
      const chartInstance = Chart.getChart(canvas);
      if (chartInstance) {
        chartInstance.destroy();
      }
    }

    container.appendChild(reportDiv);
  } catch (error) {
    console.error('Error in renderPersonalFinanceReport:', error);
    container.innerHTML += `<p class="output-error">Error rendering personal finance report: ${error.message}</p>`;
  }
}

async function renderSummaryReport(container, reportId) {
  try {
    const reportDiv = document.createElement('div');
    reportDiv.classList.add('report-preview');
    reportDiv.style.padding = '20px';
    reportDiv.style.marginBottom = '20px';
    reportDiv.style.background = '#fff';

    const title = selectedReports.find(r => r.id === reportId)?.title || 'Summary';
    reportDiv.innerHTML = `<h2>${title}</h2>`;

    // Render non-chart outputs
    const outputContainer = document.createElement('div');
    updateSummaryOutputs(outputContainer, clientData, formatCurrency, selectedReports, Chart, getAge);
    reportDiv.appendChild(outputContainer);

    // Render chart if applicable
    if (reportId.includes('graph')) {
      const chartContainer = document.createElement('div');
      chartContainer.style.width = '100%';
      chartContainer.style.height = '400px';
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 400;
      chartContainer.appendChild(canvas);
      reportDiv.appendChild(chartContainer);

      const savedConfig = loadChartConfig('summary');
      if (savedConfig) {
        new Chart(canvas, savedConfig);
      } else {
        // Fallback to generating chart
        updateSummaryOutputs(chartContainer, clientData, formatCurrency, selectedReports, Chart, getAge);
      }

      // Convert to image
      await new Promise(resolve => setTimeout(resolve, 500));
      const img = document.createElement('img');
      img.src = canvas.toDataURL('image/png');
      img.style.width = '100%';
      img.style.height = 'auto';
      chartContainer.innerHTML = '';
      chartContainer.appendChild(img);

      // Destroy chart instance
      const chartInstance = Chart.getChart(canvas);
      if (chartInstance) {
        chartInstance.destroy();
      }
    }

    container.appendChild(reportDiv);
  } catch (error) {
    console.error('Error in renderSummaryReport:', error);
    container.innerHTML += `<p class="output-error">Error rendering summary report: ${error.message}</p>`;
  }
}

// Generate presentation preview
async function generatePresentationPreview() {
  try {
    pdfPreviewContent.innerHTML = '<p>Generating preview...</p>';
    pdfPreviewModal.style.display = 'flex';

    const tempContainer = document.createElement('div');
    tempContainer.style.width = '800px';
    tempContainer.style.background = '#fff';
    tempContainer.style.fontFamily = 'Arial, sans-serif';
    tempContainer.style.position = 'relative';

    let pageNumber = 1;

    // Add header and footer if enabled
    const headerText = presentationOptions.includeHeader ? presentationOptions.headerText : '';
    const footerText = presentationOptions.includeFooter ? presentationOptions.footerText : '';

    const addHeaderFooter = (section) => {
      if (headerText) {
        const header = document.createElement('div');
        header.style.position = 'absolute';
        header.style.top = '10px';
        header.style.left = '20px';
        header.style.right = '20px';
        header.style.textAlign = 'center';
        header.style.fontSize = '12px';
        header.style.borderBottom = '1px solid #ccc';
        header.textContent = headerText;
        section.appendChild(header);
      }
      if (footerText || presentationOptions.includePageNumbers || presentationOptions.includePresentationDate) {
        const footer = document.createElement('div');
        footer.style.position = 'absolute';
        footer.style.bottom = '10px';
        footer.style.left = '20px';
        footer.style.right = '20px';
        footer.style.textAlign = 'center';
        footer.style.fontSize = '12px';
        footer.style.borderTop = '1px solid #ccc';
        let footerContent = footerText;
        if (presentationOptions.includePageNumbers) {
          footerContent += ` | Page ${pageNumber}`;
          pageNumber++;
        }
        if (presentationOptions.includePresentationDate) {
          footerContent += ` | ${presentationOptions.presentationDate}`;
        }
        footer.textContent = footerContent;
        section.appendChild(footer);
      }
    };

    // Add title page if enabled
    if (presentationOptions.includeTitlePage) {
      const titlePage = document.createElement('div');
      titlePage.classList.add('report-preview');
      titlePage.style.padding = '20px';
      titlePage.style.marginBottom = '20px';
      titlePage.style.background = '#fff';
      titlePage.style.height = '1000px';
      titlePage.style.display = 'flex';
      titlePage.style.flexDirection = 'column';
      titlePage.style.alignItems = 'center';
      titlePage.style.justifyContent = 'center';
      const presentationTitle = titleInput?.value || localStorage.getItem('presentationTitle') || 'Financial Analysis';
      const name = clientNameInput?.value || clientData.client1?.personal?.name || 'No Client Selected';
      let clientInfoText = name;
      if (clientData.isMarried && clientData.client2?.personal?.name && !clientNameInput?.value.trim()) {
        clientInfoText = `${clientData.client1.personal.name} & ${clientData.client2.personal.name}`;
      }
      const address = clientAddressInput?.value || localStorage.getItem('clientAddress') || '';
      const phone = clientPhoneInput?.value || localStorage.getItem('clientPhone') || '';
      titlePage.innerHTML = `
        <h1 style="font-size: 36px; text-align: center;">${presentationTitle}</h1>
        <p style="font-size: 24px; text-align: center; margin-top: 20px;">Prepared for:</p>
        <p style="font-size: 20px; text-align: center;">${clientInfoText}</p>
        ${address ? `<p style="font-size: 16px; text-align: center;">${address}</p>` : ''}
        ${phone ? `<p style="font-size: 16px; text-align: center;">${phone}</p>` : ''}
        ${presentationOptions.includePresentationDate ? `<p style="font-size: 16px; text-align: center; margin-top: 20px;">${presentationOptions.presentationDate}</p>` : ''}
      `;
      addHeaderFooter(titlePage);
      tempContainer.appendChild(titlePage);
    }

    // Add table of contents if enabled
    if (presentationOptions.includeToc) {
      const tocPage = document.createElement('div');
      tocPage.classList.add('report-preview');
      tocPage.style.padding = '20px';
      tocPage.style.marginBottom = '20px';
      tocPage.style.background = '#fff';
      tocPage.innerHTML = '<h2>Table of Contents</h2><ul>';
      selectedReports.forEach((report, index) => {
        tocPage.innerHTML += `<li style="margin: 10px 0;">${index + 1}. ${report.title}</li>`;
      });
      if (presentationOptions.includePersonalProfile) {
        tocPage.innerHTML += `<li style="margin: 10px 0;">${selectedReports.length + 1}. Personal Profile</li>`;
      }
      if (presentationOptions.includeRecordOfReports) {
        tocPage.innerHTML += `<li style="margin: 10px 0;">${selectedReports.length + (presentationOptions.includePersonalProfile ? 2 : 1)}. Record of Reports</li>`;
      }
      if (presentationOptions.includeDisclaimer && presentationOptions.disclaimerPlacement === 'end') {
        tocPage.innerHTML += `<li style="margin: 10px 0;">${selectedReports.length + (presentationOptions.includePersonalProfile ? 2 : 1) + (presentationOptions.includeRecordOfReports ? 1 : 0)}. Disclaimer</li>`;
      }
      if (presentationOptions.includeDisclosure) {
        tocPage.innerHTML += `<li style="margin: 10px 0;">${selectedReports.length + (presentationOptions.includePersonalProfile ? 2 : 1) + (presentationOptions.includeRecordOfReports ? 1 : 0) + (presentationOptions.includeDisclaimer && presentationOptions.disclaimerPlacement === 'end' ? 1 : 0)}. Disclosure</li>`;
      }
      tocPage.innerHTML += '</ul>';
      addHeaderFooter(tocPage);
      tempContainer.appendChild(tocPage);
    }

    // Add disclaimer at beginning if enabled
    if (presentationOptions.includeDisclaimer && presentationOptions.disclaimerPlacement === 'beginning') {
      const disclaimerPage = document.createElement('div');
      disclaimerPage.classList.add('report-preview');
      disclaimerPage.style.padding = '20px';
      disclaimerPage.style.marginBottom = '20px';
      disclaimerPage.style.background = '#fff';
      disclaimerPage.innerHTML = `
        <h2>Disclaimer</h2>
        <p>This presentation is for informational purposes only and does not constitute financial advice. Please consult a qualified financial advisor before making any investment decisions.</p>
      `;
      addHeaderFooter(disclaimerPage);
      tempContainer.appendChild(disclaimerPage);
    }

    // Add personal profile if enabled
    if (presentationOptions.includePersonalProfile) {
      const profilePage = document.createElement('div');
      profilePage.classList.add('report-preview');
      profilePage.style.padding = '20px';
      profilePage.style.marginBottom = '20px';
      profilePage.style.background = '#fff';
      const c1Age = getAge(clientData.client1.personal.dob);
      const c1RetirementAge = parseInt(clientData.client1.personal.retirementAge) || 67;
      let profileHtml = `
        <h2>Personal Profile</h2>
        <h3>${clientData.client1.personal.name}</h3>
        <p>Age: ${c1Age}</p>
        <p>Retirement Age: ${c1RetirementAge}</p>
        <p>Income Sources:</p>
        <ul>
          <li>Employment: ${formatCurrency(clientData.client1.incomeSources.employment)}</li>
          <li>Social Security: ${formatCurrency(clientData.client1.incomeSources.socialSecurity)}</li>
          <li>Other: ${formatCurrency(clientData.client1.incomeSources.other)}</li>
          <li>Interest/Dividends: ${formatCurrency(clientData.client1.incomeSources.interestDividends)}</li>
        </ul>
      `;
      if (clientData.isMarried && clientData.client2.personal.name) {
        const c2Age = getAge(clientData.client2.personal.dob);
        const c2RetirementAge = parseInt(clientData.client2.personal.retirementAge) || 67;
        profileHtml += `
          <h3>${clientData.client2.personal.name}</h3>
          <p>Age: ${c2Age}</p>
          <p>Retirement Age: ${c2RetirementAge}</p>
          <p>Income Sources:</p>
          <ul>
            <li>Employment: ${formatCurrency(clientData.client2.incomeSources.employment)}</li>
            <li>Social Security: ${formatCurrency(clientData.client2.incomeSources.socialSecurity)}</li>
            <li>Other: ${formatCurrency(clientData.client2.incomeSources.other)}</li>
            <li>Interest/Dividends: ${formatCurrency(clientData.client2.incomeSources.interestDividends)}</li>
          </ul>
        `;
      }
      profilePage.innerHTML = profileHtml;
      addHeaderFooter(profilePage);
      tempContainer.appendChild(profilePage);
    }

    // Render selected reports
    for (const report of selectedReports) {
      if (report.id.includes('retirement')) {
        await renderRetirementReport(tempContainer, report.id);
      } else if (report.id.includes('personal-finance')) {
        await renderPersonalFinanceReport(tempContainer, report.id);
      } else if (report.id.includes('summary')) {
        await renderSummaryReport(tempContainer, report.id);
      } else {
        // Handle generic or unrecognized reports
        const reportDiv = document.createElement('div');
        reportDiv.classList.add('report-preview');
        reportDiv.style.padding = '20px';
        reportDiv.style.marginBottom = '20px';
        reportDiv.style.background = '#fff';
        reportDiv.innerHTML = `
          <h2>${report.title}</h2>
          <p>Data for ${report.title} is not available in this preview.</p>
        `;
        addHeaderFooter(reportDiv);
        tempContainer.appendChild(reportDiv);
        console.warn(`Unrecognized report ID: ${report.id}`);
      }
    }

    // Add record of reports if enabled
    if (presentationOptions.includeRecordOfReports) {
      const recordPage = document.createElement('div');
      recordPage.classList.add('report-preview');
      recordPage.style.padding = '20px';
      recordPage.style.marginBottom = '20px';
      recordPage.style.background = '#fff';
      recordPage.innerHTML = '<h2>Record of Reports</h2><ul>';
      selectedReports.forEach((report, index) => {
        recordPage.innerHTML += `<li style="margin: 10px 0;">${index + 1}. ${report.title}</li>`;
      });
      recordPage.innerHTML += '</ul>';
      addHeaderFooter(recordPage);
      tempContainer.appendChild(recordPage);
    }

    // Add disclaimer at end if enabled
    if (presentationOptions.includeDisclaimer && presentationOptions.disclaimerPlacement === 'end') {
      const disclaimerPage = document.createElement('div');
      disclaimerPage.classList.add('report-preview');
      disclaimerPage.style.padding = '20px';
      disclaimerPage.style.marginBottom = '20px';
      disclaimerPage.style.background = '#fff';
      disclaimerPage.innerHTML = `
        <h2>Disclaimer</h2>
        <p>This presentation is for informational purposes only and does not constitute financial advice. Please consult a qualified financial advisor before making any investment decisions.</p>
      `;
      addHeaderFooter(disclaimerPage);
      tempContainer.appendChild(disclaimerPage);
    }

    // Add disclosure if enabled
    if (presentationOptions.includeDisclosure) {
      const disclosurePage = document.createElement('div');
      disclosurePage.classList.add('report-preview');
      disclosurePage.style.padding = '20px';
      disclosurePage.style.marginBottom = '20px';
      disclosurePage.style.background = '#fff';
      disclosurePage.innerHTML = `
        <h2>Disclosure</h2>
        <p>All data presented is based on the information provided as of ${presentationOptions.presentationDate}. Past performance is not indicative of future results. Investments involve risks, including the possible loss of principal.</p>
      `;
      addHeaderFooter(disclosurePage);
      tempContainer.appendChild(disclosurePage);
    }

    // Append to preview content
    pdfPreviewContent.innerHTML = '';
    pdfPreviewContent.appendChild(tempContainer);
  } catch (error) {
    console.error('Error in generatePresentationPreview:', error);
    pdfPreviewContent.innerHTML = `<p class="output-error">Error generating preview: ${error.message}</p>`;
  }
}

// Download presentation as PDF
async function downloadPresentationPDF() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'letter'
    });

    const tempContainer = pdfPreviewContent.querySelector('div');
    if (!tempContainer) {
      throw new Error('No content to export');
    }

    // Convert HTML to PDF
    await doc.html(tempContainer, {
      callback: function (doc) {
        doc.save('Financial_Presentation.pdf');
      },
      x: 10,
      y: 10,
      width: 430,
      windowWidth: 800
    });
  } catch (error) {
    console.error('Error in downloadPresentationPDF:', error);
    alert('Failed to download PDF. Please check console for details.');
  }
}
