import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from './components/Masuk.vue'
import Jadwal from './components/Jadwal2.vue'
import Admin from './components/Admin.vue'


Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/Jadwal', name: 'jadwal', component: Jadwal },
    { path: '/Admin', name: 'admin', component: Admin }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');
  if (authRequired && !loggedIn) {
    return next('/');
  } else if (!authRequired && loggedIn){
    return next('/Admin')
  }
  next();
});

export default router;