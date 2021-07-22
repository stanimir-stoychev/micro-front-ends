import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const CandidateProposal = lazy(() => import('contacts/CandidateProposal'));
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
    return (
        <Router>
            <Suspense fallback="Loading pages...">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/proposals/:proposalId">
                        <CandidateProposal id="admin-id" />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
