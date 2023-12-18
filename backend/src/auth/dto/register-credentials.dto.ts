import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx = /^.{8,20}$/;

export class RegisterCredentialsDto {
  @IsString({ message: 'Name must contain letters. ' })
  @MinLength(2, { message: 'Name must have at least 2 characters. ' })
  @IsNotEmpty({ message: 'Name is required. ' })
  name: string;

  @IsNotEmpty({ message: 'Email is required. ' })
  @IsEmail({}, { message: 'Email is invalid. ' })
  email: string;

  @IsNotEmpty({ message: 'Password is required. ' })
  @Matches(passwordRegEx, {
    message: `Password must be between 8 and 20 characters long. `,
  })
  password: string;
}
