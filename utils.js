var StrUtils = {

	// Checks if string haystack contains needle
	contains: function (needle, haystack) {
		return haystack.indexOf( needle ) > -1;
	},

	// Checks if str starts with prefix.
	startsWith: function (str, prefix) {
		return str.indexOf( prefix ) === 0;
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

	// Counts all chars in the string. Returns an object with char -> amount.
	countChars: function (str) {
		var result = { };
		for (var i=0; i < str.length; i++) {
			var c = str[i];
			if (c in result) {
				result[c]++;
			}
			else {
				result[c] = 1;
			}
		}
		return result;
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

	endsWithBR: function (elem) {
		if (elem.childNodes.length == 0) {
			return false;
		}

		// look at child nodes, start at the end
		for (var i = elem.childNodes.length - 1; i >= 0; i++) {
			var child = elem.childNodes[i];

			// skip comments
			if (child.nodeType === 8) {
				continue;
			}

			if (child.nodeType === 1) {
				if (child.nodeName === 'BR') {
					return true;
				}
			}

			return false;
		}
	},

	// Returns all text inside the given node(s).
	// <br> elements and blocks like <div> appear as newlines in the text.
	// This behaves similarly to the innerText property available in Chrome and IE.
	getText: function (elem) {
		return DomUtils._getText( elem.childNodes, '' );
	},

	_getText: function (elems, text) {
		for (var i = 0; elems[i]; i++) {
			var elem = elems[i];

			// Get the text from Text and CDATA nodes
			if (elem.nodeType === 3 || elem.nodeType === 4) {
				text += elem.nodeValue;
			}
			// Special handling for certain elements:
			else if (elem.nodeType === 1) {
				// Insert newlines for <br> elements
				if (elem.nodeName === 'BR') {
					text += '\n';
					continue;
				}

				// Ignore invisible elements
				var style = window.getComputedStyle( elem );
				if (style.display === 'none' || style.visibility === 'hidden') {
					continue;
				}

				// Add newline before each block, unless we are already on a new line
				// or this is the very first block in the list
				if (style.display === 'block') {
					if (text.length > 0 && text[text.length - 1] !== '\n') {
						text += '\n';
					}
				}

				// Traverse child nodes
				text = DomUtils._getText( elem.childNodes, text );

				// Add newline after each block unless there already is a new line.
				if (style.display === 'block') {
					if (text.length > 0 && text[text.length - 1] !== '\n') {
						text += '\n';
					}
				}
			}
			// Traverse all other nodes, except for comments
			else if ( elem.nodeType !== 8 ) {
				text = DomUtils._getText( elem.childNodes, text );
			}
		}

		return text;
	},

	setText: function (elem, text) {
//		text = StrUtils.replaceAll( text, '\n', '<br>' );
		var lines = StrUtils.replaceAll( text, '  ', '&nbsp; ' ).split( '\n' );

		DomUtils.removeAllChildren( elem );
		for (var i=0; i < lines.length; i++) {
			elem.appendChild( document.createTextNode( lines[i] ) );
			if (i < lines.length - 1) {
				elem.appendChild( document.createElement( 'br' ) );
			}
		}
	},

	// Returns the current selection in the given element.
	// Selection is stored as character offsets.
    saveSelection: function (element) {
    	return rangy.getSelection().saveCharacterRanges( element );
    },

	// Restores a saved selection on the given element.
	// Selection is applied based on character counts.
	// If text is inserted, you need to manually adjust the selection by providing an offset.
    restoreSelection: function (element, selection, offset) {
    	if (selection !== null && selection.length > 0) {
	    	selection[0].characterRange.start += offset;
    		selection[0].characterRange.end += offset;
    	}
    	rangy.getSelection().restoreCharacterRanges( element, selection );
    },

	// Returns the number of characters before the cursor in the given selection.
	getSelectionCharOffset: function (selection) {
		return selection[0].characterRange.start;
	},

	isValidSelection: function (selection) {
		return selection && selection.length;
	},

	removeAllChildren: function (elem) {
		while (elem.lastChild) {
			elem.removeChild( elem.lastChild );
		}
	}
};

var MathUtils = {
	clamp: function (value, min, max) {
		return Math.min( max, Math.max( min, value ) );
	}
};

var StorageUtils = {
	save: function (key, value) {
		if (typeof(Storage) !== 'undefined') {
			localStorage.setItem( key, value );
		}
	},

	load: function (key, defaultValue) {
		if (typeof(Storage) !== 'undefined') {
			if (key in localStorage) {
				return localStorage[key];
			}
		}
		return defaultValue;
	},
};

var UrlUtils = {
	isSSL: function() {
		return window.location.protocol === 'https:';
	},

	redirectToProtocol: function (protocol) {
		window.location.href = protocol + ':' + window.location.href.substring( window.location.protocol.length );
	}
};
