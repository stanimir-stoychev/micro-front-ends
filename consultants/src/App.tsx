import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/notFound'));

function App() {
    return (
        <Router>
            <Suspense fallback="Loading pages...">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
