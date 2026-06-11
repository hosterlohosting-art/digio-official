const crypto = require('crypto');

if (!crypto.hash) {
  crypto.hash = function (algorithm, data, outputEncoding) {
    const hash = crypto.createHash(algorithm);
    hash.update(data);
    return outputEncoding ? hash.digest(outputEncoding) : hash.digest();
  };
  console.log('[Polyfill] Injected crypto.hash for compatibility with Node v20.11.1');
}
