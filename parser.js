function Parser() {
	
	var VISIBILITY_TOKENS = [ 'Show', 'Hide' ];
	var FILTER_TOKENS = [ 'ItemLevel', 'DropLevel', 'Quality', 'Rarity', 'Class', 'BaseType', 'Sockets', 'LinkedSockets', 'SocketGroup' ];
	var MODIFIER_TOKENS = [ 'SetBackgroundColor', 'SetBorderColor', 'SetTextColor', 'PlayAlertSound' ];
	var OPERATOR_TOKENS = [ '=', '<', '>', '<=', '>=' ];
	var RARITY_TOKENS = [ 'Normal', 'Magic', 'Rare', 'Unique' ];

	this.currentLineNr = 0;	
	this.currentRule = null;
	
	this.ruleSet = [];
	this.errorLines = [];
	
	this.parse = function (code) {
		this.currentRule = null;
		this.errorLines = [];
		
		var lines = code.split('\n');
		for (var i = 0; i < lines.length; i++) {
			this.currentLineNr = i;
		
			if (this.currentRule === null) {
				parseVisibility( this, lines[i] );
			}
			else if (lines[i].trim().length == 0) {
				parseEndOfRule( this );
			}
			else {
				parseFilterOrModifier( this, lines[i] );
			}
		}
		parseEndOfRule( this );
	};
	
	function parseVisibility (self, line) {
		var token = line.trim();
		if (VISIBILITY_TOKENS.indexOf( token ) < 0) {
			reportTokenError( self, token, 'Show or Hide' );
			return;
		}
		
		self.currentRule = new Rule( token );
	}
	
	function parseEndOfRule (self) {
		if (self.currentRule !== null) {
			self.ruleSet.push( self.currentRule );
		}
	}
	
	function parseFilterOrModifier (self, line) {
		var tokens = line.trim().split(' ', 1);
		
		if (tokens.length == 0) {
			reportTokenError( self, '', 'filter or modifier' );
			return;
		}
		
		var operation = tokens[0].trim();
		var arguments = tokens.length > 1 ? tokens[1] : null;
		
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
		var filters = {
			'ItemLevel': ItemLevelFilter,
			'DropLevel': DropLevelFilter,
			'Quality': QualityFilter,
			'Rarity': RarityFilter,
			'Class': ClassFilter,
			'BaseType': BaseTypeFilter,
			'Sockets': SocketsFilter,
			'LinkedSockets': LinkedSocketsFilter,
			'SocketGroup': SocketGroupFilter
		};

		switch (token) {
			case 'ItemLevel':
			case 'DropLevel':
			case 'Quality':
			case 'Sockets':
			case 'LinkedSockets':
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
				
			default:
				// We can only get to this function if token is valid
				reportTokenError( self, token, 'this should never happen' );
		}
	}
	
	function parseNumericFilter (self, filter, arguments) {
		var args = parseOperatorAndValue( self, arguments );
		if (args !== null) {
			if (isNaN( args.value )) {
				reportInvalidToken( self, args.value, 'number' );
				return;
			}
		
			self.currentRule.filters.push( new filter( args.comparer, parseInt( args.value ) ) );
		}
	}
	
	function parseMultiStringFilter (self, filter, arguments) {
		var args = parseStringArguments( self, arguments );
		if (args !== null) {
			self.currentRule.filters.push( new filter( args ) );
		}
	}
	
	function parseRarityFilter (self, filter, arguments) {
		var args = parseOperatorAndValue( self, arguments );
		if (args != null) {
			if (RARITY_TOKENS.indexOf( args.value ) < 0) {
				reportInvalidToken( self, args.value, 'rarity' );
				return;
			}
			
			self.currentRule.filters.push( new filter( args.comparer, Rarity[args.rarity] ) );
		}
	}
	
	function parseSocketGroupFilter (self, filter, arguments) {
		var args = parseStringArguments( self, arguments );
		if (args != null) {
			// Make sure socket group is all uppercase.
			// Don't sort yet because we want to display error messages correctly.
			args = args.map( function(a) { return a.toUpperCase(); } );
			
			// Then check for invalid characters.
			var isInvalid = args.some( function(socketGroup) { 
				if (!StrUtils.consistsOf( socketGroup, 'RGB' )) {
					reportInvalidSocket( self, socketGroup );
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
	}
	
	// ----------- MODIFIERS ---------------------------------------------------
	
	function parseModifier (self, token, arguments) {
		var modifiers = {
			'SetBackgroundColor': SetBackgroundColorModifier, 
			'SetBorderColor': SetBorderColorModifier, 
			'SetTextColor': SetTextColorModifier, 
			'PlayAlertSound': PlayAlertSoundModifier
		};
		
		switch (token) {
			case 'SetBackgroundColor':
			case 'SetBorderColor':
			case 'SetTextColor':
				parseColorModifier( self, modifiers[token], arguments );
				break;
				
			case 'PlayAlertSound':
				parseNumericModifier( self, modifiers[token], arguments );
				break;
				
			default:
				// We can only get to this function if token is valid
				reportTokenError( self, token, 'this should never happen' );
		}
	}

	function parseColorModifier (self, modifier, arguments) {
		var numbers = parseNumbers( arguments );
		if (numbers.length != 3) {
			reportParseError( self, arguments, 'three numbers' );
			return;
		}
		
		if (numbers.some( function(c) { return c < 0 || c > 255; } )) {
			reportParseError( self, arguments, 'color values must be between 0 and 255' );
			return;
		}
		
		var color = { r:numbers[0], g:numbers[1], b:number[2] };
		
		self.currentRule.modifiers.push( new modifier( color ) );
	}
	
	function parseNumericModifier (self, modifier, arguments) {
		var numbers = parseNumbers( arguments );
		if (numbers.length != 1) {
			reportParseError( self, arguments, 'one number' );
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
			reportParseError( self, arguments, 'numbers' );
			return null;
		}
		
		return tokens.map( parseInt );
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
			var withoutQuotes = tokens[i].replace( '"', '' );
			
			if (currentToken.length > 0) {
				currentToken += withoutQuotes;
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
		
		return actualTokens;
	}
	
	// ------------------- ERROR MESSAGES --------------------------------------
	
	function reportTokenError (self, token, expected) {
		self.errors.push( 'Invalid token "' + token + '" at line ' + self.currentLineNr.toString() + ' (expected ' + expected + ')' );
		self.errorLines.push( self.currentLineNr );
	}
	
	function reportInvalidSocketGroup (self, socketGroup) {
		self.errors.push( 'Invalid socket group "' + socketGroup + '" + at line ' + self.currentLineNr.toString() + ' (allowed characters are R,G,B)' );
		self.errorLines.push( self.currentLineNr );
	}
};





















