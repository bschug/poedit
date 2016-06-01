function SettingsDialog() {
    this.dialog = null;
    this.colorSchemeSelect = null;
    this.autoIndentCheckbox = null;
    this.lineNumbersCheckbox = null;
    this.itemSetSelect = null;
    this.closeButton = null;

    this.init = function() {
        this.dialog = document.getElementById( 'settings-dialog' );
        this.colorSchemeSelect = document.getElementById( 'editor-settings-colorscheme' );
        this.autoIndentCheckbox = document.getElementById( 'editor-settings-autoindent' );
        this.lineNumbersCheckbox = document.getElementById( 'editor-settings-linenumbers' );
        this.itemSetSelect = document.getElementById( 'item-settings-itemset' );
        this.closeButton = document.getElementById( 'settings-dialog-close' );

        PoEdit.getAvailableColorSchemes().forEach( function(cs) {
            var option = document.createElement('option');
            option.data = cs;
            option.name = cs.name;
            DomUtils.setText(option, cs.name);
            PoEdit.settingsDialog.colorSchemeSelect.appendChild(option);
        });
        this.colorSchemeSelect.onchange = function() {
            PoEdit.setCurrentColorScheme( getSelectedOption(PoEdit.settingsDialog.colorSchemeSelect).data );
        }

        this.autoIndentCheckbox.onchange = function() {
            PoEdit.setAutoIndentEnabled( PoEdit.settingsDialog.autoIndentCheckbox.checked );
        }

        this.lineNumbersCheckbox.onchange = function() {
            PoEdit.setLineNumbersEnabled( PoEdit.settingsDialog.lineNumbersCheckbox.checked );
        }

        PoEdit.getAvailableItemSets().forEach( function(set) {
            var option = document.createElement('option');
            option.data = set;
            option.name = set.name;
            DomUtils.setText(option, set.name);
            PoEdit.settingsDialog.itemSetSelect.appendChild(option);
        });
        this.itemSetSelect.onchange = function() {
            selectItemSet( getSelectedOption(PoEdit.settingsDialog.itemSetSelect).data.id );
        }

        this.closeButton.onclick = function() {
            PoEdit.settingsDialog.hide();
        }

    }

    this.show = function() {
        loadSettings( PoEdit.settingsDialog );
        this.dialog.style.display = 'block';
    }

    this.hide = function() {
        this.dialog.style.display = 'none';
    }

    function loadSettings(dialog) {
        selectItem( dialog.colorSchemeSelect, function(option) { return option.name === PoEdit.getCurrentColorScheme().name } );
        dialog.autoIndentCheckbox.checked = PoEdit.getAutoIndentEnabled();
        dialog.lineNumbersCheckbox.checked = PoEdit.getLineNumbersEnabled();
    }

    function selectItem (select, condition) {
        for (var i=0; i < select.length; i++) {
            var option = select[i];
            if (condition(option)) {
                select.selectedIndex = i;
            }
        }
    }

    function getSelectedOption (select) {
        return select.item( select.selectedIndex );
    }

    function selectItemSet (id) {
        if (id === 'custom') {
            PoEdit.setItems( loadItemsLocal() );
        }

        $.get( 'itemSets/' + id + '.json', function(json) {
            PoEdit.setItems( ItemsEditor.jsonToItems(json), false );
        } );

        ga('send', 'event', 'itemset');
    }
}
