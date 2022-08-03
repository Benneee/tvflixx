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
                <li><span class="show-info__heading">Start Date</span> {{ tvShow?.start_date }} </li>
                <li>
                    <span class="show-info__heading">Station</span> 
                    {{ tvShow?.network }}({{ tvShow?.country }}) 
                </li>
                <li><span class="show-info__heading">Status</span> {{ tvShow?.status }} </li>
            </ul>

            <div class="show-actions">
                <a class="pointer"> <i class="mdi mdi-eye"></i> See details</a>
                <button>
                    Add as Favorite 
                    <i class="mdi mdi-heart-outline"></i>
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
import Show from '@/types/Show';
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
    name: "TVShow",
    
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

    setup() {
        let selectedShow = ref(-1);

        function hoverCard(selectedShowIndex: number) {
            selectedShow.value = selectedShowIndex;
        }

        function isSelected (showIndex: number) {
            return selectedShow.value === showIndex
        }

        return {
            hoverCard,
            selectedShow,
            isSelected
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
                    color: rgb(24, 185, 24);;
                }

                button {
                    margin-top: 1rem;
                    box-shadow: none;
                    padding: 0.75rem;
                    border-radius: 20px;
                    color: #fff;
                    border: none;
                    background-color: rgb(24, 185, 24);
                    cursor: pointer;
                }
            }
        }
    }
</style>