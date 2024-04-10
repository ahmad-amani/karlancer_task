import axios from "axios";
import { useAuthStore } from "./stores/Auth";
import { toast } from 'vue3-toastify';
import router from '@/router/index.js'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

axios.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if (authStore.user) {
        config.headers.Authorization = `Bearer ${authStore.user.token}`;
    }
    config.headers.Accept = "application/json";
    return config
})


axios.interceptors.response.use(function (response) {
    return response;
}, function (e) {
    const authStore = useAuthStore();
    if (e.response) {
        toast.error(e.message + (typeof e.response.data.message !== 'undefined' ? ' - ' + e.response.data.message : ''), {
            autoClose: 2000
        })
    }

    if (typeof e.response !== 'undefined') {
        if (e.response.status == 401 && e.response?.data?.message == 'Unauthenticated.') {
            localStorage.removeItem('user')
            authStore.user = null
            router.push('/')
        }
    }
    if (typeof e.response !== 'undefined' && typeof e.response.data.errors !== 'undefined') {
        Object.keys(e.response.data.errors).map(k => {
            toast.error(e.response.data.errors[k], {
                autoClose: 5000
            })
        })
    }
    return Promise.reject(e);
});
export default axios


//axios.interceptors.response