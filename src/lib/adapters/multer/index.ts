import type { Request } from 'express'

export type MulterFilenameAdapterCallback = (filename: string) => string
export type MulterFilenameCallback = (error: Error, filename: string) => void

export function multerFilenameAdapter(callback: MulterFilenameAdapterCallback) {
  return (
    _request: Request,
    file: Express.Multer.File,
    cb: MulterFilenameCallback,
  ) => {
    const filename = callback(file.originalname)
    cb(null, filename)
  }
}
