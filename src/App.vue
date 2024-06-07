<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="navbar bg-neutral text-neutral-content justify-between">
      <div>
        <button class="btn btn-ghost btn-sm">Sign In with Google</button>
      </div>
      <h1 class="font-bold text-2xl">Task Timer</h1>
      <div>
        <RouterLink class="btn btn-ghost text-xl" to="/">Home</RouterLink>
        <RouterLink class="btn btn-ghost text-xl" to="/create-task">Create Task</RouterLink>
      </div>
    </div>
  </header>

  <RouterView />
</template>
