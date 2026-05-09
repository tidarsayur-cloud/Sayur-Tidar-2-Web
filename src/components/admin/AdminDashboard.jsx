import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { ShoppingBag, Package, MessageSquare, AlertCircle } from "lucide-react";

function formatRupiah(num) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

function StatCard({ icon: Icon, label, value, sub, color = "bg-primary" }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="text-2xl font-bold mb-1 text-foreground">{value}</div>
      <div className="text-muted-foreground text-sm font-medium">{label}</div>
      {sub && <div className="text-muted-foreground/60 text-xs mt-1">{sub}</div>}
    </div>
  );
}

export default function AdminDashboard({ products = [], messages = [] }) {
  const totalProducts = products.length;
  const inStockProducts = products.filter((p) => p.stock).length;
  const outOfStockProducts = products.filter((p) => !p.stock).length;
  const totalMessages = messages.length;

  const recentMessages = messages
    .slice()
    .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
    .slice(0, 5);

  const categoryData = products.reduce((acc, p) => {
    const cat = p.category || "Lainnya";
    const existing = acc.find((c) => c.name === cat);
    if (existing) existing.jumlah++;
    else acc.push({ name: cat, jumlah: 1 });
    return acc;
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Package} label="Total Produk" value={totalProducts} color="bg-primary" />
        <StatCard icon={ShoppingBag} label="Stok Tersedia" value={inStockProducts} color="bg-green-600" />
        <StatCard icon={AlertCircle} label="Stok Habis" value={outOfStockProducts} color="bg-red-500" />
        <StatCard icon={MessageSquare} label="Pesan Masuk" value={totalMessages} color="bg-blue-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Produk per Kategori */}
        <div className="bg-card border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Produk per Kategori</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pesan Terbaru */}
        <div className="bg-card border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Pesan Terbaru</h3>
          <div className="space-y-3">
            {recentMessages.length === 0 && <p className="text-muted-foreground text-sm">Belum ada pesan</p>}
            {recentMessages.map((m) => (
              <div key={m.id} className="border-b pb-2">
                <p className="font-medium text-sm">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.message?.substring(0, 80)}...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
