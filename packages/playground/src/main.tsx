import { createApp } from 'vue'
import './style.css'
import TestComponent from './TestComponent.vue'

createApp({
  render() {
    return <TestComponent />
  }
}).mount('#app')
