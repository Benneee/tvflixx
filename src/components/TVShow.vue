<template>
    <div 
        class="tv-show__properties" 
        @mouseover="hoverCard(showIndex)"
        @mouseout="hoverCard(-1)"
        :class="{ flip: isSelected(showIndex) }"
    >
        <div class="tv-show__properties-image">
            <img :src="tvShow?.image_thumbnail_path" :alt="tvShow?.name" />
        </div>
        <div class="tv-show__properties-description">
            <ul class="show-info">
                <li>
                    <span class="show-info__heading">Start Date</span>
                    {{ getFormattedDate(tvShow.start_date) }} 
                </li>
                <li>
                    <span class="show-info__heading">Station</span> 
                    {{ tvShow?.network }}({{ tvShow?.country }}) 
                </li>
                <li><span class="show-info__heading">Status</span> {{ tvShow?.status }} </li>
            </ul>

            <div class="show-actions">
                <a class="pointer"> <i class="mdi mdi-eye"></i> See details</a>
                <button v-if="!isFavorite(tvShow.id)" @click="addShowToFavorites(tvShow)">
                    Add as Favorite 
                    <i class="mdi mdi-heart-outline"></i>
                </button>
                <button class="not-favorite" v-else @click="removeShowFromFavorites(tvShow)">
                    Remove from Favorites 
                    <i class="mdi mdi-heart"></i>
                </button>
            </div>

        </div>
    </div>
    <div class="tv-show__name">
        <p> {{ tvShow?.name }} </p>
        <span> {{ tvShow?.network }} </span>
    </div>
</template>


<script lang="ts">
import { notify } from "@kyvg/vue3-notification";
import { defineComponent, PropType, ref } from 'vue'

import Show from '@/types/Show';
import { formatDate, addToFavorites, removeFromFavorites, isShowAFavorite } from "@/helpers";


export default defineComponent({
    name: "TVShow",

    emits: ["refresh-list"],
    
    props: {
        tvShow: {
            type: Object as PropType<Show>,
            required: true
        },
        showIndex: {
            type: Number,
            required: true
        }
    },

    setup(_, { emit }) {
        let selectedShow = ref(-1);

        function hoverCard(selectedShowIndex: number) {
            selectedShow.value = selectedShowIndex;
        }

        function isSelected (showIndex: number) {
            return selectedShow.value === showIndex
        }

        function getFormattedDate(date: string) {
            return formatDate(date);
        }

        function isFavorite(showId: number): boolean {
            return isShowAFavorite(showId)
        }

        function addShowToFavorites(tvShow: Show): void {
            addToFavorites(tvShow)
        }

        function removeShowFromFavorites(tvShow: Show): void {
            removeFromFavorites(tvShow.id);
            notify({
                title: "Favorites",
                text: `${tvShow.name} has been removed from your favorite TV shows`
            });

            // Refresh the list
            emit("refresh-list");
        }

        return {
            hoverCard,
            selectedShow,
            isSelected,
            getFormattedDate,
            isFavorite,
            addShowToFavorites,
            removeShowFromFavorites,
        }
    }
})
</script>

<style lang="scss" scoped>
    .tv-show {
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
                margin-top: 2rem;
                width: 100%;
                display: flex;
                // justify-content: space-between;
                justify-content: center;
                flex-direction: column;
                align-items: center;

                a {
                    color: $custom-green;
                }

                button {
                    margin-top: 1rem;
                    box-shadow: none;
                    padding: 0.75rem;
                    border-radius: 20px;
                    color: #fff;
                    border: none;
                    background-color: $custom-green;
                    cursor: pointer;

                    &.not-favorite {
                        background-color: $red;
                    }
                }
            }
        }
    }
</style>