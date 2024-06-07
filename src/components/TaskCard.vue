<script setup lang="ts">
import type { Task } from '@/types/task'
import { useTasksStore } from '@/stores/tasks';
import { defineProps, computed } from 'vue';

const tasksStore = useTasksStore()
const props = defineProps<Task>();

const deleteTask = (id: string) => {
  tasksStore.deleteTask(id);
}

const startTask = (id: string) => {
  tasksStore.startTask(id);
}

const stopTask = () => {
  tasksStore.stopCurrentTask();
}

const isTaskRunning = computed(() => tasksStore.currentTask !== null);
</script>

<template>
  <div class="card card-compact w-96 bg-base-100 shadow-xl border min-h-48">
    <div class="card-body">
      <h2 class="card-title">{{ props.title }}</h2>
      <p>Time: {{ props.duration }} {{ props.durationUnit }}</p>
      <p>{{ props.description }}</p>
      <div class="flex flex-row items-end justify-between">
        <div class="badge badge-neutral text-white">
          <span>{{ props.type }}</span>
        </div>
        <div v-if="!props.completed">
          <div 
            v-if="!props.currentTask"
            class="card-actions justify-end"
          >
            <button class="btn btn-neutral rounded-2xl" @click="startTask(props.id)" :disabled="isTaskRunning">Start</button>
            <button class="btn btn rounded-2xl" @click="deleteTask(props.id)">Delete</button>
          </div>
          <div 
            v-else
            class="card-actions justify-end"
          >
            <button class="btn btn-primary rounded-2xl" @click="stopTask">Stop</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>