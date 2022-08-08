<template>
    <TheHeader />

    <Loading v-if="isLoading" />

    <div class="details" v-if="!isLoading && !errorOccurred">
        <div class="details__info">
            <section class="details__info-pictures">
                <carousel
                    :tvShowPictures="showDetails?.pictures"
                    @next="showNextSlide"
                    @previous="showPreviousSlide"
                    @selectedFromReels="showThisPicture"
                    :activeSlide="activeSlide"
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
            <section class="details__info-data-text">
                <div class="show-content">
                    <div class="show-title">
                        <h2> {{ showDetails?.name }} </h2>
                    </div>
                    <div class="show-actions">
                        <button 
                            v-if="isFavorite(showDetails?.id)" 
                            @click="removeShowFromFavorites"
                        >
                            Remove From Favorites
                        </button>
                        <button @click="addShowToFavorites">
                            Add To Favorites
                        </button>
                    </div>
                </div>

                <p> {{ showDetails?.description }} </p>
            </section>
        </div>

        <div class="details__episodes">
            <p>Episodes will show here</p>
        </div>
    </div>
            
    <div v-if="!isLoading && errorOccurred">
        <section class="tv-error">
            <h1>Something went wrong!</h1>
            <p>But don't worry - it can happen to the best of us, and it just happened to you.</p>
            <p>Please try again later.</p>
        </section>
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
import Loading from "@/components/UI/BaseLoading.vue";
import { addToFavorites, removeFromFavorites, isShowAFavorite } from "@/helpers";
import Show from '@/types/Show';


export default defineComponent({
    name: "ShowDetails",

    components: {
        Carousel,
        CarouselItem,
        TheHeader,
        Loading
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
                activeSlide.value = picturesCount.value - 1;
            } else {
                activeSlide.value--
            }
        }

        function showThisPicture(indexOfPicture: number) {
            activeSlide.value = indexOfPicture;
        }

        function addShowToFavorites(tvShow: Show) {
            addToFavorites(tvShow)
        }

        function removeShowFromFavorites(tvShow: Show) {
            removeFromFavorites(tvShow.id);
        }

        function isFavorite(showId: number | undefined): boolean {
            return isShowAFavorite(showId)
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
            showThisPicture,
            addShowToFavorites,
            removeShowFromFavorites,
            isFavorite,
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
            padding: 1rem 3rem;
            width: 100%;
            margin: 1.5rem auto;
            max-width: 1200px;
            display: grid;
            grid-template-columns: 1fr 2.3fr;

            @include respond(tab-port) {
                padding: 1rem 0.8rem;
                display: flex;
                flex-flow: row wrap;
                justify-content: center;
            }

            &-pictures {

                @include respond(tab-port) {
                    margin-bottom: 1.5rem;
                }
            }

            &-data-text {
                font-family: $primary-font;
                .show-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;

                    button {
                        @include fave-btn(0)
                    }
                }
            }
        }
        &__episodes {
            display: flex;
            align-content: center;
            justify-content: center;
            margin-top: 1.5rem;
            font-family: $primary-font;
        }
    }
</style>