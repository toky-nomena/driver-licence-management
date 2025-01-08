export type Language = 'en' | 'fr';

export interface Translations {
  [key: string]: string;
}

export type InterpolationValues = Record<string, string | number>;

export type AutoComplete<T extends string> = T | (string & {});

export interface I18nContextType<Keys extends string> {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: AutoComplete<Keys>, values?: InterpolationValues) => string;
}
