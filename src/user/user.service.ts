import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateName(
    email: string,
    firstName: string,
    lastName: string,
  ) {
    const user = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        firstName,
        lastName,
      },
    });

    delete user.hash;

    return user;
  }
}
