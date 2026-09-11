// Vendor directory — generated from "LIBANGO Vendors Full List 2026" (2026-09-11).
// Regenerate from the master workbook when the directory changes; do not hand-edit rows.

export type VendorStatus = "Active" | "Inactive";

export interface Area {
  key: string;
  label: string;
  /** Shorter label used on the national map where space is tight. */
  mapLabel?: string;
  /** Location hint appended to Google Maps landmark searches. */
  hint: string;
  lat: number;
  lon: number;
  /** true = part of Greater Monrovia (shown on the metro detail panel). */
  metro: boolean;
}

export interface Vendor {
  name: string;
  area: string;
  landmark: string;
  phone: string;
  status: VendorStatus;
  isNew: boolean;
  /** Exact GPS coordinates, when captured. */
  lat?: number;
  lon?: number;
}

export const AREAS: Area[] = [
  {
    "key": "PAYNESVILLE",
    "label": "Paynesville",
    "hint": "Monrovia, Liberia",
    "lat": 6.27,
    "lon": -10.7,
    "metro": true
  },
  {
    "key": "CENTRAL TOWN",
    "label": "Central Monrovia",
    "hint": "Monrovia, Liberia",
    "lat": 6.328,
    "lon": -10.818,
    "metro": true
  },
  {
    "key": "SINKOR",
    "label": "Sinkor",
    "hint": "Monrovia, Liberia",
    "lat": 6.278,
    "lon": -10.786,
    "metro": true
  },
  {
    "key": "OLD ROAD / CONGO TOWN",
    "label": "Old Road / Congo Town",
    "hint": "Monrovia, Liberia",
    "lat": 6.308,
    "lon": -10.732,
    "metro": true
  },
  {
    "key": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
    "label": "Bushrod Island / Brewerville",
    "hint": "Monrovia, Liberia",
    "lat": 6.408,
    "lon": -10.796,
    "metro": true
  },
  {
    "key": "BARNESVILLE / SOMALIA DRIVE",
    "label": "Barnesville / Somalia Drive",
    "hint": "Monrovia, Liberia",
    "lat": 6.352,
    "lon": -10.726,
    "metro": true
  },
  {
    "key": "JOHNSONVILLE",
    "label": "Johnsonville",
    "hint": "Monrovia, Liberia",
    "lat": 6.372,
    "lon": -10.664,
    "metro": true
  },
  {
    "key": "KAKATA HIGHWAY / MARGIBI COUNTY",
    "label": "Kakata Highway / Margibi",
    "mapLabel": "Margibi",
    "hint": "Margibi County, Liberia",
    "lat": 6.515,
    "lon": -10.352,
    "metro": false
  },
  {
    "key": "BOMI / CAPE MOUNT COUNTY",
    "label": "Bomi / Cape Mount",
    "hint": "Liberia",
    "lat": 6.87,
    "lon": -10.82,
    "metro": false
  },
  {
    "key": "GRAND BASSA / RIVERCESS COUNTY",
    "label": "Grand Bassa / Rivercess",
    "hint": "Liberia",
    "lat": 5.9,
    "lon": -10.03,
    "metro": false
  }
];

export const AREA_BY_KEY: Record<string, Area> = Object.fromEntries(
  AREAS.map((a) => [a.key, a])
);

export const VENDORS: Vendor[] = [
 {
  "name": "Twin Brothers Business Center",
  "area": "PAYNESVILLE",
  "landmark": "Police Academy Junction",
  "phone": "+231776833583",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "God Fearing Business Center",
  "area": "PAYNESVILLE",
  "landmark": "Wood Camp",
  "phone": "+231777284850",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Twin Brothers Business Center 2",
  "area": "PAYNESVILLE",
  "landmark": "72nd Junction",
  "phone": "+231776833583",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Express Current Services",
  "area": "PAYNESVILLE",
  "landmark": "Duport Road Market",
  "phone": "+231887086762",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Best Trust Foreign Exchange Bureau",
  "area": "PAYNESVILLE",
  "landmark": "Rehab Junction",
  "phone": "+231778897000",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Family Effort Group Enterprise",
  "area": "PAYNESVILLE",
  "landmark": "Soul Clinic, Nigerian Shop",
  "phone": "+231770379906",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Family Effort Group Enterprise (Branch 2)",
  "area": "PAYNESVILLE",
  "landmark": "Soul Clinic Last Turning Point",
  "phone": "+231770379906",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Linda Vonleh Enterprise",
  "area": "PAYNESVILLE",
  "landmark": "FDA Junction",
  "phone": "+231886501360",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Flourish Foreign Exchange Bureau",
  "area": "PAYNESVILLE",
  "landmark": "Zayzay Community",
  "phone": "+231777418686",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Discount Shop 7",
  "area": "PAYNESVILLE",
  "landmark": "Du-Port Road Junction",
  "phone": "+231776833583",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "E&L Enterprise",
  "area": "PAYNESVILLE",
  "landmark": "Omega, Opposite Total Filling Station",
  "phone": "+231886406702",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "C@ Obey Logistics",
  "area": "PAYNESVILLE",
  "landmark": "Zubah Town Interception, Paynesville",
  "phone": "+231886213713",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Discount Shop 2",
  "area": "PAYNESVILLE",
  "landmark": "Guest House Road, Thinkers Village, RIA Road",
  "phone": "+231776833583",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "St. Albert Forex Bureau",
  "area": "PAYNESVILLE",
  "landmark": "ELWA Junction, Adjacent Jahmale Medical Solutions",
  "phone": "+231777512423",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Isaac Garnett Enterprise",
  "area": "PAYNESVILLE",
  "landmark": "DuPort Road, Jackson Shop",
  "phone": "+231777290186",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Saliou Provision Shop",
  "area": "PAYNESVILLE",
  "landmark": "Neklen Town",
  "phone": "+231886591113",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Family Effort Group of Enterprise 5",
  "area": "PAYNESVILLE",
  "landmark": "Pipe Line",
  "phone": "+231770379906",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Discount Shop 3",
  "area": "PAYNESVILLE",
  "landmark": "Cement Road, Thinker Village",
  "phone": "+231776833583",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Twin Brothers Business Center 3",
  "area": "PAYNESVILLE",
  "landmark": "Jacob Town, St. Francis Junction",
  "phone": "+231776833583",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Discount Shop 4",
  "area": "PAYNESVILLE",
  "landmark": "Smyth Junction, Baptist Seminary Community",
  "phone": "+231776833583",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Twin Brothers Business Center 4",
  "area": "PAYNESVILLE",
  "landmark": "Smyth Community Last Turning Point",
  "phone": "+231776833583",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Richie Ventures",
  "area": "PAYNESVILLE",
  "landmark": "GSA Road, After the First Speed Breaker",
  "phone": "+231778335152",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Blossom Enterprises Inc.",
  "area": "PAYNESVILLE",
  "landmark": "GSA Road, Zianna Hill",
  "phone": "+231886837754",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "E&L Enterprise 2",
  "area": "PAYNESVILLE",
  "landmark": "Coca Cola Factory",
  "phone": "+231886406702",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Sonnie & Sons Enterprise 4",
  "area": "PAYNESVILLE",
  "landmark": "Telecom Community, Bernard Farm",
  "phone": "+231770594450",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "ALLB Business Center",
  "area": "PAYNESVILLE",
  "landmark": "Novrlin Town, Omega Community",
  "phone": "+231776489987",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Top Star Money Remittance",
  "area": "PAYNESVILLE",
  "landmark": "Ma-Kebeh Gas Station, Redlight",
  "phone": "+231775758600",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Mava Liberia",
  "area": "PAYNESVILLE",
  "landmark": "SKD Boulevard & Police Academy Interception",
  "phone": "+231770996682",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Services Unlimited Liberia Inc. (SUL Inc.)",
  "area": "PAYNESVILLE",
  "landmark": "Thinker's Village, Paynesville",
  "phone": "0775705732 / 0888288036",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Lifeline Credit Arce, Inc.",
  "area": "PAYNESVILLE",
  "landmark": "Cement Hill Junction, ELWA",
  "phone": "+231775175017",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Joetta Jojo Enterprise",
  "area": "PAYNESVILLE",
  "landmark": "Opposite ELWA Hospital Entrance, Paynesville",
  "phone": "+231770974505",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Niematallah Enterprise",
  "area": "PAYNESVILLE",
  "landmark": "Gobachop Road, Goat Field Junction, Redlight",
  "phone": "+231775177902",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "First Forex Bureau 2",
  "area": "PAYNESVILLE",
  "landmark": "Petro Trade Filling Station, S.D Cooper Road",
  "phone": "+231777563863",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Monica Business Center",
  "area": "PAYNESVILLE",
  "landmark": "GSA Road",
  "phone": "+231770117723",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Favour Marketing Inc. (Branch 3)",
  "area": "PAYNESVILLE",
  "landmark": "ELWA Junction",
  "phone": "+231886580719",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Favour Marketing Inc. (Branch 2)",
  "area": "PAYNESVILLE",
  "landmark": "ELWA Hospital Junction",
  "phone": "+231886580719",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Yala-Kpon-Ma Incorporated 1 (Branch 2)",
  "area": "PAYNESVILLE",
  "landmark": "FDA Office Junction",
  "phone": "+231770192657",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Express Current Services (Branch 2)",
  "area": "PAYNESVILLE",
  "landmark": "LEC Office, Baptist Field, Duport Road",
  "phone": "+231887086762",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "K-Connect Business Center",
  "area": "PAYNESVILLE",
  "landmark": "Directly Behind the Coca-Cola Factory Fence",
  "phone": "+231886559396",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Mama Judy's Blessings Business Center",
  "area": "PAYNESVILLE",
  "landmark": "Best Brains School Junction, Tinker Village",
  "phone": "+231778761025",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Sky Quality Provision Center",
  "area": "PAYNESVILLE",
  "landmark": "Jacob Town Rehab, Garvley Town",
  "phone": "+231770273419",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Richie Ventures 2",
  "area": "PAYNESVILLE",
  "landmark": "GSA, Rehab Road Adjacent the Former Speaker Resident",
  "phone": "+231760473373",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Saksouk Shopping Center Branch 2",
  "area": "PAYNESVILLE",
  "landmark": "Menitama Junction, RIA Highway",
  "phone": "+231555390000",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Yala-Kpon-Ma Incorporated 2",
  "area": "PAYNESVILLE",
  "landmark": "Moses Blah, Soul Clinic",
  "phone": "+231776361572",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Yala-Kpon-Ma Incorporated 3",
  "area": "PAYNESVILLE",
  "landmark": "Zubah Town Taxi Turning Point, Paynesville",
  "phone": "+231776682676",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Chadel",
  "area": "CENTRAL TOWN",
  "landmark": "Broad & Johnson Street",
  "phone": "+231770665783",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "C&S Business Center",
  "area": "CENTRAL TOWN",
  "landmark": "Front Street",
  "phone": "+231770517038",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "General Data Engineer Service",
  "area": "CENTRAL TOWN",
  "landmark": "McDonald Street",
  "phone": "+231777072737",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "African Forex Bureau",
  "area": "CENTRAL TOWN",
  "landmark": "Ashmun & Mechlin Street",
  "phone": "+231777010490",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Flocees Restaurant",
  "area": "CENTRAL TOWN",
  "landmark": "Down Mechlin Street",
  "phone": "+231777513824",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Bility Foreign Bureau",
  "area": "CENTRAL TOWN",
  "landmark": "Newport Street, Adjacent the Mosque",
  "phone": "+231776636459",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Aubrey Business Center Branch Two",
  "area": "CENTRAL TOWN",
  "landmark": "Capital Bypass, Adjacent the Tecno Building",
  "phone": "+231777072737",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Sao Boso Used Clothing Center",
  "area": "CENTRAL TOWN",
  "landmark": "Water Street, Harbel Parking",
  "phone": "+231777779030",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Joint Internet Café 2",
  "area": "CENTRAL TOWN",
  "landmark": "Down Mechlin Street",
  "phone": "+231886580038",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "TK Enterprise",
  "area": "CENTRAL TOWN",
  "landmark": "Rallay Town Market",
  "phone": "+231775741319",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Sao Boso Used Clothing",
  "area": "CENTRAL TOWN",
  "landmark": "Water Side",
  "phone": "+231775741319",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Express Business Center 2",
  "area": "CENTRAL TOWN",
  "landmark": "Broad & Center Street",
  "phone": "+231888616562",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "AICHA B. FLOMO Business Center",
  "area": "CENTRAL TOWN",
  "landmark": "Slipway Community",
  "phone": "+231770067495",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "David's Business Center 2",
  "area": "CENTRAL TOWN",
  "landmark": "Benson and Randall Street",
  "phone": "+231775794689",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Charif Pharmacy",
  "area": "CENTRAL TOWN",
  "landmark": "Randall Street",
  "phone": "+231886519999",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Saksouk Supermarket",
  "area": "CENTRAL TOWN",
  "landmark": "Benson and Newport Street",
  "phone": "+231555390000",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "SEMAS Inc 3",
  "area": "CENTRAL TOWN",
  "landmark": "LEC Head-Office, Waterside",
  "phone": "+231775019740",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Darcon Investment",
  "area": "SINKOR",
  "landmark": "6th Street Sinkor",
  "phone": "+231777408981",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Sharks Entertainment Inc.",
  "area": "SINKOR",
  "landmark": "Airfield Sinkor",
  "phone": "+231777614459",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Family Trading Center",
  "area": "SINKOR",
  "landmark": "New Matadi, Fanti Town",
  "phone": "+231770629944",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "SEMAS Inc",
  "area": "SINKOR",
  "landmark": "20th Street",
  "phone": "+231775019740",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "SMK Groups of Enterprise",
  "area": "SINKOR",
  "landmark": "Fiamah",
  "phone": "+231775976005",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Five 17 Foreign Bureau",
  "area": "SINKOR",
  "landmark": "Old and New Matadi Interception",
  "phone": "+231886910517",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "DARCON 2",
  "area": "SINKOR",
  "landmark": "12th Street Sinkor",
  "phone": "+231777525192",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "SEMAS Inc 2",
  "area": "SINKOR",
  "landmark": "14th Street Sinkor",
  "phone": "+231775019740",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Wilson Darius Business Center",
  "area": "SINKOR",
  "landmark": "Saye Town",
  "phone": "+231776010465",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "First Forex Bureau",
  "area": "SINKOR",
  "landmark": "9th Street Sinkor",
  "phone": "+231777563863",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Kes Enterprise 2",
  "area": "SINKOR",
  "landmark": "Vamoma House, Tubman Boulevard",
  "phone": "+231777299199",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Mega Mart Inc.",
  "area": "SINKOR",
  "landmark": "19th Street, Sinkor",
  "phone": "+231888112233",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Favour Marketing Inc. (Branch 1)",
  "area": "SINKOR",
  "landmark": "24th Street Sinkor",
  "phone": "+231886580719",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "God Is Real Forex Bureau",
  "area": "SINKOR",
  "landmark": "11th Street Sinkor",
  "phone": "+231777521632",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "All Bright Inc.",
  "area": "SINKOR",
  "landmark": "I-Cafe Building, 11th Street, Sinkor",
  "phone": "+231886748000",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Easy Cash Forex Bureau",
  "area": "SINKOR",
  "landmark": "17th Street, Sinkor",
  "phone": "+231777181459",
  "status": "Active",
  "isNew": true
 },
 {
  "name": "Sonnie & Sons Enterprise",
  "area": "OLD ROAD / CONGO TOWN",
  "landmark": "Old Road, Keyhole Junction",
  "phone": "+231770594450",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Sonnie & Sons Enterprise 2",
  "area": "OLD ROAD / CONGO TOWN",
  "landmark": "540, Adjacent the Kalando Plaza",
  "phone": "+231777299199",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Coco Mini Mart",
  "area": "OLD ROAD / CONGO TOWN",
  "landmark": "Old Road, VP Road",
  "phone": "+231886572527",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Dancing Man Enterprise",
  "area": "OLD ROAD / CONGO TOWN",
  "landmark": "SKD Boulevard Junction",
  "phone": "+231770181579",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "The Same Mother Yah Forex Bureau",
  "area": "OLD ROAD / CONGO TOWN",
  "landmark": "Car Wash, Old Road",
  "phone": "+231777552812",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Versha Enterprise",
  "area": "OLD ROAD / CONGO TOWN",
  "landmark": "Kalondo Guest House, Old Road",
  "phone": "+231770915874",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Kes Enterprise",
  "area": "OLD ROAD / CONGO TOWN",
  "landmark": "Peace Island",
  "phone": "+231777299199",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Sonnie & Sons Enterprise 3",
  "area": "OLD ROAD / CONGO TOWN",
  "landmark": "Catholic Junction",
  "phone": "+231770594450",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Sky Business and Technology Solutions",
  "area": "OLD ROAD / CONGO TOWN",
  "landmark": "Smyth Road, Old Road Community",
  "phone": "+231770467609",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Cisse's Business Center",
  "area": "OLD ROAD / CONGO TOWN",
  "landmark": "Behind Health Ministry, Congo Town Back Road",
  "phone": "+231776401069",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Capricorn 12 Enterprise Inc.",
  "area": "OLD ROAD / CONGO TOWN",
  "landmark": "R C Lawson School, Congo Town",
  "phone": "+231772496830",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Taizue Royal Trading Inc.",
  "area": "OLD ROAD / CONGO TOWN",
  "landmark": "Colony Hotel, Oldest Congo Town",
  "phone": "+231770042768",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "R Capital Inc",
  "area": "OLD ROAD / CONGO TOWN",
  "landmark": "Tarr Town, Old Road",
  "phone": "+231770183583",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Express Business Center",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Logan Town Junction",
  "phone": "+231770451986",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Sly Business Center",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Point 4 Junction",
  "phone": "+231888884832",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Victory Medicine Store (Branch 1)",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Caldwell, Dixville Junction",
  "phone": "+231777581356",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Victory Medicine Store (Branch 2)",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Caldwell, Sand Beach Junction",
  "phone": "+231775212489",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "JAS Enterprise",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Banjor Junction, Hotel Africa Road",
  "phone": "+231777010490",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Abubakarr Business Center",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "St. Paul Bridge",
  "phone": "+231779887232",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "David's Business Center",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Caldwell Riverview Community",
  "phone": "+231775794689",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Family Crop",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Banjor Community",
  "phone": "+231776034170",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Keno Business Center",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Dixville",
  "phone": "+231777556226",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "EZ Current Liberia",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Brewerville Iron Gate",
  "phone": "+231776390882",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Edgerxie",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Caldwell New Georgia Community",
  "phone": "+231777665124",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Aubrey Business Center 4",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Vai Town",
  "phone": "+231777072737",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Abubakarr Business Center 2",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Banjor",
  "phone": "+231779887232",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Abubakarr Business Center 3",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Iron Gate",
  "phone": "+231779887232",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Hand to Hand Foreign Exchange Bureau",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Clara Town, Opposite UMARO",
  "phone": "+231778539343",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Shelton's Pharmacy",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Louisiana, Fofee Town",
  "phone": "+231886350636",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "J. Daddy Business Center",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Redhill Field",
  "phone": "+231776384656",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Power-Wave Enterprise Inc.",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "VOA Junction",
  "phone": "+231776737341",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Smart Exchange",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "LPRC Junction, Gardnerville",
  "phone": "+231776511780",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Darcon Investment 3",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "NASSCORP Village, Brewerville",
  "phone": "+231777525192",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "FASS Inc.",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Brewerville",
  "phone": "+231776666444",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Dawalee Garrison Business Center",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Brewerville, After St. Paul Bridge",
  "phone": "+231775286120",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Ephraim Sister Foreign Exchange Bureau",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Parker Corner Junction, Brewerville City",
  "phone": "+231886542645",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Twin Brother Business Center 5",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "VOA, Baby Ma Junction, Brewerville",
  "phone": "+231776833583",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Louisiana Forex Bureau",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Louisiana Market",
  "phone": "+231880854555",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Pay and Take Business Center",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Caldwell New Georgia Junction",
  "phone": "+231888196433",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "2Net's Group of Companies",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "NASSCORP Village, Brewerville",
  "phone": "+231777718870",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Stanley Services",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Caldwell, Lajor",
  "phone": "+231777095911",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Sekou Amara Kenneh Business Center",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Banjor Turning Point, Brewerville",
  "phone": "+231776042161",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Lee Lee Enterprise",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Opposite Wawusu, Brewerville",
  "phone": "+231777574812",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Moses Financial Service",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Mango Town Entrance, Brewerville",
  "phone": "+231777110338",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "S.B Business Center",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Banjor Turning Point",
  "phone": "+231770206016",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Across the Road Minimart",
  "area": "BUSHROD ISLAND / BREWERVILLE / CALDWELL / DIXVILLE",
  "landmark": "Opposite LEC Bushrod Island Office",
  "phone": "+231770214205",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Finishing Spot Business Center 1",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "Barnesville Estate",
  "phone": "+231777153154",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Finishing Spot Business Center 2",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "Barnesville Junction",
  "phone": "+231776619551",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Finishing Spot Business Center 3",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "Kebah",
  "phone": "+231777153154",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Ayoba Business Center",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "Gardnerville, Tusa Field",
  "phone": "+231777943636",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Christina Bedell Enterprise",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "New Georgia Estate",
  "phone": "+231777076616",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Aubrey Business Center",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "New Georgia Junction",
  "phone": "+231777072737",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Xandra Enterprise",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "Behind Kebbah Public School",
  "phone": "+231886167303",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Ayouba Business Center 2",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "Jag Early Learning School Community, Johnsonville",
  "phone": "+231777943636",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Aubrey Business Center 3",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "Topoe Village",
  "phone": "+231777072737",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "SNR Group Limited",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "Steven Tolbert Estate",
  "phone": "+231777072737",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Roberts Security Guard Services",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "New Georgia Estate",
  "phone": "+231777866644",
  "status": "Inactive",
  "isNew": false
 },
 {
  "name": "M. Mulibah V. Yarmah Business Center",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "Varfee Yard, Block A, Peace Island, Paynesville",
  "phone": "+231888333333",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Sekou A Kanneh Enterprise (Conex)",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "Conex New Georgia Junction",
  "phone": "+231776042161",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "OPD Bashir Investment Group Inc.",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "Dry Rice Market Junction",
  "phone": "+231778885050",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Dahn Seahn Jr. Business Center",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "Borbor Island, Stephen Tolbert Estate",
  "phone": "+231779885970",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "A Jordan J Business Center",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "Barnesville New Supermarket",
  "phone": "+231776908057",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Keno Business Center 2",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "Chicken Soup Factory Junction",
  "phone": "+231777556226",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Lamine Y Business Center",
  "area": "BARNESVILLE / SOMALIA DRIVE",
  "landmark": "Jamaica Road, Opposite Israel United in Christ",
  "phone": "+231886761386",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Wuosa Family Business",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Mount Barclay",
  "phone": "+231775271455",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Flourish Business Center",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Joezohn Road, Lower Careysburg",
  "phone": "+231777418686",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Family Effort Group of Enterprise 2",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Kakata",
  "phone": "+231770379906",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "God Fearing Business Center",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Weala",
  "phone": "+231777284850",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Family Effort Group of Enterprise 3",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Kakata",
  "phone": "+231770379906",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Faby Group of Companies",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "R2 Junction",
  "phone": "+231886558074",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "New Horizon Incorporated",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Duazon Market",
  "phone": "+231770465932",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "The Rebooth Movement Inc",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Marshall Road",
  "phone": "+231777831433",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Bates Market",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Tower Hill",
  "phone": "+231775589021",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Favour Marketing Inc.",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Harbel, Smell No Taste",
  "phone": "+231886580719",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "WACOA",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Marshall, After Clair Weah Foundation",
  "phone": "+231886581506",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "No Voking Group of Companies",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Fendell",
  "phone": "+231886598815",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "OMB Remittance Services",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Mount Barclay",
  "phone": "0775341274 / 0775071133",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Classic Ventures Incorporated",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Unification City (Smell No Taste), Margibi County",
  "phone": "+231775741939",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Charles Kerkula God First Business Center",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Owens Growth, Harbel",
  "phone": "+231770740876",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "God Fearing Business Center 4",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Bob Nacked Junction",
  "phone": "+231777284850",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Luke's Vendor Enterprise",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Careysburg General Market",
  "phone": "+231777919180",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "The Reboth Movement Enterprise Inc. 2",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Marshall Road",
  "phone": "+231777831433",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Togar Management Center",
  "area": "KAKATA HIGHWAY / MARGIBI COUNTY",
  "landmark": "Duazon, Beverly Hill Community",
  "phone": "+231776789226",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Modern Electrification Inc.",
  "area": "BOMI / CAPE MOUNT COUNTY",
  "landmark": "Gbah Market, Bomi County",
  "phone": "+231880671313",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Glory Be to God Yahweh",
  "area": "BOMI / CAPE MOUNT COUNTY",
  "landmark": "Robertsport, Grand Cape Mount",
  "phone": "+231775710742",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "S.M Bah Liberia Incorporated",
  "area": "BOMI / CAPE MOUNT COUNTY",
  "landmark": "Tubmanburg City, Bomi County",
  "phone": "+231777695151",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Reginald Logan Business",
  "area": "BOMI / CAPE MOUNT COUNTY",
  "landmark": "Gbah Market, Bomi County",
  "phone": "+231886541264",
  "status": "Inactive",
  "isNew": false
 },
 {
  "name": "Tenneh Kamara Business Center",
  "area": "BOMI / CAPE MOUNT COUNTY",
  "landmark": "Senjeh, Grand Cape Mount County",
  "phone": "+231779422372",
  "status": "Inactive",
  "isNew": false
 },
 {
  "name": "Abu Mansaray Auto Parts Center",
  "area": "BOMI / CAPE MOUNT COUNTY",
  "landmark": "Tienii, Grand Cape Mount County",
  "phone": "+231772968574",
  "status": "Inactive",
  "isNew": false
 },
 {
  "name": "Yala-Kpon-Ma Incorporated",
  "area": "JOHNSONVILLE",
  "landmark": "Johnsonville Kpelleh Town",
  "phone": "+231770192657",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "God Fearing Business Center",
  "area": "JOHNSONVILLE",
  "landmark": "Johnsonville Road",
  "phone": "+231777284850",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Glory Be to God Yahweh 2",
  "area": "JOHNSONVILLE",
  "landmark": "Johnsonville Turning Point",
  "phone": "+231777526049",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Equila Business Center",
  "area": "JOHNSONVILLE",
  "landmark": "Kru Hill Community, Johnsonville",
  "phone": "+231777121323",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Twin Brother Business Center 5",
  "area": "JOHNSONVILLE",
  "landmark": "Pepper Wule Market, Johnsonville",
  "phone": "+231776833583",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Wologissi Mt",
  "area": "GRAND BASSA / RIVERCESS COUNTY",
  "landmark": "Compound #3, Wayzon City",
  "phone": "+231776094818",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Da-Favor Business Inc",
  "area": "GRAND BASSA / RIVERCESS COUNTY",
  "landmark": "Compound #3, Main Street, Wayzon City",
  "phone": "+231776150858",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Kar Kollor Business Center",
  "area": "GRAND BASSA / RIVERCESS COUNTY",
  "landmark": "Yarpa Town, Rivercess County",
  "phone": "+231770649004",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Good Rate Group of Business Inc",
  "area": "GRAND BASSA / RIVERCESS COUNTY",
  "landmark": "Cestos City, Rivercess County",
  "phone": "+231778741837",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "Sufficient Grace Business Center",
  "area": "GRAND BASSA / RIVERCESS COUNTY",
  "landmark": "Compound #3, Wayzon City",
  "phone": "+231776888441",
  "status": "Active",
  "isNew": false
 },
 {
  "name": "God is in Control Business Center",
  "area": "GRAND BASSA / RIVERCESS COUNTY",
  "landmark": "Watco Camp Community, Buchanan",
  "phone": "+231761620714",
  "status": "Active",
  "isNew": true
 },
 {
  "name": "Our Own Thing Business Center",
  "area": "GRAND BASSA / RIVERCESS COUNTY",
  "landmark": "God Bless You Hill, Buchanan",
  "phone": "+231777016745",
  "status": "Active",
  "isNew": true
 },
 {
  "name": "Jacob Business Center",
  "area": "GRAND BASSA / RIVERCESS COUNTY",
  "landmark": "Monrovia Junction, Buchanan",
  "phone": "+231777153390",
  "status": "Active",
  "isNew": true
 },
 {
  "name": "Buchanan Group of Companies",
  "area": "GRAND BASSA / RIVERCESS COUNTY",
  "landmark": "Buchanan, Grand Bassa County",
  "phone": "",
  "status": "Active",
  "isNew": false,
  "lat": 5.9034808,
  "lon": -10.0107324
 }
];

export interface Partner {
  name: string;
  group: "Telcos" | "Banks" | "Payment & top-up apps";
}

export const PARTNERS: Partner[] = [
  { name: "MTN Mobile Money", group: "Telcos" },
  { name: "Orange Money", group: "Telcos" },
  { name: "EcoBank", group: "Banks" },
  { name: "UBA", group: "Banks" },
  { name: "SIB Bank", group: "Banks" },
  { name: "GT Bank", group: "Banks" },
  { name: "TIPME", group: "Payment & top-up apps" },
  { name: "KOLA Financial", group: "Payment & top-up apps" },
  { name: "SOCHITEL", group: "Payment & top-up apps" },
];

export const CONTACTS = {
  hq: "Newport Street & U.N. Drive, Monrovia, Liberia",
  customerService: "+231 778 020 947",
  vendorSupport: "+231 775 505 115",
};
