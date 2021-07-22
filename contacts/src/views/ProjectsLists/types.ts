import { ReactNode } from 'react';

type Project = {
    end: ReactNode;
    id: string;
    name: ReactNode;
    neededSupport: ReactNode;
    start: ReactNode;
    status: 'completed' | 'request' | 'running';
};

export type { Project };
