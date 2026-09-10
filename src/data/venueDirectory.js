// Venue directory transcribed from the BlizzCon 2026 floor map (names and
// general layout only - no artwork, icons, or branding reproduced).
// `desc` marked (est.) is a reasonable guess at what the spot is, not a
// confirmed fact - the map itself only gives names, not descriptions.
//
// Item (x, y) coordinates were extracted by OCR-ing the actual floor map
// image and reading off each label's real pixel position (cross-checked
// against close-up crops for anything OCR missed), then scaled into this
// file's 0-1040 x 0-460 coordinate space. `bbox` on each area is the
// bounding box of its own items, used to draw a background outline.

export const VENUE_DIRECTORY = [
  {
    id: 'hallE',
    name: 'Hall E',
    bbox: { x: 206, y: 335, w: 37, h: 53 },
    items: [
      { name: 'Registration', desc: 'Badge pickup and on-site registration', x: 220, y: 374 },
      { name: 'Cosplay Lounge', desc: 'Rest and prep space for cosplayers (est.)', x: 229, y: 349 },
    ],
  },
  {
    id: 'hallD',
    name: 'Hall D — Main Stage',
    bbox: { x: 161, y: 205, w: 115, h: 113 },
    items: [
      { name: 'Main Stage', desc: 'Opening Ceremony, WoW/Diablo/Overwatch panels, Community Night', x: 175, y: 219, stageId: 'main' },
      { name: 'Blizzard Exhibits', desc: 'Community/fan exhibit displays (est.)', x: 211, y: 304 },
      { name: 'Blizzard 35: The Next Chapter', desc: 'Retrospective exhibit for Blizzard\'s 35th anniversary', x: 230, y: 293 },
      { name: 'Art Gallery', desc: 'BlizzCon community and concept art exhibit', x: 262, y: 292 },
    ],
  },
  {
    id: 'hallC',
    name: 'Hall C — World of Warcraft Stage',
    bbox: { x: 253, y: 171, w: 165, h: 124 },
    items: [
      { name: 'World of Warcraft Stage', desc: 'WoW panels, MDI Grand Finals, AWC Grand Finals', x: 267, y: 185, stageId: 'wow' },
      { name: 'World of Warcraft Demo', desc: 'Hands-on WoW demo stations', x: 315, y: 223 },
      { name: 'Streaming Stations', desc: 'Watch co-streams and community content', x: 344, y: 232 },
      { name: 'Last Call at the Arcanitrix', desc: 'Themed bar/lounge (est.)', x: 356, y: 247 },
      { name: 'Meet & Greet', desc: 'Developer/talent meet & greet', x: 288, y: 244 },
      { name: 'Professions Plaza', desc: 'WoW professions-themed activities (est.)', x: 369, y: 258 },
      { name: 'Well of Eternity', desc: 'WoW lore-themed photo installation (est.)', x: 353, y: 261 },
      { name: 'Guild Lounge', desc: 'Community meetup space (est.)', x: 378, y: 249 },
      { name: 'BlizzCon Merch Kiosk', desc: 'Satellite merchandise stand', x: 305, y: 281 },
      { name: 'Gigabyte / Nvidia', desc: 'Hardware sponsor showcase', x: 396, y: 269 },
      { name: 'MSI', desc: 'Hardware sponsor showcase', x: 404, y: 276 },
    ],
  },
  {
    id: 'hallB',
    name: 'Hall B — Hearthstone Stage',
    bbox: { x: 345, y: 148, w: 189, h: 129 },
    items: [
      { name: 'Hearthstone Stage', desc: 'Hearthstone World Championship and panels', x: 384, y: 162, stageId: 'hearthstone' },
      { name: 'Meet & Greet', desc: 'Developer/talent meet & greet', x: 520, y: 182 },
      { name: 'Mocktail Bar', desc: 'Non-alcoholic drinks bar', x: 444, y: 176 },
      { name: 'Hearthstone Tavern', desc: 'Themed lounge area (est.)', x: 445, y: 183 },
      { name: 'Hearthstone Demo', desc: 'Hands-on Hearthstone demo stations', x: 359, y: 200 },
      { name: 'Artist Nook', desc: 'Community artists and art activities (est.)', x: 389, y: 200 },
      { name: 'Duel-A-Dev', desc: 'Play a match against a Blizzard developer (est.)', x: 426, y: 192 },
      { name: 'Diablo 30-Year Anniversary Celebration', desc: 'Exhibit for Diablo\'s 30th anniversary', x: 434, y: 205 },
      { name: 'Diablo Immortal Arena', desc: 'Diablo Immortal activity area', x: 458, y: 216, stageId: 'diablo' },
      { name: 'Diablo IV Demo', desc: 'Hands-on Diablo IV demo stations', x: 459, y: 223 },
      { name: 'Diablo Immortal Photo Op', desc: 'Photo installation', x: 429, y: 222 },
      { name: 'Partner Activation', desc: 'Sponsor/partner activation booth (est.)', x: 393, y: 226 },
      { name: 'Bracelet Bar', desc: 'Craft/bracelet-making activity (est.)', x: 419, y: 250 },
      { name: 'Hell\'s Ink', desc: 'Temporary tattoo/henna station (est.)', x: 435, y: 263 },
    ],
  },
  {
    id: 'hallA',
    name: 'Hall A — Classic Cup Stage',
    bbox: { x: 468, y: 122, w: 162, h: 91 },
    items: [
      { name: 'Classic Cup Stage', desc: 'Classic Cup esports: WC3, StarCraft, HotS', x: 511, y: 136, stageId: 'classiccup' },
      { name: 'StarCraft II / Remastered Demo', desc: 'Hands-on StarCraft demo stations', x: 562, y: 137 },
      { name: 'Trading Post', desc: 'Pin/item trading area (est.)', x: 575, y: 153 },
      { name: 'Arcade Collection Demo', desc: 'Playable classic Blizzard arcade titles (est.)', x: 482, y: 156 },
      { name: 'Warcraft III Demo', desc: 'Hands-on Warcraft III demo stations', x: 533, y: 169 },
      { name: 'Heroes of the Storm Demo', desc: 'Hands-on HotS demo stations', x: 562, y: 165 },
      { name: 'Diablo I/II/III Demo', desc: 'Hands-on classic Diablo demo stations', x: 589, y: 169 },
      { name: 'Meet & Greet', desc: 'Developer/talent meet & greet', x: 558, y: 199 },
      { name: 'Streaming Stations', desc: 'Watch co-streams and community content', x: 536, y: 190 },
      { name: 'Overwatch Demo', desc: 'Hands-on Overwatch demo stations', x: 591, y: 199 },
      { name: 'Secretlab', desc: 'Gaming chair sponsor showcase', x: 616, y: 187 },
    ],
  },
  {
    id: 'arena',
    name: 'Arena — Overwatch World Cup',
    bbox: { x: 630, y: 138, w: 108, h: 76 },
    items: [
      { name: 'Overwatch World Cup Arena', desc: 'OWCS quarterfinals through finals', x: 724, y: 152, stageId: 'owcup' },
      { name: 'Overwatch World Cup Photo Op', desc: 'Photo installation', x: 644, y: 200 },
    ],
  },
  {
    id: 'arenaPlaza',
    name: 'Arena Plaza',
    bbox: { x: 539, y: 150, w: 275, h: 88 },
    items: [
      { name: 'Access to Quiet Room', desc: 'Sensory-friendly quiet space', x: 656, y: 194 },
      { name: 'Food Trucks', desc: 'Food trucks', x: 760, y: 219 },
      { name: 'Hammerdown Challenge', desc: 'Overwatch community challenge activity (est.)', x: 601, y: 197 },
      { name: 'Omnic Oracle', desc: 'Overwatch-themed activity or photo installation (est.)', x: 553, y: 214 },
      { name: '10-Year Anniversary Activation', desc: 'Exhibit for Overwatch\'s 10th anniversary', x: 588, y: 208 },
      { name: 'Tea House Lounge', desc: 'Themed lounge/rest area (est.)', x: 620, y: 215 },
      { name: 'MEKA Photo Op', desc: 'Overwatch-themed photo installation', x: 582, y: 224 },
      { name: 'BlizzCon Merch Kiosk', desc: 'Satellite merchandise stand', x: 600, y: 222 },
      { name: 'Blizzard Merch Trailer', desc: 'Blizzard\'s on-site merch trailer', x: 800, y: 164 },
    ],
  },
  {
    id: 'level1',
    name: 'Level 1 Plaza (Grand Plaza)',
    bbox: { x: 430, y: 242, w: 197, h: 154 },
    items: [
      { name: 'Grand Plaza Fountain', desc: 'Central outdoor plaza landmark', x: 544, y: 342 },
      { name: 'Food Trucks', desc: 'Food trucks', x: 613, y: 382 },
      { name: 'Battle.net 30th Anniversary Photo Op', desc: 'Photo installation for Battle.net\'s 30th anniversary', x: 444, y: 273 },
      { name: 'Jackson Guitar', desc: 'Sponsor guitar showcase', x: 460, y: 272 },
      { name: 'Guest Services', desc: 'General attendee help desk', x: 489, y: 272 },
      { name: 'Fanta', desc: 'Sponsor beverage activation', x: 507, y: 256 },
      { name: 'Service Awards', desc: 'Blizzard employee service awards display (est.)', x: 519, y: 257 },
    ],
  },
  {
    id: 'level2',
    name: 'Level 2 — North Hall (via skybridge)',
    bbox: { x: 572, y: 72, w: 55, h: 49 },
    items: [
      { name: 'Legends Stage', desc: 'Developer panels and community talks', x: 586, y: 86, stageId: 'legends' },
      { name: 'Portfolio & Resume Reviews', desc: 'Career development sessions', x: 602, y: 96 },
      { name: 'Inclusion Nexus', desc: 'Diversity and inclusion community space', x: 613, y: 107 },
    ],
  },
  {
    id: 'darkmoon',
    name: 'Darkmoon Faire (North Hall)',
    bbox: { x: 816, y: 47, w: 168, h: 80 },
    items: [
      { name: 'DMF Stage', desc: 'Darkmoon Faire stage entertainment', x: 909, y: 61 },
      { name: 'Face Painting', desc: 'Face painting activity', x: 876, y: 69 },
      { name: 'Puzzle Challenge', desc: 'Puzzle-solving activity', x: 878, y: 78 },
      { name: 'Caricature Drawings', desc: 'On-site caricature artists', x: 872, y: 89 },
      { name: 'Pin Purchase', desc: 'Collectible pin sales', x: 970, y: 70 },
      { name: 'Duck Pond', desc: 'Classic carnival game', x: 830, y: 88 },
      { name: 'Adopt-a-Plushie', desc: 'Claw-machine style plushie game', x: 849, y: 105 },
      { name: 'Toy Capsules', desc: 'Vending-style toy capsule machines', x: 878, y: 113 },
      { name: 'Trading Post', desc: 'Pin/item trading area (est.)', x: 932, y: 75 },
    ],
  },
  {
    id: 'merchstore',
    name: 'North Hall — Merch Store',
    bbox: { x: 892, y: 202, w: 28, h: 28 },
    items: [
      { name: 'BlizzCon Merch Store', desc: 'Main official merchandise store', x: 906, y: 216 },
    ],
  },
  {
    id: 'amenities',
    name: 'General Amenities',
    bbox: null,
    items: [
      { name: 'First Aid', desc: 'Medical assistance points throughout the venue' },
      { name: 'Restrooms', desc: 'Restrooms throughout the venue' },
      { name: 'ADA Elevator', desc: 'Accessible elevator access' },
      { name: 'Mother\'s Room', desc: 'Private nursing/pumping room' },
      { name: 'March of the Murlocs Meeting Area', desc: 'Meetup point for the annual Murloc parade' },
      { name: 'Guest Services', desc: 'General attendee help desk' },
    ],
  },
];
