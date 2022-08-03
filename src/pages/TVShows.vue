<template>
    <div>
        <Loading v-if="isLoading" />

        <div class="tv-shows" v-if="!isLoading">
            <article class="tv-show" v-for="( show, index ) in tvShows" :key="show.id">
                <div 
                    class="tv-show__properties" 
                    @mouseover="hoverCard(index)"
                    @mouseout="hoverCard(-1)"
                    :class="{ flip: isSelected(index) }"
                >
                    <div class="tv-show__properties-image">
                        <img :src="show?.image_thumbnail_path" :alt="show?.name" />
                    </div>
                    <div class="tv-show__properties-description">
                        <ul class="show-info">
                            <li><span class="show-info__heading">Start Date</span> {{ show?.start_date }} </li>
                            <li>
                                <span class="show-info__heading">Station</span> 
                                {{ show?.network }}({{ show?.country }}) 
                            </li>
                            <li><span class="show-info__heading">Status</span> {{ show?.status }} </li>
                        </ul>

                        <div class="show-actions">
                            <a class="pointer"> <i class="mdi mdi-eye"></i> See details</a>
                            
                            <i class="mdi mdi-heart-outline pointer tooltip">
                                <span class="tooltip__text">
                                    Add as favorite
                                </span>
                            </i>
                        </div>

                    </div>
                </div>
                <div class="tv-show__name">
                    <p> {{ show?.name }} </p>
                    <span> {{ show?.network }} </span>
                </div>
            </article>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Loading from "@/components/UI/BaseLoading.vue";
import apiURL from "@/helpers";
import Show from '@/types/Show';
import ShowsListDataFromAPI from "@/types/ShowDataFromAPI";


export default defineComponent({
    name: 'TVShows',
    components: {
        Loading
    },

    setup() {
        let isLoading = ref(false);
        let tvShows = ref<Show[]>([])
        let selectedShow = ref(-1);

        function hoverCard(selectedShowIndex: number) {
            selectedShow.value = selectedShowIndex;
        }

        function isSelected (showIndex: number) {
            return selectedShow.value === showIndex
        }
        
        async function fetchTVShows() {
            isLoading.value = true;
            const response = await fetch(`${apiURL.apiURL}/most-popular`);
            const responseData: ShowsListDataFromAPI = await response.json();

            if (!response.ok) {
                console.log("An error occurred")
                isLoading.value = false;
            } else {
                // console.log("res: ", responseData);
                // const page = responseData?.page;
                tvShows.value = responseData?.tv_shows;
                isLoading.value = false;
            }
        }

        onMounted(() => {
            fetchTVShows();
        })

        return {
            isLoading,
            tvShows,
            hoverCard,
            selectedShow,
            isSelected
        }
    }
})
</script>

<style lang="scss" scoped>
    .tv-shows {
        @include grid-flex;

        .tv-show {
            height: 25rem;
            width: 18.2%;
            margin: 1.5rem 0.8%;
            padding: 0;
            box-shadow: 0 2px 3px rgba(0, 0, 0, .075),0 2px 10px rgba(0, 0, 0, .15);            
            background: #fff;
            transition: .3s;

            &__name {
                width: 100%;
                height: 4.43rem;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                padding-left: .5rem;

                p {
                    font-size: .875rem;
                    font-weight: bold;
                }

                span {
                    color: $muted;
                    font-weight: 500;
                    font-size: .7rem;
                }
            }

            &__properties {
                &-image {
                    background-position: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: calc(100% - 70.88px);
                    position: relative;

                    img {
                        height: calc(25rem - 4.43rem);
                        width: 100%;
                    }
                }

                &-description {
                    display: none;
                }
            }
        }
    }

    .flip {
        .tv-show__properties-image > img {
            display: none;
        }

        .tv-show__properties-description {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            background: rgb(71, 69, 69);
            color: #fff;
            width: 100%;
            height: calc(25rem - 4.43rem);
            position: relative;
            padding: .75rem;
            border-bottom: 1px solid darkgray;

            .show-info {
                li {
                    margin-bottom: 1rem;
                }

                &__heading {
                    font-weight: bold;
                    font-size: .875rem;
                }

                &__heading::after {
                    content: ":";
                }
            }

            .show-actions {
                margin-top: 1rem;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                a {
                    color: lightgreen;
                }
                
                i.mdi-heart-outline {
                    font-size: 1.5rem;
                    color: lightgreen;
                }
            }
        }
    }
</style>
