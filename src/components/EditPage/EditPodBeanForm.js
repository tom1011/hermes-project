import React, { Component } from 'react';
import { connect } from 'react-redux';


class EditPodBeanForm extends Component {

    state = {
        title_of_podcast: '',
        producer: '',
        description: '',
    }

    handleChange = (key) => (event) => {
        console.log('event happened')
        this.setState({
            ...this.state,
            [key]: event.target.value,
        });
    }

    addNewPodcast = (event) => {
        event.preventDefault();
        //this.props.dispatch({ type: 'ADD_DOG', payload: this.state })
        console.log(this.state);

        this.setState({
            title_of_podcast: '',
            producer: '',
            description: '',
        })
    }


    render() {
        return (
            <>
                <div>
                    (insert fancy PodBean logo)
                    <h4>Edit Required Information for PodBean Podcast</h4>
                    <form onSubmit={this.addNewPodcast}>
                        <label>
                            Title of Podcast
                            <input placeholder="title"
                                value={this.state.title_of_podcast}
                                onChange={this.handleChange('title_of_podcast')} />
                        </label>
                        <label>
                            Producer
                        <input placeholder="producer"
                                value={this.state.producer}
                                onChange={this.handleChange('producer')} />
                        </label>
                        <label>
                            Description
                        <input placeholder="description"
                                value={this.state.description}
                                onChange={this.handleChange('description')} />
                        </label>
                        <button onClick={this.handleChange}>Add PodBean Podcast</button>
                    </form>
                </div>
            </>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(EditPodBeanForm);