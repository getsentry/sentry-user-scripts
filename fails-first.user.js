// ==UserScript==
// @name         fails-first
// @namespace    https://asottile.dev
// @version      0.1
// @description  put failed statuses first
// @author       asottile
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    new MutationObserver((_, observer) => {
        const lst = document.querySelector('.merge-status-list.js-updatable-content-preserve-scroll-position');
        if (!lst) {
            return;
        }

        let fails = [];
        let pending = [];
        let skipped = [];
        for (let child of lst.querySelectorAll('.merge-status-item')) {
            if (child.querySelector('.octicon-skip')) {
                child.parentNode.removeChild(child);
                skipped.push(child);
            } else if (child.querySelector('.octicon-x')) {
                child.parentNode.removeChild(child);
                fails.push(child);
            } else if (child.querySelector('.anim-rotate, .octicon-dot-fill')) {
                child.parentNode.removeChild(child);
                pending.push(child);
            }
        }
        lst.prepend(...fails, ...pending, ...skipped);

        observer.takeRecords(); // prevent recursing infinitely
    }).observe(document.documentElement, {childList: true, subtree: true});
})();
