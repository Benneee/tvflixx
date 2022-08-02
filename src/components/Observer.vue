<template>
    <div ref="root" class="observer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
    name: 'Observer',

    props: {
        options: {
            type: Object,
            required: false
        }
    },
    
    setup(props, { emit }) {
        let observer = ref<IntersectionObserver | null>(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const root = ref<HTMLDivElement | null | any>(null);

        onMounted(() => {
            const options = props.options || {};
            observer.value = new IntersectionObserver(([entry]) => {
                if (entry && entry.isIntersecting) {
                    emit('intersect')
                }
            }, options)
            observer.value.observe(root.value);
        })

        onUnmounted(() => {
            observer?.value?.disconnect();
        })

        return {
            root,
            observer
        }
    },
})
</script>

<style></style>