import Vue from 'vue'
import VueRouter from 'vue-router'
import 'babel-preset-env'
import ProblemPage from './ProblemPage.vue'
import SelectPage from './SelectPage.vue'
import App from './App.vue'


Vue.use(VueRouter);

let router = new VueRouter({
  mode : 'history',
  routes : [
    {
      path : '/',
      name : 'selectPage',
      component : SelectPage
    },
    {
      path : '/problem',
      name : 'problemPage',
      component : ProblemPage
    }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
