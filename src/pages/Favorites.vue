<template>
    <div>
        <Loading v-if="isLoading" />

        <div class="tv-shows" v-if="!isLoading">
            <TVShowsList 
                :tvShows="favorites"
                @refresh-shows-list="refreshFavorites"
            />
        </div>

        <div v-if="!isLoading && favorites.length === 0">
            <section class="tv-error">
                <h1>No Favorites!</h1>
                <p>Looks like you do not currently have any favorite TV shows.</p>
                <div class="center">
                    <button @click="goHome">Explore TV Shows</button>
                </div>
            </section>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import Show from '@/types/Show';
import { fetchFavorites } from '@/helpers';
import TVShowsList from "@/components/TVShowsList.vue";
import Loading from "@/components/UI/BaseLoading.vue";

export default defineComponent({
    name: "Favorites",

    components: {
        TVShowsList,
        Loading,
    },

    setup() {
        const isLoading = ref(false);
        const favorites = ref<Show[]>([]);
        const router = useRouter();

        function goHome() {
            router.push({
                name: 'shows'
            })
        }

        function getFavorites() {
            isLoading.value = true;
            favorites.value = fetchFavorites();
            isLoading.value = false;
        }

        function refreshFavorites() {
            getFavorites();
        }

        onMounted(() => {
            getFavorites();
        })


        return  {
            favorites,
            isLoading,
            refreshFavorites,
            goHome,
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
        a {
            text-decoration: underline;
            color: $custom-green;
        }

        .center {
            text-align: center;
        }
    }
</style>