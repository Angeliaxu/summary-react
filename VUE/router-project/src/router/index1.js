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
        path:'/',
        component:User
    },
    {
        path:'/nest/:id', // 嵌套路由
        component: User,
        name: 'nest', // 命名路由
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