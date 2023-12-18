import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';

export class PartialUpdateNoteDto extends PartialType(CreateNoteDto) {}
export class ReplaceNoteDto extends CreateNoteDto {}
