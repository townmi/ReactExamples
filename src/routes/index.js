import Common from '../components/Common';
import Home from './Home';
import Topic from './Topic';
import User from './User';
import Login from './Login';

export const createRoutes = (store) => ({
    path: '/',
    component: Common,
    indexRoute: Home,
    childRoutes: [
        Topic(),
        User(),
        Login()
    ]
});

export default createRoutes;