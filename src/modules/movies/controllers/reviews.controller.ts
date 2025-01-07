import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';
import { CreateReviewDto } from '../dto/review.dto';
import { JwtAuthGuard } from '../../users/guards/jwt-auth.guard';
import { User } from '../../users/decorators/user.decorator';
import { UpdateReviewDto } from '../dto/update-review.dto';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('movies/:movieId/reviews')
  findMovieReviews(@Param('movieId') movieId: string) {
    return this.reviewsService.findByMovie(movieId);
  }

  @Post('movies/:movieId/reviews')
  @UseGuards(JwtAuthGuard)
  create(
    @Param('movieId') movieId: string,
    @User('userId') userId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.create(movieId, userId, createReviewDto);
  }

  @Patch('reviews/:id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @User('userId') userId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(id, userId, updateReviewDto);
  }

  @Delete('reviews/:id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @User('userId') userId: string) {
    return this.reviewsService.delete(id, userId);
  }
}
