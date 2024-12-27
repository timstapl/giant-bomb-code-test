<template>
  <div class="bg-shack-gray">
    <div v-if="game_info === null" class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-shack-text">
      <!-- TODO: add spinner / loading state -->
      Loading... 
    </div>
    <div v-else class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <!-- Image gallery -->
        <TabGroup as="div" class="flex flex-col-reverse">
          <!-- Image selector -->
          <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            <TabList class="grid grid-cols-4 gap-6">
              <Tab v-for="image in images" :key="image.original" class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-500/50 focus:ring-offset-4" v-slot="{ selected }">
                <span class="absolute inset-0 overflow-hidden rounded-md">
                  <img :src="image.thumb_url" alt="" class="size-full object-cover" />
                </span>
                <span :class="[selected ? 'ring-indigo-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']" aria-hidden="true" />
              </Tab>
            </TabList>
          </div>

          <TabPanels>
            <TabPanel v-for="image in images" :key="image.original">
              <img :src="image.super_url" alt="thumbnails" class="aspect-square w-full object-cover sm:rounded-lg" />
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <!-- Product info -->
        <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 class="text-3xl font-bold tracking-tight text-shack-text">{{ game_info.name }}</h1>

          <div class="mt-3">
            <h2 class="sr-only">Product information</h2>
          </div>

          <div class="mt-6">
            <h3 class="sr-only">Description</h3>

            <div class="space-y-6 text-base text-shack-text" v-html="game_info.description ?? game_info.deck" />
          </div>

          <form v-if="userStore.isUserLoggedIn" class="mt-6">
            <div class="mt-10 flex">
              <button type="submit" class="flex w-1/2 flex-1 items-center justify-center rounded-md border border-transparent bg-shack-orange px-8 py-3 text-base font-medium text-shack-text hover:bg-shack-bright-orange focus:outline-none focus:ring-2 focus:ring-shack-bright-orange focus:ring-offset-2 focus:ring-offset-shack-text sm:w-full">Add to cart</button>
            </div>
          </form>

          <section aria-labelledby="details-heading" class="mt-12">
            <h2 id="details-heading" class="sr-only">Additional details</h2>

            <div class="divide-y divide-gray-200 border-t">
              <Disclosure as="div" v-for="detail in details" :key="detail.name" v-slot="{ open }">
                <h3>
                  <DisclosureButton class="group relative flex w-full items-center justify-between py-6 text-left">
                    <span :class="[open ? 'text-shack-orange' : 'text-shack-text', 'text-sm font-medium']">{{ detail.name }}</span>
                    <span class="ml-6 flex items-center">
                      <PlusIcon v-if="!open" class="block size-6 text-shack-orange group-hover:text-shack-bright-orange" aria-hidden="true" />
                      <MinusIcon v-else class="block size-6 text-shack-orange group-hover:text-shack-bright-orange" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel as="div" class="pb-6">
                  <ul role="list" class="list-disc space-y-1 pl-5 text-sm/6 text-shack-text marker:text-shack-orange">
                    <li v-for="item in detail.items" :key="item" class="pl-2">{{ item }}</li>
                  </ul>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  RadioGroup,
  RadioGroupOption,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/vue'
import { StarIcon } from '@heroicons/vue/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'

import { getGameDetails } from '@/utils/games';

const route = useRoute()
const guid = route.params.id;
const game_info = ref(null);

const userStore = useUserStore();

onMounted(async () => {
  const resp = await getGameDetails(guid)

  game_info.value = resp.results;
})

const images = computed(() => game_info.value.images?.slice(0,10) ?? [])
const details = computed(() => {
  return [
  /*
    {
      name: 'Description',
      content: '',
    },
    */
    {
      name: 'Publishers',
      items: game_info.value.publishers.map(p => p.name),
    },
    {
      name: 'Platforms',
      items: game_info.value.platforms.map(p => p.name),
    },
    {
      name: 'Franchises',
      items: game_info.value.franchises.map(f => f.name),
    },
    {
      name: 'Similar Games',
      items: game_info.value.similar_games.map(s => s.name),
    },
    {
      name: 'Releases',
      items: game_info.value.releases.map(r => r.name),
    },
  ]
})
</script>
