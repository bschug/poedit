
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
			.reduce( function (prev, cur) { return Math.max(prev, cur); }, 0 );

		return comparer( largestSocketGroup, numLinkedSockets );
	};
}

function SocketGroupFilter (groups) {
	this.minSocketCounts = groups.map( StrUtils.countChars );

	function isSubsetOf (subsetCounts, containerCounts) {
		for (var s in containerCounts) {
			if (!(s in subsetCounts)) {
				return false;
			}
			if (subsetCounts[s] < containerCounts[s]) {
				return false;
			}
		}
		return true;
	}

	function matchSocketGroups (grp, refGroups) {
		var socketCounts = StrUtils.countChars( grp );
		return refGroups.some( function (refGrp) {
			return isSubsetOf( socketCounts, refGrp );
		} );
	}

	this.match = function (item) {
		return item.sockets.some( function (grp) {
			return matchSocketGroups( grp, this.minSocketCounts );
		}, this );
	}
}

function WidthFilter (comparer, width) {
	this.match = function (item) {
		return comparer( item.width, width );
	}
}

function HeightFilter (comparer, height) {
	this.match = function (item) {
		return comparer( item.height, height );
	}
}

function IdentifiedFilter (value) {
	this.match = function(item) {
		return item.identified === value;
	}
}

function CorruptedFilter (value) {
	this.match = function(item) {
		return item.corrupted === value;
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

function PlayAlertSoundModifier (soundId, volume) {
	this.applyTo = function (item) {
		// not implemented
	}
}

function PlayAlertSoundPositionalModifier (soundId, volume) {
	this.applyTo = function (item) {
		// not implemented
	}
}

function SetFontSizeModifier (fontSize) {
	this.applyTo = function (item) {
		item.setFontSize( MathUtils.clamp(fontSize, 18, 45) );
	}
}
