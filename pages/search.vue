<template>
  <div class="bg-shack-gray h-screen w-full flex flex-col items-center px-12">
    <div id="spacer" class="h-32"></div>
    <div class="text-shack-text w-full flex flex-row justify-center items-center">
      <div class="w-full flex justify-center items-center">
        <label class="w-1/3 text-right pr-4 sr-only" for="search">Find your next Adventure</label>
        <input class="w-2/5 bg-shack-text rounded-lg text-shack-gray" type="text" id="search" v-model="query"></input>
      </div>
    </div>
    <div class="text-shack-text w-full flex flex-row justify-center items-center mt-4">
        <button class="bg-shack-orange p-4 rounded-lg text-shack-gray font-bold" @click="search">Find your next Adventure</button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { searchForGame } from '@/utils/games';

  const query = ref('')

  const search = () => {
    searchForGame(query.value);
  }
</script>
