import { ref } from "vue";
import { toast } from 'vue3-toastify';
import axios from "@/axios";
import { data } from "autoprefixer";
export default function useTaskCompose() {
    const text = ref('')
    const id = ref(false)
    const tasks = ref([])
    const deleting = ref(false)

    const dueDate = ref('')
    const updateFieldByCurrentTask = (currentTask) => {
        console.log(currentTask);
        text.value = currentTask.text
        dueDate.value = currentTask.due_date
        id.value = currentTask.id
    }

    const deleteTask = async () => {
        deleting.value = true
        try {
            const res = await axios.delete('tasks/' + id.value)
            deleting.value = false;
            return true;
        } catch (e) {
            console.log(e);
        }
        deleting.value = false
        return false
    }
    const save = async () => {
        if (!text.value) {
            toast.error('text field cant be empty. write something')
        }
        let task = false;
        try {
            let data = { text: text.value }
            if (dueDate.value & currentTask.due_date != dueDate.value) data.due_date = dueDate.value

            if (id.value) {
                const res = await axios.put('tasks/' + id.value, data)
                task = res.data.task
            } else {
                const res = await axios.post('tasks', data)
                task = res.data.task
            }
        } catch (e) {
            console.log(e);
        }
        return task

    }

    const getList = async () => {
        try {
            const res = await axios.get('tasks')
            tasks.value = [...tasks.value, ...res.data.tasks]
            console.log(tasks.value);
        } catch (e) {
            console.log(e);
        }

    }

    return { deleteTask, deleting, tasks, text, dueDate, updateFieldByCurrentTask, save, getList }
}