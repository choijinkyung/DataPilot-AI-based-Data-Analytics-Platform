import { z } from 'zod';

export const uploadSchema = z.object({
  name: z.string().min(1),
  mimetype: z.string().min(1), // 예: "image/png", "application/pdf" 등
  size: z.number().int().positive().max(10 * 1024 * 1024), // 최대 10MB 제한
});

export type UploadDto = z.infer<typeof uploadSchema>;