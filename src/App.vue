<script setup>
    import {container} from "jenesius-vue-modal";
</script>

<template>
  <container />
  <component :is="$route.meta.layout || 'div'">
    <router-view></router-view>
  </component>
</template>

