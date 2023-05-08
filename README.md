[![Build Status](https://github.com/getsentry/sentry-user-scripts/workflows/main/badge.svg)](https://github.com/getsentry/sentry-user-scripts/actions)

sentry-user-scripts
===================

greasemonkey / tampermonkey browser user scripts

## installation

these scripts depend on a user scripting browser extension

- google chrome uses [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
- firefox uses [greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)

once that extension is installed, click on the `raw` link for a user script
(links are provided below)

### fails-first

for PR status results sometimes the failures are buried amongst the other 50
checks!

this user script sorts failures, pending, and skipped status checks at the top
of the status pane

[install](https://github.com/getsentry/sentry-user-scripts/raw/main/fails-first.user.js)

![](https://user-images.githubusercontent.com/103459774/165384898-1836155f-39a6-41ab-930b-2021c53b7a4f.png)

### fsso

"""forget""" sso!

it's annoying to click the SSO button on github -- just do it for me!

[install](https://github.com/getsentry/sentry-user-scripts/raw/main/fsso.user.js)

![](https://user-images.githubusercontent.com/103459774/165384953-e2502c02-d6b0-4046-a5e0-d00ed062167a.png)

### i-work-here

I work here!  I don't need the legalese boilerplate in PR descriptions

[install](https://github.com/getsentry/sentry-user-scripts/raw/main/i-work-here.user.js)

![](https://user-images.githubusercontent.com/103459774/190283698-f2043e87-a8db-43e1-a6eb-1cee4917fdd1.png)

### gocd-auto-signin

Automatically sign in to GoCD

[install](https://github.com/getsentry/sentry-user-scripts/raw/main/gocd-auto-signin.user.js)
