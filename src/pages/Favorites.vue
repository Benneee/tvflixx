<template>
    <div>
        <p>Favorites</p>
    </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Show from '@/types/Show';
import { fetchFavorites, removeFromFavorites } from '@/helpers';

export default defineComponent({
    name: "Favorites",

    setup() {
        const favorites = ref<Show[]>([]);

        function getFavorites() {
            favorites.value = fetchFavorites();
        }

        function removeShowFromFavorites(tvShowId: number): void {
            removeFromFavorites(tvShowId);
            // Add notification thingy here
        }


        onMounted(() => {
            getFavorites();
        })


        return  {
            favorites,
            removeShowFromFavorites,
        }
    }
})
</script>
