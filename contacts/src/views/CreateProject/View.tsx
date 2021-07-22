import React, { useState } from 'react';
import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';

import ProjectDescription from './components/ProjectDescription';

const STEPS = ['Project description', 'Consultant requirement profile', 'Project request completed'];

const StyledAlert = styled(Alert)`
    margin-top: ${({ theme: { spacing } }) => spacing(2)}px;
`;

function View() {
    const [currentStep, setCurrentStep] = useState(0);
    const messageSeverity = currentStep < 2 ? 'info' : 'success';
    const message =
        currentStep < 2 ? (
            <>
                Please fill out the following project briefing to enable us to send you consultant suggestions. The more
                information you share about your project the better we can "match" consultants to meet your needs. The
                handling of the project briefing and consultant search are completely free of charge.
            </>
        ) : (
            <>
                <strong>Project briefing submitted successfully.</strong>
                <br />
                Thank your for submitting the project request.
                <br />
                We will contact you in case we need any clarification for the project briefing, otherwise we will send
                matching candidate profiles to your e-mail address within 48 hours.
            </>
        );

    return (
        <>
            <StyledAlert severity={messageSeverity}>{message}</StyledAlert>
            <Stepper activeStep={currentStep} alternativeLabel>
                {STEPS.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {currentStep === 0 && <ProjectDescription />}
        </>
    );
}

View.displayName = 'Create Project';
export default View;
