/**
 * 
 */
// Sync route definition
export default (store) => ({
	path: '/topic/:id',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			const Topic = require('./Topic').default;
			cb(null, Topic)
		})
	}
})

// export default {
//   component: Topic
// }