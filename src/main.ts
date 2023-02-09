import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import "reflect-metadata";

async function bootstrap() {
  const port = parseInt(process.env.PORT, 10) || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("NestJS API example")
    .setDescription("NestJS API for personal learning")
    .setVersion("0.1.0")
    .setContact("API Support", "", "chutiphong.charoenchao@gmail.com")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}
bootstrap();
