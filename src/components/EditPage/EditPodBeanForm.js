import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    containerPodbean: {
        display: 'flex',
        background: 'white',
        flexWrap: 'wrap',
        [theme.breakpoints.up("md")]: {
            width: '800px'
        }, 
        [theme.breakpoints.down("sm")]: {
            width: '600px'
        },  
        
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        // width: 400,
    },
    // dense: {
    //     marginTop: 19,
    // },
    // menu: {
    //     width: 200,
    // },
});

class EditPodBeanForm extends Component {
//held in reducer and in local state and are required by the apis to work
    state = {
        piece: '',
        title: this.props.reduxState.podbean.title,
        description: this.props.reduxState.podbean.description,
    }

    handleChange = (key) => (event) => {
        console.log('event happened')
        this.setState({
            ...this.state,
            [key]: event.target.value,
        });
    }

//when button is hit to save the data is sent to the reducer
    addNewPodcast = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'UPDATE_PODBEAN', payload: this.state })
        console.log(this.state);
    }

    //this did-mount is to get the reducer's information 
    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_PODBEAN'})
    }

//form with inputfields 
    render() {
        const { classes } = this.props;

        return (
            <>
                <Grid
                    container
                    direction="column"
                    justify="left"
                >
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Enter the required information for Podbean.
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={12} >
                        <form className={classes.containerPodbean}>
                            <Grid item item xs={12}>
                                <img className="icons" src="images/logo/podbean.png" alt="podbean_link" />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    id="piece"
                                    label="Name of Episode"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={this.state.titleOfPiece}
                                    onChange={this.handleChange('titleOfPiece')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    id="title-input"
                                    label="Name of Podcast" 
                                    fullWidth      
                                    variant="outlined"
                                    margin="normal"
                                    value={this.state.titleOfPodbean}
                                    onChange={this.handleChange('titleOfPodbean')}
                                />
                            </Grid>
                                
                            <Grid item xs={12}>
                                <TextField 
                                    id="description-input"
                                    label="Description of Episode"
                                    fullWidth
                                    multiline
                                    rowsMax="4"
                                    defaultValue="What's your episode about?"
                                    variant="outlined"
                                    margin="normal"
                                    className={classes.textField}
                                    value={this.state.description}
                                    onChange={this.handleChange('description')}
                                    />
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState: reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(EditPodBeanForm));
