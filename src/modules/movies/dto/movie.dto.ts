import { IsString, IsDateString } from 'class-validator';

export class MovieDto {
  @IsString()
  title: string;

  @IsString()
  director: string;

  @IsString()
  synopsis: string;

  @IsDateString()
  releaseDate: string;

  @IsString()
  genre: string;
}
