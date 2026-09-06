// ---------------------------------------------------------------------------
// Masum Billah — portfolio content model
// All entries below are drawn from the journalist's own public record:
// his story portfolio (sites.google.com/view/billah1/stories), author pages at
// The Business Standard, Al Jazeera, The Guardian, Nikkei Asia, SCMP, Mongabay,
// Just-Style, Vice, The Diplomat, and the Earth Journalism Network profile.
// Edit this file and re-run `node src/build.mjs` to regenerate the site.
// ---------------------------------------------------------------------------

export const site = {
  name: "Masum Billah",
  role: "Journalist",
  location: "Dhaka, Bangladesh",
  title: "Reporter, The Daily Waadaa",
  tagline:
    "Award winning journalist specialized in investigative and long-form reporting.",
  // Bio (literary register; he read English before he read the news).
  bio: [
    "I report from Dhaka, where a morning can hold the country's largest griefs and its smallest, most stubborn ones at once. For a decade I have followed the people the headlines tend to walk past: the worker sold across a border, the family still counting who came home, a coastline losing its long argument with the sea.",
    "My reporting on migration, climate, and power has run in The Guardian, Al Jazeera English, Nikkei Asia and, for years, The Business Standard; I now file for The Daily Waadaa and as Bangladesh correspondent for International News Services. “Sold in Cambodia,” an investigation into how Bangladeshis are lured into slavery, was named by the Global Investigative Journalism Network among the country's best of 2022 and carried the 8th BRAC Migration Media Award.",
    "I came to journalism by way of literature, an English degree that taught me a sentence can also be a kind of evidence. When the deadlines loosen their grip I walk uphill, toward the higher trails of the Himalaya, a camera and a slower way of looking. And I am father to a small boy who is, so far, my most exacting editor: the one story I will never file, and the only one I am helplessly glad to be living.",
  ],
  contact: {
    email: "masum.engru@gmail.com",
    twitter: { handle: "@BillahTalks", url: "https://twitter.com/BillahTalks" },
    linkedin: { label: "LinkedIn", url: "https://www.linkedin.com/in/masum-billah-journalist/" },
    youtube: { label: "A Journalist Who Travels", url: "https://www.youtube.com/@AJournalistWhoTravels" },
    tbs: { label: "The Business Standard", url: "https://www.tbsnews.net/author/masum-billah" },
  },
};

// The masthead of outlets that have run his work (with self-hosted logo marks).
export const outlets = [
  { name: "Energy Institute", short: "Energy Inst.", logo: "energyinst.png" },
  { name: "The Daily Waadaa", short: "Daily Waadaa", logo: "dailywaadaa.png" },
  { name: "The Guardian", logo: "guardian.svg" },
  { name: "Al Jazeera English", short: "Al Jazeera", logo: "aljazeera.svg" },
  { name: "Nikkei Asia", logo: "nikkei.svg" },
  { name: "South China Morning Post", short: "SCMP", logo: "scmp.svg" },
  { name: "The Business Standard", logo: "tbs.svg" },
  { name: "The Diplomat", logo: "diplomat.svg" },
  { name: "Mongabay", logo: "mongabay.svg" },
  { name: "VICE", logo: "vice.svg" },
  { name: "Devex", logo: "devex.png" },
  { name: "Just-Style", logo: "juststyle.png" },
];

export const publications = outlets.map((o) => o.name);

// Beats. `name` labels the strip/tags, `full` titles the beat page, `kw` drives
// the keyword classifier that files every scraped article into a beat.
export const beats = [
  {
    id: "migration",
    name: "Migration",
    full: "Migration & Trafficking",
    blurb:
      "Following Bangladeshi workers along the routes that promise a wage abroad and too often deliver bondage, from Cambodia to Russia to the scam compounds of Myanmar.",
    kw: ["migrant", "migrat", "trafficke", "trafficking", "cambodia", "malaysia", "saudi", "qatar", "gulf", "remittance", "expatriate", "smuggl", "slavery", "recruit", "deport", "italy fever", "diaspora", "overseas", "kafala", "returnee", "manpower", "visa trade", "kuwait", "oman", "uae ", "dubai", "libya", "lebanon", "jordan", "housemaid", "domestic worker", "foreign employment", "labour migration", "labor migration", "irregular migration", "human smuggling", "bmet"],
  },
  {
    id: "climate",
    name: "Climate",
    full: "Climate & Environment",
    blurb:
      "A delta under pressure: salinity creeping inland, rivers poisoned, wildlife cornered, brick kilns and the science of a changing monsoon.",
    kw: ["climate", "flood", "cyclone", "salin", "environment", "river", "wildlife", "snake", "viper", "nilgai", "hyacinth", "pollution", "biodiversity", "drought", "monsoon", "coastal", "sundarban", "elephant", "dolphin", "aquaculture", "wind power", "solar", "renewable", "carbon", "emission", "cop30", "cop29", "cop28", "tiger", "forest", "nature", "ecosystem", "plastic", "groundwater", "arsenic", "char", "haor", "delta", "heat", "waste", "conservation", "bird", "brick kiln", "polythene", "rice", "paddy", "agricultur", "farm", "jute", "marine", "oyster", "st martin", "padma", "turag", "ilish", "fishing", "gas crisis", "lng", "seaweed"],
  },
  {
    id: "health",
    name: "Health",
    full: "Health & Medicine",
    blurb:
      "Bangladesh's health frontlines: hospitals and doctors under strain, the pharma trade, dengue and Nipah, and the long shadow of the pandemic.",
    kw: ["health", "hospital", "doctor", "patient", "medic", "medicine", "pharma", "drug pric", "dengue", "nipah", "covid", "coronavirus", "pandemic", "vaccine", "disease", "epidemic", "herd immunity", " who ", "mental health", "nutrition", "cancer", "diabetes", "malaria", "antibiotic", "healthcare", "clinic", "surgery", "cure", "outbreak", "quarantine", "lockdown", "sanitation", "mosquito"],
  },
  {
    id: "rights",
    name: "Human Rights",
    full: "Rights, Gender & the Marginalised",
    blurb:
      "Who the system protects and who it forgets: women's safety and freedom, press freedom, labour and human rights, minorities, and the people pushed to the edges.",
    kw: ["human rights", "women", "woman ", "gender", "girl", "harassment", "domestic violence", "violence against", "rape", "child marriage", "child labour", "child labor", "dowry", "acid attack", "lgbt", "queer", "transgender", "disab", "minorit", "caste", "untouchable", "doms", "dom ", "press freedom", "freedom of expression", "free thought", "journalis", "torture", "custodial", "enforced disappear", "aynaghor", "police brutality", "extrajudicial", "impunity", "shipbreak", "discrimination", "sexual", "widow", "marginal", "hijra"],
  },
  {
    id: "geopolitics",
    name: "Geopolitics",
    full: "Geopolitics & Diplomacy",
    blurb:
      "Bangladesh between giants and the wider world: the Bay of Bengal, the China-India balance, Rohingya, Gaza, and the diplomacy that shapes a nation's room to move.",
    kw: ["china", "india", "geopolit", "diplomacy", "bay of bengal", "foreign", "iran", "teesta", "rohingya", "myanmar", "sanction", "belt and road", "quad", "indo-pacific", "delhi", "beijing", "washington", "treaty", "bilateral", "ambassador", "summit", "pakistan", "border", "relations", "corridor", "israel", "ukraine", "gaza", "hamas", "palestin", "taiwan", "pelosi", "taliban", "imran khan", "modi", "amit shah", "unga", "apartheid", "middle east", "nepal", "thailand", "xenophob", "spycraft", "mercenar", "wagner"],
  },
  {
    id: "politics",
    name: "Politics",
    full: "Politics & Power",
    blurb:
      "Reporting a country remade: the July uprising, the fall of Sheikh Hasina, the disappeared, and an election held after seventeen years.",
    kw: ["election", "awami", "bnp", "jamaat", "hasina", "parliament", "protest", "quota", "uprising", "disappeared", "referendum", "constitution", "july charter", "ncp", "interim government", "tarique", "yunus", "cabinet", "poll", "campaign", "rally", "sedition", "tribunal", "verdict", "coup", "student-led", "voter", "ballot", "politic", "government", "party", "july", "martyr", "evm", "curfew"],
  },
  {
    id: "tech",
    name: "Tech & Digital",
    full: "Tech & the Digital Economy",
    blurb:
      "The country going online: platform work and the influencer economy, cyber-scams and surveillance, AI, and a digital public square that can make or break a reputation overnight.",
    kw: ["digital", "internet", "online", "influencer", "creator economy", "youtube", "facebook", "tiktok", "social media", "startup", "e-commerce", "ecommerce", "fintech", "artificial intelligence", " ai ", "cyber", "gig ", "gig economy", "ride-sharing", "ride sharing", "pathao", "freelanc", "outsourc", "smartphone", "mobile phone", "gaming", "gamers", " app ", " apps", "software", "surveillance", "deepfake", "misinformation", "screen time", "broadband", "tech ", "meta", "data leak", "personal data", "google", "content creation", "content creator", "fm radio", "fact-check", "btrc", "food delivery", "street view"],
  },
  {
    id: "urban",
    name: "City Life",
    full: "Cities, Urban Life & Mobility",
    blurb:
      "Life in the megacity: traffic and the metro, flyovers and water, liveability, heat and the everyday machinery that keeps Dhaka moving.",
    kw: ["metro rail", " metro", "traffic", "flyover", "commut", "liveable", "livability", " urban", "footpath", "wasa", "water supply", "waterlog", "transport", "mobility", "housing", "eviction", "slum", "gulshan", "banani", "karwan bazar", "old dhaka", "municipal", "rickshaw", "pedestrian", "city corporation", "fire drill", "fire safety", "eatery", "restaurant", "shopping cent", "metre user", "prepaid", "flat ", "real estate"],
  },
  {
    id: "economy",
    name: "Economy",
    full: "Economy & Business",
    blurb:
      "The garment floor and the wider economy: wages, exports, inflation, budgets, the businesses that rise and fall, and the people who absorb the shocks first.",
    kw: ["econom", "inflation", "garment", "rmg", "apparel", "bgmea", "export", "import", "bank", "taka", "forex", "gdp", "trade", "factory", "wage", "union", "industry", "business", "investment", "budget", "adb", "imf", "tax", "revenue", "entrepreneur", "loan", "debt", "market", "tariff", "price", "sme", "stock", "reserve", "subsidy", "fuel", "company", "logistics", "supply chain", "investor", "stimulus", "poverty", "ppp", "exchange rate", "dollar", "zakat"],
  },
  {
    id: "society",
    name: "Society",
    full: "Society & Culture",
    blurb:
      "The features that carry the texture of Bangladeshi life: faith and football, food and heritage, and a one-room school on a river island.",
    kw: ["film", "movie", "music", "football", "cricket", "sport", "religio", "faith", "festival", "eid", "puja", "hindu", "buddhist", "mosque", "temple", "education", "school", "university", "student", "book", "poet", "literature", "food", "cuisine", "recipe", "heritage", "history", "marriage", "wedding", "youth", " art", "tradition", "folk", "family", "travel", "tourism", "language", "museum", "architecture", "mango", "palace", "rajbari"],
  },
];

// Substring → beat overrides, applied before keyword scoring (first match wins).
// A quick, editable way to hard-fix a story the classifier gets wrong.
export const overrides = [
  ["july generation", "politics"], ["35 july", "politics"], ["july uprising", "politics"], ["martyr", "politics"], ["evm", "politics"],
  ["aynaghor", "rights"], ["enforced disappear", "rights"], ["journalism", "rights"], ["press freedom", "rights"], ["shipbreaking", "rights"], ["police brutality", "rights"], ["police shotgun", "rights"], ["michael chakma", "rights"],
  ["covid", "health"], ["coronavirus", "health"], ["pandemic", "health"], ["herd immunity", "health"], ["dengue", "health"], ["nipah", "health"], ["healthcare", "health"],
  ["gaza", "geopolitics"], ["hamas", "geopolitics"], ["taliban", "geopolitics"], ["pelosi", "geopolitics"], ["imran khan", "geopolitics"], ["amit shah", "geopolitics"], ["modi", "geopolitics"], ["apartheid", "geopolitics"], ["taiwan", "geopolitics"], ["spycraft", "geopolitics"],
  ["metro rail", "urban"], ["wasa", "urban"],
  ["brick kiln", "climate"], ["st martin", "climate"],
  ["miraj sheikh", "rights"], ["searching for my son", "rights"], ["limon has reclaimed", "rights"],
  ["duty-free car", "politics"], ["pervasive corruption", "politics"], ["bnf:", "politics"],
  ["get-rich scam", "tech"], ["icg president", "geopolitics"], ["humanitarian safety net", "geopolitics"],
  ["consumer rights", "economy"], ["paper money", "economy"], ["paid leaves", "economy"],
];

// Skills / expertise (from his own site), for the About page.
export const expertise = [
  "Investigative journalism",
  "Long-form features",
  "Data journalism",
  "Climate & environment",
  "Energy & agriculture",
  "Migration & labour rights",
  "Bangladesh's digital economy",
  "Politics & geopolitics",
];

// Education.
export const education = [
  { degree: "MA, International Relations", org: "University of Dhaka" },
  { degree: "BA (Hons), English", org: "University of Rajshahi" },
];

// Every article. `featured` marks front-page lead stories.
// `stat` (optional) surfaces a reported figure on featured cards.
export const articles = [
  // ---------------- Story Overrides ----------------
  {
    title: "A year since Hasina’s fall, Bangladesh celebrates freedom",
    beat: "politics",
    publication: "The Business Standard",
    year: "2024",
    url: "https://www.tbsnews.net/features/panorama/year-hasinas-fall-bangladesh-celebrates-freedom-1205486",
  },
  // ---------------- Migration & Trafficking ----------------
  {
    title: "Sold in Cambodia: How Bangladeshis are lured into slavery",
    beat: "migration",
    publication: "The Business Standard",
    year: "2022",
    url: "https://www.tbsnews.net/features/panorama/sold-cambodia-how-bangladeshis-are-lured-slavery-490818",
    excerpt:
      "More than a thousand Bangladeshis were lured to Cambodia with job offers, then had their passports seized and were sold between scam compounds. The investigation the Global Investigative Journalism Network named among 2022's best.",
    featured: true,
    laurel: "GIJN · Best investigations of 2022",
    stat: { figure: "1,000+", label: "trafficked, passports seized" },
  },
  {
    title: "Trafficked to fight in Russia: Bangladeshi victims recount harrowing tales",
    beat: "migration",
    publication: "The Business Standard",
    year: "2024",
    url: "https://www.tbsnews.net/features/panorama/trafficked-fight-russia-bangladeshi-victims-recount-harrowing-tales-1062606",
    excerpt:
      "Recruited for factory jobs, young Bangladeshi men found themselves handed a rifle and pushed toward the front line of Russia's war.",
    featured: true,
  },
  {
    title: "Enslaved in Myanmar's scam centres, rescued Bangladeshis carry harrowing scars",
    beat: "migration",
    publication: "The Business Standard",
    year: "2024",
    url: "https://www.tbsnews.net/features/panorama/enslaved-myanmars-scam-centres-rescued-bangladeshis-carry-harrowing-scars-1084441",
    excerpt:
      "Survivors of the cyber-scam compounds on the Myanmar border describe forced labour, beatings, and the long road back.",
    featured: true,
  },
  {
    title: "Skill gaps, abuse and stigma: The untold story behind the drop in Bangladeshi women migrants",
    beat: "migration",
    publication: "The Business Standard",
    year: "2023",
    url: "https://www.tbsnews.net/features/panorama/skill-gaps-abuse-and-stigma-untold-story-behind-drop-bangladeshi-women-migrants",
    excerpt:
      "Why fewer women are leaving Bangladesh for work abroad, and what the returning ones carry home.",
  },
  {
    title: "How 'Italy fever' burns and builds Madaripur",
    beat: "migration",
    publication: "The Business Standard",
    year: "2023",
    url: "https://www.tbsnews.net/features/panorama/how-italy-fever-burns-and-builds-madaripur-818671",
    excerpt:
      "A district remade by the dream of Europe: the remittance mansions, the debt, and the bodies lost on the way.",
    featured: true,
  },
  {
    title: "A migrant kind of love: Inside the long-distance relationships of Bangladesh's migrant workers",
    beat: "migration",
    publication: "The Business Standard",
    year: "2023",
    url: "https://www.tbsnews.net/features/panorama/migrant-kind-love-inside-long-distance-relationships-bangladeshs-migrant-workers",
    excerpt:
      "Marriages measured in video calls and years apart, held together across the Gulf.",
  },
  {
    title: "Bangladesh forex recovery to get boost from Malaysia labour reopening",
    beat: "migration",
    publication: "Nikkei Asia",
    year: "2024",
    url: "https://asia.nikkei.com/economy/bangladesh-forex-recovery-to-get-boost-from-malaysia-labor-reopening",
    excerpt:
      "The reopening of Malaysia's labour market and what it means for the remittances that steady Bangladesh's reserves.",
  },

  // ---------------- Climate & Environment ----------------
  {
    title: "Snakes beware: reptiles targeted across Bangladesh after a rise in Russell's viper sightings",
    beat: "climate",
    publication: "The Guardian",
    year: "2024",
    url: "https://www.theguardian.com/global-development/article/2024/jul/16/bangladesh-snakes-russells-viper-misinformation-online-rumours-panic-conservation",
    excerpt:
      "Online rumours turned a venomous snake into a national panic, and non-venomous species paid the price. A story about misinformation as much as about wildlife.",
    featured: true,
  },
  {
    title: "Overuse of antibiotics in Bangladesh aquaculture raises health concerns",
    beat: "climate",
    publication: "Mongabay",
    year: "2024",
    url: "https://news.mongabay.com/2024/11/overuse-of-antibiotics-in-bangladesh-aquaculture-rises-health-concerns/",
    excerpt:
      "The fish farms feeding a nation are also seeding antibiotic resistance, largely unregulated.",
  },
  {
    title: "How the 'harmful' water hyacinth is creating employment for thousands of women",
    beat: "climate",
    publication: "The Business Standard",
    year: "2022",
    url: "https://www.tbsnews.net/features/panorama/how-harmful-water-hyacinth-creating-employment-thousands-women-595186",
    excerpt:
      "A weed that chokes the wetlands is becoming a craft economy in women's hands.",
  },
  {
    title: "Poison fishing spreads to the Padma, Bangladesh's largest river",
    beat: "climate",
    publication: "The Business Standard",
    year: "2023",
    url: "https://www.tbsnews.net/features/panorama/poison-fishing-spreads-padma-river-711730",
    excerpt:
      "Pesticide poured into the water for a quick catch is hollowing out the ecosystem of the Padma.",
  },
  {
    title: "Can nilgais walk through Bangladesh's forests again?",
    beat: "climate",
    publication: "The Business Standard",
    year: "2023",
    url: "https://www.tbsnews.net/environment/nature/can-nilgais-walk-through-bangladeshs-forests-again-789254",
    excerpt:
      "The antelope vanished from Bangladesh decades ago. A quiet effort asks whether it can return.",
  },
  {
    title: "Two Bangladeshi brothers are trying to save this dog from extinction",
    beat: "climate",
    publication: "VICE",
    year: "2021",
    url: "https://www.vice.com/en/article/bvx3k5/two-bangladeshi-brothers-are-trying-to-save-this-dog-from-extinction",
    excerpt:
      "Roughly forty Sarail hounds remain. Two brothers are betting everything on the breed's survival.",
    featured: true,
  },
  {
    title: "Bangladesh explores wind power",
    beat: "climate",
    publication: "Energy Institute",
    year: "2023",
    url: "https://knowledge.energyinst.org/new-energy-world/article?id=138242",
    excerpt:
      "Offshore wind in the Bay of Bengal: the promise, and the grid that isn't ready for it.",
  },

  // ---------------- Politics & Power ----------------
  {
    title: "Hasina's gone, but the fate of Bangladesh's forcibly disappeared hangs in the balance",
    beat: "politics",
    publication: "Al Jazeera English",
    year: "2024",
    url: "https://www.aljazeera.com/features/2024/9/10/hasina-gone-but-fate-of-bangladeshs-forcibly-disappeared-hangs-in-balance",
    excerpt:
      "Over fifteen years of Sheikh Hasina's rule, more than 150 people were forcibly disappeared. After her fall, families are still counting who came home.",
    featured: true,
    stat: { figure: "150+", label: "forcibly disappeared under Hasina" },
  },
  {
    title: "How Dhaka's rickshaw pullers turned life-savers during Bangladesh's quota protests",
    beat: "politics",
    publication: "Al Jazeera English",
    year: "2024",
    url: "https://www.aljazeera.com/features/2024/7/26/dhakas-rickshaw-pullers-turn-life-savers-during-bangladesh-quota-protests",
    excerpt:
      "As the crackdown turned deadly, the city's poorest workers ferried the wounded through the gunfire.",
  },
  {
    title: "'Deeply insecure': Why Bangladeshi minorities are scared ahead of elections",
    beat: "politics",
    publication: "Al Jazeera English",
    year: "2026",
    url: "https://www.aljazeera.com/features/2026/2/1/deeply-insecure-why-bangladeshi-minorities-are-scared-ahead-of-elections",
    excerpt:
      "A spate of attacks has sharpened fear among religious minorities in the run-up to the vote.",
  },
  {
    title: "Can Bangladesh's Awami League survive an election ban and Hasina's exile?",
    beat: "politics",
    publication: "Al Jazeera English",
    year: "2026",
    url: "https://www.aljazeera.com/features/2026/1/30/can-bangladeshs-awami-league-survive-election-ban-ex-pm-hasinas-exile",
    excerpt:
      "The party that ruled with an iron fist is off the ballot. What is left of it?",
  },
  {
    title: "What is Bangladesh's Jamaat-e-Islami, and could it lead the country next?",
    beat: "politics",
    publication: "Al Jazeera English",
    year: "2026",
    url: "https://www.aljazeera.com/news/2026/1/21/what-is-bangladeshs-jamaat-e-islami-party-could-it-lead-the-country-next",
    excerpt:
      "For the first time in its chequered history, the party has a real path to power.",
  },
  {
    title: "'Like Eid': Bangladeshis hail a landmark election, many voting after 17 years",
    beat: "politics",
    publication: "Al Jazeera English",
    year: "2026",
    url: "https://www.aljazeera.com/news/2026/2/12/like-eid-bangladeshis-hail-landmark-election-many-vote-after-17-years",
    excerpt:
      "Millions turned out for a parliament and a referendum on constitutional reform. Reporting from the polling stations.",
  },
  {
    title: "Why BNP leader Tarique Rahman's return to Bangladesh matters",
    beat: "politics",
    publication: "Al Jazeera English",
    year: "2025",
    url: "https://www.aljazeera.com/news/2025/12/26/why-bnp-leader-tarique-rahmans-return-to-bangladesh-matters-ahead-of-vote",
    excerpt:
      "After years in exile, his homecoming reshapes the opposition ahead of the vote.",
  },
  {
    title: "In Bangladesh, LGBT people fear extremists, and a British-era law",
    beat: "politics",
    publication: "South China Morning Post",
    year: "2021",
    url: "https://www.scmp.com/week-asia/lifestyle-culture/article/3149180/bangladesh-lgbt-people-fear-extremists-and-british-era",
    excerpt:
      "Five years after the murder of activist Xulhaz Mannan, a colonial statute still criminalises who people love.",
  },
  {
    title: "Is Bangladesh growing closer to China at the expense of its ties with India?",
    beat: "geopolitics",
    publication: "The Diplomat",
    year: "2020",
    url: "https://thediplomat.com/2020/09/is-bangladesh-growing-closer-to-china-at-the-expense-of-its-relations-with-india/",
    excerpt:
      "Reading the balance of power in the Bay of Bengal through Dhaka's tilt between two giants.",
  },

  // ---------------- Labour & Economy ----------------
  {
    title: "Sadeka's magic lamp: How a garment worker became an RMG CEO",
    beat: "economy",
    publication: "The Business Standard",
    year: "2022",
    url: "https://www.tbsnews.net/features/panorama/sadekas-magic-lamp-how-garment-worker-became-rmg-ceo-604130",
    excerpt:
      "Eight years from the sewing line to the corner office: one woman's climb through the industry that clothes the world.",
    featured: true,
  },
  {
    title: "Tackling 'ineffective' Bangladesh anti-harassment committees",
    beat: "economy",
    publication: "Just-Style",
    year: "2024",
    url: "https://www.just-style.com/features/tackling-ineffective-bangladesh-anti-harassment-committees/",
    excerpt:
      "The committees meant to protect women on the garment floor exist mostly on paper.",
  },
  {
    title: "Bangladesh's apparel sector reckons with the fallout of a union leader's murder",
    beat: "economy",
    publication: "Just-Style",
    year: "2024",
    url: "https://www.just-style.com/features/bangladesh-apparel-sectors-concerns-over-union-leader-murder-fallout/",
    excerpt:
      "The killing of a labour organiser exposes the fault lines beneath a $40bn export industry.",
  },
  {
    title: "Bangladesh turns to an $80bn ADB-backed economic corridor for growth",
    beat: "economy",
    publication: "Nikkei Asia",
    year: "2024",
    url: "https://asia.nikkei.com/economy/bangladesh-turns-to-80bn-adb-backed-economic-corridor-for-growth",
    excerpt:
      "A bet on infrastructure to pull the economy up the value chain.",
  },
  {
    title: "Bangladesh's inflation woes heightened by Iran war fallout",
    beat: "economy",
    publication: "Nikkei Asia",
    year: "2025",
    url: "https://asia.nikkei.com/spotlight/iran-tensions/bangladesh-s-inflation-woes-heightened-by-iran-war-fallout",
    excerpt:
      "How a distant war lands on the kitchen tables of Dhaka.",
  },
  {
    title: "When the middle class tighten their belts, these people suffer the most",
    beat: "economy",
    publication: "The Business Standard",
    year: "2022",
    url: "https://www.tbsnews.net/features/panorama/when-middle-class-tighten-their-belt-these-people-suffer-most-587666",
    excerpt:
      "Following the economic shock down the chain, to the workers with the least cushion.",
  },
  {
    title: "The rise of the 'influencer' market in Bangladesh",
    beat: "economy",
    publication: "The Business Standard",
    year: "2022",
    url: "https://www.tbsnews.net/long-read/rise-influencer-market-bangladesh-546854",
    excerpt:
      "A new creator economy is booming, and still working out how anyone makes the money last.",
  },

  // ---------------- Society & Culture ----------------
  {
    title: "The school with no name: A ray of hope on a lonely char",
    beat: "society",
    publication: "The Business Standard",
    year: "2023",
    url: "https://www.tbsnews.net/features/panorama/school-no-name-ray-hope-lonely-char-659614",
    excerpt:
      "On a shifting river island, one man teaches a hundred children in a school that was never given a name.",
    featured: true,
  },
  {
    title: "Doms: The curse of being 'untouchable'",
    beat: "society",
    publication: "The Business Standard",
    year: "2022",
    url: "https://www.tbsnews.net/features/panorama/doms-curse-being-untouchables-511462",
    excerpt:
      "A caste that handles the country's dead and its forensics, and is shunned for it.",
  },
  {
    title: "Local journalism: A double-edged sword of systemic challenges and injustice",
    beat: "society",
    publication: "The Business Standard",
    year: "2023",
    url: "https://www.tbsnews.net/features/panorama/local-journalism-tale-double-edged-sword-systemic-challenges-and-injustice-655322",
    excerpt:
      "The district reporters who hold power to account, and pay for it with their safety.",
  },
  {
    title: "How mobile phones 'killed' the board-game makers",
    beat: "society",
    publication: "The Business Standard",
    year: "2022",
    url: "https://www.tbsnews.net/features/panorama/how-mobile-phones-killed-board-game-makers-555282",
    excerpt:
      "A craft that entertained generations, undone by the screen in every pocket.",
  },
  {
    title: "How religious preachers are taking hold of YouTube in Bangladesh",
    beat: "society",
    publication: "The Business Standard",
    year: "2020",
    url: "https://www.tbsnews.net/features/panorama/how-religious-preachers-are-taking-hold-youtube-bangladesh-283744",
    excerpt:
      "The waz mahfil moves online, and the algorithm rewards the loudest voices.",
  },
  {
    title: "Coronavirus child brides: Bangladesh teens forced into marriage during the pandemic downturn",
    beat: "society",
    publication: "South China Morning Post",
    year: "2021",
    url: "https://www.scmp.com/week-asia/lifestyle-culture/article/3143285/coronavirus-child-brides-bangladesh-teens-forced",
    excerpt:
      "As lockdown gutted household incomes, families married off daughters to ease the pressure.",
  },
  {
    title: "Maradona to Messi: Why Bangladesh loves Argentina's footballers",
    beat: "society",
    publication: "Al Jazeera English",
    year: "2026",
    url: "https://www.aljazeera.com/news/2026/7/2/maradona-to-messi-why-bangladesh-loves-argentinas-footballers",
    excerpt:
      "How a country 17,000km away became one of the most fervent homes of Argentine football.",
  },
  {
    title: "Why is it so hard to correct an NID, a passport, a certificate in Bangladesh?",
    beat: "society",
    publication: "The Business Standard",
    year: "2022",
    url: "https://www.tbsnews.net/features/panorama/why-it-so-difficult-correct-nids-passports-and-certificates-bangladesh-543586",
    excerpt:
      "A single wrong letter can cost citizens years. Inside a bureaucracy that rarely admits error.",
  },
];

// Awards & recognition.
export const awards = [
  {
    name: "8th BRAC Migration Media Award",
    detail: "Awarded in 2023 for “Sold in Cambodia: How Bangladeshis are lured into slavery.”",
    year: "2023",
    logo: "brac.png",
  },
  {
    name: "Global Investigative Journalism Network",
    detail: "“Sold in Cambodia” recognised as one of Bangladesh's top investigative stories of 2022.",
    year: "2022",
    logo: "gijn.png",
  },
];

// Fellowships & training — the rooms that shaped the reporting.
export const fellowships = [
  {
    name: "Climate Change Media Partnership Fellow, COP30",
    org: "Earth Journalism Network & the Stanley Center for Peace and Security · Belém, Brazil",
    tag: "2025",
    logo: "stanley.png",
  },
  {
    name: "National Press Foundation Fellow",
    org: "International Trade Training for Journalists",
    logo: "npf.png",
  },
  {
    name: "Oxford Climate Journalism Network",
    org: "Member · Reuters Institute for the Study of Journalism, University of Oxford",
    logo: "oxford.png",
  },
  {
    name: "Earth Journalism Network Fellow",
    org: "Internews",
    logo: "ejn.png",
  },
  {
    name: "Open Climate Reporting Initiative",
    org: "Centre for Investigative Journalism & DataLEADS",
    logo: "cij.png",
  },
  {
    name: "Himalayan Climate Data Field Lab",
    org: "ICIMOD and academic partners",
    logo: "icimod.png",
  },
];

// Short professional arc for the About page.
export const path = [
  {
    role: "Reporter",
    org: "The Daily Waadaa",
    note: "Reporting on politics, migration, climate, and society for one of Bangladesh's newer newsrooms.",
  },
  {
    role: "Bangladesh correspondent",
    org: "International News Services (INS) · Nikkei Asia (independent)",
    note: "Covering Bangladesh for international wires and business press.",
  },
  {
    role: "Senior feature writer (former)",
    org: "The Business Standard",
    note: "Hundreds of long-form and investigative features on migration, climate, labour, and politics.",
  },
];

// Reporting reach, stated plainly for the About page.
export const facts = [
  { figure: "11", label: "newsrooms published in" },
  { figure: "400+", label: "published stories" },
  { figure: "2×", label: "BRAC Migration Media Award" },
  { figure: "EN / BN", label: "reporting languages" },
];

// "Beyond" — short notes, quick blogs, anything he wants to share.
// Add an entry here and re-run `node src/build.mjs`.
export const posts = [
  {
    title: "Why I walk uphill",
    date: "2026-03-02",
    kind: "Trail note",
    body:
      "Reporting teaches you to move fast and doubt everything. The mountains ask for the opposite. On the higher trails of the Himalaya I put the phone away and let a day take the whole day, one switchback at a time, until the valley I came from looks small enough to hold. I film some of it for a channel I call A Journalist Who Travels, though the walking is mostly for me.",
  },
  {
    title: "The camera I carry when I'm off duty",
    date: "2026-01-20",
    kind: "Travel",
    body:
      "Off the clock I still can't stop looking. A tea stall at altitude, a porter's playlist, the exact blue an early sky goes before the peaks catch fire. Travel is where I remember that a story doesn't always have to indict something. Sometimes it just has to notice.",
  },
  {
    title: "Notes from COP30, Belém",
    date: "2025-11-18",
    kind: "Dispatch",
    body:
      "Reporting the climate summit from the edge of the Amazon, thinking the whole time about a delta fifteen thousand kilometres away that will live or die by what is decided in rooms like these.",
  },
];
