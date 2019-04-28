import React, { Component } from 'react';
import { connect } from 'react-redux';


class EditPodBeanForm extends Component {
//held in reducer and in local state and are required by the apis to work
    state = {podbean: {
        piece: '',
        title: '',
        description: '',
    }
    }
    testFillTitle=(e)=>{
        this.setState({
            ...this.state,
            podbean: { ...this.state.podbean,
                title: 'Gates, do they count?',}
        })
    }
  
        testFillPiece=(e)=>{
            this.setState({
                ...this.state,
                podbean: { ...this.state.form,
                   piece: 'Doors,'+' '+ 'Gates,'+ ' '+ 'Lies,',}
            })
        }
        testFillDescription=(e)=>{
            this.setState({
                ...this.state,
                podbean: { ...this.state.form,
                   description: 'The neverending, and unstoppable marching of time,' + ' ' + 'Sharks',}
            })
        }
    handleChange = (key) => (event) => {
        console.log('event happened')
        this.setState({
            ...this.state,
            podbean: {
            ...this.state.podbean,
            [key]: event.target.value,
            }
        });
        console.log(this.state.podbean.key)
        this.props.dispatch({type: "SET_PODBEAN", payload: this.state.podbean.key})
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
                    <h4>Edit Required Information for PodBean Podcast</h4>
                    <form onSubmit={this.addNewPodcast} className="podbean-form">
                    <label className="title">
                            Title of Piece
                            <input className="piece"
                                placeholder="piece"
                                value={this.state.podbean.piece}
                                onChange={this.props.handleChangeP('piece')} />
                                 <button onClick={this.testFillPiece}>      </button>
                        </label>
                        <label className="title">
                            Title of Podcast
                            <input className="title-input"
                                placeholder="title"
                                value={this.state.podbean.title}
                                onChange={this.props.handleChangeP('title')} />
                                
                                <button onClick={this.testFillTitle}>      </button>
                        </label>
                        <label className="description">
                            Description
                            <input className="description-input"
                                placeholder="description"
                                value={this.state.podbean.description}
                                onChange={this.props.handleChangeP('description')} />
                                <button onClick={this.testFillDescription}>      </button>
                        </label> 
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
