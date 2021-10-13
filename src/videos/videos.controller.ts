import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
  Logger,
  Query,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { Request, Response } from 'express'
import { VIDEOS_PATH } from 'src/config'
import { multerFilenameAdapter } from 'src/lib/adapters/multer'
import { generateRandomFilename } from 'src/utils/files'
import { VideosService } from './videos.service'
import { CreateVideoDto } from './dto/create-video.dto'
import VideoFileHandler from 'src/lib/video-file-handler'

@Controller('videos')
export class VideosController {
  private readonly logger = new Logger(VideosController.name)

  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: VIDEOS_PATH,
        filename: multerFilenameAdapter(generateRandomFilename),
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createVideoDto: CreateVideoDto,
  ) {
    const thumbnail = await this.videosService.generateThumbnail(file.filename)
    const video = await this.videosService.create({
      ...createVideoDto,
      filename: file.filename,
      thumbnail: thumbnail,
    })

    return video
  }

  @Get()
  findAll(@Query('page') page?: string) {
    this.logger.log(page)
    return this.videosService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id)
  }

  @Get('media/:id')
  async getVideoFile(@Req() request: Request, @Res() response: Response) {
    try {
      const id = request.params.id
      const video = await this.videosService.findOne(id)
      const range = request.headers['range']

      const videoPath = VideoFileHandler.getAbsolutePath(video.filename)

      const videoFileInfo = await VideoFileHandler.getVideoFileInfo(
        videoPath,
        range,
      )

      const { responseHeaders, videoStream } = videoFileInfo

      response.writeHead(206, responseHeaders)
      videoStream.pipe(response)
    } catch (error) {
      this.logger.error(error)
      return response.status(404).json({
        error: `Video with id "${request.params.id}" was not found`,
      })
    }
  }
}
