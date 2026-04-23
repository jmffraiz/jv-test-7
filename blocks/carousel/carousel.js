function createIndicators(count, container) {
  const dots = document.createElement('div');
  dots.className = 'carousel-dots';
  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      const track = container.querySelector('.carousel-track');
      track.style.transform = `translateX(-${i * 100}%)`;
      container.querySelectorAll('.carousel-dot').forEach((d) => d.classList.remove('active'));
      dot.classList.add('active');
      /* eslint-disable-next-line no-param-reassign */
      container.dataset.current = i;
    });
    dots.append(dot);
  }
  return dots;
}

export default function decorate(block) {
  const slides = [...block.children];
  if (!slides.length) return;

  const track = document.createElement('div');
  track.className = 'carousel-track';

  slides.forEach((slide) => {
    const s = document.createElement('div');
    s.className = 'carousel-slide';
    while (slide.firstElementChild) s.append(slide.firstElementChild);
    track.append(s);
  });

  block.textContent = '';
  block.dataset.current = 0;

  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-viewport';
  wrapper.append(track);
  block.append(wrapper);

  const count = track.children.length;
  if (count > 1) {
    block.append(createIndicators(count, block));

    // Navigation arrows
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-arrow carousel-prev';
    prevBtn.setAttribute('aria-label', 'Previous');
    prevBtn.innerHTML = '&#8249;';
    prevBtn.addEventListener('click', () => {
      let idx = parseInt(block.dataset.current, 10) - 1;
      if (idx < 0) idx = count - 1;
      block.querySelector(`.carousel-dot:nth-child(${idx + 1})`).click();
    });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-arrow carousel-next';
    nextBtn.setAttribute('aria-label', 'Next');
    nextBtn.innerHTML = '&#8250;';
    nextBtn.addEventListener('click', () => {
      let idx = parseInt(block.dataset.current, 10) + 1;
      if (idx >= count) idx = 0;
      block.querySelector(`.carousel-dot:nth-child(${idx + 1})`).click();
    });

    block.append(prevBtn);
    block.append(nextBtn);

    // Touch/swipe support
    let startX = 0;
    let diffX = 0;
    wrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    wrapper.addEventListener('touchmove', (e) => {
      diffX = e.touches[0].clientX - startX;
    }, { passive: true });
    wrapper.addEventListener('touchend', () => {
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) prevBtn.click();
        else nextBtn.click();
      }
      diffX = 0;
    });
  }
}
