const MODEL_ICONS = {
  'Baseline CNN':          '🧱',
  'Deep CNN':              '🏗️',
  'Wide CNN':              '📐',
  'Autoencoder Transfer':  '🔄',
  'ResNet50 Transfer':     '🚀',
  'ResNet50 From-Scratch': '⚙️',
};

function ModelSelector({ models, loading, error, selected, onSelect }) {
  if (loading) {
    return (
      <div className="model-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="model-card skeleton">
            <span className="icon skeleton-icon" />
            <span className="name skeleton-text" />
            <span className="exp-badge skeleton-badge" />
          </div>
        ))}
      </div>
    );
  }

  if (!loading && models.length === 0) {
    return (
      <div className="models-error">
        {error ? 'Failed to load models — check backend connection.' : 'No models available.'}
      </div>
    );
  }

  return (
    <div className="model-grid">
      {models.map(m => (
        <div
          key={m.name}
          className={`model-card${selected === m.name ? ' selected' : ''}`}
          onClick={() => onSelect(m.name)}
        >
          <span className="icon">{MODEL_ICONS[m.name] || '🤖'}</span>
          <span className="name">{m.name}</span>
          <span className="exp-badge">Exp {m.experiment}</span>
        </div>
      ))}
    </div>
  );
}

export default ModelSelector;
