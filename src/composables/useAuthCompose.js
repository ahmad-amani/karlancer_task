import { useAuthStore } from "@/stores/Auth"
import { ref } from "vue";
import { useRouter } from "vue-router"
import { toast } from 'vue3-toastify';
import axios from "@/axios";
export default function useAuthCompose() {
    const password = ref('')
    const email = ref('')
    const confirm = ref('')
    const verifyUrl = ref(false)
    const auth = useAuthStore()
    const router = useRouter()

    const logout = async () => {
        toast('logging out...')
        await axios.post('logout')
        auth.user = null
        localStorage.removeItem('user')
        router.push('login')
    }

    const resend = async () => {
        toast('not implemented')
        return true;
    }

    const login = async () => {
        try {
            const res = await axios.post('login', { password: password.value, email: email.value })
            updateUser(res.data.user)
            if (res.data.user.token) {
                router.push('/dashboard')
            } else {
                verifyUrl.value = res.data.user.verification_url
            }

        } catch (e) {
            console.log(e);
        }
    }
    const register = async () => {
        try {
            if (password.value.length < 8) {
                toast.error('password must be at least 8 char')
                return;
            }

            const res = await axios.post('register', { email: email.value, password: password.value })
            verifyUrl.value = res.data.user.verification_url
        } catch (e) { }

        return true;
    }

    const verify = async () => {
        try {
            router.push('/verify?verification_url=' + encodeURIComponent(verifyUrl.value))
        } catch (e) {

        }

        return true;
    }

    const updateUser = (user) => {

        if (auth.user && auth.user.token && !user.token) {
            user.token = auth.user.token
        }

        auth.user = user
        localStorage.setItem('user', JSON.stringify(user))

    }

    return { email, password, resend, confirm, verifyUrl, login, logout, register, updateUser, verify }

}