import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Recycle, Leaf, Factory, Sprout, Sparkles } from "lucide-react";
import { useApp } from "../lib/AppContext";
import { Button } from "../components/ui/button";
import { FadeIn, PageWrap } from "../components/Section";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { GlowCard } from "../components/GlowCard";

const stepIcons = [Recycle, Factory, Sprout, Leaf];
const EASE = [0.22, 1, 0.36, 1] as const;

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

function HeroVisual() {
  const orbitIcons = [Leaf, Factory, Sprout, Sparkles];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: EASE }}
      className="relative aspect-square w-full max-w-sm md:max-w-md mx-auto"
    >
      {/* Outer orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-dashed"
        style={{ borderColor: "color-mix(in oklab, #10B981 35%, transparent)" }}
      />
      {/* Inner orbit ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute inset-12 rounded-full border-2 border-dashed"
        style={{ borderColor: "color-mix(in oklab, #0EA5E9 35%, transparent)" }}
      />

      {/* Pulse halo behind center */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-1/4 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, #10B981, transparent 70%)" }}
      />

      {/* Center disc */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-emerald-500/40"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          >
            <Recycle size={72} className="text-white" strokeWidth={1.75} />
          </motion.div>
        </motion.div>
      </div>

      {/* Orbiting icons — wrapper rotates, inner counter-rotates to stay upright */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {orbitIcons.map((Icon, i) => {
          const angle = (i * 90 * Math.PI) / 180;
          const r = 45;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `calc(50% + ${Math.cos(angle) * r}% - 24px)`,
                top: `calc(50% + ${Math.sin(angle) * r}% - 24px)`,
              }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg shadow-emerald-500/20"
                style={{
                  background: "color-mix(in oklab, var(--card) 85%, transparent)",
                  border: "1px solid var(--border)",
                }}
              >
                <Icon size={20} className="text-emerald-400" />
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Floating sparkle particles */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i * 60 * Math.PI) / 180;
        return (
          <motion.div
            key={`s-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400"
            style={{
              left: `calc(50% + ${Math.cos(a) * 38}%)`,
              top: `calc(50% + ${Math.sin(a) * 38}%)`,
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
          />
        );
      })}
    </motion.div>
  );
}

export default function Home() {
  const { t } = useApp();
  const h = t.home;
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <PageWrap>
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(circle, #10B981, transparent)" }}
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 right-0 w-96 h-96 rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(circle, #0EA5E9, transparent)" }}
          />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          <motion.div variants={heroContainer} initial="hidden" animate="show">
            <motion.div
              variants={heroItem}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
              style={{ borderColor: "var(--border)", background: "color-mix(in oklab, #10B981 8%, transparent)" }}
            >
              <motion.span
                animate={{ rotate: [0, 15, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles size={14} className="text-emerald-400" />
              </motion.span>
              <span style={{ fontSize: "0.8rem" }}>Tri Hita Karana × Circular Economy</span>
            </motion.div>

            <motion.h1
              variants={heroItem}
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              {h.heroTitle.split(" ").slice(0, -2).join(" ")}{" "}
              <motion.span
                className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent inline-block"
                style={{ backgroundSize: "200% 100%", paddingBottom: "0.15em" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                {h.heroTitle.split(" ").slice(-2).join(" ")}
              </motion.span>
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mt-6 max-w-xl"
              style={{ color: "var(--muted-foreground)", fontSize: "1.05rem", lineHeight: 1.6 }}
            >
              {h.heroSub}
            </motion.p>

            <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-3">
              <Link to="/ecosystem">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
                  <Button size="lg" className="relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 border-0 text-white group shadow-lg shadow-emerald-500/30">
                    <span className="relative z-10 flex items-center">
                      {h.ctaPrimary}
                      <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.span
                      className="absolute inset-0 -translate-x-full"
                      style={{ background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent)" }}
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                    />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/corporate">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
                  <Button size="lg" variant="outline" className="rounded-full">{h.ctaSecondary}</Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          <HeroVisual />
        </motion.div>
      </section>

      {/* Problem */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <FadeIn>
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, color-mix(in oklab, #10B981 10%, transparent), color-mix(in oklab, #0EA5E9 10%, transparent))" }}
          >
            <motion.div
              animate={{ x: ["-20%", "120%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 -left-1/4 w-1/2 h-full opacity-30"
              style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, #10B981 30%, transparent), transparent)" }}
            />
            <div className="relative">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                {h.problemTitle}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                className="mt-5 max-w-3xl mx-auto"
                style={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}
              >
                {h.problemDesc}
              </motion.p>
            </div>
          </motion.div>
        </FadeIn>
      </section>

      {/* How */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <FadeIn>
          <h2 className="text-center" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            {h.howTitle}
          </h2>
        </FadeIn>
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {h.steps.map((s, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
                }}
                className="h-full"
              >
                <GlowCard
                  expanded={
                    <ul className="space-y-1.5" style={{ color: "var(--muted-foreground)", fontSize: "0.88rem" }}>
                      {s.details.map((d, k) => (
                        <li key={k} className="flex gap-2"><span className="text-emerald-500">›</span>{d}</li>
                      ))}
                    </ul>
                  }
                >
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30"
                    >
                      <Icon size={22} />
                    </motion.div>
                    <span className="text-5xl font-bold opacity-10">0{i + 1}</span>
                  </div>
                  <h3 style={{ fontWeight: 600 }}>{s.t}</h3>
                  <p className="mt-2" style={{ color: "var(--muted-foreground)", fontSize: "0.92rem", lineHeight: 1.6 }}>{s.d}</p>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Impact */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <FadeIn>
          <h2 className="text-center" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            {h.impactTitle}
          </h2>
        </FadeIn>
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12"
        >
          {h.stats.map((s, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 220, damping: 18 } },
              }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="relative p-6 rounded-2xl border text-center overflow-hidden group cursor-default"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" style={{ background: "radial-gradient(circle at center, #10B98133, transparent 60%)" }} />
              <div className="relative bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent" style={{ fontSize: "2.25rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
                <AnimatedCounter value={s.v} />{s.s}
              </div>
              <p className="relative mt-2" style={{ color: "var(--muted-foreground)", fontSize: "0.88rem" }}>{s.l}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <FadeIn>
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center text-white"
            style={{ background: "linear-gradient(135deg, #10B981, #0EA5E9)" }}
          >
            <motion.div
              animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/15 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl"
            />
            <div className="relative">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                {h.finalTitle}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                className="mt-5 max-w-2xl mx-auto opacity-95"
              >
                {h.finalDesc}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                className="inline-block mt-8"
              >
                <Link to="/corporate">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
                    <Button size="lg" className="rounded-full bg-white text-emerald-600 hover:bg-white/90 group">
                      {h.finalCta}
                      <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </FadeIn>
      </section>
    </PageWrap>
  );
}
