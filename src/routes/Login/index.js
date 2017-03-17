/**
 * 
 */

import { hashHistory } from 'react-router';

import Auth from '../../services/authToken';

export default (store) => ({
	path: '/login',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			const Login = require('./Login').default;
			cb(null, Login)
		})
	},
	onEnter(nextState, replace, wrappedNext) {
		const token = Auth.getLocalToken();
		let userInfo;
		if (!!token) {
			Auth.authToken(token.user_accessToken)
				.then((lastData) => {
					if (lastData.status === "success") {
						hashHistory.push('/')
					} else {
						Auth.delLocalToken();
						wrappedNext();
					}
				});
		} else {
			Auth.delLocalToken();
			wrappedNext();
		}
	}
})