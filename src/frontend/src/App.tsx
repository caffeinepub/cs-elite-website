import { ChevronRight, Menu, Shield, Trophy, Users, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";

// --- Types ---
type TabKey = "limited" | "unlimited" | "headshot";

// --- Social Links ---
const LINKS = {
  instagram: "https://www.instagram.com/elite_esports.9?igsh=emswYzAxc2t5NnRv",
  waDm1: "https://wa.me/919229486238",
  waDm2: "https://wa.me/917644950862",
  waGroup: "https://chat.whatsapp.com/Br5iTEPOaUk8Nx5OPQHaGI?mode=gi_t",
  waChannel: "https://whatsapp.com/channel/0029Vb6q1dmElagkNb4RSu04",
};

// --- Rules Data ---
const LIMITED_BODY_RULES = [
  {
    type: "allowed",
    title: "ALLOWED SETTINGS",
    items: [
      "\u2714\ufe0f Character Skill",
      "\u2714\ufe0f Height",
      "\u2714\ufe0f Gloo Break",
      "\u2714\ufe0f Gloo Wall will be limited",
    ],
  },
  {
    type: "banned",
    title: "BANNED GUNS",
    items: [
      "\u2716\ufe0f Double Vector",
      "\u2716\ufe0f Charge Buster",
      "\u2716\ufe0f M82B",
      "\u2716\ufe0f All X Guns",
      "\u00a0\u00a0\u2517 Thompson X",
      "\u00a0\u00a0\u2517 M1887 X",
    ],
  },
  {
    type: "banned",
    title: "BANNED UTILITIES",
    items: [
      "\u2716\ufe0f Nade",
      "\u2716\ufe0f Smoke",
      "\u2716\ufe0f Flash Freeze",
      "\u2716\ufe0f Dragon Freeze",
    ],
  },
  {
    type: "banned",
    title: "BANNED",
    items: ["\u2716\ufe0f Zone Pack"],
  },
  {
    type: "banned",
    title: "BANNED CHARACTERS",
    items: [
      "\u2716\ufe0f Nero",
      "\u2716\ufe0f Sonia",
      "\u2716\ufe0f Dimitri",
      "\u2716\ufe0f Orion",
      "\u2716\ufe0f Ryden",
      "\u2716\ufe0f A124",
      "\u2716\ufe0f Xayne",
      "\u2716\ufe0f Morse",
      "Only one player can use Kassie",
    ],
  },
  {
    type: "info",
    title: "SPECIAL RULES",
    items: [
      "Single player sniper allowed",
      "Match will start under 10 min with ID & Pass (IDP)",
      "If any issue in custom team can give proof and exit",
      "After 2\u20130 no back",
      "Any rule break = opponent win",
      "Rule break = prize pool to opponent",
    ],
  },
  {
    type: "warning",
    title: "IMPORTANT",
    items: [
      "Recording mandatory for all players",
      "No rematch",
      "No refund after IDP",
    ],
  },
  {
    type: "info",
    title: "PRIZE POOL",
    items: [
      "Game ke 5 min baad hi prize milegi",
      "Loss team ke pass 5 min",
      "Win team ka player 5 min tak kahin nahi jayega",
    ],
  },
  {
    type: "info",
    title: "CHECKING PROCESS",
    items: [
      "Game end ke baad G-meet DC",
      "5\u20137 min DC time",
      "15 min phone check",
      "Management decision is final",
    ],
  },
];

const UNLIMITED_BODY_RULES = [
  {
    type: "allowed",
    title: "ALLOWED SETTINGS",
    items: [
      "\u2714\ufe0f Character Skill",
      "\u2714\ufe0f Height",
      "\u2714\ufe0f Gloo Break",
      "\u2714\ufe0f All guns except banned",
    ],
  },
  {
    type: "banned",
    title: "BANNED GUNS",
    items: [
      "\u2716\ufe0f Charge Buster",
      "\u2716\ufe0f Vector",
      "\u2716\ufe0f M82B",
      "\u2716\ufe0f All X Guns",
      "\u00a0\u00a0\u2517 Thompson X",
      "\u00a0\u00a0\u2517 M1887 X",
    ],
  },
  {
    type: "banned",
    title: "BANNED UTILITIES",
    items: [
      "\u2716\ufe0f Nade",
      "\u2716\ufe0f Smoke",
      "\u2716\ufe0f Flash Freeze",
      "\u2716\ufe0f Grenade",
      "\u2716\ufe0f Dragon Freeze",
    ],
  },
  {
    type: "banned",
    title: "NOT ALLOWED",
    items: ["\u2716\ufe0f Zone Pack"],
  },
  {
    type: "banned",
    title: "BANNED CHARACTERS",
    items: [
      "\u2716\ufe0f Nero",
      "\u2716\ufe0f Sonia",
      "\u2716\ufe0f Dimitri",
      "\u2716\ufe0f Orion",
      "\u2716\ufe0f Ryden",
      "\u2716\ufe0f A124",
      "\u2716\ufe0f K",
      "\u2716\ufe0f Xayne",
      "\u2716\ufe0f Morse",
      "Only one player can use Kassie",
    ],
  },
  {
    type: "info",
    title: "SPECIAL RULES",
    items: [
      "Single player sniper allowed",
      "Match start under 10 min with ID & Pass",
      "If any issue in custom team can give proof and exit",
      "After 2\u20130 no back",
    ],
  },
  {
    type: "warning",
    title: "IMPORTANT",
    items: ["Recording mandatory", "No rematch", "No refund after IDP"],
  },
  {
    type: "info",
    title: "PRIZE POOL",
    items: [
      "Game ke 5 min baad hi prize pool",
      "Loss team ke pass 5 min",
      "Win team player 5 min tak kahin nahi jayega",
    ],
  },
  {
    type: "info",
    title: "CHECKING PROCESS",
    items: [
      "Game end ke baad G-meet DC",
      "5\u20137 min DC",
      "15 min phone check",
      "Management decision is final",
    ],
  },
];

const HEADSHOT_RULES = [
  {
    type: "allowed",
    title: "GAME MODE",
    items: [
      "\u2714\ufe0f One tap guns only",
      "\u274c No SMG",
      "\u274c No auto / spray guns",
    ],
  },
  {
    type: "banned",
    title: "BANNED GUNS",
    items: [
      "\u274c All X guns",
      "\u00a0\u00a0\u2716\ufe0f Thompson X",
      "\u00a0\u00a0\u2716\ufe0f M1887 X",
      "\u274c M82B",
      "\u274c Vector",
      "\u274c Charge Buster",
    ],
  },
  {
    type: "info",
    title: "CHARACTER SETTINGS",
    items: ["Character skill on/off depends on management"],
  },
  {
    type: "banned",
    title: "UTILITIES",
    items: [
      "\u274c No utilities",
      "\u274c Nade",
      "\u274c Smoke",
      "\u274c Flash Freeze",
      "\u274c Dragon Freeze",
    ],
  },
  {
    type: "banned",
    title: "NOT ALLOWED",
    items: [
      "\u274c Height advantage (roof top)",
      "\u274c Zone pack",
      "\u274c Revive",
    ],
  },
  {
    type: "banned",
    title: "BANNED CHARACTERS",
    items: [
      "\u2716\ufe0f Nero",
      "\u2716\ufe0f Sonia",
      "\u2716\ufe0f Dimitri",
      "\u2716\ufe0f Orion",
      "\u2716\ufe0f Ryden",
      "\u2716\ufe0f A124",
      "\u2716\ufe0f Xayne",
      "\u2716\ufe0f K",
      "\u2716\ufe0f Kassie",
      "\u2716\ufe0f Morse",
    ],
  },
  {
    type: "info",
    title: "SPECIAL RULES",
    items: [
      "Match start under 10 min with ID & Pass",
      "If any issue in custom proof mandatory",
      "After 2\u20130 no back",
    ],
  },
  {
    type: "warning",
    title: "IMPORTANT",
    items: [
      "Recording mandatory for all players",
      "No rematch",
      "No refund after IDP",
    ],
  },
  {
    type: "info",
    title: "PRIZE POOL",
    items: [
      "Prize within 5 min after game",
      "Loss team has 5 min",
      "Win team must stay 5 min",
    ],
  },
  {
    type: "info",
    title: "CHECKING",
    items: [
      "G-meet DC after game",
      "5\u20137 min DC",
      "15 min phone check",
      "Management decision is final",
    ],
  },
  {
    type: "allowed",
    title: "NOTE",
    items: ["\u2714\ufe0f Container / Box / Gloo wall height is allowed"],
  },
];

// Precomputed grid dot positions to avoid array index keys
const GRID_DOTS = Array.from({ length: 5 }, (_, i) =>
  Array.from({ length: 3 }, (_, j) => ({
    id: `dot-${i}-${j}`,
    cx: `${15 + i * 18}%`,
    cy: `${20 + j * 30}%`,
  })),
).flat();

// --- SVG Background Decorations ---
function HeroBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="20%"
        x2="100%"
        y2="60%"
        stroke="#00E5FF"
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />
      <line
        x1="0"
        y1="40%"
        x2="100%"
        y2="80%"
        stroke="#00E5FF"
        strokeWidth="0.3"
        strokeOpacity="0.25"
      />
      <line
        x1="0"
        y1="70%"
        x2="100%"
        y2="10%"
        stroke="#0080FF"
        strokeWidth="0.4"
        strokeOpacity="0.3"
      />
      <line
        x1="20%"
        y1="0"
        x2="80%"
        y2="100%"
        stroke="#00BFFF"
        strokeWidth="0.3"
        strokeOpacity="0.2"
      />
      <path
        d="M30,30 L30,60 M30,30 L60,30"
        stroke="#00E5FF"
        strokeWidth="1.5"
        strokeOpacity="0.6"
        fill="none"
      />
      <circle cx="10%" cy="30%" r="2" fill="#00E5FF" opacity="0.5" />
      <circle cx="90%" cy="20%" r="1.5" fill="#00E5FF" opacity="0.4" />
      <circle cx="15%" cy="75%" r="2" fill="#00BFFF" opacity="0.4" />
      <circle cx="85%" cy="65%" r="1.5" fill="#00BFFF" opacity="0.35" />
      <circle cx="50%" cy="90%" r="2" fill="#00E5FF" opacity="0.3" />
      <g transform="translate(80, 120)" opacity="0.5">
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#00E5FF" strokeWidth="1" />
        <line x1="0" y1="-6" x2="0" y2="6" stroke="#00E5FF" strokeWidth="1" />
        <circle
          cx="0"
          cy="0"
          r="2"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="0.5"
        />
      </g>
      {GRID_DOTS.map((dot) => (
        <circle
          key={dot.id}
          cx={dot.cx}
          cy={dot.cy}
          r="1"
          fill="#00E5FF"
          opacity="0.2"
        />
      ))}
    </svg>
  );
}

// --- Rule Subsection Card ---
function RuleCard({
  section,
}: { section: { type: string; title: string; items: string[] } }) {
  const borderClass =
    section.type === "allowed"
      ? "rule-section-allowed"
      : section.type === "banned"
        ? "rule-section-banned"
        : section.type === "warning"
          ? "rule-section-warning"
          : "rule-section-info";

  const titleColor =
    section.type === "allowed"
      ? "text-green-400"
      : section.type === "banned"
        ? "text-red-400"
        : section.type === "warning"
          ? "text-amber-400"
          : "text-cyan-400";

  return (
    <div className={`${borderClass} rounded-r-lg p-4`}>
      <h4
        className={`font-orbitron font-bold text-xs tracking-widest mb-3 ${titleColor}`}
      >
        {section.title}
      </h4>
      <ul className="space-y-1.5">
        {section.items.map((item) => (
          <li key={item} className="text-sm text-[#B9C7D6] leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Navbar ---
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 nav-glass transition-all duration-300 ${
        scrolled ? "shadow-lg shadow-cyan-500/5" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo as button for accessibility */}
        <button
          type="button"
          className="font-orbitron font-black text-xl tracking-widest cursor-pointer neon-text-sm text-[#00E5FF] bg-transparent border-none p-0"
          onClick={() => scrollTo("home")}
          data-ocid="nav.logo.button"
        >
          CS ELITE
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {(["home", "about", "rules"] as const).map((id) => (
            <button
              type="button"
              key={id}
              data-ocid={`nav.${id}.link`}
              onClick={() => scrollTo(id)}
              className="font-orbitron text-xs tracking-widest uppercase text-[#B9C7D6] hover:text-[#00E5FF] transition-colors duration-200"
            >
              {id}
            </button>
          ))}
        </div>

        {/* Join button */}
        <div className="hidden md:block">
          <a
            href={LINKS.waGroup}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.join_us.button"
            className="btn-cyan-filled px-5 py-2 rounded-full text-xs inline-block"
          >
            JOIN US
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          data-ocid="nav.menu.toggle"
          className="md:hidden text-[#00E5FF] p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden nav-glass border-t border-cyan-500/10 px-4 py-4 flex flex-col gap-4"
          >
            {(["home", "about", "rules"] as const).map((id) => (
              <button
                key={id}
                type="button"
                data-ocid={`nav.mobile.${id}.link`}
                onClick={() => scrollTo(id)}
                className="font-orbitron text-xs tracking-widest uppercase text-[#B9C7D6] hover:text-[#00E5FF] transition-colors text-left"
              >
                {id}
              </button>
            ))}
            <a
              href={LINKS.waGroup}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.mobile.join_us.button"
              className="btn-cyan-filled px-5 py-2 rounded-full text-xs text-center"
            >
              JOIN US
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// --- Hero Section ---
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-16"
    >
      <HeroBackground />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse-glow" />
          <span className="font-orbitron text-xs tracking-widest text-[#00E5FF] uppercase">
            Free Fire Custom Rooms
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-orbitron font-black uppercase tracking-widest text-[#EAF7FF] mb-4"
          style={{
            fontSize: "clamp(3rem, 12vw, 8rem)",
            textShadow:
              "0 0 10px #00E5FF, 0 0 30px #00E5FF, 0 0 60px #00BFFF, 0 0 100px #0080FF",
            lineHeight: 1.05,
          }}
        >
          CS ELITE
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-orbitron font-medium tracking-[0.2em] uppercase text-[#00E5FF] mb-4"
          style={{ fontSize: "clamp(0.75rem, 2.5vw, 1.1rem)" }}
        >
          Competitive Free Fire Custom Rooms
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-[#B9C7D6] text-base sm:text-lg mb-10 max-w-lg mx-auto"
        >
          Join the most competitive Free Fire custom rooms. Prove your skill.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.instagram.button"
            className="btn-cyan-filled flex items-center gap-2 px-5 py-3 rounded-lg text-sm"
          >
            <SiInstagram size={16} />
            Instagram
          </a>
          <a
            href={LINKS.waDm1}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.wa_dm1.button"
            className="btn-cyan-outline flex items-center gap-2 px-5 py-3 rounded-lg text-sm"
          >
            <SiWhatsapp size={16} />
            DM 1
          </a>
          <a
            href={LINKS.waDm2}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.wa_dm2.button"
            className="btn-cyan-outline flex items-center gap-2 px-5 py-3 rounded-lg text-sm"
          >
            <SiWhatsapp size={16} />
            DM 2
          </a>
          <a
            href={LINKS.waGroup}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.wa_group.button"
            className="btn-cyan-filled flex items-center gap-2 px-5 py-3 rounded-lg text-sm"
          >
            <SiWhatsapp size={16} />
            WhatsApp Group
          </a>
          <a
            href={LINKS.waChannel}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.wa_channel.button"
            className="btn-cyan-outline flex items-center gap-2 px-5 py-3 rounded-lg text-sm"
          >
            <SiWhatsapp size={16} />
            Channel
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="font-orbitron text-[10px] tracking-widest text-[#00E5FF]/50 uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-px h-8 bg-gradient-to-b from-[#00E5FF]/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

// --- About Section ---
function AboutSection() {
  const stats = [
    {
      icon: Trophy,
      label: "Competitive Rooms",
      desc: "Intense matches with strict fair play",
    },
    {
      icon: Shield,
      label: "Fair Play",
      desc: "Transparent rules enforced every game",
    },
    {
      icon: Users,
      label: "Prize Pools",
      desc: "Real rewards for top performers",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-cyan-500/30" />
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/60" />
            <span className="font-orbitron text-xs tracking-widest text-[#00E5FF]/70 uppercase">
              Who We Are
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/60" />
          </div>
          <h2 className="section-heading text-3xl sm:text-4xl neon-text-sm">
            ABOUT CS ELITE
          </h2>
        </motion.div>

        {/* Main description card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card-glow rounded-2xl p-8 mb-10"
        >
          <p className="text-[#B9C7D6] text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto">
            CS ELITE is a premier Free Fire custom room organization hosting
            competitive matches with strict rules, fair play, and exciting prize
            pools. We manage CS Limited Body, CS Unlimited Body, and Headshot
            (One Tap) modes to cater to all competitive styles. Join us for
            intense battles, transparent management, and a growing esports
            community.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              className="glass-card rounded-xl p-6 text-center group hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <stat.icon size={22} className="text-[#00E5FF]" />
              </div>
              <h3 className="font-orbitron font-bold text-sm tracking-wider text-[#EAF7FF] mb-2">
                {stat.label}
              </h3>
              <p className="text-xs text-[#B9C7D6]">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Rules Section ---
function RulesSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("limited");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "limited", label: "CS LIMITED BODY" },
    { key: "unlimited", label: "CS UNLIMITED BODY" },
    { key: "headshot", label: "HEADSHOT (ONE TAP)" },
  ];

  const rulesMap: Record<TabKey, typeof LIMITED_BODY_RULES> = {
    limited: LIMITED_BODY_RULES,
    unlimited: UNLIMITED_BODY_RULES,
    headshot: HEADSHOT_RULES,
  };

  return (
    <section id="rules" className="py-24 px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-cyan-500/30" />
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/60" />
            <span className="font-orbitron text-xs tracking-widest text-[#00E5FF]/70 uppercase">
              Game Modes
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/60" />
          </div>
          <h2 className="section-heading text-3xl sm:text-4xl neon-text-sm">
            RULES & FORMATS
          </h2>
        </motion.div>

        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              data-ocid={`rules.${tab.key}.tab`}
              onClick={() => setActiveTab(tab.key)}
              className={`font-orbitron font-bold text-xs tracking-wider px-5 py-2.5 rounded-full border transition-all duration-200 ${
                activeTab === tab.key ? "tab-active" : "tab-inactive"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Rules panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            data-ocid="rules.panel"
            className="glass-card-glow rounded-2xl p-6 sm:p-8"
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-cyan-500/20">
              <ChevronRight size={16} className="text-[#00E5FF]" />
              <h3 className="font-orbitron font-bold text-sm tracking-widest text-[#00E5FF] uppercase">
                {tabs.find((t) => t.key === activeTab)?.label}
              </h3>
            </div>

            {/* Rules grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rulesMap[activeTab].map((section) => (
                <RuleCard key={section.title} section={section} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12 border-t border-cyan-500/15">
      <div className="nav-glass py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="font-orbitron font-black text-2xl tracking-widest neon-text text-[#00E5FF] mb-3">
                CS ELITE
              </div>
              <p className="text-[#B9C7D6] text-sm leading-relaxed">
                Premier Free Fire custom room organization. Competitive. Fair.
                Rewarding.
              </p>
            </div>

            {/* Quick links */}
            <div className="sm:text-center">
              <h4 className="font-orbitron font-bold text-xs tracking-widest text-[#00E5FF] uppercase mb-4">
                Quick Links
              </h4>
              <nav className="flex flex-col gap-2">
                {(["home", "about", "rules"] as const).map((id) => (
                  <button
                    key={id}
                    type="button"
                    data-ocid={`footer.${id}.link`}
                    onClick={() => scrollTo(id)}
                    className="text-sm text-[#B9C7D6] hover:text-[#00E5FF] transition-colors uppercase tracking-widest font-orbitron text-xs sm:text-center text-left"
                  >
                    {id}
                  </button>
                ))}
              </nav>
            </div>

            {/* Social */}
            <div className="sm:text-right">
              <h4 className="font-orbitron font-bold text-xs tracking-widest text-[#00E5FF] uppercase mb-4">
                Connect
              </h4>
              <div className="flex gap-4 sm:justify-end">
                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.instagram.link"
                  className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-[#00E5FF] hover:bg-cyan-500/20 transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <SiInstagram size={18} />
                </a>
                <a
                  href={LINKS.waGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.whatsapp_group.link"
                  className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-[#00E5FF] hover:bg-cyan-500/20 transition-all duration-200 hover:scale-110"
                  aria-label="WhatsApp Group"
                >
                  <SiWhatsapp size={18} />
                </a>
                <a
                  href={LINKS.waChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.whatsapp_channel.link"
                  className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-[#00E5FF] hover:bg-cyan-500/20 transition-all duration-200 hover:scale-110"
                  aria-label="WhatsApp Channel"
                >
                  <SiWhatsapp size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-cyan-500/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
            <p className="text-xs text-[#B9C7D6]/70">
              &copy; {year} CS ELITE. All rights reserved.
            </p>
            <p className="text-xs text-[#B9C7D6]/50">
              Built with &#10084;&#65039; using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00E5FF]/60 hover:text-[#00E5FF] transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- App ---
export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg, #070B12 0%, #0A1220 100%)",
      }}
    >
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <RulesSection />
      </main>
      <Footer />
    </div>
  );
}
