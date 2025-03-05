const reports = [
  // Personal Finance (example)
  { category: "Personal Finance", title: "The Need for Financial Planning", content: "Explains the importance of financial planning." },
  { category: "Personal Cash Flow", title: "Up to Your Neck in Debt?", content: "Strategies for managing overwhelming debt." },
  // Retirement Planning - The Retirement Need
  {
    category: "Retirement Planning",
    subcategory: "The Retirement Need",
    title: "The Need for Retirement Planning",
    content: `
      <p>Traditionally, retirement in America has been defined in terms of its relationship to participation in the active work force. An individual would work full-time until a certain age, and then leave employment to spend a few years quietly rocking on the front porch. Declining health often made retirement short and unpleasant. Retirement planning, as such, typically focused on saving enough to guarantee minimal survival for a relatively brief period of time.</p>
      <p>More recently, however, many individuals are beginning to recognize that for a number of reasons, this traditional view of retirement is no longer accurate. Some individuals, for example, are voluntarily choosing to retire early, in their 40s or 50s. Others, because they enjoy working, choose to remain employed well past the traditional retirement age of 65. And, many retirees do more than just rock on the front porch. Retirement is now often defined by activities such as travel, returning to school, volunteer work, or the pursuit of favorite hobbies or sports.</p>
      <p>This changed the face of retirement, however, with all of its possibilities, does not happen automatically. Many of the issues associated with retirement, such as ill health, and the need to provide income, still exist. With proper planning, however, these needs can be met.</p>

      <h3>Longer Lives</h3>
      <p>The single most important factor in this changed retirement picture is the fact that we now live much longer than before. A child born in 1900, for example, had an average life expectancy of 47.3 years. For a child born in 2020, however, average life expectancy had increased to 77.0 years. The following graph<sup>1</sup> illustrates this change.</p>
      <p><em>[Graph Placeholder: Average U.S. Life Expectancy (1900 - 2020)]</em></p>
      <p class="footnote"><sup>1</sup> Source: National Vital Statistics Reports, Volume 71, Number 1 - United States Life Tables, 2020, Table 19. August 8, 2022.</p>

      <h3>Common Retirement Planning Issues</h3>
      <p>Planning for a much longer life span involves addressing problems not faced by earlier generations. Some of the key issues include the following:</p>
      <ul>
        <li><strong>Paying for retirement:</strong> Providing a steady income is often the key problem involved in retirement planning. Longer life spans raise the issue of the impact of inflation on fixed dollar payments, as well as the possibility of outliving accumulated personal savings. Social Security retirement benefits and income from employer-sponsored retirement plans typically provide only a portion of the total income required. If income is insufficient, a retiree may be forced to either continue working, or face a reduced standard of living.</li>
        <li><strong>Health care:</strong> The health benefits provided through the federal government's Medicare program are generally considered to be only a foundation. Often a supplemental Medigap policy is needed, as is a long-term care policy, to provide needed benefits not available through Medicare. Health care planning should also consider a health care proxy, allowing someone else to make medical decisions when an individual is temporarily incapacitated, as well as a living will that expresses an individual's wishes when no hope of recovery is possible.</li>
        <li><strong>Estate planning:</strong> Retirement planning inevitably must consider what happens to an individual's assets after retirement is over. Estate planning should ensure not only that assets are transferred to the individuals or organizations chosen by the owner, but also that the transfer is done with the least amount of tax and administrative expense.</li>
        <li><strong>Housing:</strong> This question involves not only the size and type of home (condo, house, shared housing, assisted living), but also its location. Such factors as climate and proximity to close family members and medical care are often important. Completely paying off a home loan can reduce monthly income needs. A reverse mortgage may provide additional monthly income.</li>
        <li><strong>Lifestyle:</strong> Some individuals, accustomed to a busy work life, find it difficult to enjoy the freedom offered by retirement. Planning ahead can make this transition easier.</li>
      </ul>

      <h3>Seek Professional Guidance</h3>
      <p>Developing a successful retirement plan involves carefully considering a wide range of issues and potential problems. Finding solutions to these questions often requires both personal education and the guidance of knowledgeable individuals, from many professional disciplines. The key is to begin planning as early as possible.</p>
      <p><em>Presented by Jason Mangold</em></p>
    `
  },
  { category: "Retirement Planning", subcategory: "The Retirement Need", title: "Evaluating Early Retirement Offers", content: "Guide to assessing early retirement options." },
  { category: "Retirement Planning", subcategory: "The Retirement Need", title: "Do You Desire Retirement Peace of Mind?", content: "Steps to achieve retirement peace." },
  { category: "Retirement Planning", subcategory: "The Retirement Need", title: "Average Life Expectancy at Age 65", content: "Life expectancy stats for planning." },
  // Add more reports as needed
];

const subfolders = {
  "Retirement Planning": [
    { name: "The Retirement Need", description: "General retirement planning topics." },
    { name: "Retirement Income Sources", description: "Sources like Social Security and annuities." },
    { name: "Individual Retirement Plans", description: "IRAs and personal retirement options." },
    { name: "Employer Sponsored Plans", description: "401(k)s and company plans." },
    { name: "Retirement Distributions", description: "Distributions and tax rules." },
    { name: "Health Care Planning in Retirement", description: "Health care in retirement." }
  ]
};

const reportGrid = document.getElementById('report-grid');
const subfolderContainer = document.getElementById('subfolder-container');
const backButton = document.getElementById('back-button');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-input');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');
const modal = document.getElementById('report-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
const savePdfBtn = document.getElementById('save-pdf-btn');

let selectedCategory = 'all';
let selectedSubcategory = null;
let viewMode = 'grid';
let lastSearchTerm = '';

function renderSubfolders(category) {
  subfolderContainer.innerHTML = '';
  if (subfolders[category]) {
    subfolders[category].forEach(subfolder => {
      const div = document.createElement('div');
      div.classList.add('subfolder');
      div.setAttribute('data-subcategory', subfolder.name);
      div.innerHTML = `
        <img src="bluefolder.png" alt="Folder Icon">
        <h3>${subfolder.name}</h3>
      `;
      subfolderContainer.appendChild(div);
    });
    subfolderContainer.style.display = 'grid';
    reportGrid.style.display = 'none';
    backButton.style.display = 'none';
  } else {
    subfolderContainer.style.display = 'none';
    reportGrid.style.display = 'grid';
    backButton.style.display = 'none';
    renderReports();
  }
}

function renderReports() {
  reportGrid.innerHTML = '';
  const searchTerm = searchInput.value.toLowerCase();
  lastSearchTerm = searchTerm; // Store for modal highlighting
  reports.forEach(report => {
    const plainContent = report.content.replace(/<[^>]+>/g, '');
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || (report.subcategory && report.subcategory === selectedSubcategory);
    const matchesSearch = !searchTerm || report.title.toLowerCase().includes(searchTerm) || plainContent.toLowerCase().includes(searchTerm);
    if (matchesCategory && matchesSubcategory && matchesSearch) {
      const card = document.createElement('div');
      card.classList.add('report-card');
      card.classList.add(`${viewMode}-view`);
      card.setAttribute('data-title', report.title);
      card.setAttribute('data-content', report.content);
      card.innerHTML = `
        <div class="report-card-content">
          <h3>${report.title}</h3>
          ${viewMode === 'grid' ? `<p>${plainContent.substring(0, 100)}...</p>` : ''}
        </div>
      `;
      reportGrid.appendChild(card);
    }
  });
  reportGrid.classList.remove('grid-view', 'list-view');
  reportGrid.classList.add(`${viewMode}-view`);
  backButton.style.display = selectedSubcategory ? 'block' : 'none';
}

categoryFilter.addEventListener('click', (e) => {
  e.preventDefault();
  const target = e.target;
  if (target.tagName === 'A') {
    categoryFilter.querySelectorAll('a').forEach(a => a.classList.remove('active'));
    target.classList.add('active');
    selectedCategory = target.getAttribute('data-category');
    selectedSubcategory = null;
    renderSubfolders(selectedCategory);
    if (selectedCategory !== 'Retirement Planning') {
      renderReports();
    }
  }
});

subfolderContainer.addEventListener('click', (e) => {
  const subfolder = e.target.closest('.subfolder');
  if (subfolder) {
    selectedSubcategory = subfolder.getAttribute('data-subcategory');
    subfolderContainer.style.display = 'none';
    reportGrid.style.display = 'grid';
    renderReports();
  }
});

backButton.addEventListener('click', () => {
  selectedSubcategory = null;
  renderSubfolders(selectedCategory);
});

searchInput.addEventListener('input', () => {
  if (selectedCategory === 'Retirement Planning' && !selectedSubcategory) {
    subfolderContainer.style.display = 'grid';
    reportGrid.style.display = 'none';
    backButton.style.display = 'none';
  } else {
    subfolderContainer.style.display = 'none';
    reportGrid.style.display = 'grid';
    renderReports();
  }
});

gridViewBtn.addEventListener('click', () => {
  viewMode = 'grid';
  gridViewBtn.classList.add('active');
  listViewBtn.classList.remove('active');
  renderReports();
});

listViewBtn.addEventListener('click', () => {
  viewMode = 'list';
  listViewBtn.classList.add('active');
  gridViewBtn.classList.remove('active');
  renderReports();
});

reportGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.report-card');
  if (card) {
    modalTitle.textContent = card.getAttribute('data-title');
    let content = card.getAttribute('data-content');
    if (lastSearchTerm) {
      // Case-insensitive regex to highlight search term
      const regex = new RegExp(`(${lastSearchTerm})`, 'gi');
      content = content.replace(regex, '<span class="highlight">$1</span>');
    }
    modalContent.innerHTML = content;
    modal.style.display = 'flex';

    // Scroll to the first highlighted term if it exists
    if (lastSearchTerm) {
      const firstHighlight = modalContent.querySelector('.highlight');
      if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
});

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

savePdfBtn.addEventListener('click', () => {
  const element = document.querySelector('.modal-content');
  html2pdf()
    .set({
      margin: 1,
      filename: `${modalTitle.textContent}.pdf`,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    })
    .from(element)
    .save();
});

// Initial render
renderReports();