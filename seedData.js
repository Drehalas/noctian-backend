const mongoose = require('mongoose');
const Ladder = require('./models/ladderModel');
const Hero = require('./models/heroModel');
const Soldier = require('./models/soldierModel');
const Spell = require('./models/spellModel');
const Artifact = require('./models/artifactModel');
const Friend = require('./models/friendModel');
const SkillBuff = require('./models/skillBuffModel');
const User = require ('./models/userModel');
const UserAuth = require('./models/userAuthModel');
const War = require ('./models/warModel');
const Armory = require('./models/armoryModel');
const Faction = require('./models/factionModel');

require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));


const ladderData = [
    // Faction: Orc
    { ladderId: 11, name: 'Great Warchief', faction: 'ORC' },
    { ladderId: 12, name: 'Warchief', faction: 'ORC' },
    { ladderId: 13, name: 'High Warlord', faction: 'ORC' },
    { ladderId: 14, name: 'Warlord', faction: 'ORC' },
    { ladderId: 15, name: 'Warmaster', faction: 'ORC' },
    { ladderId: 16, name: 'Chieftain', faction: 'ORC' },
    { ladderId: 17, name: 'Blood Guard', faction: 'ORC' },
    { ladderId: 18, name: 'Slayer', faction: 'ORC' },
    { ladderId: 19, name: 'Raider', faction: 'ORC' },
    { ladderId: 110, name: 'Brute', faction: 'ORC' },
    { ladderId: 111, name: 'Berserker', faction: 'ORC' },
    { ladderId: 112, name: 'Ravager', faction: 'ORC' },
    { ladderId: 113, name: 'Marauder', faction: 'ORC' },
    { ladderId: 114, name: 'Warrior', faction: 'ORC' },
    { ladderId: 115, name: 'Grunt', faction: 'ORC' },
    { ladderId: 116, name: 'Peon', faction: 'ORC' },
    { ladderId: 117, name: 'Slave', faction: 'ORC' },
    { ladderId: 118, name: 'Goblin', faction: 'ORC' },
    { ladderId: 119, name: 'Beast Herder', faction: 'ORC' },
    { ladderId: 120, name: 'Worm Food', faction: 'ORC' },

    // Faction: Human
    { ladderId: 61, name: 'Emperor', faction: 'HUMAN' },
    { ladderId: 62, name: 'High King', faction: 'HUMAN' },
    { ladderId: 63, name: 'Archmage', faction: 'HUMAN' },
    { ladderId: 64, name: 'Paladin', faction: 'HUMAN' },
    { ladderId: 65, name: 'Duke', faction: 'HUMAN' },
    { ladderId: 66, name: 'Marquess', faction: 'HUMAN' },
    { ladderId: 67, name: 'Count', faction: 'HUMAN' },
    { ladderId: 68, name: 'Viscount', faction: 'HUMAN' },
    { ladderId: 69, name: 'Baron', faction: 'HUMAN' },
    { ladderId: 610, name: 'Knight Commander', faction: 'HUMAN' },
    { ladderId: 611, name: 'Knight', faction: 'HUMAN' },
    { ladderId: 612, name: 'Captain', faction: 'HUMAN' },
    { ladderId: 613, name: 'Lieutenant', faction: 'HUMAN' },
    { ladderId: 614, name: 'Sergeant', faction: 'HUMAN' },
    { ladderId: 615, name: 'Master Mage', faction: 'HUMAN' },
    { ladderId: 616, name: 'High Priest', faction: 'HUMAN' },
    { ladderId: 617, name: 'Squire', faction: 'HUMAN' },
    { ladderId: 618, name: 'Footman', faction: 'HUMAN' },
    { ladderId: 619, name: 'Archer', faction: 'HUMAN' },
    { ladderId: 620, name: 'Peasant', faction: 'HUMAN' },

    // Faction: Elf
    { ladderId: 21, name: 'High Queen', faction: 'ELF' },
    { ladderId: 22, name: 'Archdruid', faction: 'ELF' },
    { ladderId: 23, name: 'Eldest', faction: 'ELF' },
    { ladderId: 24, name: 'Lady of the Forest', faction: 'ELF' },
    { ladderId: 25, name: 'Mistress of Lore', faction: 'ELF' },
    { ladderId: 26, name: 'Guardian of the Glades', faction: 'ELF' },
    { ladderId: 27, name: 'Keeper of the Grove', faction: 'ELF' },
    { ladderId: 28, name: 'Warden of the Wilds', faction: 'ELF' },
    { ladderId: 29, name: 'Sentinel of the Stars', faction: 'ELF' },
    { ladderId: 210, name: 'Ranger Captain', faction: 'ELF' },
    { ladderId: 211, name: 'Moon Priestess', faction: 'ELF' },
    { ladderId: 212, name: 'Sun Dame', faction: 'ELF' },
    { ladderId: 213, name: 'Spellweaver', faction: 'ELF' },
    { ladderId: 214, name: 'Bladesinger', faction: 'ELF' },
    { ladderId: 215, name: 'Shadow Walker', faction: 'ELF' },
    { ladderId: 216, name: 'Loremaster', faction: 'ELF' },
    { ladderId: 217, name: 'Elder', faction: 'ELF' },
    { ladderId: 218, name: 'Ranger', faction: 'ELF' },
    { ladderId: 219, name: 'Scout', faction: 'ELF' },
    { ladderId: 220, name: 'Initiate', faction: 'ELF' },

    // Faction: Demon
    { ladderId: 31, name: 'Demon Lord', faction: 'DEMON' },
    { ladderId: 32, name: 'Archdemon', faction: 'DEMON' },
    { ladderId: 33, name: 'Overlord', faction: 'DEMON' },
    { ladderId: 34, name: 'Pit Fiend', faction: 'DEMON' },
    { ladderId: 35, name: 'Balor', faction: 'DEMON' },
    { ladderId: 36, name: 'Succubus', faction: 'DEMON' },
    { ladderId: 37, name: 'Marilith', faction: 'DEMON' },
    { ladderId: 38, name: 'Vrock', faction: 'DEMON' },
    { ladderId: 39, name: 'Hezrou', faction: 'DEMON' },
    { ladderId: 310, name: 'Glabrezu', faction: 'DEMON' },
    { ladderId: 311, name: 'Nalfeshnee', faction: 'DEMON' },
    { ladderId: 312, name: 'Barlgura', faction: 'DEMON' },
    { ladderId: 313, name: 'Chasme', faction: 'DEMON' },
    { ladderId: 314, name: 'Dretch', faction: 'DEMON' },
    { ladderId: 315, name: 'Manes', faction: 'DEMON' },
    { ladderId: 316, name: 'Rutterkin', faction: 'DEMON' },
    { ladderId: 317, name: 'Lemure', faction: 'DEMON' },
    { ladderId: 318, name: 'Nupperibo', faction: 'DEMON' },
    { ladderId: 319, name: 'Spinagon', faction: 'DEMON' },
    { ladderId: 320, name: 'Imp', faction: 'DEMON' },

    // Faction: Angel
    { ladderId: 41, name: 'Archseraphim', faction: 'ANGEL' },
    { ladderId: 42, name: 'Cherubim', faction: 'ANGEL' },
    { ladderId: 43, name: 'Throne', faction: 'ANGEL' },
    { ladderId: 44, name: 'Dominion', faction: 'ANGEL' },
    { ladderId: 45, name: 'Virtue', faction: 'ANGEL' },
    { ladderId: 46, name: 'Power', faction: 'ANGEL' },
    { ladderId: 47, name: 'Principalitie', faction: 'ANGEL' },
    { ladderId: 48, name: 'Archangel', faction: 'ANGEL' },
    { ladderId: 49, name: 'ANGEL', faction: 'ANGEL' },
    { ladderId: 410, name: 'Malakim', faction: 'ANGEL' },
    { ladderId: 411, name: 'Elohim', faction: 'ANGEL' },
    { ladderId: 412, name: 'Bene Elohim', faction: 'ANGEL' },
    { ladderId: 413, name: 'Ophanim', faction: 'ANGEL' },
    { ladderId: 414, name: 'Grigori', faction: 'ANGEL' },
    { ladderId: 415, name: 'Guardian Angel', faction: 'ANGEL' },
    { ladderId: 416, name: 'Messenger Angel', faction: 'ANGEL' },
    { ladderId: 417, name: 'Warrior Angel', faction: 'ANGEL' },
    { ladderId: 418, name: 'Healing Angel', faction: 'ANGEL' },
    { ladderId: 419, name: 'Astral Deva', faction: 'ANGEL' },
    { ladderId: 420, name: 'Celestial Guide', faction: 'ANGEL' },

    // Faction: Undead
    { ladderId: 51, name: 'Lich King', faction: 'UNDEAD' },
    { ladderId: 52, name: 'Dread Necromancer', faction: 'UNDEAD' },
    { ladderId: 53, name: 'Death Knight', faction: 'UNDEAD' },
    { ladderId: 54, name: 'Banshee Queen', faction: 'UNDEAD' },
    { ladderId: 55, name: 'Wight Lord', faction: 'UNDEAD' },
    { ladderId: 56, name: 'Soul Reaper', faction: 'UNDEAD' },
    { ladderId: 57, name: 'Revenant', faction: 'UNDEAD' },
    { ladderId: 58, name: 'Wraith', faction: 'UNDEAD' },
    { ladderId: 59, name: 'Abomination', faction: 'UNDEAD' },
    { ladderId: 510, name: 'Skeleton Lord', faction: 'UNDEAD' },
    { ladderId: 511, name: 'Bone Golem', faction: 'UNDEAD' },
    { ladderId: 512, name: 'Shade', faction: 'UNDEAD' },
    { ladderId: 513, name: 'Spirit', faction: 'UNDEAD' },
    { ladderId: 514, name: 'Skeleton Warrior', faction: 'UNDEAD' },
    { ladderId: 515, name: 'Skeleton Archer', faction: 'UNDEAD' },
    { ladderId: 516, name: 'Zombie Brute', faction: 'UNDEAD' },
    { ladderId: 517, name: 'Ghast', faction: 'UNDEAD' },
    { ladderId: 518, name: 'Zombie', faction: 'UNDEAD' },
    { ladderId: 519, name: 'Rotting Corpse', faction: 'UNDEAD' },
    { ladderId: 520, name: 'Lost Soul', faction: 'UNDEAD' }

];

const heroData = [
    // Faction: Orc
    { name: 'Melee Weapon', description: 'A well-balanced weapon made of quality steel', cost: 100, gains: 8, multiplier: 1.2, faction: 'ORC' },
    { name: 'Ranged Weapon', description: 'A precise long-range weapon crafted for accuracy', cost: 150, gains: 12, multiplier: 1.2, faction: 'ORC' },
    { name: 'Off-Hand', description: 'A versatile item held in the non-dominant hand for defense or offense', cost: 225, gains: 18, multiplier: 1.2, faction: 'ORC' },
    { name: 'Chest Armor', description: 'Sturdy protection for the torso, forged from durable materials', cost: 338, gains: 27, multiplier: 1.2, faction: 'ORC' },
    { name: 'Pants', description: 'Flexible leg armor providing both mobility and defense', cost: 506, gains: 41, multiplier: 1.2, faction: 'ORC' },
    { name: 'Gloves', description: 'Reinforced hand protection allowing for dexterity in combat', cost: 759, gains: 61, multiplier: 1.2, faction: 'ORC' },
    { name: 'Feet', description: 'Reliable footwear designed for stability and protection in battle', cost: 1139, gains: 91, multiplier: 1.2, faction: 'ORC' },
    { name: 'Belt', description: 'A sturdy accessory that secures armor and holds essential items', cost: 1709, gains: 137, multiplier: 1.2, faction: 'ORC' },
    { name: 'Bracers', description: 'Arm guards that deflect blows and enhance striking power', cost: 2563, gains: 205, multiplier: 1.2, faction: 'ORC' },
    { name: 'Shoulder', description: 'Robust pauldrons that shield the upper body from attacks', cost: 3844, gains: 308, multiplier: 1.2, faction: 'ORC' },
    { name: 'Cloak', description: 'A flowing garment that offers concealment and weather protection', cost: 5767, gains: 461, multiplier: 1.2, faction: 'ORC' },
    { name: 'Neckless', description: "An ornate accessory that enhances the wearer's abilities", cost: 8650, gains: 692, multiplier: 1.2, faction: 'ORC' },
    { name: 'Ring', description: 'A small but powerful magical item worn on the finger', cost: 12975, gains: 1038, multiplier: 1.2, faction: 'ORC' },
    { name: 'Ring 2', description: 'An additional enchanted band complementing the first ring', cost: 19462, gains: 1557, multiplier: 1.2, faction: 'ORC' },
    { name: 'Trinket', description: 'A mysterious artifact imbued with unique magical properties', cost: 29193, gains: 2335, multiplier: 1.2, faction: 'ORC' },
    { name: 'Trinket 2', description: 'A second magical curio with its own set of mystical effects', cost: 43789, gains: 3503, multiplier: 1.2, faction: 'ORC' },
    { name: 'Melee Weapon Gem', description: 'A precious stone that augments close-combat prowess', cost: 65684, gains: 5255, multiplier: 1.2, faction: 'ORC' },
    { name: 'Ranged Weapon Gem', description: 'A crystal that enhances accuracy and power in ranged attacks', cost: 98526, gains: 7882, multiplier: 1.2, faction: 'ORC' },
    { name: 'Off-Hand Gem', description: 'A jewel that boosts the effectiveness of off-hand equipment', cost: 147789, gains: 11823, multiplier: 1.2, faction: 'ORC' },
    { name: 'Chest Gem', description: "A radiant gem that reinforces chest armor's protective qualities", cost: 221684, gains: 17735, multiplier: 1.2, faction: 'ORC' },
    { name: 'Pants Gem', description: 'A lustrous stone that enhances leg armors defensive capabilities', cost: 332526, gains: 26602, multiplier: 1.2, faction: 'ORC' },
    { name: 'Gloves Gem', description: 'A sparkling gem that improves hand-to-hand combat skills', cost: 498789, gains: 39903, multiplier: 1.2, faction: 'ORC' },
    { name: 'Feet Gem', description: 'A shimmering stone that increases agility and sure-footedness', cost: 748183, gains: 59855, multiplier: 1.2, faction: 'ORC' },
    { name: 'Belt Gem', description: "A gleaming jewel that bolsters the wearer's core strength", cost: 1122274, gains: 89782, multiplier: 1.2, faction: 'ORC' },
    { name: 'Bracers Gem', description: 'A brilliant gem that amplifies the power of arm strikes', cost: 1683411, gains: 134673, multiplier: 1.2, faction: 'ORC' },
    { name: 'Shoulder Gem', description: "A dazzling stone that strengthens shoulder armor's durability", cost: 2525117, gains: 202009, multiplier: 1.2, faction: 'ORC' },
    { name: 'Cloak Gem', description: "A mystical gem that enhances the cloak's protective properties", cost: 3787675, gains: 303014, multiplier: 1.2, faction: 'ORC' },
    { name: 'Neckless Gem', description: "A precious stone that amplifies the necklace's magical effects", cost: 5681513, gains: 454521, multiplier: 1.2, faction: 'ORC' },
    { name: 'Ring Gem', description: "A tiny but potent gem that boosts the ring's enchantments", cost: 8522269, gains: 681782, multiplier: 1.2, faction: 'ORC' },
    { name: 'Ring 2 Gem', description: 'Another small yet powerful gem enhancing the second ring', cost: 12783404, gains: 1022672, multiplier: 1.2, faction: 'ORC' },
    { name: 'Trinket Gem', description: "A unique gem that complements the trinket's magical abilities", cost: 19175106, gains: 1534008, multiplier: 1.2, faction: 'ORC' },
    { name: 'Trinket 2 Gem', description: "A rare stone that synergizes with the second trinket's powers", cost: 28762659, gains: 2301013, multiplier: 1.2, faction: 'ORC' },
    { name: 'Melee Weapon Enchant', description: 'A magical enhancement improving close-combat effectiveness', cost: 43143988, gains: 3451519, multiplier: 1.2, faction: 'ORC' },
    { name: 'Ranged Weapon Enchant', description: 'An arcane upgrade boosting ranged attack capabilities', cost: 64715982, gains: 5177279, multiplier: 1.2, faction: 'ORC' },
    { name: 'Off-Hand Enchant', description: 'A mystical augmentation enhancing off-hand item performance', cost: 97073974, gains: 7765918, multiplier: 1.2, faction: 'ORC' },
    { name: 'Chest Enchant', description: "A powerful spell reinforcing the chest armor's protective qualities", cost: 145610961, gains: 11648877, multiplier: 1.2, faction: 'ORC' },
    { name: 'Pants Enchant', description: 'A magical enhancement improving leg armors defensive capabilities', cost: 218416441, gains: 17473315, multiplier: 1.2, faction: 'ORC' },
    { name: 'Gloves Enchant', description: 'An arcane boost increasing hand-to-hand combat prowess', cost: 327624661, gains: 26209973, multiplier: 1.2, faction: 'ORC' },
    { name: 'Feet Enchant', description: 'A mystical upgrade enhancing agility and movement speed', cost: 491436992, gains: 39314959, multiplier: 1.2, faction: 'ORC' },
    // Faction: Orc (continued)
    { name: 'Belt Enchant', description: "A magical reinforcement boosting the wearer's overall stability", cost: 737155488, gains: 58972439, multiplier: 1.2, faction: 'ORC' },
    { name: 'Bracers Enchant', description: 'An arcane enhancement amplifying arm guard effectiveness', cost: 1105733232, gains: 88458659, multiplier: 1.2, faction: 'ORC' },
    { name: 'Shoulder Enchant', description: "A powerful spell strengthening shoulder armor's resilience", cost: 1658599848, gains: 132687988, multiplier: 1.2, faction: 'ORC' },
    { name: 'Cloak Enchant', description: "A mystical augmentation improving the cloak's protective qualities", cost: 2487899772, gains: 199031982, multiplier: 1.2, faction: 'ORC' },
    { name: 'Neckless Enchant', description: "An arcane boost amplifying the necklace's magical properties", cost: 3731849658, gains: 298547973, multiplier: 1.2, faction: 'ORC' },
    { name: 'Ring Enchant', description: "A potent spell enhancing the ring's mystical effects", cost: 5597774487, gains: 447821959, multiplier: 1.2, faction: 'ORC' },
    { name: 'Ring 2 Enchant', description: 'Another powerful enchantment boosting the second ring’s abilities', cost: 8396661731, gains: 671732938, multiplier: 1.2, faction: 'ORC' },
    { name: 'Trinket Enchant', description: "A unique magical enhancement complementing the trinket's powers", cost: 12594992597, gains: 1007599408, multiplier: 1.2, faction: 'ORC' },
    { name: 'Trinket 2 Enchant', description: "A rare arcane upgrade synergizing with the second trinket's abilities", cost: 18892488895, gains: 1511399112, multiplier: 1.2, faction: 'ORC' },
    { name: 'Melee Weapon Rune', description: 'Ancient symbols etched to enhance close-combat performance', cost: 28338733343, gains: 2267098667, multiplier: 1.2, faction: 'ORC' },
    { name: 'Ranged Weapon Rune', description: 'Mystical markings inscribed to improve ranged attack precision', cost: 42508100014, gains: 3400648001, multiplier: 1.2, faction: 'ORC' },
    { name: 'Off-Hand Rune', description: 'Arcane glyphs carved to boost off-hand equipment effectiveness', cost: 63762150021, gains: 5100972002, multiplier: 1.2, faction: 'ORC' },
    { name: 'Chest Rune', description: "Powerful sigils engraved to reinforce chest armor's protective qualities", cost: 95643225032, gains: 7651458003, multiplier: 1.2, faction: 'ORC' },
    { name: 'Pants Rune', description: 'Magical runes etched to enhance leg armors defensive capabilities', cost: 143464837548, gains: 11477187004, multiplier: 1.2, faction: 'ORC' },
    { name: 'Gloves Rune', description: 'Ancient symbols inscribed to improve hand-to-hand combat skills', cost: 215197256322, gains: 17215780506, multiplier: 1.2, faction: 'ORC' },
    { name: 'Feet Rune', description: 'Mystical markings carved to increase agility and sure-footedness', cost: 322795884483, gains: 25823670759, multiplier: 1.2, faction: 'ORC' },
    { name: 'Belt Rune', description: "Arcane glyphs engraved to bolster the wearer's core strength", cost: 484193826725, gains: 38735506138, multiplier: 1.2, faction: 'ORC' },
    { name: 'Bracers Rune', description: 'Powerful sigils etched to amplify the effectiveness of arm guards', cost: 726290740088, gains: 58103259207, multiplier: 1.2, faction: 'ORC' },
    { name: 'Shoulder Rune', description: "Magical runes inscribed to strengthen shoulder armor's durability", cost: 1089436110131, gains: 87154888811, multiplier: 1.2, faction: 'ORC' },
    // Faction: Human
    { name: 'Melee Weapon', description: 'A well-balanced weapon made of quality steel', cost: 100, gains: 8, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Ranged Weapon', description: 'A precise long-range weapon crafted for accuracy', cost: 150, gains: 12, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Off-Hand', description: 'A versatile item held in the non-dominant hand for defense or offense', cost: 225, gains: 18, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Chest Armor', description: 'Sturdy protection for the torso, forged from durable materials', cost: 338, gains: 27, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Pants', description: 'Flexible leg armor providing both mobility and defense', cost: 506, gains: 41, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Gloves', description: 'Reinforced hand protection allowing for dexterity in combat', cost: 759, gains: 61, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Feet', description: 'Reliable footwear designed for stability and protection in battle', cost: 1139, gains: 91, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Belt', description: 'A sturdy accessory that secures armor and holds essential items', cost: 1709, gains: 137, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Bracers', description: 'Arm guards that deflect blows and enhance striking power', cost: 2563, gains: 205, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Shoulder', description: 'Robust pauldrons that shield the upper body from attacks', cost: 3844, gains: 308, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Cloak', description: 'A flowing garment that offers concealment and weather protection', cost: 5767, gains: 461, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Neckless', description: "An ornate accessory that enhances the wearer's abilities", cost: 8650, gains: 692, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Ring', description: 'A small but powerful magical item worn on the finger', cost: 12975, gains: 1038, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Ring 2', description: 'An additional enchanted band complementing the first ring', cost: 19462, gains: 1557, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Trinket', description: 'A mysterious artifact imbued with unique magical properties', cost: 29193, gains: 2335, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Trinket 2', description: 'A second magical curio with its own set of mystical effects', cost: 43789, gains: 3503, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Melee Weapon Gem', description: 'A precious stone that augments close-combat prowess', cost: 65684, gains: 5255, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Ranged Weapon Gem', description: 'A crystal that enhances accuracy and power in ranged attacks', cost: 98526, gains: 7882, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Off-Hand Gem', description: 'A jewel that boosts the effectiveness of off-hand equipment', cost: 147789, gains: 11823, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Chest Gem', description: "A radiant gem that reinforces chest armor's protective qualities", cost: 221684, gains: 17735, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Pants Gem', description: "A lustrous stone that enhances leg armor's defensive capabilities", cost: 332526, gains: 26602, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Gloves Gem', description: 'A sparkling gem that improves hand-to-hand combat skills', cost: 498789, gains: 39903, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Feet Gem', description: 'A shimmering stone that increases agility and sure-footedness', cost: 748183, gains: 59855, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Belt Gem', description: "A gleaming jewel that bolsters the wearer's core strength", cost: 1122274, gains: 89782, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Bracers Gem', description: 'A brilliant gem that amplifies the power of arm strikes', cost: 1683411, gains: 134673, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Shoulder Gem', description: "A dazzling stone that strengthens shoulder armor's durability", cost: 2525117, gains: 202009, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Cloak Gem', description: "A mystical gem that enhances the cloak's protective properties", cost: 3787675, gains: 303014, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Neckless Gem', description: "A precious stone that amplifies the necklace's magical effects", cost: 5681513, gains: 454521, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Ring Gem', description: "A tiny but potent gem that boosts the ring's enchantments", cost: 8522269, gains: 681782, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Ring 2 Gem', description: 'Another small yet powerful gem enhancing the second ring', cost: 12783404, gains: 1022672, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Trinket Gem', description: "A unique gem that complements the trinket's magical abilities", cost: 19175106, gains: 1534008, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Trinket 2 Gem', description: "A rare stone that synergizes with the second trinket's powers", cost: 28762659, gains: 2301013, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Melee Weapon Enchant', description: 'A magical enhancement improving close-combat effectiveness', cost: 43143988, gains: 3451519, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Ranged Weapon Enchant', description: 'An arcane upgrade boosting ranged attack capabilities', cost: 64715982, gains: 5177279, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Off-Hand Enchant', description: 'A mystical augmentation enhancing off-hand item performance', cost: 97073974, gains: 7765918, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Chest Enchant', description: "A powerful spell reinforcing the chest armor's protective qualities", cost: 145610961, gains: 11648877, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Pants Enchant', description: 'A magical enhancement improving leg armor\'s defensive capabilities', cost: 218416441, gains: 17473315, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Gloves Enchant', description: 'An arcane boost increasing hand-to-hand combat prowess', cost: 327624661, gains: 26209973, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Feet Enchant', description: 'A mystical upgrade enhancing agility and movement speed', cost: 491436992, gains: 39314959, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Belt Enchant', description: "A magical reinforcement boosting the wearer's overall stability", cost: 737155488, gains: 58972439, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Bracers Enchant', description: 'An arcane enhancement amplifying arm guard effectiveness', cost: 1105733232, gains: 88458659, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Shoulder Enchant', description: "A powerful spell strengthening shoulder armor's resilience", cost: 1658599848, gains: 132687988, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Cloak Enchant', description: "A mystical augmentation improving the cloak's protective qualities", cost: 2487899772, gains: 199031982, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Neckless Enchant', description: "An arcane boost amplifying the necklace's magical properties", cost: 3731849658, gains: 298547973, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Ring Enchant', description: "A potent spell enhancing the ring's mystical effects", cost: 5597774487, gains: 447821959, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Ring 2 Enchant', description: 'Another powerful enchantment boosting the second ring’s abilities', cost: 8396661731, gains: 671732938, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Trinket Enchant', description: "A unique magical enhancement complementing the trinket's powers", cost: 12594992597, gains: 1007599408, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Trinket 2 Enchant', description: "A rare arcane upgrade synergizing with the second trinket's abilities", cost: 18892488895, gains: 1511399112, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Melee Weapon Rune', description: 'Ancient symbols etched to enhance close-combat performance', cost: 28338733343, gains: 2267098667, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Ranged Weapon Rune', description: 'Mystical markings inscribed to improve ranged attack precision', cost: 42508100014, gains: 3400648001, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Off-Hand Rune', description: 'Arcane glyphs carved to boost off-hand equipment effectiveness', cost: 63762150021, gains: 5100972002, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Chest Rune', description: "Powerful sigils engraved to reinforce chest armor's protective qualities", cost: 95643225032, gains: 7651458003, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Pants Rune', description: 'Magical runes etched to enhance leg armor\'s defensive capabilities', cost: 143464837548, gains: 11477187004, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Gloves Rune', description: 'Ancient symbols inscribed to improve hand-to-hand combat skills', cost: 215197256322, gains: 17215780506, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Feet Rune', description: 'Mystical markings carved to increase agility and sure-footedness', cost: 322795884483, gains: 25823670759, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Belt Rune', description: "Arcane glyphs engraved to bolster the wearer's core strength", cost: 484193826725, gains: 38735506138, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Bracers Rune', description: 'Powerful sigils etched to amplify the effectiveness of arm guards', cost: 726290740088, gains: 58103259207, multiplier: 1.2, faction: 'HUMAN' },
    { name: 'Shoulder Rune', description: "Magical runes inscribed to strengthen shoulder armor's durability", cost: 1089436110131, gains: 87154888811, multiplier: 1.2, faction: 'HUMAN' },

    // Faction: Elf
    { name: 'Meele Weapon', description: 'A well-balanced weapon made of quality steel', cost: 100, gains: 8, multiplier: 1.2, faction: 'ELF' },
    { name: 'Ranged Weapon', description: 'A precise long-range weapon crafted for accuracy', cost: 150, gains: 12, multiplier: 1.2, faction: 'ELF' },
    { name: 'Off-Hand', description: 'A versatile item held in the non-dominant hand for defense or offense', cost: 225, gains: 18, multiplier: 1.2, faction: 'ELF' },
    { name: 'Chest Armor', description: 'Sturdy protection for the torso, forged from durable materials', cost: 338, gains: 27, multiplier: 1.2, faction: 'ELF' },
    { name: 'Pants', description: 'Flexible leg armor providing both mobility and defense', cost: 506, gains: 41, multiplier: 1.2, faction: 'ELF' },
    { name: 'Gloves', description: 'Reinforced hand protection allowing for dexterity in combat', cost: 759, gains: 61, multiplier: 1.2, faction: 'ELF' },
    { name: 'Feet', description: 'Reliable footwear designed for stability and protection in battle', cost: 1139, gains: 91, multiplier: 1.2, faction: 'ELF' },
    { name: 'Belt', description: 'A sturdy accessory that secures armor and holds essential items', cost: 1709, gains: 137, multiplier: 1.2, faction: 'ELF' },
    { name: 'Bracers', description: 'Arm guards that deflect blows and enhance striking power', cost: 2563, gains: 205, multiplier: 1.2, faction: 'ELF' },
    { name: 'Shoulder', description: 'Robust pauldrons that shield the upper body from attacks', cost: 3844, gains: 308, multiplier: 1.2, faction: 'ELF' },
    { name: 'Cloak', description: 'A flowing garment that offers concealment and weather protection', cost: 5767, gains: 461, multiplier: 1.2, faction: 'ELF' },
    { name: 'Neckless', description: "An ornate accessory that enhances the wearer's abilities", cost: 8650, gains: 692, multiplier: 1.2, faction: 'ELF' },
    { name: 'Ring', description: 'A small but powerful magical item worn on the finger', cost: 12975, gains: 1038, multiplier: 1.2, faction: 'ELF' },
    { name: 'Ring 2', description: 'An additional enchanted band complementing the first ring', cost: 19462, gains: 1557, multiplier: 1.2, faction: 'ELF' },
    { name: 'Trinket', description: 'A mysterious artifact imbued with unique magical properties', cost: 29193, gains: 2335, multiplier: 1.2, faction: 'ELF' },
    { name: 'Trinket 2', description: 'A second magical curio with its own set of mystical effects', cost: 43789, gains: 3503, multiplier: 1.2, faction: 'ELF' },
    { name: 'Melee Weapon Gem', description: 'A precious stone that augments close-combat prowess', cost: 65684, gains: 5255, multiplier: 1.2, faction: 'ELF' },
    { name: 'Ranged Weapon Gem', description: 'A crystal that enhances accuracy and power in ranged attacks', cost: 98526, gains: 7882, multiplier: 1.2, faction: 'ELF' },
    { name: 'Off-Hand Gem', description: 'A jewel that boosts the effectiveness of off-hand equipment', cost: 147789, gains: 11823, multiplier: 1.2, faction: 'ELF' },
    { name: 'Chest Gem', description: "A radiant gem that reinforces chest armor's protective qualities", cost: 221684, gains: 17735, multiplier: 1.2, faction: 'ELF' },
    { name: 'Pants Gem', description: 'A lustrous stone that enhances leg armor\'s defensive capabilities', cost: 332526, gains: 26602, multiplier: 1.2, faction: 'ELF' },
    { name: 'Gloves Gem', description: 'A sparkling gem that improves hand-to-hand combat skills', cost: 498789, gains: 39903, multiplier: 1.2, faction: 'ELF' },
    { name: 'Feet Gem', description: 'A shimmering stone that increases agility and sure-footedness', cost: 748183, gains: 59855, multiplier: 1.2, faction: 'ELF' },
    { name: 'Belt Gem', description: "A gleaming jewel that bolsters the wearer's core strength", cost: 1122274, gains: 89782, multiplier: 1.2, faction: 'ELF' },
    { name: 'Bracers Gem', description: 'A brilliant gem that amplifies the power of arm strikes', cost: 1683411, gains: 134673, multiplier: 1.2, faction: 'ELF' },
    { name: 'Shoulder Gem', description: "A dazzling stone that strengthens shoulder armor's durability", cost: 2525117, gains: 202009, multiplier: 1.2, faction: 'ELF' },
    { name: 'Cloak Gem', description: "A mystical gem that enhances the cloak's protective properties", cost: 3787675, gains: 303014, multiplier: 1.2, faction: 'ELF' },
    // Faction: Elf (continued)
    { name: 'Neckless Gem', description: "A precious stone that amplifies the necklace's magical effects", cost: 5681513, gains: 454521, multiplier: 1.2, faction: 'ELF' },
    { name: 'Ring Gem', description: "A tiny but potent gem that boosts the ring's enchantments", cost: 8522269, gains: 681782, multiplier: 1.2, faction: 'ELF' },
    { name: 'Ring 2 Gem', description: 'Another small yet powerful gem enhancing the second ring', cost: 12783404, gains: 1022672, multiplier: 1.2, faction: 'ELF' },
    { name: 'Trinket Gem', description: "A unique gem that complements the trinket's magical abilities", cost: 19175106, gains: 1534008, multiplier: 1.2, faction: 'ELF' },
    { name: 'Trinket 2 Gem', description: "A rare stone that synergizes with the second trinket's powers", cost: 28762659, gains: 2301013, multiplier: 1.2, faction: 'ELF' },
    { name: 'Melee Weapon Enchant', description: 'A magical enhancement improving close-combat effectiveness', cost: 43143988, gains: 3451519, multiplier: 1.2, faction: 'ELF' },
    { name: 'Ranged Weapon Enchant', description: 'An arcane upgrade boosting ranged attack capabilities', cost: 64715982, gains: 5177279, multiplier: 1.2, faction: 'ELF' },
    { name: 'Off-Hand Enchant', description: 'A mystical augmentation enhancing off-hand item performance', cost: 97073974, gains: 7765918, multiplier: 1.2, faction: 'ELF' },
    { name: 'Chest Enchant', description: "A powerful spell reinforcing the chest armor's protective qualities", cost: 145610961, gains: 11648877, multiplier: 1.2, faction: 'ELF' },
    { name: 'Pants Enchant', description: 'A magical enhancement improving leg armor\'s defensive capabilities', cost: 218416441, gains: 17473315, multiplier: 1.2, faction: 'ELF' },
    { name: 'Gloves Enchant', description: 'An arcane boost increasing hand-to-hand combat prowess', cost: 327624661, gains: 26209973, multiplier: 1.2, faction: 'ELF' },
    { name: 'Feet Enchant', description: 'A mystical upgrade enhancing agility and movement speed', cost: 491436992, gains: 39314959, multiplier: 1.2, faction: 'ELF' },
    { name: 'Belt Enchant', description: "A magical reinforcement boosting the wearer's overall stability", cost: 737155488, gains: 58972439, multiplier: 1.2, faction: 'ELF' },
    { name: 'Bracers Enchant', description: 'An arcane enhancement amplifying arm guard effectiveness', cost: 1105733232, gains: 88458659, multiplier: 1.2, faction: 'ELF' },
    { name: 'Shoulder Enchant', description: "A powerful spell strengthening shoulder armor's resilience", cost: 1658599848, gains: 132687988, multiplier: 1.2, faction: 'ELF' },
    { name: 'Cloak Enchant', description: "A mystical augmentation improving the cloak's protective qualities", cost: 2487899772, gains: 199031982, multiplier: 1.2, faction: 'ELF' },
    { name: 'Neckless Enchant', description: "An arcane boost amplifying the necklace's magical properties", cost: 3731849658, gains: 298547973, multiplier: 1.2, faction: 'ELF' },
    { name: 'Ring Enchant', description: "A potent spell enhancing the ring's mystical effects", cost: 5597774487, gains: 447821959, multiplier: 1.2, faction: 'ELF' },
    { name: 'Ring 2 Enchant', description: 'Another powerful enchantment boosting the second ring’s abilities', cost: 8396661731, gains: 671732938, multiplier: 1.2, faction: 'ELF' },
    { name: 'Trinket Enchant', description: "A unique magical enhancement complementing the trinket's powers", cost: 12594992597, gains: 1007599408, multiplier: 1.2, faction: 'ELF' },
    { name: 'Trinket 2 Enchant', description: "A rare arcane upgrade synergizing with the second trinket's abilities", cost: 18892488895, gains: 1511399112, multiplier: 1.2, faction: 'ELF' },
    { name: 'Melee Weapon Rune', description: 'Ancient symbols etched to enhance close-combat performance', cost: 28338733343, gains: 2267098667, multiplier: 1.2, faction: 'ELF' },
    { name: 'Ranged Weapon Rune', description: 'Mystical markings inscribed to improve ranged attack precision', cost: 42508100014, gains: 3400648001, multiplier: 1.2, faction: 'ELF' },
    { name: 'Off-Hand Rune', description: 'Arcane glyphs carved to boost off-hand equipment effectiveness', cost: 63762150021, gains: 5100972002, multiplier: 1.2, faction: 'ELF' },
    { name: 'Chest Rune', description: "Powerful sigils engraved to reinforce chest armor's protective qualities", cost: 95643225032, gains: 7651458003, multiplier: 1.2, faction: 'ELF' },
    { name: 'Pants Rune', description: 'Magical runes etched to enhance leg armor\'s defensive capabilities', cost: 143464837548, gains: 11477187004, multiplier: 1.2, faction: 'ELF' },
    { name: 'Gloves Rune', description: 'Ancient symbols inscribed to improve hand-to-hand combat skills', cost: 215197256322, gains: 17215780506, multiplier: 1.2, faction: 'ELF' },
    { name: 'Feet Rune', description: 'Mystical markings carved to increase agility and sure-footedness', cost: 322795884483, gains: 25823670759, multiplier: 1.2, faction: 'ELF' },
    { name: 'Belt Rune', description: "Arcane glyphs engraved to bolster the wearer's core strength", cost: 484193826725, gains: 38735506138, multiplier: 1.2, faction: 'ELF' },
    { name: 'Bracers Rune', description: 'Powerful sigils etched to amplify the effectiveness of arm guards', cost: 726290740088, gains: 58103259207, multiplier: 1.2, faction: 'ELF' },
    { name: 'Shoulder Rune', description: "Magical runes inscribed to strengthen shoulder armor's durability", cost: 1089436110131, gains: 87154888811, multiplier: 1.2, faction: 'ELF' },

    // Faction: Demon
    { name: 'Meele Weapon', description: 'A well-balanced weapon made of quality steel', cost: 100, gains: 8, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Ranged Weapon', description: 'A precise long-range weapon crafted for accuracy', cost: 150, gains: 12, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Off-Hand', description: 'A versatile item held in the non-dominant hand for defense or offense', cost: 225, gains: 18, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Chest Armor', description: 'Sturdy protection for the torso, forged from durable materials', cost: 338, gains: 27, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Pants', description: 'Flexible leg armor providing both mobility and defense', cost: 506, gains: 41, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Gloves', description: 'Reinforced hand protection allowing for dexterity in combat', cost: 759, gains: 61, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Feet', description: 'Reliable footwear designed for stability and protection in battle', cost: 1139, gains: 91, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Belt', description: 'A sturdy accessory that secures armor and holds essential items', cost: 1709, gains: 137, multiplier: 1.2, faction: 'DEMON' },
    // Faction: Demon (continued)
    { name: 'Bracers', description: 'Arm guards that deflect blows and enhance striking power', cost: 2563, gains: 205, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Shoulder', description: 'Robust pauldrons that shield the upper body from attacks', cost: 3844, gains: 308, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Cloak', description: 'A flowing garment that offers concealment and weather protection', cost: 5767, gains: 461, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Neckless', description: "An ornate accessory that enhances the wearer's abilities", cost: 8650, gains: 692, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Ring', description: 'A small but powerful magical item worn on the finger', cost: 12975, gains: 1038, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Ring 2', description: 'An additional enchanted band complementing the first ring', cost: 19462, gains: 1557, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Trinket', description: 'A mysterious artifact imbued with unique magical properties', cost: 29193, gains: 2335, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Trinket 2', description: 'A second magical curio with its own set of mystical effects', cost: 43789, gains: 3503, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Melee Weapon Gem', description: 'A precious stone that augments close-combat prowess', cost: 65684, gains: 5255, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Ranged Weapon Gem', description: 'A crystal that enhances accuracy and power in ranged attacks', cost: 98526, gains: 7882, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Off-Hand Gem', description: 'A jewel that boosts the effectiveness of off-hand equipment', cost: 147789, gains: 11823, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Chest Gem', description: "A radiant gem that reinforces chest armor's protective qualities", cost: 221684, gains: 17735, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Pants Gem', description: 'A lustrous stone that enhances leg armor\'s defensive capabilities', cost: 332526, gains: 26602, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Gloves Gem', description: 'A sparkling gem that improves hand-to-hand combat skills', cost: 498789, gains: 39903, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Feet Gem', description: 'A shimmering stone that increases agility and sure-footedness', cost: 748183, gains: 59855, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Belt Gem', description: "A gleaming jewel that bolsters the wearer's core strength", cost: 1122274, gains: 89782, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Bracers Gem', description: 'A brilliant gem that amplifies the power of arm strikes', cost: 1683411, gains: 134673, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Shoulder Gem', description: "A dazzling stone that strengthens shoulder armor's durability", cost: 2525117, gains: 202009, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Cloak Gem', description: "A mystical gem that enhances the cloak's protective properties", cost: 3787675, gains: 303014, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Neckless Gem', description: "A precious stone that amplifies the necklace's magical effects", cost: 5681513, gains: 454521, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Ring Gem', description: "A tiny but potent gem that boosts the ring's enchantments", cost: 8522269, gains: 681782, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Ring 2 Gem', description: 'Another small yet powerful gem enhancing the second ring', cost: 12783404, gains: 1022672, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Trinket Gem', description: "A unique gem that complements the trinket's magical abilities", cost: 19175106, gains: 1534008, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Trinket 2 Gem', description: "A rare stone that synergizes with the second trinket's powers", cost: 28762659, gains: 2301013, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Melee Weapon Enchant', description: 'A magical enhancement improving close-combat effectiveness', cost: 43143988, gains: 3451519, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Ranged Weapon Enchant', description: 'An arcane upgrade boosting ranged attack capabilities', cost: 64715982, gains: 5177279, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Off-Hand Enchant', description: 'A mystical augmentation enhancing off-hand item performance', cost: 97073974, gains: 7765918, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Chest Enchant', description: "A powerful spell reinforcing the chest armor's protective qualities", cost: 145610961, gains: 11648877, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Pants Enchant', description: 'A magical enhancement improving leg armor\'s defensive capabilities', cost: 218416441, gains: 17473315, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Gloves Enchant', description: 'An arcane boost increasing hand-to-hand combat prowess', cost: 327624661, gains: 26209973, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Feet Enchant', description: 'A mystical upgrade enhancing agility and movement speed', cost: 491436992, gains: 39314959, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Belt Enchant', description: "A magical reinforcement boosting the wearer's overall stability", cost: 737155488, gains: 58972439, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Bracers Enchant', description: 'An arcane enhancement amplifying arm guard effectiveness', cost: 1105733232, gains: 88458659, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Shoulder Enchant', description: "A powerful spell strengthening shoulder armor's resilience", cost: 1658599848, gains: 132687988, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Cloak Enchant', description: "A mystical augmentation improving the cloak's protective qualities", cost: 2487899772, gains: 199031982, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Neckless Enchant', description: "An arcane boost amplifying the necklace's magical properties", cost: 3731849658, gains: 298547973, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Ring Enchant', description: "A potent spell enhancing the ring's mystical effects", cost: 5597774487, gains: 447821959, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Ring 2 Enchant', description: 'Another powerful enchantment boosting the second ring’s abilities', cost: 8396661731, gains: 671732938, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Trinket Enchant', description: "A unique magical enhancement complementing the trinket's powers", cost: 12594992597, gains: 1007599408, multiplier: 1.2, faction: 'DEMON' },
    // Faction: Demon (continued)
    { name: 'Trinket 2 Enchant', description: "A rare arcane upgrade synergizing with the second trinket's abilities", cost: 18892488895, gains: 1511399112, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Melee Weapon Rune', description: 'Ancient symbols etched to enhance close-combat performance', cost: 28338733343, gains: 2267098667, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Ranged Weapon Rune', description: 'Mystical markings inscribed to improve ranged attack precision', cost: 42508100014, gains: 3400648001, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Off-Hand Rune', description: 'Arcane glyphs carved to boost off-hand equipment effectiveness', cost: 63762150021, gains: 5100972002, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Chest Rune', description: "Powerful sigils engraved to reinforce chest armor's protective qualities", cost: 95643225032, gains: 7651458003, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Pants Rune', description: 'Magical runes etched to enhance leg armor\'s defensive capabilities', cost: 143464837548, gains: 11477187004, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Gloves Rune', description: 'Ancient symbols inscribed to improve hand-to-hand combat skills', cost: 215197256322, gains: 17215780506, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Feet Rune', description: 'Mystical markings carved to increase agility and sure-footedness', cost: 322795884483, gains: 25823670759, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Belt Rune', description: "Arcane glyphs engraved to bolster the wearer's core strength", cost: 484193826725, gains: 38735506138, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Bracers Rune', description: 'Powerful sigils etched to amplify the effectiveness of arm guards', cost: 726290740088, gains: 58103259207, multiplier: 1.2, faction: 'DEMON' },
    { name: 'Shoulder Rune', description: "Magical runes inscribed to strengthen shoulder armor's durability", cost: 1089436110131, gains: 87154888811, multiplier: 1.2, faction: 'DEMON' },
    // Faction: Angel
    { name: 'Meele Weapon', description: 'A well-balanced weapon made of quality steel', cost: 100, gains: 8, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Ranged Weapon', description: 'A precise long-range weapon crafted for accuracy', cost: 150, gains: 12, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Off-Hand', description: 'A versatile item held in the non-dominant hand for defense or offense', cost: 225, gains: 18, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Chest Armor', description: 'Sturdy protection for the torso, forged from durable materials', cost: 338, gains: 27, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Pants', description: 'Flexible leg armor providing both mobility and defense', cost: 506, gains: 41, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Gloves', description: 'Reinforced hand protection allowing for dexterity in combat', cost: 759, gains: 61, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Feet', description: 'Reliable footwear designed for stability and protection in battle', cost: 1139, gains: 91, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Belt', description: 'A sturdy accessory that secures armor and holds essential items', cost: 1709, gains: 137, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Bracers', description: 'Arm guards that deflect blows and enhance striking power', cost: 2563, gains: 205, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Shoulder', description: 'Robust pauldrons that shield the upper body from attacks', cost: 3844, gains: 308, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Cloak', description: 'A flowing garment that offers concealment and weather protection', cost: 5767, gains: 461, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Neckless', description: "An ornate accessory that enhances the wearer's abilities", cost: 8650, gains: 692, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Ring', description: 'A small but powerful magical item worn on the finger', cost: 12975, gains: 1038, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Ring 2', description: 'An additional enchanted band complementing the first ring', cost: 19462, gains: 1557, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Trinket', description: 'A mysterious artifact imbued with unique magical properties', cost: 29193, gains: 2335, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Trinket 2', description: 'A second magical curio with its own set of mystical effects', cost: 43789, gains: 3503, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Melee Weapon Gem', description: 'A precious stone that augments close-combat prowess', cost: 65684, gains: 5255, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Ranged Weapon Gem', description: 'A crystal that enhances accuracy and power in ranged attacks', cost: 98526, gains: 7882, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Off-Hand Gem', description: 'A jewel that boosts the effectiveness of off-hand equipment', cost: 147789, gains: 11823, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Chest Gem', description: "A radiant gem that reinforces chest armor's protective qualities", cost: 221684, gains: 17735, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Pants Gem', description: 'A lustrous stone that enhances leg armor\'s defensive capabilities', cost: 332526, gains: 26602, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Gloves Gem', description: 'A sparkling gem that improves hand-to-hand combat skills', cost: 498789, gains: 39903, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Feet Gem', description: 'A shimmering stone that increases agility and sure-footedness', cost: 748183, gains: 59855, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Belt Gem', description: "A gleaming jewel that bolsters the wearer's core strength", cost: 1122274, gains: 89782, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Bracers Gem', description: 'A brilliant gem that amplifies the power of arm strikes', cost: 1683411, gains: 134673, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Shoulder Gem', description: "A dazzling stone that strengthens shoulder armor's durability", cost: 2525117, gains: 202009, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Cloak Gem', description: "A mystical gem that enhances the cloak's protective properties", cost: 3787675, gains: 303014, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Neckless Gem', description: "A precious stone that amplifies the necklace's magical effects", cost: 5681513, gains: 454521, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Ring Gem', description: "A tiny but potent gem that boosts the ring's enchantments", cost: 8522269, gains: 681782, multiplier: 1.2, faction: 'ANGEL' },
    // Faction: Angel (continued)
    { name: 'Ring 2 Gem', description: 'Another small yet powerful gem enhancing the second ring', cost: 12783404, gains: 1022672, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Trinket Gem', description: "A unique gem that complements the trinket's magical abilities", cost: 19175106, gains: 1534008, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Trinket 2 Gem', description: "A rare stone that synergizes with the second trinket's powers", cost: 28762659, gains: 2301013, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Melee Weapon Enchant', description: 'A magical enhancement improving close-combat effectiveness', cost: 43143988, gains: 3451519, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Ranged Weapon Enchant', description: 'An arcane upgrade boosting ranged attack capabilities', cost: 64715982, gains: 5177279, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Off-Hand Enchant', description: 'A mystical augmentation enhancing off-hand item performance', cost: 97073974, gains: 7765918, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Chest Enchant', description: "A powerful spell reinforcing the chest armor's protective qualities", cost: 145610961, gains: 11648877, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Pants Enchant', description: 'A magical enhancement improving leg armor\'s defensive capabilities', cost: 218416441, gains: 17473315, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Gloves Enchant', description: 'An arcane boost increasing hand-to-hand combat prowess', cost: 327624661, gains: 26209973, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Feet Enchant', description: 'A mystical upgrade enhancing agility and movement speed', cost: 491436992, gains: 39314959, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Belt Enchant', description: "A magical reinforcement boosting the wearer's overall stability", cost: 737155488, gains: 58972439, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Bracers Enchant', description: 'An arcane enhancement amplifying arm guard effectiveness', cost: 1105733232, gains: 88458659, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Shoulder Enchant', description: "A powerful spell strengthening shoulder armor's resilience", cost: 1658599848, gains: 132687988, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Cloak Enchant', description: "A mystical augmentation improving the cloak's protective qualities", cost: 2487899772, gains: 199031982, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Neckless Enchant', description: "An arcane boost amplifying the necklace's magical properties", cost: 3731849658, gains: 298547973, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Ring Enchant', description: "A potent spell enhancing the ring's mystical effects", cost: 5597774487, gains: 447821959, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Ring 2 Enchant', description: 'Another powerful enchantment boosting the second ring’s abilities', cost: 8396661731, gains: 671732938, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Trinket Enchant', description: "A unique magical enhancement complementing the trinket's powers", cost: 12594992597, gains: 1007599408, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Trinket 2 Enchant', description: "A rare arcane upgrade synergizing with the second trinket's abilities", cost: 18892488895, gains: 1511399112, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Melee Weapon Rune', description: 'Ancient symbols etched to enhance close-combat performance', cost: 28338733343, gains: 2267098667, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Ranged Weapon Rune', description: 'Mystical markings inscribed to improve ranged attack precision', cost: 42508100014, gains: 3400648001, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Off-Hand Rune', description: 'Arcane glyphs carved to boost off-hand equipment effectiveness', cost: 63762150021, gains: 5100972002, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Chest Rune', description: "Powerful sigils engraved to reinforce chest armor's protective qualities", cost: 95643225032, gains: 7651458003, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Pants Rune', description: 'Magical runes etched to enhance leg armor\'s defensive capabilities', cost: 143464837548, gains: 11477187004, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Gloves Rune', description: 'Ancient symbols inscribed to improve hand-to-hand combat skills', cost: 215197256322, gains: 17215780506, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Feet Rune', description: 'Mystical markings carved to increase agility and sure-footedness', cost: 322795884483, gains: 25823670759, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Belt Rune', description: "Arcane glyphs engraved to bolster the wearer's core strength", cost: 484193826725, gains: 38735506138, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Bracers Rune', description: 'Powerful sigils etched to amplify the effectiveness of arm guards', cost: 726290740088, gains: 58103259207, multiplier: 1.2, faction: 'ANGEL' },
    { name: 'Shoulder Rune', description: "Magical runes inscribed to strengthen shoulder armor's durability", cost: 1089436110131, gains: 87154888811, multiplier: 1.2, faction: 'ANGEL' },

    // Faction: Undead
    { name: 'Meele Weapon', description: 'A well-balanced weapon made of quality steel', cost: 100, gains: 8, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Ranged Weapon', description: 'A precise long-range weapon crafted for accuracy', cost: 150, gains: 12, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Off-Hand', description: 'A versatile item held in the non-dominant hand for defense or offense', cost: 225, gains: 18, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Chest Armor', description: 'Sturdy protection for the torso, forged from durable materials', cost: 338, gains: 27, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Pants', description: 'Flexible leg armor providing both mobility and defense', cost: 506, gains: 41, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Gloves', description: 'Reinforced hand protection allowing for dexterity in combat', cost: 759, gains: 61, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Feet', description: 'Reliable footwear designed for stability and protection in battle', cost: 1139, gains: 91, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Belt', description: 'A sturdy accessory that secures armor and holds essential items', cost: 1709, gains: 137, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Bracers', description: 'Arm guards that deflect blows and enhance striking power', cost: 2563, gains: 205, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Shoulder', description: 'Robust pauldrons that shield the upper body from attacks', cost: 3844, gains: 308, multiplier: 1.2, faction: 'UNDEAD' },
    // Faction: Undead (continued)
    { name: 'Cloak', description: 'A flowing garment that offers concealment and weather protection', cost: 5767, gains: 461, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Neckless', description: "An ornate accessory that enhances the wearer's abilities", cost: 8650, gains: 692, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Ring', description: 'A small but powerful magical item worn on the finger', cost: 12975, gains: 1038, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Ring 2', description: 'An additional enchanted band complementing the first ring', cost: 19462, gains: 1557, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Trinket', description: 'A mysterious artifact imbued with unique magical properties', cost: 29193, gains: 2335, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Trinket 2', description: 'A second magical curio with its own set of mystical effects', cost: 43789, gains: 3503, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Melee Weapon Gem', description: 'A precious stone that augments close-combat prowess', cost: 65684, gains: 5255, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Ranged Weapon Gem', description: 'A crystal that enhances accuracy and power in ranged attacks', cost: 98526, gains: 7882, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Off-Hand Gem', description: 'A jewel that boosts the effectiveness of off-hand equipment', cost: 147789, gains: 11823, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Chest Gem', description: "A radiant gem that reinforces chest armor's protective qualities", cost: 221684, gains: 17735, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Pants Gem', description: 'A lustrous stone that enhances leg armor\'s defensive capabilities', cost: 332526, gains: 26602, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Gloves Gem', description: 'A sparkling gem that improves hand-to-hand combat skills', cost: 498789, gains: 39903, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Feet Gem', description: 'A shimmering stone that increases agility and sure-footedness', cost: 748183, gains: 59855, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Belt Gem', description: "A gleaming jewel that bolsters the wearer's core strength", cost: 1122274, gains: 89782, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Bracers Gem', description: 'A brilliant gem that amplifies the power of arm strikes', cost: 1683411, gains: 134673, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Shoulder Gem', description: "A dazzling stone that strengthens shoulder armor's durability", cost: 2525117, gains: 202009, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Cloak Gem', description: "A mystical gem that enhances the cloak's protective properties", cost: 3787675, gains: 303014, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Neckless Gem', description: "A precious stone that amplifies the necklace's magical effects", cost: 5681513, gains: 454521, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Ring Gem', description: "A tiny but potent gem that boosts the ring's enchantments", cost: 8522269, gains: 681782, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Ring 2 Gem', description: 'Another small yet powerful gem enhancing the second ring', cost: 12783404, gains: 1022672, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Trinket Gem', description: "A unique gem that complements the trinket's magical abilities", cost: 19175106, gains: 1534008, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Trinket 2 Gem', description: "A rare stone that synergizes with the second trinket's powers", cost: 28762659, gains: 2301013, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Melee Weapon Enchant', description: 'A magical enhancement improving close-combat effectiveness', cost: 43143988, gains: 3451519, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Ranged Weapon Enchant', description: 'An arcane upgrade boosting ranged attack capabilities', cost: 64715982, gains: 5177279, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Off-Hand Enchant', description: 'A mystical augmentation enhancing off-hand item performance', cost: 97073974, gains: 7765918, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Chest Enchant', description: "A powerful spell reinforcing the chest armor's protective qualities", cost: 145610961, gains: 11648877, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Pants Enchant', description: 'A magical enhancement improving leg armor\'s defensive capabilities', cost: 218416441, gains: 17473315, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Gloves Enchant', description: 'An arcane boost increasing hand-to-hand combat prowess', cost: 327624661, gains: 26209973, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Feet Enchant', description: 'A mystical upgrade enhancing agility and movement speed', cost: 491436992, gains: 39314959, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Belt Enchant', description: "A magical reinforcement boosting the wearer's overall stability", cost: 737155488, gains: 58972439, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Bracers Enchant', description: 'An arcane enhancement amplifying arm guard effectiveness', cost: 1105733232, gains: 88458659, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Shoulder Enchant', description: "A powerful spell strengthening shoulder armor's resilience", cost: 1658599848, gains: 132687988, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Cloak Enchant', description: "A mystical augmentation improving the cloak's protective qualities", cost: 2487899772, gains: 199031982, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Neckless Enchant', description: "An arcane boost amplifying the necklace's magical properties", cost: 3731849658, gains: 298547973, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Ring Enchant', description: "A potent spell enhancing the ring's mystical effects", cost: 5597774487, gains: 447821959, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Ring 2 Enchant', description: 'Another powerful enchantment boosting the second ring’s abilities', cost: 8396661731, gains: 671732938, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Trinket Enchant', description: "A unique magical enhancement complementing the trinket's powers", cost: 12594992597, gains: 1007599408, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Trinket 2 Enchant', description: "A rare arcane upgrade synergizing with the second trinket's abilities", cost: 18892488895, gains: 1511399112, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Melee Weapon Rune', description: 'Ancient symbols etched to enhance close-combat performance', cost: 28338733343, gains: 2267098667, multiplier: 1.2, faction: 'UNDEAD' },
    // Faction: Undead (continued)
    { name: 'Ranged Weapon Rune', description: 'Mystical markings inscribed to improve ranged attack precision', cost: 42508100014, gains: 3400648001, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Off-Hand Rune', description: 'Arcane glyphs carved to boost off-hand equipment effectiveness', cost: 63762150021, gains: 5100972002, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Chest Rune', description: "Powerful sigils engraved to reinforce chest armor's protective qualities", cost: 95643225032, gains: 7651458003, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Pants Rune', description: 'Magical runes etched to enhance leg armor\'s defensive capabilities', cost: 143464837548, gains: 11477187004, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Gloves Rune', description: 'Ancient symbols inscribed to improve hand-to-hand combat skills', cost: 215197256322, gains: 17215780506, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Feet Rune', description: 'Mystical markings carved to increase agility and sure-footedness', cost: 322795884483, gains: 25823670759, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Belt Rune', description: "Arcane glyphs engraved to bolster the wearer's core strength", cost: 484193826725, gains: 38735506138, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Bracers Rune', description: 'Powerful sigils etched to amplify the effectiveness of arm guards', cost: 726290740088, gains: 58103259207, multiplier: 1.2, faction: 'UNDEAD' },
    { name: 'Shoulder Rune', description: "Magical runes inscribed to strengthen shoulder armor's durability", cost: 1089436110131, gains: 87154888811, multiplier: 1.2, faction: 'UNDEAD' }
];

const soldierData = [
    // Orc Faction
    { name: 'Kobold Slave', description: 'Weakest unit, used as meat shields.', cost: 506, gains: 30, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Goblin Archer', description: 'Weak and fast ranged units.', cost: 1341, gains: 80, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Orc Youngling', description: 'Low damage melee units.', cost: 3553, gains: 211, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Wolf Pack', description: 'Aggressive beasts, fast with light damage.', cost: 9416, gains: 558, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Orc Grunt', description: 'Standard melee units.', cost: 24954, gains: 1479, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Orc Spearman', description: 'Effective against infantry.', cost: 66127, gains: 3921, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Orc Axeman', description: 'High damage melee units.', cost: 175237, gains: 10390, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Orc Hunter', description: 'High ranged damage.', cost: 464378, gains: 27532, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Orc Shaman', description: 'Support unit, heals and buffs.', cost: 1230602, gains: 72961, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Orc Warlock', description: 'Cast offensive spells.', cost: 3261094, gains: 193346, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Troll', description: 'High health and damage, slow.', cost: 8641900, gains: 512366, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Harpie', description: 'Flying unit, fast with ranged attacks.', cost: 22901036, gains: 1357769, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Spider Swarm', description: 'Numerous weak spiders.', cost: 60687745, gains: 3598088, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Stone Giant', description: 'High health and damage, very slow.', cost: 160822526, gains: 9534932, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Orc Champion', description: 'Powerful units specializing in melee combat.', cost: 426179693, gains: 25267571, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Orc Warlord', description: 'Leaders of the army, very powerful.', cost: 1129376186, gains: 66959062, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Direwolve', description: 'Very strong and aggressive beasts.', cost: 2992846892, gains: 177441515, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Black Orc Warrior', description: 'Elite melee units.', cost: 7931044265, gains: 470220016, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Orc Raider', description: 'Fast and strong.', cost: 21017267301, gains: 1246083042, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Warlock Shamans', description: 'Powerful spellcasters with support abilities.', cost: 55695758349, gains: 3302120060, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Orc Necromancer', description: 'Raise and control the dead.', cost: 147593759624, gains: 8750618160, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Dragon Rider', description: 'Very powerful flying unit.', cost: 391123463004, gains: 23189138123, costGainingMultiplier: 1.05, faction: 'ORC' },
    { name: 'Hell Lord', description: 'The strongest unit, demon-like creatures.', cost: 1036477176961, gains: 61451216025, costGainingMultiplier: 1.05, faction: 'ORC' },
// Human Faction
    { name: 'Peasant', description: 'The weakest unit, used for resource gathering and last-resort defense.', cost: 506, gains: 30, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Militia', description: 'Lightly armed and armored, useful for early game defense and reconnaissance.', cost: 1341, gains: 80, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Scout', description: 'Fast and agile units used for scouting and harassment.', cost: 3553, gains: 211, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Archer', description: 'Bow-wielding ranged units, effective against infantry and flying units.', cost: 9416, gains: 558, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Crossbowman', description: 'Crossbow-wielding ranged units, high damage but slower than archers.', cost: 24954, gains: 1479, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Footman', description: 'Basic melee units with sword and shield, versatile and reliable.', cost: 66127, gains: 3921, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Pikeman', description: 'Long spear-wielding melee units, effective against cavalry.', cost: 175237, gains: 10390, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Priest', description: 'Support unit, heals and empowers allies with divine magic.', cost: 464378, gains: 27532, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Longbowman', description: 'Long bow-wielding ranged units, high damage and long range.', cost: 1230602, gains: 72961, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Mage', description: 'Versatile and powerful, casting offensive and defensive spells.', cost: 3261094, gains: 193346, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Knight', description: 'Heavily armored cavalry units, effective against infantry.', cost: 8641900, gains: 512366, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Cavalry Archer', description: 'Mounted archers with high mobility and good damage output.', cost: 22901036, gains: 1357769, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Assassin', description: 'Stealthy units with deadly poisons and surprise attacks.', cost: 60687745, gains: 3598088, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Battle Mage', description: 'Powerful mages specialized in offensive magic.', cost: 160822526, gains: 9534932, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Inquisitor', description: 'Zealous warriors with holy powers, effective against undead.', cost: 426179693, gains: 25267571, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Priest of Light', description: 'Powerful healers and empowerers with divine light magic.', cost: 1129376186, gains: 66959062, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Arcane Wizard', description: 'Powerful mages specialized in arcane magic.', cost: 2992846892, gains: 177441515, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Royal Guard', description: 'Elite melee units with heavy armor and powerful weapons.', cost: 7931044265, gains: 470220016, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Spellbreaker', description: 'Anti-magic units that disrupt enemy spells and enchantments.', cost: 21017267301, gains: 1246083042, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Dragon Knight', description: 'Elite cavalry units riding dragons, devastating in battle.', cost: 55695758349, gains: 3302120060, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Field Marshal', description: 'Leaders of the army, skilled tacticians and strategists.', cost: 147593759624, gains: 8750618160, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Paladin', description: 'Holy warriors with divine powers, strong melee fighters and healers.', cost: 391123463004, gains: 23189138123, costGainingMultiplier: 1.05, faction: 'HUMAN' },
    { name: 'Titan', description: 'A legendary being of immense size, power, and durability, capable of devastating attacks and commanding armies.', cost: 1036477176961, gains: 61451216025, costGainingMultiplier: 1.05, faction: 'HUMAN' },

    // Elf Faction
    { name: 'Dryad Sprite', description: 'Weakest unit, used as distractions.', cost: 506, gains: 30, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Woodland Archer Scout', description: 'Weak but agile ranged units.', cost: 1341, gains: 80, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Elven Militia', description: 'Low damage melee units with high agility.', cost: 3553, gains: 211, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Unicorn Charger', description: 'Swift and graceful beasts with light damage.', cost: 9416, gains: 558, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Elven Swordsman', description: 'Standard melee units with balanced stats.', cost: 24954, gains: 1479, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Elven Spearman', description: 'Effective against infantry and cavalry.', cost: 66127, gains: 3921, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Elven Glaive Warrior', description: 'High damage melee units with extended reach.', cost: 175237, gains: 10390, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Elven Ranger', description: 'High ranged damage and stealth capabilities.', cost: 464378, gains: 27532, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Elven Priest', description: 'Support unit, heals and buffs allies.', cost: 1230602, gains: 72961, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Elven Mage', description: 'Cast offensive and defensive spells.', cost: 3261094, gains: 193346, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Treant', description: 'High health and damage, slow but sturdy.', cost: 8641900, gains: 512366, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Hippogryph Rider', description: 'Flying unit, fast with ranged attacks.', cost: 22901036, gains: 1357769, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Moon Panther Pack', description: 'Agile predators with deadly pounces.', cost: 60687745, gains: 3598088, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Ancient Ent', description: 'High health and damage, very slow but powerful.', cost: 160822526, gains: 9534932, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Elven Blade Master', description: 'Powerful units specializing in melee combat.', cost: 426179693, gains: 25267571, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Elven High Commander', description: 'Leaders of the army, skilled tacticians.', cost: 1129376186, gains: 66959062, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Great Eagle', description: 'Powerful aerial predators with sharp talons.', cost: 2992846892, gains: 177441515, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Elven Royal Guard', description: 'Elite melee units with exceptional defense.', cost: 7931044265, gains: 470220016, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Elven Cavalry', description: 'Swift and skilled riders with lances.', cost: 21017267301, gains: 1246083042, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'High Mage', description: 'Powerful spellcasters with a wide range of spells.', cost: 55695758349, gains: 3302120060, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Priestess of the Moon', description: 'Healers and buffers with lunar magic.', cost: 147593759624, gains: 8750618160, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Dragonhawk Rider', description: 'Aerial archers with high mobility.', cost: 391123463004, gains: 23189138123, costGainingMultiplier: 1.05, faction: 'ELF' },
    { name: 'Avatar of Nature', description: 'The strongest unit, a manifestation of nature\'s power.', cost: 1036477176961, gains: 61451216025, costGainingMultiplier: 1.05, faction: 'ELF' },

    // Demon Faction
    { name: 'Imp', description: 'Weakest unit, used as distractions and for swarming.', cost: 506, gains: 30, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Hell Imp', description: 'Weak ranged units with fire attacks.', cost: 1341, gains: 80, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Lesser Demon', description: 'Low damage melee units with high aggression.', cost: 3553, gains: 211, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Hellhound Pack', description: 'Fast and ferocious beasts with fiery attacks.', cost: 9416, gains: 558, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Demon Warrior', description: 'Standard melee units with decent damage and resilience.', cost: 24954, gains: 1479, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Succubus Enchantress', description: 'Weaken enemies with charm and seduction.', cost: 66127, gains: 3921, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Demon Berserker', description: 'High damage melee units with reckless abandon.', cost: 175237, gains: 10390, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Gargoyle', description: 'Flying unit, fast with ranged attacks and stone skin.', cost: 464378, gains: 27532, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Warlock', description: 'Cast offensive and defensive spells, summon lesser demons.', cost: 1230602, gains: 72961, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Infernal Mage', description: 'Powerful spellcasters specializing in fire and chaos magic.', cost: 3261094, gains: 193346, costGainingMultiplier: 1.05, faction: 'DEMON' },
    // Demon Faction (continued)
    { name: 'Flesh Golem', description: 'High health and damage, slow but resistant to physical attacks.', cost: 8641900, gains: 512366, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Abyssal Fiend', description: 'Flying unit, strong melee attackers with demonic aura.', cost: 22901036, gains: 1357769, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Shadow Demon Assassin', description: 'Stealthy units with deadly surprise attacks.', cost: 60687745, gains: 3598088, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Balrog', description: 'High health and damage, wield fiery whips and swords.', cost: 160822526, gains: 9534932, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Demon Champion', description: 'Powerful melee units with demonic powers and armor.', cost: 426179693, gains: 25267571, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Demon Overlord', description: 'Leaders of the army, skilled tacticians and powerful warriors.', cost: 1129376186, gains: 66959062, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Soul Eaters', description: 'Flying creatures that drain the life force of enemies.', cost: 2992846892, gains: 177441515, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Bloodthirster Demon', description: 'Elite melee units with insatiable bloodlust.', cost: 7931044265, gains: 470220016, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Hell Knight', description: 'Mounted warriors with demonic steeds and fiery weapons.', cost: 21017267301, gains: 1246083042, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Archdemon', description: 'Powerful spellcasters with devastating area-of-effect spells.', cost: 55695758349, gains: 3302120060, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Succubi Queen', description: 'Command lesser demons, seduce and control enemies.', cost: 147593759624, gains: 8750618160, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Pit Lord', description: 'Massive demons with immense strength and fiery breath.', cost: 391123463004, gains: 23189138123, costGainingMultiplier: 1.05, faction: 'DEMON' },
    { name: 'Demon Prince', description: 'The strongest unit, a high-ranking demon with immense power.', cost: 1036477176961, gains: 61451216025, costGainingMultiplier: 1.05, faction: 'DEMON' },

    // Angel Faction
    { name: 'Cherub', description: 'Weakest unit, used for healing and support.', cost: 506, gains: 30, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Divine Archer', description: 'Ranged units with holy arrows.', cost: 1341, gains: 80, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Seraphim Warrior', description: 'Low damage melee units with high defense.', cost: 3553, gains: 211, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Pegasus Rider', description: 'Flying unit with swift attacks and healing abilities.', cost: 9416, gains: 558, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Angelic Guard', description: 'Standard melee units with balanced stats.', cost: 24954, gains: 1479, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Virtue', description: 'Melee units with holy maces, effective against demons.', cost: 66127, gains: 3921, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Archangel', description: 'High damage melee units with divine powers.', cost: 175237, gains: 10390, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Avenging Angel', description: 'Ranged units with holy spears, high damage output.', cost: 464378, gains: 27532, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Cleric', description: 'Support unit, heals and buffs allies with holy magic.', cost: 1230602, gains: 72961, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Seraphim Mage', description: 'Cast offensive and defensive spells with divine energy.', cost: 3261094, gains: 193346, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Guardian Angel', description: 'High health and damage, slow but sturdy protectors.', cost: 8641900, gains: 512366, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Throne', description: 'Flying unit, strong melee attackers with radiant auras.', cost: 22901036, gains: 1357769, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Divine Avenger', description: 'Elite melee units with holy weapons and powerful attacks.', cost: 60687745, gains: 3598088, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Seraphim Elder', description: 'High health and damage, wise leaders with powerful spells.', cost: 160822526, gains: 9534932, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Seraphim Champion', description: 'Powerful melee units with radiant wings and holy swords.', cost: 426179693, gains: 25267571, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Angelic Commander', description: 'Leaders of the army, skilled tacticians and warriors.', cost: 1129376186, gains: 66959062, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Griffon Rider', description: 'Flying unit with swift attacks and powerful claws.', cost: 2992846892, gains: 177441515, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Dominion', description: 'Elite melee units with divine armor and powerful auras.', cost: 7931044265, gains: 470220016, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Celestial Cavalry', description: 'Mounted warriors with holy lances and divine steeds.', cost: 21017267301, gains: 1246083042, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'High Seraphim', description: 'Powerful spellcasters with devastating holy magic.', cost: 55695758349, gains: 3302120060, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Virtues of Valor', description: 'Powerful melee units with holy shields and auras of protection.', cost: 147593759624, gains: 8750618160, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'Archangels of Justice', description: 'Powerful melee units with holy swords and wings of light.', cost: 391123463004, gains: 23189138123, costGainingMultiplier: 1.05, faction: 'ANGEL' },
    { name: 'The Divine Avatar', description: 'The strongest unit, a manifestation of divine power and light.', cost: 1036477176961, gains: 61451216025, costGainingMultiplier: 1.05, faction: 'ANGEL' },

    // Undead Faction
    { name: 'Skeleton', description: 'Weakest unit, numerous and expendable.', cost: 506, gains: 30, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Zombie', description: 'Slow and weak melee units with high numbers.', cost: 1341, gains: 80, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    // Undead Faction (continued)
    { name: 'Skeleton Archer', description: 'Ranged units with low damage but long range.', cost: 3553, gains: 211, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Ghoul', description: 'Faster melee units with a poisonous bite.', cost: 9416, gains: 558, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Crypt Ghoul', description: 'Stronger melee units with regeneration abilities.', cost: 24954, gains: 1479, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Necromancer', description: 'Spellcasters who summon and control undead units.', cost: 66127, gains: 3921, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Wraith', description: 'Ethereal units with chilling touch and life drain.', cost: 175237, gains: 10390, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Wight', description: 'Powerful melee units with fear aura and life drain.', cost: 464378, gains: 27532, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Banshee', description: 'Ethereal units with a wail that causes fear and weakens enemies.', cost: 1230602, gains: 72961, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Skeletal Champion', description: 'Stronger skeletal warriors with increased damage.', cost: 3261094, gains: 193346, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Abomination', description: 'Hulking constructs made of stitched-together corpses.', cost: 8641900, gains: 512366, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Revenant', description: 'Powerful melee units driven by vengeance, difficult to kill.', cost: 22901036, gains: 1357769, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Vampire Knight', description: 'Elite mounted units with blood magic and powerful charges.', cost: 60687745, gains: 3598088, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Bone Dragon', description: 'Flying units with skeletal frames and chilling breath.', cost: 160822526, gains: 9534932, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Death Knight', description: 'Powerful mounted units with necrotic aura and weapons.', cost: 426179693, gains: 25267571, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Lich', description: 'Powerful spellcasters with mastery over death magic.', cost: 1129376186, gains: 66959062, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Tomb King', description: 'Ancient rulers resurrected with powerful spells and artifacts.', cost: 2992846892, gains: 177441515, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Spectres', description: 'Ethereal units with high damage and possession abilities.', cost: 7931044265, gains: 470220016, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Banshee Queen', description: 'Powerful banshees with enhanced wails and control over lesser banshees.', cost: 21017267301, gains: 1246083042, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Death Mage', description: 'High-level spellcasters specializing in necromancy.', cost: 55695758349, gains: 3302120060, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Bone Giant', description: 'Massive skeletal constructs with immense strength and devastating attacks.', cost: 147593759624, gains: 8750618160, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Soul Reaper', description: 'Elite specters with devastating scythes and life-draining abilities.', cost: 391123463004, gains: 23189138123, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
    { name: 'Dread Necromancer', description: 'The strongest unit, a master necromancer with dominion over the undead, surpassing even the Lich King in power and malevolence.', cost: 1036477176961, gains: 61451216025, costGainingMultiplier: 1.05, faction: 'UNDEAD' },
];

const spellData = [
    // Orc Faction
    { name: 'Warcry Energy', description: 'A channeled spell that gradually increases the damage and attack speed of nearby Orc units', cost: 1139, gains: 80, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Green Tide', description: 'Summons a horde of lesser Orcs to swarm and overwhelm the enemy', cost: 2164, gains: 152, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Rock Lobber', description: 'Hurls a massive boulder at a target location, dealing heavy damage and knocking back enemies', cost: 4112, gains: 289, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Firestorm', description: 'Calls down a rain of flaming meteors, setting the battlefield ablaze and causing panic', cost: 7812, gains: 549, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Blood Boil', description: 'Infects enemy units with a rage-inducing disease, causing them to attack friend and foe alike', cost: 14844, gains: 1043, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Ironhide Aura', description: 'Grants nearby Orc units increased armor and damage resistance', cost: 28203, gains: 1981, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Spirit Shield', description: 'Creates a protective barrier that absorbs incoming damage for a short duration', cost: 53585, gains: 3764, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Troll Regeneration', description: 'Enhances the natural regenerative abilities of Orc Trolls', cost: 101812, gains: 7151, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Ground Slam', description: 'Creates a shockwave that stuns and damages nearby enemies', cost: 193443, gains: 13587, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'War Chant', description: 'Inspires nearby Orc units, increasing their morale and resistance to fear', cost: 367541, gains: 25815, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Feral Speed', description: 'Increases the movement speed of Orc units for a short duration', cost: 698328, gains: 49049, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Blood Scent', description: 'Reveals the location of hidden enemies within a certain radius', cost: 1326824, gains: 93192, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Shamanistic Ward', description: 'Protects friendly units from harmful spells and effects', cost: 2520966, gains: 177065, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Call of the Steppes', description: 'Summons wild beasts to fight alongside the Orcs', cost: 4789835, gains: 336424, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Vision Quest', description: 'Grants the caster temporary vision of the entire battlefield', cost: 9100686, gains: 639205, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Enfeeblement', description: 'Weakens enemy units, reducing their attack and defense', cost: 17291304, gains: 1214490, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Vulnerability', description: 'Increases the damage taken by enemy units', cost: 32853477, gains: 2307531, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Confusion', description: 'Causes enemy units to attack randomly, including their own allies', cost: 62421606, gains: 4384309, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Rotting Touch', description: 'Inflicts a disease on enemy units, causing them to slowly decay and weaken', cost: 118601052, gains: 8330188, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Bane of Weakblood', description: 'Curses enemy units, reducing their strength and agility', cost: 225341999, gains: 15827357, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'War God\'s Might', description: 'Summons a powerful avatar of Gork (or Mork) to wreak havoc on the battlefield', cost: 428149798, gains: 30071979, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'The Great Warcry', description: 'A massive, channeled spell that significantly increases the power and size of the entire Orc army', cost: 813484616, gains: 57136760, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Rupturing Earth', description: 'Creates fissures in the earth that erupt with molten rock, dealing damage and creating obstacles', cost: 1545620770, gains: 108559843, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Blood Moon', description: 'Turns the sky blood red, granting Orc units increased strength and ferocity at night', cost: 2936679462, gains: 206263702, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Ancestral Fury', description: 'Calls upon the spirits of Orc ancestors to possess and empower Orc units', cost: 5579690978, gains: 391901034, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Blood Sacrifice', description: 'Sacrifices a portion of the Orc army to temporarily empower the remaining units', cost: 10601412859, gains: 744611966, costGainingMultiplier: 1.3, faction: 'ORC' },
    { name: 'Summon Greater Demon', description: 'Summons a powerful demon to fight alongside the Orcs, but at a great cost', cost: 20142684432, gains: 1414762734, costGainingMultiplier: 1.3, faction: 'ORC' },
// Human Faction
    { name: 'Fireball', description: 'Hurls a fiery projectile that explodes on impact, dealing area damage', cost: 1139, gains: 80, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Lightning Bolt', description: 'A swift bolt of lightning that strikes a single enemy, dealing high damage', cost: 2164, gains: 152, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Ice Lance', description: 'A piercing shard of ice that pierces through multiple enemies', cost: 4112, gains: 289, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Arrow Volley', description: 'Unleashes a volley of arrows that rain down on a target area', cost: 7812, gains: 549, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Divine Wrath', description: 'Calls upon holy power to smite enemies with a beam of light', cost: 14844, gains: 1043, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Protective Aura', description: 'Creates a barrier of light that reduces incoming damage for nearby allies', cost: 28203, gains: 1981, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Healing Touch', description: 'Restores health to a single target', cost: 53585, gains: 3764, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Mass Heal', description: 'Heals multiple allies in an area', cost: 101812, gains: 7151, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Divine Shield', description: 'Grants a temporary shield to an ally, absorbing damage', cost: 193443, gains: 13587, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Aegis', description: 'Creates a safe zone where allies cannot be harmed for a short duration', cost: 367541, gains: 25815, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Haste', description: 'Increases the movement speed of friendly units for a short duration', cost: 698328, gains: 49049, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Eagle Eye', description: 'Grants vision of a large area of the battlefield', cost: 1326824, gains: 93192, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Teleportation', description: 'Allows the caster to teleport a short distance', cost: 2520966, gains: 177065, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Inspire', description: 'Increases the morale and combat effectiveness of nearby allies', cost: 4789835, gains: 336424, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Dispel Magic', description: 'Removes harmful magical effects from allies', cost: 9100686, gains: 639205, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Curse of Weakness', description: 'Weakens enemy units, reducing their attack and defense', cost: 17291304, gains: 1214490, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Slow', description: 'Reduces the movement and attack speed of enemy units', cost: 32853477, gains: 2307531, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Mindmaze', description: 'Causes enemy units to attack randomly, including their own allies', cost: 62421606, gains: 4384309, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Disarm', description: 'Temporarily disarms enemy units, preventing them from attacking', cost: 118601052, gains: 8330188, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Hex', description: 'Curses an enemy unit, inflicting random negative effects', cost: 225341999, gains: 15827357, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Meteor Storm', description: 'Calls down a barrage of meteors that deal massive damage to a large area', cost: 428149798, gains: 30071979, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Summon Champion', description: 'Summons a legendary hero to fight alongside the human army', cost: 813484616, gains: 57136760, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Divine Intervention', description: 'Calls upon the power of the gods to protect and empower the human army', cost: 1545620770, gains: 108559843, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Time Warp', description: 'Temporarily slows down time for enemies, giving allies a significant advantage', cost: 2936679462, gains: 206263702, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Chain Lightning', description: 'Unleashes a bolt of lightning that jumps between multiple enemies', cost: 5579690978, gains: 391901034, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Prayer of Protection', description: 'A powerful prayer that grants all allies increased resistance to damage', cost: 10601412859, gains: 744611966, costGainingMultiplier: 1.3, faction: 'HUMAN' },
    { name: 'Summon Angel', description: 'Calls upon a powerful angel to fight alongside the human army', cost: 20142684432, gains: 1414762734, costGainingMultiplier: 1.3, faction: 'HUMAN' },

    // Elf Faction
    { name: 'Arrow Storm', description: 'Summons a volley of arrows to rain down on a target area', cost: 1139, gains: 80, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Entangling Roots', description: 'Roots erupt from the ground, ensnaring and damaging enemies', cost: 2164, gains: 152, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Moonbeam', description: 'A concentrated beam of moonlight that burns and weakens enemies', cost: 4112, gains: 289, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Wrath of Nature', description: 'Summons a powerful nature spirit to attack enemies in an area', cost: 7812, gains: 549, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Sunfire', description: 'Calls down a blast of solar energy, dealing damage and blinding foes', cost: 14844, gains: 1043, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Forest\'s Embrace', description: 'Creates a protective barrier of vines and leaves around allies', cost: 28203, gains: 1981, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Regeneration', description: 'Accelerates the natural healing of friendly units', cost: 53585, gains: 3764, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Thorns', description: 'Creates a thorny aura around allies, damaging attackers', cost: 101812, gains: 7151, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Nature\'s Shield', description: 'Summons a protective spirit to shield allies from harm', cost: 193443, gains: 13587, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Wind Wall', description: 'Creates a gust of wind that deflects projectiles and slows enemies', cost: 367541, gains: 25815, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Fleetfoot', description: 'Increases the movement speed of friendly units', cost: 698328, gains: 49049, costGainingMultiplier: 1.3, faction: 'ELF' },
// Elf Faction (continued)
    { name: 'Farsight', description: 'Grants vision of a large area of the battlefield', cost: 1326824, gains: 93192, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Tree of Life', description: 'Summons a tree that heals and provides cover for allies', cost: 2520966, gains: 177065, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Call of the Wild', description: 'Summons animal allies to fight alongside the elves', cost: 4789835, gains: 336424, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Moonwell', description: 'Creates a wellspring of magical energy that replenishes mana', cost: 9100686, gains: 639205, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Sleep Spores', description: 'Releases spores that put enemies to sleep', cost: 17291304, gains: 1214490, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Entangle', description: 'Roots ensnare enemies, slowing their movement and attack speed', cost: 32853477, gains: 2307531, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Poisoned Arrows', description: 'Coats arrows with poison, causing damage over time', cost: 62421606, gains: 4384309, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Swarm of Insects', description: 'Summons a swarm of insects to harass and distract enemies', cost: 118601052, gains: 8330188, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Nature\'s Grasp', description: 'Roots erupt from the ground, pulling enemies towards a central point', cost: 225341999, gains: 15827357, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Ancient\'s Wrath', description: 'Summons a powerful ancient tree spirit to devastate the battlefield', cost: 428149798, gains: 30071979, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Elven High Magic', description: 'A powerful spell that unleashes a cascade of nature magic, healing allies and damaging enemies', cost: 813484616, gains: 57136760, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Moon Goddess\'s Blessing', description: 'Calls upon the power of the moon goddess to empower and protect the elven army', cost: 1545620770, gains: 108559843, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Sunburst', description: 'A blinding flash of light that deals massive damage to enemies in a wide area', cost: 2936679462, gains: 206263702, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Nature\'s Fury', description: 'Unleashes a devastating storm of wind, rain, and lightning', cost: 5579690978, gains: 391901034, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Ritual of Rebirth', description: 'Sacrifices a unit to restore health and mana to the entire army', cost: 10601412859, gains: 744611966, costGainingMultiplier: 1.3, faction: 'ELF' },
    { name: 'Summon Treant Guardians', description: 'Summons powerful treant guardians to protect the elven army', cost: 20142684432, gains: 1414762734, costGainingMultiplier: 1.3, faction: 'ELF' },

    // Demon Faction
    { name: 'Hellfire Bolt', description: 'Hurls a bolt of hellfire that burns and damages a single target', cost: 1139, gains: 80, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Demonic Swarm', description: 'Summons a swarm of lesser demons to attack and overwhelm enemies', cost: 2164, gains: 152, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Shadow Bolt', description: 'Launches a bolt of shadow energy that pierces through armor and inflicts pain', cost: 4112, gains: 289, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Unholy Blast', description: 'Unleashes a wave of unholy energy that damages and weakens enemies in an area', cost: 7812, gains: 549, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Chaos Bolt', description: 'A chaotic blast of energy that deals random damage and inflicts various debuffs', cost: 14844, gains: 1043, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Demonic Shield', description: 'Creates a protective barrier of demonic energy around allies', cost: 28203, gains: 1981, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Unholy Armor', description: 'Enhances the armor and resistance of friendly units', cost: 53585, gains: 3764, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Soul Drain', description: 'Drains the life essence of enemies, healing the caster and nearby allies', cost: 101812, gains: 7151, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Shadow Cloak', description: 'Conceals friendly units in shadows, making them harder to detect and attack', cost: 193443, gains: 13587, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Dark Pact', description: 'Sacrifices a portion of the caster\'s health to gain a temporary boost in power', cost: 367541, gains: 25815, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Infernal Gateway', description: 'Opens a temporary portal that allows demons to quickly reinforce the battlefield', cost: 698328, gains: 49049, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Demonic Possession', description: 'Takes control of an enemy unit, turning it against its allies', cost: 1326824, gains: 93192, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Unholy Ground', description: 'Corrupts the ground, dealing damage over time to enemies who stand on it', cost: 2520966, gains: 177065, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Blood Frenzy', description: 'Enrages friendly units, increasing their attack speed and damage but reducing their defense', cost: 4789835, gains: 336424, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Shadow Step', description: 'Allows the caster to teleport a short distance, surprising enemies and escaping danger', cost: 9100686, gains: 639205, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Curse of Agony', description: 'Inflicts intense pain on enemy units, reducing their movement speed and attack', cost: 17291304, gains: 1214490, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Fear', description: 'Strikes terror into the hearts of enemies, causing them to flee in panic', cost: 32853477, gains: 2307531, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Corruption', description: 'Corrupts enemy units, turning them against their allies or weakening their abilities', cost: 62421606, gains: 4384309, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Soul Siphon', description: 'Drains the souls of enemies, weakening them and empowering the caster', cost: 118601052, gains: 8330188, costGainingMultiplier: 1.3, faction: 'DEMON' },
    // Demon Faction (continued)
    { name: 'Demonic Pact', description: 'Offers a tempting bargain to enemy units, corrupting them and turning them into demons', cost: 225341999, gains: 15827357, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Demonic Avatar', description: 'Summons a powerful demon lord to wreak havoc on the battlefield', cost: 428149798, gains: 30071979, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Inferno', description: 'Unleashes a massive inferno that engulfs the battlefield in flames', cost: 813484616, gains: 57136760, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Cataclysm', description: 'Creates a devastating earthquake that shatters the ground and damages all units in the area', cost: 1545620770, gains: 108559843, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Unholy Resurrection', description: 'Raises fallen demons from the dead, strengthening the demon army', cost: 2936679462, gains: 206263702, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Hellstorm', description: 'A powerful vortex of souls that damages and weakens enemies while empowering allies', cost: 5579690978, gains: 391901034, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Blood Ritual', description: 'Sacrifices a portion of the demon army to gain a temporary boost in power and summon a powerful demon', cost: 10601412859, gains: 744611966, costGainingMultiplier: 1.3, faction: 'DEMON' },
    { name: 'Summoning Circle', description: 'Creates a summoning circle that allows the caster to summon powerful demons from the depths of hell', cost: 20142684432, gains: 1414762734, costGainingMultiplier: 1.3, faction: 'DEMON' },

    // Angel Faction
    { name: 'Holy Smite', description: 'A powerful blast of holy energy that smites a single target', cost: 1139, gains: 80, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Divine Lance', description: 'Launches a piercing lance of light that damages multiple enemies in a line', cost: 2164, gains: 152, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Radiant Burst', description: 'Unleashes a burst of radiant energy that damages and blinds nearby enemies', cost: 4112, gains: 289, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Celestial Fire', description: 'Calls down a rain of holy fire, burning and purifying evil', cost: 7812, gains: 549, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Seraph\'s Wrath', description: 'Summons a seraph to unleash a devastating attack on a target area', cost: 14844, gains: 1043, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Divine Protection', description: 'Creates a protective barrier of holy light around allies', cost: 28203, gains: 1981, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Holy Aura', description: 'Grants increased armor and resistance to holy damage to nearby allies', cost: 53585, gains: 3764, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Healing', description: 'A powerful healing spell that restores health to a single target', cost: 101812, gains: 7151, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Resurrection', description: 'Brings a fallen ally back to life with a portion of their health restored', cost: 193443, gains: 13587, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Sanctuary', description: 'Creates a safe haven where allies cannot be harmed for a short duration', cost: 367541, gains: 25815, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Angelic Wings', description: 'Grants temporary flight to friendly units', cost: 698328, gains: 49049, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Divine Guidance', description: 'Reveals the location of hidden enemies and grants vision of the battlefield', cost: 1326824, gains: 93192, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Blessing of Light', description: 'Empowers friendly units with increased damage and attack speed', cost: 2520966, gains: 177065, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Holy Ground', description: 'Purifies the ground, healing allies and damaging undead or demonic enemies', cost: 4789835, gains: 336424, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Celestial Beacon', description: 'Summons a beacon of light that heals and inspires nearby allies', cost: 9100686, gains: 639205, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Smite Evil', description: 'Deals bonus damage to undead and demonic units', cost: 17291304, gains: 1214490, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Banish', description: 'Banishes an enemy unit from the battlefield for a short duration', cost: 32853477, gains: 2307531, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Blinding Light', description: 'Temporarily blinds enemies, reducing their accuracy and attack power', cost: 62421606, gains: 4384309, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Holy Word Silence', description: 'Silences enemy spellcasters, preventing them from casting spells for a short duration', cost: 118601052, gains: 8330188, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Divine Retribution', description: 'Curses enemy units, causing them to take damage whenever they attack', cost: 225341999, gains: 15827357, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Wrath of God', description: 'Summons a powerful avatar of divine wrath to smite enemies', cost: 428149798, gains: 30071979, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Heavenly Host', description: 'Calls upon a legion of angels to descend from the heavens and fight alongside the player\'s army', cost: 813484616, gains: 57136760, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Divine Judgement', description: 'Unleashes a powerful beam of holy energy that deals massive damage to a large area', cost: 1545620770, gains: 108559843, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Sacred Ground', description: 'Blesses the ground, making it impossible for enemies to enter the area for a short duration', cost: 2936679462, gains: 206263702, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Angelic Ascension', description: 'Temporarily transforms the player\'s hero into an archangel, granting them immense power and abilities', cost: 5579690978, gains: 391901034, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Prayer of Healing', description: 'A powerful healing ritual that restores a large amount of health to all friendly units', cost: 10601412859, gains: 744611966, costGainingMultiplier: 1.3, faction: 'ANGEL' },
    { name: 'Rite of Purification', description: 'A ritual that cleanses the battlefield of corruption and evil, weakening enemy units and empowering allies', cost: 20142684432, gains: 1414762734, costGainingMultiplier: 1.3, faction: 'ANGEL' },

    // Undead Faction (continued)
    { name: 'Death Bolt', description: 'Launches a bolt of necrotic energy that damages and weakens a single target', cost: 1139, gains: 80, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Raise Dead', description: 'Summons a group of skeletons or zombies to fight for the undead army', cost: 2164, gains: 152, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Corpse Explosion', description: 'Causes a corpse to explode, dealing area damage and spreading disease', cost: 4112, gains: 289, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Unholy Blight', description: 'Creates a cloud of blight that damages and weakens enemies over time', cost: 7812, gains: 549, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Soul Harvest', description: 'Drains the life force of multiple enemies, healing the caster and nearby undead', cost: 14844, gains: 1043, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Bone Shield', description: 'Creates a protective barrier of bones around the caster, absorbing damage', cost: 28203, gains: 1981, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Unholy Aura', description: 'Grants increased armor and resistance to holy damage to nearby undead', cost: 53585, gains: 3764, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Spectral Grasp', description: 'Summons spectral hands that pull enemies towards the caster', cost: 101812, gains: 7151, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Death\'s Embrace', description: 'Envelops a target ally in a protective aura that heals them over time', cost: 193443, gains: 13587, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Dark Ritual', description: 'Sacrifices a portion of the undead army to temporarily empower the remaining units', cost: 367541, gains: 25815, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Unholy Speed', description: 'Increases the movement speed of undead units for a short duration', cost: 698328, gains: 49049, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Death\'s Sight', description: 'Reveals the location of hidden enemies and grants vision of the battlefield', cost: 1326824, gains: 93192, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Corpse Puppet', description: 'Takes control of a corpse, turning it into a temporary undead minion', cost: 2520966, gains: 177065, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Summon Wraith', description: 'Summons a wraith to fight alongside the undead army', cost: 4789835, gains: 336424, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Necromantic Barrier', description: 'Creates a wall of bones that blocks enemy movement', cost: 9100686, gains: 639205, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Withering Touch', description: 'Weakens enemy units, reducing their attack and defense', cost: 17291304, gains: 1214490, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Horror', description: 'Strikes terror into the hearts of enemies, causing them to flee in panic', cost: 32853477, gains: 2307531, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Curse of Frailty', description: 'Curses enemy units, making them more vulnerable to damage', cost: 62421606, gains: 4384309, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Life Drain', description: 'Drains the life essence of an enemy unit, healing the caster', cost: 118601052, gains: 8330188, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Death\'s Mark', description: 'Marks an enemy unit for death, causing them to take increased damage', cost: 225341999, gains: 15827357, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Army of the Dead', description: 'Raises a vast army of skeletons and zombies to overwhelm the enemy', cost: 428149798, gains: 30071979, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Death and Decay', description: 'Creates a zone of decay that deals damage over time and weakens enemies', cost: 813484616, gains: 57136760, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Lich\'s Phylactery', description: 'Summons a powerful lich to fight alongside the undead army', cost: 1545620770, gains: 108559843, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Unholy Frenzy', description: 'Enrages undead units, increasing their attack speed and damage but reducing their defense', cost: 2936679462, gains: 206263702, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Soulstorm', description: 'Unleashes a storm of souls that damages and weakens enemies while healing undead units', cost: 5579690978, gains: 391901034, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Rite of Unlife', description: 'Resurrects a powerful undead hero from the grave', cost: 10601412859, gains: 744611966, costGainingMultiplier: 1.3, faction: 'UNDEAD' },
    { name: 'Summon Bone Dragon', description: 'Summons a skeletal dragon to fight alongside the undead army', cost: 20142684432, gains: 1414762734, costGainingMultiplier: 1.3, faction: 'UNDEAD' }
];

const artifactData = [
    // Orc Artifacts
    {
        name: 'The Gavel of War God',
        description: 'This massive warhammer, said to be wielded by the Orcish god of war himself, empowers the Orcish Warlord, increasing their size, strength, and damage output. Additionally, it emits a powerful aura that boosts the morale and fighting spirit of nearby Orcs, making them more resistant to fear and control effects.',
        cost: 19175106,
        gains: 3835021,
        costGainingMultiplier: 2,
        faction: 'ORC',
        id: 26
    },
    {
        name: 'The Blood Chalice of Mauller',
        description: 'This ancient chalice, filled with the blood of a powerful demon, grants the Orcish army the ability to regenerate health rapidly in battle. The chalice also curses enemy units, causing them to bleed and weaken over time.',
        cost: 402677224,
        gains: 80535445,
        costGainingMultiplier: 2,
        faction: 'ORC',
        id: 27
    },
    {
        name: 'The Banner of the Wars',
        description: 'This massive banner, adorned with the symbols of Orcish gods and heroes, instills an unbreakable will to fight in the Orcish army. It increases their movement speed, attack speed, and damage, while also reducing the effectiveness of enemy morale-lowering abilities.',
        cost: 8456221712,
        gains: 1691244342,
        costGainingMultiplier: 2,
        faction: 'ORC',
        id: 28
    },
    {
        name: 'The Mask of the Beastlord',
        description: 'This terrifying mask, crafted from the skull of a legendary beast, allows the wearer to tap into their primal instincts. It grants the Orcish Warlord the ability to transform into a powerful beast form, increasing their strength, speed, and resilience.',
        cost: 177580655956,
        gains: 35516131191,
        costGainingMultiplier: 2,
        faction: 'ORC',
        id: 29
    },
    {
        name: 'The Heart of the Volcano',
        description: 'This glowing shard of volcanic rock, said to contain the essence of a fire elemental, grants the Orcish army control over fire magic. It allows them to summon fiery eruptions, imbue their weapons with flames, and even create a protective barrier of fire around their forces.',
        cost: 3729193775067,
        gains: 745838755013,
        costGainingMultiplier: 2,
        faction: 'ORC',
        id: 30
    },

    // Human Artifacts
    {
        name: 'The Crown of the First King',
        description: 'This ancient crown, adorned with precious gems and imbued with the wisdom of past rulers, grants the wearer enhanced leadership abilities, inspiring loyalty and courage in their troops. It also allows them to see glimpses of the future, aiding in strategic decision-making.',
        cost: 19175106,
        gains: 3835021,
        costGainingMultiplier: 2,
        faction: 'HUMAN',
        id:1
    },
    {
        name: 'The Blade of the Crusader',
        description: 'This legendary sword, forged in the fires of a holy war, is said to be imbued with the power of righteousness. It grants the wielder increased strength, speed, and the ability to unleash devastating holy attacks against unholy creatures.',
        cost: 402677224,
        gains: 80535445,
        costGainingMultiplier: 2,
        faction: 'HUMAN',
        id:2
    },
    {
        name: 'The Shield of the Defender',
        description: 'This impenetrable shield, crafted from the scales of a celestial dragon, grants the wearer near-invulnerability to physical and magical attacks. It also reflects a portion of incoming damage back at the attacker, making it a formidable defensive weapon.',
        cost: 8456221712,
        gains: 1691244342,
        costGainingMultiplier: 2,
        faction: 'HUMAN',
        id:3
    },
    {
        name: 'The Tome of Arcane Knowledge',
        description: 'This ancient tome, filled with the secrets of the arcane arts, grants the user access to powerful spells and rituals. It also enhances their magical abilities, allowing them to cast spells with greater speed and accuracy.',
        cost: 177580655956,
        gains: 35516131191,
        costGainingMultiplier: 2,
        faction: 'HUMAN',
        id:4
    },
    {
        name: 'The Amulet of the Dragonheart',
        description: 'This enchanted amulet, containing a shard of a dragon\'s heart, grants the wearer increased vitality and resilience. It also allows them to breathe fire, making them a formidable force on the battlefield.',
        cost: 3729193775067,
        gains: 745838755013,
        costGainingMultiplier: 2,
        faction: 'HUMAN',
        id:5
    },

    // Elf Artifacts
    {
        name: 'The Staff of Aulith',
        description: 'This ancient staff, said to be a gift from the goddess of nature, empowers the Elven Archdruid, enhancing their connection to the natural world and amplifying their healing and nature-based spells. Additionally, it can summon powerful nature spirits to aid in battle and create a protective aura that rejuvenates nearby allies.',
        cost: 19175106,
        gains: 3835021,
        costGainingMultiplier: 2,
        faction: 'ELF',
        id:6
    },
    {
        name: 'The Moonstone of Elore',
        description: 'This radiant moonstone, imbued with the power of the moon goddess, grants the Elven army enhanced night vision and increased accuracy during nighttime battles. It also allows them to summon moonbeams that heal allies and damage undead or demonic foes.',
        cost: 402677224,
        gains: 80535445,
        costGainingMultiplier: 2,
        faction: 'ELF',
        id:7
    },
    {
        name: 'The Horn of the Wild Hunt',
        description: 'This mystical horn, crafted from the antler of a legendary stag, allows the Elven army to summon spectral hunters and their spirit beasts to aid in battle. The horn\'s haunting call also instills fear in the hearts of enemies, causing them to flee or fight with reduced effectiveness.',
        cost: 8456221712,
        gains: 1691244342,
        costGainingMultiplier: 2,
        faction: 'ELF',
        id:8
    },
    {
        name: 'The Elven Crown of Thorns',
        description: 'This crown, woven from thorns imbued with ancient magic, grants the wearer control over the forest. It allows the Elven leader to summon entangling roots, create barriers of thorns, and even awaken ancient trees to defend their allies.',
        cost: 177580655956,
        gains: 35516131191,
        costGainingMultiplier: 2,
        faction: 'ELF',
        id:9
    },
    {
        name: 'The Heart of the Forest',
        description: 'This glowing emerald, said to contain the essence of the World Tree, empowers the Elven army with the life force of the forest. It enhances their resilience, regeneration, and connection to nature, allowing them to summon powerful nature spirits and unleash devastating natural attacks.',
        cost: 3729193775067,
        gains: 745838755013,
        costGainingMultiplier: 2,
        faction: 'ELF',
        id:10
    },
// Demon Artifacts
    {
        name: 'The Skull of Barphomet',
        description: 'This demonic skull, adorned with twisted horns and glowing eyes, empowers the Demon Overlord, enhancing their demonic powers and granting them control over lesser demons. It also emits an aura of fear and dread, weakening the resolve of nearby enemies.',
        cost: 19175106,
        gains: 3835021,
        costGainingMultiplier: 2,
        faction: 'DEMON',
        id:11
    },
    {
        name: 'The Bloodstone of Zargan',
        description: 'This crimson gem, said to be formed from the blood of a fallen angel, allows the Demon army to siphon life force from their enemies. It also enhances their regenerative abilities, making them more difficult to kill.',
        cost: 402677224,
        gains: 80535445,
        costGainingMultiplier: 2,
        faction: 'DEMON',
        id:12
    },
    {
        name: 'The Banner of the Abyss',
        description: 'This tattered banner, woven from the shadows of the Abyss, instills a bloodlust in the Demon army. It increases their attack speed, damage, and resistance to pain, while also causing fear and panic in nearby enemies.',
        cost: 8456221712,
        gains: 1691244342,
        costGainingMultiplier: 2,
        faction: 'DEMON',
        id: 13
    },
    {
        name: 'The Helm of the Archbalrog',
        description: 'This fiery helm, forged in the heart of a volcano, grants the wearer immense strength and resistance to fire. It also allows the Demon Overlord to breathe fire, incinerating enemies in their path.',
        cost: 177580655956,
        gains: 35516131191,
        costGainingMultiplier: 2,
        faction: 'DEMON',
        id: 14
    },
    {
        name: 'The Grimoire of the Devil',
        description: 'This ancient tome, filled with forbidden knowledge and dark rituals, grants the Demon army access to powerful spells and curses. It also allows them to summon demonic entities from the Abyss, bolstering their forces.',
        cost: 3729193775067,
        gains: 745838755013,
        costGainingMultiplier: 2,
        faction: 'DEMON',
        id: 15
    },

    // Angel Artifacts
    {
        name: 'The Holy Grail',
        description: 'This sacred chalice, said to have been used by the divine during the last supper, grants the Angelic Commander the ability to heal and resurrect fallen allies on a massive scale. It also purifies the battlefield, weakening demonic and undead forces.',
        cost: 19175106,
        gains: 3835021,
        costGainingMultiplier: 2,
        faction: 'ANGEL',
        id: 16
    },
    {
        name: 'The Spear of Leonginus',
        description: 'This legendary spear, said to have pierced the side of the divine, empowers the Angelic army with righteous fury. It increases their damage output, grants them divine protection, and allows them to strike down evil with holy power.',
        cost: 402677224,
        gains: 80535445,
        costGainingMultiplier: 2,
        faction: 'ANGEL',
        id: 17
    },
    {
        name: 'The Wings of Gabriel',
        description: 'These radiant wings, once belonging to the Archangel Gabriel, bestow the wearer with incredible speed and agility. They also allow the Angelic Commander to fly, granting them a tactical advantage on the battlefield.',
        cost: 8456221712,
        gains: 1691244342,
        costGainingMultiplier: 2,
        faction: 'ANGEL',
        id: 18
    },
    {
        name: 'The Halo of Seraphim',
        description: 'This radiant halo, imbued with divine light, enhances the Angelic army\'s morale and resistance to corruption. It also allows them to channel divine energy, empowering their spells and abilities.',
        cost: 177580655956,
        gains: 35516131191,
        costGainingMultiplier: 2,
        faction: 'ANGEL',
        id: 19
    },
    {
        name: 'The Sword of Michael',
        description: 'This legendary sword, wielded by the Archangel Michael, is said to be capable of vanquishing the most powerful demons. It grants the wielder immense strength, speed, and the ability to unleash devastating holy attacks.',
        cost: 3729193775067,
        gains: 745838755013,
        costGainingMultiplier: 2,
        faction: 'ANGEL',
        id: 20
    },

    // Undead Artifacts
    {
        name: 'The Scepter of Nagash',
        description: 'This skeletal scepter, once wielded by the god of death, grants the Lich King dominion over the undead. It amplifies their necromantic power, allowing them to raise larger armies, cast more potent spells, and even drain the life force of their enemies.',
        cost: 19175106,
        gains: 3835021,
        costGainingMultiplier: 2,
        faction: 'UNDEAD',
        id: 21
    },
    {
        name: 'The Crown of the Night King',
        description: 'This icy crown, worn by the legendary Night King, grants the wearer control over the cold and the dead. It allows them to summon blizzards, raise frozen warriors, and even freeze enemies in place.',
        cost: 402677224,
        gains: 80535445,
        costGainingMultiplier: 2,
        faction: 'UNDEAD',
        id: 22
    },
    {
        name: 'The Book of the Damned',
        description: 'This ancient tome, filled with forbidden knowledge and dark rituals, grants the undead access to powerful necromantic spells and curses. It also allows them to summon demonic entities from the abyss to bolster their forces.',
        cost: 8456221712,
        gains: 1691244342,
        costGainingMultiplier: 2,
        faction: 'UNDEAD',
        id: 23
    },
    {
        name: 'The Shroud of the Banshee Queen',
        description: 'This ethereal shroud, woven from the screams of countless souls, empowers the Banshee Queen with amplified wails and the ability to control lesser banshees. It also creates a chilling aura that weakens the resolve of nearby enemies.',
        cost: 177580655956,
        gains: 35516131191,
        costGainingMultiplier: 2,
        faction: 'UNDEAD',
        id: 24
    },
    {
        name: 'The Soul Cage of the Necropolis',
        description: 'This dark artifact, forged from the bones of fallen heroes, traps the souls of enemies slain in battle. These trapped souls can then be used to empower the undead army, increasing their strength, speed, and resilience.',
        cost: 3729193775067,
        gains: 745838755013,
        costGainingMultiplier: 2,
        faction: 'UNDEAD',
        id: 25
    }
];

const friendData = [
    {
        faction: 'ORC',
        addFriendName: 'Peon',
    },
    {
        faction: 'HUMAN',
        addFriendName: 'Squire',
    },
    {
        faction: 'ELF',
        addFriendName: 'Fledgling',
    },
    {
        faction: 'DEMON',
        addFriendName: 'Servitor',
    },
    {
        faction: 'ANGEL',
        addFriendName: 'Neophyte',
    },
    {
        faction: 'UNDEAD',
        addFriendName: 'Acolyte',
    }
];

const userAuthData = [
    {
        username: "Arthur8071",
        createdAt: "12.09.2024",
        factionType: "ORC",
        currentTon: 350,
    },
];

const userData  = [
    {
        username: "Arthur8071",
        incomePerHour: "500000",
        increaseAmount: 55,
        currentGold: 1000,
        level: 5,
        avatarImage: "1. png",
        exp: 95,
        currentMana: 50,
        totalMana: 100,
        title: "Wormfood",
        factionType: "ORC",
        attackCritChance: 1,
        attackCritIncome: 1,
    },
];

const skillBuffData = [
    {
        name: 'Multi Attack',
        description: 'With more power comes more responsibility. when more you attack, the more mana you spend.',
        cost: '100',
        gains: '1',
        level: 0,
        costMultiplier: 1.5,
        totalSkillGain: '1',
        cooldown: '',
        refresh: '',
        type: 'skill',
    },
    {
        name: 'Mana Pool',
        description: 'By increasing your mana pool, you can make more attacks.',
        cost: '100',
        gains: '500',
        level: 0,
        costMultiplier: 1.5,
        totalSkillGain: '1000',
        cooldown: '',
        refresh: '',
        type: 'skill',
    },
    {
        name: 'Attack Crit Chance',
        description: 'Increase your critical strike chance to earn more loot with just one click.',
        cost: '200',
        gains: '1',
        level: 0,
        costMultiplier: 1.5,
        totalSkillGain: '1 %',
        cooldown: '',
        refresh: '',
        type: 'skill',
    },
    {
        name: 'Attack Crit Income',
        description: 'You can increase the loot you get from critical attacks by increasing your critical damage.',
        cost: '400',
        gains: '10',
        level: 0,
        costMultiplier: 1.5,
        totalSkillGain: '10 %',
        cooldown: '',
        refresh: '',
        type: 'skill',
    },
    {
        name: 'Mana Potion',
        description: "You can refill your Mana pool by drinking the potion, but remember, you can't drink it consecutively.",
        cost: '6/6',
        gains: 'Restore full mana',
        level: 0,
        costMultiplier: 1,
        totalSkillGain: '',
        cooldown: '2 hour',
        refresh: '24 hour',
        type: 'potion',
    },
    {
        name: "Magic God's Blood Potion",
        description: 'With this powerful potion, your mana pool will now regenerate faster.',
        cost: '0.7 Ton',
        gains: '1',
        level: 0,
        costMultiplier: 1,
        totalSkillGain: '4 per sec',
        cooldown: '',
        refresh: '',
        type: 'item',
    },
    {
        name: "Hero's Pocket Portal",
        description: "Thanks to this item, you will no longer have to carry your loot. You will see that the income from your attacks will increase.",
        cost: '0.7 Ton',
        gains: '5',
        level: 0,
        costMultiplier: 1,
        totalSkillGain: '0 %',
        cooldown: '',
        refresh: '',
        type: 'item',
    },
    {
        name: "Army's Raid Portal",
        description: "It's one thing to raid, it's another thing for your army to carry it. With this item, you'll see your army's raid income increase.",
        cost: '0.7 Ton',
        gains: '5',
        level: 0,
        costMultiplier: 1,
        totalSkillGain: '0 %',
        cooldown: '',
        refresh: '',
        type: 'item',
    },
    {
        name: "The Ancient's Transformation Ritual",
        description: 'This ritual can transform you completely into a creature from another faction, but the ingredients for the spell are really hard to find.',
        cost: '10 Ton',
        gains: 'Faction reset',
        level: 0,
        costMultiplier: 1,
        totalSkillGain: '',
        cooldown: '',
        refresh: '',
        type: 'spell',
    },
];

const warData = [
    {
        nextWarTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        createdAt: new Date()
    },
    {
        nextWarTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
        createdAt: new Date()
    },
    {
        nextWarTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
        createdAt: new Date()
    }
];

const armoryData = [
    {
        "name": "Warcamp",
        "description": "For basic infantry units and increases training quality.",
        "cost": 5767,
        "gains": 450,
        "costGainingMultiplier": 1.8,
        "armoryId": 1,
        "factionId": 1
    },
    {
        "name": "Ancient Grove",
        "description": "For basic units and increases training quality for archers and druids.",
        "cost": 5767,
        "gains": 450,
        "costGainingMultiplier": 1.8,
        "armoryId": 1,
        "factionId": 2
    },
    {
        "name": "Infernal Pit",
        "description": "For basic demon units and increases their training quality.",
        "cost": 5767,
        "gains": 450,
        "costGainingMultiplier": 1.8,
        "armoryId": 1,
        "factionId": 3
    },
    {
        "name": "Celestial Temple",
        "description": "For basic angel units and increases their training quality.",
        "cost": 5767,
        "gains": 450,
        "costGainingMultiplier": 1.8,
        "armoryId": 1,
        "factionId": 4
    },
    {
        "name": "Crypt",
        "description": "For basic undead units like skeletons and zombies, increases their training quality.",
        "cost": 5767,
        "gains": 450,
        "costGainingMultiplier": 1.8,
        "armoryId": 1,
        "factionId": 5
    },
    {
        "name": "Town Center",
        "description": "For basic human units and increases their training quality.",
        "cost": 5767,
        "gains": 450,
        "costGainingMultiplier": 1.8,
        "armoryId": 1,
        "factionId": 6
    },
    {
        "name": "Forge",
        "description": "For weapon and armor upgrades, improves blacksmithing efficiency.",
        "cost": 7497,
        "gains": 585,
        "costGainingMultiplier": 1.8,
        "armoryId": 2,
        "factionId": 1
    },
    {
        "name": "Moonwell",
        "description": "For upgrades for spellcasters and enhances mana regeneration.",
        "cost": 7497,
        "gains": 585,
        "costGainingMultiplier": 1.8,
        "armoryId": 2,
        "factionId": 2
    },
    {
        "name": "Sacrificial Altar",
        "description": "For upgrades for spellcasters and enhances demonic energy.",
        "cost": 7497,
        "gains": 585,
        "costGainingMultiplier": 1.8,
        "armoryId": 2,
        "factionId": 3
    },
    {
        "name": "Holy Fountain",
        "description": "For upgrades for healers and support units, enhances divine energy.",
        "cost": 7497,
        "gains": 585,
        "costGainingMultiplier": 1.8,
        "armoryId": 2,
        "factionId": 4
    },
    {
        "name": "Boneyard",
        "description": "For upgrades for melee undead units, improves their strength and resilience.",
        "cost": 7497,
        "gains": 585,
        "costGainingMultiplier": 1.8,
        "armoryId": 2,
        "factionId": 5
    },
    {
        "name": "Barracks",
        "description": "For melee infantry units and upgrades, improves their combat skills.",
        "cost": 7497,
        "gains": 585,
        "costGainingMultiplier": 1.8,
        "armoryId": 2,
        "factionId": 6
    },
    {
        "name": "Spirit Lodge",
        "description": "For shaman units and upgrades, enhances spiritual power.",
        "cost": 9746,
        "gains": 761,
        "costGainingMultiplier": 1.8,
        "armoryId": 3,
        "factionId": 1
    },
    {
        "name": "Hunter's Lodge",
        "description": "For ranged units and upgrades, improves accuracy and damage.",
        "cost": 9746,
        "gains": 761,
        "costGainingMultiplier": 1.8,
        "armoryId": 3,
        "factionId": 2
    },
    {
        "name": "Torture Chamber",
        "description": "For demon units specialized in inflicting pain and suffering.",
        "cost": 9746,
        "gains": 761,
        "costGainingMultiplier": 1.8,
        "armoryId": 3,
        "factionId": 3
    },
    {
        "name": "Judgement Hall",
        "description": "For warrior angel units and upgrades, improves combat prowess.",
        "cost": 9746,
        "gains": 761,
        "costGainingMultiplier": 1.8,
        "armoryId": 3,
        "factionId": 4
    },
    {
        "name": "Spirit Tower",
        "description": "For spectral units and upgrades, enhances their ethereal abilities.",
        "cost": 9746,
        "gains": 761,
        "costGainingMultiplier": 1.8,
        "armoryId": 3,
        "factionId": 5
    },
    {
        "name": "Archery Range",
        "description": "For ranged units and upgrades, improves their accuracy and damage.",
        "cost": 9746,
        "gains": 761,
        "costGainingMultiplier": 1.8,
        "armoryId": 3,
        "factionId": 6
    },
    {
        "name": "Bestiary",
        "description": "For beast units and upgrades, improves taming and training.",
        "cost": 12670,
        "gains": 989,
        "costGainingMultiplier": 1.8,
        "armoryId": 4,
        "factionId": 1
    },
    {
        "name": "Wild Sanctuary",
        "description": "For animal companions and upgrades, strengthens their bond with elves.",
        "cost": 12670,
        "gains": 989,
        "costGainingMultiplier": 1.8,
        "armoryId": 4,
        "factionId": 2
    },
    {
        "name": "Blight Nest",
        "description": "For flying demon units and upgrades, improves their flight and agility.",
        "cost": 12670,
        "gains": 989,
        "costGainingMultiplier": 1.8,
        "armoryId": 4,
        "factionId": 3
    },
    {
        "name": "Aviary of Light",
        "description": "For flying angel units and upgrades, enhances flight and agility.",
        "cost": 12670,
        "gains": 989,
        "costGainingMultiplier": 1.8,
        "armoryId": 4,
        "factionId": 4
    },
    {
        "name": "Necropolis",
        "description": "For necromancer units and upgrades, increases their necromantic power.",
        "cost": 12670,
        "gains": 989,
        "costGainingMultiplier": 1.8,
        "armoryId": 4,
        "factionId": 5
    },
    {
        "name": "Stable",
        "description": "For cavalry units and upgrades, improves their speed and charge.",
        "cost": 12670,
        "gains": 989,
        "costGainingMultiplier": 1.8,
        "armoryId": 4,
        "factionId": 6
    },
    {
        "name": "Great Hall",
        "description": "For advanced units and upgrades, increases overall faction strength.",
        "cost": 16471,
        "gains": 1285,
        "costGainingMultiplier": 1.8,
        "armoryId": 5,
        "factionId": 1
    },
    {
        "name": "Elven Citadel",
        "description": "For advanced units and upgrades, increases overall faction strength.",
        "cost": 16471,
        "gains": 1285,
        "costGainingMultiplier": 1.8,
        "armoryId": 5,
        "factionId": 2
    },
    {
        "name": "Demon Citadel",
        "description": "For advanced demon units and upgrades, increases overall faction strength.",
        "cost": 16471,
        "gains": 1285,
        "costGainingMultiplier": 1.8,
        "armoryId": 5,
        "factionId": 3
    },
    {
        "name": "Heavenly Citadel",
        "description": "For advanced angel units and upgrades, increases overall faction strength.",
        "cost": 16471,
        "gains": 1285,
        "costGainingMultiplier": 1.8,
        "armoryId": 5,
        "factionId": 4
    },
    {
        "name": "Unholy Cathedral",
        "description": "For advanced undead units and upgrades, increases overall faction strength.",
        "cost": 16471,
        "gains": 1285,
        "costGainingMultiplier": 1.8,
        "armoryId": 5,
        "factionId": 5
    },
    {
        "name": "Mage Tower",
        "description": "For spellcaster units and upgrades, enhances their magical power.",
        "cost": 16471,
        "gains": 1285,
        "costGainingMultiplier": 1.8,
        "armoryId": 5,
        "factionId": 6
    },
    {
        "name": "Serrated Blades",
        "description": "Increases the damage of axes and swords.",
        "cost": 21412,
        "gains": 1671,
        "costGainingMultiplier": 1.8,
        "armoryId": 6,
        "factionId": 1
    },
    {
        "name": "Elven Steel",
        "description": "Increases the damage and durability of swords and bows.",
        "cost": 21412,
        "gains": 1671,
        "costGainingMultiplier": 1.8,
        "armoryId": 6,
        "factionId": 2
    },
    {
        "name": "Demonic Steel",
        "description": "Increases the damage and durability of swords, axes, and claws.",
        "cost": 21412,
        "gains": 1671,
        "costGainingMultiplier": 1.8,
        "armoryId": 6,
        "factionId": 3
    },
    {
        "name": "Celestial Forging",
        "description": "Increases the damage and durability of swords, spears, and bows.",
        "cost": 21412,
        "gains": 1671,
        "costGainingMultiplier": 1.8,
        "armoryId": 6,
        "factionId": 4
    },
    {
        "name": "Cursed Blades",
        "description": "Increases the damage and durability of swords, axes, and scythes.",
        "cost": 21412,
        "gains": 1671,
        "costGainingMultiplier": 1.8,
        "armoryId": 6,
        "factionId": 5
    },
    {
        "name": "Enchanted Steel",
        "description": "Increases the damage and durability of swords, spears, and axes, imbuing them with a faint magical glow.",
        "cost": 21412,
        "gains": 1671,
        "costGainingMultiplier": 1.8,
        "armoryId": 6,
        "factionId": 6
    },
    {
        "name": "Poisoned Tips",
        "description": "Adds poison damage to arrows and spears.",
        "cost": 27836,
        "gains": 2172,
        "costGainingMultiplier": 1.8,
        "armoryId": 7,
        "factionId": 1
    },
    {
        "name": "Moonstone Arrows",
        "description": "Enchants arrows with moonlight, causing additional damage and slowing enemies.",
        "cost": 27836,
        "gains": 2172,
        "costGainingMultiplier": 1.8,
        "armoryId": 7,
        "factionId": 2
    },
    {
        "name": "Soul-Stealing Blades",
        "description": "Imbues weapons with the ability to drain life essence from enemies.",
        "cost": 27836,
        "gains": 2172,
        "costGainingMultiplier": 1.8,
        "armoryId": 7,
        "factionId": 3
    },
    {
        "name": "Holy Light Infusion",
        "description": "Imbues weapons with holy light, causing radiant damage and purifying evil.",
        "cost": 27836,
        "gains": 2172,
        "costGainingMultiplier": 1.8,
        "armoryId": 7,
        "factionId": 4
    },
    {
        "name": "Soul-Siphoning Weapons",
        "description": "Imbues weapons with the ability to drain life essence from enemies.",
        "cost": 27836,
        "gains": 2172,
        "costGainingMultiplier": 1.8,
        "armoryId": 7,
        "factionId": 5
    },
    {
        "name": "Hawkeye's Sight",
        "description": "Enhances the range and accuracy of longbows, allowing archers to see further and strike with pinpoint precision.",
        "cost": 27836,
        "gains": 2172,
        "costGainingMultiplier": 1.8,
        "armoryId": 7,
        "factionId": 6
    },
    {
        "name": "Flaming Munitions",
        "description": "Sets arrows and siege weapons ablaze, causing fire damage.",
        "cost": 36187,
        "gains": 2824,
        "costGainingMultiplier": 1.8,
        "armoryId": 8,
        "factionId": 1
    },
    {
        "name": "Enchanted Blades",
        "description": "Imbues swords with magical energy, granting bonus effects like lifesteal or armor penetration.",
        "cost": 36187,
        "gains": 2824,
        "costGainingMultiplier": 1.8,
        "armoryId": 8,
        "factionId": 2
    },
    {
        "name": "Hellfire Infusion",
        "description": "Enchants weapons with hellfire, causing burning damage over time.",
        "cost": 36187,
        "gains": 2824,
        "costGainingMultiplier": 1.8,
        "armoryId": 8,
        "factionId": 3
    },
    {
        "name": "Angelic Feathers",
        "description": "Enchants arrows with feathers, granting them increased range and accuracy.",
        "cost": 36187,
        "gains": 2824,
        "costGainingMultiplier": 1.8,
        "armoryId": 8,
        "factionId": 4
    },
    {
        "name": "Blight-Infused Arrows",
        "description": "Enchants arrows with blight, causing decay and disease.",
        "cost": 36187,
        "gains": 2824,
        "costGainingMultiplier": 1.8,
        "armoryId": 8,
        "factionId": 5
    },
    {
        "name": "Piercing Bolts",
        "description": "Imbues crossbow bolts with magical energy, allowing them to pierce through armor with greater ease.",
        "cost": 36187,
        "gains": 2824,
        "costGainingMultiplier": 1.8,
        "armoryId": 8,
        "factionId": 6
    },
    {
        "name": "Rune-Inscribed Weapons",
        "description": "Enchants weapons with runes, granting additional effects.",
        "cost": 47043,
        "gains": 3671,
        "costGainingMultiplier": 1.8,
        "armoryId": 9,
        "factionId": 1
    },
    {
        "name": "Nature's Wrath",
        "description": "Enhances the power of nature-based weapons, increasing their damage and range.",
        "cost": 47043,
        "gains": 3671,
        "costGainingMultiplier": 1.8,
        "armoryId": 9,
        "factionId": 2
    },
    {
        "name": "Corrupted Runes",
        "description": "Inscribes weapons with dark runes, granting additional demonic powers.",
        "cost": 47043,
        "gains": 3671,
        "costGainingMultiplier": 1.8,
        "armoryId": 9,
        "factionId": 3
    },
    {
        "name": "Blessings of the Divine",
        "description": "Enhances the power of holy weapons, granting additional effects like healing or stuns.",
        "cost": 47043,
        "gains": 3671,
        "costGainingMultiplier": 1.8,
        "armoryId": 9,
        "factionId": 4
    },
    {
        "name": "Spectral Touch",
        "description": "Enchants weapons with spectral energy, allowing them to bypass armor.",
        "cost": 47043,
        "gains": 3671,
        "costGainingMultiplier": 1.8,
        "armoryId": 9,
        "factionId": 5
    },
    {
        "name": "Elemental Arrows",
        "description": "Enchants arrows with elemental power, adding fire, ice, or lightning damage to attacks.",
        "cost": 47043,
        "gains": 3671,
        "costGainingMultiplier": 1.8,
        "armoryId": 9,
        "factionId": 6
    },
    {
        "name": "Berserker Axes",
        "description": "Massive axes that deal devastating blows but slow down the wielder.",
        "cost": 61156,
        "gains": 4772,
        "costGainingMultiplier": 1.8,
        "armoryId": 10,
        "factionId": 1
    },
    {
        "name": "Starfire Arrows",
        "description": "Creates arrows that explode on impact, dealing area-of-effect fire damage.",
        "cost": 61156,
        "gains": 4772,
        "costGainingMultiplier": 1.8,
        "armoryId": 10,
        "factionId": 2
    },
    {
        "name": "Demonic Claws",
        "description": "Sharpens and strengthens claws, increasing their damage and tearing ability.",
        "cost": 61156,
        "gains": 4772,
        "costGainingMultiplier": 1.8,
        "armoryId": 10,
        "factionId": 3
    },
    {
        "name": "Seraphim Blades",
        "description": "Legendary swords wielded by Seraphim, radiating holy light and dealing devastating damage.",
        "cost": 61156,
        "gains": 4772,
        "costGainingMultiplier": 1.8,
        "armoryId": 10,
        "factionId": 4
    },
    {
        "name": "Bone Reaver",
        "description": "A massive scythe that deals devastating blows and heals the wielder.",
        "cost": 61156,
        "gains": 4772,
        "costGainingMultiplier": 1.8,
        "armoryId": 10,
        "factionId": 5
    },
    {
        "name": "Holy Avenger",
        "description": "Transforms a knight's lance into a holy weapon, dealing bonus damage against undead and demonic foes.",
        "cost": 61156,
        "gains": 4772,
        "costGainingMultiplier": 1.8,
        "armoryId": 10,
        "factionId": 6
    },
    {
        "name": "Spiked Armor",
        "description": "Adds spikes to armor, inflicting damage on attackers.",
        "cost": 79503,
        "gains": 6204,
        "costGainingMultiplier": 1.8,
        "armoryId": 11,
        "factionId": 1
    },
    {
        "name": "Leafweave Armor",
        "description": "Light armor made of woven leaves, increases movement speed and agility.",
        "cost": 79503,
        "gains": 6204,
        "costGainingMultiplier": 1.8,
        "armoryId": 11,
        "factionId": 2
    },
    {
        "name": "Spiked Hide",
        "description": "Adds spikes to demonic hides, inflicting damage on attackers.",
        "cost": 79503,
        "gains": 6204,
        "costGainingMultiplier": 1.8,
        "armoryId": 11,
        "factionId": 3
    },
    {
        "name": "Divine Raiment",
        "description": "Light armor made of ethereal cloth, increases movement speed and agility.",
        "cost": 79503,
        "gains": 6204,
        "costGainingMultiplier": 1.8,
        "armoryId": 11,
        "factionId": 4
    },
    {
        "name": "Bone Plating",
        "description": "Reinforces skeletal structures, increasing armor and reducing damage taken.",
        "cost": 79503,
        "gains": 6204,
        "costGainingMultiplier": 1.8,
        "armoryId": 11,
        "factionId": 5
    },
    {
        "name": "Padded Gambeson",
        "description": "Increases the armor of basic infantry units.",
        "cost": 79503,
        "gains": 6204,
        "costGainingMultiplier": 1.8,
        "armoryId": 11,
        "factionId": 6
    },
    {
        "name": "Trollhide Armor",
        "description": "Tough leather armor that increases health regeneration.",
        "cost": 103354,
        "gains": 8065,
        "costGainingMultiplier": 1.8,
        "armoryId": 12,
        "factionId": 1
    },
    {
        "name": "Moonsilver Armor",
        "description": "Imbued with moonlight, this armor grants magic resistance and regeneration.",
        "cost": 103354,
        "gains": 8065,
        "costGainingMultiplier": 1.8,
        "armoryId": 12,
        "factionId": 2
    },
    {
        "name": "Demonic Plate",
        "description": "Heavy armor made of infernal metals, provides excellent protection and resilience.",
        "cost": 103354,
        "gains": 8065,
        "costGainingMultiplier": 1.8,
        "armoryId": 12,
        "factionId": 3
    },
    {
        "name": "Celestial Plate",
        "description": "Heavy armor made of celestial metals, provides exceptional protection and resilience.",
        "cost": 103354,
        "gains": 8065,
        "costGainingMultiplier": 1.8,
        "armoryId": 12,
        "factionId": 4
    },
    {
        "name": "Ethereal Shroud",
        "description": "Enhances spectral units, making them more resistant to physical attacks.",
        "cost": 103354,
        "gains": 8065,
        "costGainingMultiplier": 1.8,
        "armoryId": 12,
        "factionId": 5
    },
    {
        "name": "Chainmail Reinforcement",
        "description": "Strengthens chainmail armor, providing better protection.",
        "cost": 103354,
        "gains": 8065,
        "costGainingMultiplier": 1.8,
        "armoryId": 12,
        "factionId": 6
    },
    {
        "name": "Black Iron Plate",
        "description": "Heavy plate armor that provides excellent protection.",
        "cost": 134360,
        "gains": 10484,
        "costGainingMultiplier": 1.8,
        "armoryId": 13,
        "factionId": 1
    },
    {
        "name": "Dragon Scale Armor",
        "description": "Rare and powerful armor made from dragon scales, provides exceptional protection.",
        "cost": 134360,
        "gains": 10484,
        "costGainingMultiplier": 1.8,
        "armoryId": 13,
        "factionId": 2
    },
    {
        "name": "Shadow Mantle",
        "description": "Grants increased movement speed and stealth in darkness.",
        "cost": 134360,
        "gains": 10484,
        "costGainingMultiplier": 1.8,
        "armoryId": 13,
        "factionId": 3
    },
    {
        "name": "Wings of Light",
        "description": "Enhances the wings of flying units, increasing their speed and maneuverability.",
        "cost": 134360,
        "gains": 10484,
        "costGainingMultiplier": 1.8,
        "armoryId": 13,
        "factionId": 4
    },
    {
        "name": "Dark Ritual Armor",
        "description": "Imbued with dark magic, this armor grants bonuses to health and regeneration.",
        "cost": 134360,
        "gains": 10484,
        "costGainingMultiplier": 1.8,
        "armoryId": 13,
        "factionId": 5
    },
    {
        "name": "Plate Armor Plating",
        "description": "Adds additional layers to plate armor, increasing its durability.",
        "cost": 134360,
        "gains": 10484,
        "costGainingMultiplier": 1.8,
        "armoryId": 13,
        "factionId": 6
    },
    {
        "name": "Warlord's Regalia",
        "description": "Unique armor set for the Warlord, granting bonuses to all stats.",
        "cost": 174668,
        "gains": 13629,
        "costGainingMultiplier": 1.8,
        "armoryId": 14,
        "factionId": 1
    },
    {
        "name": "Sentinel's Raiment",
        "description": "Unique armor set for the Sentinel, granting bonuses to all stats.",
        "cost": 174668,
        "gains": 13629,
        "costGainingMultiplier": 1.8,
        "armoryId": 14,
        "factionId": 2
    },
    {
        "name": "Overlord's Regalia",
        "description": "Unique armor set for the Overlord, granting bonuses to all stats and demonic powers.",
        "cost": 174668,
        "gains": 13629,
        "costGainingMultiplier": 1.8,
        "armoryId": 14,
        "factionId": 3
    },
    {
        "name": "Archangel's Armor",
        "description": "Unique armor set for the Archangel, granting bonuses to all stats and holy powers.",
        "cost": 174668,
        "gains": 13629,
        "costGainingMultiplier": 1.8,
        "armoryId": 14,
        "factionId": 4
    },
    {
        "name": "Lich's Robes",
        "description": "Unique armor set for the Lich, granting bonuses to all stats and necromantic power.",
        "cost": 174668,
        "gains": 13629,
        "costGainingMultiplier": 1.8,
        "armoryId": 14,
        "factionId": 5
    },
    {
        "name": "Paladin's Blessing",
        "description": "Enchants armor with holy energy, granting increased defense and regeneration.",
        "cost": 174668,
        "gains": 13629,
        "costGainingMultiplier": 1.8,
        "armoryId": 14,
        "factionId": 6
    },
    {
        "name": "Shaman's Garb",
        "description": "Enhances the shaman's magic and spiritual power.",
        "cost": 227068,
        "gains": 17718,
        "costGainingMultiplier": 1.8,
        "armoryId": 15,
        "factionId": 1
    },
    {
        "name": "Druid's Vestments",
        "description": "Enhances the druid's connection to nature, increasing their healing and support abilities.",
        "cost": 227068,
        "gains": 17718,
        "costGainingMultiplier": 1.8,
        "armoryId": 15,
        "factionId": 2
    },
    {
        "name": "Warlock's Robes",
        "description": "Enhances the warlock's spellcasting and demonic energy manipulation.",
        "cost": 227068,
        "gains": 17718,
        "costGainingMultiplier": 1.8,
        "armoryId": 15,
        "factionId": 3
    },
    {
        "name": "Healer's Robes",
        "description": "Enhances the healing and support abilities of priests and clerics.",
        "cost": 227068,
        "gains": 17718,
        "costGainingMultiplier": 1.8,
        "armoryId": 15,
        "factionId": 4
    },
    {
        "name": "Vampire's Cloak",
        "description": "Enhances the vampire's abilities, increasing their lifesteal and spell power.",
        "cost": 227068,
        "gains": 17718,
        "costGainingMultiplier": 1.8,
        "armoryId": 15,
        "factionId": 5
    },
    {
        "name": "Mage's Robes",
        "description": "Enhances the spellcasting abilities of mages.",
        "cost": 227068,
        "gains": 17718,
        "costGainingMultiplier": 1.8,
        "armoryId": 15,
        "factionId": 6
    },
    {
        "name": "Throwing Axes",
        "description": "Allows Orcs to throw axes at enemies from a distance.",
        "cost": 295189,
        "gains": 23034,
        "costGainingMultiplier": 1.8,
        "armoryId": 16,
        "factionId": 1
    },
    {
        "name": "Elven Cloaks",
        "description": "Grants invisibility to units for a short duration.",
        "cost": 295189,
        "gains": 23034,
        "costGainingMultiplier": 1.8,
        "armoryId": 16,
        "factionId": 2
    },
    {
        "name": "Hellfire Grenades",
        "description": "Explosives that deal fire damage and spread flames.",
        "cost": 295189,
        "gains": 23034,
        "costGainingMultiplier": 1.8,
        "armoryId": 16,
        "factionId": 3
    },
    {
        "name": "Holy Relics",
        "description": "Powerful artifacts that grant various bonuses to the angel army.",
        "cost": 295189,
        "gains": 23034,
        "costGainingMultiplier": 1.8,
        "armoryId": 16,
        "factionId": 4
    },
    {
        "name": "Blight Bombs",
        "description": "Explosives that deal damage and spread blight, weakening enemies.",
        "cost": 295189,
        "gains": 23034,
        "costGainingMultiplier": 1.8,
        "armoryId": 16,
        "factionId": 5
    },
    {
        "name": "Improved Shields",
        "description": "Increases the size and durability of shields.",
        "cost": 295189,
        "gains": 23034,
        "costGainingMultiplier": 1.8,
        "armoryId": 16,
        "factionId": 6
    },
    {
        "name": "Grappling Hooks",
        "description": "Enables Orcs to scale walls and climb obstacles.",
        "cost": 383746,
        "gains": 29944,
        "costGainingMultiplier": 1.8,
        "armoryId": 17,
        "factionId": 1
    },
    {
        "name": "Treetop Walkers",
        "description": "Allows elves to move through forests with increased speed and stealth.",
        "cost": 383746,
        "gains": 29944,
        "costGainingMultiplier": 1.8,
        "armoryId": 17,
        "factionId": 2
    },
    {
        "name": "Demonic Wings",
        "description": "Grants temporary flight to ground units.",
        "cost": 383746,
        "gains": 29944,
        "costGainingMultiplier": 1.8,
        "armoryId": 17,
        "factionId": 3
    },
    {
        "name": "Divine Aegis",
        "description": "Creates a protective shield that absorbs incoming damage.",
        "cost": 383746,
        "gains": 29944,
        "costGainingMultiplier": 1.8,
        "armoryId": 17,
        "factionId": 4
    },
    {
        "name": "Soul Gems",
        "description": "Collects souls from fallen enemies, granting bonuses to the undead army.",
        "cost": 383746,
        "gains": 29944,
        "costGainingMultiplier": 1.8,
        "armoryId": 17,
        "factionId": 5
    },
    {
        "name": "Horse Breeder",
        "description": "Improves the quality and speed of cavalry horses.",
        "cost": 383746,
        "gains": 29944,
        "costGainingMultiplier": 1.8,
        "armoryId": 17,
        "factionId": 6
    },
    {
        "name": "War Banners",
        "description": "Boosts the morale and combat effectiveness of nearby units.",
        "cost": 498869,
        "gains": 38927,
        "costGainingMultiplier": 1.8,
        "armoryId": 18,
        "factionId": 1
    },
    {
        "name": "Nature's Boon",
        "description": "Creates a healing aura that restores health to nearby allies.",
        "cost": 498869,
        "gains": 38927,
        "costGainingMultiplier": 1.8,
        "armoryId": 18,
        "factionId": 2
    },
    {
        "name": "Banner of Torment",
        "description": "Instills fear and weakens the resolve of nearby enemies.",
        "cost": 498869,
        "gains": 38927,
        "costGainingMultiplier": 1.8,
        "armoryId": 18,
        "factionId": 3
    },
    {
        "name": "Banner of Righteousness",
        "description": "Inspires courage and strengthens the resolve of nearby allies.",
        "cost": 498869,
        "gains": 38927,
        "costGainingMultiplier": 1.8,
        "armoryId": 18,
        "factionId": 4
    },
    {
        "name": "Banner of Undeath",
        "description": "Instills fear and weakens the resolve of nearby enemies.",
        "cost": 498869,
        "gains": 38927,
        "costGainingMultiplier": 1.8,
        "armoryId": 18,
        "factionId": 5
    },
    {
        "name": "Banner of Courage",
        "description": "Inspires nearby units, increasing their morale and combat effectiveness.",
        "cost": 498869,
        "gains": 38927,
        "costGainingMultiplier": 1.8,
        "armoryId": 18,
        "factionId": 6
    },
    {
        "name": "Totem of Protection",
        "description": "Provides a protective aura that reduces incoming damage.",
        "cost": 648530,
        "gains": 50605,
        "costGainingMultiplier": 1.8,
        "armoryId": 19,
        "factionId": 1
    },
    {
        "name": "Elven Song",
        "description": "A magical melody that boosts morale and combat effectiveness of nearby units.",
        "cost": 648530,
        "gains": 50605,
        "costGainingMultiplier": 1.8,
        "armoryId": 19,
        "factionId": 2
    },
    {
        "name": "Soul Cage",
        "description": "Traps enemy souls, granting bonuses to the demon army.",
        "cost": 648530,
        "gains": 50605,
        "costGainingMultiplier": 1.8,
        "armoryId": 19,
        "factionId": 3
    },
    {
        "name": "Angelic Trumpets",
        "description": "Sound a call that buffs allies and weakens enemies.",
        "cost": 648530,
        "gains": 50605,
        "costGainingMultiplier": 1.8,
        "armoryId": 19,
        "factionId": 4
    },
    {
        "name": "Necromantic Scrolls",
        "description": "For powerful necromantic spells and rituals.",
        "cost": 648530,
        "gains": 50605,
        "costGainingMultiplier": 1.8,
        "armoryId": 19,
        "factionId": 5
    },
    {
        "name": "Healing Potions",
        "description": "Provides instant healing to injured units.",
        "cost": 648530,
        "gains": 50605,
        "costGainingMultiplier": 1.8,
        "armoryId": 19,
        "factionId": 6
    },
    {
        "name": "Drums of Rage",
        "description": "Increases attack speed and movement speed of nearby units.",
        "cost": 843089,
        "gains": 65786,
        "costGainingMultiplier": 1.8,
        "armoryId": 20,
        "factionId": 1
    },
    {
        "name": "Moonstone Amulets",
        "description": "Enhances magical power and reduces mana cost of spells.",
        "cost": 843089,
        "gains": 65786,
        "costGainingMultiplier": 1.8,
        "armoryId": 20,
        "factionId": 2
    },
    {
        "name": "Demonic Rituals",
        "description": "For powerful rituals that empower the demon army and weaken enemies.",
        "cost": 843089,
        "gains": 65786,
        "costGainingMultiplier": 1.8,
        "armoryId": 20,
        "factionId": 3
    },
    {
        "name": "Divine Intervention",
        "description": "Calls upon divine power to heal and resurrect fallen allies.",
        "cost": 843089,
        "gains": 65786,
        "costGainingMultiplier": 1.8,
        "armoryId": 20,
        "factionId": 4
    },
    {
        "name": "Tombstone Ward",
        "description": "Creates a protective barrier that reduces incoming damage and heals undead units.",
        "cost": 843089,
        "gains": 65786,
        "costGainingMultiplier": 1.8,
        "armoryId": 20,
        "factionId": 5
    },
    {
        "name": "Mana Potions",
        "description": "Restores mana to spellcasting units.",
        "cost": 843089,
        "gains": 65786,
        "costGainingMultiplier": 1.8,
        "armoryId": 20,
        "factionId": 6
    },
];

const factionData = [
    {
        "factionId": 1,
        "factionName": "Orc",
        "description": "The Orcs, a brutish, bloodthirsty race of warriors, suffered devastating losses supporting the demonic faction in the Throne Wars. Driven from their lands, they now roam as nomadic hordes, scavenging the desolate wastes for forgotten treasures. Now, armed with ancient knowledge and battle-hardened, they stand at the precipice of war. But they lack a leader, a warlord to unite their clans and claim the throne. Could you be the one to forge a new orcish empire? Could you rule the world?",
        "skills": ["Brute Force", "War Cry", "Savage Attack"],
        "users": []
    },
    {
        "factionId": 2,
        "factionName": "Elf",
        "description": "The Elves, renowned for their wisdom, grace, and prowess in battle, stood with humanity in the last Throne War and claimed dominion over the forests. For centuries, they lived in tranquility. Yet, as various races, particularly humans, encroached upon their woodlands, the elves have been forced to defend their realm. Now, they sharpen their blades and gather their magical artifacts. All they lack is a queen to unite their kingdoms and lead them to victory. Could you be that queen? Could you restore peace to the world?",
        "skills": ["Archery", "Stealth", "Nature's Blessing"],
        "users": []
    },
    {
        "factionId": 3,
        "factionName": "Demon",
        "description": "The Demons, cruel, powerful, and cunning entities, were the most formidable force in the last Throne War. They sought to conquer Noctia and transform it into a hellish realm. However, a united front of factions forced them back through the portals from which they came. After three hundred winters of gathering their strength, the Demons are poised to return. Can you lead them to victory, reclaim Noctia, and make it your infernal domain?",
        "skills": ["Dark Magic", "Firestorm", "Hellfire"],
        "users": []
    },
    {
        "factionId": 4,
        "factionName": "Angel",
        "description": "The angelic faction, beings of wisdom, compassion, and order, entered the Throne War late. Residing in the celestial realm, they were detached from the affairs of Noctia until the demonic hordes threatened to consume the world. With celestial gates swinging open, angelic legions descended upon the demonic armies. After a long and bloody conflict, the angels triumphed, but at a great cost. Having ensured the human Emperor would maintain order, they returned to the heavens. But perhaps they were wrong to entrust Noctia to mortals. Could you lead the angels once more, and bring true peace and order to the world?",
        "skills": ["Healing Light", "Divine Protection", "Holy Wrath"],
        "users": []
    },
    {
        "factionId": 5,
        "factionName": "Undead",
        "description": "The Undead, cunning, patient, and wise necromancers, were resurrected by powerful death mages to aid humanity in the last Throne War. However, fearing their growing power, the Emperor ordered their extermination. The Undead leaders, formidable beings, evaded capture and vanished into the shadows. Now, they dwell in the swamps of Noctia, their undead armies growing stronger with each fallen soldier. They seek vengeance against humanity. Can you unite the Undead and lead them to conquer the world, creating a realm where only the undead shall reign?",
        "skills": ["Necromancy", "Plague", "Death's Grasp"],
        "users": []
    },
    {
        "factionId": 6,
        "factionName": "Human",
        "description": "Humans, renowned for their cunning, courage, and adaptability, united the factions in the last Throne War and claimed dominion over the world. Yet, years of prosperity have corrupted their hearts. With the last Emperor's death and no heir to the throne, the human realm is fracturing. Kings vie for power, each claiming the imperial title. Can you unite the fractured human kingdoms and restore the Empire to its former glory? Can you lead humanity to once more dominate the world?",
        "skills": ["Swordsmanship", "Tactics", "Leadership"],
        "users": []
    }

];

const seedDatabase = async () => {
    try {
        await Ladder.deleteMany({});
        await Soldier.deleteMany({});
        await Spell.deleteMany({});
        await Artifact.deleteMany({});
        await Friend.deleteMany({});
        await Hero.deleteMany({});
        await User.deleteMany({});
        await UserAuth.deleteMany({});
        await Faction.deleteMany({});
        await Armory.deleteMany({});
        await War.deleteMany({});

        await Ladder.insertMany(ladderData);
        console.log('Ladders seeded successfully!');

        await Soldier.insertMany(soldierData);
        console.log('Soldiers seeded successfully!');

        await Spell.insertMany(spellData);
        console.log('Spells seeded successfully!');

        await Artifact.insertMany(artifactData);
        console.log('Artifacts seeded successfully!');

        await Friend.insertMany(friendData);
        console.log('Friends seeded successfully!');

        await SkillBuff.insertMany(skillBuffData); // Insert new Skill & Buff data
        console.log('Skill & Buffs seeded successfully!');

        await Hero.insertMany(heroData); // Insert new Skill & Buff data
        console.log('Hero seeded successfully!');

        await User.insertMany(userData);
        console.log('User seeded successfully!');

        await UserAuth.insertMany(userAuthData);
        console.log('UserAuth seeded successfully!');

        await War.insertMany(warData);
        console.log('War seeded successfully!');

        await Armory.insertMany(armoryData);
        console.log('Armory seeded successfully!');

        await Faction.insertMany(factionData);
        console.log('Faction seeded successfully!');


        await mongoose.connection.close();
        console.log('Database seeding completed and connection closed.');
    } catch (err) {
        console.error('Error seeding data:', err);
        await mongoose.connection.close();
    }
};

seedDatabase();
