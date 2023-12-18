import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService, UserDetails } from '@/user';
import { LoginCredentialsDto, RegisterCredentialsDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(
    user: Readonly<RegisterCredentialsDto>,
  ): Promise<LoginCredentialsDto | any> {
    const { name, email, password } = user;

    const emailLowerCase = email.toLowerCase();
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      return new ConflictException('User already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.userService.createUser({
      name,
      email: emailLowerCase,
      password: hashedPassword,
    });

    return this.login({ email, password });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const isPasswordValid = await this.doesPasswordMatch(
      password,
      user.hashedPassword,
    );

    if (!isPasswordValid) return null;

    return this.userService._getUserDetails(user);
  }

  async login(
    existingUser: LoginCredentialsDto,
  ): Promise<{ user: UserDetails; token: string } | null> {
    const { email, password } = existingUser;
    const emailLowerCase = email.toLowerCase();

    const user = await this.validateUser(emailLowerCase, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ user });

    return { user: user, token: jwt };
  }
}
