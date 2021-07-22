import React from 'react';
import Translation from '../components/Translation';

function View() {
    return (
        <>
            <h1>
                <Translation tKey="pages.Home.title" />
            </h1>
            <h2>
                <Translation tKey="pages.Home.description" />
            </h2>
            <p>
                The idea is to build the other apps in a federated manor - e.g. each app should also expose itself in a
                pure "preview" mode so that users can see the expected UI.
            </p>
            <br />
            <pre>This is best achieved with dumb components that can work with just data.</pre>
            <pre>Another approach would be to have a "Demo API" which can supply the data (hidden endpoints).</pre>
        </>
    );
}

View.displayName = 'Home';
export default View;
