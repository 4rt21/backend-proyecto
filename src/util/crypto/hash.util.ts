import { IsUUID } from 'class-validator';
import crypto, { createHash } from 'crypto';

export function sha256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export function randomName(bytes: number = 32): string {
  return crypto.randomBytes(bytes).toString('hex');
}
