<template>
    <section class="search-area">
        <form @submit.enter.prevent="sendSearchData">
        <div>
            <input
                type="search"
                v-model="showQuery"
                placeholder="Press 'enter' after typing search entry..."
                @blur="validate"
            />
            <small v-if="errorAvailable">Kindly enter a TV show name</small>
        </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: "SearchShows",

    emits: ["searchQuery"],

    setup(_, { emit }) {
        let showQuery = ref("");
        let errorAvailable = ref(false);

        const validate = () => {
            return errorAvailable.value = showQuery.value.length <= 0 && showQuery.value === ''
        }

        function sendSearchData() {
            if (!validate()) {
                emit("searchQuery", showQuery.value.toLowerCase());
            } 
            return;
        }

        return {
            sendSearchData,
            errorAvailable,
            showQuery,
            validate,
        }
    }
})
</script>


<style scoped lang="scss">
.search-area {
    display: flex;
    justify-content: center;
    margin-bottom: 0.5rem;
    margin-top: 6rem;

    @include respond(tab-port) {
        display: block;
        width: 100%;
    }

    small {
        margin-top: 10px;
        font-family: $primary-font;
        display: block;
        color: $red;
    }

    input {
        padding: 0.5rem;
        font-size: 1rem;
        width: 50vw;

        border: none;
        border-bottom: 1px solid rgb(71, 69, 69);
        font-family: $primary-font;

        &:active, &:focus {
            outline: rgb(71, 69, 69);
            border: 1px solid rgb(71, 69, 69);
        }

        @include respond(tab-port) {
            width: 100%;
        }
    }
}
</style>