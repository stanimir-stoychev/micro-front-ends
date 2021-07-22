type Context = { [x: string]: ContextValue };
type ContextValue = string | number | boolean | Context | ContextArray | undefined | null;
type ContextArray = Array<ContextValue>;
type Logger = { [key in 'debug' | 'info' | 'warn' | 'error']: (message: string, messageContext?: any) => void };

interface Window {
    dev?: any;
    dataLayer: Record<string, string | number | boolean>[];
    DD_LOGS?: {
        init: (args: {
            clientToken?: string;
            env?: string;
            forwardErrorsToLogs?: boolean;
            sampleRate?: number;
            service?: string;
            silentMultipleInit?: boolean;
            site?: string;
        }) => void;
        logger: Logger;
        addLoggerGlobalContext: (key: string, value: ContextValue) => void;
    };
}
