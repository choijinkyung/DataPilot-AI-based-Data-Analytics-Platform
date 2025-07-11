// src/features/home/HomePage.tsx
import HomeContent from './HomeContent'
import styles from './Home.module.scss'

export default function HomePage() {
  return (
    <div className={styles.wrapper}>   
      <HomeContent />
    </div>
  )
}