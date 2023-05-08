// ==UserScript==
// @name         gocd-auto-signing
// @namespace    https://deploy.getsentry.net
// @version      0.1
// @description  click a da button
// @author       matt.gaunt
// @match        https://deploy.getsentry.net/go/auth/login
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.gocd.org
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const el = document.querySelector('[data-test-id="link-to-login-using-google-iap-authorization"]');
  if (el !== null) {
      el.click();
  }
})();
