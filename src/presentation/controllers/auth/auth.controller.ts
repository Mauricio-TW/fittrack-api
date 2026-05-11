import { Body, Controller, Post } from '@nestjs/common';

import { LoginDto } from '../../../application/dto/login.dto';
import { AuthService } from '../../../application/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}