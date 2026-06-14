import { Link } from "react-router";
import { Logo } from "./Logo";
import { useApp } from "../lib/AppContext";
import { Instagram, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const { t } = useApp();
  return (
    <footer className="border-t mt-24" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm" style={{ color: "var(--muted-foreground)" }}>{t.footer.tagline}</p>
          <div className="flex gap-3 mt-6">
            {[Instagram, Linkedin, Twitter, Mail].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-full border hover:bg-emerald-500/10 hover:border-emerald-500 transition-all" style={{ borderColor: "var(--border)" }}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3">{t.footer.navigation}</h4>
          <ul className="space-y-2" style={{ color: "var(--muted-foreground)" }}>
            <li><Link to="/" className="hover:text-emerald-500">{t.nav.home}</Link></li>
            <li><Link to="/about" className="hover:text-emerald-500">{t.nav.about}</Link></li>
            <li><Link to="/products" className="hover:text-emerald-500">{t.nav.products}</Link></li>
            <li><Link to="/ecosystem" className="hover:text-emerald-500">{t.nav.ecosystem}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3">{t.footer.contact}</h4>
          <ul className="space-y-2" style={{ color: "var(--muted-foreground)" }}>
            <li>hello@tridharma.id</li>
            <li>+62 819 363 90915</li>
            <li>Denpasar, Bali</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
        Design By Danendra.
      </div>
    </footer>
  );
}
