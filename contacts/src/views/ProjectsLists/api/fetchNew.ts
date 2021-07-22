import { Project } from '../types';
import demoData from '../demo/requests';

export default () =>
    new Promise<Project[]>((resolve) => {
        setTimeout(() => {
            resolve(
                demoData.map((project) => ({
                    ...project,
                    end: project.period.end,
                    start: project.period.start,
                    status: 'request',
                })),
            );
        }, 1500);
    });
