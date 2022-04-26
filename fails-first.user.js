// ==UserScript==
// @name         fails-first
// @namespace    https://asottile.dev
// @version      0.2
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

        let failsRequired = [];
        let fails = [];
        let pending = [];
        let skipped = [];
        for (let child of lst.querySelectorAll('.merge-status-item')) {
            if (child.querySelector('.octicon-skip')) {
                child.parentNode.removeChild(child);
                skipped.push(child);
            } else if (child.querySelector('.octicon-x')) {
                child.parentNode.removeChild(child);
                const isRequired = Array.from(child.querySelectorAll('span')).some(el => el.textContent === 'Required');
                if(isRequired) {
                    failsRequired.push(child);
                    continue;
                }
                fails.push(child);
            } else if (child.querySelector('.anim-rotate, .octicon-dot-fill')) {
                child.parentNode.removeChild(child);
                pending.push(child);
            }
        }
        lst.prepend(...failsRequired, ...fails, ...pending, ...skipped);

        observer.takeRecords(); // prevent recursing infinitely
    }).observe(document.documentElement, {childList: true, subtree: true});
})();
