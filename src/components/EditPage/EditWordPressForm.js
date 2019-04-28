import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import SimpleModalWrapped from './transcriptModal'
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
            title: this.props.reduxStore.editReducer.formReducer.title,
blog: this.props.reduxStore.editReducer.formReducer.blog,
tags:this.props.reduxStore.editReducer.formReducer.tags,
categories:this.props.reduxStore.editReducer.formReducer.categories
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
        console.log(this.state.form)
        //console.log(this.props.history);
        if (this.state.redirect==='true') {
            return <Redirect to='/transcript-page' />
        }

        return (
            <>
                <div>
                    <h4>Edit Required Information for WordPress</h4>

                    <form onSubmit={this.addNewBlog}>
                        <label>
                            Title of Piece
                            <input 
                                value={this.state.form.title}
                                onChange={this.props.handleChangeW('title')} />
                                <button onClick={this.testFillTitle}>      </button>
                        </label>
                        <br />
                        <label>
                            Blog Name
                        <input 
                                value={this.state.form.blog}
                                onChange={this.props.handleChangeW('blog')} />
                                <button onClick={this.testFillBlog}>      </button>
                        </label>
                        <br />
                        <label>
                            Tags
                        <input 
                                value={this.state.form.tags}
                                onChange={this.props.handleChangeW('tags')} />
                                <button onClick={this.testFillTags}>      </button>
                        </label>
                        <br />
                        <label>
                            Categories
                        <input 
                                value={this.state.form.categories}
                                onChange={this.props.handleChangeW('categories')} />
                                <SimpleModalWrapped/>
                        </label>
                        <br />
                        <label>
                            Transcription
                        <input placeholder="transcription"
                                value={this.state.transcription}/>
                </label>
                            <button onClick={this.props.handleDispatch} onClick={this.handleRedirect}>Edit Transcription</button>
                        
                        {/* <button onClick={this.handleChange}>Next</button> */}
                    </form>
                </div>
            </>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore: reduxStore
})

export default connect(mapReduxStoreToProps)(EditWordPressForm);