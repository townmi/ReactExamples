/*!
 * @author harrytang@vipabc.com 
 * @date 17/2/28.
 */
import React, { Component } from 'react';

import Home from 'components/Home';
import './root.scss'

class App extends Component {

    constructor() {
        super();
        this.state = {
            action: {
                className: "",
                onOff: false
            }
        }
    }

    toggleShow() {
        this.setState((prevState) => {
            prevState.action.onOff = !prevState.action.onOff;
            prevState.action.className = prevState.action.onOff ? " active" : "";
        })
    }

    getChildContext() {
        return { action: this.state.action };
    }

    static childContextTypes = {
        action: React.PropTypes.object
    };

    render() {

        const actionClass = this.state.action.className;

        return (
            <div className="root">
                <nav className="blue accent-4">
                    <div className="nav-wrapper container">
                        <a href="#" className="brand-logo">FaceTime</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="#">首页</a></li>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <Home />
                </div>
                <footer className="page-footer blue accent-4">
                    <div className="container">
                        <div className="row">
                            <div className="col l6 s12">
                                <h5 className="white-text">FaceTime website CMS</h5>
                                <p className="grey-text text-lighten-4">...</p>
                            </div>
                            <div className="col l4 offset-l2 s12">
                                <h5 className="white-text">其他系统</h5>
                                <ul>
                                    <li><a className="grey-text text-lighten-3" href="#!">FaceTime</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <div className="container">
                            © 2014 Copyright FaceTime
                            <a className="grey-text text-lighten-4 right" href="#!">FaceTime</a>
                        </div>
                    </div>
                </footer>

                <div className={"fixed-action-btn" + actionClass} onMouseEnter={this.toggleShow.bind(this)}
                    onMouseLeave={this.toggleShow.bind(this)}>
                    <a className="btn-floating btn-large red">
                        <i className="large material-icons">mode_edit</i>
                    </a>
                    <ul>
                        <li><a className="btn-floating red"><i className="material-icons">insert_chart</i></a></li>
                        <li><a className="btn-floating yellow darken-1"><i
                            className="material-icons">format_quote</i></a></li>
                        <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
                        <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
                    </ul>
                </div>
            </div>
        );
    }

}

export default App