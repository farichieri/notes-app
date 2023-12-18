import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserDetails } from '@/user';
import { LoginCredentialsDto, RegisterCredentialsDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: RegisterCredentialsDto): Promise<UserDetails | null> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: LoginCredentialsDto): Promise<{ token: string } | null> {
    return this.authService.login(user);
  }
}
