// components/UploadContent.tsx
import React from 'react';
import type { DropzoneProps } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import styles from './Upload.module.scss';

type Props = {
  dropzoneOptions: Partial<DropzoneProps>;  // onDrop 등 Page에서 전달
  file: File | null;
  validation: string[];
  progress: number;
  previewRows: string[][];
  onUpload: () => void;
};

export default function UploadContent({
  dropzoneOptions,
  file,
  validation,
  progress,
  previewRows,
  onUpload,
}: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions);

  return (
    <div className={styles.container}>
      {/* 드래그&드롭 영역 */}
      <section {...getRootProps()} className={styles.dropArea}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>📂 파일을 여기에 놓아주세요…</p>
        ) : (
          <p>
            📂 <span className={styles.highlight}>여기로 파일을 드래그</span> 하세요
            <br />
            또는 <span className={styles.btnFake}>파일 선택</span> 버튼
          </p>
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
      <button
        className={styles.uploadBtn}
        onClick={onUpload}
        disabled={!file || (progress > 0 && progress < 100)}
      >
        ▶️ 업로드하기
      </button>
    </div>
  );
}