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

      const [analysisType, outputType] = report.id.split('-');

      if (analysisType === 'retirement-accumulation') {
        await renderRetirementReport(reportDiv, outputType, report.title);
      } else if (analysisType === 'personal-finance') {
        await renderPersonalFinanceReport(reportDiv, outputType, report.title);
      } else if (analysisType === 'summary') {
        await renderSummaryReport(reportDiv, outputType, report.title);
      }

      // Convert any canvas to image for preview
      const canvas = reportDiv.querySelector('canvas');
      if (canvas) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Increased delay
        const imgData = canvas.toDataURL('image/png');
        const img = document.createElement('img');
        img.src = imgData;
        img.style.width = canvas.style.width || '600px';
        img.style.height = canvas.style.height || '400px';
        canvas.parentNode.replaceChild(img, canvas);
      }

      tempContainer.appendChild(reportDiv);
    }

    // Update preview content
    pdfPreviewContent.innerHTML = '';
    pdfPreviewContent.appendChild(tempContainer);

    // Ensure modal content is visible
    pdfPreviewContent.style.display = 'block';
    pdfPreviewContent.style.opacity = '1';
  } catch (error) {
    console.error('Error generating preview:', error);
    pdfPreviewContent.innerHTML = '<p class="output-error">Error generating preview. Please check console.</p>';
  }
}

// Render Retirement Accumulation report
async function renderRetirementReport(container, outputType, title) {
  container.innerHTML = `<h3>${title}</h3>`;
  if (outputType === 'graph') {
    const canvas = document.createElement('canvas');
    canvas.id = `temp-chart-${Date.now()}`;
    canvas.style.width = '600px';
    canvas.style.height = '400px';
    container.appendChild(canvas);
    const chartInstance = await updateRetirementGraph(canvas, clientData, Chart, getAge);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Increased delay
    return chartInstance;
  } else {
    updateRetirementOutputs(container, clientData, formatCurrency, getAge, selectedReports, Chart);
  }
}

// Render Personal Finance report
async function renderPersonalFinanceReport(container, outputType, title) {
  container.innerHTML = `<h3>${title}</h3>`;
  if (outputType === 'graph') {
    const canvas = document.createElement('canvas');
    canvas.id = `temp-chart-${Date.now()}`;
    canvas.style.width = '600px';
    canvas.style.height = '400px';
    container.appendChild(canvas);
    const chartInstance = await updatePersonalFinanceGraph(canvas, clientData, Chart);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Increased delay
    return chartInstance;
  } else {
    updatePersonalFinanceOutputs(container, clientData, formatCurrency, selectedReports, Chart);
  }
}

// Render Summary report
async function renderSummaryReport(container, outputType, title) {
  container.innerHTML = `<h3>${title}</h3>`;
  updateSummaryOutputs(container, clientData, formatCurrency, selectedReports, Chart, getAge);
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
      reportDiv.style.position = 'absolute';
      reportDiv.style.left = '-9999px';
      reportDiv.style.width = '600px';

      document.body.appendChild(reportDiv);

      const [analysisType, outputType] = report.id.split('-');
      if (analysisType === 'retirement-accumulation') {
        await renderRetirementReport(reportDiv, outputType, report.title);
      } else if (analysisType === 'personal-finance') {
        await renderPersonalFinanceReport(reportDiv, outputType, report.title);
      } else if (analysisType === 'summary') {
        await renderSummaryReport(reportDiv, outputType, report.title);
      }

      // Convert canvas to image
      const canvas = reportDiv.querySelector('canvas');
      if (canvas) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Increased delay
        const imgData = canvas.toDataURL('image/png');
        const img = document.createElement('img');
        img.src = imgData;
        img.style.width = canvas.style.width || '600px';
        img.style.height = canvas.style.height || '400px';
        canvas.parentNode.replaceChild(img, canvas);
      }

      // Ensure content is rendered
      await new Promise(resolve => setTimeout(resolve, 100));

      console.log(`Rendering report: ${report.id}`);
      const canvasRender = await html2canvas(reportDiv, { 
        scale: 2, 
        useCORS: true, 
        logging: true 
      });
      console.log('html2canvas output:', canvasRender.toDataURL('image/png')); // Debug captured image
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
