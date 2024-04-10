<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/Auth.js";
import axios from '@/axios.js'
import { toast } from 'vue3-toastify';

const auth = useAuthStore()
const card = ref(auth.user.card ?? '')
const pending = ref(false)

const props = defineProps(['id', 'price', 'name', 'description']);
const purchase = async () => {
    if (pending.value !== false) {
        return;
    }
    if (card.value.toString().length != 16) {
        toast.error('card number is 16 digits', {
            autoClose: 2000
        });
        return;
    }
    pending.value = true;
    try {
        const res = await axios.post('purchase', { package_id: props.id, card: card.value })
        window.location.href = res.data.payment_link
    } catch (e) {
        console.log(e);
    }
    pending.value = false
}
</script>
<template>
    <div class="bg-white h-96 p-4 w-11/12 xl:w-6/12 flex flex-row justify-between items-stretch">
        <div class="flex flex-col gap-3 justify-center items-center text-center p-2" style="flex:2">
            <span class="text-2xl">{{ name }}</span>
            <span class="">
                {{ description }}
            </span>
            <form action="" class="flex w-full mt-3 gap-3">
                <input v-model="card" placeholder="please enter a card number" id="card" name="card" type="number"
                    autocomplete="card" required=""
                    class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6" />
            </form>
        </div>
        <div class="border-2"></div>
        <div class="flex-1 justify-evenly flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red"
                class="w-36 h-36">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
            </svg>

            <button @click="purchase" class="bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded"
                :class="pending ? 'bg-slate-500 hover:bg-slate-500' : ''">
                purchase
            </button>

        </div>
    </div>
</template>