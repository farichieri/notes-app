import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ReplaceCategoryDto,
  PartialUpdateCategoryDto,
} from './dto/update-category.dto';
import { JwtGuard } from '@/auth';
import { UserDetails } from '@/user';
import { GetUser } from '@/common';

@Controller('categories')
@UseGuards(JwtGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: UserDetails,
  ) {
    const category = this.categoriesService.createCategory(
      createCategoryDto,
      user.id,
    );

    return category;
  }

  @Get()
  findAll(@GetUser() user: UserDetails) {
    return this.categoriesService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: UserDetails) {
    return this.categoriesService.findOne(+id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() partialUpdateCategoryDto: PartialUpdateCategoryDto,
    @GetUser() user: UserDetails,
  ) {
    return this.categoriesService.partiallyUpdateCategory(
      +id,
      partialUpdateCategoryDto,
      user.id,
    );
  }

  @Put(':id')
  replace(
    @Param('id') id: string,
    @Body() replaceCategoryDto: ReplaceCategoryDto,
    @GetUser() user: UserDetails,
  ) {
    return this.categoriesService.replaceCategory(
      +id,
      replaceCategoryDto,
      user.id,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: UserDetails) {
    return this.categoriesService.remove(+id, user.id);
  }
}
