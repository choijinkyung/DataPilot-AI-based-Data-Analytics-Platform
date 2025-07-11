// src/features/home/HomePage.tsx
import HomeContent from './HomeContent'
import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  // 클릭 시 실행할 함수 (경로를 받아서 이동)
  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.wrapper}>   
      <HomeContent onCardClick={handleCardClick}/>
    </div>
  )
}