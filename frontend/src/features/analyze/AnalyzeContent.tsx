import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './Analyze.module.scss'

// -------------------------------
// AnalyzeContent (UI + 최소 비즈니스 로직)
// -------------------------------
function AnalyzeContent() {
  const [file, setFile] = useState<File | null>(null)
  const [validation, setValidation] = useState<string[]>([])
  const [progress, setProgress] = useState<number>(0)
  const [previewRows, setPreviewRows] = useState<string[][]>([])

  // 파일 Drag & Drop or Click
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return
    const candidate = acceptedFiles[0]
    setFile(candidate)
    validateFile(candidate)
    generatePreview(candidate)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false
  })

  // 간단한 유효성 검사 (CSV 컬럼수 체크 등 – 데모용)
  const validateFile = (f: File) => {
    const newVal: string[] = []
    if (f.size === 0) newVal.push('📛 파일이 비어 있습니다.')
    // 기타 확장자 검사
    const ext = f.name.split('.').pop()?.toLowerCase()
    if (ext && !['csv', 'xls', 'xlsx'].includes(ext)) newVal.push('📛 지원하지 않는 확장자입니다.')
    setValidation(newVal.length ? newVal : ['✅ 형식 확인 완료'])
  }

  // CSV 첫 5줄 미리보기 (Excel → 생략)
  const generatePreview = (f: File) => {
    const reader = new FileReader()
    reader.onload = e => {
      const text = e.target?.result as string
      const rows = text.split(/\r?\n/).slice(0, 5).map(r => r.split(','))
      setPreviewRows(rows)
    }
    reader.readAsText(f)
  }

  // 업로드 버튼 클릭 → 가짜 progress
  const handleUpload = () => {
    if (!file) return
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 150)
  }

  return (
    <div className={styles.container}>
      {/* 드래그&드롭 영역 */}
      <section {...getRootProps()} className={styles.dropArea}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>📂 파일을 여기에 놓아주세요…</p>
        ) : (
          <p>📂 <span className={styles.highlight}>여기로 파일을 드래그</span> 하세요<br/>또는 <span className={styles.btnFake}>파일 선택</span> 버튼</p>
        )}
      </section>

      {/* 유효성 결과 */}
      {file && (
        <section className={styles.validationBox}>
          <h3>✅ 유효성 체크 결과</h3>
          <ul>
            {validation.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        </section>
      )}

      {/* 진행률 */}
      {progress > 0 && (
        <section className={styles.progressBarWrapper}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          <span>{progress}%</span>
        </section>
      )}

      {/* 데이터 미리보기 */}
      {previewRows.length > 0 && (
        <section className={styles.previewBox}>
          <h3>🔍 데이터 미리보기 (상위 5개 행)</h3>
          <table>
            <tbody>
              {previewRows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* 업로드 버튼 */}
      <button className={styles.uploadBtn} onClick={handleUpload} disabled={!file || progress > 0 && progress < 100}>
        ▶️ 업로드하기
      </button>
    </div>
  )
}

export default AnalyzeContent