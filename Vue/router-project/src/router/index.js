import Vue from 'vue';
import VueRouter from 'vue-router';

import Foo from '../components/foo';
import Bar from '../components/bar'

Vue.use(VueRouter);

const routes =[{
    path:'/foo/:id',
    component: Foo
},{
    path:'/bar/:id',
    component:Bar
}]
const router = new VueRouter({
    routes
})

export default router;