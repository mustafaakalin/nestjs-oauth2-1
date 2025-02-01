import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // Cache TTL in seconds
      max: 10, // Maximum number of items in cache
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USER || 'your-username',
    password: process.env.DB_PASSWORD || 'your-password',
    database: process.env.DB_NAME || 'your-db-name',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // Set to false in production
  }),
    UsersModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
