<template>
  <notifications position="top right"/>
  <TheHeader v-if="['/shows', '/shows/', '/favorites'].includes($route?.path)" />
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps?.Component"></component>
    </transition>
  </router-view>
</template>

<script lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  components: {
    TheHeader,
  },

  setup() {
    const router = useRouter();

    onMounted(() => {
      if (router) {
        // console.log("router: ", router);
      }
    })
  }

});
</script>

<style scoped lang="scss">
    .route-enter-from {
      opacity: 0;
      transform: translateY(-30px);
    }
    .route-leave-to {
      opacity: 0;
      transform: translateY(30px);
    }
    .route-leave-active {
      transition: all 0.3s ease-in;
    }
    .route-enter-active {
      transition: all 0.3s ease-out;
    }
    .route-enter-to,
    .route-leave-from {
      opacity: 1;
      transform: translateY(0);
    }
</style>
