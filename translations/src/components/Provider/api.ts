import { Language, TranslationsResponse } from './types';
import DemoTranslationsENResponse from './demo/en';

export default {
    /**
     * (DEMO) Fetches a translations JSON.
     *
     * @param appName Name of the app which owns the translation
     * @param language The desired language
     */
    fetchTranslations: (appName: string, language: Language) =>
        new Promise<TranslationsResponse>((resolve) => {
            console.log('...Fetching translations:\t', { appName, language });
            setTimeout(() => {
                const response =
                    appName === DemoTranslationsENResponse.general.appName && language === 'en'
                        ? DemoTranslationsENResponse
                        : { general: {}, pages: {} };

                console.log('...Finished fetching translations:\t', response);
                resolve(response);
            }, 1500);
        }),
};
