import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { MockAdapter } from './adapters';
import { customers } from './mockData';

const app = express();
const adapter = new MockAdapter();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/api/customers', (_req, res) => res.json(customers));
app.get('/api/jobs', async (_req, res) => res.json(await adapter.listJobs('tech-1', new Date().toISOString())));
app.get('/api/jobs/:id', async (req, res) => res.json(await adapter.getJob(req.params.id)));

app.post('/api/jobs/:id/status', async (req, res) => {
  const body = z.object({ status: z.enum(['scheduled', 'enroute', 'onsite', 'completed']) }).parse(req.body);
  res.json(await adapter.updateJobStatus(req.params.id, body.status));
});

app.post('/api/jobs/:id/notes', async (req, res) => {
  const body = z.object({ text: z.string().min(1) }).parse(req.body);
  res.json(await adapter.createNote(req.params.id, body.text));
});

app.post('/api/jobs/:id/photos', async (req, res) => {
  const body = z.object({ localUri: z.string() }).parse(req.body);
  res.json(await adapter.uploadPhoto(req.params.id, body.localUri));
});

app.post('/api/jobs/:id/invoice', async (req, res) => {
  const body = z.object({ items: z.array(z.object({ name: z.string(), qty: z.number(), unitPrice: z.number(), taxable: z.boolean(), id: z.string(), jobId: z.string() })) }).parse(req.body);
  res.json(await adapter.createInvoice(req.params.id, body.items));
});

app.post('/api/jobs/:id/payment', async (req, res) => {
  const body = z.object({ amount: z.number(), method: z.enum(['card', 'cash', 'check']), status: z.enum(['pending', 'paid', 'failed']).default('pending') }).parse(req.body);
  res.json(await adapter.collectPayment(req.params.id, { ...body, jobId: req.params.id }));
});

app.post('/api/jobs/:id/complete', async (req, res) => res.json(await adapter.completeJob(req.params.id)));

const port = process.env.PORT ?? 4000;
app.listen(port, () => {
  console.log(`API ready on :${port}`);
});
