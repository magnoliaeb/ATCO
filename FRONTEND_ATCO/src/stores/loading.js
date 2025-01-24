import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {

    
    const loading = ref(false);

    const isLoading = computed(() => loading.value);

    const startLoading = () => {
      loading.value = true;
    };

    const stopLoading = () => {
      loading.value = false;
    };

  return {  
    isLoading, 
    startLoading, 
    stopLoading
}
})
