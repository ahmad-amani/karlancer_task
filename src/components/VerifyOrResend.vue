<script setup>
import CustomButton from '@/components/CustomButton.vue';
import { useRouter } from 'vue-router';
const props = defineProps(['verify', 'resend'])
</script>
<template>
    <div class="xl:border-l-4 flex  flex-col justify-evenly mt-5 px-6 gap-10 ">

        <span>A verification link has been sent to your email account. Additionally, you can verify your account
            immediately by clicking on the 'Verify' button. </span>
        <div class="flex gap-3">
            <CustomButton text="Resend" :action="props.resend"></CustomButton>
            <CustomButton text="Verify" :action="props.verify"></CustomButton>
        </div>

    </div>
</template>