import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { UserService } from 'src/users/users.service';
import { TokensService } from 'src/auth/tokens.service';

@Module({
    controllers: [AdminController],
    providers: [UserService, TokensService]
})

export class adminModule {}