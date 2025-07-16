import axios from 'axios';
interface UploadFileOptions {
  onProgress?: (percent: number) => void;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const uploadFile = async (file: File,options: UploadFileOptions = {}): Promise<void> => {
  // 실제라면 POST /api/upload
  const { onProgress, onSuccess, onError } = options;
  try {
    const formData = new FormData();
    formData.append('file', file);

    await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress?.(percent);
        }
      },
    });

    console.log('파일 업로드 성공:', file.name);
    onSuccess?.();
  } catch (error: any) {
    console.error('업로드 실패:', error);
    const message = error?.response?.data?.message || error.message || 'Unknown error';
    onError?.(message);
  }
}