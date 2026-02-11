import type { Customer, Job } from '@ftc/shared';

export const customers: Customer[] = [
  { id: 'c1', name: 'Avery Smith', phone: '555-0101', address: '101 Main St' },
  { id: 'c2', name: 'Jordan Lee', phone: '555-0115', address: '44 Oak Ave' }
];

export const jobs: Job[] = [
  {
    id: 'j1',
    customerId: 'c1',
    scheduledStart: new Date().toISOString(),
    scheduledEnd: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    status: 'scheduled',
    summary: 'No cooling - condenser inspection',
    locationLatLng: '37.7749,-122.4194'
  },
  {
    id: 'j2',
    customerId: 'c2',
    scheduledStart: new Date().toISOString(),
    scheduledEnd: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    status: 'onsite',
    summary: 'Water heater flush + replace valve',
    locationLatLng: '37.7849,-122.4094'
  }
];
