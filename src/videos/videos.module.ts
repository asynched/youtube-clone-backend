import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { VideosService } from './videos.service'
import { VideosController } from './videos.controller'
import { Video, VideoSchema } from './entities/video.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Video.name,
        schema: VideoSchema,
      },
    ]),
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
