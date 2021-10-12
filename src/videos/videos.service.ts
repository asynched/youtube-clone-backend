import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateVideoFileDto } from './dto/create-video.dto'
import { UpdateVideoDto } from './dto/update-video.dto'
import { Video, VideoDocument } from './entities/video.entity'

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  async create(createVideoDto: CreateVideoFileDto) {
    return await this.videoModel.create(createVideoDto)
  }

  findAll() {
    return `This action returns all videos`
  }

  findOne(id: number) {
    return `This action returns a #${id} video`
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`
  }

  remove(id: number) {
    return `This action removes a #${id} video`
  }
}
