<template>
    <div class="carousel__items">
        <div class="carousel">
            <slot></slot>

            <button @click="next" class="next">
                <i class="mdi mdi-chevron-right"></i>
            </button>
            <button @click="previous" class="previous">
                <i class="mdi mdi-chevron-left"></i>
            </button>
        </div>
        <div v-if="tvShowPictures" class="tv-show-pictures">
            <section 
                v-for="(picture, index) in tvShowPictures" 
                :key="`pic-${index}`" 
                :class="{ 'active-slide': activeSlide === index }"
                :ref="`currentImg-${index}`"
            >
                <img @click="showThisPicture(index)" :src="picture" :alt="`Picture number ${index + 1}`">
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "Carousel",

    props: {
        tvShowPictures: {
            type: Array,
            required: true
        },
        activeSlide: {
            type: Number,
            required: false,
        }
    },

    emits: ["next", "previous", "selectedFromReels"],

    setup(_, { emit }) {
        // const currentImg = ref()

        // const setFocus = computed(() => {
        //     return ''
        // })

        function next() {
            emit("next")
        }

        function previous() {
            emit("previous")
        }

        function showThisPicture(indexOfPicture: number) {
            emit("selectedFromReels", indexOfPicture);
        }

        return {
            next,
            previous,
            showThisPicture,
            // setFocus,
        }
    }
})
</script>


<style scoped lang="scss">
    .carousel__items {
        display: flex;
        flex-direction: column;

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

            
        .tv-show-pictures {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            margin-top: 8px;
            width: 300px;
            
            section {
                padding: 2px;
                height: 72px;
                width: 72px;
                flex: 0 0 auto;
                cursor: pointer;

                img {
                    width: 100%;
                    height: 100%;
                }

                &.active-slide {
                    border: 1px solid $custom-green;
                }
            }
        }
    }
</style>