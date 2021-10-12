import * as path from 'path'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { VideosModule } from './videos/videos.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/youtube'),
    VideosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
