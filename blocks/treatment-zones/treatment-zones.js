export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  // First row is the portrait image
  const portraitRow = rows.shift();
  const portraitPic = portraitRow.querySelector('picture');

  // Remaining rows are zones
  const zones = rows.map((row, i) => {
    const cols = [...row.children];
    const label = cols[0] ? cols[0].textContent.trim() : '';
    const description = cols[1] ? cols[1].innerHTML : '';
    const zoneImg = cols[2] ? cols[2].querySelector('picture') : null;
    return {
      label, description, zoneImg, index: i,
    };
  });

  block.textContent = '';

  // Build layout
  const wrapper = document.createElement('div');
  wrapper.className = 'treatment-zones-layout';

  // Image column
  const imageCol = document.createElement('div');
  imageCol.className = 'treatment-zones-image';
  if (portraitPic) imageCol.append(portraitPic);

  // Zone image overlays
  zones.forEach((zone) => {
    if (zone.zoneImg) {
      zone.zoneImg.className = 'treatment-zones-zone-img';
      zone.zoneImg.dataset.zone = zone.index;
      if (zone.index !== 0) zone.zoneImg.style.display = 'none';
      imageCol.append(zone.zoneImg);
    }
  });

  wrapper.append(imageCol);

  // Content column
  const contentCol = document.createElement('div');
  contentCol.className = 'treatment-zones-content';

  // Tab buttons
  const tabs = document.createElement('div');
  tabs.className = 'treatment-zones-tabs';
  tabs.setAttribute('role', 'tablist');

  zones.forEach((zone, i) => {
    const btn = document.createElement('button');
    btn.className = 'treatment-zones-tab';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.dataset.zone = i;
    btn.textContent = zone.label;
    if (i === 0) btn.classList.add('active');
    tabs.append(btn);
  });

  contentCol.append(tabs);

  // Panels
  const panels = document.createElement('div');
  panels.className = 'treatment-zones-panels';

  zones.forEach((zone, i) => {
    const panel = document.createElement('div');
    panel.className = 'treatment-zones-panel';
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-hidden', i !== 0 ? 'true' : 'false');
    panel.innerHTML = zone.description;
    if (i !== 0) panel.style.display = 'none';
    panels.append(panel);
  });

  contentCol.append(panels);
  wrapper.append(contentCol);
  block.append(wrapper);

  // Event handling
  tabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.treatment-zones-tab');
    if (!btn) return;
    const idx = parseInt(btn.dataset.zone, 10);

    tabs.querySelectorAll('.treatment-zones-tab').forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    panels.querySelectorAll('.treatment-zones-panel').forEach((p, pi) => {
      p.style.display = pi === idx ? '' : 'none';
      p.setAttribute('aria-hidden', pi !== idx ? 'true' : 'false');
    });

    imageCol.querySelectorAll('.treatment-zones-zone-img').forEach((img) => {
      img.style.display = parseInt(img.dataset.zone, 10) === idx ? '' : 'none';
    });
  });
}
