import { Project } from '../types';
import demoData from '../demo/running';

export default () =>
    new Promise<Project[]>((resolve) => {
        setTimeout(() => {
            resolve(
                demoData.map((project) => ({
                    ...project,
                    end: project.period.end,
                    start: project.period.start,
                    status: 'running',
                })),
            );
        }, 1500);
    });
