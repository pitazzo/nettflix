import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { SignupDto } from 'src/modules/users/dto/singup.dto';
import { UserDto } from 'src/modules/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    const user = this.userRepository.create({
      username: signupDto.username,
      firstName: signupDto.firstName,
      lastName: signupDto.lastName,
      password: hashedPassword,
    });

    return {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id };
    return {
      profile: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token: this.jwtService.sign(payload),
      type: 'Bearer',
    };
  }
}
