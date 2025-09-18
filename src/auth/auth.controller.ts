import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { TokensService } from "./tokens.service";
import { UserService } from "src/users/users.service";
import { JwtAuthGuard } from "src/common/guards/jwt.auth.guard";
import type { AuthenticatedRequest } from "src/common/interfaces/authenticated-request";

@Controller("auth")
export class AuthController {
    constructor(private readonly tokenService: TokensService, private readonly userService: UserService) {}

    @Post("login")
    async login(@Body() dto: { email: string; password: string }) {
        const user = await this.userService.login(dto.email, dto.password);
        
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const userProfile = {id: user.id.toString(), email: user.email, name: user.name};

        const accessToken = await this.tokenService.generateAccessToken(userProfile);
        const refreshToken = await this.tokenService.generateRefreshToken(user.id.toString());

        return { accessToken, refreshToken };
    }

    @Get("profile")
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req: AuthenticatedRequest) {
        return {profile: req.user.profile};
    }

    @Post("refresh")
    async refresh(@Body() dto: { refreshToken: string }) {
        try {
            const profile = await this.tokenService.verifyRefreshToken(dto.refreshToken);
            const user = await this.userService.findById(profile.sub);
            if(!user) throw Error("Usuario no encontrado");
            const newAccessToken = await this.tokenService.generateAccessToken({id: user.id.toString(), email: user.email, name: user.name});
            const newRefreshToken = await this.tokenService.generateRefreshToken(user.id.toString());
            return {accessToken: newAccessToken};
        } catch (error) {
            throw new Error("Invalid refresh token");
        }
    }
}