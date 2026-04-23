export default function decorate(block) {
  const items = [...block.children];
  const container = document.createElement('div');
  container.className = 'accordion-items';

  items.forEach((row) => {
    const cols = [...row.children];
    const question = cols[0];
    const answer = cols[1];

    const details = document.createElement('details');
    details.className = 'accordion-item';

    const summary = document.createElement('summary');
    summary.className = 'accordion-question';
    summary.innerHTML = question ? question.innerHTML : '';

    const body = document.createElement('div');
    body.className = 'accordion-answer';
    body.innerHTML = answer ? answer.innerHTML : '';

    details.append(summary);
    details.append(body);
    container.append(details);
  });

  block.textContent = '';
  block.append(container);
}
