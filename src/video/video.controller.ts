import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Res,
  Req,
} from '@nestjs/common'
import { Express, Request, Response } from 'express'
import { writeFile } from 'fs/promises'
import { FileInterceptor } from '@nestjs/platform-express'
import { VideoType } from './video.module.types'
import VideoFileHandler from 'src/utils/video-file-handler'
import * as path from 'path'

const getID = (): string =>
  String(Math.floor(Math.random() * 1_000_000) % 10_000)

@Controller('video')
export class VideoController {
  @Get()
  getVideos(): VideoType[] {
    return []
  }

  @Get(':id')
  async getVideo(
    @Param('id') _id: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const range = request.headers['range']
    const videoPath = path.join(process.cwd(), 'public', 'video', '6550.mp4')

    const videoInfo = await VideoFileHandler.getVideoInfo(videoPath, range)
    const videoStreamOptions = VideoFileHandler.getVideoStreamOptions(videoInfo)
    const headers = VideoFileHandler.getDefaultVideoHeaders(videoInfo)

    const videoStream = VideoFileHandler.getVideoStream(
      videoPath,
      videoStreamOptions,
    )

    response.writeHead(206, headers)

    videoStream.pipe(response)
  }

  @Post()
  @UseInterceptors(FileInterceptor('video'))
  async registerVideo(@UploadedFile() file: Express.Multer.File, @Body() body) {
    await writeFile(`public/video/${getID()}.mp4`, file.buffer)

    return { message: 'Successfully uploaded', data: body }
  }
}
