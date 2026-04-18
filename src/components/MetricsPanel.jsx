import Gauge from './Gauge';

function MetricsPanel({ metrics, loading }) {
  if (loading) {
    return (
      <div className="metrics-row">
        {['Accuracy', 'Precision', 'Recall', 'F1-Score'].map(l => (
          <Gauge key={l} label={l} value={null} />
        ))}
      </div>
    );
  }

  return (
    <div className="metrics-row">
      <Gauge label="Accuracy"  value={metrics?.accuracy ?? null} />
      <Gauge label="Precision" value={metrics?.precision ?? null} />
      <Gauge label="Recall"    value={metrics?.recall ?? null} />
      <Gauge label="F1-Score"  value={metrics?.f1_score ?? null} />
    </div>
  );
}

export default MetricsPanel;
