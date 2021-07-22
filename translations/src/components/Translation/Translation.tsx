import React, { useContext } from 'react';
import { Context, Language } from '../Provider';

type ComponentProps = {
    appName?: string;
    tKey: string;
    language?: Language;
    page?: string;
};

function Translation(props: ComponentProps) {
    const { appName, tKey, language, page } = props;
    const { translate } = useContext(Context);
    const prefix = page ? `${page}.` : '';
    const value = translate(`${prefix}${tKey}`, { appName, language });
    console.log('Translated value:\t', value);
    return <>{value}</>;
}

export default Translation;
