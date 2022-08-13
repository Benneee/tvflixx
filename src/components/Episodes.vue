<template>
    <div class="episodes">
        <div 
            class="episodes__buttons" 
        >   
            <button 
                v-for="season of showSeasons"
                :key="season"
                :class="{ 'active-season': season === activeSeason }"
                @click="selectSeasonToShow(season)"
            > 
                Season {{ season }} 
            </button>
        </div>

        <transition-group name="list" mode="out-in" tag="ul" class="episodes__listings">
            <li 
                v-for="episode of seasonNowShowing"
                :key="episode?.name"
            > 
                <div class="episodes__listings-details">
                    <div class="date-time-lg">
                        <p> {{ formatDate(episode?.air_date) }} </p>
                        <small> {{ formatTime(episode?.air_date) }} </small>
                    </div>
                    <div class="date-time-sm">
                        <p> {{ shorterFormatDate(episode?.air_date) }} </p>
                        <small> {{ formatTime(episode?.air_date) }} </small>
                    </div>
                    <div class="episode-name">
                        <h3> 
                            S{{ formattedSeasonNumber }}E{{ formattedEpisodeNumber(episode?.episode) }}: 
                            {{ episode?.name  }} 
                        </h3>
                    </div>

                    <div class="aired-date">
                        <p> Aired {{ formatDateFromNow(episode?.air_date) }} </p>
                    </div>
                    
                </div>
            </li>
        </transition-group>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import Episode from '@/types/Episode';
import SeasonEpisodes from '@/types/SeasonEpisodes';
import { formatTime, formatDate, formatDateFromNow, shorterFormatDate } from "@/helpers";

export default defineComponent({
    name: 'Episodes',

    props: {
        episodes: {
            type: Array as PropType<Episode[]>,
            required: true,
        }
    },

    setup(props) {
        const isLoading = ref(false)
        const showSeasons = ref(0);
        let activeSeason = ref(0);
        const seasonNowShowing = ref<Episode[]>([]);

        function selectSeasonToShow(season: number): void {
            let showEpisodes = createEpisodes(props.episodes);
            activeSeason.value = season;
            seasonNowShowing.value = showEpisodes[season]
        }
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function createSeasonButtons(seasonEpisodes: SeasonEpisodes) {
            if (seasonEpisodes) {
                showSeasons.value = Object.keys(seasonEpisodes).length;
            }
        }

        // Method to create the episodes
        function createEpisodes(episodes: Episode[]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let seasonEpisodes: SeasonEpisodes = {};

            if (episodes?.length > 0) {
                episodes.forEach((episode: Episode) => {
                    if (seasonEpisodes[episode.season]) {
                        seasonEpisodes[episode.season].push(episode);
                    } else {
                        seasonEpisodes[episode.season] = [episode];
                    }
                })
            }

            return seasonEpisodes;
        }

        function initialisePage() {
            isLoading.value = true;
            let showEpisodes = createEpisodes(props.episodes);
            createSeasonButtons(showEpisodes);
            selectSeasonToShow(1);
            isLoading.value = false;
        }

        function formattedEpisodeNumber(episode: number): string | number {
            return episode > 10 ? episode : `0${episode}`;
        }

        const formattedSeasonNumber = computed(() => {
            return activeSeason.value > 10 ? activeSeason.value : `0${activeSeason.value}`;
        })

        onMounted(() => {
            setTimeout(() => {
                initialisePage();
            }, 100);
        })

        return  {
            showSeasons,
            selectSeasonToShow,
            seasonNowShowing,
            formatTime,
            formatDate,
            formatDateFromNow,
            formattedSeasonNumber,
            formattedEpisodeNumber,
            shorterFormatDate,
            activeSeason,
        }
    }
})
</script>

<style scoped lang="scss">
    .episodes {
        display: flex;
        flex-direction: column;

        &__buttons {      
            display: flex;
            flex-flow: row wrap;
            gap: 1.3rem;      
            button {
                @include fave-btn(0)
            }

            @include respond(tab-port) {
                flex-wrap: nowrap;
                overflow-x: auto;
                width: 100%;

                button {
                    flex: 0 0 auto;
                }
            }
        }

        &__listings {
            background: rgb(71, 69, 69);        
            border: 1px solid black;
            padding: 1.5rem;
            color: #fff;
            border-radius: 4px;
            margin-top: 1rem;

            &-details {
                display: grid;
                grid-template-columns: 1fr 2fr 1fr;
                align-items: center;
                margin-bottom: 1.2rem;

                .date-time-sm {
                    display: none;
                }

                .date-time-lg {
                    display: block;
                }

                @include respond(tab-port) {
                    display: grid;
                    align-items: unset;
                    gap: 1.5rem;
                    width: 100%;
                    grid-template-columns: 2fr 3fr;
                    
                    .date-time-sm {
                        display: block;

                        p {
                            font-size: 13px;
                        }
                        small {
                            font-size: 10px;
                        }
                    }

                    .date-time-lg {
                        display: none;
                    }

                    .aired-date {
                        display: none;
                    }
                }

                .episode-name {                    
                    h3 {
                        font-size: 1.3rem;

                        @include respond(tab-port) {
                            font-size: 0.85rem;
                        }
                    }
                }
            }
        }
    }

    .list-enter-active {
        transition: slideIn 1s ease-in-out;
    }

    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
</style>
