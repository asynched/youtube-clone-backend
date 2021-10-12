export class CreateVideoDto {
  title: string
  description: string
  channel: string
}

export type CreateVideoFileDto = CreateVideoDto & {
  filename: string
}
