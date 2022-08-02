<template>
    <header class="nav__container">
        <div class="header">
            <div class="header__logo">
                <h1 class="heading">TVFlixx</h1>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TheHeader',
    // setup() {},
})
</script>

<style lang="scss" scoped>
    .nav__container {
        @include grid-flex;
    }

    .heading {
        font-size: 2rem;
    }
</style>