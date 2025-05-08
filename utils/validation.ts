import { MAX_BINARY_LENGTH } from '@/constants/constants';

export function isValidBinary(input: string): boolean {
  const regex = new RegExp(`^[01]{1,${MAX_BINARY_LENGTH}}$`);
  return regex.test(input);
}
