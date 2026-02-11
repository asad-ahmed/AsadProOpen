import { SyncStatus } from '../components/SyncStatus';

const demoJobs = [
  { id: 'j1', customer: 'Avery Smith', summary: 'No cooling', status: 'scheduled' },
  { id: 'j2', customer: 'Jordan Lee', summary: 'Water heater flush', status: 'onsite' }
];

export default function HomePage() {
  return (
    <main>
      <h1>Field Tech Companion</h1>
      <p>Mobile-first, offline-first technician workspace with dispatcher and office parity.</p>
      <div className="card">
        <h2>Login + Demo Mode</h2>
        <button className="btn btn-primary">Continue in Demo Mode</button>
      </div>

      <div className="card">
        <h2>Today&apos;s Jobs</h2>
        {demoJobs.map((job) => (
          <article key={job.id} className="card" style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{job.customer}</strong>
              <span className="status-pill">{job.status}</span>
            </div>
            <p>{job.summary}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a href={`tel:5550101`}>Tap to call</a>
              <a href="https://maps.google.com" target="_blank">Navigate</a>
            </div>
          </article>
        ))}
      </div>

      <div className="grid">
        <section className="card">
          <h3>Technician quick actions</h3>
          <ul>
            <li>Update status (1 tap)</li>
            <li>Add note/photo offline</li>
            <li>Invoice templates + payment</li>
            <li>Signature + closeout</li>
          </ul>
          <SyncStatus state="queued" />
        </section>
        <section className="card">
          <h3>Web admin dashboard</h3>
          <ul>
            <li>Dispatch board</li>
            <li>Job assignment</li>
            <li>Customer management</li>
            <li>Basic reporting</li>
          </ul>
          <SyncStatus state="synced" />
        </section>
      </div>
    </main>
  );
}
