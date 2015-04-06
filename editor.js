function Editor() {

	this.codeWindow = null;

	this.init = function() {
		this.codeWindow = document.getElementById( 'code-window' );
	}

	this.formatCode = function (lineTypes) {
		
		var rawLines = this.codeWindow.innerText.split( '\n' );
		if (rawLines.length != lineTypes.length) {
			console.log( rawLines.length.toString() + ' code lines, ' + lineTypes.length.toString() + ' line types' );
			return;
		}
		
		var codeHTML = '';
		
		for (var i=0; i < rawLines.length; i++) {
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
			}
			
			codeHTML += rawLines[i].trim() + '</span><br>';
		}
		
		var selection = saveSelection( this.codeWindow );
		this.codeWindow.innerHTML = codeHTML;
		restoreSelection( this.codeWindow, selection );
	}
	
    function saveSelection (codeWindow) {
    	return rangy.getSelection().saveCharacterRanges( codeWindow );
    }

    function restoreSelection (codeWindow, selection) {
    	rangy.getSelection().restoreCharacterRanges( codeWindow, selection );
    }


	
}



