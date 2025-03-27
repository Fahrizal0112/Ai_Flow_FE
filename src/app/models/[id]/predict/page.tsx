'use client';

import { useState } from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/Card";

interface Prediction {
  text: string;
  prediction: string;
  confidence: number;
  probabilities: {
    positive: number;
    negative: number;
  };
}

interface PredictionResponse {
  model_name: string;
  model_id: number;
  predictions: Prediction[];
}

export default function ModelPredictPage({ params }: { params: { id: string } }) {
  const [inputText, setInputText] = useState<string>('');
  const [results, setResults] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const texts = inputText.split('\n').filter(text => text.trim());
      
      const response = await fetch(`http://localhost:8000/api/v1/models/${params.id}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texts }),
      });

      if (!response.ok) {
        throw new Error('Gagal melakukan prediksi');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    return sentiment === 'positive' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Test Model Sentimen</h1>
            
            {/* Input Area */}
            <Card className="mb-6 p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Masukkan Teks (satu baris per teks)
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-32 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  placeholder="Contoh:&#10;Pelayanan sangat memuaskan dan ramah&#10;Produk palsu dan tidak original"
                />
              </div>
              <button
                onClick={handlePredict}
                disabled={isLoading || !inputText.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
              >
                {isLoading ? 'Memproses...' : 'Analisis Sentimen'}
              </button>
            </Card>

            {/* Results Area */}
            {error && (
              <div className="text-red-500 mb-6 p-4 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            {results && (
              <Card className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">{results.model_name}</h2>
                  <p className="text-sm text-gray-600">Model ID: {results.model_id}</p>
                </div>

                <div className="space-y-4">
                  {results.predictions.map((pred, index) => (
                    <div
                      key={index}
                      className="border-b last:border-b-0 pb-4 last:pb-0"
                    >
                      <p className="mb-2">{pred.text}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="font-medium">Sentimen: </span>
                          <span className={getSentimentColor(pred.prediction)}>
                            {pred.prediction === 'positive' ? 'Positif' : 'Negatif'}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Kepercayaan: </span>
                          <span>{(pred.confidence * 100).toFixed(1)}%</span>
                        </div>
                      </div>

                      {/* Probability Bars */}
                      <div className="mt-2 space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Positif</span>
                            <span>{(pred.probabilities.positive * 100).toFixed(1)}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${pred.probabilities.positive * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Negatif</span>
                            <span>{(pred.probabilities.negative * 100).toFixed(1)}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-red-500 rounded-full"
                              style={{ width: `${pred.probabilities.negative * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 