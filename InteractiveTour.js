import introJs from 'https://cdn.jsdelivr.net/npm/intro.js@7.0.1/intro.min.js';

function startTour() {
  // Wait for header, button, and page elements to load
  let attempts = 0;
  const maxAttempts = 100; // 10 seconds (100 * 100ms)
  const checkElements = setInterval(() => {
    const headerLink = document.querySelector('#analysis-link');
    const clientFile = document.querySelector('#client-file-name');
    const workspace = document.querySelector('#analysis-workspace');
    const recalculateBtn = document.querySelector('#recalculate-btn');
    const presentationTab = document.querySelector('#presentation-tab');
    const tourButton = document.getElementById('start-tour-btn');
    attempts++;
    if (headerLink && clientFile && workspace && recalculateBtn && presentationTab && tourButton) {
      clearInterval(checkElements);
      runTour();
    } else if (attempts >= maxAttempts) {
      clearInterval(checkElements);
      console.error('Tour failed to start: Required elements not found after 10s', {
        headerLink: !!headerLink,
        clientFile: !!clientFile,
        workspace: !!workspace,
        recalculateBtn: !!recalculateBtn,
        presentationTab: !!presentationTab,
        tourButton: !!tourButton,
        attempts
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
        intro: 'Click here to select a client.',
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
      console.error('No valid tour steps for this page:', currentPage, steps);
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

// Ensure button listener is set up only once
document.addEventListener('DOMContentLoaded', () => {
  const setupButton = () => {
    const tourButton = document.getElementById('start-tour-btn');
    if (tourButton) {
      tourButton.removeEventListener('click', startTour);
      tourButton.addEventListener('click', startTour);
      console.log('Start Tour button listener attached');
    } else {
      console.error('Start Tour button not found on DOMContentLoaded');
    }
  };

  // Run immediately and after header fetch
  setupButton();
  const headerObserver = new MutationObserver(() => {
    setupButton();
    headerObserver.disconnect();
  });
  headerObserver.observe(document.getElementById('header-placeholder'), { childList: true });
});
