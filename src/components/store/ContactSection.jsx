import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Mail, Send, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contacts = [
    { icon: Phone, label: "WhatsApp", value: "08XXXXXXXXXX" },
    { icon: MapPin, label: "Alamat", value: "Malang, Jawa Timur" },
    { icon: Clock, label: "Jam Operasional", value: "Setiap hari, 06.00 - 20.00" },
    { icon: Mail, label: "Email", value: "tidarsayur@example.com" },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-secondary text-pea-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
            💬 Hubungi Kami
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-kale">Kami Siap Membantu</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Untuk pemesanan, pertanyaan, atau kerja sama — hubungi kami melalui form atau WhatsApp.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-kale rounded-3xl p-8 text-white">
            <h3 className="font-bold text-2xl mb-6">Informasi Kontak</h3>
            <div className="space-y-5">
              {contacts.map(({ icon: IconComp, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-medium">{label}</p>
                    <p className="text-white font-semibold text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-8 border border-border shadow-sm">
            <h3 className="font-bold text-kale text-2xl mb-6">Kirim Pesan</h3>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
                <CheckCircle className="w-12 h-12 text-pea-shoot" />
                <p className="font-bold text-kale">Pesan berhasil dikirim!</p>
                <p className="text-muted-foreground text-sm">Kami akan segera menghubungi Anda.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: "name", label: "Nama", type: "text", placeholder: "Masukkan nama Anda" },
                  { id: "email", label: "Email", type: "email", placeholder: "Masukkan email Anda" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label className="block text-sm font-semibold text-kale mb-1.5">{label}</label>
                    <input type={type} value={form[id]} onChange={(e) => setForm({ ...form, [id]: e.target.value })} placeholder={placeholder} required className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-pea-shoot/40 focus:border-pea-shoot transition-all" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-semibold text-kale mb-1.5">Pesan</label>
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tulis pesan Anda..." required className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-pea-shoot/40 focus:border-pea-shoot transition-all resize-none" />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-kale hover:bg-kale/90 text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                  <Send className="w-4 h-4" />
                  Kirim Pesan
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}