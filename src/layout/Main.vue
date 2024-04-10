<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue';
import { useAuthStore } from '@/stores/Auth.js'
import useAuthCompose from '@/composables/useAuthCompose.js'
const auth = useAuthStore()
const { logout } = useAuthCompose()
</script>

<template>
  <div id="main">
    <div id="app">
      <header class="mr-4">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <div class="wrapper overflow-hidden">
          <HelloWorld msg="Karlancer Challenge!" />

          <nav class="flex overflow-x-auto" v-if="!auth.user?.token">
            <RouterLink to="/login">Login</RouterLink>
            <RouterLink to="/register">Register</RouterLink>
          </nav>
          <nav class="flex overflow-x-auto" v-else>
            <RouterLink to="/dashboard">Dashboard</RouterLink>
          
            <a href="#" @click="logout">Logout</a>

          </nav>
        </div>
      </header>

      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
#main {
  min-height: 100vh;
  color: var(--color-text);
  background: var(--color-background);
  transition:
    color 0.5s,
    background-color 0.5s;
  line-height: 1.6;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}



#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  #main {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }
}
</style>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

<style>
.page-enter-active,
.page-leave-active {
  transition: 450ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
