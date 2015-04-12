var PoEdit = new function()
{
	var MANUAL_UPDATE = false;

	function applyDefaultStyle (item) {
		var BLACK = {r:0, g:0, b:0};
		var WHITE = {r:255, g:255, b:255};
		var BLUE = {r:128, g:128, b:255};
		var YELLOW = {r:255, g:255, b:50};
		var ORANGE = {r:220, g:150, b:50};
		var GOLD = {r:200, g:180, b:100};
		var CYAN = {r:50, g:255, b:255};

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
		else if (item.itemClass == 'Gem') {
			color = CYAN;
		}

		item.setVisibility( true );
		item.removeBorder();
		item.setBackgroundColor( BLACK );
		item.setTextColor( color );

		if (item.itemClass === 'Map') {
			item.setBorderColor( color );
		}
	}

	function addDefaultScript() {
		var codeWindow = document.getElementById( 'code-window' );
		var code =
			'Show\n' +
			'    Class Gem\n' +
			'    Quality > 0\n' +
			'    SetBorderColor 128 128 255 \n' +
    		'\n' +
			'Show\n' +
			'    BaseType "Exalted Orb"\n' +
			'    SetTextColor 255 0 255\n' +
			'\n' +
			'Show\n' +
			'    SocketGroup RGB\n' +
			'    PlayAlertSound 1    \n' +
			'\n' +
			'Show\n' +
			'    LinkedSockets >= 5\n' +
			'    SetBackgroundColor 0 128 0\n';

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
		return DomUtils.getText( [codeWindow] ); // cannot use innerText on Firefox
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
		// Arrow Up
		else if (code === 38) {
			if (PoEdit.intellisense.isVisible()) {
				event.preventDefault();
				PoEdit.intellisense.selectPrevious();
			}
		}
		// Arrow Down
		else if (code === 40) {
			if (PoEdit.intellisense.isVisible()) {
				event.preventDefault();
				PoEdit.intellisense.selectNext();
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
		// Ctrl+Space
		else if (code === 32) {
			if (event.ctrlKey) {
				event.preventDefault();
				PoEdit.intellisense.enabled = true;
				PoEdit.intellisense.enabledOnEmptyLine = true;
				updateIntellisense();
			}
		}
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

	function onItemsEditButton() {
		if (PoEdit.itemsEditor.isOpen()) {
			PoEdit.itemsEditor.close();

			// close() may fail if invalid item data was given.
			// In that case, ItemsEditor.items will be null.
			// We keep our item list as it is in that case.
			if (PoEdit.itemsEditor.items !== null) {
				PoEdit.itemsDefinition = PoEdit.itemsEditor.items;
				DomUtils.removeAllChildren( document.getElementById( 'items-area' ) );
				drawItems( createItems( PoEdit.itemsDefinition ) );
				PoEdit.dirty = true;
				this.innerHTML = 'Edit';
			}
		}
		else {
			PoEdit.itemsEditor.open( PoEdit.itemsDefinition );
			this.innerHTML = 'Save';
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
	this.dirty = true;

	this.init = function() {
		this.itemsDefinition = getDefaultItems();
		this.items = createItems( this.itemsDefinition );
		drawItems( this.items );

		addDefaultScript();
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

		document.getElementById( 'items-edit-button' ).addEventListener( 'click', onItemsEditButton );
		document.getElementById( 'code-window' ).addEventListener( 'keydown', onKeyDown, true );
	}

	this.update = function() {
		var code = getCode();

		// mark as dirty if code was changed
		if (code !== this.previousCode) {
			this.dirty = true;
		}
		this.previousCode = code;

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

		this.items.forEach( function(item) {
			applyDefaultStyle( item );

			for (var i=0; i < this.parser.ruleSet.length; i++) {
				var rule = this.parser.ruleSet[i];
				if (rule.match( item )) {
					item.matchingRule = rule;
					rule.applyTo( item );
					break;
				}
			}
		}, this );

		updateIntellisense( rawLines );
		this.itemDetails.update();
	}

};
