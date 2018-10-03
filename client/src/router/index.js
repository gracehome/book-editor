import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import booklists from '@/components/book/lists'
import bookcreate from '@/components/book/create'
import bookView from '@/components/book/view'

const routes = [{
    path: '',
    redirect: '/books'
  },{
    path: '/books',
    name: 'booklists',
    component: booklists,
  },{
    path: '/books/create',
    name: 'bookcreate',
    component: bookcreate,
  }, {
    path: '/books/:id',
    name: 'bookView',
    component: bookView,
  }
];
var router = new VueRouter({
  routes
})
export default router;