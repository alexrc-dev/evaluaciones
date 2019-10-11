import {ResumeView, App, TeachersView, LoginView} from '../views';

const defaultAppRoutes = [
    {
        path: '/admin',
        component: ResumeView,
        title: 'Inicio',
        exact: true
    }, {
        path: '/admin/profesores',
        component: TeachersView,
        title: 'Profesores',
        exact: true
    }
];
const titles = {
    '/admin': 'Inicio',
    '/admin/profesores': 'Profesores',
};
const routes = [
    {
        path: '/admin',
        component: App,
        routes: defaultAppRoutes,
        titles,
    },
    {
        path: '/',
        component: LoginView,
    }

] ;

export default routes;