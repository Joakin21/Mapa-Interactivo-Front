import Vue from 'vue'
import App from './App.vue'
import x5GMaps from 'x5-gmaps'

import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"


//Vue.use(x5GMaps, 'AIzaSyCACGWM4l6xFHD6AUsQGlbS4Em6Ni_9g74')
Vue.use(x5GMaps, { key: 'AIzaSyCACGWM4l6xFHD6AUsQGlbS4Em6Ni_9g74', libraries: ['places'] })

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')