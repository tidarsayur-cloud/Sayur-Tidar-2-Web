import { motion } from "framer-motion";
import { Tag } from "lucide-react";

const promos = [
  {
    tag: "PROMO 1",
    title: "Beli 3 Gratis 1",
    desc: "Untuk produk sayur pilihan tertentu, cocok untuk stok dapur keluarga.",
    color: "from-emerald-50 to-green-50",
    border: "border-emerald-200",
    tagColor: "bg-emerald-100 text-emerald-800",
  },
  {
    tag: "PROMO 2",
    title: "Diskon 20% Transfer",
    desc: "Hemat lebih banyak untuk pesanan harian dengan metode pembayaran transfer.",
    color: "from-lime-50 to-emerald-50",
    border: "border-lime-200",
    tagColor: "bg-lime-100 text-lime-800",
  },
  {
    tag: "PROMO 3",
    title: "Gratis Ongkir > Rp50.000",
    desc: "Belanja lebih banyak tanpa khawatir biaya kirim untuk area tertentu di Malang.",
    color: "from-yellow-50 to-amber-50",
    border: "border-yellow-200",
    tagColor: "bg-yellow-100 text-yellow-800",
  },
];

export default function PromoSection() {
  return (
    <section id="promo" className="py-24 bg-mist">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 rounded-[2.5rem] p-8 md:p-12 border border-amber-200/60 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-lemon/40 text-amber-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Tag className="w-4 h-4" />
                Penawaran Terbatas
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-amber-900 leading-tight">
                Promo Spesial 🔥
              </h2>
              <p className="text-amber-800/70 mt-2 max-w-lg">
                Nikmati penawaran menarik untuk belanja sayur yang lebih hemat dan menyenangkan.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {promos.map((promo, i) => (
              <motion.div key={promo.tag} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`bg-gradient-to-br ${promo.color} rounded-2xl p-6 border ${promo.border}`}>
                <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 ${promo.tagColor}`}>
                  {promo.tag}
                </span>
                <h3 className="font-bold text-kale text-lg mb-2">{promo.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{promo.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}