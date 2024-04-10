import { useAuthStore } from "@/stores/Auth"
import { ref } from "vue";
import { useRouter } from "vue-router"
import { toast } from 'vue3-toastify';
import axios from "@/axios";
import useAuthCompose from "@/composables/useAuthCompose"
export default function useUserCompose() {
    const auth = useAuthStore()
    const card = ref(auth.user.card ?? '')
    const { updateUser } = useAuthCompose()
    const updateCard = async () => {
        if (card.value.length < 16) {
            toast.error('valid card number has 16 digits')
            return;
        }
        try {
            const res = await axios.put('user', { card: card.value })
            updateUser(res.data.user)
            toast('card number updated successfully')
        } catch (e) {
            console.log(e);
        }
        return true;
    }
    return {
        updateCard, card
    }
}