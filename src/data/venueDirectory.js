// Venue directory transcribed from the BlizzCon 2026 floor map (names and
// general layout only - no artwork, icons, or branding reproduced).
// `desc` marked (est.) is a reasonable guess at what the spot is, not a
// confirmed fact - the map itself only gives names, not descriptions.
// `shape` gives each area's rough position/size for the schematic map view,
// approximating the real layout (halls in a row, arena to the east, north
// hall up top via skybridge) - not a traced copy of the official artwork.

export const VENUE_DIRECTORY = [
  {
    id: 'hallE',
    name: 'Hall E',
    shape: { type: 'rect', x: 10, y: 340, w: 130, h: 180 },
    items: [
      { name: 'Registration', desc: 'Badge pickup and on-site registration' },
      { name: 'Cosplay Lounge', desc: 'Rest and prep space for cosplayers (est.)' },
    ],
  },
  {
    id: 'hallD',
    name: 'Hall D \u2014 Main Stage',
    shape: { type: 'rect', x: 150, y: 260, w: 150, h: 260 },
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
    shape: { type: 'rect', x: 310, y: 280, w: 140, h: 220 },
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
    shape: { type: 'rect', x: 460, y: 280, w: 140, h: 220 },
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
    shape: { type: 'rect', x: 610, y: 260, w: 140, h: 240 },
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
    shape: { type: 'circle', cx: 860, cy: 350, r: 115 },
    items: [
      { name: 'Overwatch World Cup Arena', desc: 'OWCS quarterfinals through finals', stageId: 'owcup' },
      { name: 'Hammerdown Challenge', desc: 'Overwatch community challenge activity (est.)' },
      { name: 'Omnic Oracle', desc: 'Overwatch-themed activity or photo installation (est.)' },
      { name: '10-Year Anniversary Activation', desc: "Exhibit for Overwatch's 10th anniversary" },
      { name: 'Overwatch Merch Trailer', desc: 'Overwatch-branded merch trailer' },
      { name: 'MEKA Photo Op', desc: 'Overwatch-themed photo installation' },
    ],
  },
  {
    id: 'arenaPlaza',
    name: 'Arena Plaza',
    shape: { type: 'rect', x: 770, y: 490, w: 180, h: 60 },
    items: [
      { name: 'Access to Quiet Room', desc: 'Sensory-friendly quiet space' },
      { name: 'Food Trucks', desc: 'Food trucks' },
      { name: 'BlizzCon Merch Kiosk', desc: 'Satellite merchandise stand' },
      { name: 'Tea House Lounge', desc: 'Themed lounge/rest area (est.)' },
    ],
  },
  {
    id: 'level1',
    name: 'Level 1 Plaza (Grand Plaza)',
    shape: { type: 'rect', x: 150, y: 550, w: 600, h: 70 },
    items: [
      { name: 'Grand Plaza Fountain', desc: 'Central outdoor plaza landmark' },
      { name: 'Jackson Guitar', desc: 'Sponsor guitar showcase' },
      { name: 'Guest Services', desc: 'General attendee help desk' },
      { name: 'Fanta', desc: 'Sponsor beverage activation' },
      { name: 'Service Awards', desc: 'Blizzard employee service awards display (est.)' },
    ],
  },
  {
    id: 'level2',
    name: 'Level 2 \u2014 North Hall (via skybridge)',
    shape: { type: 'rect', x: 690, y: 40, w: 160, h: 90 },
    items: [
      { name: 'Legends Stage', desc: 'Developer panels and community talks', stageId: 'legends' },
      { name: 'Portfolio & Resume Reviews', desc: 'Career development sessions' },
      { name: 'Inclusion Nexus', desc: 'Diversity and inclusion community space' },
    ],
  },
  {
    id: 'darkmoon',
    name: 'Darkmoon Faire (North Hall)',
    shape: { type: 'rect', x: 870, y: 40, w: 150, h: 110 },
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
    shape: { type: 'rect', x: 870, y: 160, w: 150, h: 80 },
    items: [{ name: 'BlizzCon Merch Store', desc: 'Main official merchandise store' }],
  },
  {
    id: 'amenities',
    name: 'General Amenities',
    shape: null, // venue-wide, not a single spot - shown as a list, not a map region
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
