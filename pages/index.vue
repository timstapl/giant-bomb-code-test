<script lang="ts" setup>
  import { ChevronRightIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <div class="bg-shack-gray h-screen w-full">
    <main class="w-full flex justify-between text-shack-text pt-4">
        <div id="hero-left" class="h-96 flex justify-center items-center w-1/2 ml-6 text-right">
          <p class="ml-24">
            All the latest game news, videos, reviews, and rentals straight to your door!
          </p>
        </div>
        <div id="hero-right" class="h-96 flex justify-center items-center w-1/2 mr-6">
          <Logo class="w-72" />
        </div>
    </main>
  </div>
</template>

