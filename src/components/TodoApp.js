/**
 * @Created by Administrator
 * @Date 2015/12/14.
 * @author [haixiangtang@creditease.cn]
 */
import React, {Component} from 'react'

//var Footer = require('./Footer');
//var Header = require('./Header');
//var MainSection = require('./MainSection');
//
//var TodoStore = require('../stores/TodoStore');
class TodoApp extends Component {
    constructor() {
        super();

        this.state = {
            name: "xxx"
        }
    }

    componentDidMount () {
        //TodoStore.on('change', this._onChange);
    }

    componentWillUnmount () {
        //TodoStore.removeListener('change', this._onChange);
    }

    handleClick () {
        // click event
        this.setState({name: this.state._click ? "hello, world" : "haha", _click: !this.state._click });
    }

    render () {
        //return (
        //    <div>
        //        <Header />
        //        <MainSection data={this.state} />
        //        <Footer data={this.state} />
        //    </div>
        //);

        return (
            <div>
                <span>{this.state.name}</span>
                <button onClick={this.handleClick}>改名字</button>
            </div>
        );
    }

}

export default TodoApp