import React from 'react';
import { createGlobalStyle } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';

const GlobalStyles = createGlobalStyle`
    html, body, #root {
        height: 100%;
        margin: 0;
        padding: 0;
    }
`;

function AppStyles() {
    return (
        <>
            <CssBaseline />
            <GlobalStyles />
        </>
    );
}

export default AppStyles;
