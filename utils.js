var StrUtils = {

	// Checks if string haystack contains needle
	contains: function (needle, haystack) {
		return haystack.indexOf(needle) > -1;
	},
	
	// Alphabetically sorts all characters in the string.
	// Characters must either be all uppercase or all lowercase.
	// Does not take locale into account.
	sortChars: function (str) {
		return str.split('').sort().join('');
	},
	
	// Checks if string A consists only of the characters in string B
	consistsOf: function (a, b) {
		var validChars = b.split('');
		return !a.split('').some( function(c) { return StrUtils.contains( c, validChars ); } );
	},
	
	// Counts how often a character occurs in the string.
	countChar: function (c, str) {
		var count = 0;
		for (var i=0; i < str.length; i++) {
			if (str[i] === c) {
				count++;
			}
		}
		return count;
	},
	
	ltrim: function (stringToTrim) {
		return stringToTrim.replace(/^\s+/,"");
	},
	
	rtrim: function (stringToTrim) {
		return stringToTrim.replace(/\s+$/,"");
	}	
};

var ArrayUtils = {
	//+ Jonas Raoni Soares Silva
	//@ http://jsfromhell.com/array/shuffle [v1.0]
	shuffle: function(o) {
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}
}
