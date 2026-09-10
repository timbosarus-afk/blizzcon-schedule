// BlizzCon 2026 schedule, transcribed from the official Full Schedule graphics.
// Times are Pacific (Anaheim Convention Center). Stored as ISO strings with -07:00 offset.
// category values: warcraft | overwatch | diablo | hearthstone | classic | blizzard

const D1 = '2026-09-12';
const D2 = '2026-09-13';

function t(date, time) {
  return `${date}T${time}:00-07:00`;
}

export const STAGES = [
  { id: 'main', name: 'Main Stage', hall: 'Hall D' },
  { id: 'legends', name: 'Legends Stage', hall: '2nd Floor' },
  { id: 'owcup', name: 'Overwatch World Cup Arena', hall: 'Arena' },
  { id: 'wow', name: 'World of Warcraft Stage', hall: 'Hall C' },
  { id: 'hearthstone', name: 'Hearthstone Stage', hall: 'Hall B' },
  { id: 'classiccup', name: 'Classic Cup Stage', hall: 'Hall A' },
  { id: 'diablo', name: 'Diablo Stage', hall: 'Hall B' },
];

export const SCHEDULE = [
  // ---- Shared / Opening ----
  { id: 'd1-opening', day: D1, stage: 'main', title: 'Opening Ceremony', category: 'blizzard', start: t(D1, '10:30'), end: t(D1, '11:45') },

  // ---- Day 1: Main Stage ----
  { id: 'd1-main-1', day: D1, stage: 'main', title: "World of Warcraft: What's Next", category: 'warcraft', start: t(D1, '12:00'), end: t(D1, '12:45') },
  { id: 'd1-main-2', day: D1, stage: 'main', title: 'Diablo: Developer Update', category: 'diablo', start: t(D1, '13:45'), end: t(D1, '14:30') },
  { id: 'd1-main-3', day: D1, stage: 'main', title: "World of Warcraft: What's Next II", category: 'warcraft', start: t(D1, '14:45'), end: t(D1, '15:30') },
  { id: 'd1-main-4', day: D1, stage: 'main', title: 'Overwatch: Hero Deep Dive', category: 'overwatch', start: t(D1, '15:45'), end: t(D1, '16:30') },
  { id: 'd1-main-5', day: D1, stage: 'main', title: 'BlizzCon Community Night', category: 'blizzard', start: t(D1, '16:45'), end: t(D1, '19:00') },

  // ---- Day 1: Legends Stage ----
  { id: 'd1-leg-1', day: D1, stage: 'legends', title: 'Overwatch Dev Livestream: Live from BlizzCon!', category: 'overwatch', start: t(D1, '12:00'), end: t(D1, '12:45') },
  { id: 'd1-leg-2', day: D1, stage: 'legends', title: 'Trailercraft', category: 'blizzard', start: t(D1, '13:00'), end: t(D1, '13:45') },
  { id: 'd1-leg-3', day: D1, stage: 'legends', title: 'Building Cutscenes in World of Warcraft', category: 'warcraft', start: t(D1, '14:00'), end: t(D1, '14:45') },
  { id: 'd1-leg-4', day: D1, stage: 'legends', title: 'The World of Blizzard Sound Design', category: 'blizzard', start: t(D1, '15:00'), end: t(D1, '16:00') },
  { id: 'd1-leg-5', day: D1, stage: 'legends', title: "The Art of Darkness: Behind Diablo IV's Cinematics", category: 'diablo', start: t(D1, '16:15'), end: t(D1, '17:15') },
  { id: 'd1-leg-6', day: D1, stage: 'legends', title: 'Kinda Funny Live from BlizzCon', category: 'blizzard', start: t(D1, '17:30'), end: t(D1, '18:30') },

  // ---- Day 1: Overwatch World Cup Arena ----
  { id: 'd1-ow-1', day: D1, stage: 'owcup', title: 'Overwatch World Cup Quarterfinals 1', category: 'overwatch', start: t(D1, '12:00'), end: t(D1, '13:30') },
  { id: 'd1-ow-2', day: D1, stage: 'owcup', title: 'Overwatch World Cup Quarterfinals 2', category: 'overwatch', start: t(D1, '13:30'), end: t(D1, '15:00') },
  { id: 'd1-ow-3', day: D1, stage: 'owcup', title: 'Overwatch World Cup Quarterfinals 3', category: 'overwatch', start: t(D1, '15:00'), end: t(D1, '16:30') },
  { id: 'd1-ow-4', day: D1, stage: 'owcup', title: 'Overwatch World Cup Quarterfinals 4', category: 'overwatch', start: t(D1, '16:30'), end: t(D1, '18:00') },
  { id: 'd1-ow-5', day: D1, stage: 'owcup', title: 'Overwatch: Art & Collaboration Deep Dive', category: 'overwatch', start: t(D1, '18:15'), end: t(D1, '19:00') },

  // ---- Day 1: World of Warcraft Stage ----
  { id: 'd1-wow-1', day: D1, stage: 'wow', title: "(Simulcast) World of Warcraft: What's Next", category: 'warcraft', start: t(D1, '12:00'), end: t(D1, '12:45') },
  { id: 'd1-wow-2', day: D1, stage: 'wow', title: 'MDI 2026 Grand Finals | Dignitas vs Big Lucky', category: 'warcraft', start: t(D1, '12:45'), end: t(D1, '14:00') },
  { id: 'd1-wow-3', day: D1, stage: 'wow', title: 'MDI 2026 Grand Finals | Liquid vs Mandatory', category: 'warcraft', start: t(D1, '14:00'), end: t(D1, '15:15') },
  { id: 'd1-wow-4', day: D1, stage: 'wow', title: 'World of Warcraft: Developer x Creator Showcase', category: 'warcraft', start: t(D1, '15:30'), end: t(D1, '17:30') },
  { id: 'd1-wow-5', day: D1, stage: 'wow', title: 'MDI 2026 Grand Finals | Championship Match', category: 'warcraft', start: t(D1, '17:30'), end: t(D1, '19:00') },

  // ---- Day 1: Hearthstone Stage ----
  { id: 'd1-hs-1', day: D1, stage: 'hearthstone', title: 'Hearthstone World Championship Quarterfinals', category: 'hearthstone', start: t(D1, '12:00'), end: t(D1, '13:30') },
  { id: 'd1-hs-2', day: D1, stage: 'hearthstone', title: 'Hearthstone World Championship Quarterfinals', category: 'hearthstone', start: t(D1, '13:30'), end: t(D1, '14:45') },
  { id: 'd1-hs-3', day: D1, stage: 'hearthstone', title: "Hearthstone: What's Next", category: 'hearthstone', start: t(D1, '15:00'), end: t(D1, '15:45') },
  { id: 'd1-hs-4', day: D1, stage: 'hearthstone', title: 'Hearthstone World Championship Quarterfinals', category: 'hearthstone', start: t(D1, '15:45'), end: t(D1, '17:00') },
  { id: 'd1-hs-5', day: D1, stage: 'hearthstone', title: 'Hearthstone World Championship Quarterfinals', category: 'hearthstone', start: t(D1, '17:00'), end: t(D1, '18:15') },
  { id: 'd1-hs-6', day: D1, stage: 'hearthstone', title: 'Drawstone: Murloc Draw Along', category: 'hearthstone', start: t(D1, '18:30'), end: t(D1, '19:00') },

  // ---- Day 1: Classic Cup Stage ----
  { id: 'd1-cc-1', day: D1, stage: 'classiccup', title: 'Classic Cup: Heroes of the Storm - Legacy Match', category: 'classic', start: t(D1, '12:00'), end: t(D1, '14:15') },
  { id: 'd1-cc-2', day: D1, stage: 'classiccup', title: 'Custodians of Legacy Games', category: 'classic', start: t(D1, '14:30'), end: t(D1, '15:15') },
  { id: 'd1-cc-3', day: D1, stage: 'classiccup', title: 'Classic Game Deep Dive', category: 'classic', start: t(D1, '15:30'), end: t(D1, '16:15') },
  { id: 'd1-cc-4', day: D1, stage: 'classiccup', title: 'Classic Cup: Warcraft III - Legacy Match', category: 'classic', start: t(D1, '16:30'), end: t(D1, '17:45') },
  { id: 'd1-cc-5', day: D1, stage: 'classiccup', title: 'Classic Cup: Warcraft III - Entertainment Match', category: 'classic', start: t(D1, '17:45'), end: t(D1, '18:45') },

  // ---- Day 1: Diablo Stage ----
  { id: 'd1-diablo-1', day: D1, stage: 'diablo', title: 'Immortal Event', category: 'diablo', start: t(D1, '12:00'), end: t(D1, '19:00') },

  // ================= DAY 2 =================

  // ---- Day 2: Main Stage ----
  { id: 'd2-main-1', day: D2, stage: 'main', title: 'World of Warcraft: Deep Dive', category: 'warcraft', start: t(D2, '10:00'), end: t(D2, '10:45') },
  { id: 'd2-main-2', day: D2, stage: 'main', title: 'Diablo: Developer Update', category: 'diablo', start: t(D2, '11:00'), end: t(D2, '11:45') },
  { id: 'd2-main-3', day: D2, stage: 'main', title: 'Questwatch: LIVE!!!', category: 'warcraft', start: t(D2, '12:00'), end: t(D2, '14:00') },
  { id: 'd2-main-4', day: D2, stage: 'main', title: 'World of Warcraft: Archives', category: 'warcraft', start: t(D2, '14:15'), end: t(D2, '15:00') },
  { id: 'd2-main-5', day: D2, stage: 'main', title: 'Voices of Blizzard', category: 'blizzard', start: t(D2, '15:15'), end: t(D2, '17:30') },
  { id: 'd2-main-6', day: D2, stage: 'main', title: 'Closing Remarks', category: 'blizzard', start: t(D2, '17:30'), end: t(D2, '17:45') },
  { id: 'd2-main-7', day: D2, stage: 'main', title: 'Live Performance: LE SSERAFIM', category: 'blizzard', start: t(D2, '18:00'), end: t(D2, '18:45'), inRoomOnly: true },

  // ---- Day 2: Legends Stage ----
  { id: 'd2-leg-1', day: D2, stage: 'legends', title: '30 Years of Battle.net with Special Guest CD Projekt Red', category: 'blizzard', start: t(D2, '09:30'), end: t(D2, '10:30') },
  { id: 'd2-leg-2', day: D2, stage: 'legends', title: 'World of Warcraft: Crafting Coziness & Creative Freedom', category: 'warcraft', start: t(D2, '10:45'), end: t(D2, '11:30') },
  { id: 'd2-leg-3', day: D2, stage: 'legends', title: 'World Building in World of Warcraft', category: 'warcraft', start: t(D2, '11:45'), end: t(D2, '12:30') },
  { id: 'd2-leg-4', day: D2, stage: 'legends', title: 'Villains of Blizzard', category: 'blizzard', start: t(D2, '12:45'), end: t(D2, '13:45') },
  { id: 'd2-leg-5', day: D2, stage: 'legends', title: 'Collaborative Storytelling in SFD', category: 'blizzard', start: t(D2, '14:00'), end: t(D2, '14:45') },
  { id: 'd2-leg-6', day: D2, stage: 'legends', title: 'Overwatch Dev Livestream: Live from BlizzCon!', category: 'overwatch', start: t(D2, '15:00'), end: t(D2, '15:45') },
  { id: 'd2-leg-7', day: D2, stage: 'legends', title: 'Localization: Bringing Blizzard Worlds Together', category: 'blizzard', start: t(D2, '16:00'), end: t(D2, '16:45') },

  // ---- Day 2: Overwatch World Cup Arena ----
  { id: 'd2-ow-1', day: D2, stage: 'owcup', title: 'Overwatch World Cup Semifinals 1', category: 'overwatch', start: t(D2, '09:00'), end: t(D2, '10:45') },
  { id: 'd2-ow-2', day: D2, stage: 'owcup', title: 'Overwatch World Cup Semifinals 2', category: 'overwatch', start: t(D2, '10:45'), end: t(D2, '12:15') },
  { id: 'd2-ow-3', day: D2, stage: 'owcup', title: 'Overwatch World Cup Halftime Show: YOASOBI', category: 'overwatch', start: t(D2, '12:15'), end: t(D2, '13:15'), inRoomOnly: true },
  { id: 'd2-ow-4', day: D2, stage: 'owcup', title: 'Overwatch World Cup Third-Place Match', category: 'overwatch', start: t(D2, '13:15'), end: t(D2, '14:45') },
  { id: 'd2-ow-5', day: D2, stage: 'owcup', title: 'Overwatch World Cup Finals', category: 'overwatch', start: t(D2, '14:45'), end: t(D2, '17:00') },

  // ---- Day 2: World of Warcraft Stage ----
  { id: 'd2-wow-1', day: D2, stage: 'wow', title: '(Simulcast) World of Warcraft: Deep Dive', category: 'warcraft', start: t(D2, '10:00'), end: t(D2, '10:45') },
  { id: 'd2-wow-2', day: D2, stage: 'wow', title: 'AWC 2026 Grand Finals | F Tier vs Guild Bean', category: 'warcraft', start: t(D2, '10:45'), end: t(D2, '12:00') },
  { id: 'd2-wow-3', day: D2, stage: 'wow', title: 'AWC 2026 Grand Finals | StreamerZone.gg vs One Lun Travel', category: 'warcraft', start: t(D2, '12:00'), end: t(D2, '13:00') },
  { id: 'd2-wow-4', day: D2, stage: 'wow', title: 'World of Warcraft: Art Design', category: 'warcraft', start: t(D2, '13:15'), end: t(D2, '14:00') },
  { id: 'd2-wow-5', day: D2, stage: 'wow', title: 'AWC 2026 Grand Finals | Echo vs TBD', category: 'warcraft', start: t(D2, '14:00'), end: t(D2, '15:00') },
  { id: 'd2-wow-6', day: D2, stage: 'wow', title: 'AWC 2026 Grand Finals | Gators Back vs TBD', category: 'warcraft', start: t(D2, '15:00'), end: t(D2, '16:00') },
  { id: 'd2-wow-7', day: D2, stage: 'wow', title: "World of Warcraft Hardcore: What's Next", category: 'warcraft', start: t(D2, '16:15'), end: t(D2, '17:00') },
  { id: 'd2-wow-8', day: D2, stage: 'wow', title: 'AWC 2026 Grand Finals | Championship Match', category: 'warcraft', start: t(D2, '17:00'), end: t(D2, '19:00') },

  // ---- Day 2: Hearthstone Stage ----
  { id: 'd2-hs-1', day: D2, stage: 'hearthstone', title: 'Hearthstone World Championship Semifinals', category: 'hearthstone', start: t(D2, '09:30'), end: t(D2, '11:30') },
  { id: 'd2-hs-2', day: D2, stage: 'hearthstone', title: 'Hearthstone World Championship Semifinals', category: 'hearthstone', start: t(D2, '11:30'), end: t(D2, '13:00') },
  { id: 'd2-hs-3', day: D2, stage: 'hearthstone', title: 'Hearthstone World Championship Finals', category: 'hearthstone', start: t(D2, '13:00'), end: t(D2, '15:00') },
  { id: 'd2-hs-4', day: D2, stage: 'hearthstone', title: 'Hearthstone: Battlegrounds Design', category: 'hearthstone', start: t(D2, '15:15'), end: t(D2, '16:00') },
  { id: 'd2-hs-5', day: D2, stage: 'hearthstone', title: 'Drawstone: Card Back Art Demo', category: 'hearthstone', start: t(D2, '16:15'), end: t(D2, '17:00') },

  // ---- Day 2: Classic Cup Stage ----
  { id: 'd2-cc-1', day: D2, stage: 'classiccup', title: 'RSL Revival: Season 6 Finals', category: 'classic', start: t(D2, '09:00'), end: t(D2, '11:30') },
  { id: 'd2-cc-2', day: D2, stage: 'classiccup', title: 'Classic Cup: StarCraft II - Legacy Match', category: 'classic', start: t(D2, '11:30'), end: t(D2, '13:15') },
  { id: 'd2-cc-3', day: D2, stage: 'classiccup', title: 'Classic Cup: StarCraft II - Entertainment Match', category: 'classic', start: t(D2, '13:15'), end: t(D2, '14:15') },
  { id: 'd2-cc-4', day: D2, stage: 'classiccup', title: 'Classic Cup: StarCraft Remastered - Entertainment Match', category: 'classic', start: t(D2, '14:15'), end: t(D2, '15:15') },
  { id: 'd2-cc-5', day: D2, stage: 'classiccup', title: 'Classic Cup: StarCraft Remastered - Legacy Match', category: 'classic', start: t(D2, '15:15'), end: t(D2, '17:00') },

  // ---- Day 2: Diablo Stage ----
  { id: 'd2-diablo-1', day: D2, stage: 'diablo', title: 'Diablo Immortal Live Artist Drawing with Special Guest', category: 'diablo', start: t(D2, '10:00'), end: t(D2, '11:00') },
  { id: 'd2-diablo-2', day: D2, stage: 'diablo', title: 'Immortal Event', category: 'diablo', start: t(D2, '11:00'), end: t(D2, '18:00') },
];
