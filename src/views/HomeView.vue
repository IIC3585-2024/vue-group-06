<script setup lang="ts">
import Timer from '@/components/Timer.vue';
import TaskCard from '@/components/TaskCard.vue';
import TaskList from '@/components/TaskList.vue';
import TasksSummary from '@/components/TasksSummary.vue';
import { useTasksStore } from '@/stores/tasks';
import { ref, computed } from 'vue';

const currentPage = ref("tasks");
const changePage = (page: string) => {
  currentPage.value = page;
}

const tasksStore = useTasksStore();
const currentTask = computed(
  () => tasksStore.currentTask ? tasksStore.currentTask : null
);

</script>

<template>
  <main class="flex flex-col items-center py-6">
    <ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
      <li>
        <button 
          @click="changePage('tasks')"
        >
          Tasks
        </button>
      </li>
      <li>
        <button 
          @click="changePage('summary')"
        >
          Summary
        </button>
      </li>
    </ul>

    <div class="flex flex-row gap-4 py-4">
    </div>

    <div
      v-if="currentPage === 'tasks'"
      class="flex flex-col items-center"
    >
      <div 
        class="mockup-window border bg-base-300 w-full flex flex-col items-center p-6 gap-5 mb-10"
      >
        <h1 class="text-2xl font-bold">Current Task Timer</h1>
        <Timer
          :remainingTime="currentTask ? currentTask.remainingTime : 0"
        />
        <TaskCard 
          v-if="currentTask" 
          :id="currentTask.id"
          :title="currentTask.title"
          :completed="currentTask.completed"
          :description="currentTask.description"
          :duration="currentTask.duration"
          :durationUnit="currentTask.durationUnit"
          :type="currentTask.type"
          :currentTask="currentTask.currentTask"
          :remainingTime="currentTask.remainingTime"
        />
      </div>

      <TaskList />
    </div>


    <div v-else>
      <TasksSummary />
    </div>
  </main>
</template>
