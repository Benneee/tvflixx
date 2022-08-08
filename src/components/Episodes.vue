<template>
    <div></div>
</template>

<script lang="ts">
import Episode from '@/types/Episode'
import { defineComponent, onMounted, PropType } from 'vue'

export default defineComponent({
    name: 'Episodes',

    props: {
        episodes: {
            type: Array as PropType<Episode[]>,
            required: true,
        }
    },

    setup(props) {
        /**
         * ToDos Here
         * 
         * Create a function to sort through the episodes
         * The function should sort episodes by their season
         * Pass the function as an helper to the UI to create the number buttons we will have per show
         * On clicking a button all the episodes for that season(button) should show
         * For the display bit, use pokelogue-type of display - scatter flex
         */
        onMounted(() => {
            console.log("Episodes: ", props.episodes);
        })
    }
})
</script>
