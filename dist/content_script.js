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

	'use strict';var _MessageListener = __webpack_require__(1);var _MessageListener2 = _interopRequireDefault(_MessageListener);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

	var ml = new _MessageListener2.default();

	var all_data = {};

	function injectScript(file, node) {
	    var th = document.getElementsByTagName(node)[0];
	    var s = document.createElement('script');
	    s.setAttribute('src', file);
	    th.appendChild(s);}


	ml.add("fe-request", function () {
	    console.log("request");
	    chrome.runtime.sendMessage({ type: "data", data: all_data, initiator: "request" });});


	ml.add("anchor", function (msg) {
	    console.log(msg);
	    location.hash = "#" + msg.anchor;});


	var old_parsed = [];

	// needs a better one than 5 seconds
	var refresh = setInterval(function () {

	    function widget_mapper(widget, index) {

	        var anchor = document.createElement('a');
	        anchor.name = 'widget-anchor-' + index;
	        widget.parentNode.insertBefore(anchor, widget);

	        return { 
	            anchor: anchor.name, 
	            parsed: !! ~widget.className.indexOf("parsed"), 
	            empty: widget.children.length === 0, 
	            name: widget.dataset.name, 
	            product: widget.dataset.trdProductId, 
	            widgetType: widget.dataset.widgetType };}



	    var hawks = Array.prototype.slice.call(document.querySelectorAll(".hawk-widget-insert"));

	    all_data.HAWK = { 
	        widgets: hawks.map(widget_mapper) };


	    var parsed = all_data.HAWK.widgets.filter(function (w) {return w.parsed;});

	    if (hawks.length === parsed.length) {
	        clearInterval(refresh);}


	    if (old_parsed.length !== parsed.length) {
	        console.log(all_data);
	        chrome.runtime.sendMessage({ type: "data", data: all_data, initiator: "HAWK" });}}, 

	5000);


	window.addEventListener("message", function (event) {
	    if (event.source != window) {
	        return;}


	    if (event.data.type && event.data.type == "FEP") {
	        all_data.FEP = event.data.data.fep;}


	    if (event.data.type && event.data.type == "DFP") {
	        all_data.dfp = event.data.data.dfp;}


	    all_data.url = document.location.pathname;
	    chrome.runtime.sendMessage({ type: "data", data: all_data, initiator: "FEP" });}, 
	false);

	injectScript(chrome.extension.getURL('/injected.js'), 'body');

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