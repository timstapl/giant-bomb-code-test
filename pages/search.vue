<template>
  <div class="bg-shack-gray h-screen w-full flex flex-col items-center px-12">
    <div id="spacer" class="h-32"></div>
    <div class="text-shack-text w-full flex flex-row justify-center items-center">
      <div class="w-4/5 flex">
        <label class="w-1/3 text-right pr-4" for="search">Search</label>
        <input class="w-2/5 bg-shack-text rounded-lg text-shack-gray" type="text" id="search" v-model="query"></input>
      </div>
    </div>
    <div class="text-shack-text w-full flex flex-row justify-center items-center mt-4">
        <button @click="search">Submit</button>
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
