'use client';

import { useEffect, useState } from 'react';

interface SummaryData {
  total_models: number;
  active_trainings: number;
  completed_models: number;
  failed_models: number;
  pending_models: number;
}

export function ModelsSummary() {
  const [data, setData] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/models/monitoring/summary');
      if (!response.ok) {
        throw new Error('Gagal mengambil data summary');
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
    fetchSummary();
    // Refresh setiap 1 menit
    const interval = setInterval(fetchSummary, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <div>Memuat...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!data) return null;

  const summaryCards = [
    {
      title: 'Total Model',
      value: data.total_models,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Sedang Training',
      value: data.active_trainings,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      title: 'Selesai',
      value: data.completed_models,
      color: 'bg-green-100 text-green-800'
    },
    {
      title: 'Gagal',
      value: data.failed_models,
      color: 'bg-red-100 text-red-800'
    },
    {
      title: 'Menunggu',
      value: data.pending_models,
      color: 'bg-gray-100 text-gray-800'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {summaryCards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            {card.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">{card.value}</span>
            <span className={`${card.color} px-2 py-1 rounded-full text-xs`}>
              {((card.value / data.total_models) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
} 