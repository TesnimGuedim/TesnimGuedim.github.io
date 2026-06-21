document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const overlay = document.getElementById('overlay');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

  // ---- page switching ----
  function showSection(id) {
    pages.forEach(p => p.classList.toggle('active', p.id === id));
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.dataset.section;
      showSection(id);
      history.replaceState(null, '', '#' + id);
      if (window.innerWidth <= 900) closeSidebar();
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  });

  // open the section matching the URL hash on load, if any
  const initial = window.location.hash.replace('#', '');
  if (initial && document.getElementById(initial)) {
    showSection(initial);
  }

  // ---- sidebar open/close (works on desktop and mobile) ----
  function openSidebar() {
    document.body.classList.add('sidebar-open');
    overlay.classList.add('show');
  }
  function closeSidebar() {
    document.body.classList.remove('sidebar-open');
    overlay.classList.remove('show');
  }
  sidebarToggle.addEventListener('click', () => {
    document.body.classList.contains('sidebar-open') ? closeSidebar() : openSidebar();
  });
  overlay.addEventListener('click', closeSidebar);

  // sidebar starts open
  openSidebar();

  // ---- theme toggle ----
  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeIcon.className = 'fa-solid fa-sun';
      themeLabel.textContent = 'Light';
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.className = 'fa-solid fa-moon';
      themeLabel.textContent = 'Dark';
    }
    try { localStorage.setItem('tg-theme', theme); } catch (e) {}
  }

  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('tg-theme') || 'dark'; } catch (e) {}
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    setTheme(current === 'light' ? 'dark' : 'light');
  });
});
