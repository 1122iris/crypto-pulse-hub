import { useEffect, useState } from 'react';
import './App.css';

interface Advice {
  symbol: string;
  advice_action: string;
  advice_strength: string;
  reason: string;
  predicted_at: number;
}

function App() {
  const [data, setData] = useState<Advice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/get_last_10_advises')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-white">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#32F08C' }}>Crypto Advice</h1>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{item.symbol}</h2>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded text-sm font-semibold ${
                  item.advice_action === 'buy' ? 'bg-green-600' :
                  item.advice_action === 'sell' ? 'bg-red-600' : 'bg-yellow-600'
                }`}>
                  {item.advice_action.toUpperCase()}
                </span>
                <span className="px-3 py-1 rounded text-sm bg-gray-700">
                  {item.advice_strength}
                </span>
              </div>
            </div>
            <p className="text-gray-300">{item.reason}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(item.predicted_at * 1000).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
