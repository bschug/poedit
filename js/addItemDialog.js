function AddItemDialog() {
    this.dialog = null;
    this.itemLevelInput = null;
    this.dropLevelInput = null;
    this.qualityInput = null;
    this.raritySelect = null;
    this.itemClassInput = null;
    this.baseTypeInput = null;
    this.socketsInput = null;
    this.inventorySizeInput = null;

    this.init = function() {
        this.dialog = document.getElementById( 'additem-dialog' );

        for (var i=0; i < this.dialog.children.length; i++) {
            var p = this.dialog.children[i];
            switch (p.getAttribute('data')) {
                case 'base-type':
                    this.baseTypeInput = getTextField( p );
                    this.baseTypeInput.addEventListener('keydown', onKeyDown);
                    break;
                case 'class':
                    this.itemClassInput = getTextField( p );
                    this.itemClassInput.addEventListener('keydown', onKeyDown);
                    break;
                case 'item-level':
                    this.itemLevelInput = getTextField( p );
                    this.itemLevelInput.addEventListener('keydown', onKeyDown);
                    break;
                case 'drop-level':
                    this.dropLevelInput = getTextField( p );
                    this.dropLevelInput.addEventListener('keydown', onKeyDown);
                    break;
                case 'rarity':
                    this.raritySelect = getSelect( p );
                    this.raritySelect.addEventListener('keydown', onKeyDown);
                    break;
                case 'inventory-size':
                    this.inventorySizeInput = getTextField( p );
                    this.inventorySizeInput.addEventListener('keydown', onKeyDown);
                    break;
                case 'sockets':
                    this.socketsInput = getTextField( p );
                    this.socketsInput.addEventListener('keydown', onKeyDown);
                    break;
                case 'quality':
                    this.qualityInput = getTextField( p );
                    this.qualityInput.addEventListener('keydown', onKeyDown);
                    break;
            }
        }
    }

    this.show = function() {
        var position = this.findOptimalPosition();
        this.dialog.style.left = position.x;
        this.dialog.style.top = position.y;
        this.dialog.style.display = 'block';
    }

    this.hide = function() {
        this.dialog.style.display = 'none';
    }

    this.isOpen = function() {
        return this.dialog.style.display !== 'none';
    }

    this.clear = function() {
        this.itemLevelInput.value = "";
        this.dropLevelInput.value = "";
        this.qualityInput.value = "";
        this.raritySelect.selectedIndex = 0;
        this.itemClassInput.value = "";
        this.baseTypeInput.value = "";
        this.socketsInput.value = "";
        this.inventorySizeInput.value = "";
    }

    this.focus = function() {
        this.baseTypeInput.focus();
    }

    this.getItem = function() {
        var inventorySize = parseInventorySize( this.inventorySizeInput.value );
        var result = {
            name: this.baseTypeInput.value,
            itemLevel: parseInt( this.itemLevelInput.value ),
            dropLevel: parseInt( this.dropLevelInput.value ),
            quality: StrUtils.parseIntOrDefault( this.qualityInput.value, 0 ),
            rarity: Rarity.parse( getSelectedText( this.raritySelect ) ),
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
        if (parts.length !== 2 || isNaN(parseInt(parts[0])) || isNaN(parseInt(parts[1]))) {
            throw "Invalid Item Size. Expected {width}x{height}. Example: 2x3";
        }
        return {
            width: parseInt( parts[0] ),
            height: parseInt( parts[1] )
        };
    }

    function parseSockets (str) {
        for (var i=0; i < str.length; i++) {
            switch (str[i]) {
                case ' ':
                case 'R':
                case 'G':
                case 'B':
                    break;
                default:
                    throw "Invalid '" + str[i] + "' character in socket definition. Please use only R, G, B and Space";
            }
        }
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

    function getSelect (elem) {
        for (var i=0; i < elem.children.length; i++) {
            var child = elem.children[i];
            if (child.nodeName === 'SELECT') {
                return child;
            }
        }
    }

    function getSelectedText (select) {
        var i = select.selectedIndex;
        return select.options[i].text;
    }

    this.findOptimalPosition = function() {
        // make visible so we can read actual size
        var previousDisplay = this.dialog.style.display;
        this.dialog.style.display = 'block';

        var button = document.getElementById( 'additem-button' );
        var buttonRect = button.getBoundingClientRect();
        var dialogRect = this.dialog.getBoundingClientRect();

        var canPlaceRight = buttonRect.right + dialogRect.width <= window.innerWidth;
        var canPlaceBottom = buttonRect.bottom + dialogRect.height <= window.innerHeight;
        var canPlaceLeft = buttonRect.left - dialogRect.width >= 0;
        var canPlaceTop = buttonRect.top - dialogRect.height >= 0;

        var optimalX = 0;
        var optimalY = 0;

        if (canPlaceRight) { optimalX = buttonRect.right; }
        else if (canPlaceLeft) { optimalX = buttonRect.left - dialogRect.width; }
        else { optimalX = window.innerWidth - dialogRect.width; }

        if (canPlaceBottom) { optimalY = buttonRect.bottom; }
        else if (canPlaceTop) { optimalY = buttonRect.top - dialogRect.height; }
        else { optimalX = window.innerHeight - dialogRect.height; }

        // undo any changes to visibility
        this.dialog.style.display = previousDisplay;

        return {
            x: optimalX,
            y: optimalY
        };
    }

    function onKeyDown(event) {
        var keyCode = EventUtils.getKeyCode(event);

        // Enter
        if (keyCode === 13) {
            PoEdit.addItemDialog.onPressEnter();
            return;
        }

        // Esc
        if (keyCode === 27) {
            PoEdit.addItemDialog.hide();
            PoEdit.addItemDialog.clear();
        }
    }
}
