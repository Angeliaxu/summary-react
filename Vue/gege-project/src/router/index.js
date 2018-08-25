import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/components/login/Login';

Vue.use(VueRouter);

let router = new VueRouter({
    mode:'history',
    routes:[{
        path:'/login',
        component:Login
    },{
        path:'*',
        redirect:'/login'
    }]
})

export default router;