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
    time: "", // 24h HH:MM, or "" when the time is given by `timeNote`
    timeNote: "Following the Divine Liturgy",
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
    venue: { src: "/place/venue.jpg", alt: "Illustration of a Coptic church in golden light" },
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
    // Optional painted clouds, transparent PNGs (see CODEX_SKY_ART.md). Drawn clouds are used until they exist.
    clouds: ["/sky/cloud-1.png", "/sky/cloud-2.png", "/sky/cloud-3.png", "/sky/cloud-4.png"],
  },

  // Formatting for dates shown to guests.
  locale: "en-CA",
} as const;

export type Photo = { src: string; alt: string };
