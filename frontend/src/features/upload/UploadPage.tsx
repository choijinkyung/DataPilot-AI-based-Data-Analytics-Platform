// pages/UploadPage.tsx
import React, { useCallback, useState } from 'react';
import UploadContent from './UploadContent';
import {uploadFile} from './UploadApi';
import {useNavigate} from 'react-router-dom'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [validation, setValidation] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [previewRows, setPreviewRows] = useState<string[][]>([]);
  const router = useNavigate();

  // 1) 파일 드롭
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
    const candidate = acceptedFiles[0];
    setFile(candidate);
    validateFile(candidate);
    generatePreview(candidate);
  }, []);

  // 2) 유효성 검사
  const validateFile = (f: File) => {
    const newVal: string[] = [];
    if (f.size === 0) newVal.push('📛 파일이 비어 있습니다.');
    const ext = f.name.split('.').pop()?.toLowerCase();
    if (ext && !['csv', 'xls', 'xlsx'].includes(ext)) newVal.push('📛 지원하지 않는 확장자입니다.');
    setValidation(newVal.length ? newVal : ['✅ 형식 확인 완료']);
  };

  // 3) 미리보기
  const generatePreview = (f: File) => {
    if (!f.name.endsWith('.csv')) {
      setPreviewRows([]); // 엑셀은 생략
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target?.result as string;
      const rows = text
        .split(/\r?\n/)
        .slice(0, 5)
        .map(r => r.split(','));
      setPreviewRows(rows);
    };
    reader.readAsText(f);
  };

  // 4) 업로드
  const handleUpload = () => {
    
    if (!file) return;
    setProgress(0);
    uploadFile(file, {
      onProgress: (p: number) => setProgress(p),
      onSuccess: (file) => {
        alert('파일 업로드가 완료되었습니다!');
        setFile(null);
        setValidation([]);
        setProgress(0);
        setPreviewRows([]);

        router(`/analyze?uploadId=${file.uploadId}`);
      },
      onError: (err: string) => {
        alert('업로드 중 오류가 발생했습니다: ' + err);
        setProgress(0);
      },
    });         
    
  };

  /** Dropzone 옵션을 객체로 만들어 Content에 전달 */
  const dropzoneOptions = {
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false,
  };

  return (
    <UploadContent
      dropzoneOptions={dropzoneOptions}
      file={file}
      validation={validation}
      progress={progress}
      previewRows={previewRows}
      onUpload={handleUpload}
    />
  );
}