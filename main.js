var PoEdit = new function()
{
	var MANUAL_UPDATE = false;

	function applyDefaultStyle (item) {
		var BLACK_75 = {r:0, g:0, b:0, a:0.75};
		var WHITE = {r:200, g:200, b:200};
		var BLUE = {r:136, g:136, b:255};
		var YELLOW = {r:255, g:255, b:119};
		var ORANGE = {r:175, g:96, b:37};
		var GOLD = {r:170, g:158, b:130};
		var CYAN = {r:27, g:162, b:155};

		var color = WHITE;

		if (item.rarity == Rarity.Magic) {
			color = BLUE;
		}
		else if (item.rarity == Rarity.Rare) {
			color = YELLOW;
		}
		else if (item.rarity == Rarity.Unique) {
			color = ORANGE;
		}
		else if (item.itemClass == 'Currency') {
			color = GOLD;
		}
		else if (StrUtils.contains( 'Gem', item.itemClass )) {
			color = CYAN;
		}

		item.setVisibility( true );
		item.removeBorder();
		item.setBackgroundColor( BLACK_75 );
		item.setTextColor( color );

		if (item.itemClass === 'Maps' || item.itemClass === 'Map Fragments') {
			item.setBorderColor( color );
		}
	}

	function getDefaultScript() {
		return	'Show\n' +
				'    Class Gem\n' +
				'    Quality > 0\n' +
				'    SetBorderColor 128 128 255\n' +
		    	'\n' +
				'Show\n' +
				'    BaseType "Exalted Orb"\n' +
				'    SetTextColor 255 0 255\n' +
				'\n' +
				'Show\n' +
				'    SocketGroup RGB\n' +
				'    PlayAlertSound 1\n' +
				'\n' +
				'Show\n' +
				'    LinkedSockets >= 5\n' +
				'    SetBackgroundColor 0 128 0\n';
	}

	function setScript (code) {
		var codeWindow = document.getElementById( 'code-window' );
		code = StrUtils.replaceAll( code, '\n', '<br>' );
		code = StrUtils.replaceAll( code, '  ', '&nbsp; ' );
		codeWindow.innerHTML = code;
	}

	function createItems (itemDefinitions) {
		var items = [];
		itemDefinitions.forEach( function(item) {
			items.push( new Item(item) );
		});
		return ArrayUtils.shuffle( items );
	}

	function drawItems (items) {
		items.forEach( function(item) {
			item.draw();
			applyDefaultStyle( item );
			item.onMouseOver = function() { onHoverItemStart(item); }
			item.onMouseOut = function() { onHoverItemEnd(item); }
		});
	}

	function onHoverItemStart (item) {
		if (item.matchingRule !== null) {
			PoEdit.editor.highlightLines = item.matchingRule.codeLines;
			PoEdit.editor.scrollToLine( item.matchingRule.codeLines[0] );
			PoEdit.dirty = true;
		}
		PoEdit.itemDetails.item = item;
	}

	function onHoverItemEnd (item) {
		PoEdit.editor.highlightLines = [];
		PoEdit.itemDetails.item = null;
		PoEdit.dirty = true;
	}

	function getCode() {
		var codeWindow = document.getElementById( 'code-window' );
		return DomUtils.getText( codeWindow ); // cannot use innerText on Firefox
	}

	function clearLog() {
		var logWindow = document.getElementById( 'log-window' );
		logWindow.innerText = '';
	}

	function addErrorMessage (message) {
		var logWindow = document.getElementById( 'log-window' );
		logWindow.innerText += '\n' + message;
	}

	// There are different ways how the key code may be stored in the event on different browsers
	function getKeyCode (event) {
		if (event.keyCode) {
			return event.keyCode;
		}
		else if (event.which) {
			return event.which;
		}
	}

	function onKeyDown (event) {
		var code = getKeyCode( event );

		// Tab
		if (code === 9) {
			if (PoEdit.intellisense.isVisible()) {
				event.preventDefault();
				PoEdit.intellisense.applySuggestion();
			}
		}
		// Enter
		else if (code === 13) {
			if (PoEdit.intellisense.isVisible()) {
				event.preventDefault();
				event.stopPropagation();
				PoEdit.intellisense.applySuggestion();
			}
		}
		// Arrow Up
		else if (code === 38) {
			if (PoEdit.intellisense.isVisible()) {
				event.preventDefault();
				PoEdit.intellisense.selectPrevious();
				updateIntellisense();
			}
		}
		// Arrow Down
		else if (code === 40) {
			if (PoEdit.intellisense.isVisible()) {
				event.preventDefault();
				PoEdit.intellisense.selectNext();
				updateIntellisense();
			}
		}
		// Escape
		else if (code === 27) {
			if (PoEdit.intellisense.isVisible()) {
				event.preventDefault();
				PoEdit.intellisense.enabled = false;
				updateIntellisense();
			}
		}
		// Space
		else if (code === 32) {
			// Ctrl+Space
			if (event.ctrlKey) {
				event.preventDefault();
				PoEdit.intellisense.enabled = true;
				PoEdit.intellisense.enabledOnEmptyLine = true;
				updateIntellisense();
			}
			// Without Ctrl
			else {
				if (PoEdit.intellisense.isVisible()) {
					event.preventDefault();
					PoEdit.intellisense.applySuggestion();
				}
			}
		}
	}

	function onKeyDown_Global (event) {
		var code = getKeyCode( event );

		// Alt
		if (code === 18) {
			event.preventDefault();
			PoEdit.showHiddenItems = true;
			updateItems();
		}
	}

	function onKeyUp_Global (event) {
		var code = getKeyCode( event );

		// Alt
		if (code === 18) {
			PoEdit.showHiddenItems = false;
			updateItems();
		}
	}

	function updateItems () {
		PoEdit.items.forEach( function(item) {
			applyDefaultStyle( item );

			for (var i=0; i < PoEdit.parser.ruleSet.length; i++) {
				var rule = PoEdit.parser.ruleSet[i];
				if (rule.match( item )) {
					item.matchingRule = rule;
					rule.applyTo( item );

					if (PoEdit.showHiddenItems) {
						item.setVisibility( true );
					}
					break;
				}
			}
		} );
	}

	function updateIntellisense (rawLines) {
		if (typeof rawLines === 'undefined') {
			rawLines = getCode().split( '\n' );
		}

		// If code window is in focus
		var codeWindow = document.getElementById( 'code-window' );
		if (codeWindow === document.activeElement) {
			// Get cursor position from code window
			PoEdit.codeCursorPos = DomUtils.saveSelection( codeWindow );
			if (PoEdit.codeCursorPos !== null && PoEdit.codeCursorPos.length > 0) {
				// Update intellisense
				var cp = PoEdit.codeCursorPos[0].characterRange.start;
				PoEdit.intellisense.update( rawLines, cp );
			}
		}
	}

	function onResetButton() {
		setItems( getDefaultItems() );
	}

	function setItems (itemsDefinition) {
		// Store the new items definition
		PoEdit.itemsDefinition = itemsDefinition;
		PoEdit.items = createItems( itemsDefinition );

		// Redraw all items
		DomUtils.removeAllChildren( document.getElementById( 'items-area' ) );
		drawItems( PoEdit.items );

		PoEdit.dirty = true;
		this.innerHTML = 'Edit';

		// Save items definition to local storage
		StorageUtils.save( 'poedit-items', ItemsEditor.itemsToJson( itemsDefinition ) );
	}

	// Returns all buttons that don't have the given id
	function getOtherButtons (id) {
		var otherButtons = [];
		var buttons = document.getElementById( 'buttons' ).children;
		for (var i=0; i < buttons.length; i++) {
			if (buttons[i].id !== id) {
				otherButtons.push( buttons[i] );
			}
		}
		return otherButtons;
	}

	function onItemsEditButton() {
		if (PoEdit.itemsEditor.isOpen()) {
			PoEdit.itemsEditor.close();

			// close() may fail if invalid item data was given.
			// In that case, ItemsEditor.items will be null.
			// We keep our item list as it is in that case.
			if (PoEdit.itemsEditor.items !== null) {
				setItems( PoEdit.itemsEditor.items );
				this.innerHTML = 'Edit';

				// enable other buttons
				getOtherButtons( 'items-edit-button' ).forEach( function(btn) {
					btn.style.display = 'inline-block';
				} );
			}
		}
		else {
			PoEdit.itemsEditor.open( PoEdit.itemsDefinition );
			this.innerHTML = 'Save';

			// disable other buttons
			getOtherButtons( 'items-edit-button' ).forEach( function(btn) {
				btn.style.display = 'none';
			});
		}
	}

	function onHelpButton() {
		var helpButton = document.getElementById( 'help-button' );
		var helpWindow = document.getElementById( 'help-window' );
		var itemsArea = document.getElementById( 'items-area' );

		if (helpWindow.style.display === 'block') {
			helpWindow.style.display = 'none';
			itemsArea.style.display = 'block';
			helpButton.innerHTML = 'Help'
			getOtherButtons( 'help-button' ).forEach( function(btn) { btn.style.display = 'inline-block'; } );
		}
		else {
			itemsArea.style.display = 'none';
			helpWindow.style.display = 'block';
			helpButton.innerHTML = 'Close';
			getOtherButtons( 'help-button' ).forEach( function(btn) { btn.style.display = 'none'; } );
		}
	}

	this.items = null;
	this.itemsDefinition = null;
	this.parser = new Parser();
	this.editor = new Editor();
	this.itemsEditor = new ItemsEditor();
	this.itemDetails = new ItemDetails();
	this.codeCursorPos = 0;
	this.intellisense = new Intellisense();
	this.previousCode = '';
	this.showHiddenItems = false;
	this.dirty = true;

	this.init = function() {
		this.itemsDefinition = loadItems();
		this.items = createItems( this.itemsDefinition );
		drawItems( this.items );

		setScript( StorageUtils.load( 'poedit-code', getDefaultScript() ) );
		this.editor.init();
		this.itemsEditor.init();
		this.intellisense.init();
		this.itemDetails.init();

		var self = this;
		if (MANUAL_UPDATE) {
			var button = document.getElementById( 'manual-update-button' );
			button.style.display = 'block';
			button.addEventListener('click', function() { self.update(); });
		}
		else {
			setInterval( function() { self.update(); }, 250 );
		}

		document.getElementById( 'help-button' ).addEventListener( 'click', onHelpButton );
		document.getElementById( 'reset-button' ).addEventListener( 'click', onResetButton );
		document.getElementById( 'items-edit-button' ).addEventListener( 'click', onItemsEditButton );
		document.getElementById( 'code-window' ).addEventListener( 'keydown', onKeyDown, true );
		document.addEventListener( 'keydown', onKeyDown_Global, true );
		document.addEventListener( 'keyup', onKeyUp_Global, true );
	}

	this.update = function() {
		var code = getCode();

		// mark as dirty if code was changed
		if (code !== this.previousCode) {
			this.dirty = true;
		}
		this.previousCode = code;
		StorageUtils.save( 'poedit-code', code );

		// don't do expensive update if nothing has changed
		if (!this.dirty) {
			return;
		}
		this.dirty = false;

		var rawLines = code.split( '\n' );
		this.parser.parse( rawLines );

		clearLog();
		this.parser.errors.forEach( addErrorMessage );

		this.editor.formatCode( rawLines, this.parser.lineTypes );

		updateItems();
		updateIntellisense( rawLines );
		this.itemDetails.update();
	}

};
