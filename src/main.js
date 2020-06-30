import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/index';

//V-カレンダーのライブラリ追加
import VCalendar from 'v-calendar';
Vue.use(VCalendar, {
  componentPrefix: 'vc',
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
