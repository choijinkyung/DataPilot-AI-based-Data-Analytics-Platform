// src/features/home/HomeContent.tsx
import styles from './Home.module.scss'

export default function HomeContent() {
  return (
    <div className={styles.homeContainer}>
      {/* Welcome Section */}
      <section className={styles.welcomeCard}>
        <h1>👋 Welcome, Eden!</h1>
        <p>📊 내 최근 작업 / 오늘의 분석 요약</p>
      </section>

      {/* Quick Actions */}
      <section className={styles.quickActions}>
        <div className={styles.actionCard}>
          <div>🔼</div>
          <span>데이터 업로드</span>
        </div>
        <div className={styles.actionCard}>
          <div>🧠</div>
          <span>분석 요청</span>
        </div>
        <div className={styles.actionCard}>
          <div>📈</div>
          <span>분석 결과 보기</span>
        </div>
      </section>

      {/* 최근 작업 기록 */}
      <section className={styles.recentTasks}>
        <h2>📂 최근 작업 기록</h2>
        <ul>
          <li>
            <span>[2025-07-10] MRI 데이터 업로드</span>
            <span className={styles.timestamp}>오전 10:03</span>
          </li>
          <li>
            <span>[2025-07-09] 병변 분석 요청</span>
            <span className={styles.timestamp}>오후 3:45</span>
          </li>
          <li>
            <span>[2025-07-09] AI 분석 결과 확인</span>
            <span className={styles.timestamp}>오후 4:20</span>
          </li>
        </ul>
      </section>

      {/* 시스템 공지 및 분석 히스토리 */}
      <section className={styles.systemNotice}>
        <h2>⚙️ 시스템 공지 / 분석 히스토리 요약</h2>
        <p>최근 시스템 점검이 7월 9일 완료되었습니다.</p>
        {/* 추가적인 히스토리 컴포넌트 삽입 가능 */}
      </section>
    </div>
  )
}