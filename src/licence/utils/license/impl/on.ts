import type { DrivingLicenseGenerator } from '../DrivingLicenseGenerator';

import { format } from '@/lib/date';
import type { LicenseFormValues } from '@/licence/types';

function encodeLastName(lastName: string): string {
  const lastNameUpper = lastName.toUpperCase();
  const letters = lastNameUpper.split('');

  // Encode each letter (A=1, B=2, ..., Z=26)
  const encoded = letters.slice(0, 4).map((char) => {
    const code = char.charCodeAt(0) - 64; // A=1, B=2, ..., Z=26
    return code.toString().padStart(2, '0'); // Ensure two-digit encoding
  });

  // Combine encoded values to form the XXXX segment
  return encoded.join('').padEnd(4, '0').slice(0, 4); // Truncate or pad to 4 digits
}

function encodeFirstName(firstName: string): string {
  const firstNameUpper = firstName.toUpperCase();
  const letters = firstNameUpper.split('');

  // Encoding map as a 2D array
  const encodingMap: string[][] = [
    ['A'], // 0
    ['B', 'C', 'D'], // 1
    ['E'], // 2
    ['F', 'G', 'H'], // 3
    ['I', 'J', 'K'], // 4
    ['L', 'M', 'N'], // 5
    ['O'], // 6
    ['P', 'Q', 'R'], // 7
    ['S', 'T'], // 8
    ['U', 'V', 'W', 'X', 'Y', 'Z'], // 9
  ];

  // Find the encoding for each of the first three letters
  const encoded = letters.slice(0, 3).map((char) => {
    for (let i = 0; i < encodingMap.length; i++) {
      if (encodingMap[i].includes(char)) {
        return i.toString();
      }
    }
    return '0'; // Default to "0" if no match is found
  });

  // Combine encoded values to form the FFF segment
  return encoded.join('').padEnd(3, '0').slice(0, 3); // Truncate or pad to 3 digits
}

function encodeMiddleInitial(middleName: string): string {
  const initial = middleName.charAt(0).toUpperCase();

  // Encoding map as a 2D array
  const encodingMap: string[][] = [
    ['Y', 'Z'], // 0
    ['A'], // 1
    ['C', 'D'], // 2
    ['E', 'F'], // 3
    ['G', 'H'], // 4
    ['J', 'K'], // 5
    ['L', 'M', 'N'], // 6
    ['P', 'Q', 'R'], // 7
    ['S', 'T'], // 8
    ['W'], // 9
  ];

  // Find the index of the array that contains the initial
  for (let i = 0; i < encodingMap.length; i++) {
    if (encodingMap[i].includes(initial)) {
      return i.toString();
    }
  }

  return '0'; // Default to "0" if no match is found
}

export class ON implements DrivingLicenseGenerator {
  generate({ lastName, firstName, middleName, dateOfBirth, gender }: LicenseFormValues): string {
    const L = lastName.charAt(0).toUpperCase();
    const XXXX = encodeLastName(lastName);
    const FFF = encodeFirstName(firstName);
    const M = middleName ? encodeMiddleInitial(middleName) : '0';

    const [birthYear, birthMonth, birthDay] = format(dateOfBirth, 'YYYY-MM-DD').split('-');
    const YY = birthYear.slice(-2);
    let MM = parseInt(birthMonth, 10);

    if (gender === 'female') {
      MM += 50;
    }

    const MMStr = MM.toString().padStart(2, '0');
    const DD = birthDay.padStart(2, '0');

    return `${L}${XXXX}-${FFF}${M}-${YY}${MMStr}${DD}`;
  }
}
