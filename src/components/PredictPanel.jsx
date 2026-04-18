import { useState, useRef, useCallback } from 'react';

function PredictPanel({ selectedModel, onPredict }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFile = useCallback((f) => {
    if (!f || !f.type.startsWith('image/')) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handlePredict = async () => {
    if (!file || !selectedModel) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await onPredict(file);
      setResult(data);
    } catch {
      setResult({ error: 'Prediction failed. Check backend connection.' });
    } finally {
      setLoading(false);
    }
  };

  const pNorm = result?.probabilities?.Normal ?? 0;
  const pPneu = result?.probabilities?.Pneumonia ?? 0;

  return (
    <div className="predict-grid">
      {/* Upload area */}
      <div
        className={`upload-area${dragOver ? ' drag-over' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => e.target.files.length && handleFile(e.target.files[0])}
        />
        {preview ? (
          <img src={preview} className="image-preview" alt="Preview" />
        ) : (
          <div className="upload-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p>Drag &amp; drop a chest X-ray image<br />or <span className="link">browse files</span></p>
          </div>
        )}
      </div>

      {/* Controls + Result */}
      <div className="controls-panel">
        <button
          className="btn btn-primary"
          disabled={!selectedModel || !file || loading}
          onClick={handlePredict}
        >
          {loading ? (
            <><span className="spinner" /> Predicting…</>
          ) : (
            'Predict'
          )}
        </button>

        <button className="btn btn-secondary" onClick={handleClear}>
          Clear
        </button>

        {result && !result.error && (
          <div className="result-card">
            <h3>Prediction Result</h3>
            <div className="result-row">
              <span className="result-label">Model:</span>
              <span className="result-value">{result.model}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Class:</span>
              <span className={`result-value result-class ${result.predicted_class}`}>
                {result.predicted_class}
              </span>
            </div>
            <div className="result-row">
              <span className="result-label">Confidence:</span>
              <span className="result-value">
                {(result.confidence * 100).toFixed(2)}%
              </span>
            </div>

            <div className="result-probs">
              <div className="prob-bar-wrap">
                <span className="prob-label">Normal</span>
                <div className="prob-bar">
                  <div className="prob-fill normal" style={{ width: `${pNorm * 100}%` }} />
                </div>
                <span className="prob-val">{(pNorm * 100).toFixed(1)}%</span>
              </div>
              <div className="prob-bar-wrap">
                <span className="prob-label">Pneumonia</span>
                <div className="prob-bar">
                  <div className="prob-fill pneumonia" style={{ width: `${pPneu * 100}%` }} />
                </div>
                <span className="prob-val">{(pPneu * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}

        {result?.error && (
          <div className="error-banner">{result.error}</div>
        )}
      </div>
    </div>
  );
}

export default PredictPanel;
