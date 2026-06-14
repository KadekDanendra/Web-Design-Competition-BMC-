import { Target, Heart, Sparkles, Check, Rocket, Network, Building2, Globe2, Quote } from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../lib/AppContext";
import { FadeIn, PageWrap } from "../components/Section";

const roadmapAccent = [
  { icon: Rocket, tag: "Foundation", quote: "Akar yang kuat untuk pertumbuhan jangka panjang.", quoteEn: "Strong roots for long-term growth." },
  { icon: Network, tag: "Connection", quote: "Menghubungkan ekosistem dari hulu ke hilir.", quoteEn: "Connecting the ecosystem end to end." },
  { icon: Building2, tag: "Innovation", quote: "Inovasi yang berakar pada kearifan lokal.", quoteEn: "Innovation rooted in local wisdom." },
  { icon: Globe2, tag: "Leadership", quote: "Memimpin gerakan circular economy ASEAN.", quoteEn: "Leading ASEAN's circular economy movement." },
];

export default function About() {
  const { t, lang } = useApp();
  const a = t.about;

  return (
    <PageWrap>
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <FadeIn>
          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">{a.heroTitle}</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto" style={{ color: "var(--muted-foreground)", fontSize: "1.05rem", lineHeight: 1.6 }}>{a.heroDesc}</p>
        </FadeIn>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-6">
        <FadeIn>
          <motion.div whileHover={{ y: -4 }} className="p-8 rounded-2xl border h-full" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white mb-4">
              <Target size={22} />
            </div>
            <h2 style={{ fontWeight: 600 }}>{a.vision}</h2>
            <p className="mt-3" style={{ color: "var(--muted-foreground)", lineHeight: 1.65 }}>{a.visionText}</p>
          </motion.div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <motion.div whileHover={{ y: -4 }} className="p-8 rounded-2xl border h-full" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white mb-4">
              <Heart size={22} />
            </div>
            <h2 style={{ fontWeight: 600 }}>{a.mission}</h2>
            <ul className="mt-3 space-y-2">
              {a.missionList.map((m, i) => (
                <li key={i} className="flex gap-2" style={{ color: "var(--muted-foreground)" }}>
                  <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </FadeIn>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <FadeIn>
          <div className="rounded-3xl p-10 md:p-14" style={{ background: "linear-gradient(135deg, color-mix(in oklab, #10B981 12%, transparent), color-mix(in oklab, #0EA5E9 12%, transparent))" }}>
            <Sparkles className="text-emerald-500" />
            <h2 className="mt-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>{a.storyTitle}</h2>
            <p className="mt-4 max-w-3xl" style={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>{a.storyDesc}</p>
          </div>
        </FadeIn>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <FadeIn><h2 className="text-center" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>{a.roadmap}</h2></FadeIn>
        <div className="mt-12 relative">
          <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} style={{ originY: 0 }} className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block" >
            <div className="w-full h-full bg-gradient-to-b from-emerald-500 via-cyan-500 to-transparent" />
          </motion.div>
          <div className="space-y-8">
            {a.roadmapItems.map((r, i) => {
              const accent = roadmapAccent[i] ?? roadmapAccent[0];
              const Icon = accent.icon;
              const quote = lang === "id" ? accent.quote : accent.quoteEn;
              const card = (
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative p-6 rounded-2xl border overflow-hidden group"
                  style={{ borderColor: "var(--border)", background: "var(--card)" }}
                >
                  <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" style={{ background: "radial-gradient(circle, #10B981, transparent)" }} />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "color-mix(in oklab, #10B981 15%, transparent)", color: "#10B981", letterSpacing: "0.08em", fontWeight: 600 }}>
                        PHASE {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent" style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{r.y}</div>
                    <h3 className="mt-1" style={{ fontWeight: 600 }}>{r.t}</h3>
                    <p className="mt-3" style={{ color: "var(--muted-foreground)", fontSize: "0.92rem", lineHeight: 1.65 }}>{r.d}</p>
                  </div>
                </motion.div>
              );

              const side = (
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative hidden md:flex items-center ${i % 2 === 0 ? "justify-start pl-6" : "justify-end pr-6"}`}
                >
                  {/* Decorative ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute w-48 h-48 rounded-full border-2 border-dashed opacity-40"
                    style={{ borderColor: "color-mix(in oklab, #10B981 50%, transparent)" }}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    className="absolute w-32 h-32 rounded-full border border-dashed opacity-30"
                    style={{ borderColor: "#0EA5E9" }}
                  />
                  {/* Pulse halo */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-40 h-40 rounded-full blur-3xl"
                    style={{ background: "radial-gradient(circle, #10B981, transparent 70%)" }}
                  />

                  {/* Center medallion */}
                  <div className="relative flex flex-col items-center gap-3 px-4 py-5 rounded-2xl backdrop-blur-sm"
                    style={{ background: "color-mix(in oklab, var(--card) 50%, transparent)", border: "1px solid var(--border)" }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/40"
                    >
                      <Icon size={24} />
                    </motion.div>
                    <div className="text-xs uppercase tracking-widest" style={{ color: "#0EA5E9", fontWeight: 700 }}>{accent.tag}</div>
                    <div className="flex items-start gap-1.5 max-w-[200px] text-center">
                      <Quote size={12} className="text-emerald-500 shrink-0 mt-1" />
                      <p className="italic" style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", lineHeight: 1.5 }}>{quote}</p>
                    </div>
                  </div>
                </motion.div>
              );

              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="flex-1 w-full">{card}</div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.2 }}
                      className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 shrink-0 shadow-lg shadow-emerald-500/50 ring-4 ring-emerald-500/20"
                    />
                    <div className="flex-1 w-full">{side}</div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </PageWrap>
  );
}
