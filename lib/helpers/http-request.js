'use strict';

// Minimal replacement for request-promise, built on the global fetch (Node 18+).
// Supports: url, method, headers, form, json (parse response as JSON).
function request(options) {
  const init = {
    method: options.method || 'GET',
    headers: Object.assign({}, options.headers),
  };

  if (options.form) {
    init.body = new URLSearchParams(options.form).toString();
    if (!init.headers['Content-Type']) {
      init.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
  }

  return fetch(options.url, init).then((res) => {
    return res.text().then((body) => {
      if (!res.ok) {
        const err = new Error(`${res.status} - ${body}`);
        err.statusCode = res.status;
        throw err;
      }
      return options.json ? JSON.parse(body) : body;
    });
  });
}

module.exports = request;
