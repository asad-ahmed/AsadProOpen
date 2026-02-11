export function SyncStatus({ state }: { state: 'synced' | 'queued' | 'conflict' }) {
  const text = state === 'synced' ? 'Synced' : state === 'queued' ? 'Sync queued' : 'Conflict detected';
  const color = state === 'synced' ? '#15803d' : state === 'queued' ? '#92400e' : '#b91c1c';
  return <span style={{ color, fontWeight: 700 }}>{text}</span>;
}
