import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Review } from './entities/review.entity';
import { MoviesService } from './services/movies.service';
import { ReviewsService } from './services/reviews.service';
import { MoviesController } from './controllers/movies.controller';
import { ReviewsController } from './controllers/reviews.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Review])],
  controllers: [MoviesController, ReviewsController],
  providers: [MoviesService, ReviewsService],
  exports: [MoviesService, ReviewsService],
})
export class MoviesModule {}
