import { useLanguageStore, type Language } from '@/store/languageStore';
import { en } from './translations/en';
import { es } from './translations/es';

const translations = {
  en,
  es,
} as const;

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<typeof en>;

function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path; // Return the key if not found
    }
  }

  return typeof result === 'string' ? result : path;
}

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);
  const currentTranslations = translations[language];

  const t = (key: TranslationKey): string => {
    return getNestedValue(currentTranslations, key);
  };

  return { t, language };
}
