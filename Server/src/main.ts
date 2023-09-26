import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';
import * as expressEjsLayouts from 'express-ejs-layouts';
import { json, urlencoded } from 'express';
import bodyParser from 'body-parser';
import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{cors:true});
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ["1"]
  });
  app.setGlobalPrefix('api'); 
 
  const config = new DocumentBuilder()
    .setTitle('All Apis')
    .setDescription('The All API description')
    .setVersion('1.0')
    .addTag('shops')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //pipe
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: false
    }   
  ));

  //ulend code
  app.use(json());
  app.use(urlencoded({ extended: true }));

  

//body parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//multer
  // Cấu hình multer middleware
  const upload = multer({ dest: 'uploads/' });
  app.use(upload.any());


  //ejs
  app.useStaticAssets(path.join(__dirname, '..', 'public')); // (optional) Specify a public directory for static assets
  app.setBaseViewsDir(path.join(__dirname, '..', 'views')); // Specify the directory where your views are located
  app.set('view engine', 'ejs');
  app.use(expressEjsLayouts);

  await app.listen(process.env.PORT);
}
bootstrap();