import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  role_id: 1 | 2 
};

export type AccessPayload = {
  sub: string; // identificador de usuario
  type: 'access';
  profile: UserProfile;
};

export type RefreshPayload = {
  sub: string; // identificador de usuario
  type: 'refresh';
};

@Injectable()
export class TokensService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(profile: UserProfile): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: profile.id,
        type: 'access',
        profile: profile,
      },
      { expiresIn: '1h', secret: 'supersecret' },
    );
  }

  async generateRefreshToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: userId,
        type: 'refresh',
      },
      { expiresIn: '7d', secret: 'supersecret' },
    );
  }

  async verifyAccess(token: string): Promise<AccessPayload> {
    const payload = await this.jwtService.verifyAsync<AccessPayload>(token, {
      secret: 'supersecret',
    });
    if (payload.type !== 'access') {
      throw new Error('Invalid token type');
    }
    return payload;
  }

  async verifyRefreshToken(token: string): Promise<RefreshPayload> {
    const payload = await this.jwtService.verifyAsync<RefreshPayload>(token, {
      secret: 'supersecret',
    });

    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type');
    }

    return payload;
  }
}
