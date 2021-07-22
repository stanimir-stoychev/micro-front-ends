import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('../../views/Home'));
const NotFound = lazy(() => import('../../views/NotFound'));

function Routes() {
    return (
        <Suspense fallback="Loading pages...">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </Suspense>
    );
}

export default Routes;
