import Vue from 'vue';
import VueRouter from 'vue-router';

import Foo from '../components/foo';
import Bar from '../components/bar';
import User from '../components/user';
import profile from '../components/profile';
import post from '../components/post';

Vue.use(VueRouter);

const routes =[
    {
        path:'/foo/:id',
        component: Foo
    },
    {
        path:'/bar/:id',
        component:Bar
    },
    {
        path:'/nest/:id',
        component: User,
        children:[
            {
                path:'profile',
                component:profile
            },
            {
                path:'post',
                component:post
            }
        ]
    }
]
const router = new VueRouter({
    routes
})

export default router;