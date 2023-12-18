import { Repository } from 'typeorm';
import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Note } from './entities';
import { CreateNoteDto } from './dto/create-note.dto';
import { PartialUpdateNoteDto, ReplaceNoteDto } from './dto/update-note.dto';
import { noteDto } from '@/utils';
import { CategoriesService } from '@/categories';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private readonly notesRepository: Repository<Note>,
    @Inject(forwardRef(() => CategoriesService))
    private categoriesService: CategoriesService,
  ) {}

  async createNote(
    createNoteDto: CreateNoteDto,
    userId: number,
  ): Promise<Note | any> {
    const { title, content, categoryIds } = createNoteDto;

    const categories = await this.categoriesService.findCategoriesByIds(
      categoryIds,
      userId,
    );

    const obj = {
      title,
      content,
      userId,
      categories,
    };

    const newNote = this.notesRepository.create(obj);
    return this.notesRepository.save(newNote);
  }

  async findAllUserNotes(userId: number): Promise<Note[]> {
    const notes = await this.notesRepository.find({
      relations: ['categories'],
      where: { userId },
    });
    if (!notes) {
      throw new NotFoundException('Notes not found');
    }
    return notes.map((note) => noteDto(note));
  }

  async findOneNote(id: number, userId: number): Promise<Note | any> {
    const note = await this.notesRepository.findOne({
      relations: ['categories'],
      where: { id, userId },
    });
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return note;
  }

  async partialUpdateNote(
    id: number,
    updateNoteDto: PartialUpdateNoteDto,
    userId: number,
  ) {
    const note: Note = await this.notesRepository.findOne({
      where: { id, userId },
      relations: ['categories'],
    });
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }

    if (updateNoteDto.categoryIds) {
      const newCategories = await this.categoriesService.findCategoriesByIds(
        updateNoteDto.categoryIds,
        userId,
      );
      note.categories = newCategories;
    }

    Object.assign(note, updateNoteDto);
    return this.notesRepository.save(note);
  }

  async replaceNote(
    id: number,
    replaceNoteDto: ReplaceNoteDto,
    userId: number,
  ) {
    const note: Note = await this.notesRepository.findOne({
      where: { id, userId },
      relations: ['categories'],
    });
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }

    if (replaceNoteDto.categoryIds) {
      const newCategories = await this.categoriesService.findCategoriesByIds(
        replaceNoteDto.categoryIds,
        userId,
      );
      note.categories = newCategories;
    }

    note.title = replaceNoteDto.title;
    note.content = replaceNoteDto.content;
    return this.notesRepository.save(note);
  }

  async removeNote(id: number, userId: number) {
    const result = await this.notesRepository.delete({ id, userId });
    if (result.affected > 0) {
      return { message: 'Note deleted successfully' };
    } else {
      throw new NotFoundException('Note not found');
    }
  }

  async addCategoryToNote(
    noteId: number,
    categoryId: number,
    userId: number,
  ): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: { id: noteId, userId },
      relations: ['categories'],
    });
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    const category = await this.categoriesService.findOne(categoryId, userId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (!note.categories.some((cat) => cat.id === categoryId)) {
      note.categories.push(category);
      await this.notesRepository.save(note);
    }

    return note;
  }

  async removeCategoryFromNote(
    noteId: number,
    categoryId: number,
    userId: number,
  ): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: { id: noteId, userId },
      relations: ['categories'],
    });
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    note.categories = note.categories.filter((cat) => cat.id !== categoryId);
    await this.notesRepository.save(note);

    return note;
  }
}
