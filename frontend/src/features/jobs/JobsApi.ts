import type { Job } from './JobsContent';

let mock: Job[] = [
  { id: '1', name: 'sales.csv 분석', startedAt: '2025-07-11 14:58', status: 'running' },
  { id: '2', name: 'users.csv 분석', startedAt: '2025-07-11 14:50', status: 'success' },
  { id: '3', name: 'inventory.csv 분석', startedAt: '2025-07-11 14:40', status: 'failed' }
];

export const fetchJobs = async (): Promise<Job[]> => {
  // 실제라면 fetch('/api/jobs') …
  return new Promise(r => setTimeout(() => r(mock), 400));
};

export const retryJob = async (id: string) => {
  // 실제라면 POST /api/jobs/{id}/retry
  return new Promise<void>(res => {
    setTimeout(() => {
      mock = mock.map(j =>
        j.id === id ? { ...j, status: 'running', startedAt: new Date().toLocaleString() } : j
      );
      res();
    }, 700);
  });
};