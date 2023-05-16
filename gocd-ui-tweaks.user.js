// ==UserScript==
// @name         gocd-ui-tweaks
// @namespace    https://deploy.getsentry.net
// @version      0.1
// @description  Minor tweaks to GoCD UI
// @author       matt.gaunt
// @match        https://deploy*.getsentry.net/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.gocd.org
// @grant        none
// ==/UserScript==

// Remove the agent links since agents are short lived and are generally 404.
function dropAgentLink() {
  const anchors = document.querySelectorAll('.index__agent-cell___1gGiw a');
  if (anchors.length == 0) {
      return;
  }

  for (const a of anchors) {
      const content = a.textContent;
      a.replaceWith(content);
  }
}

// Expand logs once they are visible
function autoExpandLogs() {
  const logsToOpen = document.querySelectorAll('.foldable-section.log-fs-type.log-fs-type-task:not(.open)');
  for (const l of logsToOpen) {
      const anchors = l.querySelectorAll('a.toggle');
      for (const a of anchors) {
          a.click();
      }
  }
}

(function() {
  'use strict';

  console.log('✨ Tweaking GoCD UI');

  // Callback function to execute when mutations are observed
  const callback = (mutationList, observer) => {
      dropAgentLink();
      autoExpandLogs();
  };

  const selectors = [
    'main',
    '#body_bg',
  ];
  let targetNode;
  for (const s of selectors) {
    targetNode = document.querySelector(s);
    if (targetNode) {
      break;
    }
  }

  if (!targetNode) {
    console.error('Failed to find a target node.');
    return;
  }

  const config = { attributes: false, childList: true, subtree: true };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);

})();
