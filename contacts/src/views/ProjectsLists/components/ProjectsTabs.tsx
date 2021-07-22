import React, { useState } from 'react';
import { QueryObserverResult } from 'react-query';
import styled, { useTheme } from 'styled-components';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Project } from '../types';
import ProjectCard from './ProjectCard';

type ComponentProps = {
    completed: QueryObserverResult<Project[]>;
    requests: QueryObserverResult<Project[]>;
    running: QueryObserverResult<Project[]>;
};

const StyledTabs = styled(Tabs)`
    margin-bottom: ${({ theme: { spacing } }) => spacing(3)}px;
`;

const StyledProgressIndicator = styled(LinearProgress)`
    margin-top: ${({ theme: { spacing } }) => spacing(2)}px;
`;

const TABS = [
    {
        icon: <FiberNewIcon />,
        label: 'Project Requests',
        'aria-label': 'Project Requests',
        id: 'project-requests-tab',
        'aria-controls': 'project-requests-tab-control',
        dataKey: 'requests' as const,
    },
    {
        icon: <AssignmentIcon />,
        label: 'Running Projects',
        'aria-label': 'Running Projects',
        id: 'project-running-tab',
        'aria-controls': 'project-running-tab-control',
        dataKey: 'running' as const,
    },
    {
        icon: <AssignmentTurnedInIcon />,
        label: 'Completed Projects',
        'aria-label': 'Completed Projects',
        id: 'project-completed-tab',
        'aria-controls': 'project-completed-tab-control',
        dataKey: 'completed' as const,
    },
];

const SKELETON_CARDS = [
    { id: 'skeleton-1', content: <Skeleton key="skeleton-1" variant="rect" height={150} /> },
    { id: 'skeleton-2', content: <Skeleton key="skeleton-1" variant="rect" height={150} /> },
    { id: 'skeleton-3', content: <Skeleton key="skeleton-1" variant="rect" height={150} /> },
];

function ProjectsTabs(props: ComponentProps) {
    const [currentTab, setCurrentTab] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deviceSpecificProps: any = isMobile
        ? {
              variant: 'scrollable',
              scrollButtons: 'auto',
          }
        : { centered: true };

    return (
        <>
            <StyledTabs
                value={currentTab}
                onChange={(event, nextTab) => setCurrentTab(nextTab)}
                indicatorColor="primary"
                textColor="primary"
                {...deviceSpecificProps}
            >
                {TABS.map(({ dataKey, ...rest }) => (
                    <Tab key={dataKey} {...rest} />
                ))}
            </StyledTabs>

            {TABS.map(({ dataKey, id, 'aria-controls': ariaControls }, index) => {
                const { [dataKey]: dataSource } = props;
                const data = dataSource.isLoading
                    ? SKELETON_CARDS
                    : (dataSource.data || []).map((project) => ({
                          id: project.id,
                          content: <ProjectCard {...project} />,
                      }));

                return (
                    <div
                        key={dataKey}
                        role="tabpanel"
                        hidden={currentTab !== index}
                        id={ariaControls}
                        aria-labelledby={id}
                    >
                        <Grid container spacing={3}>
                            {data.map(({ id, content }) => (
                                <Grid key={id} item xs={12} md={6} lg={4}>
                                    {content}
                                </Grid>
                            ))}
                        </Grid>
                        {dataSource.isFetching && <StyledProgressIndicator />}
                    </div>
                );
            })}
        </>
    );
}

export default ProjectsTabs;
