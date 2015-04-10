function Intellisense() {
    this.div = null;
    this.suggestions = [];
    this.selected = 0;
    this.selectedLineId = 0;

    this.init = function() {
        this.div = document.getElementById( 'intellisense' );
    }

    this.update = function (code, cursorPos) {
        var rawLines = code.split( '\n' );
        var selectedLineId = getSelectedLineId( rawLines, cursorPos );
        buildSuggestions( this.suggestions, rawLines[selectedLineId].trim() );

        if (this.suggestions.length === 0) {
            this.div.style.display = 'none';
            return;
        }
        this.div.style.display = 'block';

        positionDiv( this.div, selectedLineId );

        if (this.selected >= this.suggestions.length) {
            this.selected = this.suggestions.length - 1;
        }

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

    function buildSuggestions (suggestions, line) {
        var visibilityTokens = [ 'Show', 'Hide' ];
        var filterTokens = [ 'ItemLevel', 'DropLevel', 'Quality', 'Rarity', 'Class', 'BaseType', 'Sockets', 'LinkedSockets', 'SocketGroup' ];
        var modifierTokens = [ 'SetBackgroundColor', 'SetBorderColor', 'SetTextColor', 'PlayAlertSound' ];

        suggestions.splice( 0, suggestions.length );
        visibilityTokens.forEach( function(token) { considerSuggestion( token, line, suggestions ); } );
        filterTokens.forEach( function(token) { considerSuggestion( token, line, suggestions ); } );
        modifierTokens.forEach( function(token) { considerSuggestion( token, line, suggestions ); } );
    }

    function getSelectedLineId (lines, cursorPos) {
        var pos = 0;
        for (var i=0; i < lines.length; i++) {
            pos += lines[i].length + 1;
            if (pos >= cursorPos) {
                return i;
            }
        }

        console.log( 'invalid cursor position ' + cursorPos.toString() + ' in '
                     + code.length.toString() + ' character string' );
    }

    function considerSuggestion (suggestion, line, list) {
        if (StrUtils.startsWith( suggestion, line )) {
            list.push( suggestion );
        }
    }

    function positionDiv (div, selectedLineId) {
        var selectedLine = document.getElementById( 'line' + selectedLineId );
        var bounds = selectedLine.getBoundingClientRect();
        div.style.left = bounds.left;
        div.style.top = bounds.bottom;
    }
}
