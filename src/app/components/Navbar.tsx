import { NavLink, Link, useNavigate } from "react-router";
import { Languages, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useApp } from "../lib/AppContext";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { replayOpening } from "./OpeningAnimation";

export function Navbar() {
  const { lang, setLang, t } = useApp();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate("/");
    replayOpening();
  };

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/products", label: t.nav.products },
    { to: "/ecosystem", label: t.nav.ecosystem },
    { to: "/corporate", label: t.nav.corporate },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-xl border-b"
      style={{ background: "color-mix(in oklab, var(--background) 80%, transparent)", borderColor: "var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo onClick={onLogoClick} className="hover:opacity-90 transition-opacity" />

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-full transition-colors ${isActive ? "text-emerald-600 dark:text-emerald-400" : "hover:text-emerald-600 dark:hover:text-emerald-400"}`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ background: "color-mix(in oklab, #10B981 12%, transparent)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border hover:bg-emerald-500/10 transition-colors"
            style={{ borderColor: "var(--border)" }}
            aria-label="Toggle language"
          >
            <Languages size={14} />
            <span style={{ fontSize: "0.8rem" }}>{lang.toUpperCase()}</span>
            <span
              className="relative inline-block w-8 h-4 rounded-full transition-colors"
              style={{ background: lang === "en" ? "#10B981" : "var(--switch-background)" }}
            >
              <motion.span
                className="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow"
                animate={{ left: lang === "en" ? 16 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </span>
          </button>

          <Link to="/corporate" className="hidden md:block">
            <Button className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 border-0 text-white">
              {t.nav.partner}
            </Button>
          </Link>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? "bg-emerald-500/10 text-emerald-600" : ""}`}
                >
                  {l.label}
                </NavLink>
              ))}
              <button
                onClick={() => setLang(lang === "id" ? "en" : "id")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-left sm:hidden"
              >
                <Languages size={16} /> {t.common.switchLang}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
