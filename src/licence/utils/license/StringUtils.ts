export class StringUtils {
  /**
   * Extracts the first letter of a given word
   * @param word Input string
   * @returns First letter or empty string
   */
  static first(word: string = ''): string {
    return word.charAt(0);
  }

  /**
   * Removes specified letters from a word
   * @param word Input string
   * @param lettersToRemove Array of letters to remove
   * @returns Filtered string
   */
  static remove(word: string = '', lettersToRemove: string[] = []): string {
    if (!lettersToRemove.length) {
      return word;
    }

    const lettersToRemoveSet = new Set(lettersToRemove.map((char) => char.toUpperCase()));

    return Array.from(word)
      .filter((char) => !lettersToRemoveSet.has(char.toUpperCase()))
      .join('');
  }

  /**
   * Converts letters to numbers based on conversion groups
   * @param word Input string
   * @param conversion Conversion groups
   * @returns Converted numeric string
   */
  static convert(word: string = '', conversion: string[][] = []): string {
    const letterMap = new Map(
      conversion.flatMap((group, index) =>
        group.map((letter) => [letter.toUpperCase(), String(index + 1)])
      )
    );

    return Array.from(word.toUpperCase())
      .map((char) => letterMap.get(char) || '')
      .join('');
  }

  /**
   * Removes consecutive duplicate characters
   * @param word Input string
   * @returns String with duplicates removed
   */
  static uniq(word: string = ''): string {
    return word.replace(/(.)\1+/g, '$1');
  }

  /**
   * Pads a word to a specific length with insertion at a specific index
   *
   * @param word Input string
   * @param char Padding character
   * @param length Desired total length
   * @param paddingIndex Insertion index
   *
   * @returns Padded string
   */
  static pad({
    word = '',
    char,
    length,
    paddingIndex = 0,
  }: {
    word?: string;
    char: string;
    length: number;
    paddingIndex?: number;
  }): string {
    const paddingNeeded = Math.max(0, length - word.length);

    if (paddingNeeded === 0) {
      return word;
    }

    const padding = char.repeat(paddingNeeded);

    if (paddingIndex <= 0) {
      return padding + word;
    }

    if (paddingIndex >= word.length) {
      return word + padding;
    }

    return word.slice(0, paddingIndex) + padding + word.slice(paddingIndex);
  }
}
