import Vue from 'vue';
import VueRouter from 'vue-router';
import Foo from '../components/foo';
import Bar from '../components/bar';
import Baz from '../components/baz';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        components: {
            default: Foo,
            a: Bar,
            b: Baz
        }
    }
];

export const router = new VueRouter({
    routes
})