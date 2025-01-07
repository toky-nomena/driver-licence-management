export class StringUtils {
  /**
   * Extracts the first letter of a given word
   *
   * @param word Input string
   *
   * @returns First letter or empty string
   */
  static first(word: string): string {
    return word?.charAt(0) ?? '';
  }

  /**
   * Removes specified letters from a word
   *
   * @param word Input string
   * @param lettersToRemove Array of letters to remove
   *
   * @returns Filtered string
   */
  static remove(word: string, lettersToRemove: string[]): string {
    if (!word || !lettersToRemove.length) {
      return word;
    }

    return word
      .split('')
      .filter((char) => !lettersToRemove.includes(char.toLowerCase()))
      .join('');
  }

  /**
   * Converts letters to numbers based on conversion groups
   *
   * @param word Input string
   * @param conversion Conversion groups
   *
   * @returns Converted numeric string
   */
  static convert(word: string, conversion: string[][]): string {
    if (!word) {
      return '';
    }

    const letterMap = new Map(
      conversion.flatMap((group, index) => group.map((letter) => [letter, String(index + 1)]))
    );

    return word
      .toLowerCase()
      .split('')
      .map((letter) => letterMap.get(letter) || '')
      .join('');
  }

  /**
   * Removes consecutive duplicate characters
   *
   * @param word Input string
   *
   * @returns String with duplicates removed
   */
  static uniq(word: string): string {
    return word?.replace(/(.)\1+/g, '$1') ?? '';
  }

  /**
   * Pads a word to a specific length with insertion at a specific index
   *
   * @param word Input string
   * @param char Padding character
   * @param length Desired total length
   * @param padIndex Insertion index
   *
   * @returns Padded string
   */
  static pad({
    word,
    char,
    length,
    padIndex,
  }: {
    word: string;
    char: string;
    length: number;
    padIndex: number;
  }): string {
    if (!word) {
      return char.repeat(length);
    }

    const paddingNeeded = length - word.length;

    if (paddingNeeded <= 0) {
      return word;
    }

    if (padIndex <= 0) {
      return char.repeat(paddingNeeded) + word;
    }

    if (padIndex >= word.length) {
      return word + char.repeat(paddingNeeded);
    }

    return word.slice(0, padIndex) + char.repeat(paddingNeeded) + word.slice(padIndex);
  }
}
