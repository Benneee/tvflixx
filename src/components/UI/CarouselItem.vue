<template>
    <transition name="slide">
        <div class="carousel-slide" v-if="activeSlide === index">
            <slot></slot>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "CarouselItem",

    props: {
        activeSlide: {
            type: Number,
            required: true,
        },

        index: {
            type: Number,
            required: true
        }
    }
})
</script>


<style scoped lang="scss">
    .slide-enter-active {
        transition: slideIn 0.4s ease-in-out;
    }

    .slide-leave-active {
        transition: slideOut 0.4s ease-in-out;
    }

    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }

    @keyframes slideOut {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
    }
</style>