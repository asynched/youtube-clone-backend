import * as path from 'path'

export const ROOT_PATH = process.cwd()
export const UPLOADS_PATH = path.join(ROOT_PATH, 'uploads')
export const VIDEOS_PATH = path.join(UPLOADS_PATH, 'videos')
export const THUMBNAILS_PATH = path.join(UPLOADS_PATH, 'thumbnails')
export const DOMAIN = `http://localhost:3333`
