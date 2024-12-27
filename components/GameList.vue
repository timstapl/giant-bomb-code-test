<template>
  <div class="bg-shack-gray h-full">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Search Results</h2>

      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <a v-for="game in gamesStore.results" :key="game.id" :href="game.site_detail_url" class="group">
          <img :src="game.image.thumb_url" :alt="`${game.name}-thumbnail`" class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]" />
          <h3 class="mt-4 text-sm text-shack-text">{{ game.name }}</h3>
          <!-- <p class="mt-1 text-lg font-medium text-shack-text">{{ product.price }}</p> -->
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const gamesStore = useGamesStore();
</script>
