import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import SimpleModalWrapped from './transcriptModal'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    containerWordpress: {
        display: 'flex',
        background: 'white',
        flexWrap: 'wrap',
        [theme.breakpoints.up("md")]: {
            width: '800px'
        },
        [theme.breakpoints.down("sm")]: {
            width: '600px'
        },  
        height: '550px',
       
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        // width: 200,
    },
    // dense: {
    //     marginTop: 19,
    // },
    // menu: {
    //     width: 200,
    // },
});



class EditWordPressForm extends Component {
    //held in reducer and in local state and is required for the Api to work

    state = {
        redirect: false,
        date: '', //need
        title: '', //need
        content: '',  //need
        excerpt: '', //need
        slug: '', //need
        author: '',//need
        publicize_message: '',//need
        status: '',//need
        sticky: '',//need
        password: '',//need
        parent: '',//need
        categories: '',//need
       
        featured_image: '',//need
        media: '',//need
        media_urls: '',//need
        comments_open: '',//need
        menu_order: '',//need
        transcription: this.props.reduxStore.editReducer.transcriptReducer.transcription,
        form:{
            title: '',
blog: '',
tags:'',
categories:'',
        }
     
        
    }

  
   
testFillTitle=(e)=>{
    this.setState({
        ...this.state,
        form: { ...this.state.form,
            title: 'Gates, do they count?',}
    })
}
testFillBlog=(e)=>{
    this.setState({
        ...this.state,
        form: { ...this.state.form,
            blog: 'All About Doors',}
    })
}
    testFillTags=(e)=>{
        this.setState({
            ...this.state,
            form: { ...this.state.form,
               tags: 'Doors,'+' '+ 'Gates,'+ ' '+ 'Lies,',}
        })
    }
    testFillCategories=(e)=>{
        this.setState({
            ...this.state,
            form: { ...this.state.form,
               categories: 'The neverending, and unstoppable marching of time,' + ' ' + 'Sharks',}
        })
    }
   

    handleRedirect = (event) => {
        // event.preventDefault();
        console.log('edit transcript button clicked');
        this.props.dispatch({type: "SET_WORDPRESS", payload: this.props.state.form})
        this.props.dispatch({type: "SET_PODBEAN", payload: this.props.state.podbean})
        this.setState({
            ...this.state,
            redirect: 'true',
        })

        // this.props.history.push('../TranscriptPage/TranscriptPage.js');
    }

    render() {
<
        console.log(this.state.form)

        const { classes } = this.props;

        //console.log(this.props.history);
        if (this.state.redirect==='true') {
            return <Redirect to='/transcript-page' />
        }

        return (
            <>

                <Grid
                    container
                    direction="column"
                    justify="left"
                >
                    <Grid item xs={12}>
                        
                        <p>Enter the required information for WordPress.</p>
                        
                    </Grid>

                    <Grid item xs={12}>
                        
                        <form onSubmit={this.addNewBlog} className={classes.containerWordpress}>
                            <Grid item item xs={12}>
                                <img className="icons" src="images/logo/WordPress.png" alt="wordpress_link" />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="blog name"
                                    label="Name of Blog"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value=={this.state.form.blog}
                                    onChange={this.handleChange('blog_name')}
                                />
                                      <button onClick={this.testFillBlog}>      </button>
      
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="title"
                                    label="Name of Article"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={this.state.form.title}
                                    onChange={this.handleChange('title_of_blog')}
                                />
                                       <button onClick={this.testFillTitle}>      </button>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="tags"
                                    label="Tags"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={this.state.form.tags}
                                    onChange={this.handleChange('tags')}
                                />
                                      <button onClick={this.testFillTags}>      </button>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="categories"
                                    label="Categories"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={this.state.form.categories}
                                    onChange={this.handleChange('categories')}
                                />
                                       <button onClick={this.testFillTags}>      </button> 
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="transcription"
                                    label="Transcription"
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rowsMax="8"
                                    margin="normal"
                                    className={classes.textField}
                                    value={this.state.transcription}
                                    onChange={this.handleChange('transcription')}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <button className="myButton" onClick={this.handleClickEdit}>EDIT TRANSCRIPTION</button>
                            </Grid>
        
                        </form>
                    </Grid>
                </Grid>

            </>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore: reduxStore
})

export default connect(mapReduxStoreToProps)(withStyles(styles)(EditWordPressForm));