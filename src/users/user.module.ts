import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./users.service";
import { UserRepository } from "./user.repository";
import { TokensService } from "src/auth/tokens.service";

@Module({
    controllers: [UserController],
    providers: [UserRepository, UserService, TokensService],
    exports: [UserService, UserRepository]
})

export class UserModule{}