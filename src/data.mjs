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
  // Kept accurate to the public record; adjust freely.
  title: "Senior feature writer, The Business Standard",
  tagline:
    "Award winning journalist specialized in investigative and long-form reporting.",
  intro:
    "I report from Bangladesh on the people caught inside the country's largest forces: the migrant routes that end in trafficking, a coastline losing ground to salt water, and a political order remade by the 2024 uprising. The work is long-form, data-driven, and reported on the ground.",
  contact: {
    email: "masum.engru@gmail.com",
    twitter: { handle: "@BillahTalks", url: "https://twitter.com/BillahTalks" },
    linkedin: { label: "LinkedIn", url: "https://www.linkedin.com/in/masum-billah-9a6224150" },
    portfolio: { label: "Story archive", url: "https://sites.google.com/view/billah1/stories" },
  },
};

// The masthead of outlets that have run his work (with self-hosted logo marks).
export const outlets = [
  { name: "The Guardian", logo: "guardian.png" },
  { name: "Al Jazeera English", short: "Al Jazeera", logo: "aljazeera.png" },
  { name: "Nikkei Asia", logo: "nikkei.png" },
  { name: "South China Morning Post", short: "SCMP", logo: "scmp.png" },
  { name: "The Business Standard", logo: "tbs.png" },
  { name: "The Diplomat", logo: "diplomat.png" },
  { name: "Mongabay", logo: "mongabay.png" },
  { name: "VICE", logo: "vice.png" },
  { name: "Devex", logo: "devex.png" },
  { name: "Just-Style", logo: "juststyle.png" },
];

export const publications = outlets.map((o) => o.name);

// Beats, in the order they appear on the Work page.
export const beats = [
  {
    id: "migration",
    name: "Migration & Trafficking",
    blurb:
      "Following Bangladeshi workers along the routes that promise a wage abroad and too often deliver bondage, from Cambodia to Russia to the scam compounds of Myanmar.",
  },
  {
    id: "climate",
    name: "Climate & Environment",
    blurb:
      "A delta under pressure: salinity creeping inland, rivers poisoned, wildlife cornered, and the science of a changing monsoon.",
  },
  {
    id: "politics",
    name: "Politics & Power",
    blurb:
      "Reporting a country remade: the fall of Sheikh Hasina, the disappeared, and an election held after seventeen years.",
  },
  {
    id: "labour",
    name: "Labour & Economy",
    blurb:
      "The garment floor and the wider economy: wages, unrest, and the people who absorb the shocks first.",
  },
  {
    id: "society",
    name: "Society & Culture",
    blurb:
      "The features that carry the texture of Bangladeshi life: caste, faith, football, a one-room school on a river island.",
  },
];

// Every article. `featured` marks front-page lead stories.
// `stat` (optional) surfaces a reported figure on featured cards.
export const articles = [
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
    beat: "politics",
    publication: "The Diplomat",
    year: "2020",
    url: "https://thediplomat.com/2020/09/is-bangladesh-growing-closer-to-china-at-the-expense-of-its-relations-with-india/",
    excerpt:
      "Reading the balance of power in the Bay of Bengal through Dhaka's tilt between two giants.",
  },

  // ---------------- Labour & Economy ----------------
  {
    title: "Sadeka's magic lamp: How a garment worker became an RMG CEO",
    beat: "labour",
    publication: "The Business Standard",
    year: "2022",
    url: "https://www.tbsnews.net/features/panorama/sadekas-magic-lamp-how-garment-worker-became-rmg-ceo-604130",
    excerpt:
      "Eight years from the sewing line to the corner office: one woman's climb through the industry that clothes the world.",
    featured: true,
  },
  {
    title: "Tackling 'ineffective' Bangladesh anti-harassment committees",
    beat: "labour",
    publication: "Just-Style",
    year: "2024",
    url: "https://www.just-style.com/features/tackling-ineffective-bangladesh-anti-harassment-committees/",
    excerpt:
      "The committees meant to protect women on the garment floor exist mostly on paper.",
  },
  {
    title: "Bangladesh's apparel sector reckons with the fallout of a union leader's murder",
    beat: "labour",
    publication: "Just-Style",
    year: "2024",
    url: "https://www.just-style.com/features/bangladesh-apparel-sectors-concerns-over-union-leader-murder-fallout/",
    excerpt:
      "The killing of a labour organiser exposes the fault lines beneath a $40bn export industry.",
  },
  {
    title: "Bangladesh turns to an $80bn ADB-backed economic corridor for growth",
    beat: "labour",
    publication: "Nikkei Asia",
    year: "2024",
    url: "https://asia.nikkei.com/economy/bangladesh-turns-to-80bn-adb-backed-economic-corridor-for-growth",
    excerpt:
      "A bet on infrastructure to pull the economy up the value chain.",
  },
  {
    title: "Bangladesh's inflation woes heightened by Iran war fallout",
    beat: "labour",
    publication: "Nikkei Asia",
    year: "2025",
    url: "https://asia.nikkei.com/spotlight/iran-tensions/bangladesh-s-inflation-woes-heightened-by-iran-war-fallout",
    excerpt:
      "How a distant war lands on the kitchen tables of Dhaka.",
  },
  {
    title: "When the middle class tighten their belts, these people suffer the most",
    beat: "labour",
    publication: "The Business Standard",
    year: "2022",
    url: "https://www.tbsnews.net/features/panorama/when-middle-class-tighten-their-belt-these-people-suffer-most-587666",
    excerpt:
      "Following the economic shock down the chain, to the workers with the least cushion.",
  },
  {
    title: "The rise of the 'influencer' market in Bangladesh",
    beat: "labour",
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
    name: "BRAC Migration Media Award",
    detail: "Two-time recipient, honouring reporting on labour migration.",
    year: "Two-time winner",
  },
  {
    name: "Global Investigative Journalism Network",
    detail: "“Sold in Cambodia” named among the best investigations of the year.",
    year: "2022",
  },
];

// Fellowships & training — the rooms that shaped the reporting.
export const fellowships = [
  {
    name: "Oxford Climate Journalism Network",
    org: "Reuters Institute for the Study of Journalism, University of Oxford",
  },
  {
    name: "Earth Journalism Network Fellow",
    org: "Internews",
  },
  {
    name: "Open Climate Reporting Initiative",
    org: "Centre for Investigative Journalism & DataLEADS",
  },
  {
    name: "Himalayan Climate Data Field Lab",
    org: "ICIMOD and academic partners",
  },
];

// Short professional arc for the About page.
export const path = [
  {
    role: "Senior feature writer",
    org: "The Business Standard",
    note: "Long-form and investigative features on migration, climate, labour, and politics.",
  },
  {
    role: "International contributor",
    org: "The Guardian · Al Jazeera · Nikkei Asia · SCMP · Mongabay · Devex",
    note: "Reporting Bangladesh for global audiences, from the 2024 uprising to the changing monsoon.",
  },
];

// Reporting reach, stated plainly for the About page.
export const facts = [
  { figure: "10", label: "international mastheads" },
  { figure: "6–10 yrs", label: "reporting experience" },
  { figure: "2×", label: "BRAC Migration Media Award" },
  { figure: "EN / BN", label: "reporting languages" },
];
