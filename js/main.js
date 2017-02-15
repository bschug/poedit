var PoEdit = new function()
{
	function createCodeEditor() {
		var codeWindow = document.getElementById('code-window');
		var editor = CodeMirror.fromTextArea( codeWindow, {
			mode:{ name:'poe', autoIndent: PoEdit.getAutoIndentEnabled() },
			theme: PoEdit.getCurrentColorScheme().theme,
			lineWrapping:true,
			lineNumbers: PoEdit.getLineNumbersEnabled()
		});
		editor.on('change', function() {
			PoEdit.dirty = true;
			showHintWhenTyping();
			indentIfNonEmptyLine();
		} );

		editor.setOption('extraKeys', {
			"Shift-Ctrl-C": function(editor) {
				editor.toggleComment();
			},
			"Ctrl-Space": function(editor) {
				showHint(true);
			},
			"Ctrl-Up": function(editor) {
				moveLines("up");
			},
			"Ctrl-Down": function(editor) {
				moveLines("down");
			}
		});
		editor.setOption('continueComments', true);

		return editor;
	}

	function showHintWhenTyping() {
		var cursor = PoEdit.editor.getCursor();
		if (PoEdit.editor.getLine(cursor.line).trim().length === 0) {
			return;
		}
		if (PoEdit.editor.getLine(cursor.line).length > cursor.ch) {
			return;
		}
		showHint(false);
	}

	function showHint(completeSingle) {
		PoEdit.editor.showHint( {
			completeSingle: completeSingle,
			customKeys: {
				Space: function(cm,handle) {
					handle.pick(cm);
					cm.replaceSelection(' ');
				},
				Enter: function(cm,handle) {
					handle.pick(cm);
					cm.replaceSelection(' ');
				},
				Tab: function(cm,handle) {
					handle.pick(cm);
					cm.replaceSelection(' ');
				}
			}
		} );
	}

	function indentIfNonEmptyLine() {
		if (PoEdit.getAutoIndentEnabled()) {
			var lineNr = PoEdit.editor.getCursor().line;
			var line = PoEdit.editor.getLine(lineNr);
			if (line.trim().length > 0) {
				PoEdit.editor.indentLine( lineNr, 'smart' );
			}
		}
	}

	// taken from https://groups.google.com/forum/#!topic/codemirror/NvQGVEq30lU
	function moveLines(dir) {
		var cM, lineStart, lineEnd, swapLineNo, swapLine;

		cM = PoEdit.editor;

		// Get start & end lines plus the line we'll swap with
		lineStart = cM.getCursor('start');
		lineEnd = cM.getCursor('end');
		if (dir == "up" && lineStart.line > 0) {swapLineNo = lineStart.line-1}
		if (dir == "down" && lineEnd.line < cM.lineCount() - 1) {swapLineNo = lineEnd.line+1}

		// If we have a line to swap with
		if (!isNaN(swapLineNo)) {
	    	// Get the content of the swap line and carry out the swap in a single operation
	    	swapLine = cM.getLine(swapLineNo);
	    	cM.operation(function() {
			    // Move lines in turn up
			    if (dir=="up") {
					for (var i=lineStart.line; i<=lineEnd.line; i++) {
						cM.replaceRange( cM.getLine(i), {line:i-1,ch:0}, {line:i-1,ch:1000000} );
					}
			    // ...or down
			    } else {
					for (var i=lineEnd.line; i>=lineStart.line; i--) {
						cM.replaceRange( cM.getLine(i), {line:i+1,ch:0}, {line:i+1,ch:1000000} );
					}
			    }
			    // Now swap our final line with the swap line to complete the move
			    cM.replaceRange(swapLine,
					{line: dir=="up" ? lineEnd.line : lineStart.line, ch: 0},
					{line: dir=="up" ? lineEnd.line : lineStart.line, ch:1000000}
				);
			    // Finally set the moved selection
			    cM.setSelection(
			    	{line: lineStart.line+(dir=="up" ? -1 : 1), ch: lineStart.ch},
			    	{line: lineEnd.line+(dir=="up" ? -1 : 1), ch: lineEnd.ch}
			    );
	   		});
		}
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
		item.setFontSize( 32 );

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

		saveItems( PoEdit.itemsDefinition );
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
		}
		PoEdit.itemDetails.item = item;
		PoEdit.dirty = true;
	}

	function hideItemDetails() {
		PoEdit.highlightLines( [] );
		PoEdit.itemDetails.item = null;
		PoEdit.dirty = true;
	}

	function getCode() {
		return PoEdit.editor.getValue();
	}

	function onKeyDown_Global (event) {
		var code = EventUtils.getKeyCode( event );

		// Alt
		if (code === 18) {
			event.preventDefault();
			PoEdit.showHiddenItems = true;
			updateItems();
		}

		// Ctrl-I
		if (code === 73 && event.ctrlKey) {
			event.preventDefault();
			onAddItemButton();
		}
	}

	function onKeyUp_Global (event) {
		var code = EventUtils.getKeyCode( event );

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

	function setItems (itemsDefinition, saveToLocalStorage) {
		if (saveToLocalStorage === undefined)
			saveToLocalStorage = true;

		// Store the new items definition
		PoEdit.itemsDefinition = itemsDefinition;
		PoEdit.items = createItems( itemsDefinition );

		// Redraw all items
		DomUtils.removeAllChildren( document.getElementById( 'items-area' ) );
		drawItems( PoEdit.items );

		PoEdit.dirty = true;
		this.innerHTML = 'Edit';

		if (saveToLocalStorage) {
			saveItems( itemsDefinition );
		}
	}

	this.setItems = setItems;

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

	function onSettingsButton() {
		PoEdit.settingsDialog.show();
		ga('send', 'event', 'settings');
	}

	function onFeedbackButton() {
		ga('send', 'event', 'feedback');
		window.location = 'https://www.reddit.com/message/compose/?to=bschug';
	}

	var AVAILABLE_COLOR_SCHEMES = [
		{ name:'Dark/subtle', theme:'bschug' },
		{ name:'Dark/contrast', theme:'rubyblue' },
		{ name:'Light/subtle', theme:'elegant' },
		{ name:'Light/contrast', theme:'neat' },
		{ name:'Solarized', theme:'solarized' }
	];
	this.getAvailableColorSchemes = function() {
		return AVAILABLE_COLOR_SCHEMES;
	}
	this.getColorSchemeByName = function(name) {
		return AVAILABLE_COLOR_SCHEMES.filter( function(x) { return x.name === name; } )[0];
	}
	this.getCurrentColorScheme = function() {
		if (!('currentColorScheme' in PoEdit)) {
			var name = StorageUtils.load('colorScheme', AVAILABLE_COLOR_SCHEMES[0].name);
			var colorScheme = this.getColorSchemeByName( name );
			PoEdit.currentColorScheme = colorScheme ? colorScheme : AVAILABLE_COLOR_SCHEMES[0];
			ga('set', 'dimension1', colorScheme.name);
		}
		return PoEdit.currentColorScheme;
	}
	this.setCurrentColorScheme = function(colorScheme) {
		PoEdit.editor.setOption('theme', colorScheme.theme);
		StorageUtils.save('colorScheme', colorScheme.name);
		ga('set', 'dimension1', colorScheme.name);
	}

	this.getAutoIndentEnabled = function() {
		if (!('autoIndentEnabled' in PoEdit)) {
			PoEdit.autoIndentEnabled = StorageUtils.load('autoIndent', 'true') == 'true';
			ga('set', 'dimension2', PoEdit.autoIndentEnabled);
		}
		return PoEdit.autoIndentEnabled;
	}
	this.setAutoIndentEnabled = function(value) {
		PoEdit.editor.setOption('mode', { name:'poe', autoIndent:value });
		PoEdit.autoIndentEnabled = value;
		StorageUtils.save('autoIndent', value);
		ga('set', 'dimension2', value);
	}

	this.getLineNumbersEnabled = function() {
		if (!('lineNumbersEnabled' in PoEdit)) {
			PoEdit.lineNumbersEnabled = StorageUtils.load('lineNumbers', 'true') == 'true';
			ga('set', 'dimension3', PoEdit.lineNumbersEnabled);
		}
		return PoEdit.lineNumbersEnabled;
	}
	this.setLineNumbersEnabled = function(value) {
		PoEdit.editor.setOption('lineNumbers', value);
		PoEdit.lineNumbersEnabled = value;
		StorageUtils.save('lineNumbers', value);
		ga('set', 'dimension3', value);
	}

	this.getAvailableItemSets = function() {
		return [
			{ name:'Custom', id:'custom' },
			{ name:'Default', id:'default' },
			{ name:'Maps', id:'maps' }
		];
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
	this.settingsDialog = new SettingsDialog();

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
		this.settingsDialog.init();

		var self = this;
		if (MANUAL_UPDATE) {
			var button = document.getElementById( 'manual-update-button' );
			button.style.display = 'block';
			button.addEventListener('click', function() { self.update(); });
		}
		else {
			setInterval( function() { self.update(); }, 250 );
		}

		document.getElementById( 'settings-button' ).addEventListener( 'click', onSettingsButton );
		document.getElementById( 'feedback-button' ).addEventListener( 'click', onFeedbackButton );
		document.getElementById( 'help-button' ).addEventListener( 'click', onHelpButton );
		document.getElementById( 'reset-button' ).addEventListener( 'click', onResetButton );
		document.getElementById( 'items-edit-button' ).addEventListener( 'click', onItemsEditButton );
		document.addEventListener( 'keydown', onKeyDown_Global, true );
		document.addEventListener( 'keyup', onKeyUp_Global, true );
		document.getElementById( 'additem-ok-button' ).addEventListener( 'click', onAddItemOk );
		document.getElementById( 'additem-cancel-button' ).addEventListener( 'click', onAddItemCancel );

		this.addItemDialog.onPressEnter = onAddItemOk;
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
