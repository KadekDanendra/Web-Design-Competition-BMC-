import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sprout, Recycle, Sofa, Truck, Factory, BarChart3, MapPin } from "lucide-react";
import { useApp } from "../lib/AppContext";
import { FadeIn, PageWrap } from "../components/Section";
import { GlowCard } from "../components/GlowCard";

const productIcons: Record<string, any> = { compost: Sprout, plastic: Recycle, furniture: Sofa };
const serviceIcons = [Truck, Factory, BarChart3, MapPin];

export default function Products() {
  const { t } = useApp();
  const p = t.products;
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? p.products : p.products.filter((x) => x.c === filter);
  const categories = [
    { id: "all", label: p.all },
    { id: "compost", label: p.catCompost },
    { id: "plastic", label: p.catPlastic },
    { id: "furniture", label: p.catFurniture },
  ];

  return (
    <PageWrap>
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <FadeIn>
          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">{p.heroTitle}</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto" style={{ color: "var(--muted-foreground)", lineHeight: 1.6 }}>{p.heroDesc}</p>
        </FadeIn>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700 }}>{p.productsLabel}</h2>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-4 py-2 rounded-full border transition-all ${filter === c.id ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-transparent" : ""}`}
                style={{ borderColor: filter === c.id ? "transparent" : "var(--border)" }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((prod, i) => {
              const Icon = productIcons[prod.c];
              return (
                <motion.div
                  key={prod.n}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="h-full"
                >
                  <GlowCard
                    expanded={
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs opacity-60 mb-1">{p.usageLabel}</div>
                          <ul className="space-y-1" style={{ color: "var(--muted-foreground)", fontSize: "0.88rem" }}>
                            {prod.uses.map((u, k) => <li key={k} className="flex gap-2"><span className="text-emerald-500">›</span>{u}</li>)}
                          </ul>
                        </div>
                        <div>
                          <div className="text-xs opacity-60 mb-1">{p.specLabel}</div>
                          <div style={{ fontSize: "0.88rem" }}>{prod.spec}</div>
                        </div>
                      </div>
                    }
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                      <Icon size={26} />
                    </div>
                    <h3 className="mt-5" style={{ fontWeight: 600 }}>{prod.n}</h3>
                    <p className="mt-2" style={{ color: "var(--muted-foreground)", fontSize: "0.92rem", lineHeight: 1.6 }}>{prod.d}</p>
                  </GlowCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="mb-8" style={{ fontSize: "1.75rem", fontWeight: 700 }}>{p.servicesLabel}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {p.services.map((s, i) => {
            const Icon = serviceIcons[i];
            return (
              <FadeIn key={i} delay={i * 0.08} className="h-full">
                <GlowCard
                  glowColor="#0EA5E9"
                  expanded={
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs opacity-60 mb-1">{p.suitableFor}</div>
                        <ul className="space-y-1" style={{ color: "var(--muted-foreground)", fontSize: "0.85rem" }}>
                          {s.uses.map((u, k) => <li key={k} className="flex gap-2"><span className="text-cyan-500">›</span>{u}</li>)}
                        </ul>
                      </div>
                      <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.spec}</div>
                    </div>
                  }
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-emerald-400 shadow-lg shadow-cyan-500/20" style={{ background: "color-mix(in oklab, #10B981 12%, transparent)" }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4" style={{ fontWeight: 600 }}>{s.n}</h3>
                  <p className="mt-2" style={{ color: "var(--muted-foreground)", fontSize: "0.9rem", lineHeight: 1.6 }}>{s.d}</p>
                </GlowCard>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </PageWrap>
  );
}
