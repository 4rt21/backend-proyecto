import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserService } from 'src/users/users.service';
import { TokensService } from 'src/auth/tokens.service';
import { UserRepository } from 'src/users/user.repository';
import { ImagesService } from 'src/images/images.service';

@Module({
  controllers: [AdminController],
  providers: [UserService, TokensService, UserRepository, ImagesService],
})
export class adminModule {}
