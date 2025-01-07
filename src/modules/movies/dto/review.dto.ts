import { IsString, IsBoolean, IsNumber, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  content: string;

  @IsBoolean()
  isPublic: boolean;

  @IsNumber()
  @Min(0)
  @Max(10)
  score: number;
}
