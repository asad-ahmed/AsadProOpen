export default function AdminPage() {
  return (
    <main>
      <h1>Dispatch Board</h1>
      <div className="grid">
        <section className="card">
          <h2>Unassigned Jobs</h2>
          <p>Drag/drop assignment scaffold.</p>
        </section>
        <section className="card">
          <h2>Customer Management</h2>
          <p>Create/update customer records from office browser access.</p>
        </section>
        <section className="card">
          <h2>Reporting</h2>
          <p>Completed jobs, payment totals, and sync error rollups.</p>
        </section>
      </div>
    </main>
  );
}
