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

// Populate report list
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
        <span class="report-title">${report.title}</span>
        <button class="remove-report-btn" data-report-id="${report.id}">Remove</button>
      `;
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

// Setup drag-and-drop functionality
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
    });
  }
  const includeFooterCheckbox = document.getElementById('include-footer');
  const footerTextInput = document.getElementById('footer-text');
  if (includeFooterCheckbox && footerTextInput) {
    footerTextInput.disabled = !includeFooterCheckbox.checked;
    includeFooterCheckbox.addEventListener('change', (e) => {
      footerTextInput.disabled = !e.target.checked;
    });
  }
}

// Setup modal events
function setupModalEvents() {
  previewBtn.addEventListener('click', generatePresentationPreview);
  closePdfModal.addEventListener('click', () => {
    pdfPreviewModal.style.display = 'none';
  });
  downloadPdfBtn.addEventListener('click', downloadPresentationPDF);
}

// Generate presentation preview
async function generatePresentationPreview() {
  try {
    pdfPreviewContent.innerHTML = '<p>Generating preview...</p>';
    pdfPreviewModal.style.display = 'flex';

    const tempContainer = document.createElement('div');
    tempContainer.style.width = '800px';
    tempContainer.style.background = '#fff';

    // Add header and footer if enabled
    const headerText = presentationOptions.includeHeader ? presentationOptions.headerText : '';
    const footerText = presentationOptions.includeFooter ? presentationOptions.footerText : '';

    // Add title page if enabled
    if (presentationOptions.includeTitlePage) {
      const titlePage = document.createElement('div');
      titlePage.classList.add('report-preview');
      titlePage.style.padding = '20px';
      titlePage.style.marginBottom = '20px';
      titlePage.style.background = '#fff';
      const presentationTitle = titleInput?.value || localStorage.getItem('presentationTitle') || 'Financial Analysis';
      const name = clientNameInput?.value || clientData.client1?.personal?.name || 'No Client Selected';
      let clientInfoText = name;
      if (!name && clientData.isMarried && clientData.client2?.personal?.name) {
        clientInfoText = `${clientData.client1.personal.name} & ${clientData.client2.personal.name}`;
      }
      const address = clientAddressInput?.value || localStorage.getItem('clientAddress') || '';
      const phone = clientPhoneInput?.value || localStorage.getItem('clientPhone') || '';
      if (address) clientInfoText += `<br>${address}`;
      if (phone) clientInfoText += `<br>${phone}`;
      titlePage.innerHTML = `
        ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
        <h1 style="text-align: center; font-size: 24px; margin-bottom: 20px;">${presentationTitle}</h1>
        <h2 style="text-align: center; font-size: 18px;">Prepared for: ${clientInfoText}</h2>
        <p style="text-align: center; font-size: 14px;">Date: ${presentationOptions.includePresentationDate ? presentationOptions.presentationDate : new Date().toLocaleDateString()}</p>
        ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
      `;
      tempContainer.appendChild(titlePage);
    }

    // Add table of contents if enabled
    if (presentationOptions.includeToc && selectedReports.length > 0) {
      const tocPage = document.createElement('div');
      tocPage.classList.add('report-preview');
      tocPage.style.padding = '20px';
      tocPage.style.marginBottom = '20px';
      tocPage.style.background = '#fff';
      let tocContent = `<h2 style="text-align: center; font-size: 20px;">Table of Contents</h2><ul style="list-style: none; padding: 0;">`;
      selectedReports.forEach((report, index) => {
        tocContent += `<li style="margin: 10px 0;">${index + 1}. ${report.title}</li>`;
      });
      tocContent += '</ul>';
      tocPage.innerHTML = `
        ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
        ${tocContent}
        ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
      `;
      tempContainer.appendChild(tocPage);
    }

    // Add personal profile page if enabled
    if (presentationOptions.includePersonalProfile && clientData.client1?.personal) {
      const profilePage = document.createElement('div');
      profilePage.classList.add('report-preview');
      profilePage.style.padding = '20px';
      profilePage.style.marginBottom = '20px';
      profilePage.style.background = '#fff';
      let profileContent = `<h2 style="text-align: center; font-size: 20px;">Personal Profile</h2>`;
      profileContent += `<p>Name: ${clientData.client1.personal.name || 'N/A'}</p>`;
      if (clientData.isMarried && clientData.client2?.personal?.name) {
        profileContent += `<p>Spouse: ${clientData.client2.personal.name}</p>`;
      }
      profileContent += `<p>Age: ${getAge(clientData.client1.personal.dob) || 'N/A'}</p>`;
      if (clientAddressInput?.value) profileContent += `<p>Address: ${clientAddressInput.value}</p>`;
      if (clientPhoneInput?.value) profileContent += `<p>Phone: ${clientPhoneInput.value}</p>`;
      profilePage.innerHTML = `
        ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
        ${profileContent}
        ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
      `;
      tempContainer.appendChild(profilePage);
    }

    // Add disclaimer and disclosure at beginning if enabled and selected
    if (presentationOptions.disclaimerPlacement === 'beginning') {
      if (presentationOptions.includeDisclaimer) {
        const disclaimerPage = document.createElement('div');
        disclaimerPage.classList.add('report-preview');
        disclaimerPage.style.padding = '20px';
        disclaimerPage.style.marginBottom = '20px';
        disclaimerPage.style.background = '#fff';
        disclaimerPage.innerHTML = `
          ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
          <h2 style="text-align: center; font-size: 20px;">Disclaimer</h2>
          <p>This presentation is for informational purposes only and does not constitute financial advice.</p>
          ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
        `;
        tempContainer.appendChild(disclaimerPage);
      }
      if (presentationOptions.includeDisclosure) {
        const disclosurePage = document.createElement('div');
        disclosurePage.classList.add('report-preview');
        disclosurePage.style.padding = '20px';
        disclosurePage.style.marginBottom = '20px';
        disclosurePage.style.background = '#fff';
        disclosurePage.innerHTML = `
          ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
          <h2 style="text-align: center; font-size: 20px;">Disclosure</h2>
          <p>All data presented is based on information provided by the client and is subject to change.</p>
          ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
        `;
        tempContainer.appendChild(disclosurePage);
      }
    }

    // Render reports
    for (const report of selectedReports) {
      if (!report.id || !report.title) {
        console.warn('Skipping invalid report:', report);
        continue;
      }

      const reportDiv = document.createElement('div');
      reportDiv.classList.add('report-preview');
      reportDiv.style.padding = '20px';
      reportDiv.style.marginBottom = '20px';
      reportDiv.style.background = '#fff';

      const parts = report.id.split('-');
      let analysisType = parts[0] || '';
      let outputType = parts.length > 1 ? parts[parts.length - 1] : '';

      if (report.id.startsWith('report-retirement-fact-finder')) {
        analysisType = 'retirement-accumulation';
        outputType = 'fact-finder';
      } else if (report.id.includes('retirement')) {
        analysisType = 'retirement-accumulation';
      } else if (report.id.includes('personal-finance')) {
        analysisType = 'personal-finance';
      } else if (report.id.includes('summary')) {
        analysisType = 'summary';
      }

      if (!analysisType) {
        reportDiv.innerHTML = `
          ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
          <h3>${report.title}</h3><p>Invalid report ID format: ${report.id}</p>
          ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
        `;
        tempContainer.appendChild(reportDiv);
        continue;
      }

      if (analysisType === 'retirement-accumulation') {
        await renderRetirementReport(reportDiv, outputType, report.title);
      } else if (analysisType === 'personal-finance') {
        await renderPersonalFinanceReport(reportDiv, outputType, report.title);
      } else if (analysisType === 'summary') {
        await renderSummaryReport(reportDiv, outputType, report.title);
      } else {
        reportDiv.innerHTML = `
          ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
          <h3>${report.title}</h3><p>Unsupported report type: ${report.id}</p>
          ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
        `;
      }

      if (headerText) {
        const headerDiv = document.createElement('p');
        headerDiv.style.textAlign = 'center';
        headerDiv.style.fontSize = '12px';
        headerDiv.style.marginBottom = '10px';
        headerDiv.textContent = headerText;
        reportDiv.insertBefore(headerDiv, reportDiv.firstChild);
      }
      if (footerText) {
        const footerDiv = document.createElement('p');
        footerDiv.style.textAlign = 'center';
        footerDiv.style.fontSize = '12px';
        footerDiv.style.marginTop = '10px';
        footerDiv.textContent = footerText;
        reportDiv.appendChild(footerDiv);
      }

      tempContainer.appendChild(reportDiv);
    }

    // Add record of reports if enabled
    if (presentationOptions.includeRecordOfReports && selectedReports.length > 0) {
      const recordPage = document.createElement('div');
      recordPage.classList.add('report-preview');
      recordPage.style.padding = '20px';
      recordPage.style.marginBottom = '20px';
      recordPage.style.background = '#fff';
      let recordContent = `<h2 style="text-align: center; font-size: 20px;">Record of Reports</h2><ul style="list-style: none; padding: 0;">`;
      selectedReports.forEach((report, index) => {
        recordContent += `<li style="margin: 10px 0;">${index + 1}. ${report.title}</li>`;
      });
      recordContent += '</ul>';
      recordPage.innerHTML = `
        ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
        ${recordContent}
        ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
      `;
      tempContainer.appendChild(recordPage);
    }

    // Add disclaimer and disclosure at end if enabled and selected
    if (presentationOptions.disclaimerPlacement === 'end') {
      if (presentationOptions.includeDisclaimer) {
        const disclaimerPage = document.createElement('div');
        disclaimerPage.classList.add('report-preview');
        disclaimerPage.style.padding = '20px';
        disclaimerPage.style.marginBottom = '20px';
        disclaimerPage.style.background = '#fff';
        disclaimerPage.innerHTML = `
          ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
          <h2 style="text-align: center; font-size: 20px;">Disclaimer</h2>
          <p>This presentation is for informational purposes only and does not constitute financial advice.</p>
          ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
        `;
        tempContainer.appendChild(disclaimerPage);
      }
      if (presentationOptions.includeDisclosure) {
        const disclosurePage = document.createElement('div');
        disclosurePage.classList.add('report-preview');
        disclosurePage.style.padding = '20px';
        disclosurePage.style.marginBottom = '20px';
        disclosurePage.style.background = '#fff';
        disclosurePage.innerHTML = `
          ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
          <h2 style="text-align: center; font-size: 20px;">Disclosure</h2>
          <p>All data presented is based on information provided by the client and is subject to change.</p>
          ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
        `;
        tempContainer.appendChild(disclosurePage);
      }
    }

    // Convert canvas to images for preview
    const canvases = tempContainer.querySelectorAll('canvas');
    for (const canvas of canvases) {
      const imgData = canvas.toDataURL('image/png');
      const img = document.createElement('img');
      img.src = imgData;
      img.style.width = canvas.style.width || '800px';
      img.style.height = canvas.style.height || '400px';
      canvas.parentNode.replaceChild(img, canvas);
    }

    pdfPreviewContent.innerHTML = '';
    pdfPreviewContent.appendChild(tempContainer);

    pdfPreviewContent.style.display = 'block';
    pdfPreviewContent.style.opacity = '1';
    pdfPreviewContent.style.visibility = 'visible';
  } catch (error) {
    console.error('Error generating preview:', error);
    pdfPreviewContent.innerHTML = '<p class="output-error">Error generating preview. Please check console.</p>';
  }
}

// Render Retirement Accumulation report
async function renderRetirementReport(container, outputType, title) {
  container.innerHTML = `<h3>${title || 'Untitled Report'}</h3>`;
  if (!clientData || Object.keys(clientData).length === 0) {
    container.innerHTML += '<p>No client data available for this report.</p>';
    return;
  }
  if (outputType === 'graph' || outputType === 'timeline') {
    const canvas = document.createElement('canvas');
    canvas.id = `temp-chart-${Date.now()}`;
    canvas.style.width = '800px';
    canvas.style.height = '400px';
    container.appendChild(canvas);
    const chartInstance = await updateRetirementGraph(canvas, clientData, window.Chart, getAge, outputType);
    if (!chartInstance) {
      container.innerHTML += '<p>Failed to render chart.</p>';
    }
  } else {
    updateRetirementOutputs(container, clientData, formatCurrency, getAge, selectedReports, window.Chart, outputType);
    if (!container.innerHTML.includes('output-card') && !container.innerHTML.includes('output-table')) {
      container.innerHTML += '<p>No retirement data available for this output type.</p>';
    }
  }
}

// Render Personal Finance report
async function renderPersonalFinanceReport(container, outputType, title) {
  container.innerHTML = `<h3>${title || 'Untitled Report'}</h3>`;
  if (!clientData || Object.keys(clientData).length === 0) {
    container.innerHTML += '<p>No client data available for this report.</p>';
    return;
  }
  if (outputType === 'graph' || outputType === 'timeline') {
    const canvas = document.createElement('canvas');
    canvas.id = `temp-chart-${Date.now()}`;
    canvas.style.width = '800px';
    canvas.style.height = '400px';
    container.appendChild(canvas);
    const chartInstance = await updatePersonalFinanceGraph(canvas, clientData, window.Chart, outputType);
    if (!chartInstance) {
      container.innerHTML += '<p>Failed to render chart.</p>';
    }
  } else {
    updatePersonalFinanceOutputs(container, clientData, formatCurrency, selectedReports, window.Chart, outputType);
    if (!container.innerHTML.includes('output-card') && !container.innerHTML.includes('output-table')) {
      container.innerHTML += '<p>No personal finance data available for this output type.</p>';
    }
  }
}

// Render Summary report
async function renderSummaryReport(container, outputType, title) {
  container.innerHTML = `<h3>${title || 'Untitled Report'}</h3>`;
  if (!clientData || Object.keys(clientData).length === 0) {
    container.innerHTML += '<p>No client data available for this report.</p>';
    return;
  }
  if (outputType === 'graph' || outputType === 'timeline') {
    const canvas = document.createElement('canvas');
    canvas.id = `temp-chart-${Date.now()}`;
    canvas.style.width = '800px';
    canvas.style.height = '400px';
    container.appendChild(canvas);
    const chartInstance = await updateSummaryOutputs(container, clientData, formatCurrency, selectedReports, window.Chart, getAge, outputType);
    if (!chartInstance) {
      container.innerHTML += '<p>Failed to render chart.</p>';
    }
  } else {
    updateSummaryOutputs(container, clientData, formatCurrency, selectedReports, window.Chart, getAge, outputType);
    if (!container.innerHTML.includes('output-card') && !container.innerHTML.includes('output-table')) {
      container.innerHTML += '<p>No summary data available for this output type.</p>';
    }
  }
}

// Download presentation as PDF
async function downloadPresentationPDF() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'letter' });
    let yOffset = 20;
    let pageNumber = 1;

    const headerText = presentationOptions.includeHeader ? presentationOptions.headerText : '';
    const footerText = presentationOptions.includeFooter ? presentationOptions.footerText : '';

    // Add title page if enabled
    if (presentationOptions.includeTitlePage) {
      const titlePage = document.createElement('div');
      titlePage.style.padding = '20px';
      titlePage.style.background = '#fff';
      titlePage.style.width = '800px';
      titlePage.style.position = 'absolute';
      titlePage.style.left = '-9999px';
      const presentationTitle = titleInput?.value || localStorage.getItem('presentationTitle') || 'Financial Analysis';
      const name = clientNameInput?.value || clientData.client1?.personal?.name || 'No Client Selected';
      let clientInfoText = name;
      if (!name && clientData.isMarried && clientData.client2?.personal?.name) {
        clientInfoText = `${clientData.client1.personal.name} & ${clientData.client2.personal.name}`;
      }
      const address = clientAddressInput?.value || localStorage.getItem('clientAddress') || '';
      const phone = clientPhoneInput?.value || localStorage.getItem('clientPhone') || '';
      if (address) clientInfoText += `<br>${address}`;
      if (phone) clientInfoText += `<br>${phone}`;
      titlePage.innerHTML = `
        ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
        <h1 style="text-align: center; font-size: 24px; margin-bottom: 20px;">${presentationTitle}</h1>
        <h2 style="text-align: center; font-size: 18px;">Prepared for: ${clientInfoText}</h2>
        <p style="text-align: center; font-size: 14px;">Date: ${presentationOptions.includePresentationDate ? presentationOptions.presentationDate : new Date().toLocaleDateString()}</p>
        ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
      `;
      document.body.appendChild(titlePage);

      const titleCanvas = await html2canvas(titlePage, { scale: 2, useCORS: true });
      const titleImgData = titleCanvas.toDataURL('image/png');
      const titleImgWidth = doc.internal.pageSize.getWidth() - 40;
      const titleImgHeight = (titleCanvas.height * titleImgWidth) / titleCanvas.width;
      doc.addImage(titleImgData, 'PNG', 20, yOffset, titleImgWidth, titleImgHeight);
      if (presentationOptions.includePageNumbers) {
        doc.text(`${pageNumber}`, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 10);
      }
      yOffset += titleImgHeight + 20;
      document.body.removeChild(titlePage);
      doc.addPage();
      yOffset = 20;
      pageNumber++;
    }

    // Add table of contents if enabled
    if (presentationOptions.includeToc && selectedReports.length > 0) {
      const tocPage = document.createElement('div');
      tocPage.classList.add('report-preview');
      tocPage.style.padding = '20px';
      tocPage.style.background = '#fff';
      tocPage.style.width = '800px';
      tocPage.style.position = 'absolute';
      tocPage.style.left = '-9999px';
      let tocContent = `<h2 style="text-align: center; font-size: 20px;">Table of Contents</h2><ul style="list-style: none; padding: 0;">`;
      selectedReports.forEach((report, index) => {
        tocContent += `<li style="margin: 10px 0;">${index + 1}. ${report.title}</li>`;
      });
      tocContent += '</ul>';
      tocPage.innerHTML = `
        ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
        ${tocContent}
        ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
      `;
      document.body.appendChild(tocPage);

      const tocCanvas = await html2canvas(tocPage, { scale: 2, useCORS: true });
      const tocImgData = tocCanvas.toDataURL('image/png');
      const tocImgWidth = doc.internal.pageSize.getWidth() - 40;
      const tocImgHeight = (tocCanvas.height * tocImgWidth) / tocCanvas.width;
      doc.addImage(tocImgData, 'PNG', 20, yOffset, tocImgWidth, tocImgHeight);
      if (presentationOptions.includePageNumbers) {
        doc.text(`${pageNumber}`, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 10);
      }
      yOffset += tocImgHeight + 20;
      document.body.removeChild(tocPage);
      doc.addPage();
      yOffset = 20;
      pageNumber++;
    }

    // Add personal profile page if enabled
    if (presentationOptions.includePersonalProfile && clientData.client1?.personal) {
      const profilePage = document.createElement('div');
      profilePage.classList.add('report-preview');
      profilePage.style.padding = '20px';
      profilePage.style.background = '#fff';
      profilePage.style.width = '800px';
      profilePage.style.position = 'absolute';
      profilePage.style.left = '-9999px';
      let profileContent = `<h2 style="text-align: center; font-size: 20px;">Personal Profile</h2>`;
      profileContent += `<p>Name: ${clientData.client1.personal.name || 'N/A'}</p>`;
      if (clientData.isMarried && clientData.client2?.personal?.name) {
        profileContent += `<p>Spouse: ${clientData.client2.personal.name}</p>`;
      }
      profileContent += `<p>Age: ${getAge(clientData.client1.personal.dob) || 'N/A'}</p>`;
      if (clientAddressInput?.value) profileContent += `<p>Address: ${clientAddressInput.value}</p>`;
      if (clientPhoneInput?.value) profileContent += `<p>Phone: ${clientPhoneInput.value}</p>`;
      profilePage.innerHTML = `
        ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
        ${profileContent}
        ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
      `;
      document.body.appendChild(profilePage);

      const profileCanvas = await html2canvas(profilePage, { scale: 2, useCORS: true });
      const profileImgData = profileCanvas.toDataURL('image/png');
      const profileImgWidth = doc.internal.pageSize.getWidth() - 40;
      const profileImgHeight = (profileCanvas.height * profileImgWidth) / profileCanvas.width;
      doc.addImage(profileImgData, 'PNG', 20, yOffset, profileImgWidth, profileImgHeight);
      if (presentationOptions.includePageNumbers) {
        doc.text(`${pageNumber}`, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 10);
      }
      yOffset += profileImgHeight + 20;
      document.body.removeChild(profilePage);
      doc.addPage();
      yOffset = 20;
      pageNumber++;
    }

    // Add disclaimer and disclosure at beginning if enabled and selected
    if (presentationOptions.disclaimerPlacement === 'beginning') {
      if (presentationOptions.includeDisclaimer) {
        const disclaimerPage = document.createElement('div');
        disclaimerPage.classList.add('report-preview');
        disclaimerPage.style.padding = '20px';
        disclaimerPage.style.background = '#fff';
        disclaimerPage.style.width = '800px';
        disclaimerPage.style.position = 'absolute';
        disclaimerPage.style.left = '-9999px';
        disclaimerPage.innerHTML = `
          ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
          <h2 style="text-align: center; font-size: 20px;">Disclaimer</h2>
          <p>This presentation is for informational purposes only and does not constitute financial advice.</p>
          ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
        `;
        document.body.appendChild(disclaimerPage);

        const disclaimerCanvas = await html2canvas(disclaimerPage, { scale: 2, useCORS: true });
        const disclaimerImgData = disclaimerCanvas.toDataURL('image/png');
        const disclaimerImgWidth = doc.internal.pageSize.getWidth() - 40;
        const disclaimerImgHeight = (disclaimerCanvas.height * disclaimerImgWidth) / disclaimerCanvas.width;
        doc.addImage(disclaimerImgData, 'PNG', 20, yOffset, disclaimerImgWidth, disclaimerImgHeight);
        if (presentationOptions.includePageNumbers) {
          doc.text(`${pageNumber}`, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 10);
        }
        yOffset += disclaimerImgHeight + 20;
        document.body.removeChild(disclaimerPage);
        doc.addPage();
        yOffset = 20;
        pageNumber++;
      }
      if (presentationOptions.includeDisclosure) {
        const disclosurePage = document.createElement('div');
        disclosurePage.classList.add('report-preview');
        disclosurePage.style.padding = '20px';
        disclaimerPage.style.background = '#fff';
        disclosurePage.style.width = '800px';
        disclosurePage.style.position = 'absolute';
        disclosurePage.style.left = '-9999px';
        disclosurePage.innerHTML = `
          ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
          <h2 style="text-align: center; font-size: 20px;">Disclosure</h2>
          <p>All data presented is based on information provided by the client and is subject to change.</p>
          ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
        `;
        document.body.appendChild(disclosurePage);

        const disclosureCanvas = await html2canvas(disclosurePage, { scale: 2, useCORS: true });
        const disclosureImgData = disclosureCanvas.toDataURL('image/png');
        const disclosureImgWidth = doc.internal.pageSize.getWidth() - 40;
        const disclosureImgHeight = (disclosureCanvas.height * disclosureImgWidth) / disclosureCanvas.width;
        doc.addImage(disclosureImgData, 'PNG', 20, yOffset, disclosureImgWidth, disclosureImgHeight);
        if (presentationOptions.includePageNumbers) {
          doc.text(`${pageNumber}`, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 10);
        }
        yOffset += disclosureImgHeight + 20;
        document.body.removeChild(disclosurePage);
        doc.addPage();
        yOffset = 20;
        pageNumber++;
      }
    }

    // Render reports
    for (const report of selectedReports) {
      if (!report.id || !report.title) {
        console.warn('Skipping invalid report in PDF generation:', report);
        continue;
      }

      const reportDiv = document.createElement('div');
      reportDiv.classList.add('report-preview');
      reportDiv.style.padding = '20px';
      reportDiv.style.background = '#fff';
      reportDiv.style.width = '800px';
      reportDiv.style.position = 'absolute';
      reportDiv.style.left = '-9999px';

      document.body.appendChild(reportDiv);

      const parts = report.id.split('-');
      let analysisType = parts[0] || '';
      let outputType = parts.length > 1 ? parts[parts.length - 1] : '';

      if (report.id.startsWith('report-retirement-fact-finder')) {
        analysisType = 'retirement-accumulation';
        outputType = 'fact-finder';
      } else if (report.id.includes('retirement')) {
        analysisType = 'retirement-accumulation';
      } else if (report.id.includes('personal-finance')) {
        analysisType = 'personal-finance';
      } else if (report.id.includes('summary')) {
        analysisType = 'summary';
      }

      if (!analysisType) {
        reportDiv.innerHTML = `
          ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
          <h3>${report.title}</h3><p>Invalid report ID format: ${report.id}</p>
          ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
        `;
      } else if (analysisType === 'retirement-accumulation') {
        await renderRetirementReport(reportDiv, outputType, report.title);
      } else if (analysisType === 'personal-finance') {
        await renderPersonalFinanceReport(reportDiv, outputType, report.title);
      } else if (analysisType === 'summary') {
        await renderSummaryReport(reportDiv, outputType, report.title);
      } else {
        reportDiv.innerHTML = `
          ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
          <h3>${report.title}</h3><p>Unsupported report type: ${report.id}</p>
          ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
        `;
      }

      if (headerText) {
        const headerDiv = document.createElement('p');
        headerDiv.style.textAlign = 'center';
        headerDiv.style.fontSize = '12px';
        headerDiv.style.marginBottom = '10px';
        headerDiv.textContent = headerText;
        reportDiv.insertBefore(headerDiv, reportDiv.firstChild);
      }
      if (footerText) {
        const footerDiv = document.createElement('p');
        footerDiv.style.textAlign = 'center';
        footerDiv.style.fontSize = '12px';
        footerDiv.style.marginTop = '10px';
        footerDiv.textContent = footerText;
        reportDiv.appendChild(footerDiv);
      }

      const canvas = reportDiv.querySelector('canvas');
      if (canvas) {
        const canvasParent = canvas.parentNode;
        document.body.appendChild(canvas);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const imgData = canvas.toDataURL('image/png');
        const img = document.createElement('img');
        img.src = imgData;
        img.style.width = canvas.style.width || '800px';
        img.style.height = canvas.style.height || '400px';
        canvasParent.replaceChild(img, canvas);
        if (canvas.parentNode === document.body) {
          document.body.removeChild(canvas);
        }
      }

      await new Promise(resolve => setTimeout(resolve, 100));

      const canvasRender = await html2canvas(reportDiv, { scale: 2, useCORS: true, logging: true });
      const imgData = canvasRender.toDataURL('image/png');
      const imgWidth = doc.internal.pageSize.getWidth() - 40;
      const imgHeight = (canvasRender.height * imgWidth) / canvasRender.width;

      if (yOffset + imgHeight > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        yOffset = 20;
        pageNumber++;
      }

      doc.addImage(imgData, 'PNG', 20, yOffset, imgWidth, imgHeight);
      if (presentationOptions.includePageNumbers) {
        doc.text(`${pageNumber}`, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 10);
      }
      yOffset += imgHeight + 20;
      document.body.removeChild(reportDiv);
    }

    // Add record of reports if enabled
    if (presentationOptions.includeRecordOfReports && selectedReports.length > 0) {
      doc.addPage();
      yOffset = 20;
      pageNumber++;
      const recordPage = document.createElement('div');
      recordPage.classList.add('report-preview');
      recordPage.style.padding = '20px';
      recordPage.style.background = '#fff';
      recordPage.style.width = '800px';
      recordPage.style.position = 'absolute';
      recordPage.style.left = '-9999px';
      let recordContent = `<h2 style="text-align: center; font-size: 20px;">Record of Reports</h2><ul style="list-style: none; padding: 0;">`;
      selectedReports.forEach((report, index) => {
        recordContent += `<li style="margin: 10px 0;">${index + 1}. ${report.title}</li>`;
      });
      recordContent += '</ul>';
      recordPage.innerHTML = `
        ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
        ${recordContent}
        ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
      `;
      document.body.appendChild(recordPage);

      const recordCanvas = await html2canvas(recordPage, { scale: 2, useCORS: true });
      const recordImgData = recordCanvas.toDataURL('image/png');
      const recordImgWidth = doc.internal.pageSize.getWidth() - 40;
      const recordImgHeight = (recordCanvas.height * recordImgWidth) / recordCanvas.width;
      doc.addImage(recordImgData, 'PNG', 20, yOffset, recordImgWidth, recordImgHeight);
      if (presentationOptions.includePageNumbers) {
        doc.text(`${pageNumber}`, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 10);
      }
      yOffset += recordImgHeight + 20;
      document.body.removeChild(recordPage);
    }

    // Add disclaimer and disclosure at end if enabled and selected
    if (presentationOptions.disclaimerPlacement === 'end') {
      if (presentationOptions.includeDisclaimer) {
        doc.addPage();
        yOffset = 20;
        pageNumber++;
        const disclaimerPage = document.createElement('div');
        disclaimerPage.classList.add('report-preview');
        disclaimerPage.style.padding = '20px';
        disclaimerPage.style.background = '#fff';
        disclaimerPage.style.width = '800px';
        disclaimerPage.style.position = 'absolute';
        disclaimerPage.style.left = '-9999px';
        disclaimerPage.innerHTML = `
          ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
          <h2 style="text-align: center; font-size: 20px;">Disclaimer</h2>
          <p>This presentation is for informational purposes only and does not constitute financial advice.</p>
          ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
        `;
        document.body.appendChild(disclaimerPage);

        const disclaimerCanvas = await html2canvas(disclaimerPage, { scale: 2, useCORS: true });
        const disclaimerImgData = disclaimerCanvas.toDataURL('image/png');
        const disclaimerImgWidth = doc.internal.pageSize.getWidth() - 40;
        const disclaimerImgHeight = (disclaimerCanvas.height * disclaimerImgWidth) / disclaimerCanvas.width;
        doc.addImage(disclaimerImgData, 'PNG', 20, yOffset, disclaimerImgWidth, disclaimerImgHeight);
        if (presentationOptions.includePageNumbers) {
          doc.text(`${pageNumber}`, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 10);
        }
        yOffset += disclaimerImgHeight + 20;
        document.body.removeChild(disclaimerPage);
      }
      if (presentationOptions.includeDisclosure) {
        doc.addPage();
        yOffset = 20;
        pageNumber++;
        const disclosurePage = document.createElement('div');
        disclosurePage.classList.add('report-preview');
        disclosurePage.style.padding = '20px';
        disclosurePage.style.background = '#fff';
        disclosurePage.style.width = '800px';
        disclosurePage.style.position = 'absolute';
        disclosurePage.style.left = '-9999px';
        disclosurePage.innerHTML = `
          ${headerText ? `<p style="text-align: center; font-size: 12px; margin-bottom: 10px;">${headerText}</p>` : ''}
          <h2 style="text-align: center; font-size: 20px;">Disclosure</h2>
          <p>All data presented is based on information provided by the client and is subject to change.</p>
          ${footerText ? `<p style="text-align: center; font-size: 12px; margin-top: 10px;">${footerText}</p>` : ''}
        `;
        document.body.appendChild(disclosurePage);

        const disclosureCanvas = await html2canvas(disclosurePage, { scale: 2, useCORS: true });
        const disclosureImgData = disclosureCanvas.toDataURL('image/png');
        const disclosureImgWidth = doc.internal.pageSize.getWidth() - 40;
        const disclosureImgHeight = (disclosureCanvas.height * disclosureImgWidth) / disclosureCanvas.width;
        doc.addImage(disclosureImgData, 'PNG', 20, yOffset, disclosureImgWidth, disclosureImgHeight);
        if (presentationOptions.includePageNumbers) {
          doc.text(`${pageNumber}`, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 10);
        }
        yOffset += disclosureImgHeight + 20;
        document.body.removeChild(disclosurePage);
      }
    }

    doc.save('Presentation.pdf');
  } catch (error) {
    console.error('Error downloading PDF:', error);
    alert('Error generating PDF. Please check console for details.');
  }
}
