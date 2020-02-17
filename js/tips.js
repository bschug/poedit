function Tips() {
    this.tips = [
        "Press Ctrl+Shift+C to comment / uncomment the selected lines.",
        "Press Ctrl+Space on an empty line to show a list of available commands.",
        "Hold down Alt to show hidden items.",
        "Move the mouse over an item to show the rule that shows or hides it.",
        "Hold down Alt while hovering over an item to show all rules that affect this item (when using Continue).",
        "Click the Plus icon to add a new item to the preview set."
    ];
    this.durationPerTip = 7500;

    this.currentTip = Math.floor(Math.random() * this.tips.length);
    this.interval = null;

    this.beginCycleTipsInHeader = function() {
        if (this.interval != null) {
            console.warn('beginCycleTipsInHeader called, but already active');
            return;
        }

        this.showNext();

        var self = this;
        this.interval = setInterval(function() { self.showNext(); }, this.durationPerTip);
    }

    this.showNext = function() {
        var header = document.getElementById( 'header' );
        header.innerHTML = this.tips[this.currentTip];
        this.currentTip += 1;
        if (this.currentTip >= this.tips.length) {
            this.currentTip = 0;
        }
    }

    this.populateTipsList = function() {
        var tipsList = document.getElementById( 'tips-list' );
        for (var i=0; i < this.tips.length; i++) {
            var li = document.createElement( 'li' );
            li.innerHTML = this.tips[i];
            tipsList.appendChild( li );
        }
    }
}