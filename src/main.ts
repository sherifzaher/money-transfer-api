import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as session from 'express-session';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';

import { AppModule } from './app.module';
import { Session } from './utils/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 9001;
  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.useGlobalPipes(new ValidationPipe());

  const dataSource = app.get(DataSource);
  const sessionRepository = dataSource.getRepository(Session);

  app.use(
    session({
      name: 'CHUA_PAY_SESSION_ID',
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60 * 60 * 1000 * 24,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(PORT, () => console.log(`Running ChuaPay API on ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
