const CIRCUMFERENCE = 2 * Math.PI * 52; // r = 52

function gaugeColor(val) {
  if (val >= 0.8) return '#22c55e';
  if (val >= 0.6) return '#f59e0b';
  return '#e94560';
}

function Gauge({ label, value }) {
  const pct    = value != null ? value : 0;
  const offset = CIRCUMFERENCE * (1 - pct);
  const color  = value != null ? gaugeColor(value) : 'rgba(255,255,255,.12)';
  const display = value != null ? (value * 100).toFixed(2) + '%' : '—';

  return (
    <div className="gauge-card">
      <span className="gauge-label">{label}</span>
      <div className="gauge-ring">
        <svg viewBox="0 0 120 120">
          <circle className="gauge-bg" cx="60" cy="60" r="52" />
          <circle
            className="gauge-fg"
            cx="60" cy="60" r="52"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ stroke: color }}
          />
        </svg>
        <span className="gauge-value">{display}</span>
      </div>
    </div>
  );
}

export default Gauge;
