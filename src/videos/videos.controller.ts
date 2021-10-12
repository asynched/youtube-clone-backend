import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { multerFilenameAdapter } from 'src/lib/adapters/multer'
import { generateRandomFilename } from 'src/utils/files'
import { VideosService } from './videos.service'
import { CreateVideoDto } from './dto/create-video.dto'
import { UpdateVideoDto } from './dto/update-video.dto'

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './public/videos',
        filename: multerFilenameAdapter(generateRandomFilename),
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createVideoDto: CreateVideoDto,
  ) {
    console.log(file)
    console.log(createVideoDto)
    const video = await this.videosService.create({
      ...createVideoDto,
      filename: file.filename,
    })

    return video
    // return this.videosService.create(createVideoDto)
  }

  @Get()
  findAll() {
    return this.videosService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id)
  }
}
