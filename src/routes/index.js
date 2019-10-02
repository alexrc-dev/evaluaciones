import {LoginView, App} from '../views';

const defaultAppRoutes = [
    {
        path: '/app',
        component: App,
    }
];

const routes = [
    {
        path: '/',
        component: LoginView
    },
    {
        path: '/app',
        component: App,
        routes: defaultAppRoutes,
    },
] ;

export default routes;