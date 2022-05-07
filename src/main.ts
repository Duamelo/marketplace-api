
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
  .setTitle('AHI api description')
  .setDescription('This API is the first step to build a large markeplace system')
  .setVersion('1.0')
  .addTag('Marketplace')
  .build();

  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  
const document = SwaggerModule.createDocument(app, config, options);
SwaggerModule.setup('documentation', app, document);



  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();