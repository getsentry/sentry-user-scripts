// ==UserScript==
// @name         no-bugbot-status
// @namespace    https://sentry.io
// @version      0.1
// @description  removes bugbot status from sentry PR descriptions
// @author       ryan953
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==


(function() {
  'use strict';
  new MutationObserver((_, observer) => {
    const pr = document.querySelector('[data-testid="mergebox-partial"] textarea');
    if (!pr) {
      return;
    }
    const start = pr.value.indexOf('<!-- BUGBOT_STATUS -->');
    if (start >= 0) {
      pr.value = pr.value.substring(0, start);
    }
  }).observe(document.documentElement, {childList: true, subtree: true});
})();
