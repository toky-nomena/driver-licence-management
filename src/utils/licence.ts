import { isValidDateOfBirth } from "@/lib/validators";
import { format } from "date-fns";

const LAST_NAME_CODES = [
  ["A", "B"], // 1
  ["C"], // 2
  ["D", "E", "F"], // 3
  ["G", "H", "I"], // 4
  ["J", "K", "L"], // 5
  ["M", "N", "O"], // 6
  ["P", "Q", "R"], // 7
  ["S", "T"], // 8
  ["U", "V", "W", "X", "Y", "Z"], // 9
];

const FIRST_NAME_CODES = [
  ["B", "F", "P", "V"], // 1
  ["C", "G", "K", "J", "Q", "S", "X", "Z"], // 2
  ["D", "T"], // 3
  ["L"], // 4
  ["M", "N"], // 5
  ["R"], // 6
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
function encodeFirstName(firstName: string): string {
  firstName = firstName
    .toUpperCase()
    .substring(1)
    .replace(/[AEIOUYHW]/g, "");

  let ret = "";

  for (const char of firstName) {
    ret += encode(char, FIRST_NAME_CODES);
  }

  return ret
    .replace(/(.)\1+/g, "$1")
    .padEnd(3, "0")
    .substring(0, 3);
}

/**
 * Encode last name
 *
 * @param lastName
 * @returns
 */
function encodeLastName(lastName: string): string {
  return encode(lastName.toUpperCase().substring(0, 1), LAST_NAME_CODES);
}

function getCode(input: string): number {
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    const digit = parseInt(input[i], i === 0 ? 36 : 10);
    sum += i === 0 ? (digit - 9) * 12 : i === 11 ? digit : digit * (12 - i);
  }

  const checkDigit = 10 - (sum % 10);
  return checkDigit === 10 ? 0 : checkDigit;
}

export function generateDriverLicense(params: {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | undefined;
}): string {
  if (!params.dateOfBirth || !isValidDateOfBirth(params.dateOfBirth)) {
    return "";
  }

  const p1 = params.firstName.toUpperCase().substring(0, 1);
  const p2 = encodeFirstName(params.firstName);
  const p3 = encodeLastName(params.lastName);
  const p4 = format(params.dateOfBirth, "ddMMyy");

  const value = `${p1}${p2}${p3}${p4}0`;

  return `${value}${getCode(value)}`;
}
