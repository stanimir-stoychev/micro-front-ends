/* eslint-disable @typescript-eslint/no-empty-interface */
import { UseQueryResult } from 'react-query';

type Language = 'de' | 'en' | 'fr';

type Translation = string | TranslationObject;
interface TranslationObject extends Record<string, Translation> {}

type TranslationsResponse = {
    general: Record<string, Translation>;
    pages: Record<string, Record<string, Translation>>;
};

type ContextActions = {
    setLanguage: (to: Language) => void;
    translate: <T = Translation | undefined>(key: string, config?: { language?: Language; appName?: string }) => T;
    update: (language?: Language, appName?: string) => void;
};

type ContextProps = ContextActions & { currentLanguage: Language; queries: UseQueryResult<TranslationsResponse>[] };

export type { ContextActions as AppActions, ContextProps, Language, Translation, TranslationsResponse };
