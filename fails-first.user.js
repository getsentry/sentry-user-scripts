// ==UserScript==
// @name         fails-first
// @namespace    https://asottile.dev
// @version      1.0
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
        const leftText = left.querySelector('strong').innerText;
        const rightText = right.querySelector('strong').innerText;
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
        let other = [];
        for (let child of lst.querySelectorAll('.merge-status-item')) {
            if (child.querySelector('.octicon-skip')) {
                skipped.push(child);
            } else if (child.querySelector('.octicon-x') || child.querySelector('.octicon-stop')) {
                fails.push(child);
            } else if (child.querySelector('.anim-rotate, .octicon-dot-fill')) {
                pending.push(child);
            } else {
                other.push(child);
            }
        }
        fails.sort(cmp);
        pending.sort(cmp);
        skipped.sort(cmp);
        other.sort(cmp);

        const all = [...fails, ...pending, ...skipped, ...other];
        for (let idx in all) {
            if (all[idx] !== lst.children[idx]) {
                lst.prepend(...all);
                return;
            }
        }
    }).observe(document.documentElement, {childList: true, subtree: true});
})();
