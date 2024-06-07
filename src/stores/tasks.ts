import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Task } from '../types/task'  

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const timeLeft = ref<number>(0)
  const completedTasks = computed(() => tasks.value.filter(task => task.completed))
  const currentTask = computed(() => tasks.value.find(task => task.currentTask) || null)
  const availableTasks = computed(() => tasks.value.filter(task => !task.completed && !task.currentTask))

  
  function addTask(task: Task) {
    const lastTask = tasks.value[tasks.value.length - 1];
    task.id = lastTask ? lastTask.id + 1 : 1;
    tasks.value.push(task);
  }

  function startTask(id: number) {
    tasks.value.forEach(task => {
      task.currentTask = task.id === id;
      if (task.currentTask) {
        task.startedAt = new Date();
      }
    });
  }

  function deleteTask(id: number) {
    tasks.value = tasks.value.filter(task => task.id !== id);
  }

  const completedTasksTime = computed(
    () => completedTasks.value.reduce((acc, task) => acc + task.totalTime, 0)
  )

  function updateTaskRemainingTime(time: number) {
    if (currentTask.value && currentTask.value.startedAt) {
      currentTask.value.remainingTime = time;
    }
  }

  function stopCurrentTask() {
    if (currentTask.value && currentTask.value.remainingTime === 0) {
      currentTask.value.completed = true;
      currentTask.value.endedAt = new Date();
    }
    if (currentTask.value) {
      currentTask.value.currentTask = false;
    }
  }


  return {
    tasks,
    timeLeft,
    completedTasks,
    currentTask,
    completedTasksTime,
    availableTasks,
    addTask,
    startTask,
    deleteTask,
    updateTaskRemainingTime,
    stopCurrentTask
  }
},
  {
    persist: { storage: sessionStorage },
})