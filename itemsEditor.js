function ItemsEditor() {
    this.itemsEditorWindow = null;
    this.itemsArea = null;
    this.items = null;

    this.init = function() {
        this.itemsEditorWindow = document.getElementById( 'items-editor' );
        this.itemsArea = document.getElementById( 'items-area' );
    }

    this.open = function (items) {
        this.items = null;
        var json = itemsToJson( items );
        renderText( this.itemsEditorWindow, json );
        this.itemsEditorWindow.style.display = 'block';
        this.itemsArea.style.display = 'none';
    }

    this.isOpen = function() {
        return this.itemsEditorWindow.style.display === 'block';
    }

    this.close = function() {
        var json = DomUtils.getText( [ this.itemsEditorWindow ] );
        var items = jsonToItems( json );
        if (items === null) {
            // User has already been notified about the error
            return;
        }

        this.items = items;
    }

    function itemsToJson (items) {
        var json = '[\n';
        items = items.map( itemDefinitionToItemData );
        return JSON.stringify( items, null, 4 );
    }

    function renderText (container, text) {
        DomUtils.removeAllChildren( container );

        var lines = text.split( '\n' );
        lines = lines.map( function(line) { return StrUtils.replaceAll( line, '  ', '\u00a0 ' ); } );

        for (var i=0; i < lines.length; i++) {
            var p = document.createElement( 'p' );
            p.appendChild( document.createTextNode( lines[i] ) );
            container.appendChild( p );
        }
    }

    function jsonToItems (json) {
        try {
            var data = JSON.parse( json );
        }
        catch( ex ) {
            alert( 'Item Data is not valid JSON. Try http://jsonlint.com to find the error.' );
            return null;
        }

        if (!Array.isArray( data )) {
            alert( 'Invalid Item Data. Expected a JSON Array. Please ensure that the item data begins with "[" and ends with "]".' );
            return null;
        }

        for (var i=0; i < data.length; i++) {
            if (!isValidItem( data[i], i+1 )) {
                // User has already been notified about the cause of the problem
                return null;
            }
        }

        return data.map( itemDataToDefinition );
    }

    function isValidItem (data, itemNr) {
        if (typeof data !== 'object') {
            alert( 'Item number ' + itemNr + ' is not an object.' );
            return false;
        }

        var propertyTypes = {
            name: 'string',
            itemLevel: 'number',
            dropLevel: 'number',
            quality: 'number',
            itemClass: 'string',
            baseType: 'string',
            rarity: 'string',
            sockets: 'string'
        };

        for (var key in propertyTypes) {
            if (!key in data) {
                alert( 'Item number ' + itemNr + '(' + data['name'] + ') has no ' + key);
                return false;
            }

            if (typeof data[key] !== propertyTypes[key]) {
                alert( 'Item number ' + itemNr + '(' + data['name'] + ')' +
                       ' has a ' + (typeof data[key]).toString() + ' as its ' + key +
                       ' (expected ' + propertyTypes[key] + ')' );
                return false;
            }
        }

        if (['Normal','Magic','Rare','Unique'].indexOf( data.rarity ) < 0) {
            alert( 'Item number ' + itemNr + '(' + data['name'] + ') has invalid rarity ' + data.rarity );
            return false;
        }

        if (!StrUtils.consistsOf( data.sockets, 'RGBW ')) {
            alert( 'Item number ' + itemNr + '(' + data['name'] + ') has invalid sockets "' + data.sockets + '"' );
            return false;
        }

        var numSockets = data.sockets.split(' ')
            .map( function(sg) { return sg.length; } )
            .reduce( function(prev, cur) { return prev + cur; } );
        if (numSockets > 6) {
            alert( 'Item number ' + itemNr + '(' + data['name'] + ') has too many sockets' );
            return false;
        }

        return true;
    }

    function itemDefinitionToItemData (item) {
        return {
            name: item.name,
            itemLevel: item.itemLevel,
            dropLevel: item.dropLevel,
            quality: item.quality,
            itemClass: item.itemClass,
            baseType: item.baseType,
            rarity: Rarity.getName( item.rarity ),
            sockets: item.sockets.join(' '),
        };
    }

    function itemDataToDefinition (data) {
        return {
            name: data.name,
            itemLevel: data.itemLevel,
            dropLevel: data.dropLevel,
            quality: data.quality,
            itemClass: data.itemClass,
            baseType: data.baseType,
            rarity: Rarity[ data.rarity ],
            sockets: data.sockets.split(' '),
        };
    }
}
