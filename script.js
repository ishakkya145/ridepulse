'use strict';
// The APK anchor works without JavaScript; metadata is progressive enhancement.
fetch('downloads/release.json', {cache: 'no-cache'})
  .then(response => {if (!response.ok) throw new Error('Metadata unavailable'); return response.json();})
  .then(release => {
    const values = {'[data-version]': release.version, '[data-size]': release.sizeLabel, '[data-date]': release.publishedLabel};
    for (const [selector, value] of Object.entries(values)) {
      if (typeof value === 'string') document.querySelectorAll(selector).forEach(el => {el.textContent = value;});
    }
  }).catch(() => { /* The embedded release details and direct download remain available. */ });
document.querySelectorAll('.download-apk').forEach(link => link.addEventListener('click', () => {
  const status = document.querySelector('.download-feedback');
  status.textContent = /iPhone|iPad|iPod/.test(navigator.userAgent)
    ? 'This APK installs on Android only. Open this page on your Android phone.'
    : 'If the download begins, open HelmetAlert.apk from your downloads to install. If it does not, try the download button again.';
}));
