import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";

const WHATSAPP_NUMBER = "628XXXXXXXXXX";

function formatRupiah(n) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

export default function ProductsSection({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.list("sort_order", 100),
  });

  const categories = ["Semua", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];
  const filtered = activeCategory === "Semua" ? products : products.filter((p) => p.category === activeCategory);

  const handleBuyNow = (product) => {
    const msg = `Halo Tidar Sayur, saya ingin membeli *${product.name}* dengan harga ${formatRupiah(product.price)}${product.unit}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="products" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-secondary text-pea-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🛒 Pilihan Harian
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-kale leading-tight">Produk Segar Kami</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Pilih sayuran favorit Anda. Produk habis stok otomatis menonaktifkan tombol pembelian.
          </p>
        </div>
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeCategory === cat ? "bg-kale text-white shadow-lg shadow-kale/20" : "bg-white border border-border text-foreground hover:border-kale/40"}`}>
                {cat}
              </button>
            ))}
          </div>
        )}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-pea-shoot animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <div className="text-4xl mb-4">🌱</div>
            <p className="font-semibold">Produk belum tersedia</p>
            <p className="text-sm mt-1">Silakan cek kembali nanti</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onAddToCart={onAddToCart} onBuyNow={handleBuyNow} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}