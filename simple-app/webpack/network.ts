import { execSync } from 'child_process';
import { networkInterfaces as getNetworkInterfaces } from 'os';
import opn from 'opn';
import path from 'path';

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

function openBrowser(url = 'http://localhost:3000/') {
    if (process.platform === 'darwin') {
        try {
            // Try our best to reuse existing tab
            // on OS X Google Chrome with AppleScript
            execSync('ps cax | grep "Google Chrome"');
            execSync(`osascript ${path.resolve(__dirname, './openChrome.applescript')} ${url}`);
            return;
        } catch (err) {
            // Ignore errors.
        }
    }
    // Fallback to opn
    // (It will always open new tab)
    opn(url);
}

export { getLocalIPs, openBrowser };
