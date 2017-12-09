import Vue from 'vue'
import VueRouter from 'vue-router'
import EmailApp from './components/EmailApp.vue'
import Error404 from './components/Error404.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    { path: '/', component: EmailApp },

    // Always leave this last one
    { path: '*', component: Error404 } // Not found
  ]
})
