import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Package, MessageSquare, LayoutDashboard } from "lucide-react";
import AdminDashboard from "@/components/admin/AdminDashboard";

function formatRupiah(num) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

const EMPTY_PRODUCT = {
  name: "",
  price: "",
  unit: "/ikat",
  description: "",
  image_url: "",
  stock: true,
  category: "Sayuran",
  sort_order: 0,
};

export default function Admin() {
  const [tab, setTab] = useState("dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const qc = useQueryClient();

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => base44.entities.Product.list(),
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["messages"],
    queryFn: () => base44.entities.ContactMessage.list(),
  });

  const saveMutation = useMutation({
    mutationFn: (data) =>
      editProduct
        ? base44.entities.Product.update(editProduct.id, data)
        : base44.entities.Product.create(data),
    onSuccess: () => {
      qc.invalidateQueries(["products"]);
      setModalOpen(false);
      setEditProduct(null);
      setForm(EMPTY_PRODUCT);
      toast.success(editProduct ? "Produk diperbarui" : "Produk ditambahkan");
    },
    onError: () => toast.error("Gagal menyimpan produk"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Product.delete(id),
    onSuccess: () => {
      qc.invalidateQueries(["products"]);
      toast.success("Produk dihapus");
    },
  });

  const openAdd = () => {
    setEditProduct(null);
    setForm(EMPTY_PRODUCT);
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({ ...p });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMutation.mutate({ ...form, price: Number(form.price), sort_order: Number(form.sort_order) });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">Admin Panel - Tidar Sayur</h1>
      </header>

      <div className="flex">
        <aside className="w-48 bg-card border-r min-h-screen p-4">
          <nav className="space-y-2">
            <button onClick={() => setTab("dashboard")} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left ${tab === "dashboard" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
              <LayoutDashboard size={16} /> Dashboard
            </button>
            <button onClick={() => setTab("produk")} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left ${tab === "produk" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
              <Package size={16} /> Produk
            </button>
            <button onClick={() => setTab("pesan")} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left ${tab === "pesan" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
              <MessageSquare size={16} /> Pesan
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {tab === "dashboard" && <AdminDashboard products={products} messages={messages} />}

          {tab === "produk" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Manajemen Produk</h2>
                <button onClick={openAdd} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg">
                  <Plus size={16} /> Tambah Produk
                </button>
              </div>
              <div className="grid gap-4">
                {products.map((p) => (
                  <div key={p.id} className="bg-card border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {p.image_url && <img src={p.image_url} alt={p.name} className="w-16 h-16 object-cover rounded" />}
                      <div>
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-sm text-muted-foreground">{formatRupiah(p.price)}{p.unit}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${p.stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {p.stock ? "Tersedia" : "Habis"}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 hover:bg-muted rounded">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => deleteMutation.mutate(p.id)} className="p-2 hover:bg-destructive/10 text-destructive rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "pesan" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Pesan Masuk</h2>
              <div className="grid gap-4">
                {messages.map((m) => (
                  <div key={m.id} className="bg-card border rounded-lg p-4">
                    <p className="font-semibold">{m.name} - {m.phone}</p>
                    <p className="text-sm text-muted-foreground mt-1">{m.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{new Date(m.created_date).toLocaleDateString('id-ID')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">{editProduct ? "Edit Produk" : "Tambah Produk"}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input placeholder="Nama produk" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded px-3 py-2" required />
              <input type="number" placeholder="Harga" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full border rounded px-3 py-2" required />
              <input placeholder="Satuan (e.g. /ikat)" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="w-full border rounded px-3 py-2" />
              <textarea placeholder="Deskripsi" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border rounded px-3 py-2" rows={3} />
              <input placeholder="URL Gambar" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full border rounded px-3 py-2" />
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.checked })} />
                Stok Tersedia
              </label>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded">Batal</button>
                <button type="submit" disabled={saveMutation.isPending} className="px-4 py-2 bg-primary text-primary-foreground rounded">
                  {saveMutation.isPending ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
