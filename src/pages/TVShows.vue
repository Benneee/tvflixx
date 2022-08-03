<template>
    <div>
        <Loading v-if="isLoading" />

        <div class="tv-shows" v-if="!isLoading">
            <TVShowsList :tvShows="tvShows" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Loading from "@/components/UI/BaseLoading.vue";
import TVShowsList from "@/components/TVShowsList.vue";
import apiURL from "@/helpers";
import Show from '@/types/Show';
import ShowsListDataFromAPI from "@/types/ShowDataFromAPI";


export default defineComponent({
    name: 'TVShows',
    components: {
        Loading,
        TVShowsList,
    },

    setup() {
        let isLoading = ref(false);
        let tvShows = ref<Show[]>([])
        
        async function fetchTVShows() {
            isLoading.value = true;
            const response = await fetch(`${apiURL.apiURL}/most-popular`);
            const responseData: ShowsListDataFromAPI = await response.json();

            if (!response.ok) {
                console.log("An error occurred")
                isLoading.value = false;
            } else {
                // console.log("res: ", responseData);
                // const page = responseData?.page;
                tvShows.value = responseData?.tv_shows;
                isLoading.value = false;
            }
        }

        onMounted(() => {
            fetchTVShows();
        })

        return {
            isLoading,
            tvShows,
        }
    }
})
</script>

<style lang="scss" scoped>
    .tv-shows {
        @include grid-flex;
        margin-top: 6.5rem;
    }
</style>
