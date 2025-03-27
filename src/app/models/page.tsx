'use client';

import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/Card";

interface ModelConfig {
  ai_type?: string;
  algorithm?: {
    name: string;
    params: Record<string, unknown>;
  };
  model_path?: string;
  preprocessing?: string[];
  evaluation_metrics?: string[];
  validation_strategy?: string;
}

interface Model {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string | null;
  model_type: string;
  config: ModelConfig;
}

interface ModelsResponse {
  total: number;
  models: Model[];
}

export default function ModelsPage() {
  const [data, setData] = useState<ModelsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchModels = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/models/list');
      if (!response.ok) {
        throw new Error('Gagal mengambil daftar model');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
    // Refresh setiap 30 detik
    const interval = setInterval(fetchModels, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredModels = data?.models.filter(model => 
    statusFilter === 'all' || model.status === statusFilter
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Daftar Model AI</h1>
            <a
              href="/models/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Buat Model Baru
            </a>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
            >
              <option value="all">Semua Status</option>
              <option value="completed">Selesai</option>
              <option value="pending">Menunggu</option>
              <option value="failed">Gagal</option>
            </select>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Memuat...</div>
          ) : error ? (
            <div className="text-red-500 py-8">{error}</div>
          ) : (
            <div className="space-y-6">
              {filteredModels?.map((model) => (
                <Card key={model.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-semibold">{model.name}</h2>
                        <span className={`${getStatusColor(model.status)} px-3 py-1 rounded-full text-sm`}>
                          {model.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        ID: {model.id} • Tipe: {model.model_type} •{' '}
                        Dibuat: {new Date(model.created_at).toLocaleString('id-ID')}
                      </p>

                      {model.config && Object.keys(model.config).length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          {model.config.algorithm && (
                            <div>
                              <h3 className="font-medium mb-2">Algoritma</h3>
                              <p className="text-sm">{model.config.algorithm.name}</p>
                              <pre className="text-xs bg-gray-50 dark:bg-gray-900 p-2 rounded mt-1">
                                {JSON.stringify(model.config.algorithm.params, null, 2)}
                              </pre>
                            </div>
                          )}
                          
                          {model.config.preprocessing && (
                            <div>
                              <h3 className="font-medium mb-2">Preprocessing</h3>
                              <ul className="text-sm list-disc list-inside">
                                {model.config.preprocessing.map((step, index) => (
                                  <li key={index}>{step}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`/models/${model.id}/logs`}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Lihat Log
                      </a>
                      {model.status === 'completed' && (
                        <>
                          <a
                            href={`/models/${model.id}/predict`}
                            className="text-purple-600 hover:text-purple-800 text-sm"
                          >
                            Coba Model
                          </a>
                          <a
                            href={`http://localhost:8000/api/v1/models/${model.id}/download`}
                            className="text-green-600 hover:text-green-800 text-sm"
                            download
                          >
                            Download Model
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              {filteredModels?.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Tidak ada model yang ditemukan
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 