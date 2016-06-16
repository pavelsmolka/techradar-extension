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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';var _MessageListener = __webpack_require__(1);var _MessageListener2 = _interopRequireDefault(_MessageListener);
	var _Ajax = __webpack_require__(170);var _Ajax2 = _interopRequireDefault(_Ajax);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 

	BG = 

	function BG() {_classCallCheck(this, BG);
	    this.ml = new _MessageListener2.default();
	    this.ml.add("data", function (msg) {
	        console.log("data from frontend", msg);
	        if (msg.data.url) {
	            var api = 'http://stage.search-api.fie.future.net.uk/gapi.php?site=TRD&url=' + msg.data.url;
	            (0, _Ajax2.default)(api).then(function (data) {
	                msg.data.analytics = JSON.parse(data);
	                console.log('sending analytics', msg.data);
	                chrome.runtime.sendMessage({ type: "popup-data", data: msg.data });});}


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

/***/ 1:
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

/***/ },

/***/ 170:
/***/ function(module, exports) {

	"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();exports.default = ajax;function ajax(url) {var _ref = arguments.length <= 1 || arguments[1] === undefined ? { method: "GET", headers: new Map() } : arguments[1];var method = _ref.method;var headers = _ref.headers;var data = _ref.data;
	    return new Promise(function (resolve, reject) {
	        var request = new XMLHttpRequest();
	        request.open(method, url, true);
	        request.onload = function () {
	            if (request.status >= 200 && request.status < 400) {
	                resolve(request.responseText);} else 
	            {
	                reject(new Error("Failure"));}};var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {



	            for (var _iterator = headers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var _step$value = _slicedToArray(_step.value, 2);var name = _step$value[0];var val = _step$value[1];
	                request.setRequestHeader(name, val);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}


	        request.onerror = function () {reject(new Error("Failure"));};
	        request.send(data && JSON.stringify(data));});}

/***/ }

/******/ });