import { motion } from "framer-motion";
import { ShoppingCart, Zap, Package } from "lucide-react";

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
}

export default function ProductCard({ product, onAddToCart, onBuyNow, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group bg-white rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      <div className="relative overflow-hidden bg-secondary h-52">
        {product.image_url ? (
          <motion.img src={product.image_url} alt={product.name} className="w-full h-full object-cover" whileHover={{ scale: 1.07 }} transition={{ duration: 0.4 }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-16 h-16 text-muted-foreground/30" />
          </div>
        )}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold border ${product.in_stock ? "bg-white/90 text-pea-dark border-pea-shoot/30" : "bg-white/90 text-destructive border-destructive/30"}`}>
          {product.in_stock ? "● Tersedia" : "● Habis"}
        </div>
        {product.category && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-kale/80 text-white">
            {product.category}
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-bold text-kale text-lg leading-tight">{product.name}</h3>
          <p className="text-earth font-black text-xl mt-1">
            {formatRupiah(product.price)}
            <span className="text-muted-foreground font-normal text-sm">{product.unit}</span>
          </p>
        </div>
        {product.description && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
            {product.description}
          </p>
        )}
        <div className="flex gap-2 mt-auto pt-2">
          <button onClick={() => onAddToCart(product)} disabled={!product.in_stock} className="flex-1 flex items-center justify-center gap-2 bg-kale hover:bg-kale/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-4 py-3 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5">
            <ShoppingCart className="w-4 h-4" />
            Keranjang
          </button>
          <button onClick={() => onBuyNow(product)} disabled={!product.in_stock} className="flex items-center justify-center gap-1.5 bg-pea-shoot hover:bg-pea-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-4 py-3 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5">
            <Zap className="w-4 h-4" />
            Beli
          </button>
        </div>
      </div>
    </motion.article>
  );
}