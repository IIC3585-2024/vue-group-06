<script setup lang="ts">
import type { Task } from '@/types/task'
import TaskCard from '@/components/TaskCard.vue'
import { computed } from 'vue'
import { useTasksStore } from '@/stores/tasks'

const props = withDefaults(defineProps<{
  showOnlyCompletedTasks?: boolean
}>(),
  {
    showOnlyCompletedTasks: false
  },
);

const tasksStore = useTasksStore()
const tasks = computed<Task>(() => {
  return props.showOnlyCompletedTasks
    ? tasksStore.completedTasks
    : tasksStore.availableTasks
})

</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div v-for="task in tasks" :key="task.id">
      <TaskCard
        :id="task.id"
        :title="task.title"
        :completed="task.completed"
        :description="task.description"
        :duration="task.duration"
        :durationUnit="task.durationUnit"
        :type="task.type"
        :currentTask="task.currentTask"
        :remainingTime="task.remainingTime"
      />
    </div>
  </div>
</template>