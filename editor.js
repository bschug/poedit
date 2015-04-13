function Editor() {

	this.codeWindow = null;
	this.highlightLines = [];

	this.scrollTarget = null;
	this.scrollSpeed = 0;

	var SCROLL_ANIM_INTERVAL = 30;
	var SCROLL_DURATION_FACTOR = 1;
	var SCROLL_ACC = 0.1;
	var MIN_SCROLL_DISTANCE = 10;

	this.init = function() {
		this.codeWindow = document.getElementById( 'code-window' );

		var self = this;
		setInterval( function() { self.updateAnimation(); }, SCROLL_ANIM_INTERVAL );
	}

	this.updateAnimation = function() {
		if (this.scrollTarget !== null) {
			var distance = this.scrollTarget - this.codeWindow.scrollTop;

			if (Math.abs( distance ) < MIN_SCROLL_DISTANCE) {
				this.codeWindow.scrollTop = this.scrollTarget;
				this.scrollTarget = null;
				return;
			}

			var targetScrollSpeed = Math.abs( distance ) / SCROLL_DURATION_FACTOR * Math.sign( distance );
			var scrollSpeed = this.scrollSpeed * (1 - SCROLL_ACC) + targetScrollSpeed * SCROLL_ACC;
			if (Math.abs( distance ) < Math.abs( scrollSpeed )) {
				scrollSpeed = distance;
			}
			this.codeWindow.scrollTop += scrollSpeed;
			this.scrollSpeed = scrollSpeed;
		}
	}

	this.formatCode = function (rawLines, lineTypes) {

		if (rawLines.length != lineTypes.length) {
			console.log( rawLines.length.toString() + ' code lines, ' + lineTypes.length.toString() + ' line types' );
			return;
		}

		removeTrailingNewlines( rawLines, lineTypes, 3 );

		var codeHTML = '';
		var indent = false;

		var selection = DomUtils.saveSelection( this.codeWindow );
		var selectionOffset = 0;
		var generatedCharacters = 0;
		var originalCharacters = 0;

		for (var i=0; i < rawLines.length; i++) {
			var lineCharacters = 0;

			var className = {
				Empty: 'code-empty',
				Comment: 'code-comment',
				Visibility: 'code-visibility',
				Filter: 'code-filter',
				Modifier: 'code-modifier',
				Error: 'code-error'
			};

			var hasHighlight = this.highlightLines.indexOf( i ) >= 0;
			var highlightClass = hasHighlight ? ' highlighted' : '';

			codeHTML += '<span id="line' + i.toString() + '" class="' + className[lineTypes[i]] + highlightClass + '">';

			// Indentation:
			// Filters and Modifiers are always indented, Visibility is never indented.
			// For erraneous / incomplete lines and empty lines, indentation is guessed based on the previous line.
			// If the previous line was visibility, the current line is indented.
			// If the previous line was empty, the new line is NOT indented (we assume the user wants a new block).
			// If the previous line was erraneous too, we just keep the indentation level from before.
			if (lineTypes[i] === 'Visibility') {
				indent = false;
			}
			if (lineTypes[i] === 'Filter' || lineTypes[i] === 'Modifier') {
				indent = true;
			}
			else if (lineTypes[i] === 'Empty') {
				indent = false;
			}
			else if (lineTypes[i] === 'Error' && (i > 0) && lineTypes[i-1] === 'Visibility') {
				indent = true;
			}

			if (indent) {
				codeHTML += '&nbsp; &nbsp; ';
				lineCharacters += 4;
			}

			var trimmedLine = StrUtils.ltrim( rawLines[i] );
			codeHTML += trimmedLine + '</span>';

			// Must not add <br> for the last line, otherwise we would create more and more newlines at the end
			if (i < rawLines.length - 1) {
				codeHTML += '<br>';
			}

			// We need to count now many readable characters we have generated so far,
			// and how many readable characters there were in the original, unmodified code.
			// Otherwise, we could not know if and by how much to move the cursor.
			lineCharacters += trimmedLine.length;
			generatedCharacters += lineCharacters + 1;			// add 1 for the newline
			var originalLineStart = originalCharacters;
			originalCharacters += rawLines[i].length + 1;		// add 1 for the newline

			if (selection !== null && selection.length > 0) {
				var selectionStart = selection[0].characterRange.start;
				if (selectionStart > originalLineStart && selectionStart <= originalCharacters) {
					selectionOffset = generatedCharacters - originalCharacters;
				}
			}
		}

		this.codeWindow.innerHTML = codeHTML;
		DomUtils.restoreSelection( this.codeWindow, selection, selectionOffset );
	}

	this.scrollToLine = function (lineNr) {
		var line = document.getElementById( 'line' + lineNr.toString() );
		var codeWindowHeight = this.codeWindow.getBoundingClientRect().height;
		var centeredScrollPos = line.offsetTop - codeWindowHeight / 2;
		var bottomScrollPos = Math.max( 0, this.codeWindow.scrollHeight - codeWindowHeight );
		this.scrollTarget = MathUtils.clamp( centeredScrollPos, 0, bottomScrollPos );
	}

	function removeTrailingNewlines (rawLines, lineTypes, numAllowed) {
		var linesToRemove = 0;
		for (var i = rawLines.length - 1; i >= 0; i--) {
			if (lineTypes[i] != 'Empty') {
				break;
			}
			linesToRemove++;
		}

		if (linesToRemove > numAllowed) {
			linesToRemove -= numAllowed;
			rawLines.splice( -linesToRemove, linesToRemove );
			lineTypes.splice( -linesToRemove, linesToRemove );
		}
	}

}
