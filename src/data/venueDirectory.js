// Venue directory transcribed from the BlizzCon 2026 floor map (names and
// general layout only - no artwork, icons, or branding reproduced).
// `desc` marked (est.) is a reasonable guess at what the spot is, not a
// confirmed fact - the map itself only gives names, not descriptions.

export const VENUE_DIRECTORY = [
  {
    id: 'hallE',
    name: 'Hall E',
    items: [
      { name: 'Registration', desc: 'Badge pickup and on-site registration' },
      { name: 'Cosplay Lounge', desc: 'Rest and prep space for cosplayers (est.)' },
    ],
  },
  {
    id: 'hallD',
    name: 'Hall D \u2014 Main Stage',
    items: [
      { name: 'Main Stage', desc: 'Opening Ceremony, WoW/Diablo/Overwatch panels, Community Night', stageId: 'main' },
      { name: 'Buzzard Exhibits', desc: 'Community/fan exhibit displays (est.)' },
      { name: 'Art Gallery', desc: 'BlizzCon community and concept art exhibit' },
      { name: 'Blizzard 35: The Next Chapter', desc: "Retrospective exhibit for Blizzard's 35th anniversary" },
    ],
  },
  {
    id: 'hallC',
    name: 'Hall C \u2014 World of Warcraft Stage',
    items: [
      { name: 'World of Warcraft Stage', desc: 'WoW panels, MDI Grand Finals, AWC Grand Finals', stageId: 'wow' },
      { name: 'World of Warcraft Demo', desc: 'Hands-on WoW demo stations' },
      { name: 'Streaming Stations', desc: 'Watch co-streams and community content' },
      { name: 'Last Call at the Arcanitrix', desc: 'Themed bar/lounge (est.)' },
      { name: 'Guild Lounge', desc: 'Community meetup space (est.)' },
      { name: 'Professions Plaza', desc: 'WoW professions-themed activities (est.)' },
      { name: 'Well of Eternity', desc: 'WoW lore-themed photo installation (est.)' },
      { name: 'BlizzCon Merch Kiosk', desc: 'Satellite merchandise stand' },
      { name: 'Gigabyte / Nvidia', desc: 'Hardware sponsor showcase' },
      { name: 'MSI', desc: 'Hardware sponsor showcase' },
      { name: "Battle.net 30th Anniversary Photo Op", desc: "Photo installation for Battle.net's 30th anniversary" },
    ],
  },
  {
    id: 'hallB',
    name: 'Hall B \u2014 Hearthstone Stage',
    items: [
      { name: 'Hearthstone Stage', desc: 'Hearthstone World Championship and panels', stageId: 'hearthstone' },
      { name: 'Hearthstone Demo', desc: 'Hands-on Hearthstone demo stations' },
      { name: 'Hearthstone Tavern', desc: 'Themed lounge area (est.)' },
      { name: 'Artist Nook', desc: 'Community artists and art activities (est.)' },
      { name: 'Meet & Greet', desc: 'Developer/talent meet & greet' },
      { name: 'Mocktail Bar', desc: 'Non-alcoholic drinks bar' },
      { name: 'Diablo 30-Year Anniversary Celebration', desc: "Exhibit for Diablo's 30th anniversary" },
      { name: 'Diablo Immortal Arena', desc: 'Diablo Immortal activity area', stageId: 'diablo' },
      { name: 'Diablo IV Demo', desc: 'Hands-on Diablo IV demo stations' },
      { name: 'Diablo Immortal Photo Op', desc: 'Photo installation' },
      { name: "Hell's Ink", desc: 'Temporary tattoo/henna station (est.)' },
      { name: 'Bracelet Bar', desc: 'Craft/bracelet-making activity (est.)' },
    ],
  },
  {
    id: 'hallA',
    name: 'Hall A \u2014 Classic Cup Stage',
    items: [
      { name: 'Classic Cup Stage', desc: 'Classic Cup esports: WC3, StarCraft, HotS', stageId: 'classiccup' },
      { name: 'Arcade Collection Demo', desc: 'Playable classic Blizzard arcade titles (est.)' },
      { name: 'StarCraft II / Remastered Demo', desc: 'Hands-on StarCraft demo stations' },
      { name: 'Trading Post', desc: 'Pin/item trading area (est.)' },
      { name: 'Warcraft III Demo', desc: 'Hands-on Warcraft III demo stations' },
      { name: 'Heroes of the Storm Demo', desc: 'Hands-on HotS demo stations' },
      { name: 'Overwatch World Cup Photo Op', desc: 'Photo installation' },
      { name: 'Secretlab', desc: 'Gaming chair sponsor showcase' },
    ],
  },
  {
    id: 'arena',
    name: 'Arena \u2014 Overwatch World Cup',
    items: [
      { name: 'Overwatch World Cup Arena', desc: 'OWCS quarterfinals through finals', stageId: 'owcup' },
      { name: 'Arena Plaza', desc: 'Open plaza surrounding the arena' },
      { name: 'Access to Quiet Room', desc: 'Sensory-friendly quiet space' },
      { name: 'Food Trucks', desc: 'Food trucks' },
      { name: 'Hammerdown Challenge', desc: 'Overwatch community challenge activity (est.)' },
      { name: 'Omnic Oracle', desc: 'Overwatch-themed activity or photo installation (est.)' },
      { name: '10-Year Anniversary Activation', desc: "Exhibit for Overwatch's 10th anniversary" },
      { name: 'Overwatch Merch Trailer', desc: 'Overwatch-branded merch trailer' },
      { name: 'BlizzCon Merch Kiosk', desc: 'Satellite merchandise stand' },
      { name: 'Tea House Lounge', desc: 'Themed lounge/rest area (est.)' },
      { name: 'MEKA Photo Op', desc: 'Overwatch-themed photo installation' },
    ],
  },
  {
    id: 'level1',
    name: 'Level 1 (near Grand Plaza)',
    items: [
      { name: 'Jackson Guitar', desc: 'Sponsor guitar showcase' },
      { name: 'Guest Services', desc: 'General attendee help desk' },
      { name: 'Fanta', desc: 'Sponsor beverage activation' },
      { name: 'Service Awards', desc: 'Blizzard employee service awards display (est.)' },
      { name: 'Grand Plaza Fountain', desc: 'Central outdoor plaza landmark' },
    ],
  },
  {
    id: 'level2',
    name: 'Level 2 \u2014 North Hall (via skybridge)',
    items: [
      { name: 'Legends Stage', desc: 'Developer panels and community talks', stageId: 'legends' },
      { name: 'Portfolio & Resume Reviews', desc: 'Career development sessions' },
      { name: 'Inclusion Nexus', desc: 'Diversity and inclusion community space' },
    ],
  },
  {
    id: 'darkmoon',
    name: 'Darkmoon Faire (North Hall)',
    items: [
      { name: 'Duck Pond', desc: 'Classic carnival game' },
      { name: 'Face Painting', desc: 'Face painting activity' },
      { name: 'Puzzle Challenge', desc: 'Puzzle-solving activity' },
      { name: 'Caricature Drawings', desc: 'On-site caricature artists' },
      { name: 'Adopt-a-Plushie', desc: 'Claw-machine style plushie game' },
      { name: 'Toy Capsules', desc: 'Vending-style toy capsule machines' },
      { name: 'Trading Post', desc: 'Pin/item trading area (est.)' },
      { name: 'Pin Purchase', desc: 'Collectible pin sales' },
      { name: 'DMF Stage', desc: 'Darkmoon Faire stage entertainment' },
    ],
  },
  {
    id: 'merchstore',
    name: 'North Hall \u2014 Merch Store',
    items: [{ name: 'BlizzCon Merch Store', desc: 'Main official merchandise store' }],
  },
  {
    id: 'amenities',
    name: 'General Amenities',
    items: [
      { name: 'First Aid', desc: 'Medical assistance points throughout the venue' },
      { name: 'Restrooms', desc: 'Restrooms throughout the venue' },
      { name: 'ADA Elevator', desc: 'Accessible elevator access' },
      { name: "Mother's Room", desc: 'Private nursing/pumping room' },
      { name: 'March of the Murlocs Meeting Area', desc: 'Meetup point for the annual Murloc parade' },
      { name: 'Guest Services', desc: 'General attendee help desk' },
    ],
  },
];
