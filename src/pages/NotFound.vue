<template>
    <div class="error">
        <h1 class="error__code" data-text="404">404</h1>
        <div class="error__info">
            <p>This Show Cannot Go On!</p>
            <small @click="goHome" class="pointer"><span>&larr;</span>Let's take you home</small>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'NotFound',

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
    }
})
</script>

<style lang="scss" scoped>
    .error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 80vh;

        &__code {
            font-family: $secondary-font;
            font-size: 18rem;
            position: relative;
            color: #fff;
            -webkit-text-stroke: 0.3vw #383d52;
            
            &::before {
                content: attr(data-text);
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 100%;
                color: #000;
                -webkit-text-stroke: 0vw #383d52;
                border-right: 2px solid rgba(235, 235, 235, 0.795);
                overflow: hidden;
                animation: load 6s linear infinite;
            }

            @include respond(phone) {
                font-size: 12rem;
            }
        }
        
        &__info {
            font-family: $primary-font;
            text-align: center;
            
            p {
                font-size: 1.5rem;
                font-weight: 600;
                font-family: $tertiary-font;
                margin-bottom: 1rem;

                @include respond(phone) {
                    font-size: 1rem;
                }
            }

            small {
                font-size: 1rem;
                text-decoration: underline;
                font-weight: 500;
            }
        }
    }

    @keyframes load {
        0%, 10%, 100% {
            width: 0%;
        }
        70%, 90% {
            width: 100%;
        }
    }

</style>