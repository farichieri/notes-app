import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

export class PartialUpdateCategoryDto extends PartialType(CreateCategoryDto) {}
export class ReplaceCategoryDto extends CreateCategoryDto {}
