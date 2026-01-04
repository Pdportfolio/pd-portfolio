// Update copyright year
document.getElementById("year").innerHTML = new Date().getFullYear();

// Hamburger menu functionality
function initializeHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  // Toggle menu on hamburger click
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Update aria-expanded for accessibility
    const isExpanded = this.classList.contains('active');
    this.setAttribute('aria-expanded', isExpanded);
  });
  
  // Close menu when clicking on a nav link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// Programming language icons/emojis mapping
const languageIcons = {
  'JavaScript': '🟨',
  'Python': '🐍',
  'Java': '☕',
  'C': '©️',
  'C++': '⚙️',
  'C#': '#️⃣',
  'HTML': '🌐',
  'CSS': '🎨',
  'PHP': '🐘',
  'Ruby': '💎',
  'Go': '🐹',
  'Rust': '🦀',
  'Swift': '🍎',
  'Kotlin': '🅺',
  'TypeScript': '📘',
  'R': '📊',
  'Dart': '🎯',
  'Shell': '🐚',
  'Jupyter Notebook': '📓',
  'default': '💻'
};

// Google Drive Certificates Data
const certificates = [
  {
    id: '1fK_uopU078aZ7yp8fo2ySVADXQm1U1sa',
    name: 'Supervised Machine Learning By Andrew Ng'
  },
  {
    id: '1sK2849ss701eUOXnIxz_fmjwlEvyLckx',
    name: 'Machine Learning A-Z'
  },
  {
    id: '1Hz4SJPa2pmicrZcu-Alp-2q-dddZilsr',
    name: 'What is Generative AI ?'
  }
];

// Fetch GitHub repositories
async function fetchGitHubProjects() {
  const username = 'prakharpd';
  const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;
  
  const projectsContainer = document.getElementById('projects-container');
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    
    const repos = await response.json();
    
    // Clear loading message
    projectsContainer.innerHTML = '';
    
    // Check if user has any repositories
    if (repos.length === 0) {
      projectsContainer.innerHTML = '<p class="error-text">No repositories found.</p>';
      return;
    }
    
    // Create project tiles
    repos.forEach(repo => {
      const projectTile = createProjectTile(repo);
      projectsContainer.appendChild(projectTile);
    });
    
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    projectsContainer.innerHTML = '<p class="error-text">Unable to load projects. Please try again later.</p>';
  }
}

// Create individual project tile
function createProjectTile(repo) {
  const tile = document.createElement('a');
  tile.href = repo.html_url;
  tile.target = '_blank';
  tile.rel = 'noopener noreferrer';
  tile.className = 'project-tile';
  
  // Get language icon
  const language = repo.language || 'default';
  const icon = languageIcons[language] || languageIcons['default'];
  
  tile.innerHTML = `
    <div class="project-logo">${icon}</div>
    <div class="project-name">${repo.name}</div>
  `;
  
  return tile;
}

// Load certificates from Google Drive
function loadCertificates() {
  const certificatesContainer = document.getElementById('certificates-container');
  
  certificates.forEach(cert => {
    const tile = createCertificateTile(cert);
    certificatesContainer.appendChild(tile);
  });
}

// Create individual certificate tile
function createCertificateTile(cert) {
  const tile = document.createElement('a');
  tile.href = `https://drive.google.com/file/d/${cert.id}/view`;
  tile.target = '_blank';
  tile.rel = 'noopener noreferrer';
  tile.className = 'certificate-tile';
  tile.title = cert.name;
  
  // Use Google Drive thumbnail API
  const thumbnailUrl = `https://drive.google.com/thumbnail?id=${cert.id}&sz=w400`;
  
  tile.innerHTML = `
    <img src="${thumbnailUrl}" alt="${cert.name}" />
  `;
  
  return tile;
}

// Add click/tap functionality for experience and skill tiles (mobile support)
function initializeInteractiveTiles() {
  const tiles = document.querySelectorAll('.experience-tile, .skill-tile');
  
  tiles.forEach(tile => {
    // Click/Tap handler
    tile.addEventListener('click', function(e) {
      // Only on mobile/tablet (<=900px) or if not using hover
      if (window.innerWidth <= 900) {
        e.preventDefault();
        
        // Close other open tiles
        tiles.forEach(otherTile => {
          if (otherTile !== tile) {
            otherTile.classList.remove('active');
          }
        });
        
        // Toggle current tile
        this.classList.toggle('active');
      }
    });
    
    // Keyboard support (Enter or Space)
    tile.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        
        // Close other open tiles
        tiles.forEach(otherTile => {
          if (otherTile !== tile) {
            otherTile.classList.remove('active');
          }
        });
        
        // Toggle current tile
        this.classList.toggle('active');
      }
    });
  });
  
  // Close tiles when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.experience-tile') && !e.target.closest('.skill-tile') && window.innerWidth <= 900) {
      tiles.forEach(tile => {
        tile.classList.remove('active');
      });
    }
  });
}

// Load projects and certificates when page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchGitHubProjects();
  loadCertificates();
  initializeInteractiveTiles();
  initializeHamburgerMenu();
});
