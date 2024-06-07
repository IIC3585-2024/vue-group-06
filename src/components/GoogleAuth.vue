<script setup lang="ts">
import { defineProps } from 'vue'
import { supabase } from '../supabase'
import { ref, toRefs} from 'vue'
import { useTasksStore } from '@/stores/tasks'

const props = defineProps({
  session: Object
})

const loading = ref(false)
const { session } = toRefs(props)
const taskLists = ref([])

const addTasks = (tasks) => {
  console.log(tasks)
  const tasksStore = useTasksStore()
  for (const task of tasks) {
    const newTask = {
      title: task.title,
      type: 'other',
      description: task.notes,
      duration: 2,
      durationUnit: 'hours',
      currentTask: false,
      remainingTime: 2 * 3600,
      totalTime: 2 * 3600,
      completed: false,
    }
    tasksStore.addTask(newTask)
  }
}

const handleLogin = async () => {
  console.log('login')
  loading.value = true
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/tasks'
      }
    })
    if (error) {
      console.error('Error logging in:', error.message)
    }
  } catch (error) {
    console.error('Error logging in:', error.message)
  } finally {
    loading.value = false
  }
}

const fetchTasksLists = async () => {
  const data = localStorage.getItem('sb-nhzplnhaelxwtxqyrhbg-auth-token')
  const provider_token = JSON.parse(data).provider_token

  await fetch("https://tasks.googleapis.com/tasks/v1/users/@me/lists/", {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${provider_token}`
    }
  })
  .then(response => response.json())
  .then(data => 
    taskLists.value = data.items || [],
  )
}

const fetchTasks = async (event) => {
  const listId = event.target.value
  const data = localStorage.getItem('sb-nhzplnhaelxwtxqyrhbg-auth-token')
  const provider_token = JSON.parse(data).provider_token

  await fetch("https://tasks.googleapis.com/tasks/v1/lists/" + listId + "/tasks?showCompleted=false", {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${provider_token}`
    }
  })
  .then(response => response.json())
  .then(data => 
    addTasks(data.items),
)}

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Error logging out:', error.message)
}
</script>

<template>
  <div v-if="!session">
      <button class="btn btn-ghost btn-sm text-base" @click="handleLogin">Sign In with Google</button>
  </div>
  <div v-else>
      <button class="btn btn-ghost btn-sm text-base" @click="signOut">Sign Out</button>
      <button class="btn btn-ghost btn-sm text-base" @click="fetchTasksLists">Sincronize My Task Lists</button>
      <select class="select select-bordered text-black" @change="fetchTasks($event)">
        <option value="">Select a Task List</option>
        <option v-for="task in taskLists" :key="task.id" :value="task.id">{{ task.title }}</option>
      </select>
  </div>
</template>