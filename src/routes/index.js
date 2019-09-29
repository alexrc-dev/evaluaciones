import {LoginView, App} from '../views';

const defaultAppRoutes = [

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