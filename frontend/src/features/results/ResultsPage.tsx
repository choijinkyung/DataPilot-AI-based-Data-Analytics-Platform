// pages/ResultPage.tsx
import React, { useEffect, useRef, useState ,useMemo} from 'react';
import { Line,Bar } from 'react-chartjs-2';
import '@/utils/chartRegister'; // Chart.js 플러그인 등록

import ResultContent from './ResultsContent';
import { downloadCsv, downloadPng } from '@/utils/fileDownload';

export default function ResultPage() {
  const fileName = 'sales.csv';
  const runAt = '2025-07-11 15:00';
  const analysisType = '회귀 분석';

  /* 탭 상태 */
  const tabs = ['Line', 'Bar'];
  const [activeTab, setActiveTab] = useState('Line');
  /* 공통 데이터 */
  const labels = ['Jan', 'Feb', 'Mar'];
  const values1 = [120, 190, 300];
  const values2 = [100, 170, 280];

  /* 차트 데이터/옵션 메모이즈 */
  const lineData = useMemo(
    () => ({
      labels,
      datasets: [
        { label: 'Actual', data: values1, borderWidth: 2 },
        { label: 'Predicted', data: values2, borderWidth: 2 }
      ]
    }),
    []
  );

  const barData = useMemo(
    () => ({
      labels,
      datasets: [
        { label: 'Actual', data: values1, backgroundColor: 'rgba(78,158,255,0.6)' },
        { label: 'Predicted', data: values2, backgroundColor: 'rgba(255,99,132,0.6)' }
      ]
    }),
    []
  );

  /* 요약 */
  const summary = { RMSE: 2.45, R2: 0.87 };

  /* 다운로드 로직 */
  const handleCsv = () => downloadCsv(summary, `${fileName}_summary.csv`);
  const handlePng = () => downloadPng('chart-canvas', `${fileName}_${activeTab}.png`);

  /* 탭별 그래프 요소 */
  const chartEl =
  activeTab === 'Line' ? (
    <Line key="line" id="chart-canvas" data={lineData} options={{ responsive: true }} />
  ) : activeTab === 'Bar' ? (
    <Bar key="bar" id="chart-canvas" data={barData} options={{ responsive: true }} />
  ) : null; // Summary 탭이면 차트 없음



  return (
    <ResultContent
      fileName={fileName}
      runAt={runAt}
      analysisType={analysisType}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      ChartElement={chartEl}
      summary={summary}
      onCsvDownload={handleCsv}
      onPngDownload={handlePng}
    />
  );
}