import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(genre?: string): Promise<Movie[]> {
    if (genre) {
      return this.movieRepository.find({ where: { genre } });
    }
    return this.movieRepository.find();
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} was not found`);
    }
    return movie;
  }

  async findPopular(limit: number = 10): Promise<Movie[]> {
    return await this.movieRepository
      .createQueryBuilder('movie')
      .leftJoin('movie.reviews', 'review')
      .select('movie.id', 'id')
      .addSelect('movie.title', 'title')
      .addSelect('COALESCE(AVG(review.score), 0)', 'averageScore')
      .groupBy('movie.id')
      .orderBy('COALESCE(AVG(review.score), 0)', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  async findReviewed(userId: string): Promise<Movie[]> {
    return this.movieRepository.find({
      where: {
        reviews: { user: { id: userId } },
      },
      relations: ['reviews'],
    });
  }
}
