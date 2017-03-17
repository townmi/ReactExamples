/**
 * 
 */
import React, { Component } from 'react';
import { IndexLink, Link, withRouter, hashHistory } from 'react-router';

import Auth from '../../services/authToken';

class Common extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authStatus: {

            },
            actionBarStatus: false
        };
        const userInfo = Auth.getLocalToken();
        if (!!userInfo) {
            this.state.authStatus = true;
            this.state.authInfo = userInfo;
        } else {
            this.state.authStatus = false;
        }
        let self = this;
    }

    static childContextTypes = {
        authStatus: React.PropTypes.bool,
        authInfo: React.PropTypes.object
    }
    getChildContext() {
        return {
            authStatus: this.state.authStatus,
            authInfo: this.state.authInfo
        };
    }

    toTop() {
        document.body.scrollTop = 0;
    }

    toggle(type) {
        if(type && type ==="show") {
            this.setState({
                actionBarStatus: true
            })
        } else if(type && type ==="hide") {
            this.setState({
                actionBarStatus: false
            })
        } else {
            this.setState((prevState) => {
                prevState.actionBarStatus = !prevState.actionBarStatus;
            })
        }
    }

    logout() {
        const currentPath = this.props.location.pathname;
        Auth.delLocalToken();
        this.setState({
            authStatus: false,
            authInfo: null
        });
        if (currentPath != "/") {
            hashHistory.push("/");
        }
    }

    render() {
        const { children } = this.props;

        const userInfo = this.state.authInfo;
        let navHtml = null;
        if (this.state.authStatus) {
            navHtml = (
                <ul className="right hide-on-med-and-down">
                    <li><Link to="/">首页</Link></li>
                    <li><a href="/">新手入门</a></li>
                    <li className="avatar">
                        <Link to={{
                            pathname: '/user/' + userInfo.user_name
                        }}>
                            <img src={userInfo.user_avatar} title={userInfo.user_name} />
                        </Link>
                    </li>
                    <li><a href="javascript:;" onClick={this.logout.bind(this)}>退出</a></li>
                </ul>
            );
        } else {
            navHtml = (
                <ul className="right hide-on-med-and-down">
                    <li><a href="/">首页</a></li>
                    <li><a href="/">新手入门</a></li>
                    <li><Link to="/login">登录</Link></li>
                </ul>
            );
        }

        return (
            <div>
                <nav className="blue accent-4">
                    <div className="nav-wrapper container">
                        <a href="#" className="brand-logo">CNODE</a>
                        {navHtml}
                    </div>
                </nav>
                <div className="root">
                    <div className="container">
                        <div className="content">
                            {children}
                        </div>
                    </div>
                    <footer className="page-footer blue accent-4">
                        <div className="container">
                            <div className="row">
                                <div className="col l6 s12">
                                    <h5 className="white-text">CNODE BY React</h5>
                                    <p className="grey-text text-lighten-4">...</p>
                                </div>
                                <div className="col l4 offset-l2 s12">
                                    <h5 className="white-text">友情社区</h5>
                                    <ul>
                                        <li><a className="grey-text text-lighten-3" href="//cnodejs.org/">cnodejs.org</a></li>
                                        <li><a className="grey-text text-lighten-3" href="//cnode.goubaa.com/">cnode.goubaa.com</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="footer-copyright">
                            <div className="container">
                                © 2017 Copyright HARRY TANG
                                <a className="grey-text text-lighten-4 right" href="#!">CNODE</a>
                            </div>
                        </div>
                    </footer>

                    <div className={this.state.actionBarStatus ? "fixed-action-btn active" : "fixed-action-btn"} onMouseOut={this.toggle.bind(this, "hide")}  onMouseOver={this.toggle.bind(this, "show")}>
                        <a className="btn-floating btn-large red" onClick={this.toggle.bind(this)}>
                            <i className="large material-icons">add</i>
                        </a>
                        <ul>
                            <li><Link to="/" className="btn-floating red"><i className="material-icons">insert_chart</i></Link></li>
                            <li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
                            <li><a className="btn-floating green" onClick={this.toTop}><i className="material-icons">publish</i></a></li>
                            <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

Common.propTypes = {
    children: React.PropTypes.element.isRequired
};

export default withRouter(Common);
