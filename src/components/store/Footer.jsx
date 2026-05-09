import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-kale text-white/80 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-white text-lg">TidarSayur</span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Sayur segar, langsung ke meja Anda. Praktis dipesan, nyaman untuk kebutuhan harian.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Navigasi</h4>
            <div className="space-y-2">
              {["#home", "#promo", "#products", "#about", "#contact"].map((href, i) => {
                const labels = ["Home", "Promo", "Produk", "Tentang Kami", "Kontak"];
                return (
                  <a key={href} href={href} className="block text-sm hover:text-white transition-colors">
                    {labels[i]}
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Sosial Media</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm hover:text-white transition-colors">📸 Instagram</a>
              <a href="https://wa.me/628XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="block text-sm hover:text-white transition-colors">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/15 pt-6 text-sm text-white/40">
          © 2025 Tidar Sayur — Malang
        </div>
      </div>
    </footer>
  );
}