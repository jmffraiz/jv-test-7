export default function decorate(block) {
  const isVideo = block.classList.contains('hero-video');
  const rows = [...block.children];

  // Extract content from rows
  let picture = null;
  let heading = null;
  let videoUrl = null;

  rows.forEach((row) => {
    const img = row.querySelector('picture');
    const h = row.querySelector('h1, h2, h3, h4, h5, h6');
    const link = row.querySelector('a[href$=".mp4"]');

    if (img && !picture) picture = img;
    if (h && !heading) heading = h;
    if (link) videoUrl = link.href;
  });

  // Clear block
  block.textContent = '';

  // Create background container
  const bg = document.createElement('div');
  bg.className = 'hero-background';

  if (picture) {
    bg.append(picture);
  }

  if (isVideo && videoUrl) {
    const video = document.createElement('video');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    video.muted = true;
    const source = document.createElement('source');
    source.src = videoUrl;
    source.type = 'video/mp4';
    video.append(source);
    bg.append(video);
  }

  block.append(bg);

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'hero-overlay';

  const content = document.createElement('div');
  content.className = 'hero-content';
  if (heading) content.append(heading);
  overlay.append(content);

  block.append(overlay);
}
