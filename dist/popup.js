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

	"use strict";var _MessageListener = __webpack_require__(1);var _MessageListener2 = _interopRequireDefault(_MessageListener);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

	var ml = new _MessageListener2.default();

	chrome.runtime.sendMessage({ type: "request" });

	ml.add("popup-data", function (msg) {
	    var data_container = document.getElementById('data-container');
	    dataToHtml(msg.data, data_container);});


	function dataToHtml(data, data_container) {
	    console.log(data);

	    for (var ii in data) {
	        if (data.hasOwnProperty(ii)) {

	            var dt = document.createElement('dt');
	            var dd = document.createElement('dd');

	            dt.innerHTML = ii;

	            var value_input = data[ii];
	            var value_node;

	            if (value_input instanceof Array) {

	                value_node = document.createElement('ul');
	                // TODO use reduce?
	                value_input.forEach(function (array_item) {
	                    var li = document.createElement('li');
	                    li.innerHTML = array_item;
	                    value_node.insertBefore(li, null);});} else 


	            if (value_input instanceof Object) {

	                value_node = document.createElement('div');
	                var value_as_json = dataToHtml(data[ii], value_node);} else 

	            {

	                value_node = document.createTextNode(value_input);}



	            dd.insertBefore(value_node, null);

	            data_container.insertBefore(dt, null);
	            data_container.insertBefore(dd, null);}}}

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