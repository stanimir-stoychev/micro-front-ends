import React, { useState } from 'react';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import styled from 'styled-components';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

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
    padding: ${({ theme: { spacing } }) => spacing(0, 0, 3)};

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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const [currency, setCurrency] = useState<string>();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const currencySign = currencies.find(({ value }) => value === currency)?.label || '';

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(true);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setOpen(false);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <SectionTitle>Project framework</SectionTitle>
            <StyledForm>
                <div className="Row">
                    <div className="Row">
                        <KeyboardDatePicker
                            inputVariant="outlined"
                            id="start-date"
                            label="Start"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            inputVariant="outlined"
                            id="end-date"
                            label="End"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </div>
                    <TextField
                        id="date-notes"
                        label="Project duration notes"
                        placeholder="My project"
                        variant="outlined"
                    />
                </div>

                <div className="Row">
                    <TextField
                        id="working-hours-per-week"
                        select
                        label="Weekly working hours"
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
                        id="working-hours-per-week-note"
                        label="Additional working hours information"
                        variant="outlined"
                    />
                </div>

                <div className="Row">
                    <TextField
                        id="work-location"
                        select
                        label="Work location of the consultant"
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
                        id="work-location-note"
                        label="Additional working hours information if needed"
                        variant="outlined"
                    />
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

                <div className="Row">
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Currency</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type="number"
                            startAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="currency"
                                        aria-controls="currency-menu"
                                        aria-haspopup="true"
                                        onClick={handleOpen}
                                        onMouseDown={handleOpen}
                                    >
                                        {currencySign || currencies[0].label}
                                    </IconButton>
                                    <Menu
                                        keepMounted
                                        id="currency-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        {currencies.map(({ value }) => (
                                            <MenuItem
                                                key={value}
                                                selected={value === currency}
                                                onClick={() => {
                                                    setCurrency(value);
                                                    handleClose();
                                                }}
                                            >
                                                {value}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="currency"
                                        aria-controls="currency-menu"
                                        aria-haspopup="true"
                                        onClick={handleOpen}
                                        onMouseDown={handleOpen}
                                    >
                                        {currency || currencies[0].value}
                                    </IconButton>
                                    <Menu
                                        keepMounted
                                        id="currency-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        {currencies.map(({ value }) => (
                                            <MenuItem
                                                key={value}
                                                selected={value === currency}
                                                onClick={() => {
                                                    setCurrency(value);
                                                    handleClose();
                                                }}
                                            >
                                                {value}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                </div>
            </StyledForm>
        </MuiPickersUtilsProvider>
    );
}

export default Content;
