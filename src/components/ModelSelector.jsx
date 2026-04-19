const EXP_LABELS = {
  1: 'Supervised Learning',
  2: 'Unsupervised Learning',
  3: 'State-of-the-Art Models',
};

function ModelSelector({ models, loading, error, selected, onSelect }) {
  if (loading) {
    return (
      <div className="model-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="model-card skeleton">
            <span className="name skeleton-text" />
            <span className="exp-type skeleton-badge" />
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
          <span className="name">{m.name}</span>
          <span className="exp-type">{EXP_LABELS[m.experiment]}</span>
          <span className="exp-badge">Experiment {m.experiment}</span>
        </div>
      ))}
    </div>
  );
}

export default ModelSelector;
