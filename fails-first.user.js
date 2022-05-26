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

    function cmp(left, right) {
        // sort required first
        const leftRequired = left.innerText.indexOf('Required') >= 0;
        const rightRequired = right.innerText.indexOf('Required') >= 0;
        if (leftRequired && !rightRequired) {
            return -1;
        } else if (!leftRequired && rightRequired) {
            return 1;
        }

        // then sort by name
        const leftText = left.querySelector('.status-check-item-body strong').innerText;
        const rightText = right.querySelector('.status-check-item-body strong').innerText;
        if (leftText < rightText) {
            return -1;
        } else if (leftText > rightText) {
            return 1;
        } else {
            return 0;
        }
    }

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
            } else if (child.querySelector('.octicon-x') || child.querySelector('.octicon-stop')) {
                child.parentNode.removeChild(child);
                fails.push(child);
            } else if (child.querySelector('.anim-rotate, .octicon-dot-fill')) {
                child.parentNode.removeChild(child);
                pending.push(child);
            }
        }
        fails.sort(cmp);
        pending.sort(cmp);
        skipped.sort(cmp);
        lst.prepend(...fails, ...pending, ...skipped);

        observer.takeRecords(); // prevent recursing infinitely
    }).observe(document.documentElement, {childList: true, subtree: true});
})();
