<template>
    <article class="tv-show" v-for="( show, index ) in tvShows" :key="show.id">
        <TVShow
            :tvShow="show"
            :showIndex="index"
            @refresh-list="refreshList"
        />
    </article>
</template>

<script lang="ts">
import TVShow from '@/components/TVShow.vue';
import Show from '@/types/Show';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: "TVShowsList",

    emits: ["refresh-shows-list"],
    
    props: {
        tvShows: {
            type: Array as PropType<Show[]>,
            required: true
        }
    },

    components: {
        TVShow
    },

    setup(_, { emit }) {
        function refreshList(): void {
            emit("refresh-shows-list")
        }

        return {
            refreshList,
        }
    }
})
</script>

<style lang="scss" scoped>
    .tv-show {
        height: 25rem;
        width: 16rem;
        margin: 1.5rem 0.8%;
        padding: 0;
        box-shadow: 0 2px 3px rgba(0, 0, 0, .075),0 2px 10px rgba(0, 0, 0, .15);            
        background: #fff;
        transition: .3s;

        @include respond(phone) {
            width: 100%;
        }

        @include respond(tab-port) {
            width: 18rem;
        }
    }
</style>
