// Part 5: International — Middle East, East Asia, Europe, Central Asia, Islands

const destinations_part5 = [

  // ─── MIDDLE EAST ────────────────────────────────────────────────────────────

  {
    id: "dubai",
    name: "Dubai",
    state_country: "UAE",
    international: true,
    visa_required: true,
    region: "Middle East",
    proximity_hours: { Delhi: 3, Mumbai: 3, Bangalore: 4, Chennai: 4, Hyderabad: 4, Kolkata: 5, Pune: 3, Ahmedabad: 3 },
    experience_types: ["luxury", "city", "shopping", "family", "nightlife"],
    group_fit: ["couple", "friends", "family-kids", "solo"],
    budget: { tiers: ["mid", "premium"], min_per_day: 8000, max_per_day: 40000 },
    duration: { min_days: 3, ideal_days: 5, max_days: 7 },
    best_months: [10, 11, 12, 1, 2, 3, 4],
    avoid_months: [5, 6, 7, 8, 9],
    scores: { romance: 3, adventure: 3, culture: 2, party: 3, nature: 1, family_friendly: 5, spiritual: 1, offbeat: 1, food: 4, safety: 5, solo_friendly: 4 },
    tags: ["Burj Khalifa", "Palm Jumeirah", "desert safari", "Dubai Mall", "Gold Souk", "Atlantis", "Frame", "Marina", "Global Village"],
    why_go: "India's most popular international destination — easy visa, non-stop flights, world-class malls, desert safaris, and an unbeatable skyline. Perfect for first international trip.",
    not_for: ["offbeat travelers", "budget travelers", "nature seekers"],
    budget_note: "₹8000–40000/person/day. Visa ~₹7000. One of the pricier short-haul destinations."
  },

  {
    id: "abu_dhabi",
    name: "Abu Dhabi",
    state_country: "UAE",
    international: true,
    visa_required: true,
    region: "Middle East",
    proximity_hours: { Delhi: 4, Mumbai: 3, Bangalore: 4, Chennai: 4, Hyderabad: 4, Kolkata: 5, Pune: 3, Ahmedabad: 3 },
    experience_types: ["culture", "luxury", "family", "city"],
    group_fit: ["couple", "friends", "family-kids"],
    budget: { tiers: ["mid", "premium"], min_per_day: 8000, max_per_day: 35000 },
    duration: { min_days: 2, ideal_days: 4, max_days: 5 },
    best_months: [10, 11, 12, 1, 2, 3, 4],
    avoid_months: [5, 6, 7, 8, 9],
    scores: { romance: 3, adventure: 2, culture: 4, party: 2, nature: 1, family_friendly: 5, spiritual: 4, offbeat: 2, food: 4, safety: 5, solo_friendly: 3 },
    tags: ["Sheikh Zayed Mosque", "Louvre Abu Dhabi", "Ferrari World", "Yas Island", "Corniche", "mangroves"],
    why_go: "More relaxed than Dubai — the stunning Sheikh Zayed Mosque (one of the world's most beautiful), Ferrari World, and Louvre Abu Dhabi make it a great 2-day add-on.",
    not_for: ["budget travelers", "party groups", "nature seekers"],
    budget_note: "₹8000–35000/person/day. Often combined with Dubai to split visa cost."
  },

  {
    id: "oman",
    name: "Oman — Muscat & Nizwa",
    state_country: "Oman",
    international: true,
    visa_required: true,
    region: "Middle East",
    proximity_hours: { Delhi: 4, Mumbai: 3, Bangalore: 4, Chennai: 4, Hyderabad: 4, Kolkata: 5, Pune: 3, Ahmedabad: 3 },
    experience_types: ["culture", "heritage", "nature", "adventure", "offbeat"],
    group_fit: ["couple", "friends", "solo", "family-kids"],
    budget: { tiers: ["mid", "premium"], min_per_day: 6000, max_per_day: 20000 },
    duration: { min_days: 4, ideal_days: 7, max_days: 10 },
    best_months: [10, 11, 12, 1, 2, 3],
    avoid_months: [4, 5, 6, 7, 8, 9],
    scores: { romance: 4, adventure: 5, culture: 5, party: 1, nature: 5, family_friendly: 4, spiritual: 3, offbeat: 5, food: 3, safety: 5, solo_friendly: 4 },
    tags: ["Wahiba Sands", "Wadi Shab", "Sultan Qaboos Mosque", "Nizwa Fort", "fjords", "dolphin watching", "Muttrah Souk", "stargazing desert"],
    why_go: "The Middle East's best-kept secret — dramatic wadis, desert dunes, ancient forts, and Arabian culture without the flashiness of Dubai. Surprisingly affordable.",
    not_for: ["party groups", "beach-only travelers"],
    budget_note: "₹6000–20000/person/day. Underrated value destination in the region."
  },

  {
    id: "turkey_istanbul",
    name: "Turkey — Istanbul & Cappadocia",
    state_country: "Turkey",
    international: true,
    visa_required: true, // e-visa
    region: "Middle East",
    proximity_hours: { Delhi: 7, Mumbai: 8, Bangalore: 8, Chennai: 8, Hyderabad: 8, Kolkata: 8, Pune: 8, Ahmedabad: 8 },
    experience_types: ["culture", "heritage", "food", "adventure", "romance"],
    group_fit: ["couple", "friends", "family-kids", "solo"],
    budget: { tiers: ["mid", "premium"], min_per_day: 5000, max_per_day: 18000 },
    duration: { min_days: 6, ideal_days: 8, max_days: 12 },
    best_months: [4, 5, 6, 9, 10, 11],
    avoid_months: [12, 1, 2],
    scores: { romance: 5, adventure: 4, culture: 5, party: 3, nature: 4, family_friendly: 4, spiritual: 4, offbeat: 3, food: 5, safety: 4, solo_friendly: 4 },
    tags: ["hot air balloon Cappadocia", "Hagia Sophia", "Bosphorus cruise", "Grand Bazaar", "Turkish tea", "hammam", "fairy chimneys", "cave hotels"],
    why_go: "One of the world's great travel destinations — Istanbul straddles continents with incredible history, while Cappadocia's hot air balloon sunrise over fairy chimneys is bucket-list.",
    not_for: ["beach-only travelers", "very short trips"],
    budget_note: "₹5000–18000/person/day. E-visa ₹2500. Good value for Europe-quality experience."
  },

  {
    id: "jordan",
    name: "Jordan — Petra & Wadi Rum",
    state_country: "Jordan",
    international: true,
    visa_required: true,
    region: "Middle East",
    proximity_hours: { Delhi: 7, Mumbai: 8, Bangalore: 8, Chennai: 8, Hyderabad: 8, Kolkata: 8, Pune: 8, Ahmedabad: 8 },
    experience_types: ["heritage", "adventure", "offbeat", "nature"],
    group_fit: ["couple", "friends", "solo"],
    budget: { tiers: ["mid", "premium"], min_per_day: 6000, max_per_day: 20000 },
    duration: { min_days: 5, ideal_days: 7, max_days: 10 },
    best_months: [3, 4, 5, 9, 10, 11],
    avoid_months: [6, 7, 8, 12, 1, 2],
    scores: { romance: 4, adventure: 5, culture: 5, party: 1, nature: 5, family_friendly: 3, spiritual: 4, offbeat: 5, food: 3, safety: 4, solo_friendly: 4 },
    tags: ["Petra", "Treasury", "Wadi Rum desert", "Bedouin camp", "Dead Sea", "Aqaba snorkeling", "Indiana Jones", "camel riding"],
    why_go: "Home to Petra — one of the New Seven Wonders — and the surreal Wadi Rum Martian landscape. A genuinely bucket-list combination that few travelers regret.",
    not_for: ["beach lovers", "party groups", "budget travelers"],
    budget_note: "₹6000–20000/person/day. Petra entry ₹7000. Jordan Pass worth buying."
  },

  // ─── EAST ASIA ──────────────────────────────────────────────────────────────

  {
    id: "japan_tokyo_kyoto",
    name: "Japan — Tokyo, Kyoto & Osaka",
    state_country: "Japan",
    international: true,
    visa_required: true,
    region: "East Asia",
    proximity_hours: { Delhi: 9, Mumbai: 9, Bangalore: 8, Chennai: 8, Hyderabad: 9, Kolkata: 7, Pune: 9, Ahmedabad: 9 },
    experience_types: ["culture", "food", "heritage", "city", "nature"],
    group_fit: ["couple", "friends", "solo", "family-kids"],
    budget: { tiers: ["premium"], min_per_day: 10000, max_per_day: 35000 },
    duration: { min_days: 7, ideal_days: 10, max_days: 14 },
    best_months: [3, 4, 10, 11],
    avoid_months: [6, 7, 8],
    scores: { romance: 4, adventure: 3, culture: 5, party: 2, nature: 4, family_friendly: 5, spiritual: 4, offbeat: 3, food: 5, safety: 5, solo_friendly: 5 },
    tags: ["cherry blossoms", "Mount Fuji", "ramen", "sushi", "Fushimi Inari", "Shibuya crossing", "bullet train", "samurai", "onsen", "Nara deer"],
    why_go: "The most aspirational travel destination for Indians — extraordinary precision, cherry blossoms, world's best food culture, ancient temples, and a society unlike anything else.",
    not_for: ["budget travelers", "very short trips (min 7 days to justify cost)", "beach lovers"],
    budget_note: "₹10000–35000/person/day. Premium-only. Min ₹1.5L/person for 10 days. Visa ₹2500."
  },

  {
    id: "south_korea",
    name: "South Korea — Seoul & Busan",
    state_country: "South Korea",
    international: true,
    visa_required: true,
    region: "East Asia",
    proximity_hours: { Delhi: 8, Mumbai: 8, Bangalore: 8, Chennai: 8, Hyderabad: 8, Kolkata: 7, Pune: 8, Ahmedabad: 9 },
    experience_types: ["culture", "food", "city", "shopping", "nightlife"],
    group_fit: ["couple", "friends", "solo"],
    budget: { tiers: ["mid", "premium"], min_per_day: 6000, max_per_day: 20000 },
    duration: { min_days: 5, ideal_days: 7, max_days: 10 },
    best_months: [4, 5, 9, 10, 11],
    avoid_months: [6, 7, 8, 12, 1, 2],
    scores: { romance: 4, adventure: 2, culture: 5, party: 4, nature: 3, family_friendly: 3, spiritual: 3, offbeat: 3, food: 5, safety: 5, solo_friendly: 5 },
    tags: ["K-pop", "Gyeongbokgung", "Bukchon Hanok", "Korean BBQ", "Jeju Island", "Busan beach", "Myeongdong", "Namdaemun market", "kimchi"],
    why_go: "K-culture meets ancient palaces — Seoul is a stunning mix of old and ultra-modern, with incredible food, safe streets, and a growing Indian traveler community.",
    not_for: ["budget travelers", "nature purists", "beach-only travelers"],
    budget_note: "₹6000–20000/person/day. More affordable than Japan, comparable experience quality."
  },

  // ─── EUROPE ─────────────────────────────────────────────────────────────────

  {
    id: "europe_central",
    name: "Prague + Vienna + Budapest",
    state_country: "Czech Republic / Austria / Hungary",
    international: true,
    visa_required: true, // Schengen
    region: "Europe",
    proximity_hours: { Delhi: 9, Mumbai: 10, Bangalore: 10, Chennai: 10, Hyderabad: 10, Kolkata: 10, Pune: 10, Ahmedabad: 10 },
    experience_types: ["heritage", "culture", "romance", "food", "city"],
    group_fit: ["couple", "friends", "family-kids", "solo"],
    budget: { tiers: ["mid", "premium"], min_per_day: 8000, max_per_day: 25000 },
    duration: { min_days: 7, ideal_days: 10, max_days: 14 },
    best_months: [5, 6, 7, 8, 9],
    avoid_months: [11, 12, 1, 2],
    scores: { romance: 5, adventure: 2, culture: 5, party: 3, nature: 3, family_friendly: 4, spiritual: 3, offbeat: 3, food: 4, safety: 5, solo_friendly: 4 },
    tags: ["Charles Bridge", "Schönbrunn Palace", "Danube cruise", "Christmas markets", "spa bath", "medieval old towns", "beer culture", "Bratislava day trip"],
    why_go: "Europe's most affordable classic circuit — three fairy-tale capitals with castles, cobblestone streets, and the Danube flowing through, all doable on mid-range budget.",
    not_for: ["beach lovers", "adventure seekers", "short trips"],
    budget_note: "₹8000–25000/person/day. More affordable than Western Europe. Schengen visa ₹8000."
  },

  {
    id: "portugal",
    name: "Portugal — Lisbon & Porto",
    state_country: "Portugal",
    international: true,
    visa_required: true, // Schengen
    region: "Europe",
    proximity_hours: { Delhi: 11, Mumbai: 11, Bangalore: 11, Chennai: 11, Hyderabad: 11, Kolkata: 11, Pune: 11, Ahmedabad: 11 },
    experience_types: ["culture", "food", "heritage", "beach", "chill"],
    group_fit: ["couple", "friends", "solo"],
    budget: { tiers: ["mid", "premium"], min_per_day: 8000, max_per_day: 25000 },
    duration: { min_days: 6, ideal_days: 8, max_days: 12 },
    best_months: [4, 5, 6, 9, 10],
    avoid_months: [12, 1, 2],
    scores: { romance: 5, adventure: 2, culture: 5, party: 3, nature: 3, family_friendly: 3, spiritual: 2, offbeat: 4, food: 5, safety: 5, solo_friendly: 5 },
    tags: ["Lisbon trams", "Sintra palaces", "fado music", "Douro Valley wine", "Algarve beaches", "egg tarts", "azulejo tiles", "sunset Miradouros"],
    why_go: "Western Europe's most underrated gem — gorgeous tiled buildings, incredible seafood, Sintra's fairy-tale palaces, Algarve cliffs, and a relaxed lifestyle. Very welcoming to Indians.",
    not_for: ["adventure seekers", "budget travelers"],
    budget_note: "₹8000–25000/person/day. One of the more affordable Western European countries. Schengen visa ₹8000."
  },

  {
    id: "switzerland",
    name: "Switzerland — Zurich, Interlaken & Zermatt",
    state_country: "Switzerland",
    international: true,
    visa_required: true, // Schengen
    region: "Europe",
    proximity_hours: { Delhi: 10, Mumbai: 10, Bangalore: 10, Chennai: 10, Hyderabad: 10, Kolkata: 10, Pune: 10, Ahmedabad: 10 },
    experience_types: ["mountains", "nature", "romance", "adventure", "luxury"],
    group_fit: ["couple", "friends", "family-kids"],
    budget: { tiers: ["premium"], min_per_day: 18000, max_per_day: 60000 },
    duration: { min_days: 5, ideal_days: 7, max_days: 10 },
    best_months: [6, 7, 8, 12, 1, 2],
    avoid_months: [3, 4, 5, 9, 10, 11],
    scores: { romance: 5, adventure: 4, culture: 3, party: 2, nature: 5, family_friendly: 4, spiritual: 1, offbeat: 2, food: 4, safety: 5, solo_friendly: 3 },
    tags: ["Matterhorn", "Jungfrau", "paragliding Interlaken", "Swiss chocolate", "fondue", "skiing", "Geneva Lake", "Glacier Express", "Bollywood shoot locations"],
    why_go: "The Bollywood dream destination — snow-capped Alps, paragliding in Interlaken, the iconic Matterhorn, and some of Europe's most jaw-dropping scenery. Premium but unforgettable.",
    not_for: ["budget travelers", "culture seekers", "beach lovers"],
    budget_note: "₹18000–60000/person/day. Europe's most expensive destination. Min ₹2.5L/person for 7 days."
  },

  {
    id: "greece_santorini",
    name: "Greece — Athens & Santorini",
    state_country: "Greece",
    international: true,
    visa_required: true, // Schengen
    region: "Europe",
    proximity_hours: { Delhi: 8, Mumbai: 9, Bangalore: 9, Chennai: 9, Hyderabad: 9, Kolkata: 9, Pune: 9, Ahmedabad: 9 },
    experience_types: ["romance", "heritage", "beach", "culture", "chill"],
    group_fit: ["couple", "friends"],
    budget: { tiers: ["mid", "premium"], min_per_day: 9000, max_per_day: 35000 },
    duration: { min_days: 6, ideal_days: 8, max_days: 12 },
    best_months: [5, 6, 9, 10],
    avoid_months: [11, 12, 1, 2, 3],
    scores: { romance: 5, adventure: 2, culture: 5, party: 3, nature: 3, family_friendly: 3, spiritual: 3, offbeat: 2, food: 4, safety: 5, solo_friendly: 3 },
    tags: ["Santorini sunset", "Oia", "Parthenon", "Acropolis", "Mykonos", "Greek food", "island hopping", "blue domes", "caldera view"],
    why_go: "The iconic European honeymoon — Santorini's blue-domed churches with caldera sunset is one of travel's defining images. Athens adds 3000 years of history.",
    not_for: ["budget travelers", "solo travelers", "nature purists"],
    budget_note: "₹9000–35000/person/day. Santorini is very expensive; Athens is mid-range. Schengen visa ₹8000."
  },

  {
    id: "italy_rome_florence",
    name: "Italy — Rome, Florence & Venice",
    state_country: "Italy",
    international: true,
    visa_required: true, // Schengen
    region: "Europe",
    proximity_hours: { Delhi: 9, Mumbai: 9, Bangalore: 9, Chennai: 9, Hyderabad: 9, Kolkata: 9, Pune: 9, Ahmedabad: 9 },
    experience_types: ["heritage", "culture", "food", "romance", "city"],
    group_fit: ["couple", "friends", "family-kids", "solo"],
    budget: { tiers: ["mid", "premium"], min_per_day: 10000, max_per_day: 35000 },
    duration: { min_days: 7, ideal_days: 10, max_days: 14 },
    best_months: [4, 5, 6, 9, 10],
    avoid_months: [7, 8, 12, 1, 2],
    scores: { romance: 5, adventure: 2, culture: 5, party: 3, nature: 3, family_friendly: 4, spiritual: 4, offbeat: 2, food: 5, safety: 4, solo_friendly: 4 },
    tags: ["Colosseum", "Vatican", "Sistine Chapel", "gelato", "pasta", "Venice canals", "Florence Duomo", "Amalfi Coast", "Cinque Terre"],
    why_go: "The ultimate European cultural experience — Rome's ancient empire, Florence's Renaissance art, Venice's canals, and Italian food that ruins all other cuisine.",
    not_for: ["budget travelers", "beach-first travelers", "short trips"],
    budget_note: "₹10000–35000/person/day. One of Europe's pricier destinations. Schengen visa ₹8000."
  },

  // ─── CENTRAL ASIA ───────────────────────────────────────────────────────────

  {
    id: "kyrgyzstan",
    name: "Kyrgyzstan",
    state_country: "Kyrgyzstan",
    international: true,
    visa_required: false, // visa-free for Indians since 2023
    region: "Central Asia",
    proximity_hours: { Delhi: 6, Mumbai: 7, Bangalore: 7, Chennai: 7, Hyderabad: 7, Kolkata: 7, Pune: 7, Ahmedabad: 7 },
    experience_types: ["adventure", "nature", "offbeat", "mountains"],
    group_fit: ["friends", "solo", "couple"],
    budget: { tiers: ["budget", "mid"], min_per_day: 2500, max_per_day: 8000 },
    duration: { min_days: 5, ideal_days: 8, max_days: 12 },
    best_months: [6, 7, 8, 9],
    avoid_months: [11, 12, 1, 2, 3, 4, 5],
    scores: { romance: 3, adventure: 5, culture: 3, party: 1, nature: 5, family_friendly: 2, spiritual: 2, offbeat: 5, food: 2, safety: 3, solo_friendly: 4 },
    tags: ["Song Kol Lake", "yurt stay", "horse trekking", "Ala Archa", "nomad culture", "Tian Shan mountains", "Bishkek", "Issyk-Kul"],
    why_go: "One of the world's last true adventure frontiers — sleeping in yurts by mountain lakes, horse trekking with nomads, and some of the most dramatic mountain scenery on Earth. Visa-free for Indians.",
    not_for: ["luxury travelers", "beach lovers", "families with young kids", "city lovers"],
    budget_note: "₹2500–8000/person/day. One of the most affordable adventure destinations in the world."
  },

  {
    id: "kazakhstan",
    name: "Kazakhstan — Almaty & Charyn",
    state_country: "Kazakhstan",
    international: true,
    visa_required: false, // e-visa or visa-free
    region: "Central Asia",
    proximity_hours: { Delhi: 6, Mumbai: 7, Bangalore: 7, Chennai: 7, Hyderabad: 7, Kolkata: 7, Pune: 7, Ahmedabad: 7 },
    experience_types: ["nature", "adventure", "offbeat", "city"],
    group_fit: ["friends", "couple", "solo"],
    budget: { tiers: ["budget", "mid"], min_per_day: 3000, max_per_day: 10000 },
    duration: { min_days: 4, ideal_days: 6, max_days: 8 },
    best_months: [5, 6, 7, 8, 9],
    avoid_months: [11, 12, 1, 2, 3],
    scores: { romance: 3, adventure: 5, culture: 3, party: 2, nature: 5, family_friendly: 2, spiritual: 2, offbeat: 5, food: 3, safety: 4, solo_friendly: 4 },
    tags: ["Charyn Canyon", "Big Almaty Lake", "Kolsai Lakes", "steppe", "Medeu ice rink", "Shymbulak ski", "nomad history", "USSR architecture"],
    why_go: "Central Asia's most accessible destination — dramatic Charyn Canyon (Kazakhstan's Grand Canyon), pristine alpine lakes, and Almaty's cosmopolitan café culture.",
    not_for: ["luxury travelers", "beach lovers", "families with young kids"],
    budget_note: "₹3000–10000/person/day. Affordable and surprisingly easy for Indian travelers."
  },

  {
    id: "azerbaijan",
    name: "Azerbaijan — Baku",
    state_country: "Azerbaijan",
    international: true,
    visa_required: true, // ASAN e-visa
    region: "Central Asia",
    proximity_hours: { Delhi: 6, Mumbai: 6, Bangalore: 7, Chennai: 7, Hyderabad: 7, Kolkata: 7, Pune: 6, Ahmedabad: 6 },
    experience_types: ["city", "culture", "heritage", "offbeat"],
    group_fit: ["couple", "friends", "family-kids", "solo"],
    budget: { tiers: ["budget", "mid"], min_per_day: 3500, max_per_day: 12000 },
    duration: { min_days: 3, ideal_days: 5, max_days: 7 },
    best_months: [4, 5, 6, 9, 10, 11],
    avoid_months: [12, 1, 2],
    scores: { romance: 4, adventure: 2, culture: 4, party: 3, nature: 3, family_friendly: 4, spiritual: 2, offbeat: 4, food: 4, safety: 4, solo_friendly: 4 },
    tags: ["Baku Old City", "Flame Towers", "mud volcanoes", "Gobustan", "fire temple", "Caspian Sea", "boulevard promenade", "tea culture"],
    why_go: "The quirky crossroads of East and West — Baku's futuristic skyline next to a medieval walled city, natural gas-burning mountains, mud volcanoes, and an easy e-visa for Indians.",
    not_for: ["beach lovers", "adventure seekers", "long trips"],
    budget_note: "₹3500–12000/person/day. Very affordable, direct flights from several Indian cities."
  },

  // ─── ISLANDS ────────────────────────────────────────────────────────────────

  {
    id: "mauritius",
    name: "Mauritius",
    state_country: "Mauritius",
    international: true,
    visa_required: false,
    region: "Islands",
    proximity_hours: { Delhi: 8, Mumbai: 7, Bangalore: 6, Chennai: 6, Hyderabad: 7, Kolkata: 8, Pune: 7, Ahmedabad: 7 },
    experience_types: ["beach", "luxury", "romance", "nature"],
    group_fit: ["couple", "friends", "family-kids"],
    budget: { tiers: ["mid", "premium"], min_per_day: 8000, max_per_day: 35000 },
    duration: { min_days: 5, ideal_days: 7, max_days: 10 },
    best_months: [5, 6, 7, 8, 9, 10, 11],
    avoid_months: [12, 1, 2],
    scores: { romance: 5, adventure: 3, culture: 2, party: 2, nature: 4, family_friendly: 4, spiritual: 1, offbeat: 2, food: 3, safety: 5, solo_friendly: 2 },
    tags: ["lagoon beaches", "underwater waterfall", "Le Morne", "snorkeling", "kite surfing", "Chamarel colored earth", "sugar plantations", "luxury resorts"],
    why_go: "Africa's most romantic island — stunning turquoise lagoons, luxury all-inclusive resorts, great Indian food (large Indian diaspora), and no visa required.",
    not_for: ["budget travelers", "solo travelers", "culture seekers"],
    budget_note: "₹8000–35000/person/day. More affordable than Maldives for similar luxury beach experience."
  },

  {
    id: "seychelles",
    name: "Seychelles",
    state_country: "Seychelles",
    international: true,
    visa_required: false,
    region: "Islands",
    proximity_hours: { Delhi: 7, Mumbai: 6, Bangalore: 6, Chennai: 5, Hyderabad: 6, Kolkata: 8, Pune: 6, Ahmedabad: 7 },
    experience_types: ["beach", "luxury", "romance", "nature", "chill"],
    group_fit: ["couple"],
    budget: { tiers: ["premium"], min_per_day: 15000, max_per_day: 60000 },
    duration: { min_days: 5, ideal_days: 7, max_days: 10 },
    best_months: [4, 5, 9, 10, 11],
    avoid_months: [6, 7, 8],
    scores: { romance: 5, adventure: 2, culture: 1, party: 1, nature: 5, family_friendly: 2, spiritual: 1, offbeat: 3, food: 3, safety: 5, solo_friendly: 1 },
    tags: ["Anse Lazio", "Beau Vallon", "granite boulders", "Praslin", "La Digue", "giant tortoises", "coral reefs", "jungle trails"],
    why_go: "Arguably the world's most beautiful beaches — giant prehistoric granite boulders meet turquoise water at Anse Lazio and La Digue. Pure luxury and seclusion.",
    not_for: ["budget travelers", "solo travelers", "culture seekers", "party groups"],
    budget_note: "₹15000–60000/person/day. Among the most expensive destinations in the world."
  }

];

// Export for use in main destinations file
if (typeof module !== 'undefined') {
  module.exports = destinations_part5;
}
