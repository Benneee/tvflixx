<template>
    <div>
        <SearchShows @searchQuery="searchShows" />

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
import SearchShows from "@/components/SearchShows.vue";


export default defineComponent({
    name: 'TVShows',
    components: {
        Spinner,
        TVShowsList,
        Observer,
        SearchShows,
    },

    setup() {
        let isLoading = ref(false);
        let currentPage = ref(1);
        let errorOccurred = ref(false);
        let tvShows = ref<Show[]>([])
        let searchQuery = ref('');
        let isSearchQuery = ref(false);
        let totalAvailablePages = ref(1);

        async function fetchTVShows(pageNumber: number = currentPage.value) {
            isLoading.value = true;
            try {
                const response = await axios.get(`${apiURL}/most-popular?page=${pageNumber}`);
                const { data } = response;
                const { pages, page, tv_shows }: ShowsListDataFromAPI = data
                currentPage.value = page;
                let showsGotten = tv_shows
                totalAvailablePages.value = pages;
                tvShows.value =  totalAvailablePages.value > 1 ? 
                    [ ...tvShows.value || [], ...showsGotten ] : showsGotten;

                isLoading.value = false;
            } catch (error) {
                isLoading.value = false;
                errorOccurred.value = !!error;
            }
        }

        async function intersected() {
            // Use a counter here to regulate the increment of currentPage
            if (totalAvailablePages.value > 1) {
                currentPage.value++
                isSearchQuery.value ? 
                await searchShows(searchQuery.value, currentPage.value) :
                    await fetchTVShows(currentPage.value);
            }
        }

        async function searchShows(dataToSearch: string, pageNumber = 1) {
            isLoading.value = true;
            searchQuery.value = dataToSearch;
            try {
                isSearchQuery.value = true;
                const response = await axios.get(`${apiURL}/search?q=${dataToSearch}&page=${pageNumber}`);
                const { data } = response;
                const { pages, page, tv_shows }: ShowsListDataFromAPI = data;
                currentPage.value = page;
                let showsGotten = tv_shows;
                totalAvailablePages.value = pages;
                // Use a counter here to regular the spread operation
                tvShows.value =  totalAvailablePages.value > 1 ? 
                    [ ...tvShows.value || [], ...showsGotten ] : showsGotten;
                isLoading.value = false;
            } catch (error) {
                isSearchQuery.value = false;
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
            intersected,
            tvShows,
            errorOccurred,
            searchShows,
        }
    }
})
</script>

<style lang="scss" scoped>
    .tv-shows {
        @include grid-flex;
        margin-top: 2rem;

        @include respond(phone) {
            margin-top: 4rem;
        }
    }

    .tv-error {
        @include info-block;
    }
</style>
