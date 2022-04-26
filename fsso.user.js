// ==UserScript==
// @name         fsso
// @namespace    https://asottile.dev
// @version      0.1
// @description  click a da button
// @author       asottile
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const el = document.querySelector('.org-sso-panel button[type=submit]');
    if (el !== null) {
        el.click();
    }
})();
