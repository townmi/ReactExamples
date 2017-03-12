/*!
 * @author harrytang@vipabc.com 
 * @date 17/2/28.
 */
import React, { Component, PropTypes } from 'react';
import { hashHistory, Router } from 'react-router';

class App extends Component {

    static propTypes = {
        routes: PropTypes.object.isRequired
    };

    shouldComponentUpdate() {
        return false
    }

    render() {

        const { routes } = this.props;

        return (
            // <Router history={browserHistory} children={routes}/>
            <Router history={hashHistory} children={routes}/>
        )

    }

}

export default App