import { describe, expect, test } from '@jest/globals';
import bcrypt from 'bcryptjs';

describe('AuthService', () => {
  test('Compare les mots de passe (hasher)', async () => {
    const password = 'test123';
    const hashed = await bcrypt.hash(password, 10);

    const isValid = await bcrypt.compare(password, hashed);
    expect(isValid).toBe(true);
  });

  test('Rejette un mot de passe invalide', async () => {
    const password = 'test123';
    const wrongPassword = 'wrong123';
    const hashed = await bcrypt.hash(password, 10);

    const isValid = await bcrypt.compare(wrongPassword, hashed);
    expect(isValid).toBe(false);
  });
});
