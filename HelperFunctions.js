'use strict';

var React = require('react-native');
var {
	Component
} = React;

class HelperFunctions {
	static prettifyNumber(n):String {
		if(n <= 0)
			return "0";
		
		var digits = Math.log(n) / Math.log(10);
		var str = n.toString();
		var temp = "";
		var groups = Math.floor(digits / 3);

		for(var i = 0; i < groups; i++) {
			temp = "." + str.substring(str.length - (i + 1) * 3, str.length - i * 3) + temp;
		}

		temp = str.substring(0, str.length - groups * 3) + temp;

		return temp;
	}

	static generateId():String {
	    var id = "";

	    for(var i = 0; i < 32; i++) {
	        var charCode = 48 + Math.floor(Math.random() * 74); // Random char from ascii 48 to ascii 122

	        if(charCode == 92 || charCode == 96)
	            charCode++;

	        id += String.fromCharCode(charCode);
	    }

	    return id;
	}
}

module.exports = HelperFunctions;