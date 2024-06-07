<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useTasksStore } from '@/stores/tasks';

  const router = useRouter();
  const taskName = ref('');
  const taskCategory = ref('work');
  const taskDescription = ref('');
  const taskDuration = ref(1);
  const durationUnit = ref('hours');
  const tasksStore = useTasksStore();

  const convertToSeconds = (duration: number, unit: string) => {
    switch (unit) {
      case 'minutes':
        return duration * 60;
      case 'hours':
        return duration * 3600;
      case 'days':
        return duration * 86400;
      default:
        return duration;
    }
  }

  const createTask = () => {
    tasksStore.addTask({
      title: taskName.value,
      type: taskCategory.value,
      description: taskDescription.value,
      duration: taskDuration.value,
      durationUnit: durationUnit.value,
      currentTask: false,
      remainingTime: convertToSeconds(taskDuration.value, durationUnit.value),
      totalTime: convertToSeconds(taskDuration.value, durationUnit.value),
      completed: false,
    });
    router.back();
  }

</script>

<template>
  <div class="flex flex-col align-center items-center py-10 gap-5">
    <h1 class="text-2xl font-bold">New Task</h1>
    <form @submit.prevent="createTask" class="flex flex-col justify-between gap-5">
      <div class="form-control">
        <label for="taskName">Task Name</label>
        <input class="input input-bordered w-full" id="taskName" v-model="taskName" type="text" />
      </div>
      <div>
        <label for="taskCategory">Task Category</label>
        <select class="select select-bordered w-full" id="taskCategory" v-model="taskCategory">
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="form-control flex flex-row items-end space-between gap-4">
        <div>
          <label for="taskDuration">Estimated Task Duration</label>
          <input class="input input-bordered w-full" id="taskDuration" v-model="taskDuration" type="number" />
        </div>
        <select  class="select select-bordered w-full" id="durationUnit" v-model="durationUnit">
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
        </select>
      </div>
      <div class="form-control">
        <label for="taskDescription">Task Description</label>
        <textarea class="textarea resize-none textarea-bordered textarea-md w-full" id="taskDescription" v-model="taskDescription"></textarea>
      </div>
      <div class="w-full flex flex-row gap-4 justify-center px-2">
        <button class="btn w-1/2" type="button" @click="router.back()">Cancel</button>
        <button class="btn btn-primary w-1/2" type="submit">Create Task</button>
      </div>
    </form>
  </div>
</template>
