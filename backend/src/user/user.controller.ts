import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { ReplaceUserDto, PartialUpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '@/auth';
import { GetUser } from '@/common';
import { UserDetails } from './user-details.interface';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneUser(+id);
  }

  @Patch()
  update(
    @Body() partialUpdateUserDto: PartialUpdateUserDto,
    @GetUser() user: UserDetails,
  ) {
    return this.userService.partialUpdateUser(user.id, partialUpdateUserDto);
  }

  @Put()
  replace(
    @GetUser() user: UserDetails,
    @Body() replaceUserDto: ReplaceUserDto,
  ) {
    return this.userService.replaceUser(user.id, replaceUserDto);
  }

  @Delete()
  remove(@GetUser() user: UserDetails) {
    return this.userService.removeUser(user.id);
  }
}
