import type { FieldServiceAdapter, Job, JobNote, JobPhoto, JobStatus, LineItem, Payment } from '@ftc/shared';
import { jobs } from './mockData';

export class MockAdapter implements FieldServiceAdapter {
  async listJobs(): Promise<Job[]> {
    return jobs;
  }

  async getJob(jobId: string): Promise<Job> {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) throw Object.assign(new Error('Not found'), { status: 404 });
    return job;
  }

  async updateJobStatus(jobId: string, status: JobStatus): Promise<Job> {
    const job = await this.getJob(jobId);
    job.status = status;
    return job;
  }

  async createNote(jobId: string, text: string): Promise<JobNote> {
    return { id: crypto.randomUUID(), jobId, text, createdAt: new Date().toISOString() };
  }

  async uploadPhoto(jobId: string, localUri: string): Promise<JobPhoto> {
    return {
      id: crypto.randomUUID(),
      jobId,
      localUri,
      uploadedUri: `https://mock.local/uploads/${crypto.randomUUID()}.jpg`,
      createdAt: new Date().toISOString()
    };
  }

  async createInvoice(_jobId: string, items: LineItem[]): Promise<{ total: number }> {
    const total = items.reduce((acc, item) => acc + item.qty * item.unitPrice, 0);
    return { total };
  }

  async collectPayment(jobId: string, payment: Omit<Payment, 'id'>): Promise<Payment> {
    return { ...payment, id: crypto.randomUUID(), jobId, status: 'paid', processorRef: 'MOCK_REF_123' };
  }

  async completeJob(jobId: string): Promise<Job> {
    return this.updateJobStatus(jobId, 'completed');
  }
}

export class ServiceTitanAdapter implements FieldServiceAdapter {
  async listJobs(): Promise<Job[]> {
    // TODO: Connect to ServiceTitan dispatch endpoint
    throw new Error('ServiceTitanAdapter.listJobs not implemented');
  }
  async getJob(): Promise<Job> {
    // TODO: Connect to ServiceTitan job detail endpoint
    throw new Error('ServiceTitanAdapter.getJob not implemented');
  }
  async updateJobStatus(): Promise<Job> {
    // TODO: Map internal status values to ServiceTitan status values
    throw new Error('ServiceTitanAdapter.updateJobStatus not implemented');
  }
  async createNote(): Promise<JobNote> {
    // TODO: POST notes to ServiceTitan job notes endpoint
    throw new Error('ServiceTitanAdapter.createNote not implemented');
  }
  async uploadPhoto(): Promise<JobPhoto> {
    // TODO: Upload media to ServiceTitan attachments endpoint
    throw new Error('ServiceTitanAdapter.uploadPhoto not implemented');
  }
  async createInvoice(): Promise<{ total: number }> {
    // TODO: Build invoice payload from line items
    throw new Error('ServiceTitanAdapter.createInvoice not implemented');
  }
  async collectPayment(): Promise<Payment> {
    // TODO: Post payment details to ServiceTitan payments API
    throw new Error('ServiceTitanAdapter.collectPayment not implemented');
  }
  async completeJob(): Promise<Job> {
    // TODO: Trigger job completion workflow in ServiceTitan
    throw new Error('ServiceTitanAdapter.completeJob not implemented');
  }
}
