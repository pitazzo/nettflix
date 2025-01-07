import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import { JwtAuthGuard } from '../../users/guards/jwt-auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(@Query('genre') genre?: string) {
    return this.moviesService.findAll(genre);
  }

  @Get('popular')
  findPopular(@Query('limit') limit?: number) {
    return this.moviesService.findPopular(limit);
  }

  @Get('reviewed')
  @UseGuards(JwtAuthGuard)
  findReviewed() {
    return this.moviesService.findReviewed();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }
}
