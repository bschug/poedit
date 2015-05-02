function Intellisense() {
    this.div = null;
    this.suggestions = [];
    this.selected = 0;
    this.selectedLineId = 0;
    this.enabled = true;
    this.enabledOnEmptyLine = false;

    this.previousLineId = 0;
    this.previousLineLength = 0;

    this.init = function() {
        this.div = document.getElementById( 'intellisense' );
        this.div.style.display = 'none';
    }

    this.isVisible = function() {
        return this.div.style.display !== 'none';
    }

    this.update = function (rawLines, cursorPos) {
        var selectedLineId = getSelectedLineId( rawLines, cursorPos );
        var selectedLine = rawLines[selectedLineId].trim();

        this.suggestions = [];
        if (selectedLine.length > 0 || this.enabledOnEmptyLine) {
            buildSuggestions( this.suggestions, selectedLine );
        }

        // Disable the empty-line flag once we are on a line with something written on it
        if (selectedLine.length > 0) {
            this.enabledOnEmptyLine = false;
        }

        // re-enable when writing something
        if (selectedLineId === this.previousLineId && rawLines[selectedLineId].length !== this.previousLineLength) {
            this.enabled = true;
        }
        this.previousLineId = selectedLineId;
        this.previousLineLength = rawLines[selectedLineId].length;

        if (this.suggestions.length === 0 || !this.enabled) {
            this.div.style.display = 'none';
            return;
        }
        this.div.style.display = 'block';

        adjustDivPosition( this.div, selectedLineId );

        this.selected = MathUtils.clamp( this.selected, 0, this.suggestions.length - 1 );

        DomUtils.removeAllChildren( this.div );
        for (var i=0; i < this.suggestions.length; i++) {
            var p = document.createElement( 'p' );
            if (i === this.selected) {
                p.className = 'selected';
            }
            p.appendChild( document.createTextNode( this.suggestions[i] ) );
            this.div.appendChild( p );
        }
    }

    this.selectNext = function() {
        this.selected++;
        if (this.selected >= this.suggestions.length) {
            this.selected = 0;
        }
    }

    this.selectPrevious = function() {
        this.selected--;
        if (this.selected < 0) {
            this.selected = this.suggestions.length - 1;
        }
    }

    // Applies the current suggestion
    this.applySuggestion = function() {
        var suggestion = this.suggestions[this.selected] + ' ';
        var line = document.getElementById( 'line' + this.previousLineId );
        var selection = DomUtils.saveSelection( line );
        DomUtils.removeAllChildren( line );
        line.appendChild( document.createTextNode( suggestion ) );
        DomUtils.restoreSelection( line, selection, suggestion.length - this.previousLineLength );
    }

    function buildSuggestions (suggestions, line) {
        var visibilityTokens = [ 'Show', 'Hide' ];
        var filterTokens = [ 'ItemLevel', 'DropLevel', 'Quality', 'Rarity', 'Class', 'BaseType', 'Sockets', 'LinkedSockets', 'SocketGroup' ];
        var modifierTokens = [ 'SetBackgroundColor', 'SetBorderColor', 'SetTextColor', 'PlayAlertSound', 'SetFontSize' ];

        suggestions.splice( 0, suggestions.length );
        visibilityTokens.forEach( function(token) { considerSuggestion( token, line, suggestions ); } );
        filterTokens.forEach( function(token) { considerSuggestion( token, line, suggestions ); } );
        modifierTokens.forEach( function(token) { considerSuggestion( token, line, suggestions ); } );
    }

    function getSelectedLineId (lines, cursorPos) {
        var pos = 0;
        for (var i=0; i < lines.length; i++) {
            pos += lines[i].length + 1;
            if (pos > cursorPos) {
                return i;
            }
        }

        var totalChars = lines
            .map( function(line, i) { return i == 0 ? line.length : line.length + 1; } )
            .reduce( function(prev, cur) { return prev + cur; } );

        console.log( 'invalid cursor position ' + cursorPos.toString() + ' in '
                     + totalChars.toString() + ' character string' );
    }

    function considerSuggestion (suggestion, line, list) {
        if (StrUtils.startsWith( suggestion.toLowerCase(), line.toLowerCase() )) {
            if (suggestion !== line) {
                list.push( suggestion );
            }
        }
    }

    function adjustDivPosition (div, selectedLineId) {
        var selectedLine = document.getElementById( 'line' + selectedLineId );
        var bounds = selectedLine.getBoundingClientRect();
        div.style.left = bounds.left;
        div.style.top = bounds.bottom;
    }
}
