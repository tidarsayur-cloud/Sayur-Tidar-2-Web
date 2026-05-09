import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "6287762466790";

function formatRupiah(n) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

export default function CartSidebar({ isOpen, onClose, cart, onRemove, onUpdateQty }) {
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const lines = cart.map((item, idx) =>
      `${idx + 1}. ${item.name} x${item.qty} = ${formatRupiah(item.price * item.qty)}`
    );
    const msg = `Halo Tidar Sayur, saya ingin checkout pesanan berikut:\n${lines.join("\n")}\n\nTotal: ${formatRupiah(totalPrice)}\nMohon informasi ketersediaan dan proses pengirimannya.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-white/95 backdrop-blur-xl z-50 shadow-2xl flex flex-col border-l border-border"
        aria-label="Keranjang belanja"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-kale" />
            <h3 className="font-bold text-kale text-lg">Keranjang</h3>
            {totalItems > 0 && (
              <span className="bg-kale text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>
            )}
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center bg-secondary hover:bg-muted rounded-xl transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          <AnimatePresence>
            {cart.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-48 text-center">
                <div className="text-4xl mb-3">🛒</div>
                <p className="font-semibold text-foreground">Keranjang kosong</p>
                <p className="text-sm text-muted-foreground mt-1">Yuk pilih sayur segar favorit Anda</p>
              </motion.div>
            ) : (
              cart.map((item) => (
                <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex gap-3 bg-secondary/50 rounded-2xl p-3 border border-border/50">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-muted flex-shrink-0 flex items-center justify-center text-2xl">🥬</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-kale text-sm truncate">{item.name}</p>
                    <p className="text-muted-foreground text-xs">{formatRupiah(item.price)}{item.unit}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => onUpdateQty(item.id, item.qty - 1)} className="w-6 h-6 rounded-lg bg-white border border-border flex items-center justify-center text-sm font-bold hover:bg-kale hover:text-white hover:border-kale transition-colors">−</button>
                        <span className="text-sm font-bold text-kale w-5 text-center">{item.qty}</span>
                        <button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="w-6 h-6 rounded-lg bg-white border border-border flex items-center justify-center text-sm font-bold hover:bg-kale hover:text-white hover:border-kale transition-colors">+</button>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        <div className="border-t border-border px-6 py-5 space-y-4 bg-white">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-black text-kale text-xl">{formatRupiah(totalPrice)}</span>
          </div>
          <p className="text-muted-foreground text-xs">Checkout akan mengirim ringkasan pesanan ke WhatsApp.</p>
          <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full flex items-center justify-center gap-2 bg-pea-dark hover:bg-kale disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl text-base transition-all duration-200 shadow-lg shadow-kale/20">
            <MessageCircle className="w-5 h-5" />
            Pesan via WhatsApp
          </button>
        </div>
      </motion.aside>
    </>
  );
}
