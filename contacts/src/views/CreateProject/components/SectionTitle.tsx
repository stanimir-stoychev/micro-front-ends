import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

type ComponentProps = { children: ReactNode };

const StyledTypography = styled(Typography)`
    margin: ${({ theme: { spacing } }) => spacing(4, 0, 2)};
`;

function SectionTitle({ children }: ComponentProps) {
    return <StyledTypography variant="h5">{children}</StyledTypography>;
}

export default SectionTitle;
