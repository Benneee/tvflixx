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
                        <h1> {{ showDetails?.name }} </h1>
                    </div>
                    <div class="show-actions">
                        <button 
                            class="not-favorite"
                            v-if="isShowAFavorite(showDetails?.id)" 
                            @click="removeShowFromFavorites"
                        >
                            Remove From Favorites
                        </button>
                        <button v-else @click="addShowToFavorites(showDetails)">
                            Add To Favorites
                        </button>
                    </div>
                </div>

                <p v-html="showDetails?.description"></p>
            </section>
        </div>

        <div class="details__episodes">
            <h2> {{ showDetails?.name }} Episodes </h2>
            <Episodes :episodes="showDetails?.episodes"/>
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
import Episodes from "@/components/Episodes.vue";
import { addToFavorites, removeFromFavorites, isShowAFavorite } from "@/helpers";
import Show from '@/types/Show';
import { notify } from '@kyvg/vue3-notification';


export default defineComponent({
    name: "ShowDetails",

    components: {
        Carousel,
        CarouselItem,
        TheHeader,
        Loading,
        Episodes,
    },

    setup() {
        let isLoading = ref(false);
        let errorOccurred = ref(false);
        let showDetails = ref<ShowDetail>();
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function addShowToFavorites(tvShow: ShowDetail | any) {
            const { 
                country, end_date, id, image_thumbnail_path, name, network, permalink, start_date, status 
            } 
            =  tvShow
            const showToAdd: Show = {
                country, end_date, id, image_thumbnail_path, name, network, permalink, start_date, status
            };
            addToFavorites(showToAdd);
            fetchShowDetails();
        }

        function removeShowFromFavorites() {
            const { id } = showDetails.value || {};
            removeFromFavorites(id);
            notify({
                title: "Favorites",
                text: `${showDetails.value?.name} has been removed from your favorite TV shows`
            })
            fetchShowDetails();
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
            isShowAFavorite,
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
            display: grid;
            width: 100%;
            max-width: 1200px;
            padding: 1rem 3rem;
            margin: 1.5rem auto;
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

                    @include respond(tab-port) {
                        flex-direction: column;
                    }

                    .show-title {
                        font-size: 1.6rem;

                        @include respond(tab-port) {
                            margin-bottom: 0.7rem;
                            font-size: 1.2rem;
                        }
                    }

                    button {
                        @include fave-btn(0)
                    }
                }
            }
        }
        &__episodes {
            padding: 1rem 3rem;
            margin: 1.5rem auto;
            width: 100%;
            max-width: 1200px;
            font-family: $primary-font;

            @include respond(tab-port) {
                padding: 1rem;
            }

            h2 {
                margin-bottom: 1rem;
            }
        }
    }
</style>