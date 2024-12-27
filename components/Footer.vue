<template>
  <footer class="bg-shack-gray">
    <div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
      <div class="flex justify-center gap-x-6 md:order-2">
        <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-gray-400 hover:text-gray-300">
          <span class="sr-only">{{ item.name }}</span>
          <component :is="item.icon" class="size-6" aria-hidden="true" />
        </a>
      </div>
      <p class="mt-8 text-center text-sm/6 text-gray-400 md:order-1 md:mt-0">&copy; 2024 Cat Shack Games, All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { defineComponent, h } from 'vue'

const navigation = []
</script>

