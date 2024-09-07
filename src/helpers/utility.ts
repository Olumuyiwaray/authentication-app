import * as bcrypt from 'bcrypt';

/**
 * Hashes a given password using bcrypt.
 * @param password - The plain text password to hash.
 * @returns The hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}

/**
 * Compares a given plain text password with a hashed password.
 * @param plainPassword - The plain text password to compare.
 * @param hashedPassword - The hashed password to compare against.
 * @returns True if passwords match, otherwise false.
 */
export async function comparePassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
