import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import {
  PartialUpdateCategoryDto,
  ReplaceCategoryDto,
} from './dto/update-category.dto';
import { Category } from './entities';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    userId: number,
  ): Promise<Category | any> {
    const { name, color } = createCategoryDto;
    const obj = { name, color, userId };
    const newCategory = this.categoriesRepository.create(obj);

    return this.categoriesRepository.save(newCategory);
  }

  async findAll(userId: number): Promise<Category[]> {
    const categories = await this.categoriesRepository.find({
      relations: ['notes', 'user'],
      where: { userId },
    });
    if (!categories) {
      throw new NotFoundException('Categories not found');
    }
    return categories;
  }

  async findOne(id: number, userId: number): Promise<Category | any> {
    const category = await this.categoriesRepository.findOne({
      relations: ['notes'],
      where: { id, userId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async partiallyUpdateCategory(
    id: number,
    partialUpdateCategoryDto: PartialUpdateCategoryDto,
    userId: number,
  ): Promise<Category | any> {
    const category = await this.categoriesRepository.findOne({
      relations: ['notes'],
      where: { userId, id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    Object.assign(category, partialUpdateCategoryDto);

    return await this.categoriesRepository.save(category);
  }

  async replaceCategory(
    id: number,
    replaceCategoryDto: ReplaceCategoryDto,
    userId: number,
  ): Promise<Category | any> {
    const category = await this.categoriesRepository.findOne({
      relations: ['notes'],
      where: { userId, id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const updatedCategory = await this.categoriesRepository.save({
      ...category,
      ...replaceCategoryDto,
    });

    return updatedCategory;
  }

  async remove(id: number, userId: number): Promise<{ affected?: number }> {
    const category = await this.categoriesRepository.findOne({
      relations: ['notes'],
      where: { userId, id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.notes.length > 0) {
      throw new BadRequestException('Category is related to one or more notes');
    }

    return this.categoriesRepository.delete({ id, userId });
  }

  async findCategoriesByIds(
    categoryIds: number[],
    userId: number,
  ): Promise<Category[]> {
    if (!categoryIds.length) {
      return [];
    }

    const categories = await this.categoriesRepository
      .createQueryBuilder('category')
      .where('category.id IN (:...ids)', { ids: categoryIds })
      .andWhere('category.userId = :userId', { userId })
      .getMany();

    if (!categories.length) {
      throw new NotFoundException('Categories not found');
    }
    return categories;
  }
}
