import Vue from 'vue'
// import BootstrapVue from "bootstrap-vue"
// import { BButtonToolbar } from 'bootstrap-vue'
import App from './App.vue'
// import buidTree from './treeDefination'
import {get, getTableByEntry, prepareTreeData} from './utils'




// Vue.component('b-button-toolbar', BButtonToolbar)

new Vue({
  el: '#app',
  render: h => h(App),
})
