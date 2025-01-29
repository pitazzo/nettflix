import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import { UserId } from 'src/modules/users/decorators/user-id.decorator';
import { Public } from 'src/modules/users/decorators/public.decorator';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Public()
  @Get()
  findAll(@Query('genre') genre?: string) {
    return this.moviesService.findAll(genre);
  }

  @Public()
  @Get('popular')
  findPopular(@Query('limit', ParseIntPipe) limit?: number) {
    return this.moviesService.findPopular(limit);
  }

  @Get('reviewed')
  findReviewed(@UserId() userId: string) {
    return this.moviesService.findReviewed(userId);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.findOne(id);
  }
}
