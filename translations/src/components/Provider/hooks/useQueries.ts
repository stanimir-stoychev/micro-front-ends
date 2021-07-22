/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useQueries } from 'react-query';
import at from 'lodash/at';

import API from '../api';
import { ContextProps, Language } from '../types';

const queryKey = (appName: string, language: Language) => `${appName}->${language}`;

export default (props: { appName: string; language: Language }): ContextProps => {
    const [apps, setApps] = useState<[string, Language][]>([[props.appName, props.language || 'en']]);
    const [currentLanguage, setLanguage] = useState<Language>(props.language || 'en');
    const queries = useQueries(
        apps.map(([appName, language]) => ({
            queryKey: queryKey(appName, language),
            queryFn: () => API.fetchTranslations(appName, language),
            staleTime: 60 * 1000 * 60, // 1 hour
        })),
    ) as ContextProps['queries'];

    const getQuery = (appName: string, language: Language) => {
        const index = apps.findIndex((appKeyProps) => queryKey(...appKeyProps) === queryKey(appName, language));
        return queries[index];
    };

    const buildContextProps = (): ContextProps => ({
        currentLanguage,
        queries,
        setLanguage,
        translate: (key, { language = currentLanguage, appName = props.appName } = {}) => {
            const query = getQuery(appName, language);

            if (!query) {
                setApps((currentApps) => [...currentApps, [appName, language]]);
                return undefined;
            }

            return at(query.data, key)[0] as any;
        },
        update: (language = currentLanguage, appName = props.appName) => {
            const query = getQuery(appName, language);

            if (!query) {
                setApps((currentApps) => [...currentApps, [appName, language]]);
                return;
            }

            if (!query.isFetching) query.refetch();
        },
    });

    return buildContextProps();
    // return useMemo(buildContextProps, [props.appName, props.language]);
};
