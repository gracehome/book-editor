import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
