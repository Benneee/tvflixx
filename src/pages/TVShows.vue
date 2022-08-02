<template>
    <div>
        <Loading v-if="isLoading" />

        <div class="tv-shows">
            <p>List TV shows here</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Loading from "@/components/UI/BaseLoading.vue";


export default defineComponent({
    name: 'TVShows',
    components: {
        Loading
    },

    setup() {
        const isLoading = ref(false)

        return {
            isLoading
        }
    }
})
</script>

<style lang="scss" scoped>
    .tv-shows {
        @include grid-flex;
    }
</style>
