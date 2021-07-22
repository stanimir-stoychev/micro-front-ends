import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import ComatchLogo from '../static/comatch-logo.svg';
import ComatchLogoMobile from '../static/comatch-logo-small.png';

const StyledBusinessLogo = styled(Link)`
    img,
    svg {
        height: 30px;
        width: auto;
    }
`;

const StyledToolbar = styled(Toolbar)`
    align-items: stretch;
    justify-content: space-between;

    a {
        align-items: center;
        color: inherit;
        display: flex;
        text-decoration: none;
    }

    nav {
        display: flex;
    }

    nav a {
        padding: ${({ theme: { spacing } }) => spacing(0, 3)};

        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }

        &:last-child {
            margin-right: ${({ theme: { spacing } }) => -spacing(3)}px;
        }
    }
`;

const StyledToolbarFiller = styled(Toolbar)`
    margin-bottom: ${({ theme: { spacing } }) => spacing(2)}px;
`;

function Navigation() {
    const theme = useTheme();
    const trigger = useScrollTrigger();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar>
                    <StyledToolbar>
                        <StyledBusinessLogo to="/" className="no-hover-effect">
                            {isMobile ? <img alt="Comatch GmbH" src={ComatchLogoMobile} /> : <ComatchLogo />}
                        </StyledBusinessLogo>
                        <nav>
                            <Link to="/projects">
                                <Typography variant="subtitle1">Projects</Typography>
                            </Link>
                        </nav>
                    </StyledToolbar>
                </AppBar>
            </Slide>
            <StyledToolbarFiller />
        </>
    );
}

export default Navigation;
