import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import AppStyles from './components/AppStyles';
import Navigation from './components/Navigation';
import Routes from './components/Routes';

const theme = createMuiTheme();

function App() {
    return (
        <Router>
            <SCThemeProvider theme={theme}>
                <MuiThemeProvider theme={theme}>
                    <AppStyles />
                    <Navigation />
                    <Container>
                        <Routes />
                    </Container>
                </MuiThemeProvider>
            </SCThemeProvider>
        </Router>
    );
}

export default App;
