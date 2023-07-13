import './assets/main.css'
import './game'
import { createApp } from 'vue'
import App from './App.vue'
import * as benqy from '@hapi/common'

console.log(benqy.world, 1)

createApp(App).mount('#game')
