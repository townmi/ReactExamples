import Common from '../components/Common';
import Home from './Home';
import Topic from './Topic';

export const createRoutes = (store) => ({
    path: '/',
    component: Common,
    indexRoute: Home,
    childRoutes: [
        Topic()
    ]
});

export default createRoutes;

// {
//             path: '/topic/:id',
//             component: Common,
//             indexRoute: Topic
//         }