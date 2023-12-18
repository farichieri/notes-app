import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateNoteDto {
  @IsString({ message: 'Title must be a string. ' })
  @MinLength(2, { message: 'Title must have at least 2 characters. ' })
  @MaxLength(120, { message: 'Title must have at most 120 characters. ' })
  @IsNotEmpty({ message: 'Title is required. ' })
  title: string;

  @IsString({ message: 'Content must be a string. ' })
  content: string;

  @IsArray({ message: 'Categories must be an array. ' })
  categoryIds: number[];
}
