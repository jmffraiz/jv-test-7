export default function decorate(block) {
  const rows = [...block.children];
  const nav = document.createElement('nav');
  nav.className = 'topic-menu-nav';
  nav.setAttribute('aria-label', 'Topic navigation');

  const list = document.createElement('ul');
  list.className = 'topic-menu-list';

  rows.forEach((row) => {
    const cols = [...row.children];
    const label = cols[0] ? cols[0].textContent.trim() : '';
    let href = '';

    // Check for an anchor link in the second cell or a link in first cell
    const link = (cols[1] && cols[1].querySelector('a')) || (cols[0] && cols[0].querySelector('a'));
    if (link) {
      href = link.getAttribute('href');
    } else if (cols[1]) {
      href = cols[1].textContent.trim();
    }

    if (label && href) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      a.className = 'topic-menu-link';
      a.addEventListener('click', (e) => {
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.getElementById(href.substring(1));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
      li.append(a);
      list.append(li);
    }
  });

  nav.append(list);
  block.textContent = '';
  block.append(nav);

  // IntersectionObserver for active highlighting
  const links = block.querySelectorAll('.topic-menu-link');
  const sections = [];
  links.forEach((a) => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.getElementById(href.substring(1));
      if (target) sections.push({ el: target, link: a });
    }
  });

  if (sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove('active'));
          const match = sections.find((s) => s.el === entry.target);
          if (match) match.link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach((s) => observer.observe(s.el));
  }
}
