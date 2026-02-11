export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <h1>Job {params.id}</h1>
      <div className="card">
        <h2>Technician Actions</h2>
        <ul>
          <li>Status updates</li>
          <li>Notes + photos</li>
          <li>Line items + invoice</li>
          <li>Signature + payment</li>
          <li>Closeout</li>
        </ul>
      </div>
    </main>
  );
}
