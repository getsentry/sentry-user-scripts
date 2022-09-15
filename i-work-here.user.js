// ==UserScript==
// @name         i-work-here
// @namespace    https://asottile.dev
// @version      0.2
// @description  removes legalese boilerplate from sentry PR descriptions
// @author       asottile
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    new MutationObserver((_, observer) => {
        const pr = document.getElementById('pull_request_body');
        let info = pr.value.match(/\s+<!--\s+Sentry employees and contractors can delete or ignore the following/);
        if (info) {
            pr.value = pr.value.substring(0, info.index);
        }
    }).observe(document.documentElement, {childList: true, subtree: true});
})();
