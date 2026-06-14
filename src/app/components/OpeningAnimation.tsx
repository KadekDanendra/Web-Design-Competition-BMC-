import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export const REPLAY_OPENING_EVENT = "tdr:replay-opening";

export function replayOpening() {
  window.dispatchEvent(new Event(REPLAY_OPENING_EVENT));
}

export function OpeningAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const start = () => {
      setShow(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShow(false), 2600);
    };
    timer = setTimeout(() => setShow(false), 2600);
    window.addEventListener(REPLAY_OPENING_EVENT, start);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(REPLAY_OPENING_EVENT, start);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "radial-gradient(circle at 50% 50%, #0a1410 0%, #000000 70%)" }}
        >
          {/* Ambient orbs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute w-[640px] h-[640px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, #10B981 0%, transparent 60%)" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, delay: 0.15, ease: "easeOut" }}
            className="absolute w-[480px] h-[480px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, #0EA5E9 0%, transparent 60%)" }}
          />

          {/* Particle ring */}
          {Array.from({ length: 28 }).map((_, i) => {
            const angle = (i / 28) * Math.PI * 2;
            const radius = 200 + (i % 4) * 40;
            return (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: Math.cos(angle) * radius,
                  y: Math.sin(angle) * radius,
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2.4, delay: 0.2 + (i % 6) * 0.04, ease: "easeOut" }}
                className="absolute w-1 h-1 rounded-full"
                style={{ background: i % 2 ? "#10B981" : "#0EA5E9", boxShadow: "0 0 8px currentColor" }}
              />
            );
          })}

          {/* Logo + name */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.4, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg width="140" height="140" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="openA" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#10B981" />
                    <stop offset="1" stopColor="#34D399" />
                  </linearGradient>
                  <linearGradient id="openB" x1="44" y1="0" x2="0" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#14B8A6" />
                    <stop offset="1" stopColor="#22D3EE" />
                  </linearGradient>
                  <linearGradient id="openC" x1="22" y1="44" x2="22" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0EA5E9" />
                    <stop offset="1" stopColor="#10B981" />
                  </linearGradient>
                  <linearGradient id="openRing" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#10B981" />
                    <stop offset="1" stopColor="#0EA5E9" />
                  </linearGradient>
                  <radialGradient id="openSeed" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#A7F3D0" />
                  </radialGradient>
                </defs>

                {/* Animated ring arcs */}
                <g stroke="url(#openRing)" strokeWidth="1.2" strokeLinecap="round" fill="none">
                  <motion.path d="M 22 4 A 18 18 0 0 1 37.59 13" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.2 }} />
                  <motion.path d="M 37.59 31 A 18 18 0 0 1 22 40" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.35 }} />
                  <motion.path d="M 6.41 31 A 18 18 0 0 1 6.41 13" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.5 }} />
                </g>

                {/* Petals one by one */}
                <g transform="translate(22 22)">
                  {[
                    { rot: 0, fill: "url(#openA)" },
                    { rot: 120, fill: "url(#openB)" },
                    { rot: 240, fill: "url(#openC)" },
                  ].map((p, i) => (
                    <g
                      key={i}
                      transform={`rotate(${p.rot})`}
                    >
                      <motion.g
                        initial={{
                        scale: 0,
                        opacity: 0,
                        y: 10,
                      }}

                      animate={{
                        scale: 1,
                        opacity: 1,
                        y: 0,
                      }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                          delay: 0.9 + i * 0.12,
                        }}
                      >
                        <path
                          d="M 0 0 C -6 -4 -6 -12 0 -16 C 6 -12 6 -4 0 0 Z"
                          fill={p.fill}
                        />

                        <path
                          d="M 0 -2 L 0 -14"
                          stroke="rgba(255,255,255,0.45)"
                          strokeWidth="0.8"
                          strokeLinecap="round"
                        />
                      </motion.g>
                    </g>
                  ))}
                </g>

                {/* Seed pop */}
                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 320, damping: 16, delay: 1.4 }} style={{ transformOrigin: "22px 22px" }}>
                  <circle cx="22" cy="22" r="3.2" fill="url(#openSeed)" />
                  <circle cx="22" cy="22" r="1.4" fill="#10B981" />
                </motion.g>
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="mt-6 text-center"
            >
              <div className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent" style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em" }}>
                Tri Dharma Recovery
              </div>
              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.3em" }}
                transition={{ duration: 0.9, delay: 1.7 }}
                className="mt-2 uppercase"
                style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}
              >
                Circular Economy · Bali
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 180, opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.9 }}
              className="mt-7 h-px overflow-hidden rounded-full"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.9, delay: 2, ease: "easeInOut" }}
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
