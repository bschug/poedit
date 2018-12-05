function getDefaultItems() {
    var weapons = [
        {
    		name: 'Rusted Sword',
    		itemLevel: 9,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'One Hand Swords',
    		baseType: 'Rusted Sword',
    		rarity: Rarity.Rare,
            width: 1,
            height: 3,
    		sockets: ['B', 'G']
    	},
        {
    		name: 'Great White Claw',
    		itemLevel: 62,
    		dropLevel: 58,
    		quality: 8,
    		itemClass: 'Claws',
    		baseType: 'Great White Claw',
    		rarity: Rarity.Magic,
            width: 2,
            height: 2,
    		sockets: ['R','GG']
    	},
        {
    		name: 'Highland Blade',
    		itemLevel: 54,
    		dropLevel: 44,
    		quality: 0,
    		itemClass: 'Two Hand Swords',
    		baseType: 'Highland Blade',
    		rarity: Rarity.Magic,
            width: 2,
            height: 4,
    		sockets: ['RRGRR']
    	},
        {
    		name: 'Imperial Staff',
    		itemLevel: 66,
    		dropLevel: 66,
    		quality: 0,
    		itemClass: 'Staves',
    		baseType: 'Imperial Staff',
    		rarity: Rarity.Unique,
            width: 2,
            height: 4,
    		sockets: ['B']
    	},
    	{
    		name: 'Royal Bow',
    		itemLevel: 69,
    		dropLevel: 28,
    		quality: 0,
    		itemClass: 'Bows',
    		baseType: 'Royal Bow',
    		rarity: Rarity.Rare,
            width: 2,
            height: 4,
    		sockets: ['G','GG','B'],
    		influence: Influence.Elder
    	},
    	{
    		name: 'Royal Bow',
    		itemLevel: 41,
    		dropLevel: 28,
    		quality: 0,
    		itemClass: 'Bows',
    		baseType: 'Royal Bow',
    		rarity: Rarity.Rare,
            width: 2,
            height: 4,
    		sockets: ['R','GG','R']
    	},
    	{
    		name: 'Rusted Spike',
    		itemLevel: 3,
    		dropLevel: 3,
    		quality: 0,
    		itemClass: 'Thrusting One Hand Swords',
    		baseType: 'Rusted Spike',
    		rarity: Rarity.Normal,
            width: 1,
            height: 4,
    		sockets: ['G']
    	},
    	{
    		name: 'Rusted Spike',
    		itemLevel: 38,
    		dropLevel: 3,
    		quality: 0,
    		itemClass: 'Thrusting One Hand Swords',
    		baseType: 'Rusted Spike',
    		rarity: Rarity.Normal,
            width: 1,
            height: 4,
    		sockets: ['GG','R']
    	},
    	{
    		name: 'Basket Rapier',
    		itemLevel: 19,
    		dropLevel: 17,
    		quality: 0,
    		itemClass: 'Thrusting One Hand Swords',
    		baseType: 'Basket Rapier',
    		rarity: Rarity.Magic,
            width: 1,
            height: 4,
    		sockets: ['GG']
    	},
    	{
    		name: 'Karui Chopper',
    		itemLevel: 62,
    		dropLevel: 58,
    		quality: 0,
    		itemClass: 'Two Hand Maces',
    		baseType: 'Karui Chopper',
    		rarity: Rarity.Magic,
            width: 2,
            height: 4,
    		sockets: ['RRR','B']
    	},
    	{
    		name: 'Stone Hammer',
    		itemLevel: 38,
    		dropLevel: 15,
    		quality: 0,
    		itemClass: 'One Hand Maces',
    		baseType: 'Stone Hammer',
    		rarity: Rarity.Normal,
            width: 2,
            height: 3,
    		sockets: ['R']
    	},
    	{
    		name: 'Rock Breaker',
    		itemLevel: 73,
    		dropLevel: 41,
    		quality: 0,
    		itemClass: 'One Hand Maces',
    		baseType: 'Rock Breaker',
    		rarity: Rarity.Magic,
            width: 2,
            height: 3,
    		sockets: ['G']
    	},
    	{
    		name: 'Gavel',
    		itemLevel: 66,
    		dropLevel: 60,
    		quality: 0,
    		itemClass: 'One Hand Maces',
    		baseType: 'Gavel',
    		rarity: Rarity.Normal,
            width: 2,
            height: 3,
    		sockets: ['R']
    	},
        {
    		name: 'Midnight Blade',
    		itemLevel: 71,
    		dropLevel: 68,
    		quality: 0,
    		itemClass: 'One Hand Swords',
    		baseType: 'Midnight Blade',
    		rarity: Rarity.Rare,
            width: 2,
            height: 3,
    		sockets: ['B','G'],
    		influence: Influence.Shaper
    	},
        {
    		name: 'Dragon Slicer',
    		itemLevel: 71,
    		dropLevel: 68,
    		quality: 0,
    		itemClass: 'One Hand Swords',
    		baseType: 'Midnight Blade',
    		rarity: Rarity.Rare,
            width: 2,
            height: 3,
    		sockets: ['RR','G'],
            identified: true
    	},
    ];

    var armor = [
        {
    		name: 'Full Plate',
    		itemLevel: 66,
    		dropLevel: 28,
    		quality: 8,
    		rarity: Rarity.Normal,
    		itemClass: 'Body Armours',
    		baseType: 'Full Plate',
            width: 2,
            height: 3,
    		sockets: ['RRRRRR']
    	},
        {
    		name: 'Occultist\'s Vestment',
    		itemLevel: 67,
    		dropLevel: 57,
    		quality: 0,
    		itemClass: 'Body Armours',
    		baseType: 'Occultist\'s Vestment',
    		rarity: Rarity.Normal,
            width: 2,
            height: 3,
    		sockets: ['RB','GBB','B']
    	},
    	{
    		name: 'Iron Hat',
    		itemLevel: 78,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Helmets',
    		baseType: 'Iron Hat',
    		rarity: Rarity.Normal,
            width: 2,
            height: 2,
    		sockets: ['B']
    	},
    	{
    		name: 'Leather Cap',
    		itemLevel: 23,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Helmets',
    		baseType: 'Leather Cap',
    		rarity: Rarity.Normal,
            width: 2,
            height: 2,
    		sockets: ['RGB','G']
    	},
    	{
    		name: 'Crusader Plate',
    		itemLevel: 69,
    		dropLevel: 59,
    		quality: 0,
    		itemClass: 'Body Armours',
    		baseType: 'Crusader Plate',
    		rarity: Rarity.Unique,
            width: 2,
            height: 3,
    		sockets: ['RR','RR']
    	},
    	{
    		name: 'Simple Robe',
    		itemLevel: 68,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Body Armours',
    		baseType: 'Simple Robe',
    		rarity: Rarity.Unique,
            width: 2,
            height: 3,
    		sockets: ['WWWWWW']
    	},
    	{
    		name: 'Holy Chainmail',
    		itemLevel: 66,
    		dropLevel: 35,
    		quality: 0,
    		itemClass: 'Body Armours',
    		baseType: 'Holy Chainmail',
    		rarity: Rarity.Unique,
            width: 2,
            height: 3,
    		sockets: ['R','B']
    	},
        {
    		name: 'Vaal Regalia',
    		itemLevel: 72,
    		dropLevel: 68,
    		quality: 0,
    		itemClass: 'Body Armours',
    		baseType: 'Vaal Regalia',
    		rarity: Rarity.Rare,
            width: 2,
            height: 3,
    		sockets: ['B','B']
    	},
        {
    		name: 'Sacrificial Garb',
    		itemLevel: 77,
    		dropLevel: 72,
    		quality: 0,
    		itemClass: 'Body Armours',
    		baseType: 'Sacrificial Garb',
    		rarity: Rarity.Normal,
            width: 2,
            height: 3,
    		sockets: ['RRB','G']
    	},
        {
    		name: "Rage Fist",
    		itemLevel: 69,
    		dropLevel: 53,
    		quality: 0,
    		itemClass: 'Gloves',
    		baseType: 'Vaal Gauntlets',
    		rarity: Rarity.Rare,
            width: 2,
            height: 3,
    		sockets: ['R'],
            identified: true,
            corrupted: true
    	},

    ];

    var jewelry = [
        {
    		name: 'Jade Amulet',
    		itemLevel: 44,
    		dropLevel: 7,
    		quality: 0,
    		itemClass: 'Amulets',
    		baseType: 'Jade Amulet',
    		rarity: Rarity.Magic,
            width: 1,
            height: 1,
    		sockets: []
    	},
    	{
    		name: 'Coral Amulet',
    		itemLevel: 8,
    		dropLevel: 2,
    		quality: 0,
    		itemClass: 'Amulets',
    		baseType: 'Coral Amulet',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
    	{
    		name: 'Leather Belt',
    		itemLevel: 72,
    		dropLevel: 10,
    		quality: 0,
    		itemClass: 'Belts',
    		baseType: 'Leather Belt',
    		rarity: Rarity.Rare,
            width: 2,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Coral Ring',
    		itemLevel: 78,
    		dropLevel: 2,
    		quality: 0,
    		itemClass: 'Rings',
    		baseType: 'Coral Ring',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Unset Ring',
    		itemLevel: 53,
    		dropLevel: 45,
    		quality: 0,
    		itemClass: 'Rings',
    		baseType: 'Unset Ring',
    		rarity: Rarity.Rare,
            width: 1,
            height: 1,
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
    		itemClass: 'Active Skill Gems',
    		baseType: 'Heavy Strike',
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Summon Chaos Golem',
    		itemLevel: 68,
    		dropLevel: 30,
    		quality: 0,
    		itemClass: 'Active Skill Gems',
    		baseType: 'Summon Chaos Golem',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
    	{
    		name: 'Added Fire Damage (Level 10)',
    		itemLevel: 54,
    		dropLevel: 12,
    		quality: 0,
    		itemClass: 'Support Skill Gems',
    		baseType: 'Added Fire Damage',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},

    ];

    var currency = [
        {
    		name: 'Scroll of Wisdom',
    		itemLevel: 75,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Scroll of Wisdom',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
    	{
    		name: 'Portal Scroll',
    		itemLevel: 5,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Portal Scroll',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Armourer\'s Scrap',
    		itemLevel: 53,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Armourer\'s Scrap',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Blacksmith\'s Whetstone',
    		itemLevel: 53,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Blacksmith\'s Whetstone',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
    	{
    		name: 'Orb of Alchemy',
    		itemLevel: 17,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Orb of Alchemy',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Orb of Augmentation',
    		itemLevel: 29,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Orb of Augmentation',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Orb of Alteration',
    		itemLevel: 71,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Orb of Alteration',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Orb of Chance',
    		itemLevel: 9,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Orb of Chance',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Orb of Fusing',
    		itemLevel: 47,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Orb of Fusing',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Orb of Transmutation',
    		itemLevel: 13,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Orb of Transmutation',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Regal Orb',
    		itemLevel: 29,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Regal Orb',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
    	{
    		name: 'Chromatic Orb',
    		itemLevel: 9,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Chromatic Orb',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Chaos Orb',
    		itemLevel: 35,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Chaos Orb',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Glassblower\'s Bauble',
    		itemLevel: 9,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Glassblower\'s Bauble',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Gemcutter\'s Prism',
    		itemLevel: 13,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Gemcutter\'s Prism',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Jeweller\'s Orb',
    		itemLevel: 13,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Jeweller\'s Orb',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Cartographer\'s Chisel',
    		itemLevel: 62,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Cartographer\'s Chisel',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Divine Orb',
    		itemLevel: 49,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Divine Orb',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Blessed Orb',
    		itemLevel: 41,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Blessed Orb',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Regal Orb',
    		itemLevel: 71,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Regal Orb',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Vaal Orb',
    		itemLevel: 9,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Vaal Orb',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Orb of Regret',
    		itemLevel: 22,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Orb of Regret',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Orb of Scouring',
    		itemLevel: 78,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Orb of Scouring',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Exalted Orb',
    		itemLevel: 67,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Exalted Orb',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Ancient Orb',
    		itemLevel: 52,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Ancient Orb',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Mirror of Kalandra',
    		itemLevel: 77,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Stackable Currency',
    		baseType: 'Mirror of Kalandra',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},

    ];

    var maps = [
        {
    		name: 'Cursed Crypt Map',
    		itemLevel: 79,
    		dropLevel: 76,
    		quality: 0,
    		itemClass: 'Maps',
    		baseType: 'Cursed Crypt Map',
    		rarity: Rarity.Unique,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Alleyways Map',
    		itemLevel: 67,
    		dropLevel: 66,
    		quality: 0,
    		itemClass: 'Maps',
    		baseType: 'Alleyways Map',
    		rarity: Rarity.Magic,
            width: 1,
            height: 1,
    		sockets: []
    	},
    	{
    		name: 'Phantasmagoria Map',
    		itemLevel: 80,
    		dropLevel: 73,
    		quality: 0,
    		itemClass: 'Maps',
    		baseType: 'Phantasmagoria Map',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
            name:'Reef Map',
            itemLevel: 82,
            dropLevel: 82,
            quality: 0,
            itemClass: 'Maps',
            baseType: 'Reef Map',
            rarity: Rarity.Normal,
            width:1,
            height:1,
            sockets:[]
        },
        {
    		name: 'Sacrifice at Midnight',
    		itemLevel: 21,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Map Fragments',
    		baseType: 'Sacrifice at Midnight',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
        {
    		name: 'Mortal Grief',
    		itemLevel: 80,
    		dropLevel: 70,
    		quality: 0,
    		itemClass: 'Map Fragments',
    		baseType: 'Mortal Grief',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
    	},
    ];

    var jewels = [
        {
    		name: 'Crimson Jewel',
    		itemLevel: 20,
    		dropLevel: 12,
    		quality: 0,
    		itemClass: 'Jewels',
    		baseType: 'Crimson Jewel',
    		rarity: Rarity.Magic,
            width: 1,
            height: 1,
    		sockets: []
    	},
    	{
    		name: 'Viridian Jewel',
    		itemLevel: 72,
    		dropLevel: 61,
    		quality: 0,
    		itemClass: 'Jewels',
    		baseType: 'Viridian Jewel',
    		rarity: Rarity.Unique,
            width: 1,
            height: 1,
    		sockets: []
    	},

    ];

    var flasks = [
        {
            name: 'Grand Life Flask',
            itemLevel: 31,
            dropLevel: 26,
            quality: 0,
            itemClass: 'Life Flasks',
            baseType: 'Grand Life Flask',
            rarity: Rarity.Normal,
            width: 1,
            height: 2,
            sockets: []
        },
        {
    		name: 'Grand Life Flask',
    		itemLevel: 59,
    		dropLevel: 26,
    		quality: 0,
    		itemClass: 'Life Flasks',
    		baseType: 'Grand Life Flask',
    		rarity: Rarity.Magic,
            width: 1,
            height: 2,
    		sockets: []
    	},
        {
    		name: 'Hallowed Mana Flask',
    		itemLevel: 59,
    		dropLevel: 53,
    		quality: 0,
    		itemClass: 'Mana Flasks',
    		baseType: 'Hallowed Mana Flask',
    		rarity: Rarity.Magic,
            width: 1,
            height: 2,
    		sockets: []
    	},
        {
    		name: 'Large Hybrid Flask',
    		itemLevel: 35,
    		dropLevel: 30,
    		quality: 0,
    		itemClass: 'Hybrid Flasks',
    		baseType: 'Large Hybrid Flask',
    		rarity: Rarity.Magic,
            width: 1,
            height: 2,
    		sockets: []
    	},
        {
    		name: 'Medium Hybrid Flask',
    		itemLevel: 35,
    		dropLevel: 20,
    		quality: 0,
    		itemClass: 'Hybrid Flasks',
    		baseType: 'Medium Hybrid Flask',
    		rarity: Rarity.Normal,
            width: 1,
            height: 2,
    		sockets: []
    	},
        {
    		name: 'Granite Flask',
    		itemLevel: 51,
    		dropLevel: 27,
    		quality: 0,
    		itemClass: 'Utility Flasks',
    		baseType: 'Granite Flask',
    		rarity: Rarity.Normal,
            width: 1,
            height: 2,
    		sockets: []
    	},
        {
    		name: 'Topaz Flask',
    		itemLevel: 46,
    		dropLevel: 18,
    		quality: 0,
    		itemClass: 'Utility Flasks',
    		baseType: 'Topaz Flask',
    		rarity: Rarity.Magic,
            width: 1,
            height: 2,
    		sockets: []
    	},
        {
    		name: 'Small Hybrid Flask',
    		itemLevel: 71,
    		dropLevel: 10,
    		quality: 9,
    		itemClass: 'Hybrid Flasks',
    		baseType: 'Small Hybrid Flask',
    		rarity: Rarity.Normal,
            width: 1,
            height: 2,
    		sockets: []
    	},
        {
    		name: 'Sapphire Flask',
    		itemLevel: 76,
    		dropLevel: 18,
    		quality: 0,
    		itemClass: 'Utility Flasks',
    		baseType: 'Sapphire Flask',
    		rarity: Rarity.Unique,
            width: 1,
            height: 2,
    		sockets: []
    	},

    ];

    var divinationCards = [
        {
            name: 'The Pact',
    		itemLevel: 23,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Divination Card',
    		baseType: 'The Pact',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
        },
        {
            name: 'The Gemcutter',
    		itemLevel: 68,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Divination Card',
    		baseType: 'The Gemcutter',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
        },
        {
            name: 'Jack in the Box',
    		itemLevel: 72,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Divination Card',
    		baseType: 'Jack in the Box',
    		rarity: Rarity.Normal,
            width: 1,
            height: 1,
    		sockets: []
        }
    ];

    var fishingRods = [
        {
            name: 'Fishing Rod',
    		itemLevel: 59,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Fishing Rods',
    		baseType: 'Fishing Rod',
    		rarity: Rarity.Normal,
            width: 1,
            height: 4,
    		sockets: []
        },
    ];

    var questItems = [
        {
            name: 'Thaumetic Sulphite',
    		itemLevel: 32,
    		dropLevel: 1,
    		quality: 0,
    		itemClass: 'Quest Items',
    		baseType: 'Thaumetic Sulphite',
    		rarity: Rarity.Normal,
            width: 2,
            height: 2,
    		sockets: []
        },
        {
            name: 'Golden Key',
            itemLevel: 68,
            dropLevel: 1,
            quality: 0,
            itemClass: 'Labyrinth Item',
            baseType: 'Golden Key',
            rarity: Rarity.Normal,
            width: 1,
            height: 1,
            sockets:[]
        },
        {
            name: 'Portal Shredder',
            itemLevel: 55,
            dropLevel: 1,
            quality: 0,
            itemClass: 'Labyrinth Trinket',
            baseType: 'Portal Shredder',
            rarity: Rarity.Normal,
            width: 1,
            height: 1,
            sockets: []
        }
    ];

    var prophecies = [
        {
            name: 'Monstrous Treasure',
            itemLevel: 43,
            dropLevel: 1,
            quality: 0,
            itemClass: 'Stackable Currency',
            baseType: 'Prophecy',
            rarity: Rarity.Normal,
            width: 1,
            height: 1,
            sockets: []
        },
        {
            name: 'The Cursed Choir',
            itemLevel: 1,
            dropLevel: 1,
            quality: 0,
            itemClass: 'Stackable Currency',
            baseType: 'Prophecy',
            rarity: Rarity.Normal,
            width: 1,
            height: 1,
            sockets: []
        }
    ];

    var all = [].concat(weapons, armor, jewelry, gems, currency, maps, jewels,
                        flasks, divinationCards, fishingRods, questItems, prophecies );
    fillOptionalPropertiesWithDefaults(all);
    return all;
}

function fillOptionalPropertiesWithDefaults(items) {
    for (var i=0; i < items.length; i++) {
        items[i].identified = items[i].identified || false;
        items[i].corrupted = items[i].corrupted || false;
        items[i].influence = items[i].influence !== undefined ? items[i].influence : Influence.None;
        items[i].shapedMap = items[i].shapedMap || false;
        items[i].mapTier = items[i].mapTier !== undefined ? items[i].mapTier : (items[i].itemClass === 'Maps' ? items[i].dropLevel - 67 : 0);
        //items[i].gemLevel = items[i].gemLevel !== undefined ? items[i].gemLevel : (['Active Skill Gems', 'Support Skill Gems'].includes(items[i].itemClass) ? 1 : 0);
        items[i].explicitMods = items[i].explicitMods !== undefined ? items[i].explicitMods : [];

        if (items[i].gemLevel === undefined) {
            if (items[i].itemClass.endsWith('Skill Gems')) {
                items[i].gemLevel = 1;
            } else {
                items[i].gemLevel = 0;
            }
        }
    }
    return items;
}

function loadItemsLocal() {
    // Try to load from local storage
    var json = StorageUtils.load( 'poedit-items', null );
    if (json !== null) {
        var items = ItemsEditor.jsonToItems( json );
        if (items !== null) {
            ga('send', 'event', 'performance', 'items', 'local', items.length);
            fillOptionalPropertiesWithDefaults( items );
            return items;
        }
        else {
            console.log( 'failed to parse stored items JSON, loading defaults');
        }
    }

    ga('send', 'event', 'performance', 'items', 'default');
    return getDefaultItems();
}

function loadItemsPastebin (urlArgs, successCb, errorCb) {
    urlArgs.loadItemsPastebin(
        function (json) {
            var items = ItemsEditor.jsonToItems( json );
            if (items !== null) {
				ga('send', 'event', 'performance', 'items', 'pastebin', items.length);
				fillOptionalPropertiesWithDefaults( items );
                successCb( items );
                return;
            }
            else {
				ga('send', 'event', 'error', 'items', 'pastebin/parse');
                errorCb();
            }
        },
		function() {
			ga('send', 'event', 'error', 'items', 'pastebin/load');
			errorCb();
		}
    );
}

function loadItems (urlArgs, successCb) {
    // Try to load pastebin if available, fallback to local on errors.
    if (urlArgs.hasItemsPastebin()) {
        loadItemsPastebin( urlArgs, successCb, function() {
            alert( 'Could not load Items from Pastebin, using defaults' );
            successCb( loadItemsLocal );
        } );
        return;
    }

    // Otherwise use local right away.
    successCb( loadItemsLocal() );
}

// ---------------------------------- Script -------------------------------------

function getDefaultScript() {
    var result =
        '# Welcome to the Path of Exile ItemScript Preview and Debug Tool.\n' +
        '# \n' +
        '# Your item filter code goes here.\n' +
        '# You see the effects of your filter on the right side.\n' +
        '# Hover over an item to see the filter rule that applied to it.\n' +
        '# Press Alt to see hidden items.\n' +
        '# Press the Settings button to select a different item set.\n' +
        '# Click the Help button on the bottom right for more tips and instructions.';
    return result;
}

function loadLocalScript () {
    var code = StorageUtils.load( 'poedit-code', getDefaultScript() );
    return code;
}

function loadPastebinScript (urlArgs, successCb, errorCb) {
    urlArgs.loadCodePastebin(
		function(result) {
			ga('send', 'event', 'pastebin-script', 'success');
			successCb(result);
		},
        function() {
			ga('send', 'event', 'error', 'script', 'pastebin/load');
            alert( 'Could not load filter script from Pastebin. Using default.' );
            errorCb();
        }
    );
}

function loadScript (urlArgs, successCb) {
    if (urlArgs.hasCodePastebin()) {
        loadPastebinScript( urlArgs, successCb, function() { successCb( loadLocalScript() ); } );
    }
    else {
        successCb( loadLocalScript() );
    }
}
