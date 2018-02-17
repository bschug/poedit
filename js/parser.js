function Parser() {

	var VISIBILITY_TOKENS = [ 'Show', 'Hide' ];
	var FILTER_TOKENS = [ 'ItemLevel', 'DropLevel', 'Quality', 'Rarity', 'Class', 'BaseType', 'Sockets', 'LinkedSockets', 'SocketGroup', 'Width', 'Height', 'Identified', 'Corrupted', 'ElderItem', 'ShaperItem', 'ShapedMap' ];
	var MODIFIER_TOKENS = [ 'SetBackgroundColor', 'SetBorderColor', 'SetTextColor', 'PlayAlertSound', 'SetFontSize' ];
	var OPERATOR_TOKENS = [ '=', '<', '>', '<=', '>=' ];
	var RARITY_TOKENS = [ 'Normal', 'Magic', 'Rare', 'Unique' ];
	var BOOL_TOKENS = [ 'True', 'False' ];

	this.currentLineNr = 0;
	this.currentRule = null;

	this.ruleSet = [];
	this.errors = [];
	this.warnings = [];
	this.lineTypes = [];

	this.parse = function (lines) {
		this.currentRule = null;
		this.ruleSet = [];
		this.errors = [];
		this.warnings = []
		this.lineTypes = [];

		for (var i = 0; i < lines.length; i++) {
			this.currentLineNr = i;
			var line = lines[i];

			if (line.trim() === '') {
				this.lineTypes[i] = 'Empty';
				continue;
			}
			if (line.trim()[0] === '#') {
				this.lineTypes[i] = 'Comment';
				continue;
			}
			line = removeComment( line );

			if (VISIBILITY_TOKENS.indexOf( line.trim() ) >= 0) {
				if (this.currentRule !== null) {
					parseEndOfRule( this );
				}
				parseVisibility( this, line );
			}
			else {
				if (this.currentRule === null) {
					reportTokenError( this, line.trim(), 'Show or Hide' );
				}
				else {
					parseFilterOrModifier( this, line );
				}
			}

			if (this.currentRule !== null) {
				this.currentRule.codeLines.push( i );
			}
		}
		parseEndOfRule( this );
	};

	function removeComment (line) {
		var commentStart = line.indexOf("#");
		if (commentStart < 0) {
			return line;
		}
		return line.substring( 0, commentStart );
	}

	function parseVisibility (self, line) {
		var token = line.trim();
		if (VISIBILITY_TOKENS.indexOf( token ) < 0) {
			reportTokenError( self, token, 'Show or Hide' );
			return;
		}

		self.lineTypes[self.currentLineNr] = 'Visibility';
		self.currentRule = new Rule( token === 'Show' );
	}

	function parseEndOfRule (self) {
		if (self.currentRule !== null) {
			validateRule( self, self.currentRule );
			self.ruleSet.push( self.currentRule );
			self.currentRule = null;
		}
	}

	function validateRule (self, rule) {
		var ruleLine = "(unknown)";
		if (rule.codeLines.length > 0) {
			ruleLine = rule.codeLines[0].toString();
		}

		var soundModifiers = rule.modifiers.filter( function(m) { return m instanceof PlayAlertSoundModifier; } );
		if (soundModifiers.length > 1) {
			reportWarning( self,
				"Multiple PlayAlertSound modifiers found in rule at line " + ruleLine + ". " +
				"Only the last sound will be played."
			);
		}
	}

	function parseFilterOrModifier (self, line) {
		var tokens = line.trim().split(' ', 1);

		if (tokens.length == 0) {
			reportTokenError( self, '', 'filter or modifier' );
			return;
		}

		var token = tokens[0].trim();
		var arguments = line.trim().substring( token.length, line.length );

		if (FILTER_TOKENS.indexOf( token ) >= 0) {
			parseFilter( self, token, arguments );
		}
		else if (MODIFIER_TOKENS.indexOf( token ) >= 0) {
			parseModifier( self, token, arguments );
		}
		else {
			reportTokenError( self, token, 'filter or modifier' );
		}
	}

	// ----------- FILTERS ---------------------------------------------------

	function parseFilter (self, token, arguments) {
		self.lineTypes[self.currentLineNr] = 'Filter';

		var filters = {
			'ItemLevel': ItemLevelFilter,
			'DropLevel': DropLevelFilter,
			'Quality': QualityFilter,
			'Rarity': RarityFilter,
			'Class': ClassFilter,
			'BaseType': BaseTypeFilter,
			'Sockets': SocketsFilter,
			'LinkedSockets': LinkedSocketsFilter,
			'SocketGroup': SocketGroupFilter,
			'Width': WidthFilter,
			'Height': HeightFilter,
			'Identified': IdentifiedFilter,
			'Corrupted': CorruptedFilter,
			'ElderItem': ElderItemFilter,
			'ShaperItem': ShaperItemFilter,
			'ShapedMap': ShapedMapFilter
		};

		switch (token) {
			case 'ItemLevel':
			case 'DropLevel':
			case 'Quality':
			case 'Sockets':
			case 'LinkedSockets':
			case 'Width':
			case 'Height':
				parseNumericFilter( self, filters[token], arguments );
				return;

			case 'Rarity':
				parseRarityFilter( self, filters[token], arguments );
				return;

			case 'Class':
			case 'BaseType':
				parseMultiStringFilter( self, filters[token], arguments );
				return;

			case 'SocketGroup':
				parseSocketGroupFilter( self, filters[token], arguments );
				return;

			case 'Identified':
			case 'Corrupted':
			case 'ElderItem':
			case 'ShaperItem':
			case 'ShapedMap':
				parseBoolFilter( self, filters[token], arguments );
				return;

			default:
				// We can only get to this function if token is valid
				reportTokenError( self, token, 'this should never happen' );
		}
	}

	function parseNumericFilter (self, filter, arguments) {
		var args = parseOperatorAndValue( self, arguments );
		if (args !== null) {
			if (isNaN( args.value )) {
				reportTokenError( self, args.value, 'number' );
				return;
			}

			self.currentRule.filters.push( new filter( args.comparer, parseInt( args.value ) ) );
		}
	}

	function parseMultiStringFilter (self, filter, arguments) {
		var args = parseStringArguments( self, arguments );
		if (args === null) return;
		if (args.length === 0) {
			reportUnexpectedEndOfLine( self, 'one or more strings' );
			return;
		}

		self.currentRule.filters.push( new filter( args ) );
	}

	function parseRarityFilter (self, filter, arguments) {
		var args = parseOperatorAndValue( self, arguments );
		if (args != null) {
			if (RARITY_TOKENS.indexOf( args.value ) < 0) {
				reportTokenError( self, args.value, 'rarity' );
				return;
			}

			self.currentRule.filters.push( new filter( args.comparer, Rarity[args.value] ) );
		}
	}

	function parseSocketGroupFilter (self, filter, arguments) {
		var args = parseStringArguments( self, arguments );
		if (args === null) return;
		if (args.length === 0) {
			reportUnexpectedEndOfLine( self, 'one or more strings' );
			return;
		}

		// Make sure socket group is all uppercase.
		// Don't sort yet because we want to display error messages correctly.
		args = args.map( function(a) { return a.toUpperCase(); } );

		// Then check for invalid characters.
		var isInvalid = args.some( function(socketGroup) {
			if (!StrUtils.consistsOf( socketGroup, 'RGBW' )) {
				reportInvalidSocketGroup( self, socketGroup );
				return true;
			}
			return false;
		} );

		// Now sort alphabetically because the filter requires that.
		args = args.map( StrUtils.sortChars );

		if (!isInvalid) {
			self.currentRule.filters.push( new filter( args ) );
		}
	}

	function parseBoolFilter (self, filter, arguments) {
		var args = parseStringArguments( self, arguments );
		if (args === null) return;
		if (args.length === 0) {
			reportUnexpectedEndOfLine( self, 'expected True or False' );
			return;
		}

		args = args.map( function(a) { return a.toUpperCase(); } );

		if (args[0] !== 'TRUE' && args[0] !== 'FALSE') {
			reportTokenError( self, arguments, 'True or False' );
			return;
		}

		self.currentRule.filters.push( new filter( args[0] === 'TRUE' ) );
	}

	// ----------- MODIFIERS ---------------------------------------------------

	function parseModifier (self, token, arguments) {
		self.lineTypes[self.currentLineNr] = 'Modifier';

		var modifiers = {
			'SetBackgroundColor': SetBackgroundColorModifier,
			'SetBorderColor': SetBorderColorModifier,
			'SetTextColor': SetTextColorModifier,
			'PlayAlertSound': PlayAlertSoundModifier,
			'SetFontSize': SetFontSizeModifier,
		};

		switch (token) {
			case 'SetBackgroundColor':
			case 'SetBorderColor':
			case 'SetTextColor':
				parseColorModifier( self, modifiers[token], arguments );
				break;

			case 'PlayAlertSound':
				parseAlertSoundModifier( self, modifiers[token], arguments );
				break;

			case 'SetFontSize':
				parseNumericModifier( self, modifiers[token], arguments );
				break;

			default:
				// We can only get to this function if token is valid
				reportTokenError( self, token, 'this should never happen' );
		}
	}

	function parseColorModifier (self, modifier, arguments) {
		var numbers = parseNumbers( self, arguments );
		if (numbers === null) return;
		if (numbers.length < 3 || numbers.length > 4) {
			reportTokenError( self, arguments, 'three or four numbers' );
			return;
		}

		if (numbers.some( function(c) { return c < 0 || c > 255; } )) {
			reportParseError( self, arguments, 'color values must be between 0 and 255' );
			return;
		}

		var color = { r:numbers[0], g:numbers[1], b:numbers[2], a:255 };
		if (numbers.length === 4) {
			color['a'] = numbers[3];
		}

		self.currentRule.modifiers.push( new modifier( color ) );
	}

	function parseAlertSoundModifier (self, modifier, arguments) {
		var numbers = parseNumbers( self, arguments );
		if (numbers === null) return;
		if (numbers.length < 1 || numbers.length > 2) {
			reportTokenError( self, arguments, 'two numbers' );
			return;
		}

		if (numbers[0] < 1 || numbers[0] > 9) {
			reportParseError( self, arguments, 'sound ID must be between 1 and 9' );
			return;
		}

		if (numbers[1] < 0 || numbers[1] > 300) {
			reportParseError( self, arguments, 'volume must be between 0 and 300' );
			return;
		}

		var soundId = numbers[0];
		var volume = numbers.length < 2 ? 100 : numbers[1];

		self.currentRule.modifiers.push( new modifier( volume ) );
	}

	function parseNumericModifier (self, modifier, arguments) {
		var numbers = parseNumbers( self, arguments );
		if (numbers === null) return;
		if (numbers.length != 1) {
			reportTokenError( self, arguments, 'one number' );
			return;
		}

		self.currentRule.modifiers.push( new modifier( numbers[0] ) );
	}

	// ------------------------ GENERIC PARSING ---------------------------------

	function parseOperatorAndValue (self, arguments) {
		var tokens = arguments
			.trim()
			.split(' ')
			.filter( function (element, index, array) { return element.trim().length > 0; } );

		var operator, value;

		if (tokens.length == 1) {
			// Special case: For equality checks, you specify only the value
			operator = '=';
			value = tokens[0];
		}
		else if (tokens.length == 2) {
			operator = tokens[0];
			value = tokens[1];
		}
		else {
			reportTokenError( self, arguments, 'operator and value' );
			return null;
		}

		if (OPERATOR_TOKENS.indexOf( operator ) < 0) {
			reportTokenError( self, operator, 'operator' );
			return null;
		}

		var comparers = {
			'=': function(a,b) { return a == b; },
			'<': function(a,b) { return a < b; },
			'>': function(a,b) { return a > b; },
			'<=': function(a,b) { return a <= b; },
			'>=': function(a,b) { return a >= b; }
		};

		return { comparer:comparers[operator], value:value };
	}

	function parseNumbers (self, arguments) {
		var tokens = arguments
			.trim()
			.split(' ')
			.filter( function (element, index, array) { return element.trim().length > 0; } );

		if (tokens.some( isNaN )) {
			reportTokenError( self, arguments, 'numbers' );
			return null;
		}

		return tokens.map( function(n) { return parseInt( n ); } );
	}

	function parseStringArguments (self, arguments) {
		var tokens = arguments
			.trim()
			.split(' ');
			// Don't remove empty tokens because they might represent multiple spaces inside quoted strings

		var actualTokens = [];
		var numQuotes = 0;
		var currentToken = '';
		for (var i=0; i < tokens.length; i++) {
			numQuotes += StrUtils.countChar( '"', tokens[i] );
			var withoutQuotes = StrUtils.replaceAll( tokens[i], '"', '' );

			if (currentToken.length > 0) {
				currentToken += ' ' + withoutQuotes;
			}
			else {
				currentToken = withoutQuotes;
			}

			if (numQuotes % 2 == 0) {
				actualTokens.push( currentToken );
				currentToken = '';
			}
		}

		if (numQuotes % 2 != 0) {
			reportParseError( self, arguments, 'no matching quote' );
			actualTokens.push( currentToken );
		}

		// Remove any empty or pure whitespace tokens.
		// These may happen with certain unicode characters.
		actualTokens = actualTokens.filter( function(token) { return token.trim().length > 0; } );

		return actualTokens;
	}

	// ------------------- ERROR MESSAGES --------------------------------------

	function reportTokenError (self, token, expected) {
		self.errors.push( 'Invalid token "' + token + '" at line ' + self.currentLineNr.toString() + ' (expected ' + expected + ')' );
		self.lineTypes[self.currentLineNr] = 'Error';
	}

	function reportUnexpectedEndOfLine (self, expected) {
		self.errors.push( 'Unexpected end of line (expected ' + expected + ' in line ' + self.currentLineNr.toString() + ')');
		self.lineTypes[self.currentLineNr] = 'Error';
	}

	function reportInvalidSocketGroup (self, socketGroup) {
		self.errors.push( 'Invalid socket group "' + socketGroup + '" + at line ' + self.currentLineNr.toString() + ' (allowed characters are R,G,B)' );
		self.lineTypes[self.currentLineNr] = 'Error';
	}

	function reportParseError (self, text, reason) {
		self.errors.push( 'Cannot parse "' + text + '" (' + reason + ')' );
		self.lineTypes[self.currentLineNr] = 'Error';
	}

	function reportWarning (self, text) {
		self.warnings.push( text );
	}
};
