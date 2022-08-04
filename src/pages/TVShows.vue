<template>
    <div>
        <Loading v-if="isLoading" />

        <div class="tv-shows" v-if="!isLoading && !errorOccurred">
            <TVShowsList :tvShows="tvShows" />
        </div>

        <div v-if="!isLoading && errorOccurred">
            <section class="tv-error">
                <h1>Something went wrong!</h1>
                <p>But don't worry - it can happen to the best of us, and it just happened to you.</p>
                <p>Please try again later.</p>
            </section>
        </div>

        <div v-if="!isLoading && tvShows.length === 0 && !errorOccurred">
            <section class="tv-error">
                <h1>No TV Shows!</h1>
                <p>Looks like we do not currently have any TV shows for you.</p>
                <p>Please try again later.</p>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import axios from "axios";

import { defineComponent, onMounted, ref } from 'vue'
import Loading from "@/components/UI/BaseLoading.vue";
import TVShowsList from "@/components/TVShowsList.vue";
import { apiURL } from "@/helpers";
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
        let currentPage = ref(1);
        let errorOccurred = ref(false);
        let tvShows = ref<Show[]>([])

        async function fetchTVShows() {
            isLoading.value = true;
            try {
                const response = await axios.get(`${apiURL}/most-popular`);
                const { data } = response;
                const { page, tv_shows }: ShowsListDataFromAPI = data
                currentPage.value = page; // To be used later for the observer component
                tvShows.value = tv_shows

                isLoading.value = false;
            } catch (error) {
                isLoading.value = false;
                errorOccurred.value = !!error;
            }
        }

        onMounted(() => {
            fetchTVShows();
        })

        return {
            isLoading,
            currentPage,
            tvShows,
            errorOccurred,
        }
    }
})
</script>

<style lang="scss" scoped>
    .tv-shows {
        @include grid-flex;
        margin-top: 6.5rem;

        @include respond(phone) {
            margin-top: 4rem;
        }
    }

    .tv-error {
        @include info-block;
    }
</style>
