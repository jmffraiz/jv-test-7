import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const isTextOnly = block.classList.contains('text-only');
  const isProduct = block.classList.contains('product');

  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const pic = img.closest('picture');
    pic.replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });

  if (isTextOnly) {
    ul.classList.add('cards-text-only');
  }

  if (isProduct) {
    ul.classList.add('cards-product');
  }

  block.replaceChildren(ul);
}
