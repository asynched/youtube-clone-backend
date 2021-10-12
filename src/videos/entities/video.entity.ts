import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type VideoDocument = Video & Document

@Schema()
export class Video {
  @Prop()
  title: string

  @Prop()
  description: string

  @Prop()
  channel: string

  @Prop()
  filename: string

  @Prop({
    default: Date.now,
  })
  createdAt: Date
}

export const VideoSchema = SchemaFactory.createForClass(Video)
