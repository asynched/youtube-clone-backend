import { stat } from 'fs/promises'
import { createReadStream, ReadStream } from 'fs'

type VideoStreamOptionsType = {
  start: number
  end: number
}

type VideoInfoType = {
  videoSize: number
  videoChunkSize: number
  videoStart: number
  videoEnd: number
}

export default class VideoFileHandler {
  /**
   * Factory for a VideoStreamOptions object
   * @param { VideoInfoType } videoInfo Video information
   * @returns { VideoStreamOptionsType } A VideoStreamOptions object
   */
  static getVideoStreamOptions({
    videoStart,
    videoEnd,
  }: VideoInfoType): VideoStreamOptionsType {
    return {
      start: videoStart,
      end: videoEnd,
    }
  }

  /**
   * Factory method for a video ReadStream
   * @param { string } videoPath Video file path
   * @param { VideoStreamOptionsType } videoStreamOptions Options object for the video stream
   * @returns { ReadStream } The video stream for the given video file path
   */
  static getVideoStream(
    videoPath: string,
    videoStreamOptions: VideoStreamOptionsType,
  ): ReadStream {
    return createReadStream(videoPath, videoStreamOptions)
  }

  /**
   * Factory method for the VideoInfo
   * @param { string } videoPath Video file path
   * @param { number } range Response range in bytes
   * @returns { VideoInfoType } A VideoInfo object
   */
  static async getVideoInfo(
    videoPath: string,
    range: string,
  ): Promise<VideoInfoType> {
    const videoStats = await stat(videoPath)
    const videoSize = videoStats.size
    const videoChunkSize = 1 * 1e6

    const videoStart = Number(range.replace(/\D/g, ''))
    const videoEnd = Math.min(videoStart + videoChunkSize, videoSize - 1)

    return {
      videoSize,
      videoChunkSize,
      videoStart,
      videoEnd,
    }
  }

  /**
   * Factory method for the default video headers
   * @param { VideoInfoType } videoInfo Video info object
   * @returns Response headers for the video stream
   */
  static getDefaultVideoHeaders(videoInfo: VideoInfoType) {
    const { videoStart, videoEnd, videoSize } = videoInfo

    const contentLength = videoEnd - videoStart + 1

    const headers = {
      'Content-Range': `bytes ${videoStart}-${videoEnd}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    }

    return headers
  }
}
