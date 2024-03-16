"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: console,
    });
    console.log('App is staring');
    const config = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('Tasks example')
        .setDescription('The Task API description')
        .setVersion('1.0')
        .addTag('task')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(8000);
    console.log('App started');
}
bootstrap();
//# sourceMappingURL=main.js.map