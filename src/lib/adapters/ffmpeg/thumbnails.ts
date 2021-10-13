import * as path from 'path'
import * as ffmpeg from 'fluent-ffmpeg'
import { THUMBNAILS_PATH, VIDEOS_PATH } from 'src/config'

export const generateThumbnail = async (
  filename: string,
  timemark = 10,
): Promise<string> => {
  const absoluteFilename = path.join(VIDEOS_PATH, filename)
  const thumbnailFilename = filename.replace('.mp4', '')

  return new Promise((resolve, reject) => {
    const command = ffmpeg(absoluteFilename)

    command
      .screenshot({
        count: 1,
        timemarks: [timemark],
        filename: thumbnailFilename,
        folder: THUMBNAILS_PATH,
        size: '640x360',
      })
      .on('end', () => resolve(thumbnailFilename + '.png'))
      .on('error', (error: Error) => reject(error))
  })
}
