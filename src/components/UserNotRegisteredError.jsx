export default function UserNotRegisteredError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-destructive mb-4">Akses Tidak Diizinkan</h1>
        <p className="text-muted-foreground mb-6">Anda tidak memiliki akses ke halaman ini.</p>
        <a href="/" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90">Kembali ke Beranda</a>
      </div>
    </div>
  );
}
