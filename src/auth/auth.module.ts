import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { TokensService } from "./tokens.service";
import { UserModule } from "src/users/user.module";

    
@Module({
    controllers: [AuthController],
    providers: [TokensService],
    imports: [UserModule]
})

export class AuthModule {}