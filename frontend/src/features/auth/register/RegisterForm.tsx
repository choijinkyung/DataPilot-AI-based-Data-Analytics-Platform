import React from 'react';
import styles from './style.module.scss';

interface Props {
  form: {
    email: string;
    password: string;
    name: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error?: string;
}

export const RegisterForm = ({ form, onChange, onSubmit, loading, error }: Props) => {
  return (
    <div className={styles['register-form']}>
      <h2 className={styles['register-form__title']}>회원가입</h2>
      <form onSubmit={onSubmit} className={styles['register-form__form']}>
        <input
          name="email"
          type="email"
          placeholder="이메일"
          value={form.email}
          onChange={onChange}
          required
          className={styles['register-form__input']}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={onChange}
          required
          className={styles['register-form__input']}
        />
        <input
          name="name"
          type="text"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
          required
          className={styles['register-form__input']}
        />
        <button
          type="submit"
          disabled={loading}
          className={styles['register-form__button']}
        >
          {loading ? '가입 중...' : '회원가입'}
        </button>
        {error && <p className={styles['register-form__error']}>{error}</p>}
      </form>
    </div>
  );
};