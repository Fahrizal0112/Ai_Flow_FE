import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ModelsSummary } from "@/components/ModelsSummary";
import { ActiveModels } from "@/components/ActiveModels";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard AI Flow</h1>
            <ModelsSummary />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Model yang Sedang Aktif */}
            <div>
              <ActiveModels />
            </div>

            {/* Area untuk grafik atau informasi lainnya */}
          </div>
        </main>
      </div>
    </div>
  );
} 