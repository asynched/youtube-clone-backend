import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { THUMBNAILS_PATH } from './config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  })

  app.useStaticAssets(THUMBNAILS_PATH, {
    prefix: '/static',
  })

  await app.listen(process.env.PORT || 3333)
}

bootstrap()
