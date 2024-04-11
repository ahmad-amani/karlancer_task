<script setup>
import CustomButton from '@/components/CustomButton.vue';
import useAuthCompose from '@/composables/useAuthCompose.js'
import VerifyOrResend from '@/components/VerifyOrResend.vue'
const { password, email, verify, resend, verifyUrl, register } = useAuthCompose()

</script>
<template>
  <div v-if="!verifyUrl" class="xl:border-l-4 flex justify-center">

    <div class="flex min-h-full flex-1 flex-col justify-center p-4  xl:py-12 xl:px-8">
      <div class="hidden xl:block sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-24 h-24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>

        </div>
        <h2 class="xl:mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register an account
        </h2>
      </div>

      <div class="xl:mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div class="mt-2">
              <input v-model="email" id="email" name="email" type="text" autocomplete="email" required=""
                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="text-sm">
                <span href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">at least 8 char</span>
              </div>
            </div>
            <div class="mt-2">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
                required=""
                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <CustomButton text="Register" :action="register"></CustomButton>
          </div>
        </form>

        <p class="xl:mt-10 text-center text-sm text-gray-500">
          already have an acoount?
          {{ ' ' }}
          <RouterLink to="/login" href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            login to your account
          </RouterLink>
        </p>
      </div>
    </div>

  </div>
  <VerifyOrResend v-else :resend="resend" :verify="verify"></VerifyOrResend>
</template>
