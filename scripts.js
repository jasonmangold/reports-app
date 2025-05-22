const reports = [
  // Personal Finance
  { 
    category: "Personal Finance", 
    subcategory: "Goal Setting", 
    title: "The Need for Financial Planning", 
    content: "Explains the importance of financial planning and setting achievable goals.",
    tags: ["finance", "beginner", "all-ages", "individual"]
  },
  { 
    category: "Personal Finance", 
    subcategory: "Personal Cash Flow", 
    title: "Up to Your Neck in Debt?", 
    content: "Strategies for managing overwhelming debt and improving cash flow.",
    tags: ["debt", "cash-flow", "beginner", "all-ages", "individual", "topic-debt"]
  },
  { 
    category: "Personal Finance", 
    subcategory: "Budgeting and Debt Management", 
    title: "Budgeting Basics", 
    content: "Introduction to creating and maintaining a personal budget.",
    tags: ["budgeting", "debt", "beginner", "all-ages", "individual", "topic-debt"]
  },

  // Income Taxes
  { 
    category: "Income Taxes", 
    subcategory: "Basic Income Tax", 
    title: "Income Tax Fundamentals", 
    content: "Overview of income tax basics for individuals.",
    tags: ["taxes", "beginner", "all-ages", "individual"]
  },
  { 
    category: "Income Taxes", 
    subcategory: "Advanced Income Tax", 
    title: "Advanced Tax Strategies", 
    content: "Complex tax strategies for high-income earners.",
    tags: ["taxes", "advanced", "46-60", "individual"]
  },
  { 
    category: "Income Taxes", 
    subcategory: "Tax Planning Strategies", 
    title: "Tax Planning Guide", 
    content: "Strategies for tax-efficient financial planning.",
    tags: ["taxes", "intermediate", "all-ages", "individual"]
  },

  // Investments
  { 
    category: "Investments", 
    subcategory: "Investment Planning", 
    title: "Investment Planning 101", 
    content: "Basics of creating an investment plan.",
    tags: ["investments", "beginner", "all-ages", "individual"]
  },
  { 
    category: "Investments", 
    subcategory: "Mutual Funds", 
    title: "Understanding Mutual Funds", 
    content: "Guide to investing in mutual funds.",
    tags: ["investments", "intermediate", "30-45", "46-60", "individual"]
  },
  { 
    category: "Investments", 
    subcategory: "Cash, Stocks, and Bonds", 
    title: "Stocks and Bonds Basics", 
    content: "Overview of cash, stocks, and bonds as investment vehicles.",
    tags: ["investments", "beginner", "all-ages", "individual"]
  },
  { 
    category: "Investments", 
    subcategory: "Other Investment Tools", 
    title: "Alternative Investments", 
    content: "Exploring alternative investment options like real estate and commodities.",
    tags: ["investments", "advanced", "46-60", "individual"]
  },

  // Retirement Planning
  { 
    category: "Retirement Planning", 
    subcategory: "Retirement Needs Analysis", 
    title: "The Need for Retirement Planning", 
    content: `
      <p>Traditionally, retirement in America has been defined in terms of its relationship to participation in the active work force. An individual would work full-time until a certain age, and then leave employment to spend a few years quietly rocking on the front porch. Declining health often made retirement short and unpleasant. Retirement planning, as such, typically focused on saving enough to guarantee minimal survival for a relatively brief period of time.</p>
      <p>More recently, however, many individuals are beginning to recognize that for a number of reasons, this traditional view of retirement is no longer accurate. Some individuals, for example, are voluntarily choosing to retire early, in their 40s or 50s. Others, because they enjoy working, choose to remain employed well past the traditional retirement age of 65. And, many retirees do more than just rock on the front porch. Retirement is now often defined by activities such as travel, returning to school, volunteer work, or the pursuit of favoriteGrowth: true
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
      
    `,
    tags: ["retirement", "beginner", "30-45", "46-60", "over-60", "individual", "general", "topic-retirement"]
  },
  { 
    category: "Retirement Planning", 
    subcategory: "Retirement Needs Analysis", 
    title: "Evaluating Early Retirement Offers", 
    content: "Guide to assessing early retirement options and their impact.",
    tags: ["retirement", "early-retirement", "30-45", "intermediate", "individual", "topic-retirement"]
  },
  { 
    category: "Retirement Planning", 
    subcategory: "Retirement Needs Analysis", 
    title: "Do You Desire Retirement Peace of Mind?", 
    content: "Steps to achieve financial peace in retirement.",
    tags: ["retirement", "beginner", "all-ages", "individual", "topic-retirement"]
  },
  { 
    category: "Retirement Planning", 
    subcategory: "Retirement Needs Analysis", 
    title: "Average Life Expectancy at Age 65", 
    content: "Life expectancy statistics for retirement planning.",
    tags: ["retirement", "over-60", "intermediate", "individual", "topic-retirement"]
  },
  { 
    category: "Retirement Planning", 
    subcategory: "Retirement Income Sources", 
    title: "How a Reverse Mortgage Works", 
    content: "Details how reverse mortgages provide retirement income.",
    tags: ["retirement", "income", "over-60", "individual", "intermediate", "one-pager", "topic-retirement"]
  },
  { 
    category: "Retirement Planning", 
    subcategory: "Social Security", 
    title: "Maximizing Social Security Benefits", 
    content: "Strategies to optimize Social Security payouts.",
    tags: ["retirement", "social-security", "over-60", "individual", "intermediate", "topic-retirement"]
  },
  { 
    category: "Retirement Planning", 
    subcategory: "Individual Retirement Plans", 
    title: "How a Roth IRA Works", 
    content: "Explains the mechanics and benefits of a Roth IRA.",
    tags: ["retirement", "investments", "30-45", "46-60", "individual", "intermediate", "one-pager", "topic-retirement"]
  },
  { 
    category: "Retirement Planning", 
    subcategory: "Employer-Sponsored Plans", 
    title: "How a 401(k) Cash or Deferred Plan Works", 
    content: "Overview of 401(k) mechanics and benefits.",
    tags: ["retirement", "investments", "30-45", "46-60", "individual", "business-owner", "intermediate", "one-pager", "topic-retirement"]
  },
  { 
    category: "Retirement Planning", 
    subcategory: "Retirement Distributions", 
    title: "Navigating Retirement Distributions", 
    content: "Guide to tax-efficient retirement distributions.",
    tags: ["retirement", "distributions", "over-60", "individual", "intermediate", "topic-retirement"]
  },
  { 
    category: "Retirement Planning", 
    subcategory: "Moving Money Around", 
    title: "Rollovers and Transfers", 
    content: "How to move retirement funds between accounts.",
    tags: ["retirement", "transfers", "46-60", "over-60", "individual", "intermediate", "topic-retirement"]
  },
  { 
    category: "Retirement Planning", 
    subcategory: "Health Care Planning in Retirement", 
    title: "Medicare and Supplemental Plans", 
    content: "Overview of Medicare and Medigap policies.",
    tags: ["retirement", "health-care", "over-60", "individual", "intermediate", "topic-retirement"]
  },
  { 
    category: "Retirement Planning", 
    subcategory: "Other Retirement Issues", 
    title: "Lifestyle Planning for Retirement", 
    content: "Planning for a fulfilling retirement lifestyle.",
    tags: ["retirement", "lifestyle", "all-ages", "individual", "beginner", "topic-retirement"]
  },

  // Insurance
  { 
    category: "Insurance", 
    subcategory: "Health Insurance", 
    title: "Understanding Health Insurance Options", 
    content: "Guide to choosing health insurance plans.",
    tags: ["insurance", "health", "all-ages", "individual", "beginner"]
  },
  { 
    category: "Insurance", 
    subcategory: "Life Insurance", 
    title: "Life Insurance Basics", 
    content: "Introduction to life insurance options and benefits.",
    tags: ["insurance", "beginner", "all-ages", "individual", "topic-life-insurance"]
  },
  { 
    category: "Insurance", 
    subcategory: "Property and Casualty Insurance", 
    title: "Home and Auto Insurance Guide", 
    content: "Overview of property and casualty insurance.",
    tags: ["insurance", "property", "all-ages", "individual", "beginner"]
  },
  { 
    category: "Insurance", 
    subcategory: "Long-Term Care Insurance", 
    title: "Planning for Long-Term Care Needs", 
    content: "Guide to long-term care insurance options.",
    tags: ["insurance", "long-term-care", "over-60", "individual", "intermediate", "topic-long-term-care"]
  },
  { 
    category: "Insurance", 
    subcategory: "Disability Insurance", 
    title: "Understanding Disability Income Insurance", 
    content: "Overview of disability insurance benefits.",
    tags: ["insurance", "disability", "all-ages", "individual", "intermediate", "topic-disability"]
  },
  { 
    category: "Insurance", 
    subcategory: "Employee Benefits", 
    title: "Maximizing Employee Benefits", 
    content: "How to leverage employer-provided insurance benefits.",
    tags: ["insurance", "employee-benefits", "30-45", "46-60", "individual", "intermediate"]
  },

  // Home Ownership
  { 
    category: "Home Ownership", 
    subcategory: "Buying a Home", 
    title: "First-Time Homebuyer Guide", 
    content: "Steps to buying your first home.",
    tags: ["home-ownership", "beginner", "30-45", "individual"]
  },
  { 
    category: "Home Ownership", 
    subcategory: "Mortgage Management", 
    title: "Managing Your Mortgage", 
    content: "Strategies for effective mortgage management.",
    tags: ["home-ownership", "mortgage", "all-ages", "individual", "intermediate"]
  },
  { 
    category: "Home Ownership", 
    subcategory: "Home Maintenance", 
    title: "Home Maintenance Checklist", 
    content: "Essential home maintenance tasks.",
    tags: ["home-ownership", "maintenance", "all-ages", "individual", "beginner"]
  },

  // Education Funding
  { 
    category: "Education Funding", 
    subcategory: "Planning for College", 
    title: "Planning for College Costs", 
    content: "Strategies for preparing for college expenses.",
    tags: ["education", "beginner", "all-ages", "individual", "topic-college"]
  },
  { 
    category: "Education Funding", 
    subcategory: "Saving for College", 
    title: "Saving for College 101", 
    content: "Guide to 529 plans and other college savings options.",
    tags: ["education", "beginner", "all-ages", "individual", "topic-college"]
  },

  // Estate Planning
  { 
    category: "Estate Planning", 
    subcategory: "Basic Estate Planning Tools", 
    title: "Wills and Trusts Basics", 
    content: "Introduction to wills and trusts.",
    tags: ["estate-planning", "beginner", "all-ages", "individual"]
  },
  { 
    category: "Estate Planning", 
    subcategory: "Estate Planning Concepts", 
    title: "Key Estate Planning Concepts", 
    content: "Overview of estate planning principles.",
    tags: ["estate-planning", "intermediate", "46-60", "over-60", "individual"]
  },
  { 
    category: "Estate Planning", 
    subcategory: "Estate and Gift Taxes", 
    title: "Understanding Estate and Gift Taxes", 
    content: "Guide to estate and gift tax rules.",
    tags: ["estate-planning", "taxes", "advanced", "over-60", "individual"]
  },
  { 
    category: "Estate Planning", 
    subcategory: "Life Insurance in Estate Planning", 
    title: "Using Life Insurance in Estate Planning", 
    content: "How life insurance supports estate planning.",
    tags: ["estate-planning", "insurance", "intermediate", "46-60", "over-60", "individual", "topic-life-insurance"]
  },
  { 
    category: "Estate Planning", 
    subcategory: "Advanced Estate Planning Tools", 
    title: "Advanced Estate Planning Strategies", 
    content: "Complex tools for estate planning.",
    tags: ["estate-planning", "advanced", "over-60", "individual"]
  },
  { 
    category: "Estate Planning", 
    subcategory: "Estate Freezing Techniques", 
    title: "Estate Freezing Techniques", 
    content: "Methods to freeze estate value for tax purposes.",
    tags: ["estate-planning", "advanced", "over-60", "individual"]
  },

  // Business Planning
  { 
    category: "Business Planning", 
    subcategory: "Basic Business Concepts", 
    title: "Starting a Small Business", 
    content: "Guide to basic business concepts for entrepreneurs.",
    tags: ["business", "beginner", "30-45", "business-owner"]
  },
  { 
    category: "Business Planning", 
    subcategory: "Business Valuation", 
    title: "Valuing Your Business", 
    content: "Methods for business valuation.",
    tags: ["business", "intermediate", "46-60", "business-owner"]
  },
  { 
    category: "Business Planning", 
    subcategory: "Business Continuation", 
    title: "Business Succession Planning", 
    content: "Planning for business continuation.",
    tags: ["business", "advanced", "46-60", "business-owner"]
  },
  { 
    category: "Business Planning", 
    subcategory: "Benefits to Business Owners", 
    title: "Benefits for Business Owners", 
    content: "Financial benefits for business owners.",
    tags: ["business", "intermediate", "30-45", "46-60", "business-owner"]
  },

  // Charitable Planning
  { 
    category: "Charitable Planning", 
    subcategory: "Gifting Techniques", 
    title: "Charitable Gifting Strategies", 
    content: "Methods for effective charitable giving.",
    tags: ["charitable", "beginner", "all-ages", "individual"]
  },
  { 
    category: "Charitable Planning", 
    subcategory: "Taxation of Charitable Gifts", 
    title: "Tax Benefits of Charitable Gifts", 
    content: "Understanding tax deductions for charitable contributions.",
    tags: ["charitable", "taxes", "intermediate", "46-60", "individual"]
  },
  { 
    category: "Charitable Planning", 
    subcategory: "Other Charitable Strategies", 
    title: "Advanced Charitable Strategies", 
    content: "Complex strategies for charitable giving.",
    tags: ["charitable", "advanced", "over-60", "individual"]
  },

  // Social Security and Government Programs
  { 
    category: "Social Security and Government Programs", 
    subcategory: "Social Security Benefits", 
    title: "Understanding Social Security Benefits", 
    content: "Guide to Social Security benefits and eligibility.",
    tags: ["social-security", "beginner", "over-60", "individual"]
  },
  { 
    category: "Social Security and Government Programs", 
    subcategory: "Other Government Programs", 
    title: "Other Government Assistance Programs", 
    content: "Overview of government assistance programs.",
    tags: ["government-programs", "beginner", "all-ages", "individual"]
  },

  // Advisys Support
  { 
    category: "Advisys Support", 
    subcategory: "Planning Tools", 
    title: "Using Advisys Planning Tools", 
    content: "Guide to Advisys financial planning tools.",
    tags: ["advisys", "beginner", "all-ages", "individual", "advisor"]
  },
  { 
    category: "Advisys Support", 
    subcategory: "Reference Materials", 
    title: "Advisys Reference Library", 
    content: "Overview of Advisys reference materials.",
    tags: ["advisys", "intermediate", "all-ages", "advisor"]
  },
  { 
    category: "Advisys Support", 
    subcategory: "Client Interaction Forms", 
    title: "Client Interaction Forms Guide", 
    content: "How to use Advisys client interaction forms.",
    tags: ["advisys", "intermediate", "all-ages", "advisor"]
  },
  { 
    category: "Advisys Support", 
    subcategory: "Worksheets", 
    title: "Financial Planning Worksheets", 
    content: "Using Advisys worksheets for planning.",
    tags: ["advisys", "beginner", "all-ages", "advisor"]
  }
];

const subfolders = {
  "Personal Finance": [
    { name: "Goal Setting", description: "Setting financial goals and priorities." },
    { name: "Personal Cash Flow", description: "Managing income and expenses." },
    { name: "Budgeting and Debt Management", description: "Budgeting and debt reduction strategies." }
  ],
  "Income Taxes": [
    { name: "Basic Income Tax", description: "Fundamentals of income taxation." },
    { name: "Advanced Income Tax", description: "Complex tax strategies." },
    { name: "Tax Planning Strategies", description: "Tax-efficient planning." }
  ],
  "Investments": [
    { name: "Investment Planning", description: "Creating an investment strategy." },
    { name: "Mutual Funds", description: "Investing in mutual funds." },
    { name: "Cash, Stocks, and Bonds", description: "Traditional investment vehicles." },
    { name: "Other Investment Tools", description: "Alternative investments." }
  ],
  "Retirement Planning": [
    { name: "Retirement Needs Analysis", description: "Assessing retirement needs." },
    { name: "Retirement Income Sources", description: "Sources like Social Security and annuities." },
    { name: "Social Security", description: "Social Security benefits and strategies." },
    { name: "Individual Retirement Plans", description: "IRAs and personal retirement options." },
    { name: "Employer-Sponsored Plans", description: "401(k)s and company plans." },
    { name: "Retirement Distributions", description: "Distributions and tax rules." },
    { name: "Moving Money Around", description: "Rollovers and transfers." },
    { name: "Health Care Planning in Retirement", description: "Health care in retirement." },
    { name: "Other Retirement Issues", description: "Lifestyle and other considerations." }
  ],
  "Insurance": [
    { name: "Health Insurance", description: "Choosing health insurance plans." },
    { name: "Life Insurance", description: "Life insurance options." },
    { name: "Property and Casualty Insurance", description: "Home and auto insurance." },
    { name: "Long-Term Care Insurance", description: "Long-term care planning." },
    { name: "Disability Insurance", description: "Disability income protection." },
    { name: "Employee Benefits", description: "Employer-provided benefits." }
  ],
  "Home Ownership": [
    { name: "Buying a Home", description: "Home purchasing process." },
    { name: "Mortgage Management", description: "Managing mortgage payments." },
    { name: "Home Maintenance", description: "Maintaining your home." }
  ],
  "Education Funding": [
    { name: "Planning for College", description: "Preparing for college costs." },
    { name: "Saving for College", description: "College savings options." }
  ],
  "Estate Planning": [
    { name: "Basic Estate Planning Tools", description: "Wills and trusts." },
    { name: "Estate Planning Concepts", description: "Core estate planning principles." },
    { name: "Estate and Gift Taxes", description: "Tax implications of estates." },
    { name: "Life Insurance in Estate Planning", description: "Life insurance in estates." },
    { name: "Advanced Estate Planning Tools", description: "Complex estate strategies." },
    { name: "Estate Freezing Techniques", description: "Freezing estate value." }
  ],
  "Business Planning": [
    { name: "Basic Business Concepts", description: "Starting a business." },
    { name: "Business Valuation", description: "Valuing a business." },
    { name: "Business Continuation", description: "Succession planning." },
    { name: "Benefits to Business Owners", description: "Owner benefits." }
  ],
  "Charitable Planning": [
    { name: "Gifting Techniques", description: "Effective charitable giving." },
    { name: "Taxation of Charitable Gifts", description: "Tax benefits of giving." },
    { name: "Other Charitable Strategies", description: "Advanced giving strategies." }
  ],
  "Social Security and Government Programs": [
    { name: "Social Security Benefits", description: "Social Security overview." },
    { name: "Other Government Programs", description: "Other assistance programs." }
  ],
  "Advisys Support": [
    { name: "Planning Tools", description: "Advisys planning tools." },
    { name: "Reference Materials", description: "Advisys reference library." },
    { name: "Client Interaction Forms", description: "Client forms." },
    { name: "Worksheets", description: "Financial planning worksheets." }
  ]
};

const reportGrid = document.getElementById('report-grid');
const subfolderContainer = document.getElementById('subfolder-container');
const breadcrumb = document.getElementById('breadcrumb');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('report-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
const savePdfBtn = document.getElementById('save-pdf-btn');
const modalShareBtn = document.getElementById('modal-share-btn');
const modalSavePdfBtn = document.getElementById('modal-save-pdf-btn');
const presentationTab = document.getElementById('presentation-tab');
const presentationCount = document.getElementById('presentation-count');

let selectedCategory = 'all';
let selectedSubcategory = null;
let lastSearchTerm = '';
let presentationReports = [];

function updatePresentationCount() {
  const previousCount = parseInt(presentationCount.textContent) || 0;
  presentationCount.textContent = presentationReports.length;
  
  if (presentationReports.length > 0 && previousCount === 0) {
    presentationCount.classList.remove('active');
    void presentationCount.offsetWidth;
    presentationCount.classList.add('active');
  } else if (presentationReports.length === 0) {
    presentationCount.classList.remove('active');
  }
}

function generateSocialMediaPost(title, content) {
  const plainContent = content.replace(/<[^>]+>/g, '');
  if (title === "The Need for Retirement Planning") {
    return "Retirement isn't just rocking on the porch anymore—longer lives mean planning for income, health, and more. Start early! #RetirementPlanning";
  }
  const summary = plainContent.substring(0, 100).trim() + '...';
  return `${title}: ${summary} #FinancialPlanning`;
}

function updateBreadcrumb() {
  if (selectedSubcategory) {
    breadcrumb.innerHTML = `<span class="breadcrumb-category">${selectedCategory}</span> --> ${selectedSubcategory}`;
    breadcrumb.style.display = 'block';
    document.querySelector('.breadcrumb-category').addEventListener('click', () => {
      selectedSubcategory = null;
      renderSubfolders(selectedCategory);
    });
  } else {
    breadcrumb.style.display = 'none';
  }
}

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
    subfolderContainer.style.display = 'flex';
    reportGrid.style.display = 'none';
    updateBreadcrumb();
  } else {
    subfolderContainer.style.display = 'none';
    reportGrid.style.display = 'block';
    updateBreadcrumb();
    renderReports();
  }
}

function renderReports() {
  reportGrid.innerHTML = '';
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedTags = Array.from(document.querySelectorAll('#tag-filters input:checked')).map(input => input.value);
  const isOnePagerFilter = selectedTags.includes('one-pager');
  const selectedTopics = selectedTags.filter(tag => tag.startsWith('topic-'));
  
  lastSearchTerm = searchTerm;
  
  reports.forEach(report => {
    const plainContent = report.content.replace(/<[^>]+>/g, '');
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || report.subcategory === selectedSubcategory;
    const matchesSearch = !searchTerm || report.title.toLowerCase().includes(searchTerm) || plainContent.toLowerCase().includes(searchTerm);
    const matchesOnePager = !isOnePagerFilter || report.tags.includes('one-pager');
    const matchesTopic = selectedTopics.length === 0 || report.tags.some(topic => selectedTopics.includes(topic));
    
    if (matchesCategory && matchesSubcategory && matchesSearch && matchesOnePager && matchesTopic) {
      const card = document.createElement('div');
      card.classList.add('report-card', 'list-view');
      card.setAttribute('data-title', report.title);
      card.setAttribute('data-content', report.content);
      card.setAttribute('data-category', report.category);
      const isSelected = presentationReports.includes(report.title);
      card.innerHTML = `
        <div class="report-card-content">
          <h3>${report.title}</h3>
          <div class="card-actions">
            <input type="checkbox" class="presentation-checkbox" ${isSelected ? 'checked' : ''}>
          </div>
        </div>
      `;
      reportGrid.appendChild(card);
    }
  });

  updateBreadcrumb();
  updateReportCounts();
}

function updateReportCounts() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedTags = Array.from(document.querySelectorAll('#tag-filters input:checked')).map(input => input.value);
  const isOnePagerFilter = selectedTags.includes('one-pager');
  const selectedTopics = selectedTags.filter(tag => tag.startsWith('topic-'));

  const reportCounts = {};
  reports.forEach(report => {
    const plainContent = report.content.replace(/<[^>]+>/g, '');
    const matchesSearch = !searchTerm || report.title.toLowerCase().includes(searchTerm) || plainContent.toLowerCase().includes(searchTerm);
    const matchesOnePager = !isOnePagerFilter || report.tags.includes('one-pager');
    const matchesTopic = selectedTopics.length === 0 || report.tags.some(topic => selectedTopics.includes(topic));
    
    if (matchesSearch && matchesOnePager && matchesTopic) {
      const key = report.subcategory || report.category;
      reportCounts[key] = (reportCounts[key] || 0) + 1;
      reportCounts['all'] = (reportCounts['all'] || 0) + 1;
    }
  });

  document.querySelectorAll('.report-count').forEach(countEl => {
    const category = countEl.closest('a').dataset.category;
    countEl.textContent = `(${reportCounts[category] || 0})`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.group-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const group = toggle.closest('.category-group');
      const isExpanded = group.getAttribute('aria-expanded') === 'true';
      group.setAttribute('aria-expanded', !isExpanded);
    });

    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });
  });

  updateReportCounts();

  categoryFilter.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target.closest('a');
    if (target && target.dataset.category) {
      const category = target.dataset.category;
      const mainCategories = Object.keys(subfolders);
      const isMainCategory = mainCategories.includes(category);
      const isSubcategory = Object.values(subfolders).flat().some(sub => sub.name === category);

      categoryFilter.querySelectorAll('a').forEach(a => {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      });
      target.classList.add('active');
      target.setAttribute('aria-current', 'true');

      if (isMainCategory) {
        selectedCategory = category;
        selectedSubcategory = null;
        renderSubfolders(category);
      } else if (isSubcategory) {
        const mainCategory = Object.keys(subfolders).find(key => 
          subfolders[key].some(sub => sub.name === category)
        );
        if (mainCategory) {
          selectedCategory = mainCategory;
          selectedSubcategory = category;
          subfolderContainer.style.display = 'none';
          reportGrid.style.display = 'block';
          renderReports();
        }
      }
    }
  });

  searchInput.addEventListener('input', () => {
    renderReports();
    updateReportCounts();
  });

  document.querySelectorAll('#tag-filters input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      renderReports();
      updateReportCounts();
    });
  });

  const clientFileNameElement = document.getElementById('client-file-name');
  if (clientFileNameElement) {
    const storedClientName = localStorage.getItem('clientFileName') || 'No Client Selected';
    clientFileNameElement.textContent = storedClientName;
  } else {
    console.warn('Client file name element (#client-file-name) not found in Education tab');
  }

  renderReports();
  updatePresentationCount();
});

subfolderContainer.addEventListener('click', (e) => {
  const subfolder = e.target.closest('.subfolder');
  if (subfolder) {
    selectedSubcategory = subfolder.getAttribute('data-subcategory');
    subfolderContainer.style.display = 'none';
    reportGrid.style.display = 'block';
    renderReports();
  }
});

reportGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.report-card');
  if (card && !e.target.classList.contains('presentation-checkbox')) {
    modalTitle.textContent = card.getAttribute('data-title');
    let content = card.getAttribute('data-content');
    if (lastSearchTerm) {
      const regex = new RegExp(`(${lastSearchTerm})`, 'gi');
      content = content.replace(regex, '<span class="highlight">$1</span>');
    }
    modalContent.innerHTML = content;
    modal.style.display = 'flex';
    document.querySelector('.modal-actions').style.display = 'flex';
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
  document.querySelector('.modal-actions').style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.querySelector('.modal-actions').style.display = 'none';
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

modalShareBtn.addEventListener('click', () => {
  const title = modalTitle.textContent;
  const content = modalContent.innerHTML;
  const post = generateSocialMediaPost(title, content);
  alert(`Generated Social Media Post:\n\n${post}\n\nCharacter count: ${post.length}`);
});

modalSavePdfBtn.addEventListener('click', () => {
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
