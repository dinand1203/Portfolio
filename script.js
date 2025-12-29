// Language Management
let currentLanguage = localStorage.getItem('language') || 'en';
let translations = {};
let allProjects = [];
let currentFilter = 'all';
let currentSort = 'newest';

// Detect if we're in a subdirectory
const isSubdirectory = window.location.pathname.includes('/projects/');
const pathPrefix = isSubdirectory ? '../' : '';

// Load translations
async function loadTranslations() {
    try {
        const response = await fetch(pathPrefix + 'translations.json');
        translations = await response.json();
        applyTranslations();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Apply translations to elements with data-translate attribute
function applyTranslations() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(translations[currentLanguage], key);
        if (translation) {
            element.textContent = translation;
        }
    });

    // Update language toggle button
    const langFlag = document.querySelector('.lang-flag');
    const langText = document.querySelector('.lang-text');
    if (currentLanguage === 'en') {
        langFlag.textContent = '🇳🇱';
        langText.textContent = 'NL';
    } else {
        langFlag.textContent = '🇬🇧';
        langText.textContent = 'EN';
    }

    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;

    // Reload projects with new language
    displayProjects(allProjects);
}

// Get nested translation value from object using dot notation
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'nl' : 'en';
    localStorage.setItem('language', currentLanguage);
    applyTranslations();
}

// Load projects from JSON file
async function loadProjects() {
    try {
        const response = await fetch(pathPrefix + 'projects.json');
        allProjects = await response.json();
        applyFiltersAndSort();
    } catch (error) {
        console.error('Error loading projects:', error);
        displayError();
    }
}

// Sort projects by date
function sortProjects(projects, sortOrder) {
    return [...projects].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (sortOrder === 'newest') {
            return dateB - dateA; // Newest first
        } else {
            return dateA - dateB; // Oldest first
        }
    });
}

// Apply both filter and sort
function applyFiltersAndSort() {
    let filtered = allProjects;

    // Apply filter
    if (currentFilter !== 'all') {
        filtered = allProjects.filter(project => project.status === currentFilter);
    }

    // Apply sort
    const sorted = sortProjects(filtered, currentSort);

    displayProjects(sorted);
}

// Display projects in the grid
function displayProjects(projects) {
    const container = document.getElementById('projects-container');

    if (projects.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-light);">No projects to display yet. Add some in projects.json!</p>';
        return;
    }

    // Get translated status labels
    const statusCompleted = translations[currentLanguage]?.projects?.statusCompleted || 'Completed';
    const statusInProgress = translations[currentLanguage]?.projects?.statusInProgress || 'In Progress';
    const viewProjectText = translations[currentLanguage]?.projects?.viewProject || 'View Project';

    container.innerHTML = projects.map(project => {
        // Get title and description in current language
        const title = project.title[currentLanguage] || project.title.en || project.title;
        const description = project.description[currentLanguage] || project.description.en || project.description;

        return `
        <div class="project-card" data-status="${project.status}">
            ${project.image ? `<img src="${project.image}" alt="${title}" class="project-image">` : '<div class="project-image"></div>'}
            <div class="project-content">
                <span class="project-status status-${project.status}">${project.status === 'completed' ? statusCompleted : statusInProgress}</span>
                <h3 class="project-title">${title}</h3>
                <p class="project-description">${description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">${viewProjectText} →</a>` : ''}
            </div>
        </div>
        `;
    }).join('');
}

// Display error message
function displayError() {
    const container = document.getElementById('projects-container');
    container.innerHTML = '<p style="text-align: center; color: var(--text-light);">Unable to load projects. Make sure projects.json exists and is valid.</p>';
}

// Filter projects
function filterProjects(filter) {
    currentFilter = filter;
    applyFiltersAndSort();
}

// Setup filter buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            const filter = button.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
}

// Setup sort buttons
function setupSort() {
    const sortButtons = document.querySelectorAll('.sort-btn');

    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            sortButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Sort projects
            currentSort = button.getAttribute('data-sort');
            applyFiltersAndSort();
        });
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup language toggle
function setupLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();

    // Only load projects if we're on the main page
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        await loadProjects();
        setupFilters();
    }

    setupSmoothScrolling();
    setupLanguageToggle();
});
