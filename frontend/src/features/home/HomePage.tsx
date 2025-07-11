// src/features/home/HomePage.tsx
import HomeContent from './HomeContent'
import styles from './style.module.scss'

export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      <h1>홈</h1>
      <HomeContent />
    </div>
  )
}