import fs from 'fs';

let content = fs.readFileSync('src/data.mjs', 'utf8');

const oldBeatsStr = content.substring(
  content.indexOf('export const beats = ['),
  content.indexOf('];', content.indexOf('export const beats = [')) + 2
);

const newBeatsStr = `export const beats = [
  {
    id: "climate",
    name: "Climate",
    full: "Climate & Environment",
    blurb:
      "A delta under pressure: salinity creeping inland, rivers poisoned, wildlife cornered, and the science of a changing monsoon.",
    kw: ["climate", "flood", "cyclone", "salin", "environment", "river", "wildlife", "snake", "viper", "nilgai", "hyacinth", "pollution", "biodiversity", "drought", "monsoon", "coastal", "sundarban", "elephant", "dolphin", "aquaculture", "wind power", "solar", "renewable", "carbon", "emission", "cop30", "cop29", "cop28", "tiger", "forest", "nature", "ecosystem", "plastic", "groundwater", "arsenic", "char", "haor", "delta", "heatwave", "waste", "conservation", "bird"],
  },
  {
    id: "migration",
    name: "Migration",
    full: "Migration & Trafficking",
    blurb:
      "Following Bangladeshi workers along the routes that promise a wage abroad and too often deliver bondage, from Cambodia to Russia to the scam compounds of Myanmar.",
    kw: ["migrant", "migrat", "trafficke", "trafficking", "cambodia", "malaysia", "saudi", "qatar", "gulf", "remittance", "expatriate", "smuggl", "slavery", "recruit", "deport", "italy fever", "diaspora", "overseas", "kafala", "returnee", "manpower", "visa trade", "kuwait", "oman", "uae ", "dubai", "libya", "lebanon", "jordan", "housemaid", "domestic worker", "foreign employment", "labour migration", "labor migration", "irregular migration", "human smuggling", "bmet"],
  },
  {
    id: "economy",
    name: "Economy",
    full: "Economy & Business",
    blurb:
      "The garment floor and the wider economy: wages, exports, inflation, budgets, and the people who absorb the shocks first.",
    kw: ["econom", "inflation", "garment", "rmg", "apparel", "bgmea", "export", "import", "bank", "taka", "forex", "gdp", "trade", "factory", "wage", "union", "industry", "business", "investment", "budget", "adb", "imf", "tax", "revenue", "entrepreneur", "loan", "debt", "market", "tariff", "price", "sme", "stock", "reserve", "subsidy", "fuel"],
  },
  {
    id: "politics",
    name: "Politics",
    full: "Politics & Power",
    blurb:
      "Reporting a country remade: the fall of Sheikh Hasina, the disappeared, and an election held after seventeen years.",
    kw: ["election", "awami", "bnp", "jamaat", "hasina", "parliament", "protest", "quota", "uprising", "disappeared", "referendum", "constitution", "july charter", "ncp", "interim government", "tarique", "yunus", "cabinet", "poll", "campaign", "rally", "sedition", "tribunal", "verdict", "coup", "student-led", "voter", "ballot", "politic", "government", "party"],
  },
  {
    id: "geopolitics",
    name: "Geopolitics",
    full: "Geopolitics & Diplomacy",
    blurb:
      "Bangladesh between giants: the Bay of Bengal, the China-India balance, Rohingya, and the diplomacy that shapes a nation's room to move.",
    kw: ["china", "india", "geopolit", "diplomacy", "bay of bengal", "foreign", "iran", "teesta", "rohingya", "myanmar", "sanction", "belt and road", "quad", "indo-pacific", "delhi", "beijing", "washington", "treaty", "bilateral", "ambassador", "summit", "pakistan", "border", "relations", "corridor", "israel", "ukraine"],
  },
  {
    id: "rights",
    name: "Human Rights",
    full: "Rights, Gender & the Marginalised",
    blurb:
      "Who the system protects and who it forgets: women's safety and freedom, labour and human rights, minorities, caste, and the people pushed to the edges.",
    kw: ["human rights", "women", "woman ", "gender", "girl", "harassment", "domestic violence", "violence against", "rape", "child marriage", "child labour", "child labor", "dowry", "acid attack", "lgbt", "queer", "transgender", "disab", "minorit", "caste", "untouchable", "doms", "dom ", "press freedom", "freedom of expression", "torture", "custodial", "enforced disappear", "discrimination", "sexual", "widow", "marginal", "hijra"],
  },
  {
    id: "tech",
    name: "Tech & Digital",
    full: "Tech & the Digital Economy",
    blurb:
      "The country going online: platform work and the influencer economy, cyber-scams and surveillance, AI, and a digital public square that can build or break a reputation overnight.",
    kw: ["digital", "internet", "online", "influencer", "creator economy", "youtube", "facebook", "tiktok", "social media", "startup", "e-commerce", "ecommerce", "fintech", "artificial intelligence", " ai ", "cyber", "gig ", "gig economy", "ride-sharing", "ride sharing", "pathao", "freelanc", "outsourc", "smartphone", "mobile phone", "gaming", "gamers", " app ", " apps", "software", "surveillance", "deepfake", "misinformation", "screen time", "broadband", "tech "],
  },
  {
    id: "society",
    name: "Society",
    full: "Society & Culture",
    blurb:
      "The features that carry the texture of Bangladeshi life: faith, football, food, health, heritage, and a one-room school on a river island.",
    kw: ["film", "movie", "music", "football", "cricket", "sport", "religio", "faith", "festival", "eid", "puja", "hindu", "buddhist", "mosque", "temple", "education", "school", "university", "student", "health", "hospital", "dengue", "medicine", "doctor", "book", "poet", "literature", "food", "cuisine", "recipe", "heritage", "history", "marriage", "wedding", "youth", "art", "tradition", "folk", "family", "travel", "tourism", "language", "museum", "architecture"],
  },
];`;

content = content.replace(oldBeatsStr, newBeatsStr);

const oldArticlesStart = 'export const articles = [';
const newArticlesStart = `export const articles = [
  // ---------------- Story Overrides ----------------
  {
    title: "A year since Hasina’s fall, Bangladesh celebrates freedom",
    beat: "politics",
    publication: "The Business Standard",
    year: "2024",
    url: "https://www.tbsnews.net/features/panorama/year-hasinas-fall-bangladesh-celebrates-freedom-1205486",
  },`;

content = content.replace(oldArticlesStart, newArticlesStart);

fs.writeFileSync('src/data.mjs', content);
console.log("Patched src/data.mjs");
