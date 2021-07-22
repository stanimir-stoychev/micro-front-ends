import React from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Content from './Content';
import Framework from './Framework';

const StyledActions = styled(Box)`
    display: flex;
    justify-content: flex-end;
    margin-bottom: ${({ theme: { spacing } }) => spacing(4)}px;

    button + button {
        margin-left: ${({ theme: { spacing } }) => spacing(2)}px;
    }
`;

function ProjectDescription() {
    return (
        <>
            <Content />
            <Framework />
            <StyledActions>
                <Button type="submit">Save</Button>
                <Button color="primary" variant="contained" type="submit">
                    Save and continue
                </Button>
            </StyledActions>
        </>
    );
}

export default ProjectDescription;
