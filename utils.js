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
		return a.split('').every( function(c) { return validChars.indexOf(c) >= 0; } );
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
	},

	replaceAll: function (str, old, replacement) {
		return str.split( old ).join( replacement );
	}
};

var ArrayUtils = {
	//+ Jonas Raoni Soares Silva
	//@ http://jsfromhell.com/array/shuffle [v1.0]
	shuffle: function(o) {
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}
};

var DomUtils = {

	// Returns all text inside the given node(s).
	// <br> elements appear as newlines in the text.
	// This behaves similarly to the innerText property available in Chrome and IE.
	// Note that this does NOT create newlines from the end of block elements.
	getText: function ( elems ) {
		var text = '';

		for ( var i = 0; elems[i]; i++ ) {
			var elem = elems[i];

			// Get the text from Text and CDATA nodes
			if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
				text += elem.nodeValue;
			}
			// Add newlines for <br> tags
			else if ( elem.nodeType === 1 ) {
				if ( elem.nodeName === 'BR' ) {
					text += '\n';
				}
				text += DomUtils.getText( elem.childNodes );
			}
			// Traverse all other nodes, except for comments
			else if ( elem.nodeType !== 8 ) {
				text += DomUtils.getText( elem.childNodes );
			}
		}

		return text;
	}
};
