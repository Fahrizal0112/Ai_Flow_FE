'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/Card";

interface ActiveModel {
  id: number;
  name: string;
  status: string;
  started_at: string;
}

interface ActiveModelsResponse {
  active_count: number;
  models: ActiveModel[];
}

export function ActiveModels() {
  const [data, setData] = useState<ActiveModelsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActiveModels = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/models/active');
      if (!response.ok) {
        throw new Error('Gagal mengambil data model aktif');
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
    fetchActiveModels();
    // Polling setiap 30 detik
    const interval = setInterval(fetchActiveModels, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <div className="p-4">Memuat...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!data) return null;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Model Sedang Diproses</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {data.active_count} aktif
        </span>
      </div>

      <div className="space-y-4">
        {data.models.map((model) => (
          <div
            key={model.id}
            className="border-b last:border-b-0 pb-4 last:pb-0"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">
                  <a 
                    href={`/models/${model.id}/logs`}
                    className="hover:text-blue-600"
                  >
                    {model.name}
                  </a>
                </h3>
                <p className="text-sm text-gray-600">
                  ID: {model.id}
                </p>
              </div>
              <div className="text-right">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                  {model.status}
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  Mulai: {new Date(model.started_at).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          </div>
        ))}

        {data.models.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            Tidak ada model yang sedang diproses
          </p>
        )}
      </div>
    </Card>
  );
} 