<template>
  <header class="w-full bg-shack-gray drop-shadow-lg shadow-black">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <NuxtLink href="/" class="-m-1.5 p-1.5 flex justify-center items-center">
          <Logo class="h-12 w-auto" :text="false" />
          <span class="text-shack-text ml-2">Cat Shack Games</span>
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <template
          v-for="item in navigation"
          :key="item.name"
          >
            <NuxtLink 
              class="text-sm/6 font-semibold text-shack-text"
              :href="item.href"
              v-if="userStore.isUserLoggedIn || !item.loggedInOnly">
              {{ item.name }}
            </NuxtLink>
        </template>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <!-- <div class="text-shack-text lg:flex lg:flex-row" data-netlify-identity-menu></div> -->
        <div 
          v-if="userStore.isUserLoggedIn"
          class="text-shack-text lg:flex lg:flex-row cursor-pointer select-none"
          @click="requestLogout"
        >
          Log Out
        </div>
        <div 
          v-else 
          class="text-shack-text lg:flex lg:flex-row cursor-pointer select-none"
          @click="requestLogin"
        >
          Log In
        </div>
      </div>
    </nav>
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-shack-gray px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
        <div class="flex items-center justify-between">
          <NuxtLink href="/" class="-m-1.5 p-1.5 flex flex-row items-center justify-center">
            <Logo class="h-12 w-auto" :text="false" />
            <span class="text-shack-text ml-2">Cat Shack Games</span>
          </NuxtLink>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-400" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/25">
            <div class="space-y-2 py-6 flex flex-col">
              <template
                v-for="item in navigation"
                :key="item.name"
                :href="item.href" 
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-shack-text hover:bg-shack-orange"
              >
                <NuxtLink 
                  v-if="userStore.isUserLoggedIn || !item.loggedInOnly"
                  class="font-semibold text-shack-text"
                >
                  {{ item.name }}
                </NuxtLink>
            </template>
            </div>
            <div class="py-6">
              <div 
                v-if="userStore.isUserLoggedIn"
                class="text-shack-text cursor-pointer"
                @click="requestLogout"
              >
                Log Out
              </div>
              <div
                v-else 
                class="text-shack-text"
                @click="requestLogin"
              >
                Log In
              </div>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import netlifyIdentity from 'netlify-identity-widget'

const navigation = [
  { name: 'Search', href: '/search', loggedInOnly: false },
  // TODO: future feature, list currently checked out games, and previously checked out games
  // { name: 'My Games', href: '/games', loggedInOnly: true },
  { name: 'Cart', href: '/cart', loggedInOnly: true },
]

const mobileMenuOpen = ref(false)
const netlifyIdentityInstance = ref(netlifyIdentity)

const userStore = useUserStore();

onMounted(() => {
  netlifyIdentity.on('init', (user) => {
    if (user) {
      userStore.loginUser({
        email: user.email,
        id: user.id,
        token: user.token,
        name: user.user_metadata.full_name,
      });
    }
  })

  netlifyIdentity.on('login', (user) => {
    userStore.loginUser({
      email: user.email,
      id: user.id,
      token: user.token,
      name: user.user_metadata.full_name,
    });

    netlifyIdentity.close();
  })

  netlifyIdentity.on('logout', () => {
    userStore.logoutUser();
  })

  netlifyIdentity.init({
    locale: "en",
    APIUrl: "https://giantbombcodetest.netlify.app/.netlify/identity",
  })
})

const requestLogin = () => {
  netlifyIdentity.open();
}

const requestLogout = () => {
  netlifyIdentity.logout();
}
</script>

<style>
  .netlify-identity-menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 8em;
  }
</style>
