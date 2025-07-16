import path from 'path'
import fs from 'fs/promises'
import { PrismaClient } from '@prisma/client'
import { fileURLToPath } from 'url'

const prisma = new PrismaClient()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadDir = path.join(__dirname, '..', 'uploads')

export const handleFileUpload = async (file) => {
  const savePath = path.join(uploadDir, file.name)

  // 디렉터리 존재 확인 및 생성
  await fs.mkdir(uploadDir, { recursive: true })

  // 파일 저장
  await file.mv(savePath)

  // DB에 메타데이터 저장
  const uploadedFile = await prisma.uploadedFile.create({
    data: {
      filename: file.name,
      filepath: `/upload/storage/${file.name}`,
      mimetype: file.mimetype,
      size: file.size,
    },
  })

  return uploadedFile
}

export const getUploadedFiles = async () => {
  const files = await prisma.uploadedFile.findMany()
  return files
}

export const deleteUploadedFile = async (id: string) => {
  const file = await prisma.uploadedFile.findUnique({ where: { id } })
  if (!file) throw new Error('File not found')

  // 파일 시스템에서 삭제
  const filePath = path.join(uploadDir, file.filename)
  await fs.unlink(filePath)

  // DB에서 삭제
  await prisma.uploadedFile.delete({ where: { id } })

  return { message: 'File deleted successfully' }
}
export const getFileById = async (id: string) => {
  const file = await prisma.uploadedFile.findUnique({ where: { id } })
  if (!file) throw new Error('File not found')

  return file
}
