import React, { useEffect, useState } from 'react';
import JobsContent from './JobsContent';
import type { Job } from './JobsContent';
import { fetchJobs, retryJob } from './jobsAPI';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [retrying, setRetrying] = useState<string[]>([]);

  /* 1) 최초 로드 + 폴링 */
  useEffect(() => {
    const load = async () => setJobs(await fetchJobs());
    load();
    const t = setInterval(load, 5_000); // 5초마다 새로고침
    return () => clearInterval(t);
  }, []);

  /* 2) 재실행 */
  const handleRetry = async (id: string) => {
    setRetrying(prev => [...prev, id]);
    await retryJob(id);
    setRetrying(prev => prev.filter(v => v !== id));
    setJobs(await fetchJobs()); // 재조회
  };

  return (
    <JobsContent
      jobs={jobs}
      onRetry={handleRetry}
      retryingIds={retrying}
    />
  );
}