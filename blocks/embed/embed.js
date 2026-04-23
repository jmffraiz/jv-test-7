const YOUTUBE_RE = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
const VIMEO_RE = /vimeo\.com\/(\d+)/;

function embedYoutube(url, id) {
  const wrapper = document.createElement('div');
  wrapper.className = 'embed-youtube';
  wrapper.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?rel=0" 
    frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" 
    allowfullscreen title="YouTube video"></iframe>`;
  return wrapper;
}

function embedVimeo(url, id) {
  const wrapper = document.createElement('div');
  wrapper.className = 'embed-vimeo';
  wrapper.innerHTML = `<iframe src="https://player.vimeo.com/video/${id}" 
    frameborder="0" allow="autoplay; fullscreen; picture-in-picture" 
    allowfullscreen title="Vimeo video"></iframe>`;
  return wrapper;
}

function embedVideo(url) {
  const wrapper = document.createElement('div');
  wrapper.className = 'embed-video';
  const video = document.createElement('video');
  video.setAttribute('controls', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('preload', 'metadata');
  const source = document.createElement('source');
  source.src = url;
  source.type = 'video/mp4';
  video.append(source);
  wrapper.append(video);
  return wrapper;
}

function getUrl(block) {
  const link = block.querySelector('a[href]');
  if (link) return link.href;
  const text = block.textContent.trim();
  try {
    return new URL(text).href;
  } catch {
    return text;
  }
}

export default function decorate(block) {
  const url = getUrl(block);
  block.textContent = '';

  if (!url) return;

  let embedEl;
  const ytMatch = url.match(YOUTUBE_RE);
  const vimeoMatch = url.match(VIMEO_RE);

  if (ytMatch) {
    embedEl = embedYoutube(url, ytMatch[1]);
  } else if (vimeoMatch) {
    embedEl = embedVimeo(url, vimeoMatch[1]);
  } else if (url.endsWith('.mp4') || url.includes('.mp4')) {
    embedEl = embedVideo(url);
  } else {
    // Generic iframe embed
    const wrapper = document.createElement('div');
    wrapper.className = 'embed-iframe';
    wrapper.innerHTML = `<iframe src="${url}" frameborder="0" allowfullscreen loading="lazy" title="Embedded content"></iframe>`;
    embedEl = wrapper;
  }

  block.append(embedEl);
}
