import type { licensePayload } from '../types';

import { formatDateToDDMMYY } from '@/lib/date';

const FIRST_NAME_CODES = [
  ['A', 'B'], // 1
  ['C'], // 2
  ['D', 'E', 'F'], // 3
  ['G', 'H', 'I'], // 4
  ['J', 'K', 'L'], // 5
  ['M', 'N', 'O'], // 6
  ['P', 'Q', 'R'], // 7
  ['S', 'T'], // 8
  ['U', 'V', 'W', 'X', 'Y', 'Z'], // 9
];

const LAST_NAME_CODES = [
  ['B', 'F', 'P', 'V'], // 1
  ['C', 'G', 'K', 'J', 'Q', 'S', 'X', 'Z'], // 2
  ['D', 'T'], // 3
  ['L'], // 4
  ['M', 'N'], // 5
  ['R'], // 6
];

/**
 * Encode given string
 *
 * @param value
 * @param codes
 */
function encode(value: string, codes: string[][]): string {
  return String(codes.findIndex((group) => group.includes(value)) + 1);
}

/**
 * Encode first name
 *
 * @param firstName
 * @returns
 */
function encodeLastName(lastName: string): string {
  lastName = lastName
    .toUpperCase()
    .substring(1)
    .replace(/[AEIOUYHW]/g, '');

  let ret = '';

  for (const char of lastName) {
    ret += encode(char, LAST_NAME_CODES);
  }

  return ret
    .replace(/(.)\1+/g, '$1')
    .padEnd(3, '0')
    .substring(0, 3);
}

/**
 * Encode last name
 *
 * @param lastName
 * @returns
 */
function encodeFirstName(firstName: string): string {
  return encode(firstName.toUpperCase().substring(0, 1), FIRST_NAME_CODES);
}

function getCode(str: string): number {
  const values = str.replace(/-/g, '');
  let value = 0;

  for (let i = 0; i < values.length; i++) {
    if (i === 0) {
      value += (parseInt(values[i], 36) - 9) * 12;
    } else {
      const parse10 = parseInt(values[i], 10);
      value += i === 11 ? parse10 : parse10 * (12 - i);
    }
  }

  value = 10 - (value % 10);

  return value === 10 ? 0 : value;
}

export function generate(params: licensePayload): string {
  const p1 = params.lastName.toUpperCase().substring(0, 1);
  const p2 = encodeLastName(params.lastName);
  const p3 = encodeFirstName(params.firstName);
  const p4 = formatDateToDDMMYY(params.dateOfBirth);

  const value = `${p1}${p2}${p3}-${p4}-0`;
  const code = getCode(value);

  return `${value}${code}`;
}
