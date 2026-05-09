import { motion } from "framer-motion";
import { Leaf, ShoppingCart, Zap, MapPin } from "lucide-react";

const whyUs = [
  { icon: Leaf, text: "Produk sayur harian dengan tampilan toko yang mudah digunakan." },
  { icon: ShoppingCart, text: "Ada keranjang belanja untuk ringkasan pesanan sebelum checkout." },
  { icon: Zap, text: "Bisa beli langsung per produk melalui WhatsApp." },
  { icon: MapPin, text: "Cocok untuk kebutuhan rumah tangga, kos, dan usaha kuliner kecil." },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-mist">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-secondary text-pea-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🌱 Tentang Kami
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-kale">Tentang Tidar Sayur</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Toko sayur lokal yang berfokus pada kesegaran produk, kemudahan pemesanan, dan pelayanan ramah.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 border border-border shadow-sm"
          >
            <h3 className="font-bold text-kale text-2xl mb-4">Profil Toko</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Tidar Sayur hadir untuk membantu keluarga mendapatkan sayur segar tanpa harus repot ke pasar.
              Kami menyediakan aneka sayur pilihan harian dengan proses pemesanan yang sederhana.
            </p>
            <div className="space-y-3">
              {[
                { label: "Visi", text: "Menjadi toko sayur lokal terpercaya di Malang yang praktis, segar, dan terjangkau." },
                { label: "Misi", text: "Menyediakan sayur berkualitas, menjaga harga tetap ramah, dan memudahkan pemesanan digital." },
                { label: "Lokasi", text: "Malang, Jawa Timur." },
              ].map(({ label, text }) => (
                <div key={label} className="bg-secondary/50 rounded-2xl p-4 border border-border/50">
                  <strong className="text-kale text-sm">{label}:</strong>
                  <span className="text-muted-foreground text-sm ml-2">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 border border-border shadow-sm"
          >
            <h3 className="font-bold text-kale text-2xl mb-6">Kenapa Pilih Kami?</h3>
            <div className="space-y-4">
              {whyUs.map(({ icon: IconComp, text }) => (
                <div key={text} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-pea-shoot/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComp className="w-5 h-5 text-pea-dark" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed pt-1">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}