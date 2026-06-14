import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import { AppProvider } from "./lib/AppContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { OpeningAnimation } from "./components/OpeningAnimation";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Ecosystem from "./pages/Ecosystem";
import Corporate from "./pages/Corporate";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/ecosystem" element={<Ecosystem />} />
        <Route path="/corporate" element={<Corporate />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <OpeningAnimation />
        <div className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
          <Navbar />
          <div className="flex-1">
            <AnimatedRoutes />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
