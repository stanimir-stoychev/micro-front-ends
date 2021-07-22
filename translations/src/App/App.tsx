import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import TranslationsProvider from '../components/Provider';

import AppStyles from './components/AppStyles';
import Navigation from './components/Navigation';
import Routes from './components/Routes';

const theme = createMuiTheme();

function App() {
    // console.log('...test...');
    return (
        <Router>
            <SCThemeProvider theme={theme}>
                <MuiThemeProvider theme={theme}>
                    <TranslationsProvider appName="Translations">
                        <AppStyles />
                        <Navigation />
                        <Container>
                            <Routes />
                        </Container>
                    </TranslationsProvider>
                </MuiThemeProvider>
            </SCThemeProvider>
        </Router>
    );
}

export default App;
