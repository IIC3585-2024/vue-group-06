<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import GoogleAuth from './components/GoogleAuth.vue'
  import { supabase }  from './supabase'
  import { onMounted, ref } from 'vue'

  const session = ref()

  onMounted(async () => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  })


</script>

<template>
  <header>
    <div class="navbar bg-neutral text-neutral-content justify-between">
      <GoogleAuth :session="session"/>
      <h1 class="font-bold text-2xl">Task Timer</h1>
      <div>
        <RouterLink class="btn btn-ghost text-base" to="/">Home</RouterLink>
        <RouterLink class="btn btn-ghost text-base" to="/create-task">Create Task</RouterLink>
      </div>
    </div>
  </header>
  <div v-if="session" class="pt-6 pb-2">
    <p class="text-center text-xl">Welcome {{ session.user.user_metadata.full_name }} !</p>
  </div>
  <RouterView />
</template>
