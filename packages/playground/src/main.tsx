import { createApp } from 'vue'
import './style.css'
import TestComponent from './TestComponent.vue'
import App from './App.fc.tsx'
createApp({
  render() {
    return <App />
  }
}).mount('#app')
