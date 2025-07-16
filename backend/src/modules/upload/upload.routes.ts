import { Router } from 'express';
import { uploadFile,getAllFiles,deleteFile } from './upload.controller.ts';

const router = Router();

router.post('/', uploadFile);
router.get('/',getAllFiles)
router.delete('/', deleteFile); 
export default router;