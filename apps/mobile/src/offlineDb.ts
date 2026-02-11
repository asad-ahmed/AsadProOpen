import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('field-tech-companion.db');

export function initDb() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY NOT NULL,
      customerName TEXT NOT NULL,
      summary TEXT NOT NULL,
      status TEXT NOT NULL,
      scheduledStart TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sync_queue (
      id TEXT PRIMARY KEY NOT NULL,
      entityType TEXT NOT NULL,
      entityId TEXT NOT NULL,
      operation TEXT NOT NULL,
      payload TEXT NOT NULL,
      retries INTEGER DEFAULT 0,
      lastAttemptAt TEXT
    );

    CREATE TABLE IF NOT EXISTS logs (
      id TEXT PRIMARY KEY NOT NULL,
      level TEXT NOT NULL,
      message TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);
}

export function seedDemoJobs() {
  db.runSync(
    'INSERT OR IGNORE INTO jobs (id, customerName, summary, status, scheduledStart) VALUES (?, ?, ?, ?, ?)',
    ['j1', 'Avery Smith', 'No cooling - condenser inspection', 'scheduled', new Date().toISOString()]
  );
}

export function listJobs() {
  return db.getAllSync<{ id: string; customerName: string; summary: string; status: string }>('SELECT * FROM jobs ORDER BY scheduledStart ASC');
}

export function queueMutation(entityType: string, entityId: string, operation: string, payload: unknown) {
  db.runSync(
    'INSERT INTO sync_queue (id, entityType, entityId, operation, payload) VALUES (?, ?, ?, ?, ?)',
    [crypto.randomUUID(), entityType, entityId, operation, JSON.stringify(payload)]
  );
}
