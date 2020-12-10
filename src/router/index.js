import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  { 
    path: '/',
    redirect: 'Login'
  },
  {
    path: '*',
    redirect: 'Login'
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List.vue'),
    meta:{
      login: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  var user = firebase.auth().currentUser;
  let authRequired = to.matched.some(ruta => ruta.meta.login)
  if (!user && authRequired) {
    next('login');
     alert('Debes loguearte primero!')
  }else if(user && !authRequired){
    next();
  }else {
    next()  
  }
})

export default router
