import {LoginView, App} from '../views';

const defaultAppRoutes = [
    {
        path: '/app',
        component: LoginView,
    }
];

const routes = [
    {
        path: '/',
        component: App,
        routes: defaultAppRoutes
    },
    {
        path: '/app',
        component: App,
        routes: defaultAppRoutes,
    },
] ;

export default routes;