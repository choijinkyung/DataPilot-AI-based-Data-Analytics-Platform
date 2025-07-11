// utils/fileDownload.ts
export const downloadCsv = (obj: Record<string, number>, filename: string) => {
    const rows = Object.entries(obj).map(([k, v]) => `${k},${v}`).join('\n');
    const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' });
    trigger(blob, filename);
  };
  
  export const downloadPng = (canvasId: string, filename: string) => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;
    canvas.toBlob(blob => blob && trigger(blob, filename));
  };
  
  const trigger = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };