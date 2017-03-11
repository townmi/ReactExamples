/**
 * @Created by Administrator
 * @Date 2015/12/14.
 * @author [haixiangtang@creditease.cn]
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'root';

const MOUNT_NODE = document.getElementById('reactApp');

let render = () => {

    const routes = require('./routes/index').default();

    console.log(routes);

    ReactDOM.render(
        <App routes={routes}/>,
        MOUNT_NODE
    )

};

render();