import { motion } from "framer-motion";
import { ArrowDown, Truck, ShieldCheck, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-mist">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-pea-shoot/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-kale/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pea-shoot/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 bg-pea-shoot/15 text-pea-dark px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <span className="w-2 h-2 bg-pea-shoot rounded-full animate-pulse" />
              Segar setiap hari dari Tidar Sayur
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-6xl lg:text-7xl font-black text-kale leading-[1.05] tracking-tight mb-6">
              Sayur
              <span className="block text-pea-dark">Segar,</span>
              <span className="block text-kale/60 font-light italic">Langsung ke</span>
              <span className="block">Meja Anda.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-10">
              Belanja sayur harian jadi lebih mudah, cepat, dan praktis.
              Tidar Sayur menghadirkan pilihan sayuran segar untuk kebutuhan
              dapur keluarga di Malang.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#products" className="inline-flex items-center justify-center gap-2 bg-kale hover:bg-kale/90 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-kale/25">
                Lihat Produk
                <ArrowDown className="w-4 h-4" />
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-white border border-border hover:bg-secondary text-kale font-semibold px-8 py-4 rounded-2xl text-base transition-all duration-200">
                Hubungi Kami
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-6">
              {[
                { icon: ShieldCheck, label: "Kualitas Terjaga" },
                { icon: Truck, label: "Area Malang" },
                { icon: Zap, label: "Order via WhatsApp" },
              ].map(({ icon: IconComp, label }) => (
                <div key={label} className="flex items-center gap-2 text-pea-dark font-semibold text-sm">
                  <IconComp className="w-4 h-4" />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="relative hidden lg:block">
            <div className="relative bg-gradient-to-br from-pea-shoot/20 to-kale/10 rounded-[3rem] p-8 border border-pea-shoot/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-lemon/30 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/60 shadow-xl col-span-2 text-center">
                  <div className="text-5xl mb-3">🥬🥕🍅</div>
                  <h3 className="font-bold text-kale text-lg">Belanja Lebih Praktis</h3>
                  <p className="text-muted-foreground text-sm mt-1">Pilih, keranjang, checkout via WhatsApp</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 border border-white/60 shadow-lg flex flex-col items-center text-center gap-2">
                  <span className="text-3xl">🚚</span>
                  <p className="font-bold text-kale text-sm">Siap Antar</p>
                  <p className="text-muted-foreground text-xs">Malang & sekitar</p>
                </div>
                <div className="bg-kale rounded-3xl p-5 shadow-lg flex flex-col items-center text-center gap-2">
                  <span className="text-3xl">💚</span>
                  <p className="font-bold text-white text-sm">Fresh Daily</p>
                  <p className="text-white/70 text-xs">Dipilih setiap hari</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}