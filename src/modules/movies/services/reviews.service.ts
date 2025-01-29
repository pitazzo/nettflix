import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { CreateReviewDto } from '../dto/review.dto';
import { UpdateReviewDto } from 'src/modules/movies/dto/update-review.dto';
import { Movie } from 'src/modules/movies/entities/movie.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findByMovie(movieId: string, userId: string | null): Promise<Review[]> {
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} was not found`);
    }

    return this.reviewRepository.find({
      where: userId
        ? [
            { movie: { id: movieId }, isPublic: true },
            { movie: { id: movieId }, user: { id: userId } },
          ]
        : [{ movie: { id: movieId }, isPublic: true }],
      relations: ['user'],
    });
  }

  async create(
    movieId: string,
    userId: string,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} was not found`);
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      movie: { id: movieId },
      user: { id: userId },
    });
    return this.reviewRepository.save(review);
  }

  async update(
    id: string,
    userId: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!review) {
      throw new NotFoundException(`Review with ${id} was not found`);
    }

    if (review.user.id !== userId) {
      throw new ForbiddenException(
        `User ${review.user.id} is not authorized to update review ${id}`,
      );
    }

    Object.assign(review, updateReviewDto);
    return this.reviewRepository.save(review);
  }

  async delete(id: string, userId: string): Promise<void> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!review) {
      throw new NotFoundException(`Review with ${id} was not found`);
    }

    if (review.user.id !== userId) {
      throw new ForbiddenException(
        `User ${review.user.id} is not authorized to delete review ${id}`,
      );
    }

    await this.reviewRepository.remove(review);
  }
}
