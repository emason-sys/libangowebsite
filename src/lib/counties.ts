// All 15 Liberian counties with the cities offered on the vendor application form.
// The city dropdown is populated dynamically from the selected county.

export const COUNTIES: Record<string, string[]> = {
  Bomi: ["Tubmanburg", "Klay", "Senjeh"],
  Bong: ["Gbarnga", "Totota", "Suakoko", "Salala"],
  Gbarpolu: ["Bopolu", "Gbarma"],
  "Grand Bassa": ["Buchanan", "Edina", "Compound #3"],
  "Grand Cape Mount": ["Robertsport", "Sinje", "Madina"],
  "Grand Gedeh": ["Zwedru", "Toe Town"],
  "Grand Kru": ["Barclayville", "Sasstown"],
  Lofa: ["Voinjama", "Foya", "Zorzor", "Kolahun"],
  Margibi: ["Kakata", "Harbel", "Unification Town", "Weala"],
  Maryland: ["Harper", "Pleebo"],
  Montserrado: ["Monrovia", "Paynesville", "Brewerville", "Bensonville", "Careysburg"],
  Nimba: ["Ganta", "Sanniquellie", "Saclepea", "Tappita", "Yekepa"],
  "River Cess": ["Cestos City"],
  "River Gee": ["Fish Town"],
  Sinoe: ["Greenville"],
};

export const COUNTY_NAMES = Object.keys(COUNTIES);
