<template>
    <div v-if="maxVisiblePages > 1" class="pagination">
        <button
            :disabled="isFirstPage"
            class="iconic nav"
            aria-label="Go To First Page"
            @click="goToFirstPage"
        >
            <i class="mdi mdi-chevron-double-left"></i>
        </button>

        <button
            :disabled="isFirstPage"
            class="iconic nav"
            aria-label="Go To Previous Page"
            @click="goToPreviousPage"
        >
            <i class="mdi mdi-chevron-left"></i>
        </button>

        <button
            v-for="page in pages"
            :key="page.name"
            :class="[getPageClass(page.name)]"
            class="bold"
            @click="changePage(page.name)"
            :aria-label="`Go To Page ${page.name}`"
            :disabled="page.isDisabled"
        >
            {{ page.name }}
        </button>

        <button
            :disabled="isLastPage"
            class="iconic nav"
            aria-label="Go To Next Page"
            @click="goToNextPage"
        >
            <i class="mdi mdi-chevron-right"></i>
        </button>

        <button
            :disabled="isLastPage"
            class="iconic nav"
            aria-label="Go To Last Page"
            @click="goToLastPage"
        >
            <i class="mdi mdi-chevron-double-right"></i>
        </button>
    </div>
</template>


<script lang="ts">
import { defineComponent, computed, watch } from 'vue';

export default defineComponent ({
    name: 'Pagination',
    
    props: {
        currentPage: {
            type: Number,
            required: true,
            default: 1,
        },
        maxVisiblePages: {
            type: Number,
            required: false,
            default: 5,
        },
        totalPages: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        perPage: {
            type: Number,
            required: true,
        },
    },

    emits: ['page-changed'],


    setup(props, { emit }) {
        const startPage = computed(() => {
            if (props.currentPage === 1) {
                return 1;
            }
            if (props.currentPage === props.totalPages) {
                if (props.totalPages < props.maxVisiblePages) {
                    return (props.totalPages / props.totalPages);
                }
                return props.totalPages - props.maxVisiblePages + 1;
            }
            return props.currentPage - 1;
        });

        const endPage = computed(() => {
            return Math.min(
                startPage.value + props.maxVisiblePages - 1,
                props.totalPages,
            );
        });

        const pages = computed(() => {
            const range = [];
            console.log("startPage: ", startPage.value);
            for (
                let i = startPage.value;
                i <= Math.min(startPage.value + props.maxVisiblePages - 1, props.totalPages);
                i++
            ) {
                range.push({
                    name: i,
                    isDisabled: i === props.currentPage,
                });   
            }
            return range;
        });

        const isFirstPage = computed(() => {
            return props.currentPage === 1;
        });

        const isLastPage = computed(() => {
            return props.currentPage === props.totalPages;
        });
        

        watch(() => props.currentPage, (value) => {
            if (value) {
                emit('page-changed', value);
            }
        })


        function getPageClass(page: number) {
            return props.currentPage == page ? 'active' : '';
        }

        function goToFirstPage() {
            emit('page-changed', 1);
        }

        function goToPreviousPage() {
            emit('page-changed', props.currentPage - 1);
        }

        function changePage(page: number) {
            emit('page-changed', page);
        }

        function goToNextPage() {
            emit('page-changed', props.currentPage + 1);
        }

        function goToLastPage() {
            emit('page-changed', props.totalPages);
        }

        return {
            startPage,
            endPage,
            pages,
            isFirstPage,
            isLastPage,
            getPageClass,
            goToFirstPage,
            goToPreviousPage,
            changePage,
            goToNextPage,
            goToLastPage,
        }
    }
});
</script>

<style lang="scss" scoped>
    .pagination {
        display: inline-flex;
        align-items: center;
        font-family: $secondary-font;
    }
    button {
        border: 1px solid $dark;
        cursor: pointer;
        height: 36px;
        min-width: 36px;
        padding: 0 8px;
        border: 0;
        border-radius: 32px;
        margin: 0 4px;
        color: $dark;
        background: none;
        justify-content: center;
        &:hover {
            color: $custom-green;
        }
        &.iconic {
            padding: 0;
            width: 36px;
        }
        // @media #{$mobile} {
        //     margin: 0 2px;
        // }
        &:first-child {
            margin-left: 0;
            margin-right: 8px;
        }
        &:last-child {
            margin-left: 8px;
            margin-right: 0;
        }
        &:disabled {
            color: $grey;
            cursor: initial;
            background: none;
        }
    }
    button.ellipsis {
        color: $grey;
        padding: 0;
        min-width: auto;
        padding: 0 8px;
        &:disabled {
            cursor: initial;
        }
        &:hover {
            background: initial;
        }
    }
    button.nav {
        border-radius: 32px;
    }
    button.active {
        background: $dark;
        color: $white;
        border-color: $dark;
        &:hover {
            background: $dark;
        }
    }
</style>