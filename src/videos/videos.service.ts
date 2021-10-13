import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateVideoFileDto } from './dto/create-video.dto'
import { Video, VideoDocument } from './entities/video.entity'
import { generateThumbnail } from 'src/lib/adapters/ffmpeg/thumbnails'

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  async create(createVideoDto: CreateVideoFileDto) {
    return await this.videoModel.create(createVideoDto)
  }

  async findAll(offset = 0) {
    const videos = await this.videoModel.find(null, null, {
      skip: offset,
      limit: 20,
    })

    return videos
  }

  async findOne(id: string) {
    const video = await this.videoModel.findById(id)
    return video
  }

  async generateThumbnail(filename: string): Promise<string> {
    return await generateThumbnail(filename)
  }
}
