function Intellisense() {
    this.div = null;
    this.suggestions = [];
    this.selected = 0;

    this.init = function() {
        this.div = document.getElementById( 'intellisense' );
    }

    this.update = function() {
        if (this.suggestions.length === 0) {
            return;
        }

        if (this.selected >= this.suggestions.length) {
            this.selected = this.suggestions.length - 1;
        }

        this.div.children = [];
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
}
