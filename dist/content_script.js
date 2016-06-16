/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict'; // We inject another script (Injected) right into the DOM of the page, so we can access its `window` object
	function injectScript(file, node) {
	  var th = document.getElementsByTagName(node)[0];
	  var s = document.createElement('script');
	  s.setAttribute('src', file);
	  th.appendChild(s);}

	injectScript(chrome.extension.getURL('/injected.js'), 'body');


	// We expect the Injected script to send us a message with some data from the DOM/window
	window.addEventListener("message", function (event) {

	  // We only accept messages from ourselves
	  if (event.source != window) {
	    return;}


	  // Is this the message we are expecting? We speciried the same `type` in injected.js
	  if (event.data.type && event.data.type == "FEP") {

	    console.log("Content script received: " + event.data.text);

	    // Propagate the message further - into Background
	    chrome.runtime.sendMessage(event.data.text);}}, 

	false);

/***/ }
/******/ ]);