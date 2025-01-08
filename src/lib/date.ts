import dayjs from 'dayjs';

type DateFormatOptions = 'YYYY-MM-DD' | 'DDMMYY' | 'YYMMDD' | 'YY' | 'MM' | 'DD';

/**
 * Formats a date to the given format string
 *
 * @param {Date | string | number} date - The input date to format
 * @param {string} format - The format string
 *
 * @returns {string} Formatted date string
 */
export function format(
  date: Date | string | number | undefined,
  format: DateFormatOptions
): string {
  return dayjs(date).format(format);
}
