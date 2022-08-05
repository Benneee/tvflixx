<template>
    <div class="carousel">
        <slot></slot>

        <button @click="next" class="next">
            <i class="mdi mdi-chevron-right"></i>
        </button>
        <button @click="previous" class="previous">
            <i class="mdi mdi-chevron-left"></i>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "Carousel",

    emits: ["next", "previous"],

    setup(_, { emit }) {
        function next() {
            emit("next")
        }

        function previous() {
            emit("previous")
        }

        return {
            next,
            previous
        }
    }
})
</script>


<style scoped lang="scss">
    .carousel {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 300px;
        height: 360px;
        background: rgb(225, 223, 223);
        overflow: hidden;

        button {
            position: absolute;
            height: 3rem;
            width: 3.5rem;
            border: none;
            top: calc(50% - 1.5rem);   
            color: #fff;
            background: #000;
            font-size: 1.8rem;


            &:hover, &:focus {
                outline: none;
                cursor: pointer;
            }

            &.next {
                right: 0;
            }

            &.previous {
                left: 0;
            }
        }
    }
</style>