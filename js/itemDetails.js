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
    this.fracturedItemLabel = null;
    this.synthesisedItemLabel = null;
    this.replicaLabel = null;
    this.influenceLabelOuter = null;
    this.influenceLabelInner = null;
    this.enchantmentLabel = null;
    this.shapedMapLabel = null;
    this.mapTierLabel = null;
    this.gemLevelLabel = null;
    this.stackSizeLabel = null;
    this.explicitModsLabel = null;

    this.mapTierLine = null;
    this.gemLevelLine = null;
    this.stackSizeLine = null;
    this.explicitModsLine = null;

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
                case 'fractured-item':
                    this.fracturedItemLabel = child;
                    break;
                case 'synthesised-item':
                    this.synthesisedItemLabel = child;
                    break;
                case 'replica':
                    this.replicaLabel = child;
                    break;
                case 'influence':
                    this.influenceLabelOuter = child;
                    this.influenceLabelInner = getValueLabel(child);
                    break;
                case 'enchantment':
                    this.enchantmentLabel = getValueLabel(child);
                    break;
                case 'shaped-map':
                    this.shapedMapLabel = child;
                    break;
                case 'map-tier':
                    this.mapTierLine = child;
                    this.mapTierLabel = getValueLabel(child);
                    break;
                case 'gem-level':
                    this.gemLevelLine = child;
                    this.gemLevelLabel = getValueLabel(child);
                    break;
                case 'stack-size':
                    this.stackSizeLine = child;
                    this.stackSizeLabel = getValueLabel(child);
                    break;
                case 'explicit-mods':
                    this.explicitModsLine = child;
                    this.explicitModsLabel = getValueLabel( child );
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
        $(this.fracturedItemLabel).toggle( this.item.fracturedItem );
        $(this.synthesisedItemLabel).toggle( this.item.synthesisedItem );
        $(this.replicaLabel).toggle( this.item.replica );
        $(this.influenceLabelOuter).toggle( this.item.influence.length !== 0 );
        this.influenceLabelInner.innerHTML = Influence.getName( this.item.influence );
        this.enchantmentLabel.innerHTML = this.item.enchantment;
        $(this.shapedMapLabel).toggle( this.item.shapedMap );
        this.mapTierLabel.innerHTML = this.item.mapTier.toString();
        $(this.mapTierLine).toggle( this.item.itemClass === 'Maps' );
        this.gemLevelLabel.innerHTML = this.item.gemLevel.toString();
        $(this.gemLevelLine).toggle( this.item.gemLevel > 0 );
        this.stackSizeLabel.innerHTML = this.item.stackSize.toString();
        $(this.stackSizeLine).toggle( this.item.stackSize > 1 );
        $(this.explicitModsLine).toggle( this.item.explicitMods.length > 0 );
        $(this.explicitModsLabel).empty();
        for (var i=0; i < this.item.explicitMods.length; i++) {
            $("<li>" + this.item.explicitMods[i] + "</li>").appendTo(this.explicitModsLabel);
        }
    }

    function getValueLabel (elem, dontwarn) {
        for (var i=0; i < elem.children.length; i++) {
            var child = elem.children[i];
            if (child.className === 'value') {
                return child;
            }
            var inner = getValueLabel(child, true);
            if (inner !== null) {
                return inner;
            }
        }
        if (!dontwarn) {
            console.warn("Couldn't find value label for ", elem);
        }
        return null;
    }
}
