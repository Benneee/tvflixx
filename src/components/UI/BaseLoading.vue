<template>
    <div class="loading">
      <h1 data-text="Loading..." class="loading__text">
        Loading...
      </h1>
      <!-- <div class="loading__subtext">
        <p>Please wait</p>
      </div> -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "Loading"
})
</script>


<style lang="scss" scoped>
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;

      &__text {
          font-family: $secondary-font;
          font-size: 8rem;
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
              border-right: 2px solid #000;
              overflow: hidden;
              animation: load 6s linear infinite;
          }
      }

      &__subtext {
        font-family: $primary-font;
        text-align: center;
        
        p {
            font-size: 1.5rem;
            font-weight: 600;
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