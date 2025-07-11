import React from 'react';
import styles from './Jobs.module.scss';

export type Job = {
  id: string;
  name: string;
  startedAt: string;
  status: 'running' | 'success' | 'failed';
};

type Props = {
  jobs: Job[];
  onRetry: (id: string) => void;
  retryingIds: string[];
};

export default function JobsContent({ jobs, onRetry, retryingIds }: Props) {
  return (
    <section className={styles.wrapper}>
      <h3>📌 최근 작업 추적</h3>

      {jobs.map(j => (
        <div key={j.id} className={`${styles.item} ${styles[j.status]}`}>
          <div className={styles.meta}>
            <div><strong>{j.name}</strong></div>
            <div>{j.startedAt}</div>
          </div>

          <span className={`${styles.status} ${styles[j.status]}`}>
            {j.status === 'running' && '진행중'}
            {j.status === 'success' && '완료'}
            {j.status === 'failed' && '실패'}
          </span>

          {j.status === 'failed' && (
            <button
              className={styles.btn}
              onClick={() => onRetry(j.id)}
              disabled={retryingIds.includes(j.id)}
            >
              {retryingIds.includes(j.id) ? '재실행 중…' : '재실행'}
            </button>
          )}
        </div>
      ))}

      {jobs.length === 0 && <p>작업 이력이 없습니다.</p>}
    </section>
  );
}