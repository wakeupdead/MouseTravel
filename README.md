# Mouse Travel
[![Build Status](https://travis-ci.org/wakeupdead/MouseTravel.svg?branch=master)](https://travis-ci.org/wakeupdead/MouseTravel)

Test application with Ionic 4 RC and Firebase, includes simple lists and chat with auth using Facebook

## Installation
- Clone repo
- Install Ionic globally i.e. npm i -g ionic
- Run ionic serve

Might have forgotten something like firebase...
## Changes

## Deployment

Deployment to Firebase done using Travis CI, just push changes to GitHub

# Capacitor

## Add Platforms
npx cap add ios
npx cap add android
## Open IDE to build
npx cap open ios
npx cap open android
## Syncing your app with Capacitor
Every time you perform a build (e.g. npm run build) that changes your web directory (default: www), you'll need to copy those changes down to your native projects:

npx cap copy
## Using Ionic Native
Ionic Native is supported in Capacitor. Currently, Ionic Native contains only Cordova plugins, so whenever you find an Ionic Native wrapper you'd like to use, install it and then install the corresponding Cordova plugin by running

npm install your-cordova-plugin
npx cap update
