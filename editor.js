function Editor() {

	this.codeWindow = null;

	this.init = function() {
		this.codeWindow = document.getElementById( 'code-window' );
	}

	this.formatCode = function (code, lineTypes) {
		
		var rawLines = code.split( '\n' );
		
		if (rawLines.length != lineTypes.length) {
			console.log( rawLines.length.toString() + ' code lines, ' + lineTypes.length.toString() + ' line types' );
			return;
		}
		
		var codeHTML = '';
		
		var selection = saveSelection( this.codeWindow );
		var selectionOffset = 0;
		var generatedCharacters = 0;
		var originalCharacters = 0;
		
		for (var i=0; i < rawLines.length; i++) {
			var lineCharacters = 0;
		
			var className = {
				Empty: 'code-empty',
				Visibility: 'code-visibility',
				Filter: 'code-filter',
				Modifier: 'code-modifier',
				Error: 'code-error'
			};
		
			codeHTML += '<span id="line' + i.toString() + '" class="' + className[lineTypes[i]] + '">';
			
			// indentation
			if (lineTypes[i] === 'Filter' || lineTypes[i] === 'Modifier') {
				codeHTML += '&nbsp; &nbsp; ';
				lineCharacters += 4;
			}
			
			var trimmedLine = StrUtils.ltrim( rawLines[i] );
			codeHTML += trimmedLine + '</span>';
			
			// Must not add <br> for the last line, otherwise we would create more and more newlines at the end
			if (i < rawLines.length - 1) {
				codeHTML += '<br>';
			}
			
			lineCharacters += trimmedLine.length;
			generatedCharacters += lineCharacters;
			var originalLineStart = originalCharacters;
			originalCharacters += rawLines[i].length;
			
			if (selection !== null && selection.length > 0) {
				var selectionStart = selection[0].characterRange.start;
				if (selectionStart >= originalLineStart && selectionStart < originalLineStart) {
					selectionOffset = generatedCharacters - originalCharacters;
					console.log('offset ' + selectionOffset);
				}
			}
		}
		
		this.codeWindow.innerHTML = codeHTML;
		restoreSelection( this.codeWindow, selection, selectionOffset );
	}
	
    function saveSelection (codeWindow) {
    	return rangy.getSelection().saveCharacterRanges( codeWindow );
    }

    function restoreSelection (codeWindow, selection, offset) {
    	if (selection !== null && selection.length > 0) {
	    	selection[0].characterRange.start += offset;
    		selection[0].characterRange.end += offset;
    	}
    	rangy.getSelection().restoreCharacterRanges( codeWindow, selection );
    }


	
}



