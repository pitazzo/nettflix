import { IsBoolean, IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdateReviewDto {
  @IsString()
  content?: string;

  @IsBoolean()
  isPublic?: boolean;

  @IsNumber()
  @Min(0)
  @Max(10)
  score?: number;
}
