<template>
  <nav class="flex items-center justify-between border-t border-shack-text px-4 m-12 sm:px-0 w-full">
    <div class="-mt-px flex w-0 flex-1">
      <span
        v-if="gamesStore.prevPage"
        class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium page_button cursor-pointer"
        @click="pageTo(gamesStore.prevPage)"
      >
        <ArrowLongLeftIcon class="mr-3 size-5" aria-hidden="true" />
        Previous
      </span>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <span
        v-for="page in pages"
        :key="page"
        href="#"
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium page_button cursor-pointer"
        :class="{active: page === gamesStore.currentPage}"
        @click="pageTo(page)"
      >
      {{ page }}
      </span>
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <span
        v-if="gamesStore.nextPage"
        class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium page_button cursor-pointer"
        @click="pageTo(gamesStore.nextPage)"
      >
        Next
        <ArrowLongRightIcon class="ml-3 size-5 text-gray-400" aria-hidden="true" />
      </span>
    </div>
  </nav>
</template>

<script setup>
  import { computed } from 'vue';
  import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid';

  const gamesStore = useGamesStore();

  const pageTo = (page) => {
    console.log(`request to nav to page ${page}`);
    gamesStore.requestPage(page)
  }

  const pages = computed(() => {
    let currentPage = gamesStore.currentPage
    let totalPages = gamesStore.totalPages
    let maxPagesToShow = 5

    // Edge cases
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const midPoint = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(1, currentPage - midPoint);
    let endPage = Math.min(totalPages, currentPage + midPoint);

    // Adjust start and end if necessary
    if (endPage - startPage + 1 < maxPagesToShow) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      } else {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  })
</script>

<style lang="scss" scoped>
.page_button {
  @apply text-shack-text hover:border-shack-bright-orange hover:text-shack-orange;

  &.active {
    @apply text-shack-orange border-shack-orange hover:border-shack-bright-orange hover:text-shack-bright-orange;
  }
}
</style>
