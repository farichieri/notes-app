import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

const passwordRegEx = /^.{8,20}$/;

export class LoginCredentialsDto {
  @IsNotEmpty({ message: 'Email is required. ' })
  @IsEmail({}, { message: 'Email is invalid. ' })
  email: string;

  @IsNotEmpty({ message: 'Password is required. ' })
  @Matches(passwordRegEx, {
    message: `Password must be between 8 and 20 characters long. `,
  })
  password: string;
}
