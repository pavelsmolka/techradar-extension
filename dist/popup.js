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

	"use strict";var port = chrome.extension.connect({ 
	    name: "Sample Communication" });


	// This message initializes the communication and requests the FEP data from Background
	port.postMessage("Hi BackGround");

	// The listener recieves the data from Background and renders it inside the Popup
	port.onMessage.addListener(function (msg) {

	    //console.log('Received data from Background.');
	    //console.log(msg);

	    if (!msg.data) {
	        console.log('No data received.');
	        return;}


	    var data_container = document.getElementById('data-container');
	    dataToHtml(msg.data, data_container);});



	function dataToHtml(data, data_container) {

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

/***/ }
/******/ ]);