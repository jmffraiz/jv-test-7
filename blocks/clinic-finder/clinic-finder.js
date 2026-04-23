function loadGooglePlaces(apiKey) {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps && window.google.maps.places) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });
}

export default function decorate(block) {
  const rows = [...block.children];
  const configRow = rows[0];
  const settingsRow = rows[1];

  const configCols = configRow ? [...configRow.children] : [];
  const settingsCols = settingsRow ? [...settingsRow.children] : [];

  const heading = configCols[0] ? configCols[0].textContent.trim() : 'Zoek op plaatsnaam';
  const placeholder = configCols[1] ? configCols[1].textContent.trim() : 'Zoek op postcode, plaatsnaam';
  const apiKey = settingsCols[0] ? settingsCols[0].textContent.trim() : '';
  const resultsUrl = settingsCols[1] ? settingsCols[1].textContent.trim() : '/nl/clinics';

  block.textContent = '';

  // Build UI
  const container = document.createElement('div');
  container.className = 'clinic-finder-container';

  const h2 = document.createElement('h2');
  h2.textContent = heading;
  container.append(h2);

  const form = document.createElement('form');
  form.className = 'clinic-finder-form';

  const inputWrap = document.createElement('div');
  inputWrap.className = 'clinic-finder-input-wrapper';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'clinic-finder-input';
  input.placeholder = placeholder;
  input.setAttribute('aria-label', placeholder);
  inputWrap.append(input);

  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.className = 'button primary clinic-finder-submit';
  btn.textContent = 'Zoeken';
  inputWrap.append(btn);

  form.append(inputWrap);
  container.append(form);
  block.append(container);

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
      const url = new URL(resultsUrl, window.location.origin);
      url.searchParams.set('q', query);
      window.location.href = url.toString();
    }
  });

  // Load Google Places if API key provided
  if (apiKey && apiKey.startsWith('AIza')) {
    loadGooglePlaces(apiKey).then(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        /* eslint-disable-next-line no-new */
        const autocomplete = new window.google.maps.places.Autocomplete(input, {
          types: ['geocode'],
          componentRestrictions: { country: 'nl' },
        });
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place && place.geometry) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const url = new URL(resultsUrl, window.location.origin);
            url.searchParams.set('lat', lat);
            url.searchParams.set('lng', lng);
            url.searchParams.set('q', input.value);
            window.location.href = url.toString();
          }
        });
      }
    }).catch(() => {
      // Google Places failed to load — form still works with text search
    });
  }
}
