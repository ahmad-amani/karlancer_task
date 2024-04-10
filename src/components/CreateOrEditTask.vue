<script setup>
import useTaskCompose from '@/composables/useTaskCompose.js'
import CustomButton from '@/components/CustomButton.vue';
import { ref } from 'vue';
const props = defineProps(['insertNewOff', 'currentTaskData', 'updateTasksData'])
const currentTaskData = ref(props.currentTaskData);
const { text, dueDate, updateFieldByCurrentTask, save } = useTaskCompose()
updateFieldByCurrentTask(currentTaskData.value ?? {})
const saveAndBackToList = async () => {
    const task = await save()
    if (task) props.updateTasksData(task, currentTaskData.value.id)
    props.insertNewOff()
}
</script>
<template>


    <div
        class="w-full p-2  flex flex-row   bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex w-full  flex-col items-start   ">
            <textarea placeholder="write task here..." v-model="text" autofocus
                class="text-sm px-2 ring-0 outline-none border-b-2 resize-none w-full   pb-5 text-gray-500 dark:text-gray-400"></textarea>
            <div class="mt-4 flex w-full justify-between ">
                <div class="">
                    <VueDatePicker class="rounded-md outline-none ring-0 " v-model="dueDate">
                    </VueDatePicker>
                </div>
                <div class="flex gap-3 self-end">
                    <CustomButton text="Cancell" bg="bg-slate-600 hover:bg-slate-500" :action="insertNewOff"
                        size="text-xs py-1"></CustomButton>
                    <CustomButton :text="currentTaskData.id ? 'Update' : 'Save'" size="text-xs py-1"
                        :action="saveAndBackToList">
                    </CustomButton>

                </div>
            </div>
        </div>

    </div>

</template>