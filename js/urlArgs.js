function UrlArgs() {
    this.codePastebin = new Pastebin();
    this.itemsPastebin = new Pastebin();

    this.hasCodePastebin = function() {
        // If we already know that the code pastebin id is invalid, we treat it as not having one.
        if (this.codePastebin.status === 'Error') {
            return false;
        }
        return getCodePastebinId() !== null;
    }

    this.hasItemsPastebin = function() {
        // If we already know that the items pastebin id is invalid, we treat it as not having one.
        if (this.itemsPastebin.status === 'Error') {
            return false;
        }
        return getItemsPastebinId() !== null;
    }

    function getCodePastebinId () {
        var args = getHashArgs();
        if (args === null || args.length === 0) {
            return null;
        }
        // Code pastebin must always come first, so if first argument is items pastebin, 
        // we know that there is no code pastebin.
        if (StrUtils.startsWith( args[0], 'items=' )) {
            return null;
        }
        return args[0];
    }

    function getItemsPastebinId () {
        var args = getHashArgs();
        if (args === null) {
            return null;
        }
        // Find the first arg with items= prefix
        for (var i=0; i < args.length; i++) {
            if (StrUtils.startsWith( args[i], 'items=' )) {
                return args[i].substring( 'items='.length );
            }
        }
        return null;
    }


    this.loadCodePastebin = function (successCb, errorCb) {
        var self = this;
        self.codePastebin.load( getCodePastebinId(), successCb, errorCb );
    }

    this.loadItemsPastebin = function (successCb, errorCb) {
        var self = this;
        self.itemsPastebin.load( getItemsPastebinId(), successCb, errorCb );
    }

    function getHashArgs() {
        if (!window.location.hash) {
            return null;
        }
        return window.location.hash.substring(1).split( ',' );
    }
}
