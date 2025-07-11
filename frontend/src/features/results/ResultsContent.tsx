// components/ResultContent.tsx
import React from 'react';
import styles from './Result.module.scss';

type Props = {
  fileName: string;
  runAt: string;
  analysisType: string;

  tabs: string[];
  activeTab: string;
  onTabChange: (t: string) => void;

  ChartElement: React.ReactNode; // 그래프 컴포넌트 (canvas/svg)

  summary: Record<string, number>;
  onCsvDownload: () => void;
  onPngDownload: () => void;
};

export default function ResultContent({
  fileName,
  runAt,
  analysisType,
  tabs,
  activeTab,
  onTabChange,
  ChartElement,
  summary,
  onCsvDownload,
  onPngDownload,
}: Props) {
  return (
    <div>
      {/* 상단 메타정보 */}
      <section className={styles.header}>
        <h2>📊 분석 결과: “{fileName}”</h2>
        <p>- 분석 일시: {runAt}</p>
        <p>- 분석 종류: {analysisType}</p>
      </section>

      {/* 차트 탭 */}
      <section className={styles.chartTabs}>
        <nav className={styles.tabNav}>
          {tabs.map(t => (
            <button
              key={t}
              className={activeTab === t ? 'active' : ''}
              onClick={() => onTabChange(t)}
            >
              {t}
            </button>
          ))}
        </nav>
        <div className={styles.chartBox}>{ChartElement}</div>
      </section>

      {/* 요약 테이블 */}
      <section className={styles.header}>
        <h3>Summary</h3>
        <table>
          <tbody>
            {Object.entries(summary).map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 하단 다운로드 */}
      <section className={styles.bottomBar}>
        <button className="btn" onClick={onCsvDownload}>⬇️ CSV 다운로드</button>
        <button className="btn" onClick={onPngDownload}>⬇️ 그래프 PNG 다운로드</button>
      </section>
    </div>
  );
}