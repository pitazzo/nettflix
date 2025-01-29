import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';
import { CreateReviewDto } from '../dto/review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { UserId } from 'src/modules/users/decorators/user-id.decorator';
import { Public } from 'src/modules/users/decorators/public.decorator';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Public()
  @Get('movies/:movieId/reviews')
  findMovieReviews(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @UserId() userId: string,
  ) {
    return this.reviewsService.findByMovie(movieId, userId);
  }

  @Post('movies/:movieId/reviews')
  create(
    @UserId() userId: string,
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.create(movieId, userId, createReviewDto);
  }

  @Patch('reviews/:id')
  update(
    @UserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(id, userId, updateReviewDto);
  }

  @Delete('reviews/:id')
  remove(@UserId() userId: string, @Param('id', ParseUUIDPipe) id: string) {
    return this.reviewsService.delete(id, userId);
  }
}
