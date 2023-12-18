import {
  IsHexColor,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @MaxLength(40, { message: 'Name must have at most 120 characters.' })
  @IsNotEmpty()
  name: string;

  @IsHexColor({ message: 'Color must be a valid hexadecimal color.' })
  color: string;
}
