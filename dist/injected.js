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

	"use strict";var dfp = null;

	var dfpInterval = setInterval(function () {

	    dfp = window.dfp && window.dfp.getAdverts().map(function (_ref) {var creativeId = _ref.creativeId;var isEmpty = _ref.isEmpty;var lineItemId = _ref.lineItemId;var size = _ref.size;
	        return { 
	            creativeId: creativeId, isEmpty: isEmpty, lineItemId: lineItemId, size: size };});



	    if (dfp && dfp.length === 0) {
	        dfp = null;}


	    if (dfp) {
	        window.postMessage({ 
	            type: "DFP", data: { 
	                dfp: dfp } }, 

	        "*");

	        clearInterval(dfpInterval);}}, 


	2000);

	window.postMessage({ 
	    type: "FEP", data: { 
	        fep: window.FEP } }, 

	"*");

/***/ }
/******/ ]);