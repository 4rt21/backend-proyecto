import { IsUUID } from 'class-validator';
import crypto, { createHash } from 'crypto';

export function sha256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export function randomName(bytes: number = 32): string {
  return crypto.randomBytes(bytes).toString('hex');
}


export function secureRandomInt(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}