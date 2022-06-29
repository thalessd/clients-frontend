import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Maska from "maska";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

const app = createApp(App)

library.add(fas, far)

app.use(router)
app.use(Maska);
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
