function AddItemDialog() {
    this.dialog = null;
    this.nameInput = null;
    this.itemLevelInput = null;
    this.dropLevelInput = null;
    this.qualityInput = null;
    this.rarityInput = null;
    this.itemClassInput = null;
    this.baseTypeInput = null;
    this.socketsInput = null;
    this.inventorySizeInput = null;

    this.init = function() {
        this.dialog = document.getElementById( 'additem-dialog' );

        for (var i=0; i < this.dialog.children.length; i++) {
            var p = this.dialog.children[i];
            switch (p.getAttribute('data')) {
                case 'name':
                    this.nameInput = getTextField( p );
                    break;
                case 'item-level':
                    this.itemLevelInput = getTextField( p );
                    break;
                case 'drop-level':
                    this.dropLevelInput = getTextField( p );
                    break;
                case 'quality':
                    this.qualityInput = getTextField( p );
                    break;
                case 'rarity':
                    this.rarityInput = getTextField( p );
                    break;
                case 'class':
                    this.itemClassInput = getTextField( p );
                    break;
                case 'base-type':
                    this.baseTypeInput = getTextField( p );
                    break;
                case 'sockets':
                    this.socketsInput = getTextField( p );
                    break;
                case 'inventory-size':
                    this.inventorySizeInput = getTextField( p );
                    break;
            }
        }
    }

    this.show = function() {
        this.dialog.style.display = 'block';
    }

    this.hide = function() {
        this.dialog.style.display = 'none';
    }

    this.clear = function() {
        this.nameInput.value = "";
        this.itemLevelInput.value = "";
        this.dropLevelInput.value = "";
        this.qualityInput.value = "";
        this.rarityInput.value = "";
        this.itemClassInput.value = "";
        this.baseTypeInput.value = "";
        this.socketsInput.value = "";
        this.inventorySizeInput.value = "";
    }

    this.getItem = function() {
        var inventorySize = parseInventorySize( this.inventorySizeInput.value );
        var result = {
            name: this.nameInput.value,
            itemLevel: parseInt( this.itemLevelInput.value ),
            dropLevel: parseInt( this.dropLevelInput.value ),
            quality: parseInt( this.qualityInput.value ),
            rarity: Rarity.parse( this.rarityInput.value ),
            itemClass: this.itemClassInput.value,
            baseType: this.baseTypeInput.value,
            width: inventorySize.width,
            height: inventorySize.height,
            sockets: parseSockets( this.socketsInput.value )
        };

        ItemData.validate( result );
        return result;
    }

    function parseInventorySize (str) {
        var parts = str.split( 'x' );
        return {
            width: parseInt( parts[0] ),
            height: parseInt( parts[1] )
        };
    }

    function parseSockets (str) {
        return str.split( ' ' );
    }

    function getTextField (elem) {
        for (var i=0; i < elem.children.length; i++) {
            var child = elem.children[i];
            if (child.nodeName === 'INPUT') {
                return child;
            }
        }
    }

}
