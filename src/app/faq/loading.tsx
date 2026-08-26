export default function Loading() {
  return <main className="route-loading" aria-busy="true" aria-label="Loading">
    <div className="loading-brand"><i/><span className="skeleton"/></div>
    <span className="skeleton loading-title"/><span className="skeleton loading-copy"/>
    <span className="skeleton loading-panel"/>
    <div className="loading-cards"><span className="skeleton"/><span className="skeleton"/><span className="skeleton"/></div>
  </main>;
}
