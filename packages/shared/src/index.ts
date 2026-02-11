export type JobStatus = 'scheduled' | 'enroute' | 'onsite' | 'completed';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
}

export interface Job {
  id: string;
  customerId: string;
  scheduledStart: string;
  scheduledEnd: string;
  status: JobStatus;
  summary: string;
  locationLatLng: string;
}

export interface JobNote {
  id: string;
  jobId: string;
  text: string;
  createdAt: string;
}

export interface JobPhoto {
  id: string;
  jobId: string;
  localUri: string;
  uploadedUri?: string;
  createdAt: string;
}

export interface LineItem {
  id: string;
  jobId: string;
  name: string;
  qty: number;
  unitPrice: number;
  taxable: boolean;
}

export interface Signature {
  id: string;
  jobId: string;
  localUri: string;
  signedBy: string;
  signedAt: string;
}

export interface Payment {
  id: string;
  jobId: string;
  amount: number;
  method: 'card' | 'cash' | 'check';
  status: 'pending' | 'paid' | 'failed';
  processorRef?: string;
}

export interface SyncQueueItem {
  id: string;
  entityType: string;
  entityId: string;
  operation: 'create' | 'update' | 'delete';
  payload: Record<string, unknown>;
  retries: number;
  lastAttemptAt?: string;
}

export interface FieldServiceAdapter {
  listJobs(techId: string, day: string): Promise<Job[]>;
  getJob(jobId: string): Promise<Job>;
  updateJobStatus(jobId: string, status: JobStatus): Promise<Job>;
  createNote(jobId: string, text: string): Promise<JobNote>;
  uploadPhoto(jobId: string, localUri: string): Promise<JobPhoto>;
  createInvoice(jobId: string, items: LineItem[]): Promise<{ total: number }>;
  collectPayment(jobId: string, payment: Omit<Payment, 'id'>): Promise<Payment>;
  completeJob(jobId: string): Promise<Job>;
}
