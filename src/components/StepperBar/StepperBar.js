import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        width: '90%',
        margin: '0 auto',
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

function getSteps() {
    return [{step:'SELECT FORMS', number: 1}, {step:'UPLOAD', number: 2}, {step:'EDIT', number: 3}, {step:'REVIEW',number: 4},{step:'PUBLISHED',number: 5}];
}

class StepperBar extends React.Component {
    state = {
        activeStep: this.props.activeStep,
    };

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_STEPPER' })
    }

    render() {
        const steps = getSteps()
        const { activeStep } = this.state;

        return (
            <div>
                <Stepper style={{ backgroundColor:"#EBEFF0"}} activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel className={label.number}>{label.step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {this.state.activeStep === steps.length ? (
                        <div>
                            <Typography >All steps completed</Typography>
                        </div>
                    ) : (
                            <div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

StepperBar.propTypes = {
    classes: PropTypes.object,
};
const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore: reduxStore
})

export default withStyles(styles)(connect(mapReduxStoreToProps)(StepperBar));