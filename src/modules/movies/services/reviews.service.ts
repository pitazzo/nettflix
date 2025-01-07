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

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async findByMovie(movieId: string): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { movie: { id: movieId }, isPublic: true },
      relations: ['user'],
    });
  }

  async create(
    movieId: string,
    userId: string,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
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
