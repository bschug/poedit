function getDefaultItems() {
    var weapons = [
        {
    		name: 'Rusted Sword',
    		itemLevel: 9,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'One Hand Sword',
    		baseType: 'Rusted Sword',
    		rarity: Rarity.Rare,
    		sockets: ['B', 'G']
    	},
        {
    		name: 'Great White Claw',
    		itemLevel: 62,
    		dropLevel: 58,
    		quality: 8,
    		itemClass: 'Claw',
    		baseType: 'Great White Claw',
    		rarity: Rarity.Magic,
    		sockets: ['R','GG']
    	},
        {
    		name: 'Highland Blade',
    		itemLevel: 54,
    		dropLevel: 44,
    		quality: 0,
    		itemClass: 'Two Hand Sword',
    		baseType: 'Highland Blade',
    		rarity: Rarity.Magic,
    		sockets: ['RRGRR']
    	},
        {
    		name: 'Imperial Staff',
    		itemLevel: 66,
    		dropLevel: 66,
    		quality: 0,
    		itemClass: 'Staff',
    		baseType: 'Imperial Staff',
    		rarity: Rarity.Unique,
    		sockets: ['B']
    	},
    	{
    		name: 'Royal Bow',
    		itemLevel: 69,
    		dropLevel: 28,
    		quality: 0,
    		itemClass: 'Bow',
    		baseType: 'Royal Bow',
    		rarity: Rarity.Rare,
    		sockets: ['G','GG','B']
    	},
    	{
    		name: 'Royal Bow',
    		itemLevel: 41,
    		dropLevel: 28,
    		quality: 0,
    		itemClass: 'Bow',
    		baseType: 'Royal Bow',
    		rarity: Rarity.Rare,
    		sockets: ['R','GG','R']
    	},
    	{
    		name: 'Rusted Spike',
    		itemLevel: 3,
    		dropLevel: 3,
    		quality: 0,
    		itemClass: 'One Hand Sword',
    		baseType: 'Rusted Spike',
    		rarity: Rarity.Normal,
    		sockets: ['G']
    	},
    	{
    		name: 'Rusted Spike',
    		itemLevel: 38,
    		dropLevel: 3,
    		quality: 0,
    		itemClass: 'One Hand Sword',
    		baseType: 'Rusted Spike',
    		rarity: Rarity.Normal,
    		sockets: ['GG','R']
    	},
    	{
    		name: 'Basket Rapier',
    		itemLevel: 19,
    		dropLevel: 17,
    		quality: 0,
    		itemClass: 'One Hand Sword',
    		baseType: 'Basket Rapier',
    		rarity: Rarity.Magic,
    		sockets: ['GG']
    	},
    	{
    		name: 'Karui Chopper',
    		itemLevel: 62,
    		dropLevel: 58,
    		quality: 0,
    		itemClass: 'Two Hand Mace',
    		baseType: 'Karui Chopper',
    		rarity: Rarity.Magic,
    		sockets: ['RRR','B']
    	},
    	{
    		name: 'Stone Hammer',
    		itemLevel: 38,
    		dropLevel: 15,
    		quality: 0,
    		itemClass: 'One Hand Mace',
    		baseType: 'Stone Hammer',
    		rarity: Rarity.Normal,
    		sockets: ['R']
    	},
    	{
    		name: 'Rock Breaker',
    		itemLevel: 73,
    		dropLevel: 41,
    		quality: 0,
    		itemClass: 'One Hand Mace',
    		baseType: 'Rock Breaker',
    		rarity: Rarity.Magic,
    		sockets: ['G']
    	},
    	{
    		name: 'Gavel',
    		itemLevel: 66,
    		dropLevel: 60,
    		quality: 0,
    		itemClass: 'One Hand Mace',
    		baseType: 'Gavel',
    		rarity: Rarity.Normal,
    		sockets: ['R']
    	},
        {
    		name: 'Midnight Blade',
    		itemLevel: 71,
    		dropLevel: 68,
    		quality: 0,
    		itemClass: 'One Hand Sword',
    		baseType: 'Midnight Blade',
    		rarity: Rarity.Rare,
    		sockets: ['B','G']
    	},

    ];

    var armor = [
        {
    		name: 'Full Plate',
    		itemLevel: 66,
    		dropLevel: 28,
    		quality: 8,
    		rarity: Rarity.Normal,
    		itemClass: 'Body Armour',
    		baseType: 'Full Plate',
    		sockets: ['RRRRRR']
    	},
        {
    		name: 'Occultist\'s Vestment',
    		itemLevel: 67,
    		dropLevel: 57,
    		quality: 0,
    		itemClass: 'Body Armour',
    		baseType: 'Occultist\'s Vestment',
    		rarity: Rarity.Normal,
    		sockets: ['RB','GBB','B']
    	},
    	{
    		name: 'Iron Hat',
    		itemLevel: 78,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Helmet',
    		baseType: 'Iron Hat',
    		rarity: Rarity.Normal,
    		sockets: ['B']
    	},
    	{
    		name: 'Leather Cap',
    		itemLevel: 23,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Helmet',
    		baseType: 'Leather Cap',
    		rarity: Rarity.Normal,
    		sockets: ['RGB','G']
    	},
    	{
    		name: 'Crusader Plate',
    		itemLevel: 69,
    		dropLevel: 59,
    		quality: 0,
    		itemClass: 'Body Armor',
    		baseType: 'Crusader Plate',
    		rarity: Rarity.Unique,
    		sockets: ['RR','RR']
    	},
    	{
    		name: 'Simple Robe',
    		itemLevel: 68,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Body Armor',
    		baseType: 'Simple Robe',
    		rarity: Rarity.Unique,
    		sockets: ['WWWWWW']
    	},
    	{
    		name: 'Holy Chainmail',
    		itemLevel: 66,
    		dropLevel: 35,
    		quality: 0,
    		itemClass: 'Body Armor',
    		baseType: 'Holy Chainmail',
    		rarity: Rarity.Unique,
    		sockets: ['R','B']
    	},
        {
    		name: 'Vaal Regalia',
    		itemLevel: 72,
    		dropLevel: 68,
    		quality: 0,
    		itemClass: 'Body Armor',
    		baseType: 'Vaal Regalia',
    		rarity: Rarity.Rare,
    		sockets: ['B','B']
    	},
        {
    		name: 'Sacrificial Garb',
    		itemLevel: 77,
    		dropLevel: 72,
    		quality: 0,
    		itemClass: 'Body Armor',
    		baseType: 'Sacrificial Garb',
    		rarity: Rarity.Normal,
    		sockets: ['RRB','G']
    	},
    ];

    var jewelry = [
        {
    		name: 'Jade Amulet',
    		itemLevel: 44,
    		dropLevel: 7,
    		quality: 0,
    		itemClass: 'Amulet',
    		baseType: 'Jade Amulet',
    		rarity: Rarity.Magic,
    		sockets: []
    	},
    	{
    		name: 'Coral Amulet',
    		itemLevel: 8,
    		dropLevel: 2,
    		quality: 0,
    		itemClass: 'Amulet',
    		baseType: 'Coral Amulet',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
    	{
    		name: 'Leather Belt',
    		itemLevel: 72,
    		dropLevel: 10,
    		quality: 0,
    		itemClass: 'Belt',
    		baseType: 'Leather Belt',
    		rarity: Rarity.Rare,
    		sockets: []
    	},
        {
    		name: 'Coral Ring',
    		itemLevel: 78,
    		dropLevel: 2,
    		quality: 0,
    		itemClass: 'Ring',
    		baseType: 'Coral Ring',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Unset Ring',
    		itemLevel: 53,
    		dropLevel: 45,
    		quality: 0,
    		itemClass: 'Ring',
    		baseType: 'Unset Ring',
    		rarity: Rarity.Rare,
    		sockets: []
    	},
    ];

    var gems = [
        {
    		name: 'Heavy Strike (Level 12)',
    		itemLevel: 43,
    		dropLevel: 1,
    		quality: 12,
    		rarity: Rarity.Normal,
    		itemClass: 'Gem',
    		baseType: 'Heavy Strike',
    		sockets: []
    	},
        {
    		name: 'Summon Chaos Golem',
    		itemLevel: 68,
    		dropLevel: 30,
    		quality: 0,
    		itemClass: 'Gem',
    		baseType: 'Summon Chaos Golem',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
    	{
    		name: 'Added Fire Damage (Level 10)',
    		itemLevel: 54,
    		dropLevel: 12,
    		quality: 0,
    		itemClass: 'Gem',
    		baseType: 'Added Fire Damage',
    		rarity: Rarity.Normal,
    		sockets: []
    	},

    ];

    var currency = [
        {
    		name: 'Scroll of Wisdom',
    		itemLevel: 75,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Scroll of Wisdom',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
    	{
    		name: 'Portal Scroll',
    		itemLevel: 5,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Portal Scroll',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Armourer\'s Scrap',
    		itemLevel: 53,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Armourer\'s Scrap',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Blacksmith\'s Whetstone',
    		itemLevel: 53,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Blacksmith\'s Whetstone',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
    	{
    		name: 'Orb of Alchemy',
    		itemLevel: 17,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Orb of Alchemy',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Orb of Augmentation',
    		itemLevel: 29,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Orb of Augmentation',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Orb of Alteration',
    		itemLevel: 71,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Orb of Alteration',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Orb of Chance',
    		itemLevel: 9,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Orb of Chance',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Orb of Fusing',
    		itemLevel: 47,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Orb of Fusing',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Orb of Transmutation',
    		itemLevel: 13,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Orb of Transmutation',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Regal Orb',
    		itemLevel: 29,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Regal Orb',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
    	{
    		name: 'Chromatic Orb',
    		itemLevel: 9,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Chromatic Orb',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Chaos Orb',
    		itemLevel: 35,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Chaos Orb',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Glassblower\'s Bauble',
    		itemLevel: 9,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Glassblower\'s Bauble',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Gemcutter\'s Prism',
    		itemLevel: 13,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Gemcutter\'s Prism',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Jeweller\'s Orb',
    		itemLevel: 13,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Jeweller\'s Orb',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Cartographer\'s Chisel',
    		itemLevel: 62,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Cartographer\'s Chisel',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Divine Orb',
    		itemLevel: 49,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Divine Orb',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Blessed Orb',
    		itemLevel: 41,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Blessed Orb',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Regal Orb',
    		itemLevel: 71,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Regal Orb',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Vaal Orb',
    		itemLevel: 9,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Vaal Orb',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Orb of Regret',
    		itemLevel: 22,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Orb of Regret',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Orb of Scouring',
    		itemLevel: 78,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Orb of Scouring',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Exalted Orb',
    		itemLevel: 67,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Exalted Orb',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Mirror of Kalandra',
    		itemLevel: 77,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Currency',
    		baseType: 'Mirror of Kalandra',
    		rarity: Rarity.Normal,
    		sockets: []
    	},

    ];

    var maps = [
        {
    		name: 'Crypt Map',
    		itemLevel: 67,
    		dropLevel: 66,
    		quality: 0,
    		itemClass: 'Map',
    		baseType: 'Crypt Map',
    		rarity: Rarity.Unique,
    		sockets: []
    	},
        {
    		name: 'Tropical Island Map',
    		itemLevel: 67,
    		dropLevel: 66,
    		quality: 0,
    		itemClass: 'Map',
    		baseType: 'Tropical Island Map',
    		rarity: Rarity.Magic,
    		sockets: []
    	},
    	{
    		name: 'Torture Chamber Map',
    		itemLevel: 72,
    		dropLevel: 72,
    		quality: 0,
    		itemClass: 'Map',
    		baseType: 'Torture Chamber Map',
    		rarity: Rarity.Normal,
    		sockets: []
    	},

    ];

    var jewels = [
        {
    		name: 'Crimson Jewel',
    		itemLevel: 20,
    		dropLevel: 12,
    		quality: 0,
    		itemClass: 'Jewel',
    		baseType: 'Crimson Jewel',
    		rarity: Rarity.Magic,
    		sockets: []
    	},
    	{
    		name: 'Viridian Jewel',
    		itemLevel: 72,
    		dropLevel: 61,
    		quality: 0,
    		itemClass: 'Jewel',
    		baseType: 'Viridian Jewel',
    		rarity: Rarity.Unique,
    		sockets: []
    	},

    ];

    var flasks = [
        {
            name: 'Grand Life Flask',
            itemLevel: 31,
            dropLevel: 26,
            quality: 0,
            itemClass: 'Flask',
            baseType: 'Grand Life Flask',
            rarity: Rarity.Normal,
            sockets: []
        },
        {
    		name: 'Grand Life Flask',
    		itemLevel: 59,
    		dropLevel: 26,
    		quality: 0,
    		itemClass: 'Flask',
    		baseType: 'Grand Life Flask',
    		rarity: Rarity.Magic,
    		sockets: []
    	},
        {
    		name: 'Hallowed Mana Flask',
    		itemLevel: 59,
    		dropLevel: 53,
    		quality: 0,
    		itemClass: 'Flask',
    		baseType: 'Hallowed Mana Flask',
    		rarity: Rarity.Magic,
    		sockets: []
    	},
        {
    		name: 'Large Hybrid Flask',
    		itemLevel: 35,
    		dropLevel: 30,
    		quality: 0,
    		itemClass: 'Flask',
    		baseType: 'Large Hybrid Flask',
    		rarity: Rarity.Magic,
    		sockets: []
    	},
        {
    		name: 'Medium Hybrid Flask',
    		itemLevel: 35,
    		dropLevel: 20,
    		quality: 0,
    		itemClass: 'Flask',
    		baseType: 'Medium Hybrid Flask',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Granite Flask',
    		itemLevel: 51,
    		dropLevel: 27,
    		quality: 0,
    		itemClass: 'Flask',
    		baseType: 'Granite Flask',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Topaz Flask',
    		itemLevel: 46,
    		dropLevel: 18,
    		quality: 0,
    		itemClass: 'Flask',
    		baseType: 'Topaz Flask',
    		rarity: Rarity.Magic,
    		sockets: []
    	},
        {
    		name: 'Small Hybrid Flask',
    		itemLevel: 71,
    		dropLevel: 10,
    		quality: 9,
    		itemClass: 'Flask',
    		baseType: 'Small Hybrid Flask',
    		rarity: Rarity.Normal,
    		sockets: []
    	},
        {
    		name: 'Sapphire Flask',
    		itemLevel: 76,
    		dropLevel: 18,
    		quality: 0,
    		itemClass: 'Flask',
    		baseType: 'Sapphire Flask',
    		rarity: Rarity.Unique,
    		sockets: []
    	},

    ];

    var fishingRods = [
        {
            name: 'Fishing Rod',
    		itemLevel: 59,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Fishing Rod',
    		baseType: 'Fishing Rod',
    		rarity: Rarity.Normal,
    		sockets: []
        },
    ];

    return weapons.concat( armor, jewelry, gems, currency, maps, jewels, flasks, fishingRods );
}

function loadItems() {
    // Try to load from local storage
    var json = StorageUtils.load( 'poedit-items', null );
    if (json !== null) {
        var items = ItemsEditor.jsonToItems( json );
        if (items !== null) {
            return items;
        }
        else {
            console.log( 'failed to parse stored items JSON, loading defaults');
        }
    }

    return getDefaultItems();
}
