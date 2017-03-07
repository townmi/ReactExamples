/*!
 * @author harrytang@vipabc.com 
 * @date 17/2/28.
 */

import React, { Component } from 'react'

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static contextTypes = {
        action: React.PropTypes.object
    };

    refresh(tree) {

        let list = [];
        let self = this;
        tree.forEach(function (cell, index) {
            if (cell.child) {
                const active = cell.open ? "collapsible-body-open" : "";
                list.push(
                    <li key={index}>
                        <div className="collapsible-header" onClick={self.props.handToggle.bind(self, index, cell.id)}><span
                            className="new badge">{cell.child.length}</span><i
                                className="material-icons">add</i>{cell.name}</div>
                        <div className={"collapsible-body " + active}>
                            <ul className="collapsible">
                                {self.refresh(cell.child)}
                            </ul>
                        </div>
                    </li>
                )
            } else {
                list.push(
                    <li key={index}>
                        <div className="collapsible-header"><i className="material-icons">remove</i>{cell.name}
                        </div>
                    </li>
                )
            }
        });
        return list;
    }

    render() {
        const tree = this.props.tree;

        // console.log(this.context);
        if (tree.length) {
            return (
                <div>
                    <ul className="collapsible">
                        {this.refresh(tree)}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="loading">

                </div>
            );
        }
    }

}

export default Tree