import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AllFieldView from "@/views/AllFieldView";
import NewBookingView from "@/views/NewBookingView";
import NewLoginView from "@/views/NewLoginView";
import UserView from "@/views/UserView";
import AdminView from "@/views/AdminView";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'homeRoute',
        component: HomeView
    },
    {
        path: '/fields',
        name: 'allFieldRoute',
        component: AllFieldView
    },
    {
        path: '/booking',
        name: 'bookingRoute',
        component: NewBookingView
    },
    {
        path: '/log-in',
        name: 'loginRoute',
        component: NewLoginView
    },
    {
        path: '/user',
        name: 'userRoute',
        component: UserView
    },
    {
        path: '/admin',
        name: 'adminRoute',
        component: AdminView
    }
]

const router = new VueRouter({
    routes
})


export default router
