// components/UsersContent.tsx
import React from 'react';
import type { User } from '../users.types';
import styles from '../Users.module.scss';

type Props = { users: User[] };

export default function UsersContent({ users }: Props) {
  return (
    <section className={styles.card}>
      <h3>👥 사용자 목록</h3>
      <table className={styles.table}>
        <thead><tr><th>이름</th><th>이메일</th><th>권한</th></tr></thead>
        <tbody>
          {users.map(u => (<tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>))}
        </tbody>
      </table>
    </section>
  );
}