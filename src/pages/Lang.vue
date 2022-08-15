<template>
    <div class="tv-error">
        <h1>Trying out language stuff</h1>
        <p> {{ $t('greeting') }} </p>
        <p>How're you doing?</p>
        <button @click="changeLanguage('en')">English</button>
        <button @click="changeLanguage('de')">German</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import { TranslateResult } from "vue-i18n"


export default defineComponent({
    name: 'lang',

    setup() {
        let currentLanguage = ref('en');

        function changeLanguage(lang: string) {
            console.log("lang: ", lang);
        }

        return {
            currentLanguage,
            changeLanguage
        }
    }
})
</script>


<style scoped lang="scss">
    .tv-error {
        @include info-block;
    }

</style>