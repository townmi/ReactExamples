/**
 * 
 */
import React, { Component } from 'react';
import { IndexLink, Link, withRouter } from 'react-router';

class Common extends Component {
    constructor (props) {
        super(props);
    }
    toTop () {
        document.body.scrollTop = 0;
    }
    render () {
        const { children } = this.props;

        return (
            <div>
                <nav className="blue accent-4">
                    <div className="nav-wrapper container">
                        <a href="#" className="brand-logo">CNODE</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="#">首页</a></li>
                            <li><a href="#">新手入门</a></li>
                            <li><Link to="/login">登录</Link></li>
                        </ul>
                    </div>
                </nav>
                <div className="root">
                    <div className="container">
                        <div className="content">
                            { children }
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

                    <div className="fixed-action-btn">
                        <a className="btn-floating btn-large red">
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
