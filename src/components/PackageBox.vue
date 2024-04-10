<script setup>
import PurchaseModal from '@/components/PurchaseModal.vue';
import { openModal } from "jenesius-vue-modal";
const props = defineProps(['name', 'price', 'description', 'id'])
</script>

<template>
    <div class="shadow-md flex flex-col  border-2 rounded-md flex-1 px-4 py-2">
        <div class="font-bold text-lg">{{ name }}</div>
        <div class="text-sm mb-2">{{ description }}</div>
        <div class="mt-auto">
            <button @click="openModal(PurchaseModal, { name, price, description, id })"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                pay now {{ price }}r
            </button>
        </div>
    </div>
</template>