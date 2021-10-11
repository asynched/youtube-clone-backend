import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { VideoController } from './video/video.controller'

@Module({
  imports: [],
  controllers: [AppController, VideoController],
  providers: [AppService],
})
export class AppModule {}
