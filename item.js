var Rarity = {
	Normal: 0,
	Magic: 1,
	Rare: 2,
	Unique: 3,

	getName: function (i) {
		switch (i) {
			case 0: return "Normal";
			case 1: return "Magic";
			case 2: return "Rare";
			case 3: return "Unique";
		}
	}
};

function ItemData() {
	this.name = '';

	this.itemLevel = 0;
	this.dropLevel = 0;

	this.quality = 0;
	this.rarity = Rarity.Normal;

	this.itemClass = '';
	this.baseType = '';

	// Sockets are stored as an array of linked socket groups.
	// An item with a single red socket and linked red and blue sockets (R R=B)
	// would store ['R','RB'] here.
	this.sockets = [];

	return this;
}

function Item (itemdata)
{
	this.name = itemdata.name;

	this.itemLevel = itemdata.itemLevel;
	this.dropLevel = itemdata.dropLevel;

	this.quality = itemdata.quality;
	this.rarity = itemdata.rarity;

	this.itemClass = itemdata.itemClass;
	this.baseType = itemdata.baseType;

	this.sockets = itemdata.sockets;

	this.domElement = null;
	this.matchingRule = null;

	this.getDisplayName = function() {
		if (this.quality > 0) {
			return 'Superior ' + this.name;
		}
		else {
			return this.name;
		}
	}

	this.getNumSockets = function() {
		var num = 0;
		this.sockets.forEach( function(group) {
			num += group.length;
		});
		return num;
	}

	this.draw = function() {
		var itemDiv = document.createElement( 'div' );
		itemDiv.className = 'item';

		var itemName = document.createElement( 'span' );
		itemName.innerHTML = this.getDisplayName();
		itemDiv.appendChild( itemName );

		if (this.getNumSockets() > 0) {
			itemDiv.appendChild( drawSockets(this) );
		}

		var itemsArea = document.getElementById( 'items-area' );
		itemsArea.appendChild( itemDiv );

		var self = this;
		itemDiv.addEventListener('mouseover', function() {
			if (self.onMouseOver !== null) {
				self.onMouseOver( self );
			}
		});
		itemDiv.addEventListener('mouseout', function() {
			if (self.onMouseOut !== null) {
				self.onMouseOut( self );
			}
		});

		this.domElement = itemDiv;
	}

	this.setVisibility = function (visibility) {
		this.domElement.style.visibility = (visibility ? 'visible' : 'hidden');
	}

	this.setTextColor = function (color) {
		getLabel( this ).style.color = buildColor( color.r, color.g, color.b );
	}

	this.removeBorder = function() {
		this.domElement.style.border = '';
	}

	this.setBorderColor = function (color) {
		this.domElement.style.border = '1px solid ' + buildColor( color.r, color.g, color.b );
	}

	this.setBackgroundColor = function (color) {
		this.domElement.style.backgroundColor = buildColorA( color.r, color.g, color.b, 0.75 );
	}

	function buildColor (r, g, b) {
		return 'rgb(' + r.toString() + ',' + g.toString() + ',' + b.toString() + ')';
	}

	function buildColorA (r, g, b, a) {
		return 'rgba(' + r.toString() + ',' + g.toString() + ',' + b.toString() + ',' + a.toString() + ')';
	}

	function getLabel (self) {
		for (var i=0; i < self.domElement.children.length; i++) {
			var child = self.domElement.children[i];
			if (child.tagName.toLowerCase() === 'span') {
				return child;
			}
		}
		return null;
	}

	function computeSocketPadding (numSockets) {

		// The height values as computed by the formula below:
		//	1: 4,
		//	2: 4,
		//	3: 10,
		//	4: 10,
		//	5: 16,
		//	6: 16

		var width = ( numSockets == 1 ) ? 4 : 10;
		var height = ( Math.ceil( numSockets / 2 ) - 1 ) * 6 + 4;

		var result = {};
		result.x = 2 + ( 10 - width ) / 2;
		result.y = 2 + ( 16 - height ) / 2;
		return result;
	}

	function drawSocket (socketColor) {
		var socket = document.createElement( 'div' );
		socket.className = 'socket';

		switch (socketColor) {
			case 'R':
				socket.style.backgroundColor = '#ff0000';
				break;
			case 'G':
				socket.style.backgroundColor = '#80ff33';
				break;
			case 'B':
				socket.style.backgroundColor = '#4444ff';
				break;
		}

		return socket;
	}

	function drawLink (x, y, padding) {
		var link = document.createElement( 'div' );

		// Doesn't have to be efficient, this is only run once during startup.
		var xy = x.toString() + '/' + y.toString();
		switch (xy) {
			// case '0/0' is not possible because link is created at the second socket!
			case '1/0':
			case '0/1':
			case '1/2':
				link.className = 'link-horizontal';
				link.style.left = (3 + padding.x).toString() + 'px';
				link.style.top = ((y * 6) + 1 + padding.y).toString() + 'px';
				break;
			case '1/1':
			case '0/2':
				link.className = 'link-vertical';
				link.style.left = ((x * 6) + 1 + padding.x).toString() + 'px';
				link.style.top = (((y-1) * 6) + 3 + padding.y).toString() + 'px';
				break;
		}

		return link;
	}

	function incrementSocketPos (x, y) {
		// x0 y0 -> x+1
		// x1 y0 -> y+1
		// x1 y1 -> x-1
		// x0 y1 -> y+1
		// x0 y2 -> x+1

		var xdir = (y % 2 == 1) ? -1 : 1;
		var xstop = (y % 2 == 1) ? 0 : 1;

		if (x != xstop) {
			x += xdir;
		}
		else {
			y += 1;
		}

		return { x:x, y:y };
	}

	function drawSockets (item) {
		var socketsDiv = document.createElement( 'div' );
		socketsDiv.className = 'sockets';

		var padding = computeSocketPadding( item.getNumSockets() );

		var x = 0;
		var y = 0;
		var linked = false;

		item.sockets.forEach( function(group) {
			linked = false;
			var chars = group.split( '' );
			chars.forEach( function(socketColor) {
				var socket = drawSocket( socketColor );
				socket.style.left = (padding.x + (x * 6)).toString() + 'px';
				socket.style.top = (padding.y + (y * 6)).toString() + 'px';
				socketsDiv.appendChild( socket );

				if (linked) {
					var link = drawLink( x, y, padding );
					socketsDiv.appendChild( link );
				}

				newXY = incrementSocketPos( x, y );
				x = newXY.x;
				y = newXY.y;

				linked = true;
			});
		});

		return socketsDiv;
	}
};
