<template>
  <div class="bg-shack-gray min-h-screen w-full flex flex-col items-center px-12">
    <div id="spacer" class="h-32"></div>
    <div class="text-shack-text w-full flex flex-row justify-center items-center">
      <div class="w-full flex justify-center items-center">
        <label class="w-1/3 text-right pr-4 sr-only" for="search">Find your next Adventure</label>
        <input
          class="w-2/5 bg-shack-text rounded-lg text-shack-gray h-8 p-2"
          type="text"
          id="search"
          v-model="query"
          :disabled="page_status === PageState.Loading" />
      </div>
    </div>
    <div class="text-shack-text w-full flex flex-row justify-center items-center mt-4">
        <button
          class="bg-shack-orange p-4 rounded-lg text-shack-gray font-bold"
          @click="search"
          :disabled="page_status === PageState.Loading"
        >
          Find your next Adventure
        </button>
    </div>
    <GameList v-if="page_status === PageState.Results" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { searchForGame } from '@/utils/games';

  enum PageState {
    Loading,
    Ready,
    Results,
    Error,
    Empty
  }

  const query = ref('')
  const page_status = ref(PageState.Loading);
  const results = ref()
  const gamesStore = useGamesStore();

  onMounted(() => {
    page_status.value = PageState.Ready;
  })

  const search = async () => {
    page_status.value = PageState.Loading
    try {
      const response = await searchForGame(query.value);

      gamesStore.setResults(response);
      results.value = response;

      if ( response.error === "OK" && response.number_of_page_results > 0 && response.number_of_total_results > 0) {
        page_status.value = PageState.Results;
      } else {
        page_status.value = PageState.Empty;
      }
    } catch (e) {
      console.warn("error received: ", e);
      page_status.value = PageState.Error;
    }
  }
</script>
