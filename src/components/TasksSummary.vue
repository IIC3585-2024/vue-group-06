<script setup lang="ts">
import TaskList from '@/components/TaskList.vue';
import Timer from '@/components/Timer.vue';

</script>

<template>
  <div class="mockup-window border bg-base-300 mb-10">
    <div class="flex flex-col items-center p-6 gap-5 w-full items-center">
      <h1 class="text-2xl font-bold">Completed Tasks Summary</h1>
      <Timer
        :isSummary="true"
      />
    </div>
  </div>

  <TaskList :show-only-completed-tasks="true"/>
</template>