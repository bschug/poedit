function ItemDetails() {
    this.item = null;

    this.div = null;
    this.itemLevelLabel = null;
    this.dropLevelLabel = null;
    this.qualityLabel = null;
    this.rarityLabel = null;
    this.itemClassLabel = null;
    this.baseTypeLabel = null;
    this.socketsLabel = null;
    this.identifiedLabel = null;
    this.corruptedLabel = null;

    this.init = function() {
        this.div = document.getElementById( 'item-details' );
        for (var i=0; i < this.div.children.length; i++) {
            var child = this.div.children[i];
            switch (child.getAttribute('data')) {
                case 'item-level':
                    this.itemLevelLabel = getValueLabel( child );
                    break;
                case 'drop-level':
                    this.dropLevelLabel = getValueLabel( child );
                    break;
                case 'quality':
                    this.qualityLabel = getValueLabel( child );
                    break;
                case 'rarity':
                    this.rarityLabel = getValueLabel( child );
                    break;
                case 'class':
                    this.itemClassLabel = getValueLabel( child );
                    break;
                case 'base-type':
                    this.baseTypeLabel = getValueLabel( child );
                    break;
                case 'sockets':
                    this.socketsLabel = getValueLabel( child );
                    break;
                case 'identified':
                    this.identifiedLabel = child;
                    break;
                case 'corrupted':
                    this.corruptedLabel = child;
                    break;
            }
        }
    }

    this.update = function() {
        if (this.item === null) {
            this.div.style.display = 'none';
            return;
        }

        this.div.style.display = 'block';
        var itemPos = this.item.domElement.getBoundingClientRect();
        this.div.style.left = itemPos.left;
        this.div.style.top = itemPos.bottom;

        this.itemLevelLabel.innerHTML = this.item.itemLevel.toString();
        this.dropLevelLabel.innerHTML = this.item.dropLevel.toString();
        this.qualityLabel.innerHTML = this.item.quality.toString();
        this.rarityLabel.innerHTML = Rarity.getName( this.item.rarity );
        this.itemClassLabel.innerHTML = this.item.itemClass;
        this.baseTypeLabel.innerHTML = this.item.baseType;
        this.socketsLabel.innerHTML = this.item.sockets.join(' ');
        $(this.identifiedLabel).toggle( this.item.identified );
        $(this.corruptedLabel).toggle( this.item.corrupted );
    }

    function getValueLabel (elem) {
        for (var i=0; i < elem.children.length; i++) {
            var child = elem.children[i];
            if (child.className === 'value') {
                return child;
            }
        }
    }
}
