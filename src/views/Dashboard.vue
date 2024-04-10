<script setup>
import { Fragment, onMounted, ref } from 'vue';
import Task from '@/components/Task.vue'
import CreateOrEditTask from '@/components/CreateOrEditTask.vue'
import useTaskCompose from '@/composables/useTaskCompose.js'
const { getList, tasks } = useTaskCompose()
const inLoad = ref(true);
const currentTaskData = ref({})
const insertNew = ref(false)
const insertNewOff = () => {
  insertNew.value = false;
}
const insertNewOn = (task) => {
  currentTaskData.value = task
  insertNew.value = true;
}
const updateTasksData = (newData, id = false, deleteTask = false) => {
  if (deleteTask) {
    let data = [...tasks.value]
    let index = data.findIndex(i => i.id == id)
    data.splice(index, 1)
    tasks.value = data
    return;
  }
  if (!id) {
    tasks.value = [newData, ...tasks.value]
  } else {
    let data = [...tasks.value]
    let index = data.findIndex(i => i.id == id)
    data[index] = newData;
    tasks.value = data
  }
}

const createNewTask = () => {
  currentTaskData.value = {}
  insertNew.value = true;
}


onMounted(async() => {
  await getList()
  inLoad.value=false;
  currentTaskData.value = {}
})


</script>
<template>
  <div class="xl:border-l-4 min-h-screen max-h-screen flex flex-col p-4 gap-3 ">
    <div class="px-2 flex justify-between">
      <h1 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Tasks</h1>
      <svg @click="createNewTask" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="cursor-pointer w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>

    </div>
    <div class=" p-2 text-center flex flex-col gap-4 " v-if="insertNew">
      <CreateOrEditTask :newTextField="newTextField" :updateTasksData="updateTasksData"
        :currentTaskData="currentTaskData" :insertNewOff="insertNewOff">
      </CreateOrEditTask>

    </div>
    <div v-else class=" p-2 text-center flex flex-col gap-4 max-h-full overflow-y-auto">

      <Task v-if="tasks.length" v-for="task in tasks" :updateTasksData="updateTasksData" :insertNewOn="insertNewOn"
        :task="task" :key="task.id" :text="task.text" :dueDate="task.due_date"></Task>
      <div v-if="!tasks.length"
        class="w-full p-1  flex flex-row   bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex w-full  flex-col items-start   ">
          <span v-if="!inLoad" class="text-sm px-4 text-gray-500 dark:text-gray-400">there is no task yet. start create
            one</span>
          <span v-else
            class="text-sm flex justify-center items-center m-auto px-4 text-gray-500 dark:text-gray-400 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <circle cx="4" cy="12" r="3" fill="currentColor">
                <animate id="svgSpinners3DotsFade0" fill="freeze" attributeName="opacity"
                  begin="0;svgSpinners3DotsFade1.end-0.25s" dur="0.75s" values="1;0.2" />
              </circle>
              <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.4">
                <animate fill="freeze" attributeName="opacity" begin="svgSpinners3DotsFade0.begin+0.15s" dur="0.75s"
                  values="1;0.2" />
              </circle>
              <circle cx="20" cy="12" r="3" fill="currentColor" opacity="0.3">
                <animate id="svgSpinners3DotsFade1" fill="freeze" attributeName="opacity"
                  begin="svgSpinners3DotsFade0.begin+0.3s" dur="0.75s" values="1;0.2" />
              </circle>
            </svg>
          </span>
        </div>

      </div>
    </div>
  </div>
</template>