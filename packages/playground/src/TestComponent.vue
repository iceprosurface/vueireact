<template>
  <HelloWorldVue name="test" @click="onClick">
    <template #named="data">
      {{ data }}
    </template>
  </HelloWorldVue>
</template>

<script lang="tsx" setup>
import { toVues } from '@vueireact/core';
import { HelloWorld } from './App.fc';

const { HelloWorld: HelloWorldVue } = toVues({
  HelloWorld,
})

const onClick = () => {
  console.log('clicked')
}
</script>