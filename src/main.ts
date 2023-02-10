import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import "reflect-metadata";
import { TypeormStore } from "connect-typeorm/out";
import * as session from "express-session";
import * as passport from "passport";
import { DataSource, getRepository } from "typeorm";
import entities, { Session } from "./utils/typeorm";

async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;

  const port = parseInt(PORT, 10) || 3000;
  const app = await NestFactory.create(AppModule);

  const myDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_DB_HOST,
    port: parseInt(process.env.POSTGRES_DB_PORT),
    username: process.env.POSTGRES_DB_USERNAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    synchronize: true,
    entities,
  });

  const sessionRepository = myDataSource.getRepository(Session);

  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: [`http://localhost:${PORT}`], credentials: true });

  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 86400000, // cookie expires 1 day later
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

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
