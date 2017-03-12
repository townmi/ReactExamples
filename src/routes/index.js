import Common from '../components/Common';
import Home from './Home';
import Topic from './Topic';
import User from './User';

export const createRoutes = (store) => ({
    path: '/',
    component: Common,
    indexRoute: Home,
    childRoutes: [
        Topic(),
        User()
    ]
});

export default createRoutes;