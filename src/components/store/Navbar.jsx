import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Promo", href: "#promo" },
    { label: "Produk", href: "#products" },
    { label: "Tentang Kami", href: "#about" },
    { label: "Kontak", href: "#contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-border" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-kale rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl text-kale tracking-tight">
              Tidar<span className="text-pea-dark">Sayur</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-foreground/70 hover:text-kale transition-colors duration-200">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={onCartOpen} className="relative flex items-center justify-center w-11 h-11 bg-secondary hover:bg-kale/10 rounded-2xl transition-colors duration-200 group" aria-label="Buka keranjang">
              <ShoppingCart className="w-5 h-5 text-kale" />
              {cartCount > 0 && (
                <motion.span key={cartCount} initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-destructive text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </motion.span>
              )}
            </button>
            <button className="md:hidden flex items-center justify-center w-11 h-11 bg-secondary rounded-2xl transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5 text-kale" /> : <Menu className="w-5 h-5 text-kale" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="md:hidden bg-white/98 border-b border-border px-6 pb-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-foreground/70 hover:text-kale border-b border-border/50 last:border-0">
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}