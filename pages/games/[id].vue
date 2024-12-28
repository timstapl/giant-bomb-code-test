<template>
  <div class="bg-shack-gray min-h-screen">
    <div v-if="game_info === null"  class="flex justify-center items-center pt-12" >
      <div role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-shack-text animate-spin fill-shack-orange" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
      </div>
    </div>
    <div v-else class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <!-- Image gallery -->
        <TabGroup as="div" class="flex flex-col-reverse">
          <!-- Image selector -->
          <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            <TabList class="grid grid-cols-4 gap-6">
              <Tab v-for="image in images" :key="image.original" class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-shack-text hover:bg-shack-text focus:outline-none focus:ring focus:ring-shack-orange/50 focus:ring-offset-4" v-slot="{ selected }">
                <span class="absolute inset-0 overflow-hidden rounded-md">
                  <img :src="image.thumb_url" alt="" class="size-full object-cover" />
                </span>
                <span :class="[selected ? 'ring-shack-orange' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']" aria-hidden="true" />
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
              <button 
                type="submit"
                class="flex w-1/2 flex-1 items-center justify-center rounded-md border border-transparent bg-shack-orange px-8 py-3 text-base font-medium text-shack-text hover:bg-shack-bright-orange focus:outline-none focus:ring-2 focus:ring-shack-bright-orange focus:ring-offset-2 focus:ring-offset-shack-text sm:w-full select-none"
                @click.prevent.stop="addToCart"
              >
                Add to cart
              </button>
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
const cartStore = useCartStore();

onMounted(async () => {
  const resp = await getGameDetails(guid)

  game_info.value = resp.results;
})

const images = computed(() => game_info.value.images?.slice(0,8) ?? [])
const details = computed(() => {
  return [
    {
      name: 'Publishers',
      items: game_info.value?.publishers?.map(p => p.name) ?? [],
    },
    {
      name: 'Platforms',
      items: game_info.value?.platforms?.map(p => p.name) ?? [],
    },
    {
      name: 'Franchises',
      items: game_info.value?.franchises?.map(f => f.name) ?? [],
    },
    {
      name: 'Similar Games',
      items: game_info.value?.similar_games?.map(s => s.name) ?? [],
    },
    {
      name: 'Releases',
      items: game_info.value?.releases?.map(r => r.name) ?? [],
    },
  ]
})

const addToCart = () => {
  cartStore.addItemToCart({
    id: game_info.value.id,
    guid: guid,
    name: game_info.value.name,
    image: game_info.value.image.thumb_url,
  })

  navigateTo('/cart')
}
</script>
