import { ReactNode, useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useApp } from "../lib/AppContext";

type Props = {
  children: ReactNode;
  expanded?: ReactNode;
  className?: string;
  glowColor?: string;
};

export function GlowCard({ children, expanded, className = "", glowColor = "#10B981" }: Props) {
  const { t } = useApp();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onClick={() => expanded && setOpen(!open)}
      layout
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative h-full flex flex-col rounded-2xl border overflow-hidden group ${expanded ? "cursor-pointer" : ""} ${className}`}
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      {/* Mouse-follow glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${glowColor}33, transparent 40%)`,
        }}
      />
      {/* Outer glow ring */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-500 -z-10"
        style={{ background: `linear-gradient(135deg, ${glowColor}, #0EA5E9)` }}
      />
      <motion.div layout className="relative p-6 flex-1 flex flex-col">
        {children}
        {expanded && (
          <div className="flex items-center gap-1 mt-4 text-xs text-emerald-500">
            <span>{open ? t.common.close : t.common.more}</span>
            <motion.span animate={{ rotate: open ? 180 : 0 }}>
              <ChevronDown size={14} />
            </motion.span>
          </div>
        )}
        <AnimatePresence initial={false}>
          {open && expanded && (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t" style={{ borderColor: "var(--border)" }}>
                {expanded}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
