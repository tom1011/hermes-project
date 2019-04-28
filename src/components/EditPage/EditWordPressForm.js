import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
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
        date:'', //need
        title: '', //need
        content: '',  //need
        excerpt:'', //need
        slug:'', //need
        author: '',//need
        publicize_message: '',//need
        status: '',//need
        sticky: '',//need
        password: '',//need
        parent: '',//need
        categories: '',//need
        tags: '',//need
        featured_image: '',//need
        media: '',//need
        media_urls: '',//need
        comments_open: '',//need
        menu_order: '',//need
        transcription: this.props.reduxStore.transcriptReducer.transcription
    }

        

    handleChange = (key) => (event) => {
        console.log('event happened')
        this.setState({
            ...this.state,
            [key]: event.target.value,
        });
    }

    addNewBlog = (event) => {
        event.preventDefault();
        //this.props.dispatch({ type: 'ADD_DOG', payload: this.state })
        console.log(this.state);

        this.setState({
            title_of_blog: '',
            blog_name: '',
            tags: '',
            categories: '',
            transcription: '',
        })
    }

    handleClickEdit = (event) => {
        event.preventDefault();
        console.log('edit transcript button clicked');
        
            this.setState({
              redirect: true
            })
          
        // this.props.history.push('../TranscriptPage/TranscriptPage.js');
    }

    render() {
        const { classes } = this.props;
        //console.log(this.props.history);
        if (this.state.redirect) {
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
                                    value={this.state.blog_name}
                                    onChange={this.handleChange('blog_name')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="title"
                                    label="Name of Article"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={this.state.title_of_blog}
                                    onChange={this.handleChange('title_of_blog')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="tags"
                                    label="Tags"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={this.state.tags}
                                    onChange={this.handleChange('tags')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="categories"
                                    label="Categories"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={this.state.categories}
                                    onChange={this.handleChange('categories')}
                                />
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
                                <button className="myButton" onClick={this.handleClickEdit}>Edit Transcription</button>
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