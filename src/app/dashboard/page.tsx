import { Card } from "@/components/ui/Card";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Dashboard AI Flow</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Kartu Statistik */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Total Model</h3>
              <p className="text-3xl font-bold">0</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Model Aktif</h3>
              <p className="text-3xl font-bold">0</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Total Prediksi</h3>
              <p className="text-3xl font-bold">0</p>
            </Card>
          </div>

          {/* Tabel Model Terbaru */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Model Terbaru</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              {/* Tabel akan ditambahkan nanti */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 