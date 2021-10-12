import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateVideoFileDto } from './dto/create-video.dto'
import { UpdateVideoDto } from './dto/update-video.dto'
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
    return await this.videoModel.find(
      {},
      {},
      {
        skip: offset,
        limit: 20,
      },
    )
  }

  async findOne(id: string) {
    return await this.videoModel.findById(id)
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`
  }

  remove(id: number) {
    return `This action removes a #${id} video`
  }

  async generateThumbnail(filename: string): Promise<string> {
    return await generateThumbnail(filename)
  }
}
