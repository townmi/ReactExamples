/**
 * 
 */

import React, { Component } from 'react';

class Page extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul className="pagination">
                <li className="">
                    <a href="javascript:;">
                        <i className="material-icons">chevron_left</i>
                    </a>
                </li>
                <li className="">
                    <a href="javascript:;" ></a>
                </li>
                <li className="">
                    <a href="javascript:;">
                        <i className="material-icons">chevron_right</i>
                    </a>
                </li>
            </ul>
        )
    }
}

export default Page;