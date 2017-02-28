/*!
 * @author harrytang@vipabc.com 
 * @date 17/2/28.
 */
import React, {Component} from 'react';

class MapRoutes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "static": {
                className: "",
                val: ""
            }
        }
    }

    check(event) {
        const input = event.target.value;
        this.setState((prevState) => {
            prevState.static.val = input;
            prevState.static.className = prevState.static.val.length ? "active" : "";
        });

    }

    render() {

        const inputActive = this.state.static.className;
        const inputVal = this.state.static.val;

        return (
            <div className="content">
                <nav>
                    <div className="nav-wrapper">
                        <div className="col s12">
                            <a href="#!" className="breadcrumb">首页</a>
                            <a href="#!" className="breadcrumb">路由设置</a>
                        </div>
                    </div>
                </nav>
                <div className="row">
                    <div className="col s3">
                        <div className="switch">
                            <label>
                                Off
                                <input type="checkbox"/>
                                <span className="lever"></span>
                                On
                            </label>
                        </div>
                        <p>
                            <input name="group1" type="radio" id="test1" />
                            <label htmlFor="test1">Red</label>
                        </p>
                        <p>
                            <input name="group1" type="radio" id="test2" />
                            <label htmlFor="test2">Yellow</label>
                        </p>
                        <p>
                            <input className="with-gap" name="group1" type="radio" id="test3"  />
                            <label htmlFor="test3">Green</label>
                        </p>
                        <p>
                            <input name="group1" type="radio" id="test4" disabled="disabled" />
                            <label htmlFor="test4">Brown</label>
                        </p>
                    </div>
                    <div className="col s9">

                        <div className="col s6">
                            <div className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                    <span className="card-title">Card Title</span>
                                    <p>I am a very simple card. I am good at containing small bits of information.
                                        I am convenient because I require little markup to use effectively.</p>
                                </div>
                                <div className="card-action">
                                    <a href="#">This is a link</a>
                                    <a href="#">This is a link</a>
                                </div>
                            </div>
                        </div>

                        <div className="col s6">
                            <div className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                    <span className="card-title">Card Title</span>
                                    <p>I am a very simple card. I am good at containing small bits of information.
                                        I am convenient because I require little markup to use effectively.</p>
                                </div>
                                <div className="card-action">
                                    <a href="#">This is a link</a>
                                    <a href="#">This is a link</a>
                                </div>
                            </div>
                        </div>

                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s6">
                                    <input placeholder="Placeholder" id="first_name" type="text" className="validate"/>
                                    <label htmlFor="first_name" className="active">First Name</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="last_name" type="text" value={inputVal} className="validate"
                                           onChange={this.check.bind(this)}/>
                                    <label htmlFor="last_name" className={inputActive}>Last Name</label>
                                </div>
                            </div>
                        </form>

                        <div>
                            <br/><br/>
                            <div className="preloader-wrapper active">
                                <div className="spinner-layer spinner-blue">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="gap-patch">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>

                                <div className="spinner-layer spinner-red">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="gap-patch">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>

                                <div className="spinner-layer spinner-yellow">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="gap-patch">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>

                                <div className="spinner-layer spinner-green">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="gap-patch">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

export default MapRoutes;