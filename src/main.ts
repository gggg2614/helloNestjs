import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(session({ secret: "XiaoMan", name: "xm.session", rolling: true, cookie: { maxAge: null } }))
  app.enableVersioning({
    type: VersioningType.URI
  })
  const config = new DocumentBuilder()
    .setTitle('HellonNestjs')
    .setDescription('HelloNestjs')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-hello', app, document)
  await app.listen(3000);
}
bootstrap();
