/* ============================================
   ROAMIO — app.js  v2.0
   Part 1: Navigation + state  ✓
   Part 2: Gemini destination suggestions  ✓
   Part 3: Unsplash photos + weather  ✓
   Part 4: Itinerary + chat  (coming)
   ============================================ */

// ── CONFIG ──
// Keys are loaded from config.js (gitignored). See config.example.js for setup.
const GEMINI_API_KEY    = window.GEMINI_API_KEY  || '';
const GEMINI_ENDPOINT   = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const UNSPLASH_KEY      = window.UNSPLASH_KEY    || '';
const UNSPLASH_ENDPOINT = 'https://api.unsplash.com/search/photos';

// ── USER STATE ──
const state = {
  name:     '',
  city:     '',
  who:      '',
  month:    '',
  budget:   '',
  duration: '',
  location: '',
  vibe:     '',
  visa:     '',
  previousDestinations: [],
};

// ── NAME HANDLER (Welcome screen) ──
function handleNameInput(value) {
  state.name = value.trim();
  const btn  = document.getElementById('btnWelcomeStart');
  if (btn) btn.disabled = state.name.length < 2;
}

// ─────────────────────────────────────────────
// SECTION 1 — NAVIGATION
// ─────────────────────────────────────────────

function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  window.scrollTo(0, 0);
}

// ─────────────────────────────────────────────
// SECTION 2 — SCREEN HANDLERS
// ─────────────────────────────────────────────

// City screen
function handleCitySelect(value) {
  const textInput = document.getElementById('cityTextInput');
  const note      = document.getElementById('cityNote');
  const btn       = document.getElementById('btnCityNext');
  const error     = document.getElementById('cityError');
  error.classList.remove('visible');

  if (value === 'other') {
    textInput.style.display = 'block';
    note.style.display      = 'block';
    textInput.focus();
    state.city   = '';
    btn.disabled = true;
  } else if (value) {
    textInput.style.display = 'none';
    note.style.display      = 'none';
    state.city   = value;
    btn.disabled = false;
  } else {
    textInput.style.display = 'none';
    note.style.display      = 'none';
    state.city   = '';
    btn.disabled = true;
  }
}

function handleCityText(value) {
  state.city = value.trim();
  document.getElementById('btnCityNext').disabled = state.city.length < 2;
}

function nextFromCity() {
  if (!state.city) {
    document.getElementById('cityError').classList.add('visible');
    return;
  }
  goTo('screen-who');
}

// Generic single-select handler
function selectOption(groupId, clickedBtn) {
  document.getElementById(groupId)
    .querySelectorAll('.option-btn')
    .forEach(b => b.classList.remove('selected'));
  clickedBtn.classList.add('selected');

  const map = {
    whoOptions:      'who',
    budgetOptions:   'budget',
    durationOptions: 'duration',
    locationOptions: 'location',
    vibeOptions:     'vibe',
    visaOptions:     'visa',
  };
  const key = map[groupId];
  if (key) state[key] = clickedBtn.dataset.value;

  const screen = clickedBtn.closest('.screen');
  const btn = screen.querySelector('.btn-cta');
  if (btn) btn.disabled = false;
}

function nextFromOption(groupId, nextScreen) {
  const selected = document.querySelector(`#${groupId} .option-btn.selected`);
  if (!selected) return;
  goTo(nextScreen);
}

// Month screen
function selectMonth(clickedBtn) {
  document.querySelectorAll('.month-btn').forEach(b => b.classList.remove('selected'));
  clickedBtn.classList.add('selected');
  state.month = clickedBtn.dataset.value;
  document.getElementById('btnMonthNext').disabled = false;
}

function nextFromMonth() {
  if (!state.month) return;
  goTo('screen-budget');
}

// Visa → trigger loading
function nextFromVisa() {
  if (!state.visa) return;
  startLoading();
}

// ─────────────────────────────────────────────
// SECTION 3 — WEATHER CONTEXT TABLE
// ─────────────────────────────────────────────

const WEATHER_CONTEXT = {
  January:   'Peak winter. North India cold (Delhi 5–20°C), hills near freezing. Rajasthan cool & perfect. Goa & Kerala peak season. South India pleasant. Himalayas inaccessible. Avoid hill stations for warm weather.',
  February:  'Late winter, slowly warming. Rajasthan excellent. Goa still good. Kashmir & Himachal Pradesh very cold with snow. South India pleasant. Holi approaching.',
  March:     'Spring begins. North India warming (pleasant 15–28°C). Rajasthan getting warm. Himalayas starting to open. Kerala getting humid. Good across most of India.',
  April:     'Getting hot in North & Central India (30–38°C). Himalayas opening (Manali, Rohtang). Hill stations like Shimla, Ooty, Coorg very pleasant. South India hot & humid.',
  May:       'Peak summer in plains. North India very hot (40°C+). Best month for Ladakh, Spiti Valley, high Himalayan treks. Hill stations crowded but pleasant. Goa off-season.',
  June:      'Monsoon arrives in South & West (Kerala Jun 1, Mumbai Jun 10). Ladakh & Spiti Valley peak season begins. Rajasthan very hot. North India pre-monsoon heat. Avoid coastal areas.',
  July:      'Full monsoon across most of India. Lush green everywhere. Waterfalls at peak. Coorg, Wayanad, Meghalaya & Northeast breathtaking. Ladakh accessible but risky roads. Avoid Uttarakhand due to landslides.',
  August:    'Heavy monsoon continues. Himachal Pradesh & Uttarakhand prone to landslides. Northeast very wet. Rajasthan slightly cooler. Ladakh last weeks before closing. Kerala backwaters beautiful.',
  September: 'Monsoon retreating from North. Rajasthan becoming pleasant. Shimla & hill stations clearing up. South still wet. Spiti & Ladakh — last chance before October closure.',
  October:   'Post-monsoon golden season. Excellent across almost all of India. Rajasthan, Goa, Kerala, Andaman all perfect. Himalayas last chance before snowfall. Navratri & Diwali season.',
  November:  'Peak tourist season begins. North India pleasantly cool. Goa, Kerala, Andaman excellent. Rajasthan perfect. Himalayas closing — only lower altitude accessible.',
  December:  'Peak season. Goa at its absolute best. Rajasthan cool & perfect. North India cold (Delhi 8–22°C). Himalayas inaccessible. South India pleasant. Christmas & New Year. Most popular travel month.',
};

// ─────────────────────────────────────────────
// SECTION 4 — PROMPT BUILDER
// ─────────────────────────────────────────────

function buildPrompt(isRetry) {
  const whoLabels = {
    solo:         'solo traveler',
    couple:       'couple',
    family_kids:  'family with kids',
    family_grand: 'family with kids and grandparents (elderly travelers included)',
    friends:      'group of friends',
  };

  const budgetLabels = {
    budget:  'Less than ₹2,000 per adult per day (budget travel)',
    mid:     'Around ₹5,000 per adult per day (mid-range)',
    premium: '₹10,000 and above per adult per day (premium)',
  };

  const durationLabels = {
    weekend: 'Weekend trip (1–3 days)',
    short:   '4–6 day trip',
    week:    '7–10 day trip',
    long:    '10+ day trip',
  };

  const locationLabels = {
    mountains:  'mountains',
    beach:      'beach',
    city:       'city',
    pilgrimage: 'pilgrimage / spiritual',
    nature:     'nature & wildlife',
    unsure:     'open to anything — surprise them',
  };

  const vibeLabels = {
    calm:      'calm & relaxed',
    adventure: 'adventurous',
    immersive: 'immersive & cultural',
    unsure:    'open to any vibe',
  };

  const visaLabels = {
    yes:   'open to international travel with full visa',
    evisa: 'open to countries with eVisa for Indians (Thailand, Dubai, Sri Lanka, Malaysia, etc.) — also suggest Indian options',
    india: 'India only — no international destinations',
  };

  const travelTimeRules = {
    weekend: `STRICT: ONLY suggest destinations reachable within 6–8 hours ONE WAY from ${state.city} by road or train. NO flights. No destination that takes more than 8 hours travel.`,
    short:   `Suggest destinations reachable within 10–12 hours by road/train from ${state.city}, OR via short domestic flights (up to 2 hours flying).`,
    week:    `Any Indian destination is fine. Domestic flights are perfectly okay. For international, check visa setting.`,
    long:    `Any Indian or international destination. Flights are expected and normal.`,
  };

  const retryClause = isRetry && state.previousDestinations.length > 0
    ? `\n\nCRITICAL: The traveler was NOT happy with these previous suggestions: ${state.previousDestinations.join(', ')}. You MUST suggest completely DIFFERENT destinations. Do NOT repeat or suggest similar alternatives to these places.\n`
    : '';

  return `You are an expert Indian travel planner with deep knowledge of Indian destinations, weather patterns, and traveler needs.

TRAVELER PROFILE:
- Travelling from: ${state.city}
- Group: ${whoLabels[state.who] || state.who}
- Travel month: ${state.month}
- Budget: ${budgetLabels[state.budget] || state.budget}
- Trip duration: ${durationLabels[state.duration] || state.duration}
- Destination preference: ${locationLabels[state.location] || state.location}
- Travel vibe: ${vibeLabels[state.vibe] || state.vibe}
- International travel: ${visaLabels[state.visa] || state.visa}

TRAVEL TIME RULE (strictly follow):
${travelTimeRules[state.duration] || travelTimeRules.week}

WEATHER IN ${state.month.toUpperCase()}:
${WEATHER_CONTEXT[state.month] || 'Use your knowledge of Indian seasonal weather.'}
${retryClause}
TASK: Suggest exactly 3 ideal destinations for this traveler. Each must genuinely fit their budget, group type, travel time constraint, and be appropriate for ${state.month} weather.

Return ONLY a valid JSON array. No explanation, no markdown, no text before or after the JSON.

[
  {
    "name": "Destination Name",
    "region": "State, India (or Country if international)",
    "reason": "2 punchy sentences explaining exactly why this is perfect for THIS traveler in ${state.month}",
    "weatherNote": "What the weather is actually like here in ${state.month} — be specific",
    "travelInfo": "How to get there from ${state.city} and realistic travel time",
    "tags": ["tag1", "tag2", "tag3"],
    "unsplashQuery": "2-3 word search term for a beautiful landscape photo of this place"
  }
]`;
}

// ─────────────────────────────────────────────
// SECTION 5 — GEMINI API CALL
// ─────────────────────────────────────────────

async function callGemini(prompt) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_KEY_HERE') {
    return getPlaceholderDestinations();
  }

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature:        0.85,
        maxOutputTokens:    8192,
        response_mime_type: 'application/json',  // Forces valid JSON always
      },
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(`API error ${data.error.code}: ${data.error.message}`);
  }

  const finishReason = data.candidates?.[0]?.finishReason;
  if (finishReason === 'MAX_TOKENS') {
    throw new Error('Response was cut off. Please try again.');
  }

  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  if (!raw) throw new Error('Empty response from AI. Please try again.');

  // With response_mime_type: json, the response is always valid JSON — parse directly
  try {
    const parsed = JSON.parse(raw);
    // Handle both array response and object with array inside
    return Array.isArray(parsed) ? parsed : parsed.destinations || parsed.results || [];
  } catch (e) {
    console.error('JSON parse failed. Raw:', raw.substring(0, 300));
    throw new Error('Could not read AI response. Please try again.');
  }
}

// ─────────────────────────────────────────────
// SECTION 6 — LOADING + ORCHESTRATION
// ─────────────────────────────────────────────

async function startLoading() {
  goTo('screen-loading');
  state.previousDestinations = [];

  const messages = [
    `Checking ${state.month} weather across India...`,
    `Calculating travel time from ${state.city}...`,
    `Matching your ${state.vibe} vibe & ${state.budget} budget...`,
    `Picking the 3 best options for you...`,
  ];

  let i = 0;
  const msgEl   = document.getElementById('loadingMessage');
  const interval = setInterval(() => {
    if (i < messages.length) msgEl.textContent = messages[i++];
    else clearInterval(interval);
  }, 1100);

  try {
    const prompt       = buildPrompt(false);
    const destinations = await callGemini(prompt);
    clearInterval(interval);
    renderResults(destinations, false);
    goTo('screen-results');

    document.getElementById('resultsSub').textContent =
      `${state.duration} trip from ${state.city} · ${state.month}`;
  } catch (err) {
    clearInterval(interval);
    console.error('Destination fetch failed:', err);
    goTo('screen-welcome');
    alert(`Something went wrong: ${err.message}`);
  }
}

async function showMoreResults() {
  const btn = document.querySelector('.btn-more');
  btn.textContent = '⏳ Finding more options...';
  btn.disabled    = true;

  try {
    const prompt       = buildPrompt(true);
    const destinations = await callGemini(prompt);
    // Clear existing cards and show new ones
    document.getElementById('resultsBody').innerHTML = '';
    renderResults(destinations, false);
  } catch (err) {
    console.error('Show more failed:', err);
    alert('Could not load more options. Please try again.');
  } finally {
    btn.textContent = '🔄 Show me more options';
    btn.disabled    = false;
  }
}

// ─────────────────────────────────────────────
// SECTION 7 — UNSPLASH PHOTO FETCH
// ─────────────────────────────────────────────

async function fetchUnsplashPhoto(query, imgContainerId) {
  try {
    const url = `${UNSPLASH_ENDPOINT}?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&content_filter=high`;
    const res  = await fetch(url, {
      headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
    });
    const data = await res.json();
    const photo = data.results?.[0];
    if (!photo) return;

    const container = document.getElementById(imgContainerId);
    if (!container) return;

    // Replace emoji placeholder with real photo
    container.innerHTML = `
      <img
        src="${photo.urls.regular}"
        alt="${photo.alt_description || query}"
        loading="lazy"
        style="width:100%;height:100%;object-fit:cover;display:block"
      />
      <a
        href="${photo.links.html}?utm_source=roamio&utm_medium=referral"
        target="_blank"
        rel="noopener"
        style="position:absolute;bottom:6px;right:8px;font-size:9px;color:rgba(255,255,255,0.75);text-decoration:none;background:rgba(0,0,0,0.3);padding:2px 6px;border-radius:4px"
      >
        📷 ${photo.user.name} / Unsplash
      </a>
    `;
    container.style.position = 'relative';
    container.style.padding  = '0';

  } catch (err) {
    // Silently fail — emoji placeholder stays
    console.warn('Unsplash fetch failed for:', query, err);
  }
}

// ─────────────────────────────────────────────
// SECTION 8 — RENDER RESULTS
// ─────────────────────────────────────────────

function renderResults(destinations, append) {
  const body = document.getElementById('resultsBody');
  if (!append) body.innerHTML = '';

  destinations.forEach(dest => {
    // Track for "show more" retry context
    state.previousDestinations.push(dest.name);

    const imgId    = `img-${sanitize(dest.name)}-${Date.now()}`;
    const tagsHtml = (dest.tags || [])
      .filter(Boolean)
      .map(t => `<span class="dest-tag">${t}</span>`)
      .join('');

    const card = document.createElement('div');
    card.className = 'dest-card';
    card.innerHTML = `
      <div class="dest-card-img" id="${imgId}" style="display:flex;align-items:center;justify-content:center;background:var(--surface-2)">
        <span style="font-size:48px">${getDestinationEmoji(dest.name, state.location)}</span>
      </div>
      <div class="dest-card-body">
        <div class="dest-card-name">${dest.name}</div>
        <div style="font-size:12px;color:var(--text-light);margin-bottom:8px;font-weight:600">${dest.region || ''}</div>
        <div class="dest-card-reason">${dest.reason}</div>
        <div style="font-size:12px;color:var(--text-sub);margin-bottom:12px;padding:8px 10px;background:var(--surface-2);border-radius:8px;border-left:3px solid var(--primary)">
          🌤️ <strong>${state.month}:</strong> ${dest.weatherNote || ''}
        </div>
        <div style="font-size:12px;color:var(--text-sub);margin-bottom:12px">
          🚂 ${dest.travelInfo || ''}
        </div>
        <div class="dest-card-tags">${tagsHtml}</div>
        <button class="btn-plan" onclick="planTrip(${JSON.stringify(dest).replace(/"/g, '&quot;')})">Plan this trip →</button>
      </div>
    `;
    body.appendChild(card);

    // Fetch Unsplash photo asynchronously (non-blocking)
    if (dest.unsplashQuery) {
      fetchUnsplashPhoto(dest.unsplashQuery, imgId);
    }
  });

  window.scrollTo(0, 0);
}

// ─────────────────────────────────────────────
// SECTION 9 — HELPERS
// ─────────────────────────────────────────────

function getDestinationEmoji(name, locationType) {
  const n = (name || '').toLowerCase();
  if (n.includes('goa') || n.includes('beach') || n.includes('puri') || n.includes('andaman')) return '🏖️';
  if (n.includes('manali') || n.includes('shimla') || n.includes('ladakh') || n.includes('sikkim') || n.includes('darjeeling')) return '🏔️';
  if (n.includes('varanasi') || n.includes('ayodhya') || n.includes('tirupati') || n.includes('mathura') || n.includes('haridwar') || n.includes('rishikesh')) return '🛕';
  if (n.includes('ranthambore') || n.includes('jim corbett') || n.includes('kaziranga') || n.includes('coorg') || n.includes('wayanad')) return '🌿';
  const vibeMap = { mountains: '🏔️', beach: '🏖️', pilgrimage: '🛕', nature: '🌿', city: '🏙️' };
  return vibeMap[locationType] || '✈️';
}

function sanitize(str) {
  return (str || '').replace(/[^a-zA-Z0-9]/g, '_');
}

// Placeholder data when no API key is configured
function getPlaceholderDestinations() {
  return [
    {
      name: 'Jaipur',
      region: 'Rajasthan, India',
      reason: 'The Pink City is ideal for your group in ' + state.month + '. Rich Mughal architecture, vibrant bazaars, and excellent mid-range stays make it hard to beat.',
      weatherNote: 'Pleasant and sunny. Perfect sightseeing weather with minimal rain.',
      travelInfo: 'Well connected by train and flight from ' + state.city + '. Roughly 4–6 hours by train.',
      tags: ['Heritage', 'Culture', 'Rajasthani food'],
      unsplashQuery: 'Jaipur Hawa Mahal',
    },
    {
      name: 'Coorg',
      region: 'Karnataka, India',
      reason: 'A lush coffee plantation escape perfect for the ' + state.vibe + ' traveler. Quiet valleys, misty hills, and fresh Coorgi cuisine await.',
      weatherNote: 'Green and misty. Light showers possible but the landscape is stunning.',
      travelInfo: 'Best reached by road from Bengaluru — about 5 hours. Nearest airport is Mysuru.',
      tags: ['Nature', 'Coffee estates', 'Waterfalls'],
      unsplashQuery: 'Coorg coffee plantation',
    },
    {
      name: 'Pondicherry',
      region: 'Tamil Nadu, India',
      reason: 'A charming French-colonial town with calm beaches, great cafés, and spiritual depth at Auroville. Budget-friendly with a unique character.',
      weatherNote: 'Warm and breezy. Great beach weather with a cool sea breeze.',
      travelInfo: 'About 3 hours by road from Chennai. Regular buses and cabs available.',
      tags: ['Beach', 'French quarter', 'Auroville'],
      unsplashQuery: 'Pondicherry promenade beach',
    },
  ];
}

// ─────────────────────────────────────────────
// SECTION 10 — PLAN THIS TRIP
// ─────────────────────────────────────────────

// Extended state for Part 4
state.currentDest      = null;
state.chatHistory      = [];
state.selectedRating   = 0;
state.itinerarySummary = '';

function planTrip(dest) {
  state.currentDest  = dest;
  state.chatHistory  = [];

  // Update header title
  document.getElementById('itinDestName').textContent = dest.name;

  // Reset itinerary screen to loading state
  document.getElementById('itinLoading').style.display  = 'flex';
  document.getElementById('itinLoading').innerHTML      = `
    <div class="loading-spinner" style="width:32px;height:32px;border-width:3px;margin-bottom:12px"></div>
    <div style="font-size:14px;color:var(--text-sub);font-weight:600">Building your itinerary...</div>
  `;
  document.getElementById('itinContent').style.display  = 'none';
  document.getElementById('itinContent').innerHTML      = '';
  document.getElementById('chatSection').style.display  = 'none';
  document.getElementById('chatMessages').innerHTML     = '';
  document.getElementById('chatSuggestions').innerHTML  = '';
  document.getElementById('itinBottom').style.display   = 'none';

  goTo('screen-itinerary');
  trackEvent('/itinerary/' + sanitize(dest.name));
  generateItinerary(dest);
}

// ─────────────────────────────────────────────
// SECTION 11 — ITINERARY GENERATION
// ─────────────────────────────────────────────

function buildItineraryPrompt(dest) {
  const durationDays = { weekend: 2, short: 5, week: 8, long: 12 };
  const numDays = durationDays[state.duration] || 5;

  const whoLabels = {
    solo: 'solo traveler', couple: 'couple',
    family_kids: 'family with kids', family_grand: 'family with kids and grandparents',
    friends: 'group of friends',
  };

  const timeEmojis = { morning: '🌅', afternoon: '☀️', evening: '🌙' };

  // Build a day-by-day example structure so Gemini knows exactly what's expected
  const dayExample = Array.from({ length: numDays }, (_, i) => ({
    day: i + 1,
    title: `Day ${i + 1} title here`,
    morning:   { emoji: timeEmojis.morning,   activity: 'Specific morning activity with place names' },
    afternoon: { emoji: timeEmojis.afternoon, activity: 'Specific afternoon activity with place names' },
    evening:   { emoji: timeEmojis.evening,   activity: 'Specific evening activity, food or experience' },
  }));

  return `You are an expert Indian travel planner. Return ONLY a valid JSON object — no markdown, no extra text.

TRIP:
- Destination: ${dest.name}, ${dest.region}
- Traveller: ${whoLabels[state.who] || state.who} from ${state.city}
- Month: ${state.month}  |  Budget: ${state.budget}  |  Duration: ${numDays} days  |  Vibe: ${state.vibe}
- Why this place: ${dest.reason}
- Weather: ${dest.weatherNote}

Return exactly this JSON structure:
{
  "days": ${JSON.stringify(dayExample, null, 2)},
  "whereToStay": [
    { "type": "Central", "name": "Hotel name", "detail": "Location + price range + why it's good" },
    { "type": "Offbeat", "name": "Hotel name", "detail": "Location + price range + why it's good" },
    { "type": "Budget Pick", "name": "Hotel name", "detail": "Location + price range + why it's good" }
  ],
  "marketsToShop": [
    { "name": "Market name", "detail": "What to buy + when it's open + quick tip" },
    { "name": "Market name", "detail": "What to buy + when it's open + quick tip" },
    { "name": "Market name", "detail": "What to buy + when it's open + quick tip" }
  ],
  "topTips": [
    "Specific, actionable tip 1 for ${dest.name} in ${state.month}",
    "Specific, actionable tip 2",
    "Specific, actionable tip 3"
  ]
}

RULES:
- Be specific: use real place names, real restaurants, real markets
- Keep activity text to 1–2 punchy lines max
- topTips must be genuinely useful, specific to ${dest.name} and ${state.month} — not generic travel advice
- Return ONLY the JSON. Nothing else.`;
}

async function generateItinerary(dest) {
  try {
    const prompt   = buildItineraryPrompt(dest);
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        contents:         [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature:        0.8,
          maxOutputTokens:    8192,
          response_mime_type: 'application/json',
        },
      }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!raw) throw new Error('Empty itinerary response from AI');

    const itinData = JSON.parse(raw);
    // Store summary for chat context
    state.itinerarySummary = `${dest.name} itinerary: ${(itinData.days || []).map(d => d.title).join(', ')}`;

    renderTimeline(dest, itinData);
    startChat(dest);

  } catch (err) {
    console.error('Itinerary generation failed:', err);
    document.getElementById('itinLoading').innerHTML = `
      <div style="text-align:center;padding:24px">
        <div style="font-size:36px;margin-bottom:12px">😕</div>
        <div style="font-weight:700;margin-bottom:8px;color:var(--text)">Couldn't build the itinerary</div>
        <div style="font-size:13px;color:var(--text-sub);margin-bottom:20px">${err.message}</div>
        <button class="btn-cta" onclick="generateItinerary(state.currentDest)" style="max-width:200px;padding:12px 20px">Try again</button>
      </div>
    `;
  }
}

// Apply inline bold markdown
function applyInline(text) {
  return (text || '')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

function renderTimeline(dest, data) {
  const loading = document.getElementById('itinLoading');
  const content = document.getElementById('itinContent');

  const durationLabels = { weekend: 'Weekend trip', short: '5-day trip', week: '8-day trip', long: '12-day trip' };
  const meta = `${durationLabels[state.duration] || ''} · ${state.budget} budget · ${state.month}`;

  let html = `
    <div class="itin-body">
      <div class="itin-hero">
        <div class="itin-hero-name">${dest.name}</div>
        <div class="itin-hero-meta">${meta}</div>
      </div>
      <div class="timeline-wrap">
  `;

  // Days
  (data.days || []).forEach(day => {
    html += `
      <div class="tl-day">
        <div class="tl-dot">${day.day}</div>
        <div class="tl-day-label">Day ${day.day}</div>
        <div class="tl-day-title">${applyInline(day.title)}</div>
        <div class="tl-activity"><span class="tl-emoji">${day.morning?.emoji || '🌅'}</span><span class="tl-text"><strong>Morning:</strong> ${applyInline(day.morning?.activity || '')}</span></div>
        <div class="tl-activity"><span class="tl-emoji">${day.afternoon?.emoji || '☀️'}</span><span class="tl-text"><strong>Afternoon:</strong> ${applyInline(day.afternoon?.activity || '')}</span></div>
        <div class="tl-activity"><span class="tl-emoji">${day.evening?.emoji || '🌙'}</span><span class="tl-text"><strong>Evening:</strong> ${applyInline(day.evening?.activity || '')}</span></div>
      </div>
    `;
  });

  html += `</div>`; // close timeline-wrap

  // Where to Stay
  if (data.whereToStay?.length) {
    const badgeClass = ['', 'green', 'blue'];
    html += `<div class="itin-section"><div class="itin-section-hdr">🏨 Where to Stay</div>`;
    data.whereToStay.forEach((s, i) => {
      html += `
        <div class="itin-section-row">
          <span class="itin-row-badge ${badgeClass[i] || ''}">${s.type}</span>
          <span class="itin-row-text"><strong>${applyInline(s.name)}</strong>${applyInline(s.detail)}</span>
        </div>`;
    });
    html += `</div>`;
  }

  // Markets to Shop
  if (data.marketsToShop?.length) {
    html += `<div class="itin-section"><div class="itin-section-hdr">🛍️ Markets to Shop</div>`;
    data.marketsToShop.forEach(m => {
      html += `
        <div class="itin-section-row">
          <span class="itin-row-text"><strong>${applyInline(m.name)}</strong>${applyInline(m.detail)}</span>
        </div>`;
    });
    html += `</div>`;
  }

  // Top Tips
  if (data.topTips?.length) {
    html += `<div class="itin-section"><div class="itin-section-hdr">💡 Top Tips</div><div class="itin-tips-list">`;
    data.topTips.slice(0, 3).forEach((tip, i) => {
      html += `
        <div class="itin-tip-item">
          <span class="itin-tip-num">${i + 1}</span>
          <span>${applyInline(tip)}</span>
        </div>`;
    });
    html += `</div></div>`;
  }

  html += `<div style="height:24px"></div></div>`; // itin-body close + bottom padding

  content.innerHTML     = html;
  loading.style.display = 'none';
  content.style.display = 'block';
}

// ─────────────────────────────────────────────
// SECTION 12 — CHAT INTERFACE
// ─────────────────────────────────────────────

function startChat(dest) {
  const hey     = state.name ? `Hey ${state.name}! ` : '';
  const greeting = `${hey}🎉 Your ${dest.name} itinerary is ready above. Ask me anything — hidden gems, what to pack, budget breakdown, or any tweaks to the plan!`;

  document.getElementById('chatSection').style.display = 'block';
  document.getElementById('itinBottom').style.display  = 'block';

  appendChatBubble(greeting, 'ai');

  // Seed chat history with the greeting
  state.chatHistory = [
    { role: 'model', parts: [{ text: greeting }] },
  ];

  // Default suggestion chips
  renderSuggestions([
    'Best local food to try?',
    'What to pack for this trip?',
    'Give me a rough budget breakdown',
    'Any safety tips I should know?',
  ]);

  setTimeout(() => scrollChatToBottom(), 150);
}

function buildChatSystemInstruction() {
  const nameClause = state.name ? ` The user's name is ${state.name} — use it naturally once in a while.` : '';
  return `You are Roamio, a warm and knowledgeable Indian travel assistant.${nameClause}

The user is planning a trip to ${state.currentDest?.name}, ${state.currentDest?.region} in ${state.month}.
Profile: ${state.who}, ${state.budget} budget, ${state.duration} trip, ${state.vibe} vibe, travelling from ${state.city}.

Context from their itinerary: ${state.itinerarySummary}

Answer follow-up questions in a friendly, specific, practical way. Keep replies concise and useful.

CRITICAL — Always respond with valid JSON in EXACTLY this format:
{
  "reply": "Your helpful response here",
  "suggestions": ["Follow-up question 1", "Follow-up question 2", "Follow-up question 3", "Follow-up question 4"]
}

The reply should be warm and conversational. The 4 suggestions should be natural next questions the traveller might ask.`;
}

async function sendChatMessage(overrideText) {
  const input   = document.getElementById('chatInput');
  const message = (overrideText || input.value).trim();
  if (!message) return;

  input.value = '';
  document.getElementById('chatSuggestions').innerHTML = '';

  appendChatBubble(message, 'user');
  state.chatHistory.push({ role: 'user', parts: [{ text: message }] });

  const typingId = appendTypingIndicator();
  scrollChatToBottom();

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        system_instruction: { parts: [{ text: buildChatSystemInstruction() }] },
        contents:           state.chatHistory,
        generationConfig:   {
          temperature:        0.9,
          maxOutputTokens:    2048,
          response_mime_type: 'application/json',
        },
      }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      parsed = { reply: raw, suggestions: [] };
    }

    const reply       = parsed.reply || parsed.response || raw;
    const suggestions = Array.isArray(parsed.suggestions) ? parsed.suggestions : [];

    removeTypingIndicator(typingId);
    appendChatBubble(reply, 'ai');
    state.chatHistory.push({ role: 'model', parts: [{ text: reply }] });

    if (suggestions.length > 0) renderSuggestions(suggestions);

    scrollChatToBottom();
    trackEvent('/chat/' + sanitize(state.currentDest?.name || 'unknown'));

  } catch (err) {
    removeTypingIndicator(typingId);
    appendChatBubble('Sorry, I had trouble responding. Please try again! 🙏', 'ai');
    console.error('Chat error:', err);
  }
}

function appendChatBubble(text, type) {
  const container = document.getElementById('chatMessages');
  const bubble    = document.createElement('div');
  bubble.className = `chat-bubble ${type}`;
  // Convert newlines and bold markdown for display
  bubble.innerHTML = applyInline(text).replace(/\n/g, '<br/>');
  container.appendChild(bubble);
  return bubble;
}

function appendTypingIndicator() {
  const container = document.getElementById('chatMessages');
  const id        = 'typing-' + Date.now();
  const el        = document.createElement('div');
  el.className    = 'chat-bubble ai';
  el.id           = id;
  el.innerHTML    = '<span class="typing-dots"><span></span><span></span><span></span></span>';
  container.appendChild(el);
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function renderSuggestions(items) {
  const container = document.getElementById('chatSuggestions');
  container.innerHTML = '';
  (items || []).slice(0, 4).forEach(text => {
    const chip    = document.createElement('button');
    chip.className  = 'suggestion-chip';
    chip.textContent = text;
    chip.onclick    = () => sendChatMessage(text);
    container.appendChild(chip);
  });
  setTimeout(() => scrollChatToBottom(), 50);
}

function scrollChatToBottom() {
  const area = document.getElementById('itinScrollArea');
  if (area) area.scrollTop = area.scrollHeight;
}

function handleChatKey(e) {
  if (e.key === 'Enter') sendChatMessage();
}

// ─────────────────────────────────────────────
// SECTION 13 — ANALYTICS (GoatCounter)
// ─────────────────────────────────────────────

function trackEvent(path) {
  try {
    if (window.goatcounter && typeof window.goatcounter.count === 'function') {
      window.goatcounter.count({ path: path, title: path });
    }
  } catch (e) {
    // Silently fail — analytics should never break the app
  }
}

// ─────────────────────────────────────────────
// SECTION 14 — FEEDBACK MODAL (Web3Forms)
// ─────────────────────────────────────────────

function openFeedback() {
  state.selectedRating = 0;
  document.getElementById('feedbackText').value = '';
  document.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('feedbackOverlay').style.display = 'flex';
  trackEvent('/feedback-open');
}

function closeFeedback() {
  document.getElementById('feedbackOverlay').style.display = 'none';
}

function setRating(val) {
  state.selectedRating = val;
  document.querySelectorAll('.rating-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i + 1 === val);
  });
}

async function submitFeedback() {
  if (!state.selectedRating) {
    alert('Please pick a rating before submitting 🙏');
    return;
  }

  const text      = document.getElementById('feedbackText').value.trim();
  const submitBtn = document.querySelector('.feedback-modal .btn-cta');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled    = true;

  try {
    const payload = {
      access_key:  '25bd972f-58b2-488a-b00d-ea5aad044028',
      subject:     'Roamio Feedback',
      rating:      state.selectedRating,
      message:     text || '(No message provided)',
      destination: state.currentDest?.name || 'N/A',
      from_city:   state.city    || 'N/A',
      month:       state.month   || 'N/A',
      who:         state.who     || 'N/A',
      budget:      state.budget  || 'N/A',
    };

    const res    = await fetch('https://api.web3forms.com/submit', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    const result = await res.json();

    if (result.success) {
      closeFeedback();
      trackEvent('/feedback-submitted');
      setTimeout(() => alert('Thank you! 🙏 Your feedback means a lot and helps us make Roamio better.'), 100);
    } else {
      throw new Error(result.message || 'Submission failed');
    }

  } catch (err) {
    console.error('Feedback error:', err);
    alert('Could not send feedback. Please try again.');
  } finally {
    submitBtn.textContent = 'Submit Feedback';
    submitBtn.disabled    = false;
  }
}
