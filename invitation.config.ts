/**
 * The ONLY file you need to edit.
 * Everything on the website (/) and the printable card (/print) reads from here.
 *
 * Photos: drop files into /public/photos and set `src` (e.g. "/photos/main.jpg").
 * Leave `src` empty to show the elegant placeholder.
 */
export const invitation = {
  name: "Jonathan",
  heading: "The Holy Sacrament of Baptism",
  message: "Our little one is coming home to the Church. Join us as he is born anew of water and the Spirit.",

  // Optional: caption under the family photo. Leave "" to hide.
  hosts: "", // e.g. "With love, Mina & Marina"
  invitationText:
    "God blessed us with a son, and with hearts full of thanksgiving we now bring him to the holy font. Please stand with us in prayer, and stay to celebrate with us.",

  // Optional scripture line. Set `show: false` to hide it everywhere.
  scripture: {
    show: true,
    text: "For as many of you as were baptized into Christ have put on Christ.",
    reference: "Galatians 3:27",
  },

  event: {
    date: "2026-11-14", // YYYY-MM-DD
    time: "11:00", // 24h HH:MM: the celebration start (countdown, calendar). "" when given only by `timeNote`
    timeNote: "Following the Divine Liturgy",
    // The Divine Liturgy before the celebration. Set `time: ""` to hide it everywhere.
    liturgy: { time: "07:30", church: "Church of Virgin Mary & St. Athanasius" },
    durationMinutes: 120, // calendar length when `time` is set; otherwise an all-day entry
    utcOffset: "-05:00", // venue timezone offset on the day (Toronto, EST), used by the countdown
    venue: "The Trinity Hall",
    venueDetail: "Canadian Coptic Centre",
    address: "1245 Eglinton Ave W, Mississauga, ON L5V 2M4",
    mapsUrl: "https://maps.app.goo.gl/qjUxLaRFLSsbQT7Z9", // "Open in Maps" link; "" falls back to a search of the address
  },

  rsvp: {
    by: "", // YYYY-MM-DD, or "" to hide the reply-by date
    maxGuests: 10, // upper limit in the form
  },

  photos: {
    main: { src: "/photos/jonathan-portrait.png", alt: "Jonathan looking upward in soft sanctuary light" }, // 4:5, hero arch
    family: { src: "/photos/jonathan-family.png", alt: "Jonathan cradled by his parents" }, // 3:4, the one feature photo
    // 4:3, shown in "Where we gather". Use a real photo of the hall if you have one;
    // otherwise CODEX_PLACE_ART.md generates an artistic illustration at this path. Hidden while missing.
    venue: { src: "/place/venue-church.jpg", alt: "Red-brick Coptic Orthodox church glowing in warm evening light" },
  },

  // "The signs of baptism" scroll story. Edit freely; `image` is an optional transparent PNG emblem
  // (falls back to a gold icon when the file is missing). Please confirm the wording with your priest.
  signs: [
    {
      title: "Water",
      line: "Born of water and the Spirit",
      text: "He is immersed three times, in the name of the Father, the Son and the Holy Spirit.",
      image: "/signs/water.png",
      icon: "water",
    },
    {
      title: "Holy Myron",
      line: "Sealed with the gift of the Spirit",
      text: "He is anointed with the holy oil of chrismation, marked for God from head to toe.",
      image: "/signs/myron.png",
      icon: "oil",
    },
    {
      title: "The White Garment",
      line: "Clothed in Christ",
      text: "He is dressed in white, the robe of the newly enlightened, pure and new.",
      image: "/signs/garment.png",
      icon: "garment",
    },
    {
      title: "The Red Sash",
      line: "Bought with a precious price",
      text: "A red sash is tied across him in the sign of the cross, for the blood of Christ that redeemed him.",
      image: "/signs/sash.png",
      icon: "sash",
    },
  ],

  // Artwork. Every file is optional: if it is missing from /public, a drawn fallback is used.
  art: {
    dove: "/intro/dove-gold.png", // front-facing gold dove (intro, flight, reply courier)
    // Optional side-view flight frames facing right (see CODEX_DOVE_FLIGHT.md): real wingbeats.
    flyUp: "/dove/fly-up.png",
    flyDown: "/dove/fly-down.png",
    // The sanctuary with its baptismal font: intro and page backdrop (see CODEX_INTRO_ART.md).
    sanctuaryWide: "/intro/sanctuary-wide.jpg", // 16:9, desktop
    sanctuaryTall: "/intro/sanctuary-tall.jpg", // 9:16, phones
    // Optional painted water (see CODEX_WATER_ART.md); soft drawn water is used until they exist.
    waterPool: "/water/pool.png", // small still pool under the emblems and the dove
    waterLight: "/water/light.png", // seamless shimmering light drifting over the photo reflections
  },

  // Background music, started when a guest taps "Open the invitation". An audio file in /public
  // (.m4a or .mp3); leave "" for no music.
  music: { src: "/music/hymn.m4a" }, // knasty knasty hymn (koogi Taraneem)

  // Formatting for dates shown to guests.
  locale: "en-US", // "7:30 AM" style times
} as const;

export type Photo = { src: string; alt: string };
