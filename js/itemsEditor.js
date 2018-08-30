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
        var items = jsonToItems( DomUtils.getText( this.itemsEditorWindow ) );
        if (items === null) {
            // User has already been notified about the error
            return;
        }

        this.items = items;

        this.itemsEditorWindow.style.display = 'none';
        this.itemsArea.style.display = 'block';
    }

    function itemsToJson (items) {
        var json = '[\n';
        items = items.map( itemDefinitionToItemData );
        return JSON.stringify( items, null, 4 );
    }

    // Make statically available
    ItemsEditor.itemsToJson = itemsToJson;

    function renderText (container, text) {
        DomUtils.removeAllChildren( container );

        var lines = text.split( '\n' );

        for (var i=0; i < lines.length; i++) {

            // We replace all double spaces by a unicode non-breaking space and a normal one.
            // This is the same as &nbsp;, but we can use this in createTextNode.
            // We need to use createTextNode because the text may contain some HTML control characters.
            var line = StrUtils.replaceAll( lines[i], '  ', '\u00a0 ' );

            var p = document.createElement( 'p' );
            p.appendChild( document.createTextNode( line ));
            container.appendChild( p );
        }
    }

    function jsonToItems (json) {
        // Need to remove all whitespace because we have those unicode spaces for indentation
        // and the JSON parser does not like them.
        json = json.split( '\n' )
            .map( function (line) { return line.trim(); } )
            .join( '\n' );

        try {
            var data = JSON.parse( json );
        }
        catch( ex ) {
            alert( 'Item Data is not valid JSON. Try http://jsonlint.com to find the error.' );
            console.log( ex.toString() );
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

    // Make statically available
    ItemsEditor.jsonToItems = jsonToItems;

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
            width: 'number',
            height: 'number',
            sockets: 'string',
            identified: 'boolean',
            corrupted: 'boolean',
            influence: 'string',
            shapedMap: 'boolean',
            mapTier: 'number',
            gemLevel: 'number',
            explicitMods: 'object'
        };

        // Defaults for newly added item properties. This preserves backwards
        // compatibility with old data.
        var defaultValues = {
            identified: false,
            corrupted: false,
            influence: 'None',
            shapedMap: false,
            gemLevel: 0,
            explicitMods: []
        }

        for (var key in propertyTypes) {
            if (!(key in data)) {
                if (key in defaultValues) {
                    data[key] = defaultValues[key];
                }
                else if (key === 'mapTier') {
                    data[key] = data.dropLevel - 67;
                }
                else {
                    alert( 'Item number ' + itemNr + '(' + data['name'] + ') has no ' + key);
                    return false;
                }
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

        if (['None', 'Shaper', 'Elder'].indexOf( data.influence ) < 0) {
            alert( 'Item number ' + itemNr + '(' + data['name'] + ') has invalid influence ' + data.influence );
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

        for (var i=0; i < data.explicitMods.length; i++) {
            if (typeof data.explicitMods[i] !== 'string') {
                return false;
            }
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
            width: item.width,
            height: item.height,
            sockets: item.sockets.join(' '),
            identified: item.identified,
            corrupted: item.corrupted,
            influence: Influence.getName( item.influence ),
            shapedMap: item.shapedMap,
            mapTier: item.mapTier,
            gemLevel: item.gemLevel,
            explicitMods: item.explicitMods
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
            width: data.width,
            height: data.height,
            sockets: data.sockets.split(' '),
            identified: data.identified,
            corrupted: data.corrupted,
            influence: Influence[ data.influence ],
            shapedMap: data.shapedMap,
            mapTier: data.mapTier,
            gemLevel: data.gemLevel,
            explicitMods: data.explicitMods
        };
    }
}
