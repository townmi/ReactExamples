/*!
 * @author harrytang@vipabc.com 
 * @date 17/2/28.
 */
import React, {Component} from 'react';

import Tree from '../Tree';

class Home extends Component {
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
                        <Tree/>
                    </div>
                    <div className="col s9">

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

                    </div>
                </div>
            </div>

        );
    }

}

export default Home;