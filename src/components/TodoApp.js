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
        return null;
    },

    componentDidMount: function() {
        //TodoStore.on('change', this._onChange);
    },

    componentWillUnmount: function() {
        //TodoStore.removeListener('change', this._onChange);
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
                Hello, World!
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