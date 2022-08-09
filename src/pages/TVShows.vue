<template>
    <div>
        <div class="tv-shows" v-if="!errorOccurred">
            <TVShowsList :tvShows="tvShows" />
            <Observer @intersect="intersected" />
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
    <Spinner v-if="isLoading" />
</template>

<script lang="ts">
import axios from "axios";

import { defineComponent, onMounted, ref } from 'vue'
import Spinner from "@/components/UI/BaseSpinner.vue";
import TVShowsList from "@/components/TVShowsList.vue";
import { apiURL } from "@/helpers";
import Show from '@/types/Show';
import ShowsListDataFromAPI from "@/types/ShowDataFromAPI";
import Observer from "@/components/Observer.vue";


export default defineComponent({
    name: 'TVShows',
    components: {
        Spinner,
        TVShowsList,
        Observer,
    },

    setup() {
        let isLoading = ref(false);
        let currentPage = ref(1);
        let errorOccurred = ref(false);
        let tvShows = ref<Show[]>([])

        async function fetchTVShows(pageNumber: number = currentPage.value) {
            isLoading.value = true;
            try {
                const response = await axios.get(`${apiURL}/most-popular?page=${pageNumber}`);
                const { data } = response;
                const { page, tv_shows }: ShowsListDataFromAPI = data
                currentPage.value = page; // To be used later for the observer component
                let showsGotten = tv_shows
                tvShows.value = [ ...tvShows.value || [], ...showsGotten ];

                isLoading.value = false;
            } catch (error) {
                isLoading.value = false;
                errorOccurred.value = !!error;
            }
        }

        async function intersected() {
            currentPage.value++
            await fetchTVShows(currentPage.value);
        }

        onMounted(() => {
            fetchTVShows();
        })

        return {
            isLoading,
            currentPage,
            intersected,
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
