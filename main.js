var PoEdit = new function() 
{
	var defaultItems = [
		{ 
			name: 'Full Plate', 
			itemLevel: 66,
			dropLevel: 28,
			quality: 8,
			rarity: Rarity.Normal,
			itemClass: 'Body Armour',
			sockets: ['RRRRRR']
		},
		{ 
			name: 'Heavy Strike (Level 12)', 
			itemLevel: 43,
			dropLevel: 1,
			quality: 12,
			itemClass: 'Gem',
			rarity: Rarity.Normal,
			sockets: []
		},
		{ 
			name: 'Armourer\'s Scrap', 
			itemLevel: 53,
			dropLevel: 1,
			quality: 0,
			itemClass: 'Currency',
			rarity: Rarity.Normal,
			sockets: []
		},
		{ 
			name: 'Orb of Alchemy', 
			itemLevel: 17,
			dropLevel: 1,
			quality: 0,
			itemClass: 'Currency',
			rarity: Rarity.Normal,
			sockets: []
		},
		{ 
			name: 'Orb of Augmentation', 
			itemLevel: 29,
			dropLevel: 1,
			quality: 0,
			itemClass: 'Currency',
			rarity: Rarity.Normal,
			sockets: []
		},
		{ 
			name: 'Chromatic Orb', 
			itemLevel: 9,
			dropLevel: 1,
			quality: 0,
			itemClass: 'Currency',
			rarity: Rarity.Normal,
			sockets: []
		},
		{ 
			name: 'Rusted Sword', 
			itemLevel: 9,
			dropLevel: 1,
			quality: 0,
			itemClass: 'One Hand Sword',
			rarity: Rarity.Rare,
			sockets: ['B', 'G']
		},
		{ 
			name: 'Summon Chaos Golem', 
			itemLevel: 68,
			dropLevel: 30,
			quality: 0,
			itemClass: 'Gem',
			rarity: Rarity.Normal,
			sockets: []
		},
		{ 
			name: 'Added Fire Damage (Level 10)', 
			itemLevel: 54,
			dropLevel: 12,
			quality: 0,
			itemClass: 'Gem',
			rarity: Rarity.Normal,
			sockets: []
		},
		{ 
			name: 'Exalted Orb', 
			itemLevel: 67,
			dropLevel: 1,
			quality: 0,
			itemClass: 'Currency',
			rarity: Rarity.Normal,
			sockets: []
		},
	];
	
	function applyDefaultStyle (item) {
		var BLACK = {r:0, g:0, b:0};
		var WHITE = {r:255, g:255, b:255};
		var BLUE = {r:50, g:50, b:220};
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

	function createItems() {
		var items = [];
		defaultItems.forEach( function(item) {
			items.push( new Item(item) );
		});
		return items;
	}

	function drawItems (items) {
		items.forEach( function(item) {
			item.draw();
			applyDefaultStyle( item );
		});
	}
	
	function getCode() {
		var codeWindow = document.getElementById( 'code-window' );
		return codeWindow.innerText;
	}
	
	function clearLog() {
		var logWindow = document.getElementById( 'log-window' );
		logWindow.innerText = '';
	}
	
	function addErrorMessage (message) {
		var logWindow = document.getElementById( 'log-window' );
		logWindow.innerText += '\n' + message;
	}

	this.parser = new Parser();

	this.init = function() {
		this.items = createItems();
		drawItems( this.items );
		
		var self = this;
		setInterval( function() { self.update(); }, 1000 );
	}
	
	this.update = function() {
		this.parser.parse( getCode() );
		
		clearLog();
		this.parser.errors.forEach( addErrorMessage );
		
		this.items.forEach( function(item) {
			if (this.parser.ruleSet.length == 0) {
				applyDefaultStyle( item );
			}
		
			for (var i=0; i < this.parser.ruleSet.length; i++) {
				var rule = this.parser.ruleSet[i];
				if (rule.match( item )) {
					rule.applyTo( item );
					break;
				}
			}
		}, this );
	}
	
};
