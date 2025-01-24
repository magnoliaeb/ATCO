import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiRequest } from '@/api/axios'

export const useCollectionStore = defineStore('collection', () => {
    // State
    const collections = ref([])

    // Actions
    const fetchCollections = async () => {
      try {
        const {data} = await apiRequest({method: 'GET', url: '/collections'})
        // console.log(data);
        collections.value = data
      } catch (error) {
        collections.value = []

      }
    }

  return { fetchCollections, collections }
})
