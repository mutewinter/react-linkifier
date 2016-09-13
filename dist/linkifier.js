(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["linkifier"] = factory(require("react"));
	else
		root["linkifier"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
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

	var React = __webpack_require__(1);
	var RE_CAPTURE_URLS = __webpack_require__(2);
	var RE_EMAIL_CHECK = __webpack_require__(3);
	var RE_HAS_SCHEME = /^\w+:/i;

	var defaultScheme = 'http://';
	var defaultKeyBase = 'linkifier';

	var addSchemeIfNeeded = function (url) {
	    if (RE_EMAIL_CHECK.test(url)) {
	        return 'mailto:' + url;
	    }
	    if (RE_HAS_SCHEME.test(url)) {
	        return url;
	    }
	    return defaultScheme + url;
	};

	var linkifier = function (text, props) {
	    var props = props || {};
	    var result = [];
	    var parts = text.split(RE_CAPTURE_URLS);
	    var keyIndex = 0;
	    var keyBase = (props.key) || defaultKeyBase;
	    parts.forEach(function (text) {
	        if (!text) {
	            return;
	        }
	        keyIndex++;
	        var combinedProps = props;
	        var key = keyBase + '-' + keyIndex;
	        if (RE_CAPTURE_URLS.test(text)) {
	            combinedProps.href = addSchemeIfNeeded(text);
	            combinedProps.key = key;
	            result.push(React.createElement('a', combinedProps, text));
	        } else {
	            result.push(React.createElement('span', {key: key}, text));
	        }
	    });
	    return result;
	};

	module.exports = linkifier;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	// Regular Expression for URL validation
	//
	// Author: Diego Perini
	// License: MIT
	//
	// Copyright (c) 2010-2013 Diego Perini (http://www.iport.it)
	//
	// Permission is hereby granted, free of charge, to any person
	// obtaining a copy of this software and associated documentation
	// files (the "Software"), to deal in the Software without
	// restriction, including without limitation the rights to use,
	// copy, modify, merge, publish, distribute, sublicense, and/or sell
	// copies of the Software, and to permit persons to whom the
	// Software is furnished to do so, subject to the following
	// conditions:
	//
	// The above copyright notice and this permission notice shall be
	// included in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	// OTHER DEALINGS IN THE SOFTWARE.

	module.exports = new RegExp(
	  '\\b(' +
	    // protocol identifier
	    '(?:\\w+:/*)?' +
	    // user:pass authentication
	    '(?:\\S+(?::\\S*)?@)?' +
	    '(?:' +
	      // IP address exclusion
	      // private & local networks
	      '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
	      '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
	      '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
	      // IP address dotted notation octets
	      // excludes loopback network 0.0.0.0
	      // excludes reserved space >= 224.0.0.0
	      // excludes network & broacast addresses
	      // (first & last IP address of each class)
	      '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
	      '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
	      '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
	    '|' +
	      // host name
	      '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
	      // domain name
	      '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
	      // TLD identifier
	      '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
	      // TLD may end with dot
	      '\\.?' +
	    ')' +
	    // port number
	    '(?::\\d{2,5})?' +
	    // resource path
	    '(?:[/?#]\\S*)?' +
	  ')\\b', 'i'
	);


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Naive checking
	 */
	module.exports = new RegExp(
	    '^' +
	    '([a-z\\u00a1-\\uffff0-9\\-\\.\\+])+' +
	    '@' +
	    '([a-z\\u00a1-\\uffff0-9\\-\\.])+' +
	    '$', 'i'
	);


/***/ }
/******/ ])
});
;