// pages/AnalysisPage.tsx
import React, { useState } from 'react';
import AnalysisContent from './AnalyzeContent';
import styles from './Analyze.module.scss';

type Dataset = { id: string; name: string; preview: string[][] };

export default function AnalysisPage() {
  /** 데모용 목데이터 */
  const dummy: Dataset[] = [
    { id: '1', name: 'sales.csv', preview: [['id', 'amount'], ['1', '100'], ['2', '250']] },
    { id: '2', name: 'users.csv', preview: [['uid', 'name'], ['a1', 'Eden'], ['b2', 'Alex']] },
  ];

  /* 상태 */
  const [datasets] = useState<Dataset[]>(dummy);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [analysisTypes] = useState(['통계', '회귀', '분류']);
  const [selectedType, setSelectedType] = useState('통계');

  const columns = selectedId ? ['col1', 'col2', 'col3'] : [];
  const [selectedCols, setSelectedCols] = useState<string[]>([]);

  const [params, setParams] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  /* 이벤트 */
  const toggleColumn = (c: string) =>
    setSelectedCols(cols =>
      cols.includes(c) ? cols.filter(v => v !== c) : [...cols, c],
    );

  const handleRequest = async () => {
    if (!selectedId) return;
    setLoading(true);
    // TODO: 실제 API 호출
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    alert('분석 완료!');
  };

  return (
    <div className={styles.wrapper}>   
      <AnalysisContent
        datasets={datasets}
        selectedId={selectedId}
        onSelect={setSelectedId}
        analysisTypes={analysisTypes}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        columns={columns}
        selectedColumns={selectedCols}
        onColumnToggle={toggleColumn}
        params={params}
        onParamChange={(k, v) => setParams(p => ({ ...p, [k]: v }))}
        onRequest={handleRequest}
        loading={loading}
      />
    </div>
  );
}