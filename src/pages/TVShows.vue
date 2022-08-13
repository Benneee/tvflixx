<template>
    <div>
        <SearchShows @searchQuery="searchShows" v-if="!isLoading" ref="top"/>

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
    <div v-if="!isLoading && totalAvailablePages > 1 && !errorOccurred" class="pagination-container">
        <Pagination
            :totalPages="totalAvailablePages"
            :total="totalShowsCount"
            :perPage="20"
            :currentPage="currentPage"
            @page-changed="onPageChanged"
        />
    </div>
</template>

<script lang="ts">
import axios from "axios";

import { defineComponent, nextTick, onMounted, ref } from 'vue'
import Loading from "@/components/UI/BaseLoading.vue";
import TVShowsList from "@/components/TVShowsList.vue";
import { apiURL } from "@/helpers";
import Show from '@/types/Show';
import ShowsListDataFromAPI from "@/types/ShowDataFromAPI";
import SearchShows from "@/components/SearchShows.vue";
import Pagination from "@/components/Pagination.vue";


export default defineComponent({
    name: 'TVShows',
    components: {
        Loading,
        TVShowsList,
        SearchShows,
        Pagination,
    },

    setup() {
        let isLoading = ref(false);
        let errorOccurred = ref(false);
        let tvShows = ref<Show[]>([])
        let searchQuery = ref('');
        let isSearchQuery = ref(false);
        const top = ref<HTMLDivElement>()

        // Pagination stuff
        let totalAvailablePages = ref(1);
        let totalShowsCount = ref(0);
        let currentPage = ref(1);

        async function fetchTVShows(pageNumber: number = currentPage.value) {
            isLoading.value = true;
            try {
                const response = await axios.get(`${apiURL}/most-popular?page=${pageNumber}`);
                const { data } = response;
                const { total, pages, page, tv_shows }: ShowsListDataFromAPI = data
                currentPage.value = page;
                totalAvailablePages.value = pages;
                totalShowsCount.value = Number(total);
                tvShows.value =  tv_shows;
                isLoading.value = false;
                nextTick(() => top.value?.scrollTo({ behavior: 'smooth', top: 0 }));
            } catch (error) {
                isLoading.value = false;
                errorOccurred.value = !!error;
            }
        }

        async function onPageChanged(page: number) {
            isSearchQuery.value ? 
                await searchShows(searchQuery.value, page) :
                    await fetchTVShows(page);
        }

        async function searchShows(dataToSearch: string, pageNumber = 1) {
            isLoading.value = true;
            searchQuery.value = dataToSearch;
            try {
                isSearchQuery.value = true;
                const response = await axios.get(`${apiURL}/search?q=${dataToSearch}&page=${pageNumber}`);
                const { data } = response;
                const { total, pages, page, tv_shows }: ShowsListDataFromAPI = data;
                currentPage.value = page;
                totalAvailablePages.value = pages;
                totalShowsCount.value = Number(total);
                tvShows.value =  tv_shows;
                isLoading.value = false;
                nextTick(() => top.value?.scrollTo({ behavior: 'smooth', top: 0 }));
            } catch (error) {
                isSearchQuery.value = false;
                isLoading.value = false;
                errorOccurred.value = !!error;
            }
        }

        onMounted(() => {
            fetchTVShows();
        });

        return {
            isLoading,
            currentPage,
            tvShows,
            errorOccurred,
            searchShows,
            totalAvailablePages,
            totalShowsCount,
            onPageChanged,
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

    .pagination-container {
        display: flex;
        justify-content: center;
    }
</style>
