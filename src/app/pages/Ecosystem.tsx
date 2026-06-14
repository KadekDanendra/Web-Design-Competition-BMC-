import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flower2, Users, Recycle, ArrowRight, Award, X, MapPin, Trash2, Sparkles, Leaf, ChevronDown } from "lucide-react";
import { useApp } from "../lib/AppContext";
import { FadeIn, PageWrap } from "../components/Section";

const badges = ["Bronze", "Silver", "Gold", "Platinum"];
const badgeColors = ["#CD7F32", "#C0C0C0", "#FFD700", "#E5E4E2"];

type Entry = {
  name: string;
  score: number;
  badge: number;
  location: string;
  waste: number;
  participants: number;
};

const leaderboardData: Entry[][] = [
  // Desa
  [
    { name: "Desa Penglipuran", score: 9820, badge: 3, location: "Bangli, Bali", waste: 1240, participants: 720 },
    { name: "Desa Tenganan", score: 8540, badge: 2, location: "Karangasem, Bali", waste: 980, participants: 540 },
    { name: "Desa Pemuteran", score: 7920, badge: 2, location: "Buleleng, Bali", waste: 880, participants: 470 },
    { name: "Desa Munduk", score: 6450, badge: 1, location: "Buleleng, Bali", waste: 720, participants: 380 },
    { name: "Desa Sidatapa", score: 5280, badge: 1, location: "Buleleng, Bali", waste: 590, participants: 310 },
    { name: "Desa Sibetan", score: 4120, badge: 0, location: "Karangasem, Bali", waste: 460, participants: 240 },
  ],
  // Sekolah
  [
    { name: "SMA Negeri 1 Denpasar", score: 8920, badge: 3, location: "Denpasar", waste: 1080, participants: 1240 },
    { name: "SMA Negeri 4 Denpasar", score: 7640, badge: 2, location: "Denpasar", waste: 920, participants: 1080 },
    { name: "Bali Island School", score: 6890, badge: 2, location: "Sanur", waste: 780, participants: 640 },
    { name: "SMP Negeri 1 Ubud", score: 5720, badge: 1, location: "Gianyar", waste: 640, participants: 820 },
    { name: "SMA Negeri 2 Semarapura", score: 4830, badge: 1, location: "Klungkung", waste: 540, participants: 680 },
    { name: "SD Saraswati 5 Denpasar", score: 3940, badge: 0, location: "Denpasar", waste: 420, participants: 560 },
  ],
  // Hotel
  [
    { name: "Mulia Resort Nusa Dua", score: 9450, badge: 3, location: "Nusa Dua", waste: 2340, participants: 480 },
    { name: "Four Seasons Sayan", score: 8720, badge: 3, location: "Ubud", waste: 1980, participants: 320 },
    { name: "Alila Manggis", score: 7560, badge: 2, location: "Karangasem", waste: 1620, participants: 240 },
    { name: "Bali Eco Resort & Yoga Retreat", score: 6420, badge: 1, location: "Tabanan", waste: 1240, participants: 180 },
    { name: "Como Shambhala Estate", score: 5680, badge: 1, location: "Ubud", waste: 1080, participants: 210 },
    { name: "Padma Resort Legian", score: 4720, badge: 0, location: "Legian", waste: 940, participants: 420 },
  ],
  // Perusahaan
  [
    { name: "Garuda Wisnu Kencana", score: 8240, badge: 3, location: "Badung", waste: 1820, participants: 420 },
    { name: "Bali Zoo", score: 7180, badge: 2, location: "Gianyar", waste: 1440, participants: 280 },
    { name: "Krisna Oleh-Oleh Bali", score: 6320, badge: 2, location: "Denpasar", waste: 1180, participants: 340 },
    { name: "Coca-Cola Amatil Bali", score: 5840, badge: 1, location: "Mengwi", waste: 1620, participants: 380 },
    { name: "Bali Pulina Coffee", score: 4920, badge: 1, location: "Gianyar", waste: 820, participants: 140 },
    { name: "Indomaret Bali Region", score: 3680, badge: 0, location: "Bali", waste: 720, participants: 580 },
  ],
];

function FlowDiagram({
  steps,
  stepLabel,
  details,
  moreLabel,
  closeLabel,
  accentColor = "#10B981",
}: {
  steps: readonly string[] | string[];
  stepLabel: string;
  details?: readonly (readonly string[])[] | string[][];
  moreLabel: string;
  closeLabel: string;
  accentColor?: string;
}) {
  const [, setHovered] = useState<number | null>(null);
  const [locked, setLocked] = useState<number | null>(null);
  const open = locked;
  return (
    <div className="mt-6">
      <div className="flex flex-col md:flex-row items-stretch gap-3">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3 flex-1">
            <motion.div
              onMouseEnter={() => details && locked === null && setHovered(i)}
              onMouseLeave={() => details && setHovered(null)}
              onClick={() => details && setLocked(locked === i ? null : i)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className={`flex-1 p-4 rounded-xl border text-center relative overflow-hidden group w-full ${details ? "cursor-pointer" : ""} ${open === i ? "ring-2" : ""}`}
              style={{
                borderColor: open === i ? accentColor : "var(--border)",
                background: "var(--card)",
                ["--tw-ring-color" as any]: accentColor,
              }}
            >
              <div className={`absolute inset-0 transition-opacity blur-2xl ${open === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} style={{ background: `radial-gradient(circle, ${accentColor}55, transparent)` }} />
              <div className={`pointer-events-none absolute -inset-2 rounded-2xl blur-xl transition-opacity ${locked === i ? "opacity-70" : "opacity-0"}`} style={{ background: `linear-gradient(135deg, ${accentColor}, #0EA5E9)` }} />
              <div className="relative">
                <div className="text-xs opacity-60 mb-1">{stepLabel} {i + 1}</div>
                <div style={{ fontWeight: 600 }}>{s}</div>
              </div>
            </motion.div>
            {i < steps.length - 1 && <ArrowRight className="text-emerald-500 shrink-0 hidden md:block" />}
          </div>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {open !== null && details && details[open] && (
          <motion.div
            key={open}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="mt-4 p-5 rounded-xl border relative overflow-hidden"
              style={{
                borderColor: "var(--border)",
                background: `color-mix(in oklab, ${accentColor} 6%, var(--card))`,
              }}
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-30" style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: `color-mix(in oklab, ${accentColor} 20%, transparent)`, color: accentColor, fontWeight: 700, fontSize: "0.8rem" }}
                  >
                    {open + 1}
                  </div>
                  <div style={{ fontWeight: 600 }}>{steps[open]}</div>
                </div>
                <ul className="space-y-2">
                  {details[open].map((d, k) => (
                    <motion.li
                      key={k}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: k * 0.06 }}
                      className="flex gap-2"
                      style={{ color: "var(--muted-foreground)", fontSize: "0.9rem", lineHeight: 1.55 }}
                    >
                      <span style={{ color: accentColor }}>›</span>
                      <span>{d}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LeaderboardRow({ entry, rank, max, onClick }: { entry: Entry; rank: number; max: number; onClick: () => void }) {
  const pct = (entry.score / max) * 100;
  return (
    <motion.button
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: rank * 0.05 }}
      whileHover={{ scale: 1.01, x: 4 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="w-full text-left flex items-center gap-4 p-4 rounded-xl border relative overflow-hidden group"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: rank * 0.08 }}
        className="absolute inset-y-0 left-0 opacity-20"
        style={{ background: `linear-gradient(90deg, ${badgeColors[entry.badge]}, transparent)` }}
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" style={{ background: `radial-gradient(circle at 30% 50%, ${badgeColors[entry.badge]}33, transparent)` }} />
      <div className="relative w-8 text-center opacity-60" style={{ fontWeight: 700 }}>#{rank + 1}</div>
      <Award size={20} style={{ color: badgeColors[entry.badge] }} className="relative shrink-0" />
      <div className="relative flex-1 min-w-0">
        <div className="truncate" style={{ fontWeight: 500 }}>{entry.name}</div>
        <div className="text-xs opacity-60 truncate">{entry.location}</div>
      </div>
      <div className="relative hidden sm:block px-2 py-1 rounded-full text-xs" style={{ background: `color-mix(in oklab, ${badgeColors[entry.badge]} 20%, transparent)`, color: badgeColors[entry.badge] }}>{badges[entry.badge]}</div>
      <div className="relative" style={{ fontWeight: 600 }}>{entry.score.toLocaleString()}</div>
    </motion.button>
  );
}

function EntryModal({ entry, onClose, story, labels }: { entry: Entry; onClose: () => void; story: string; labels: { tier: string; greenScore: string; wasteProcessed: string; participants: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md"
      style={{ background: "rgba(0,0,0,0.6)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl border overflow-hidden"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-40" style={{ background: `radial-gradient(circle, ${badgeColors[entry.badge]}, transparent)` }} />
        <div className="relative p-8">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
          <div className="flex items-center gap-3">
            <Award size={28} style={{ color: badgeColors[entry.badge] }} />
            <div className="px-2 py-0.5 rounded-full text-xs" style={{ background: `color-mix(in oklab, ${badgeColors[entry.badge]} 20%, transparent)`, color: badgeColors[entry.badge] }}>{badges[entry.badge]} {labels.tier}</div>
          </div>
          <h3 className="mt-3" style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{entry.name}</h3>
          <div className="flex items-center gap-1 mt-1 text-sm opacity-70">
            <MapPin size={14} /> {entry.location}
          </div>
          <p className="mt-5" style={{ color: "var(--muted-foreground)", lineHeight: 1.6 }}>{story}</p>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="p-3 rounded-xl border" style={{ borderColor: "var(--border)" }}>
              <Sparkles size={16} className="text-emerald-500" />
              <div className="mt-2 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{entry.score.toLocaleString()}</div>
              <div className="text-xs opacity-60">{labels.greenScore}</div>
            </div>
            <div className="p-3 rounded-xl border" style={{ borderColor: "var(--border)" }}>
              <Trash2 size={16} className="text-cyan-500" />
              <div className="mt-2" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{entry.waste}</div>
              <div className="text-xs opacity-60">{labels.wasteProcessed}</div>
            </div>
            <div className="p-3 rounded-xl border" style={{ borderColor: "var(--border)" }}>
              <Users size={16} className="text-amber-500" />
              <div className="mt-2" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{entry.participants}</div>
              <div className="text-xs opacity-60">{labels.participants}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Ecosystem() {
  const { t } = useApp();
  const e = t.ecosystem;
  const [cat, setCat] = useState(0);
  const [selected, setSelected] = useState<Entry | null>(null);

  const rows = leaderboardData[cat];
  const max = Math.max(...rows.map((r) => r.score));

  return (
    <PageWrap>
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <FadeIn>
          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">{e.heroTitle}</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto" style={{ color: "var(--muted-foreground)", lineHeight: 1.6 }}>{e.heroSub}</p>
        </FadeIn>
      </section>

      {/* Parahyangan */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <FadeIn>
          <div className="relative rounded-3xl p-8 md:p-12 border overflow-hidden" style={{ borderColor: "var(--border)", background: "linear-gradient(135deg, color-mix(in oklab, #F59E0B 12%, transparent), transparent)" }}>
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, #F59E0B, transparent)" }} />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
                <Flower2 size={26} />
              </div>
              <h2 className="mt-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>{e.parahyanganTitle}</h2>
              <p className="mt-3 max-w-3xl" style={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>{e.parahyanganDesc}</p>
              <FlowDiagram
                steps={e.parahyanganFlow as any}
                stepLabel={e.step}
                details={e.parahyanganFlowDetails as any}
                moreLabel={t.common.more}
                closeLabel={t.common.close}
                accentColor="#F59E0B"
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Pawongan */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <FadeIn>
          <div className="relative rounded-3xl p-8 md:p-12 border overflow-hidden" style={{ borderColor: "var(--border)", background: "linear-gradient(135deg, color-mix(in oklab, #10B981 12%, transparent), transparent)" }}>
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, #10B981, transparent)" }} />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                <Users size={26} />
              </div>
              <h2 className="mt-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>{e.pawonganTitle}</h2>
              <p className="mt-3 max-w-3xl" style={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>{e.pawonganDesc}</p>

              <div className="mt-8">
                <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                  <h3 style={{ fontWeight: 600 }}>{e.leaderboardTitle}</h3>
                  <div className="flex gap-2 flex-wrap">
                    {e.categories.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setCat(i)}
                        className={`px-3 py-1.5 rounded-full border transition-all ${cat === i ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-transparent shadow-lg shadow-emerald-500/30" : "hover:bg-emerald-500/10"}`}
                        style={{ borderColor: cat === i ? "transparent" : "var(--border)", fontSize: "0.85rem" }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs opacity-60 mb-3 flex items-center gap-1.5">
                  <Leaf size={12} /> {e.leaderboardHint}
                </div>

                <AnimatePresence mode="popLayout">
                  <motion.div key={cat} className="space-y-2">
                    {rows.map((row, i) => (
                      <LeaderboardRow key={row.name} entry={row} rank={i} max={max} onClick={() => setSelected(row)} />
                    ))}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 flex gap-3 flex-wrap">
                  {badges.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ borderColor: "var(--border)", fontSize: "0.8rem" }}>
                      <Award size={14} style={{ color: badgeColors[i] }} /> {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Palemahan */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <FadeIn>
          <div className="relative rounded-3xl p-8 md:p-12 border overflow-hidden" style={{ borderColor: "var(--border)", background: "linear-gradient(135deg, color-mix(in oklab, #0EA5E9 12%, transparent), transparent)" }}>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, #0EA5E9, transparent)" }} />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                <Recycle size={26} />
              </div>
              <h2 className="mt-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>{e.palemahanTitle}</h2>
              <p className="mt-3 max-w-3xl" style={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>{e.palemahanDesc}</p>
              <FlowDiagram
                steps={e.palemahanFlow as any}
                stepLabel={e.step}
                details={e.palemahanFlowDetails as any}
                moreLabel={t.common.more}
                closeLabel={t.common.close}
                accentColor="#0EA5E9"
              />
            </div>
          </div>
        </FadeIn>
      </section>

      <AnimatePresence>
        {selected && (
          <EntryModal
            entry={selected}
            onClose={() => setSelected(null)}
            story={e.stories[selected.name] || ""}
            labels={{ tier: e.tier, greenScore: e.greenScore, wasteProcessed: e.wasteProcessed, participants: e.participants }}
          />
        )}
      </AnimatePresence>
    </PageWrap>
  );
}
