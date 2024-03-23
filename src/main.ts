import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: console,
    });
    console.log('App is staring');

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Tasks example')
        .setDescription('The Task API description')
        .setVersion('1.0')
        .addTag('task')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(8000);
    console.log('App started');
}
bootstrap();
