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
    return this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.reviews', 'review')
      .addSelect('AVG(review.score)', 'avgScore')
      .groupBy('movie.id')
      .orderBy('avgScore', 'DESC')
      .limit(limit)
      .getMany();
  }

  async findReviewed(): Promise<Movie[]> {
    return this.movieRepository
      .createQueryBuilder('movie')
      .innerJoinAndSelect('movie.reviews', 'review')
      .where('review.isPublic = :isPublic', { isPublic: true })
      .getMany();
  }
}
