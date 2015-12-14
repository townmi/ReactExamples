/**
 * @Created by Administrator
 * @Date 2015/12/14.
 * @author [haixiangtang@creditease.cn]
 */
var React = require('react');

//var Footer = require('./Footer');
//var Header = require('./Header');
//var MainSection = require('./MainSection');
//
//var TodoStore = require('../stores/TodoStore');

var TodoApp = React.createClass({

    getInitialState: function() {
        //return TodoStore.getAll();
        return {name: "hello, world!", _click: false};
    },

    componentDidMount: function() {
        //TodoStore.on('change', this._onChange);
    },

    componentWillUnmount: function() {
        //TodoStore.removeListener('change', this._onChange);
    },

    handleClick: function () {
        // click event
        this.setState({name: this.state._click ? "hello, world" : "haha", _click: !this.state._click });
    },

    render: function() {
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
    },

    _onChange: function() {
        //this.state = TodoStore.getAll();
        //this.forceUpdate();
        // this.setState(TodoStore.getAll());
    }

});

module.exports = TodoApp;