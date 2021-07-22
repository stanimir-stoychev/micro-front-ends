import React, { useState } from 'react';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import SectionTitle from './SectionTitle';

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

const StyledForm = styled.div`
    > *:not(:first-child) {
        margin-top: ${({ theme: { spacing } }) => spacing(3)}px;
    }

    .Row {
        display: flex;
        justify-content: space-between;

        > * {
            flex: calc(50% - ${({ theme: { spacing } }) => spacing(1)}px) 0;
        }
    }
`;

function Content() {
    const [currency, setCurrency] = useState<string>();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    return (
        <>
            <SectionTitle>Project content</SectionTitle>
            <StyledForm>
                <TextField
                    fullWidth
                    id="name"
                    label="Name of your project"
                    placeholder="My project"
                    variant="outlined"
                />

                <div className="Row">
                    <TextField
                        id="needed-support"
                        select
                        label="Needed support"
                        value={currency}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id="industry-focus"
                        select
                        label="Industry focus"
                        value={currency}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                <div className="Row">
                    <TextField
                        id="functional-focus"
                        select
                        label="Functional focus"
                        value={currency}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id="specification-of-functional-focus"
                        select
                        label="Specification of functional focus"
                        value={currency}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                <TextField
                    fullWidth
                    rows={4}
                    id="description"
                    label="Project description"
                    multiline
                    variant="outlined"
                />
            </StyledForm>
        </>
    );
}

export default Content;
