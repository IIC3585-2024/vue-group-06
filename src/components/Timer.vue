<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useTasksStore } from '@/stores/tasks';

const tasksStore = useTasksStore();
const props = defineProps<{
  isSummary: boolean;
}>();

const timeLeft = computed(
  () => props.isSummary ? tasksStore.completedTasksTime : tasksStore.timeLeft
);

const days = computed(() => Math.floor(timeLeft.value / (3600 * 24)));
const hours = computed(() => Math.floor((timeLeft.value % (3600 * 24)) / 3600));
const minutes = computed(() =>
  Math.floor((timeLeft.value % 3600) / 60)
);
const seconds = computed(() => timeLeft.value % 60);
</script>

<template>
  <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
      <span class="w-16 font-mono text-5xl">
        <span>{{ days }}</span>
      </span>
      days
    </div>
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
      <span class="w-16 font-mono text-5xl">
        <span>{{ hours }}</span>
      </span>
      hours
    </div>
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
      <span class="w-16 font-mono text-5xl">
        <span>{{ minutes }}</span>
      </span>
      min
    </div>
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
      <span class="w-16 font-mono text-5xl">
        <span>{{ seconds }}</span>
      </span>
      sec
    </div>
  </div>
</template>