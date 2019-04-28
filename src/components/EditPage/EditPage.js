import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditPodBeanForm from './EditPodBeanForm';
import EditWordPressForm from './EditWordPressForm';
import StepperBar from '../StepperBar/StepperBar';
import swal from 'sweetalert';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom'
import './EditPage.css';

class EditPage extends Component {
    
    state = {
        redirect: false,
        podbean: {
        piece: '',
        title: '',
        description: '',
    },
    form: {
        title: '',
        blog: '',
        tags: '',
        categories: '',
    }

    }
    componentDidMount = () => {
        this.props.dispatch({ type: "STEP_THREE" })
    }
    //need to conditionally send it either to the transcript page
    //or to the review page
    handleClick = (event) => {
        event.preventDefault();
        console.log('Next button clicked on edit page');
        this.props.history.push('/review-page');
    }
    handleChangeP = (key) => (event) => {
        console.log('event happened')
        this.setState({
            ...this.state,
            podbean: {
            ...this.state.podbean,
            [key]: event.target.value,
            }
        });
    }
    handleChangeW = (key) => (event) => {
        console.log('event happened')
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [key]: event.target.value,
            }
        });
    }
    //use the same function as the other pages for this button
    handleCancelButton = () => {
        console.log('in SweetAlert Cancel Button');
        swal({
            title: "Are you sure?",
            text: "Careful, you will lose all progress and information forever!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                    this.props.history.push('/connect');
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }
    handleDispatch = (event) => {
        // event.preventDefault();
        console.log('edit transcript button clicked');
        this.props.dispatch({type: "SET_PODBEAN", payload: this.state.podbean})
        this.props.dispatch({type: "SET_WORDPRESS", payload: this.state.form})
       

        // this.props.history.push('../TranscriptPage/TranscriptPage.js');
    }
    render() {
        console.log(this.state.redirect)
        //console.log(this.props.history);
        if (this.state.redirect==='true') {
            return <Redirect to='/transcript-page' />
        }
        console.log(this.state.podbean, this.state.form)
        return (
            <>
                <div>
                <StepperBar activeStep='3'></StepperBar>
                    <h2>Edit Page</h2>

                </div>
                {/* <Grid
                    container
                    alignItems="center"
                    direction="column"
                    justify="space-evenly"
                > */}
                    <div>
                        {/* <Grid item xs={12}> */}
                            <EditPodBeanForm state={this.state} handleChangeP={this.handleChangeP} />
                        {/* </Grid> */}
                        {/* <Grid item xs={12}> */}
                            <EditWordPressForm state={this.state} handleDispatch={this.handleRedirect} handleChangeW={this.handleChangeW}/>
                        {/* </Grid> */}
                        <button onClick={this.handleCancelButton}>Cancel</button>
                        <button onClick={this.handleClick}>Next</button>
                    </div>
                {/* </Grid> */}
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(EditPage);