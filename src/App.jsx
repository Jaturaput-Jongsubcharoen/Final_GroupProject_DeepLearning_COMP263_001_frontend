import { useState, useEffect, useCallback } from 'react';
import ModelSelector from './components/ModelSelector';
import MetricsPanel from './components/MetricsPanel';
import PredictPanel from './components/PredictPanel';
import './App.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [models, setModels] = useState([]);
  const [modelsLoading, setModelsLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setModelsLoading(true);
    fetch(`${API}/models`)
      .then(res => { if (!res.ok) throw new Error(res.status); return res.json(); })
      .then(data => { setModels(data.models); setModelsLoading(false); })
      .catch(() => { setError('Cannot connect to backend at ' + API); setModelsLoading(false); });
  }, []);

  useEffect(() => {
    if (!selectedModel) { setMetrics(null); return; }
    const found = models.find(m => m.name === selectedModel);
    setMetrics(found?.metrics ?? null);
  }, [selectedModel, models]);

  const handlePredict = useCallback(async (file) => {
    if (!selectedModel || !file) return null;
    const form = new FormData();
    form.append('image', file);
    form.append('model_name', selectedModel);
    const res = await fetch(`${API}/predict`, { method: 'POST', body: form });
    if (!res.ok) throw new Error('Prediction failed');
    return res.json();
  }, [selectedModel]);

  return (
    <div className="app">
      <header className="header">
        <h1>Deep Learning for Pneumonia Detection from Chest X-Ray Images</h1>
        <p className="subtitle">Deep Learning - Individual Project</p>
      </header>

      <main className="container">
        {error && <p className="error-banner">{error}</p>}

        <section className="section">
          <h2 className="section-title">Select Model</h2>
          <ModelSelector
            models={models}
            loading={modelsLoading}
            error={error}
            selected={selectedModel}
            onSelect={setSelectedModel}
          />
        </section>

        <section className="section">
          <h2 className="section-title">Model Metrics</h2>
          <MetricsPanel metrics={metrics} loading={false} />
        </section>

        <section className="section">
          <h2 className="section-title">Prediction</h2>
          <PredictPanel
            selectedModel={selectedModel}
            onPredict={handlePredict}
          />
        </section>
      </main>

      <footer className="footer">
        <p>Deep Learning - Centennial College - 2026</p>
      </footer>
    </div>
  );
}

export default App;
