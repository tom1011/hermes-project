
import React, { Component } from 'react';
import { connect } from 'react-redux';


class Wordpress extends Component {
    

    render() {
        return (
            <div>
                <a href= 'https://public-api.wordpress.com/oauth2/authorize?client_id=65413&response_type=code&redirect_uri=http://localhost:5000/wordpress/callback_wordpress'>wordpress</a>
            </div>
        );
    }
}
export default connect()(Wordpress);
