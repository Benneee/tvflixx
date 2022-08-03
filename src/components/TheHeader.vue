<template>
    <div class="header">
        <header class="nav__container">
            <div class="nav__container-links">
                <h1 @click="goHome" class="heading pointer">TVFlixx</h1>
                <router-link to="/favorites">Favorites <i class="mdi mdi-heart"></i></router-link>
            </div>
        </header>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'TheHeader',
    setup() {
        const router = useRouter();
        
        function goHome() {
            router.push({
                name: 'shows'
            })
        }

        return {
            goHome
        }
    },
})
</script>

<style lang="scss" scoped>
    .header {
        background: rgb(71, 69, 69);        
        margin-top: 0;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1030;

        .nav__container {
            position: relative;

            &-links {
                display: flex;
                flex-flow: row wrap;
                width: 100%;
                align-items: center;
                margin: 1rem auto;
                justify-content: space-between;
                max-width: 1200px;
                padding: 0 3.5rem;
                font-family: $primary-font;
                color: #fff;

                a:hover {
                    color: $custom-green;
                }
            }
        }

        .heading {
            font-size: 2rem;

            &:hover {
                color: $custom-green;;
            }
        }
    }
</style>