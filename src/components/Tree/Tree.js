/*!
 * @author harrytang@vipabc.com 
 * @date 17/2/28.
 */

import React, {Component} from 'react'

class Tree extends Component {
    constructor() {
        super();

        this.state = {
            tree: [
                {
                    "name": "首页",
                    "path": "/",
                    "child": null
                },
                {
                    "name": "用户见证",
                    "path": "/customer",
                    "child": null
                },
                {
                    "name": "关于我们",
                    "path": "/aboutUs",
                    "child": [
                        {
                            "name": "新闻",
                            "path": "/news",
                            "child": null
                        },
                        {
                            "name": "答疑",
                            "path": "/faq",
                            "child": null
                        }
                    ]
                }
            ]
        }
    }

    refresh(tree) {
        let list = [];
        let self = this;
        tree.forEach(function (cell, index) {
            if (cell.child) {
                list.push(
                    <li>
                        <div className="collapsible-header"><span className="new badge">{cell.child.length}</span><i
                            className="material-icons">filter_drama</i>{cell.name}</div>
                        <div className="collapsible-body">
                            <ul className="collapsible" data-collapsible="accordion" >
                                {self.refresh(cell.child)}
                            </ul>
                        </div>
                    </li>
                )
            } else {
                list.push(
                    <li>
                        <div className="collapsible-header"><i className="material-icons">filter_drama</i>{cell.name}
                        </div>
                    </li>
                )
            }

        });

        return list;

    }

    render() {
        const tree = this.state.tree;
        return (
            <div>
                <ul className="collapsible" data-collapsible="accordion">
                    {this.refresh(tree)}
                </ul>
            </div>
        );
    }

}

export default Tree