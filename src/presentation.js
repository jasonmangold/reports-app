// src/presentation.js
import { formatCurrency, getAge } from './index.js';
import { updateRetirementGraph, updateRetirementOutputs } from './retirementAccumulation.js';
import { updatePersonalFinanceGraph, updatePersonalFinanceOutputs } from './personalFinance.js';
import { updateSummaryOutputs } from './summary.js';

// Load clientData and selectedReports from localStorage
let clientData = JSON.parse(localStorage.getItem('clientData')) || {};
let selectedReports = JSON.parse(localStorage.getItem('selectedReports')) || [];
let reportCount = selectedReports.length;

// DOM elements
const reportList = document.getElementById('report-list');
const previewBtn = document.getElementById('preview-presentation-btn');
const clientFileName = document.getElementById('client-file-name');
const presentationCount = document.getElementById('presentation-count');
const pdfPreviewModal = document.getElementById('pdf-preview-modal');
const pdfPreviewContent = document.getElementById('pdf-preview-content');
const closePdfModal = document.getElementById('close-pdf-modal');
const downloadPdfBtn = document.getElementById('download-pdf-btn');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Load header.html
    fetch('header.html')
      .then(response => response.text())
      .then(data => {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
          headerPlaceholder.innerHTML = data;
          // Add active class to current page link
          const currentPage = window.location.pathname.split('/').pop() || 'presentation.html';
          const navLinks = document.querySelectorAll('nav ul li a');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
              link.classList.add('active');
            }
          });
          // Initialize dropdown menu
          const profilePic = document.getElementById('profile-pic');
          const dropdownMenu = document.getElementById('dropdown-menu');
          if (profilePic && dropdownMenu) {
            profilePic.addEventListener('click', () => {
              dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            });
            document.addEventListener('click', (e) => {
              if (!profilePic.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.style.display = 'none';
              }
            });
          }
        } else {
          console.warn('Header placeholder not found in the DOM.');
        }
  try {
    updateClientFileName();
    populateReportList();
    setupDragAndDrop();
    updatePreviewButton();
    setupModalEvents();
  } catch (error) {
    console.error('Initialization error:', error);
    reportList.innerHTML = '<p class="output-error">Error initializing page. Please check console for details.</p>';
  }
});

// Update client file name
function updateClientFileName() {
  try {
    let name = clientData.client1?.personal?.name || 'No Client Selected';
    if (clientData.isMarried && clientData.client2?.personal?.name) {
      name = `${clientData.client1.personal.name} & ${clientData.client2.personal.name}`;
    }
    clientFileName.textContent = name;
  } catch (error) {
    console.error('Error in updateClientFileName:', error);
  }
}

// Populate report list
function populateReportList() {
  try {
    reportList.innerHTML = '';
    if (selectedReports.length === 0) {
      reportList.innerHTML = '<p>No reports selected for presentation.</p>';
      return;
    }

    selectedReports.forEach((report, index) => {
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

    presentationCount.textContent = reportCount;
    presentationCount.classList.toggle('active', reportCount > 0);
  } catch (error) {
    console.error('Error in populateReportList:', error);
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
      selectedReports = newOrder.map(id => selectedReports.find(report => report.id === id));
      saveSelectedReports();
    });

    // Handle remove report
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

    // Log clientData to ensure it's available
    console.log('clientData:', clientData);

    // Create a temporary container for rendering
    const tempContainer = document.createElement('div');
    tempContainer.style.width = '600px';
    tempContainer.style.background = '#fff';

    // Render reports
    for (const report of selectedReports) {
      const reportDiv = document.createElement('div');
      reportDiv.classList.add('report-preview');
      reportDiv.style.padding = '20px';
      reportDiv.style.marginBottom = '20px';
      reportDiv.style.background = '#fff';

      console.log(`Processing report: ${report.id}`);

      // Handle different report ID formats
      const parts = report.id.split('-');
      let analysisType = parts[0];
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

      console.log(`Analysis type: ${analysisType}, Output type: ${outputType}`);

      if (analysisType === 'retirement-accumulation') {
        await renderRetirementReport(reportDiv, outputType, report.title);
      } else if (analysisType === 'personal-finance') {
        await renderPersonalFinanceReport(reportDiv, outputType, report.title);
      } else if (analysisType === 'summary') {
        await renderSummaryReport(reportDiv, outputType, report.title);
      } else {
        reportDiv.innerHTML = `<h3>${report.title}</h3><p>Unsupported report type: ${report.id}</p>`;
      }

      // Log the content of reportDiv
      console.log(`Report ${report.id} content:`, reportDiv.innerHTML);

      // Convert any canvas to image for preview
      const canvas = reportDiv.querySelector('canvas');
      if (canvas) {
        const canvasParent = canvas.parentNode;
        document.body.appendChild(canvas);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const imgData = canvas.toDataURL('image/png');
        console.log(`Canvas data for ${report.id}:`, imgData);
        const img = document.createElement('img');
        img.src = imgData;
        img.style.width = canvas.style.width || '600px';
        img.style.height = canvas.style.height || '400px';
        canvasParent.replaceChild(img, canvas);
        // Only remove from document.body if it’s still there
        if (canvas.parentNode === document.body) {
          document.body.removeChild(canvas);
        }
      }

      tempContainer.appendChild(reportDiv);
    }

    // Update preview content
    pdfPreviewContent.innerHTML = '';
    pdfPreviewContent.appendChild(tempContainer);

    // Log final content
    console.log('Final pdfPreviewContent:', pdfPreviewContent.innerHTML);

    // Ensure modal content is visible
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
  container.innerHTML = `<h3>${title}</h3>`;
  console.log(`Rendering retirement report, outputType: ${outputType}`);
  if (outputType === 'graph') {
    const canvas = document.createElement('canvas');
    canvas.id = `temp-chart-${Date.now()}`;
    canvas.style.width = '600px';
    canvas.style.height = '400px';
    container.appendChild(canvas);
    const chartInstance = await updateRetirementGraph(canvas, clientData, window.Chart, getAge);
    if (!chartInstance) {
      container.innerHTML += '<p>Failed to render chart.</p>';
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    return chartInstance;
  } else {
    // Pass the specific outputType to render the correct view
    updateRetirementOutputs(container, clientData, formatCurrency, getAge, selectedReports, window.Chart, outputType);
    if (!container.innerHTML.includes('output-card') && !container.innerHTML.includes('output-table')) {
      container.innerHTML += '<p>No retirement data available.</p>';
    }
  }
}

// Render Personal Finance report
async function renderPersonalFinanceReport(container, outputType, title) {
  container.innerHTML = `<h3>${title}</h3>`;
  console.log(`Rendering personal finance report, outputType: ${outputType}`);
  if (outputType === 'graph') {
    const canvas = document.createElement('canvas');
    canvas.id = `temp-chart-${Date.now()}`;
    canvas.style.width = '600px';
    canvas.style.height = '400px';
    container.appendChild(canvas);
    const chartInstance = await updatePersonalFinanceGraph(canvas, clientData, window.Chart);
    if (!chartInstance) {
      container.innerHTML += '<p>Failed to render chart.</p>';
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    return chartInstance;
  } else {
    updatePersonalFinanceOutputs(container, clientData, formatCurrency, selectedReports, window.Chart, outputType);
    if (!container.innerHTML.includes('output-card') && !container.innerHTML.includes('output-table')) {
      container.innerHTML += '<p>No personal finance data available.</p>';
    }
  }
}

// Render Summary report
async function renderSummaryReport(container, outputType, title) {
  container.innerHTML = `<h3>${title}</h3>`;
  console.log(`Rendering summary report, outputType: ${outputType}`);
  updateSummaryOutputs(container, clientData, formatCurrency, selectedReports, window.Chart, getAge, outputType);
  if (!container.innerHTML.includes('output-card') && !container.innerHTML.includes('output-table')) {
    container.innerHTML += '<p>No summary data available.</p>';
  }
}

// Download presentation as PDF
async function downloadPresentationPDF() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'letter' });
    let yOffset = 20;

    for (const report of selectedReports) {
      const reportDiv = document.createElement('div');
      reportDiv.classList.add('report-preview');
      reportDiv.style.padding = '20px';
      reportDiv.style.background = '#fff';
      reportDiv.style.width = '600px';
      reportDiv.style.position = 'absolute';
      reportDiv.style.left = '-9999px';

      document.body.appendChild(reportDiv);

      const parts = report.id.split('-');
      let analysisType = parts[0];
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

      if (analysisType === 'retirement-accumulation') {
        await renderRetirementReport(reportDiv, outputType, report.title);
      } else if (analysisType === 'personal-finance') {
        await renderPersonalFinanceReport(reportDiv, outputType, report.title);
      } else if (analysisType === 'summary') {
        await renderSummaryReport(reportDiv, outputType, report.title);
      } else {
        reportDiv.innerHTML = `<h3>${report.title}</h3><p>Unsupported report type: ${report.id}</p>`;
      }

      // Convert canvas to image
      const canvas = reportDiv.querySelector('canvas');
      if (canvas) {
        const canvasParent = canvas.parentNode;
        document.body.appendChild(canvas);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const imgData = canvas.toDataURL('image/png');
        console.log(`Canvas data for ${report.id} in PDF:`, imgData);
        const img = document.createElement('img');
        img.src = imgData;
        img.style.width = canvas.style.width || '600px';
        img.style.height = canvas.style.height || '400px';
        canvasParent.replaceChild(img, canvas);
        if (canvas.parentNode === document.body) {
          document.body.removeChild(canvas);
        }
      }

      await new Promise(resolve => setTimeout(resolve, 100));

      console.log(`Rendering report ${report.id} for PDF:`, reportDiv.innerHTML);
      const canvasRender = await html2canvas(reportDiv, { 
        scale: 2, 
        useCORS: true, 
        logging: true 
      });
      console.log(`html2canvas output for ${report.id}:`, canvasRender.toDataURL('image/png'));
      const imgData = canvasRender.toDataURL('image/png');
      const imgWidth = doc.internal.pageSize.getWidth() - 40;
      const imgHeight = (canvasRender.height * imgWidth) / canvasRender.width;

      if (yOffset + imgHeight > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        yOffset = 20;
      }

      doc.addImage(imgData, 'PNG', 20, yOffset, imgWidth, imgHeight);
      yOffset += imgHeight + 20;

      document.body.removeChild(reportDiv);
    }

    doc.save('Presentation.pdf');
  } catch (error) {
    console.error('Error downloading PDF:', error);
    alert('Error generating PDF. Please check console for details.');
  }
}
