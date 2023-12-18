import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './entities';
import { CategoriesModule } from '@/categories';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
    forwardRef(() => CategoriesModule),
  ],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService],
})
export class NotesModule {}
