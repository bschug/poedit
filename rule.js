
function Rule (visibility) {
	this.show = visibility;
	this.filters = [];
	this.modifiers = [];
	this.codeLines = [];
	
	this.match = function (item) {
		return this.filters.every( function (filter) { return filter.match( item ); } );
	}
	
	this.applyTo = function (item) {
		item.setVisibility( this.show );
		this.modifiers.forEach( function (modifier) { modifier.applyTo( item ); } );
	}
}


// -------------------- Filters ---------------------

function ItemLevelFilter (comparer, itemLevel) {
	this.match = function (item) {
		return comparer( item.itemLevel, itemLevel );
	};
}

function DropLevelFilter (comparer, dropLevel) {
	this.match = function (item) {
		return comparer( item.dropLevel, dropLevel );
	};
}

function QualityFilter (comparer, quality) {
	this.match = function (item) {
		return comparer( item.quality, quality );
	};
}

// Rarity uses integer representation
function RarityFilter (comparer, rarity) {
	this.match = function (item) {
		return comparer( item.rarity, rarity );
	};
}

function ClassFilter (itemClasses) {
	this.match = function (item) {
		return itemClasses.some( function (cls) { return StrUtils.contains( cls, item.itemClass ); } );
	};
}

function BaseTypeFilter (baseTypes) {
	this.match = function (item) {
		return baseTypes.some( function (bt) { return StrUtils.contains( bt, item.baseType ); } );
	};
}

function SocketsFilter (comparer, numSockets) {
	this.match = function (item) {
		return comparer( item.getNumSockets(), numSockets );
	};
}

function LinkedSocketsFilter (comparer, numLinkedSockets) {
	this.match = function (item) {
		var largestSocketGroup = item.sockets
			.map( function (grp) { return grp.length; } )
			.reduce( Math.max, 0 );
		
		return comparer( largestSocketGroup, numLinkedSockets );
	};
}

function SocketGroupFilter (group) {
	this.match = function (item) {
		return item.sockets.some( function (grp) { 
			return StrUtils.contains( group, StrUtils.sortChars( grp ) ); 
		} );
	}
}
			
// ------------------------ Modifiers --------------------------------------
			
function SetBackgroundColorModifier (color) {
	this.applyTo = function (item) {
		item.setBackgroundColor( color );
	}
}
			
function SetBorderColorModifier (color) {
	this.applyTo = function (item) {
		item.setBorderColor( color );
	}
}

function SetTextColorModifier (color) {
	this.applyTo = function (item) {
		item.setTextColor( color );
	}
}

function PlayAlertSoundModifier (soundId) {
	this.applyTo = function (item) {
		// not implemented
	}
}
			
			
			
			
			
			
			
