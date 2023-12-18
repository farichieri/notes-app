import { PartialType } from '@nestjs/mapped-types';
import { RegisterCredentialsDto } from '@/auth/dto';

export class PartialUpdateUserDto extends PartialType(RegisterCredentialsDto) {}
export class ReplaceUserDto extends RegisterCredentialsDto {}
