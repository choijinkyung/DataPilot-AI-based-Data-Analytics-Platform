// components/ProfileContent.tsx
import React from 'react';
import type { User } from '../users.types';
import styles from '../Users.module.scss';

type Props = {
  me: User;
  logs: { action: string; at: string }[];
  onLogout: () => void;
};

export default function ProfileContent({ me, logs, onLogout }: Props) {
  return (
    <>
      <section className={styles.card}>
        <h3>👤 프로필</h3>
        <p>이름: {me.name}</p>
        <p>이메일: {me.email}</p>
        <p>권한: {me.role}</p>
        <button className={styles.btn} onClick={onLogout}>로그아웃</button>
      </section>

      <section className={styles.card}>
        <h3>📝 활동 기록</h3>
        <table className={styles.table}>
          <tbody>
            {logs.map(l => (
              <tr key={l.at}><td>{l.action}</td><td>{l.at}</td></tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}