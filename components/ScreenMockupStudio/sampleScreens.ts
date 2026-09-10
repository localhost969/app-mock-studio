export interface SampleScreenPreset {
  id: string;
  name: string;
  category: string;
  src: string;
  badge: string;
}

// Generates high-res SVG data URIs for crisp rendering at any zoom level
function svgToDataUrl(svgString: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString.trim())}`;
}

const FINTECH_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 393 852" width="100%" height="100%">
  <defs>
    <linearGradient id="finBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0f19" />
      <stop offset="50%" stop-color="#111827" />
      <stop offset="100%" stop-color="#0d111c" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="50%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <linearGradient id="chipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <filter id="cardGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#8b5cf6" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="393" height="852" fill="url(#finBg)" />

  <!-- Ambient Glow -->
  <circle cx="200" cy="220" r="180" fill="#6366f1" opacity="0.12" filter="blur(60px)"/>

  <!-- Top App Bar -->
  <g transform="translate(24, 64)">
    <circle cx="22" cy="22" r="22" fill="#1f2937" stroke="#374151" stroke-width="1.5"/>
    <text x="22" y="27" font-family="-apple-system, sans-serif" font-size="14" font-weight="600" fill="#e5e7eb" text-anchor="middle">JD</text>
    <text x="56" y="16" font-family="-apple-system, sans-serif" font-size="12" font-weight="500" fill="#9ca3af">Welcome back,</text>
    <text x="56" y="34" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#ffffff">Jordan Davis</text>

    <!-- Notification Bell -->
    <rect x="300" y="2" width="40" height="40" rx="14" fill="#1f2937" stroke="#374151" stroke-width="1"/>
    <circle cx="320" cy="20" r="7" fill="none" stroke="#e5e7eb" stroke-width="2"/>
    <circle cx="325" cy="14" r="3.5" fill="#ef4444"/>
  </g>

  <!-- Balance Section -->
  <g transform="translate(24, 136)">
    <text x="0" y="16" font-family="-apple-system, sans-serif" font-size="13" font-weight="500" fill="#9ca3af" letter-spacing="0.5">TOTAL BALANCE</text>
    <text x="0" y="56" font-family="-apple-system, sans-serif" font-size="38" font-weight="800" fill="#ffffff" letter-spacing="-1">$34,820<tspan font-size="24" fill="#9ca3af">.50</tspan></text>
    <rect x="0" y="72" width="112" height="26" rx="13" fill="#10b981" fill-opacity="0.15"/>
    <text x="14" y="89" font-family="-apple-system, sans-serif" font-size="12" font-weight="600" fill="#10b981">+18.4% this mo</text>
  </g>

  <!-- Credit Card Component -->
  <g transform="translate(24, 256)" filter="url(#cardGlow)">
    <rect width="345" height="198" rx="24" fill="url(#cardGrad)" />
    <!-- Card shine accent -->
    <path d="M0,24 C100,20 180,90 240,198 L0,198 Z" fill="#ffffff" opacity="0.08" />
    
    <!-- Chip & Contactless -->
    <rect x="28" y="28" width="40" height="30" rx="6" fill="url(#chipGrad)" />
    <circle cx="305" cy="42" r="14" fill="#ffffff" opacity="0.3"/>
    <circle cx="320" cy="42" r="14" fill="#ffffff" opacity="0.5"/>

    <text x="28" y="126" font-family="monospace" font-size="16" font-weight="600" fill="#ffffff" letter-spacing="3.5">&#8226;&#8226;&#8226;&#8226;  &#8226;&#8226;&#8226;&#8226;  &#8226;&#8226;&#8226;&#8226;  8942</text>
    <text x="28" y="164" font-family="-apple-system, sans-serif" font-size="10" font-weight="600" fill="#e0e7ff" letter-spacing="1">CARD HOLDER</text>
    <text x="28" y="180" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#ffffff">JORDAN DAVIS</text>
    <text x="280" y="164" font-family="-apple-system, sans-serif" font-size="10" font-weight="600" fill="#e0e7ff" letter-spacing="1">EXPIRES</text>
    <text x="280" y="180" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#ffffff">09/29</text>
  </g>

  <!-- Action Buttons Row -->
  <g transform="translate(24, 482)">
    <g transform="translate(0, 0)">
      <rect width="72" height="64" rx="18" fill="#1f2937" stroke="#374151" stroke-width="1"/>
      <circle cx="36" cy="26" r="12" fill="#6366f1" fill-opacity="0.2"/>
      <polygon points="36,20 30,28 42,28" fill="#818cf8"/>
      <text x="36" y="52" font-family="-apple-system, sans-serif" font-size="11" font-weight="600" fill="#d1d5db" text-anchor="middle">Send</text>
    </g>
    <g transform="translate(91, 0)">
      <rect width="72" height="64" rx="18" fill="#1f2937" stroke="#374151" stroke-width="1"/>
      <circle cx="36" cy="26" r="12" fill="#10b981" fill-opacity="0.2"/>
      <polygon points="36,30 30,22 42,22" fill="#34d399"/>
      <text x="36" y="52" font-family="-apple-system, sans-serif" font-size="11" font-weight="600" fill="#d1d5db" text-anchor="middle">Receive</text>
    </g>
    <g transform="translate(182, 0)">
      <rect width="72" height="64" rx="18" fill="#1f2937" stroke="#374151" stroke-width="1"/>
      <circle cx="36" cy="26" r="12" fill="#f59e0b" fill-opacity="0.2"/>
      <rect x="29" y="21" width="14" height="10" rx="2" fill="none" stroke="#fbbf24" stroke-width="2"/>
      <text x="36" y="52" font-family="-apple-system, sans-serif" font-size="11" font-weight="600" fill="#d1d5db" text-anchor="middle">Cards</text>
    </g>
    <g transform="translate(273, 0)">
      <rect width="72" height="64" rx="18" fill="#1f2937" stroke="#374151" stroke-width="1"/>
      <circle cx="36" cy="26" r="12" fill="#ec4899" fill-opacity="0.2"/>
      <circle cx="36" cy="26" r="5" fill="none" stroke="#f472b6" stroke-width="2"/>
      <text x="36" y="52" font-family="-apple-system, sans-serif" font-size="11" font-weight="600" fill="#d1d5db" text-anchor="middle">Analytics</text>
    </g>
  </g>

  <!-- Recent Transactions Header -->
  <g transform="translate(24, 574)">
    <text x="0" y="16" font-family="-apple-system, sans-serif" font-size="16" font-weight="700" fill="#ffffff">Recent Activity</text>
    <text x="345" y="16" font-family="-apple-system, sans-serif" font-size="13" font-weight="600" fill="#818cf8" text-anchor="end">View All</text>

    <!-- Item 1: Apple -->
    <g transform="translate(0, 32)">
      <rect width="345" height="62" rx="18" fill="#151b28" stroke="#1f2937" stroke-width="1"/>
      <rect x="14" y="13" width="36" height="36" rx="12" fill="#000000"/>
      <text x="32" y="36" font-family="-apple-system, sans-serif" font-size="18" fill="#ffffff" text-anchor="middle">&#63743;</text>
      <text x="62" y="29" font-family="-apple-system, sans-serif" font-size="14" font-weight="600" fill="#ffffff">Apple Store</text>
      <text x="62" y="45" font-family="-apple-system, sans-serif" font-size="11" font-weight="500" fill="#6b7280">MacBook Pro Care</text>
      <text x="325" y="36" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="end">-$199.00</text>
    </g>

    <!-- Item 2: Stripe -->
    <g transform="translate(0, 104)">
      <rect width="345" height="62" rx="18" fill="#151b28" stroke="#1f2937" stroke-width="1"/>
      <rect x="14" y="13" width="36" height="36" rx="12" fill="#6366f1"/>
      <text x="32" y="37" font-family="-apple-system, sans-serif" font-size="16" font-weight="800" fill="#ffffff" text-anchor="middle">S</text>
      <text x="62" y="29" font-family="-apple-system, sans-serif" font-size="14" font-weight="600" fill="#ffffff">Stripe Payout</text>
      <text x="62" y="45" font-family="-apple-system, sans-serif" font-size="11" font-weight="500" fill="#6b7280">SaaS Monthly Sales</text>
      <text x="325" y="36" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#10b981" text-anchor="end">+$3,450.00</text>
    </g>

    <!-- Item 3: Figma -->
    <g transform="translate(0, 176)">
      <rect width="345" height="62" rx="18" fill="#151b28" stroke="#1f2937" stroke-width="1"/>
      <rect x="14" y="13" width="36" height="36" rx="12" fill="#0d111c"/>
      <circle cx="32" cy="31" r="9" fill="#f24e1e"/>
      <text x="62" y="29" font-family="-apple-system, sans-serif" font-size="14" font-weight="600" fill="#ffffff">Figma Pro</text>
      <text x="62" y="45" font-family="-apple-system, sans-serif" font-size="11" font-weight="500" fill="#6b7280">Annual Subscription</text>
      <text x="325" y="36" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="end">-$45.00</text>
    </g>
  </g>
</svg>
`;

const FITNESS_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 393 852" width="100%" height="100%">
  <defs>
    <linearGradient id="fitBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09090b" />
      <stop offset="100%" stop-color="#18181b" />
    </linearGradient>
    <linearGradient id="neonRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fa114f" />
      <stop offset="100%" stop-color="#ff4785" />
    </linearGradient>
    <linearGradient id="neonGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a1ff00" />
      <stop offset="100%" stop-color="#70e000" />
    </linearGradient>
    <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f2fe" />
      <stop offset="100%" stop-color="#4facfe" />
    </linearGradient>
  </defs>

  <rect width="393" height="852" fill="url(#fitBg)" />

  <g transform="translate(24, 64)">
    <text x="0" y="16" font-family="-apple-system, sans-serif" font-size="13" font-weight="600" fill="#a1a1aa" letter-spacing="1">TODAY'S SUMMARY</text>
    <text x="0" y="44" font-family="-apple-system, sans-serif" font-size="28" font-weight="800" fill="#ffffff">Fitness Pulse</text>
    <circle cx="325" cy="30" r="18" fill="#27272a"/>
    <circle cx="325" cy="30" r="8" fill="#fa114f"/>
  </g>

  <!-- Activity Rings Container -->
  <g transform="translate(196, 220)">
    <!-- Ring 1 Move Red -->
    <circle cx="0" cy="0" r="90" fill="none" stroke="#3f101f" stroke-width="22"/>
    <circle cx="0" cy="0" r="90" fill="none" stroke="url(#neonRed)" stroke-width="22" stroke-linecap="round" stroke-dasharray="565" stroke-dashoffset="120" transform="rotate(-90)"/>

    <!-- Ring 2 Exercise Green -->
    <circle cx="0" cy="0" r="64" fill="none" stroke="#1c3008" stroke-width="22"/>
    <circle cx="0" cy="0" r="64" fill="none" stroke="url(#neonGreen)" stroke-width="22" stroke-linecap="round" stroke-dasharray="402" stroke-dashoffset="90" transform="rotate(-90)"/>

    <!-- Ring 3 Stand Cyan -->
    <circle cx="0" cy="0" r="38" fill="none" stroke="#082b3d" stroke-width="22"/>
    <circle cx="0" cy="0" r="38" fill="none" stroke="url(#neonCyan)" stroke-width="22" stroke-linecap="round" stroke-dasharray="238" stroke-dashoffset="40" transform="rotate(-90)"/>
  </g>

  <!-- Stats Grid -->
  <g transform="translate(24, 340)">
    <!-- Move Stat -->
    <rect x="0" y="0" width="166" height="96" rx="20" fill="#1c1917" stroke="#292524" stroke-width="1"/>
    <text x="16" y="28" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#fa114f">MOVE</text>
    <text x="16" y="60" font-family="-apple-system, sans-serif" font-size="26" font-weight="800" fill="#ffffff">740 <tspan font-size="13" font-weight="500" fill="#a1a1aa">CAL</tspan></text>
    <text x="16" y="80" font-family="-apple-system, sans-serif" font-size="11" font-weight="500" fill="#78716c">Goal: 650 cal</text>

    <!-- Exercise Stat -->
    <rect x="178" y="0" width="166" height="96" rx="20" fill="#1c1917" stroke="#292524" stroke-width="1"/>
    <text x="194" y="28" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#a1ff00">EXERCISE</text>
    <text x="194" y="60" font-family="-apple-system, sans-serif" font-size="26" font-weight="800" fill="#ffffff">52 <tspan font-size="13" font-weight="500" fill="#a1a1aa">MIN</tspan></text>
    <text x="194" y="80" font-family="-apple-system, sans-serif" font-size="11" font-weight="500" fill="#78716c">Goal: 30 min</text>

    <!-- Heart Rate Chart Card -->
    <g transform="translate(0, 114)">
      <rect width="345" height="150" rx="20" fill="#18181b" stroke="#27272a" stroke-width="1"/>
      <text x="16" y="28" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" fill="#f43f5e">HEART RATE</text>
      <text x="16" y="58" font-family="-apple-system, sans-serif" font-size="24" font-weight="800" fill="#ffffff">72 <tspan font-size="14" font-weight="500" fill="#a1a1aa">BPM Avg</tspan></text>
      <!-- Heartbeat Path -->
      <path d="M16,110 L60,110 L80,95 L95,125 L110,75 L125,120 L140,105 L180,105 L200,90 L215,130 L230,70 L245,115 L260,105 L330,105" fill="none" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
    </g>

    <!-- Workout Button -->
    <g transform="translate(0, 280)">
      <rect width="345" height="54" rx="16" fill="#a1ff00"/>
      <text x="172" y="33" font-family="-apple-system, sans-serif" font-size="15" font-weight="700" fill="#000000" text-anchor="middle">Start Outdoor Run</text>
    </g>
  </g>
</svg>
`;

const MUSIC_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 393 852" width="100%" height="100%">
  <defs>
    <linearGradient id="musicBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <linearGradient id="artGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e" />
      <stop offset="40%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
  </defs>

  <rect width="393" height="852" fill="url(#musicBg)"/>

  <!-- Top bar -->
  <g transform="translate(24, 64)">
    <text x="172" y="16" font-family="-apple-system, sans-serif" font-size="12" font-weight="600" fill="#94a3b8" text-anchor="middle" letter-spacing="1.5">PLAYING FROM PLAYLIST</text>
    <text x="172" y="34" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">Neon Euphoria</text>
  </g>

  <!-- Album Artwork -->
  <g transform="translate(36, 140)">
    <rect width="321" height="321" rx="28" fill="url(#artGrad)" filter="drop-shadow(0 20px 30px rgba(168,85,247,0.35))"/>
    <circle cx="160" cy="160" r="60" fill="#000000" opacity="0.4"/>
    <circle cx="160" cy="160" r="20" fill="#ffffff" opacity="0.8"/>
  </g>

  <!-- Track Meta -->
  <g transform="translate(36, 500)">
    <text x="0" y="24" font-family="-apple-system, sans-serif" font-size="24" font-weight="800" fill="#ffffff">Midnight Horizons</text>
    <text x="0" y="48" font-family="-apple-system, sans-serif" font-size="16" font-weight="500" fill="#94a3b8">Kavinsky &amp; Lumina</text>
    <circle cx="308" cy="28" r="14" fill="#3b82f6" fill-opacity="0.2"/>
    <text x="308" y="33" font-family="-apple-system, sans-serif" font-size="14" fill="#38bdf8" text-anchor="middle">&#9825;</text>
  </g>

  <!-- Scrubber -->
  <g transform="translate(36, 574)">
    <rect width="321" height="6" rx="3" fill="#334155"/>
    <rect width="190" height="6" rx="3" fill="#ffffff"/>
    <circle cx="190" cy="3" r="7" fill="#ffffff"/>
    <text x="0" y="24" font-family="-apple-system, sans-serif" font-size="11" font-weight="500" fill="#64748b">2:34</text>
    <text x="321" y="24" font-family="-apple-system, sans-serif" font-size="11" font-weight="500" fill="#64748b" text-anchor="end">-1:18</text>
  </g>

  <!-- Playback Controls -->
  <g transform="translate(196, 670)">
    <circle cx="0" cy="0" r="36" fill="#ffffff"/>
    <polygon points="-8,-12 -8,12 12,0" fill="#0f172a"/>
    <!-- Prev -->
    <polygon points="-80,-8 -80,8 -66,0" fill="#cbd5e1"/>
    <polygon points="-66,-8 -66,8 -52,0" fill="#cbd5e1" transform="rotate(180 -59 0)"/>
    <!-- Next -->
    <polygon points="52,-8 52,8 66,0" fill="#cbd5e1"/>
    <polygon points="66,-8 66,8 80,0" fill="#cbd5e1"/>
  </g>
</svg>
`;

export const SAMPLE_PRESETS: SampleScreenPreset[] = [
  {
    id: "fintech",
    name: "Neobank & Cards",
    category: "Fintech",
    badge: "Fintech",
    src: svgToDataUrl(FINTECH_SVG),
  },
  {
    id: "fitness",
    name: "Activity Rings & Pulse",
    category: "Health & Fitness",
    badge: "Health",
    src: svgToDataUrl(FITNESS_SVG),
  },
  {
    id: "music",
    name: "Midnight Music Player",
    category: "Entertainment",
    badge: "Media",
    src: svgToDataUrl(MUSIC_SVG),
  },
  {
    id: "app-default",
    name: "Default App Screen",
    category: "App UI",
    badge: "Default",
    src: "/app.png",
  },
];
