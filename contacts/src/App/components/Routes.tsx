import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const CandidateProposal = lazy(() => import('../../views/CandidateProposal'));
const ProjectsLists = lazy(() => import('../../views/ProjectsLists'));
const NotFound = lazy(() => import('../../views/NotFound'));

function Routes() {
    return (
        <Suspense fallback="Loading pages...">
            <Switch>
                <Route exact path="/" component={ProjectsLists} />
                <Route path="/projects" component={ProjectsLists} />
                <Route path="/proposals/:proposalId" component={CandidateProposal} />
                <Route component={NotFound} />
            </Switch>
        </Suspense>
    );
}

export default Routes;
