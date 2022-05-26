import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UpdateNameDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Put('name')
  updateName(
    @Body() updateNameDto: UpdateNameDto,
    @GetUser('email') email: string,
  ) {
    const user = this.userService.updateName(
      email,
      updateNameDto.firstName,
      updateNameDto.lastName,
    );
    return user;
  }
}
