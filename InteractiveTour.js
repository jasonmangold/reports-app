import introJs from 'https://cdn.jsdelivr.net/npm/intro.js@7.0.1/intro.min.js';

function startTour() {
  // Wait for header and button to load
  let attempts = 0;
  const maxAttempts = 50; // 5 seconds (50 * 100ms)
  const checkElements = setInterval(() => {
    const headerLoaded = document.querySelector('#analysis-link');
    const button = document.getElementById('start-tour-btn');
    attempts++;
    if (headerLoaded && button) {
      clearInterval(checkElements);
      runTour();
    } else if (attempts >= maxAttempts) {
      clearInterval(checkElements);
      console.error('Tour failed to start: Header or button not found after 5s', {
        headerLoaded: !!headerLoaded,
        button: !!button
      });
    }
  }, 100);

  function runTour() {
    const tour = introJs();
    const currentPage = document.body.dataset.page || 'home';
    const steps = [
      {
        element: document.querySelector('#home-link'),
        intro: 'Start at the Home page.',
        position: 'bottom',
        page: 'home'
      },
      {
        element: document.querySelector('#analysis-link'),
        intro: 'Click here to go to Analysis.',
        position: 'bottom',
        page: 'home',
        action: () => window.location.href = 'analysis.html'
      },
      {
        element: document.querySelector('#analysis-workspace'),
        intro: 'This is the Analysis workspace.',
        position: 'top',
        page: 'analysis'
      },
      {
        element: document.querySelector('#client-file-name'),
        intro: 'Click here to input client data.',
        position: 'right',
        page: 'analysis'
      },
      {
        element: document.querySelector('#recalculate-btn'),
        intro: 'Click here to view updated analysis.',
        position: 'right',
        page: 'analysis'
      },
      {
        element: document.querySelector('#presentation-tab'),
        intro: 'Now go to the Presentation tab.',
        position: 'bottom',
        page: 'analysis',
        action: () => window.location.href = 'presentation.html'
      },
      {
        element: document.querySelector('#presentation-content'), // Adjust for presentation.html
        intro: 'Explore the Presentation section.',
        position: 'top',
        page: 'presentation'
      }
    ].filter(step => step.page === currentPage && step.element);

    if (steps.length === 0) {
      console.error('No valid tour steps for this page:', currentPage);
      return;
    }

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
}

document.addEventListener('DOMContentLoaded', () => {
  const tourButton = document.getElementById('start-tour-btn');
  if (tourButton) {
    tourButton.removeEventListener('click', startTour); // Prevent duplicate listeners
    tourButton.addEventListener('click', startTour);
  } else {
    console.error('Start Tour button not found on DOMContentLoaded.');
  }
});
