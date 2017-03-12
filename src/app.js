/**
 * @Created by Administrator
 * @Date 2015/12/14.
 * @author [haixiangtang@creditease.cn]
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import App from './root';

const MOUNT_NODE = document.getElementById('reactApp');

let render = () => {

    const routes = require('./routes/index').default();

    ReactDOM.render(
        <App routes={routes}/>,
        MOUNT_NODE
    )

};

render();