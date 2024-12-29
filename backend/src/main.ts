import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',  // Replace with your frontend's URL (for local dev, typically http://localhost:4200 for Angular)
    methods: 'GET, POST, PUT, DELETE', // You can specify the allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
    credentials: true,  // Enable cookies and credentials if needed
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();