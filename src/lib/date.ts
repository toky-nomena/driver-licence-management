import dayjs from "dayjs";

/**
 * Formats a date to 'YYYY-MM-DD' string
 * @param {Date | string | number} date - The input date to format
 * @returns {string} Formatted date string in 'YYYY-MM-DD' format
 */
export function formatDateToYYYYMMDD(
  date: Date | string | number | undefined
): string {
  return dayjs(date).format("YYYY-MM-DD");
}

/**
 * Formats a date to 'DD/MM/YY' string
 * @param {Date | string | number} date - The input date to format
 * @returns {string} Formatted date string in 'DD/MM/YY' format
 */
export function formatDateToDDMMYY(
  date: Date | string | number | undefined
): string {
  return dayjs(date).format("DDMMYY");
}

export function parseDate(date: string | undefined): Date | undefined {
  if (!date) {
    return undefined;
  }
  return new Date(date);
}
