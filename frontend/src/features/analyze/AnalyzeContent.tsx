// components/AnalysisContent.tsx
import React from 'react';
import styles from './Analyze.module.scss';

type Dataset = { id: string; name: string; preview: string[][] };

type Props = {
  datasets: Dataset[];
  selectedId: string | null;
  onSelect: (id: string) => void;

  analysisTypes: string[];
  selectedType: string;
  onTypeChange: (t: string) => void;

  columns: string[];
  selectedColumns: string[];
  onColumnToggle: (c: string) => void;

  params: Record<string, string>;
  onParamChange: (k: string, v: string) => void;

  onRequest: () => void;
  loading: boolean;
};
// 변경 없음: import, Props 등

export default function AnalysisContent({
  datasets,
  selectedId,
  onSelect,
  analysisTypes,
  selectedType,
  onTypeChange,
  columns,
  selectedColumns,
  onColumnToggle,
  params,
  onParamChange,
  onRequest,
  loading,
}: Props) {
  const selData = datasets.find(d => d.id === selectedId);

  return (
    <div>
      <div className={styles.container}>
        {/* 좌측 – 데이터 목록 */}
        <div className={styles.leftPane}>
          <h3>📁 업로드한 데이터</h3>
          <ul>
            {datasets.map(ds => (
              <li
                key={ds.id}
                className={`${styles.listItem} ${ds.id === selectedId ? styles.active : ''}`}
                onClick={() => onSelect(ds.id)}
              >
                {ds.name}
              </li>
            ))}
          </ul>

          {selData && (
            <>
              <h4>미리보기</h4>
              <div style={{ overflowX: 'auto' }}>
                <table className={styles.previewTable}>
                  <tbody>
                    {selData.preview.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* 우측 – 분석 파라미터 */}
        <div className={styles.rightPane}>
          <h3>🧠 분석 파라미터</h3>

          <fieldset>
            <legend>분석 종류</legend>
            <select value={selectedType} onChange={e => onTypeChange(e.target.value)}>
              {analysisTypes.map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </fieldset>

          <fieldset className={styles.inlineFieldset}>
          
              <legend>분석 대상 컬럼</legend>
              <div className={styles.checkboxGroup}>
                {columns.map(c => (
                  <label key={c} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(c)}
                      onChange={() => onColumnToggle(c)}
                    />
                    {c}
                  </label>
                ))}
              </div>
      
          </fieldset>

          <fieldset style={{ marginTop: '1rem' }}>
            <legend>추가 파라미터</legend>
            <label>
              학습률 (예시)
              <input
                type="number"
                value={params.learningRate ?? ''}
                onChange={e => onParamChange('learningRate', e.target.value)}
                style={{ width: '100%', marginTop: '.25rem' }}
              />
            </label>
          </fieldset>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className={styles.bottomBar}>
        <button
          className={styles.btnPrimary}
          onClick={onRequest}
          disabled={!selectedId || loading}
        >
          {loading ? '⏳ 분석 중…' : '🧪 분석 요청하기'}
        </button>
      </div>
    </div>
  );
}