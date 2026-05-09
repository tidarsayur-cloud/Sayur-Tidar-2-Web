import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import Navbar from "@/components/store/Navbar";
import HeroSection from "@/components/store/HeroSection";
import PromoSection from "@/components/store/PromoSection";
import ProductsSection from "@/components/store/ProductsSection";
import AboutSection from "@/components/store/AboutSection";
import ContactSection from "@/components/store/ContactSection";
import CartSidebar from "@/components/store/CartSidebar";
import Footer from "@/components/store/Footer";

const WA_NUMBER = "628XXXXXXXXXX";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.list(),
  });

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (product) => {
    if (!product.in_stock) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
    toast.success(`${product.name} ditambahkan ke keranjang`);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((i) => i.id !== productId));
  };

  const updateQty = (productId, newQty) => {
    if (newQty < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => prev.map((i) => i.id === productId ? { ...i, qty: newQty } : i));
  };

  const buyNow = (product) => {
    const msg = `Halo, saya ingin memesan *${product.name}* (${product.unit}) seharga Rp${product.price.toLocaleString('id-ID')}.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const checkout = () => {
    const items = cart.map(i => `- ${i.name} x${i.qty}: Rp${(i.price * i.qty).toLocaleString('id-ID')}`).join('\n');
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const msg = `Halo, saya ingin memesan:\n${items}\n\nTotal: Rp${total.toLocaleString('id-ID')}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={totalItems} onCartOpen={() => setCartOpen(true)} />
      <main>
        <HeroSection />
        <PromoSection />
        <ProductsSection
          products={products}
          isLoading={isLoading}
          onAddToCart={addToCart}
          onBuyNow={buyNow}
        />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <CartSidebar
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
        onCheckout={checkout}
      />
    </div>
  );
}
