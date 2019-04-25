import React, { Component } from 'react';
import { connect } from 'react-redux';


class EditPodBeanForm extends Component {
//held in reducer and in local state and are required by the apis to work
    state = {
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
        return (
            <>
                <div className="podbean-box">
                    (insert fancy PodBean logo)
                    <h4>Edit Required Information for PodBean Podcast</h4>
                    <form onSubmit={this.addNewPodcast} className="podbean-form">
                        <label className="title">
                            Title of Podcast
                            <input className="title-input"
                                placeholder="title"
                                value={this.state.titleOfPodbean}
                                onChange={this.handleChange('titleOfPodbean')} />
                        </label>
                        <label className="description">
                            Description
                            <input className="description-input"
                                placeholder="description"
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
    reduxState: reduxState
});

export default connect(mapReduxStateToProps)(EditPodBeanForm);
