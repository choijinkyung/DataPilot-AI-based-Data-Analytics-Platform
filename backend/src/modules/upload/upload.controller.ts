import type{ Request, Response } from 'express';
import { getUploadedFiles ,deleteUploadedFile ,handleFileUpload} from './upload.service.ts';


export const uploadFile = async(req,res)=>{
    try{
        const file = req.files?.file; // Assuming you're using multer for file uploads
     
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }        
        const files = await handleFileUpload(file); // This should be defined in your service

        if (!files) {
            return res.status(500).json({ message: 'File upload failed' });
        }       
        return res.status(200).json({ message: 'File uploaded successfully', file: files });    
    }   catch(err){
        console.error('File upload error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllFiles = async(req: Request, res: Response) => {
    try {
        // Assuming you have a service to get uploaded files
        const files = await getUploadedFiles(); // This should be defined in your service
        return res.status(200).json(files);
    } catch (err) {
        console.error('Error fetching uploaded files:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteFile = async(req: Request, res: Response) => {
    try {
        const { id } = req.body; // Assuming you're sending the file ID in the request body
        if (!id) {
            return res.status(400).json({ message: 'File ID is required' });
        }
        
        // Call your service to delete the file by ID
        const result = await deleteUploadedFile(id); // This should be defined in your service
        
        return res.status(200).json(result);
    } catch (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}