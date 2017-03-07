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
                    "child": null,
                    "id": "1"
                },
                {
                    "name": "用户见证",
                    "path": "/customer",
                    "child": null,
                    "id": "2"
                },
                {
                    "name": "关于我们",
                    "path": "/aboutUs",
                    "open": false,
                    "id": "3",
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

    toggle(index, id) {
        console.log(this);

        this.setState((prevState)=>{
            prevState.tree[index].open = !prevState.tree[index].open;
        })
    }

    refresh(tree) {
        let list = [];
        let self = this;
        tree.forEach(function (cell, index) {
            if (cell.child) {
                const innerStyle = cell.open ? "display: none;" : "display: block";
                list.push(
                    <li key={index}>
                        <div className="collapsible-header" onClick={self.toggle.bind(self, index, cell.id)}><span
                            className="new badge">{cell.child.length}</span><i
                            className="material-icons">filter_drama</i>{cell.name}</div>
                        <div className="collapsible-body" style={{innerStyle}}>
                            <ul className="collapsible">
                                {self.refresh(cell.child)}
                            </ul>
                        </div>
                    </li>
                )
            } else {
                list.push(
                    <li key={index}>
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
                <ul className="collapsible">
                    {this.refresh(tree)}
                </ul>
            </div>
        );
    }

}

export default Tree