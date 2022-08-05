<template>
    <TheHeader />
    <div class="details">
        <div class="details__info">
            <section class="details__info-pictures">
                <carousel
                    @next="showNextSlide"
                    @previous="showPreviousSlide"
                >
                    <carousel-item 
                        v-for="(picture, index) in showDetails?.pictures" 
                        :key="index"
                        :index="index"
                        :activeSlide="activeSlide"
                    >
                        <img :src="picture" :alt="picture">
                    </carousel-item>
                </carousel>
            </section>
            <section class="details__data-text">
                <p>Here's for all the text from the details data</p>
            </section>
        </div>

        <div class="details__episodes">
            <p>Episodes will show here</p>
        </div>
    </div>
</template>


<script lang="ts">
import { apiURL } from '@/helpers';
import axios from 'axios';
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import ShowDetailsDataFromAPI from "@/types/ShowDetailsDataFromAPI"
import ShowDetail from '@/types/ShowDetail';
import Carousel from "@/components/UI/Carousel.vue"
import CarouselItem from "@/components/UI/CarouselItem.vue"
import TheHeader from '@/components/TheHeader.vue';

export default defineComponent({
    name: "ShowDetails",

    components: {
        Carousel,
        CarouselItem,
        TheHeader,
    },

    setup() {
        let isLoading = ref(false);
        let errorOccurred = ref(false);
        let showDetails = ref<ShowDetail | null>(null);
        let activeSlide = ref(0);
        let picturesCount = ref(0);
        const route = useRoute();

        async function fetchShowDetails() {
            isLoading.value = true;

            try {
                const { showId } = route?.params;
                const response = await axios.get(`${apiURL}/show-details?q=${showId}`);
                const { data } = response;
                const { tvShow }: ShowDetailsDataFromAPI = data;
                showDetails.value = tvShow;
                picturesCount.value = tvShow.pictures.length;
                isLoading.value = false;
                console.log("TV Show: ", tvShow);
            } catch (error) {
                isLoading.value = false;
                errorOccurred.value = !!error;
            }
        }

        function showNextSlide() {
            if (activeSlide.value >= (picturesCount.value - 1)) {
                activeSlide.value = 0;
            } else {
                activeSlide.value++
            }
        }

        function showPreviousSlide() {
            if (activeSlide.value <= 0) {
                console.log("pictures: ", picturesCount.value);
                activeSlide.value = picturesCount.value - 1;
            } else {
                activeSlide.value--
            }
        }


        onMounted(() => {
            fetchShowDetails();
        })

        return {
            isLoading,
            errorOccurred,
            showDetails,
            activeSlide,
            showNextSlide,
            showPreviousSlide,
        }
    }
})
</script>

<style lang="scss" scoped>
    .details {
        margin-top: 6.5rem;

        @include respond(phone) {
            margin-top: 4rem;
        }

        &__info {
            display: flex;
            flex-flow: row wrap;
            padding: 1rem 3rem;
            gap: 1.4rem;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -webkit-box-align: stretch;
            width: 100%;
            align-items: stretch;
            margin: 1.5rem auto;
            max-width: 1200px;

            @include respond(tab-port) {
                padding: 1rem 0.8rem;
                justify-content: center;
                gap: 0.9rem;
            }
        }
        &__episodes {
            display: flex;
            align-content: center;
            justify-content: center;
            font-family: $primary-font;
        }
    }
</style>