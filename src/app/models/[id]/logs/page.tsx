'use client';

import { useEffect, useState, use } from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/Card";

interface Timeline {
  stage: string;
  timestamp: string;
  detail: string;
}

interface ModelLogs {
  model_info: {
    id: number;
    name: string;
    type: string;
    status: string;
  };
  configuration: {
    ai_type: string;
    algorithm: {
      name: string;
      params: Record<string, unknown>;
    };
    model_path: string;
    preprocessing: string[];
    evaluation_metrics: string[];
    validation_strategy: string;
  };
  timeline: Timeline[];
}

export default function ModelLogs({ params }: { params: { id: string } }) {
  const resolvedParams = use(params);
  const [logs, setLogs] = useState<ModelLogs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/models/${resolvedParams.id}/logs`);
      if (!response.ok) {
        throw new Error('Gagal mengambil data logs');
      }
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="p-8">Memuat...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!logs) return <div className="p-8">Tidak ada data</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Info Model */}
            <Card className="mb-6 p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{logs.model_info.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  logs.model_info.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  logs.model_info.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {logs.model_info.status}
                </span>
              </div>
              <p className="text-gray-600">Model ID: {logs.model_info.id}</p>
              <p className="text-gray-600">Tipe: {logs.model_info.type}</p>
            </Card>

            {/* Konfigurasi */}
            <Card className="mb-6 p-6">
              <h2 className="text-xl font-semibold mb-4">Konfigurasi</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Algoritma</h3>
                  <p>{logs.configuration.algorithm.name}</p>
                  <div className="mt-2">
                    <h4 className="text-sm text-gray-600">Parameter:</h4>
                    <pre className="bg-gray-900 p-2 rounded mt-1">
                      {JSON.stringify(logs.configuration.algorithm.params, null, 2)}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium">Preprocessing</h3>
                  <ul className="list-disc list-inside">
                    {logs.configuration.preprocessing.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium">Metrik Evaluasi</h3>
                  <ul className="list-disc list-inside">
                    {logs.configuration.evaluation_metrics.map((metric, index) => (
                      <li key={index}>{metric}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium">Strategi Validasi</h3>
                  <p>{logs.configuration.validation_strategy}</p>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Timeline</h2>
              <div className="space-y-4">
                {logs.timeline.map((event, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-4"></div>
                    <div>
                      <p className="font-medium">{event.detail}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(event.timestamp).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
} 