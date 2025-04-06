import { IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsString()
  @MinLength(8)
  password: string;
}
