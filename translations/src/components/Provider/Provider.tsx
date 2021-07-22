/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ComponentType, createContext, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import useQueries from './hooks/useQueries';
import { ContextProps, Language, TranslationsResponse } from './types';

type ComponentProps = {
    appName: string;
    children: ReactNode;
    defaultTranslations?: [[string, Language], TranslationsResponse][];
    language?: Language;
};

const queryClient = new QueryClient();
const Context = createContext<ContextProps>({
    currentLanguage: 'en',
    queries: [],
    setLanguage: () => {},
    translate: () => undefined as any,
    update: () => {},
});

const withReactQuery = (Component: ComponentType<ComponentProps>) => (props: ComponentProps) => (
    <QueryClientProvider client={queryClient}>
        <Component {...props} />
    </QueryClientProvider>
);

function Provider(props: ComponentProps) {
    const { appName, children, language = 'en' } = props;
    const contextState = useQueries({ appName, language });

    console.log({ contextState });
    return <Context.Provider value={contextState}>{children}</Context.Provider>;
}

export { Context };
export default withReactQuery(Provider);
