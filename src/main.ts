import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 9001;
  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      name: 'CHUA_PAY_SESSION_ID',
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60 * 60 * 1000 * 24,
      },
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
