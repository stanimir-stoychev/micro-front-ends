import React, { lazy, Suspense } from 'react';
import { useQueries } from 'react-query';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';

import API from './api';
import FloatingActionButton from './components/FloatingActionButton';
import ProjectsTabs from './components/ProjectsTabs';

const CreateProject = lazy(() => import('../CreateProject'));
const NotFound = lazy(() => import('../NotFound'));

const StyledDrawer = styled(Drawer)`
    .MuiDrawer-paper {
        max-width: 95%;
    }
`;

function View() {
    const url = '/projects';
    const history = useHistory();
    const location = useLocation();
    const { path } = useRouteMatch();
    const [requests, running, completed] = useQueries([
        { queryKey: 'new', queryFn: API.fetchNew, staleTime: 60 * 1000 },
        { queryKey: 'running', queryFn: API.fetchRunning, staleTime: 60 * 1000 },
        { queryKey: 'completed', queryFn: API.fetchCompleted, staleTime: 60 * 1000 },
    ]);

    const routes = location.pathname.split('/');
    const openDrawer = !['', 'projects'].includes(routes[routes.length - 1]);

    const handleCloseSubView = () => {
        history.push(url);
    };

    const handleCreateNewProject = () => {
        history.push(`${url}/new`);
    };

    return (
        <>
            <ProjectsTabs requests={requests as any} running={running as any} completed={completed as any} />
            <FloatingActionButton onClick={handleCreateNewProject} />
            <StyledDrawer anchor="right" open={openDrawer} onClose={handleCloseSubView}>
                <Container>
                    <Suspense fallback={<CircularProgress />}>
                        <Switch>
                            <Route exact path={path} />
                            <Route path={`${path}/new`}>
                                <CreateProject />
                            </Route>
                            <Route component={NotFound} />
                        </Switch>
                    </Suspense>
                </Container>
            </StyledDrawer>
        </>
    );
}

View.displayName = 'Projects Lists';
export default View;
