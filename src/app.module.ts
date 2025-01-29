import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './modules/movies/movies.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'nettflix-netfflix.b.aivencloud.com',
      port: 23219,
      username: 'avnadmin',
      password: 'AVNS_Jiqi84gmgNwVGL-pjSA',
      database: 'defaultdb',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      ssl: { rejectUnauthorized: false },
    }),
    MoviesModule,
    UsersModule,
  ],
})
export class AppModule {}
