import { networkInterfaces as getNetworkInterfaces } from 'os';
import { blue, red, yellow } from 'chalk';

function getLocalIPs() {
    const networkInterfaces = getNetworkInterfaces();
    return Object.keys(networkInterfaces).reduce((acc: Record<string, string | undefined>, interfaceName) => {
        let alias = 0;
        networkInterfaces[interfaceName]?.forEach(({ family, internal, address }) => {
            if (family !== 'IPv4' || internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                acc[`${interfaceName}:${alias}`] = address;
            } else {
                // this interface has only one ipv4 address
                acc.localIP = address;
            }

            alias += 1;
        });

        return acc;
    }, {});
}

function logWebpackStat(level: 'error' | 'info' | 'log' | 'warn' = 'log', prefix?: string) {
    return <T extends { message: string }>(stat: T) => {
        let messageColor: (message: string) => string;

        switch (level) {
            case 'error':
                messageColor = red;
                break;

            case 'info':
                messageColor = blue;

            case 'warn':
                messageColor = yellow;

            default:
                messageColor = (message: string) => message;
        }

        const message = messageColor(stat.message);
        return prefix ? console[level](prefix, message) : console[level](message);
    };
}

export { getLocalIPs, logWebpackStat };
