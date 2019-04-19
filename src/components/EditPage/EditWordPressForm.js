import React, { Component } from 'react';
import { connect } from 'react-redux';


class EditWordPressForm extends Component {

    state = {
        title_of_blog: '',
        blog_name: '',
        tags: '',
        categories: '',
        transcription: '',
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
        //this.props.history.push('/transcript-page');
    }


    render() {
        //console.log(this.props.history);
        
        return (
            <>
                <div>
                    <h4>Edit Required Information for WordPress</h4>

                    <form onSubmit={this.addNewBlog}>
                        <label>
                            Title of Piece
                            <input placeholder="title"
                                value={this.state.title_of_blog}
                                onChange={this.handleChange('title_of_blog')} />
                        </label>
                        <br />
                        <label>
                            Blog Name
                        <input placeholder="blog name"
                                value={this.state.blog_name}
                                onChange={this.handleChange('blog_name')} />
                        </label>
                        <br />
                        <label>
                            Tags
                        <input placeholder="tags"
                                value={this.state.tags}
                                onChange={this.handleChange('tags')} />
                        </label>
                        <br />
                        <label>
                            Categories
                        <input placeholder="categories"
                                value={this.state.categories}
                                onChange={this.handleChange('categories')} />
                        </label>
                        <br />
                        <label>
                            Transcription
                        <input placeholder="transcription"
                                value={this.state.transcription}
                                onChange={this.handleChange('transcription')} />
                                <button onClick={this.handleClickEdit}>Edit Transcription</button>
                        </label>
                        {/* <button onClick={this.handleChange}>Next</button> */}
                    </form>
                </div>
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(EditWordPressForm);