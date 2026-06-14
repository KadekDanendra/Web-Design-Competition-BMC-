import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Building2, TrendingUp, BarChart3, FileText, Users, Target, Leaf, Rocket, Sparkles, Mail, Send } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, CartesianGrid } from "recharts";
import { useApp } from "../lib/AppContext";
import { FadeIn, PageWrap } from "../components/Section";
import { GlowCard } from "../components/GlowCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { AnimatedCounter } from "../components/AnimatedCounter";

const icons = [Building2, TrendingUp, BarChart3, FileText, Users, Target, Leaf];

const monthly = [
  { m: "Jan", c: 420, r: 310 },
  { m: "Feb", c: 510, r: 380 },
  { m: "Mar", c: 480, r: 360 },
  { m: "Apr", c: 600, r: 470 },
  { m: "May", c: 720, r: 590 },
  { m: "Jun", c: 810, r: 690 },
];

type FormStage = "idle" | "launching" | "done";

function RocketLaunch({ stage, sendingText, doneTitle, doneText, onSendAnother, sendAnother }: { stage: FormStage; sendingText: string; doneTitle: string; doneText: string; onSendAnother: () => void; sendAnother: string }) {
  return (
    <div className="relative h-[420px] flex flex-col items-center justify-center overflow-hidden">
      {/* Starfield */}
      <div className="relative rounded-3xl overflow-hidden">

  {/* Animated Border */}
  <div className="absolute inset-0 rounded-3xl p-[1px]">
    <motion.div
      className="absolute inset-0 rounded-3xl"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        background:
          "conic-gradient(from 0deg, transparent, #00e5b0, transparent, #00c8ff, transparent)",
      }}
    />
  </div>

  {/* Inner Content */}
  <div className="relative m-[1px] rounded-3xl bg-black h-full">
    
  </div>

</div>

      {/* Glow halo */}
      <motion.div
        animate={{ scale: stage === "done" ? [1, 1.4, 1] : 1, opacity: stage === "done" ? [0.3, 0.6, 0.3] : 0.2 }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-72 h-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #10B981, transparent)" }}
      />

      <AnimatePresence mode="wait">
        {stage === "launching" && (
          <motion.div
            key="launch"
            initial={{ y: 120, opacity: 1, rotate: -8 }}
            animate={{ y: -480, rotate: 8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.7, 0, 0.6, 1] }}
            className="relative"
          >
            {/* Rocket */}
            <div className="relative w-20 h-32">
              {/* Body */}
              <div className="absolute left-1/2 -translate-x-1/2 top-3 w-10 h-20 rounded-t-full bg-gradient-to-b from-white via-emerald-100 to-cyan-200 shadow-2xl shadow-emerald-500/50">
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-cyan-500 ring-2 ring-white" />
              </div>
              {/* Nose */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0 h-0" style={{ borderLeft: "20px solid transparent", borderRight: "20px solid transparent", borderBottom: "16px solid #10B981" }} />
              {/* Fins */}
              <div className="absolute left-0 top-16 w-0 h-0" style={{ borderTop: "16px solid transparent", borderBottom: "16px solid transparent", borderRight: "16px solid #0EA5E9" }} />
              <div className="absolute right-0 top-16 w-0 h-0" style={{ borderTop: "16px solid transparent", borderBottom: "16px solid transparent", borderLeft: "16px solid #0EA5E9" }} />
              {/* Window glow */}
              <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 0.8, repeat: Infinity }} className="absolute top-5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full blur-md bg-cyan-300" />

              {/* Flame */}
              <motion.div
                animate={{ scaleY: [1, 1.4, 0.9, 1.3, 1], scaleX: [1, 0.8, 1.1, 0.9, 1] }}
                transition={{ duration: 0.2, repeat: Infinity }}
                className="absolute left-1/2 -translate-x-1/2 top-[88px] w-8 h-16 origin-top"
                style={{ background: "linear-gradient(to bottom, #FBBF24, #F97316, #EF4444, transparent)", borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%", filter: "blur(2px)" }}
              />
              <motion.div
                animate={{ scaleY: [1, 1.3, 1] }}
                transition={{ duration: 0.15, repeat: Infinity }}
                className="absolute left-1/2 -translate-x-1/2 top-[88px] w-4 h-10 origin-top"
                style={{ background: "linear-gradient(to bottom, white, #FBBF24, transparent)", borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%" }}
              />
            </div>

            {/* Smoke trail */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 100, opacity: 0.8, scale: 0.6 }}
                animate={{ y: 300, opacity: 0, scale: 2 }}
                transition={{ duration: 1.2, delay: i * 0.1, repeat: Infinity }}
                className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gray-300/40 blur-md"
                style={{ top: 120 }}
              />
            ))}
          </motion.div>
        )}

        {stage === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="relative text-center px-6 z-10"
          >
            {/* Confetti sparkles */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{ x: Math.cos(angle) * 160, y: Math.sin(angle) * 160, opacity: 0, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.1 + i * 0.04, ease: "easeOut" }}
                  className="absolute left-1/2 top-8 w-1.5 h-1.5 rounded-full"
                  style={{ background: i % 2 ? "#10B981" : "#0EA5E9" }}
                />
              );
            })}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-emerald-500/40"
            >
              <Mail size={36} className="text-white" />
            </motion.div>
            <div className="mt-6 flex items-center justify-center gap-2 text-emerald-400">
              <Sparkles size={14} />
              <span style={{ fontSize: "0.8rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Delivered</span>
              <Sparkles size={14} />
            </div>
            <h3 className="mt-3" style={{ fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{doneTitle}</h3>
            <p className="mt-3 max-w-md mx-auto" style={{ color: "var(--muted-foreground)", lineHeight: 1.6 }}>{doneText}</p>
            <Button onClick={onSendAnother} variant="outline" className="mt-6 rounded-full">
              <Send size={14} className="mr-1" /> {sendAnother}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === "launching" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-6 left-0 right-0 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <Rocket size={14} className="text-emerald-500" />
            <span style={{ fontSize: "0.85rem" }}>{sendingText}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function Corporate() {
  const { t } = useApp();
  const c = t.corporate;
  const [stage, setStage] = useState<FormStage>("idle");
  const [form, setForm] = useState({ company: "", industry: "", email: "", phone: "", message: "" });

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setStage("launching");
    setTimeout(() => setStage("done"), 1700);
  };

  const reset = () => {
    setForm({ company: "", industry: "", email: "", phone: "", message: "" });
    setStage("idle");
  };

  return (
    <PageWrap>
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <FadeIn>
          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">{c.heroTitle}</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto" style={{ color: "var(--muted-foreground)", lineHeight: 1.6 }}>{c.heroSub}</p>
        </FadeIn>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <FadeIn><h2 className="text-center" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>{c.whyTitle}</h2></FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {c.reasons.map((r, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={i} delay={i * 0.05} className="h-full">
                <GlowCard
                  expanded={
                    <ul className="space-y-1.5" style={{ color: "var(--muted-foreground)", fontSize: "0.88rem" }}>
                      {r.details.map((d, k) => (
                        <li key={k} className="flex gap-2"><span className="text-emerald-500">›</span>{d}</li>
                      ))}
                    </ul>
                  }
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4" style={{ fontWeight: 600 }}>{r.t}</h3>
                  <p className="mt-2" style={{ color: "var(--muted-foreground)", fontSize: "0.92rem", lineHeight: 1.6 }}>{r.d}</p>
                </GlowCard>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Dashboard */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <FadeIn><h2 className="text-center mb-10" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>{c.dashboardTitle}</h2></FadeIn>
        <FadeIn>
          <div className="rounded-3xl border p-6 md:p-8" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {c.dashboardStats.map((s, i) => (
                <div key={i} className="p-4 rounded-2xl border" style={{ borderColor: "var(--border)" }}>
                  <div style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>{s.l}</div>
                  <div className="mt-1 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
                    <AnimatedCounter value={s.v} />{s.s}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl border" style={{ borderColor: "var(--border)" }}>
                <div className="mb-3" style={{ fontWeight: 600 }}>{c.chartCollection}</div>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={monthly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                    <Line type="monotone" dataKey="c" stroke="#10B981" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="r" stroke="#0EA5E9" strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="p-4 rounded-2xl border" style={{ borderColor: "var(--border)" }}>
                <div className="mb-3" style={{ fontWeight: 600 }}>{c.chartProgress}</div>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={monthly}>
                    <defs>
                      <linearGradient id="tdrBarGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#0EA5E9" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8}} cursor={{fill: "rgba(0, 255, 180, 0.15)"}}/>
                    <Bar dataKey="r" fill="url(#tdrBarGrad)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <FadeIn>
          <h2 className="text-center" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>{c.formTitle}</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <motion.div
            layout
            className="mt-10 p-8 rounded-3xl border relative overflow-hidden"
            style={{ borderColor: "var(--border)", background: "var(--card)" }}
          >
            {stage === "idle" ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={onSubmit}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5" style={{ fontSize: "0.88rem" }}>{c.fields.company}</label>
                    <Input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </div>
                  <div>
                    <label className="block mb-1.5" style={{ fontSize: "0.88rem" }}>{c.fields.industry}</label>
                    <Input required value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
                  </div>
                  <div>
                    <label className="block mb-1.5" style={{ fontSize: "0.88rem" }}>{c.fields.email}</label>
                    <Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="block mb-1.5" style={{ fontSize: "0.88rem" }}>{c.fields.phone}</label>
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block mb-1.5" style={{ fontSize: "0.88rem" }}>{c.fields.message}</label>
                  <Textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <Button type="submit" size="lg" className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 border-0 text-white group">
                  <Rocket size={16} className="mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  {c.submit}
                </Button>
              </motion.form>
            ) : (
              <RocketLaunch
                stage={stage}
                sendingText={c.sending}
                doneTitle={c.submittedTitle}
                doneText={c.submitted}
                onSendAnother={reset}
                sendAnother={c.sendAnother}
              />
            )}
          </motion.div>
        </FadeIn>
      </section>
    </PageWrap>
  );
}
