import introJs from 'https://cdn.jsdelivr.net/npm/intro.js@7.0.1/intro.min.js';

function startTour() {
  const tour = introJs();
  const currentPage = document.body.dataset.page || 'index';
  const steps = [
    {
      element: document.querySelector('#nav-home'),
      intro: 'Start at the Home page.',
      position: 'bottom',
      page: 'index'
    },
    {
      element: document.querySelector('#nav-budget'),
      intro: 'Click here to go to Analysis.',
      position: 'bottom',
      page: 'index',
      action: () => window.location.href = 'analysis.html'
    },
    {
      element: document.querySelector('#analysis-content'),
      intro: 'This is the Analysis section.',
      position: 'top',
      page: 'analysis'
    },
    {
      element: document.querySelector('#client-data-input'),
      intro: 'Click here to input client data.',
      position: 'right',
      page: 'analysis'
    },
    {
      element: document.querySelector('#view-reports-btn'),
      intro: 'Click here to view reports.',
      position: 'right',
      page: 'analysis'
    },
    {
      element: document.querySelector('#nav-reports'),
      intro: 'Now go to the Presentation tab.',
      position: 'bottom',
      page: 'analysis',
      action: () => window.location.href = 'presentation.html'
    },
    {
      element: document.querySelector('#presentation-content'),
      intro: 'Explore the Presentation section.',
      position: 'top',
      page: 'presentation'
    }
  ].filter(step => step.page === currentPage && step.element);

  tour.setOptions({
    steps,
    showProgress: true,
    showBullets: false,
    exitOnOverlayClick: false,
    doneLabel: 'End Tour'
  });

  tour.onbeforechange(() => {
    const nextStep = steps[tour._currentStep];
    if (nextStep && nextStep.action) {
      nextStep.action();
    }
  });

  tour.start();
}

document.getElementById('start-tour-btn').addEventListener('click', startTour);
