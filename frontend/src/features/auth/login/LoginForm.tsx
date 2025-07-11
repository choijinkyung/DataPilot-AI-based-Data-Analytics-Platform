import styles from './Login.module.scss'

export default function LoginForm({ email, password, onEmailChange, onPasswordChange, onSubmit, loading }) {
  return (
    <div className={styles['login-form']}>
      <h2 className={styles['login-form__title']}>로그인</h2>
      <form onSubmit={onSubmit} className={styles['login-form__form']}>
  
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
        className={styles['login-form__input']}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        className={styles['login-form__input']}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
    </div>
  )
}