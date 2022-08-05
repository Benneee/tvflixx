<template>
    <div>
        <p>Show Details</p>
    </div>
</template>


<script lang="ts">
import { apiURL } from '@/helpers';
import axios from 'axios';
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import ShowDetailsDataFromAPI from "@/types/ShowDetailsDataFromAPI"
import ShowDetail from '@/types/ShowDetail';

export default defineComponent({
    name: "ShowDetails",

    setup() {
        let isLoading = ref(false);
        let errorOccurred = ref(false);
        let showDetails = ref<ShowDetail | null>(null);
        const route = useRoute();

        async function fetchShowDetails() {
            isLoading.value = true;

            try {
                const { showId } = route?.params;
                const response = await axios.get(`${apiURL}/show-details?q=${showId}`);
                const { data } = response;
                const { tvShow }: ShowDetailsDataFromAPI = data;
                showDetails.value = tvShow;
                isLoading.value = false;
                console.log("TV Show: ", tvShow);
            } catch (error) {
                isLoading.value = false;
                errorOccurred.value = !!error;
            }
        }


        onMounted(() => {
            fetchShowDetails();
        })

        return {
            isLoading,
            errorOccurred,
            showDetails,
        }
    }
})
</script>
