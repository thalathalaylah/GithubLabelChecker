function isTarget(url, targets) {
  let splittedUrl = document.URL.split('/');
  if (splittedUrl.length >= 7) {
    let host = splittedUrl[2];
    let user = splittedUrl[3];
    let repository = splittedUrl[4];
    let match = function(target) {
      return target.host === host && target.user === user && target.repository === repository;
    };

    if (targets.find(match)) {
      return true;
    }
  }
  return false;
}

targets = [{host: 'github.com', user: 'example-user', repository: 'example-repository'}];
if (isTarget(document.URL, targets)) {
  let label = document.querySelector('[aria-label="Labels"]');
  if (label != null && label.innerText != null && label.innerText === 'None yet\n') {
    alert('Labels is empty!!!!!');
  }
}
