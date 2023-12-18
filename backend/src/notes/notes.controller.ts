import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';

import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { PartialUpdateNoteDto } from './dto/update-note.dto';
import { JwtGuard } from '@/auth';
import { GetUser } from '@/common';
import { UserDetails } from '@/user';

@Controller('notes')
@UseGuards(JwtGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @GetUser() user: UserDetails) {
    return this.notesService.createNote(createNoteDto, user.id);
  }

  @Get()
  findAll(@GetUser() user: UserDetails) {
    return this.notesService.findAllUserNotes(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: UserDetails) {
    return this.notesService.findOneNote(+id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() partialUpdateNoteDto: PartialUpdateNoteDto,
    @GetUser() user: UserDetails,
  ) {
    return this.notesService.partialUpdateNote(
      +id,
      partialUpdateNoteDto,
      user.id,
    );
  }

  @Put(':id')
  replace(
    @Param('id') id: string,
    @Body() replaceNoteDto: any,
    @GetUser() user: UserDetails,
  ) {
    return this.notesService.replaceNote(+id, replaceNoteDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: UserDetails) {
    return this.notesService.removeNote(+id, user.id);
  }

  @Post(':noteId/categories/:categoryId')
  addCategoryToNote(
    @Param('noteId') noteId: string,
    @Param('categoryId') categoryId: string,
    @GetUser() user: UserDetails,
  ) {
    return this.notesService.addCategoryToNote(+noteId, +categoryId, user.id);
  }

  @Delete(':noteId/categories/:categoryId')
  removeCategoryFromNote(
    @Param('noteId') noteId: string,
    @Param('categoryId') categoryId: string,
    @GetUser() user: UserDetails,
  ) {
    return this.notesService.removeCategoryFromNote(
      +noteId,
      +categoryId,
      user.id,
    );
  }
}
