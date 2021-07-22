import React from 'react';
import styled, { useTheme } from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import useMediaQuery from '@material-ui/core/useMediaQuery';

type ComponentProps = {
    onClick: () => void;
};

const StyledFab = styled(Fab)`
    bottom: ${({ theme: { spacing } }) => spacing(4)}px;
    position: fixed;
    right: ${({ theme: { spacing } }) => spacing(4)}px;

    ${({ theme: { breakpoints } }) => breakpoints.up('sm')} {
        svg,
        img {
            margin-right: ${({ theme: { spacing } }) => spacing(1)}px;
        }
    }
`;

function FloatingActionButton(props: ComponentProps) {
    const { onClick } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <StyledFab variant="extended" color="primary" aria-label="Start new project" onClick={onClick}>
            <AddIcon />
            {!isMobile && 'Start New Project'}
        </StyledFab>
    );
}

export default FloatingActionButton;
