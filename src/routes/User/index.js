/**
 * 
 */
// Sync route definition
export default (store) => ({
	path: '/user/:username',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			const User = require('./User').default;
			cb(null, User)
		})
	}
})