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
/***/ function(module, exports, __webpack_require__) {

	"use strict";var _MessageListener = __webpack_require__(1);var _MessageListener2 = _interopRequireDefault(_MessageListener);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 

	BG = 

	function BG() {_classCallCheck(this, BG);
	    this.ml = new _MessageListener2.default();
	    this.ml.add("data", function (msg) {
	        console.log("data from frontend", msg);
	        chrome.runtime.sendMessage({ type: "popup-data", data: msg.data });});

	    this.ml.add("request", function (msg) {
	        console.log("request");
	        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	            chrome.tabs.sendMessage(tabs[0].id, { type: "fe-request" });});});};





	new BG();


	chrome.runtime.onInstalled.addListener(function () {
	    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
	        chrome.declarativeContent.onPageChanged.addRules([{ 
	            conditions: [new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostContains: 'techradar.com' } })], 
	            actions: [new chrome.declarativeContent.ShowPageAction()] }]);});});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _MessageListener = __webpack_require__(1);var _MessageListener2 = _interopRequireDefault(_MessageListener);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 

	MessageListener = function () {function MessageListener() {_classCallCheck(this, MessageListener);}_createClass(MessageListener, [{ key: 'add', value: function add(
			types, callback, sync) {
				types = types instanceof Array ? types : [types];

				chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
					if (~types.indexOf(msg.type)) {
						callback(msg, sender, sendResponse);

						if (!sync) {
							return true;}}});} }]);return MessageListener;}();exports.default = MessageListener;

/***/ }
/******/ ]);