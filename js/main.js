var PoEdit = new function()
{
	function createCodeEditor() {
		var codeWindow = document.getElementById('code-window');
		var editor = CodeMirror.fromTextArea( codeWindow, {
			mode:'poe',
			theme:'bschug',
			lineWrapping:true
		});
		editor.on('change', function() { PoEdit.dirty = true; } );

		editor.setOption('extraKeys', {
			"Shift-Ctrl-C": function(editor) {
				editor.toggleComment();
			},
			"Ctrl-Space": function(editor) {
				editor.showHint();
			}
		});
		editor.setOption('continueComments', true);

		return editor;
	}

	var MANUAL_UPDATE = false;

	function applyDefaultStyle (item) {
		var BLACK_75 = {r:0, g:0, b:0, a:190};
		var WHITE = {r:200, g:200, b:200};
		var BLUE = {r:136, g:136, b:255};
		var YELLOW = {r:255, g:255, b:119};
		var ORANGE = {r:175, g:96, b:37};
		var GOLD = {r:170, g:158, b:130};
		var CYAN = {r:27, g:162, b:155};
		var GREEN = {r:74, g:230, b:58};
		var LIGHT_CYAN = {r:170, g:230, b:230};

		var color = WHITE;

		if (item.rarity === Rarity.Magic) {
			color = BLUE;
		}
		else if (item.rarity === Rarity.Rare) {
			color = YELLOW;
		}
		else if (item.rarity === Rarity.Unique) {
			color = ORANGE;
		}
		else if (item.itemClass === 'Currency') {
			color = GOLD;
		}
		else if (StrUtils.contains( 'Gem', item.itemClass )) {
			color = CYAN;
		}
		else if (item.itemClass === 'Quest Items') {
			color = GREEN;
		}
		else if (item.itemClass === 'Divination Card') {
			color = LIGHT_CYAN;
		}
		else if (item.itemClass === 'Labyrinth Item' || item.itemClass === 'Labyrinth Trinket') {
			color = GOLD;
		}

		item.setVisibility( true );
		item.removeBorder();
		item.setBackgroundColor( BLACK_75 );
		item.setTextColor( color );

		if (item.itemClass === 'Maps' || item.itemClass === 'Map Fragments') {
			item.setBorderColor( color );
		}
	}

	function setScript (code) {
		PoEdit.editor.setValue(code);
	}

	this.highlightLines = function(lines) {
		if (PoEdit.highlightedLines) {
			PoEdit.highlightedLines.clear();
			PoEdit.highlightedLines = null;
		}

		if (lines.length === 0) {
			return;
		}

		var firstLine = lines[0];
		var lastLine = lines[lines.length-1];
		var lastLineLength = PoEdit.editor.getLine(lastLine).length;

		PoEdit.highlightedLines = PoEdit.editor.markText(
			{ line:firstLine, ch:0 },
		 	{ line:lastLine, ch:lastLineLength },
			{ className:'highlighted' }
		);
	}

	this.scrollIntoView = function( firstLine, lastLine ) {
		PoEdit.editor.scrollIntoView( { line:firstLine, ch:0 }, 50 );
		PoEdit.editor.scrollIntoView( { line:lastLine, ch:0 }, 50 );
	}

	function createItems (itemDefinitions) {
		var items = [];
		itemDefinitions.forEach( function(item) {
			items.push( new Item(item) );
		});
		return ArrayUtils.shuffle( items );
	}

	function drawItems (items) {
		items.forEach( drawItem );
		drawAddItemButton();
	}

	function drawItem (item) {
		item.draw();
		applyDefaultStyle( item );
		item.onMouseOver = function() { onHoverItemStart(item); };
		item.onMouseOut = function() { onHoverItemEnd(item); };
		item.onRightClick = function() { deleteItem(item); };
	}

	function drawAddItemButton() {
		var plus = document.createElement( 'img' );
		plus.id = 'additem-button';
		plus.src = 'img/plus.png';
		plus.addEventListener( 'click', onAddItemButton );
		var itemsArea = document.getElementById( 'items-area' );
		itemsArea.appendChild( plus );
	}

	function removeAddItemButton() {
		var button = document.getElementById( 'additem-button' );
		button.parentNode.removeChild( button );
	}

	function onHoverItemStart (item) {
		if (PoEdit.hoverItemTimeout !== null) {
			clearTimeout( PoEdit.hoverItemTimeout );
		}
		PoEdit.hoverItemTimeout = setTimeout( function() { showItemDetails( item ); }, 250 );
	}

	function onHoverItemEnd (item) {
		if (PoEdit.hoverItemTimeout !== null) {
			clearTimeout( PoEdit.hoverItemTimeout );
		}
		hideItemDetails();
	}

	function addItem (itemData) {
		var item = new Item(itemData);
		PoEdit.itemsDefinition.push( itemData );
		PoEdit.items.push( item );

		// Remove the Add Item Button first and add it again after adding the item
		// to ensure that it's always at the end of the item list.
		removeAddItemButton();
		drawItem( item );
		drawAddItemButton();
	}

	function deleteItem (item) {
		// Deletes the item without redrawing the entire item list because that
		// would involve shuffling them and be very confusing to the user.
		// We can't just move the suffling out of the setItems function because
		// then we would need to shuffle the input to setItems (the actual item
		// definitions) instead of just the output.
		PoEdit.items = PoEdit.items.filter( function(e) {
			return !ItemData.areEqual( item, e );
		});
		PoEdit.itemsDefinition = PoEdit.itemsDefinition.filter( function(e) {
			return !ItemData.areEqual( item, e );
		});
		item.outerElement.parentNode.removeChild( item.outerElement );
		saveItems( PoEdit.itemsDefinition );
	}

	function showItemDetails (item) {
		if (item.matchingRule !== null) {
			PoEdit.highlightLines( item.matchingRule.codeLines );
			PoEdit.scrollIntoView( item.matchingRule.codeLines[0], item.matchingRule.codeLines[ item.matchingRule.codeLines.length - 1 ] );
			PoEdit.dirty = true;
		}
		PoEdit.itemDetails.item = item;
	}

	function hideItemDetails() {
		PoEdit.highlightLines( [] );
		PoEdit.itemDetails.item = null;
		PoEdit.dirty = true;
	}

	function getCode() {
		return PoEdit.editor.getValue();
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

	function onResetButton() {
		setItems( getDefaultItems() );
		ga('send', 'event', 'items-editor', 'reset');
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

		saveItems( itemsDefinition );
	}

	// Save items definition to local storage
	function saveItems (itemsDefinition) {
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
				ga('send', 'event', 'items-editor', 'save');
			}
			else {
				ga('send', 'event', 'items-editor', 'invalid');
			}
		}
		else {
			PoEdit.itemsEditor.open( PoEdit.itemsDefinition );
			this.innerHTML = 'Save';

			// disable other buttons
			getOtherButtons( 'items-edit-button' ).forEach( function(btn) {
				btn.style.display = 'none';
			});
			ga('send', 'event', 'items-editor', 'open');
		}
	}

	function onAddItemButton() {
		PoEdit.addItemDialog.show();
		PoEdit.addItemDialog.focus();
		ga('send', 'event', 'additem', 'open');
	}

	function onAddItemCancel() {
		PoEdit.addItemDialog.hide();
		PoEdit.addItemDialog.clear();
		ga('send', 'event', 'additem', 'cancel');
	}

	function onAddItemOk() {
		try {
			var item = PoEdit.addItemDialog.getItem();
			addItem( item );
			PoEdit.addItemDialog.hide();
			PoEdit.addItemDialog.clear();
			ga('send', 'event', 'additem', 'success');
		}
		catch (msg) {
			alert( msg );
			ga('send', 'event', 'additem', 'error', msg);
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

		ga('send', 'event', 'help');
	}

	this.items = null;
	this.itemsDefinition = null;
	this.showHiddenItems = false;
	this.itemMouseoverTimeout = null;
	this.highlightedLines = null;

	this.parser = new Parser();
	this.editor = null;
	this.itemsEditor = new ItemsEditor();
	this.urlArgs = new UrlArgs();
	this.itemDetails = new ItemDetails();
	this.addItemDialog = new AddItemDialog();

	this.dirty = true;
	this.initSteps = [];

	function AsyncOperation (name, operation, callback) {
		this.name = name;
		this.operation = operation;
		this.callback = callback;
		this.status = 'Pending';

		this.run = function() {
			// Need to store instance in closure because otherwise the callback will be run on a different this object
			var self = this;

			self.status = 'Running';
			console.log( 'Starting Async Operation ' + self.name );

			operation( function () {
				self.status = 'Complete';
				console.log( 'Completed Async Operation ' + self.name );
				self.callback();
			} );
		}
	}

	function addAsyncInitStep (name, operation) {
		PoEdit.initSteps.push(
			new AsyncOperation( name, operation, function() { PoEdit.onInitStepComplete(); } )
		);
	}

	function runAsyncInitSteps() {
		PoEdit.initSteps.forEach( function (step) { step.run(); } );
	}

	function allInitStepsComplete() {
		return PoEdit.initSteps.every( function (step) { return step.status === 'Complete'; } );
	}

	this.loadScript = function (callback) {
		loadScript( this.urlArgs, function (code) {
			trackCodeLength( code );
			setScript( code );
			callback();
		});
	}

	function trackCodeLength (code) {
		var lineCount = code.split(/\r?\n/).length;
		ga('send', 'event', 'performance', 'characters', 'count', code.length);
		ga('send', 'event', 'performance', 'lines', 'count', lineCount);

		var sizeClass = "";
		if (lineCount < 500) { sizeClass = "0 - 500"; }
		else if (lineCount < 1000) { sizeClass = "500+"; }
		else if (lineCount < 2000) { sizeClass = "1000+"; }
		else if (lineCount < 5000) { sizeClass = "2000+"; }
		else if (lineCount < 10000) { sizeClass = "5000+"; }
		else { sizeClass = "10k+"; }
		ga( 'send', 'event', 'performance', 'codesize', sizeClass );
	}

	this.loadItems = function (callback) {
		loadItems( this.urlArgs, function (items) {
			PoEdit.itemsDefinition = items;
			PoEdit.items = createItems( PoEdit.itemsDefinition );
			drawItems( PoEdit.items );
			callback();
		});
	}

	this.init = function() {
		if (UrlUtils.isSSL() && (this.urlArgs.hasCodePastebin() || this.urlArgs.hasItemsPastebin())) {
			alert("Due to technical restrictions, we cannot load data from Pastebin " +
			      "while browing with https. Redirecting to plain http now. " +
				  "If this message keeps popping up, please make sure to disable any browser " +
				  "extensions that redirect you back to https.");
			UrlUtils.redirectToProtocol( 'http' );
			return;
		}

		// must do this before loading the script
		this.editor = createCodeEditor();

		addAsyncInitStep( 'LoadScript', function(cb) { PoEdit.loadScript( cb ); } );
		addAsyncInitStep( 'LoadItems', function(cb) { PoEdit.loadItems( cb ); } );
		runAsyncInitSteps();
	}

	this.onInitStepComplete = function() {
		// This method is called after each completed async init step.
		// As long as there are still other init steps running, we abort here.
		if (!allInitStepsComplete()) {
			return;
		}

		this.itemsEditor.init();
		this.itemDetails.init();
		this.addItemDialog.init();

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
		document.addEventListener( 'keydown', onKeyDown_Global, true );
		document.addEventListener( 'keyup', onKeyUp_Global, true );
		document.getElementById( 'additem-ok-button' ).addEventListener( 'click', onAddItemOk );
		document.getElementById( 'additem-cancel-button' ).addEventListener( 'click', onAddItemCancel );
	}

	this.update = function() {
		// don't do expensive update if nothing has changed
		if (!this.dirty) {
			return;
		}
		this.dirty = false;

		var startTime = performance.now();
		var code = getCode();

		// Save code changes only if not in Pastebin mode
		if (!this.urlArgs.hasCodePastebin()) {
			StorageUtils.save( 'poedit-code', code );
		}

		var rawLines = code.split( '\n' );
		normalizeWhitespace( rawLines );
		this.parser.parse( rawLines );

		var log = document.getElementById( 'log-window' );
		var logText = this.parser.errors.concat( this.parser.warnings ).join( '\n' );
		DomUtils.setText( log, logText );

		updateItems();
		this.itemDetails.update();

		console.log("update took " + (performance.now() - startTime) + " ms");
	}

	function normalizeWhitespace( lines ) {
		for (var i=0; i < lines.length; i++) {
			// Replace all special Unicode whitespace with regular spaces
			lines[i] = lines[i].replace(/\s/g, ' ');
		}
	}
};
